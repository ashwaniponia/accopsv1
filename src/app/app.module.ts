import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { FormsModule } from '@angular/forms';
import { ViewDealComponent } from './view-deal/view-deal.component';

@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CreateDealComponent,
    ViewDealComponent
  ],
  imports: [
    AlertModule.forRoot(), 
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
