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
const chat = [
  {
    role: "system",
    content:
      "A soap product called Lux from ABC Software company. It have 2 charactors of fast response and  multi language supporting. ",
  },
  {
    role: "user",
    content: "give me your company name\n",
  },
];

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

const call = {
  file: " ",
  text: "",
  callData: "",
  dia: "",
};
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString(); // e.g., "8/6/2023"
const dayOfWeek = currentDate.getDay();
let t;

if (dayOfWeek === 0) {
  t = "Sunday";
} else if (dayOfWeek === 1) {
  t = "Monday";
} else if (dayOfWeek === 2) {
  t = "Tuesday";
} else if (dayOfWeek === 3) {
  t = "Wednesday";
} else if (dayOfWeek === 4) {
  t = "Thursday";
} else if (dayOfWeek === 5) {
  t = "Friday";
} else if (dayOfWeek === 6) {
  t = "Saturday";
} else {
  t = "Invalid day";
}

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
      prompt:
        "return me a json file where it constis a small summey of the text in bellow as Summery, identify any events to be done where a boolen  as Events,  if event is available get the name of the event as EventTitle, if event is available identify the event is on Zoom or Google Meet or Teams as Medium(make default is Google Meet if medium is not mentioned),  if event is available event requested date as Date. To calculate the date(yyyy-mm-dd), assume that today is " +
        t +
        formattedDate +
        "to select the date select most recent day,  if event is available identify the time as EventTime(hh-mm-ss),if event is available provide me a mail content to send to user as MeetingMail, identify any documents has been requested as Documnets (boolean value), if a document is requested provide the document title as DocumentTitle,if a document is requested provide me a mail content to send to customer as DocumentMail Above data should be inside a json" +
        call.text,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    call.callData = response3.data.choices[0].text;
    res.json(call);
    console.log(call);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});
app.post("/chat", async (req, res) => {
  //   console.log(req.body);

  //     {
  //     "role": "user",
  //     "content": "give me your company name\n"
  // }
  try {
    chat.push(req.body);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chat,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data.choices[0].message);
    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});
app.post("/web", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "give me some data about the following person by using the follow details. Do a web scraping on the person if data available with you. Else give details about the working company and the scope of the company",
        },
        {
          role: "user",
          content:
            "The persona data as follow. Name is " +
            leads[0].name +
            "working company is" +
            leads[0].company +
            "and he is the " +
            leads[0].title +
            "of that comapny",
        },
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});
app.post("/web2", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Give some data about the data which contains the following data. Name is " +
        leads[0].name +
        "working company is" +
        leads[0].company +
        "and he is the " +
        leads[0].title +
        "of that comapny. If you dont have data, please provide me some data about the company without assumptions.give only true data regarding above person",
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error making OpenAI API call" });
  }
});
app.post("/lead1", async (req, res) => {
  res.json(leads[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} -> app4.js`);
});
