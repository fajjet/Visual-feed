"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var movie_1 = __importDefault(require("./../models/movie"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    movie_1.default.find()
        .limit(100)
        .then(function (movies) { return res.json(movies); })
        .catch(function (err) { return console.log(err); });
});
exports.default = router;
//# sourceMappingURL=movies.js.map