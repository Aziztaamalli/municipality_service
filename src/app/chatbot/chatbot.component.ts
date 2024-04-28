import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.FirstBotMessage();
  }

  FirstBotMessage() {
    let firstMessage = "Hello! What's up?";
    let botStarterMessage = this.elementRef.nativeElement.querySelector('#botStarterMessage');
    if (botStarterMessage) {
      botStarterMessage.innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';
    }
    let time = this.getTime();
    let chatTimestamp = this.elementRef.nativeElement.querySelector('#chat-timestamp');
    if (chatTimestamp) {
      this.renderer.appendChild(chatTimestamp, this.renderer.createText(time));
    }
    let userInput = this.elementRef.nativeElement.querySelector('#userInput');
    if (userInput) {
      userInput.scrollIntoView(false);
    }
  }

  getTime(): string {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    let hoursStr = hours < 10 ? '0' + hours : hours.toString();
    let minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    return hoursStr + ":" + minutesStr;
  }

  getHardResponses(userText: string) {
    let botResponse = this.getBotResponse(userText);
    let chatbox = this.elementRef.nativeElement.querySelector('#chatbox');
    if (chatbox) {
      chatbox.innerHTML += '<p class="botText"><span>' + botResponse + '</span></p>';
      let chatBarBottom = this.elementRef.nativeElement.querySelector('#chat-bar-bottom');
      if (chatBarBottom) {
        chatBarBottom.scrollIntoView(true);
      }
    }
  }

  getResponse() {
    let userInput = this.elementRef.nativeElement.querySelector('#textInput');
    let userText = userInput ? userInput.value : '';
    if (userText === "") {
      userText = "Try to ask me something!";
    }
    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
    if (userInput) {
      userInput.value = "";
      let chatbox = this.elementRef.nativeElement.querySelector('#chatbox');
      if (chatbox) {
        chatbox.innerHTML += userHtml;
        let chatBarBottom = this.elementRef.nativeElement.querySelector('#chat-bar-bottom');
        if (chatBarBottom) {
          chatBarBottom.scrollIntoView(true);
        }
      }
    }
    setTimeout(() => {
      this.getHardResponses(userText);
    }, 1000);
  }

  buttonSendText(sampleText: string) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
    let userInput = this.elementRef.nativeElement.querySelector('#textInput');
    if (userInput) {
      userInput.value = "";
      let chatbox = this.elementRef.nativeElement.querySelector('#chatbox');
      if (chatbox) {
        chatbox.innerHTML += userHtml;
        let chatBarBottom = this.elementRef.nativeElement.querySelector('#chat-bar-bottom');
        if (chatBarBottom) {
          chatBarBottom.scrollIntoView(true);
        }
      }
    }
  }

  sendButton() {
    this.getResponse();
  }

  heartButton() {
    this.buttonSendText('heart clicked!');
  }

  getBotResponse(input: string): string {
    if (input === "rock") {
      return "You chose rock. I chose paper.";
    } else if (input === "paper") {
      return "It's a tie! Both of us chose " + input + ".";
    } else if (input === "scissors") {
      return "I chose rock.";
    } else if (input.toLowerCase().includes("how are you")) {
      return "I'm just a computer program, but thanks for asking!";
    } else if (input.toLowerCase().includes("your name")) {
      return "I'm a chatbot, so I don't have a personal name. You can call me ChatBot.";
    } else if (input.toLowerCase().includes("weather")) {
      return "I'm sorry, I don't have real-time weather information. You can check a weather website for that.";
    } else if (input.toLowerCase().includes("time")) {
      const currentTime = new Date().toLocaleTimeString();
      return "The current time is " + currentTime + ".";
    } else if (input.toLowerCase().includes("hello")) {
      return "Hello! How can I help you today?";
    } else if (input.toLowerCase().includes("goodbye")) {
      return "Goodbye! Have a great day!";
    } else {
      return "I'm not sure how to respond to that. Please ask me something else.";
    }
  }

  ngOnInit() {
    // Code to handle Enter key press
    let userInput = this.elementRef.nativeElement.querySelector('#textInput');
    if (userInput) {
      userInput.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.getResponse();
        }
      });
    }
  }
}
