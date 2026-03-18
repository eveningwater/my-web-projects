// 使用 Module Federation 的微前端实现
interface RemoteApp {
  name: string;
  url: string;
  module: string;
}

const remoteApps: RemoteApp[] = [
  {
    name: 'cartoon-website',
    url: 'http://localhost:3001',
    module: 'cartoon-website/App'
  },
  {
    name: 'hacker-website',
    url: 'http://localhost:3002',
    module: 'hacker-website/App'
  },
  {
    name: 'simple-website',
    url: 'http://localhost:3003',
    module: 'simple-website/App'
  },
];

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  // 延迟加载默认应用，等待 Module Federation 初始化
  setTimeout(() => {
    loadDefaultApp();
  }, 1000);
});

// 初始化标签页功能
function initTabs(): void {
  const folder = document.getElementById('folder') as HTMLElement;
  const tabs = document.getElementById('tabs') as HTMLElement;
  const tabItems = tabs.querySelectorAll('.tabs-item');

  if (!folder || !tabs) return;

  // 文件夹点击事件
  folder.addEventListener('click', () => {
    folder.classList.toggle('active');
    tabs.classList.toggle('active');
  });

  // 标签页点击事件
  tabItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tabs-item')) {
        // 移除所有active状态
        tabItems.forEach(tab => tab.classList.remove('active'));
        // 添加当前active状态
        target.classList.add('active');

        // 获取应用名称并切换
        const appName = target.getAttribute('data-app');
        if (appName) {
          switchMicroApp(appName);
        }
      }
    });
  });

  // 点击非tab区域折叠tab面板
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const isTabArea = target.closest('.tabs-container');
    
    if (!isTabArea && tabs.classList.contains('active')) {
      folder.classList.remove('active');
      tabs.classList.remove('active');
    }
  });
}

