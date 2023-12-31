import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";

//ceate new order
export const newOrder = catchAsyncError(async(data:any, res:Response, next:NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
        success:true,
        order
    })
    
})

//get all orders
export const getAllUsersService = async(res:Response) => {
    const orders = await OrderModel.find().sort({createdAt: -1})
    res.status(201).json({
      success:true,
      orders
    })
  }