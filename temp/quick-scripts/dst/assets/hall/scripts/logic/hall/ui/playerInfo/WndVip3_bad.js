
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndVip3_bad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8f38bsOJAFFUbN8HvCqaWN4', 'WndVip3_bad');
// hall/scripts/logic/hall/ui/playerInfo/WndVip3_bad.ts

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
exports.ItemType = exports.AwardBtnState = void 0;
var WndBase_1 = require("../../../core/ui/WndBase");
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var VipGiftView_1 = require("./VipGiftView");
var VipViewUI_1 = require("./VipViewUI");
var WndVip3 = /** @class */ (function (_super) {
    __extends(WndVip3, _super);
    function WndVip3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 滑动容器
         */
        _this.pageView = null;
        /**
         * pageview对象数组
         */
        _this.vipViewArr = [];
        _this.banned = false;
        _this.currentSelect = 0;
        /**
         * 左右箭头数组
         */
        _this.jiantouNodeArr = [];
        _this.itemNode = null;
        _this.vipCount = 15;
        _this._uiInit = false;
        /**
         * 当前显示的页面
         */
        _this.LockvipView = -1;
        return _this;
    }
    Object.defineProperty(WndVip3.prototype, "uiInit", {
        get: function () {
            return this._uiInit;
        },
        set: function (val) {
            this._uiInit = val;
            if (val)
                this.UpdateUI();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化脚本
     */
    WndVip3.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndVip3";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/VipUI3";
        // this.destoryType = DestoryType.ChangeScene;
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndVip3.prototype.onDispose = function () {
        this.vipViewArr = [];
        this.VipReward = null;
        this.uiInit = false;
        Global.Event.off(GlobalEvent.UPDATEVIPDATA, this, this.updateData);
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI);
    };
    /**
     * 初始化UI
     */
    WndVip3.prototype.initView = function () {
        var _this = this;
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.pageView = cc.find("pageview", this.node).getComponent(cc.PageView);
        this.pageView.node.on("page-turning", this.PageTurnCallback, this);
        Global.UIHelper.addCommonClick(this.node, "gift/info_node/rule", this.openRule, this);
        this.itemNode = cc.find("pageview/view/content/page_1", this.node);
        this.itemNode.active = false;
        this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel_1.default.instance.vip_cfg.length;
        var index = 1;
        this.vipCount = PlayerInfoModel_1.default.instance.vip_cfg.length + 1;
        this.giftNode = this.getChild("gift");
        if (this.giftNode) {
            this.giftViewUI = this.giftNode.getComponent(VipGiftView_1.default);
            if (this.giftViewUI) {
                this.giftViewUI.initView();
            }
        }
        this.layout = cc.find("title", this.node).getComponent(cc.Layout);
        this.giftBtn = cc.find("title/gift", this.node);
        if (this.giftBtn) {
            this.giftBtn.on("click", this.changePanel, this);
        }
        this.moreBtn = cc.find("title/more", this.node);
        if (this.moreBtn) {
            this.moreBtn.on("click", this.changePanel, this);
        }
        Global.Component.schedule(function () {
            if (index > _this.vipCount) {
                _this.itemNode.parent.width = _this.itemNode.width * PlayerInfoModel_1.default.instance.vip_cfg.length;
                //this.PageTurnCallback();
                _this.uiInit = true;
                return;
            }
            var end = index + 1;
            var begin = index;
            for (var i = begin; i < end; i++) {
                if (i >= _this.vipCount) {
                    index++;
                    return;
                }
                var item = cc.instantiate(_this.itemNode);
                item.name = "page_" + index;
                item.active = true;
                item.x = (index - 1) * _this.itemNode.width;
                var vipView = item.getComponent(VipViewUI_1.default);
                vipView.vip = index;
                vipView.initView();
                _this.vipViewArr.push(vipView);
                //  item.active = false;
                item.setParent(_this.itemNode.parent);
                index++;
            }
        }, 0, this.vipCount);
        this.jiantouNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "jiantou_left", this.leftBtnFunc, this);
        this.jiantouNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "jiantou_right", this.rightBtnFunc, this);
        var scaleValue = 1.2;
        var time = 0.8;
        var ac1 = cc.scaleTo(time, scaleValue, scaleValue);
        var ac2 = cc.scaleTo(time, 1, 1);
        var seq = cc.sequence(ac1, ac2);
        var action = cc.repeatForever(seq);
        this.jiantouNodeArr[1].runAction(action);
        var ac1 = cc.scaleTo(time, scaleValue, scaleValue);
        var ac2 = cc.scaleTo(time, 1, 1);
        var seq = cc.sequence(ac1, ac2);
        var action = cc.repeatForever(seq);
        this.jiantouNodeArr[0].runAction(action);
        // this.itemNode.parent.children[0].active = true;
    };
    /**
     * 界面打开回调
     */
    WndVip3.prototype.onOpen = function () {
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI);
        Global.Event.on(GlobalEvent.UPDATEVIPDATA, this, this.updateData);
        // this.pageView.node.active = false;
        // this.UpdateJiantou();
        // if (this.uiInit)
        //     this.OnDataPrepared();
        //this.PageTurnCallback()
        this.LockvipView = Global.PlayerData.vip;
        if (this.uiInit)
            this.UpdateUI();
    };
    WndVip3.prototype.updateData = function (data) {
        if (!data)
            return;
        var index = data.index;
        var type = data.type;
        if (type === 0) {
            if (this.VipReward.list.length > index)
                this.VipReward.list[index].status = 1;
        }
        else if (type === 1) {
            this.VipReward.week.last_get = 1;
        }
        else if (type === 2) {
            this.VipReward.month.last_get = 1;
        }
        this.UpdateUI();
    };
    WndVip3.prototype.openAnimFinish = function () {
        // this.pageView.node.active = true;
        // this.UpdateUI();
    };
    WndVip3.prototype.openRule = function (node, arg1, openRule, arg3) {
        Global.UI.show("WndVipRule");
    };
    /**
     * 界面关闭回调
     */
    WndVip3.prototype.onClose = function () {
        this.VipReward = null;
        this.pageView.enabled = true;
        Global.Event.event("SHOWPREVILEGE", true);
        this.giftNode.active = false;
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI);
        Global.Event.off(GlobalEvent.UPDATEVIPDATA, this, this.updateData);
    };
    WndVip3.prototype.changePanel = function (target) {
        var _this = this;
        if (target === 0) {
            this.giftNode.active = true;
            this.setToggleChecked(this.giftBtn, true);
            this.setToggleChecked(this.moreBtn, false);
            this.moreBtn.setSiblingIndex(0);
            this.giftBtn.setSiblingIndex(1);
            Global.Event.event("SHOWPREVILEGE", false);
            this.giftViewUI.refreshUI(this.VipReward, this.LockvipView);
            this.currentSelect = 0;
            setTimeout(function () {
                _this.UpdateJiantou("0");
            }, 100);
        }
        else if (target === 1) {
            this.moreBtn.setSiblingIndex(1);
            this.giftBtn.setSiblingIndex(0);
            this.giftNode.active = false;
            this.setToggleChecked(this.giftBtn, false);
            this.setToggleChecked(this.moreBtn, true);
            Global.Event.event("SHOWPREVILEGE", true);
            this.currentSelect = 1;
            this.UpdateJiantou();
        }
        else if (target.node && target.node.name === "gift") {
            this.moreBtn.setSiblingIndex(0);
            this.giftBtn.setSiblingIndex(1);
            this.currentSelect = 0;
            this.giftNode.active = true;
            this.giftViewUI.refreshUI(this.VipReward, this.LockvipView);
            Global.Event.event("SHOWPREVILEGE", false);
            this.setToggleChecked(this.giftBtn, true);
            this.setToggleChecked(this.moreBtn, false);
            this.UpdateJiantou("0");
        }
        else if (target.node && target.node.name === "more") {
            this.moreBtn.setSiblingIndex(1);
            this.giftBtn.setSiblingIndex(0);
            this.currentSelect = 1;
            this.giftNode.active = false;
            Global.Event.event("SHOWPREVILEGE", true);
            this.setToggleChecked(this.giftBtn, false);
            this.setToggleChecked(this.moreBtn, true);
            this.UpdateJiantou();
        }
    };
    /**
     * 关闭按钮点击
     */
    WndVip3.prototype.closeBtnFunc = function () {
        this.close();
    };
    /**
     * 更新界面
     */
    WndVip3.prototype.UpdateUI = function () {
        var _this = this;
        if (!PlayerInfoModel_1.default.instance.vip_reward) {
            if (this.layout) {
                this.layout.enabled = true;
            }
            for (var i = 0; i < this.vipViewArr.length; i++) {
                var vipView = this.vipViewArr[i];
                vipView.UpdateUI(this.VipReward, i);
            }
            this.OnDataPrepared();
            if (this.LockvipView <= 0) {
                this.LockvipView = Global.PlayerData.vip;
            }
            if (this.LockvipView >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
                this.LockvipView = PlayerInfoModel_1.default.instance.vipExpArr.length - 1;
            }
            Global.Event.event(GlobalEvent.VIPREWARD, null);
            this.pageView.scrollToPage(this.LockvipView, 0.01);
            this.closeNotNeedItem();
            this.giftNode.active = false;
            this.giftBtn.active = false;
            Global.Event.event("SHOWPREVILEGE", true);
            return;
        }
        if (this.VipReward) {
            if (this.layout) {
                this.layout.enabled = false;
            }
            var status = 0;
            for (var i = 0; i < this.vipViewArr.length; i++) {
                var vipView = this.vipViewArr[i];
                if (this.VipReward.list && i < this.VipReward.list.length && this.VipReward.list[i]) {
                    vipView.UpdateUI(this.VipReward, i);
                    if (this.VipReward.list[i].status === 0 && Global.PlayerData.vip >= this.VipReward.list[i].level) {
                        status = 1;
                    }
                }
            }
            PlayerInfoModel_1.default.instance.is_vip_reward = status;
            this.checkReward(this.VipReward);
            if (this.LockvipView <= 0) {
                this.LockvipView = Global.PlayerData.vip;
            }
            if (this.LockvipView >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
                this.LockvipView = PlayerInfoModel_1.default.instance.vipExpArr.length - 1;
            }
            Global.Event.event(GlobalEvent.VIPREWARD, null);
            this.pageView.scrollToPage(this.LockvipView, 0.01);
            this.closeNotNeedItem();
            if (PlayerInfoModel_1.default.instance.vip_reward === 1) {
                this.changePanel(0);
            }
            else {
                this.changePanel(1);
            }
            return;
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.NewCheckVipReward, null, function (data) {
            if (data.list) {
                if (_this.layout) {
                    _this.layout.enabled = false;
                }
                _this.VipReward = data;
                var status = 0;
                _this.OnDataPrepared();
                var count = 0;
                for (var i = 0; i < _this.vipViewArr.length; i++) {
                    count += 1;
                    var vipView = _this.vipViewArr[i];
                    if (_this.VipReward.list && i < _this.VipReward.list.length && _this.VipReward.list[i]) {
                        vipView.UpdateUI(_this.VipReward, i);
                        if (_this.VipReward.list[i].status == 0 && Global.PlayerData.vip >= _this.VipReward.list[i].level) {
                            status = 1;
                        }
                    }
                }
                PlayerInfoModel_1.default.instance.is_vip_reward = status;
                _this.checkReward(_this.VipReward);
                Global.Event.event(GlobalEvent.VIPREWARD, null);
                if (_this.LockvipView <= 0) {
                    _this.LockvipView = Global.PlayerData.vip;
                }
                if (_this.LockvipView >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
                    _this.LockvipView = PlayerInfoModel_1.default.instance.vipExpArr.length - 1;
                }
                _this.pageView.scrollToPage(_this.LockvipView, 0.01);
                _this.closeNotNeedItem();
                if (PlayerInfoModel_1.default.instance.vip_reward === 1) {
                    _this.changePanel(0);
                }
                else {
                    _this.changePanel(1);
                }
            }
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "WndVip3");
            // console.log(error);
        }, false);
    };
    WndVip3.prototype.closeNotNeedItem = function () {
        //关闭不显示的item
        var index = this.LockvipView;
        for (var i = 0; i < this.vipViewArr.length; i++) {
            if (i < index - 1 || i > index + 1)
                this.vipViewArr[i].node.active = false;
            else {
                this.vipViewArr[i].node.active = true;
            }
        }
    };
    WndVip3.prototype.checkReward = function (data) {
        if (!data) {
            return;
        }
        var weekData = data.week;
        var month = data.month;
        if (!weekData.last_get) {
            PlayerInfoModel_1.default.instance.is_week_reward = 1;
        }
        else {
            PlayerInfoModel_1.default.instance.is_week_reward = 0;
        }
        if (!month.last_get) {
            PlayerInfoModel_1.default.instance.is_month_reward = 1;
        }
        else {
            PlayerInfoModel_1.default.instance.is_month_reward = 0;
        }
    };
    /**
     * 通知更新界面
     */
    WndVip3.prototype.UseInfoUpdateUI = function () {
        Global.HallServer.clearCache(NetAppface.mod, NetAppface.NewCheckVipReward, null);
        this.VipReward = null;
        this.UpdateUI();
    };
    /**
     * 更新箭头
     */
    WndVip3.prototype.UpdateJiantou = function (flag) {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        this.pageView.enabled = true;
        if (index > this.vipCount - 1)
            index = this.vipCount - 1;
        if (index <= 0) {
            this.jiantouNodeArr[0].active = false;
            this.jiantouNodeArr[1].active = true;
        }
        else if (index >= PlayerInfoModel_1.default.instance.vip_cfg.length - 1) {
            this.jiantouNodeArr[0].active = true;
            this.jiantouNodeArr[1].active = false;
        }
        else {
            this.jiantouNodeArr[0].active = true;
            this.jiantouNodeArr[1].active = true;
        }
        if (flag === "0") // 等于0表示特权礼包界面 需要隐藏镜头 并关闭pageVIEW
         {
            this.jiantouNodeArr[0].active = false;
            this.jiantouNodeArr[1].active = false;
            this.pageView.enabled = false;
        }
        // this.OnDataPrepared()
    };
    WndVip3.prototype.setJiantouActive = function (flag) {
        this.jiantouNodeArr[0].active = flag;
        this.jiantouNodeArr[1].active = flag;
    };
    /**
     * 翻页事件回调
     */
    WndVip3.prototype.PageTurnCallback = function (event) {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        this.pageView.content.width = PlayerInfoModel_1.default.instance.vip_cfg.length * this.itemNode.width;
        if (index > this.vipCount - 1) {
            index = this.vipCount - 1;
        }
        for (var i = 0; i < this.vipViewArr.length; i++) {
            if (i < index - 1 || i > index + 1)
                this.vipViewArr[i].node.active = false;
            else {
                this.vipViewArr[i].node.active = true;
            }
        }
        this.UpdateJiantou();
        // if(this.vipViewArr[index] && this.vipViewArr[index].currentSelect === 0)
        // {
        //     this.vipViewArr[index].changePanel(0)
        //     this.UpdateJiantou("0")
        // }
        // else if(this.vipViewArr[index] && this.vipViewArr[index].currentSelect === 1)
        // {
        //     this.vipViewArr[index].changePanel(1)
        //     this.UpdateJiantou()
        // }
    };
    /**
     * 左箭头 点击
     */
    WndVip3.prototype.leftBtnFunc = function () {
        Global.Event.event("SHOWPREVILEGE", true);
        this.giftNode.active = false;
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index > 0) {
            this.pageView.scrollToPage(index - 1, 0.3);
        }
    };
    /**
     * 右箭头 点击
     */
    WndVip3.prototype.rightBtnFunc = function () {
        Global.Event.event("SHOWPREVILEGE", true);
        this.giftNode.active = false;
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index < PlayerInfoModel_1.default.instance.vip_cfg.length - 1) {
            this.pageView.scrollToPage(index + 1, 0.3);
        }
    };
    WndVip3.prototype.setToggleChecked = function (targe, flag) {
        var check = targe.getChildByName("check");
        var normal = targe.getChildByName("unchecked");
        if (check) {
            check.active = flag;
        }
        if (normal) {
            normal.active = !flag;
        }
    };
    return WndVip3;
}(WndBase_1.default));
exports.default = WndVip3;
var AwardBtnState;
(function (AwardBtnState) {
    AwardBtnState[AwardBtnState["NOTREADY"] = 0] = "NOTREADY";
    AwardBtnState[AwardBtnState["READY"] = 1] = "READY";
    AwardBtnState[AwardBtnState["ACHIEVED"] = 2] = "ACHIEVED";
    AwardBtnState[AwardBtnState["REACHED"] = 3] = "REACHED"; // 已领取 
})(AwardBtnState = exports.AwardBtnState || (exports.AwardBtnState = {}));
var ItemType;
(function (ItemType) {
    ItemType[ItemType["LEVEL"] = 0] = "LEVEL";
    ItemType[ItemType["WEEK"] = 1] = "WEEK";
    ItemType[ItemType["MONTH"] = 2] = "MONTH";
})(ItemType = exports.ItemType || (exports.ItemType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRWaXAzX2JhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBQ2hFLDZFQUF3RTtBQUN4RSw2Q0FBd0M7QUFFeEMseUNBQW9DO0FBRXBDO0lBQXFDLDJCQUFPO0lBQTVDO1FBQUEscUVBK2lCQztRQTlpQkc7O1dBRUc7UUFDSCxjQUFRLEdBQWdCLElBQUksQ0FBQztRQUc3Qjs7V0FFRztRQUNILGdCQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUU3QixZQUFNLEdBQUcsS0FBSyxDQUFBO1FBT04sbUJBQWEsR0FBRyxDQUFDLENBQUE7UUFNekI7O1dBRUc7UUFDSCxvQkFBYyxHQUFjLEVBQUUsQ0FBQztRQUV2QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsYUFBTyxHQUFHLEtBQUssQ0FBQztRQWdCeEI7O1dBRUc7UUFDSyxpQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQTBmN0IsQ0FBQztJQTFnQkcsc0JBQVksMkJBQU07YUFBbEI7WUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDdkIsQ0FBQzthQUVELFVBQW9CLEdBQUc7WUFFbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7WUFDbEIsSUFBRyxHQUFHO2dCQUNGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUN2QixDQUFDOzs7T0FQQTtJQWNEOztPQUVHO0lBQ08sd0JBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdB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QU9YO0FBUEQsV0FBWSxhQUFhO0lBRXJCLHlEQUFZLENBQUE7SUFDWixtREFBUyxDQUFBO0lBQ1QseURBQVksQ0FBQTtJQUNaLHVEQUFVLENBQUEsQ0FBQyxPQUFPO0FBRXRCLENBQUMsRUFQVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQU94QjtBQUVELElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUVoQix5Q0FBUyxDQUFBO0lBQ1QsdUNBQVEsQ0FBQTtJQUNSLHlDQUFTLENBQUE7QUFDYixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IFZpcEdpZnRWaWV3IGZyb20gXCIuL1ZpcEdpZnRWaWV3XCI7XHJcbmltcG9ydCBWaXBWaWV3IGZyb20gXCIuL1ZpcFZpZXdcIjtcclxuaW1wb3J0IFZpcFZpZXdVSSBmcm9tIFwiLi9WaXBWaWV3VUlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFZpcDMgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog5ruR5Yqo5a655ZmoXHJcbiAgICAgKi9cclxuICAgIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBnaWZ0Vmlld1VJOlZpcEdpZnRWaWV3XHJcbiAgICAvKipcclxuICAgICAqIHBhZ2V2aWV35a+56LGh5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHZpcFZpZXdBcnI6IFZpcFZpZXdVSVtdID0gW107XHJcblxyXG4gICAgYmFubmVkID0gZmFsc2VcclxuXHJcbiAgICBnaWZ0QnRuOmNjLk5vZGVcclxuICAgIG1vcmVCdG46Y2MuTm9kZVxyXG5cclxuICAgIGdpZnROb2RlOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIGN1cnJlbnRTZWxlY3QgPSAwXHJcblxyXG4gICAgcHJpdmF0ZSBsYXlvdXQ6Y2MuTGF5b3V0XHJcblxyXG5cclxuICAgIG1vZGVsOlBsYXllckluZm9Nb2RlbFxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blj7Pnrq3lpLTmlbDnu4RcclxuICAgICAqL1xyXG4gICAgamlhbnRvdU5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSB2aXBDb3VudDogbnVtYmVyID0gMTU7XHJcblxyXG4gICAgcHJpdmF0ZSBfdWlJbml0ID0gZmFsc2U7XHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGdldCB1aUluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91aUluaXRcclxuICAgIH0gXHJcblxyXG4gICAgcHJpdmF0ZSBzZXQgdWlJbml0KCB2YWwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdWlJbml0ID0gdmFsXHJcbiAgICAgICAgaWYodmFsKVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKClcclxuICAgIH0gXHJcblxyXG4gICAgcHJpdmF0ZSBWaXBSZXdhcmQgOmFueTtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S655qE6aG16Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTG9ja3ZpcFZpZXcgPSAtMTtcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6ISa5pysXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IHRydWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFZpcDNcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vVmlwVUkzXCI7XHJcbiAgICAgICAgLy8gdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UGxheWVySW5mb01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMudmlwVmlld0FyciA9IFtdXHJcbiAgICAgICAgdGhpcy5WaXBSZXdhcmQgPSBudWxsXHJcbiAgICAgICAgdGhpcy51aUluaXQgPSBmYWxzZTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlVQREFURVZJUERBVEEsIHRoaXMsIHRoaXMudXBkYXRlRGF0YSlcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LkNIQU5HRVZJUCwgdGhpcywgdGhpcy5Vc2VJbmZvVXBkYXRlVUkpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2VCdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3ID0gY2MuZmluZChcInBhZ2V2aWV3XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KTtcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3Lm5vZGUub24oXCJwYWdlLXR1cm5pbmdcIiwgdGhpcy5QYWdlVHVybkNhbGxiYWNrLCB0aGlzKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImdpZnQvaW5mb19ub2RlL3J1bGVcIiwgdGhpcy5vcGVuUnVsZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pdGVtTm9kZSA9IGNjLmZpbmQoXCJwYWdldmlldy92aWV3L2NvbnRlbnQvcGFnZV8xXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5pdGVtTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlLnBhcmVudC53aWR0aCA9IHRoaXMuaXRlbU5vZGUud2lkdGggKiBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnZpcENvdW50ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoICsgMTtcclxuICAgICAgICB0aGlzLmdpZnROb2RlID0gdGhpcy5nZXRDaGlsZChcImdpZnRcIilcclxuICAgICAgICBpZih0aGlzLmdpZnROb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5naWZ0Vmlld1VJID0gdGhpcy5naWZ0Tm9kZS5nZXRDb21wb25lbnQoVmlwR2lmdFZpZXcpXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2lmdFZpZXdVSSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5naWZ0Vmlld1VJLmluaXRWaWV3KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheW91dCA9IGNjLmZpbmQoXCJ0aXRsZVwiLHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxheW91dClcclxuICAgICAgICB0aGlzLmdpZnRCdG4gPSBjYy5maW5kKFwidGl0bGUvZ2lmdFwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgaWYodGhpcy5naWZ0QnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5naWZ0QnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VQYW5lbCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9yZUJ0biA9IGNjLmZpbmQoXCJ0aXRsZS9tb3JlXCIsIHRoaXMubm9kZSlcclxuICAgICAgICBpZih0aGlzLm1vcmVCdG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4ub24oXCJjbGlja1wiLCB0aGlzLmNoYW5nZVBhbmVsLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IHRoaXMudmlwQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUucGFyZW50LndpZHRoID0gdGhpcy5pdGVtTm9kZS53aWR0aCAqIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5QYWdlVHVybkNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVpSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZW5kID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICBsZXQgYmVnaW4gPSBpbmRleDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGJlZ2luOyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IHRoaXMudmlwQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBcInBhZ2VfXCIgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IChpbmRleCAtIDEpICogdGhpcy5pdGVtTm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciB2aXBWaWV3OiBWaXBWaWV3VUkgPSBpdGVtLmdldENvbXBvbmVudChWaXBWaWV3VUkpO1xyXG4gICAgICAgICAgICAgICAgdmlwVmlldy52aXAgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZpcFZpZXcuaW5pdFZpZXcoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXBWaWV3QXJyLnB1c2godmlwVmlldyk7XHJcbiAgICAgICAgICAgICAgLy8gIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLml0ZW1Ob2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMCwgdGhpcy52aXBDb3VudCApXHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiamlhbnRvdV9sZWZ0XCIsIHRoaXMubGVmdEJ0bkZ1bmMsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0gPSBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImppYW50b3VfcmlnaHRcIiwgdGhpcy5yaWdodEJ0bkZ1bmMsIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgc2NhbGVWYWx1ZSA9IDEuMjtcclxuICAgICAgICB2YXIgdGltZSA9IDAuODtcclxuICAgICAgICB2YXIgYWMxID0gY2Muc2NhbGVUbyh0aW1lLCBzY2FsZVZhbHVlLCBzY2FsZVZhbHVlKTtcclxuICAgICAgICB2YXIgYWMyID0gY2Muc2NhbGVUbyh0aW1lLCAxLCAxKTtcclxuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoYWMxLCBhYzIpO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcSk7XHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICAgICAgdmFyIGFjMSA9IGNjLnNjYWxlVG8odGltZSwgc2NhbGVWYWx1ZSwgc2NhbGVWYWx1ZSk7XHJcbiAgICAgICAgdmFyIGFjMiA9IGNjLnNjYWxlVG8odGltZSwgMSwgMSk7XHJcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjMSwgYWMyKTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXEpO1xyXG4gICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0ucnVuQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAvLyB0aGlzLml0ZW1Ob2RlLnBhcmVudC5jaGlsZHJlblswXS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouaJk+W8gOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMuVXNlSW5mb1VwZGF0ZVVJKVxyXG5cclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuVVBEQVRFVklQREFUQSwgdGhpcywgdGhpcy51cGRhdGVEYXRhKVxyXG5cclxuICAgICAgICAvLyB0aGlzLnBhZ2VWaWV3Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5VcGRhdGVKaWFudG91KCk7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMudWlJbml0KVxyXG4gICAgICAgIC8vICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKCk7XHJcbiAgICAgICAgLy90aGlzLlBhZ2VUdXJuQ2FsbGJhY2soKVxyXG4gICAgICAgIHRoaXMuTG9ja3ZpcFZpZXcgPSBHbG9iYWwuUGxheWVyRGF0YS52aXBcclxuICAgICAgICBpZih0aGlzLnVpSW5pdClcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICB1cGRhdGVEYXRhKGRhdGEpIHtcclxuICAgICAgICBpZighZGF0YSkgcmV0dXJuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gZGF0YS5pbmRleFxyXG4gICAgICAgIGxldCB0eXBlID0gZGF0YS50eXBlXHJcbiAgICAgICAgaWYodHlwZSA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVmlwUmV3YXJkLmxpc3QubGVuZ3RoID4gaW5kZXgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlZpcFJld2FyZC5saXN0W2luZGV4XS5zdGF0dXMgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIHR5cGUgPT09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlZpcFJld2FyZC53ZWVrLmxhc3RfZ2V0ID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSAyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5WaXBSZXdhcmQubW9udGgubGFzdF9nZXQgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgb3BlbkFuaW1GaW5pc2goKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5wYWdlVmlldy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5SdWxlKG5vZGU6IGNjLk5vZGUsIGFyZzE6IHN0cmluZywgb3BlblJ1bGU6IGFueSwgYXJnMzogdGhpcykge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kVmlwUnVsZVwiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuVmlwUmV3YXJkID0gbnVsbFxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuZW5hYmxlZCA9IHRydWVcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoXCJTSE9XUFJFVklMRUdFXCIsdHJ1ZSlcclxuICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMuVXNlSW5mb1VwZGF0ZVVJKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVVBEQVRFVklQREFUQSwgdGhpcywgdGhpcy51cGRhdGVEYXRhKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhbmVsKHRhcmdldCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IDApIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5naWZ0QnRuLCB0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5tb3JlQnRuLCBmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5tb3JlQnRuLnNldFNpYmxpbmdJbmRleCgwKVxyXG4gICAgICAgICAgICB0aGlzLmdpZnRCdG4uc2V0U2libGluZ0luZGV4KDEpXHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChcIlNIT1dQUkVWSUxFR0VcIixmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5naWZ0Vmlld1VJLnJlZnJlc2hVSSh0aGlzLlZpcFJld2FyZCx0aGlzLkxvY2t2aXBWaWV3KVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3QgPSAwXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlSmlhbnRvdShcIjBcIilcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQgPT09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4uc2V0U2libGluZ0luZGV4KDEpXHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5zZXRTaWJsaW5nSW5kZXgoMClcclxuICAgICAgICAgICAgdGhpcy5naWZ0Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5naWZ0QnRuLCBmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMubW9yZUJ0biwgdHJ1ZSlcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KFwiU0hPV1BSRVZJTEVHRVwiLHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdCA9IDFcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVKaWFudG91KClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5ub2RlICYmdGFyZ2V0Lm5vZGUubmFtZSA9PT0gXCJnaWZ0XCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4uc2V0U2libGluZ0luZGV4KDApXHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5zZXRTaWJsaW5nSW5kZXgoMSlcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ID0gMFxyXG4gICAgICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5naWZ0Vmlld1VJLnJlZnJlc2hVSSh0aGlzLlZpcFJld2FyZCx0aGlzLkxvY2t2aXBWaWV3KVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoXCJTSE9XUFJFVklMRUdFXCIsZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLmdpZnRCdG4sIHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm1vcmVCdG4sIGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUppYW50b3UoXCIwXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0YXJnZXQubm9kZSAmJnRhcmdldC5ub2RlLm5hbWUgPT09IFwibW9yZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3JlQnRuLnNldFNpYmxpbmdJbmRleCgxKVxyXG4gICAgICAgICAgICB0aGlzLmdpZnRCdG4uc2V0U2libGluZ0luZGV4KDApXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdCA9IDFcclxuICAgICAgICAgICAgdGhpcy5naWZ0Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoXCJTSE9XUFJFVklMRUdFXCIsdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMuZ2lmdEJ0biwgZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm1vcmVCdG4sIHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlSmlhbnRvdSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63mjInpkq7ngrnlh7tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bkZ1bmMoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIFVwZGF0ZVVJKCkge1xyXG4gICAgICAgIGlmKCFQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX3Jld2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5lbmFibGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlwVmlldzogVmlwVmlld1VJID0gdGhpcy52aXBWaWV3QXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgdmlwVmlldy5VcGRhdGVVSSh0aGlzLlZpcFJld2FyZCxpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKClcclxuICAgICAgICAgICAgaWYgKHRoaXMuTG9ja3ZpcFZpZXcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkxvY2t2aXBWaWV3ID49IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBFeHBBcnIubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVklQUkVXQVJELCBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UodGhpcy5Mb2NrdmlwVmlldywgMC4wMSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VOb3ROZWVkSXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZ2lmdEJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoXCJTSE9XUFJFVklMRUdFXCIsdHJ1ZSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLlZpcFJld2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxheW91dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlwVmlldzogVmlwVmlld1VJID0gdGhpcy52aXBWaWV3QXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVmlwUmV3YXJkLmxpc3QgJiYgaSA8IHRoaXMuVmlwUmV3YXJkLmxpc3QubGVuZ3RoICYmIHRoaXMuVmlwUmV3YXJkLmxpc3RbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2aXBWaWV3LlVwZGF0ZVVJKHRoaXMuVmlwUmV3YXJkLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5WaXBSZXdhcmQubGlzdFtpXS5zdGF0dXMgPT09IDAgJiYgR2xvYmFsLlBsYXllckRhdGEudmlwID49IHRoaXMuVmlwUmV3YXJkLmxpc3RbaV0ubGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc192aXBfcmV3YXJkID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrUmV3YXJkKHRoaXMuVmlwUmV3YXJkKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Mb2NrdmlwVmlldyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gR2xvYmFsLlBsYXllckRhdGEudmlwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuTG9ja3ZpcFZpZXcgPj0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcEV4cEFyci5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5WSVBSRVdBUkQsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZSh0aGlzLkxvY2t2aXBWaWV3LCAwLjAxKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZU5vdE5lZWRJdGVtKCk7XHJcbiAgICAgICAgICAgIGlmIChQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX3Jld2FyZCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYW5lbCgwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYW5lbCgxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLk5ld0NoZWNrVmlwUmV3YXJkLCBudWxsLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXlvdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheW91dC5lbmFibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuVmlwUmV3YXJkID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudmlwVmlld0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IDFcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmlwVmlldzogVmlwVmlld1VJID0gdGhpcy52aXBWaWV3QXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlZpcFJld2FyZC5saXN0ICYmIGkgPCB0aGlzLlZpcFJld2FyZC5saXN0Lmxlbmd0aCAmJiB0aGlzLlZpcFJld2FyZC5saXN0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpcFZpZXcuVXBkYXRlVUkodGhpcy5WaXBSZXdhcmQsIGkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5WaXBSZXdhcmQubGlzdFtpXS5zdGF0dXMgPT0gMCAmJiBHbG9iYWwuUGxheWVyRGF0YS52aXAgPj0gdGhpcy5WaXBSZXdhcmQubGlzdFtpXS5sZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuaXNfdmlwX3Jld2FyZCA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tSZXdhcmQodGhpcy5WaXBSZXdhcmQpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuVklQUkVXQVJELCBudWxsKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkxvY2t2aXBWaWV3IDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gR2xvYmFsLlBsYXllckRhdGEudmlwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Mb2NrdmlwVmlldyA+PSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcEV4cEFyci5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UodGhpcy5Mb2NrdmlwVmlldywgMC4wMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZU5vdE5lZWRJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX3Jld2FyZCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFuZWwoMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlUGFuZWwoMSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCBcIlduZFZpcDNcIilcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU5vdE5lZWRJdGVtKCl7XHJcbiAgICAgICAgICAvL+WFs+mXreS4jeaYvuekuueahGl0ZW1cclxuICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuTG9ja3ZpcFZpZXc7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlwVmlld0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGlmIChpIDwgaW5kZXggLSAxIHx8IGkgPiBpbmRleCArIDEpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlwVmlld0FycltpXS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlwVmlld0FycltpXS5ub2RlLmFjdGl2ZSA9IHRydWU7ICBcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tSZXdhcmQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYoIWRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdlZWtEYXRhID0gZGF0YS53ZWVrXHJcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0YS5tb250aFxyXG4gICAgICAgIGlmKCF3ZWVrRGF0YS5sYXN0X2dldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc193ZWVrX3Jld2FyZCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLmlzX3dlZWtfcmV3YXJkID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9udGgubGFzdF9nZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuaXNfbW9udGhfcmV3YXJkID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UuaXNfbW9udGhfcmV3YXJkID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmuefpeabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFVzZUluZm9VcGRhdGVVSSgpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5jbGVhckNhY2hlKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLk5ld0NoZWNrVmlwUmV3YXJkLCBudWxsKVxyXG4gICAgICAgIHRoaXMuVmlwUmV3YXJkID0gbnVsbFxyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeureWktFxyXG4gICAgICovXHJcbiAgICBVcGRhdGVKaWFudG91KGZsYWc/KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5lbmFibGVkID0gdHJ1ZVxyXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMudmlwQ291bnQgLSAxKVxyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMudmlwQ291bnQgLSAxO1xyXG4gICAgICAgIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4ID49IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbGFnID09PSBcIjBcIikgLy8g562J5LqOMOihqOekuueJueadg+ekvOWMheeVjOmdoiDpnIDopoHpmpDol4/plZzlpLQg5bm25YWz6ZetcGFnZVZJRVdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuZW5hYmxlZCA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuT25EYXRhUHJlcGFyZWQoKVxyXG4gICAgfVxyXG5cclxuICAgIHNldEppYW50b3VBY3RpdmUoZmxhZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzBdLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57+76aG15LqL5Lu25Zue6LCDXHJcbiAgICAgKi9cclxuICAgIFBhZ2VUdXJuQ2FsbGJhY2soZXZlbnQ/KSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5jb250ZW50LndpZHRoID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoICogdGhpcy5pdGVtTm9kZS53aWR0aFxyXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMudmlwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy52aXBDb3VudCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgaW5kZXggLSAxIHx8IGkgPiBpbmRleCArIDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpcFZpZXdBcnJbaV0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpcFZpZXdBcnJbaV0ubm9kZS5hY3RpdmUgPSB0cnVlOyAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VcGRhdGVKaWFudG91KClcclxuICAgICAgICAvLyBpZih0aGlzLnZpcFZpZXdBcnJbaW5kZXhdICYmIHRoaXMudmlwVmlld0FycltpbmRleF0uY3VycmVudFNlbGVjdCA9PT0gMClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMudmlwVmlld0FycltpbmRleF0uY2hhbmdlUGFuZWwoMClcclxuICAgICAgICAvLyAgICAgdGhpcy5VcGRhdGVKaWFudG91KFwiMFwiKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIGlmKHRoaXMudmlwVmlld0FycltpbmRleF0gJiYgdGhpcy52aXBWaWV3QXJyW2luZGV4XS5jdXJyZW50U2VsZWN0ID09PSAxKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy52aXBWaWV3QXJyW2luZGV4XS5jaGFuZ2VQYW5lbCgxKVxyXG4gICAgICAgIC8vICAgICB0aGlzLlVwZGF0ZUppYW50b3UoKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBcclxuICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bem566t5aS0IOeCueWHu1xyXG4gICAgICovXHJcbiAgICBsZWZ0QnRuRnVuYygpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoXCJTSE9XUFJFVklMRUdFXCIsdHJ1ZSlcclxuICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UoaW5kZXggLSAxLCAwLjMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPs+eureWktCDngrnlh7tcclxuICAgICAqL1xyXG4gICAgcmlnaHRCdG5GdW5jKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChcIlNIT1dQUkVWSUxFR0VcIix0cnVlKVxyXG4gICAgICAgIHRoaXMuZ2lmdE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZShpbmRleCArIDEsIDAuMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFRvZ2dsZUNoZWNrZWQodGFyZ2U6IGNjLk5vZGUsIGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgY2hlY2sgPSB0YXJnZS5nZXRDaGlsZEJ5TmFtZShcImNoZWNrXCIpXHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IHRhcmdlLmdldENoaWxkQnlOYW1lKFwidW5jaGVja2VkXCIpXHJcbiAgICAgICAgaWYgKGNoZWNrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrLmFjdGl2ZSA9IGZsYWdcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vcm1hbCkge1xyXG4gICAgICAgICAgICBub3JtYWwuYWN0aXZlID0gIWZsYWdcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZW51bSBBd2FyZEJ0blN0YXRlXHJcbntcclxuICAgIE5PVFJFQURZID0gMCwgLy/mnKrovr7miJBcclxuICAgIFJFQURZID0gMSwgLy8g5bey6L6+5oiQ5pyq6aKG5Y+WXHJcbiAgICBBQ0hJRVZFRCA9IDIsLy8g5pyq6L6+5oiQIFxyXG4gICAgUkVBQ0hFRCA9MyAvLyDlt7Lpooblj5YgXHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBJdGVtVHlwZVxyXG57XHJcbiAgICBMRVZFTCA9IDAsXHJcbiAgICBXRUVLID0gMSxcclxuICAgIE1PTlRIID0gMlxyXG59Il19