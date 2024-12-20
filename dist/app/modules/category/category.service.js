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
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const insertIntoDB = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.create({
      data
    });
    return result;
  });
const getAllFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany();
    return result;
  });
const getDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findUnique({
      where: {
        id
      },
      include: {
        books: true
      }
    });
    return result;
  });
const updateDataById = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.update({
      where: {
        id
      },
      data
    });
    return result;
  });
const deleteDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesExist = yield prisma_1.default.category.findUnique({
      where: {
        id
      }
    });
    if (!doesExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Category Not Found !'
      );
    }
    const result = yield prisma_1.default.category.delete({
      where: {
        id
      }
    });
    return result;
  });
exports.CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
