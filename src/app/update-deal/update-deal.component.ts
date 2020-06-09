import { Component, OnInit } from '@angular/core';
import { Filter1Pipe } from '../filter1.pipe'
import { DealService} from "../deal.service";
import { GlobalConstants }from '../common/global-constants';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-deal',
  templateUrl: './update-deal.component.html',
  styleUrls: ['./update-deal.component.css']
})
export class UpdateDealComponent implements OnInit {
  public search_text = "";
  public search_user = "";
  public search_company = "";
  public l1 = GlobalConstants.info.L1.slice(0);
  public l2 = GlobalConstants.info.L2.slice(0);
  public l3 = GlobalConstants.info.L3.slice(0);
  public array1 = [];
  public array2 = [];
  public array3 = [];

  public chartClicked(e:any):void {
      console.log(e);
  }


  public chartHovered(e:any):void {
        console.log(e);
  }
  public   pieChartLabels = ["Pending", "InProgress"];
  public pieChartType = "pie";
  public pieChartOptions = {'backgroundColor': [
         "#FF6384",
         "#4BC0C0"
      ]};


  public array = [];

  constructor(private _dealservice: DealService , private toastr : ToastrService) { }



  ngOnInit(): void
  {

  }


  public load1()
  {
      this._dealservice.getDealsL1(this.l1).subscribe(data => {
        this.array = data;
      });
  }

  public load2()
  {

      this._dealservice.getDealsL2(this.l2).subscribe(data => {
        this.array = data;
        }
      );
  }

  public load3()
  {

      this._dealservice.getDealsL3(this.l3).subscribe(data => {
        this.array = data;
      }
      );
  }

  public func1(item)
  {
      item.Hide = true;
      this._dealservice.addtoL2(item).subscribe(data =>{
          this.toastr.success('Authorised', data , {timeOut : 5000});
      },
      error =>{
          this.toastr.error('Error', error , {timeOut : 5000});
      });
  }

  public func2(item)
  {
      item.Hide = true;
      this._dealservice.markAuthorised(item).subscribe(data =>{
        this.toastr.success('Authorised', data , {timeOut : 5000});
      },
      error =>{
          this.toastr.error('Error', error , {timeOut : 5000});
      });
  }
  public func3(item)
  {
      item.Hide = true;
      this._dealservice.addtoL3(item).subscribe(data =>{
        this.toastr.success('Authorised', data , {timeOut : 5000});
      },
      error =>{
          this.toastr.error('Error', error , {timeOut : 5000});
      });
  }

  public func4(item)
  {
    item.Hide = true;
    this._dealservice.markAuthorised(item).subscribe(data =>{
    this.toastr.success('Authorised', data , {timeOut : 5000});
    },
    error =>{
        this.toastr.error('Error', error , {timeOut : 5000});
    });
  }


}
