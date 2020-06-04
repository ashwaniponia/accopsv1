import { Component, OnInit } from '@angular/core';
import {User} from '@app/_models'
import { AccountService } from '@app/_services';
import { GlobalConstants} from '../common/global-constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  user : User;
  public name  = GlobalConstants.info.username;
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
}

  logout() {
    this.accountService.logout();
 }

}
