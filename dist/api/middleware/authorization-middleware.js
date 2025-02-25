"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
var forbidden_error_1 = __importDefault(require("../../domain/errors/forbidden-error"));
// List of admin user IDs
var ADMIN_USER_IDS = ['user_2sk2GwRWkOZcJ4gazgpLrRnKn56']; // Add your admin user IDs
var isAdmin = function (req, res, next) {
    var _a, _b, _c;
    var auth = req.auth;
    console.log(auth);
    console.log((_a = auth === null || auth === void 0 ? void 0 : auth.sessionClaims) === null || _a === void 0 ? void 0 : _a.metadata.role);
    console.log(((_b = auth === null || auth === void 0 ? void 0 : auth.sessionClaims) === null || _b === void 0 ? void 0 : _b.metadata.role) !== "admin");
    if (((_c = auth === null || auth === void 0 ? void 0 : auth.sessionClaims) === null || _c === void 0 ? void 0 : _c.metadata.role) !== "admin") {
        throw new forbidden_error_1.default("Forbidden");
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=authorization-middleware.js.map