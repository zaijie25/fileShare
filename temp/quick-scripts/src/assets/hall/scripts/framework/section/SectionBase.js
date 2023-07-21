"use strict";
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