export type CSMConfig = {
    /*
     * Mount path for the documentation UI and API routes.
     * E.g., '/docs' will serve the UI at '/docs' and API routes under '/docs/api'.
     */
    routePath?: string;

    /*
     * Execution mode.
     * - development: allows creating/editing endpoints
     * - production: read-only
     */
    mode?: 'development' | 'production';
};
