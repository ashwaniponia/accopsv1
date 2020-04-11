import { Component, OnInit } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  userModel = new User('Accops' , 'A1234' , 'contender' , 'Karandeep' , 'Bajwa' , '501 Rose building Regency Meadows Dhanori Pune ' , 'Pune' , 'India' , '411015');
  constructor() { }

  ngOnInit(): void {
  }

}
