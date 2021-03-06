const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
  // publicPath: './',
  outputDir: './html/dist',
  productionSourceMap: false,
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new HtmlWebpackPlugin({
        inlineSource: '.(js|css)$',
        template: './public/index.html'
      }),
      new HtmlWebpackInlineSourcePlugin() // 实例化内联资源插件
    ]
  }
}
