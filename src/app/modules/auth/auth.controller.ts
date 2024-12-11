import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { ISigninResponse } from './auth.interface';
import config from '../../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signup(req.body);

  sendResponse<Omit<User, 'password'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result
  });
});

const signin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signin(req.body);

  const { accessToken: token, refreshToken } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ISigninResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signedin Successfully !',
    token
  });
});

export const AuthController = {
  signup,
  signin
};
