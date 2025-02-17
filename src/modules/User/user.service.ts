import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config';

const registerUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  // checking if the user is exist
  const user = await User?.isUserExistsByEmail(payload.email);


  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    result,
    accessToken,
  };

  //return result;

};

const getUserByEmailIdFromDB = async (email: string) => {
  const result = await User.findOne({ email: email }).select('-password');
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getUserByEmailIdFromDB
};