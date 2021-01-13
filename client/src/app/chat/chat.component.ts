import { Component, OnInit } from '@angular/core';
import { IMessage } from '../messages/messages.component';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: IMessage[] = []

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.messages.subscribe(messages => {
      this.messages = messages;
    });
  }

}
