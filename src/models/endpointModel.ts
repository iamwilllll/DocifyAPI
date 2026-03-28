import mongoose, { Schema } from 'mongoose';

type EndpointT = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    URL: string;
    description?: string;
    jsonSchema?: object;
    section: mongoose.Types.ObjectId;
};

const EndpointSchema = new Schema<EndpointT>(
    {
        method: { type: String, required: true, enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] },
        URL: { type: String, required: true },
        description: { type: String, required: false },
        jsonSchema: { type: Object, required: false },
        section: { type: Schema.Types.ObjectId, ref: 'ApidocSection', required: true },
    },
    { timestamps: true, versionKey: false }
);

export const EndpointModel = mongoose.model<EndpointT>('ApidocEndpoint', EndpointSchema);
