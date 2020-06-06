import { Component } from '@angular/core';
import { AccountService } from './_services';
import {UserServiceService} from './user-service.service';
import { User } from './_models';
import { GlobalConstants } from './common/global-constants';
import io from 'socket.io-client';
declare var $: any;
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent  {
    user: User;
    public socket= null;
    public data;
    constructor(private accountService: AccountService , private _userservice : UserServiceService) {
        this.accountService.user.subscribe(x =>{
        this.user = x
        GlobalConstants.info = x;
        if(x)
        {
            GlobalConstants.isloggedin = true;
            this.socket = io.connect('http://localhost:4000');
            this.socket.on('connect' , ()=>{
              console.log("I am already inside");
              this.socket.emit('username' , GlobalConstants.info.username);
            });
        }
     });


    }

    logout() {
        this.accountService.logout();
    }

    ngOnInit()
    {
          console.log(this.socket);
          //console.log(GlobalConstants.socket);
          if(this.socket != null && GlobalConstants.isloggedin == true){
            this.socket.on(GlobalConstants.info.username + "reject" , (data)=>{
                this.data = data;
                alert(data);
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
            });
            this.socket.on(GlobalConstants.info.username + "auth" , (data)=>{
                this.data = data;
                alert(data);
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
            });
            this.socket.on(GlobalConstants.info.username + "onL1auth" , (data)=>{
                this.data = data;
                alert(data);
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
            });
            this.socket.on(GlobalConstants.info.username + "onL3auth" , (data)=>{
                this.data = data;
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                alert(data);
            });
            this.socket.on(GlobalConstants.info.username + "onUpdate" , (data)=>{
                this.data = data;
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                alert(data);
            });

            this.socket.on(GlobalConstants.info.username + "L1pending" , (data)=>{
                this.data = data;
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                alert(data);
            });
            this.socket.on(GlobalConstants.info.username + "L2pending" , (data)=>{
                this.data = data;
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                alert(data);
            });
          this.socket.on(GlobalConstants.info.username + "L3pending" , (data)=>{
                this.data = data;
                GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                alert(data);
            });
          }
    }
}
