const CracoLessPlugin = require('craco-less');

const { ReactInspectorPlugin } = require('react-dev-inspector/plugins/webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const { whenDev, whenProd } = require('@craco/craco');
// const isPro = process.env.NODE_ENV === "production";
const packageName = require('./package.json').name;

module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
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
  webpack: {
    // ...whenDev(() => ({
    //   devTools: "source-map" /*"cheap-module-eval-source-map"*/,
    // })),
    plugins: [
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
  },
};
