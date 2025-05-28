/**
 * 一键打包js目录下的项目
 * 使用方法：node scripts/package-js-project.js [项目编号]
 * 例如：node scripts/package-js-project.js 1 - 打包js/1目录
 * 或者：node scripts/package-js-project.js all - 打包js目录下所有项目
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// 获取命令行参数
const args = process.argv.slice(2);
const projectNumber = args[0] || 'all';

// 项目根目录
const rootDir = path.resolve(__dirname, '..');
// js项目目录
const jsDir = path.resolve(rootDir, 'js');
// 输出目录
const outputDir = path.resolve(rootDir, 'dist');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * 打包单个项目
 * @param {string} projectPath - 项目路径
 * @param {string} projectName - 项目名称
 */
async function packageProject(projectPath, projectName) {
  if (!fs.existsSync(projectPath)) {
    console.error(`项目路径不存在: ${projectPath}`);
    return;
  }

  const projectOutputDir = path.join(outputDir, projectName);

  // 确保项目输出目录存在
  if (!fs.existsSync(projectOutputDir)) {
    fs.mkdirSync(projectOutputDir, { recursive: true });
  }

  // 查找项目入口文件 (例如 index.js 或 script.js)
  const htmlFilePath = path.join(projectPath, 'index.html');
  let entryPoint = null;

  if (fs.existsSync(htmlFilePath)) {
    try {
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      const cheerio = require('cheerio');
      const $ = cheerio.load(htmlContent);
      // Find local script tags, excluding external ones (http, https, //)
      $('script[src]').each((i, elem) => {
        const src = $(elem).attr('src');
        if (src && !src.startsWith('http') && !src.startsWith('//')) {
          const scriptPath = path.join(projectPath, src);
          if (fs.existsSync(scriptPath)) {
            entryPoint = scriptPath;
            return false; // Stop after finding the first local script
          }
        }
      });
    } catch (error) {
      console.error(`解析 HTML 文件失败 ${htmlFilePath}:`, error);
    }
  }

  // Fallback to old logic if no entry point found in HTML
  if (!entryPoint) {
    const entryPointIndex = path.join(projectPath, 'index.js');
    const entryPointScript = path.join(projectPath, 'script.js');

    if (fs.existsSync(entryPointIndex)) {
      entryPoint = entryPointIndex;
    } else if (fs.existsSync(entryPointScript)) {
      entryPoint = entryPointScript;
    }
  }

  if (entryPoint) {
    try {
      await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        minify: true,
        // Output file remains index.js for consistency in dist
        outfile: path.join(projectOutputDir, 'index.js'),
        platform: 'browser',
        format: 'iife',
      });
      console.log(`项目 ${projectName} 的 JS 文件构建完成 (${path.basename(entryPoint)}).`);
    } catch (error) {
      console.error(`项目 ${projectName} 的 JS 文件构建失败 (${path.basename(entryPoint)}):`, error);
    }
  } else {
    console.warn(`项目 ${projectName} 未找到 index.js 或 script.js 入口文件，跳过 JS 构建。`);
  }

  // 复制和处理其他文件 (HTML, CSS 等)
  const filesToProcess = fs.readdirSync(projectPath);
  for (const file of filesToProcess) {
    const filePath = path.join(projectPath, file);
    const fileStat = fs.statSync(filePath);
    const destPath = path.join(projectOutputDir, file);

    if (fileStat.isFile()) {
      if (file.endsWith('.html')) {
        // 复制 HTML 文件
        fs.copyFileSync(filePath, destPath);
        console.log(`复制 HTML 文件: ${file}`);
      } else if (file.endsWith('.css')) {
        // 压缩并复制 CSS 文件
        try {
          const cssContent = fs.readFileSync(filePath, 'utf8');
          const result = await esbuild.transform(cssContent, {
            loader: 'css',
            minify: true,
          });
          fs.writeFileSync(destPath, result.code);
          console.log(`压缩并复制 CSS 文件: ${file}`);
        } catch (error) {
          console.error(`压缩 CSS 文件失败 ${file}:`, error);
          // 如果压缩失败，仍然复制原始文件
          fs.copyFileSync(filePath, destPath);
          console.warn(`复制原始 CSS 文件: ${file}`);
        }
      } else if (!file.endsWith('.js')) { // 排除 JS 文件，因为已经通过 esbuild 处理
        // 复制其他非 JS/HTML/CSS 文件
        fs.copyFileSync(filePath, destPath);
        console.log(`复制文件: ${file}`);
      }
    } else if (fileStat.isDirectory()) {
        // 递归复制子目录，这里简化处理，只复制一级文件
        // 如果需要深度复制，可以使用更复杂的逻辑或第三方库
        console.warn(`项目 ${projectName} 包含子目录 ${file}，跳过复制。`);
    }
  }

  console.log(`项目 ${projectName} 构建完成: ${projectOutputDir}`);
}

/**
 * 打包所有项目
 */
async function packageAllProjects() {
  try {
    const dirs = fs.readdirSync(jsDir);
    
    for (const dir of dirs) {
      const projectPath = path.join(jsDir, dir);
      const stat = fs.statSync(projectPath);
      
      if (stat.isDirectory()) {
        await packageProject(projectPath, `js-${dir}`);
      }
    }
    
    console.log('所有项目打包完成！');
  } catch (error) {
    console.error('打包过程中出错:', error);
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('开始打包项目...');
    
    if (projectNumber === 'all') {
      await packageAllProjects();
    } else {
      const projectPath = path.join(jsDir, projectNumber);
      await packageProject(projectPath, `js-${projectNumber}`);
    }
  } catch (error) {
    console.error('打包过程中出错:', error);
  }
}

// 执行主函数
main();