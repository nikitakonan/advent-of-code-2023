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
function getItemAt(map, _a) {
    var x = _a[0], y = _a[1];
    var row = map[y];
    return row ? row[x] : undefined;
}
function setItemAt(map, _a, value) {
    var x = _a[0], y = _a[1];
    var row = map[y];
    if (row) {
        row[x] = value;
    }
}
function isSafe(mat, visited, _a) {
    var x = _a[0], y = _a[1];
    var m = getItemAt(mat, [x, y]);
    var v = getItemAt(visited, [x, y]);
    return (x >= 0 &&
        x < mat.length &&
        y >= 0 &&
        y < mat[0].length &&
        m !== FOREST &&
        !v);
}
var getTopCell = function (_a) {
    var x = _a[0], y = _a[1];
    return [x, y - 1];
};
var getBottomCell = function (_a) {
    var x = _a[0], y = _a[1];
    return [x, y + 1];
};
var getLeftCell = function (_a) {
    var x = _a[0], y = _a[1];
    return [x - 1, y];
};
var getRightCell = function (_a) {
    var x = _a[0], y = _a[1];
    return [x + 1, y];
};
var areEqual = function (_a, _b) {
    var x1 = _a[0], y1 = _a[1];
    var x2 = _b[0], y2 = _b[1];
    return x1 === x2 && y1 === y2;
};
var isBottomSafe = function (item) {
    return item !== SLOPE_UP && item !== SLOPE_LEFT && item !== SLOPE_RIGHT;
};
var isUpSafe = function (item) {
    return item !== SLOPE_DOWN && item !== SLOPE_LEFT && item !== SLOPE_RIGHT;
};
var isRightSafe = function (item) {
    return item !== SLOPE_UP && item !== SLOPE_DOWN && item !== SLOPE_LEFT;
};
var isLeftSafe = function (item) {
    return item !== SLOPE_UP && item !== SLOPE_DOWN && item !== SLOPE_RIGHT;
};
function findLongestPath(mat, visited, source, dest, maxDist, dist) {
    // if the destination is not possible from the current cell
    var sourceItem = getItemAt(mat, source);
    if (sourceItem === FOREST) {
        return 0;
    }
    // if the destination is found, update `max_dist`
    if (areEqual(source, dest)) {
        return Math.max(dist, maxDist);
    }
    setItemAt(visited, source, true);
    var bottomCell = getBottomCell(source);
    if (isSafe(mat, visited, bottomCell) && isBottomSafe(sourceItem)) {
        maxDist = findLongestPath(mat, visited, bottomCell, dest, maxDist, dist + 1);
    }
    var rightCell = getRightCell(source);
    if (isSafe(mat, visited, rightCell) && isRightSafe(sourceItem)) {
        maxDist = findLongestPath(mat, visited, rightCell, dest, maxDist, dist + 1);
    }
    var topCell = getTopCell(source);
    if (isSafe(mat, visited, topCell) && isUpSafe(sourceItem)) {
        maxDist = findLongestPath(mat, visited, topCell, dest, maxDist, dist + 1);
    }
    var leftCell = getLeftCell(source);
    if (isSafe(mat, visited, leftCell) && isLeftSafe(sourceItem)) {
        maxDist = findLongestPath(mat, visited, leftCell, dest, maxDist, dist + 1);
    }
    // backtrack: remove (i, j) from the visited matrix
    setItemAt(visited, source, false);
    return maxDist;
}
function findStart(map) {
    return [map[0].findIndex(function (el) { return el === PATH; }), 0];
}
function findEnd(map) {
    return [map.at(-1).findIndex(function (el) { return el === PATH; }), map.length - 1];
}
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var map = data
        .toString()
        .split('\n')
        .map(function (line) { return line.split(''); });
    var rowsCount = map.length;
    var colsCount = map[0].length;
    var from = findStart(map);
    var to = findEnd(map);
    var visited = Array(rowsCount)
        .fill(undefined)
        .map(function () { return Array(colsCount).slice(); });
    var longestPath = findLongestPath(map, visited, from, to, 0, 0);
    console.log(longestPath);
});
