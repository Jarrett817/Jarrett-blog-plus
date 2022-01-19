import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import ViteMarkdown from 'vite-plugin-md';
import ViteComponents from 'vite-plugin-components';
import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import Prism from 'markdown-it-prism';
import anchor from 'markdown-it-anchor';
import WindiCSS from 'vite-plugin-windicss';
import { mdToTree } from './src/utils';
import viteSvgIcons from 'vite-plugin-svg-icons';

const resolve = (dir: string): string => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    ViteMarkdown({
      headEnabled: true,
      wrapperComponent: 'article-page',
      markdownItSetup(md) {
        // for example
        md.enable(['image', 'link']);

        md.use(Prism);
        md.use(anchor, {
          slugify: s =>
            encodeURIComponent(
              String(s).trim().toLowerCase().replace(/\s+/g, '-')
            ),
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol:
            '<svg t="1639925481270" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16600" width="16" height="16"><path d="M0 128 1024 128 1024 256 0 256 0 128ZM0 448 1024 448 1024 576 0 576 0 448ZM0 768 704 768 704 896 0 896 0 768Z" p-id="16601"></path></svg>',
          permalinkAttrs: () => ({
            'aria-hidden': true,
          }),
        });
      },
    }),
    ViteComponents({
      extensions: ['vue', 'md'],
      customLoaderMatcher: path => path.endsWith('.md'),
    }),
    Pages({
      extensions: ['vue', 'md'],
      importMode(path) {
        return path.includes('home') ? 'sync' : 'async';
      },
      pagesDir: 'src/views/',
      extendRoute(route) {
        const path = resolve(route.component.slice(1));
        const md = fs.readFileSync(path, 'utf-8');
        const { data } = matter(md);
        data.lastUpdated = dayjs(Math.round(fs.statSync(path).mtimeMs)).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        data.date = dayjs(new Date(data.date)).format('YYYY/MM/DD HH:mm:ss');
        // 在构建时将frontMatter和md原格式文件存入route
        route.meta = Object.assign(route.meta || {}, {
          frontmatter: data,
          mdContent: md,
          toc: mdToTree(md),
        });

        return route;
      },
    }),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg-icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    WindiCSS(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      // {
      //   find: /^~/,
      //   replacement: 'node_modules/',
      // },
    ],
  },
  // server: {
  //   proxy: {
  //     // 选项写法
  //     '/api': {
  //       target: 'https://bing.com',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('postcss-apply'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
      ],
    },
  },
});
