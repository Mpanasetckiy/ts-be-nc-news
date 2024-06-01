import { NextFunction, Request, Response } from "express";

import { fetchTopics, insertTopic } from "../models/topics.models";

import { Topic } from "../db/data/types";

export const getTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await fetchTopics();
    res.status(200).send({ topics });
  } catch (error) {
    next(error);
  }
};

export const postTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTopicBody: Topic = req.body;
    const newTopic = await insertTopic(newTopicBody);
    res.status(201).send({ newTopic });
  } catch (error) {
    next(error);
  }
};
