import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import OrderModel, { IOrder } from '../models/order.model';
import User from '../models/user.model';
import CourseModel from '../models/course.model';
import path from 'path';
import ejs from 'ejs';
import sendMail from '../utils/sendMail';
import NotificationModel from '../models/notification.model';
import { newOrder } from '../services/order.service';
import { getAllUsersService } from '../services/user.service';

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const user = await User.findById(req.user?._id);

      const courseExixstsInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExixstsInUser) {
        return next(
          new ErrorHandler('You have already purched this course', 400)
        );
      }
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler('Course not found', 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      //send a main to confirm to user that order is procesed
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/order-confirmation.ejs'),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: 'Order Confirmation',
            template: 'order-confirmation.ejs',
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
      //update user courses
      user?.courses.push(course?._id);

      await user?.save();

      //send notification to admin
      await NotificationModel.create({
        user: user?._id,
        title: 'New Order',
        message: `You are a new order for ${course?.name}`,
      });

      course.purchased ? course.purchased += 1 : course.purchased;

      await course?.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders - only for admin
export const getAllOrders = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try {
    getAllUsersService(res)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
    
  }
})
