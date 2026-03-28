import type { Request, Response, NextFunction } from 'express';
import { EndpointModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function getAllEndpointsController(req: Request, res: Response, next: NextFunction) {
    try {
        const endpoints = await EndpointModel.find({});
        return ApiResponse.success(res, 200, 'Endpoints retrieved successfully.', { endpoints });
    } catch (err) {
        next(err);
    }
}
