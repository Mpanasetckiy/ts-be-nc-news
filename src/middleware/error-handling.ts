import { NextFunction, Request, Response } from "express";

interface PgError extends Error {
  code?: string;
}

export class HttpError extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class ValidationError extends Error {
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.status = 400; // HTTP status code for Bad Request

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class PostgresError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, code: string, status: number = 500) {
    super(message);
    this.name = "PostgresError";
    this.code = code;
    this.status = status;

    Object.setPrototypeOf(this, PostgresError.prototype);
  }
}

export const pgErrorHandling = (
  err: PostgresError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.code === "23502" || err.code === "22P02") {
    // console.log(err.code, err.message);
    res.status(400).send({ message: "Bad request" });
  } else if (err.code === "23503") {
    // console.log(err.code, err.message);
    res.status(404).send({ message: "No key found" });
  } else {
    next(err);
  }
};

export const errorHandling = (
  err: HttpError | ValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.status, err.message);
  res.status(err.status).send({ message: err.message });
};
