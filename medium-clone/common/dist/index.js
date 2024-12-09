"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blogupdate = exports.Blogpost = exports.signininput = exports.signupinput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupinput = zod_1.default.object({
    username: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.signininput = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string().min(6)
});
exports.Blogpost = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().optional()
});
exports.Blogupdate = zod_1.default.object({
    id: zod_1.default.number(),
    title: zod_1.default.string(),
    content: zod_1.default.string().optional()
});
