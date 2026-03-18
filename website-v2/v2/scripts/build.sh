#!/bin/bash

# 微前端构建脚本

echo "🔨 开始构建微前端应用..."

# 清理之前的构建
echo "🧹 清理之前的构建文件..."
pnpm clean

# 构建主应用
echo "📱 构建主应用..."
cd main-app && pnpm build && cd ..

# 构建卡通风格子应用
echo "🎨 构建卡通风格子应用..."
cd child-apps/cartoon-website && pnpm build && cd ../..

# 构建黑客风格子应用
echo "💻 构建黑客风格子应用..."
cd child-apps/hacker-website && pnpm build && cd ../..

# 构建简约风格子应用
echo "✨ 构建简约风格子应用..."
cd child-apps/simple-website && pnpm build && cd ../..

echo ""
echo "✅ 所有应用构建完成！"
echo "📁 构建文件位于各应用的 dist/ 目录中"
echo ""
echo "🌐 主应用: main-app/dist/"
echo "🎨 卡通风格: child-apps/cartoon-website/dist/"
echo "💻 黑客风格: child-apps/hacker-website/dist/"
echo "✨ 简约风格: child-apps/simple-website/dist/"
