"use strict";
cc._RF.push(module, 'c92c5UwUupPWKw+B81R0s9V', 'layout_utils');
// hall/scripts/layout_utils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutUtil = void 0;
//item及父节点锚点都为(0,1)
var LayoutUtil = /** @class */ (function () {
    function LayoutUtil() {
    }
    LayoutUtil.vertical_layout = function (index, item_width, item_height, column, gap_x, gap_y) {
        if (column === void 0) { column = 1; }
        if (gap_x === void 0) { gap_x = 0; }
        if (gap_y === void 0) { gap_y = 0; }
        var x = (index % column) * (item_width + gap_x);
        var y = -Math.floor(index / column) * (item_height + gap_y);
        return [x, y];
    };
    LayoutUtil.horizontal_layout = function (index, item_width, item_height, row, gap_x, gap_y) {
        if (row === void 0) { row = 1; }
        if (gap_x === void 0) { gap_x = 0; }
        if (gap_y === void 0) { gap_y = 0; }
        var x = Math.floor(index / row) * (item_width + gap_x);
        var y = -(index % row) * (item_height + gap_y);
        return [x, y];
    };
    return LayoutUtil;
}());
exports.LayoutUtil = LayoutUtil;

cc._RF.pop();