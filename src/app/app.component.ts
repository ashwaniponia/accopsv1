import { Component } from '@angular/core';

import { AccountService } from './_services';
import { User } from './_models';
import { GlobalConstants } from './common/global-constants';
@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x =>{

        this.user = x
        GlobalConstants.info = x;
        console.log("look here");
        console.log(GlobalConstants.info);
      });

    }

    logout() {
        this.accountService.logout();
    }
}
