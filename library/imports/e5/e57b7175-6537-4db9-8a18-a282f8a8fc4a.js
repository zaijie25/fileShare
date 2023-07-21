"use strict";
cc._RF.push(module, 'e57b7F1ZTdNuYoYooL4qPxK', 'ErmjOutMjViewManager');
// ermj/Ermj/scripts/manager/ErmjOutMjViewManager.ts

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
var ErmjBasePool_1 = require("../tool/ErmjBasePool");
var ErmjMahjongOutView_1 = require("../subView/mahjong/ErmjMahjongOutView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjOutMjViewManager = /** @class */ (function () {
    function ErmjOutMjViewManager(rootNode) {
        this.rootNode = rootNode;
        this.inUsedOutMjList = [];
        this.inUsedFlowerMjList = [];
        this.inUsedBrightMjList = [];
        this.inUsedWinMjList = [];
        this.rootNode.active = false;
        this.poolHelper = new ErmjOutMjViewPool(this.rootNode);
    }
    /** 获取用于亮牌麻将子 */
    ErmjOutMjViewManager.prototype.getOneBrightMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedBrightMjList.push(item);
        return item;
    };
    /** 获取用于花牌麻将子 */
    ErmjOutMjViewManager.prototype.getOneFlowerMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedFlowerMjList.push(item);
        return item;
    };
    /** 获取用于打出的麻将子 */
    ErmjOutMjViewManager.prototype.getOneOutMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedOutMjList.push(item);
        return item;
    };
    /** 获取用于胡牌的麻将子 */
    ErmjOutMjViewManager.prototype.getOneWinMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedWinMjList.push(item);
        return item;
    };
    /** 获取最后一次出牌麻将子 主要用于吃碰杠 */
    ErmjOutMjViewManager.prototype.getLastOutMj = function () {
        var count = this.inUsedOutMjList.length;
        return this.inUsedOutMjList[count - 1];
    };
    /** 获取最近一次胡牌展览麻将子 */
    ErmjOutMjViewManager.prototype.getLastWinMj = function () {
        var count = this.inUsedWinMjList.length;
        return this.inUsedWinMjList[count - 1];
    };
    /** 回收最后一次麻将子 */
    ErmjOutMjViewManager.prototype.recycleLastOutMj = function () {
        var mjItem = this.inUsedOutMjList.pop();
        this.poolHelper.recycleItem(mjItem);
    };
    ErmjOutMjViewManager.prototype.recycleOneOutMj = function (item) {
        // 作单个回收需要处理下, 从inUsedOutMjList中删除
        // 暂时用不上
    };
    /** 回收所有打出 补花出的麻将 */
    ErmjOutMjViewManager.prototype.clear = function () {
        this.poolHelper.recycleAll(this.inUsedOutMjList);
        this.inUsedOutMjList = [];
        this.poolHelper.recycleAll(this.inUsedFlowerMjList);
        this.inUsedFlowerMjList = [];
        this.poolHelper.recycleAll(this.inUsedBrightMjList);
        this.inUsedBrightMjList = [];
        this.poolHelper.recycleAll(this.inUsedWinMjList);
        this.inUsedWinMjList = [];
    };
    return ErmjOutMjViewManager;
}());
exports.default = ErmjOutMjViewManager;
var ErmjOutMjViewPool = /** @class */ (function (_super) {
    __extends(ErmjOutMjViewPool, _super);
    function ErmjOutMjViewPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ErmjOutMjViewPool.prototype, "preCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjOutMjViewPool.prototype, "everyCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    ErmjOutMjViewPool.prototype.createItem = function () {
        var prefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongOutView", cc.Prefab);
        var node = cc.instantiate(prefab);
        var item = new ErmjMahjongOutView_1.default(node);
        return item;
    };
    ErmjOutMjViewPool.prototype.resetItem = function (item) {
        item.reset();
        item.node.setParent(this.root);
        item.active = false;
    };
    return ErmjOutMjViewPool;
}(ErmjBasePool_1.default));

cc._RF.pop();