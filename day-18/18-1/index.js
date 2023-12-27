"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var consts_1 = require("../../utils/consts");
var R = 'R';
var D = 'D';
var U = 'U';
var L = 'L';
function parseLine(line) {
    if (line === void 0) { line = ''; }
    var _a = line.split(' '), dirStr = _a[0], numberStr = _a[1], colorStr = _a[2];
    return {
        direction: dirStr,
        amount: Number(numberStr),
        color: colorStr.slice(1, -1),
    };
}
function getPoint2(direction, _a, amount) {
    var x = _a[0], y = _a[1];
    if (amount === void 0) { amount = 1; }
    if (direction === R) {
        return [x + amount, y];
    }
    else if (direction === L) {
        return [x - amount, y];
    }
    else if (direction === U) {
        return [x, y - amount];
    }
    else if (direction === D) {
        return [x, y + amount];
    }
}
function buildPolygon(instructions) {
    var data = {
        xMin: Number.MAX_VALUE,
        xMax: Number.MIN_VALUE,
        yMin: Number.MAX_VALUE,
        yMax: Number.MIN_VALUE,
        polygon: [[0, 0]],
    };
    instructions.forEach(function (instruction) {
        var direction = instruction.direction, amount = instruction.amount;
        var point1 = data.polygon.at(-1);
        var point2 = getPoint2(direction, point1, amount);
        if (point2.toString() !== data.polygon[0].toString()) {
            data.polygon.push(point2);
        }
        data.xMax = Math.max(point1[0], point2[0], data.xMax);
        data.xMin = Math.min(point1[0], point2[0], data.xMin);
        data.yMax = Math.max(point1[1], point2[1], data.yMax);
        data.yMin = Math.min(point1[1], point2[1], data.yMin);
    });
    return data;
}
function isOnLine(_a, _b, _c) {
    var x1 = _a[0], y1 = _a[1];
    var x2 = _b[0], y2 = _b[1];
    var x = _c[0], y = _c[1];
    return (x <= Math.max(x1, x2) &&
        x >= Math.min(x1, x2) &&
        y <= Math.max(y1, y2) &&
        y >= Math.min(y1, y2));
}
function isInside(edges, _a) {
    var xp = _a[0], yp = _a[1];
    var cnt = 0;
    for (var i = 0; i < edges.length; i++) {
        var _b = edges[i], x1 = _b[0], y1 = _b[1];
        var j = (i + 1) % edges.length;
        var _c = edges[j], x2 = _c[0], y2 = _c[1];
        if (isOnLine([x1, y1], [x2, y2], [xp, yp])) {
            return true;
        }
        if (yp < y1 !== yp < y2 && xp < x1 + ((yp - y1) / (y2 - y1)) * (x2 - x1)) {
            cnt += 1;
        }
    }
    return cnt % 2 === 1;
}
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var result = 0;
    var instructions = data.toString().split('\n').map(parseLine);
    var _a = buildPolygon(instructions), xMin = _a.xMin, xMax = _a.xMax, yMin = _a.yMin, yMax = _a.yMax, polygon = _a.polygon;
    for (var y = yMin; y <= yMax; y++) {
        for (var x = xMin; x <= xMax; x++) {
            if (isInside(polygon, [x, y])) {
                console.log("[".concat(x, ",").concat(y, "] - inside"));
                result++;
            }
            else {
                console.log("[".concat(x, ",").concat(y, "] - outside"));
            }
        }
        console.log('---------');
    }
    // console.log([3, 5], isInside(polygon, [3, 5]));
    // console.log([4, 5], isInside(polygon, [4, 5]));
    // console.log([0, 8], isInside(polygon, [0, 8]));
    // console.log([0, 9], isInside(polygon, [0, 9]));
    console.log(result);
});
