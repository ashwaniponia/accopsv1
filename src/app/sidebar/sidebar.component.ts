import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  PermanentRights =['DASHBOARD' , 'USER-PROFILE']

  EditUserFlag = true
  DealRightsFlag = true

  DealRights = ['VIEW-DEAL','CREATE-DEAL','UPDATE-DEAL']
  UserRights = ['VIEW-USER','CREATE-USER','UPDATE-USER']


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
