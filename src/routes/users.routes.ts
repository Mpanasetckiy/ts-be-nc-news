import express from "express";
const router = express.Router();

import { getUsers, getUserByUsername } from "../controllers/users.controllers";

router.get("/users", getUsers);

router.get("/users/:username", getUserByUsername);

export default router;
