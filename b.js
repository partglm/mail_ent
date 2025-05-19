const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/', createProxyMiddleware({
  target: 'https://ent.ecollege78.fr',
  changeOrigin: true,
  selfHandleResponse: false,
  ws: true,
}));

app.listen(8080, () => {
  console.log("Serveur proxy sur http://localhost:8080");
});
