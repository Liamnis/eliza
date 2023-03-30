async function sendMessageToChatGPT(message) {
    const apiKey = "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";
    const apiUrl =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const prompt = `Utilisateur: ${message}\nAssistant:`;
  
    try {
      const response = await axios.post(
        apiUrl,
        {
          prompt: prompt,
          max_tokens: 500,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const assistantReply = response.data.choices[0].text.trim();
      return assistantReply;
    } catch (error) {
      console.error("Erreur lors de l'appel de l'API ChatGPT:", error);
      return "Désolé, je rencontre actuellement des problèmes pour vous répondre.";
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const assistanceBtn = document.querySelector(".assistance-btn");
    const chatContainer = document.querySelector(".chat-container");
    const chatForm = document.querySelector(".chat-form");
    const chatInput = document.querySelector(".chat-input");
    const chatMessages = document.querySelector(".chat-messages");
    const closeBtn = document.querySelector("#close");
  
    function addMessage(content, className) {
      const messageElem = document.createElement("div");
      messageElem.classList.add(className);
      messageElem.innerHTML = content;
      chatMessages.appendChild(messageElem);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    assistanceBtn.addEventListener("click", () => {
      chatContainer.style.display =
        chatContainer.style.display === "none" ? "flex" : {};
    });
  
    closeBtn.addEventListener("click", () => {
      chatContainer.style.display = "none";
    });
  
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const message = chatInput.value;
      addMessage(`Vous: ${message}`, "user-message");
      chatInput.value = "";
      const response = await sendMessageToChatGPT(message);
      addMessage(`Assistant: ${response}`, "assistant-message");
    });

    addMessage("Assistant : Comment puis-je vous aider ?", "assistant-message")
  });
  
