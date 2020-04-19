// webpack.config.js

const path = require("path");
// const argv = require("yargs-parser")(global.process.argv.slice(2));
const pro = global.process.env.NODE_ENV === "production" ? true : false; //  区别是生产环境和开发环境
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");


// console.log(global.process.env.NODE_ENV, pro);

const resetCss = new ExtractTextWebpackPlugin("css/reset.css");
const styleCss = new ExtractTextWebpackPlugin(pro ? "css/style.[chunkhash].css" : "css/style.css");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const productionPlugins = [
  new CleanWebpackPlugin(),
  new BundleAnalyzerPlugin()
  // new ExtractTextWebpackPlugin("css/style.[chunkhash].css"),
];
const developmentPlugins = [
  // new ExtractTextWebpackPlugin("css/style.css"),
];
const plugins = [
  new HtmlWebpackPlugin({
    // 用哪个html作为模板
    // 在src目录下创建一个index.html页面当做模板来用
    template: "./src/index.html",
    meta: {
      "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
      // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      "theme-color": "#4285f4"
      // Will generate: <meta name="theme-color" content="#4285f4">
    },
    chunks: ["index", "utils", "tools"],
    cache: true,
    hash: true, // 会在打包好的bundle.js后面加上hash串
  }),
  resetCss,
  styleCss,
  new ProgressBarPlugin(),
  // new ExtractTextWebpackPlugin("css/style.css"),
  new CleanWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];
plugins.push.apply(plugins, pro ? productionPlugins : developmentPlugins);


// plugins = [...productionPlugins]
module.exports = {
  // entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    // untils: "./src/untils/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/, // 解析less
        use: styleCss.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "less-loader"] // 从右向左解析
        })
      },
      {
        test: /\.scss$/, // 解析scss
        use: styleCss.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "sass-loader"] // 从右向左解析
        })
      },
      {
        test: /\.css$/, // 解析css
        use: resetCss.extract({
          // 将css用link的方式引入就不再需要style-loader了
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: "images/" // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      },
      {
        enforce: "pre", //  代表在解析loader之前就先解析eslint-loader
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: "eslint-loader",
      },
    ]
  },
  plugins,
  devServer: {
    hot: true,// 热更新，热更新不是刷新
  },
  mode: "development",
  optimization: {
    // minimize: false,
    splitChunks: {
      cacheGroups: {
        // react: { // 抽离第三方插件
        //   test: /node_modules/, // 指定是node_modules下的第三方包
        //   chunks: "initial",
        //   name: "react", // 打包后的文件名，任意命名
        //   // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        //   priority: 10
        // },
        utils: {
          // 抽离自己写的公共代码，utils里面是一个公共类库
          test: /src\/utils/,
          chunks: "initial",
          name: "utils", //  任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          priority: 10
        },
        tools: {
          // 抽离自己写的公共代码，utils里面是一个公共类库
          chunks: "initial",
          name: "tools", //  任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        },

      }
    }
  },
};
