import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from './api/routes/userRoute';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

export const corsOptions = {
  credentials: true,
  preflightContinue: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  origin: true,
};

app.use(cors(corsOptions));

app.listen(port, function() {
  console.log(`[server]: Server is running...`);
});
