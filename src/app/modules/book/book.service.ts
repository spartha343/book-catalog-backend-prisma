import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBookFilters } from './book.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BookSearchableFields } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data
  });

  return result;
};

const getAllFromDB = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: filtersData[key as keyof typeof filtersData]
        }
      }))
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.book.count({
    where: whereConditions
  });

  return {
    data: result,
    meta: {
      limit,
      page,
      total
    }
  };
};

const getAllByCategoryId = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
  categoryId: string
): Promise<IGenericResponse<Book[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: BookSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map((key) => ({
        [key]: {
          equals: filtersData[key as keyof typeof filtersData]
        }
      }))
    });
  }

  // Add categoryId condition
  andConditions.push({ categoryId });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.book.count({
    where: whereConditions
  });

  return {
    data: result,
    meta: {
      limit,
      page,
      total
    }
  };
};

const getDataById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id
    }
  });

  return result;
};

const updateDataById = async (
  id: string,
  data: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id
    },
    data
  });
  return result;
};

const deleteDataById = async (id: string): Promise<Book> => {
  const doesExist = await prisma.book.findUnique({
    where: {
      id
    }
  });
  if (!doesExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found !');
  }
  const result = await prisma.book.delete({
    where: {
      id
    }
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getAllByCategoryId,
  getDataById,
  updateDataById,
  deleteDataById
};
