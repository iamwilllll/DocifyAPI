import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { SectionModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function createSectionController(req: Request, res: Response, next: NextFunction) {
    try {
        const { sectionName, sectionDescription } = req.body;

        if (!sectionName || !sectionDescription) {
            throw new AppError('Section name and description are required', 400, 'INVALID_INPUT');
        }

        const newSection = await SectionModel.create({ sectionName, sectionDescription });

        return ApiResponse.success(res, 201, 'Section created successfully.', { section: newSection.toObject() });
    } catch (err) {
        next(err);
    }
}
