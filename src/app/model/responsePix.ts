import { Pix } from "./pix";

export class responsePix extends Pix {
    id:number
    external_reference:number
    amount: number
    status: string
    detail:string
    qrCodeBase64:string
    qrCode: string

}