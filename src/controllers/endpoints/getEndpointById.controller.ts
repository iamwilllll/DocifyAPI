import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function getEndpointByIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const endpoint = req.endpoint;
        if (!endpoint) throw new AppError('Endpoint not found in request.', 404, 'ENDPOINT_NOT_FOUND');

        return ApiResponse.success(res, 200, 'Endpoint retrieved successfully.', { endpoint });
    } catch (err) {
        next(err);
    }
}
