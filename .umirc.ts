import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Arsenal',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  logo: 'http://baoqiang.ytoulan.com/timg.jpg',
  styles: [`.__dumi-default-navbar-tool { display: none !important }`],
});
