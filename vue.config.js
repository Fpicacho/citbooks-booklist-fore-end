const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "线上书展-中国科技资料进出口总公司";
      return args;
    });
  },
  devServer: {
    port: 8080,
    proxy: {
      "": {
        target: "http://jsonplaceholder.typicode.com/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
