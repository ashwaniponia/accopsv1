import { GlobalConstants } from './common/global-constants';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  CreateDeal = GlobalConstants.CreateDeal;
  title = 'accops-v1';
}
