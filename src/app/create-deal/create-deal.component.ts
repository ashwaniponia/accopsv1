import { dealexist } from './../dealexist';
import { Observable } from 'rxjs';
import { DealService } from './../deal.service';
import { Component, OnInit } from '@angular/core';
import {Deal} from '../deal'
import { promise } from 'protractor';
import { resolve } from 'dns';

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {

  public exist ;
  constructor(private _dealservice:DealService) { }

  DummyDeal = new Deal('XYZ',50,'ABC',0, 0);
  submitted = false;

   onSubmit(){

    this.existDeal();
     if(this.exist.exist == true){
       this.submitted = false;
     }else{
       this.createDeal();
       this.submitted = true;
     }
  }

  ngOnInit(): void {
  }

  newDeal(){
    this.DummyDeal = new Deal('',0,'',0,0)
  }

  existDeal(){
      this._dealservice.dealExist(this.DummyDeal.OrgName,this.DummyDeal.amount,this.DummyDeal.description).subscribe(resUserData =>{
         this.exist = resUserData;
    })
  }

  createDeal(){
     this._dealservice.addDeal(this.DummyDeal.OrgName,this.DummyDeal.amount,this.DummyDeal.description , this.DummyDeal.time).subscribe(params =>{
       console.log("Success");
     },error =>console.log(error),() =>{
      console.log('UserApiService : Create User completed')
    });
  }

}
