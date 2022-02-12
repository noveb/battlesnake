import type { NextFunction, Request, Response } from 'express';

class HttpError extends Error {
  status: number;

  constructor(message?: string, status?: number) {
    super(message);
    this.status = status || 500;
  }
}

export const fallbackHandler = (req: Request, res: Response, next: NextFunction) => {
  // Root URL path
  if (req.baseUrl === '') {
    res.status(200);
    return res.send(`
        Battlesnake documentation can be found at
         <a href="https://docs.battlesnake.io">https://docs.battlesnake.io</a>.
      `);
  }

  // Short-circuit favicon requests
  if (req.baseUrl === '/favicon.ico') {
    res.set({ 'Content-Type': 'image/x-icon' });
    res.status(200);
    res.end();
    return next();
  }

  // Reroute all 404 routes to the 404 handler
  const err = new HttpError(undefined, 404);
  return next(err);
};

export const notFoundHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.status !== 404) {
    return next(err);
  }

  return res.status(404).json({
    status: 404,
    error: err.message || "These are not the snakes you're looking for",
  });
};

export const genericErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
) => res.status(err.status).json({
  status: err.status,
  error: err.message,
});
