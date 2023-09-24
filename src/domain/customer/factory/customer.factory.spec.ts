import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory tests', () => {  

    it('should create a customer', () => {

        const customer = CustomerFactory.create('John Doe');

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John Doe');
        expect(customer.Address).toBeUndefined();
    })

    it('should create a customer with address', () => {
        
        const address = new Address('Street', 123, '12345', 'City');
        let customer = CustomerFactory.createWithAddress('John Doe Jr', address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe('John Doe Jr');
        expect(customer.Address).toEqual(address);
    })
})