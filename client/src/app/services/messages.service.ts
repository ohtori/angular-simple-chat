import { Injectable } from '@angular/core';
import { IUser } from '../chat-page/chat-page.component';
import { IMessage } from '../messages/messages.component';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

export interface IAuthUser {
  name: string
  password: string
}

@Injectable({providedIn: 'root'})
export class MessagesService {
  
  public onlineUsers: Subject<IUser[]> = new Subject()

  public messages: Subject<IMessage[]> = new Subject()

  public currentUserSubject: Subject<IUser> = new Subject()

  public messagesList: IMessage[] = []

  public serviceCurrentUser: IUser

  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:8888');

    this.socket.on('user-registred', (data) => {
      this.currentUserSubject.next(data.currentUser);
      this.onlineUsers.next(data.users);
    });

    this.socket.on('user-enter', (data) => {
      this.onlineUsers.next(data.users);
    });

    this.socket.on('message-sended', (data) => {
      const newMessages = [...this.messagesList, data];
      this.messages.next(newMessages);
    });

    this.messages.subscribe(messages => {
      this.messagesList = messages;
    });

    this.currentUserSubject.subscribe(user => {
      if (!user) {
        return this.serviceCurrentUser = {
          name: '',
          entryTime: new Date(),
          id: 0};
      }
      this.serviceCurrentUser = user;
    });
  }

  createUser(authUser: IAuthUser) {
    const user = {
      name: authUser.name,
      entryTime: new Date(),
      id: Date.now()
    }
    this.currentUserSubject.next(user)
    this.socket.emit('register-user', { user, password: authUser.password });
  }

  sendMessage(message: string) {
    const newMessage = {
      from: this.serviceCurrentUser.name,
      fromID: this.serviceCurrentUser.id,
      incommingTime: new Date(),
      message
    }
    
    this.socket.emit('send-message', { message: newMessage });
  }
}