import { withInstall } from '../../utils';
import description from './src/index.vue';

export { useDescription } from './src/use-description';
export const EntDescription = withInstall(description);
export default description;
