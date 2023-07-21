
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzSkinDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1b7491tuf5PF6yueyiQpLkw', 'DdzSkinDefine');
// ddz/ddz/scripts/data/DdzSkinDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPathHelper_1 = require("./DdzPathHelper");
var DdzSkinDefine = /** @class */ (function () {
    function DdzSkinDefine(jsonMap) {
        if (jsonMap === void 0) { jsonMap = {}; }
        this.jsonMap = jsonMap;
        /**
         * 皮肤ID
         */
        this.skinIndex = 0;
        /** 记牌器文本颜色 0为数量0颜色 1为数量不为0颜色 */
        this.markerColorArr = [];
        /** 使用角色替代玩家头像 */
        this.useRole = false;
        this.initData();
    }
    DdzSkinDefine.prototype.initData = function () {
        this.skinIndex = this.jsonMap["skinIndex"] || 0;
        this.markerColorArr = this.jsonMap["markerLblColor"] || [];
        this.useRole = this.jsonMap["useRole"];
    };
    DdzSkinDefine.jsonPath = DdzPathHelper_1.default.configPath + "DdzSkinConfig";
    return DdzSkinDefine;
}());
exports.default = DdzSkinDefine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkelNraW5EZWZpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBNEM7QUFFNUM7SUFZSSx1QkFBbUIsT0FBZ0I7UUFBaEIsd0JBQUEsRUFBQSxZQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBVG5DOztXQUVHO1FBQ0ksY0FBUyxHQUFXLENBQUMsQ0FBQztRQUM3QixnQ0FBZ0M7UUFDekIsbUJBQWMsR0FBYSxFQUFFLENBQUM7UUFDckMsaUJBQWlCO1FBQ1YsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUc1QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGdDQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFuQnNCLHNCQUFRLEdBQUcsdUJBQWEsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDO0lBb0JqRixvQkFBQztDQXJCRCxBQXFCQyxJQUFBO2tCQXJCb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpQYXRoSGVscGVyIGZyb20gXCIuL0RkelBhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkelNraW5EZWZpbmV7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGpzb25QYXRoID0gRGR6UGF0aEhlbHBlci5jb25maWdQYXRoICsgXCJEZHpTa2luQ29uZmlnXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnmq7ogqRJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2tpbkluZGV4IDpudW1iZXIgPSAwO1xyXG4gICAgLyoqIOiusOeJjOWZqOaWh+acrOminOiJsiAw5Li65pWw6YePMOminOiJsiAx5Li65pWw6YeP5LiN5Li6MOminOiJsiAqL1xyXG4gICAgcHVibGljIG1hcmtlckNvbG9yQXJyOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgLyoqIOS9v+eUqOinkuiJsuabv+S7o+eOqeWutuWktOWDjyAqL1xyXG4gICAgcHVibGljIHVzZVJvbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMganNvbk1hcDoge30gPSB7fSl7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdERhdGEoKXtcclxuICAgICAgICB0aGlzLnNraW5JbmRleCA9IHRoaXMuanNvbk1hcFtcInNraW5JbmRleFwiXSB8fCAwO1xyXG4gICAgICAgIHRoaXMubWFya2VyQ29sb3JBcnIgPSB0aGlzLmpzb25NYXBbXCJtYXJrZXJMYmxDb2xvclwiXSB8fCBbXTtcclxuICAgICAgICB0aGlzLnVzZVJvbGUgPSB0aGlzLmpzb25NYXBbXCJ1c2VSb2xlXCJdO1xyXG4gICAgfVxyXG59Il19