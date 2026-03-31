import mongoose, { Schema } from 'mongoose';

type SectionT = {
    sectionName: string;
    sectionDescription?: string;
    endpoints: mongoose.Types.ObjectId[];
};

const SectionSchema = new Schema<SectionT>(
    {
        sectionName: { type: String, required: true },
        sectionDescription: { type: String, required: false, default: '' },
        endpoints: { type: [Schema.Types.ObjectId], required: true, default: [], ref: 'DocifyAPI_endpoints' },
    },
    { timestamps: true, versionKey: false }
);

export const SectionModel = mongoose.model<SectionT>('DocifyAPI_sections', SectionSchema);
