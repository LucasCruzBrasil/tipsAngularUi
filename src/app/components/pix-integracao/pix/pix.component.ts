import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pix } from 'src/app/model/pix';
import { AlertService } from 'src/app/service/alert.service';
import { PixService } from 'src/app/service/pix.service';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css']
})
export class PixComponent implements OnInit {
  
  formPix: FormGroup
  pix: Pix;
 
  constructor(private pixService: PixService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.formPix = new FormGroup({


      transaction_amount: new FormControl(''),
      description: new FormControl(''),
      payment_method_id: new FormControl('Pix'),
      email: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      type: new FormControl('CPF'),
      number: new FormControl('')
      

    })
  }

  gerarQr(pix: Pix){
    console.log(this.formPix.value);
    this.pix = this.formPix.value;
    this.pixService.QrServer(this.pix).subscribe(
     res => console.log(res)
    ),(httpError) => {
      this.alertService.error(httpError.error.mensagem);
    }
    
  }

}
