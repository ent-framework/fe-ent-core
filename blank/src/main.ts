import App from './App.vue';
import { createApp } from 'vue';

function bootstrap() {
  const app = createApp(App);
  app.mount('#app');
}

bootstrap();
