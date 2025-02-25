"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalErrorHandlingMiddleware = function (error, req, res, next) {
    console.log(error);
    if (error.name === "NotFoundError") {
        res
            .status(404)
            .json({
            message: error.message,
        })
            .send();
        return;
    }
    else if (error.name === "ValidationError") {
        res
            .status(400)
            .json({
            message: error.message,
        })
            .send();
        return;
    }
    else if (error.name === "UnauthorizedError") {
        res
            .status(401)
            .json({
            message: error.message,
        })
            .send();
        return;
    }
    else {
        res
            .status(500)
            .json({
            message: error.message,
        })
            .send();
        return;
    }
};
exports.default = globalErrorHandlingMiddleware;
//# sourceMappingURL=global-error-handling-middleware.js.map