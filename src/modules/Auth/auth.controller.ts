import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import catchAsync from '../../Utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { user, accessToken } = result;
    

    const { _id, name, email, phone, address, role } = user;

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully',
        token: accessToken,
        data: { _id, name, email, phone, address, role },
    });
});

export const AuthControllers = {
    loginUser,
};