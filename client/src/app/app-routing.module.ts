import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';

const routes: Routes = [
  { path: 'contacts', component: ContactsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '', component: ChatPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
