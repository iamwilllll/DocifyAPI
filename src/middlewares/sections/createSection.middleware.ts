import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputError.js';

export const createSectionMiddleware = [
    body('sectionName')
        .notEmpty()
        .withMessage('Section name is required')
        .isString()
        .withMessage('Section name must be a string'),
    body('sectionDescription')
        .notEmpty()
        .withMessage('Section description is required')
        .isString()
        .withMessage('Section description must be a string'),
    handleInputErrors,
];
