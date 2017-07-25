import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { LoggedComponent } from './components/logged.component';
import { EditFormComponent } from './components/edit-form.component';
import { ResultTableComponent } from './components/result-table.component';
import { NewTicketFormComponent } from './components/new-ticket-form.component';
import { OrderByPipe } from './orderby.pipe';

import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoggedComponent,
    EditFormComponent,
    ResultTableComponent,
    NewTicketFormComponent,
    OrderByPipe,
  ],
  providers: [
    DataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
