import Address from "./address";
import Customer from "./customer";

describe('Customer unit test', () => {
    
    it('should throw an error when id is empty', () => {

        expect(() => {
            let customer = new Customer('', '123');
        }).toThrowError('ID is required');
    })

    it('should throw an error when name is empty', () => {
        expect(() => {
            let customer = new Customer('123', '');
        }).toThrowError('Name is required');
    })

    it('should change name', () => {
        let customer = new Customer('123', 'John Doe');
        customer.changeName('Jane Doe');
        expect(customer.name).toBe('Jane Doe');
    })

    it('should activate customer', () => {
        let customer = new Customer('123', 'John Doe');
        const address = new Address('Street', 123, '12345', 'City');
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    })

    it('should deactivate customer', () => {
        let customer = new Customer('123', 'John Doe');
        
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    })

    it('should throw an error when address is undefined when you activate a customer', () => {
        expect(() => {
            let customer = new Customer('123', 'John Doe');
            customer.activate();
        }).toThrowError('Address is mandatory to activate a customer');
    })

    it('should add reward points', () => {
        let customer = new Customer('123', 'John Doe');
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })
})