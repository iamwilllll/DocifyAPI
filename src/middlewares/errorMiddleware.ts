import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../helpers/index.js';
import { AppError } from '../errors/index.js';
import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('UNEXPECTED ERROR:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    if (err instanceof AppError && err.isOperational) {
        return ApiResponse.error(res, err.statusCode, err.message, err.code);
    }

    if (err instanceof mongoose.Error.CastError) {
        return ApiResponse.error(res, 400, `Invalid ${err.path}: ${err.value}`, 'INVALID_ID');
    }

    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e) => e.message);
        return ApiResponse.error(res, 400, messages.join(', '), 'VALIDATION_ERROR');
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return ApiResponse.error(res, 409, `${field} already exists`, 'DUPLICATE_KEY');
    }

    console.error('UNEXPECTED ERROR:', {
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    return ApiResponse.error(res, 500, 'Internal server error', 'INTERNAL_SERVER_ERROR');
}
