
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/data/DataBridge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1bc4aSK5vlAnb7ZmKgU5PFX', 'DataBridge');
// hall/scripts/logic/core/game/data/DataBridge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//负责大厅与子游戏数据共享，数据通信
//每加一个属性，需要标注用途，和适用的游戏
var DataBridge = /** @class */ (function () {
    function DataBridge() {
    }
    return DataBridge;
}());
exports.default = DataBridge;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXGRhdGFcXERhdGFCcmlkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCO0lBQUE7SUFxQkEsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v6LSf6LSj5aSn5Y6F5LiO5a2Q5ri45oiP5pWw5o2u5YWx5Lqr77yM5pWw5o2u6YCa5L+hXHJcbi8v5q+P5Yqg5LiA5Liq5bGe5oCn77yM6ZyA6KaB5qCH5rOo55So6YCU77yM5ZKM6YCC55So55qE5ri45oiPXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFCcmlkZ2Vcclxue1xyXG4gICAgLy/lrZDmuLjmiI/liKTmlq3mnInplIHvvIzlubbkuJRnaWTkuI7oh6rlt7Hnm7jlkIzvvIzliJnnm7TmjqXov5vmuLjmiI/vvIzlubbkuJTmuIXnqbrplIFcclxuICAgIC8v6YCC55So5ri45oiP77ya5YWo6YOoXHJcbiAgICBwdWJsaWMgbG9ja2VyOmFueTtcclxuXHJcblxyXG4gICAgLy/otJ/otKPmuLjmiI/lhoXmtojmga/lpKfljoXmj5DnpLpcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBcImNvbnRlbnRcIjoxMjMsICAgLy/lhoXlrrlcclxuICAgIC8vICAgICBcInR5cGVcIjogMSwgICAgICAgLy/nsbvlnosgMSDmmL7npLrljZXkuKrmjInpkq4gMuaYvuekuuS4pOS4quaMiemSrlxyXG4gICAgLy8gICAgIFwieUZ1bmNcIjpudWxsLCAgICAvL+ehruWumuWbnuiwg1xyXG4gICAgLy8gICAgIFwibkZ1bmNcIjpudWxsLCAgICAvL+i/lOWbnuWbnuiwg1xyXG4gICAgLy8gfVxyXG4gICAgcHVibGljIG1zZzphbnk7XHJcblxyXG4gICAgcHVibGljIGZhc3RUaXBNc2c6c3RyaW5nOyAgLy90aXBzXHJcblxyXG4gICAgLyoq6LSf6LSj5YKo5a2Y6YCA5Ye65a2Q5ri45oiP5ZCO6KaB5pi+56S655qE55WM6Z2iIOmYsuatouWIh+WcuuaZr+aXtuW6j+mXrumimCAqL1xyXG4gICAgcHVibGljIGNhY2hlU2hvdyA6YW55XHJcblxyXG59Il19