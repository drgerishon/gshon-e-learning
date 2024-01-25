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
import { redis } from '../utils/redis';
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createOrder = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info) {
        if ('id' in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );
          if (paymentIntent.status !== 'succeeded') {
            return next(new ErrorHandler('Payment not authorized', 400));
          }
        }
      }

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

      await redis.set(req.user?._id, JSON.stringify(user))

      await user?.save();

      //send notification to admin
      await NotificationModel.create({
        user: user?._id,
        title: 'New Order',
        message: `You have a new order for ${course?.name}`,
      });

      course.purchased ? (course.purchased += 1) : course.purchased;

      await course?.save();

      newOrder(data, res, next);


    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders - only for admin
export const getAllOrders = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//stripe implementation

export const sendStripePublishableKey = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

//new payment
export const newPayment = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'USD',
        metadata: {
          company: ' Gshon E-learning',
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
