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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require('../../../shared/prisma'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const http_status_1 = __importDefault(require('http-status'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const config_1 = __importDefault(require('../../../config'));
const auth_utils_1 = require('./auth.utils');
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const signup = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesAlreadyExist = yield prisma_1.default.user.findFirst({
      where: {
        email: data.email
      }
    });
    if (doesAlreadyExist) {
      throw new ApiError_1.default(
        http_status_1.default.OK,
        'User Already Exists !'
      );
    }
    //hashing password
    data.password = yield bcrypt_1.default.hash(
      data.password,
      Number(config_1.default.bycrypt_salt_rounds)
    );
    const result = yield prisma_1.default.user.create({
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
const signin = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const doesUserExist = yield prisma_1.default.user.findFirst({
      where: {
        email: payload.email
      }
    });
    if (!doesUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'User does not exist !'
      );
    }
    if (
      doesUserExist.password &&
      !(yield (0, auth_utils_1.isPasswordMatched)(
        payload.password,
        doesUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect'
      );
    }
    const { role, id } = doesUserExist;
    // const currentTimestamp = Math.floor(Date.now() / 1000);
    // Add a condition to ensure `iat` is at least 1 year old
    // const iat = currentTimestamp - 60 * 60 * 24 * 365;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId: id, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expires_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { userId: id, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expires_in
    );
    return {
      accessToken,
      refreshToken
    };
  });
exports.AuthService = {
  signup,
  signin
};
