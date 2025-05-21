const http = require('http');
const express = require('express');
const { log, error } = require('console');
const a = require('./c').a
const sendMessage = require('./c').s;

const app = express()

const PORT = 8090;
const server = http.createServer(app);
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/a.html')
})

app.get('/ent', async (req,res) => {
  const response = await fetch("https://ent.ecollege78.fr/auth/login?callback=https%3A%2F%2Fent.ecollege78.fr%2F#/");
  const body = await response.text();
  log('ent have access')
  res.send(body);
})

app.post('/auth', async (req, res) => {
  log(req.body);
  const { user, mdp } = req.body;
  const result = await a(user, mdp);

  if (result.status === 'ok') {
    log('auth good')
    res.json({def: result.code, cookie: result.cookies});
  } else {
    log('❌ Échec login ENT:', result.error);
    res.status(401).json({ error: 'Échec de la connexion ENT', detail: result });
  }
});

app.post('/send', async (req, res) => {
  const result = await sendMessage(req.body.cp);
  res.json({result: result});
});

app.get('/temp', (req,res) => {
  res.sendFile(__dirname, 'b.html')
})

app.use(async (req, res, next) => {
  log(req.url)
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
    error(err.message+ 'IDK   ')
    res.status(500).send("Erreur proxy globale : " + err.message);
  }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 