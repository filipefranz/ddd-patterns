import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/model/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/model/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find Customer use case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);
        const customer = new Customer('123', 'Customer 1');
        const address = new Address('Street', 1, 'Zip', 'City');
        customer.changeAddress(address);
        await customerRepository.create(customer);

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
})