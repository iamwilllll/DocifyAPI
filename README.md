**I had already built this project before, it was just in a repository with some problems, hence the fast commit times.**

# 🚀 API Documentation Middleware (CSM)

> Effortlessly generate structured, real-time API documentation for your Express applications.

---

## ✨ Overview

**CSM (Custom Server Middleware)** is a powerful and minimal middleware designed to **automatically generate and serve API documentation** in Express-based applications.

Built with simplicity and flexibility in mind, CSM integrates seamlessly into your backend and exposes a clean documentation endpoint with almost zero configuration.

---

## ⚡ Why CSM?

- 🔌 **Plug & Play** — Drop it into your Express app and it just works
- 📄 **Auto Documentation** — No need to manually maintain docs
- ⚙️ **Configurable** — Define your own route and environment mode
- 🌐 **Frontend Ready** — Easily connect with any frontend
- 🧠 **Developer Friendly** — Designed for speed and clarity

---

## 📦 Installation

```bash
npm install docify-api
```

or

```bash
pnpm add docify-api
```

---

## 🛠 Requirements

- Node.js 18+
- MongoDB database
- Express application

---

## ⚙️ Environment Setup

Create a `.env` file in the root of your project:

```env
MONGO_URL=your_mongodb_connection_string
```

---

## 🚀 Quick Start

```ts
import express from 'express';
import DocifyApi from 'docify-api';
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
app.use(DocifyApi({ mode: 'development', title: 'My API Documentation' }));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## 🧠 How It Works

CSM acts as an Express middleware that:

- Hooks into your application lifecycle
- Collects and structures API-related data
- Generates a documentation layer dynamically
- Serves it through a configurable endpoint

No manual documentation writing required.

---

## ⚠️ Important Notes

- MongoDB **must be connected before initializing** the middleware
- CORS should be configured properly if used with a frontend
- Designed primarily for development and internal tooling (depending on configuration)

---

## 🧪 Example Use Case

Perfect for:

- Internal tools
- Rapid prototyping
- Developer dashboards
- API testing environments
- Portfolio projects

---

## 🛡 Error Handling

Common issues:

- ❌ `MONGO_URL is not defined` → Ensure `.env` is configured
- ❌ Connection timeout → Verify MongoDB connection
- ❌ CORS errors → Adjust allowed origins

---

## 📁 Project Structure (Suggested)

```
project/
├── src/
├── dist/
├── .env
├── package.json
└── server.ts
```

---

## 🤝 Contributing

Contributions are welcome and appreciated.

```bash
# Fork the repo
# Create your feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "Add amazing feature"

# Push to the branch
git push origin feature/amazing-feature
```

Then open a Pull Request.

---

## 📄 License

MIT License

---

## 💡 Author

Wilfryn Viloria Rosario
