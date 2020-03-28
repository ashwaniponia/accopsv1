import { Component, OnInit } from '@angular/core';
import {Deal} from '../deal'

@Component({
  selector: 'app-create-deal',
  templateUrl: './create-deal.component.html',
  styleUrls: ['./create-deal.component.css']
})
export class CreateDealComponent implements OnInit {

  constructor() { }
  
  DummyDeal = new Deal('XYZ',50,'ABC',0);
  submitted = false;

  onSubmit(){
    this.submitted = true;
  }

  ngOnInit(): void {
  }

  newDeal(){
    this.DummyDeal = new Deal('',0,'',0)
  }

}
