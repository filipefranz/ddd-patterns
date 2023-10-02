export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
    customers: CustomerDto[];
}

type CustomerDto = {
    id: string
    name: string
    address: {
        street: string
        number: number
        zip: string
        city: string
    }
}