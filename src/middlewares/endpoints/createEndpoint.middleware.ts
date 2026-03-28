import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputError.js';

export const createEndpointMiddleware = [
    body('method')
        .exists()
        .withMessage('Method is required')
        .isIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
        .withMessage('Invalid HTTP method'),
    body('URL')
        .exists()
        .withMessage('URL is required')
        .isString()
        .withMessage('URL must be a string')
        .notEmpty()
        .withMessage('URL cannot be empty'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('jsonSchema').optional().isObject().withMessage('jsonSchema must be an object'),
    handleInputErrors,
];
