const { rename, unlink } = require("node:fs/promises");
const { AzureImageDetectionService } = require("./azure-image-service");
const { AzureTextToSpeechService } = require("./azure-speech-service");
const { uploadImage, uploadVoice } = require("./azure-storage-service");
const { createSentence } = require("./SentenceMaker");
const { randomUUID } = require('crypto');
const express = require("express");
const path = require('path');
const multer = require('multer');
require("dotenv").config();

const app = express();
const port = 80;
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'public')));
const upload = multer({ dest: 'public/' });

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file)  return res.status(400).send('No file uploaded.');
       
    const uploadFile = req.file.path;// receive image from frontend
    const randomID = randomUUID();
    const renameFile = `public/${randomID}.png`;

    await rename(uploadFile, renameFile);
    const imageUrl = await uploadImage(randomID);// upload image to blob storage

    const prediction = await AzureImageDetectionService(imageUrl);//use image & text detection
    const text = await createSentence(prediction);//create information string => `di depan ada orang`

    if (text === null) return res.status(404).json({ message: "empty" });

    await AzureTextToSpeechService(text, randomID);//convert text to speech
    const voiceUrl = await uploadVoice(randomID);//upload voice to blob storage

    setTimeout(async () => {
        await unlink(`./public/${randomID}.wav`);
        await unlink(`./public/${randomID}.png`)
        console.log(`${randomID} deleted`);
    }, 600000);// delete image & voice in 10 minutes to preserve spaces
    return res.status(200).json({ Path: voiceUrl });//return the voice file's public link to frontend
});

app.use((req, res, next) => {
    res.status(404).json({ message: '404 Not Found' });
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Listening to port:${port}`);
});