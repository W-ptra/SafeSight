const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const sas_token = process.env.SAS_TOKEN;

async function uploadToBlobStorage(blobName,file,container_name) {
    
    const sas = `https://publichackathon.blob.core.windows.net/image-voice?${sas_token}`;
    const blobServiceClient = new BlobServiceClient(sas);

    const containerClient = blobServiceClient.getContainerClient(container_name);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadFile(file);
    console.log(`${blobName} upload sucessfully to blob storage`);
}

async function uploadImage(imageName){
    await uploadToBlobStorage(`${imageName}.png`,`./public/${imageName}.png`,"image");
    return `https://publichackathon.blob.core.windows.net/image-voice/image/${imageName}.png`;
}

async function uploadVoice(voiceName){
    await uploadToBlobStorage(`${voiceName}.wav`,`./public/${voiceName}.wav`,"video");
    return `https://publichackathon.blob.core.windows.net/image-voice/video/${voiceName}.wav`;
}

module.exports = {uploadImage,uploadVoice};