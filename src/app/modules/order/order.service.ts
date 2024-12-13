import { Order, OrderedBook } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (
  userId: string,
  orderedBooks: Pick<OrderedBook, 'bookId' | 'quantity'>[]
): Promise<Order> => {
  const order = await prisma.$transaction(async (tr) => {
    const result = await tr.order.create({
      data: {
        userId,
        orderedBooks: {
          create: orderedBooks
        }
      },
      include: {
        orderedBooks: true
      }
    });
    return result;
  });
  return order;
};

const getAllFromDB = async (
  isAdmin: boolean,
  userId: string
): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: isAdmin ? {} : { userId },
    include: {
      orderedBooks: true
    }
  });
  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB
};
