import { NextFunction, Request, Response } from "express";

import * as topicsModel from "../../../models/topics";

import { Topic } from "../../../db/data/types";

export const createTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTopicBody: Topic = req.body;
    const newTopic = await topicsModel.createTopic(newTopicBody);
    res.status(201).send({ newTopic });
  } catch (error) {
    next(error);
  }
};
