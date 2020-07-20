import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Services
import { AlertService } from '../services/alert-personal.service';

// Constants
import { URL_ROUTES } from 'src/app/config/constants/routes.constant';
import { TYPE_ALERT } from 'src/app/config/constants/alerts.constant';
import { MESSAGE } from 'src/app/config/constants/message.constant';

// Models
import { User } from 'src/app/models/User.model';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private urlServices = URL_ROUTES;
  dataUsers$: EventEmitter<any> = new EventEmitter();
  editUsers$: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private _alertService: AlertService,
    private router: Router) {
  }

  saveUser = (data: User) => {
    let url = `${URL_ROUTES.URL_API}${'User/Save'}`
    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          if (resp == "OK") {
            this._alertService.showAlertDissmiss(MESSAGE.success, '');
            this.getUserList();
          } else {
            this._alertService.showAlert(TYPE_ALERT.ERROR, MESSAGE.error, MESSAGE.ups);
          }
          return resp;
        })
        , catchError(error => {
          this._alertService.showAlert(TYPE_ALERT.ERROR, MESSAGE.error, MESSAGE.ups);
          return Observable.throw(error);
        })
      );
  }

  deleteUser = (data: User) => {
    let url = `${URL_ROUTES.URL_API}${'User/Delete'}`
    return this.http.post(url, data)
      .pipe(
        map((resp: any) => {
          if (resp == "OK") {
            this._alertService.showAlertDissmiss(MESSAGE.delete, '');
            this.getUserList();
          } else {
            this._alertService.showAlert(TYPE_ALERT.ERROR, MESSAGE.error, MESSAGE.ups);
          }
          return resp;
        })
        , catchError(error => {
          this._alertService.showAlert(TYPE_ALERT.ERROR, MESSAGE.error, MESSAGE.ups);
          return Observable.throw(error);
        })
      );
  }

  getUserList = () => {
    let url = `${URL_ROUTES.URL_API}User/GetList`
    this.http.get(url)
      .pipe(
        map((resp: any) => {
          this.dataUsers$.emit(resp);
        })
        , catchError(error => {
          return Observable.throw(error);
        })
      ).subscribe();
  }
}
