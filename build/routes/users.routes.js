"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controllers_1 = require("../controllers/users.controllers");
router.get("/users", users_controllers_1.getUsers);
router.get("/users/:username", users_controllers_1.getUserByUsername);
exports.default = router;
