
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/setting/BaseSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6588blu2QJJeptsilaITQNN', 'BaseSetting');
// hall/scripts/framework/setting/BaseSetting.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("./Storage");
var BaseSettingData_1 = require("./BaseSettingData");
//开关  + 本地存储 + app配置
var BaseSetting = /** @class */ (function () {
    function BaseSetting() {
        this.storage = new Storage_1.default;
    }
    BaseSetting.prototype.setup = function () {
        this.settingData = new BaseSettingData_1.default();
        this.settingData.setup(this.storage);
    };
    return BaseSetting;
}());
exports.default = BaseSetting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxzZXR0aW5nXFxCYXNlU2V0dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFnQztBQUNoQyxxREFBZ0Q7QUFFaEQsb0JBQW9CO0FBQ3BCO0lBQUE7UUFFVyxZQUFPLEdBQVcsSUFBSSxpQkFBTyxDQUFDO0lBUXpDLENBQUM7SUFMVSwyQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FWQSxBQVVDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tIFwiLi9TdG9yYWdlXCI7XHJcbmltcG9ydCBCYXNlU2V0dGluZ0RhdGEgZnJvbSBcIi4vQmFzZVNldHRpbmdEYXRhXCI7XHJcblxyXG4vL+W8gOWFsyAgKyDmnKzlnLDlrZjlgqggKyBhcHDphY3nva5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVNldHRpbmdcclxue1xyXG4gICAgcHVibGljIHN0b3JhZ2U6U3RvcmFnZSA9IG5ldyBTdG9yYWdlO1xyXG4gICAgcHVibGljIHNldHRpbmdEYXRhOkJhc2VTZXR0aW5nRGF0YTtcclxuXHJcbiAgICBwdWJsaWMgc2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ0RhdGEgPSBuZXcgQmFzZVNldHRpbmdEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5nRGF0YS5zZXR1cCh0aGlzLnN0b3JhZ2UpO1xyXG4gICAgfVxyXG59Il19