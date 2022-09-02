const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "线上书展-中国科技资料进出口总公司";
      return args;
    });
  },
});
