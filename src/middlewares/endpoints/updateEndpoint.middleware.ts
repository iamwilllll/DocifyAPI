import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputError.js';

export const updateEndpointMiddleware = [
    body('method')
        .optional()
        .isIn(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
        .withMessage('Invalid HTTP method, please choose from GET, POST, PUT, DELETE'),
    body('URL').optional().isString().notEmpty().withMessage('URL must be a non-empty string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('jsonSchema').optional().isObject().withMessage('jsonSchema must be an object'),
    handleInputErrors,
];
