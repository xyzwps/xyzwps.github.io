type Feature = {
  /**
   * 支持的平台
   */
  platforms: ("mac" | "win" | "linux")[];
  /**
   * 收费情况
   */
  pricing: "free" | "paid" | "both";
  /**
   * 是否开源
   */
  openSouce: boolean;
  /**
   * 是否可以在离线环境中使用
   */
  offline: boolean;
  /**
   * 是否支持 git 管理 API
   */
  gitSupport: boolean;
  /**
   * 是否支持导入数据
   */
  import: boolean;
  /**
   * 是否支持导出数据
   */
  export: boolean;
  /**
   * 是否支持密钥管理
   */
  secretManagement: boolean;
  /**
   * 是否支持历史记录
   */
  history: boolean;
  /**
   * 是否支持时间线
   */
  timeline: boolean;
  /**
   * 是否支持变量
   */
  variables: boolean;
  /**
   * 是否支持测试
   */
  testSupport:
    | false
    | {
        /**
         * 是否支持使用命令行执行测试用例
         */
        commandLine: boolean;
      };
  /**
   * 支持的规范
   */
  specs: {
    openapi: boolean;
    graphql: boolean;
  };
};

type ApiClient = {
  name: string;
  url: string;
  features: Feature;
};

const CLIENTS: ApiClient[] = [
  {
    name: "Bruno",
    url: "https://www.usebruno.com/",
    features: {
      platforms: ["mac", "win", "linux"],
      pricing: "both",
      openSouce: true,
      offline: true,
      gitSupport: true,
      import: true,
      export: true,
      history: true,
      secretManagement: true,
      timeline: true,
      testSupport: {
        commandLine: true,
      },
      specs: {
        openapi: true,
        graphql: true,
      },
    },
  },
];

// - https://www.postman.com/
// - https://reqable.com/zh-CN/
// - https://hoppscotch.io/
// -
// - https://insomnia.rest/
// - https://apifox.com/
// - https://katalon.com/

// https://marketplace.visualstudio.com/items?itemName=humao.rest-client

//   - [ ] 免费版
//   - [ ] 收费版
//   - [ ] 开源
//   - [ ] 抓包
//   - [ ] 环境
//   - [ ] 全平台
//   - [ ] 是否需要登录才能使用
//   - [ ] 测试
//   - 支持协议
//     - [ ] HTTP 1
//     - [ ] HTTP 2
//     - [ ] HTTP 3
//     - [ ] WebSocket
//     - [ ] gRPC
//   - 支持规范
//     - [ ] OpenAPI
//     - [ ] GraphQL
