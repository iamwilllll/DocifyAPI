export type CSMConfig = {
    /*
     * Execution mode.
     * - development: allows creating/editing endpoints
     * - production: read-only
     */
    mode?: 'development' | 'production';

    /*
     * Title for the API documentation.
     */
    title?: string;
};
