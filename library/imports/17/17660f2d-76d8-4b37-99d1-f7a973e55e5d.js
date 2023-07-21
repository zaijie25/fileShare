"use strict";
cc._RF.push(module, '176608tdthLN5nR96lz5V5d', 'CashListView');
// hall/scripts/logic/hall/ui/recharge/CashListView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var ExtractEvent_1 = require("../money/ui/extractCash/ExtractEvent");
var PoolBase_1 = require("../../../core/tool/PoolBase");
var CashListView = /** @class */ (function (_super) {
    __extends(CashListView, _super);
    function CashListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.limit = 6;
        return _this;
    }
    CashListView.prototype.initView = function () {
        // cc.log("打开界面");
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.model.on(ExtractEvent_1.ExtractEvent.OnUpdateApplyCashList, this, this.InitCashListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        //暂无任何信息
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool();
    };
    CashListView.prototype.onOpenRecharge = function (isRecharge) {
        if (isRecharge === void 0) { isRecharge = false; }
        this.isRecharge = isRecharge;
        this.model.reqApplyCashList();
    };
    CashListView.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.model.off(ExtractEvent_1.ExtractEvent.OnUpdateApplyCashList, this, this.InitCashListView);
    };
    //下一页
    CashListView.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        if (this.arrList.length > this.model.cashListPage * this.limit) {
            this.model.cashListPage++;
            this.InitCashListView();
        }
        else {
            this.model.reqApplyCashList(true);
        }
    };
    // 上一页
    CashListView.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.model.cashListPage--;
        if (this.model.cashListPage <= 0) {
            this.model.cashListPage = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.InitCashListView();
    };
    CashListView.prototype.initItemPool = function () {
        this.itemPool = new RecordingItemPool(this.copyItem);
    };
    CashListView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    CashListView.prototype.InitCashListView = function () {
        this.arrList = this.model.getCashListData() || [];
        var count = this.arrList.length;
        if (count < 1) {
            this.nothingNode.active = true;
            this.pageLabel.node.active = false;
            this.nextBtn.active = false;
            this.lastBtn.active = false;
        }
        else {
            this.nothingNode.active = false;
            this.pageLabel.node.active = true;
            this.nextBtn.active = true;
            this.lastBtn.active = true;
        }
        if (count == 0)
            return;
        var listCount = count - (this.model.cashListPage - 1) * this.limit > this.limit ? this.limit : count - (this.model.cashListPage - 1) * this.limit;
        this.recycle();
        for (var j = 0; j < listCount; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.model.cashListPage - 1) * this.limit + j], j, this.isRecharge);
        }
        var msgFormat = "共%s条";
        var str = "第%s页";
        this.pageLabel.string = cc.js.formatStr(msgFormat, this.model.cashTotal) + cc.js.formatStr(str, this.model.cashListPage);
    };
    return CashListView;
}(ViewBase_1.default));
exports.default = CashListView;
var RecordingItemPool = /** @class */ (function (_super) {
    __extends(RecordingItemPool, _super);
    function RecordingItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    RecordingItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    RecordingItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    RecordingItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return RecordingItemPool;
}(PoolBase_1.default));

cc._RF.pop();