// 微前端部署配置
module.exports = {
  // 主应用配置
  mainApp: {
    name: 'main-app',
    port: 3000,
    buildPath: 'main-app/dist',
    basePath: '/'
  },
  
  // 子应用配置
  childApps: [
    {
      name: 'cartoon-website',
      port: 3001,
      buildPath: 'child-apps/cartoon-website/dist',
      basePath: '/cartoon-website/',
      entry: '//localhost:3001'
    },
    {
      name: 'hacker-website',
      port: 3002,
      buildPath: 'child-apps/hacker-website/dist',
      basePath: '/hacker-website/',
      entry: '//localhost:3002'
    },
    {
      name: 'simple-website',
      port: 3003,
      buildPath: 'child-apps/simple-website/dist',
      basePath: '/simple-website/',
      entry: '//localhost:3003'
    }
  ],
  
  // 生产环境配置
  production: {
    domain: 'https://your-domain.com',
    cdn: 'https://cdn.your-domain.com',
    // 生产环境的entry地址
    entries: {
      'cartoon-website': 'https://your-domain.com/cartoon-website/',
      'hacker-website': 'https://your-domain.com/hacker-website/',
      'simple-website': 'https://your-domain.com/simple-website/'
    }
  },
  
  // 开发环境配置
  development: {
    domain: 'http://localhost',
    entries: {
      'cartoon-website': '//localhost:3001',
      'hacker-website': '//localhost:3002',
      'simple-website': '//localhost:3003'
    }
  }
};
