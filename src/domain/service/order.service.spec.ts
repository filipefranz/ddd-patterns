import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe('Order service unit test', () => {
    
    it('shuold place an order', () => { 
        const customer = new Customer('123', 'John Doe');
        const item1 = new OrderItem('1', 'Item 1', 100, '123', 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    })

    it('should get total of all orders', () => {
        const item = new OrderItem('1', 'Item 1', 100, '123', 1);
        const item2 = new OrderItem('2', 'Item 2', 200, '123', 2);

        const order = new Order('123', '123', [item]);
        const order2 = new Order('1234', '123', [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(500);
    })
})