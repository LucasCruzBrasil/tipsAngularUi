import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public sucess(message: string, title: string): void {
    this.showAlert(title, message, 'success');
  }

  public info(message: string, title: string): void {
    this.showAlert(title, message, 'info');
  }
  public error(mensagem: string, title?: string): void {
    this.showAlert(title, mensagem, 'error');
  }


  private showAlert(title: string, message: string, icon: SweetAlertIcon): void {
    Swal.fire(title, message, icon);
  }
}
