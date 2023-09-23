import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit test", () => {

    it("should change the prices of all products", () => {
        const product = new Product('123', 'Product 1', 100);
        const product2 = new Product('456', 'Product 2', 200);
        const produtcs = [product, product2];

        ProductService.increasePrice(produtcs, 100);

        expect(product.price).toBe(200);
        expect(product2.price).toBe(400);
    })
})