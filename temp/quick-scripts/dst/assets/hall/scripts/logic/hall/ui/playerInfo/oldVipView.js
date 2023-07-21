
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/oldVipView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3265choTYpJ1YX9LV0DIwPI', 'oldVipView');
// hall/scripts/logic/hall/ui/playerInfo/oldVipView.ts

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
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * vip特权下的单个pageview视图
 */
var VipView = /** @class */ (function (_super) {
    __extends(VipView, _super);
    function VipView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 当前page的vip
         */
        _this.vip = 0;
        /**
         * 左右2个vip图标
         */
        _this.spriteVipArr = [];
        /**
         * 到下一级vip的提示文本
         */
        _this.richTextNextVip = null;
        /**
         * 到下一级vip的进度
         */
        _this.processBar = null;
        /**
         * vip4前每天加速的tips文本
         */
        _this.labelJiasu = null;
        /**
         * 当前page下的vip文本
         */
        _this.richTextVip = null;
        /**
         * 2个特权下的icon图标
         */
        _this.spriteIconArr = [];
        /**
         * 2个特权下的说明文本
         */
        _this.richTextArr = [];
        /**
         * 当前页的vip等级图标
         */
        _this.spriteVipIcon = null;
        /**
         * 当前页的vip等级下的特权文本
         */
        _this.labelTequanArr = [];
        /**
         * 激活按钮 和 已领取按钮，未领取按钮
         */
        _this.btnNodeArr = [];
        /**
         * 是否已经初始化
         */
        _this.hasInit = false;
        /**
         *是否可领取0未领取，1领取了
         */
        _this.status = 2;
        return _this;
    }
    VipView_1 = VipView;
    VipView.prototype.initView = function () {
        VipView_1.instance = this;
        this.spriteVipArr[0] = cc.find("top/vip0", this.node).getComponent(cc.Sprite);
        this.spriteVipArr[1] = cc.find("top/vip1", this.node).getComponent(cc.Sprite);
        this.richTextNextVip = cc.find("top/richText_vip", this.node).getComponent(cc.RichText);
        this.processBar = cc.find("top/process_di/progressBar", this.node).getComponent(cc.ProgressBar);
        this.labelJiasu = cc.find("top/label_jiasu", this.node).getComponent(cc.Label);
        this.richTextVip = cc.find("bottom/title/richText_vip", this.node).getComponent(cc.RichText);
        for (var i = 0; i < 2; i++) {
            this.spriteIconArr[i] = cc.find("bottom/item_" + i + "/icon", this.node).getComponent(cc.Sprite);
            this.richTextArr[i] = cc.find("bottom/item_" + i + "/richText_name", this.node).getComponent(cc.RichText);
        }
        var item3 = cc.find("bottom/item_2", this.node);
        if (item3) {
            this.richTextArr[2] = cc.find("richText_name", item3).getComponent(cc.RichText);
            this.btnNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "bottom/item_2/button_uplingqu", this.jihuoBtnFunc, this);
            this.btnNodeArr[0].active = false;
            this.btnNodeArr[1] = cc.find("button_yilingqu", item3);
            this.btnNodeArr[1].active = false;
            this.btnNodeArr[2] = Global.UIHelper.addCommonClick(this.node, "bottom/item_2/button_lingqu", this.ReqGetReward, this);
            this.btnNodeArr[2].active = false;
        }
        this.spriteVipIcon = cc.find("bottom/info_node/icon_vip", this.node).getComponent(cc.Sprite);
        for (var i = 0; i < 4; i++) {
            this.labelTequanArr[i] = cc.find("bottom/info_node/labelLayout/label_" + (i + 1), this.node).getComponent(cc.Label);
            this.labelTequanArr[i].node.active = false;
        }
        Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_jihuo", this.jihuoBtnFunc, this);
        // this.btnNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_yijihuo", this.jihuoBtnFunc, this);
        this.UpdateUI();
    };
    /**
     * 领取VIP等级奖励
     */
    VipView.prototype.ReqGetReward = function () {
        var _this = this;
        var param = {
            "level": this.vip,
        };
        Global.HallServer.send(NetAppface.mod, NetAppface.ReciveVipReward, param, function (data) {
            Global.UI.show("WndRebateGet", data.point);
            _this.status = data.status;
            _this.btnNodeArr[1].active = true;
            _this.btnNodeArr[2].active = false;
            _this.btnNodeArr[0].active = false;
            Global.Event.event(GlobalEvent.CHANGEVIP);
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        });
    };
    VipView.prototype.onDestroy = function () {
        VipView_1.instance = null;
    };
    /**
     * 初始化
     */
    VipView.prototype.init = function () {
    };
    /**
     * 更新界面
     */
    VipView.prototype.UpdateUI = function (list) {
        if (!this.richTextNextVip) {
            return;
        }
        var node = cc.find("bottom/info_node/button_jihuo", this.node);
        if (Global.PlayerData.vip >= this.vip) {
            node.active = false;
        }
        if (Global.PlayerData.vip > 0 && Global.PlayerData.vip < 4) {
            this.labelJiasu.node.active = true;
        }
        else {
            this.labelJiasu.node.active = false;
        }
        var myVip = Global.PlayerData.vip;
        var leftVip = this.vip - 1;
        var rightVip = this.vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }
        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel_1.default.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;
        if (vipNeedExp > 0) {
            this.richTextNextVip.string = "\u518D\u5145\u503C<color=#ff9485>" + vipNeedExp + "</color>\u5143\uFF0C\u5373\u53EF\u8FBE\u5230<color=#ffdb4a>VIP" + toVip + "</color>";
            // this.richTextNextVip.string = "<b>再充值<color=#9d5025>" +  + "</color>元，即可达到VIP" +  + "</b>";
            if (myVip < rightVip) {
                percent = Global.PlayerData.vipExp / vipUgradeExp;
            }
        }
        else {
            this.richTextNextVip.string = "<b>恭喜您已成为至尊VIP" + myVip + "</b>";
        }
        this.processBar.progress = percent;
        // if(this.hasInit)
        //     return;
        // this.hasInit = true;
        this.richTextVip.string = "VIP" + rightVip + "会员尊享";
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString0 = "vip_tq" + leftVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[0], atlasString, sfString0, null, false);
        var sfString1 = "vip_tq" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[1], atlasString, sfString1, null, false);
        Global.Toolkit.loadLocalHeadFrame(this.spriteIconArr[0], "" + rightVip);
        if (rightVip > 9) {
            this.richTextArr[1].string = "<b>V" + rightVip + "专属表情</b>";
            var sfPaotai = "biaoqing_" + rightVip;
            Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        }
        else {
            this.richTextArr[1].string = "<b>V" + rightVip + "捕鱼炮台</b>";
            var sfPaotai = "paotai_" + rightVip;
            Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        }
        if (this.richTextArr[2]) {
            if (list) {
                this.richTextArr[2].string = Global.Toolkit.GetMoneyFormat(list.point) + "元";
            }
        }
        var ngame = PlayerInfoModel_1.default.instance.vip_cfg[this.vip - 1];
        if (ngame) {
            if (ngame.ngame > 0) {
                this.labelTequanArr[1].string = "进入游戏后全场通报";
                this.labelTequanArr[1].node.active = true;
            }
        }
        Global.Toolkit.loadLocalVip(this.spriteVipIcon, rightVip);
        if (this.vip == 1) {
            this.labelTequanArr[0].string = "专属在线客服，24小时服务";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[2].node.active = true;
        }
        else if (this.vip > 1 && this.vip < 8) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        }
        else if (this.vip > 2 && this.vip < 8) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        }
        else if (this.vip > 7) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        }
        // if(PlayerInfoModel.instance.vipSubsidy != null && PlayerInfoModel.instance.vipSubsidyStatus == 1){ 
        //     let subsidy = PlayerInfoModel.instance.vipSubsidy[rightVip]
        //     this.labelTequanArr[2].string = "每日可领转运金" + subsidy.times + "次";
        // }
        var item3 = cc.find("bottom/item_2", this.node);
        if (item3) {
            if (list) {
                this.status = list.status;
            }
            if (myVip < rightVip) {
                this.btnNodeArr[0].active = true;
                this.btnNodeArr[1].active = false;
                this.btnNodeArr[2].active = false;
            }
            else {
                if (this.status == 0) {
                    this.btnNodeArr[2].active = true;
                    this.btnNodeArr[0].active = false;
                    this.btnNodeArr[1].active = false;
                }
                else if (this.status == 1) {
                    this.btnNodeArr[1].active = true;
                    this.btnNodeArr[2].active = false;
                    this.btnNodeArr[0].active = false;
                }
            }
        }
    };
    /**
     * 激活按钮 点击
     */
    VipView.prototype.jihuoBtnFunc = function () {
        HallBtnHelper_1.default.WndRechargeOpen();
    };
    var VipView_1;
    /**
     * 全局对象
     */
    VipView.instance = null;
    VipView = VipView_1 = __decorate([
        ccclass
    ], VipView);
    return VipView;
}(cc.Component));
exports.default = VipView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxvbGRWaXBWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZFQUF3RTtBQUN4RSw2REFBd0Q7QUFFbEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUFxQywyQkFBWTtJQUFqRDtRQUFBLHFFQStRQztRQXhRRzs7V0FFRztRQUNILFNBQUcsR0FBRyxDQUFDLENBQUM7UUFDUjs7V0FFRztRQUNILGtCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUMvQjs7V0FFRztRQUNILHFCQUFlLEdBQWdCLElBQUksQ0FBQztRQUNwQzs7V0FFRztRQUNILGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUNsQzs7V0FFRztRQUNILGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCOztXQUVHO1FBQ0gsaUJBQVcsR0FBZ0IsSUFBSSxDQUFDO1FBQ2hDOztXQUVHO1FBQ0gsbUJBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBQ2hDOztXQUVHO1FBQ0gsaUJBQVcsR0FBa0IsRUFBRSxDQUFDO1FBRWhDOztXQUVHO1FBQ0gsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFDaEM7O1dBRUc7UUFDSCxvQkFBYyxHQUFlLEVBQUUsQ0FBQztRQUNoQzs7V0FFRztRQUNILGdCQUFVLEdBQWMsRUFBRSxDQUFDO1FBRTNCOztXQUVHO1FBQ0gsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQjs7V0FFRztRQUNILFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBa05mLENBQUM7Z0JBL1FvQixPQUFPO0lBZ0VqQiwwQkFBUSxHQUFmO1FBQ0ksU0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENB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Um9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyRGF0YSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9kYXRhL1BsYXllckRhdGFcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4uL2hhbGwvdmlld3MvSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiB2aXDnibnmnYPkuIvnmoTljZXkuKpwYWdldmlld+inhuWbvlxyXG4gKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlwVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDlr7nosaFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOiBWaXBWaWV3ID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjXBhZ2XnmoR2aXBcclxuICAgICAqL1xyXG4gICAgdmlwID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog5bem5Y+zMuS4qnZpcOWbvuagh1xyXG4gICAgICovXHJcbiAgICBzcHJpdGVWaXBBcnI6IGNjLlNwcml0ZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOWIsOS4i+S4gOe6p3ZpcOeahOaPkOekuuaWh+acrFxyXG4gICAgICovXHJcbiAgICByaWNoVGV4dE5leHRWaXA6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5Yiw5LiL5LiA57qndmlw55qE6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICogdmlwNOWJjeavj+WkqeWKoOmAn+eahHRpcHPmlofmnKxcclxuICAgICAqL1xyXG4gICAgbGFiZWxKaWFzdTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmNcGFnZeS4i+eahHZpcOaWh+acrFxyXG4gICAgICovXHJcbiAgICByaWNoVGV4dFZpcDogY2MuUmljaFRleHQgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiAy5Liq54m55p2D5LiL55qEaWNvbuWbvuagh1xyXG4gICAgICovXHJcbiAgICBzcHJpdGVJY29uQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiAy5Liq54m55p2D5LiL55qE6K+05piO5paH5pysXHJcbiAgICAgKi9cclxuICAgIHJpY2hUZXh0QXJyOiBjYy5SaWNoVGV4dFtdID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3pobXnmoR2aXDnrYnnuqflm77moIdcclxuICAgICAqL1xyXG4gICAgc3ByaXRlVmlwSWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN6aG155qEdmlw562J57qn5LiL55qE54m55p2D5paH5pysXHJcbiAgICAgKi9cclxuICAgIGxhYmVsVGVxdWFuQXJyOiBjYy5MYWJlbFtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOa/gOa0u+aMiemSriDlkowg5bey6aKG5Y+W5oyJ6ZKu77yM5pyq6aKG5Y+W5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGJ0bk5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5bey57uP5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIGhhc0luaXQgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICrmmK/lkKblj6/pooblj5Yw5pyq6aKG5Y+W77yMMemihuWPluS6hlxyXG4gICAgICovXHJcbiAgICBzdGF0dXMgPSAyO1xyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgVmlwVmlldy5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVWaXBBcnJbMF0gPSBjYy5maW5kKFwidG9wL3ZpcDBcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwcml0ZVZpcEFyclsxXSA9IGNjLmZpbmQoXCJ0b3AvdmlwMVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cclxuICAgICAgICB0aGlzLnJpY2hUZXh0TmV4dFZpcCA9IGNjLmZpbmQoXCJ0b3AvcmljaFRleHRfdmlwXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIgPSBjYy5maW5kKFwidG9wL3Byb2Nlc3NfZGkvcHJvZ3Jlc3NCYXJcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsSmlhc3UgPSBjYy5maW5kKFwidG9wL2xhYmVsX2ppYXN1XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dFZpcCA9IGNjLmZpbmQoXCJib3R0b20vdGl0bGUvcmljaFRleHRfdmlwXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVJY29uQXJyW2ldID0gY2MuZmluZChcImJvdHRvbS9pdGVtX1wiICsgaSArIFwiL2ljb25cIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dEFycltpXSA9IGNjLmZpbmQoXCJib3R0b20vaXRlbV9cIiArIGkgKyBcIi9yaWNoVGV4dF9uYW1lXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpdGVtMyA9IGNjLmZpbmQoXCJib3R0b20vaXRlbV8yXCIsIHRoaXMubm9kZSlcclxuICAgICAgICBpZiAoaXRlbTMpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dEFyclsyXSA9IGNjLmZpbmQoXCJyaWNoVGV4dF9uYW1lXCIsIGl0ZW0zKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMF0gPSBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJvdHRvbS9pdGVtXzIvYnV0dG9uX3VwbGluZ3F1XCIsIHRoaXMuamlodW9CdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMV0gPSBjYy5maW5kKFwiYnV0dG9uX3lpbGluZ3F1XCIsIGl0ZW0zKVxyXG4gICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTm9kZUFyclsyXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYm90dG9tL2l0ZW1fMi9idXR0b25fbGluZ3F1XCIsIHRoaXMuUmVxR2V0UmV3YXJkLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVWaXBJY29uID0gY2MuZmluZChcImJvdHRvbS9pbmZvX25vZGUvaWNvbl92aXBcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyW2ldID0gY2MuZmluZChcImJvdHRvbS9pbmZvX25vZGUvbGFiZWxMYXlvdXQvbGFiZWxfXCIgKyAoaSArIDEpLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbaV0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJib3R0b20vaW5mb19ub2RlL2J1dHRvbl9qaWh1b1wiLCB0aGlzLmppaHVvQnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5idG5Ob2RlQXJyWzFdID0gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJib3R0b20vaW5mb19ub2RlL2J1dHRvbl95aWppaHVvXCIsIHRoaXMuamlodW9CdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmihuWPllZJUOetiee6p+WlluWKsVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVxR2V0UmV3YXJkKCkge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiB0aGlzLnZpcCxcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5SZWNpdmVWaXBSZXdhcmQsIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLnBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBkYXRhLnN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuTm9kZUFyclsyXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ0hBTkdFVklQKTtcclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgVmlwVmlldy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBVcGRhdGVVSShsaXN0PzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJpY2hUZXh0TmV4dFZpcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBub2RlID0gY2MuZmluZChcImJvdHRvbS9pbmZvX25vZGUvYnV0dG9uX2ppaHVvXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhLnZpcCA+PSB0aGlzLnZpcCkge1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEudmlwID4gMCAmJiBHbG9iYWwuUGxheWVyRGF0YS52aXAgPCA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxKaWFzdS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbEppYXN1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBteVZpcCA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcDtcclxuICAgICAgICB2YXIgbGVmdFZpcCA9IHRoaXMudmlwIC0gMTtcclxuICAgICAgICB2YXIgcmlnaHRWaXAgPSB0aGlzLnZpcDtcclxuICAgICAgICB2YXIgdG9WaXAgPSBteVZpcCArIDE7XHJcbiAgICAgICAgaWYgKG15VmlwIDwgcmlnaHRWaXApIHtcclxuICAgICAgICAgICAgbGVmdFZpcCA9IG15VmlwO1xyXG4gICAgICAgICAgICB0b1ZpcCA9IHJpZ2h0VmlwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHBlcmNlbnQgPSAxO1xyXG4gICAgICAgIHZhciB2aXBOZWVkRXhwID0gMDtcclxuICAgICAgICB2YXIgdmlwVWdyYWRlRXhwID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLkdldFZpcFVwZ3JhZGVFeHAodG9WaXApO1xyXG4gICAgICAgIHZhciB2aXBOZWVkRXhwID0gdmlwVWdyYWRlRXhwIC0gR2xvYmFsLlBsYXllckRhdGEudmlwRXhwO1xyXG5cclxuICAgICAgICBpZiAodmlwTmVlZEV4cCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dE5leHRWaXAuc3RyaW5nID0gYOWGjeWFheWAvDxjb2xvcj0jZmY5NDg1PiR7dmlwTmVlZEV4cH08L2NvbG9yPuWFg++8jOWNs+WPr+i+vuWIsDxjb2xvcj0jZmZkYjRhPlZJUCR7dG9WaXB9PC9jb2xvcj5gXHJcbiAgICAgICAgICAgIC8vIHRoaXMucmljaFRleHROZXh0VmlwLnN0cmluZyA9IFwiPGI+5YaN5YWF5YC8PGNvbG9yPSM5ZDUwMjU+XCIgKyAgKyBcIjwvY29sb3I+5YWD77yM5Y2z5Y+v6L6+5YiwVklQXCIgKyAgKyBcIjwvYj5cIjtcclxuICAgICAgICAgICAgaWYgKG15VmlwIDwgcmlnaHRWaXApIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnQgPSBHbG9iYWwuUGxheWVyRGF0YS52aXBFeHAgLyB2aXBVZ3JhZGVFeHA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpY2hUZXh0TmV4dFZpcC5zdHJpbmcgPSBcIjxiPuaBreWWnOaCqOW3suaIkOS4uuiHs+WwilZJUFwiICsgbXlWaXAgKyBcIjwvYj5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzQmFyLnByb2dyZXNzID0gcGVyY2VudDtcclxuXHJcbiAgICAgICAgLy8gaWYodGhpcy5oYXNJbml0KVxyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gdGhpcy5oYXNJbml0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dFZpcC5zdHJpbmcgPSBcIlZJUFwiICsgcmlnaHRWaXAgKyBcIuS8muWRmOWwiuS6q1wiO1xyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IFwiaGFsbC90ZXh0dXJlL2hhbGwvcGxheWVySW5mby9BdXRvQXRsYXNfcGxheWVyaW5mb1wiO1xyXG4gICAgICAgIC8vdmFyIGF0bGFzU3RyaW5nID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5wbGF5ZXJJbmZvQXRsYXNQYXRoO1xyXG4gICAgICAgIHZhciBzZlN0cmluZzAgPSBcInZpcF90cVwiICsgbGVmdFZpcDtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5zcHJpdGVWaXBBcnJbMF0sIGF0bGFzU3RyaW5nLCBzZlN0cmluZzAsIG51bGwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgdmFyIHNmU3RyaW5nMSA9IFwidmlwX3RxXCIgKyByaWdodFZpcDtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5zcHJpdGVWaXBBcnJbMV0sIGF0bGFzU3RyaW5nLCBzZlN0cmluZzEsIG51bGwsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lKHRoaXMuc3ByaXRlSWNvbkFyclswXSwgXCJcIiArIHJpZ2h0VmlwKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChyaWdodFZpcCA+IDkpIHtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dEFyclsxXS5zdHJpbmcgPSBcIjxiPlZcIiArIHJpZ2h0VmlwICsgXCLkuJPlsZ7ooajmg4U8L2I+XCI7XHJcbiAgICAgICAgICAgIHZhciBzZlBhb3RhaSA9IFwiYmlhb3FpbmdfXCIgKyByaWdodFZpcDtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlSWNvbkFyclsxXSwgYXRsYXNTdHJpbmcsIHNmUGFvdGFpLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJpY2hUZXh0QXJyWzFdLnN0cmluZyA9IFwiPGI+VlwiICsgcmlnaHRWaXAgKyBcIuaNlemxvOeCruWPsDwvYj5cIjtcclxuICAgICAgICAgICAgdmFyIHNmUGFvdGFpID0gXCJwYW90YWlfXCIgKyByaWdodFZpcDtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlSWNvbkFyclsxXSwgYXRsYXNTdHJpbmcsIHNmUGFvdGFpLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5yaWNoVGV4dEFyclsyXSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWNoVGV4dEFyclsyXS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChsaXN0LnBvaW50KSArIFwi5YWDXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5nYW1lID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmdbdGhpcy52aXAgLSAxXVxyXG4gICAgICAgIGlmIChuZ2FtZSkge1xyXG4gICAgICAgICAgICBpZiAobmdhbWUubmdhbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzFdLnN0cmluZyA9IFwi6L+b5YWl5ri45oiP5ZCO5YWo5Zy66YCa5oqlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzFdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5sb2FkTG9jYWxWaXAodGhpcy5zcHJpdGVWaXBJY29uLCByaWdodFZpcCk7XHJcbiAgICAgICAgaWYgKHRoaXMudmlwID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclswXS5zdHJpbmcgPSBcIuS4k+WxnuWcqOe6v+Wuouacje+8jDI05bCP5pe25pyN5YqhXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMF0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLnN0cmluZyA9IFwi5LiT5bGe5pSv5LuY6YCa6YGT77yM5pu05Yqg56iz5a6a5b+r5o23XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMl0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52aXAgPiAxICYmIHRoaXMudmlwIDwgOCkge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzBdLnN0cmluZyA9IFwi5rS75Yqo5Y+v6aKG5Y+W5pu05aSa5aWW5YqxXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMF0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLnN0cmluZyA9IFwi5LiT5bGe5Zyo57q/5a6i5pyN77yMMjTlsI/ml7bmnI3liqFcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclsyXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbM10uc3RyaW5nID0gXCLkuJPlsZ7mlK/ku5jpgJrpgZPvvIzmm7TliqDnqLPlrprlv6vmjbdcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclszXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpcCA+IDIgJiYgdGhpcy52aXAgPCA4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMF0uc3RyaW5nID0gXCLmtLvliqjlj6/pooblj5bmm7TlpJrlpZblirFcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclswXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMl0uc3RyaW5nID0gXCLkuJPlsZ7lnKjnur/lrqLmnI3vvIwyNOWwj+aXtuacjeWKoVwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclszXS5zdHJpbmcgPSBcIuS4k+WxnuaUr+S7mOmAmumBk++8jOabtOWKoOeos+WumuW/q+aNt1wiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzNdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmlwID4gNykge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzBdLnN0cmluZyA9IFwi5rS75Yqo5Y+v6aKG5Y+W5pu05aSa5aWW5YqxXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMF0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLnN0cmluZyA9IFwi5LiT5bGe5Zyo57q/5a6i5pyN77yMMjTlsI/ml7bmnI3liqFcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclsyXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbM10uc3RyaW5nID0gXCLkuJPlsZ7mlK/ku5jpgJrpgZPvvIzmm7TliqDnqLPlrprlv6vmjbdcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclszXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBTdWJzaWR5ICE9IG51bGwgJiYgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlTdGF0dXMgPT0gMSl7IFxyXG4gICAgICAgIC8vICAgICBsZXQgc3Vic2lkeSA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBTdWJzaWR5W3JpZ2h0VmlwXVxyXG4gICAgICAgIC8vICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLnN0cmluZyA9IFwi5q+P5pel5Y+v6aKG6L2s6L+Q6YeRXCIgKyBzdWJzaWR5LnRpbWVzICsgXCLmrKFcIjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgbGV0IGl0ZW0zID0gY2MuZmluZChcImJvdHRvbS9pdGVtXzJcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIGlmIChpdGVtMykge1xyXG4gICAgICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBsaXN0LnN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobXlWaXAgPCByaWdodFZpcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuTm9kZUFyclsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnRuTm9kZUFyclswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdHVzID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ0bk5vZGVBcnJbMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5Ob2RlQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmv4DmtLvmjInpkq4g54K55Ye7XHJcbiAgICAgKi9cclxuICAgIGppaHVvQnRuRnVuYygpIHtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZFJlY2hhcmdlT3BlbigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==