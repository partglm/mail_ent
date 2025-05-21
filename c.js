// a.js
const axios = require('axios');
const qs = require('qs');

async function loginENT(user, password) {
  const loginUrl = 'https://ent.ecollege78.fr/auth/login';
  const loginData = qs.stringify({
    email: user,
    password: password,
    callBack: 'https%3A%2F%2Fent.ecollege78.fr%2F',
    details: ''
  });

  // ✅ Seulement ce cookie de départ, comme tu l’as demandé
  const initialCookie = 'webviewignored=true:rEKJsPr6BjJjJ098XqxA1YQLQpw=';

  const headers = {
    'Cookie': initialCookie,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://ent.ecollege78.fr',
    'Referer': 'https://ent.ecollege78.fr/auth/login',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  try {
    // 🔐 Étape 1 : POST /auth/login
    const loginResponse = await axios.post(loginUrl, loginData, {
      headers,
      maxRedirects: 0,
      validateStatus: status => status === 302 // redirection après succès
    });

    const setCookies = loginResponse.headers['set-cookie'];
    if (!setCookies) throw new Error("Aucun cookie de session reçu");

    // ✅ Extraction des cookies reçus
    const sessionCookies = setCookies
      .map(cookieStr => cookieStr.split(';')[0]) // on garde seulement `key=value`
      .filter(cookie => /^(oneSessionId|authenticated|XSRF-TOKEN)=/.test(cookie));

    const allCookies = [initialCookie, ...sessionCookies].join('; ');

    // 🏠 Étape 2 : GET / avec les cookies de session
    const homeResponse = await axios.get('https://ent.ecollege78.fr/', {
      headers: {
        'Cookie': allCookies,
        'User-Agent': headers['User-Agent'],
        'Referer': loginUrl
      }
    });

    return {
      status: 'ok',
      code: homeResponse.status,
      data: homeResponse.data,
      cookies: allCookies
    };

  } catch (err) {
    return {
      status: 'error',
      error: err.message,
      response: err.response?.data || null
    };
  }
}






// d.js

async function sendMessage(cookie) {
  console.log(cookie);
  const headers = cookie

  const draftBody = {
    body: `<div>​</div><div>​</div><div><br></div><div class="signature new-signature">Cordialement Pierre Goas <br> élève et délégué suppléant <br> de la 3E2</div>`,
    to: ['b551d9ca-5e49-452b-a070-b2efe9ddf4f4'],
    cc: [],
    cci: []
  };

  try {
    // Étape 1 : sauvegarde comme brouillon
    const draftResponse = await axios.post('https://ent.ecollege78.fr/conversation/draft', draftBody, { headers });
    const id = draftResponse.data?.id;

    if (!id) {
      console.error("Réponse brouillon :", {
        status: draftResponse.status,
        headers: draftResponse.headers,
        data: draftResponse.data
      });
      throw new Error("Impossible de récupérer l'ID du brouillon");
    }
    // Étape 2 : envoi du message
    const sendBody = {
      subject: 'a',
      body: `<div class="ng-scope">​</div><div class="ng-scope">​a</div><div class="ng-scope">CCIDKWHATIDO22</div><div class="signature new-signature ng-scope">Cordialement Pierre Goas <br> élève et délégué suppléant <br> de la 3E2</div>`,
      to: ['b551d9ca-5e49-452b-a070-b2efe9ddf4f4'],
      cc: [],
      cci: []
    };

    const sendUrl = `https://ent.ecollege78.fr/conversation/send?id=${id}`;
    const sendResponse = await axios.post(sendUrl, sendBody, { headers });

    console.log('✅ Message envoyé avec succès');
    return sendResponse.data;

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi du message :', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Réponse:', error.response.data);
    }
    return { erreur: 'Échec de l\'envoi du message.' };
  }
}

module.exports.s = sendMessage;
module.exports.a = loginENT;
