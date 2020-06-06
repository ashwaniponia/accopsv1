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

      for(var i = 0 ; i < data.length ; i++){
        console.log(Math.round(data[i].time));
        data[i].time = Math.round(data[i].time);
      }
      this.array = data;
      this.array.sort(function(a , b){
          return (a.time-b.time);
      });

      console.log(data);
      this._notificationserv.setStatus(GlobalConstants.info.username).subscribe(data1=>{
        console.log(data1);
      });
    });
  }
}
