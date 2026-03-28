import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputError.js';

export const updateSectionMiddleware = [
    body('sectionName').optional().isString().notEmpty().withMessage('Section name must be a non-empty string'),
    body('sectionDescription').optional().isString().notEmpty().withMessage('Section description must be a non-empty string'),
    handleInputErrors,
];
