
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/msg/NoticeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtc2dcXE5vdGljZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLHdEQUFtRDtBQUNuRCxnRUFBMkU7QUFDM0Usc0RBQWlEO0FBQ2pELG1FQUFrRTtBQUVsRSxzREFBaUQ7QUFFakQ7SUFBd0MsOEJBQVE7SUFBaEQ7UUFBQSxxRUF5T0M7UUF6TkcsY0FBUSxHQUFVLEVBQUUsQ0FBQzs7SUF5TnpCLENBQUM7SUF2TmEsa0NBQWEsR0FBdkI7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRUQ7O1FBRUk7SUFFSiw2QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksSUFBSSxFQUFFO1lBQ04sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO1NBQzlCO2FBQ0k7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDekM7SUFDTCxDQUFDO0lBRVMsNkJBQVEs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USxHQUFSLFFBQVEsQ0FBUzs7SUFFckMsQ0FBQztJQUVTLG1DQUFVLEdBQXBCO1FBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsa0NBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXhCLENBQUM7SUFDTSxtQ0FBVSxHQUFqQixVQUFrQixHQUFlO1FBQWpDLGlCQU1DO1FBTEcsaUJBQU0sVUFBVSxZQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFDTCxxQkFBQztBQUFELENBckJBLEFBcUJDLENBckI0QixrQkFBUSxHQXFCcEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNc2dFdmVudCwgTXNnVHlwZSB9IGZyb20gXCIuL01zZ0V2ZW50XCI7XHJcbmltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IFBvcFduZE5hbWUgfSBmcm9tIFwiLi4vLi4vdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUNvbnN0YW50cyB9IGZyb20gXCIuLi9BY3Rpdml0eS9BY3Rpdml0eUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgTXNnTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvTXNnTW9kZWxcIjtcclxuaW1wb3J0IFdhaXRpbmdWaWV3IGZyb20gXCIuLi93YWl0aW5nL1dhaXRpbmdWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpY2VWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIE1zZ01vZGVsOiBNc2dNb2RlbDtcclxuICAgIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgY29weUl0ZW06IGFueTtcclxuICAgIGxheW91dDogY2MuTGF5b3V0O1xyXG4gICAgY29udGVudFR4dDogY2MuTGFiZWw7XHJcbiAgICBmcm9tVHh0OiBjYy5MYWJlbDtcclxuICAgIHRpbWVUeHQ6IGNjLkxhYmVsO1xyXG4gICAgc2VsZWN0SWQ6IG51bWJlcjtcclxuICAgIHRpbWVySUQ6IGFueTtcclxuICAgIFNwcml0ZTogY2MuU3ByaXRlXHJcbiAgICBub01zZ1RpcHM6IGNjLk5vZGU7XHJcbiAgICAvLyByaWdodEJnOiBjYy5Ob2RlO1xyXG4gICAgbXNnVHlwZTogbnVtYmVyXHJcbiAgICBpdGVtUG9vbDogTm90aWNlSXRlbVBvb2w7XHJcbiAgICBub2RlTGlzdDogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgd2FpdGluZ05vZGUgOmNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgXHR0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbC5vbihNc2dFdmVudC5Ob3RpY2VMaXN0Q2FsbGJhY2ssIHRoaXMsIHRoaXMuUmVmcmVzaExlZnRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbC5vbihNc2dFdmVudC5SZWFkTXNnQ2FsbEJhY2ssIHRoaXMsIHRoaXMuUmVmcmVzaEluZm9QYW5lbCk7XHJcblxyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwuU2V0U3RhdHVzKG51bGwpXHJcbiAgICAgICAgdGhpcy5Jbml0RGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgLyogcHVibGljIG9wZW5BbmltRmluaXNoKCkge1xyXG4gICAgICAgIHRoaXMuSW5pdERhdGEoKVxyXG4gICAgfSAqL1xyXG5cclxuICAgIEluaXREYXRhKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5Nc2dNb2RlbC5HZXREYXRhQnlUeXBlKHRoaXMubXNnVHlwZSk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoTGVmdFBhbmVsKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk1zZ01vZGVsLkdldE1zZ0xpc3QodGhpcy5tc2dUeXBlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJMZWZ0UGFuZWwvTXNnSXRlbVwiKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLmxheW91dCA9IHRoaXMuY29udGVudE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxheW91dClcclxuXHJcbiAgICAgICAgbGV0IHRtcENvbnRlbnRUeHQgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudC9Db250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR4dCA9IHRtcENvbnRlbnRUeHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUeHQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIGxldCB0bXBGcm9tVHh0ID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWwvZnJvbVwiKTtcclxuICAgICAgICB0aGlzLmZyb21UeHQgPSB0bXBGcm9tVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5mcm9tVHh0LnN0cmluZyA9IFwiXCJcclxuXHJcbiAgICAgICAgbGV0IHRtcFRpbWVUeHQgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC90aW1lXCIpO1xyXG4gICAgICAgIHRoaXMudGltZVR4dCA9IHRtcFRpbWVUeHQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnRpbWVUeHQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHRoaXMuU3ByaXRlID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWwvbWFza1Nwcml0ZS9TcHJpdGVJdGVtXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubm9Nc2dUaXBzID0gdGhpcy5nZXRDaGlsZChcIm5vTXNnVGlwc1wiKTtcclxuICAgICAgICB0aGlzLm5vTXNnVGlwcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvKiB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIiwgdGhpcy5jbG9zZVduZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yaWdodEJnID0gdGhpcy5nZXRDaGlsZChcImJnXCIpO1xyXG4gICAgICAgIHRoaXMucmlnaHRCZy5hY3RpdmUgPSBmYWxzZTsgKi9cclxuICAgICAgICB0aGlzLk1zZ01vZGVsID0gPE1zZ01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJNc2dNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLm1zZ1R5cGUgPSBNc2dUeXBlLk5vdGljZVxyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKCk7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nTm9kZSA9IFdhaXRpbmdWaWV3LmluaXRXYWl0aW5nVmlldyh0aGlzLm5vZGUsY2MudjIoMTIwLDApKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRJdGVtUG9vbCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IG5ldyBOb3RpY2VJdGVtUG9vbCh0aGlzLmNvcHlJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBSZWZyZXNoTGVmdFBhbmVsKG1zZzogYW55KSB7XHJcbiAgICAgICAgaWYgKG1zZyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29weUl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucmlnaHRCZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpXHJcbiAgICAgICAgaWYgKG1zZy5ub3RpY2UubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY29weUl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucmlnaHRCZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBtc2cubm90aWNlIHx8IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5ub01zZ1RpcHMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZUl0ZW0gPSB0aGlzLml0ZW1Qb29sLmdldEl0ZW0oKTtcclxuICAgICAgICAgICAgaW1hZ2VJdGVtLm5hbWUgPSBTdHJpbmcoYXJyW2pdLmlkKTtcclxuICAgICAgICAgICAgaW1hZ2VJdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2goaW1hZ2VJdGVtKTtcclxuICAgICAgICAgICAgaWYgKGogPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGltYWdlSXRlbS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpLlNldFRvZ2dsZUNoZWNrZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIGltYWdlSXRlbS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpLm5vZGUubmFtZSA9IFN0cmluZyhhcnJbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJZCA9IGFycltqXS5pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltYWdlSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbWFnZUl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmltYWdlSXRlbUNsaWNrLCB0aGlzKVxyXG4gICAgICAgICAgICBsZXQgaW1nSXRlbSA9IGltYWdlSXRlbS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpXHJcbiAgICAgICAgICAgIGltZ0l0ZW0ub25Jbml0KGFycltqXS50aXRsZSlcclxuICAgICAgICAgICAgaW1nSXRlbS5lbnRpdHlEYXRhID0gYXJyW2pdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdhbWVEYXRhID0gYXJyWzBdXHJcbiAgICAgICAgaWYgKGdhbWVEYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTXNnTW9kZWwuUmVhZE1zZyhnYW1lRGF0YS5pZCwgdGhpcy5tc2dUeXBlLCBnYW1lRGF0YS5yZWRfc3RhdHVzKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgaW1hZ2VJdGVtQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGxldCBpdGVtID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGxldCBnYW1lTGlzdEl0ZW0gPSBpdGVtLmdldENvbXBvbmVudChcIkZlZWRiYWNrTGVmdEl0ZW1cIilcclxuICAgICAgICBsZXQgZ2FtZURhdGEgPSBnYW1lTGlzdEl0ZW0uZW50aXR5RGF0YTtcclxuICAgICAgICB0aGlzLnNlbGVjdElkID0gZ2FtZURhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy5SZVNldFJpZ2h0UGFuZWwoKVxyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5Nc2dNb2RlbC5HZXRDb250ZW50QnlJRCh0aGlzLm1zZ1R5cGUsIHRoaXMuc2VsZWN0SWQpXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoSW5mb1BhbmVsKGRhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIHRydWUpXHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbC5SZWFkTXNnKGdhbWVEYXRhLmlkLCB0aGlzLm1zZ1R5cGUsIGdhbWVEYXRhLnJlZF9zdGF0dXMpXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoSW5mb1BhbmVsKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5SZVNldFJpZ2h0UGFuZWwoKVxyXG4gICAgICAgIHRoaXMuY29udGVudFR4dC5zdHJpbmcgPSBcIlxcclxcblwiICsgR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkoZGF0YS5jb250ZW50KSB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMudGltZVR4dC5zdHJpbmcgPSBkYXRhLnNlbmRfdGltZSB8fCBcIlwiXHJcbiAgICAgICAgdGhpcy5mcm9tVHh0LnN0cmluZyA9IGRhdGEuZnJvbSB8fCBcIlwiXHJcbiAgICAgICAgdGhpcy5TcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEFjdGl2aXR5Q29uc3RhbnRzLlNIT1dfQUNUX1dBSVRUSU5HLCBmYWxzZSlcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZiAoZGF0YS5iYWNrX3VybCAhPSBudWxsICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KGRhdGEuYmFja191cmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFR4dC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMudGltZVR4dC5zdHJpbmcgPSAgXCJcIlxyXG4gICAgICAgICAgICB0aGlzLmZyb21UeHQuc3RyaW5nID0gIFwiXCJcclxuICAgICAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEFjdGl2aXR5Q29uc3RhbnRzLlNIT1dfQUNUX1dBSVRUSU5HLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuTG9hZFBpY1RvTmF0aXZlKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGRhdGEuYmFja191cmwpLCBHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChkYXRhLmJhY2tfdXJsKSwgKHRleHR1cmU6Y2MuVGV4dHVyZTJEKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5zZWxlY3RJZCAhPSBkYXRhLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5ub2RlICYmIHNlbGYubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlNwcml0ZS5zaXplTW9kZSA9ICBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU3ByaXRlLm5vZGUud2lkdGggPSA3NTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5TcHJpdGUubm9kZS5oZWlnaHQgPSA0ODBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5TcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEFjdGl2aXR5Q29uc3RhbnRzLlNIT1dfQUNUX1dBSVRUSU5HLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUoZGF0YS5iYWNrX3VybCwgeyBleHQ6ICcucG5nJyB9LCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlOmNjLlRleHR1cmUyRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGYuc2VsZWN0SWQgIT0gZGF0YS5pZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLm5vZGUgJiYgc2VsZi5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU3ByaXRlLnNpemVNb2RlID0gIGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT01cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5TcHJpdGUubm9kZS53aWR0aCA9IDc1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlNwcml0ZS5ub2RlLmhlaWdodCA9IDQ4MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLlNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5TSE9XX0FDVF9XQUlUVElORywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SZWZyZXNoTGVmdEl0ZW0oZGF0YSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3SGlkZSgpIHtcclxuICAgICAgICB0aGlzLk1zZ01vZGVsLm9mZihNc2dFdmVudC5Ob3RpY2VMaXN0Q2FsbGJhY2ssIHRoaXMsIHRoaXMuUmVmcmVzaExlZnRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbC5vZmYoTXNnRXZlbnQuUmVhZE1zZ0NhbGxCYWNrLCB0aGlzLCB0aGlzLlJlZnJlc2hJbmZvUGFuZWwpO1xyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soUG9wV25kTmFtZS5Ob3RpY2UpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0SWQgPSAwO1xyXG4gICAgICAgIC8vIGxldCBNc2dGbGFnID0gdGhpcy5Nc2dNb2RlbC5DaGVja0lzQW55Tm90aWNlTm90UmVhZCgpXHJcbiAgICAgICAgLy8gaWYgKE1zZ0ZsYWcpIHtcclxuICAgICAgICAvLyAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5Hb25nZ2FvXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LCBIYWxsUmVkU3BvdFR5cGUuR29uZ2dhbyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuUmVTZXRSaWdodFBhbmVsKClcclxuICAgIH1cclxuXHJcbiAgICBSZWZyZXNoTGVmdEl0ZW0oZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKFN0cmluZyhkYXRhLmlkKSwgdGhpcy5jb250ZW50Tm9kZSlcclxuICAgICAgICBpZihub2RlICYmIG5vZGUuaXNWYWxpZCkgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpLlNldFVuUmVhZEFjdGl2ZVN0YXRlKGZhbHNlKVxyXG4gICAgICAgIH0gICAgICBcclxuICAgIH1cclxuXHJcbiAgICBSZVNldFJpZ2h0UGFuZWwoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50aW1lVHh0LnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLmZyb21UeHQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIC8vIHRoaXMuU3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtUG9vbClcclxuICAgICAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKVxyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjeWNsZSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBOb3RpY2VJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KG51bGwpXHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIHN1cGVyLnJlY3ljbGVBbGwoYXJyKVxyXG4gICAgICAgIGFyci5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRJdGVtKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59Il19