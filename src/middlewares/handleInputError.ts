import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiResponse } from '@/helpers/index.js';

export function handleInputErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return ApiResponse.error(res, 400, 'Invalid data was entered', 'INVALID_INPUT', errors.array());
    }

    next();
}
