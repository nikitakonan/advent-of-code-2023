"use strict";
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
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var grid = data
        .toString()
        .split('\n')
        .map(function (line) { return line.split(''); });
    var result = calculateEnergized(grid, new types_1.Beam(types_1.Direction.Right, [0, 0]));
    console.log(result);
});
