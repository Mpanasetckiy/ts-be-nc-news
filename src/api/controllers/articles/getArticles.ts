import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

import { ArticleQuery } from "../types";

export const getArticles = async (
  req: Request<{}, {}, {}, ArticleQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const allQueries = req.query;
    const articles = await articlesModel.getArticles(allQueries);

    res.status(200).send({ articles });
  } catch (error) {
    next(error);
  }
};
