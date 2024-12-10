import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllFromDB = async (): Promise<Omit<User, 'password'>[]> => {
  const result = await prisma.user.findMany({
    select: {
      password: false
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
      password: false
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
      password: false
    }
  });
  return result as Omit<User, 'password'>;
};

const deleteDataById = async (id: string): Promise<Omit<User, 'password'>> => {
  const result = await prisma.user.delete({
    where: {
      id
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
