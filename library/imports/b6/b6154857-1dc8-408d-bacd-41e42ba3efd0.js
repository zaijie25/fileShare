"use strict";
cc._RF.push(module, 'b6154hXHchAjbrNQeQro+/Q', 'InteractHeadTipComp');
// hall/scripts/logic/core/component/InteractHeadTipComp.ts

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
var ViewBase_1 = require("../ui/ViewBase");
/**
 * 其他玩家信息tip界面 控制组件
 */
var InteractHeadTipComp = /** @class */ (function (_super) {
    __extends(InteractHeadTipComp, _super);
    function InteractHeadTipComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curSeat = -1;
        _this.time = 5;
        _this._needHeadTip = false;
        return _this;
    }
    InteractHeadTipComp.prototype.onLoad = function () {
        this.contentNode = cc.find("content", this.node);
        this.headtipNode = cc.find("content/headtip", this.node);
        this.coinLbl = cc.find("coinLbl", this.headtipNode).getComponent(cc.Label);
        this.nameLbl = cc.find("nameLbl", this.headtipNode).getComponent(cc.Label);
        this.idLbl = cc.find("idLbl", this.headtipNode).getComponent(cc.Label);
        this.headImgSp = cc.find("mask/sprite_head", this.headtipNode).getComponent(cc.Sprite);
        this.headBoxSp = cc.find("head_kuang", this.headtipNode).getComponent(cc.Sprite);
        var touchNode = cc.find("content/touchBg", this.node);
        touchNode.on(cc.Node.EventType.TOUCH_END, this.hideView, this);
        touchNode._touchListener.setSwallowTouches(false);
        this.interactChooseView = new InteractChooseView();
        this.interactChooseView.setNode(cc.find("content/actView", this.node));
        this.interactChooseView.active = true;
        this.interactChooseView.setFatherFuntion(this);
    };
    InteractHeadTipComp.prototype.hideView = function () {
        this.node.active = false;
    };
    InteractHeadTipComp.prototype.onDestroy = function () {
        this.node.stopAllActions();
        this.curSeat = -1;
    };
    Object.defineProperty(InteractHeadTipComp.prototype, "needHeadTip", {
        get: function () {
            return this._needHeadTip;
        },
        set: function (bool) {
            this._needHeadTip = bool;
        },
        enumerable: false,
        configurable: true
    });
    InteractHeadTipComp.prototype.showHeadView = function (isShow, localSeat, worldPos, data) {
        if (worldPos === void 0) { worldPos = cc.Vec3.ZERO; }
        if (isShow) {
            this.curSeat = localSeat;
            var pos = this.contentNode.parent.convertToNodeSpaceAR(worldPos);
            this.node.active = true;
            this.contentNode.position = pos;
            this.headtipNode.active = this.needHeadTip;
            if (this.needHeadTip) {
                this.updateContent(localSeat, data);
                this.interactChooseView.sChair = data._chair;
            }
            else {
                this.interactChooseView.sChair = data.chair;
            }
            this.closeTips(5);
            this.interactChooseView.setPlayerData(data);
        }
        else {
            if (this.curSeat == localSeat)
                this.hideView();
        }
    };
    InteractHeadTipComp.prototype.closeTips = function (num) {
        this.time = num;
    };
    InteractHeadTipComp.prototype.update = function (dt) {
        this.time -= dt;
        if (this.time <= 0) {
            this.node.stopAllActions();
            this.node.active = false;
        }
    };
    InteractHeadTipComp.prototype.updateContent = function (localSeat, userData) {
        if (!userData)
            return;
        var name = userData.nickname;
        var point = userData.point;
        var id = userData._uid;
        var head = userData.headimg;
        this.nameLbl.string = name;
        this.updatePoint(localSeat, point);
        var _a = [this.headImgSp.node.width, this.headImgSp.node.height], w = _a[0], h = _a[1];
        this.headImgSp.spriteFrame = Global.Toolkit.getLocalHeadSf(head);
        Global.Toolkit.loadLocalHeadFrameByGames(this.headBoxSp, userData.a_box);
        this.headImgSp.node.setContentSize(w, h);
        this.idLbl.string = "ID:" + id;
    };
    InteractHeadTipComp.prototype.updatePoint = function (localSeat, point) {
        if (this.node.active == true && this.curSeat == localSeat)
            this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    return InteractHeadTipComp;
}(cc.Component));
exports.default = InteractHeadTipComp;
var InteractCD = 2;
var InteractChooseView = /** @class */ (function (_super) {
    __extends(InteractChooseView, _super);
    function InteractChooseView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastSendTime = 0;
        _this.selfSrc = -1;
        _this.showvipList = [0, 0, 0, 0, 10, 11, 12, 13];
        return _this;
    }
    InteractChooseView.prototype.setPlayerData = function (data) {
        this.playerData = data;
    };
    InteractChooseView.prototype.setSelfSrc = function (num) {
        this.selfSrc = num;
    };
    InteractChooseView.prototype.setFatherFuntion = function (node) {
        this.headtipsView = node;
    };
    Object.defineProperty(InteractChooseView.prototype, "sChair", {
        get: function () {
            return this._chair;
        },
        set: function (chair) {
            this._chair = chair;
        },
        enumerable: false,
        configurable: true
    });
    InteractChooseView.prototype.initView = function () {
        for (var i = 0; i < 8; i++) {
            var node = cc.find('content/' + i, this.node);
            new InteractItem(node, i, this.onInteractClick, this);
            var tip = cc.find("tip", node);
            tip.active = false;
            if (Global.PlayerData.vip < this.showvipList[i]) {
                tip.active = true;
            }
        }
    };
    InteractChooseView.prototype.onInteractClick = function (index) {
        this.headtipsView.closeTips(0);
        if (Global.PlayerData.vip < this.showvipList[index]) {
            return Global.UI.fastTip('您的vip等级不足以使用该表情');
        }
        if (this.playerData._rchair && this.playerData._rchair === this.selfSrc) {
            return Global.UI.fastTip('不能给自己发送互动表情哦！');
        }
        var curTime = Date.now();
        if (curTime - this.lastSendTime <= InteractCD * 1000) {
            return Global.UI.fastTip('您太急啦～喝口茶稍等一下吧～');
        }
        if (this.sChair != null) {
            this.sendChatReq(index, this.sChair);
            // this.active = false;
            this.lastSendTime = curTime;
        }
    };
    InteractChooseView.prototype.sendChatReq = function (content, chair) {
        var from_chair = this.selfSrc;
        if (this.playerData && this.playerData._rchair === this.selfSrc) {
            from_chair = Number(this.playerData._chair);
        }
        var param = {
            emoji: content,
            ctype: 1,
            to_chair: chair,
            from_chair: from_chair
        };
        Game.Server.send(InteractChooseView.CmdChat, param);
    };
    InteractChooseView.prototype.onClose = function () {
        this.sChair = null;
    };
    InteractChooseView.prototype.reset = function () {
        this.lastSendTime = 0;
    };
    InteractChooseView.CmdChat = "chat"; // 聊天 表情和文字
    return InteractChooseView;
}(ViewBase_1.default));
var InteractItem = /** @class */ (function (_super) {
    __extends(InteractItem, _super);
    function InteractItem(node, index, callback, target) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.callback = callback;
        _this.target = target;
        _this.setNode(node);
        return _this;
    }
    InteractItem.prototype.initView = function () {
        this.getChild('').on('click', this.onItemClick, this);
    };
    InteractItem.prototype.onItemClick = function () {
        if (this.callback && this.target) {
            this.callback.call(this.target, this.index);
        }
    };
    return InteractItem;
}(ViewBase_1.default));

cc._RF.pop();