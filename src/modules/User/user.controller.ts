import httpStatus from "http-status";
import catchAsync from "../../Utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../Utils/sendResponse";
//import sendResponse from "../../Utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUserIntoDB(req.body);
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

const getUserByEmailId = catchAsync(async (req, res) => {
    const { email } = req.params;

    const result = await UserServices.getUserByEmailIdFromDB(email);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });

});

const updateUserByEmailId = catchAsync(async (req, res) => {
    const { email } = req.params;
    const updateData = req.body;


    const result = await UserServices.updateUserByEmailId(email, updateData);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const result = await UserServices.deleteUserFromDB(req.params?.userId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});

export const UserControllers = {
    registerUser,
    getUserByEmailId,
    updateUserByEmailId,
    deleteUser
};