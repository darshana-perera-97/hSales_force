const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3001;

const call = {
  file: " ",
  text: "",
  summery: "",
  dia: "",
};

const OPENAI_API_KEY = "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";
const openaiConfig = {
  apiKey: "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",
};
const configuration = new Configuration({
  apiKey: openaiConfig.apiKey,
});
const openai = new OpenAIApi(configuration);
const filePath = path.join(__dirname, "./audios/audio1.mp3");
const model = "whisper-1";

app.use(cors());
app.use(express.json());

const formData = new FormData();
formData.append("model", model);
formData.append("file", fs.createReadStream(filePath));

//set file name
app.get("/setName", (req, res) => {
  //   console.log(req.body.fileName);
  call.file = req.body.fileName;
  res.json(call);
});

//audio to text
app.get("/getText", (req, res) => {
  //   call.file = req.body.fileName;
  axios
    .post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
    .then((response) => {
      //   console.log(response.data.text);
      call.text = response.data.text;
      //   console.log(call);
      res.json(call);
    })
    .catch((error) => {
      console.error(error);
    });
});

//speaker diarization
app.get("/dia", async (req, res) => {
  const { name, company, country } = req.body;
  const customPrompt =
    "Speaker diarize the bellow content after this sentence. " + call.text;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: customPrompt,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    call.dia = response.data.choices;
    res.json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});
//speaker diarization
app.get("/summery", async (req, res) => {
  const customPrompt =
    "give me a small summery the bellow content after this sentence. " +
    call.text;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: customPrompt,
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // const generatedText = response.choices[0].text;
    // console.log(response.data.choices)

    // res.json({ a: response.data.choices });
    // console.log(response.data.choices);
    call.summery = response.data.choices;
    res.json(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});

app.get("/webScrape", async (req, res) => {
  const { name, company, country } = req.body;
  const customPrompt =
    "Give me a web scraping of " + name + "who works in " + company;
  console.log(name);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: customPrompt,
      // prompt: 'what is the longest river?',
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // const generatedText = response.choices[0].text;
    // console.log(response.data.choices)

    res.json({ a: response.data.choices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});

app.get("/api", (req, res) => {
  call.text = "sample Text";
  res.json(call);
  console.log(req.body.fileName);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} ->app.js`);
});
