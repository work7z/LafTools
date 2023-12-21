const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy.createProxyMiddleware("/api/", {
      target: "http://127.0.0.18080/",
      headers: {
        //
      },
      changeOrigin: true, // 设置跨域请求
      pathRewrite: {
        // "^/api/": "", // 将/api/ 变为 ''
      },
    })
  );
};
