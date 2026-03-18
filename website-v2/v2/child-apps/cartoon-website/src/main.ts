// @ts-ignore
import masterCss from "./assets/styles/master.css?raw";

// 修复：getBaseUrl 应该在使用前定义
function getBaseUrl(): string {
  // 检查是否在主应用环境中运行
  if (window.location.hostname === "localhost" && window.location.port === "3000") {
    // 在主应用中运行，使用子应用的端口
    return "http://localhost:3001";
  } else if (window.location.hostname === "localhost" && window.location.port === "3001") {
    // 在子应用中独立运行
    return "http://localhost:3001";
  }
  return ".";
}

// 获取正确的资源基础路径
function getAssetsBaseUrl(): string {
  const baseUrl = getBaseUrl();
  // 在主应用环境中，需要指向子应用的构建输出目录
  if (window.location.hostname === "localhost" && window.location.port === "3000") {
    return `${baseUrl}/assets`;
  }
  return `${baseUrl}/src/assets`;
}

const fixedMasterCss = masterCss.replaceAll(
  "../",
  getAssetsBaseUrl() + "/"
);

// 可以将 fixedMasterCss 用于后续样式注入等操作

// 全局类型定义
declare global {
  interface Window {
    createCarnival: any;
    jQuery: any;
  }
}

