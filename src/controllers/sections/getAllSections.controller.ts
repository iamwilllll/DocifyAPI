import type { Request, Response, NextFunction } from 'express';
import { SectionModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function getAllSectionsController(req: Request, res: Response, next: NextFunction) {
    try {
        const sections = await SectionModel.find({}).populate('endpoints');
        return ApiResponse.success(res, 200, 'Sections retrieved successfully.', { sections });
    } catch (err) {
        next(err);
    }
}
