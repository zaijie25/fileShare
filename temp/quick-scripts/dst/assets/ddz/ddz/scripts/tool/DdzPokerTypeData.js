
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzPokerTypeData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bdacdwQXdVN35vo7hrwOaL5', 'DdzPokerTypeData');
// ddz/ddz/scripts/tool/DdzPokerTypeData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPlayRule_1 = require("./DdzPlayRule");
var DdzPokerTypeData = /** @class */ (function () {
    /**
     *
     * @param type 牌型
     * @param count 组成牌型权柄数 连对对子数 飞机数 顺子连续数 其他是牌数量
     * @param weight 牌型对应权重
     */
    function DdzPokerTypeData(type, count, weight) {
        if (type === void 0) { type = 0; }
        if (count === void 0) { count = 0; }
        if (weight === void 0) { weight = 0; }
        this.type = type;
        this.count = count;
        this.weight = weight;
    }
    DdzPokerTypeData.prototype.getData = function () {
        return [this.type, this.count, this.weight];
    };
    DdzPokerTypeData.prototype.isDataValid = function () {
        return this.type > DdzPlayRule_1.DdzPlayTypeDefine.DDZ_NONE;
    };
    return DdzPokerTypeData;
}());
exports.default = DdzPokerTypeData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelBva2VyVHlwZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBa0Q7QUFFbEQ7SUFDSTs7Ozs7T0FLRztJQUNILDBCQUFtQixJQUFnQixFQUFTLEtBQWlCLEVBQVMsTUFBa0I7UUFBckUscUJBQUEsRUFBQSxRQUFnQjtRQUFTLHNCQUFBLEVBQUEsU0FBaUI7UUFBUyx1QkFBQSxFQUFBLFVBQWtCO1FBQXJFLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFFLENBQUM7SUFDcEYsa0NBQU8sR0FBZDtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSxzQ0FBVyxHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRywrQkFBaUIsQ0FBQyxRQUFRLENBQUM7SUFDbEQsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FmQSxBQWVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZHpQbGF5VHlwZURlZmluZSB9IGZyb20gXCIuL0RkelBsYXlSdWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpQb2tlclR5cGVEYXRhe1xyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIOeJjOWei1xyXG4gICAgICogQHBhcmFtIGNvdW50IOe7hOaIkOeJjOWei+adg+afhOaVsCDov57lr7nlr7nlrZDmlbAg6aOe5py65pWwIOmhuuWtkOi/nue7reaVsCDlhbbku5bmmK/niYzmlbDph49cclxuICAgICAqIEBwYXJhbSB3ZWlnaHQg54mM5Z6L5a+55bqU5p2D6YeNXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBudW1iZXIgPSAwLCBwdWJsaWMgY291bnQ6IG51bWJlciA9IDAsIHB1YmxpYyB3ZWlnaHQ6IG51bWJlciA9IDApe31cclxuICAgIHB1YmxpYyBnZXREYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIFt0aGlzLnR5cGUsIHRoaXMuY291bnQsIHRoaXMud2VpZ2h0XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEYXRhVmFsaWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy50eXBlID4gRGR6UGxheVR5cGVEZWZpbmUuRERaX05PTkU7XHJcbiAgICB9XHJcbn0iXX0=