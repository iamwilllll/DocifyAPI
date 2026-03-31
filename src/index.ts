import type { CSMConfig } from '@/types/index.js';
import express, { Router } from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ApiResponse } from '@/helpers/index.js';
import appRouter from '@/routes/index.js';
import fs from 'node:fs';
import { errorMiddleware } from '@/middlewares/index.js';

function DocifyApi(config: CSMConfig): Router {
    const router = Router();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pathToDist = path.join(__dirname, 'static');
    const mode = config.mode;

    router.use(express.json());

    router.use('/assets', express.static(path.join(pathToDist, 'assets'), { fallthrough: false }));
    router.get(`/configuration_documentation_csm`, (req, res) => {
        return ApiResponse.success(res, 200, 'Mode retrieved successfully', {
            mode: mode || 'development',
            routePath: '/documentation',
            title: config.title || 'My API Documentation',
        });
    });

    if (mode === 'production') {
        router.use((req, res, next) => {
            if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
                return res.status(403).json({
                    message: 'CSM is in production mode (read-only)',
                });
            }
            next();
        });
    }

    router.use(`/documentation`, appRouter);

    router.get('/', (req, res) => {
        try {
            const htmlPath = path.join(pathToDist, 'index.html');

            let html = fs.readFileSync(htmlPath, 'utf-8');

            const baseUrl = req.baseUrl || '/';

            html = html.replace(
                '<base href="/" id="dynamic-base" />',
                `<base href="${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}" />`
            );

            res.send(html);
        } catch (err) {
            console.error('CRITICAL ERROR CSM:', err);
            ApiResponse.error(res, 500, 'Internal Server Error', err instanceof Error ? err.message : String(err));
        }
    });

    router.use(errorMiddleware);

    return router;
}

export default DocifyApi;
