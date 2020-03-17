import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barchart1',
  templateUrl: './barchart1.component.html',
  styleUrls: ['./barchart1.component.css']
})
export class Barchart1Component implements OnInit {
  public BOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};

public BLabels = ['2006' , '2007' , '2008' , '2009' , '2010' , '2011' , '2012'];
public BChartType = 'bar';
public BLegend = true;
public BData = [
  {data: [65 , 70 , 11 , 10, 20 , 30 , 40], label: 'Series A'},
  {data: [20 , 30 , 40 , 50 , 60 , 70 , 80], label: 'Series B'}
];

  constructor() { }

  ngOnInit() {
  }

}
