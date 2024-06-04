import express from 'express';
const morgan = require("morgan");
import messageRouter  from '@/routes/message';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, HOST, DEFAULT_API_PREFIX } = envs;

app.use(DEFAULT_API_PREFIX, messageRouter);
app.listen(PORT || 8000, HOST || "127.0.0.1", () => console.log("MS-MENSAJES-BFF STARTED"));