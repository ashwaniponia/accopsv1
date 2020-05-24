import { Component, OnInit } from '@angular/core';
import { Filter1Pipe } from '../filter1.pipe'
import { DealService} from "../deal.service";
import { GlobalConstants }from '../common/global-constants';
@Component({
  selector: 'app-update-deal',
  templateUrl: './update-deal.component.html',
  styleUrls: ['./update-deal.component.css']
})
export class UpdateDealComponent implements OnInit {
  public search_text = "";
  public search_user = "";
  public search_company = "";
  public l1 = GlobalConstants.info.L1;
  public l2 = GlobalConstants.info.L2;
  public l3 = GlobalConstants.info.L3;
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

  constructor(private _dealservice: DealService) { }



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
        if(data == "Error")
        console.log("Error");
        else
        console.log("Succesfully added");
      });
  }

  public func2(item)
  {
      item.Hide = true;
      this._dealservice.markAuthorised(item).subscribe(data =>{
        if(data == "Error")
        console.log("Error");
        else
        console.log("Succesfully added");
      });
  }
  public func3(item)
  {
      item.Hide = true;
      this._dealservice.addtoL3(item).subscribe(data =>{
        if(data == "Error")
        console.log("Error");
        else
        console.log("Succesfully added");
      });
  }

  public func4(item)
  {
    item.Hide = true;
    this._dealservice.markAuthorised(item).subscribe(data =>{
      if(data == "Error")
      console.log("Error");
      else
      console.log("Succesfully added");
    });
  }


}
