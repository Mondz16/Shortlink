import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/apiResponse.js";

const handler = (req, res) => {
  res
    .status(429)
    .json(new ApiResponse(false, "Too many requests, please try again later."));
};

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});

export const createLinkLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler,
});
