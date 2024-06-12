const sdk = require("microsoft-cognitiveservices-speech-sdk");
require("dotenv").config();

const subscriptionKey = process.env.SPEECH_KEY;
const serviceRegion = "eastus"; // e.g., "westus"
const language = "id-ID";

async function AzureTextToSpeechService(text,path) {
  const filename = `public/${path}.wav`;

  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  speechConfig.speechSynthesisLanguage = language;
  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(text,
      function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log("Synthesis finished.");
          synthesizer.close();
          synthesizer = undefined;
          resolve(filename); // Resolve with the filename
        } else {
          console.error("Speech synthesis canceled:", result.errorDetails);
          synthesizer.close();
          synthesizer = undefined;
          reject(result.errorDetails);
        }
      },
      function (err) {
        console.error("Error:", err);
        synthesizer.close();
        synthesizer = undefined;
        reject(err);
      });
  });
}
module.exports = { AzureTextToSpeechService };