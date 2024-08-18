# GeekPlus Admin

> 这是一个基于vue的admin 管理后台。它包含了基本的 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](https://github.com/geekgarry/geekplus-admin-vue-ui)


目前版本为 `v1.0+` 基于 `Vue2`, `vue-cli` 进行构建。

<p align="center">
  <b>SPONSORED BY GeekPlus</b>
</p>

## Extra

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control]()
系统使用了websocket推送消息，在src/utils/websocket.js中配置wbsocket连接地址即可，根据后台的服务地址去做详细的配置
## 相关项目

- 后端代码[geekplus-admin-springboot-api]([https://github.com/geekgarry/geekplus-admin-vue](https://github.com/geekgarry/geekplus-admin-springboot-api))

- [geekplus-admin-vue-ui](https://github.com/geekgarry/geekplus-admin-vue-ui)


有一系列的教程配套技术教程，后续都会新增：

- [Admin管理系统实践教程 Vue前端系列(vue动态路由)](https://blog.csdn.net/waiter456/article/details/129980948)
- [Admin管理系统实践教程 带你去封装一个组件 vue component](https://blog.csdn.net/waiter456/article/details/129920240)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/geekgarry/geekplus-admin-vue-ui

# 进入项目目录
cd geekplus-admin-vue-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com
# 或者安装前直接设置npm的国内镜像源
npm config set registry https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://github.com/geekgarry/geekplus-admin-vue-ui)

## Demo

![demo](https://github.com/geekgarry/geekplus-admin-vue-ui)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/geekgarry/geekplus-admin-vue-ui/blob/main/LICENSE.md) license.

Copyright (c) 2017-present GeekPlus