async function loadApp(appName: string): Promise<void> {
  const container = document.getElementById('child-app-container');
  if (!container) return;

  try {
    // 清空容器
    container.innerHTML = '';
    
    // 查找对应的远程应用配置
    const remoteApp = remoteApps.find(app => app.name === appName);
    if (!remoteApp) {
      throw new Error(`应用 ${appName} 未找到`);
    }

    // 动态加载远程模块
    const module = await loadRemoteModule(remoteApp.module);
    console.log('加载的模块:', module);
    
    // 检查模块的导出
    if (module && typeof module.default === 'function') {
      // 直接调用子应用的渲染函数，传入容器
      console.log('调用子应用的默认导出函数');
      module.default(container);
    } else if (module && typeof module === 'function') {
      // 如果模块本身就是函数
      console.log('调用子应用模块函数');
      module(container);
    } else if (module && module.createCartoonApp && typeof module.createCartoonApp === 'function') {
      // 检查是否有命名导出
      console.log('调用子应用的命名导出函数');
      module.createCartoonApp(container);
    } else {
      // 如果模块没有导出函数，则创建一个简单的容器
      console.log('使用默认容器');
      container.innerHTML = `<div class="app-container" data-app="${appName}">
        <h2>${appName}</h2>
        <p>应用加载成功</p>
        <p>模块内容: ${JSON.stringify(module, null, 2)}</p>
      </div>`;
    }

    console.log(`应用 ${appName} 加载成功`);
  } catch (error: unknown) {
    console.error(`加载应用 ${appName} 失败:`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    container.innerHTML = `<div class="error-container">
      <h3>加载失败</h3>
      <p>应用 ${appName} 加载失败: ${errorMessage}</p>
      <p>请确保子应用正在运行，并且端口配置正确。</p>
      <p>子应用地址:</p>
      <ul>
        <li>卡通风格: http://localhost:3001</li>
        <li>黑客风格: http://localhost:3002</li>
        <li>简单风格: http://localhost:3003</li>
      </ul>
    </div>`;
  }
}

// 动态加载远程模块
async function loadRemoteModule(moduleName: string): Promise<any> {
  try {
    // 等待 Module Federation 初始化
    let retryCount = 0;
    const maxRetries = 50; // 最多等待5秒
    
    while (!window.__FEDERATION__ && retryCount < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retryCount++;
    }
    
    // 检查是否在生产环境中使用 Module Federation
    if (window.__FEDERATION__) {
      // 生产环境：使用 Module Federation
      const module = await window.__FEDERATION__.loadRemoteModule({
        remote: moduleName.split('/')[0],
        module: moduleName.split('/')[1]
      });
      return module;
    } else {
      // 开发环境：尝试直接加载子应用模块
      const appName = moduleName.split('/')[0];
      const remoteApp = remoteApps.find(app => app.name === appName);
      
      if (remoteApp) {
        try {
          // 在开发模式下，尝试直接导入子应用的模块
          // 这需要子应用在开发模式下也配置 Module Federation
          const module = await import(/* @vite-ignore */ `${remoteApp.url}/src/main.ts`);
          return module;
        } catch (importError) {
          console.warn(`开发模式：无法直接加载子应用 ${appName}，尝试其他方式`);
          
          // 如果直接导入失败，尝试通过 fetch 获取并动态执行
          try {
            const response = await fetch(`${remoteApp.url}/src/main.ts`);
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            // 创建一个动态模块
            const dynamicModule = {
              default: (container: HTMLElement) => {
                // 这里可以尝试动态执行代码，但为了安全起见，我们显示一个提示
                container.innerHTML = `
                  <div class="dev-placeholder" style="
                    padding: 40px;
                    text-align: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 12px;
                    margin: 20px;
                  ">
                    <h2>🚧 开发模式</h2>
                    <p>子应用 <strong>${appName}</strong> 正在开发中</p>
                    <p>请确保子应用正在运行：<code>${remoteApp.url}</code></p>
                    <p>或者构建子应用以使用 Module Federation</p>
                    <div style="margin-top: 20px;">
                      <a href="${remoteApp.url}" target="_blank" style="
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 2px solid white;
                        border-radius: 6px;
                        display: inline-block;
                      ">在新窗口打开子应用</a>
                    </div>
                  </div>
                `;
              }
            };
            
            return dynamicModule;
          } catch (fetchError) {
            console.error(`无法获取子应用 ${appName} 的代码:`, fetchError);
            throw new Error(`开发模式：无法加载子应用 ${appName}`);
          }
        }
      } else {
        throw new Error(`未知的应用: ${appName}`);
      }
    }
  } catch (error) {
    console.error(`加载模块 ${moduleName} 失败:`, error);
    throw error;
  }
}

// 动态加载脚本
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查脚本是否已经加载
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

// 加载默认应用
function loadDefaultApp(): void {
  loadApp('cartoon-website');
}

// 切换微应用
function switchMicroApp(appName: string): void {
  loadApp(appName);
}

// 监听浏览器前进后退
window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  const container = document.getElementById('app-container');
  if (!container) return;

  // 根据路径切换应用
  if (path.includes('cartoon-website')) {
    switchMicroApp('cartoon-website');
    updateActiveTab('cartoon-website');
  } else if (path.includes('hacker-website')) {
    switchMicroApp('hacker-website');
    updateActiveTab('hacker-website');
  } else if (path.includes('simple-website')) {
    switchMicroApp('simple-website');
    updateActiveTab('simple-website');
  } else {
    switchMicroApp('cartoon-website');
    updateActiveTab('cartoon-website');
  }
});

// 更新激活的标签页
function updateActiveTab(appName: string): void {
  const tabItems = document.querySelectorAll('.tabs-item');
  tabItems.forEach((item) => {
    const target = item as HTMLElement;
    if (target.getAttribute('data-app') === appName) {
      target.classList.add('active');
    } else {
      target.classList.remove('active');
    }
  });
}
