import { componentPlugin } from './plugins/components-plugin';
import App from './App.vue';
import 'vfonts/FiraCode.css';
import 'virtual:windi.css';
// import 'normalize.css';
import '@/assets/theme/style/index.postcss';
import { createHead } from '@vueuse/head'; // <--
import routes from 'virtual:generated-pages';
import { ViteSSG } from 'vite-ssg';
import 'virtual:svg-icons-register';

const head = createHead(); // <--

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(componentPlugin);
  app.use(head); // <--
});
