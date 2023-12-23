"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var consts_1 = require("../../utils/consts");
var PATH = '.';
var FOREST = '#';
var SLOPE_UP = '^';
var SLOPE_DOWN = 'v';
var SLOPE_LEFT = '<';
var SLOPE_RIGHT = '>';
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.TEST_INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var map = data
        .toString()
        .split('\n')
        .map(function (line) { return line.split(''); });
    console.log(map.map(function (x) { return x.length; }));
});
