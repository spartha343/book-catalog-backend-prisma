import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Order } from '@prisma/client';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { orderedBooks } = req.body;
  const result = await OrderService.insertIntoDB(
    req.user?.userId,
    orderedBooks
  );

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Created Successfully !',
    data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const isAdmin = req.user?.role === 'admin';
  const result = await OrderService.getAllFromDB(isAdmin, req.user?.userId);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully !',
    data: result
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB
};
