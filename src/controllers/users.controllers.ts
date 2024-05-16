import { NextFunction, Request, Response } from "express";
import { fetchUsers, fetchUserByUsername } from "../models/users.models";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await fetchUsers();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const user = await fetchUserByUsername(username);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};
