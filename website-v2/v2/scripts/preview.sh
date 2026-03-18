#!/bin/bash

# 微前端预览脚本

echo "🚀 启动微前端预览环境..."

# 检查是否已经构建
if [ ! -d "main-app/dist" ] || [ ! -d "child-apps/cartoon-website/dist" ] || [ ! -d "child-apps/hacker-website/dist" ] || [ ! -d "child-apps/simple-website/dist" ]; then
  echo "❌ 请先运行构建命令: pnpm build"
  exit 1
fi

# 启动主应用预览
echo "📱 启动主应用预览 (端口 3000)..."
cd main-app && pnpm preview &
MAIN_PID=$!

# 等待主应用启动
sleep 3

# 启动卡通风格子应用预览
echo "🎨 启动卡通风格子应用预览 (端口 3001)..."
cd ../child-apps/cartoon-website && pnpm preview &
CARTOON_PID=$!

# 启动黑客风格子应用预览
echo "💻 启动黑客风格子应用预览 (端口 3002)..."
cd ../hacker-website && pnpm preview &
HACKER_PID=$!

# 启动简约风格子应用预览
echo "✨ 启动简约风格子应用预览 (端口 3003)..."
cd ../simple-website && pnpm preview &
SIMPLE_PID=$!

echo ""
echo "✅ 所有应用预览已启动！"
echo "🌐 主应用: http://localhost:3000"
echo "🎨 卡通风格: http://localhost:3001"
echo "💻 黑客风格: http://localhost:3002"
echo "✨ 简约风格: http://localhost:3003"
echo ""
echo "按 Ctrl+C 停止所有预览服务"

# 等待用户中断
trap "echo '🛑 正在停止所有预览服务...'; kill $MAIN_PID $CARTOON_PID $HACKER_PID $SIMPLE_PID; exit" INT

# 等待所有进程
wait
