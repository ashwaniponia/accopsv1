import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

 public PermanentRights ;
 public EditUserFlag ;
 public DealRightsFlag ;

 public DealRights ;
 public UserRights ;


  constructor() {

  this.PermanentRights =['DASHBOARD' , 'USER-PROFILE' , 'NOTIFICATION']

  this.EditUserFlag = true
  this.DealRightsFlag = true

  this.DealRights = GlobalConstants.info.drights.slice(0);
  this.UserRights = GlobalConstants.info.urights.slice(0);
  console.log("Look!!");

  var pos = this.UserRights.indexOf('DELETE');
  if(pos != -1){
    this.UserRights.splice(pos , 1);
  }
  console.log(GlobalConstants.info.urights);



  }

  ngOnInit(): void {
  }

   myAccFuncUser() {

    var x = document.getElementById("UserRights");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-red";
    } else {
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-red", "");
    }
  }


  myAccFuncDeal() {

    var x = document.getElementById("DealRights");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-red";
    } else {
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-red", "");
    }
  }

}
