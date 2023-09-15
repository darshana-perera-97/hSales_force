const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3001;

// Set your OpenAI API key here
const OPENAI_API_KEY = "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"; // Replace with your actual API key

const openaiConfig = {
  apiKey: "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",
};
const configuration = new Configuration(openaiConfig);
const openai = new OpenAIApi(configuration);

const filePath = path.join(__dirname, "./audios/audio1.mp3");
const model = "whisper-1";

app.use(cors());
app.use(express.json());

// ... (Other parts of your code)

const formData = new FormData();
formData.append("model", model);
formData.append("file", fs.createReadStream(filePath));

// ... (Other parts of your code)

const leads = [
  {
    name: "Krishall Magaga",
    title: "Marketing Manager",
    company: "hSenid Mobile Solutions",
    phone: "+94 77 12 34 567",
    email: "test@abc.com",
    location: "Colombo, Sri Lanka",
  },
];
// Call the OpenAI API to generate text completions
const fetchCompletion = async () => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Give some data about the data which contains the following data. Name is " +
        leads[0].name +
        "working company is " +
        leads[0].company +
        "and he is the " +
        leads[0].title +
        " of that company. If you dont have data, please provide me some data about the company without assumptions. Give only true data regarding above person",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Endpoint to call the fetchCompletion function
app.get("/fetchCompletion", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Give some data about the data which contains the following data. Name is " +
        leads[0].name +
        "working company is " +
        leads[0].company +
        "and he is the " +
        leads[0].title +
        " of that company. If you dont have data, please provide me some data about the company without assumptions. Give only true data regarding above person",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
});

// ... (Other parts of your code)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
