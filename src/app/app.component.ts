import { Component } from '@angular/core';
import { AccountService } from './_services';
import {UserServiceService} from './user-service.service';
import { User } from './_models';
import { GlobalConstants } from './common/global-constants';
import { ToastrService } from 'ngx-toastr';
import io from 'socket.io-client';
declare var $: any;
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent  {
    user: User;
    public socket= null;
    public data;
    constructor(private accountService: AccountService , private _userservice : UserServiceService , private toastr : ToastrService) {
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

                this.socket.on(GlobalConstants.info.username + "reject" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.error('Rejected', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
                this.socket.on(GlobalConstants.info.username + "auth" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.success('Authorised', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
                this.socket.on(GlobalConstants.info.username + "onL1auth" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.success('Authorised', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
                this.socket.on(GlobalConstants.info.username + "onL3auth" , (data)=>{
                   this.toastr.clear();
                    this.data = data;
                    this.toastr.success('Authorised', data , {timeOut : 5000});
                      GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
                this.socket.on(GlobalConstants.info.username + "onUpdate" , (data)=>{
                  this.toastr.clear();
                    this.data = data;
                      this.toastr.success('Updated', data , {timeOut : 5000});
                      GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });

                this.socket.on(GlobalConstants.info.username + "L1pending" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.warning('Pending', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
                this.socket.on(GlobalConstants.info.username + "L2pending" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.warning('Pending', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
              this.socket.on(GlobalConstants.info.username + "L3pending" , (data)=>{
                    this.toastr.clear();
                    this.data = data;
                    this.toastr.warning('Pending', data , {timeOut : 5000});
                    GlobalConstants.notification_cnt =   GlobalConstants.notification_cnt+1;
                });
            });
        }

        //console.log(this.socket);
        //console.log(GlobalConstants.socket);
     });


    }

    logout() {
        this.accountService.logout();
    }

    /*ngOnInit()
    {
    }*/
}
