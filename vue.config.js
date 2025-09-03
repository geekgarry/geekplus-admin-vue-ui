'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const express = require('express')
const webpack = require("webpack")
function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|txt|html|ico|svg)(\?.*)?$/i;
const TerserPlugin = require('terser-webpack-plugin');

const name = defaultSettings.title || 'geekplus-admin' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.PORT || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    client: {
      // webSocketURL: 'ws://0.0.0.0:8898/ws',
      progress: true,
      overlay: false,
    },
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:9002`,//后端URI地址，https端口8443
        ws: false, // 这里把ws代理给关闭
        changeOrigin: true,
        // proxyTimeout: 11000,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      // 再配置后端资源的跨域代理访问，/profile为后端配置静态资源映射的虚拟路径，
      // 配置了之后就不用在访问后端文件资源是需要带上之前配置的process.env.VUE_APP_BASE_API代理api头
      // 我这里是跟随我后端的WebMVC配置的静态资源映射里的统一的资源访问地址
      '/profile': {
        target: `http://127.0.0.1:9002`,//后端URI地址，https端口8443
        changeOrigin: true,
        pathRewrite: {
          '^/profile': '/profile'
        }
      },
      // "/api": {
      //     target: "https://api.url",
      //     changeOrigin: true,
      //     pathRewrite: {
      //       "^/api": ''
      //     }
      // }
    },
  },
  css: {
    sourceMap: true,
    extract: false,
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ],
    //使用TerserPlugin做压缩
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            parse: {
              ecma: 2020, // 允许解析 ES2020+ 语法
            },
            compress: {
              ecma: 2015, // 压缩时转成 ES2015
              drop_console: true,
              drop_debugger: true,
              // 防止URL被压缩
              unsafe: false,
              // 防止URL中的特殊字符被转义
              unsafe_regexp: false,
              // 防止URL中的查询参数被优化
              unsafe_methods: false
            },
            format: {
              ecma: 2015, // 输出 ES2015
            },
            mangle: {
              // 保留属性名
              properties: false,
              // 保留函数名
              keep_fnames: true
            },
            // 保留原始字符串格式
            format: {
              quote_style: 3 // 使用原始引号
            }
          },
        }),
      ],
    },
    //1.关闭webpack的性能提示
    // performance : {
    //   hints : false
    // },
    //2.通过改变入口和生成文件的大小来解决,这种最好
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                common: {
                  minChunks: 2, // 至少被引用2次
                  priority: -20,
                  reuseExistingChunk: true // 复用已有chunk
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                },
                echarts: {
                  name: "chunk-echarts",
                  test: /[\\/]node_modules[\\/]echarts[\\/]/,
                  priority: 9,
                  chunks: 'initial', // only package third parties that are initially dependent
                  // enforce: true,
                },
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single'), {
            from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
            to: './', //到根目录下
          }

          /* *******************************************
          *
          * 开启GZIP压缩
          * 压缩前：4.4MB
          * 压缩后：1.7MB
          * @Author: geekcpp
          * @Date: 2020-09-02 19:55:13
          *
          ********************************************/
          config.plugin("compression").use(
            new CompressionPlugin({
              // filename: "[path][base].gz",
              filename: '[path][base].gz[query]', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
              algorithm: "gzip",
              test: productionGzipExtensions, // 使用正则给匹配{RegExp}到的文件/资产做压缩
              threshold: 102400, // 只处理大于此大小的资产。以字节为单位
              minRatio: 0.8, //只有压缩好这个比率的资产才能被处理
              deleteOriginalAssets: false, //是否删除原资源
            })
          );
        }
      )
  }
}
