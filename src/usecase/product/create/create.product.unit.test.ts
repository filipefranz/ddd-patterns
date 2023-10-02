import CreateProductUseCase from "./create.product.usecase"

const input = {
    name: 'Produsct 1',
    price: 100
}

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Create Product use case unit tests', () => {
    
    it('should create a product', async () => {
        
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    });

    it('should throw an error when name is missiging', async () => {

        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = '';

        await expect(productCreateUseCase.execute(input)).rejects.toThrow('Name is required');
    });
})