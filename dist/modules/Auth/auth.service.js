"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is not found');
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    //create token and sent to the  client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const changeUserPassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.User.isUserExistsByEmail(user === null || user === void 0 ? void 0 : user.userEmail);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found');
    }
    const isOldPasswordCorrect = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isOldPasswordCorrect) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Old password is not correct');
    }
    const isSamePassword = yield bcrypt_1.default.compare(payload.newPassword, userData.password);
    if (isSamePassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'New password cannot be same as old password');
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: user.userEmail,
        role: user.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    }, { new: true });
    return { message: 'User password has been changed successfully' };
});
exports.AuthServices = {
    loginUser,
    changeUserPassword
};
