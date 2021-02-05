# mobile-model 移动端脚手架

```
.
├── LICENSE
├── README.md
├── babel.config.js
├── jsconfig.json
├── package.json
├── postcss.config.js
├── public
│   ├── index.html
│   └── static
│       ├── js
│       │   ├── rem.js
│       │   └── vconsole.min.js
│       └── style
│           └── reset.css
├── src
│   ├── App.vue
│   ├── api                             // api能力统一封装
│   │   ├── http
│   │   │   ├── errorHandle.js          // 请求错误处理
│   │   │   ├── httpConfig.js           // axios基础配置
│   │   │   ├── httpInterceptors.js     // axios拦截器
│   │   │   ├── httpProxy.js            // 请求代理层
│   │   │   └── index.js                // http出口
│   │   ├── route                       // 请求路由
│   │   │   └── common.js               // 通用请求
│   │   └── index.js                    // 请求
│   ├── assets                          // 静态资源
│   │   └── logo.png
│   ├── components
│   │   ├── common                      // 基础通用组件
│   │   │   ├── WKeepAlive.jsx          // 重写keepAlive组件
│   │   │   └── WLoading                // loading组件
│   │   │       ├── WLoading.vue
│   │   │       ├── install.js
│   │   │       └── service.js
│   │   └── install.js                  // 组件全局安装
│   ├── config                          // 全局配置文件
│   │   ├── index.js
│   │   ├── reg.js
│   │   └── select.js
│   ├── decorate                        // 装饰器
│   │   └── index.js
│   ├── main.js
│   ├── mixins                          // 混入
│   │   └── global.js                   // 全局混入
│   ├── native                          // 原生能力封装
│   │   └── index.js
│   ├── pages                           // 页面
│   │   ├── home
│   │   │   ├── index.scss
│   │   │   └── index.vue
│   │   ├── page2
│   │   │   └── index.vue
│   │   └── test
│   │       └── index.vue
│   ├── plugins                         // 插件
│   │   └── vant.js
│   ├── router                          // 路由
│   │   ├── index.js
│   │   ├── pages                       // 业务路由引入
│   │   │   └── indexPages.js
│   │   ├── utils.js                    // 路由相关工具类
│   │   └── wrapper.js                  // 路由包装
│   ├── service                         // 服务类
│   │   ├── debug.service.js            // 主要引入vconsole
│   │   ├── message.service.js          // 封装全局message
│   │   └── utils.service.js            // 工具类
│   ├── store                           // 状态
│   │   ├── index.js
│   │   ├── modules
│   │   │   ├── deviceInfo.js           // 设备信息
│   │   │   ├── routeHistory.js         // 路由缓存
│   │   │   └── userInfo.js             // 用户信息
│   │   ├── plugins                     // vuex 插件
│   │   │   └── local.js
│   │   └── types.js
│   └── style                           // 公共样式
│       ├── _app.color.scss
│       ├── _app.fn.scss
│       ├── _app.mixin.scss
│       └── app.base.scss
├── tests
│   └── unit
│       └── example.spec.js
├── vue.config.js
└── yarn.lock

```

✅ 路由，回退缓存

✅ 路由，重写router.push，加入原生跳转能力 `router.query.webview`  true为原生跳转

✅ httpProxy 针对多个重复get请求只返回一种结果

❌ 全局主题色改变
