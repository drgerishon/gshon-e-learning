import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import User from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";


//get user analytics -- admin

export const getUserAnalytics = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await generateLast12MonthsData(User)
        res.status(200).json({
            success: true,
            users
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

//get courses analytics -- admin

export const getCoursesAnalytics = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const courses = await generateLast12MonthsData(CourseModel)
        res.status(200).json({
            success: true,
            courses
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})


//get orders analytics -- admin

export const getOrdersAnalytics = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const orders = await generateLast12MonthsData(OrderModel)
        res.status(200).json({
            success: true,
            orders
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})