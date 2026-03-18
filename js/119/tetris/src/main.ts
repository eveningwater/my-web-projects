/**
 * 入口文件（TypeScript）
 * - 仅负责创建主类实例并启动
 * - 页面实现放在 src/views，路由与应用初始化放在 src/App.ts
 */

import "./style.css";

import { App } from "./App";
import { BackToTop } from "./components/BackToTop";
import { HeaderToggle } from "./components/HeaderToggle";
import { ThemeControls } from "./theme/ThemeControls";

// 启动应用（内部会初始化 Hash 路由与页面渲染）
new HeaderToggle().init();
new ThemeControls().init();
new BackToTop().init();
new App().init();
