import express, { Application } from "express";
import cors from "cors";

import { getEndpoints } from "./controllers/api.controller";
import usersRoutes from "./routes/users.routes";
import articlesRoutes from "./routes/articles.routes";

import { pgErrorHandling, errorHandling } from "./middleware/error-handling";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.use("/api", usersRoutes);
app.use("/api", articlesRoutes);

app.use(pgErrorHandling);
app.use(errorHandling);

export default app;
