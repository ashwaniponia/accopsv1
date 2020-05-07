import { Component, OnInit } from '@angular/core';
import { Filter1Pipe } from '../filter1.pipe'
import { DealService} from "../deal.service";

@Component({
  selector: 'app-view-deal',
  templateUrl: './view-deal.component.html',
  styleUrls: ['./view-deal.component.css'],
  providers:[DealService]
})
export class ViewDealComponent implements OnInit {




  public search_text = "";
  public search_user = "";
  public search_company = "";
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

  ngOnInit(): void {
    this._dealservice.getDeals().subscribe(data => this.array = data);
  }
}
