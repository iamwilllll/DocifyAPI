import type { Request, Response, NextFunction } from 'express';
import { EndpointModel } from '../../models/index.js';
import { AppError } from '../../errors/appError.js';
import { ApiResponse } from '../../helpers/apiResponse.js';

export async function updateEndpointController(req: Request, res: Response, next: NextFunction) {
    try {
        const { method, URL, description, jsonSchema } = req.body;

        const endpoint = req.endpoint;
        if (!endpoint) throw new AppError('Endpoint not found in request', 404, 'ENDPOINT_NOT_FOUND');

        const updatedEndpoint = await EndpointModel.findByIdAndUpdate(
            endpoint._id,
            {
                method,
                URL,
                description,
                jsonSchema: jsonSchema ? jsonSchema : {},
            },
            { new: true, runValidators: true }
        );

        if (!updatedEndpoint) throw new AppError('Endpoint not found', 404, 'ENDPOINT_NOT_FOUND');

        return ApiResponse.success(res, 200, 'Endpoint updated successfully', { endpoint: updatedEndpoint });
    } catch (err) {
        next(err);
    }
}
