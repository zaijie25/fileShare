"use strict";
cc._RF.push(module, '6ee30NDYW5EGKrwG9+ehP55', 'ErmjAskActionView');
// ermj/Ermj/scripts/subView/ErmjAskActionView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMahjongHandView_1 = require("./mahjong/ErmjMahjongHandView");
var ErmjGameEvent_1 = require("../data/ErmjGameEvent");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjAskActionView = /** @class */ (function (_super) {
    __extends(ErmjAskActionView, _super);
    function ErmjAskActionView(node) {
        var _this = _super.call(this) || this;
        _this.actData = {};
        _this.tingData = {};
        _this.operSelectItemList = [];
        _this.setNode(node);
        return _this;
    }
    ErmjAskActionView.prototype.initView = function () {
        this.btnLayoutNode = this.getChild("btnLayout");
        this.passBtn = this.getChild("btnLayout/btn_pass");
        ErmjGameConst_1.default.addCommonClick(this.passBtn, "", this.onPassClick, this);
        this.tingBtn = this.getChild("btnLayout/btn_ting");
        ErmjGameConst_1.default.addCommonClick(this.tingBtn, "", this.onTingClick, this);
        this.pongBtn = this.getChild("btnLayout/btn_pong");
        ErmjGameConst_1.default.addCommonClick(this.pongBtn, "", this.onPongClick, this);
        this.kongBtn = this.getChild("btnLayout/btn_kong");
        ErmjGameConst_1.default.addCommonClick(this.kongBtn, "", this.onKongClick, this);
        this.chowBtn = this.getChild("btnLayout/btn_chow");
        ErmjGameConst_1.default.addCommonClick(this.chowBtn, "", this.onChowClick, this);
        this.winBtn = this.getChild("btnLayout/btn_win");
        ErmjGameConst_1.default.addCommonClick(this.winBtn, "", this.onWinClick, this);
        this.tingCancelBtn = this.getChild("tingCancelBtn");
        ErmjGameConst_1.default.addCommonClick(this.tingCancelBtn, "", this.onTingCancel, this);
        this.tingCancelBtn.active = false;
        this.operViewNode = this.getChild("operSelectView");
        this.operViewNode.active = false;
        this.operViewBgNode = this.getChild("operSelectView/bgNode");
        this.operViewContentLayout = this.getComponent("operSelectView/content", cc.Layout);
        this.copyNode = this.getChild("operSelectView/content/operItem");
        this.copyNode.active = false;
    };
    /**
     * 根据json显示操作按钮列表
     * @param cfg 显示啥json里传啥字段, 不传即全部不显示
     * @param cfg_json 传{isPass: 1, isPong: 1, isWin: 1, isKong: 0, isChow: 1} 显示啥就传字段:true(1), 不显示的false(0)或者直接不传
     */
    ErmjAskActionView.prototype.showBtnByConfig = function (cfg, actData) {
        if (cfg === void 0) { cfg = {}; }
        if (actData === void 0) { actData = {}; }
        if (!cfg)
            return;
        this.actData = actData;
        this.btnLayoutNode.active = true;
        this.tingCancelBtn.active = false;
        var isPong = cfg.isPong, isKong = cfg.isKong, isChow = cfg.isChow, isWin = cfg.isWin;
        this.pongBtn.active = !!isPong;
        this.kongBtn.active = !!isKong;
        this.chowBtn.active = !!isChow;
        this.winBtn.active = !!isWin;
        this.passBtn.active = true; // 都有过的选项
    };
    /** 是否显示听按钮 协议独立出来了 */
    ErmjAskActionView.prototype.showTingBtn = function (isTing, tingData) {
        if (tingData === void 0) { tingData = {}; }
        this.tingData = tingData;
        this.tingBtn.active = isTing;
        this.btnLayoutNode.active = true;
        this.tingCancelBtn.active = false;
        this.passBtn.active = true; // 都有过的选项
    };
    /**是否挂机 */
    ErmjAskActionView.prototype.isAuto = function () {
        if (this.Context.isCmdAuto) {
            Game.Server.send(this.Define.CmdAuto, { auto_play: 0 });
        }
    };
    ErmjAskActionView.prototype.onPassClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdPass, {});
        this.active = false;
    };
    ErmjAskActionView.prototype.onPongClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        var dataArr = this.actData.pong_items;
        if (dataArr && dataArr.length > 0) { // 碰只有一种选项
            Game.Server.send(this.Define.CmdPong, { cards: dataArr[0].all_cards });
            this.active = false;
        }
    };
    ErmjAskActionView.prototype.onKongClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        var dataArr = this.actData.kong_items || [];
        if (dataArr && dataArr.length > 0) { // 杠可能有多种选项
            if (dataArr.length == 1) {
                Game.Server.send(this.Define.CmdKong, { cards: dataArr[0].all_cards });
                this.active = false;
                this.Context.set(this.Define.FieldInPlayTurn, false); // 杠后关闭出牌开关, 避免快速操作异常, 会摸一张牌时callplay会再打开
            }
            else { // 弹选择窗
                this.showOperList(dataArr);
                var kongWorldPos = this.kongBtn.parent.convertToWorldSpaceAR(this.kongBtn.position);
                var pos = this.operViewNode.parent.convertToNodeSpaceAR(kongWorldPos);
                this.operViewNode.setPosition(pos.add(cc.v3(0, 108)));
            }
        }
    };
    ErmjAskActionView.prototype.onChowClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        var dataArr = this.actData.chow_items || [];
        if (dataArr && dataArr.length > 0) { // 吃可能有多种选项
            if (dataArr.length == 1) {
                Game.Server.send(this.Define.CmdChow, { cards: dataArr[0].all_cards, chow_card: dataArr[0].card });
                this.active = false;
            }
            else { // 弹选择窗
                this.showOperList(dataArr);
                var chowWorldPos = this.chowBtn.parent.convertToWorldSpaceAR(this.chowBtn.position);
                var pos = this.operViewNode.parent.convertToNodeSpaceAR(chowWorldPos);
                this.operViewNode.setPosition(pos.add(cc.v3(0, 108)));
            }
        }
    };
    ErmjAskActionView.prototype.onWinClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        var data = this.actData.win_items;
        Game.Server.send(this.Define.CmdWin, { card: data.card });
        this.active = false;
    };
    ErmjAskActionView.prototype.onTingClick = function () {
        this.isAuto();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        if (this.tingData.ting_type == 2) { // 天听 不用出牌
            Game.Server.send(this.Define.CmdTing, { card: 0 });
            this.active = false;
        }
        else {
            Game.Event.event(ErmjGameEvent_1.default.doTingCallPlay, true, this.tingData);
            this.tingCancelBtn.active = true;
            this.btnLayoutNode.active = false;
        }
    };
    ErmjAskActionView.prototype.onTingCancel = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        Game.Event.event(ErmjGameEvent_1.default.doTingCallPlay, false, {});
        this.tingCancelBtn.active = false;
        this.btnLayoutNode.active = true;
    };
    /**
     * 显示吃杠多选框
     * @param dataArr
     */
    ErmjAskActionView.prototype.showOperList = function (dataArr) {
        this.operViewNode.active = true;
        this.resetOperList();
        var count = dataArr.length;
        for (var i = 0; i < count; i++) {
            var view = this.operSelectItemList[i];
            if (!view)
                view = this.copyOneItem();
            view.active = true;
            view.setStyle(dataArr[i]);
        }
        var min = 10;
        var spaceX = 168;
        this.operViewBgNode.width = count * spaceX + min;
    };
    ErmjAskActionView.prototype.resetOperList = function () {
        this.operSelectItemList.forEach(function (item) {
            item.active = false;
        });
    };
    ErmjAskActionView.prototype.copyOneItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.setParent(this.operViewContentLayout.node);
        var view = new OperSelectItem(node, this.onOperItemClick, this);
        this.operSelectItemList.push(view);
        return view;
    };
    ErmjAskActionView.prototype.onOperItemClick = function (data) {
        this.active = false;
        if (data.type == 2) { // 只有吃和杠才会出现多种选择
            Game.Server.send(this.Define.CmdChow, { cards: data.all_cards, chow_card: data.card });
        }
        if (data.type == 6 || data.type == 5) { // 碰杠和暗杠才会出现
            Game.Server.send(this.Define.CmdKong, { cards: data.all_cards });
            this.Context.set(this.Define.FieldInPlayTurn, false); // 杠后关闭出牌开关, 避免快速操作异常, 会摸一张牌时callplay会再打开
        }
    };
    ErmjAskActionView.prototype.onClose = function () {
        this.actData = {};
        this.pongBtn.active = false;
        this.kongBtn.active = false;
        this.chowBtn.active = false;
        this.winBtn.active = false;
        this.winBtn.stopAllActions();
        this.passBtn.active = false;
        this.tingBtn.active = false;
        this.tingCancelBtn.active = false;
        this.operViewNode.active = false;
    };
    ErmjAskActionView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjAskActionView;
}(ErmjBaseView_1.default));
exports.default = ErmjAskActionView;
var OperSelectItem = /** @class */ (function (_super) {
    __extends(OperSelectItem, _super);
    function OperSelectItem(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.mjItemList = [];
        _this.setNode(node);
        return _this;
    }
    OperSelectItem.prototype.initView = function () {
        for (var i = 0; i < 4; i++) {
            var node = this.getChild("mahjongHandView" + i.toString());
            var view = new ErmjMahjongHandView_1.default(node);
            view.active = true;
            this.mjItemList.push(view);
        }
        ErmjGameConst_1.default.addCommonClick(this.node, "", this.onSelectClick, this, cc.Button.Transition.NONE);
    };
    OperSelectItem.prototype.setStyle = function (data) {
        this.curData = data;
        var isChow = data.type == 2;
        var isDarkKong = data.type == 6;
        this.mjItemList.forEach(function (mjItem, index) {
            if (isChow && index == 3) { // 吃 第四张隐藏
                mjItem.active = false;
            }
            else {
                mjItem.active = true;
            }
            if (isDarkKong && index != 3) {
                mjItem.isFront = false;
            }
            else {
                mjItem.isFront = true;
                mjItem.mahjongValue = data.all_cards[index];
                if (isChow && data.all_cards[index] == data.card) { // 吃的那张设颜色
                    mjItem.setSpecialColor(true);
                }
                else {
                    mjItem.setSpecialColor(false);
                }
            }
        });
    };
    OperSelectItem.prototype.onSelectClick = function () {
        this.callback.call(this.target, this.curData);
    };
    return OperSelectItem;
}(ErmjBaseView_1.default));

cc._RF.pop();