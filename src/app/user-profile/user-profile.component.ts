import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { GlobalConstants } from '../common/global-constants';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public url = "assets/img/images.jpg";
  public userModel  = {company : "" , imge : "" , address: "" , orgcode : "" , username : "" , firstname : "" , lastname : "" , city : "" , country : "" , postalcode : "" , L1:[] , L2:[], L3:[] , regioncode:[] , maxval : 0 , dealspending: 0 , rejecteddeals : 0 , acceptedeals : 0 , totaldeals : 0 };
  constructor(private _userservice : UserServiceService , private toastr : ToastrService) { }

  ngOnInit(): void {
    this._userservice.getUser(GlobalConstants.info.username).subscribe(data=>{
      console.log(data);
        this.userModel = data;
        if(this.userModel.imge != null)
        this.url = "http://localhost:4000/uploads/" + this.userModel.imge;
    },
    error=>{
      this.toastr.error('Error', error , {timeOut : 5000});
    });
}
}
