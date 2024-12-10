import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { isPasswordMatched } from './auth.utils';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const signup = async (data: User): Promise<User> => {
  const doesAlreadyExist = await prisma.user.findFirst({
    where: {
      email: data.email
    }
  });

  if (doesAlreadyExist) {
    throw new ApiError(httpStatus.OK, 'User Already Exists !');
  }

  //hashing password
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bycrypt_salt_rounds)
  );

  const result = await prisma.user.create({
    data
  });
  return result;
};

const signin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const doesUserExist = await prisma.user.findFirst({
    where: {
      email: payload.email
    }
  });

  if (!doesUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  if (
    doesUserExist.password &&
    !(await isPasswordMatched(payload.password, doesUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  const { role, id } = doesUserExist;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  // Add a condition to ensure `iat` is at least 1 year old
  const iat = currentTimestamp - 60 * 60 * 24 * 365;

  const accessToken = jwtHelpers.createToken(
    { userId: id, role, iat },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId: id, role, iat },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken
  };
};

export const AuthService = {
  signup,
  signin
};
