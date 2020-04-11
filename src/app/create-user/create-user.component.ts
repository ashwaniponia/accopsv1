import { Component, OnInit } from '@angular/core';
import {User} from '../user';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
   userModel = new User('' , 'A1234' , 'contender' , 'Karandeep' , 'Bajwa' , '501 Rose building Regency Meadows Dhanori Pune ' , 'Pune' , 'India' , '411015');
   hideform = false;
   hidemsg = true;

   func1()
   {
     this.hideform = true;
     this.hidemsg = false;
   }


   func2()
   {
     this.hideform = false;
     this.hidemsg = true;
   }
  constructor() { }

  ngOnInit(): void {
  }

}
