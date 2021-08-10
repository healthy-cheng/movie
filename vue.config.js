module.exports = {
  configureWebpack: {
    externals: {
      'AMap': 'AMap'
    }
  },
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      }
    }
  }
}