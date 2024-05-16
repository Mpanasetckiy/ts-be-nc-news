import express, { Application } from "express";
import cors from "cors";

import { getEndpoints } from "./controllers/api.controller";
import usersRoutes from "./routes/users.routes";
import articlesRoutes from "./routes/articles.routes";

const app: Application = express();

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.use("/api", usersRoutes);
app.use("/api", articlesRoutes);

export default app;
