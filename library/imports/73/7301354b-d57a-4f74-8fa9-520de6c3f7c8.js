"use strict";
cc._RF.push(module, '73013VL1XpPdI+pUg3mw/fI', 'WndVip');
// hall/scripts/logic/hall/ui/playerInfo/WndVip.ts

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
var WndVip = /** @class */ (function (_super) {
    __extends(WndVip, _super);
    function WndVip() {
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
        /**
         * 当前显示的页面
         */
        _this.LockvipView = -1;
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
        return _this;
    }
    /**
     * 初始化脚本
     */
    WndVip.prototype.onInit = function () {
        WndVip.instance = this;
        this.isNeedDelay = true;
        this.name = "WndVip";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/VipUI";
        // this.destoryType = DestoryType.ChangeScene;
        // this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndVip.prototype.onDispose = function () {
        this.vipViewArr = [];
        this.uiInit = false;
        WndVip.instance = null;
    };
    /**
     * 初始化UI
     */
    WndVip.prototype.initView = function () {
        var _this = this;
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.spriteVipArr[0] = cc.find("top/vip0", this.node).getComponent(cc.Sprite);
        this.spriteVipArr[1] = cc.find("top/vip1", this.node).getComponent(cc.Sprite);
        this.richTextNextVip = cc.find("top/richText_vip", this.node).getComponent(cc.RichText);
        this.processBar = cc.find("top/process_di/progressBar", this.node).getComponent(cc.ProgressBar);
        this.labelJiasu = cc.find("top/label_jiasu", this.node).getComponent(cc.Label);
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
    WndVip.prototype.onOpen = function () {
        if (this.uiInit)
            this.OnDataPrepared();
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.UpdateUI);
    };
    WndVip.prototype.openAnimFinish = function () {
        this.PageTurnCallback();
        this.LockvipView = Global.PlayerData.vip;
        this.UpdateUI();
        this.UpdateJiantou();
    };
    /**
     * 界面关闭回调
     */
    WndVip.prototype.onClose = function () {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UpdateUI);
    };
    /**
     * 关闭按钮点击
     */
    WndVip.prototype.closeBtnFunc = function () {
        this.close();
    };
    /**
     * 更新界面
     */
    WndVip.prototype.UpdateUI = function () {
        var myVip = Global.PlayerData.vip;
        var rightVip = myVip + 1;
        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel_1.default.instance.GetVipUpgradeExp(rightVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;
        if (vipNeedExp > 0) {
            this.richTextNextVip.string = "<b><outline color=#315200 width=2>\u518D\u5145\u503C</outline><outline color=#784c00 width=2><color=#fed306>" + vipNeedExp + "</color></outline><outline color=#315200 width=2>\u5143\uFF0C\u5373\u53EF\u5347\u7EA7</outline></b>";
            if (myVip < rightVip) {
                percent = Global.PlayerData.vipExp / vipUgradeExp;
            }
        }
        else {
            this.richTextNextVip.string = "<b><outline color=#315200 width=2>恭喜您已成为至尊VIP" + myVip + "</outline></b>";
            this.getChild("top/vip1").active = false;
        }
        this.processBar.progress = percent;
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var sfString0 = "icon_v" + myVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[0], atlasString, sfString0, null, false);
        var sfString1 = "icon_v" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[1], atlasString, sfString1, null, false);
        if (Global.PlayerData.vip > 0 && Global.PlayerData.vip < 4) {
            this.labelJiasu.node.active = true;
        }
        else {
            this.labelJiasu.node.active = false;
        }
        for (var i = 0; i < this.vipViewArr.length; i++) {
            var vipView = this.vipViewArr[i];
            vipView.UpdateUI();
        }
        if (this.LockvipView <= 0) {
            this.LockvipView = Global.PlayerData.vip;
        }
        if (this.LockvipView >= PlayerInfoModel_1.default.instance.vip_cfg.length) {
            this.LockvipView = PlayerInfoModel_1.default.instance.vip_cfg.length - 1;
        }
        this.pageView.scrollToPage(this.LockvipView, 0.01);
    };
    /**
     * 更新箭头
     */
    WndVip.prototype.UpdateJiantou = function () {
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
    WndVip.prototype.PageTurnCallback = function () {
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
    WndVip.prototype.leftBtnFunc = function () {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index > 0) {
            this.pageView.scrollToPage(index - 1, 0.3);
        }
    };
    /**
     * 右箭头 点击
     */
    WndVip.prototype.rightBtnFunc = function () {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index < PlayerInfoModel_1.default.instance.vip_cfg.length - 1) {
            this.pageView.scrollToPage(index + 1, 0.3);
        }
    };
    /**
     * 全局对象
     */
    WndVip.instance = null;
    return WndVip;
}(WndBase_1.default));
exports.default = WndVip;

cc._RF.pop();