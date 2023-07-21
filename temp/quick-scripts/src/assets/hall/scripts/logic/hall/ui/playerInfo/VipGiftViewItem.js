"use strict";
cc._RF.push(module, '77aabBFgOBLk5TdSnHEpTDi', 'VipGiftViewItem');
// hall/scripts/logic/hall/ui/playerInfo/VipGiftViewItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var WndVip3_1 = require("./WndVip3");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipGiftViewItem = /** @class */ (function (_super) {
    __extends(VipGiftViewItem, _super);
    function VipGiftViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iconSpriteList = [];
        _this.giftNameSpriteList = [];
        _this.iconSprite = null;
        _this.nameSprite = null;
        _this.progress = null;
        _this.progressLabel = null;
        _this.awardTipLabel = null;
        _this.awardLabel = null;
        _this.currentAwardTipLabel = null;
        _this.currentAwardLabel = null;
        _this.nextAwardTipLabel = null;
        _this.nextAwardLabel = null;
        _this.awardBtn = null;
        _this.awardBtnSpriteList = [];
        _this.awardBtn_bg = [];
        _this.awardBtn_lb = [];
        _this.awardBtn_lbimg = null;
        _this.type = -1;
        _this.data = null;
        _this.btnState = -1; // 0可点击可领取 1 可点击不可领取 2 不可点击
        _this.isLimited = false;
        return _this;
    }
    VipGiftViewItem.prototype.onLoad = function () {
        Global.UIHelper.addCommonClick(this.node, "awardBtn", this.reqGetAward, this);
    };
    VipGiftViewItem.prototype.reqGetAward = function () {
        var _this = this;
        if (this.isLimited) {
            Global.UI.fastTip("操作过于频繁，清稍后！");
            return;
        }
        this.isLimited = true;
        setTimeout(function () {
            _this.isLimited = false;
        }, 1000);
        var canGetIndex = this.getItemIndex(this.data);
        var level = this.data.list[canGetIndex].level;
        var param = {};
        param.type = this.type;
        param.level = level;
        if (!Global.PlayerData.vip) {
            Global.UI.fastTip("您的VIP等级为0!");
            return;
        }
        if (this.type === 0 && Global.PlayerData.vip < level) {
            Global.UI.fastTip("您的VIP等级不符合!");
            return;
        }
        var weekData = this.type === 1 ? this.data.week : this.data.month;
        var bPay = weekData.pay;
        var bFlow = weekData.code - weekData.need_code >= 0 && weekData.need_code !== 0;
        if (!bPay && this.type !== 0) {
            Global.UI.fastTip("请您充值后再来领取!");
            return;
        }
        if (!bFlow && this.type !== 0) {
            Global.UI.fastTip("您的打码量不足!");
            return;
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.NewReciveVipReward, param, function (data) {
            if (data.point) {
                var key = Global.Toolkit.md5(Global.PlayerData.uid);
                Global.Setting.storage.set(key, level);
                Global.UI.show("WndRebateGet", data.point);
                var info = {};
                info.index = canGetIndex;
                info.type = _this.type;
                Global.Event.event(GlobalEvent.UPDATEVIPDATA, info);
            }
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false);
    };
    /**
     *
     * @param data
     * @param type 0 升级奖励 1 周奖励 2 月奖励
     * @param pageIndex 页签索引
     * @returns
     */
    VipGiftViewItem.prototype.refreshUI = function (data, type, pageIndex) {
        //   let btn = this.awardBtn.node.getComponent(YXButton)
        this.type = type;
        this.data = data;
        if (!data || !data.list)
            return;
        this.iconSprite.spriteFrame = this.iconSpriteList[type];
        this.nameSprite.spriteFrame = this.giftNameSpriteList[type];
        var vip = Global.PlayerData.vip;
        switch (type) {
            case WndVip3_1.ItemType.LEVEL:
                if (data.list.length >= pageIndex && vip > 0) { //
                    var canGetIndex = this.getItemIndex(data);
                    var level = data.list[canGetIndex].level;
                    var status = data.list[canGetIndex].status;
                    var point = data.list[canGetIndex].point;
                    this.progress.progress = 1;
                    this.progressLabel.string = "1/1";
                    if (status === 0 && vip >= level) {
                        this.awardLabel.string = point / Global.Setting.glodRatio + "";
                        this.awardTipLabel.string = "VIP" + level + "\u5F69\u91D1\u5956\u52B1";
                        //   this.awardBtn.spriteFrame = this.awardBtnSpriteList[0] // 可领取
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[0];
                        this.btnState = 0;
                        // btn.interactable = true
                    }
                    else {
                        //  btn.interactable = false
                        this.btnState = 2;
                        if (data.list.length > level) {
                            this.progress.progress = 0;
                            this.progressLabel.string = "0/1";
                            this.awardTipLabel.string = "VIP" + level + "\u5F69\u91D1\u5956\u52B1";
                            //this.awardBtn.spriteFrame = this.awardBtnSpriteList[4] // 未达成\
                            this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                            this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[4];
                            this.awardLabel.string = data.list[canGetIndex].point / Global.Setting.glodRatio + ""; //Global.Toolkit.GetMoneyFormat(data.list[canGetIndex].point) + "y"
                        }
                        else {
                            this.progress.progress = 1;
                            this.progressLabel.string = "1/1";
                            this.awardTipLabel.string = "VIP" + level + "\u5F69\u91D1\u5956\u52B1";
                            this.awardBtn.spriteFrame = this.awardBtnSpriteList[1]; // 已领取
                            this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                            this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[1];
                            this.awardLabel.string = data.list[level - 1].point / Global.Setting.glodRatio + ""; //Global.Toolkit.GetMoneyFormat(data.list[level - 1].point) + "y"
                        }
                    }
                }
                else {
                    //  btn.interactable = false
                    this.btnState = 2;
                    this.progress.progress = 0;
                    this.progressLabel.string = "0/1";
                    this.awardLabel.string = data.list[0].point / Global.Setting.glodRatio + ""; //Global.Toolkit.GetMoneyFormat(data.list[0].point) + "y"
                    this.awardTipLabel.string = "VIP1\u5F69\u91D1\u5956\u52B1";
                    // this.awardBtn.spriteFrame = this.awardBtnSpriteList[4] // 未达成
                    this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                    this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[4];
                }
                break;
            case WndVip3_1.ItemType.MONTH:
            case WndVip3_1.ItemType.WEEK:
                var weekData = type === 1 ? data.week : data.month;
                var bPay = weekData.pay;
                var bGet = weekData.last_get;
                var bFlow = weekData.code - weekData.need_code >= 0 && weekData.need_code !== 0;
                if (!weekData.need_code) {
                    this.progress.progress = 0;
                    this.progressLabel.string = "0/0";
                }
                else {
                    this.progress.progress = weekData.code / weekData.need_code;
                    this.progressLabel.string = Math.floor(weekData.code / Global.Setting.glodRatio) + "/" + weekData.need_code / Global.Setting.glodRatio;
                }
                if (!bGet && weekData.last_vip !== 0) {
                    this.awardTipLabel.node.active = true;
                    this.awardTipLabel.string = type === 1 ? "\u4E0A\u5468VIP" + weekData.last_vip + "\u793C\u91D1" : "\u4E0A\u6708VIP" + weekData.last_vip + "\u793C\u91D1";
                    this.awardLabel.node.active = true;
                    this.awardLabel.node.parent.active = true;
                    this.awardLabel.string = weekData.last_point / Global.Setting.glodRatio + ""; //Global.Toolkit.GetMoneyFormat(weekData.last_point) + "y"
                    //    btn.interactable = true
                    if (!bFlow || !bPay) {
                        this.btnState = 1;
                        //  this.awardBtn.spriteFrame = this.awardBtnSpriteList[5]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[5];
                    }
                    else {
                        this.btnState = 0;
                        // this.awardBtn.spriteFrame = this.awardBtnSpriteList[0]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[0];
                    }
                    this.currentAwardLabel.node.active = false;
                    this.currentAwardLabel.node.parent.active = false;
                    this.currentAwardTipLabel.node.active = false;
                    this.nextAwardLabel.node.active = false;
                    this.nextAwardTipLabel.node.active = false;
                    this.nextAwardTipLabel.node.parent.active = false;
                }
                else {
                    this.btnState = 2;
                    //     btn.interactable = false
                    this.awardTipLabel.node.active = false;
                    this.awardLabel.node.active = false;
                    this.awardLabel.node.parent.active = false;
                    var currentAward = weekData.now_vip_point / Global.Setting.glodRatio + ""; //Global.Toolkit.GetMoneyFormat(weekData.now_vip_point)+ "y"
                    var nextAward = weekData.next_vip_point / Global.Setting.glodRatio + ""; //(Global.Toolkit.GetMoneyFormat(weekData.next_vip_point) + "y")
                    this.currentAwardLabel.string = currentAward;
                    this.currentAwardLabel.node.active = true;
                    this.currentAwardLabel.node.parent.active = true;
                    this.currentAwardTipLabel.string = type === 1 ? "\u672C\u5468VIP" + vip + "\u793C\u91D1" : "\u672C\u6708VIP" + vip + "\u793C\u91D1";
                    this.currentAwardTipLabel.node.active = true;
                    if (type === 1) {
                        // this.awardBtn.spriteFrame = this.awardBtnSpriteList[2]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[2];
                    }
                    else {
                        // this.awardBtn.spriteFrame = this.awardBtnSpriteList[3]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[3];
                    }
                    this.nextAwardLabel.node.active = true;
                    this.nextAwardLabel.string = nextAward;
                    if (vip >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
                        this.awardTipLabel.node.active = true;
                        this.awardLabel.node.active = true;
                        this.awardLabel.node.parent.active = true;
                        this.awardTipLabel.string = type === 1 ? "\u672C\u5468VIP" + vip + "\u793C\u91D1" : "\u672C\u6708VIP" + vip + "\u793C\u91D1";
                        this.awardLabel.string = "" + currentAward;
                        this.currentAwardLabel.node.active = false;
                        this.currentAwardLabel.node.parent.active = false;
                        this.currentAwardTipLabel.node.active = false;
                        this.nextAwardLabel.node.active = false;
                        this.nextAwardTipLabel.node.active = false;
                        this.nextAwardTipLabel.node.parent.active = false;
                        return;
                    }
                    this.nextAwardTipLabel.node.active = true;
                    this.nextAwardTipLabel.node.parent.active = true;
                    this.nextAwardTipLabel.string = "\u5347\u7EA7VIP" + (vip + 1) + "\u793C\u91D1";
                }
            default:
                break;
        }
    };
    /**
     *
     * @param data 获取没领取的最低index
     * @returns
     */
    VipGiftViewItem.prototype.getItemIndex = function (data) {
        var index = 0;
        if (!data || !data.list) {
            return index;
        }
        for (var i = 0; i < data.list.length; i++) {
            var item = data.list[i];
            if (item && !item.status) {
                return i;
            }
        }
        return PlayerInfoModel_1.default.instance.vip_cfg.length - 1;
    };
    __decorate([
        property([cc.SpriteFrame])
    ], VipGiftViewItem.prototype, "iconSpriteList", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], VipGiftViewItem.prototype, "giftNameSpriteList", void 0);
    __decorate([
        property(cc.Sprite)
    ], VipGiftViewItem.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], VipGiftViewItem.prototype, "nameSprite", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], VipGiftViewItem.prototype, "progress", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "progressLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "awardTipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "awardLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "currentAwardTipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "currentAwardLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "nextAwardTipLabel", void 0);
    __decorate([
        property(cc.Label)
    ], VipGiftViewItem.prototype, "nextAwardLabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], VipGiftViewItem.prototype, "awardBtn", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], VipGiftViewItem.prototype, "awardBtnSpriteList", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], VipGiftViewItem.prototype, "awardBtn_bg", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], VipGiftViewItem.prototype, "awardBtn_lb", void 0);
    __decorate([
        property(cc.Sprite)
    ], VipGiftViewItem.prototype, "awardBtn_lbimg", void 0);
    VipGiftViewItem = __decorate([
        ccclass
    ], VipGiftViewItem);
    return VipGiftViewItem;
}(cc.Component));
exports.default = VipGiftViewItem;

cc._RF.pop();