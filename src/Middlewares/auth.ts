import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import catchAsync from '../Utils/catchAsync';
import sendAuthResponse from '../Utils/sendAuthResponse';
import { User } from '../modules/User/user.model';
import AppError from '../Errors/AppError';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        //console.log(token.split(' ')[1]);


        // checking if the token is missing
        if (!token) {
            return sendAuthResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }

        // checking if the given token is valid
        const decoded = jwt.verify(
            token as string,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        const { role, userEmail } = decoded;

        // checking if the user is exist
        const user = await User.isUserExistsByEmail(userEmail);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        }

        if (requiredRoles && !requiredRoles.includes(role)) {
            return sendAuthResponse(res, {
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'You have no access to this route',
            });
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;