"use strict";
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