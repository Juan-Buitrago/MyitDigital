import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(type: string, message: string, title: string) {

    if (type === 'question') {
      Swal.fire(title, message, 'question'
      );
    }
    if (type === 'info') { Swal.fire(title, message, 'info'); }

    if (type === 'success') { Swal.fire(title, message, 'success'); }

    if (type === 'error') { Swal.fire(title, message, 'error'); }

    if (type === 'warning') { Swal.fire(title, message, 'warning'); }
  }

  showAlertDissmiss(message: string, title: string) {
    Swal.fire({
      title: title,
      text: message,
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
