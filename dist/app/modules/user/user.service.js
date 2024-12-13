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
exports.UserService = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const getAllFromDB = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  });
const getDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  });
const updateDataById = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
      where: {
        id
      },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  });
const deleteDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.delete({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return result;
  });
exports.UserService = {
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById
};
