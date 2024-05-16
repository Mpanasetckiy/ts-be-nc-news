"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_controller_1 = require("./controllers/api.controller");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const articles_routes_1 = __importDefault(require("./routes/articles.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api", api_controller_1.getEndpoints);
app.use("/api", users_routes_1.default);
app.use("/api", articles_routes_1.default);
exports.default = app;
