# 项目脚本说明

## 打包JS项目

`package-js-project.js` 脚本用于一键打包js目录下的项目。

### 安装依赖

在使用此脚本前，请先安装所需依赖：

```bash
npm install
```

## 构建和压缩JS项目
### 使用方法
#### 构建单个项目


```bash
# 通过npm脚本运行
npm run package-js -- 1

# 或直接使用node运行
node scripts/package-js-project.js 1
```

上面的命令将会构建和压缩 `js/1` 目录下的项目，并将结果输出到 `dist/js-1` 目录中。

#### 构建所有项目

```bash
# 通过npm脚本运行
npm run package-js -- all

# 或直接使用node运行
node scripts/package-js-project.js all
```

上面的命令将会打包 `js` 目录下的所有项目，每个项目都会生成一个对应的zip文件，存放在 `dist` 目录下。

### 输出目录

所有打包后的文件都会存放在项目根目录下的 `dist` 文件夹中。如果该文件夹不存在，脚本会自动创建。

### 注意事项

1. 确保已安装 `archiver` 依赖，该依赖用于创建zip文件。
2. 打包大量项目可能需要一些时间，请耐心等待。
3. 如果项目中包含大量图片或其他大型文件，生成的zip文件可能会比较大。