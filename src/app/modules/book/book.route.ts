import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.CreateBookZodSchema),
  BookController.insertIntoDB
);

router.get('/:id', BookController.getDataById);
router.get('/', BookController.getAllFromDB);
router.get('/:categoryId/category', BookController.getAllByCategoryId);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.UpdateBookZodSchema),
  BookController.updateDataById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteDataById
);

export const BookRoutes = router;
