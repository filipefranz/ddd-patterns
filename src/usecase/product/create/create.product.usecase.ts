import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {

    private productRepository: ProductRepositoryInterface;
    
    constructor(productRepository: ProductRepositoryInterface){
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

        const product = ProductFactory.create('A', input.name, input.price);

        this.productRepository.create(new Product(product.id, product.name, product.price));

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}