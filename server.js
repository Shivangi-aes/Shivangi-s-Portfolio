// server.js

// Load environment variables from .env
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Route to handle incoming chatbot messages
app.post("/ask", async (req, res) => {
  const message = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({
      reply: "Oops! Something went wrong on my side. Please try again later.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 ShiviBot server running at http://localhost:${PORT}`);
});

