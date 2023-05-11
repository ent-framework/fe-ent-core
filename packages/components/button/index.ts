import { withInstall } from '@ent-core/utils';
import BasicButton from './src/basic-button.vue';
import popConfirmButton from './src/pop-confirm-button.vue';
import type { buttonProps } from './src/props';
import type { ExtractPropTypes } from 'vue';

export const EntButton = withInstall(BasicButton, 'EntButton');
export const AButton = withInstall(BasicButton);
export const EntPopButton = withInstall(popConfirmButton);
export declare type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;
