import { Component, OnInit } from '@angular/core';
import { Filter2Pipe} from '../filter2.pipe';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public search_user_id="";
  public search_name="";
  public search_company="";
  public array = [
    {
      userId : "1234",
      name : "Karandeep",
      imge : "assets/img/images.jpg",
      company : "Apple",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "1245629rs",
      Hide: true,
      Hide1 : false
    },
    {
      userId : "2345",
      name : "Ameet Rana",
      imge : "assets/img/images.jpg",
      company : "Accops",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "2345629rs",
      Hide:true,
      Hide1 : false
    },
    {
      userId : "1237",
      name : "Gursharandeep",
      imge : "assets/img/images.jpg",
      company : "Accops",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "1245987rs",
      Hide: true,
      Hide1 : false
    },
    {
      userId : "4432",
      name : "Ragini",
      imge : "assets/img/images.jpg",
      company : "Amazon",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "12459rs",
      Hide: true,
      Hide1 : false
    },
    {
      userId : "6654",
      name : "Rashmi singh",
      imge : "assets/img/images.jpg",
      company : "Michellin",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "62455629rs",
      Hide: true,
      Hide1 : false
    },
    {
      userId : "5267",
      name : "Manhar Brar",
      imge : "assets/img/images.jpg",
      company : "Michellin",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "10000009rs",
      Hide: true,
      Hide1 : false
    },
    {
      userId : "1784",
      name : "Arshia Sandhu",
      imge : "assets/img/images.jpg",
      company : "Microsoft",
      totaldeals : 120,
      acceptedeals : 20,
      rejecteddeals : 10,
      dealspending : 90 ,
      maxval : "12478787rs",
      Hide: true,
      Hide1 : false
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
