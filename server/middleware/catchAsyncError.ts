import { Request, Response, NextFunction } from 'express';
export const catchAsyncError =
  (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next))
      .catch((error: Error) => {
        console.error("Error caught by catchAsyncError:", error); // Add this line
        next(error);
      });
  };
