import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import {User} from '../user';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  providers : [UserServiceService]
})
export class CreateUserComponent implements OnInit {
   userModel = new User('' , 'A1234' , 'contender' , 'Karandeep' , 'Bajwa' , '501 Rose building Regency Meadows Dhanori Pune ' , 'Pune' , 'India' , '411015');
   hideform = false;
   hidemsg = true;

   func1()
   {
     this.hideform = true;
     //this.createUser();
     this.hidemsg = false;
   }


   func2()
   {
     this.hideform = false;
     this.hidemsg = true;
   }

  constructor(private _userservice:UserServiceService) { }

  ngOnInit(): void {
  }

//  createUser() : void {
//     //console.log(id)
//       this._userservice.params.subscribe(params => { 
//        this.addUser(this.userModel.address,this.userModel.city,this.userModel.company,this.userModel.country,this.userModel.firstname,this.userModel.lastname,this.userModel.orgcode,this.userModel.postalcode,this.userModel.username);
//      },
//      error =>console.log(error),() =>{
//        console.log('UserApiService : Delete completed')
//      });
//    }

}
