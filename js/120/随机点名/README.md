# ✨ 随机点名系统

一个功能完整且界面美观的随机点名系统，使用 Vite + TypeScript 开发，支持概率调整功能。

## 🎯 主要功能

- **随机点名**：支持快速随机选择一个人
- **概率权重调整**：每个人都可以设置独立的被选中概率（0.1x ~ 3x）
- **动画效果**：炫彩动画转轮效果，选择过程流畅动感
- **统计数据**：实时显示总点名次数和被选中最多的人
- **数据重置**：一键重置所有统计数据
- **响应式设计**：完美适配各种屏幕尺寸
- **清新UI**：现代化设计，渐变背景，毛玻璃效果

## 🚀 快速开始

### 前置要求

- Node.js >= 16
- pnpm >= 7.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

访问 http://localhost:5173/ 即可看到应用

### 生产构建

```bash
pnpm run build
```

构建后的文件在 `dist` 目录中

### 预览生产构建

```bash
pnpm run preview
```

## 📁 项目结构

```
.
├── index.html              # HTML 入口文件
├── public/
│   └── names.json          # 人名数据文件
├── src/
│   ├── main.ts             # TypeScript 主程序
│   └── style.css           # 样式文件
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 本文件
```

## ⚙️ 自定义配置

### 修改人名列表

编辑 `public/names.json` 文件，按照以下格式添加或删除人名：

```json
{
  "names": [
    "张三",
    "李四",
    "王五"
  ]
}
```

### 修改颜色主题

编辑 `src/style.css` 文件，修改根部 CSS 变量：

```css
:root {
  --primary-color: #6366f1;       /* 主色调 */
  --primary-light: #818cf8;       /* 浅主色 */
  --primary-dark: #4f46e5;        /* 深主色 */
  --accent-color: #ec4899;        /* 强调色 */
  --bg-gradient-1: #f8f9ff;       /* 背景渐变色1 */
  --bg-gradient-2: #f3e8ff;       /* 背景渐变色2 */
  --text-primary: #1f2937;        /* 主文本色 */
  --text-secondary: #6b7280;      /* 次文本色 */
  --border-color: #e5e7eb;        /* 边框颜色 */
}
```

## 🎨 设计特点

- **现代化界面**：采用圆角卡片设计，毛玻璃背景效果
- **流畅动画**：
  - 背景有柔和的浮动动画
  - 选中时有 popIn 弹出动画
  - 按钮有 hover 悬停效果
  - 转轮动画流畅自然

- **全 CSS 变量管理**：颜色、阴影、过渡等均使用 CSS 变量，便于主题切换
- **响应式布局**：在移动设备上自动调整尺寸和布局

## 📱 使用说明

1. **开始点名**：点击"开始点名"按钮，系统会播放动画并随机选择一个人
2. **停止**：若想在动画中途停止，可点击"停止"按钮
3. **调整概率**：在"概率设置"区域，使用滑块调整每个人的被选中概率
   - 左右拖动滑块可以调整倍数（0.1x 表示降低选中率，3x 表示提高选中率）
   - 倍数乘以默认概率，形成加权随机
4. **查看统计**：上方显示总点名次数和被选中最多的人
5. **重置统计**：点击"重置所有统计"按钮可清空所有数据

## 🛠️ 技术栈

- **框架**：Vite
- **语言**：TypeScript
- **HTTP 客户端**：Axios
- **包管理**：pnpm
- **构建工具**：Vite
- **样式**：原生 CSS 3（CSS 变量、Grid、Flexbox、动画）

## 📦 依赖说明

- **vite**：现代化前端构建工具
- **typescript**：类型安全的 JavaScript
- **axios**：用于加载本地 JSON 数据文件

## 🎓 代码亮点

### 1. 加权随机算法

```typescript
private getWeightedRandomName(): string {
  const weights = this.names.map((p) => p.probability)
  const totalWeight = weights.reduce((a, b) => a + b, 0)
  
  let random = Math.random() * totalWeight
  for (let i = 0; i < this.names.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return this.names[i].name
    }
  }
  
  return this.names[0].name
}
```

### 2. RequestAnimationFrame 动画

使用 `requestAnimationFrame` 实现流畅的转轮动画，可以实时更新显示名字，并在 2 秒后得出最终结果。

### 3. 类型安全

使用 TypeScript 接口确保数据结构的安全性，提高代码可维护性。

## 🐛 常见问题

### Q: 加载不了人名数据？
A: 确保 `public/names.json` 文件存在且格式正确，可以检查浏览器控制台是否有网络错误。

### Q: 概率权重如何工作？
A: 系统使用加权随机算法。如果某人的倍数是 2x，他被选中的概率是其他人的两倍。

### Q: 如何修改动画时长？
A: 编辑 `src/main.ts` 中 `selectRandomName` 方法的 `duration` 变量（单位：毫秒）。

## 📄 许可证

MIT License

## 👨‍💻 开发

欢迎贡献代码和功能建议！如有问题，请提交 Issue。

---

**祝你使用愉快！** ✨
