import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import UpdateProductUseCase from "./update.product.usecase"

const product = ProductFactory.create('A', 'Product 1', 10);

const input = {
    id: product.id,
    name: 'Product 1 Updated',
    price: 20
}

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Update Product use case', () => {
    
    it('should update a product', async () => {
        
        const productRepository = MockRepository();
        const usecase = new UpdateProductUseCase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: product.id,
            name: 'Product 1 Updated',
            price: 20
        })
    });
})