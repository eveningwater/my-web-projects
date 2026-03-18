#!/bin/bash

echo "🚀 启动微前端框架 v2..."

# 检查是否安装了 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ 错误: 未找到 pnpm，请先安装 pnpm"
    echo "安装命令: npm install -g pnpm"
    exit 1
fi

# 检查端口是否被占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  警告: 端口 $port 已被占用"
        return 1
    fi
    return 0
}

echo "🔍 检查端口占用情况..."
check_port 3000 || echo "   端口 3000 (主应用) - 已占用"
check_port 3001 || echo "   端口 3001 (卡通风格应用) - 已占用"
check_port 3002 || echo "   端口 3002 (黑客风格应用) - 已占用"
check_port 3003 || echo "   端口 3003 (简单风格应用) - 已占用"

echo ""
echo "📦 安装依赖..."
pnpm install

echo ""
echo "🌐 启动所有应用..."
echo "   主应用: http://localhost:3000"
echo "   卡通风格应用: http://localhost:3001"
echo "   黑客风格应用: http://localhost:3002"
echo "   简单风格应用: http://localhost:3003"
echo ""

# 启动所有应用
pnpm dev &

# 等待应用启动
echo "⏳ 等待应用启动..."
sleep 5

# 检查应用状态
echo "🔍 检查应用状态..."
for port in 3000 3001 3002 3003; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "✅ 端口 $port - 运行中"
    else
        echo "❌ 端口 $port - 未运行"
    fi
done

echo ""
echo "🎉 微前端框架启动完成！"
echo "📱 访问主应用: http://localhost:3000"
echo ""
echo "💡 提示:"
echo "   - 按 Ctrl+C 停止所有应用"
echo "   - 使用 'pnpm dev:main' 单独启动主应用"
echo "   - 使用 'pnpm dev:cartoon' 单独启动卡通风格应用"
echo "   - 使用 'pnpm dev:hacker' 单独启动黑客风格应用"
echo "   - 使用 'pnpm dev:simple' 单独启动简单风格应用"
echo ""
echo "🔧 开发命令:"
echo "   pnpm dev          # 启动所有应用"
echo "   pnpm build        # 构建所有应用"
echo "   pnpm preview      # 预览所有应用"

# 等待用户中断
wait
