import ttroutes  from "./routes/ttapi";
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import {connectToServer} from "./db/troop15";

const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 5000;
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
    console.log(`Server is running on port: ${port}`);
});