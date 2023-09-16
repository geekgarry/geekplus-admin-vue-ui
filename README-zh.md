# GeekPlus Admin

> 这是一个基于vue的admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[线上地址](https://github.com/geekgarry/geekplus-admin-vue-ui)


目前版本为 `v4.0+` 基于 `vue-cli` 进行构建。

<p align="center">
  <b>SPONSORED BY</b>
</p>
<p align="center">
   <a href="https://finclip.com?from=vue_element" title="FinClip" target="_blank">
      <!-- <img height="200px" src="https://github.com/geekgarry/geekplus-admin-vue-ui" title="FinClip"> -->
   </a>
</p>

## Extra

如果你想要根据用户角色来动态生成侧边栏和 router，你可以使用该分支[permission-control]()
系统使用了websocket推送消息，在src/utils/websocket.js中配置wbsocket连接地址即可，根据后台的服务地址去做详细的配置
## 相关项目

- 后端代码[geekplus-admin-springboot-api]([https://github.com/geekgarry/geekplus-admin-vue](https://github.com/geekgarry/geekplus-admin-springboot-api))
- 
- [geekplus-admin-vue](https://github.com/geekgarry/geekplus-admin-vue)

- [geekplus-admin-vue-ui](https://github.com/geekgarry/geekplus-admin-vue-ui)


写了一个系列的教程配套文章，如何从零构建后一个完整的后台项目:

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板,专门针对本项目的文章,算作是一篇文档)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/geekgarry/geekplus-admin-vue-ui

# 进入项目目录
cd geekplus-admin-vue-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

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

Copyright (c) 2017-present PanJiaChen
