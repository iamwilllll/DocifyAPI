import type { EndpointDocument } from '../models/Endpoint.js';

declare global {
    namespace Express {
        interface Request {
            endpoint?: EndpointDocument;
        }
    }
}
