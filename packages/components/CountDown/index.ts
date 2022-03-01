import { withInstall } from '@ent-core/utils';
import countButton from './src/CountButton.vue';
import countdownInput from './src/CountdownInput.vue';

export const EntCountdownInput = withInstall(countdownInput);
export const EntCountButton = withInstall(countButton);
