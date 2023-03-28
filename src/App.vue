<template>
  <div class="chatbot-container">
    <div class="chatbot-messages">
      <div v-for="message in messages" :key="message.id" class="chatbot-message">
        <p v-if="message.type === 'bot'" class="chatbot-bot-message">{{ message.text }}</p>
        <p v-else class="chatbot-user-message">{{ message.text }}</p>
      </div>
    </div>
    <div class="chatbot-input">
      <input type="text" v-model="currentMessage" @keydown.enter="sendMessage">
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<script>
import { create } from '@openai/api';

export default {
  name: 'Chatbot',
  data() {
    return {
      messages: [],
      currentMessage: ''
    }
  },
  methods: {
    async sendMessage() {
      const message = {
        type: 'user',
        text: this.currentMessage
      };
      this.messages.push(message);
      this.currentMessage = '';

      const openai = create({
        apiKey: 'VOTRE_CLE_API_DE_CHATGPT',
        model: 'text-davinci-002',
        engine: 'davinci',
        prompt: `Conversation avec un utilisateur : ${message.text}`,
        maxTokens: 150
      });

      const response = await openai.complete({});
      const botMessage = {
        type: 'bot',
        text: response.choices[0].text
      };
      this.messages.push(botMessage);
    }
  }
}
</script>

<style>
.chatbot-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 300px;
  border: 1px solid black;
  border-radius: 5px;
}

.chatbot-messages {
  flex-grow: 1;
  overflow-y: auto;
}

.chatbot-message {
  padding: 5px;
}

.chatbot-bot-message {
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 5px;
}

.chatbot-user-message {
  background-color: #2196F3;
  color: white;
  border-radius: 5px;
  margin-bottom: 5px;
}

.chatbot-input {
  display: flex;
}

.chatbot-input input {
  flex-grow: 1;
  border: none;
  border-radius: 5px;
  padding: 5px;
}

.chatbot-input button {
  border: none;
  border-radius: 5px;
  background-color: #2196F3;
  color: white;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
