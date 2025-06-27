let isPlaying = false;

// Toggle Music
function toggleMusic() {
  const music = document.getElementById("bg-music");
  isPlaying ? music.pause() : music.play();
  isPlaying = !isPlaying;
}

// Chatbot Functionality
async function sendMessage(e) {
  if (e.key === "Enter") {
    const input = document.getElementById("userInput");
    const msg = input.value.trim();
    if (!msg) return;

    const messages = document.getElementById("messages");
    messages.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
    input.value = "";

    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();
      messages.innerHTML += `<div><strong>ShiviBot:</strong> ${data.reply}</div>`;
      messages.scrollTop = messages.scrollHeight;
    } catch (err) {
      messages.innerHTML += `<div><strong>ShiviBot:</strong> Error connecting 😢</div>`;
    }
  }
}
