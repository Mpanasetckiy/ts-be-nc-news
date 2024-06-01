import express from "express";
const router = express.Router();

import * as usersController from "../controllers/users";

router.get("/users", usersController.getUsers);
router.get("/users/:username", usersController.getUserByUsername);

export default router;
