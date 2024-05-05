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
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(port, function() {
  console.log(`[server]: Server is running...`);
});
