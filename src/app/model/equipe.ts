import { Valores } from "./valor"


export class Equipe {
            nome: string
            valor_dinheiro: number
            valor_cartao: number
            valor_pix: number
            valor_pic_pay: number
            data_valor: string = new Date().toDateString();
            qtd_pessoas: number
            id_equipe:number
            id_valor:number
            pessoa_vale:string
            valor_do_dia:number
            valor_individual:number
            setor:string

}