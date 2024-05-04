import express, {Express} from "express";
import dotenv from "dotenv";
import {router} from "./api/routes/userRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, function () {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
