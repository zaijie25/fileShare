"use strict";
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