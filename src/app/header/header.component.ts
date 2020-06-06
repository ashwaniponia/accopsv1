import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models'
import { AccountService } from '@app/_services';
import { GlobalConstants} from '../common/global-constants';
import { NotificationService} from '../notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  user : User;
  public cnt = 0;
  public name  = GlobalConstants.info.username;
  constructor(private accountService: AccountService , private _notificationserv : NotificationService) {
    this.user = this.accountService.userValue;
}

  logout() {
    this.accountService.logout();
 }

 ngOnInit()
 {
   this._notificationserv.getFreshNotifications(GlobalConstants.info.username).subscribe(data=>{
         GlobalConstants.notification_cnt = data;
   });
 }

 getVal(){
   return GlobalConstants.notification_cnt;
 }

}
