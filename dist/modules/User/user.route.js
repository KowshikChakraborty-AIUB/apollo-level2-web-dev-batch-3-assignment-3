"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../Middlewares/validateRequest"));
const user_validaton_1 = __importDefault(require("./user.validaton"));
const auth_validation_1 = __importDefault(require("../Auth/auth.validation"));
const auth_controller_1 = require("../Auth/auth.controller");
const router = (0, express_1.Router)();
router.post('/signup', (0, validateRequest_1.default)(user_validaton_1.default), user_controller_1.UserControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.default), auth_controller_1.AuthControllers.loginUser);
exports.userRoute = router;
