import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { DeleteNNotificationComponent } from '../deletenotification/deletenotification.component'

const httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});
const options = {
  headers: httpHeaders
};


// import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service'
// interface TreeNode<T> {
//   data: T;
//   children?: TreeNode<T>[];
//   expanded?: boolean;
// }

// interface FSEntry {
//   name: string;
//   size: string;
//   kind: string;
//   items?: number;
// }



@Component({
  selector: 'ngx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  emails: any[];
  p: number = 1;
  email: string = '';
  Obj: any;
  evaIcons = [];
  checkoutForm;
  displayedColumns = ['#','email', 'action'];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog) {

    this.checkoutForm = this.formBuilder.group({
      email: ''
    });
    this.http.get<any[]>('http://192.169.118.5:3000/getnotification').subscribe((emails) => {

      this.emails = emails;

    })
    // this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
    //   .filter(icon => icon.indexOf('outline') === -1);
    // iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
  }

  addTodo(event) {
    console.log("event", event);
    this.Obj = {
      email: event.email,
      
    }
    console.log(this.Obj);
    // this.todos.push(this.todoObj);
    this.http.post<any>('http://192.169.118.5:3000/postnotification', this.Obj, options).subscribe(done => {
      this.http.get<any[]>('http://192.169.118.5:3000/getnotification').subscribe((emails) => {

        this.emails = emails;

      })
    })


    this.checkoutForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    // event.preventDefault();
  }


  deleteDialog(id, email): void {
    const dialogRef = this.dialog.open(DeleteNNotificationComponent, {
      width: '820px',
      data: { id, email }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.http.get<any[]>('http://192.169.118.5:3000/getnotification').subscribe((emails) => {

        this.emails = emails;

      })

    });
  }


}

