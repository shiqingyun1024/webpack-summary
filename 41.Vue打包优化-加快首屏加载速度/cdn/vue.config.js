const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    publicPath:'./',
    configureWebpack:{
        // 对不想打包在bundle中的文件进行声明
        externals:{
          'vue':'Vue',
          'vue-router':'VueRouter',
          'vuex':'Vuex',
          'element-ui':'ELEMENT',
          'axios':'axios',
        },
        plugins: [
            new BundleAnalyzerPlugin()
        ]
    }
}