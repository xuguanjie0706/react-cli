// webpack.config.js

const path = require("path");
// const argv = require("yargs-parser")(global.process.argv.slice(2));
const pro = global.process.env.NODE_ENV === "production" ? true : false; //  区别是生产环境和开发环境
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");


console.log(global.process.env.NODE_ENV, pro);

const resetCss = new ExtractTextWebpackPlugin("css/reset.css");
const styleCss = new ExtractTextWebpackPlugin(pro ? "css/style.[chunkhash].css" : "css/style.css");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const productionPlugins = [
  // new CleanWebpackPlugin(),
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
    hash: true, // 会在打包好的bundle.js后面加上hash串
  }),
  resetCss,
  styleCss,
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
    hot: true,
    // 热更新，热更新不是刷新

  }
};
