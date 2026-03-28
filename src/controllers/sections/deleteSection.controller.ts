import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { SectionModel } from '@/models/index.js';
import { ApiResponse } from '@/helpers/index.js';

export async function deleteSectionController(req: Request, res: Response, next: NextFunction) {
    try {
        const { sectionId } = req.params;
        if (!sectionId) throw new AppError('Section ID is required.', 400, 'INVALID_INPUT');

        const updatedSection = await SectionModel.findById(sectionId);
        if (!updatedSection) throw new AppError('Section not found.', 404, 'SECTION_NOT_FOUND');

        await SectionModel.deleteMany({ _id: { $in: updatedSection.endpoints } });
        await SectionModel.findByIdAndDelete(sectionId);
        return ApiResponse.success(res, 200, 'Section deleted successfully', { section: updatedSection.toObject() });
    } catch (err) {
        next(err);
    }
}
