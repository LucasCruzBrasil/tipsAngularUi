import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() type: 'success';
  @Input() message: string;


  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }


  onClosed() {
    this.bsModalRef.hide();
  }

}
