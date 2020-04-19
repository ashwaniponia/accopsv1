import { Component, OnInit } from '@angular/core';
import { User } from '../user';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  userModel = new User('Apple' , 'A1234' , 'contender' , 'Karandeep' , 'Bajwa' , '501 Rose building Regency Meadows Dhanori Pune ' , 'Pune' , 'India' , 411015);
  public hideform = true;
  public hidemsg = true;
  func1(){
    this.hideform = false;
    this.hidemsg = true;
  }

  func2()
  {
    this.hidemsg = false;
    this.hideform=true;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
