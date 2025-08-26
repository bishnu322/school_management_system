"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const dbConnection_config_1 = require("./config/dbConnection.config");
//*importing routers
const user_route_1 = __importDefault(require("./routes/user.route"));
const student_route_1 = __importDefault(require("./routes/student.route"));
const role_route_1 = __importDefault(require("./routes/role.route"));
const staff_route_1 = __importDefault(require("./routes/staff.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const attendance_route_1 = __importDefault(require("./routes/attendance.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const DB_URI = (_a = process.env.DB_URI) !== null && _a !== void 0 ? _a : "";
app.use((0, cookie_parser_1.default)());
//* connecting database
(0, dbConnection_config_1.dbConnection)(DB_URI);
//
app.use(express_1.default.json({ limit: "5mb" }));
//* using routers
app.use("/api/user", user_route_1.default);
app.use("/api/student", student_route_1.default);
app.use("/api/role", role_route_1.default);
app.use("/api/staff", staff_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/attendance", attendance_route_1.default);
app.get("/", (req, res) => {
    res.send("hello backend");
});
//* for all routes error middleware
app.get("/{*all}", (req, res, next) => {
    const message = `cannot ${req.method} on the path ${req.originalUrl}`;
    const error = new error_handler_middleware_1.CustomError(message, 404);
    next(error);
});
//* using error handler middleware
app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`);
});
app.use(error_handler_middleware_1.errorHandler);
