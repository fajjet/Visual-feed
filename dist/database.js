"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var mongoose_1 = __importDefault(require("mongoose"));
var connection = process.env.DB_URL || '';
mongoose_1.default.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(function () { return console.log("Database Connected Successfully"); })
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=database.js.map