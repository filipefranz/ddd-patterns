export interface InputListProductDto {}

export interface OutputListProductDto {
    products: ProductDto[];
}

type ProductDto = {
    id: string
    name: string
    price: number
}