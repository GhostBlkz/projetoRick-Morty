import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";


const app = express();
//resolvendo problema do cors
app.use(cors({
    origin: process.env.FRONT_END_URL.split(','),
    credentials: true
  }))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);

//O middleware protege as rotas com autenticação
import auth from "./middleware/auth.js";
app.use(auth)

import userRoute from './routes/user.js'
app.use('/users', userRoute)

export default app;
