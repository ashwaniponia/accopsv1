import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';
import { GlobalConstants } from '../common/global-constants';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public array = [];
  constructor(private _notificationserv : NotificationService) { }

  ngOnInit(): void
  {
    this._notificationserv.getNotifications(GlobalConstants.info.username).subscribe(data=>{
      console.log(data);
      for(var x = 0 ; x < data.length ; x++)
      {
        GlobalConstants.notify.push(data[x].message);

      }
      console.log(GlobalConstants.notify);
      this.array = GlobalConstants.notify;
    });
  }
}
