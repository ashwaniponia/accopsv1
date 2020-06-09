import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';
import { GlobalConstants } from '../common/global-constants';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public array = [];
  constructor(private _notificationserv : NotificationService , private toastr : ToastrService) { }

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
          if(a.Metric == b.Metric)
          return (a.time-b.time);
          if(a.Metric == 'minutes')
          return -1;
          if(a.Metric == 'hours' && b.Metric == 'days')
          return -1;

          return 1;
      });

      console.log(data);
      this._notificationserv.setStatus(GlobalConstants.info.username).subscribe(data1=>{
        console.log(data1);
      },
      error=>{
        this.toastr.error("Error" ,error , {timeOut:5000});
      });
    },
    error =>{
      this.toastr.error("Error" ,error , {timeOut:5000});
    }
  );
  }

  function(x)
  {
    console.log(x);
    if(x == "unseen")
    return false;
    else
    return true;
  }
}
