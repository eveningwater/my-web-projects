# 微前端框架 v2

这是一个基于 **Vite Plugin Federation** 构建的现代微前端框架，支持多个独立子应用的动态加载和集成。

## 🚀 特性

- **Module Federation**: 使用 Vite Plugin Federation 实现真正的模块联邦
- **TypeScript 支持**: 完整的 TypeScript 类型支持
- **独立开发**: 每个子应用可以独立开发、构建和部署
- **动态加载**: 运行时动态加载子应用模块
- **样式隔离**: 每个子应用拥有独立的样式作用域
- **响应式设计**: 支持各种设备和屏幕尺寸

## 📁 项目结构

```
v2/
├── main-app/                 # 主应用 (Host)
│   ├── src/
│   │   ├── main.ts          # 主应用入口
│   │   └── styles/
│   ├── vite.config.ts       # 主应用 Vite 配置
│   └── package.json
├── child-apps/               # 子应用 (Remote)
│   ├── cartoon-website/     # 卡通风格子应用
│   ├── hacker-website/      # 黑客风格子应用
│   └── simple-website/      # 简单风格子应用
├── package.json              # 工作区配置
└── README.md
```

## 🛠️ 技术栈

- **构建工具**: Vite 5.x
- **微前端**: @originjs/vite-plugin-federation
- **语言**: TypeScript
- **包管理**: pnpm (工作区)
- **样式**: CSS3 + 动画

## 🚀 快速开始

### 1. 安装依赖

```bash
cd v2
pnpm install
```

### 2. 开发模式

```bash
# 启动所有应用（并行）
pnpm dev

# 或者单独启动
pnpm dev:main        # 主应用 (端口 3000)
pnpm dev:cartoon     # 卡通风格应用 (端口 3001)
pnpm dev:hacker      # 黑客风格应用 (端口 3002)
pnpm dev:simple      # 简单风格应用 (端口 3003)
```

### 3. 构建

```bash
# 构建所有应用
pnpm build

# 或者单独构建
pnpm build:main
pnpm build:cartoon
pnpm build:hacker
pnpm build:simple
```

### 4. 预览

```bash
# 预览所有应用
pnpm preview

# 或者单独预览
pnpm preview:main
pnpm preview:cartoon
pnpm preview:hacker
pnpm preview:simple
```

## 🔧 配置说明

### 主应用配置 (Host)

```typescript
// main-app/vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'main-app',
      remotes: {
        'cartoon-website': 'http://localhost:3001/assets/remoteEntry.js',
        'hacker-website': 'http://localhost:3002/assets/remoteEntry.js',
        'simple-website': 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ]
})
```

### 子应用配置 (Remote)

```typescript
// child-apps/*/vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'app-name',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.ts',
      },
      shared: ['react', 'react-dom']
    })
  ]
})
```

## 📱 子应用开发

### 1. 创建新的子应用

```bash
cd child-apps
mkdir my-new-app
cd my-new-app
pnpm init
```

### 2. 配置 Vite

```typescript
// vite.config.ts
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'my-new-app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/main.ts',
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 3004, // 使用新的端口
    cors: true
  }
})
```

### 3. 导出应用模块

```typescript
// src/main.ts
function createMyApp(container: HTMLElement): void {
  // 你的应用逻辑
}

export default createMyApp;
```

### 4. 在主应用中注册

```typescript
// main-app/src/main.ts
const remoteApps = [
  // ... 其他应用
  {
    name: 'my-new-app',
    url: 'http://localhost:3004',
    module: 'my-new-app/App'
  },
];
```

## 🌐 部署说明

### 1. 构建所有应用

```bash
pnpm build
```

### 2. 部署结构

```
dist/
├── main-app/                 # 主应用构建产物
│   ├── index.html
│   └── assets/
├── cartoon-website/          # 卡通风格应用构建产物
│   ├── index.html
│   └── assets/
│       └── remoteEntry.js    # 远程入口文件
├── hacker-website/           # 黑客风格应用构建产物
│   └── assets/
│       └── remoteEntry.js
└── simple-website/           # 简单风格应用构建产物
    └── assets/
        └── remoteEntry.js
```

### 3. 环境配置

在生产环境中，需要更新主应用的远程模块 URL：

```typescript
// 生产环境配置
remotes: {
  'cartoon-website': 'https://your-domain.com/cartoon-website/assets/remoteEntry.js',
  'hacker-website': 'https://your-domain.com/hacker-website/assets/remoteEntry.js',
  'simple-website': 'https://your-domain.com/simple-website/assets/remoteEntry.js',
}
```

## 🔍 调试技巧

### 1. 检查模块加载

```typescript
// 在浏览器控制台中检查
console.log(window.__FEDERATION__);
```

### 2. 网络请求检查

确保子应用的 `remoteEntry.js` 文件能够正常访问。

### 3. 错误处理

```typescript
try {
  const module = await loadRemoteModule(remoteApp.module);
  // 处理模块
} catch (error) {
  console.error('模块加载失败:', error);
  // 显示错误信息
}
```

## 📚 最佳实践

1. **端口管理**: 确保每个子应用使用不同的端口
2. **样式隔离**: 使用 CSS 模块或作用域样式避免冲突
3. **错误边界**: 实现完善的错误处理机制
4. **性能优化**: 使用懒加载和代码分割
5. **类型安全**: 为共享接口定义 TypeScript 类型

## 🐛 常见问题

### Q: 子应用无法加载？
A: 检查端口配置、CORS 设置和网络请求

### Q: 样式冲突？
A: 使用 CSS 作用域或 CSS 模块

### Q: 构建失败？
A: 检查依赖版本和 Vite 配置

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
