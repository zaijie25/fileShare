
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/VipViewUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxWaXBWaWV3VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkVBQXdFO0FBQ3hFLDZEQUF3RDtBQUlsRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1Qzs7R0FFRztBQUVIO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBaU9DO1FBMU5HLFdBQUssR0FBRyxDQUFDLENBQUE7UUFDVDs7V0FFRztRQUNILFNBQUcsR0FBRyxDQUFDLENBQUM7UUFDUjs7V0FFRztRQUNILGtCQUFZLEdBQWdCLEVBQUUsQ0FBQztRQUkvQjs7V0FFRztRQUNILHFCQUFlLEdBQWdCLElBQUksQ0FBQztRQUNwQzs7V0FFRztRQUNILGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUsxQixpQkFBVyxHQUFlLElBQUksQ0FBQztRQVN6QywwQkFBMEI7UUFFeEIsbUJBQWEsR0FBRyxDQUFDLENBQUE7O0lBdUxyQixDQUFDO0lBckxHLDBCQUFNLEdBQU47UUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBRU0sNEJBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0UsdUVBQXVFO1FBRXRFLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7UUFHaEcsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdGLHNEQUFzRDtRQUN0RCxtQkFBbUI7UUFDbkIsSUFBSTtRQUNKLHdEQUF3RDtRQUN4RCxJQUFJO1FBQ0osc0RBQXNEO1FBQ3RELG1CQUFtQjtRQUNuQixJQUFJO1FBQ0osd0RBQXdEO1FBQ3hELElBQUk7UUFDSixNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFLekYsbURBQW1EO1FBQ25ELG9CQUFvQjtRQUNwQixJQUFJO1FBQ0osZ0VBQWdFO1FBQ2hFLDBCQUEwQjtRQUMxQixRQUFRO1FBQ1IscUNBQXFDO1FBQ3JDLFFBQVE7UUFDUixJQUFJO1FBR0oseURBQXlEO1FBQ3pELDRCQUE0QjtRQUM1Qix5RUFBeUU7UUFDekUsNEJBQTRCO1FBQzVCLG9DQUFvQztRQUNwQyxRQUFRO1FBQ1IsSUFBSTtRQUNKLG9DQUFvQztRQUVwQyw4SEFBOEg7UUFDOUgsbUJBQW1CO0lBQ3ZCLENBQUM7SUFJRCx3QkFBd0I7SUFDeEIsMEJBQTBCO0lBQzFCLDRDQUE0QztJQUM1QyxzQ0FBc0M7SUFDdEMseURBQXlEO0lBQ3pELHNEQUFzRDtJQUN0RCx1REFBdUQ7SUFDdkQsaUNBQWlDO0lBRWpDLFFBQVE7SUFDUiw4QkFBOEI7SUFDOUIsMkNBQTJDO0lBQzNDLHVDQUF1QztJQUN2QyxpRUFBaUU7SUFDakUsdURBQXVEO0lBQ3ZELHNEQUFzRDtJQUN0RCxpQ0FBaUM7SUFDakMsUUFBUTtJQUNSLDBEQUEwRDtJQUMxRCxRQUFRO0lBQ1IsaUNBQWlDO0lBQ2pDLDRDQUE0QztJQUM1QyxzQ0FBc0M7SUFDdEMseURBQXlEO0lBQ3pELHNEQUFzRDtJQUN0RCx1REFBdUQ7SUFDdkQsa0RBQWtEO0lBQ2xELFFBQVE7SUFDUiwwREFBMEQ7SUFDMUQsUUFBUTtJQUNSLGlDQUFpQztJQUNqQywyQ0FBMkM7SUFDM0MsdUNBQXVDO0lBQ3ZDLGlFQUFpRTtJQUNqRSx1REFBdUQ7SUFDdkQsc0RBQXNEO0lBQ3RELGdEQUFnRDtJQUNoRCxRQUFRO0lBRVIsSUFBSTtJQUlKOztPQUVHO0lBQ0gsNEJBQVEsR0FBUixVQUFTLElBQVUsRUFBRSxLQUFTO1FBQVQsc0JBQUEsRUFBQSxTQUFTO1FBRTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBRWhCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ2xDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxRQUFRLEVBQUU7WUFDbEIsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixLQUFLLEdBQUcsUUFBUSxDQUFDO1NBQ3BCO1FBQ04sd0NBQXdDO1FBQ25DLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcseUJBQWUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxVQUFVLEdBQUcsWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxZQUFZLEdBQUcseUJBQWUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxVQUFVLEdBQUcsWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUVoQix3S0FBd0s7WUFDeEssOERBQThEO1lBQzlELDBNQUEwTTtZQUMxTSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyw0Q0FBMkIsVUFBVSx1REFBb0IsS0FBSyxvQkFBaUIsQ0FBQTtZQUU3Ryw4RkFBOEY7WUFDOUYsSUFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFO2dCQUNsQixPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO2FBQ3JEO1NBQ0o7YUFBTTtZQUNILDJHQUEyRztZQUMzRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRywrQkFBK0IsR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO1NBQzFGO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRW5DLHNFQUFzRTtRQUV0RSxrRUFBa0U7UUFDbEUsSUFBSSxXQUFXLEdBQUcsbURBQW1ELENBQUM7UUFDdEUsSUFBSSxTQUFTLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hHLElBQUksU0FBUyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVoRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQztRQUNwRCx1Q0FBdUM7UUFDdkMsSUFBSTtRQUNKLGlDQUFpQztRQUNqQyxpQ0FBaUM7UUFDakMsSUFBSTtRQUNKLE9BQU87UUFDUCxJQUFJO1FBQ0osa0NBQWtDO1FBQ2xDLGlDQUFpQztRQUNqQyxJQUFJO1FBQ1IsNkRBQTZEO1FBQzFELG9DQUFvQztJQUV2QyxDQUFDO0lBQ0QsNkJBQVMsR0FBVDtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFFRCxpQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNqQixxQ0FBcUM7SUFDdEMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsbUNBQWUsR0FBZjtRQUNJLHVCQUFhLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQWhPZ0IsU0FBUztRQUQ3QixPQUFPO09BQ2EsU0FBUyxDQWlPN0I7SUFBRCxnQkFBQztDQWpPRCxBQWlPQyxDQWpPc0MsRUFBRSxDQUFDLFNBQVMsR0FpT2xEO2tCQWpPb0IsU0FBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBIYWxsQnRuSGVscGVyIGZyb20gXCIuLi9oYWxsL3ZpZXdzL0hhbGxCdG5IZWxwZXJcIjtcclxuaW1wb3J0IFZpcEdpZnRWaWV3IGZyb20gXCIuL1ZpcEdpZnRWaWV3XCI7XHJcbmltcG9ydCBWaXBQcml2aWxlZ2VWaWV3IGZyb20gXCIuL1ZpcFByaXZpbGVnZVZpZXdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKipcclxuICogdmlw54m55p2D5LiL55qE5Y2V5LiqcGFnZXZpZXfop4blm75cclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcFZpZXdVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgZGF0YTogYW55XHJcblxyXG4gICAgZ2lmdEJ0bjogY2MuTm9kZVxyXG4gICAgbW9yZUJ0bjogY2MuTm9kZVxyXG5cclxuICAgIGluZGV4ID0gMFxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY1wYWdl55qEdmlwXHJcbiAgICAgKi9cclxuICAgIHZpcCA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOW3puWPszLkuKp2aXDlm77moIdcclxuICAgICAqL1xyXG4gICAgc3ByaXRlVmlwQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG5cclxuXHJcbiAgICBwbGF5ZXJNb2RlbDogUGxheWVySW5mb01vZGVsXHJcbiAgICAvKipcclxuICAgICAqIOWIsOS4i+S4gOe6p3ZpcOeahOaPkOekuuaWh+acrFxyXG4gICAgICovXHJcbiAgICByaWNoVGV4dE5leHRWaXA6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5Yiw5LiL5LiA57qndmlw55qE6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHByb2Nlc3NCYXI6IGNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBnaWZ0Vmlld1VJOiBWaXBHaWZ0Vmlld1xyXG5cclxuICAgIHByaXZhdGUgY3VydmlwVGl0bGU6Y2MuUmljaFRleHQgPSBudWxsO1xyXG5cclxuICAvLyAgcHJpdmlsZWdlOiBWaXBQcml2aWxlZ2VWaWV3XHJcblxyXG4gICAgbGV2ZWw6IGNjLkxhYmVsXHJcblxyXG5cclxuICAgIGdpZnROb2RlOiBjYy5Ob2RlXHJcblxyXG4gIC8vICBwcml2aWxlZ2VOb2RlOiBjYy5Ob2RlXHJcblxyXG4gICAgY3VycmVudFNlbGVjdCA9IDBcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKFwiU0hPV1BSRVZJTEVHRVwiLCB0aGlzLCB0aGlzLnNob3dQcmV2aWxlZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgdGhpcy5zcHJpdGVWaXBBcnJbMF0gPSBjYy5maW5kKFwidG9wL3ZpcDBcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwcml0ZVZpcEFyclsxXSA9IGNjLmZpbmQoXCJ0b3AvdmlwMVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cclxuICAgICAgIC8vIHRoaXMubGV2ZWwgPSBjYy5maW5kKFwidG9wL2xldmVsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5yaWNoVGV4dE5leHRWaXAgPSBjYy5maW5kKFwidG9wL3JpY2hUZXh0X3ZpcFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzQmFyID0gY2MuZmluZChcInRvcC9wcm9jZXNzX2RpL3Byb2dyZXNzQmFyXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY3VydmlwVGl0bGUgPSBjYy5maW5kKFwiYm90dG9tL3RpdGxlL3JpY2hUZXh0X3ZpcFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuZ2lmdEJ0biA9IGNjLmZpbmQoXCJ0b3AvdGl0bGUvZ2lmdFwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgLy8gaWYodGhpcy5naWZ0QnRuKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5naWZ0QnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMubW9yZUJ0biA9IGNjLmZpbmQoXCJ0b3AvdGl0bGUvbW9yZVwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgLy8gaWYodGhpcy5tb3JlQnRuKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5tb3JlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidG9wL1JlY2hhcmdlQnRuXCIsIHRoaXMuUmVjaGFyZ2VCdG5GdW5jLCB0aGlzKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy8gdGhpcy5naWZ0Tm9kZSA9IGNjLmZpbmQoXCJib3R0b20vZ2lmdFwiLHRoaXMubm9kZSlcclxuICAgICAgICAvLyBpZih0aGlzLmdpZnROb2RlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5naWZ0Vmlld1VJID0gdGhpcy5naWZ0Tm9kZS5nZXRDb21wb25lbnQoVmlwR2lmdFZpZXcpXHJcbiAgICAgICAgLy8gICAgIGlmKHRoaXMuZ2lmdFZpZXdVSSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5naWZ0Vmlld1VJLmluaXRWaWV3KClcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMucHJpdmlsZWdlTm9kZSA9IGNjLmZpbmQoXCJib3R0b20vbW9yZVwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgLy8gaWYgKHRoaXMucHJpdmlsZWdlTm9kZSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnByaXZpbGVnZSA9IHRoaXMucHJpdmlsZWdlTm9kZS5nZXRDb21wb25lbnQoVmlwUHJpdmlsZWdlVmlldylcclxuICAgICAgICAvLyAgICAgaWYgKHRoaXMucHJpdmlsZWdlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnByaXZpbGVnZS5pbml0VmlldygpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5wcml2aWxlZ2VOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcblxyXG4gICAgICAgIC8vIHRoaXMuYnRuTm9kZUFyclsxXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYm90dG9tL2luZm9fbm9kZS9idXR0b25feWlqaWh1b1wiLCB0aGlzLmppaHVvQnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8gY2hhbmdlUGFuZWwodGFyZ2V0KSB7XHJcbiAgICAvLyAgICAgaWYgKHRhcmdldCA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLnByaXZpbGVnZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgIC8vICAgICAgICAgdGhpcy5naWZ0Tm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2lmdFZpZXdVSS5yZWZyZXNoVUkodGhpcy5kYXRhLCB0aGlzLnZpcClcclxuICAgIC8vICAgICAgICAgLy90aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5naWZ0QnRuLCB0cnVlKVxyXG4gICAgLy8gICAgICAgICAvL3RoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm1vcmVCdG4sIGZhbHNlKVxyXG4gICAgLy8gICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3QgPSAwXHJcblxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlIGlmICh0YXJnZXQgPT09IDEpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLnByaXZpbGVnZU5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgIHRoaXMucHJpdmlsZWdlLnJlZnJlc2hVSSh0aGlzLmRhdGEsIHRoaXMudmlwLHRoaXMudmlwKVxyXG4gICAgLy8gICAgICAgICAvL3RoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLmdpZnRCdG4sIGZhbHNlKVxyXG4gICAgLy8gICAgICAgICAvL3RoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm1vcmVCdG4sIHRydWUpXHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdCA9IDFcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgZWxzZSBpZiAodGFyZ2V0Lm5vZGUgJiZ0YXJnZXQubm9kZS5uYW1lID09PSBcImdpZnRcIilcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdCA9IDBcclxuICAgIC8vICAgICAgICAgdGhpcy5wcml2aWxlZ2VOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgIHRoaXMuZ2lmdE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICB0aGlzLmdpZnRWaWV3VUkucmVmcmVzaFVJKHRoaXMuZGF0YSwgdGhpcy52aXApXHJcbiAgICAvLyAgICAgICAgIC8vdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMuZ2lmdEJ0biwgdHJ1ZSlcclxuICAgIC8vICAgICAgICAgLy90aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5tb3JlQnRuLCBmYWxzZSlcclxuICAgIC8vICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KFwiVVBEQVRFSklBTlRPVVwiLFwiMFwiKVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNlIGlmICh0YXJnZXQubm9kZSAmJnRhcmdldC5ub2RlLm5hbWUgPT09IFwibW9yZVwiKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ID0gMVxyXG4gICAgLy8gICAgICAgICB0aGlzLnByaXZpbGVnZU5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgLy8gICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAvLyAgICAgICAgIHRoaXMucHJpdmlsZWdlLnJlZnJlc2hVSSh0aGlzLmRhdGEsIHRoaXMudmlwLHRoaXMudmlwKVxyXG4gICAgLy8gICAgICAgICAvL3RoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLmdpZnRCdG4sIGZhbHNlKVxyXG4gICAgLy8gICAgICAgICAvL3RoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm1vcmVCdG4sIHRydWUpXHJcbiAgICAvLyAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChcIlVQREFURUpJQU5UT1VcIiwxKVxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBVcGRhdGVVSShkYXRhPzogYW55LCBpbmRleCA9IDApIHtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG5cclxuICAgICAgICB2YXIgbXlWaXAgPSBHbG9iYWwuUGxheWVyRGF0YS52aXA7XHJcbiAgICAgICAgdmFyIGxlZnRWaXAgPSB0aGlzLnZpcCAtIDE7XHJcbiAgICAgICAgdmFyIHJpZ2h0VmlwID0gdGhpcy52aXA7XHJcbiAgICAgICAgdmFyIHRvVmlwID0gbXlWaXAgKyAxO1xyXG4gICAgICAgIGlmIChteVZpcCA8IHJpZ2h0VmlwKSB7XHJcbiAgICAgICAgICAgIGxlZnRWaXAgPSBteVZpcDtcclxuICAgICAgICAgICAgdG9WaXAgPSByaWdodFZpcDtcclxuICAgICAgICB9XHJcbiAgIC8vICAgICB0aGlzLmxldmVsLnN0cmluZyA9IGBWSVAke215VmlwfWBcclxuICAgICAgICB2YXIgcGVyY2VudCA9IDE7XHJcbiAgICAgICAgdmFyIHZpcE5lZWRFeHAgPSAwO1xyXG4gICAgICAgIHZhciB2aXBVZ3JhZGVFeHAgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuR2V0VmlwVXBncmFkZUV4cCh0b1ZpcCk7XHJcbiAgICAgICAgdmFyIHZpcE5lZWRFeHAgPSB2aXBVZ3JhZGVFeHAgLSBHbG9iYWwuUGxheWVyRGF0YS52aXBFeHA7XHJcblxyXG4gICAgICAgIHZhciBwZXJjZW50ID0gMTtcclxuICAgICAgICB2YXIgdmlwTmVlZEV4cCA9IDA7XHJcbiAgICAgICAgdmFyIHZpcFVncmFkZUV4cCA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5HZXRWaXBVcGdyYWRlRXhwKHRvVmlwKTtcclxuICAgICAgICB2YXIgdmlwTmVlZEV4cCA9IHZpcFVncmFkZUV4cCAtIEdsb2JhbC5QbGF5ZXJEYXRhLnZpcEV4cDtcclxuXHJcbiAgICAgICAgaWYgKHZpcE5lZWRFeHAgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLzxvdXRsaW5lIGNvbG9yPSM0NzM0NzIgd2lkdGg9Mj7lho3lhYXlgLw8L291dGxpbmU+PG91dGxpbmUgY29sb3I9IzdiNDcwMCB3aWR0aD0yPjxjb2xvcj0jRkZEMzA0PjkxMzYuMDg8L2NvbG9yPjwvb3V0bGluZT48b3V0bGluZSBjb2xvcj0jNDczNDcyIHdpZHRoPTI+5YWD77yM5Y2z5Y+v5Y2H57qnVklQNzwvb3V0bGluZT5cclxuICAgICAgICAgICAgLy/lho3lhYXlgLw8Y29sb3I9I2ZmNTU1MT5YWFg8L2NvbG9yPuWFg++8jOWNs+WPr+i+vuWIsDxjb2xvciA9ICMzYWM0YTE+VklQNDwvYz5cclxuICAgICAgICAgICAgLy8gIHRoaXMucmljaFRleHROZXh0VmlwLnN0cmluZyA9IGA8b3V0bGluZSBjb2xvcj0jNDczNDcyIHdpZHRoPTI+5YaN5YWF5YC8PC9vdXRsaW5lPjxvdXRsaW5lIGNvbG9yPSM3YjQ3MDAgd2lkdGg9Mj48Y29sb3I9I0ZGRDMwND7lhYPvvIzljbPlj6/ovr7liLA8L2NvbG9yPjwvb3V0bGluZT48b3V0bGluZSBjb2xvcj0jNDczNDcyIHdpZHRoPTI+VklQJHt0b1ZpcH08L291dGxpbmU+YFxyXG4gICAgICAgICAgICB0aGlzLnJpY2hUZXh0TmV4dFZpcC5zdHJpbmcgPSBgPGZvbnQ+5YaN5YWF5YC8PGNvbG9yPSNmZjZjMDA+JHt2aXBOZWVkRXhwfTwvY29sb3I+5YWD77yM5Y2z5Y+v6L6+5YiwVklQJHt0b1ZpcH08L2NvbG9yPjwvZm9udD5gXHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzLnJpY2hUZXh0TmV4dFZpcC5zdHJpbmcgPSBcIjxiPuWGjeWFheWAvDxjb2xvcj0jOWQ1MDI1PlwiICsgICsgXCI8L2NvbG9yPuWFg++8jOWNs+WPr+i+vuWIsFZJUFwiICsgICsgXCI8L2I+XCI7XHJcbiAgICAgICAgICAgIGlmIChteVZpcCA8IHJpZ2h0VmlwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gR2xvYmFsLlBsYXllckRhdGEudmlwRXhwIC8gdmlwVWdyYWRlRXhwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy90aGlzLnJpY2hUZXh0TmV4dFZpcC5zdHJpbmcgPSBcIjxiPjxvdXRsaW5lIGNvbG9yPSMzMTUyMDAgd2lkdGg9Mj7mga3llpzmgqjlt7LmiJDkuLroh7PlsIpWSVBcIiArIG15VmlwICsgXCI8L291dGxpbmU+PC9iPlwiO1xyXG4gICAgICAgICAgICB0aGlzLnJpY2hUZXh0TmV4dFZpcC5zdHJpbmcgPSBcIjxiPuaBreWWnOaCqOW3suaIkOS4uuiHs+Wwijxjb2xvcj0jZmY2YzAwPlZJUFwiICsgbXlWaXAgKyBcIjwvY29sb3I+PC9iPlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIucHJvZ3Jlc3MgPSBwZXJjZW50O1xyXG5cclxuICAgICAgICAvL3ZhciBhdGxhc1N0cmluZyA9IFwiaGFsbC90ZXh0dXJlL2hhbGwvdmlwX2F1dG9fYXRsYXMvdmlwX2F1dG9fYXRsYXNcIjtcclxuXHJcbiAgICAgICAgLy92YXIgYXRsYXNTdHJpbmcgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnBsYXllckluZm9BdGxhc1BhdGg7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvaGFsbC9wbGF5ZXJJbmZvL0F1dG9BdGxhc19wbGF5ZXJpbmZvXCI7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nMCA9IFwidmlwX3RxXCIgKyBsZWZ0VmlwO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNwcml0ZVZpcEFyclswXSwgYXRsYXNTdHJpbmcsIHNmU3RyaW5nMCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIHZhciBzZlN0cmluZzEgPSBcInZpcF90cVwiICsgcmlnaHRWaXA7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlVmlwQXJyWzFdLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcxLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHRoaXMuY3VydmlwVGl0bGUuc3RyaW5nID0gXCI8Yj5WSVBcIit0b1ZpcCtcIuS8muWRmOWwiuS6qzwvYj5cIjtcclxuICAgICAgICAvLyBpZih0aGlzLnBsYXllck1vZGVsLnZpcF9yZXdhcmQgPT0gMSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ2lmdEJ0bi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgLy8gICAgIHRoaXMubW9yZUJ0bi5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2VcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ2lmdEJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIC8vICAgICB0aGlzLm1vcmVCdG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIC8vIH1cclxuICAgIC8vICAgIHRoaXMucHJpdmlsZWdlLnJlZnJlc2hVSSh0aGlzLmRhdGEsIHRoaXMudmlwLCB0aGlzLnZpcClcclxuICAgICAgIC8vIHRoaXMucHJpdmlsZWdlTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKFwiU0hPV1BSRVZJTEVHRVwiLCB0aGlzLCB0aGlzLnNob3dQcmV2aWxlZ2UpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ByZXZpbGVnZShmbGFnKSB7XHJcbiAgICAgLy8gICB0aGlzLnByaXZpbGVnZU5vZGUuYWN0aXZlID0gZmxhZ1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnq4vljbPlhYXlgLwg54K55Ye7XHJcbiAgICAgKi9cclxuICAgIFJlY2hhcmdlQnRuRnVuYygpIHtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZFJlY2hhcmdlT3BlbigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==