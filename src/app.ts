import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { getEndpoints } from "./controllers/api.controller";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

export default app;
