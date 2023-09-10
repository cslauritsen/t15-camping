import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectToServer } from "./db/troop15.js";
import userRoutes from "./routes/users.js";
import ttroutes from "./routes/ttapi.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './graphql/graphql.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(ttroutes);
app.all('/graphql', createHandler({ schema }));
app.get('/graphiql', (req, res) => {
    res
        .header("context-type", "text/haml")
        .status(200).sendFile('./graphiql.html', { root: __dirname });
});
app.listen(port, () => {
    // perform a database connection when server starts
    connectToServer((err) => {
        if (err) {
            console.error(err);
        }
    });
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
