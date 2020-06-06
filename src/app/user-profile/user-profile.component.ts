import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public url = "assets/img/images.jpg";
  public userModel;
  constructor(private _userservice : UserServiceService) { }

  ngOnInit(): void {
    this._userservice.getUser(GlobalConstants.info.username).subscribe(data=>{
      //console.log(data);
        this.userModel = data;
        if(this.userModel.imge != null)
        this.url = "http://localhost:4000/uploads/" + this.userModel.imge;
    });
}
}
