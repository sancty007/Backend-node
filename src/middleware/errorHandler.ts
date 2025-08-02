import type { NextFunction, Request, Response } from "express";

export type AppError = {
  statusCode?: number;
  isOperational?: boolean;
} & Error;

export class CustomError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(error: AppError, req: Request, res: Response, next: NextFunction): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Erreur interne du serveur";

  // Log de l'erreur en développement
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Erreur:", {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} non trouvée`,
  });
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
