import express from 'express';
import createCSM from '@/dist/index.js';
import mongoose from 'mongoose';
import cors, { type CorsOptions } from 'cors';
import 'dotenv/config.js';

(async () => {
    const URL = process.env.MONGO_URL;
    if (!URL) throw new Error('MONGO_URL is not defined in environment variables');
    await mongoose.connect(URL);
})();

const allowedOrigins: string[] = ['http://localhost:5173', 'http://localhost:3000'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(createCSM({ mode: 'production' }));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
