import { dealexist } from './../dealexist';
import { Observable } from 'rxjs';
import { DealService } from './../deal.service';
import { Component, OnInit } from '@angular/core';
import {Deal} from '../deal'
import { promise } from 'protractor';
import { resolve } from 'dns';
import { GlobalConstants } from '../common/global-constants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {
  constructor(private _dealservice:DealService , private router : Router) { }
  DummyDeal = new Deal("" , 0 , "" , 0 , 0 , "");
  public RegionCode = GlobalConstants.info.regioncode;
  public message;
  ngOnInit(): void {
  }

  createDeal(dealForm){

    if(dealForm.errors)
    {
        alert("Filling out all details is mandatory");
    }
    else
    {
         dealForm.resetForm();
         this._dealservice.addDeal(this.DummyDeal.OrgName,this.DummyDeal.amount,this.DummyDeal.description , this.DummyDeal.time , this.DummyDeal.regioncode).subscribe(params =>{
           this.message = params;
           alert(this.message);

         },error =>this.message=error,() =>{
           alert("Error in Submission");
           this.router.navigateByUrl('/CREATE-DEAL');
        });
    }
  }
}
