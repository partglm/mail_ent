// a.js
const axios = require('axios');
const qs = require('qs');
const { log } = require('console')

async function loginENT(user, password) {
  const loginUrl = 'https://ent.ecollege78.fr/auth/login';
  const loginData = qs.stringify({
    email: user,
    password: password,
    callBack: 'https%3A%2F%2Fent.ecollege78.fr%2F',
    details: ''
  });

  const baseCookies = [
    'atuserid={"name":"atuserid","val":"68194721-5a9c-44a4-b79f-276ab8228365","options":{"end":"2026-03-18T17:24:03.931Z","path":"/"}}',
    'atidvisitor={"name":"atidvisitor","val":{"vrn":"-365070-","at":"529752489799521024553539849455249555045579710210045102485510049539810254555156","ac":"ELEVE"},"options":{"path":"/","session":15724800,"end":15724800}}',
    'webviewignored=true:rEKJsPr6BjJjJ098XqxA1YQLQpw='
  ];

  const headers = {
    'Cookie': baseCookies.join('; '),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://ent.ecollege78.fr',
    'Referer': 'https://ent.ecollege78.fr/auth/login',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  };

  try {
    // login ENT
    const loginResponse = await axios.post(loginUrl, loginData, {
      headers,
      maxRedirects: 0,
      validateStatus: s => s === 302,
    });

    const setCookies = loginResponse.headers['set-cookie'];
    const sessionCookies = setCookies
      .filter(c => c.startsWith('oneSessionId') || c.startsWith('XSRF-TOKEN') || c.startsWith('authenticated'))
      .map(c => c.split(';')[0]);

    const finalCookies = [...baseCookies, ...sessionCookies].join('; ');

    // fetch page ENT après login
    const homeResponse = await axios.get('https://ent.ecollege78.fr/', {
      headers: {
        'Cookie': finalCookies,
        'User-Agent': headers['User-Agent'],
        'Referer': loginUrl,
      }
    });
    
    return {
      status: 'ok',
      code: homeResponse.status,
      data: homeResponse.data
    };

  } catch (err) {
    return {
      status: 'error',
      error: err.message,
      response: err.response?.data || null
    };
  }
}

module.exports = loginENT;
