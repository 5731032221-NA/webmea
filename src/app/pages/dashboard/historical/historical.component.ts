import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
// import * as Highcharts from 'highcharts';
import { StockChart } from 'angular-highcharts';
// declare var require: any;
// let Boost = require('highcharts/modules/boost');
// let noData = require('highcharts/modules/no-data-to-display');
// let More = require('highcharts/highcharts-more');

// Boost(Highcharts);
// noData(Highcharts);
// More(Highcharts);
// noData(Highcharts);




@Component({
  selector: 'ngx-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent {
  startDate = new Date();
  endDate = new Date();
  stock: StockChart;
  stock2: StockChart;
  dataemo: any;
  from: any = "20200401";
  to: any = formatDate(new Date(), 'yyyyMMdd', 'en');;
  topdata: any[];

  // Highcharts: typeof Highcharts = Highcharts;
  ngOnInit() {
    this.http.get<any>('http://20.188.110.129:3000/gethistoricalemo').subscribe((res) => {
      console.log(res)
      // this.dataemo = res
      this.stock = new StockChart({
        chart: {
          type: 'spline'
          // type: 'areaspline'
        },
        rangeSelector: {
          selected: 4
        },
        credits: {
          enabled: false
        },

        // exporting: {
        //   buttons: {
        //       contextButton: {
        //           menuItems: [{
        //               textKey: 'downloadXLS',
        //               onclick: function () {
        //                   this.downloadXLS();
        //               }
        //           }, {
        //               textKey: 'downloadCSV',
        //               onclick: function () {
        //                   this.downloadCSV();
        //               }
        //           }]
        //       }
        //   }
        // },

        yAxis: {
          labels: {
            formatter: function () {
              return (this.value > 0 ? ' + ' : '') + this.value + '%';
            }
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },

        xAxis: {
          type: 'datetime',
          gridLineWidth: 1,
          labels: {

            style: {
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          series: {
            compare: 'percent',
            showInNavigator: true
          }
        },

        tooltip: {

          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true
        },
        legend: {
          enabled: true
        },
        colors: ['#8FcBFA', '#FF7701', '#7D7D7D'],
        // series: [{ name: "Happy", data: []},
        // { name: "Happy", data: []},
        // { name: "Happy", data: []}]
        series: res
      });
    })

    this.http.get<any>('http://20.188.110.129:3000/gethistoricalcheckin').subscribe((res) => {
      console.log(res)
      // this.dataemo = res
      this.stock2 = new StockChart({
        chart: {
          type: 'spline'
        },
        rangeSelector: {
          selected: 4
        },
        credits: {
          enabled: false
        },

        // exporting: {
        //   buttons: {
        //       contextButton: {
        //           menuItems: [{
        //               textKey: 'downloadXLS',
        //               onclick: function () {
        //                   this.downloadXLS();
        //               }
        //           }, {
        //               textKey: 'downloadCSV',
        //               onclick: function () {
        //                   this.downloadCSV();
        //               }
        //           }]
        //       }
        //   }
        // },

        yAxis: {
          labels: {
            formatter: function () {
              return (this.value > 0 ? ' + ' : '') + this.value + '%';
            }
          },
          plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
          }]
        },
        xAxis: {
          type: 'datetime',
          gridLineWidth: 1,
          labels: {
            style: {
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          series: {
            compare: 'percent',
            showInNavigator: true
          }
        },

        tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true
        },
        legend: {
          enabled: true
        },
        colors: ['#53A9F2', '#FF6B4D', '#BFBFBD', '#4EC873'],

        // series: [{ name: "Happy", data: []},
        // { name: "Happy", data: []},
        // { name: "Happy", data: []}]
        series: res
      });
    })
    console.log("profile2");
    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/').subscribe((topdata) => {
        profile.forEach((element) => {

          if (topdata[element.id] == null) {
            element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
          } else {
            element['topdata'] = topdata[element.id];
          }


        })
        profile.sort((a, b) => (b.topdata.total - a.topdata.total));
        this.topdata = profile;
        console.log("profile", profile);
      })
    })
  }

  toplist(type: string, event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${type}: ${event.value}`);
    // console.log(type, event);
    let date_ob = event.value;
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    if (type == "startDate") {
      this.from = year + month + date
    } else if (type == "EndDate") {
      this.to = year + month + date
    }

    this.http.get<any[]>('http://20.188.110.129:3000/getmeaprofile').subscribe((profile) => {
      this.http.get<any[]>('http://20.188.110.129:3000/gethistoricaltop/' + this.from + "/" + this.to).subscribe((topdata) => {
        profile.forEach((element) => {

          if (topdata[element.id] == null) {
            element['topdata'] = { "thebest": 0, "happiness": 0, "mealover": 0, "total": 0 };
          } else {
            element['topdata'] = topdata[element.id];
          }


        })
        profile.sort((a, b) => (b.topdata.total - a.topdata.total));
        this.topdata = profile;
        console.log("profile", profile);
      })
    })
  }



  constructor(private http: HttpClient, private router: Router) {


    // this.http.get<any>('http://20.188.110.129:3000/countmeaprofile').subscribe((res) => { console.log(res) })


  }




}

