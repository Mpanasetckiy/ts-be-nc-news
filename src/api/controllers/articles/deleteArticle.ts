import { Request, Response, NextFunction } from "express";

import * as articlesModel from "../../../models/articles";

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { article_id } = req.params;
    await articlesModel.deleteArticle(article_id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
