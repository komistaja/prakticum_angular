import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { HeaderComponent } from './header.component';
import { LoggedComponent } from './logged.component';
import { EditFormComponent } from './edit-form.component';
import { ResultTableComponent } from './result-table.component';
import { NewTicketFormComponent } from './new-ticket-form.component';
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
