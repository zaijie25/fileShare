
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/section/SectionBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d32baiATxP8KZtznA982Uv', 'SectionBase');
// hall/scripts/framework/section/SectionBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏的每个阶段(section)会对应不同的场景、config、model和界面,添加Section的目的是让数据模块、配置和View加载更流程化
 */
var SectionBase = /** @class */ (function () {
    function SectionBase() {
        this.name = "";
        this.isInited = false;
    }
    Object.defineProperty(SectionBase.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SectionBase.prototype, "IsInited", {
        /**
         * 是否初始化
         */
        get: function () {
            return this.isInited;
        },
        enumerable: false,
        configurable: true
    });
    //declare只会调用一次  场景切换不会重复调用
    SectionBase.prototype.declare = function () {
        if (this.isInited)
            return;
        this.isInited = true;
        this.declareModel();
        this.declareWnd();
    };
    SectionBase.prototype.declareModel = function () { };
    SectionBase.prototype.declareWnd = function () { };
    /**
     * 初始化函数,在onCreate()函数后调用
     */
    SectionBase.prototype.init = function () {
        this.declare();
        this.onInit();
    };
    /**
     * 场景切换后 固定初始化
     */
    SectionBase.prototype.onInit = function () {
    };
    return SectionBase;
}());
exports.default = SectionBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxzZWN0aW9uXFxTZWN0aW9uQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0g7SUFBQTtRQUVjLFNBQUksR0FBVSxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFXLEtBQUssQ0FBQztJQThDdkMsQ0FBQztJQTVDRyxzQkFBVyw2QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsaUNBQVE7UUFIbkI7O1dBRUc7YUFDSDtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELDJCQUEyQjtJQUNqQiw2QkFBTyxHQUFqQjtRQUVJLElBQUcsSUFBSSxDQUFDLFFBQVE7WUFDWixPQUFPO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRVMsa0NBQVksR0FBdEIsY0FDQyxDQUFDO0lBRVEsZ0NBQVUsR0FBcEIsY0FDQyxDQUFDO0lBR0Y7O09BRUc7SUFDSSwwQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNJLDRCQUFNLEdBQWI7SUFFQSxDQUFDO0lBR0wsa0JBQUM7QUFBRCxDQWpEQSxBQWlEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOa4uOaIj+eahOavj+S4qumYtuautShzZWN0aW9uKeS8muWvueW6lOS4jeWQjOeahOWcuuaZr+OAgWNvbmZpZ+OAgW1vZGVs5ZKM55WM6Z2iLOa3u+WKoFNlY3Rpb27nmoTnm67nmoTmmK/orqnmlbDmja7mqKHlnZfjgIHphY3nva7lkoxWaWV35Yqg6L295pu05rWB56iL5YyWXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uQmFzZVxyXG57XHJcbiAgICBwcm90ZWN0ZWQgbmFtZTpzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJvdGVjdGVkIGlzSW5pdGVkOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IElzSW5pdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzSW5pdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vZGVjbGFyZeWPquS8muiwg+eUqOS4gOasoSAg5Zy65pmv5YiH5o2i5LiN5Lya6YeN5aSN6LCD55SoXHJcbiAgICBwcm90ZWN0ZWQgZGVjbGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pc0luaXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNJbml0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZGVjbGFyZU1vZGVsKCk7XHJcbiAgICAgICAgdGhpcy5kZWNsYXJlV25kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRlY2xhcmVNb2RlbCgpXHJcbiAgICB7fVxyXG5cclxuICAgIHByb3RlY3RlZCBkZWNsYXJlV25kKClcclxuICAgIHt9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Ye95pWwLOWcqG9uQ3JlYXRlKCnlh73mlbDlkI7osIPnlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5kZWNsYXJlKCk7XHJcbiAgICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcuuaZr+WIh+aNouWQjiDlm7rlrprliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uSW5pdCgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG59Il19