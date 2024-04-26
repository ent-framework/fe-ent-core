import type { ConfigEnv, UserConfig } from 'vite';
import type { ModifyVarOptions } from '../utils/modify-vars';

export type DefineOptions = {
  overrides?: UserConfig;
  options?: {
    cssModify?: ModifyVarOptions;
    /**
     * 打包后文件是否开启hash，
     */
    hash?: boolean;
  };
} & ConfigEnv;
