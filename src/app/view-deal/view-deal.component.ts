import { Component, OnInit } from '@angular/core';
import { Filter1Pipe } from '../filter1.pipe'
@Component({
  selector: 'app-view-deal',
  templateUrl: './view-deal.component.html',
  styleUrls: ['./view-deal.component.css']
})
export class ViewDealComponent implements OnInit {
  public search_text = "";
  public array = [
    {
        dealId : "1234",
        Progress : 25,
        Hide : true,
        pieChartLabels: ["Pending", "InProgress"],
        pieChartData: [40,60],
        pieChartType:'pie',
        pieChartOptions: {'backgroundColor': [
               "#FF6384",
               "#4BC0C0"
            ]},


        chartClicked(e:any):void {
            console.log(e);
        },


        chartHovered(e:any):void {
              console.log(e);
        }
    },
    {
      dealId : "2345",
      Progress : 90,
      Hide : true,
      pieChartLabels: ["Pending", "InProgress"],
      pieChartData: [30 , 70],
      pieChartType: 'pie',
      pieChartOptions:  {'backgroundColor': [
             "#FF6384",
             "#4BC0C0"
          ]},


      chartClicked(e:any):void {
          console.log(e);
      },


      chartHovered(e:any):void {
            console.log(e);
      }
    },
    {
      dealId : "9990",
      Progress : 49,
      Hide : true,
      pieChartLabels: ["Pending", "InProgress"],
      pieChartData: [40, 60],
      pieChartType: 'pie',
      pieChartOptions: {'backgroundColor': [
             "#FF6384",
             "#4BC0C0"
          ]},


      chartClicked(e:any):void {
          console.log(e);
      },


      chartHovered(e:any):void {
            console.log(e);
      }
    },


    {
      dealId : "12110",
      Progress : 100,
      Hide : true,
      pieChartLabels: ["Pending", "InProgress"],
      pieChartData: [90, 10],
      pieChartType: 'pie',
      pieChartOptions: {'backgroundColor': [
             "#FF6384",
             "#4BC0C0"
          ]},


      chartClicked(e:any):void {
          console.log(e);
      },


      chartHovered(e:any):void {
            console.log(e);
      }
    },


    {
      dealId : "1919",
      Progress : 40,
      Hide : true,
      pieChartLabels: ["Pending", "InProgress"],
      pieChartData: [80, 20],
      pieChartType: 'pie',
      pieChartOptions: {'backgroundColor': [
             "#FF6384",
             "#4BC0C0"
          ]},


      chartClicked(e:any):void {
          console.log(e);
      },


      chartHovered(e:any):void {
            console.log(e);
      }
    },

    {
      dealId : "1210",
      Progress : 10,
      Hide : true,
      pieChartLabels: ["Pending", "InProgress"],
      pieChartData: [60, 10],
      pieChartType: 'pie',
      pieChartOptions: {'backgroundColor': [
             "#FF6384",
             "#4BC0C0"
          ]},


      chartClicked(e:any):void {
          console.log(e);
      },


      chartHovered(e:any):void {
            console.log(e);
      }
    }


  ]




  constructor() { }

  ngOnInit(): void {
  }

}
