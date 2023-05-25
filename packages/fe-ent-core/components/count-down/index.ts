import { withInstall } from '@ent-core/utils';
import CountButton from './src/count-button.vue';
import CountdownInput from './src/countdown-input.vue';

export const EntCountdownInput = withInstall(CountdownInput);
export const EntCountButton = withInstall(CountButton);

export default CountButton;
export { CountdownInput };
