import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDB();

  sendResponse<Omit<User, 'password'>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrieved Successfully !',
    data: result
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getDataById(req.params.id);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Fecthed Successfully !',
    data: result
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateDataById(req.params.id, req.body);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Updated Successfully !',
    data: result
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteDataById(req.params.id);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted Successfully !',
    data: result
  });
});

export const UserController = {
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
