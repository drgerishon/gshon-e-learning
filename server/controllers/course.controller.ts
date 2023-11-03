import { NextFunction, Request, Response } from 'express';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import cloudinary from 'cloudinary';
import { createCourse, getAllCoursesService } from '../services/course.service';
import CourseModel from '../models/course.model';
import { redis } from '../utils/redis';
import mongoose from 'mongoose';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import NotificationModel from '../models/notification.model';
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: 'courses',
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//edit course
export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: 'courses',
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get a single course -- without purchasing
export const getSingleCourse = catchAsyncError(
  async (req: Request, res: Response, next: NewableFunction) => {
    try {
      //if requests are many
      const courseId = req.params.id;
      const isCacheExixts = await redis.get(courseId);
      if (isCacheExixts) {
        const course = JSON.parse(isCacheExixts);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          '-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links'
        );
        await redis.set(courseId, JSON.stringify(course), 'EX', 604800);//7 days expire
        
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//let modify the get single and all courses routes in a situation where many user are requesting
//on the server at the same time by use of redis. note we dont store everything in redis. its not a good practice
//get all courses -- without purchasing
export const getCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCachedExists = await redis.get('allCourses');
      console.log('hitting redis');

      if (isCachedExists) {
        const courses = JSON.parse(isCachedExists);
        return res.status(200).json({
          // Use return to exit the function after sending the response
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          '-courseData.videoUrl -courseData.suggestion -courseData.question -courseData.links'
        );
        console.log('hitting mongodb');
        await redis.set('allCourses', JSON.stringify(courses));
        return res.status(201).json({
          // Use return to exit the function after sending the response
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get course for valid user
export const getCourseByUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExixts = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExixts) {
        return next(
          new ErrorHandler('You are not eligible to access this resourse', 400)
        );
      }
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add question and course reviews
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);

      //if contentId is valid
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler('Invalid content', 400));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler('Invalid content', 400));
      }

      //create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      //add this question to our course content
      courseContent.question.push(newQuestion);

      //send notification
      await NotificationModel.create({
        user: req.user?._id,
        title: 'New Question',
        message: `You have a new question in ${courseContent.title}`,
      });
      //save the updated course
      await course?.save();

      res.status(200).json({
        successs: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add answer in course question

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: String;
}
//in the questionReplies, we have the answers
export const addAnswer = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, contentId, courseId, questionId }: IAddAnswerData =
        req.body;

      const course = await CourseModel.findById(courseId);

      //if contentId is valid
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler('Invalid content', 400));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler('Invalid content', 400));
      }

      //serch question
      const question = courseContent?.question?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler('Invalid question', 500));
      }

      //create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
      };

      //add answer to course content
      question.questionReplies.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user._id) {
        //create a reply, send notification
        //note we need to send notification to admin to reply to questions asked

        await NotificationModel.create({
          user: req.user?._id,
          title: 'New Question Reply Received',
          message: `You have a new question reply in in ${courseContent.title}`,
        });
      } else {
        //send email to the user: new answer added to your question
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, '../mails/question-reply.ejs'),
          data
        );

        //let send email
        try {
          await sendMail({
            email: question.user.email,
            subject: 'Question Reply',
            template: 'question-reply.ejs',
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      await course?.save();

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add review in course
interface IAddReviewData {
  review: string;
  rating: number;
  userId: string;
}
export const addReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const courseId = req.params.id;

      //vaalidate courseId if it exists in userList based on user._id

      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (!courseExists) {
        return next(
          new ErrorHandler('You are not aligible to access this resourse', 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };
      course?.reviews.push(reviewData);

      let avg = 0;
      //eg if rating is 4 and another 5 = (9) we get their everage 4.5
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating; //add zoro to array of reveiws
      });

      //get the everage of the reviews
      if (course) {
        course.ratings = avg / course.reviews.length; //
      }

      await course?.save();

      const notification = {
        title: 'New review received',
        message: `${req.user?.name} has given a review in ${course?.name}`,
      };

      //create notfication
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add reply in reveiw: note only admin can reply to the review
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}

export const addReplyToReveiew = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler('course not found', 404));
      }
      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler('Review not found', 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };
      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all courses
export const getAllCourses = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//delete course - only admin

export const deleteCourse = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findById(id)
    if(!course) {
      return next(new ErrorHandler("course not found", 404))
    }

    await course.deleteOne({id})

    await redis.del(id)

    res.status(200).json({
      success:true,
      message: "course deleted successfully"
    })
  } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
    
  }
})