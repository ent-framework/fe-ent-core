import { withInstall } from '@ent-core/utils';
import type { ExtractPropTypes } from 'vue';
import BasicButton from './src/BasicButton.vue';
import popConfirmButton from './src/PopConfirmButton.vue';
import { buttonProps } from './src/props';

export const EntButton = withInstall(BasicButton);
export const EntPopButton = withInstall(popConfirmButton);
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
