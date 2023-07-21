"use strict";
cc._RF.push(module, 'a06a8NiaRJJn5lWyMoMsXDI', 'VipViewUI');
// hall/scripts/logic/hall/ui/playerInfo/VipViewUI.ts

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
var VipViewUI = /** @class */ (function (_super) {
    __extends(VipViewUI, _super);
    function VipViewUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.index = 0;
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
        _this.curvipTitle = null;
        //  privilegeNode: cc.Node
        _this.currentSelect = 0;
        return _this;
    }
    VipViewUI.prototype.onLoad = function () {
        Global.Event.on("SHOWPREVILEGE", this, this.showPrevilege);
    };
    VipViewUI.prototype.initView = function () {
        this.playerModel = Global.ModelManager.getModel("PlayerInfoModel");
        this.spriteVipArr[0] = cc.find("top/vip0", this.node).getComponent(cc.Sprite);
        this.spriteVipArr[1] = cc.find("top/vip1", this.node).getComponent(cc.Sprite);
        // this.level = cc.find("top/level", this.node).getComponent(cc.Label);
        this.richTextNextVip = cc.find("top/richText_vip", this.node).getComponent(cc.RichText);
        this.processBar = cc.find("top/process_di/progressBar", this.node).getComponent(cc.ProgressBar);
        this.curvipTitle = cc.find("bottom/title/richText_vip", this.node).getComponent(cc.RichText);
        // this.giftBtn = cc.find("top/title/gift", this.node)
        // if(this.giftBtn)
        // {
        //     this.giftBtn.on("click", this.changePanel, this);
        // }
        // this.moreBtn = cc.find("top/title/more", this.node)
        // if(this.moreBtn)
        // {
        //     this.moreBtn.on("click", this.changePanel, this);
        // }
        Global.UIHelper.addCommonClick(this.node, "top/RechargeBtn", this.RechargeBtnFunc, this);
        // this.giftNode = cc.find("bottom/gift",this.node)
        // if(this.giftNode)
        // {
        //     this.giftViewUI = this.giftNode.getComponent(VipGiftView)
        //     if(this.giftViewUI)
        //     {
        //         this.giftViewUI.initView()
        //     }
        // }
        // this.privilegeNode = cc.find("bottom/more", this.node)
        // if (this.privilegeNode) {
        //     this.privilege = this.privilegeNode.getComponent(VipPrivilegeView)
        //     if (this.privilege) {
        //         this.privilege.initView()
        //     }
        // }
        // this.privilegeNode.active = false
        // this.btnNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_yijihuo", this.jihuoBtnFunc, this);
        // this.UpdateUI();
    };
    // changePanel(target) {
    //     if (target === 0) {
    //         this.privilegeNode.active = false
    //         this.giftNode.active = true
    //         this.giftViewUI.refreshUI(this.data, this.vip)
    //         //this.setToggleChecked(this.giftBtn, true)
    //         //this.setToggleChecked(this.moreBtn, false)
    //         this.currentSelect = 0
    //     }
    //     else if (target === 1){
    //         this.privilegeNode.active = true
    //         this.giftNode.active = false
    //         this.privilege.refreshUI(this.data, this.vip,this.vip)
    //         //this.setToggleChecked(this.giftBtn, false)
    //         //this.setToggleChecked(this.moreBtn, true)
    //         this.currentSelect = 1
    //     }
    //     else if (target.node &&target.node.name === "gift")
    //     {
    //         this.currentSelect = 0
    //         this.privilegeNode.active = false
    //         this.giftNode.active = true
    //         this.giftViewUI.refreshUI(this.data, this.vip)
    //         //this.setToggleChecked(this.giftBtn, true)
    //         //this.setToggleChecked(this.moreBtn, false)
    //         Global.Event.event("UPDATEJIANTOU","0")
    //     }
    //     else if (target.node &&target.node.name === "more")
    //     {
    //         this.currentSelect = 1
    //         this.privilegeNode.active = true
    //         this.giftNode.active = false
    //         this.privilege.refreshUI(this.data, this.vip,this.vip)
    //         //this.setToggleChecked(this.giftBtn, false)
    //         //this.setToggleChecked(this.moreBtn, true)
    //         Global.Event.event("UPDATEJIANTOU",1)
    //     }
    // }
    /**
     * 更新界面
     */
    VipViewUI.prototype.UpdateUI = function (data, index) {
        if (index === void 0) { index = 0; }
        this.data = data;
        var myVip = Global.PlayerData.vip;
        var leftVip = this.vip - 1;
        var rightVip = this.vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }
        //     this.level.string = `VIP${myVip}`
        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel_1.default.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;
        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel_1.default.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;
        if (vipNeedExp > 0) {
            //<outline color=#473472 width=2>再充值</outline><outline color=#7b4700 width=2><color=#FFD304>9136.08</color></outline><outline color=#473472 width=2>元，即可升级VIP7</outline>
            //再充值<color=#ff5551>XXX</color>元，即可达到<color = #3ac4a1>VIP4</c>
            //  this.richTextNextVip.string = `<outline color=#473472 width=2>再充值</outline><outline color=#7b4700 width=2><color=#FFD304>元，即可达到</color></outline><outline color=#473472 width=2>VIP${toVip}</outline>`
            this.richTextNextVip.string = "<font>\u518D\u5145\u503C<color=#ff6c00>" + vipNeedExp + "</color>\u5143\uFF0C\u5373\u53EF\u8FBE\u5230VIP" + toVip + "</color></font>";
            // this.richTextNextVip.string = "<b>再充值<color=#9d5025>" +  + "</color>元，即可达到VIP" +  + "</b>";
            if (myVip < rightVip) {
                percent = Global.PlayerData.vipExp / vipUgradeExp;
            }
        }
        else {
            //this.richTextNextVip.string = "<b><outline color=#315200 width=2>恭喜您已成为至尊VIP" + myVip + "</outline></b>";
            this.richTextNextVip.string = "<b>恭喜您已成为至尊<color=#ff6c00>VIP" + myVip + "</color></b>";
        }
        this.processBar.progress = percent;
        //var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var sfString0 = "vip_tq" + leftVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[0], atlasString, sfString0, null, false);
        var sfString1 = "vip_tq" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[1], atlasString, sfString1, null, false);
        this.curvipTitle.string = "<b>VIP" + toVip + "会员尊享</b>";
        // if(this.playerModel.vip_reward == 1)
        // {
        //     this.giftBtn.active = true
        //     this.moreBtn.active = true
        // }
        // else
        // {
        //     this.giftBtn.active = false
        //     this.moreBtn.active = true
        // }
        //    this.privilege.refreshUI(this.data, this.vip, this.vip)
        // this.privilegeNode.active = false
    };
    VipViewUI.prototype.onDestroy = function () {
        Global.Event.off("SHOWPREVILEGE", this, this.showPrevilege);
    };
    VipViewUI.prototype.showPrevilege = function (flag) {
        //   this.privilegeNode.active = flag
    };
    /**
     * 立即充值 点击
     */
    VipViewUI.prototype.RechargeBtnFunc = function () {
        HallBtnHelper_1.default.WndRechargeOpen();
    };
    VipViewUI = __decorate([
        ccclass
    ], VipViewUI);
    return VipViewUI;
}(cc.Component));
exports.default = VipViewUI;

cc._RF.pop();