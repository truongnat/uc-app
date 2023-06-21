import { assign, isEmpty, isObject } from 'radash';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native/types';

export type FieldValues = Record<string, any>;

export type ValidateGeneric = {
  required?: boolean | string;
  regex?: { value: RegExp; message?: string };
  maxLength?: { value: number; message?: string };
  minLength?: { value: number; message?: string };
};

export type OptionsFormat = {
  trimStart?: boolean;
  trimEnd?: boolean;
  trimAll?: boolean;
  trimEvery?: boolean;
};

export type RegisterOptions = {
  validates?: ValidateGeneric;
  change?: OptionsFormat;
  blur?: OptionsFormat;
};

export default function useForm<TFieldValues extends FieldValues = FieldValues>(
  defaultValues: TFieldValues,
) {
  const [form, setForm] = useState<TFieldValues>(defaultValues);
  const [errors, setErrors] = useState<TFieldValues>(
    initErrorState(defaultValues),
  );
  const mapOpts = useRef(new Map());

  const register = useCallback(
    (key: keyof TFieldValues, options?: RegisterOptions) => {
      const _opts = getOptions(options);
      mapOpts.current.set(key, _opts);

      return {
        nativeID: key as string,
        value: form[key],
        onChangeText(text: string) {
          const value = getValueFormat(_opts.change as OptionsFormat, text);
          setForm(prev => ({
            ...prev,
            [key]: value,
          }));

          setErrors(prev => ({
            ...prev,
            [key]: getErrorsValidate(_opts.validates, value),
          }));
        },
        onBlur({
          nativeEvent: { text },
        }: NativeSyntheticEvent<TextInputFocusEventData>) {
          const value = getValueFormat(_opts.blur as OptionsFormat, text);
          setForm(prev => ({
            ...prev,
            [key]: value,
          }));

          setErrors(prev => ({
            ...prev,
            [key]: getErrorsValidate(_opts.validates, value),
          }));
        },
        // FIXME: add more ...
      };
    },
    [form],
  );

  const watch = useCallback(
    (key: keyof TFieldValues) => {
      return form[key];
    },
    [form],
  );

  const formStates = useMemo(() => ({ form, errors }), [form, errors]);

  const onSubmit = useCallback(
    (callback: (state: TFieldValues) => void) => {
      return (e: GestureResponderEvent) => {
        e.preventDefault();
        const currentErrors: Record<string, any> = {};

        for (const [key, value] of mapOpts.current.entries()) {
          currentErrors[key] = getErrorsValidate(value?.validates, form[key]);
        }

        const isCanSubmit = Object.values(currentErrors).every(v => !v);

        if (isCanSubmit) {
          callback(form);
        }
      };
    },
    [form],
  );

  return { register, watch, formStates, onSubmit };
}

const initErrorState = <T extends FieldValues = FieldValues>(input: T): T => {
  return Object.keys(input).reduce((prev, current: keyof T) => {
    // @ts-ignore
    prev[current] = '';
    return prev;
  }, {} as T);
};

const getOptions = (options?: RegisterOptions) => {
  const opt = {
    validates: undefined,
    change: {
      trimStart: false,
      trimEnd: false,
      trimAll: false,
      trimEvery: false,
    },
    blur: {
      trimStart: false,
      trimEnd: false,
      trimAll: false,
      trimEvery: false,
    },
  } as RegisterOptions;

  if (!options) {
    return opt;
  }

  return assign(opt, options);
};

const getErrorsValidate = (validates?: ValidateGeneric, value?: any) => {
  let msg = '';
  const lengthValue = value.length;

  if (isObject(validates)) {
    if (validates.regex) {
      const { message, value: regex } = validates.regex;

      if (!regex.test(value)) {
        msg = message || 'Fail to test regex';
      }
    }

    if (validates.minLength) {
      const { message, value: minLength } = validates.minLength;
      if (lengthValue < minLength) {
        msg = message || `Min length is ${minLength}`;
      }
    }

    if (validates.maxLength) {
      const { message, value: maxLength } = validates.maxLength;
      if (lengthValue > maxLength) {
        msg = message || `Max length is ${maxLength}`;
      }
    }

    if (validates.required) {
      if (isEmpty(value)) {
        msg =
          typeof validates.required === 'boolean'
            ? 'This field is required'
            : validates.required;
      }
    }
  }
  return msg;
};

const getValueFormat = (formatOpts: OptionsFormat, value: string) => {
  let _val = value;
  if (formatOpts.trimEnd) {
    _val = _val.trimEnd();
  }

  if (formatOpts.trimStart) {
    _val = _val.trimStart();
  }

  if (formatOpts.trimAll) {
    _val = _val.trim();
  }

  if (formatOpts.trimEvery) {
    _val = _val.split(' ').filter(Boolean).join(' ');
  }

  return _val;
};
