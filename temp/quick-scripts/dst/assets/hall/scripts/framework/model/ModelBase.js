
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/model/ModelBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e6350pwQBxI8oTDyTfeZo2K', 'ModelBase');
// hall/scripts/framework/model/ModelBase.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../event/EventDispatcher");
/**
 * 所有数据模块的基类,
 * 注意: 新建的数据模块请在onInit()函数中指定数据模块的名字, 格式: this._name = "ModelBase";
 */
var ModelBase = /** @class */ (function (_super) {
    __extends(ModelBase, _super);
    function ModelBase() {
        var _this = _super.call(this) || this;
        _this.name = "ModelBase";
        _this.init();
        Global.ModelManager.registerModel(_this);
        return _this;
    }
    /**
     * 初始化,创建时调用
     */
    ModelBase.prototype.init = function () {
        this.onInit();
    };
    Object.defineProperty(ModelBase.prototype, "Name", {
        /**
         * get 方法获取模块名
         */
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 清理数据
     */
    ModelBase.prototype.clear = function () {
        this.onClear();
    };
    /**
     * 数据模块销毁
     */
    ModelBase.prototype.destroy = function () {
        this.onDestroy();
    };
    /**
     * 初始化时的回调
     * 注意:请在onInit()中给name赋值
     */
    ModelBase.prototype.onInit = function () {
        //this.name = "ModelBase";
    };
    /**
     * 数据清理时的回调
     */
    ModelBase.prototype.onClear = function () {
    };
    /**
     * 数据模块销毁时的回调
     */
    ModelBase.prototype.onDestroy = function () {
    };
    return ModelBase;
}(EventDispatcher_1.default));
exports.default = ModelBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxtb2RlbFxcTW9kZWxCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDREQUF1RDtBQUV2RDs7O0dBR0c7QUFDSDtJQUF1Qyw2QkFBZTtJQUtsRDtRQUFBLFlBQ0ksaUJBQU8sU0FLVjtRQUpHLEtBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ3hCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLE1BQU0sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxDQUFDOztJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDTyx3QkFBSSxHQUFkO1FBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFLRCxzQkFBVywyQkFBSTtRQUhmOztXQUVHO2FBQ0g7WUFFSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRDs7T0FFRztJQUNJLHlCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkJBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sMEJBQU0sR0FBaEI7UUFDSSwwQkFBMEI7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ08sMkJBQU8sR0FBakI7SUFFQSxDQUFDO0lBRUQ7O09BRUc7SUFDTyw2QkFBUyxHQUFuQjtJQUVBLENBQUM7SUFDTCxnQkFBQztBQUFELENBL0RBLEFBK0RDLENBL0RzQyx5QkFBZSxHQStEckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi9ldmVudC9FdmVudERpc3BhdGNoZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDmiYDmnInmlbDmja7mqKHlnZfnmoTln7rnsbssXHJcbiAqIOazqOaEjzog5paw5bu655qE5pWw5o2u5qih5Z2X6K+35Zyob25Jbml0KCnlh73mlbDkuK3mjIflrprmlbDmja7mqKHlnZfnmoTlkI3lrZcsIOagvOW8jzogdGhpcy5fbmFtZSA9IFwiTW9kZWxCYXNlXCI7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbEJhc2UgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcclxue1xyXG4gICAgLy/mqKHlnZflkI3lrZdcclxuICAgIHByb3RlY3RlZCBuYW1lOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJNb2RlbEJhc2VcIjtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLk1vZGVsTWFuYWdlci5yZWdpc3Rlck1vZGVsKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWLOWIm+W7uuaXtuiwg+eUqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IOaWueazleiOt+WPluaooeWdl+WQjVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnkIbmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMub25DbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u5qih5Z2X6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbml7bnmoTlm57osINcclxuICAgICAqIOazqOaEjzror7flnKhvbkluaXQoKeS4ree7mW5hbWXotYvlgLxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICAvL3RoaXMubmFtZSA9IFwiTW9kZWxCYXNlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7muIXnkIbml7bnmoTlm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xlYXIoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u5qih5Z2X6ZSA5q+B5pe255qE5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkRlc3Ryb3koKSB7XHJcblxyXG4gICAgfVxyXG59Il19