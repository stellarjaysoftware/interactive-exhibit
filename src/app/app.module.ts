import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import {FormsModule} from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ViewComponent,
    AddComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
