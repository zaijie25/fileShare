
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndVip3.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRWaXAzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUNoRSw2RUFBd0U7QUFDeEUscUNBQWdDO0FBRWhDO0lBQXFDLDJCQUFPO0lBQTVDO1FBQUEscUVBc1BDO1FBaFBHOztXQUVHO1FBQ0gsY0FBUSxHQUFnQixJQUFJLENBQUM7UUFDN0I7O1dBRUc7UUFDSCxnQkFBVSxHQUFjLEVBQUUsQ0FBQztRQUMzQjs7V0FFRztRQUNILG9CQUFjLEdBQWMsRUFBRSxDQUFDO1FBRXZCLGNBQVEsR0FBWSxJQUFJLENBQUE7UUFFeEIsY0FBUSxHQUFXLEVBQUUsQ0FBQztRQUV0QixZQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWYsbUJBQWEsR0FBRyxFQUFFLENBQUM7UUFDM0I7O1dBRUc7UUFDSyxpQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFDOztJQXlON0IsQ0FBQztJQXhORzs7T0FFRztJQUNPLHdCQUFNLEdBQWhCO1FBQ0ksT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFDO1FBQ25ELDhDQUE4QztRQUM5QyxpRkFBaUY7SUFDckYsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09B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O1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILDZCQUFXLEdBQVg7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDhCQUFZLEdBQVo7UUFDSSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkQsSUFBSSxLQUFLLEdBQUcseUJBQWUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7SUFwUEQ7O09BRUc7SUFDSSxnQkFBUSxHQUFZLElBQUksQ0FBQztJQWtQcEMsY0FBQztDQXRQRCxBQXNQQyxDQXRQb0MsaUJBQU8sR0FzUDNDO2tCQXRQb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgUGxheWVySW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5pbXBvcnQgVmlwVmlldyBmcm9tIFwiLi9WaXBWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRWaXAzIGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOWvueixoVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6IFduZFZpcDMgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ruR5Yqo5a655ZmoXHJcbiAgICAgKi9cclxuICAgIHBhZ2VWaWV3OiBjYy5QYWdlVmlldyA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHBhZ2V2aWV35a+56LGh5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHZpcFZpZXdBcnI6IFZpcFZpZXdbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlt6blj7Pnrq3lpLTmlbDnu4RcclxuICAgICAqL1xyXG4gICAgamlhbnRvdU5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgaXRlbU5vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSB2aXBDb3VudDogbnVtYmVyID0gMTU7XHJcblxyXG4gICAgcHJpdmF0ZSB1aUluaXQgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIFZpcExpc3RSZXdhcmQgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S655qE6aG16Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgTG9ja3ZpcFZpZXcgPSAtMTtcclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6ISa5pysXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgV25kVmlwMy5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IHRydWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFZpcDNcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vVmlwVUkzXCI7XHJcbiAgICAgICAgLy8gdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgICAgIC8vIHRoaXMubW9kZWwgPSA8UGxheWVySW5mb01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMudmlwVmlld0FyciA9IFtdXHJcbiAgICAgICAgdGhpcy51aUluaXQgPSBmYWxzZTtcclxuICAgICAgICBXbmRWaXAzLmluc3RhbmNlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllVJXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmcvY2xvc2VcIiwgdGhpcy5jbG9zZUJ0bkZ1bmMsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3ID0gY2MuZmluZChcInBhZ2V2aWV3XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlBhZ2VWaWV3KTtcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3Lm5vZGUub24oXCJwYWdlLXR1cm5pbmdcIiwgdGhpcy5QYWdlVHVybkNhbGxiYWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlID0gY2MuZmluZChcInBhZ2V2aWV3L3ZpZXcvY29udGVudC9wYWdlXzFcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXRlbU5vZGUucGFyZW50LndpZHRoID0gdGhpcy5pdGVtTm9kZS53aWR0aCAqIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBfY2ZnLmxlbmd0aDtcclxuICAgICAgICBsZXQgaW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMudmlwQ291bnQgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGggKyAxO1xyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGUoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy52aXBDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTm9kZS5wYXJlbnQud2lkdGggPSB0aGlzLml0ZW1Ob2RlLndpZHRoICogUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QYWdlVHVybkNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVpSW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgZW5kID0gaW5kZXggKyAyO1xyXG4gICAgICAgICAgICBsZXQgYmVnaW4gPSBpbmRleDtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGJlZ2luOyBpIDwgZW5kOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID49IHRoaXMudmlwQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSBcInBhZ2VfXCIgKyBpbmRleDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IChpbmRleCAtIDEpICogdGhpcy5pdGVtTm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciB2aXBWaWV3OiBWaXBWaWV3ID0gaXRlbS5nZXRDb21wb25lbnQoVmlwVmlldyk7XHJcbiAgICAgICAgICAgICAgICB2aXBWaWV3LnZpcCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdmlwVmlldy5pbml0VmlldygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpcFZpZXdBcnIucHVzaCh2aXBWaWV3KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0UGFyZW50KHRoaXMuaXRlbU5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAwLCB0aGlzLnZpcENvdW50IC8gMilcclxuICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzBdID0gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJqaWFudG91X2xlZnRcIiwgdGhpcy5sZWZ0QnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiamlhbnRvdV9yaWdodFwiLCB0aGlzLnJpZ2h0QnRuRnVuYywgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciBzY2FsZVZhbHVlID0gMS4yO1xyXG4gICAgICAgIHZhciB0aW1lID0gMC44O1xyXG4gICAgICAgIHZhciBhYzEgPSBjYy5zY2FsZVRvKHRpbWUsIHNjYWxlVmFsdWUsIHNjYWxlVmFsdWUpO1xyXG4gICAgICAgIHZhciBhYzIgPSBjYy5zY2FsZVRvKHRpbWUsIDEsIDEpO1xyXG4gICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShhYzEsIGFjMik7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoc2VxKTtcclxuICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzFdLnJ1bkFjdGlvbihhY3Rpb24pO1xyXG5cclxuICAgICAgICB2YXIgYWMxID0gY2Muc2NhbGVUbyh0aW1lLCBzY2FsZVZhbHVlLCBzY2FsZVZhbHVlKTtcclxuICAgICAgICB2YXIgYWMyID0gY2Muc2NhbGVUbyh0aW1lLCAxLCAxKTtcclxuICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoYWMxLCBhYzIpO1xyXG4gICAgICAgIHZhciBhY3Rpb24gPSBjYy5yZXBlYXRGb3JldmVyKHNlcSk7XHJcbiAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclswXS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLmiZPlvIDlm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICAvLyB0aGlzLnBhZ2VWaWV3Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5VcGRhdGVKaWFudG91KCk7XHJcbiAgICAgICAgaWYgKHRoaXMudWlJbml0KVxyXG4gICAgICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LkNIQU5HRVZJUCwgdGhpcywgdGhpcy5Vc2VJbmZvVXBkYXRlVUkpXHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkFuaW1GaW5pc2goKSB7XHJcbiAgICAgICAgdGhpcy5QYWdlVHVybkNhbGxiYWNrKClcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gR2xvYmFsLlBsYXllckRhdGEudmlwXHJcbiAgICAgICAgdGhpcy5VcGRhdGVVSSgpXHJcbiAgICAgICAgdGhpcy5VcGRhdGVKaWFudG91KCk7XHJcbiAgICAgICAgLy8gdGhpcy5wYWdlVmlldy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLlhbPpl63lm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMuVXNlSW5mb1VwZGF0ZVVJKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5oyJ6ZKu54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VCdG5GdW5jKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBVcGRhdGVVSSgpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkNoZWNrVmlwUmV3YXJkLCBudWxsLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5saXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlZpcExpc3RSZXdhcmQgPSBkYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhdHVzID0gMDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpcFZpZXc6IFZpcFZpZXcgPSB0aGlzLnZpcFZpZXdBcnJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuVmlwTGlzdFJld2FyZFtpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aXBWaWV3LlVwZGF0ZVVJKHRoaXMuVmlwTGlzdFJld2FyZFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlZpcExpc3RSZXdhcmRbaV0uc3RhdHVzID09IDAgJiYgR2xvYmFsLlBsYXllckRhdGEudmlwID4gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlwVmlldy5VcGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS5pc192aXBfcmV3YXJkID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlZJUFJFV0FSRCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Mb2NrdmlwVmlldyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTG9ja3ZpcFZpZXcgPj0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Mb2NrdmlwVmlldyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBFeHBBcnIubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKHRoaXMuTG9ja3ZpcFZpZXcsIDAuMDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGVycm9yLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSwgZmFsc2UsIDYwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmuefpeabtOaWsOeVjOmdolxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIFVzZUluZm9VcGRhdGVVSSgpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5jbGVhckNhY2hlKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkNoZWNrVmlwUmV3YXJkLCBudWxsKVxyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOeureWktFxyXG4gICAgICovXHJcbiAgICBVcGRhdGVKaWFudG91KCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgIHRoaXMuTG9ja3ZpcFZpZXcgPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPiB0aGlzLnZpcENvdW50IC0gMSlcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLnZpcENvdW50IC0gMTtcclxuICAgICAgICBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA+PSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwX2NmZy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5qaWFudG91Tm9kZUFyclsxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmppYW50b3VOb2RlQXJyWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuamlhbnRvdU5vZGVBcnJbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnv7vpobXkuovku7blm57osINcclxuICAgICAqL1xyXG4gICAgUGFnZVR1cm5DYWxsYmFjaygpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5jb250ZW50LndpZHRoID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoICogdGhpcy5pdGVtTm9kZS53aWR0aFxyXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMudmlwQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy52aXBDb3VudCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52aXBWaWV3QXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpIDwgaW5kZXggLSAxIHx8IGkgPiBpbmRleCArIDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpcFZpZXdBcnJbaV0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXBWaWV3QXJyW2ldLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VcGRhdGVKaWFudG91KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt6bnrq3lpLQg54K55Ye7XHJcbiAgICAgKi9cclxuICAgIGxlZnRCdG5GdW5jKCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMucGFnZVZpZXcuZ2V0Q3VycmVudFBhZ2VJbmRleCgpO1xyXG4gICAgICAgIHRoaXMuTG9ja3ZpcFZpZXcgPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKGluZGV4IC0gMSwgMC4zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj7Pnrq3lpLQg54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHJpZ2h0QnRuRnVuYygpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VWaWV3LmdldEN1cnJlbnRQYWdlSW5kZXgoKTtcclxuICAgICAgICB0aGlzLkxvY2t2aXBWaWV3ID0gdGhpcy5wYWdlVmlldy5nZXRDdXJyZW50UGFnZUluZGV4KCk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VWaWV3LnNjcm9sbFRvUGFnZShpbmRleCArIDEsIDAuMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19