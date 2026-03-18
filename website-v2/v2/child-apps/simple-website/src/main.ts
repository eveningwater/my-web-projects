// 简单风格子应用主文件
import './styles/simple.css'

// 创建应用容器
function createSimpleApp(container: HTMLElement): void {
  // 清空容器
  container.innerHTML = '';
  
  // 创建简单风格的应用内容
  const appContainer = document.createElement('div');
  appContainer.className = 'simple-app';
  appContainer.innerHTML = `
    <div class="simple-header">
      <h1>简约风格网站</h1>
      <p>简洁、优雅、高效的设计理念</p>
    </div>
    <div class="simple-content">
      <div class="feature-card">
        <div class="icon">🎯</div>
        <h3>目标明确</h3>
        <p>专注于核心功能，去除冗余元素</p>
      </div>
      <div class="feature-card">
        <div class="icon">⚡</div>
        <h3>性能优先</h3>
        <p>轻量级设计，快速加载响应</p>
      </div>
      <div class="feature-card">
        <div class="icon">🎨</div>
        <h3>视觉平衡</h3>
        <p>和谐的色彩搭配和布局设计</p>
      </div>
      <div class="feature-card">
        <div class="icon">📱</div>
        <h3>响应式</h3>
        <p>适配各种设备和屏幕尺寸</p>
      </div>
    </div>
    <div class="simple-footer">
      <p>简约而不简单，细节决定品质</p>
    </div>
  `;
  
  container.appendChild(appContainer);
}

// 导出应用函数
export default createSimpleApp;

// 如果直接运行此文件，则在页面上创建应用
if (typeof window !== 'undefined' && document.getElementById('app')) {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    createSimpleApp(appContainer);
  }
}
