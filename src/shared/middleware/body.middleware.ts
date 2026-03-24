import { Request, Response, NextFunction } from "express";
import { treeifyError, ZodType } from "zod";

export const bodyMiddleware =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: treeifyError(result.error).errors,
      });
    }
    req.body = result.data;
    next();
  };
