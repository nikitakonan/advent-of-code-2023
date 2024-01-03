"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var consts_1 = require("../../utils/consts");
var types_1 = require("./types");
var getNextBeams_1 = require("./getNextBeams");
function calculateEnergized(grid, start) {
    var visited = new Set();
    var energized = new Set();
    var beamQueue = [start];
    visited.add(start.getId());
    energized.add(start.position.toString());
    while (beamQueue.length > 0) {
        var b = beamQueue.shift();
        var newBeams = (0, getNextBeams_1.getNextBeams)(grid, b).filter(function (b) { return !visited.has(b.getId()); });
        newBeams.forEach(function (b) {
            beamQueue.push(b);
            visited.add(b.getId());
            energized.add(b.position.toString());
        });
    }
    return energized.size;
}
function getStartBeams(grid) {
    var rows = grid.length;
    var columns = grid[0].length;
    var rowIndices = Array(rows)
        .fill(undefined)
        .map(function (_x, i) { return i; });
    var colIndices = Array(columns)
        .fill(undefined)
        .map(function (_x, i) { return i; });
    var rightBeams = rowIndices.map(function (i) { return new types_1.Beam(types_1.Direction.Right, [0, i]); });
    var leftBeams = rowIndices.map(function (i) { return new types_1.Beam(types_1.Direction.Left, [columns - 1, i]); });
    var topBeams = colIndices.map(function (i) { return new types_1.Beam(types_1.Direction.Down, [i, 0]); });
    var bottomBeams = colIndices.map(function (i) { return new types_1.Beam(types_1.Direction.Up, [i, rows - 1]); });
    return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], rightBeams, true), leftBeams, true), topBeams, true), bottomBeams, true);
}
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var grid = data
        .toString()
        .split('\n')
        .map(function (line) { return line.split(''); });
    var result = getStartBeams(grid)
        .map(function (b) { return calculateEnergized(grid, b); })
        .reduce(function (a, b) { return Math.max(a, b); });
    console.log(result);
});
