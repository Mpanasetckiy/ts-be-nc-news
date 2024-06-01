import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../models/articles";

export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const article = await articlesModel.getArticleById(article_id);

    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
