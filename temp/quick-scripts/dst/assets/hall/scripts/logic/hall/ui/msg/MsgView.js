
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/msg/MsgView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtc2dcXE1zZ1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQStDO0FBQy9DLHdEQUFtRDtBQUNuRCxzREFBaUQ7QUFFakQsc0RBQWlEO0FBRWpEO0lBQXFDLDJCQUFRO0lBQTdDO1FBQUEscUVBK05DO1FBOU1HLGdCQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLGNBQVEsR0FBVSxFQUFFLENBQUM7O0lBNk16QixDQUFDO0lBM01hLCtCQUFhLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLG1CQUFRLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxtQkFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBR0QsMEJBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFHLElBQUksRUFDUDtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUM5QjthQUVEO1lBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FB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LENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsZ0NBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDTSxpQ0FBVSxHQUFqQixVQUFrQixHQUFlO1FBQWpDLGlCQU9DO1FBTEcsaUJBQU0sVUFBVSxZQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFDTCxtQkFBQztBQUFELENBcEJBLEFBb0JDLENBcEIwQixrQkFBUSxHQW9CbEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNc2dFdmVudCwgTXNnVHlwZSB9IGZyb20gXCIuL01zZ0V2ZW50XCI7XHJcbmltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgTXNnTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvTXNnTW9kZWxcIjtcclxuaW1wb3J0IFdhaXRpbmdWaWV3IGZyb20gXCIuLi93YWl0aW5nL1dhaXRpbmdWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNc2dWaWV3IGV4dGVuZHMgVmlld0Jhc2V7XHJcbiAgICBNc2dNb2RlbDogTXNnTW9kZWw7XHJcbiAgICBjb250ZW50Tm9kZTogYW55O1xyXG4gICAgY29weUl0ZW06IGFueTtcclxuICAgIGNvbnRlbnRUeHQ6Y2MuTGFiZWw7XHJcbiAgICBmcm9tVHh0OmNjLkxhYmVsO1xyXG4gICAgdGltZVR4dDpjYy5MYWJlbDtcclxuICAgIHNlbGVjdElkOm51bWJlcjtcclxuICAgIGRlbGV0ZUJ0bjogY2MuTm9kZTtcclxuICAgIGxlZnRQYW5lbDogY2MuTm9kZTtcclxuICAgIHJpZ2h0UGFuZWw6IGNjLk5vZGU7XHJcbiAgICB0aW1lcklEOiBhbnk7XHJcbiAgICBmbGFnOmJvb2xlYW5cclxuICAgIE5vRW1haWw6Y2MuTm9kZVxyXG4gICAgbXNnVHlwZSA6bnVtYmVyXHJcbiAgICBpdGVtUG9vbDogTWFpbEl0ZW1Qb29sO1xyXG4gICAgZGVsZXRlVGltZXI6YW55O1xyXG4gICAgZGVsZXRlRmxhZyA9IHRydWVcclxuICAgIG5vZGVMaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB3YWl0aW5nTm9kZSA6Y2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KCl7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwub24oTXNnRXZlbnQuTXNnTGlzdENhbGxiYWNrLCB0aGlzLCB0aGlzLlJlZnJlc2hMZWZ0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwub24oTXNnRXZlbnQuUmVhZE1zZ0NhbGxCYWNrLCB0aGlzLCB0aGlzLlJlZnJlc2hJbmZvUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwub24oTXNnRXZlbnQuRGVsZXRlTXNnQ2FsbGJhY2ssIHRoaXMsIHRoaXMuT25EZWxldGVNYWlsKTtcclxuICAgICAgICB0aGlzLmZsYWcgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5Jbml0RGF0YSgpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIEluaXREYXRhKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5Nc2dNb2RlbC5HZXREYXRhQnlUeXBlKHRoaXMubXNnVHlwZSk7XHJcbiAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaExlZnRQYW5lbChkYXRhKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1zZ01vZGVsLkdldE1zZ0xpc3QodGhpcy5tc2dUeXBlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPbkRlbGV0ZU1haWwoZGF0YTogYW55KSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLliKDpmaTmiJDlip9cIik7XHJcbiAgICAgICAgdGhpcy5SZVNldFJpZ2h0UGFuZWwoKVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaExlZnRQYW5lbCh0aGlzLk1zZ01vZGVsLkdldERhdGFCeVR5cGUodGhpcy5tc2dUeXBlKSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0SXRlbVBvb2woKXtcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wgPSBuZXcgTWFpbEl0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuY29weUl0ZW0gPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsL01zZ0l0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5sZWZ0UGFuZWwgPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMucmlnaHRQYW5lbCA9IHRoaXMuZ2V0Q2hpbGQoXCJSaWdodFBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsL3Njcm9sbHZpZXcvdmlldy9jb250ZW50XCIpO1xyXG5cclxuICAgICAgICBsZXQgdG1wQ29udGVudFR4dCA9IHRoaXMuZ2V0Q2hpbGQoXCJSaWdodFBhbmVsL3Njcm9sbHZpZXcvdmlldy9jb250ZW50L0NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0ID0gdG1wQ29udGVudFR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFR4dC5zdHJpbmcgPSBcIlwiXHJcblxyXG4gICAgICAgIGxldCB0bXBGcm9tVHh0ID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWwvZnJvbVwiKTtcclxuICAgICAgICB0aGlzLmZyb21UeHQgPSB0bXBGcm9tVHh0LmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5mcm9tVHh0LnN0cmluZyA9IFwiXCJcclxuICAgICAgICBsZXQgdG1wVGltZVR4dCA9IHRoaXMuZ2V0Q2hpbGQoXCJSaWdodFBhbmVsL3RpbWVcIik7XHJcbiAgICAgICAgdGhpcy50aW1lVHh0ID0gdG1wVGltZVR4dC5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudGltZVR4dC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdGhpcy5kZWxldGVCdG4gPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9EZWxldGVCdXR0b25cIik7XHJcbiAgICAgICAgdGhpcy5kZWxldGVCdG4uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiUmlnaHRQYW5lbC9EZWxldGVCdXR0b25cIiwgdGhpcy5EZWxldGVNYWlsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLk5vRW1haWwgPSB0aGlzLmdldENoaWxkKFwiTm9NYWlsXCIpXHJcbiAgICAgICAgdGhpcy5Ob0VtYWlsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbCA9IDxNc2dNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTXNnTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5tc2dUeXBlID0gTXNnVHlwZS5NYWlsXHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKTtcclxuICAgICAgICB0aGlzLndhaXRpbmdOb2RlID0gV2FpdGluZ1ZpZXcuaW5pdFdhaXRpbmdWaWV3KHRoaXMubm9kZSxjYy52MigxMjAsMCkpO1xyXG5cclxuICAgIH1cclxuICAgIERlbGV0ZU1haWwoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuZGVsZXRlRmxhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5oKo55qE5pON5L2c5aSq6aKR57mB77yM6K+356iN5ZCO6YeN6K+VXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlbGV0ZUZsYWcgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwuRGVsTWFpbCh0aGlzLnNlbGVjdElkKTtcclxuICAgICAgICB0aGlzLmRlbGV0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRmxhZyA9IHRydWVcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5SZVNldFJpZ2h0UGFuZWwoKVxyXG4gICAgICAgIHRoaXMuTXNnTW9kZWwub2ZmKE1zZ0V2ZW50Lk1zZ0xpc3RDYWxsYmFjaywgdGhpcywgdGhpcy5SZWZyZXNoTGVmdFBhbmVsKTtcclxuICAgICAgICB0aGlzLk1zZ01vZGVsLm9mZihNc2dFdmVudC5SZWFkTXNnQ2FsbEJhY2ssIHRoaXMsIHRoaXMuUmVmcmVzaEluZm9QYW5lbCk7XHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbC5vZmYoTXNnRXZlbnQuRGVsZXRlTXNnQ2FsbGJhY2ssIHRoaXMsIHRoaXMuT25EZWxldGVNYWlsKTtcclxuICAgICAgICB0aGlzLnNlbGVjdElkID0gMDtcclxuXHJcbiAgICAgICAgLy8gbGV0IE1zZ0ZsYWcgPSB0aGlzLk1zZ01vZGVsLkNoZWNrSXNBbnlNYWlsTm90UmVhZCgpXHJcbiAgICAgICAgLy8gaWYgKE1zZ0ZsYWcpIHtcclxuICAgICAgICAvLyAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5NYWlsXSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2Uge1xyXG4gICAgICAgIC8vICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VSZWRTcG90LCBIYWxsUmVkU3BvdFR5cGUuTWFpbCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIFJlZnJlc2hMZWZ0UGFuZWwobXNnOmFueSlcclxuICAgIHtcclxuICAgICAgICBpZihtc2cgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTm9FbWFpbC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMubGVmdFBhbmVsLmFjdGl2ZSA9ZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5yaWdodFBhbmVsLmFjdGl2ZSA9ZmFsc2VcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpXHJcbiAgICAgICAgaWYoIG1zZy5tYWlsLmxlbmd0aD09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLk5vRW1haWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmxlZnRQYW5lbC5hY3RpdmUgPWZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRQYW5lbC5hY3RpdmUgPWZhbHNlXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8YW55PiA9IG1zZy5tYWlsIHx8IFtdO1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPWFyci5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMubGVmdFBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yaWdodFBhbmVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5Ob0VtYWlsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5kZWxldGVCdG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgaW1hZ2VJdGVtID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKClcclxuICAgICAgICAgICAgaW1hZ2VJdGVtLm5hbWUgPSBTdHJpbmcoYXJyW2pdLmlkKTtcclxuICAgICAgICAgICAgaW1hZ2VJdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2goaW1hZ2VJdGVtKTtcclxuICAgICAgICAgICAgaWYgKGogPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGltYWdlSXRlbS5nZXRDb21wb25lbnQoXCJNc2dJdGVtXCIpLlNldFRvZ2dsZUNoZWNrZWQodHJ1ZSlcclxuICAgICAgICAgICAgICAgIGltYWdlSXRlbS5nZXRDb21wb25lbnQoXCJNc2dJdGVtXCIpLm5vZGUubmFtZSA9IFN0cmluZyhhcnJbal0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJZCA9IGFycltqXS5pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGltYWdlSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpbWFnZUl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmltYWdlSXRlbUNsaWNrLCB0aGlzKVxyXG4gICAgICAgICAgICBpbWFnZUl0ZW0uZ2V0Q29tcG9uZW50KFwiTXNnSXRlbVwiKS5vbkluaXQoYXJyW2pdKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgZ2FtZURhdGEgPSBhcnJbMF1cclxuICAgICAgICBpZihnYW1lRGF0YSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLk1zZ01vZGVsLlJlYWRNc2coZ2FtZURhdGEuaWQsdGhpcy5tc2dUeXBlLGdhbWVEYXRhLnJlZF9zdGF0dXMsKVxyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBpbWFnZUl0ZW1DbGljayhldmVudCkge1xyXG4gICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgbGV0IGdhbWVMaXN0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFwiTXNnSXRlbVwiKVxyXG4gICAgICAgIGxldCBnYW1lRGF0YSA9IGdhbWVMaXN0SXRlbS5nZXRHYW1lRGF0YSgpXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJZCA9IGdhbWVEYXRhLmlkO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5Nc2dNb2RlbC5HZXRDb250ZW50QnlJRCh0aGlzLm1zZ1R5cGUsdGhpcy5zZWxlY3RJZClcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZWZyZXNoSW5mb1BhbmVsKGRhdGEpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk1zZ01vZGVsLlJlYWRNc2coZ2FtZURhdGEuaWQsdGhpcy5tc2dUeXBlLGdhbWVEYXRhLnJlZF9zdGF0dXMsKVxyXG4gICAgfVxyXG4gICAgUmVmcmVzaEluZm9QYW5lbChkYXRhOmFueSl7XHJcbiAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnRUeHQuc3RyaW5nID0gXCJcXHJcXG5cIisgR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkoZGF0YS5jb250ZW50KSAgfHwgXCJcIjtcclxuICAgICAgICB0aGlzLnRpbWVUeHQuc3RyaW5nID0gZGF0YS5zZW5kX3RpbWUgfHwgXCJcIlxyXG4gICAgICAgIHRoaXMuZnJvbVR4dC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaShkYXRhLmZyb20sMTYpIHx8IFwiXCIvL2RhdGEuZnJvbSB8fCBcIlwiXHJcbiAgICAgICAgdGhpcy5SZWZyZXNoTGVmdEl0ZW0oZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJlZnJlc2hMZWZ0SXRlbShkYXRhOmFueSlcclxuICAgIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoU3RyaW5nKGRhdGEuaWQpLHRoaXMuY29udGVudE5vZGUpXHJcbiAgICAgICAgaWYobm9kZSAmJiBub2RlLmlzVmFsaWQpICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiTXNnSXRlbVwiKS5TZXRVblJlYWRBY3RpdmVTdGF0ZShmYWxzZSlcclxuICAgICAgICB9ICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJlU2V0UmlnaHRQYW5lbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50VHh0LnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50aW1lVHh0LnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLmZyb21UeHQuc3RyaW5nID1cIlwiXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbVBvb2wpXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5kZWxldGVUaW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRlbGV0ZVRpbWVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHJlY3ljbGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1Qb29sKVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5cclxuY2xhc3MgTWFpbEl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2V7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcHlOb2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKXtcclxuICAgICAgICByZXR1cm4gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SXRlbShub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KG51bGwpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjeWNsZUFsbChhcnI6IEFycmF5PGFueT4pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIucmVjeWNsZUFsbChhcnIpXHJcbiAgICAgICAgYXJyLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEl0ZW0oZWxlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn0iXX0=