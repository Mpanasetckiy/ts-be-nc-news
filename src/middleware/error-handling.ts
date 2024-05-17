import { NextFunction, Request, Response } from "express";

interface PgError extends Error {
  code?: string;
}

interface HttpError extends Error {
  status: number;
}

export const pgErrorHandling = (
  err: PgError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === "23502" || err.code === "22P02") {
    console.log(err.code, err.message);
    res.status(400).send({ message: "Bad request" });
  } else if (err.code === "23503") {
    console.log(err.code, err.message);
    res.status(404).send({ message: "No key found" });
  } else {
    next(err);
  }
};

export const errorHandling = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.status, err.message);
  res.status(err.status).send({ message: err.message });
};
