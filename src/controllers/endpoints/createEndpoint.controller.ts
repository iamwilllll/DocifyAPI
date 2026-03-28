import type { Request, Response, NextFunction } from 'express';
import { EndpointModel, SectionModel } from '@/models/index.js';
import { AppError } from '@/errors/appError.js';
import { ApiResponse } from '@/helpers/apiResponse.js';

export async function createEndpointController(req: Request, res: Response, next: NextFunction) {
    try {
        const { method, URL, description, jsonSchema } = req.body;
        const { sectionId } = req.params;

        if (!sectionId) throw new AppError('Section ID is required.', 400, 'INVALID_INPUT');
        if (!method || !URL) throw new AppError('Method and URL are required.', 400, 'INVALID_INPUT');
        const sectionExists = await SectionModel.findById(sectionId);
        if (!sectionExists) throw new AppError('Section not found.', 404, 'SECTION_NOT_FOUND');

        const newEndpoint = new EndpointModel({
            method,
            URL,
            description,
            jsonSchema: jsonSchema ? jsonSchema : {},
            section: sectionId,
        });

        sectionExists.endpoints.push(newEndpoint._id);

        await Promise.all([newEndpoint.save(), sectionExists.save()]);

        return ApiResponse.success(res, 201, 'Endpoint documentation created successfully.', {
            endpoint: newEndpoint.toObject(),
        });
    } catch (err) {
        next(err);
    }
}
