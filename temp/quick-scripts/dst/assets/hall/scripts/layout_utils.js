
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/layout_utils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbGF5b3V0X3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUFtQjtBQUNuQjtJQUFBO0lBZUEsQ0FBQztJQWJVLDBCQUFlLEdBQXRCLFVBQXVCLEtBQVksRUFBRSxVQUFpQixFQUFFLFdBQWtCLEVBQUUsTUFBaUIsRUFBRSxLQUFnQixFQUFFLEtBQWdCO1FBQXJELHVCQUFBLEVBQUEsVUFBaUI7UUFBRSxzQkFBQSxFQUFBLFNBQWdCO1FBQUUsc0JBQUEsRUFBQSxTQUFnQjtRQUU3SCxJQUFJLENBQUMsR0FBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVNLDRCQUFpQixHQUF4QixVQUF5QixLQUFZLEVBQUUsVUFBaUIsRUFBRSxXQUFrQixFQUFFLEdBQWMsRUFBRSxLQUFnQixFQUFFLEtBQWdCO1FBQWxELG9CQUFBLEVBQUEsT0FBYztRQUFFLHNCQUFBLEVBQUEsU0FBZ0I7UUFBRSxzQkFBQSxFQUFBLFNBQWdCO1FBRTVILElBQUksQ0FBQyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxHQUFVLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDdEQsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWZBLEFBZUMsSUFBQTtBQWZZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy9pdGVt5Y+K54i26IqC54K56ZSa54K56YO95Li6KDAsMSlcclxuZXhwb3J0IGNsYXNzIExheW91dFV0aWxcclxue1xyXG4gICAgc3RhdGljIHZlcnRpY2FsX2xheW91dChpbmRleDpudW1iZXIsIGl0ZW1fd2lkdGg6bnVtYmVyLCBpdGVtX2hlaWdodDpudW1iZXIsIGNvbHVtbjpudW1iZXIgPSAxLCBnYXBfeDpudW1iZXIgPSAwLCBnYXBfeTpudW1iZXIgPSAwKTpbbnVtYmVyLCBudW1iZXJdXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHg6bnVtYmVyID0gKGluZGV4ICUgY29sdW1uKSAqIChpdGVtX3dpZHRoICsgZ2FwX3gpO1xyXG4gICAgICAgIGxldCB5Om51bWJlciA9IC1NYXRoLmZsb29yKGluZGV4IC8gY29sdW1uKSAqIChpdGVtX2hlaWdodCArIGdhcF95KTtcclxuICAgICAgICByZXR1cm4gW3gsIHldO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBob3Jpem9udGFsX2xheW91dChpbmRleDpudW1iZXIsIGl0ZW1fd2lkdGg6bnVtYmVyLCBpdGVtX2hlaWdodDpudW1iZXIsIHJvdzpudW1iZXIgPSAxLCBnYXBfeDpudW1iZXIgPSAwLCBnYXBfeTpudW1iZXIgPSAwKTpbbnVtYmVyLCBudW1iZXJdXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHg6bnVtYmVyID0gTWF0aC5mbG9vcihpbmRleCAvIHJvdykgKiAoaXRlbV93aWR0aCArIGdhcF94KTtcclxuICAgICAgICBsZXQgeTpudW1iZXIgPSAtKGluZGV4ICUgcm93KSAqIChpdGVtX2hlaWdodCArIGdhcF95KTsgXHJcbiAgICAgICAgcmV0dXJuIFt4LCB5XTtcclxuICAgIH1cclxufSJdfQ==