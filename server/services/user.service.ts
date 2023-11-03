import User from '../models/user.model';
import { Response } from 'express';
import { redis } from '../utils/redis';

//get user by id
export const getUserById = async (id: string, res: Response) => {
  const userjson = await redis.get(id);
  if (userjson) {
    const user = JSON.parse(userjson);
    res.status(201).json({
      succes: true,
      user,
    });
  }
};


//get all users
export const getAllUsersService = async(res:Response) => {
  const users = await User.find().sort({createdAt: -1})
  res.status(201).json({
    success:true,
    users
  })
}