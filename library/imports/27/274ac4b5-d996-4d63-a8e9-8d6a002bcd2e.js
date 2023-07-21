"use strict";
cc._RF.push(module, '274acS12ZZNY6jpjWoAK80u', 'DdzSettleView');
// ddz/ddz/scripts/subView/DdzSettleView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
/**
 * 左侧方设置，规则，退出等功能按钮
 */
var DdzSettleView = /** @class */ (function (_super) {
    __extends(DdzSettleView, _super);
    function DdzSettleView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.setNode(node);
        return _this;
    }
    DdzSettleView.prototype.initView = function () {
        this.winView = new DdzSettleContent(this.getChild('contentNode/winNode'));
        this.winView.active = false;
        this.loseView = new DdzSettleContent(this.getChild('contentNode/loseNode'));
        this.loseView.active = false;
        this.closeBtn = this.getChild('contentNode/closeBtn');
        this.closeBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.closeBtn, "", this.closeView, this);
        this.exitBtn = this.getChild('contentNode/exitBtn');
        this.exitBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.exitBtn, "", this.onExitClick, this);
        this.gameBtn = this.getChild('contentNode/gameBtn');
        this.gameBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.gameBtn, "", this.onGameClick, this);
    };
    DdzSettleView.prototype.onOpen = function () {
        this.delayShowActionBtn(5000); // 以防没收到服务器协议情况
    };
    DdzSettleView.prototype.delayShowActionBtn = function (delay) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.showActionBtn(true);
        }, delay);
    };
    DdzSettleView.prototype.playSettleAnim = function (isWin, detail) {
        if (detail === void 0) { detail = {}; }
        var arr = detail.user_calcs || [];
        if (isWin) {
            this.winView.active = true;
            this.winView.showData(arr, isWin, detail.land_chair);
        }
        else {
            this.loseView.active = true;
            this.loseView.showData(arr, isWin, detail.land_chair);
        }
    };
    DdzSettleView.prototype.showActionBtn = function (flag) {
        this.closeBtn.active = flag;
        this.exitBtn.active = flag;
        this.gameBtn.active = flag;
        if (flag)
            clearTimeout(this.timer);
    };
    // public showSettleAction(timeout: number = 2) {
    //     Game.Component.scheduleOnce(() => {
    //         this.closeBtn.active = true;
    //         this.exitBtn.active = true;
    //         this.gameBtn.active = true;
    //     }, timeout);
    // }
    DdzSettleView.prototype.onClose = function () {
        this.winView.active = false;
        this.loseView.active = false;
        this.closeBtn.active = false;
        this.exitBtn.active = false;
        this.gameBtn.active = false;
        this.clickLimit = false;
        clearTimeout(this.timer);
    };
    DdzSettleView.prototype.closeView = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
    };
    DdzSettleView.prototype.onExitClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        DdzDriver_1.default.instance.leaveGame();
    };
    DdzSettleView.prototype.onGameClick = function () {
        var _this = this;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        if (this.clickLimit)
            return;
        DdzDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    DdzSettleView.prototype.clearByRound = function () {
        this.active = false;
    };
    return DdzSettleView;
}(DdzBaseView_1.default));
exports.default = DdzSettleView;
var DdzSettleContent = /** @class */ (function (_super) {
    __extends(DdzSettleContent, _super);
    function DdzSettleContent(node) {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        _this.setNode(node);
        return _this;
    }
    DdzSettleContent.prototype.initView = function () {
        this.effect = this.getComponent('effect', sp.Skeleton);
        this.contentNode = this.getChild('content');
        for (var i = 1; i <= 3; i++) {
            var node = this.getChild('content/item' + i);
            var item = new DdzSettleItem(node);
            this.itemList.push(item);
        }
    };
    DdzSettleContent.prototype.onOpen = function () {
        var _this = this;
        this.effect.setAnimation(0, 'idle', false);
        this.effect.addAnimation(0, 'idle1', true, this.Define.PlaySettleEffectTime);
        this.contentNode.opacity = 1;
        Game.Component.scheduleOnce(function () {
            var action = cc.fadeTo(0.5, 255);
            _this.contentNode.runAction(action);
        }, this.Define.PlaySettleEffectTime);
    };
    DdzSettleContent.prototype.showData = function (arr, isSelfWin, landChair) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        var dzLocalSeat = this.Context.get(this.Define.FieldDzLocSeat);
        if (isSelfWin && dzLocalSeat == 0) {
            arr.sort(function (user) {
                var flag = (user.chair - landChair) == 0 ? -1 : 1;
                return flag;
            });
        }
        arr.forEach(function (user, index) {
            if (_this.itemList[index]) {
                _this.itemList[index].setStyle(dzLocalSeat, isSelfWin, user);
            }
        });
    };
    DdzSettleContent.prototype.onClose = function () {
        this.contentNode.stopAllActions();
    };
    return DdzSettleContent;
}(DdzBaseView_1.default));
var DdzSettleItem = /** @class */ (function (_super) {
    __extends(DdzSettleItem, _super);
    function DdzSettleItem(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzSettleItem.prototype.initView = function () {
        this.checkBg = this.getChild('checkBg');
        this.dzIcon = this.getChild('dzIcon');
        this.nameLbl = this.getComponent('nameLbl', cc.Label);
        this.multLbl = this.getComponent('multLbl', cc.Label);
        this.pointLbl = this.getComponent('pointLbl', cc.Label);
    };
    DdzSettleItem.prototype.setStyle = function (dzSeat, isSelfWin, data) {
        var localSeat = DdzDriver_1.default.instance.SitHelper.serverSToLocalN(data.chair);
        this.dzIcon.active = dzSeat == localSeat;
        this.checkBg.active = localSeat == 0;
        this.multLbl.string = '' + data.total_mult;
        this.pointLbl.string = '' + Global.Toolkit.formatPointStr(data.total_points, false, false);
        var info = this.Context.playerList[localSeat];
        this.nameLbl.string = Global.Toolkit.substrEndWithElli(info.nickname, 10, false);
        var color = new cc.Color(255, 255, 255);
        if (isSelfWin) {
            if (localSeat == 0) {
                color = new cc.Color(255, 197, 148);
            }
            else {
                color = new cc.Color(251, 250, 241);
            }
        }
        else {
            if (localSeat == 0) {
                color = new cc.Color(151, 181, 252);
            }
            else {
                color = new cc.Color(203, 227, 255);
            }
        }
        this.multLbl.node.color = color;
        this.nameLbl.node.color = color;
        this.pointLbl.node.color = color;
    };
    return DdzSettleItem;
}(DdzBaseView_1.default));

cc._RF.pop();