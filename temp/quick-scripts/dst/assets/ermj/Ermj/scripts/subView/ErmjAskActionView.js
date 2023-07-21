
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjAskActionView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakFza0FjdGlvblZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCxxRUFBZ0U7QUFDaEUsdURBQWtEO0FBQ2xELHVEQUFrRDtBQUVsRDtJQUErQyxxQ0FBWTtJQXFCdkQsMkJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFoQk8sYUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixjQUFRLEdBQVEsRUFBRSxDQUFDO1FBU25CLHdCQUFrQixHQUFxQixFQUFFLENBQUM7UUFLOUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25ELHVCQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbkQsdUJBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUNuRCx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFB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Q3hCO1lBRUQsSUFBSSxVQUFVLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDMUI7aUJBQ0k7Z0JBQ0QsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQU8sVUFBVTtvQkFDL0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEM7cUJBQ0k7b0JBQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakM7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLHNDQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FuREEsQUFtREMsQ0FuRDRCLHNCQUFZLEdBbUR4QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4vRXJtakJhc2VWaWV3XCI7XHJcbmltcG9ydCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpNYWhqb25nSGFuZFZpZXcgZnJvbSBcIi4vbWFoam9uZy9Fcm1qTWFoam9uZ0hhbmRWaWV3XCI7XHJcbmltcG9ydCBFcm1qR2FtZUV2ZW50IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lRXZlbnRcIjtcclxuaW1wb3J0IEVybWpHYW1lQ29uc3QgZnJvbSBcIi4uL2RhdGEvRXJtakdhbWVDb25zdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakFza0FjdGlvblZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBidG5MYXlvdXROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwYXNzQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB0aW5nQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwb25nQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBrb25nQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjaG93QnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5CdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGFjdERhdGE6IGFueSA9IHt9O1xyXG4gICAgcHJpdmF0ZSB0aW5nRGF0YTogYW55ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSB0aW5nQ2FuY2VsQnRuOiBjYy5Ob2RlO1xyXG5cclxuICAgIC8vIOWQg+adoOmAieaLqeW8ueeql1xyXG4gICAgcHJpdmF0ZSBvcGVyVmlld05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG9wZXJWaWV3QmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBvcGVyVmlld0NvbnRlbnRMYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG9wZXJTZWxlY3RJdGVtTGlzdDogT3BlclNlbGVjdEl0ZW1bXSA9IFtdO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYnRuTGF5b3V0Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJidG5MYXlvdXRcIik7XHJcbiAgICAgICAgdGhpcy5wYXNzQnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC9idG5fcGFzc1wiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMucGFzc0J0biwgXCJcIiwgdGhpcy5vblBhc3NDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50aW5nQnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC9idG5fdGluZ1wiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMudGluZ0J0biwgXCJcIiwgdGhpcy5vblRpbmdDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5wb25nQnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC9idG5fcG9uZ1wiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMucG9uZ0J0biwgXCJcIiwgdGhpcy5vblBvbmdDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5rb25nQnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC9idG5fa29uZ1wiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMua29uZ0J0biwgXCJcIiwgdGhpcy5vbktvbmdDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaG93QnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC9idG5fY2hvd1wiKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMuY2hvd0J0biwgXCJcIiwgdGhpcy5vbkNob3dDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy53aW5CdG4gPSB0aGlzLmdldENoaWxkKFwiYnRuTGF5b3V0L2J0bl93aW5cIik7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLndpbkJ0biwgXCJcIiwgdGhpcy5vbldpbkNsaWNrLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW5nQ2FuY2VsQnRuID0gdGhpcy5nZXRDaGlsZChcInRpbmdDYW5jZWxCdG5cIik7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLnRpbmdDYW5jZWxCdG4sIFwiXCIsIHRoaXMub25UaW5nQ2FuY2VsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnRpbmdDYW5jZWxCdG4uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMub3BlclZpZXdOb2RlID0gdGhpcy5nZXRDaGlsZChcIm9wZXJTZWxlY3RWaWV3XCIpO1xyXG4gICAgICAgIHRoaXMub3BlclZpZXdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub3BlclZpZXdCZ05vZGUgPSB0aGlzLmdldENoaWxkKFwib3BlclNlbGVjdFZpZXcvYmdOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMub3BlclZpZXdDb250ZW50TGF5b3V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJvcGVyU2VsZWN0Vmlldy9jb250ZW50XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJvcGVyU2VsZWN0Vmlldy9jb250ZW50L29wZXJJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuY29weU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5qc29u5pi+56S65pON5L2c5oyJ6ZKu5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0gY2ZnIOaYvuekuuWVpWpzb27ph4zkvKDllaXlrZfmrrUsIOS4jeS8oOWNs+WFqOmDqOS4jeaYvuekulxyXG4gICAgICogQHBhcmFtIGNmZ19qc29uIOS8oHtpc1Bhc3M6IDEsIGlzUG9uZzogMSwgaXNXaW46IDEsIGlzS29uZzogMCwgaXNDaG93OiAxfSDmmL7npLrllaXlsLHkvKDlrZfmrrU6dHJ1ZSgxKSwg5LiN5pi+56S655qEZmFsc2UoMCnmiJbogIXnm7TmjqXkuI3kvKBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dCdG5CeUNvbmZpZyhjZmc6IGFueSA9IHt9LCBhY3REYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIGlmICghY2ZnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5hY3REYXRhID0gYWN0RGF0YTtcclxuICAgICAgICB0aGlzLmJ0bkxheW91dE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpbmdDYW5jZWxCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHsgaXNQb25nLCBpc0tvbmcsIGlzQ2hvdywgaXNXaW4gfSA9IGNmZztcclxuICAgICAgICB0aGlzLnBvbmdCdG4uYWN0aXZlID0gISFpc1Bvbmc7XHJcbiAgICAgICAgdGhpcy5rb25nQnRuLmFjdGl2ZSA9ICEhaXNLb25nO1xyXG4gICAgICAgIHRoaXMuY2hvd0J0bi5hY3RpdmUgPSAhIWlzQ2hvdztcclxuICAgICAgICB0aGlzLndpbkJ0bi5hY3RpdmUgPSAhIWlzV2luO1xyXG4gICAgICAgIHRoaXMucGFzc0J0bi5hY3RpdmUgPSB0cnVlOyAgICAgLy8g6YO95pyJ6L+H55qE6YCJ6aG5XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuaYvuekuuWQrOaMiemSriDljY/orq7ni6znq4vlh7rmnaXkuoYgKi9cclxuICAgIHB1YmxpYyBzaG93VGluZ0J0bihpc1Rpbmc6IGJvb2xlYW4sIHRpbmdEYXRhOiBhbnkgPSB7fSkge1xyXG4gICAgICAgIHRoaXMudGluZ0RhdGEgPSB0aW5nRGF0YTtcclxuICAgICAgICB0aGlzLnRpbmdCdG4uYWN0aXZlID0gaXNUaW5nO1xyXG4gICAgICAgIHRoaXMuYnRuTGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGluZ0NhbmNlbEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBhc3NCdG4uYWN0aXZlID0gdHJ1ZTsgICAgIC8vIOmDveaciei/h+eahOmAiemhuVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuaYr+WQpuaMguacuiAqL1xyXG4gICAgcHJpdmF0ZSBpc0F1dG8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dC5pc0NtZEF1dG8pIHtcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRBdXRvLCB7IGF1dG9fcGxheTogMCB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblBhc3NDbGljaygpIHtcclxuICAgICAgICB0aGlzLmlzQXV0bygpO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZFBhc3MsIHt9KTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Qb25nQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pc0F1dG8oKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGRhdGFBcnI6IGFueVtdID0gdGhpcy5hY3REYXRhLnBvbmdfaXRlbXM7XHJcbiAgICAgICAgaWYgKGRhdGFBcnIgJiYgZGF0YUFyci5sZW5ndGggPiAwKSB7ICAgICAgICAgLy8g56Kw5Y+q5pyJ5LiA56eN6YCJ6aG5XHJcbiAgICAgICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kUG9uZywgeyBjYXJkczogZGF0YUFyclswXS5hbGxfY2FyZHMgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Lb25nQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pc0F1dG8oKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGRhdGFBcnI6IGFueVtdID0gdGhpcy5hY3REYXRhLmtvbmdfaXRlbXMgfHwgW107XHJcbiAgICAgICAgaWYgKGRhdGFBcnIgJiYgZGF0YUFyci5sZW5ndGggPiAwKSB7ICAgICAgICAgLy8g5p2g5Y+v6IO95pyJ5aSa56eN6YCJ6aG5XHJcbiAgICAgICAgICAgIGlmIChkYXRhQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZEtvbmcsIHsgY2FyZHM6IGRhdGFBcnJbMF0uYWxsX2NhcmRzIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRJblBsYXlUdXJuLCBmYWxzZSk7ICAgICAgIC8vIOadoOWQjuWFs+mXreWHuueJjOW8gOWFsywg6YG/5YWN5b+r6YCf5pON5L2c5byC5bi4LCDkvJrmkbjkuIDlvKDniYzml7ZjYWxscGxheeS8muWGjeaJk+W8gFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAgIC8vIOW8uemAieaLqeeql1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93T3Blckxpc3QoZGF0YUFycik7XHJcbiAgICAgICAgICAgICAgICBsZXQga29uZ1dvcmxkUG9zID0gdGhpcy5rb25nQnRuLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5rb25nQnRuLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLm9wZXJWaWV3Tm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoa29uZ1dvcmxkUG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlclZpZXdOb2RlLnNldFBvc2l0aW9uKHBvcy5hZGQoY2MudjMoMCwgMTA4KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaG93Q2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5pc0F1dG8oKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGRhdGFBcnI6IGFueVtdID0gdGhpcy5hY3REYXRhLmNob3dfaXRlbXMgfHwgW107XHJcbiAgICAgICAgaWYgKGRhdGFBcnIgJiYgZGF0YUFyci5sZW5ndGggPiAwKSB7ICAgICAgICAgLy8g5ZCD5Y+v6IO95pyJ5aSa56eN6YCJ6aG5XHJcbiAgICAgICAgICAgIGlmIChkYXRhQXJyLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZENob3csIHsgY2FyZHM6IGRhdGFBcnJbMF0uYWxsX2NhcmRzLCBjaG93X2NhcmQ6IGRhdGFBcnJbMF0uY2FyZCB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7ICAgLy8g5by56YCJ5oup56qXXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dPcGVyTGlzdChkYXRhQXJyKTtcclxuICAgICAgICAgICAgICAgIGxldCBjaG93V29ybGRQb3MgPSB0aGlzLmNob3dCdG4ucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmNob3dCdG4ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMub3BlclZpZXdOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjaG93V29ybGRQb3MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVyVmlld05vZGUuc2V0UG9zaXRpb24ocG9zLmFkZChjYy52MygwLCAxMDgpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbldpbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuaXNBdXRvKCk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5hY3REYXRhLndpbl9pdGVtcztcclxuICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZFdpbiwgeyBjYXJkOiBkYXRhLmNhcmQgfSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVGluZ0NsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuaXNBdXRvKCk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLnRpbmdEYXRhLnRpbmdfdHlwZSA9PSAyKSB7ICAgICAgIC8vIOWkqeWQrCDkuI3nlKjlh7rniYxcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRUaW5nLCB7IGNhcmQ6IDAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEVybWpHYW1lRXZlbnQuZG9UaW5nQ2FsbFBsYXksIHRydWUsIHRoaXMudGluZ0RhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbmdDYW5jZWxCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idG5MYXlvdXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVGluZ0NhbmNlbCgpIHtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChFcm1qR2FtZUV2ZW50LmRvVGluZ0NhbGxQbGF5LCBmYWxzZSwge30pO1xyXG4gICAgICAgIHRoaXMudGluZ0NhbmNlbEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJ0bkxheW91dE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWQg+adoOWkmumAieahhlxyXG4gICAgICogQHBhcmFtIGRhdGFBcnIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93T3Blckxpc3QoZGF0YUFycjogYW55W10pIHtcclxuICAgICAgICB0aGlzLm9wZXJWaWV3Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzZXRPcGVyTGlzdCgpO1xyXG5cclxuICAgICAgICBsZXQgY291bnQgPSBkYXRhQXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLm9wZXJTZWxlY3RJdGVtTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKCF2aWV3KVxyXG4gICAgICAgICAgICAgICAgdmlldyA9IHRoaXMuY29weU9uZUl0ZW0oKTtcclxuICAgICAgICAgICAgdmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB2aWV3LnNldFN0eWxlKGRhdGFBcnJbaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWluID0gMTA7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VYID0gMTY4O1xyXG4gICAgICAgIHRoaXMub3BlclZpZXdCZ05vZGUud2lkdGggPSBjb3VudCAqIHNwYWNlWCArIG1pbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRPcGVyTGlzdCgpIHtcclxuICAgICAgICB0aGlzLm9wZXJTZWxlY3RJdGVtTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5T25lSXRlbSgpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMub3BlclZpZXdDb250ZW50TGF5b3V0Lm5vZGUpO1xyXG4gICAgICAgIGxldCB2aWV3ID0gbmV3IE9wZXJTZWxlY3RJdGVtKG5vZGUsIHRoaXMub25PcGVySXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9wZXJTZWxlY3RJdGVtTGlzdC5wdXNoKHZpZXcpO1xyXG4gICAgICAgIHJldHVybiB2aWV3O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVySXRlbUNsaWNrKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAyKSB7ICAgICAgICAvLyDlj6rmnInlkIPlkozmnaDmiY3kvJrlh7rnjrDlpJrnp43pgInmi6lcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRDaG93LCB7IGNhcmRzOiBkYXRhLmFsbF9jYXJkcywgY2hvd19jYXJkOiBkYXRhLmNhcmQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLnR5cGUgPT0gNiB8fCBkYXRhLnR5cGUgPT0gNSkgeyAgICAgIC8vIOeisOadoOWSjOaal+adoOaJjeS8muWHuueOsFxyXG4gICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZEtvbmcsIHsgY2FyZHM6IGRhdGEuYWxsX2NhcmRzIH0pO1xyXG4gICAgICAgICAgICB0aGlzLkNvbnRleHQuc2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5QbGF5VHVybiwgZmFsc2UpOyAgICAgICAvLyDmnaDlkI7lhbPpl63lh7rniYzlvIDlhbMsIOmBv+WFjeW/q+mAn+aTjeS9nOW8guW4uCwg5Lya5pG45LiA5byg54mM5pe2Y2FsbHBsYXnkvJrlho3miZPlvIBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5hY3REYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5wb25nQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua29uZ0J0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNob3dCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53aW5CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53aW5CdG4uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnBhc3NCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW5nQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGluZ0NhbmNlbEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9wZXJWaWV3Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE9wZXJTZWxlY3RJdGVtIGV4dGVuZHMgRXJtakJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgbWpJdGVtTGlzdDogRXJtak1haGpvbmdIYW5kVmlld1tdID0gW107XHJcbiAgICBwcml2YXRlIGN1ckRhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbiwgcHJpdmF0ZSB0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJtYWhqb25nSGFuZFZpZXdcIiArIGkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEVybWpNYWhqb25nSGFuZFZpZXcobm9kZSk7XHJcbiAgICAgICAgICAgIHZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5takl0ZW1MaXN0LnB1c2godmlldyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJcIiwgdGhpcy5vblNlbGVjdENsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3R5bGUoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jdXJEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgaXNDaG93ID0gZGF0YS50eXBlID09IDI7XHJcbiAgICAgICAgbGV0IGlzRGFya0tvbmcgPSBkYXRhLnR5cGUgPT0gNjtcclxuICAgICAgICB0aGlzLm1qSXRlbUxpc3QuZm9yRWFjaCgobWpJdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNDaG93ICYmIGluZGV4ID09IDMpIHsgICAgICAgICAgLy8g5ZCDIOesrOWbm+W8oOmakOiXj1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0RhcmtLb25nICYmIGluZGV4ICE9IDMpIHtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gZGF0YS5hbGxfY2FyZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hvdyAmJiBkYXRhLmFsbF9jYXJkc1tpbmRleF0gPT0gZGF0YS5jYXJkKSB7ICAgICAgLy8g5ZCD55qE6YKj5byg6K6+6aKc6ImyXHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLnNldFNwZWNpYWxDb2xvcih0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5zZXRTcGVjaWFsQ29sb3IoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2VsZWN0Q2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLmN1ckRhdGEpO1xyXG4gICAgfVxyXG59Il19