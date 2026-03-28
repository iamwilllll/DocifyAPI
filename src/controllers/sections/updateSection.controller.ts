import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { SectionModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function updateSectionController(req: Request, res: Response, next: NextFunction) {
    try {
        const { sectionId } = req.params;
        const { sectionName, sectionDescription } = req.body;

        if (!sectionId) throw new AppError('Section ID is required.', 400, 'INVALID_INPUT');

        const updatedSection = await SectionModel.findByIdAndUpdate(
            sectionId,
            { sectionName, sectionDescription },
            { new: true, runValidators: true }
        );

        if (!updatedSection) throw new AppError('Section not found.', 404, 'SECTION_NOT_FOUND');

        return ApiResponse.success(res, 200, 'Section updated successfully.', { section: updatedSection.toObject() });
    } catch (err) {
        next(err);
    }
}
