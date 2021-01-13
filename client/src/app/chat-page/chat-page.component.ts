import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';

export interface IUser {
  name: string
  entryTime: Date
  id: number
  firstInit?: boolean
}

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {

  currentUser: IUser = {
    name: '',
    entryTime: new Date(),
    id: 0
  }

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.currentUserSubject.subscribe(user => {
      if (!user) {
        return this.currentUser = {
          name: '',
          entryTime: new Date(),
          id: 0};
      }
      this.currentUser = user;
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value
    this.messagesService.createUser({ name, password });
    this.messagesService.currentUserSubject.subscribe(user => {
      if (!user) {
        return this.currentUser = {
          name: '',
          entryTime: new Date(),
          id: 0};
      }
      this.currentUser = user;
    });
  }

}
