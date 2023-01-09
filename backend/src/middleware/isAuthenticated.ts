import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verifyToken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required!");
  }

  const [, token] = authHeader.split(" ");

  try {
    await verifyToken(token);
  } catch (err) {
    return res.status(403).send("Invalid token.");
  }

  return next();
};