// 创建子应用所需的DOM结构
function createAppDOM(container: HTMLElement): void {
  // 清空容器
  container.innerHTML = "";
  document.body.setAttribute("id", "teaser-page");

  const createElement = (str: string) => {
    const element = document.createElement("div");
    element.innerHTML = str;
    return element.firstElementChild as HTMLElement;
  };

  // 创建卡通风格的应用内容
  const template = `
   <button id="moveBtn" type="button" class="move-btn">
        <svg t="1715099275457" class="move-btn-icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5911" width="200" height="200">
            <path
                d="M901 512c0 19.1-1.3 38.1-3.8 57 0.4-2.7 0.7-5.3 1.1-8-5 36.2-14.6 71.5-28.7 105.2l3-7.2c-8.6 20.3-18.7 39.9-30.3 58.7-5.8 9.3-11.9 18.4-18.4 27.2-1.6 2.1-3.1 4.2-4.7 6.3 6.7-8.8 0.6-0.9-1 1.2-3.5 4.4-7.2 8.8-10.9 13.1-14.3 16.5-30 31.8-46.6 45.9-4 3.4-8.1 6.7-12.2 9.9-4.2 3.3 6.2-4.7 1.9-1.5-1 0.8-2.1 1.6-3.1 2.4-2.5 1.8-4.9 3.6-7.4 5.4-8.9 6.4-18.1 12.4-27.5 18-17 10.2-34.8 19.2-53.1 26.9l7.2-3c-33.7 14.1-69 23.7-105.2 28.7 2.7-0.4 5.3-0.7 8-1.1-37.8 5.1-76.1 5.1-113.9 0 2.7 0.4 5.3 0.7 8 1.1-36.2-5-71.5-14.6-105.2-28.7l7.2 3c-20.3-8.6-39.9-18.7-58.7-30.3-9.3-5.8-18.4-11.9-27.2-18.4-2.1-1.6-4.2-3.1-6.3-4.7 8.8 6.7 0.9 0.6-1.2-1-4.4-3.5-8.8-7.2-13.1-10.9-16.5-14.3-31.8-30-45.9-46.6-3.4-4-6.7-8.1-9.9-12.2-3.3-4.2 4.7 6.2 1.5 1.9-0.8-1-1.6-2.1-2.4-3.1-1.8-2.5-3.6-4.9-5.4-7.4-6.4-8.9-12.4-18.1-18 27.5 10.2 17 19.2 34.8 26.9 53.1l3 7.2c-14.1-33.7-23.7-69-28.7-105.2 0.4 2.7 0.7 5.3 1.1 8-5.1-37.8-5.1-76.1 0-113.9-0.4 2.7-0.7 5.3-1.1 8 5-36.2 14.6-71.5 28.7-105.2l-3 7.2c8.6-20.3 18.7-39.9 30.3-58.7 5.8-9.3 11.9-18.4 18.4-27.2 1.6-2.1 3.1-4.2 4.7-6.3-6.7 8.8-0.6 0.9 1-1.2 3.5-4.4 7.2-8.8 10.9-13.1 14.3-16.5 30-31.8 46.6-45.9 4-3.4 8.1-6.7 12.2-9.9 4.2-3.3-6.2 4.7-1.9 1.5 1-0.8 2.1-1.6 3.1-2.4 2.5-1.8 4.9-3.6 7.4-5.4 8.9-6.4 18.1-12.4 27.5-18 17-10.2 34.8-19.2 53.1-26.9l-7.2 3c33.7-14.1 69-23.7 105.2-28.7-2.7 0.4-5.3 0.7-8 1.1 37.8-5.1 76.1-5.1 113.9 0-2.7-0.4-5.3-0.7-8-1.1 36.2 5 71.5 14.6 105.2 28.7l-7.2-3c20.3 8.6 39.9 18.7 58.7 30.3 9.3 5.8 18.4 11.9 27.2 18.4 2.1 1.6 4.2 3.1 6.3 4.7-8.8-6.7-0.9-0.6 1.2 1 4.4 3.5 8.8 7.2 13.1 10.9 16.5 14.3 31.8 30 45.9 46.6 3.4 4 6.7 8.1 9.9 12.2 3.3 4.2-4.7-6.2-1.5-1.9 0.8 1 1.6 2.1 2.4 3.1 1.8 2.5 3.6 4.9 5.4 7.4 6.4 8.9 12.4 18.1 18 27.5 10.2 17 19.2 34.8 26.9 53.1l-3-7.2c14.1 33.7 23.7 69 28.7 105.2-0.4-2.7-0.7-5.3-1.1-8 2.5 18.8 3.8 37.8 3.8 56.9 0 16.4 13.6 30 30 30 16.3 0 30-13.6 30-30-0.2-94.3-30.1-188.3-86.2-264.3C818.4 171.3 740 114.1 649.6 84.5c-90.9-29.7-192.5-28.6-282.8 2.6-89.9 31-167 89.8-222.2 167-55 76.9-83.2 172.1-81.5 266.4 1.7 94 33.5 187.4 90.8 262.1 29.4 38.4 63.7 71.4 103.4 99.1 37.9 26.5 80.6 46.7 124.8 60.2 91.4 27.9 193 25.2 282.7-7.7C754 901.5 830.2 841.7 884 763.4c50.4-73.4 76.9-162.6 77-251.4 0-16.4-13.7-30-30-30-16.4 0-30 13.6-30 30z"
                fill="#eb2011" p-id="5912"></path>
            <path
                d="M724 716c-23.8 0-40.2-19.9-48.8-34.2 45.2-45.1 73.2-107.5 73.2-176.5 0-137.6-111.6-249.2-249.2-249.2-137.7 0.1-249.2 111.7-249.2 249.3s111.6 249.2 249.2 249.2c45.8 0 88.8-12.4 125.7-34 24.1 33.6 78.4 47.2 78.4 47.2H774V716h-50zM363.3 573.4c-37.5 0-68-30.4-68-68 0-37.5 30.4-68 68-68 37.5 0 68 30.4 68 68-0.1 37.6-30.5 68-68 68z m136.1 136.1c-37.5 0-68-30.4-68-68 0-37.5 30.4-68 68-68 37.5 0 68 30.4 68 68-0.1 37.6-30.5 68-68 68z m-36-204.1c0-19.8 16.1-35.9 35.9-35.9 19.8 0 35.9 16.1 35.9 35.9 0 19.8-16.1 35.9-35.9 35.9-19.8 0.1-35.9-16-35.9-35.9z m36-73.4c-37.5 0-68-30.4-68-68 0-37.5 30.4-68 68-68 37.5 0 68 30.4 68 68-0.1 37.6-30.5 68-68 68z m73.4 73.4c0-37.5 30.4-68 68-68 37.5 0 68 30.4 68 68 0 37.5-30.4 68-68 68s-68-30.4-68-68z"
                fill="#eb2011" p-id="5913"></path>
        </svg>
        点击我有惊喜哦
    </button>
  `;

  const template2 = `
  <div class="l-stage">
        <main>
            <div class="l-intro">
                <div class="intro-btn-skip"><a id="s_st" href="#">S_ST</a></div>
            </div>
            <div class="l-main">
                <div class="l-first">
                    <div class="first-bg"></div>
                    <div class="first-flare-wrap">
                        <div class="first-flare01"></div>
                        <div class="first-flare02"></div>
                    </div>
                    <div class="first-megumi-back"></div>
                    <div class="first-megumi-front"></div>
                    <div class="first-text-wrap">
                        <div class="first-text-main">
                            <img src="${getAssetsBaseUrl()}/images/main_text.png" width="416" height="442" class="pcv" alt="主标题">
                            <img src="${getAssetsBaseUrl()}/images/main_text_sp.png" class="spv" alt="主标题移动端">
                        </div>
                        <div class="first-text">
                            <span class="t1"></span>
                            <span class="t2"></span>
                            <span class="t3"></span>
                            <span class="t4"></span>
                            <span class="t5"></span>
                            <span class="t6"></span>
                            <span class="t7"></span>
                            <span class="t8"></span>
                            <span class="t9"></span>
                            <span class="t10"></span>
                            <span class="t11"></span>
                            <span class="t12"></span>
                            <span class="t13"></span>
                            <span class="t14"></span>
                            <span class="t15"></span>
                            <span class="t16"></span>
                            <span class="t17"></span>
                            <span class="t18"></span>
                            <span class="t19"></span>
                            <span class="t20"></span>
                            <span class="t21"></span>
                            <span class="t22"></span>
                            <span class="t23"></span>
                            <span class="t24"></span>
                            <span class="t25"></span>
                            <span class="t26"></span>
                            <span class="t27"></span>
                            <span class="t28"></span>
                            <span class="t29"></span>
                            <span class="t30"></span>
                            <span class="t31"></span>
                        </div>
                    </div>
                    <div class="sakura-front">
                        <div class="sakura-front-l"></div>
                        <div class="sakura-front-m"></div>
                        <div class="sakura-front-s"></div>
                    </div>
                </div>
                <div class="l-fix"></div>
                <div class="l-second">
                    <div class="sakura-back">
                        <div class="sakura-back-l"></div>
                        <div class="sakura-back-m"></div>
                        <div class="sakura-back-s"></div>
                    </div>
                    <div class="l-news-wrap">
                        <h2 class="l-news-title">夕水的个人网页</h2>
                        <div class="l-news">
                            <div class="news-btn-more">
                                <a target="_blank" href="https://www.eveningwater.com/my-web-projects/">个人项目↗</a>
                            </div>
                            <div class="link-btn-1st_site">
                                <a target="_blank"
                                    href="https://www.eveningwater.com/docs/index.html?type=html">文档站点↗</a>
                            </div>
                            <div class="link-btn-radio">
                                <a target="_blank" href="https://eveningwater.github.io/to-offer/#/">剑指offer↗</a>
                            </div>
                        </div>
                        <div class="l-twitter">
                            <div class="twitter-btn-more">
                                <a target="_blank" href="https://eveningwater.github.io/">博客站点↗</a>
                            </div>
                            <div class="link-btn-1st_site">
                                <a target="_blank" href="https://eveningwater.github.io/ew-color-picker/">颜色选择器↗</a>
                            </div>
                            <div class="link-btn-radio">
                                <a target="_blank" href="https://eveningwater.github.io/code-segment/#/">代码段↗</a>
                            </div>

                        </div>
                    </div>
                    <footer class="l-footer">
                        <p class="footer-copy">Copyright © 2024 eveningwater All Rights Reserved</p>
                    </footer>
                </div>
            </div>
        </main>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = fixedMasterCss;
  document.head.appendChild(style);
  container.appendChild(createElement(template));
  container.appendChild(createElement(template2));
}

// 渲染函数 - Garfish会调用这个函数
export function render() {
  initCartoonApp();
}

// 初始化卡通应用
function initCartoonApp() {
  // 等待DOM完全加载
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      loadExternalScripts();
    });
  } else {
    // 如果DOM已经加载完成，延迟一下确保所有元素都准备好
    setTimeout(() => {
      loadExternalScripts();
    }, 100);
  }
}

// 加载外部脚本
function loadExternalScripts() {
  // 检查脚本是否已经加载
  if (window.createCarnival) {
    initMoveButton();
    return;
  }

  const assetsBaseUrl = getBaseUrl();

  // 按顺序加载脚本 - 使用正确的URL
  loadScript(`${assetsBaseUrl}/src/assets/scripts/create-carnival.min.js`, () => {
    loadScript(`${assetsBaseUrl}/src/assets/scripts/libs.min.js`, () => {
      loadScript(`${assetsBaseUrl}/src/assets/scripts/functions.min.js`, () => {
        setTimeout(() => {
          initMoveButton();
        }, 200);
      });
    });
  });
}

// 动态加载脚本
function loadScript(src: string, callback: () => void) {
  // 检查脚本是否已经存在
  const existingScript = document.querySelector(`script[src="${src}"]`);
  if (existingScript) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.type = "text/javascript";
  // script.defer = true;
  script.onload = callback;
  script.onerror = (error) => {
    console.error(`Failed to load script: ${src}`, error);
    // 即使失败也继续执行，避免阻塞
    callback();
  };
  document.body.appendChild(script);
}

// 初始化移动按钮
function initMoveButton() {
  try {
    // 等待DOM元素完全加载
    const waitForElement = (
      selector: string,
      callback: (element: Element) => void
    ) => {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
      } else {
        // 使用MutationObserver等待元素出现
        const observer = new MutationObserver(() => {
          const element = document.querySelector(selector);
          if (element) {
            observer.disconnect();
            callback(element);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };

    waitForElement("#moveBtn", (moveBtn) => {
      if (window.createCarnival) {
        let flag = false;
        let instance: any;

        moveBtn.addEventListener("click", () => {
          flag = !flag;
          if (flag) {
            try {
              instance = window.createCarnival();
              console.log("createCarnival 启动成功");
            } catch (error) {
              console.error("createCarnival 启动失败:", error);
            }
          } else if (instance && instance.destory) {
            try {
              instance.destory();
              console.log("createCarnival 销毁成功");
            } catch (error) {
              console.error("createCarnival 销毁失败:", error);
            }
          }
        });

        console.log("移动按钮初始化成功");
      } else {
        console.warn("createCarnival 函数未找到，移动按钮功能不可用");
      }
    });
  } catch (error) {
    console.error("初始化移动按钮时出错:", error);
  }
}

// Module Federation 导出函数 - 创建完整的应用
function createCartoonApp(container: HTMLElement): void {
  createAppDOM(container);
  setTimeout(() => {
    render();
  }, 200);
}

export default createCartoonApp;

// 如果直接运行此文件，则在页面上创建应用
if (
  typeof window !== "undefined" &&
  !document.getElementById("child-app-container")
) {
  createAppDOM(document.body);
  setTimeout(() => {
    render();
  }, 200);
}
