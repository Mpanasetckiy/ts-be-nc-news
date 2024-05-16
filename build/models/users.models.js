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
exports.fetchUserByUsername = exports.fetchUsers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`SELECT username, name, avatar_url FROM users;`);
    return rows;
});
exports.fetchUsers = fetchUsers;
const fetchUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`SELECT username, name, avatar_url FROM users
    WHERE username = $1`, [username]);
    if (!rows.length) {
        return Promise.reject({ status: 404, message: "No data found" });
    }
    return rows[0];
});
exports.fetchUserByUsername = fetchUserByUsername;
