import * as yup from 'yup';
import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";
import Product from '../entity/product';

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required('ID is required'),
                name: yup.string().required('Name is required'),
                price: yup.number().positive('Price must be equal or greater than zero'),
            })
            .validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            }, {abortEarly: false});
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                entity.notification.addError({
                    message: error,
                    context: 'product'
                });
            });
        }
    }
}