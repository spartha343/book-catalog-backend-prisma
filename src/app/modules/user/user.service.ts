import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllFromDB = async (): Promise<Omit<User, 'password'>[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return result as Omit<User, 'password'>[];
};

const getDataById = async (id: string): Promise<Omit<User, 'password'>> => {
  const result = await prisma.user.findUnique({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return result as Omit<User, 'password'>;
};

const updateDataById = async (
  id: string,
  data: Partial<User>
): Promise<Omit<User, 'password'>> => {
  const result = await prisma.user.update({
    where: {
      id
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return result as Omit<User, 'password'>;
};

const deleteDataById = async (id: string): Promise<Omit<User, 'password'>> => {
  const result = await prisma.user.delete({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return result as Omit<User, 'password'>;
};

export const UserService = {
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
