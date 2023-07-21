"use strict";
cc._RF.push(module, '41c36jRKLhGFrppbRrEKKZp', 'WndAwardDetail');
// hall/scripts/logic/hall/ui/Spread/WndAwardDetail.ts

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
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WaitingView_1 = require("../waiting/WaitingView");
var WndAwardDetail = /** @class */ (function (_super) {
    __extends(WndAwardDetail, _super);
    function WndAwardDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.page = 1;
        _this.limit = 7;
        _this.totalPage = 0;
        return _this;
    }
    WndAwardDetail.prototype.initView = function () {
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.top_normal = this.getChild("Top_Normal");
        this.top_self = this.getChild("Top_Self");
        this.title_self = this.getChild("View/Title_Self");
        this.title_normal = this.getChild("View/Title_Normal");
        this.cmmi_type = this.SpreadModel.commiType;
        this.copyItem = this.getChild("View/scrollview/item");
        if (this.SpreadModel.self_rate > 0 && this.cmmi_type === 1) {
            // this.WeekMyselfDir = this.getChild("Top_Self/WeekMyselfDir/Count").getComponent(cc.Label)
            // this.top_self.active = true
            // this.title_self.active = true
            // this.top_normal.active = false
            // this.title_normal.active = false
            // this.titleNode = this.title_self
            // this.topNode = this.top_self
            // this.WeekTotal = this.getChild("Top_Self/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Self/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Self/WeekOther/Count").getComponent(cc.Label)
            // this.copyItem = this.getChild("View/scrollview/item_self");
        }
        else if (this.SpreadModel.self_rate <= 0 && this.cmmi_type === 1) {
            // this.top_self.active = false
            // this.title_self.active = false
            // this.top_normal.active = true
            // this.titleNode = this.title_normal
            // this.topNode = this.top_normal
            // this.title_normal.active = true
            // this.WeekTotal = this.getChild("Top_Normal/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Normal/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Normal/WeekOther/Count").getComponent(cc.Label)
            // this.top_self.active = false
            // this.title_self.active = false 
        }
        if (this.cmmi_type == 2) {
            this.titleNode = this.getChild("View/Title");
        }
        this.LastPageBtn = this.getChild("View/BotBtn/LastPage");
        this.NextPageBtn = this.getChild("View/BotBtn/NextPage");
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.contentNode = this.getChild("View/scrollview/view/content");
        this.copyItem.active = false;
        this.TotalInfo = this.getChild("View/BotBtn/TotalInfoLabel").getComponent(cc.Label);
        this.pageInfo = this.getChild("View/BotBtn/TotalInfoLabel/PageLabel").getComponent(cc.Label);
        this.noTips = this.getChild("View/noListTipsSk");
        this.noTips.active = false;
        this.botNode = this.getChild("View/BotBtn");
        this.botNode.active = false;
        this.initItemPool();
    };
    WndAwardDetail.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page++;
        if (this.page > this.totalPage) {
            this.page = this.totalPage;
            Global.UI.fastTip("没有更多数据");
            return;
        }
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
            // this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page--;
        if (this.page <= 0) {
            this.page = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
            //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.initItemPool = function () {
        this.itemPool = new AwardDetailItemPool(this.copyItem);
    };
    // public open(args?:any[])
    // {
    //     this.onOpen(args);
    //     //this.callAllView("open", args);
    // }
    WndAwardDetail.prototype.onSubViewShow = function () {
        Global.HallServer.on(NetEvent_1.NetAppface.GetSendRecord, this, this.InitTeamListView);
        Global.HallServer.on(NetEvent_1.NetAppface.GetDayFlowInfoList, this, this.InitTeamListView);
        if (this.cmmi_type === 1) {
            //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.InitTeamListView = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        if (data == null || Global.Toolkit.isEmptyObject(data)) {
            return;
        }
        if (data.total == 0) {
            if (this.topNode)
                this.topNode.active = false;
            this.noTips.active = true;
            this.titleNode.active = false;
            this.botNode.active = false;
        }
        else {
            if (this.topNode)
                this.topNode.active = true;
            this.noTips.active = false;
            this.titleNode.active = true;
            this.botNode.active = true;
        }
        this.InitTopView(data);
        var arr;
        if (this.cmmi_type === 1) {
            // arr = data.data || []
        }
        if (this.cmmi_type === 2) {
            arr = data.list || [];
        }
        var count = arr.length;
        this.totalPage = Math.ceil(data.total / data.limit);
        this.recycle();
        var msgFormat = "共%s条";
        this.TotalInfo.string = cc.js.formatStr(msgFormat, data.total);
        var str = "第%s页";
        this.pageInfo.string = cc.js.formatStr(str, data.page);
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("AwardDetailItem").Init(arr[j]);
        }
    };
    WndAwardDetail.prototype.InitTopView = function (data) {
        if (data == null) {
            if (this.WeekTotal)
                this.WeekTotal.string = "";
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = "";
            if (this.WeekDir)
                this.WeekDir.string = "";
            if (this.WeekOther)
                this.WeekOther.string = "";
        }
        else {
            //TODO
            if (this.WeekTotal)
                this.WeekTotal.string = Global.Toolkit.formatPointStr(data.week_total_send_point);
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = Global.Toolkit.formatPointStr(data.week_self_send_point);
            if (this.WeekDir)
                this.WeekDir.string = Global.Toolkit.formatPointStr(data.week_unter_send_point);
            if (this.WeekOther)
                this.WeekOther.string = Global.Toolkit.formatPointStr(data.week_other_send_point);
        }
    };
    WndAwardDetail.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    WndAwardDetail.prototype.onSubViewHide = function () {
        this.ResetData();
        Global.HallServer.offAllByCaller(this);
        Global.HallServer.off(NetEvent_1.NetAppface.GetSendRecord, this, this.InitTeamListView);
        Global.HallServer.off(NetEvent_1.NetAppface.GetCommiInfoList, this, this.InitTeamListView);
    };
    WndAwardDetail.prototype.ResetData = function () {
        this.totalPage = 0;
        this.page = 1;
    };
    WndAwardDetail.prototype.onDispose = function () {
        this.itemPool.resetPool();
    };
    return WndAwardDetail;
}(ViewBase_1.default));
exports.default = WndAwardDetail;
var AwardDetailItemPool = /** @class */ (function (_super) {
    __extends(AwardDetailItemPool, _super);
    function AwardDetailItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    AwardDetailItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    AwardDetailItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return AwardDetailItemPool;
}(PoolBase_1.default));

cc._RF.pop();