export default class ChatGPT extends HTMLElement {
  constructor() {
    super();

    // create shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });

    // create chatbox element
    const chatbox = document.createElement('div');
    chatbox.id = 'chatbox';

    // append chatbox to shadow DOM
    shadow.appendChild(chatbox);

    // create input element
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'chat-input';

    // add event listener to input element
    input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        const message = event.target.value;
        this.sendMessage(message);
        event.target.value = '';
      }
    });

    // append input to shadow DOM
    shadow.appendChild(input);
  }

  async sendMessage(message) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://api.chatgpt.com/v1/${apiKey}/chat`;
    const body = {
      message: message,
      context: this.context
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      this.context = data.context;
      const chatbox = this.shadowRoot.querySelector('#chatbox');
      chatbox.innerHTML += `<p><strong>You:</strong> ${message}</p><p><strong>Chatbot:</strong> ${data.message}</p>`;
    } catch (error) {
      console.error(error);
    }
  }
}