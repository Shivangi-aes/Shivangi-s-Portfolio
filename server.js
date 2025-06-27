// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Correct SDK v4 Usage
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const message = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are ShiviBot created by Shivangi. Be smart, sweet, and friendly.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({
      reply: "Oops! ShiviBot is sleepy 😴",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ShiviBot running on http://localhost:${PORT}`);
});
