
export class Pix {
    transaction_amount: number;
    description: string;
    payment_method_id: "pix"
    payer: {
        email: string,
        first_name: string,
        last_name: string,
        identification: {
            type: "CPF",
            number: number
        }
    }

    metadata: {id_colaborador: number}

    
}