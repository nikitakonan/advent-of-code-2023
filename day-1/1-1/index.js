"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var isNumber_1 = require("../../utils/isNumber");
var sum_1 = require("../../utils/sum");
var consts_1 = require("../../utils/consts");
function getCalibrationValue(line) {
    var numbers = line.split('').map(Number).filter(isNumber_1.default);
    return Number("".concat(numbers.at(0)).concat(numbers.at(-1)));
}
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var result = data
        .toString()
        .split(/\r?\n/)
        .map(getCalibrationValue)
        .reduce(sum_1.default);
    console.log(result);
});
