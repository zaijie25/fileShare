
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/InteractHeadTipComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcSW50ZXJhY3RIZWFkVGlwQ29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQTRHQztRQW5HVyxhQUFPLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFJckIsVUFBSSxHQUFHLENBQUMsQ0FBQztRQUVULGtCQUFZLEdBQVksS0FBSyxDQUFDOztJQTZGMUMsQ0FBQztJQTNGRyxvQ0FBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0RSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFD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SUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQS9FZSwwQkFBTyxHQUFHLE1BQU0sQ0FBQyxDQUFRLFdBQVc7SUFnRnhELHlCQUFDO0NBbkZELEFBbUZDLENBbkZnQyxrQkFBUSxHQW1GeEM7QUFFRDtJQUEyQixnQ0FBUTtJQUMvQixzQkFBWSxJQUFhLEVBQVUsS0FBYSxFQUFVLFFBQWtCLEVBQVUsTUFBVztRQUFqRyxZQUNJLGlCQUFPLFNBRVY7UUFIa0MsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQUFVLGNBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxZQUFNLEdBQU4sTUFBTSxDQUFLO1FBRTdGLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUywrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTyxrQ0FBVyxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FmQSxBQWVDLENBZjBCLGtCQUFRLEdBZWxDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi91aS9WaWV3QmFzZVwiO1xyXG5cclxuLyoqXHJcbiAqIOWFtuS7lueOqeWutuS/oeaBr3RpcOeVjOmdoiDmjqfliLbnu4Tku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEludGVyYWN0SGVhZFRpcENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBjb250ZW50Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgaGVhZHRpcE5vZGU6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgY29pbkxibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIG5hbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBpZExibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGhlYWRJbWdTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBoZWFkQm94U3A6IGNjLlNwcml0ZTtcclxuXHJcbiAgICBwcml2YXRlIGN1clNlYXQ6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIHB1YmxpYyBpbnRlcmFjdENob29zZVZpZXc6IEludGVyYWN0Q2hvb3NlVmlldztcclxuXHJcbiAgICBwcml2YXRlIHRpbWUgPSA1O1xyXG5cclxuICAgIHByaXZhdGUgX25lZWRIZWFkVGlwOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSBjYy5maW5kKFwiY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuaGVhZHRpcE5vZGUgPSBjYy5maW5kKFwiY29udGVudC9oZWFkdGlwXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5jb2luTGJsID0gY2MuZmluZChcImNvaW5MYmxcIiwgdGhpcy5oZWFkdGlwTm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMubmFtZUxibCA9IGNjLmZpbmQoXCJuYW1lTGJsXCIsIHRoaXMuaGVhZHRpcE5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmlkTGJsID0gY2MuZmluZChcImlkTGJsXCIsIHRoaXMuaGVhZHRpcE5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmhlYWRJbWdTcCA9IGNjLmZpbmQoXCJtYXNrL3Nwcml0ZV9oZWFkXCIsIHRoaXMuaGVhZHRpcE5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgdGhpcy5oZWFkQm94U3AgPSBjYy5maW5kKFwiaGVhZF9rdWFuZ1wiLCB0aGlzLmhlYWR0aXBOb2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIGxldCB0b3VjaE5vZGUgPSBjYy5maW5kKFwiY29udGVudC90b3VjaEJnXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdG91Y2hOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5oaWRlVmlldywgdGhpcyk7XHJcbiAgICAgICAgdG91Y2hOb2RlLl90b3VjaExpc3RlbmVyLnNldFN3YWxsb3dUb3VjaGVzKGZhbHNlKVxyXG5cclxuICAgICAgICB0aGlzLmludGVyYWN0Q2hvb3NlVmlldyA9IG5ldyBJbnRlcmFjdENob29zZVZpZXcoKTtcclxuICAgICAgICB0aGlzLmludGVyYWN0Q2hvb3NlVmlldy5zZXROb2RlKGNjLmZpbmQoXCJjb250ZW50L2FjdFZpZXdcIiwgdGhpcy5ub2RlKSk7XHJcbiAgICAgICAgdGhpcy5pbnRlcmFjdENob29zZVZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmludGVyYWN0Q2hvb3NlVmlldy5zZXRGYXRoZXJGdW50aW9uKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoaWRlVmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmN1clNlYXQgPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IG5lZWRIZWFkVGlwKGJvb2w6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9uZWVkSGVhZFRpcCA9IGJvb2w7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBuZWVkSGVhZFRpcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmVlZEhlYWRUaXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dIZWFkVmlldyhpc1Nob3c6IGJvb2xlYW4sIGxvY2FsU2VhdDogbnVtYmVyLCB3b3JsZFBvczogY2MuVmVjMyA9IGNjLlZlYzMuWkVSTywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKGlzU2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLmN1clNlYXQgPSBsb2NhbFNlYXQ7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLmNvbnRlbnROb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgICAgICB0aGlzLmhlYWR0aXBOb2RlLmFjdGl2ZSA9IHRoaXMubmVlZEhlYWRUaXA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5lZWRIZWFkVGlwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRlbnQobG9jYWxTZWF0LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RDaG9vc2VWaWV3LnNDaGFpciA9IGRhdGEuX2NoYWlyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdENob29zZVZpZXcuc0NoYWlyID0gZGF0YS5jaGFpcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlVGlwcyg1KTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcmFjdENob29zZVZpZXcuc2V0UGxheWVyRGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clNlYXQgPT0gbG9jYWxTZWF0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VUaXBzKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50aW1lID0gbnVtXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy50aW1lIC09IGR0O1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNvbnRlbnQobG9jYWxTZWF0OiBudW1iZXIsIHVzZXJEYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoIXVzZXJEYXRhKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IG5hbWUgPSB1c2VyRGF0YS5uaWNrbmFtZVxyXG4gICAgICAgIGxldCBwb2ludCA9IHVzZXJEYXRhLnBvaW50O1xyXG4gICAgICAgIGxldCBpZCA9IHVzZXJEYXRhLl91aWQ7XHJcbiAgICAgICAgbGV0IGhlYWQgPSB1c2VyRGF0YS5oZWFkaW1nO1xyXG5cclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gbmFtZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBvaW50KGxvY2FsU2VhdCwgcG9pbnQpO1xyXG4gICAgICAgIGxldCBbdywgaF0gPSBbdGhpcy5oZWFkSW1nU3Aubm9kZS53aWR0aCwgdGhpcy5oZWFkSW1nU3Aubm9kZS5oZWlnaHRdO1xyXG4gICAgICAgIHRoaXMuaGVhZEltZ1NwLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoaGVhZCk7XHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lQnlHYW1lcyh0aGlzLmhlYWRCb3hTcCwgdXNlckRhdGEuYV9ib3gpO1xyXG4gICAgICAgIHRoaXMuaGVhZEltZ1NwLm5vZGUuc2V0Q29udGVudFNpemUodywgaCk7XHJcbiAgICAgICAgdGhpcy5pZExibC5zdHJpbmcgPSBcIklEOlwiICsgaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVBvaW50KGxvY2FsU2VhdDogbnVtYmVyLCBwb2ludDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUgPT0gdHJ1ZSAmJiB0aGlzLmN1clNlYXQgPT0gbG9jYWxTZWF0KVxyXG4gICAgICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocG9pbnQsIHRydWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBJbnRlcmFjdENEID0gMjtcclxuY2xhc3MgSW50ZXJhY3RDaG9vc2VWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBfY2hhaXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbGFzdFNlbmRUaW1lID0gMDtcclxuICAgIHN0YXRpYyByZWFkb25seSBDbWRDaGF0ID0gXCJjaGF0XCI7ICAgICAgICAvLyDogYrlpKkg6KGo5oOF5ZKM5paH5a2XXHJcbiAgICBwdWJsaWMgc2VsZlNyYyA9IC0xO1xyXG4gICAgcHJpdmF0ZSBoZWFkdGlwc1ZpZXc6IEludGVyYWN0SGVhZFRpcENvbXA7XHJcbiAgICBzaG93dmlwTGlzdCA9IFswLCAwLCAwLCAwLCAxMCwgMTEsIDEyLCAxM11cclxuICAgIC8qKiDnjqnlrrbmlbDmja7pm4blkIggKi9cclxuICAgIHByaXZhdGUgcGxheWVyRGF0YTogYW55O1xyXG5cclxuICAgIHB1YmxpYyBzZXRQbGF5ZXJEYXRhKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMucGxheWVyRGF0YSA9IGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U2VsZlNyYyhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2VsZlNyYyA9IG51bVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRGYXRoZXJGdW50aW9uKG5vZGU6IEludGVyYWN0SGVhZFRpcENvbXApIHtcclxuICAgICAgICB0aGlzLmhlYWR0aXBzVmlldyA9IG5vZGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNDaGFpcihjaGFpcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhaXIgPSBjaGFpcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNDaGFpcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2hhaXI7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKCdjb250ZW50LycgKyBpLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICBuZXcgSW50ZXJhY3RJdGVtKG5vZGUsIGksIHRoaXMub25JbnRlcmFjdENsaWNrLCB0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHRpcCA9IGNjLmZpbmQoXCJ0aXBcIiwgbm9kZSlcclxuICAgICAgICAgICAgdGlwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEudmlwIDwgdGhpcy5zaG93dmlwTGlzdFtpXSkge1xyXG4gICAgICAgICAgICAgICAgdGlwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkludGVyYWN0Q2xpY2soaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaGVhZHRpcHNWaWV3LmNsb3NlVGlwcygwKTtcclxuICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEudmlwIDwgdGhpcy5zaG93dmlwTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoJ+aCqOeahHZpcOetiee6p+S4jei2s+S7peS9v+eUqOivpeihqOaDhScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wbGF5ZXJEYXRhLl9yY2hhaXIgJiYgdGhpcy5wbGF5ZXJEYXRhLl9yY2hhaXIgPT09IHRoaXMuc2VsZlNyYykge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoJ+S4jeiDvee7meiHquW3seWPkemAgeS6kuWKqOihqOaDheWTpu+8gScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1clRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIGlmIChjdXJUaW1lIC0gdGhpcy5sYXN0U2VuZFRpbWUgPD0gSW50ZXJhY3RDRCAqIDEwMDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5VSS5mYXN0VGlwKCfmgqjlpKrmgKXllabvvZ7llp3lj6PojLbnqI3nrYnkuIDkuIvlkKfvvZ4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc0NoYWlyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kQ2hhdFJlcShpbmRleCwgdGhpcy5zQ2hhaXIpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RTZW5kVGltZSA9IGN1clRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VuZENoYXRSZXEoY29udGVudDogbnVtYmVyLCBjaGFpcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGZyb21fY2hhaXIgPSB0aGlzLnNlbGZTcmM7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheWVyRGF0YSAmJiB0aGlzLnBsYXllckRhdGEuX3JjaGFpciA9PT0gdGhpcy5zZWxmU3JjKSB7XHJcbiAgICAgICAgICAgIGZyb21fY2hhaXIgPSBOdW1iZXIodGhpcy5wbGF5ZXJEYXRhLl9jaGFpcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgZW1vamk6IGNvbnRlbnQsXHJcbiAgICAgICAgICAgIGN0eXBlOiAxLFxyXG4gICAgICAgICAgICB0b19jaGFpcjogY2hhaXIsXHJcbiAgICAgICAgICAgIGZyb21fY2hhaXI6IGZyb21fY2hhaXJcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZChJbnRlcmFjdENob29zZVZpZXcuQ21kQ2hhdCwgcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zQ2hhaXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmxhc3RTZW5kVGltZSA9IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEludGVyYWN0SXRlbSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgaW5kZXg6IG51bWJlciwgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24sIHByaXZhdGUgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRDaGlsZCgnJykub24oJ2NsaWNrJywgdGhpcy5vbkl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1DbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiB0aGlzLnRhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy50YXJnZXQsIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==