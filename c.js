const axios = require('axios');
const qs = require('qs');

async function a () {
  const url = 'https://ent.ecollege78.fr/auth/login';

  const headers = {
    'Host': 'ent.ecollege78.fr',
    'Cookie': 'atuserid={"name":"atuserid","val":"68194721-5a9c-44a4-b79f-276ab8228365","options":{"end":"20264-03-18T17:24:03.931Z","path":"/"}}; atidvisitor={"name":"atidvisitor","val":{"vrn":"-365070-","at":"529752489799521024553539849455249555045579710210045102485510049539810254555156","ac":"SUPER_ADMIN"},"options":{"path":"/","session":15724800,"end":15724800}}; webviewignored=true:rEKJsPr6BjJjJ098XqxA1YQLQpw=',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://ent.ecollege78.fr',
    'Referer': 'https://ent.ecollege78.fr/auth/login?callback=https%3A%2F%2Fent.ecollege78.fr%2F',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'fr-FR,fr;q=0.9'
  };

  const data = qs.stringify({
    email: 'pierre.goas',
    password: 'MX6nr8&L4!',
    callBack: 'https://ent.ecollege78.fr/',
    details: ''
  });

  try {
    const response = await axios.post(url, data, { headers });
    return response.data; // ✅ on retourne bien les données ici
  } catch (error) {
    console.error('Erreur :', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.data);
    }
    return "Erreur lors de la connexion.";
  }
}

module.exports = a;
