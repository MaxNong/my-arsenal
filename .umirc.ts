import { defineConfig } from 'dumi';
import {join} from "path"

export default defineConfig({
  title: '沐小农 MUXIAONONG',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  logo: ' ',
  headScripts: [`localStorage.setItem("dumi:prefers-color", "dark");document.documentElement.setAttribute("data-prefers-color", "dark");`],
  styles: [`.__dumi-default-navbar-tool { display: none !important }; .__dumi-default-navbar-logo{padding-left: 0 !important}`],
  alias: {
    "@": join(__dirname, "src")
  }
});
