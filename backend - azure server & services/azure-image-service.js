const createClient = require('@azure-rest/ai-vision-image-analysis').default;
const { AzureKeyCredential } = require('@azure/core-auth');
require("dotenv").config();

const endpoint = process.env.VISION_ENDPOINT;
const key = process.env.VISION_KEY;

async function AzureImageDetectionService(imageUrl) {
  
  const credential = new AzureKeyCredential(key);
  const client = createClient(endpoint, credential);
  
  const result = await client.path('/imageanalysis:analyze').post({
    body: {
        url: imageUrl
    },
    queryParameters: {
        features: [
            'Objects',
            'Read'
        ]
    },
    contentType: 'application/json'
  });
  
  const isResult = result.body;
  return isResult;
}

module.exports = { AzureImageDetectionService }