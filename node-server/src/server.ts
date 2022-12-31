import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import {connectToServer} from "./db/troop15.js";

import userRoutes from "./routes/users.js";
import ttroutes  from "./routes/ttapi.js";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(ttroutes);

app.listen(port, () => {
    // perform a database connection when server starts
    connectToServer((err: any) => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
