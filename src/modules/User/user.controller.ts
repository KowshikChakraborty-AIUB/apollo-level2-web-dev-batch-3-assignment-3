import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { UserServices } from "./user.service";
//import sendResponse from "../../Utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
    const result  = await UserServices.registerUserIntoDB(req.body);
    const { _id, name, email, phone, role, address } = result.result;
    const token = result.accessToken

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: 'User registered successfully',
        data: { _id, name, email, phone, role, address },
        token: token
    });
});

export const UserControllers = {
    registerUser,
};