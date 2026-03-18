#!/bin/bash

# 微前端开发启动脚本

echo "🚀 启动微前端开发环境..."

# 启动主应用
echo "📱 启动主应用 (端口 3000)..."
cd main-app && pnpm dev &
MAIN_PID=$!

# 等待主应用启动
sleep 3

# 启动卡通风格子应用
echo "🎨 启动卡通风格子应用 (端口 3001)..."
cd ../child-apps/cartoon-website && pnpm dev &
CARTOON_PID=$!

# 启动黑客风格子应用
echo "💻 启动黑客风格子应用 (端口 3002)..."
cd ../hacker-website && pnpm dev &
HACKER_PID=$!

# 启动简约风格子应用
echo "✨ 启动简约风格子应用 (端口 3003)..."
cd ../simple-website && pnpm dev &
SIMPLE_PID=$!

echo ""
echo "✅ 所有应用已启动！"
echo "🌐 主应用: http://localhost:3000"
echo "🎨 卡通风格: http://localhost:3001"
echo "💻 黑客风格: http://localhost:3002"
echo "✨ 简约风格: http://localhost:3003"
echo ""
echo "按 Ctrl+C 停止所有应用"

# 等待用户中断
trap "echo '🛑 正在停止所有应用...'; kill $MAIN_PID $CARTOON_PID $HACKER_PID $SIMPLE_PID; exit" INT

# 等待所有进程
wait
