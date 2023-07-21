"use strict";
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