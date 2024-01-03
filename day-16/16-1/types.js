"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beam = exports.Direction = exports.SPLITTER_HORIZONTAL = exports.SPLITTER_VERTICAL = exports.MIRROR_LEFT = exports.MIRROR_RIGHT = exports.SPACE = void 0;
exports.SPACE = '.';
exports.MIRROR_RIGHT = '/';
exports.MIRROR_LEFT = '\\';
exports.SPLITTER_VERTICAL = '|';
exports.SPLITTER_HORIZONTAL = '-';
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 0] = "Left";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Up"] = 2] = "Up";
    Direction[Direction["Down"] = 3] = "Down";
})(Direction || (exports.Direction = Direction = {}));
var Beam = /** @class */ (function () {
    function Beam(direction, position) {
        this.inputDirection = direction;
        this.position = position;
    }
    Beam.prototype.getId = function () {
        return "".concat(this.inputDirection, "-").concat(this.position.toString());
    };
    return Beam;
}());
exports.Beam = Beam;
