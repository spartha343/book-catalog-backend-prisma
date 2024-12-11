import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getDataById);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.UpdateUserZodSchema),
  UserController.updateDataById
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteDataById
);

export const UserRoutes = router;
