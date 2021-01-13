import { Component, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../chat-page/chat-page.component';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  onlineUsers: IUser[] = []

  currentUser: IUser

  constructor(private messagesService: MessagesService) {
  }

  ngOnInit(): void {
    this.messagesService.onlineUsers.subscribe(users => {
      this.onlineUsers = users;
    });

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
