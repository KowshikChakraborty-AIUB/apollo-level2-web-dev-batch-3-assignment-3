"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./Routes"));
const globalErrorhandler_1 = __importDefault(require("./Middlewares/globalErrorhandler"));
const notFoundRoute_1 = __importDefault(require("./Middlewares/notFoundRoute"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api', Routes_1.default);
app.get('/', (req, res) => {
    res.send('Meeting Room Booking System');
});
app.use(globalErrorhandler_1.default);
//not found route
app.use(notFoundRoute_1.default);
exports.default = app;
