"use strict";
cc._RF.push(module, '7f5ceGKvPpBpbZWkcSRghgI', 'WndAwardRecord');
// hall/scripts/logic/hall/ui/Spread/WndAwardRecord.ts

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
var WndAwardRecord = /** @class */ (function (_super) {
    __extends(WndAwardRecord, _super);
    function WndAwardRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.page = 1;
        _this.TotalPage = 0;
        _this.SpreadModel = null;
        _this.limit = 4;
        return _this;
    }
    // tipmyself: cc.Node;
    WndAwardRecord.prototype.onInit = function () {
        this.name = "WndAwardRecord";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/AwardHistory";
    };
    WndAwardRecord.prototype.initView = function () {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.cmmi_type = SpreadModel.commiType;
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_middle/close", this.close, this);
        this.LastPageBtn = this.getChild("BotBtn/LastPage");
        this.NextPageBtn = this.getChild("BotBtn/NextPage");
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        // this.tipmyself = this.getChild("bg_popup_middle/topTitle/type")
        // if (this.SpreadModel.self_rate > 0|| this.cmmi_type === 2) {
        //     this.tipmyself.active = true
        // }
        // else {
        //     this.tipmyself.active = false
        // }
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.copyItem = this.getChild("bg_popup_middle/scrollview/view/content/item");
        this.contentNode = this.getChild("bg_popup_middle/scrollview/view/content");
        this.TotalInfoLabel = this.getChild("BotBtn/TotalInfoLabel").getComponent(cc.Label);
        this.PageLabel = this.getChild("BotBtn/PageLabel").getComponent(cc.Label);
        this.noTips = this.getChild("bg_popup_middle/scrollview/noListTipsSk");
        this.noTips.active = false;
        this.titleNode = this.getChild("bg_popup_middle/topTitle");
        this.titleNode.active = false;
        this.botNode = this.getChild("BotBtn");
        this.botNode.active = false;
        this.initItemPool();
    };
    WndAwardRecord.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page++;
        if (this.page > this.TotalPage) {
            this.page = this.TotalPage;
            Global.UI.fastTip("没有更多数据");
            return;
        }
        this.SpreadModel.GetDayAgentRecord(this.page, this.limit);
    };
    WndAwardRecord.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page--;
        if (this.page <= 0) {
            this.page = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.SpreadModel.GetDayAgentRecord(this.page, this.limit);
    };
    WndAwardRecord.prototype.onOpen = function (data) {
        this.SpreadModel.on(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.SpreadModel.on(NetEvent_1.NetAppface.GetDayAgentRecord, this, this.RefreshScrollView);
        this.copyItem.active = false;
        if (data == null || data.length == 0) {
            return;
        }
        this.RefreshScrollView(data[0]);
    };
    WndAwardRecord.prototype.RefreshScrollView = function (data) {
        if (data == null) {
            Global.UI.fastTip("无数据");
            return;
        }
        if (data.total == 0) {
            this.noTips.active = true;
            this.titleNode.active = false;
            this.botNode.active = false;
        }
        else {
            this.noTips.active = false;
            this.titleNode.active = true;
            this.botNode.active = true;
        }
        this.TotalPage = Math.ceil(data.total / data.limit);
        var msgFormat = "共%s条";
        this.TotalInfoLabel.string = cc.js.formatStr(msgFormat, data.total);
        var str = "第%s页";
        this.PageLabel.string = cc.js.formatStr(str, this.TotalPage);
        var arr = data.data || [];
        var count = arr.length;
        this.recycle();
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            // node.getChildByName("bg").active = j % 2 == 0;
            node.setParent(this.contentNode);
            node.getComponent("AwardRecordItem").Init(arr[j]);
        }
    };
    WndAwardRecord.prototype.onClose = function () {
        this.ResetData();
        this.SpreadModel.off(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.SpreadModel.off(NetEvent_1.NetAppface.GetDayAgentRecord, this, this.RefreshScrollView);
    };
    WndAwardRecord.prototype.ResetData = function () {
        this.page = 1;
        this.TotalPage = 0;
    };
    WndAwardRecord.prototype.onDispose = function () {
        this.nodeList = [];
        this.itemPool.resetPool();
    };
    WndAwardRecord.prototype.initItemPool = function () {
        this.itemPool = new AwardRecordItemPool(this.copyItem);
    };
    WndAwardRecord.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndAwardRecord;
}(WndBase_1.default));
exports.default = WndAwardRecord;
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