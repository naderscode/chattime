import socket from './ws-client';
import {ChatForm} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';

class ChatApp {
  constructor(){
    this.ChatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);

    socket.init('ws://localhost:8000');
    socket.registerOpenHandler(() => {
      //let message = new ChatMessage({ message: 'Hello there'});
      this.ChatForm.init((data) => {
        let message = new ChatMessage(data);
        socket.sendMessage(message.serialize());
      });
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
    });
  }
}

class ChatMessage {
  constructor({
    message: m,
    user: u='Nader',
    timestamp: t=(new Date()).getTime()
  }) {
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  serialize(){
    return {
      message: this.message,
      user: this.user,
      timestamp: this.timestamp

    };
  }
}

export default ChatApp;
