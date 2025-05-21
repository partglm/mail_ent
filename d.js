// d.js
const axios = require('axios');

async function sendMessage() {
  const headers = {
    'Cookie': 'atuserid={"name":"atuserid","val":"68194721-5a9c-44a4-b79f-276ab8228365","options":{"end":"2026-03-18T17:24:03.931Z","path":"/"}};
    atidvisitor={"name":"atidvisitor","val":{"vrn":"-365070-","at":"529752489799521024553539849455249555045579710210045102485510049539810254555156","ac":"ELEVE"},"options":{"path":"/","session":15724800,"end":15724800}}; webviewignored=true:rEKJsPr6BjJjJ098XqxA1YQLQpw=; oneSessionId=c84f06c6-4c23-4e95-86eb-23076e23c0c7:VKpgTAh9bxq3lGeqpgNNuBpu8A0=; authenticated=true; XSRF-TOKEN=6adb1db6-d64e-42b4-b3d9-f368dba2871e',
    'X-Xsrf-Token': '6adb1db6-d64e-42b4-b3d9-f368dba2871e',
  };

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
      throw new Error("Impossible de récupérer l'ID du brouillon  " + draftResponse);
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

module.exports = sendMessage;
