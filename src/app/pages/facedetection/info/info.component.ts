import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClient } from '@angular/common/http';

import { NgxSpinnerService } from "ngx-spinner";
import { NgbDate,NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TrainComponent } from '../train/train.component'
import { DeleteComponent } from '../delete/deletet.component'

@Component({
  selector: 'info-modal',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  // displayedColumns = ['No.','ID', 'First Name - Last Name', 'Profile Picture'];
  dataSource: any[];
  p2: number = 1;
  itemsPerPage2: number = 10;
  title: string;
  name: string;
  surname: string;
  profileimage: any;
  listmea: any[];
  data: any;
  selectedCar: string;
  // datecal: any | null;
  model: any;
  date: { year: number, month: number };
  // absoluteIndex(indexOnPage: number): number {
  //   return this.itemsPerPage * (this.p - 1) + indexOnPage;
  // }

  constructor(
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    public dialog: MatDialog) {
    this.spinner.show();
    var date_ob = new Date();
    date_ob.setDate(date_ob.getDate());
    let date = date_ob.getDate();

    // current month
    let month = (date_ob.getMonth() + 1);

    // current year
    let year = date_ob.getFullYear();

    this.model = { year: year, month: month, day: date };

    var querydate = year +"-"+ ("0" +month).slice(-2) +"-"+ ("0" +date).slice(-2);

    this.http.get<any[]>('http://192.169.118.5:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {

      this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofile').subscribe(profile => {



        cropinfo.forEach((element) => {

          if (element["train"] != "") {
            console.log("train")
            profile.forEach((pr) => {
              if (element.train == pr.id) {
                element['ttitle'] = pr.title;
                element['tnameem'] = pr.name;
                element['tsurname'] = pr.surname;
              }

            })

            element['canselect'] = false;
          }
          else element['canselect'] = false;

          this.http.get<any[]>('http://192.169.118.5:3000/getcropimage/' + element.name).subscribe((image) => {

            element['image1'] = 'data:image/jpg;base64,' + image['data'];


          })

          if (element.detected != "") {
            profile.forEach((pr) => {
              if (element.detected == pr.id) {
                element['title'] = pr.title;
                element['nameem'] = pr.name;
                element['surname'] = pr.surname;
                element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
              }

            })
          }
        })


        this.listmea = [{ 'name': " เลือกพนักงาน -" }, ...profile];
        this.dataSource = cropinfo;
        // console.log("aa", this.dataSource);
        this.spinner.hide();
      })
    })
  }

  selectToday() {
    this.model = this.calendar.getToday();

  }

  trainDialog(item, name, title, nameem, surname, rowid): void {
    // console.log(item.item)
    let id = item.substring(0, 7);
    const dialogRef = this.dialog.open(TrainComponent, {
      width: '820px',
      data: { id, name, title, nameem, surname, rowid }
    });
    dialogRef.afterClosed().subscribe(result => {

    let date = this.model;

    let date_ob = new Date(date.year, date.month - 1, date.day);

    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    
    var querydate = year +"-"+ ("0" +month).slice(-2) +"-"+ ("0" +day).slice(-2);

      this.http.get<any[]>('http://192.169.118.5:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {

        this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofile').subscribe(profile => {



          cropinfo.forEach((element) => {


            if (element["train"] != "") {
              console.log("train")
              profile.forEach((pr) => {
                if (element.train == pr.id) {
                  element['ttitle'] = pr.title;
                  element['tnameem'] = pr.name;
                  element['tsurname'] = pr.surname;
                }

              })

              element['canselect'] = false;
            }
            else element['canselect'] = false;

            this.http.get<any[]>('http://192.169.118.5:3000/getcropimage/' + element.name).subscribe((image) => {

              element['image1'] = 'data:image/jpg;base64,' + image['data'];


            })

            if (element.detected != "") {
              profile.forEach((pr) => {
                if (element.detected == pr.id) {
                  element['title'] = pr.title;
                  element['nameem'] = pr.name;
                  element['surname'] = pr.surname;
                  element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
                }

              })
            }
          })


          this.listmea = [{ 'name': "เลือกพนักงาน -" }, ...profile];
          this.dataSource = cropinfo;
          // console.log("aa", this.dataSource);
          this.spinner.hide();
        })
      })

    });
  }

  onDateSelection(date: NgbDate) {
    this.model =date;

    let date_ob = new Date(date.year, date.month - 1, date.day);

    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();
    
    var querydate = year +"-"+ ("0" +month).slice(-2) +"-"+ ("0" +day).slice(-2);
    // console.log(querydate)
    this.http.get<any[]>('http://192.169.118.5:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {

      this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofile').subscribe(profile => {



        cropinfo.forEach((element) => {

          if (element["train"] != "") {
            console.log("train")
            profile.forEach((pr) => {
              if (element.train == pr.id) {
                element['ttitle'] = pr.title;
                element['tnameem'] = pr.name;
                element['tsurname'] = pr.surname;
              }

            })

            element['canselect'] = false;
          }
          else element['canselect'] = false;

          this.http.get<any[]>('http://192.169.118.5:3000/getcropimage/' + element.name).subscribe((image) => {

            element['image1'] = 'data:image/jpg;base64,' + image['data'];


          })

          if (element.detected != "") {
            profile.forEach((pr) => {
              if (element.detected == pr.id) {
                element['title'] = pr.title;
                element['nameem'] = pr.name;
                element['surname'] = pr.surname;
                element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
              }

            })
          }
        })


        this.listmea = [{ 'name': "เลือกพนักงาน -" }, ...profile];
        this.dataSource = cropinfo;
        // console.log("aa", this.dataSource);
        this.spinner.hide();
      })
    })
  }

  deleteDialog(id ,name): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '820px',
      data: { id ,name }
    });
    dialogRef.afterClosed().subscribe(result => {
      let date = this.model;

      let date_ob = new Date(date.year, date.month - 1, date.day);
  
      let day = ("0" + date_ob.getDate()).slice(-2);
  
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
      // current year
      let year = date_ob.getFullYear();
      
      var querydate = year +"-"+ ("0" +month).slice(-2) +"-"+ ("0" +day).slice(-2);
  
        this.http.get<any[]>('http://192.169.118.5:3000/getcropinfobydate/' + querydate).subscribe((cropinfo) => {
  
          this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofile').subscribe(profile => {
  
  
  
            cropinfo.forEach((element) => {
  
  
              if (element["train"] != "") {
                console.log("train")
                profile.forEach((pr) => {
                  if (element.train == pr.id) {
                    element['ttitle'] = pr.title;
                    element['tnameem'] = pr.name;
                    element['tsurname'] = pr.surname;
                  }
  
                })
  
                element['canselect'] = false;
              }
              else element['canselect'] = false;
  
              this.http.get<any[]>('http://192.169.118.5:3000/getcropimage/' + element.name).subscribe((image) => {
  
                element['image1'] = 'data:image/jpg;base64,' + image['data'];
  
  
              })
  
              if (element.detected != "") {
                profile.forEach((pr) => {
                  if (element.detected == pr.id) {
                    element['title'] = pr.title;
                    element['nameem'] = pr.name;
                    element['surname'] = pr.surname;
                    element['per'] = "(" + (element.confidence * 100).toFixed(2) + "%)";
                  }
  
                })
              }
            })
  
  
            this.listmea = [{ 'name': "เลือกพนักงาน -" }, ...profile];
            this.dataSource = cropinfo;
            // console.log("aa", this.dataSource);
            this.spinner.hide();
          })
        })
  
    });
  }
  

  ngOnInit() {
  }
}
