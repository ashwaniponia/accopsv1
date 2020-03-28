import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-deal',
  templateUrl: './update-deal.component.html',
  styleUrls: ['./update-deal.component.css']
})
export class UpdateDealComponent implements OnInit {

  constructor() { }

  submitted = false;

  onSubmit(){
    this.submitted = true;
  }

  ngOnInit(): void {
  }

}
