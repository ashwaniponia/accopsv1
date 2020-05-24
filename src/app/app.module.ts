import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { Filter1Pipe } from './filter1.pipe';
import { Filter2Pipe } from './filter2.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { NotificationsComponent } from './notifications/notifications.component';

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
    UpdateDealComponent,
    ViewUserComponent,
    UpdateUserComponent,
    CreateUserComponent,
    Filter1Pipe,
    Filter2Pipe,
    UserProfileComponent,
    NotificationsComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
            // provider used to create fake backend
            //fakeBackendProvider
          ],
  bootstrap: [AppComponent]
})
export class AppModule { }

