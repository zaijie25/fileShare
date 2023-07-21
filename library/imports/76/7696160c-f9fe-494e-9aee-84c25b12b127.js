"use strict";
cc._RF.push(module, '76961YM+f5JTpruhMJbErEn', 'WndCommissionlist');
// hall/scripts/logic/hall/ui/Spread/WndCommissionlist.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var PoolBase_1 = require("../../../core/tool/PoolBase");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WndCommissionlist = /** @class */ (function (_super) {
    __extends(WndCommissionlist, _super);
    function WndCommissionlist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.SpreadModel = null;
        return _this;
    }
    WndCommissionlist.prototype.onInit = function () {
        this.name = "WndCommissionlist";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/Commissionlist";
    };
    WndCommissionlist.prototype.initView = function () {
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.copyItem = this.getChild("ScrollView/view/content/item");
        this.contentNode = this.getChild("ScrollView/view/content");
        this.noTips = this.getChild("noListTipsSk");
        this.noTips.active = false;
        this.titleNode = this.getChild("topTitle");
        this.titleNode.active = false;
        this.initItemPool();
    };
    WndCommissionlist.prototype.onOpen = function (data) {
        this.SpreadModel.on(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.copyItem.active = false;
        if (data == null || data.length == 0) {
            return;
        }
        this.RefreshScrollView(data[0]);
    };
    WndCommissionlist.prototype.RefreshScrollView = function (data) {
        if (data == null) {
            Global.UI.fastTip("无数据");
            this.noTips.active = true;
            this.titleNode.active = false;
            return;
        }
        this.noTips.active = false;
        this.titleNode.active = true;
        var arr = data.list || [];
        var count = arr.length;
        this.recycle();
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("AwardCommiItem").Init(arr[j]);
        }
    };
    WndCommissionlist.prototype.onClose = function () {
        this.SpreadModel.off(NetEvent_1.NetAppface.GetDayAgentCommi, this, this.RefreshScrollView);
    };
    WndCommissionlist.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.nodeList = [];
    };
    WndCommissionlist.prototype.initItemPool = function () {
        this.itemPool = new AwardRecordItemPool(this.copyItem);
    };
    WndCommissionlist.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndCommissionlist;
}(WndBase_1.default));
exports.default = WndCommissionlist;
var AwardRecordItemPool = /** @class */ (function (_super) {
    __extends(AwardRecordItemPool, _super);
    function AwardRecordItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    AwardRecordItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    AwardRecordItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return AwardRecordItemPool;
}(PoolBase_1.default));

cc._RF.pop();