// const fs = require("node:fs/promises");
// const { ImageAnalysisClient } = require('@azure-rest/ai-vision-image-analysis');
// const createClient = require('@azure-rest/ai-vision-image-analysis').default;
// const { AzureKeyCredential } = require('@azure/core-auth');
// const jimp = require("jimp")

// // Load the .env file if it exists
// //require("dotenv").config();

// const endpoint = "";
// const key = "";

// const credential = new AzureKeyCredential(key);
// const client = createClient(endpoint, credential);

// const features = [
//   'Objects'
// ];

// //const imageUrl = 'https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png';

// async function analyzeImageFromUrl() {
//     const imageBuffer = await fs.readFile("./test_image.jpg");
//     // const image = await jimp.read(imageBuffer);
//     // image.resize(50,50);
//     // const resizedBuffer = await image.getBufferAsync(jimp.MIME_PNG);

//     console.log("image buffer size:" + imageBuffer.length);

//   const result = await client.path('/imageanalysis:analyze').post({
//     body: {
//         image: {
//             data: imageBuffer
//         }
//     },
//     queryParameters: {
//         features: features
//     },
//     contentType: 'application/json'
//   });

//   const iaResult = result.body;

//   console.log(iaResult);

// }

// analyzeImageFromUrl();