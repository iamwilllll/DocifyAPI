import { Router } from 'express';
import {
    createSectionController,
    updateSectionController,
    getAllSectionsController,
    getSectionByIdController,
    deleteSectionController,
    createEndpointController,
    updateEndpointController,
    getAllEndpointsController,
    getEndpointByIdController,
    deleteEndpointController,
} from '@/controllers/index.js';
import {
    createSectionMiddleware,
    updateSectionMiddleware,
    createEndpointMiddleware,
    updateEndpointMiddleware,
    validateSectionAndEndpoint,
} from '@/middlewares/index.js';

const appRouter: Router = Router();

appRouter.post('/sections', createSectionMiddleware, createSectionController);
appRouter.patch('/sections/:sectionId', updateSectionMiddleware, updateSectionController);
appRouter.get('/sections', getAllSectionsController);
appRouter.get('/sections/:sectionId', getSectionByIdController);
appRouter.delete('/sections/:sectionId', deleteSectionController);

appRouter.post('/sections/:sectionId/endpoints', createEndpointMiddleware, createEndpointController);
appRouter.get('/sections/:sectionId/endpoints', getAllEndpointsController);
appRouter.get('/sections/:sectionId/endpoints/:endpointId', validateSectionAndEndpoint, getEndpointByIdController);
appRouter.patch(
    '/sections/:sectionId/endpoints/:endpointId',
    validateSectionAndEndpoint,
    updateEndpointMiddleware,
    updateEndpointController
);
appRouter.delete('/sections/:sectionId/endpoints/:endpointId', validateSectionAndEndpoint, deleteEndpointController);

export default appRouter;
