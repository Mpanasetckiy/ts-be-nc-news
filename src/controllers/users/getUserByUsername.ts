import { NextFunction, Request, Response } from "express";

import * as usersModel from "../../models/users";

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await usersModel.getUserByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
