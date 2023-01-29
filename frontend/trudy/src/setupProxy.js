const { configure } = require("@testing-library/react");
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://i8e202.p.ssafy.io",
      // target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};
