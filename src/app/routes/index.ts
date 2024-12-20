import express from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/users',
    route: UserRoutes
  },
  {
    path: '/categories',
    route: CategoryRoutes
  },
  {
    path: '/books',
    route: BookRoutes
  },
  {
    path: '/orders',
    route: OrderRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
