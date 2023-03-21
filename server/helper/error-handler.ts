import { Request, Response, NextFunction } from "express";

interface Error {
  status?: number;
  details?: string;
  stack?: string;
  message?: string;
}

/**
 * Handles the exceptions and responds with error response
 * @param err Error object
 * @param req request object
 * @param res response object
 * @param next next object
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): any => {
  const env = process.env.NODE_ENV || "development";

  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    details: env === "development" ? err.details : undefined,
    stackTrace: env === "development" ? err.stack : undefined,
    message: env === "development" ? err.message : "Internal server error.",
  });
  return null;
};
