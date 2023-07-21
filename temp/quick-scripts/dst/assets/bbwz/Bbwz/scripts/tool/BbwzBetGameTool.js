
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/tool/BbwzBetGameTool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7334bfj8wdNX5YgK1DJ7My6', 'BbwzBetGameTool');
// bbwz/Bbwz/scripts/tool/BbwzBetGameTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzBetGameTool = /** @class */ (function () {
    function BbwzBetGameTool() {
    }
    //数组乱序
    BbwzBetGameTool.shuffle = function (array) {
        return Global.Toolkit.getOutOrderArray(array);
    };
    // 获取(0, 1)之间随机数
    BbwzBetGameTool.random = function () {
        return Math.random();
    };
    // 获取(-1, 1)之间随机数
    BbwzBetGameTool.signedRandom = function () {
        return Math.random() * -2 + 1;
    };
    return BbwzBetGameTool;
}());
exports.default = BbwzBetGameTool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcdG9vbFxcQmJ3ekJldEdhbWVUb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQWVBLENBQUM7SUFkRyxNQUFNO0lBQ1EsdUJBQU8sR0FBckIsVUFBc0IsS0FBSztRQUN2QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGdCQUFnQjtJQUNGLHNCQUFNLEdBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlCQUFpQjtJQUNILDRCQUFZLEdBQTFCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTCxzQkFBQztBQUFELENBZkEsQUFlQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekJldEdhbWVUb29sIHtcclxuICAgIC8v5pWw57uE5Lmx5bqPXHJcbiAgICBwdWJsaWMgc3RhdGljIHNodWZmbGUoYXJyYXkpIHtcclxuICAgICAgICByZXR1cm4gR2xvYmFsLlRvb2xraXQuZ2V0T3V0T3JkZXJBcnJheShhcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+WKDAsIDEp5LmL6Ze06ZqP5py65pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5YoLTEsIDEp5LmL6Ze06ZqP5py65pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHNpZ25lZFJhbmRvbSgpe1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogLTIgKyAxO1xyXG4gICAgfVxyXG59Il19