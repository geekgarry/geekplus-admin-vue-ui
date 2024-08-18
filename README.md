# geekplus-admin-vue-ui

English | [简体中文](./README-zh.md)

> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint

**Live demo:** https://github.com/geekgarry/geekplus-admin-vue-ui


**The current version is `v1.0+` build on `Vue2`, `vue-cli`.

<p align="center">
  <b>SPONSORED BY GeekPlus</b>
</p>

## Build Setup

```bash
# clone the project
git clone https://github.com/geekgarry/geekplus-admin-vue-ui

# enter the project directory
cd geekplus-admin-vue-ui

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://github.com/geekgarry/geekplus-admin-vue-ui) for more information

## Demo

![demo](https://github.com/geekgarry/geekplus-admin-vue-ui)

## Extra

If you want router permission && generate menu by user roles , you can use this branch [permission-control]()

For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))
The peoject uses websocket to push messages. Simply configure the wbsocket connection address in src/utils/websocket. js and perform detailed configuration based on the backend service address
## Related Project

- [geekplus-admin-springboot-api]([https://github.com/geekgarry/geekplus-admin-vue](https://github.com/geekgarry/geekplus-admin-springboot-api))

- [geekplus-admin-vue](https://github.com/geekgarry/geekplus-admin-vue)

- [electron-vue-admin]()

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/geekgarry/geekplus-admin-vue-ui/blob/main/LICENSE.md) license.

Copyright (c) 2023-present GeekPlus
