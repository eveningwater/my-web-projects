// 全局类型定义
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __MICRO_APP_ENVIRONMENT__?: boolean;
    __FEDERATION__?: {
      loadRemoteModule: (options: {
        remote: string;
        module: string;
      }) => Promise<any>;
    };
  }
}

export {};
