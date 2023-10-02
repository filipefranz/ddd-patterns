import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('123', 'Customer 1');
const address = new Address('Street', 1, 'Zip', 'City');
customer.changeAddress(address);

const MockRepository = () => {
    return {
        findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe('Unit test find Customer use case', () => {

    it('should find a customer', async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
        };

        const output = {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                zip: address.zip,
                city: address.city,
            },
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })

    it('should not find a customer', async () => {
        
        const customerRepository = MockRepository();
        customerRepository.findById.mockImplementation(() => {
            throw new Error('Customer not found');
        })
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: '123',
        }

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow('Customer not found');
    })
})