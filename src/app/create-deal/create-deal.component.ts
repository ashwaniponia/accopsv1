import { dealexist } from './../dealexist';
import { Observable } from 'rxjs';
import { DealService } from './../deal.service';
import { Component, OnInit } from '@angular/core';
import {Deal} from '../deal'
import { promise } from 'protractor';
import { resolve } from 'dns';
import { GlobalConstants } from '../common/global-constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {
  constructor(private _dealservice:DealService , private router : Router , private toastr : ToastrService) { }
  DummyDeal = new Deal("" , 0 , "" , 0 , 0 , "");
  public RegionCode = GlobalConstants.info.regioncode;
  public message;
  ngOnInit(): void {
  }

  createDeal(dealForm){

    if(dealForm.errors)
    {
        this.toastr.error('Error',"Filling out all details is mandatory" , {timeOut : 5000});
    }
    else
    {
         this._dealservice.addDeal(this.DummyDeal.OrgName,this.DummyDeal.amount,this.DummyDeal.description , this.DummyDeal.time , this.DummyDeal.regioncode , GlobalConstants.info.username).subscribe(params =>{
           this.message = params;
            dealForm.resetForm();
             this.toastr.success('Deal Created',this.message, {timeOut : 5000});

         },error =>{this.message=error  ;    this.toastr.error('Error',error , {timeOut : 5000}); });
    }
  }
}
