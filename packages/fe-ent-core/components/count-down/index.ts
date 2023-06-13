import { withInstall } from '@ent-core/utils';
import CountButton from './src/count-button.vue';
import CountDownInput from './src/countdown-input.vue';

export const EntCountDownInput = withInstall(CountDownInput);
export const EntCountButton = withInstall(CountButton);

export default CountButton;
export { CountDownInput };
