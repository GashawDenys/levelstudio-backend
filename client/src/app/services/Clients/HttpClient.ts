import {HttpClient as BaseHttpClient, HttpErrorResponse, HttpHandler} from '@angular/common/http';
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../error-dialog/error-dialog.component";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpClient extends BaseHttpClient{

  constructor(handler: HttpHandler,
              public dialog: MatDialog) {
    super(handler);
  }

  async postRequest(url: string, body: any | null, options?: any) {
    return new Promise((resolve, reject) => {
      super.post(url, body, options).subscribe(value => resolve(value),
          err => {
        this.openErrorDialog(err)
        reject();
      })
    });
  }

  async getRequest(url: string, body: any | null, options?: any) {
    return new Promise((resolve, reject) => {
      super.get(url, options).subscribe(value => resolve(value),
          err => {
        this.openErrorDialog(err)
        reject();
      })
    });
  }

  openErrorDialog(response: HttpErrorResponse) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: response.error.detail
      }
    });
  }
}
