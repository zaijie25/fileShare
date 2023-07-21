
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/DailyGiftMoney/WndGiftMoneyListUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '295dcb4OT9DKYsPSQOSpXdX', 'WndGiftMoneyListUI');
// hall/scripts/logic/hall/ui/DailyGiftMoney/WndGiftMoneyListUI.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var WndBase_1 = require("../../../core/ui/WndBase");
var WndGiftMoneyListUI = /** @class */ (function (_super) {
    __extends(WndGiftMoneyListUI, _super);
    function WndGiftMoneyListUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        /**
         * 当前页签
         */
        _this.currYeqian = -1;
        /**
         * 页签节点集合
         */
        _this.yeqianArr = [];
        _this.titlenName = ["xbt_2", "xbt_5", "xbt_6"];
        _this.titlenName2 = ["xbt_3", "xbt_4", "xbt_4"];
        /**
         * 数据集合
         */
        _this.listmsg = null;
        return _this;
    }
    WndGiftMoneyListUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndGiftMoneyListUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyGiftMoney/GiftMoneyListUI";
    };
    WndGiftMoneyListUI.prototype.initView = function () {
        this.copyItem = this.getChild("scrollview/view/content/item");
        this.copyItem.active = false;
        this.contentNode = this.getChild("scrollview/view/content");
        this.initItemPool();
        this.addCommonClick('close', this.close, this);
        this.titleSp = this.getComponent("centerNode/panel/xbt_1", cc.Sprite);
        this.titleSp2 = this.getComponent("centerNode/panel/xbt_2", cc.Sprite);
        for (var i = 0; i < 3; i++) {
            var yeqianNode = this.addCommonClick("topyeqian/yeqian_" + i, this.yeqianBtnFunc, this);
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
            // this.contentArr[i] = cc.find("content/content_" + i, this.node);
        }
        this.yesterdayBet = this.getComponent("centerNode/yesterdayBet", cc.Label);
        this.totalBet = this.getComponent("centerNode/totalBet", cc.Label);
    };
    WndGiftMoneyListUI.prototype.yeqianBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);
        this.ChangeYeqian(yeqian);
    };
    WndGiftMoneyListUI.prototype.UpdatBtn = function () {
        for (var i = 0; i < 3; i++) {
            var bShow = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
        this.OnDataPrepared();
    };
    WndGiftMoneyListUI.prototype.onOpen = function (args) {
        this.listmsg = args[0];
        if (this.listmsg) {
            this.ChangeYeqian(0);
        }
        // this.CashBackModel.GetActivityCfg();
    };
    WndGiftMoneyListUI.prototype.RefreshScrollView = function (data) {
        this.recycle();
        this.yesterdayBet.string = Global.Toolkit.GetMoneyFormat(this.listmsg.yesterday_bet);
        this.totalBet.string = Global.Toolkit.GetMoneyFormat(this.listmsg.total_bet);
        for (var j = 0; j < 7; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            var bgSprite = node.getChildByName("shurusz_d");
            //表格条纹背景
            if (bgSprite) {
                bgSprite.active = j % 2 == 0;
            }
            if (data == 0) {
                if (!this.listmsg.daily_cfg)
                    return;
                if (this.listmsg.yesterday_bet >= this.listmsg.daily_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], this.listmsg.yesterday_bet);
                    }
                    else if (this.listmsg.yesterday_bet < this.listmsg.daily_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], this.listmsg.yesterday_bet);
                    }
                    else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], -1);
                    }
                }
                else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], -1);
                }
            }
            else if (data == 1) {
                if (!this.listmsg.weekly_cfg)
                    return;
                if (this.listmsg.last_week_total_bet >= this.listmsg.weekly_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], this.listmsg.last_week_total_bet);
                    }
                    else if (this.listmsg.last_week_total_bet < this.listmsg.weekly_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], this.listmsg.last_week_total_bet);
                    }
                    else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], -1);
                    }
                }
                else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], -1);
                }
            }
            else if (data == 2) {
                if (!this.listmsg.monthly_cfg)
                    return;
                if (this.listmsg.last_month_total_bet >= this.listmsg.monthly_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], this.listmsg.last_month_total_bet);
                    }
                    else if (this.listmsg.last_month_total_bet < this.listmsg.monthly_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], this.listmsg.last_month_total_bet);
                    }
                    else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], -1);
                    }
                }
                else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], -1);
                }
            }
        }
    };
    /**
     * 切换页签
     * @param yeqian
     */
    WndGiftMoneyListUI.prototype.ChangeYeqian = function (yeqian) {
        var path = "hall/texture/hall/DailyGiftMoney/DailyGiftMoney";
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.UpdatBtn();
            Global.ResourceManager.loadAutoAtlas(this.titleSp, path, this.titlenName[yeqian], null);
            Global.ResourceManager.loadAutoAtlas(this.titleSp2, path, this.titlenName2[yeqian], null);
        }
        this.RefreshScrollView(yeqian);
    };
    /**
     * 界面关闭回调
     */
    WndGiftMoneyListUI.prototype.onClose = function () {
        this.currYeqian = -1;
    };
    WndGiftMoneyListUI.prototype.onDispose = function () {
        this.currYeqian = -1;
        this.itemPool.resetPool();
        this.nodeList = [];
    };
    WndGiftMoneyListUI.prototype.initItemPool = function () {
        this.itemPool = new GiftMoneyItemPool(this.copyItem);
    };
    WndGiftMoneyListUI.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndGiftMoneyListUI;
}(WndBase_1.default));
exports.default = WndGiftMoneyListUI;
var GiftMoneyItemPool = /** @class */ (function (_super) {
    __extends(GiftMoneyItemPool, _super);
    function GiftMoneyItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    GiftMoneyItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    GiftMoneyItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return GiftMoneyItemPool;
}(PoolBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxEYWlseUdpZnRNb25leVxcV25kR2lmdE1vbmV5TGlzdFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFtRDtBQUNuRCxvREFBK0M7QUFFL0M7SUFBZ0Qsc0NBQU87SUFBdkQ7UUFBQSxxRUEwS0M7UUF0S0csY0FBUSxHQUFVLEVBQUUsQ0FBQztRQUNyQjs7V0FFRztRQUNILGdCQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDeEI7O1dBRUc7UUFDSCxlQUFTLEdBQWMsRUFBRSxDQUFDO1FBRTFCLGdCQUFVLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpDLGlCQUFXLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBUzFDOztXQUVHO1FBQ0gsYUFBTyxHQUFHLElBQUksQ0FBQzs7SUE4SW5CLENBQUM7SUE1SWEsbUNBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnREFBZ0QsQ0FBQztJQUNwRSxDQUFDO0lBRVMscUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFDM0QsSUFBSSxDQUFDLFlBQVksRUFBRSxD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LENBQUM7SUFDUyxzQ0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ08seUNBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFDTSxvQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCx5QkFBQztBQUFELENBMUtBLEFBMEtDLENBMUsrQyxpQkFBTyxHQTBLdEQ7O0FBQ0Q7SUFBZ0MscUNBQVE7SUFDcEMsMkJBQW9CLFFBQWlCO1FBQXJDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixjQUFRLEdBQVIsUUFBUSxDQUFTOztJQUVyQyxDQUFDO0lBRVMsc0NBQVUsR0FBcEI7UUFDSSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFUyxxQ0FBUyxHQUFuQixVQUFvQixJQUFhO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FiQSxBQWFDLENBYitCLGtCQUFRLEdBYXZDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kR2lmdE1vbmV5TGlzdFVJIGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBjb3B5SXRlbTogYW55O1xyXG4gICAgY29udGVudE5vZGU6IGFueTtcclxuICAgIGl0ZW1Qb29sOiBHaWZ0TW9uZXlJdGVtUG9vbDtcclxuICAgIG5vZGVMaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3pobXnrb5cclxuICAgICAqL1xyXG4gICAgY3VyclllcWlhbjogbnVtYmVyID0gLTE7XHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICB5ZXFpYW5BcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgdGl0bGVTcDogY2MuU3ByaXRlO1xyXG4gICAgdGl0bGVuTmFtZSA9IFtcInhidF8yXCIsIFwieGJ0XzVcIiwgXCJ4YnRfNlwiXTtcclxuICAgIHRpdGxlU3AyOiBjYy5TcHJpdGU7XHJcbiAgICB0aXRsZW5OYW1lMiA9IFtcInhidF8zXCIsIFwieGJ0XzRcIiwgXCJ4YnRfNFwiXTtcclxuICAgIC8qKlxyXG4gICAgICog5pio5pel5oqV5rOoXHJcbiAgICAgKi9cclxuICAgIHllc3RlcmRheUJldDogY2MuTGFiZWw7XHJcbiAgICAvKipcclxuICAgICAqIOe0r+iuoeaKleazqFxyXG4gICAgICovXHJcbiAgICB0b3RhbEJldDogY2MuTGFiZWw7XHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNrumbhuWQiFxyXG4gICAgICovXHJcbiAgICBsaXN0bXNnID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRHaWZ0TW9uZXlMaXN0VUlcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL0RhaWx5R2lmdE1vbmV5L0dpZnRNb25leUxpc3RVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50L2l0ZW1cIilcclxuICAgICAgICB0aGlzLmNvcHlJdGVtLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKVxyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljaygnY2xvc2UnLCB0aGlzLmNsb3NlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMudGl0bGVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS9wYW5lbC94YnRfMVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMudGl0bGVTcDIgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlck5vZGUvcGFuZWwveGJ0XzJcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ0b3B5ZXFpYW4veWVxaWFuX1wiICsgaSwgdGhpcy55ZXFpYW5CdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy55ZXFpYW5BcnJbaSAqIDJdID0gY2MuZmluZChcIm5vU2VsZWN0ZWRcIiwgeWVxaWFuTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMueWVxaWFuQXJyW2kgKiAyICsgMV0gPSBjYy5maW5kKFwic2VsZWN0ZWRcIiwgeWVxaWFuTm9kZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY29udGVudEFycltpXSA9IGNjLmZpbmQoXCJjb250ZW50L2NvbnRlbnRfXCIgKyBpLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnllc3RlcmRheUJldCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS95ZXN0ZXJkYXlCZXRcIiwgY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy50b3RhbEJldCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyTm9kZS90b3RhbEJldFwiLCBjYy5MYWJlbClcclxuICAgIH1cclxuXHJcbiAgICB5ZXFpYW5CdG5GdW5jKHRhcmdldCkge1xyXG4gICAgICAgIHZhciBhcnIgPSB0YXJnZXQubm9kZS5uYW1lLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICB2YXIgcGFyYW0gPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIHZhciB5ZXFpYW4gPSBwYXJzZUludChwYXJhbSk7XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VZZXFpYW4oeWVxaWFuKTtcclxuICAgIH1cclxuICAgIFVwZGF0QnRuKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBiU2hvdzogYm9vbGVhbiA9IChpID09IHRoaXMuY3VyclllcWlhbik7XHJcbiAgICAgICAgICAgIHZhciB5ZXFpYW5Ob2RlID0gdGhpcy55ZXFpYW5BcnJbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgeWVxaWFuTm9kZS5hY3RpdmUgPSBiU2hvdztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3M/OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxpc3Rtc2cgPSBhcmdzWzBdO1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3Rtc2cpIHtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VZZXFpYW4oMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGlzLkNhc2hCYWNrTW9kZWwuR2V0QWN0aXZpdHlDZmcoKTtcclxuICAgIH1cclxuICAgIFJlZnJlc2hTY3JvbGxWaWV3KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpXHJcbiAgICAgICAgdGhpcy55ZXN0ZXJkYXlCZXQuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQodGhpcy5saXN0bXNnLnllc3RlcmRheV9iZXQpXHJcbiAgICAgICAgdGhpcy50b3RhbEJldC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdCh0aGlzLmxpc3Rtc2cudG90YWxfYmV0KVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCkgYXMgY2MuTm9kZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlTGlzdC5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuY29udGVudE5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgYmdTcHJpdGUgPSBub2RlLmdldENoaWxkQnlOYW1lKFwic2h1cnVzel9kXCIpIGFzIGNjLk5vZGU7XHJcbiAgICAgICAgICAgIC8v6KGo5qC85p2h57q56IOM5pmvXHJcbiAgICAgICAgICAgIGlmKGJnU3ByaXRlKXtcclxuICAgICAgICAgICAgICAgIGJnU3ByaXRlLmFjdGl2ZSA9IGogJSAyID09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3Rtc2cuZGFpbHlfY2ZnKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3Rtc2cueWVzdGVyZGF5X2JldCA+PSB0aGlzLmxpc3Rtc2cuZGFpbHlfY2ZnW2pdLmJldF9wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiR2lmdE1vbmV5SXRlbVwiKS5Jbml0KHRoaXMubGlzdG1zZy5kYWlseV9jZmdbal0sIHRoaXMubGlzdG1zZy55ZXN0ZXJkYXlfYmV0KVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5saXN0bXNnLnllc3RlcmRheV9iZXQgPCB0aGlzLmxpc3Rtc2cuZGFpbHlfY2ZnW2ogKyAxXS5iZXRfcG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0TW9uZXlJdGVtXCIpLkluaXQodGhpcy5saXN0bXNnLmRhaWx5X2NmZ1tqXSwgdGhpcy5saXN0bXNnLnllc3RlcmRheV9iZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0TW9uZXlJdGVtXCIpLkluaXQodGhpcy5saXN0bXNnLmRhaWx5X2NmZ1tqXSwgLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkdpZnRNb25leUl0ZW1cIikuSW5pdCh0aGlzLmxpc3Rtc2cuZGFpbHlfY2ZnW2pdLCAtMSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5saXN0bXNnLndlZWtseV9jZmcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdG1zZy5sYXN0X3dlZWtfdG90YWxfYmV0ID49IHRoaXMubGlzdG1zZy53ZWVrbHlfY2ZnW2pdLmJldF9wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID09PSA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiR2lmdE1vbmV5SXRlbVwiKS5Jbml0KHRoaXMubGlzdG1zZy53ZWVrbHlfY2ZnW2pdLCB0aGlzLmxpc3Rtc2cubGFzdF93ZWVrX3RvdGFsX2JldClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubGlzdG1zZy5sYXN0X3dlZWtfdG90YWxfYmV0IDwgdGhpcy5saXN0bXNnLndlZWtseV9jZmdbaiArIDFdLmJldF9wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkdpZnRNb25leUl0ZW1cIikuSW5pdCh0aGlzLmxpc3Rtc2cud2Vla2x5X2NmZ1tqXSwgdGhpcy5saXN0bXNnLmxhc3Rfd2Vla190b3RhbF9iZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0TW9uZXlJdGVtXCIpLkluaXQodGhpcy5saXN0bXNnLndlZWtseV9jZmdbal0sIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0TW9uZXlJdGVtXCIpLkluaXQodGhpcy5saXN0bXNnLndlZWtseV9jZmdbal0sIC0xKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmxpc3Rtc2cubW9udGhseV9jZmcpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdG1zZy5sYXN0X21vbnRoX3RvdGFsX2JldCA+PSB0aGlzLmxpc3Rtc2cubW9udGhseV9jZmdbal0uYmV0X3BvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHaWZ0TW9uZXlJdGVtXCIpLkluaXQodGhpcy5saXN0bXNnLm1vbnRobHlfY2ZnW2pdLCB0aGlzLmxpc3Rtc2cubGFzdF9tb250aF90b3RhbF9iZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxpc3Rtc2cubGFzdF9tb250aF90b3RhbF9iZXQgPCB0aGlzLmxpc3Rtc2cubW9udGhseV9jZmdbaiArIDFdLmJldF9wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkdpZnRNb25leUl0ZW1cIikuSW5pdCh0aGlzLmxpc3Rtc2cubW9udGhseV9jZmdbal0sIHRoaXMubGlzdG1zZy5sYXN0X21vbnRoX3RvdGFsX2JldClcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkdpZnRNb25leUl0ZW1cIikuSW5pdCh0aGlzLmxpc3Rtc2cubW9udGhseV9jZmdbal0sIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiR2lmdE1vbmV5SXRlbVwiKS5Jbml0KHRoaXMubGlzdG1zZy5tb250aGx5X2NmZ1tqXSwgLTEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIh+aNoumhteetvlxyXG4gICAgICogQHBhcmFtIHllcWlhbiBcclxuICAgICAqL1xyXG4gICAgQ2hhbmdlWWVxaWFuKHllcWlhbjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhdGggPSBcImhhbGwvdGV4dHVyZS9oYWxsL0RhaWx5R2lmdE1vbmV5L0RhaWx5R2lmdE1vbmV5XCI7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyclllcWlhbiAhPSB5ZXFpYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyWWVxaWFuID0geWVxaWFuO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0QnRuKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnRpdGxlU3AsIHBhdGgsIHRoaXMudGl0bGVuTmFtZVt5ZXFpYW5dLCBudWxsKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMudGl0bGVTcDIsIHBhdGgsIHRoaXMudGl0bGVuTmFtZTJbeWVxaWFuXSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcoeWVxaWFuKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY3VyclllcWlhbiA9IC0xXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY3VyclllcWlhbiA9IC0xXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKVxyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wgPSBuZXcgR2lmdE1vbmV5SXRlbVBvb2wodGhpcy5jb3B5SXRlbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjeWNsZSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEdpZnRNb25leUl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICB9XHJcbn0iXX0=