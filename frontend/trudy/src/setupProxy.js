const { configure } = require("@testing-library/react");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://43.201.107.166:8080",
      changeOrigin: true,
    })
  );
};
