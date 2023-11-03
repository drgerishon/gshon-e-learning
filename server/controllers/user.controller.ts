require('dotenv').config();
import { catchAsyncError } from '../middleware/catchAsyncError';
import User, { IUser } from '../models/user.model';
import ErrorHandler from '../utils/errorHandler';
import { Request, Response, NextFunction } from 'express';
import Jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from '../utils/jwt';
import { redis } from '../utils/redis';
import { getAllUsersService, getUserById } from '../services/user.service';
import cloudinary from 'cloudinary';

//register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body as IRegistrationBody;
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return next(new ErrorHandler('Email already used', 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };
      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, '../mails/activation-mail.ejs'),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: 'Activate you account',
          template: 'activation-mail.ejs',
          data,
        });
        res.status(200).json({
          success: true,
          message: `Please check you email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
interface IActivatonToken {
  token: string;
  activationCode: string;
}
export const createActivationToken = (user: any): IActivatonToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = Jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: '5m',
    }
  );
  return { token, activationCode };
};

//activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = Jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler('Invalid activation code', 400));
      }
      const { name, email, password } = newUser.user;
      const existUser = await User.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler('Email already exists', 400));
      }
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//login user

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email && !password) {
        return next(new ErrorHandler('Please enter email and password', 400));
      }
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return next(new ErrorHandler('Invalid email or password', 400));
      }

      if (!password) {
        return next(new ErrorHandler('Please enter a password', 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid email or password', 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout

export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 });
      //clear from redis
      const userId = req.user?._id || '';
      redis.del(userId);

      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token because it expires after 5min
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = Jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = 'Could not refresh token';

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(new ErrorHandler(message, 400));
      }
      const user = JSON.parse(session);

      const accessToken = Jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: '5m',
        }
      );

      const refreshToken = Jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: '3d',
        }
      );
      req.user = user; //set the user in the request user

      //update cookie with new token
      res.cookie('access_token', accessToken, accessTokenOptions);
      res.cookie('refresh_token', refreshToken, refreshTokenOptions);

      res.status(200).json({
        status: 'success',
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get user info

export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//social auth

interface ISocialBody {
  email: string;
  name: string;
  avatar: string;
}

export const socialAuth = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialBody;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update user info

interface IUpdateUserInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (email && user) {
        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
          return next(new ErrorHandler('Email already exists', 400));
        }
        user.email = email;
      }
      if (name && user) {
        user.name = name;
        await user.save();
      }

      //also update redis (cash)
      await redis.set(userId, JSON.stringify(user));

      

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//updateUserPassword

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler('Please enter old and new password!', 400)
        );
      }
      const user = await User.findById(req.user?._id).select('+password');
      //incase of social auth
      if (user?.password === undefined) {
        return next(new ErrorHandler('Invalid User', 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler('Invalid old password', 400));
      }

      user.password = newPassword;

      await user.save();

      //update redis
      await redis.set(req.user?._id, JSON.stringify(user));
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//upadte profile avatar
interface IUprofilePicuture {
  avatar: string;
}
export const updateProfilePicture = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUprofilePicuture;

      const userId = req.user?._id;

      const user = await User.findById(userId);

      if (avatar && user) {
        //if user have avatar then call this if
        if (user?.avatar?.public_id) {
          //if avatar delete it
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const mycloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
          });
          user.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          };
        } else {
          const mycloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
          });
          user.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
          };
        }
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


//get all user - only for admin
export const getAllUsers = catchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
  try {
    getAllUsersService(res)
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
    
  }
})