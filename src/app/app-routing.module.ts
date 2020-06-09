import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Barchart1Component } from './dashboard/barchart1/barchart1.component';
import { Barchart2Component } from './dashboard/barchart2/barchart2.component';
import { Barchart3Component } from './dashboard/barchart3/barchart3.component';
import { Barchart4Component } from './dashboard/barchart4/barchart4.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateDealComponent } from './create-deal/create-deal.component';
import { UpdateDealComponent } from './update-deal/update-deal.component';
import { ViewDealComponent } from './view-deal/view-deal.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { NotificationsComponent } from './notifications/notifications.component';



const accountModule = () => import('./account/account.module').then(x => x.AccountModule);


const routes: Routes = [


  //{path: '', redirectTo: '/DASHBOARD', pathMatch : 'full'
  //},
    { path: 'account', loadChildren: accountModule },
    { path: '',   redirectTo: '/DASHBOARD', pathMatch: 'full' }, 

    // otherwise redirect to home
    { path: 'DASHBOARD' , component : DashboardComponent ,canActivate:[AuthGuard],
      children : [
      {path : 'bar-chart1' , component: Barchart1Component },
      {path : 'bar-chart2' , component: Barchart2Component },
      {path : 'bar-chart3' , component: Barchart3Component },
      {path : 'bar-chart4' , component: Barchart4Component }
      ]
    }, {path: 'USER-PROFILE' , component : UserProfileComponent
  },
  {path: 'CREATE-DEAL' , component : CreateDealComponent,canActivate:[AuthGuard]
  },
  {
    path :'UPDATE-DEAL', component : UpdateDealComponent,canActivate:[AuthGuard]
  },
  {
    path :'VIEW-DEAL' , component : ViewDealComponent,canActivate:[AuthGuard]
  },
  {
    path : 'CREATE-USER' , component : CreateUserComponent,canActivate:[AuthGuard]
  },
  {
    path : 'VIEW-USER' , component : ViewUserComponent,canActivate:[AuthGuard]
  },
  {
    path : 'UPDATE-USER' , component : UpdateUserComponent,canActivate:[AuthGuard]
  },
  {
    path : 'NOTIFICATION' , component : NotificationsComponent , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FlexLayoutModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
