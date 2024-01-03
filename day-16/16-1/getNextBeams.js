"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBeams = void 0;
var types_1 = require("./types");
var beamGetter = (_a = {},
    _a[types_1.SPACE] = function (_a) {
        var inputDirection = _a.inputDirection, position = _a.position;
        var x = position[0], y = position[1];
        switch (inputDirection) {
            case types_1.Direction.Down:
                return [new types_1.Beam(inputDirection, [x, y + 1])];
            case types_1.Direction.Up:
                return [new types_1.Beam(inputDirection, [x, y - 1])];
            case types_1.Direction.Left:
                return [new types_1.Beam(inputDirection, [x - 1, y])];
            case types_1.Direction.Right:
                return [new types_1.Beam(inputDirection, [x + 1, y])];
        }
    },
    _a[types_1.MIRROR_RIGHT] = function (_a) {
        var inputDirection = _a.inputDirection, position = _a.position;
        var x = position[0], y = position[1];
        switch (inputDirection) {
            case types_1.Direction.Down:
                return [new types_1.Beam(types_1.Direction.Left, [x - 1, y])];
            case types_1.Direction.Up:
                return [new types_1.Beam(types_1.Direction.Right, [x + 1, y])];
            case types_1.Direction.Left:
                return [new types_1.Beam(types_1.Direction.Down, [x, y + 1])];
            case types_1.Direction.Right:
                return [new types_1.Beam(types_1.Direction.Up, [x, y - 1])];
        }
    },
    _a[types_1.MIRROR_LEFT] = function (_a) {
        var inputDirection = _a.inputDirection, position = _a.position;
        var x = position[0], y = position[1];
        switch (inputDirection) {
            case types_1.Direction.Down:
                return [new types_1.Beam(types_1.Direction.Right, [x + 1, y])];
            case types_1.Direction.Up:
                return [new types_1.Beam(types_1.Direction.Left, [x - 1, y])];
            case types_1.Direction.Left:
                return [new types_1.Beam(types_1.Direction.Up, [x, y - 1])];
            case types_1.Direction.Right:
                return [new types_1.Beam(types_1.Direction.Down, [x, y + 1])];
        }
    },
    _a[types_1.SPLITTER_HORIZONTAL] = function (_a) {
        var inputDirection = _a.inputDirection, position = _a.position;
        var x = position[0], y = position[1];
        switch (inputDirection) {
            case types_1.Direction.Down:
                return [
                    new types_1.Beam(types_1.Direction.Left, [x - 1, y]),
                    new types_1.Beam(types_1.Direction.Right, [x + 1, y]),
                ];
            case types_1.Direction.Up:
                return [
                    new types_1.Beam(types_1.Direction.Left, [x - 1, y]),
                    new types_1.Beam(types_1.Direction.Right, [x + 1, y]),
                ];
            case types_1.Direction.Left:
                return [new types_1.Beam(inputDirection, [x - 1, y])];
            case types_1.Direction.Right:
                return [new types_1.Beam(inputDirection, [x + 1, y])];
        }
    },
    _a[types_1.SPLITTER_VERTICAL] = function (_a) {
        var inputDirection = _a.inputDirection, position = _a.position;
        var x = position[0], y = position[1];
        switch (inputDirection) {
            case types_1.Direction.Down:
                return [new types_1.Beam(inputDirection, [x, y + 1])];
            case types_1.Direction.Up:
                return [new types_1.Beam(inputDirection, [x, y - 1])];
            case types_1.Direction.Left:
                return [
                    new types_1.Beam(types_1.Direction.Up, [x, y - 1]),
                    new types_1.Beam(types_1.Direction.Down, [x, y + 1]),
                ];
            case types_1.Direction.Right:
                return [
                    new types_1.Beam(types_1.Direction.Up, [x, y - 1]),
                    new types_1.Beam(types_1.Direction.Down, [x, y + 1]),
                ];
        }
    },
    _a);
function getValueAt(grid, _a) {
    var _b;
    var x = _a[0], y = _a[1];
    return (_b = grid[y]) === null || _b === void 0 ? void 0 : _b[x];
}
function isValidPosition(grid, _a) {
    var x = _a[0], y = _a[1];
    var rows = grid.length;
    var columns = grid[0].length;
    return x >= 0 && x < columns && y >= 0 && y < rows;
}
function getNextBeams(grid, beam) {
    var value = getValueAt(grid, beam.position);
    return beamGetter[value](beam).filter(function (b) {
        return isValidPosition(grid, b.position);
    });
}
exports.getNextBeams = getNextBeams;
