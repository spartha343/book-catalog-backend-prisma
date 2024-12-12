import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { Book } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { BookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully !',
    data: result
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllFromDB(filters, paginationOptions);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books Fetched Successfully !',
    data: result.data,
    meta: result.meta
  });
});

const getAllByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllByCategoryId(
    filters,
    paginationOptions,
    req.params.categoryId
  );

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books Fetched Successfully !',
    data: result.data,
    meta: result.meta
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getDataById(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Fetched Successfully !',
    data: result
  });
});

const updateDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateDataById(req.params.id, req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Updated Successfully !',
    data: result
  });
});

const deleteDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteDataById(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Deleted Successfully !',
    data: result
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  getAllByCategoryId,
  updateDataById,
  deleteDataById
};
