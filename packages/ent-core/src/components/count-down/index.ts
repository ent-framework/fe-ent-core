import { withInstall } from '../../utils';
import CountButton from './src/count-button.vue';
import CountDownInput from './src/countdown-input.vue';
import { countDownInputProps } from './src/props';

export const EntCountDownInput = withInstall(CountDownInput);
export const EntCountButton = withInstall(CountButton);

export default CountButton;
export { CountDownInput, countDownInputProps };
