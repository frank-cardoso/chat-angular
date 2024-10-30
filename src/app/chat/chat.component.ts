import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Message {
  role: 'atendente' | 'usuario';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent {
  messages: Message[] = [];
  messageText: string = '';
  isAtendenteTurn: boolean = true;

  sendMessage() {
    if (this.messageText.trim()) {
      this.messages.push({
        role: this.isAtendenteTurn ? 'atendente' : 'usuario',
        text: this.messageText
      });
      this.messageText = '';
      this.isAtendenteTurn = !this.isAtendenteTurn;

      setTimeout(() => {
        const chatBox = document.querySelector('.chat-box') as HTMLElement;
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 0);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}