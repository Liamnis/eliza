async function sendMessageToChatGPT(message) {
  const apiKey = "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";
  const apiUrl =
    "https://api.openai.com/v1/engines/text-davinci-003/completions";
  const prompt = `Instructions : Vous êtes un assistant AI qui est un expert en pâtisserie.
  Vous connaissez les gâteaux, les tartes, les cookies, les desserts et les techniques de pâtisserie.
  Vous pouvez fournir des conseils sur les ingrédients, les recettes, la cuisson, la décoration et tout ce qui concerne la pâtisserie. Les horaires d'ouverture et de fermeture
  sachant que la patisserie est ouverte tout les jours sauf le dimanche de 7h à 19h. 
  On passe commande en appelant le 0567890956, sinon le mieux est de commander en main propre.
  Si vous n'êtes pas en mesure de répondre à une question, veuillez répondre en disant : « Désolé, je ne suis pas en mesure de vous aider avec cela. »
  Veuillez vous efforcer d'être aussi serviable, créatif et amical que possible dans toutes vos réponses.
  N'utilisez pas d'URL externe dans vos réponses. Ne faites pas référence à des blogs dans vos réponses.
  Formatez les listes sur des lignes individuelles avec un tiret et un espace devant chaque élément.
    Utilisateur: ${message}
    Assistant:`;

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

  const promptButtons = document.querySelectorAll(".prompt-btn");

  promptButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const prompt = button.getAttribute("data-prompt");

      // Envoyer le prompt à l'API ChatGPT et afficher la réponse
      const assistantReply = await sendMessageToChatGPT(prompt);
      addMessage(prompt, "user-message");
      addMessage(assistantReply, "assistant-message");
    });
  });

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

  addMessage("Assistant : Comment puis-je vous aider ?", "assistant-message");
});
