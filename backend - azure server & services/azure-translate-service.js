const { v4: uuidv4} = require("uuid");
require("dotenv").config();

const key = process.env.TRANSLATE_KEY;
const endpoint = process.env.TRANSLATE_ENDPOINT;
const location = "eastasia"

const headers = {
    'Ocp-Apim-Subscription-Key': key,
    'Ocp-Apim-Subscription-Region': location,
    'Content-type': 'application/json',
    'X-ClientTraceId': uuidv4().toString()
};

async function translateText1(text,from,to) {
    
    const params = new URLSearchParams({
        'api-version': '3.0',
        'from': from,
        'to': [to]
    });

    const body = JSON.stringify([
        {
            'text': text
        }
    ]);

    const response = await fetch(`${endpoint}/translate?${params.toString()}`, {
        method: 'POST',
        headers: headers,
        body: body
    });
    const data = await response.json();

    const translatedText = data[0].translations[0].text;
    
    return translatedText;
}

async function translateText(text){
    const p = await translateText1(text,"id","en");
    const k = await translateText1(p,"en","id");
    return k;
}

module.exports = {translateText};