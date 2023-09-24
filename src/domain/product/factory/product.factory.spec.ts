import ProductFactory from "./product.factory";

describe('Product factory tests', () => {
    
    it('should create a product type A', () => {

        const product = ProductFactory.create('A', 'Product A', 100);

        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product A');
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe('Product');
    })

    it('should create a product type B', () => {

        const product = ProductFactory.create('B', 'Product B', 100);

        expect(product.id).toBeDefined();
        expect(product.name).toBe('Product B');
        expect(product.price).toBe(200);
        expect(product.constructor.name).toBe('ProductB');
    })

    it('should throw an error when product type is not found', () => {
        expect(() => {
            ProductFactory.create('C', 'Product C', 100);
        }).toThrowError('Product type not found');
    })
})