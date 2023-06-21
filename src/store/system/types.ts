import { SystemConfig } from 'services/modules/system/types';

export type SystemState = {
  config: SystemConfig | undefined | null;
};
