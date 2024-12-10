import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:id', UserController.getDataById);

router.get('/', UserController.getAllFromDB);

router.patch('/:id', UserController.updateDataById);
router.delete('/:id', UserController.deleteDataById);

export const UserRoutes = router;
