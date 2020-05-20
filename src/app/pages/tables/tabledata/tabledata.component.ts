import { Router } from '@angular/router';
import { Component } from '@angular/core';
// import { LocalDataSource } from 'ng2-smart-table';

// import { SmartTableData } from '../../../@core/data/smart-table';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { map, catchError, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// import { NbIconLibraries } from '@nebular/theme';
import { EditTableComponent } from '../edittable/edittable.component'
import { DeletetableTableComponent } from '../deletetable/deletetable.component'
import { AttendanceComponent } from '../attendance/attendance.component'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'ngx-tabledata',
  templateUrl: './tabledata.component.html',
  styleUrls: ['./tabledata.component.scss'],
})
export class SmartTableComponent {
  displayedColumns = ['#','รหัสพนักงาน', 'ชื่อ - สกุล', 'ตำแหน่ง', 'อีเมล์','เข้างาน','ออกงาน',  'action'];
  dataSource: any[];
  p: number = 1;

  evaIcons = [];

  constructor(private spinner: NgxSpinnerService,private http: HttpClient, private router: Router, public dialog: MatDialog) {
    this.spinner.show();
    this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofileandimage').subscribe((profile) => {
      this.http.get<any[]>('http://192.169.118.5:3000/getcheckin').subscribe((checkin) => {
        profile.forEach((element) => {
          element['checkin'] = '-';
          element['checkout'] =  '-';
          element['decimage'] = 'data:image/jpg;base64,' + element['encimage'];
          checkin.forEach((tt) => {
            
            if(element.id == tt.id){
              element['checkin'] =  tt.checkin;
              if(tt.checkout == '') element['checkout'] =  '-';
              else element['checkout'] =  tt.checkout;
            }
  
          })

        })
        this.dataSource = profile;
        this.spinner.hide();
      })
    })
    // this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    //   .filter(icon => icon.indexOf('outline') === -1);
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }
  // deleteRow(id) {
  //   this.http.delete<any>('http://192.169.118.5:3000/deletemeaprofile/' + id, {}).subscribe((delet) => {
      
  //   })

  // }
  // editRow(id){
  //   this.router.navigate(['/pages/tables/tree-grid2'], { queryParams:{id: id}});

  // }

  emoDialog(id, nameid, faceid): void {
    const dialogRef = this.dialog.open(EditTableComponent, {
      width: '820px',
      data: { id ,nameid,faceid}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spinner.show();
      this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofileandimage').subscribe((profile) => {
      this.http.get<any[]>('http://192.169.118.5:3000/getcheckin').subscribe((checkin) => {
        profile.forEach((element) => {
          element['checkin'] = '-';
          element['checkout'] =  '-';
          element['decimage'] = 'data:image/jpg;base64,' + element['encimage'];
          checkin.forEach((tt) => {
          
            if(element.id == tt.id){
              element['checkin'] =  tt.checkin;
              element['checkout'] =  tt.checkout;
            }
  
          })

        })
        this.dataSource = profile;
        this.spinner.hide();
      })
    })
    });
  }

  attendanceDialog(id): void {
    const dialogRef = this.dialog.open(AttendanceComponent, {
      width: '980px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
    //   this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofileandimage').subscribe((profile) => {
    //   this.http.get<any[]>('http://192.169.118.5:3000/getcheckin').subscribe((checkin) => {
    //     profile.forEach((element) => {
    //       element['checkin'] = '-';
    //       element['checkout'] =  '-';
    //       element['decimage'] = 'data:image/jpg;base64,' + element['encimage'];
    //       checkin.forEach((tt) => {
          
    //         if(element.id == tt.id){
    //           element['checkin'] =  tt.checkin;
    //           element['checkout'] =  tt.checkout;
    //         }
  
    //       })

    //     })
    //     this.dataSource = profile;
    //   })
    // })
    });
  }

  deleteDialog(id ,nameid,faceid): void {
    const dialogRef = this.dialog.open(DeletetableTableComponent, {
      width: '820px',
      data: { id,nameid }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.spinner.show();
      this.http.get<any[]>('http://192.169.118.5:3000/getmeaprofileandimage').subscribe((profile) => {
      this.http.get<any[]>('http://192.169.118.5:3000/getcheckin').subscribe((checkin) => {
        profile.forEach((element) => {
          element['checkin'] = '-';
          element['checkout'] =  '-';
          element['decimage'] = 'data:image/jpg;base64,' + element['encimage'];
          checkin.forEach((tt) => {
          
            if(element.id == tt.id){
              element['checkin'] =  tt.checkin;
              element['checkout'] =  tt.checkout;
            }
  
          })

        })
        this.dataSource = profile;
        this.spinner.hide();
      })
    })
    });
  }

}
