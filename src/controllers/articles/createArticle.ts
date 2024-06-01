import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../models/articles";

export const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const newArticle = await articlesModel.createArticle(body);
    res.status(201).send({ newArticle });
  } catch (error) {
    next(error);
  }
};
