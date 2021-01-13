import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { UserlistComponent } from './userlist/userlist.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageFormComponent } from './message-form/message-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ChatPageComponent,
    AboutPageComponent,
    ContactsPageComponent,
    FooterComponent,
    ChatComponent,
    UserlistComponent,
    MessagesComponent,
    MessageFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
