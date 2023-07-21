
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/VipGiftViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxWaXBHaWZ0Vmlld0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNkVBQXdFO0FBQ3hFLHFDQUFxQztBQUUvQixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUE2QyxtQ0FBWTtJQUF6RDtRQUFBLHFFQXVUQztRQXBURyxvQkFBYyxHQUEwQixFQUFFLENBQUM7UUFFM0Msd0JBQWtCLEdBQTBCLEVBQUUsQ0FBQztRQUcvQyxnQkFBVSxHQUFjLElBQUksQ0FBQTtRQUc1QixnQkFBVSxHQUFjLElBQUksQ0FBQTtRQUc1QixjQUFRLEdBQW1CLElBQUksQ0FBQTtRQUcvQixtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUc5QixtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUc5QixnQkFBVSxHQUFhLElBQUksQ0FBQTtRQUkzQiwwQkFBb0IsR0FBYSxJQUFJLENBQUE7UUFHckMsdUJBQWlCLEdBQWEsSUFBSSxDQUFBO1FBR2xDLHVCQUFpQixHQUFhLElBQUksQ0FBQTtRQUdsQyxvQkFBYyxHQUFhLElBQUksQ0FBQTtRQUcvQixjQUFRLEdBQWMsSUFBSSxDQUFDO1FBRzNCLHdCQUFrQixHQUEwQixFQUFFLENBQUM7UUFHL0MsaUJBQVcsR0FBMEIsRUFBRSxDQUFDO1FBRXhDLGlCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUd4QyxvQkFBYyxHQUFjLElBQUksQ0FBQztRQUV6QixVQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFVCxVQUFJLEdBQUcsSUFBSSxDQUFBO1FBR1gsY0FBUSxHQUFHLENBQUUsQ0FBQyxDQUFBLENBQUMsMkJBQTJCO1FBSTFDLGVBQVMsR0FBRyxLQUFLLENBQUE7O0lBMFA3QixDQUFDO0lBeFBHLGdD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cnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgUGxheWVySW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBJdGVtVHlwZSB9IGZyb20gXCIuL1duZFZpcDNcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXBHaWZ0Vmlld0l0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgaWNvblNwcml0ZUxpc3Q6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBnaWZ0TmFtZVNwcml0ZUxpc3Q6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBpY29uU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIG5hbWVTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICBwcm9ncmVzczogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgYXdhcmRUaXBMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgYXdhcmRMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGN1cnJlbnRBd2FyZFRpcExhYmVsOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBjdXJyZW50QXdhcmRMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbmV4dEF3YXJkVGlwTGFiZWw6IGNjLkxhYmVsID0gbnVsbFxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIG5leHRBd2FyZExhYmVsOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgYXdhcmRCdG46IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBhd2FyZEJ0blNwcml0ZUxpc3Q6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgYXdhcmRCdG5fYmc6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBhd2FyZEJ0bl9sYjogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIGF3YXJkQnRuX2xiaW1nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgdHlwZSA9IC0xXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhID0gbnVsbFxyXG5cclxuXHJcbiAgICBwcml2YXRlIGJ0blN0YXRlID0gLSAxIC8vIDDlj6/ngrnlh7vlj6/pooblj5YgMSDlj6/ngrnlh7vkuI3lj6/pooblj5YgMiDkuI3lj6/ngrnlh7tcclxuXHJcbiAgICBwcml2YXRlIHRpbWVyOiBhbnlcclxuXHJcbiAgICBwcml2YXRlIGlzTGltaXRlZCA9IGZhbHNlXHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYXdhcmRCdG5cIiwgdGhpcy5yZXFHZXRBd2FyZCwgdGhpcylcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHJlcUdldEF3YXJkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTGltaXRlZCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaTjeS9nOi/h+S6jumikee5ge+8jOa4heeojeWQju+8gVwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xpbWl0ZWQgPSB0cnVlXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNMaW1pdGVkID0gZmFsc2VcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICBsZXQgY2FuR2V0SW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLmRhdGEpXHJcbiAgICAgICAgbGV0IGxldmVsID0gdGhpcy5kYXRhLmxpc3RbY2FuR2V0SW5kZXhdLmxldmVsXHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLnR5cGUgPSB0aGlzLnR5cGVcclxuICAgICAgICBwYXJhbS5sZXZlbCA9IGxldmVsXHJcbiAgICAgICAgaWYgKCFHbG9iYWwuUGxheWVyRGF0YS52aXApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmgqjnmoRWSVDnrYnnuqfkuLowIVwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IDAgJiYgR2xvYmFsLlBsYXllckRhdGEudmlwIDwgbGV2ZWwpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmgqjnmoRWSVDnrYnnuqfkuI3nrKblkIghXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2Vla0RhdGEgPSB0aGlzLnR5cGUgPT09IDEgPyB0aGlzLmRhdGEud2VlayA6IHRoaXMuZGF0YS5tb250aFxyXG4gICAgICAgIGxldCBiUGF5ID0gd2Vla0RhdGEucGF5XHJcbiAgICAgICAgbGV0IGJGbG93ID0gd2Vla0RhdGEuY29kZSAtIHdlZWtEYXRhLm5lZWRfY29kZSA+PSAwICYmIHdlZWtEYXRhLm5lZWRfY29kZSAhPT0gMFxyXG4gICAgICAgIGlmICghYlBheSAmJiB0aGlzLnR5cGUgIT09IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fmgqjlhYXlgLzlkI7lho3mnaXpooblj5YhXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWJGbG93ICYmIHRoaXMudHlwZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaCqOeahOaJk+eggemHj+S4jei2syFcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLk5ld1JlY2l2ZVZpcFJld2FyZCwgcGFyYW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gR2xvYmFsLlRvb2xraXQubWQ1KEdsb2JhbC5QbGF5ZXJEYXRhLnVpZClcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KGtleSwgbGV2ZWwpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLnBvaW50KVxyXG4gICAgICAgICAgICAgICAgbGV0IGluZm86IGFueSA9IHt9XHJcbiAgICAgICAgICAgICAgICBpbmZvLmluZGV4ID0gY2FuR2V0SW5kZXhcclxuICAgICAgICAgICAgICAgIGluZm8udHlwZSA9IHRoaXMudHlwZVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlVQREFURVZJUERBVEEsIGluZm8pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEgXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAwIOWNh+e6p+WlluWKsSAxIOWRqOWlluWKsSAyIOaciOWlluWKsVxyXG4gICAgICogQHBhcmFtIHBhZ2VJbmRleCDpobXnrb7ntKLlvJVcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICByZWZyZXNoVUkoZGF0YSwgdHlwZSwgcGFnZUluZGV4KSB7XHJcbiAgICAgICAgLy8gICBsZXQgYnRuID0gdGhpcy5hd2FyZEJ0bi5ub2RlLmdldENvbXBvbmVudChZWEJ1dHRvbilcclxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5saXN0KSByZXR1cm5cclxuXHJcbiAgICAgICAgdGhpcy5pY29uU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uU3ByaXRlTGlzdFt0eXBlXVxyXG4gICAgICAgIHRoaXMubmFtZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2lmdE5hbWVTcHJpdGVMaXN0W3R5cGVdXHJcbiAgICAgICAgbGV0IHZpcCA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcFxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkxFVkVMOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubGlzdC5sZW5ndGggPj0gcGFnZUluZGV4ICYmIHZpcCA+IDApIHsgLy9cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FuR2V0SW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZXZlbCA9IGRhdGEubGlzdFtjYW5HZXRJbmRleF0ubGV2ZWxcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID0gZGF0YS5saXN0W2NhbkdldEluZGV4XS5zdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSBkYXRhLmxpc3RbY2FuR2V0SW5kZXhdLnBvaW50XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDFcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gXCIxLzFcIlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09IDAgJiYgdmlwID49IGxldmVsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkTGFiZWwuc3RyaW5nID0gcG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8gKyBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRUaXBMYWJlbC5zdHJpbmcgPSBgVklQJHtsZXZlbH3lvanph5HlpZblirFgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgdGhpcy5hd2FyZEJ0bi5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5TcHJpdGVMaXN0WzBdIC8vIOWPr+mihuWPllxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0bl9iZ1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bl9sYmltZy5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fbGJbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuU3RhdGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgYnRuLmludGVyYWN0YWJsZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuU3RhdGUgPSAyXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5saXN0Lmxlbmd0aCA+IGxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0xhYmVsLnN0cmluZyA9IFwiMC8xXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRUaXBMYWJlbC5zdHJpbmcgPSBgVklQJHtsZXZlbH3lvanph5HlpZblirFgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuU3ByaXRlTGlzdFs0XSAvLyDmnKrovr7miJBcXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bi5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fYmdbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuX2xiaW1nLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0bl9sYls0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5zdHJpbmcgPSBkYXRhLmxpc3RbY2FuR2V0SW5kZXhdLnBvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvICsgXCJcIi8vR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQoZGF0YS5saXN0W2NhbkdldEluZGV4XS5wb2ludCkgKyBcInlcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gXCIxLzFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZFRpcExhYmVsLnN0cmluZyA9IGBWSVAke2xldmVsfeW9qemHkeWlluWKsWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuU3ByaXRlTGlzdFsxXSAvLyDlt7Lpooblj5ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuX2JnWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bl9sYmltZy5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fbGJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkTGFiZWwuc3RyaW5nID0gZGF0YS5saXN0W2xldmVsIC0gMV0ucG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8gKyBcIlwiLy9HbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChkYXRhLmxpc3RbbGV2ZWwgLSAxXS5wb2ludCkgKyBcInlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIGJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuU3RhdGUgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzcy5wcm9ncmVzcyA9IDBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzTGFiZWwuc3RyaW5nID0gXCIwLzFcIlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5zdHJpbmcgPSBkYXRhLmxpc3RbMF0ucG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8gKyBcIlwiLy9HbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChkYXRhLmxpc3RbMF0ucG9pbnQpICsgXCJ5XCJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkVGlwTGFiZWwuc3RyaW5nID0gYFZJUDHlvanph5HlpZblirFgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hd2FyZEJ0bi5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5TcHJpdGVMaXN0WzRdIC8vIOacqui+vuaIkFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuX2JnWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG5fbGJpbWcuc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuX2xiWzRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTU9OVEg6XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuV0VFSzpcclxuICAgICAgICAgICAgICAgIGxldCB3ZWVrRGF0YSA9IHR5cGUgPT09IDEgPyBkYXRhLndlZWsgOiBkYXRhLm1vbnRoXHJcbiAgICAgICAgICAgICAgICBsZXQgYlBheSA9IHdlZWtEYXRhLnBheVxyXG4gICAgICAgICAgICAgICAgbGV0IGJHZXQgPSB3ZWVrRGF0YS5sYXN0X2dldFxyXG4gICAgICAgICAgICAgICAgbGV0IGJGbG93ID0gd2Vla0RhdGEuY29kZSAtIHdlZWtEYXRhLm5lZWRfY29kZSA+PSAwICYmIHdlZWtEYXRhLm5lZWRfY29kZSAhPT0gMFxyXG4gICAgICAgICAgICAgICAgaWYgKCF3ZWVrRGF0YS5uZWVkX2NvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBcIjAvMFwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzLnByb2dyZXNzID0gd2Vla0RhdGEuY29kZSAvIHdlZWtEYXRhLm5lZWRfY29kZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NMYWJlbC5zdHJpbmcgPSBgJHtNYXRoLmZsb29yKHdlZWtEYXRhLmNvZGUgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pfS8ke3dlZWtEYXRhLm5lZWRfY29kZSAvIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpb31gXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFiR2V0ICYmIHdlZWtEYXRhLmxhc3RfdmlwICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRUaXBMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkVGlwTGFiZWwuc3RyaW5nID0gdHlwZSA9PT0gMSA/IGDkuIrlkahWSVAke3dlZWtEYXRhLmxhc3RfdmlwfeekvOmHkWAgOiBg5LiK5pyIVklQJHt3ZWVrRGF0YS5sYXN0X3ZpcH3npLzph5FgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5zdHJpbmcgPSB3ZWVrRGF0YS5sYXN0X3BvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvICsgXCJcIi8vR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQod2Vla0RhdGEubGFzdF9wb2ludCkgKyBcInlcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiRmxvdyB8fCAhYlBheSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5TdGF0ZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuU3ByaXRlTGlzdFs1XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0bl9iZ1swXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bl9sYmltZy5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fbGJbNV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXRlID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmF3YXJkQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0blNwcml0ZUxpc3RbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bi5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fYmdbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRCdG5fbGJpbWcuc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuX2xiWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBd2FyZExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBd2FyZExhYmVsLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEF3YXJkVGlwTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEF3YXJkTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEF3YXJkVGlwTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEF3YXJkVGlwTGFiZWwubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0blN0YXRlID0gMlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBidG4uaW50ZXJhY3RhYmxlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkVGlwTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZExhYmVsLm5vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50QXdhcmQgPSB3ZWVrRGF0YS5ub3dfdmlwX3BvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvICsgXCJcIi8vR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQod2Vla0RhdGEubm93X3ZpcF9wb2ludCkrIFwieVwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRBd2FyZCA9IHdlZWtEYXRhLm5leHRfdmlwX3BvaW50IC8gR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvICsgXCJcIi8vKEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KHdlZWtEYXRhLm5leHRfdmlwX3BvaW50KSArIFwieVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEF3YXJkTGFiZWwuc3RyaW5nID0gY3VycmVudEF3YXJkXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXdhcmRMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBd2FyZExhYmVsLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBd2FyZFRpcExhYmVsLnN0cmluZyA9IHR5cGUgPT09IDEgPyBg5pys5ZGoVklQJHt2aXB956S86YeRYCA6IGDmnKzmnIhWSVAke3ZpcH3npLzph5FgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXdhcmRUaXBMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuU3ByaXRlTGlzdFsyXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0bl9iZ1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bl9sYmltZy5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fbGJbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYXdhcmRCdG4uc3ByaXRlRnJhbWUgPSB0aGlzLmF3YXJkQnRuU3ByaXRlTGlzdFszXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkQnRuLnNwcml0ZUZyYW1lID0gdGhpcy5hd2FyZEJ0bl9iZ1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZEJ0bl9sYmltZy5zcHJpdGVGcmFtZSA9IHRoaXMuYXdhcmRCdG5fbGJbM107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEF3YXJkTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0QXdhcmRMYWJlbC5zdHJpbmcgPSBuZXh0QXdhcmRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlwID49IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkVGlwTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hd2FyZExhYmVsLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXdhcmRUaXBMYWJlbC5zdHJpbmcgPSB0eXBlID09PSAxID8gYOacrOWRqFZJUCR7dmlwfeekvOmHkWAgOiBg5pys5pyIVklQJHt2aXB956S86YeRYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF3YXJkTGFiZWwuc3RyaW5nID0gYCR7Y3VycmVudEF3YXJkfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXdhcmRMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEF3YXJkTGFiZWwubm9kZS5wYXJlbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXdhcmRUaXBMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEF3YXJkTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRBd2FyZFRpcExhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0QXdhcmRUaXBMYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0QXdhcmRUaXBMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRBd2FyZFRpcExhYmVsLm5vZGUucGFyZW50LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRBd2FyZFRpcExhYmVsLnN0cmluZyA9IGDljYfnuqdWSVAke3ZpcCArIDF956S86YeRYFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIOiOt+WPluayoemihuWPlueahOacgOS9jmluZGV4XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0SXRlbUluZGV4KGRhdGEpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLmxpc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluZGV4XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgIWl0ZW0uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoIC0gMVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIl19