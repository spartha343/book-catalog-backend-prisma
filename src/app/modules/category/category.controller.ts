import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Created Successfully !',
    data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllFromDB();

  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories Fetched Successfully !',
    data: result
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getDataById(req.params.id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Fetched Successfully !',
    data: result
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateDataById(req.params.id, req.body);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated Successfully !',
    data: result
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteDataById(req.params.id);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted Successfully !',
    data: result
  });
});

export const CategoryController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
