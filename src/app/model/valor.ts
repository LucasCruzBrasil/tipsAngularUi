import { Data } from "@angular/router"
import { DateAdapter } from "chart.js"
import { DateFormatter } from "ngx-bootstrap/datepicker"

export class Valores {
    id_valor:number
    valor_cartao:number
    valor_dinheiro:number
    valor_pix:number
    valor_pic_pay:number
    data_valor:string = new Date().toISOString()
    qtd_pessoas:number
    total:number
    valor_individual:number
    setor:string

}