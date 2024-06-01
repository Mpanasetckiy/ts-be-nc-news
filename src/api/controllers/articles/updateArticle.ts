import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

import { ValidationError } from "../../../middleware/error-handling";

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleId = Number(req.params.article_id);
    if (isNaN(articleId)) {
      throw new ValidationError("Invalid article id provided");
    }
    const { inc_vote } = req.body;
    const article = await articlesModel.updateArticle(articleId, inc_vote);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
