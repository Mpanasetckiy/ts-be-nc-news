import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

import { ValidationError } from "../../../middleware/error-handling";

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    await articlesModel.deleteArticle(articleId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
