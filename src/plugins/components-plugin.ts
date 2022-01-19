import { Icon, IconConfigProvider } from '@vicons/utils';
import SvgIcon from '@/components/svg-icon.vue';
import ToolBar from '@/components/tool-bar.vue';
import Card from '@/components/card.vue';
import TopBar from '@/components/top-bar.vue';
import MindMap from '@/components/mind-map.vue';
import { App } from 'vue';

const components = [
  SvgIcon,
  ToolBar,
  Icon,
  IconConfigProvider,
  Card,
  TopBar,
  MindMap,
];
export const componentPlugin = {
  install: (app: App) => {
    components.forEach(comp => app.component(comp.name, comp));
  },
};
