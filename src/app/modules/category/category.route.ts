import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.insertIntoDB);
router.post('/', CategoryController.getAllFromDB);

router.get('/:id', CategoryController.getDataById);
router.patch('/:id', CategoryController.updateDataById);
router.delete('/:id', CategoryController.deleteDataById);

export const CategoryRoutes = router;
