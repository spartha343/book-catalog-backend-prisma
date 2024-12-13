'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const auth_1 = __importDefault(require('../../middlewares/auth'));
const user_1 = require('../../../enums/user');
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
);
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.get(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getDataById
);
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getAllFromDB
);
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.UpdateUserZodSchema
  ),
  user_controller_1.UserController.updateDataById
);
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.deleteDataById
);
exports.UserRoutes = router;
