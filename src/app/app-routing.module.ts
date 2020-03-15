import { CreateDealComponent } from './create-deal/create-deal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {path: '' , component : CreateDealComponent
  },
  {path: 'DASHBOARD' , component : CreateDealComponent
  },
  {path: 'USER-PROFILE' , component : CreateDealComponent
  },
  {path: 'deal' , component : CreateDealComponent
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