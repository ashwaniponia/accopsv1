import { dealexist } from './../dealexist';
import { Observable } from 'rxjs';
import { DealService } from './../deal.service';
import { Component, OnInit } from '@angular/core';
import {Deal} from '../deal'
import { promise } from 'protractor';
import { resolve } from 'dns';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {

  public exist ;
  constructor(private _dealservice:DealService) { }
  DummyDeal = new Deal("" , 0 , "" , 0 , 0 , "");
  public submitted = false;
  public RegionCode = GlobalConstants.info.regioncode;
  public hide = true;
  public message;
  ngOnInit(): void {
  }

  createDeal(){
    this.submitted = true;
    console.log(this.DummyDeal);
     this._dealservice.addDeal(this.DummyDeal.OrgName,this.DummyDeal.amount,this.DummyDeal.description , this.DummyDeal.time , this.DummyDeal.regioncode).subscribe(params =>{
       this.hide = false;
       this.message = params;
     },error =>this.message=error,() =>{
      console.log('UserApiService : Create User completed')
    });
  }

}
