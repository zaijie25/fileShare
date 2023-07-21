"use strict";
cc._RF.push(module, 'ef842w7rYhES7DY7xDbI7Xh', 'WndVip3');
// hall/scripts/logic/hall/ui/playerInfo/WndVip3.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var VipView_1 = require("./VipView");
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
        /**
         * 左右箭头数组
         */
        _this.jiantouNodeArr = [];
        _this.itemNode = null;
        _this.vipCount = 15;
        _this.uiInit = false;
        _this.VipListReward = [];
        /**
         * 当前显示的页面
         */
        _this.LockvipView = -1;
        return _this;
    }
    /**
     * 初始化脚本
     */
    WndVip3.prototype.onInit = function () {
        WndVip3.instance = this;
        this.isNeedDelay = true;
        this.name = "WndVip3";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/VipUI3";
        // this.destoryType = DestoryType.ChangeScene;
        // this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndVip3.prototype.onDispose = function () {
        this.vipViewArr = [];
        this.uiInit = false;
        WndVip3.instance = null;
    };
    /**
     * 初始化UI
     */
    WndVip3.prototype.initView = function () {
        var _this = this;
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.pageView = cc.find("pageview", this.node).getComponent(cc.PageView);
        this.pageView.node.on("page-turning", this.PageTurnCallback, this);
        this.itemNode = cc.find("pageview/view/content/page_1", this.node);
        this.itemNode.active = false;
        this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel_1.default.instance.vip_cfg.length;
        var index = 1;
        this.vipCount = PlayerInfoModel_1.default.instance.vip_cfg.length + 1;
        Global.Component.schedule(function () {
            if (index >= _this.vipCount) {
                _this.itemNode.parent.width = _this.itemNode.width * PlayerInfoModel_1.default.instance.vip_cfg.length;
                _this.PageTurnCallback();
                _this.uiInit = true;
                _this.OnDataPrepared();
                return;
            }
            var end = index + 2;
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
                var vipView = item.getComponent(VipView_1.default);
                vipView.vip = index;
                vipView.initView();
                _this.vipViewArr.push(vipView);
                item.setParent(_this.itemNode.parent);
                index++;
            }
        }, 0, this.vipCount / 2);
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
    };
    /**
     * 界面打开回调
     */
    WndVip3.prototype.onOpen = function () {
        // this.pageView.node.active = false;
        // this.UpdateJiantou();
        if (this.uiInit)
            this.OnDataPrepared();
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI);
    };
    WndVip3.prototype.openAnimFinish = function () {
        this.PageTurnCallback();
        this.LockvipView = Global.PlayerData.vip;
        this.UpdateUI();
        this.UpdateJiantou();
        // this.pageView.node.active = true;
        // this.UpdateUI();
    };
    /**
     * 界面关闭回调
     */
    WndVip3.prototype.onClose = function () {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI);
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
        Global.HallServer.send(NetAppface.mod, NetAppface.CheckVipReward, null, function (data) {
            if (data.list) {
                _this.VipListReward = data.list;
                var status = 0;
                for (var i = 0; i < _this.vipViewArr.length; i++) {
                    var vipView = _this.vipViewArr[i];
                    if (_this.VipListReward[i]) {
                        vipView.UpdateUI(_this.VipListReward[i]);
                        if (_this.VipListReward[i].status == 0 && Global.PlayerData.vip > i) {
                            status = 1;
                        }
                    }
                    else {
                        vipView.UpdateUI();
                    }
                }
                PlayerInfoModel_1.default.instance.is_vip_reward = status;
                Global.Event.event(GlobalEvent.VIPREWARD, null);
                if (_this.LockvipView <= 0) {
                    _this.LockvipView = Global.PlayerData.vip;
                }
                if (_this.LockvipView >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
                    _this.LockvipView = PlayerInfoModel_1.default.instance.vipExpArr.length - 1;
                }
                _this.pageView.scrollToPage(_this.LockvipView, 0.01);
            }
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 60);
    };
    /**
     * 通知更新界面
     */
    WndVip3.prototype.UseInfoUpdateUI = function () {
        Global.HallServer.clearCache(NetAppface.mod, NetAppface.CheckVipReward, null);
        this.UpdateUI();
    };
    /**
     * 更新箭头
     */
    WndVip3.prototype.UpdateJiantou = function () {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
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
        // this.OnDataPrepared()
    };
    /**
     * 翻页事件回调
     */
    WndVip3.prototype.PageTurnCallback = function () {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        this.pageView.content.width = PlayerInfoModel_1.default.instance.vip_cfg.length * this.itemNode.width;
        if (index > this.vipCount - 1) {
            index = this.vipCount - 1;
        }
        for (var i = 0; i < this.vipViewArr.length; i++) {
            if (i < index - 1 || i > index + 1)
                this.vipViewArr[i].node.active = false;
            else
                this.vipViewArr[i].node.active = true;
        }
        this.UpdateJiantou();
    };
    /**
     * 左箭头 点击
     */
    WndVip3.prototype.leftBtnFunc = function () {
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
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index < PlayerInfoModel_1.default.instance.vip_cfg.length - 1) {
            this.pageView.scrollToPage(index + 1, 0.3);
        }
    };
    /**
     * 全局对象
     */
    WndVip3.instance = null;
    return WndVip3;
}(WndBase_1.default));
exports.default = WndVip3;

cc._RF.pop();