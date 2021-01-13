import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../messages/messages.component';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  @Input()
  messages: IMessage[]

  message: string = ''

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
  }

  submitHandler(e): void {    
    e.preventDefault();
    e.target[0].value = '';
    if (this.message.length) {
      this.messagesService.sendMessage(this.message);
    }
  }

  inputHandler(e): void {
    this.message = e.target.value;
  }

}
