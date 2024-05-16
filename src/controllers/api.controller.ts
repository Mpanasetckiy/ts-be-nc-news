import { NextFunction, Request, Response } from "express";
import endpoints from "../../endpoints.json";

export const getEndpoints = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send({ endpoints });
  } catch (error) {
    next(error);
  }
};
