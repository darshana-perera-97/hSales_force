const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const OPENAI_API_KEY = "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";
const filePath = path.join(__dirname, "./audios/audio1.mp3");
const model = "whisper-1";

const formData = new FormData();
formData.append("model", model);
formData.append("file", fs.createReadStream(filePath));

axios
  .post("https://api.openai.com/v1/audio/transcriptions", formData, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  })
  .then((response) => {
    console.log(response.data.text);
  })
  .catch((error) => {
    console.error(error);
  });
