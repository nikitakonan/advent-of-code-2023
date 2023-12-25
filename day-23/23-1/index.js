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
var TreeNode = /** @class */ (function () {
    function TreeNode(position, distance) {
        this.position = position;
        this.distance = distance;
    }
    TreeNode.prototype.toString = function () {
        return this.position.toString();
    };
    return TreeNode;
}());
function getPositions(_a) {
    var x = _a[0], y = _a[1];
    return [
        [x, y - 1], // 0, up
        [x + 1, y], // 1, right
        [x, y + 1], // 2, down
        [x - 1, y], // 3, left
    ];
}
function getItemAt(map, _a) {
    var x = _a[0], y = _a[1];
    var row = map[y];
    return row ? row[x] : undefined;
}
function getLongestPath(map, from, to) {
    var longestPath = 0;
    var root = new TreeNode(from, 0);
    var visited = new Set();
    var queue = [root];
    visited.add(root.toString());
    var _loop_1 = function () {
        var currentRoot = queue.shift();
        if (currentRoot.toString() === to.toString()) {
            longestPath = currentRoot.distance;
            console.log(longestPath);
        }
        var currentItem = getItemAt(map, currentRoot.position);
        getPositions(currentRoot.position)
            .filter(function (_coords, i) {
            if (currentItem === SLOPE_DOWN) {
                return i === 2;
            }
            else if (currentItem === SLOPE_UP) {
                return i === 0;
            }
            else if (currentItem === SLOPE_LEFT) {
                return i === 3;
            }
            else if (currentItem === SLOPE_RIGHT) {
                return i === 1;
            }
            return true;
        })
            .filter(function (coords) {
            var nextItem = getItemAt(map, coords);
            return Boolean(nextItem) && nextItem !== FOREST;
        })
            .filter(function (pos) { return !visited.has(pos.toString()); })
            .map(function (pos) { return new TreeNode(pos, currentRoot.distance + 1); })
            .forEach(function (node) {
            queue.push(node);
            visited.add(node.toString());
        });
    };
    while (queue.length > 0) {
        _loop_1();
    }
    return longestPath;
}
function findStart(map) {
    return [map[0].findIndex(function (el) { return el === PATH; }), 0];
}
function findEnd(map) {
    return [map.at(-1).findIndex(function (el) { return el === PATH; }), map.length - 1];
}
(0, fs_1.readFile)((0, path_1.join)(__dirname, consts_1.TEST_INPUT), function (err, data) {
    if (err) {
        throw err;
    }
    var map = data
        .toString()
        .split('\n')
        .map(function (line) { return line.split(''); });
    var from = findStart(map);
    var to = findEnd(map);
    var shortestPath = getLongestPath(map, from, to);
    console.log(shortestPath);
});
