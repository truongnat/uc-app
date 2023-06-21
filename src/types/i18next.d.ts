import * as resources from 'translations/resources';
import { defaultNS } from 'translations';

export type LanguageKey = keyof typeof resources;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
