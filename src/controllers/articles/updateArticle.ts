import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../models/articles";

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    const { inc_vote } = req.body;
    const article = await articlesModel.updateArticle(article_id, inc_vote);
    res.status(200).send({ article });
  } catch (error) {
    next(error);
  }
};
