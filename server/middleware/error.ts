import { NextFunction, Response, Request } from "express";
import ErrorHandler from "../utils/errorHandler";

export const ErrorMiddleware= (err:any, req: Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error"

    //wrong mongo id
    if(err.name ==="CastError") {
        const message = `Response not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
    //jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err =  new ErrorHandler(message, 400)
    }
    //jet expires error
    if(err.name === "TokenExpitedError"){
        const message = `Json web token is expired, try again`;
        err =  new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}