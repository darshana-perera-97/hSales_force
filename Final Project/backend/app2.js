const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3001;

const OPENAI_API_KEY = "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";
const openaiConfig = {
  apiKey: "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",
};
const configuration = new Configuration({
  apiKey: openaiConfig.apiKey,
});
const openai = new OpenAIApi(configuration);
const model = "whisper-1";

app.use(cors());
app.use(express.json());

const call = {
  file: " ",
  text: "",
  summery: "",
  dia: "",
  events: {
    time: " ",
    title: "",
    date: "",
    media: " ",
  },
};




app.post("/setName", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "./audios/",
    req.body.fileName + ".mp3"
  );
  call.file = "./audios/" + req.body.fileName + ".mp3";
  const formData = new FormData();
  formData.append("model", model);
  formData.append("file", fs.createReadStream(filePath));

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        timeout: 30000, // 30 seconds
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      }
    );

    call.text = response.data.text;

    const customPrompt =
      "Speaker diarize the following content after this sentence" + call.text;
    const customPromptSymmery =
      "provide me a small summery of paragraph after this line. " + call.text;
    const response2 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: customPrompt,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    call.dia = response2.data.choices[0].text;
    const response3 = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: customPromptSymmery,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    call.summery = response3.data.choices[0].text;
    res.json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
