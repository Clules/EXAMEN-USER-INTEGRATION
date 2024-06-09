require("dotenv").config();
const { response } = require("express");
const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function getResponseChat(req, res) {
  const { prompt } = req.body;
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert in physical therapy. You can answer any question related",
        },
        { role: "user", content: prompt },
      ],
      stream: true,
    });
    let responseText = "";
    for await (const chunk of stream) {
      responseText += chunk.choices[0]?.delta?.content || "";
    }

    return res.json({ response: responseText });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send(error);
  }
}

async function getResponseChatGemini(req, res) {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return res.json({ response: text });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getResponseChatGemini };
// async function main() {
//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "Hello!" },
//     ],
//     stream: true,
//   });

//   for await (const chunk of completion) {
//     console.log(chunk.choices[0].delta.content);
//   }
// }

// main();
