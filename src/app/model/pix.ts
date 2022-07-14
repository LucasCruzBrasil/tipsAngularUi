
export class Pix {
    transaction_amount: number;
    description: string;
    payment_method_id: "pix"
    payer: {
        email: any,
        first_name: string,
        last_name: string,
        identification: {
            type: "CPF",
            number: number
        }
    }
}