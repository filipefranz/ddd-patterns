import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class SendConsoleLogWhenCustomerAddressIsChangedHandler 
    implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent): void {
        
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: 
            rua: ${event.eventData.Address.street}, numero: ${event.eventData.Address.number}, 
            cidade: ${event.eventData.Address.city} e zip: ${event.eventData.Address.zip}`);
    }
}