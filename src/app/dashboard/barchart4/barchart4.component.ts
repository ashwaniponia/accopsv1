import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart4',
  templateUrl: './barchart4.component.html',
  styleUrls: ['./barchart4.component.css']
})
export class Barchart4Component implements OnInit {


    public BOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    public BLabels = ['2006' , '2007' , '2008' , '2009' , '2010' , '2011' , '2012'];
    public BChartType = 'bar';
    public BLegend = true;
    public BData = [
      {data: [90 , 70 , 20 , 100, 90 , 30 , 99], label: 'Series A'},
      {data: [70 , 30 , 40 , 70 , 80 , 90 , 60], label: 'Series B'}
    ];
  constructor() { }

  ngOnInit() {
  }
}
