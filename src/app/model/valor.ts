import { DateAdapter } from "chart.js"
import { DateFormatter } from "ngx-bootstrap/datepicker"

export interface Valores {
    id_valor:number
    valor_cartao:number
    valor_dinheiro:number
    valor_pix:number
    valor_pic_pay:number
    data_valor:Date
    qtd_pessoas:number
    total:number
    valor_individual:number
    setor:string

}