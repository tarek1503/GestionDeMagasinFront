import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwallService {

  constructor() { }
  success(titleValue: string, textValue: string, iconValue: SweetAlertIcon) {
    Swal.fire(
      {
        title: titleValue,
        text: textValue,
        icon: iconValue,
        confirmButtonColor: '#BDD248'
      }
    );
  }
  problem(error: any) {
    Swal.fire(
      '',
      error,
      'error'
    )
  }
}