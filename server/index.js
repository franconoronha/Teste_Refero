import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import donoRouter from './routes/donoRouter.js';
import petRouter from './routes/petRouter.js';

const app = express();
app.use(cors());

app.use(express.json());

app.use(donoRouter);
app.use(petRouter);

app.listen(3000, () => {
    console.log("API OK.");
});