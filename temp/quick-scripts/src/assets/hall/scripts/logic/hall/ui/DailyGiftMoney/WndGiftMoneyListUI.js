"use strict";
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