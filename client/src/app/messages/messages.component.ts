import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IUser } from '../chat-page/chat-page.component';
import { MessagesService } from '../services/messages.service';

export interface IMessage {
  from: string
  fromID: number
  incommingTime: Date
  message: string
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input()
  messages: IMessage[]

  public currentUser: IUser

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private messagesService: MessagesService) {  }

  ngOnInit(): void {   
    this.scrollToBottom(); 
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

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}
