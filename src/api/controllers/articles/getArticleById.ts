import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";
import { ValidationError } from "../../../middleware/error-handling";

export const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const article = await articlesModel.getArticleById(articleId);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
