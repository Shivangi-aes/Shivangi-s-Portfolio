function sendMessage() {
  const inputBox = document.getElementById("user-input");
  const userInput = inputBox.value.trim();
  if (!userInput) return;

  addMessage("You", userInput);

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }]
    })
  })
  .then(response => response.json())
  .then(data => {
    const botReply = data.choices?.[0]?.message?.content || "Sorry, I didn't get that.";
    addMessage("Bot", botReply);
  })
  .catch(() => {
    addMessage("Bot", "Oops! I couldn't connect to the brain right now.");
  });

  inputBox.value = "";
}

function addMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "You" ? "user" : "bot");
  messageDiv.innerText = `${sender}: ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
