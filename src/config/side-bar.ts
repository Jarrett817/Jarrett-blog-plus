export const sidebar = {
  '/front-end/': getFrontEndSidebar(),
  '/computer-basic/': getComputerBasicSidebar(),
  '/packages/': getPackagesSidebar(),
};

function getFrontEndSidebar() {
  return [
    {
      text: 'HTML',
      link: '/front-end/html/',
    },
    {
      text: 'CSS',
      link: '/front-end/css/',
    },
    { text: 'JS', link: '/front-end/js/' },
    { text: 'TS', link: '/front-end/ts/' },
    { text: '浏览器', link: '/front-end/browser/' },
    { text: 'vue', link: '/front-end/vue/' },
    { text: 'nodejs', link: '/front-end/nodejs/' },
    { text: 'git', link: '/front-end/git/' },
    { text: 'canvas', link: '/front-end/canvas/' },
  ];
}

function getComputerBasicSidebar() {
  return [
    {
      text: '设计模式',
      link: '/computer-basic/design-pattern/',
    },
    {
      text: '计算机网络',
      link: '/computer-basic/internet/',
    },
    {
      text: '数据结构与算法',
      link: '/computer-basic/fucking-arithmetic/',
    },
  ];
}

function getPackagesSidebar() {
  return [
    {
      text: 'ppt生成器',
      link: '/packages/ppt/',
    },
  ];
}
