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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const paginationHelper_1 = require('../../../helpers/paginationHelper');
const book_constant_1 = require('./book.constant');
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const insertIntoDB = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
      data
    });
    return result;
  });
const getAllFromDB = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { limit, page, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: book_constant_1.BookSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }))
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        AND: Object.keys(filtersData).map((key) => ({
          [key]: {
            equals: filtersData[key]
          }
        }))
      });
    }
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder
      }
    });
    const total = yield prisma_1.default.book.count({
      where: whereConditions
    });
    return {
      data: result,
      meta: {
        limit,
        page,
        total
      }
    };
  });
const getAllByCategoryId = (filters, paginationOptions, categoryId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const { limit, page, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions
      );
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        OR: book_constant_1.BookSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }))
      });
    }
    if (Object.keys(filtersData).length) {
      andConditions.push({
        AND: Object.keys(filtersData).map((key) => ({
          [key]: {
            equals: filtersData[key]
          }
        }))
      });
    }
    // Add categoryId condition
    andConditions.push({ categoryId });
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder
      }
    });
    const total = yield prisma_1.default.book.count({
      where: whereConditions
    });
    return {
      data: result,
      meta: {
        limit,
        page,
        total
      }
    };
  });
const getDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
      where: {
        id
      }
    });
    return result;
  });
const updateDataById = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
      where: {
        id
      },
      data
    });
    return result;
  });
const deleteDataById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesExist = yield prisma_1.default.book.findUnique({
      where: {
        id
      }
    });
    if (!doesExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Book Not Found !'
      );
    }
    const result = yield prisma_1.default.book.delete({
      where: {
        id
      }
    });
    return result;
  });
exports.BookService = {
  insertIntoDB,
  getAllFromDB,
  getAllByCategoryId,
  getDataById,
  updateDataById,
  deleteDataById
};
