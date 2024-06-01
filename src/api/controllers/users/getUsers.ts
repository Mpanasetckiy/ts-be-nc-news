import { NextFunction, Request, Response } from "express";

import * as usersModel from "../../../models/users";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await usersModel.getUsers();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};
