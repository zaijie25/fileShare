"use strict";
cc._RF.push(module, 'b2be4Cy+YxKbZ4gSetWQI9P', 'NoticeView');
// hall/scripts/logic/hall/ui/msg/NoticeView.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var ViewBase_1 = require("../../../core/ui/ViewBase");
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var WaitingView_1 = require("../waiting/WaitingView");
var NoticeView = /** @class */ (function (_super) {
    __extends(NoticeView, _super);
    function NoticeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        return _this;
    }
    NoticeView.prototype.onSubViewShow = function () {
        this.waitingNode.active = true;
        this.MsgModel.on(MsgEvent_1.MsgEvent.NoticeListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.on(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        this.MsgModel.SetStatus(null);
        this.InitData();
    };
    /* public openAnimFinish() {
        this.InitData()
    } */
    NoticeView.prototype.InitData = function () {
        var data = this.MsgModel.GetDataByType(this.msgType);
        if (data) {
            this.RefreshLeftPanel(data);
        }
        else {
            this.MsgModel.GetMsgList(this.msgType);
        }
    };
    NoticeView.prototype.initView = function () {
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        this.layout = this.contentNode.getComponent(cc.Layout);
        var tmpContentTxt = this.getChild("RightPanel/scrollview/view/content/Content");
        this.contentTxt = tmpContentTxt.getComponent(cc.Label);
        this.contentTxt.string = "";
        var tmpFromTxt = this.getChild("RightPanel/from");
        this.fromTxt = tmpFromTxt.getComponent(cc.Label);
        this.fromTxt.string = "";
        var tmpTimeTxt = this.getChild("RightPanel/time");
        this.timeTxt = tmpTimeTxt.getComponent(cc.Label);
        this.timeTxt.string = "";
        this.Sprite = this.getChild("RightPanel/maskSprite/SpriteItem").getComponent(cc.Sprite);
        this.noMsgTips = this.getChild("noMsgTips");
        this.noMsgTips.active = false;
        /* this.addCommonClick("close", this.closeWnd, this);
        this.rightBg = this.getChild("bg");
        this.rightBg.active = false; */
        this.MsgModel = Global.ModelManager.getModel("MsgModel");
        this.msgType = MsgEvent_1.MsgType.Notice;
        this.initItemPool();
        this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(120, 0));
    };
    NoticeView.prototype.initItemPool = function () {
        this.itemPool = new NoticeItemPool(this.copyItem);
    };
    NoticeView.prototype.RefreshLeftPanel = function (msg) {
        if (msg == null) {
            this.copyItem.active = false;
            this.noMsgTips.active = true;
            this.waitingNode.active = false;
            // this.rightBg.active = false;
            return;
        }
        this.recycle();
        if (msg.notice.length === 0) {
            this.waitingNode.active = false;
            this.copyItem.active = false;
            this.noMsgTips.active = true;
            // this.rightBg.active = false;
            return;
        }
        var arr = msg.notice || [];
        var count = arr.length;
        this.noMsgTips.active = false;
        for (var j = 0; j < count; j++) {
            var imageItem = this.itemPool.getItem();
            imageItem.name = String(arr[j].id);
            imageItem.setParent(this.contentNode);
            this.nodeList.push(imageItem);
            if (j === 0) {
                imageItem.getComponent("FeedbackLeftItem").SetToggleChecked(true);
                imageItem.getComponent("FeedbackLeftItem").node.name = String(arr[j].id);
                this.selectId = arr[j].id;
            }
            imageItem.active = true;
            imageItem.on(cc.Node.EventType.TOUCH_END, this.imageItemClick, this);
            var imgItem = imageItem.getComponent("FeedbackLeftItem");
            imgItem.onInit(arr[j].title);
            imgItem.entityData = arr[j];
        }
        var gameData = arr[0];
        if (gameData) {
            this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status);
        }
    };
    NoticeView.prototype.imageItemClick = function (event) {
        this.waitingNode.active = true;
        Global.Audio.playBtnSound();
        var item = event.target;
        var gameListItem = item.getComponent("FeedbackLeftItem");
        var gameData = gameListItem.entityData;
        this.selectId = gameData.id;
        this.ReSetRightPanel();
        var data = this.MsgModel.GetContentByID(this.msgType, this.selectId);
        if (data) {
            this.RefreshInfoPanel(data);
            return;
        }
        // Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, true)
        this.MsgModel.ReadMsg(gameData.id, this.msgType, gameData.red_status);
    };
    NoticeView.prototype.RefreshInfoPanel = function (data) {
        this.waitingNode.active = false;
        this.ReSetRightPanel();
        this.contentTxt.string = "\r\n" + Global.Toolkit.removeEmoji(data.content) || "";
        this.timeTxt.string = data.send_time || "";
        this.fromTxt.string = data.from || "";
        this.Sprite.spriteFrame = null;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        var self = this;
        if (data.back_url != null && !Global.Toolkit.isEmptyObject(data.back_url)) {
            this.contentTxt.string = "";
            this.timeTxt.string = "";
            this.fromTxt.string = "";
            if (CC_JSB) {
                Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, true);
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(data.back_url), Global.Toolkit.DealWithUrl(data.back_url), function (texture) {
                    if (self.selectId != data.id) {
                        return;
                    }
                    if (self.node && self.node.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.Sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        self.Sprite.node.width = 750;
                        self.Sprite.node.height = 480;
                        self.Sprite.spriteFrame = frame;
                        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
                    }
                });
            }
            else {
                Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, true);
                cc.assetManager.loadRemote(data.back_url, { ext: '.png' }, function (err, texture) {
                    if (self.selectId != data.id) {
                        return;
                    }
                    if (self.node && self.node.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.Sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        self.Sprite.node.width = 750;
                        self.Sprite.node.height = 480;
                        self.Sprite.spriteFrame = frame;
                        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
                    }
                });
            }
        }
        this.RefreshLeftItem(data);
    };
    NoticeView.prototype.onSubViewHide = function () {
        this.MsgModel.off(MsgEvent_1.MsgEvent.NoticeListCallback, this, this.RefreshLeftPanel);
        this.MsgModel.off(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.RefreshInfoPanel);
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.Notice);
        this.selectId = 0;
        // let MsgFlag = this.MsgModel.CheckIsAnyNoticeNotRead()
        // if (MsgFlag) {
        //     Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Gonggao]);
        // }
        // else {
        //     Global.Event.event(GlobalEvent.CloseRedSpot, HallRedSpotType.Gonggao);
        // }
        this.ReSetRightPanel();
    };
    NoticeView.prototype.RefreshLeftItem = function (data) {
        var node = cc.find(String(data.id), this.contentNode);
        if (node && node.isValid) {
            node.getComponent("FeedbackLeftItem").SetUnReadActiveState(false);
        }
    };
    NoticeView.prototype.ReSetRightPanel = function () {
        this.contentTxt.string = "";
        this.timeTxt.string = "";
        this.fromTxt.string = "";
        // this.Sprite.spriteFrame = null
    };
    NoticeView.prototype.onDispose = function () {
        if (this.itemPool)
            this.itemPool.resetPool();
        this.nodeList = [];
    };
    NoticeView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return NoticeView;
}(ViewBase_1.default));
exports.default = NoticeView;
var NoticeItemPool = /** @class */ (function (_super) {
    __extends(NoticeItemPool, _super);
    function NoticeItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    NoticeItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    NoticeItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    NoticeItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return NoticeItemPool;
}(PoolBase_1.default));

cc._RF.pop();