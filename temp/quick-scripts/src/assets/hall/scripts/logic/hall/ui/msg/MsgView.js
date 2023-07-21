"use strict";
cc._RF.push(module, 'f79aeD6yQZCSLe3DVj1LTZZ', 'MsgView');
// hall/scripts/logic/hall/ui/msg/MsgView.ts

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
var MsgEvent_1 = require("./MsgEvent");
var PoolBase_1 = require("../../../core/tool/PoolBase");
var ViewBase_1 = require("../../../core/ui/ViewBase");
var WaitingView_1 = require("../waiting/WaitingView");
var MsgView = /** @class */ (function (_super) {
    __extends(MsgView, _super);
    function MsgView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteFlag = true;
        _this.nodeList = [];
        return _this;
    }
    MsgView.prototype.onSubViewShow = function () {
        this.waitingNode.active = true;
        this.MsgModel.on(MsgEvent_1.MsgEvent.MsgListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.on(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        this.MsgModel.on(MsgEvent_1.MsgEvent.DeleteMsgCallback, this, this.OnDeleteMail);
        this.flag = true;
        this.InitData();
    };
    MsgView.prototype.InitData = function () {
        var data = this.MsgModel.GetDataByType(this.msgType);
        if (data) {
            this.RefreshLeftPanel(data);
        }
        else {
            this.MsgModel.GetMsgList(this.msgType);
        }
    };
    MsgView.prototype.OnDeleteMail = function (data) {
        Global.UI.fastTip("删除成功");
        this.ReSetRightPanel();
        this.RefreshLeftPanel(this.MsgModel.GetDataByType(this.msgType));
    };
    MsgView.prototype.initItemPool = function () {
        this.itemPool = new MailItemPool(this.copyItem);
    };
    MsgView.prototype.initView = function () {
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.leftPanel = this.getChild("LeftPanel");
        this.rightPanel = this.getChild("RightPanel");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        var tmpContentTxt = this.getChild("RightPanel/scrollview/view/content/Content");
        this.contentTxt = tmpContentTxt.getComponent(cc.Label);
        this.contentTxt.string = "";
        var tmpFromTxt = this.getChild("RightPanel/from");
        this.fromTxt = tmpFromTxt.getComponent(cc.Label);
        this.fromTxt.string = "";
        var tmpTimeTxt = this.getChild("RightPanel/time");
        this.timeTxt = tmpTimeTxt.getComponent(cc.Label);
        this.timeTxt.string = "";
        this.deleteBtn = this.getChild("RightPanel/DeleteButton");
        this.deleteBtn.active = false;
        this.addCommonClick("RightPanel/DeleteButton", this.DeleteMail, this);
        this.NoEmail = this.getChild("NoMail");
        this.NoEmail.active = false;
        this.MsgModel = Global.ModelManager.getModel("MsgModel");
        this.msgType = MsgEvent_1.MsgType.Mail;
        this.initItemPool();
        this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(120, 0));
    };
    MsgView.prototype.DeleteMail = function () {
        var _this = this;
        if (!this.deleteFlag) {
            Global.UI.fastTip("您的操作太频繁，请稍后重试");
            return;
        }
        this.deleteFlag = false;
        this.MsgModel.DelMail(this.selectId);
        this.deleteTimer = setTimeout(function () {
            _this.deleteFlag = true;
        }, 1000);
    };
    MsgView.prototype.onSubViewHide = function () {
        this.ReSetRightPanel();
        this.MsgModel.off(MsgEvent_1.MsgEvent.MsgListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.off(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        this.MsgModel.off(MsgEvent_1.MsgEvent.DeleteMsgCallback, this, this.OnDeleteMail);
        this.selectId = 0;
        // let MsgFlag = this.MsgModel.CheckIsAnyMailNotRead()
        // if (MsgFlag) {
        //     Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Mail]);
        // }
        // else {
        //     Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Mail);
        // }
    };
    MsgView.prototype.RefreshLeftPanel = function (msg) {
        if (msg == null) {
            this.waitingNode.active = false;
            this.NoEmail.active = true;
            this.leftPanel.active = false;
            this.rightPanel.active = false;
            return;
        }
        this.recycle();
        if (msg.mail.length === 0) {
            this.waitingNode.active = false;
            this.NoEmail.active = true;
            this.leftPanel.active = false;
            this.rightPanel.active = false;
            return;
        }
        var arr = msg.mail || [];
        var count = arr.length;
        this.leftPanel.active = true;
        this.rightPanel.active = true;
        this.NoEmail.active = false;
        this.deleteBtn.active = true;
        for (var j = 0; j < count; j++) {
            var imageItem = this.itemPool.getItem();
            imageItem.name = String(arr[j].id);
            imageItem.setParent(this.contentNode);
            this.nodeList.push(imageItem);
            if (j === 0) {
                imageItem.getComponent("MsgItem").SetToggleChecked(true);
                imageItem.getComponent("MsgItem").node.name = String(arr[j].id);
                this.selectId = arr[j].id;
            }
            imageItem.active = true;
            imageItem.on(cc.Node.EventType.TOUCH_END, this.imageItemClick, this);
            imageItem.getComponent("MsgItem").onInit(arr[j]);
        }
        var gameData = arr[0];
        if (gameData) {
            this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status);
        }
    };
    MsgView.prototype.imageItemClick = function (event) {
        this.waitingNode.active = true;
        Global.Audio.playBtnSound();
        var item = event.target;
        var gameListItem = item.getComponent("MsgItem");
        var gameData = gameListItem.getGameData();
        this.selectId = gameData.id;
        var data = this.MsgModel.GetContentByID(this.msgType, this.selectId);
        if (data) {
            this.RefreshInfoPanel(data);
            return;
        }
        this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status);
    };
    MsgView.prototype.RefreshInfoPanel = function (data) {
        this.waitingNode.active = false;
        this.contentTxt.string = "\r\n" + Global.Toolkit.removeEmoji(data.content) || "";
        this.timeTxt.string = data.send_time || "";
        this.fromTxt.string = Global.Toolkit.substrEndWithElli(data.from, 16) || ""; //data.from || ""
        this.RefreshLeftItem(data);
    };
    MsgView.prototype.RefreshLeftItem = function (data) {
        var node = cc.find(String(data.id), this.contentNode);
        if (node && node.isValid) {
            node.getComponent("MsgItem").SetUnReadActiveState(false);
        }
    };
    MsgView.prototype.ReSetRightPanel = function () {
        this.contentTxt.string = "";
        this.timeTxt.string = "";
        this.fromTxt.string = "";
    };
    MsgView.prototype.onDispose = function () {
        if (this.itemPool)
            this.itemPool.resetPool();
        this.nodeList = [];
        if (this.deleteTimer) {
            clearTimeout(this.deleteTimer);
        }
    };
    MsgView.prototype.recycle = function () {
        if (this.itemPool)
            this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return MsgView;
}(ViewBase_1.default));
exports.default = MsgView;
var MailItemPool = /** @class */ (function (_super) {
    __extends(MailItemPool, _super);
    function MailItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    MailItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    MailItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    MailItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return MailItemPool;
}(PoolBase_1.default));

cc._RF.pop();