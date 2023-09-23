import Customer from "../../customer/entity/customer";
import CustomerChangedAddressEvent from "../../customer/event/customer-changed-address.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/event/handler/send-console-log-2-when-customer-is-created.handler";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "../../customer/event/handler/send-console-log-when-customer-address-is-changed.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain events tests', () => {

    it('should register an event handler', () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    })

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    })

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
    })

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventhandle = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            desciption: 'Product 1 description',
            price: 100
        })

        // Quando chamar o notify o sendEmailWhenProductIsCreatedHandler.handle() será chamado
        eventDispatcher.notify(productCreatedEvent);
        
        expect(spyEventhandle).toHaveBeenCalled();
    })

    it('should notify all event handlers when customer is created and address is changed', () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendConsoleLogWhenCustomerAddressIsChangedHandler();

        const spyEventhandle1 = jest.spyOn(eventHandler1, 'handle');
        const spyEventhandle2 = jest.spyOn(eventHandler2, 'handle');
        const spyEventhandle3 = jest.spyOn(eventHandler3, 'handle');

        eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2);
        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler3);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers['CustomerChangedAddressEvent'][0]).toMatchObject(eventHandler3);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: '123',
            name: 'John Doe'
        });

        const customer = new Customer('456', 'John Doe Jr');
        const address = new Address('Street', 123, '12345', 'City');
        customer.Address = address;

        const customerChangedAddressEvent = new CustomerChangedAddressEvent(customer);

        eventDispatcher.notify(customerCreatedEvent);
        eventDispatcher.notify(customerChangedAddressEvent);
        
        expect(spyEventhandle1).toHaveBeenCalled();
        expect(spyEventhandle2).toHaveBeenCalled();
        expect(spyEventhandle3).toHaveBeenCalled();
    })
})