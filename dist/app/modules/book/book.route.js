'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require('express'));
const book_controller_1 = require('./book.controller');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const book_validation_1 = require('./book.validation');
const router = express_1.default.Router();
router.post(
  '/create-book',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    book_validation_1.BookValidation.CreateBookZodSchema
  ),
  book_controller_1.BookController.insertIntoDB
);
router.get('/:id', book_controller_1.BookController.getDataById);
router.get('/', book_controller_1.BookController.getAllFromDB);
router.get(
  '/:categoryId/category',
  book_controller_1.BookController.getAllByCategoryId
);
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    book_validation_1.BookValidation.UpdateBookZodSchema
  ),
  book_controller_1.BookController.updateDataById
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  book_controller_1.BookController.deleteDataById
);
exports.BookRoutes = router;
