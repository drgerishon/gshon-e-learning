import { catchAsyncError } from '../middleware/catchAsyncError';
import NotificationModel from '../models/notification.model';
import { NextFunction, Response, Request } from 'express';
import ErrorHandler from '../utils/errorHandler';
import Cron from 'node-cron'

//get all notification, oonly for admin
export const getNotifications = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//update notification status

export const updateNotification = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler('Notification not found', 404));
      } else {
        notification.status
          ? (notification.status = 'read')
          : notification?.status;
      }

      await notification.save();
      //also the that we can update notication state easily on the fronend
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//delete all notification after 30 days using node cron
// Cron.schedule("*/5 * * * * *", function () { //testing cron after 5 sec
//   console.log("---------")
//   console.log("running cron")
// })

//delete notification created more than 30 days ago
Cron.schedule("0 0 0 * * *", async() => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({status:"read", createdAt: {$lt: thirtyDaysAgo}})
  console.log("Deleted read notifications")
})
