// 黑客风格子应用主文件
import './styles/hacker.css'

// 创建应用容器
function createHackerApp(container: HTMLElement): void {
  // 清空容器
  container.innerHTML = '';
  
  // 创建黑客风格的应用内容
  const appContainer = document.createElement('div');
  appContainer.className = 'hacker-app';
  appContainer.innerHTML = `
    <div class="hacker-header">
      <h1 class="glitch" data-text="HACKER WEBSITE">HACKER WEBSITE</h1>
      <p class="terminal-text">> 欢迎进入黑客世界...</p>
    </div>
    <div class="hacker-content">
      <div class="terminal-window">
        <div class="terminal-header">
          <span class="terminal-button red"></span>
          <span class="terminal-button yellow"></span>
          <span class="terminal-button green"></span>
        </div>
        <div class="terminal-body">
          <p class="command">$ whoami</p>
          <p class="output">hacker@matrix:~$</p>
          <p class="command">$ ls -la</p>
          <p class="output">drwxr-xr-x 2 hacker hacker 4096 Dec 25 10:00 .</p>
          <p class="output">drwxr-xr-x 3 hacker hacker 4096 Dec 25 10:00 ..</p>
          <p class="output">-rw-r--r-- 1 hacker hacker  220 Dec 25 10:00 .bash_logout</p>
          <p class="command">$ cat skills.txt</p>
          <p class="output">• 渗透测试</p>
          <p class="output">• 逆向工程</p>
          <p class="output">• 网络安全</p>
          <p class="output">• 代码审计</p>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(appContainer);
}

// 导出应用函数
export default createHackerApp;

// 如果直接运行此文件，则在页面上创建应用
if (typeof window !== 'undefined' && document.getElementById('app')) {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    createHackerApp(appContainer);
  }
}
