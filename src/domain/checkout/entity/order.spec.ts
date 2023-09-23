import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit test', () => {

    it('should throw an error when id is empty', () => {
        expect(() => {
            let order = new Order('', '123', []);
        }).toThrowError('ID is required');
    })

    it('should throw an error when customerId is empty', () => {
        expect(() => {
            let order = new Order('123', '', []);
        }).toThrowError('Customer ID is required');
    })

    it('should throw an error when items is empty', () => {
        expect(() => {
            let order = new Order('123', '123', []);
        }).toThrowError('Items are required');
    })

    it('should calcule total', () => {
        const item = new OrderItem('1', 'Item 1', 100, '123', 1);
        const item2 = new OrderItem('2', 'Item 2', 200, '123', 2);
        const order = new Order('123', '123', [item]);

        let total = order.total();

        expect(total).toBe(100);

        const order2 = new Order('123', '123', [item, item2]);
        let total2 = order2.total();

        expect(total2).toBe(500);
    })

    it('should throw an error if the item qtd is less or equal than zero', () => {
        expect(() => {
            const item = new OrderItem('1', 'Item 1', 100, '123', 0);
            const order = new Order('123', '123', [item]);
        }).toThrowError('Quantity must be greater than zero');
    })
})