const http = require('http');
const express = require('express');
const { log, error } = require('console');
const a = require('./c')
const sendMessage = require('./d');

const app = express()

const PORT = 8080;
const server = http.createServer(app);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/a.html')
})

app.get('/ent', async (req,res) => {
  const response = await fetch("https://ent.ecollege78.fr/auth/login?callback=https%3A%2F%2Fent.ecollege78.fr%2F#/");
  const body = await response.text();
  log('ent have access')
  res.send(body);
})

app.post('/auth', async (req,res) => {
  const b = await a()
  res.json({data : b})
})

app.post('/send', async (req, res) => {
  const result = await sendMessage();
  res.json({result: result});
});

app.use(async (req, res, next) => {
  try {
    const targetUrl = "https://ent.ecollege78.fr" + req.url

    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

let body = await response.text();
res.send(body);

  } catch (err) {
    error(err.message)
    res.status(500).send("Erreur proxy globale : " + err.message);
  }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 