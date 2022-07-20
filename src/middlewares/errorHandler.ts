import { NotFoundException } from "../exceptions/notFoundException";
import { NextFunction, Request, Response } from "express";

export default (
    err: NotFoundException | Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    return err instanceof NotFoundException ? res.status(err.statusCode).json({
        message: err.message
    }) : res.status(500).json({
        message: 'There was an error'
    });

}