import type { Request, Response, NextFunction } from 'express';
import { SectionModel, EndpointModel } from '../../models/index.js';
import { AppError } from '../../errors/index.js';

export async function validateSectionAndEndpoint(req: Request, _res: Response, next: NextFunction) {
    try {
        const { sectionId, endpointId } = req.params;

        const section = await SectionModel.findById(sectionId);

        if (!section) throw new AppError('Section not found', 404, 'SECTION_NOT_FOUND');

        if (endpointId) {
            const endpoint = await EndpointModel.findOne({
                _id: endpointId,
                section: sectionId,
            });

            if (!endpoint) {
                throw new AppError('Endpoint not found in this section', 404, 'ENDPOINT_NOT_FOUND');
            }

            req.endpoint = endpoint;
        }

        next();
    } catch (error) {
        next(error);
    }
}
