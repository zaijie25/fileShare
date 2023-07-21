
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndVip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRWaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBQ2hFLDZFQUF3RTtBQUN4RSxxQ0FBZ0M7QUFFaEM7SUFBb0MsMEJBQU87SUFBM0M7UUFBQSxxRUFpUkM7UUEzUUc7O1dBRUc7UUFDSCxjQUFRLEdBQWdCLElBQUksQ0FBQztRQUM3Qjs7V0FFRztRQUNILGdCQUFVLEdBQWMsRUFBRSxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsb0JBQWMsR0FBYyxFQUFFLENBQUM7UUFFdkIsY0FBUSxHQUFZLElBQUksQ0FBQTtRQUV4QixjQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFlBQU0sR0FBRyxLQUFLLENBQUM7UUFDdkI7O1dBRUc7UUFDSyxpQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXpCOztXQUVHO1FBQ0gsa0JBQVksR0FBZ0IsRUFBRSxDQUFDO1FBQy9COztXQUVHO1FBQ0gscUJBQWUsR0FBZ0IsSUFBSSxDQUFDO1FBQ3BDOztXQUVHO1FBQ0gsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ2xDOztXQUVHO1FBQ0gsZ0JBQVUsR0FBYSxJQUFJLENBQUM7O0lBcU9oQyxDQUFDO0lBbk9HOztPQUVHO0lBQ08sdUJBQU0sR0FBaEI7UUFDSSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0NBQWtDLENBQUM7UUFDbEQsOENBQThDO1FBQzlDLGlGQUFpRjtJQUNyRixDQUFDO0lBRUQsMEJBQVMsR0FB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R0FBRyxLQUFLLENBQUM7O2dCQUV2QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILDRCQUFXLEdBQVg7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFZLEdBQVo7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcseUJBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUEvUUQ7O09BRUc7SUFDSSxlQUFRLEdBQVcsSUFBSSxDQUFDO0lBNlFuQyxhQUFDO0NBalJELEFBaVJDLENBalJtQyxpQkFBTyxHQWlSMUM7a0JBalJvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBWaXBWaWV3IGZyb20gXCIuL1ZpcFZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFZpcCBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDlr7nosaFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOiBXbmRWaXAgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ruR5Yqo5a655ZmoXHJcbiAgICAgKi9cclxuICAgIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHBhZ2V2aWV35a+56LGh5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHZpcFZpZXdBcnI6IFZpcFZpZXdbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blj7Pnrq3lpLTmlbDnu4RcclxuICAgICAqL1xyXG4gICAgamlhbnRvdU5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSB2aXBDb3VudDogbnVtYmVyID0gMTU7XHJcblxyXG4gICAgcHJpdmF0ZSB1aUluaXQgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S655qE6aG16Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTG9ja3ZpcFZpZXcgPSAtMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3puWPszLkuKp2aXDlm77moIdcclxuICAgICAqL1xyXG4gICAgc3ByaXRlVmlwQXJyOiBjYy5TcHJpdGVbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliLDkuIvkuIDnuqd2aXDnmoTmj5DnpLrmlofmnKxcclxuICAgICAqL1xyXG4gICAgcmljaFRleHROZXh0VmlwOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWIsOS4i+S4gOe6p3ZpcOeahOi/m+W6plxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzQmFyOiBjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHZpcDTliY3mr4/lpKnliqDpgJ/nmoR0aXBz5paH5pysXHJcbiAgICAgKi9cclxuICAgIGxhYmVsSmlhc3U6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbohJrmnKxcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICBXbmRWaXAuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRWaXBcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vVmlwVUlcIjtcclxuICAgICAgICAvLyB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuQ2hhbmdlU2NlbmU7XHJcbiAgICAgICAgLy8gdGhpcy5tb2RlbCA9IDxQbGF5ZXJJbmZvTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlBsYXllckluZm9Nb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy52aXBWaWV3QXJyID0gW11cclxuICAgICAgICB0aGlzLnVpSW5pdCA9IGZhbHNlO1xyXG4gICAgICAgIFduZFZpcC5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZVSVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMuY2xvc2VCdG5GdW5jLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVWaXBBcnJbMF0gPSBjYy5maW5kKFwidG9wL3ZpcDBcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwcml0ZVZpcEFyclsxXSA9IGNjLmZpbmQoXCJ0b3AvdmlwMVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cclxuICAgICAgICB0aGlzLnJpY2hUZXh0TmV4dFZpcCA9IGNjLmZpbmQoXCJ0b3AvcmljaFRleHRfdmlwXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIgPSBjYy5maW5kKFwidG9wL3Byb2Nlc3NfZGkvcHJvZ3Jlc3NCYXJcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG5cclxuICAgICAgICB0aGlzLmxhYmVsSmlhc3UgPSBjYy5maW5kKFwidG9wL2xhYmVsX2ppYXN1XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgdGhpcy5wYWdlVmlldyA9IGNjLmZpbmQoXCJwYWdldmlld1wiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5QYWdlVmlldyk7XHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5ub2RlLm9uKFwicGFnZS10dXJuaW5nXCIsIHRoaXMuUGFnZVR1cm5DYWxsYmFjaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5pdGVtTm9kZSA9IGNjLmZpbmQoXCJwYWdldmlldy92aWV3L2NvbnRlbnQvcGFnZV8xXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5pdGVtTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlLnBhcmVudC53aWR0aCA9IHRoaXMuaXRlbU5vZGUud2lkdGggKiBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLnZpcENvdW50ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoICsgMTtcclxuICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IHRoaXMudmlwQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbU5vZGUucGFyZW50LndpZHRoID0gdGhpcy5pdGVtTm9kZS53aWR0aCAqIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGFnZVR1cm5DYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51aUluaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVuZCA9IGluZGV4ICsgMjtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBiZWdpbjsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLnZpcENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJwYWdlX1wiICsgaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnggPSAoaW5kZXggLSAxKSAqIHRoaXMuaXRlbU5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlwVmlldzogVmlwVmlldyA9IGl0ZW0uZ2V0Q29tcG9uZW50KFZpcFZpZXcpO1xyXG4gICAgICAgICAgICAgICAgdmlwVmlldy52aXAgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHZpcFZpZXcuaW5pdFZpZXcoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXBWaWV3QXJyLnB1c2godmlwVmlldyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLml0ZW1Ob2RlLnBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMCwgdGhpcy52aXBDb3VudCAvIDIpXHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiamlhbnRvdV9sZWZ0XCIsIHRoaXMubGVmdEJ0bkZ1bmMsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0gPSBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImppYW50b3VfcmlnaHRcIiwgdGhpcy5yaWdodEJ0bkZ1bmMsIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgc2NhbGVWYWx1ZSA9IDEuMjtcclxuICAgICAgICB2YXIgdGltZSA9IDAuODtcclxuICAgICAgICB2YXIgYWMxID0gY2Muc2NhbGVUbyh0aW1lLCBzY2FsZVZhbHVlLCBzY2FsZVZhbHVlKTtcclxuICAgICAgICB2YXIgYWMyID0gY2Muc2NhbGVUbyh0aW1lLCAxLCAxKTtcclxuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoYWMxLCBhYzIpO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcSk7XHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICAgICAgdmFyIGFjMSA9IGNjLnNjYWxlVG8odGltZSwgc2NhbGVWYWx1ZSwgc2NhbGVWYWx1ZSk7XHJcbiAgICAgICAgdmFyIGFjMiA9IGNjLnNjYWxlVG8odGltZSwgMSwgMSk7XHJcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGFjMSwgYWMyKTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gY2MucmVwZWF0Rm9yZXZlcihzZXEpO1xyXG4gICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0ucnVuQWN0aW9uKGFjdGlvbik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5omT5byA5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudWlJbml0KVxyXG4gICAgICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKCk7XHJcblxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMuVXBkYXRlVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5BbmltRmluaXNoKCkge1xyXG4gICAgICAgIHRoaXMuUGFnZVR1cm5DYWxsYmFjaygpXHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcFxyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKVxyXG4gICAgICAgIHRoaXMuVXBkYXRlSmlhbnRvdSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLlhbPpl63lm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMuVXBkYXRlVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5oyJ6ZKu54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VCdG5GdW5jKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBVcGRhdGVVSSgpIHtcclxuICAgICAgICB2YXIgbXlWaXAgPSBHbG9iYWwuUGxheWVyRGF0YS52aXA7XHJcbiAgICAgICAgdmFyIHJpZ2h0VmlwID0gbXlWaXAgKyAxO1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gMTtcclxuICAgICAgICB2YXIgdmlwTmVlZEV4cCA9IDA7XHJcbiAgICAgICAgdmFyIHZpcFVncmFkZUV4cCA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5HZXRWaXBVcGdyYWRlRXhwKHJpZ2h0VmlwKTtcclxuICAgICAgICB2YXIgdmlwTmVlZEV4cCA9IHZpcFVncmFkZUV4cCAtIEdsb2JhbC5QbGF5ZXJEYXRhLnZpcEV4cDtcclxuICAgICAgICBpZiAodmlwTmVlZEV4cCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5yaWNoVGV4dE5leHRWaXAuc3RyaW5nID0gYDxiPjxvdXRsaW5lIGNvbG9yPSMzMTUyMDAgd2lkdGg9Mj7lho3lhYXlgLw8L291dGxpbmU+PG91dGxpbmUgY29sb3I9Izc4NGMwMCB3aWR0aD0yPjxjb2xvcj0jZmVkMzA2PiR7dmlwTmVlZEV4cH08L2NvbG9yPjwvb3V0bGluZT48b3V0bGluZSBjb2xvcj0jMzE1MjAwIHdpZHRoPTI+5YWD77yM5Y2z5Y+v5Y2H57qnPC9vdXRsaW5lPjwvYj5gXHJcbiAgICAgICAgICAgIGlmIChteVZpcCA8IHJpZ2h0VmlwKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50ID0gR2xvYmFsLlBsYXllckRhdGEudmlwRXhwIC8gdmlwVWdyYWRlRXhwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmljaFRleHROZXh0VmlwLnN0cmluZyA9IFwiPGI+PG91dGxpbmUgY29sb3I9IzMxNTIwMCB3aWR0aD0yPuaBreWWnOaCqOW3suaIkOS4uuiHs+WwilZJUFwiICsgbXlWaXAgKyBcIjwvb3V0bGluZT48L2I+XCI7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2hpbGQoXCJ0b3AvdmlwMVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvY2Vzc0Jhci5wcm9ncmVzcyA9IHBlcmNlbnQ7XHJcblxyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IFwiaGFsbC90ZXh0dXJlL2hhbGwvcGxheWVySW5mby9BdXRvQXRsYXNfcGxheWVyaW5mb1wiO1xyXG4gICAgICAgIHZhciBzZlN0cmluZzAgPSBcImljb25fdlwiICsgbXlWaXA7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlVmlwQXJyWzBdLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcwLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIHZhciBzZlN0cmluZzEgPSBcImljb25fdlwiICsgcmlnaHRWaXA7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlVmlwQXJyWzFdLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcxLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChHbG9iYWwuUGxheWVyRGF0YS52aXAgPiAwICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnZpcCA8IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbEppYXN1Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsSmlhc3Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB2aXBWaWV3OiBWaXBWaWV3ID0gdGhpcy52aXBWaWV3QXJyW2ldO1xyXG4gICAgICAgICAgICB2aXBWaWV3LlVwZGF0ZVVJKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5Mb2NrdmlwVmlldyA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9ja3ZpcFZpZXcgPSBHbG9iYWwuUGxheWVyRGF0YS52aXBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuTG9ja3ZpcFZpZXcgPj0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9ja3ZpcFZpZXcgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZSh0aGlzLkxvY2t2aXBWaWV3LCAwLjAxKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDnrq3lpLRcclxuICAgICAqL1xyXG4gICAgVXBkYXRlSmlhbnRvdSgpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gdGhpcy52aXBDb3VudCAtIDEpXHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy52aXBDb3VudCAtIDE7XHJcbiAgICAgICAgaWYgKGluZGV4IDw9IDApIHtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPj0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuT25EYXRhUHJlcGFyZWQoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57+76aG15LqL5Lu25Zue6LCDXHJcbiAgICAgKi9cclxuICAgIFBhZ2VUdXJuQ2FsbGJhY2soKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuY29udGVudC53aWR0aCA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aCAqIHRoaXMuaXRlbU5vZGUud2lkdGhcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLnZpcENvdW50IC0gMSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMudmlwQ291bnQgLSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmlwVmlld0Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGluZGV4IC0gMSB8fCBpID4gaW5kZXggKyAxKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXBWaWV3QXJyW2ldLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMudmlwVmlld0FycltpXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVXBkYXRlSmlhbnRvdSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bem566t5aS0IOeCueWHu1xyXG4gICAgICovXHJcbiAgICBsZWZ0QnRuRnVuYygpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZShpbmRleCAtIDEsIDAuMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+z566t5aS0IOeCueWHu1xyXG4gICAgICovXHJcbiAgICByaWdodEJ0bkZ1bmMoKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgIGlmIChpbmRleCA8IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5zY3JvbGxUb1BhZ2UoaW5kZXggKyAxLCAwLjMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==