import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Filter2Pipe} from '../filter2.pipe';
import { UserServiceService } from '../user-service.service';
import { User1 } from '../User1';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  providers : [UserServiceService]
})
export class ViewUserComponent implements OnInit {

  public search_user_id="";
  public search_name="";
  public search_company="";
  public array = [];
  
  constructor(private _userservice : UserServiceService) { }

  ngOnInit(): void {
    this._userservice.getUsers().subscribe(resUserData => this.array = resUserData);
  }
  
  deleteUser(id) : void {
   //console.log(id)
     this._userservice.removeUser(id).subscribe(TempData => { 
      console.log('Success')
    },
    error =>console.log(error),() =>{
      console.log('UserApiService : Delete completed')
    });
  }
}
