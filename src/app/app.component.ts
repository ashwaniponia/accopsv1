import { Component } from '@angular/core';
import { AccountService } from './_services';
import { User } from './_models';
import { GlobalConstants } from './common/global-constants';
import io from 'socket.io-client';
declare var $: any;
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent  {
    user: User;
    public socket = null;
    public data;
    constructor(private accountService: AccountService ) {
        this.accountService.user.subscribe(x =>{

        this.user = x
        GlobalConstants.info = x;
          console.log(  GlobalConstants.isloggedin );
        GlobalConstants.isloggedin = true;
        //this.msg1 = GlobalConstants.info.username+"onUpdate";
        if(this.socket == null && GlobalConstants.isloggedin == true)
        {
        this.socket = io.connect('http://localhost:4000');
        GlobalConstants.sock = true;
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
          if(this.socket != null && GlobalConstants.isloggedin == true){
            this.socket.on(GlobalConstants.info.username + "reject" , (data)=>{
                this.data = data;
                alert(data);
                //$('.toast').toast('show');
            });
            this.socket.on(GlobalConstants.info.username + "auth" , (data)=>{
                this.data = data;
                alert(data);
                //$('.toast').toast('show');
            });
            this.socket.on(GlobalConstants.info.username + "onL1auth" , (data)=>{
                this.data = data;
                alert(data);
                //$('.toast').toast('show');
            });
            this.socket.on(GlobalConstants.info.username + "onL3auth" , (data)=>{
                this.data = data;
                //$('.toast').toast('show');
                alert(data);
            });
            this.socket.on(GlobalConstants.info.username + "onUpdate" , (data)=>{
                this.data = data;
                //$('.toast').toast('show');
                alert(data);
            });
          }
    }
}
