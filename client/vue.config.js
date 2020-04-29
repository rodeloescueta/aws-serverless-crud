module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    host: "0.0.0.0",
    port: "9000", //name of port
    public: "0.0.0.0:9000",
    disableHostCheck: true,
    noInfo: true,
  },
};
