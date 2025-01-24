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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const user_model_1 = require("./user.model");
const auth_utils_1 = require("../Auth/auth.utils");
const config_1 = __importDefault(require("../../config"));
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    // checking if the user is exist
    const user = yield (user_model_1.User === null || user_model_1.User === void 0 ? void 0 : user_model_1.User.isUserExistsByEmail(payload.email));
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User is not found');
    }
    //create token and sent to the  client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        result,
        accessToken,
    };
    //return result;
});
exports.UserServices = {
    registerUserIntoDB,
};
