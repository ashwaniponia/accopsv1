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
import { DashboardComponent } from './dashboard/dashboard.component';
import { Barchart1Component } from './dashboard/barchart1/barchart1.component';
import { Barchart2Component } from './dashboard/barchart2/barchart2.component';
import { Barchart3Component } from './dashboard/barchart3/barchart3.component';
import { Barchart4Component } from './dashboard/barchart4/barchart4.component';
import { TableComponent } from './dashboard/table/table.component';
import { InfoboxComponent } from './dashboard/infobox/infobox.component';
import { ChartsModule } from 'ng2-charts';
import { UpdateDealComponent } from './update-deal/update-deal.component';
@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CreateDealComponent,
    ViewDealComponent,
    DashboardComponent,
    Barchart1Component,
    Barchart2Component,
    Barchart3Component,
    Barchart4Component,
    TableComponent,
    InfoboxComponent,
    UpdateDealComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
