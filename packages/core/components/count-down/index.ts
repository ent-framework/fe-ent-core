import { withInstall } from '@ent-core/utils';
import countButton from './src/count-button.vue';
import countdownInput from './src/countdown-input.vue';

export const EntCountdownInput = withInstall(countdownInput);
export const EntCountButton = withInstall(countButton);
