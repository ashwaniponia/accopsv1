import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Filter2Pipe} from '../filter2.pipe';
import { UserServiceService } from '../user-service.service';
import { User1 } from '../User1';
import { GlobalConstants } from '../common/global-constants';
import { ToastrService } from 'ngx-toastr';
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
  public drights = GlobalConstants.info.drights;
  public urights = GlobalConstants.info.urights;

  constructor(private _userservice : UserServiceService  , private toastr : ToastrService) { }

  ngOnInit(): void {
    this._userservice.getUsers().subscribe(resUserData => {this.array = resUserData

      for(var i = 0 ; i < this.array.length ; i++){

        if(this.array[i].imge != null)
        this.array[i].imge = "http://localhost:4000/uploads/" + this.array[i].imge;
        else
        this.array[i].imge = "assets/img/images.jpg";

        console.log("look over here ");
        console.log(this.urights);
      }
    });
  }

  deleteUser(item) : void {
   //console.log(id)
     item.Hide1 = true;
     this._userservice.removeUser(item._id).subscribe(TempData => {
        this.toastr.success('Authorised',TempData , {timeOut : 5000});
    },
    error=>{
        this.toastr.error('Error', error , {timeOut : 5000});
    });
  }
}
