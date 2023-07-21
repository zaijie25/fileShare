"use strict";
cc._RF.push(module, '64de8w+a81BYqy0eoCF2c7M', 'WndBuySafeUI');
// hall/scripts/logic/hall/ui/safe/WndBuySafeUI.ts

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
var RechargeGiftModel_1 = require("../../../hallcommon/model/RechargeGiftModel");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WndBuySafeUI = /** @class */ (function (_super) {
    __extends(WndBuySafeUI, _super);
    function WndBuySafeUI() {
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
        _this.list = null;
        return _this;
    }
    WndBuySafeUI.prototype.onInit = function () {
        this.name = "WndBuySafeUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/safe/BuySafeUI";
        this.rechargeModel = Global.ModelManager.getModel("RechargeGiftModel");
    };
    WndBuySafeUI.prototype.initView = function () {
        this.rechargeModel.on(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
        this.copyItem = this.getChild("scrollview/view/content/item");
        this.contentNode = this.getChild("scrollview/view/content");
        this.initItemPool();
        this.addCommonClick('close', this.close, this);
        this.addCommonClick('btn_gz', this.onRule, this);
        this.updateUI();
    };
    //保险金
    WndBuySafeUI.prototype.onGetConfig = function (data) {
        if (data == null)
            return;
        var arr = data.data;
        for (var index = 0; index < arr.length; index++) {
            var cfg = arr[index];
            if (cfg && cfg.atype == 19) {
                this.rechargeModel.safeData = cfg.cfg;
                this.updateUI();
                break;
            }
        }
    };
    WndBuySafeUI.prototype.updateUI = function () {
        var yesterdayBet = this.getChild("centerNode/yesterdayBet").getComponent(cc.Label);
        var point = Number(this.rechargeModel.safeData.profit) * -1; // 显示时需要正负转换
        yesterdayBet.string = Global.Toolkit.formatPointStr(point, true);
        this.gmbxNode = this.addCommonClick('centerNode/btn_gmbx/btn_gmbx', this.onBuySafe, this);
        this.lqbxjNode = this.addCommonClick('centerNode/btn_lqbxj/btn_lqbxj', this.onReceiveSafe, this);
        var btn_lqbxj_1 = this.getChild("centerNode/btn_lqbxj/btn_lqbxj_1");
        var btn_gmbx_1 = this.getChild("centerNode/btn_gmbx/btn_gmbx_1");
        if (this.rechargeModel.safeData.recive_point == 0) { //可以领取保险的金额
            this.lqbxjNode.active = false;
            btn_lqbxj_1.active = true;
        }
        else {
            this.lqbxjNode.active = true;
            btn_lqbxj_1.active = false;
        }
        if (this.rechargeModel.safeData.premium != 0) { //是否购买了保险
            this.gmbxNode.active = false;
            btn_gmbx_1.active = true;
        }
        else {
            this.gmbxNode.active = true;
            btn_gmbx_1.active = false;
        }
        this.list = this.rechargeModel.safeData.cfg.list;
        for (var i = 0; i < 3; i++) {
            var yeqianNode = this.addCommonClick("topyeqian/yeqian_" + i, this.yeqianBtnFunc, this);
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
            if (this.list && this.list[i]) {
                var data = this.list[i];
                var label = cc.find("noSelected/num", yeqianNode).getComponent(cc.Label);
                label.string = (data.premium / Global.Setting.glodRatio).toString();
                var slabel = cc.find("selected/num", yeqianNode).getComponent(cc.Label);
                slabel.string = (data.premium / Global.Setting.glodRatio).toString();
                yeqianNode.active = true;
            }
            else {
                yeqianNode.active = false;
            }
        }
    };
    WndBuySafeUI.prototype.yeqianBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);
        this.ChangeYeqian(yeqian);
    };
    WndBuySafeUI.prototype.UpdatBtn = function () {
        for (var i = 0; i < 3; i++) {
            var bShow = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
            if (this.list[i] && bShow) {
                this.RefreshScrollView(this.list[i]);
            }
        }
    };
    WndBuySafeUI.prototype.onOpen = function (args) {
        this.copyItem.active = false;
        this.ChangeYeqian(0);
        if (this.list[0]) {
            this.RefreshScrollView(this.list[0]);
        }
        this.rechargeModel.reqGetActivityCfg(false);
    };
    WndBuySafeUI.prototype.RefreshScrollView = function (data) {
        this.recycle();
        for (var j = 0; j < data.odds.length; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            if (data.odds[j]) {
                node.getComponent("GiftMoneyItem").InitSafe(data.odds[j], data.premium);
            }
        }
    };
    /**
     * 切换页签
     * @param yeqian
     */
    WndBuySafeUI.prototype.ChangeYeqian = function (yeqian) {
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.UpdatBtn();
        }
    };
    WndBuySafeUI.prototype.onRule = function () {
        Global.UI.show("WndSafeRuleUI");
    };
    /**
     * 购买保险
     */
    WndBuySafeUI.prototype.onBuySafe = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BuyInsurance, { premium: this.list[this.currYeqian].premium }, function (retObj) {
            Global.UI.fastTip("购买保险成功");
            _this.rechargeModel.reqGetActivityCfg(false);
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
        }, function (error) {
            Global.UI.fastTip(error._errstr);
        }, false);
    };
    /**
     * 领取保险
     */
    WndBuySafeUI.prototype.onReceiveSafe = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReciveInsurance, {}, function (retObj) {
            Global.UI.show("WndRebateGet", retObj.recive_point, null, function () {
            });
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
            _this.rechargeModel.reqGetActivityCfg(false);
        }, function (error) {
            Global.UI.fastTip(error._errstr);
        }, false);
    };
    /**
     * 界面关闭回调
     */
    WndBuySafeUI.prototype.onClose = function () {
        this.currYeqian = -1;
    };
    WndBuySafeUI.prototype.onDispose = function () {
        this.currYeqian = -1;
        this.itemPool.resetPool();
        this.nodeList = [];
        this.rechargeModel.off(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
    };
    WndBuySafeUI.prototype.initItemPool = function () {
        this.itemPool = new GiftMoneyItemPool(this.copyItem);
    };
    WndBuySafeUI.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndBuySafeUI;
}(WndBase_1.default));
exports.default = WndBuySafeUI;
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