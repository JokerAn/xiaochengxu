const CracoLessPlugin = require('craco-less');
const path = require('path');
console.log(path);
const { ReactInspectorPlugin } = require('react-dev-inspector/plugins/webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const { whenDev, whenProd } = require('@craco/craco');
const isPro = process.env.NODE_ENV === 'production';
const packageName = require('./package.json').name;
const { name } = require('./package');

module.exports = {
  // output: {
  //   library: {
  //     name: `${packageName}-[name]`,
  //     type: 'umd',
  //   },
  //   jsonpFunction: `webpackJsonp_${packageName}`,
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 修改主题色
            javascriptEnabled: true,
            modifyVars: {
              '@font-size-base': '14px',
            },
          },
        },
      },
    },
    {
      plugin: ReactInspectorPlugin,
      options: {
        excludes: ['xxx-file-will-be-exclude', /regexp-to-match-file /],
      },
    },
  ],
  webpack: (config) => {
    config.output.library = `${name}-[name]`; // 开发环境正确的
    // config.output.library = 'qiankun-react-ansl';// 开发环境正确的
    config.output.libraryTarget = 'umd';
    // config.output.jsonpFunction = `webpackJsonp_${name}`;官方文档过时了改为下边这一行
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = 'window';
    config.plugins = [
      ...config.plugins,
      ...[
        // webpack构建进度条
        new WebpackBar({
          profile: true,
        }),
        // 查看包的大小
        ...whenDev(() => [new BundleAnalyzerPlugin()], []),
        // 打压缩包
        ...whenProd(
          () => [
            new CompressionWebpackPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp(`\\.(${['js', 'css', 'ts', 'tsx'].join('|')})$`),
              threshold: 1024,
              minRatio: 0.8,
              deleteOriginalAssets: false, // 删除原文件
            }),
          ],
          []
        ),
        // 去除生产console
        ...whenProd(
          () => [
            //   new TerserPlugin({
            //     terserOptions: {
            //       compress: {
            //         // drop_console: isPro, //移除console 注意会移除所有的console.*
            //         drop_debugger: true, //移除debugger
            //         pure_funcs: ["console.log"], // 移除console.log函数
            //       },
            //       // compress: {
            //       //   // drop_console: isPro, //移除console 注意会移除所有的console.*
            //       //   drop_debugger: isPro, //移除debugger
            //       //   pure_funcs: isPro ? ["console.log"] : null, // 移除console.log函数
            //       // },
            //     },
            //   }),
          ],
          []
        ),
      ],
    ];
    return config;
  },
  devServer: (_) => {
    const config = _;
    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    // config.watchContentBase = false;官方文档过时了改为下边这一行
    config.static.watch = false;
    config.liveReload = false;
    // console.log(path.resolve);
    // config.static.directory = isPro ? '/' : path.resolve(__dirname, 'public');

    return config;
  },
  // webpack: {
  //   // ...whenDev(() => ({
  //   //   devTools: "source-map" /*"cheap-module-eval-source-map"*/,
  //   // })),
  //   plugins: [
  //     // webpack构建进度条
  //     new WebpackBar({
  //       profile: true,
  //     }),
  //     // 查看包的大小
  //     ...whenDev(() => [new BundleAnalyzerPlugin()], []),
  //     // 打压缩包
  //     ...whenProd(
  //       () => [
  //         new CompressionWebpackPlugin({
  //           filename: '[path].gz[query]',
  //           algorithm: 'gzip',
  //           test: new RegExp(`\\.(${['js', 'css', 'ts', 'tsx'].join('|')})$`),
  //           threshold: 1024,
  //           minRatio: 0.8,
  //           deleteOriginalAssets: false, // 删除原文件
  //         }),
  //       ],
  //       []
  //     ),
  //     // 去除生产console
  //     ...whenProd(
  //       () => [
  //         //   new TerserPlugin({
  //         //     terserOptions: {
  //         //       compress: {
  //         //         // drop_console: isPro, //移除console 注意会移除所有的console.*
  //         //         drop_debugger: true, //移除debugger
  //         //         pure_funcs: ["console.log"], // 移除console.log函数
  //         //       },
  //         //       // compress: {
  //         //       //   // drop_console: isPro, //移除console 注意会移除所有的console.*
  //         //       //   drop_debugger: isPro, //移除debugger
  //         //       //   pure_funcs: isPro ? ["console.log"] : null, // 移除console.log函数
  //         //       // },
  //         //     },
  //         //   }),
  //       ],
  //       []
  //     ),
  //   ],
  // },
};
