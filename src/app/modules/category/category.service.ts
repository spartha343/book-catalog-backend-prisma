import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data
  });
  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const getDataById = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      books: true
    }
  });

  return result;
};

const updateDataById = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id
    },
    data
  });
  return result;
};

const deleteDataById = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id
    }
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
