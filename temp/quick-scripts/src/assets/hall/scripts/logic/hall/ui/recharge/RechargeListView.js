"use strict";
cc._RF.push(module, '554698tEwVLtK1ZjX0ba+b2', 'RechargeListView');
// hall/scripts/logic/hall/ui/recharge/RechargeListView.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var RechargeListView = /** @class */ (function (_super) {
    __extends(RechargeListView, _super);
    function RechargeListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        //当前显示的页数
        _this.limit = 6;
        return _this;
    }
    RechargeListView.prototype.initView = function () {
        this.Rechagemodel = Global.ModelManager.getModel("RechargeModel");
        this.Rechagemodel.on(RechargeModel_1.default.UpdateHistory, this, this.InitTeamListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool();
    };
    RechargeListView.prototype.onOpenRecharge = function (isRecharge) {
        if (isRecharge === void 0) { isRecharge = false; }
        this.isRecharge = isRecharge;
        this.Rechagemodel.reqGetUserPayList();
    };
    RechargeListView.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.Rechagemodel.off(RechargeModel_1.default.UpdateHistory, this, this.InitTeamListView);
    };
    //下一页
    RechargeListView.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        if (this.arrList.length > this.Rechagemodel.hisListPage * this.limit) {
            this.Rechagemodel.hisListPage++;
            this.InitTeamListView();
        }
        else {
            this.Rechagemodel.reqGetUserPayList(true);
        }
    };
    // 上一页
    RechargeListView.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.Rechagemodel.hisListPage--;
        if (this.Rechagemodel.hisListPage <= 0) {
            this.Rechagemodel.hisListPage = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.InitTeamListView();
    };
    RechargeListView.prototype.initItemPool = function () {
        this.itemPool = new RecordingItemPool(this.copyItem);
    };
    RechargeListView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    RechargeListView.prototype.InitTeamListView = function () {
        this.arrList = this.Rechagemodel.getHisListData() || [];
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
        var listCount = count - (this.Rechagemodel.hisListPage - 1) * this.limit > this.limit ? this.limit : count - (this.Rechagemodel.hisListPage - 1) * this.limit;
        this.recycle();
        for (var j = 0; j < listCount; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.Rechagemodel.hisListPage - 1) * this.limit + j], j, this.isRecharge);
        }
        var msgFormat = "共%s条";
        var str = "第%s页";
        this.pageLabel.string = cc.js.formatStr(msgFormat, this.Rechagemodel.hisTotal) + cc.js.formatStr(str, this.Rechagemodel.hisListPage);
    };
    return RechargeListView;
}(ViewBase_1.default));
exports.default = RechargeListView;
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