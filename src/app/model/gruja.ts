import { Data } from "@angular/router";
import { Colaborador } from "./colaborador";

export class Gruja {
    id_gruja: number;
    id_colaborador: Colaborador["id_colaborador"];
    nome: Colaborador['nome'];
    valor: number;
    data: string = new Date().toDateString();
   
}