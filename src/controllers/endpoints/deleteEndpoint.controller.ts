import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { EndpointModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function deleteEndpointController(req: Request, res: Response, next: NextFunction) {
    try {
        const endpoint = req.endpoint;
        if (!endpoint) throw new AppError('Endpoint not found in request.', 404, 'ENDPOINT_NOT_FOUND');

        await EndpointModel.findByIdAndDelete(endpoint._id);
        return ApiResponse.success(res, 200, 'Endpoint deleted successfully.', { endpoint });
    } catch (err) {
        next(err);
    }
}
