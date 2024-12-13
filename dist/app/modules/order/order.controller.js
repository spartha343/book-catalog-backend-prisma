'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const order_service_1 = require('./order.service');
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const insertIntoDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderedBooks } = req.body;
    const result = yield order_service_1.OrderService.insertIntoDB(
      (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
      orderedBooks
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Order Created Successfully !',
      data: result
    });
  })
);
const getAllFromDB = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isAdmin =
      ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) ===
      'admin';
    const result = yield order_service_1.OrderService.getAllFromDB(
      isAdmin,
      (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Orders retrieved successfully !',
      data: result
    });
  })
);
exports.OrderController = {
  insertIntoDB,
  getAllFromDB
};
