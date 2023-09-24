import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe('Order factory tests', () => {
    
    it('should create a order', () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: 'Item 1',
                    productId: uuid(),
                    price: 100,
                    quantity: 1
                },
                {
                    id: uuid(),
                    name: 'Item 2',
                    productId: uuid(),
                    price: 200,
                    quantity: 2
                }
            ]
        };

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items).toHaveLength(orderProps.items.length);
    })
})