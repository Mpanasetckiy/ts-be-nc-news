"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpoints = void 0;
const endpoints_json_1 = __importDefault(require("../../endpoints.json"));
const getEndpoints = (req, res, next) => {
    try {
        res.status(200).send({ endpoints: endpoints_json_1.default });
    }
    catch (error) {
        next(error);
    }
};
exports.getEndpoints = getEndpoints;
