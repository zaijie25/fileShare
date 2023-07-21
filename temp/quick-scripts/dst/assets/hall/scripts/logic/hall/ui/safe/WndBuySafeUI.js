
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/safe/WndBuySafeUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxzYWZlXFxXbmRCdXlTYWZlVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELG9EQUErQztBQUMvQyxpRkFBNEU7QUFDNUUsNERBQTZEO0FBQzdEO0lBQTBDLGdDQUFPO0lBQWpEO1FBQUEscUVBb0xDO1FBN0tHLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFDckI7O1dBRUc7UUFDSCxnQkFBVSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsZUFBUyxHQUFhLEVBQUUsQ0FBQztRQUNoQixVQUFJLEdBQUcsSUFBSSxDQUFDOztJQW9LekIsQ0FBQztJQW5LYSw2QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQ0FBZ0MsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFUywrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLDJCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9B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QUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTCx3QkFBQztBQUFELENBYkEsQUFhQyxDQWIrQixrQkFBUSxHQWF2QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcbmltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFJlY2hhcmdlR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhcmdlR2lmdE1vZGVsXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRCdXlTYWZlVUkgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgcHJpdmF0ZSAgcmVjaGFyZ2VNb2RlbDpSZWNoYXJnZUdpZnRNb2RlbFxyXG4gICAgcHJpdmF0ZSBnbWJ4Tm9kZTpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGxxYnhqTm9kZTpjYy5Ob2RlXHJcbiAgICBjb3B5SXRlbTogYW55O1xyXG4gICAgY29udGVudE5vZGU6IGFueTtcclxuICAgIGl0ZW1Qb29sOiBHaWZ0TW9uZXlJdGVtUG9vbDtcclxuICAgIG5vZGVMaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3pobXnrb5cclxuICAgICAqL1xyXG4gICAgY3VyclllcWlhbjpudW1iZXIgPSAtMTtcclxuICAgIC8qKlxyXG4gICAgICog6aG1562+6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHllcWlhbkFycjpjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgIGxpc3QgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEJ1eVNhZmVVSVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvc2FmZS9CdXlTYWZlVUlcIjtcclxuICAgICAgICB0aGlzLnJlY2hhcmdlTW9kZWwgPSA8UmVjaGFyZ2VHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlR2lmdE1vZGVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnJlY2hhcmdlTW9kZWwub24oUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0Q2ZnLCB0aGlzLCB0aGlzLm9uR2V0Q29uZmlnKTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50L2l0ZW1cIilcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50XCIpXHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCdjbG9zZScsIHRoaXMuY2xvc2UsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljaygnYnRuX2d6JywgdGhpcy5vblJ1bGUsIHRoaXMpXHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgfVxyXG4gICAgLy/kv53pmanph5FcclxuICAgIG9uR2V0Q29uZmlnKGRhdGEpe1xyXG4gICAgICAgIGlmKGRhdGEgPT0gbnVsbCkgcmV0dXJuXHJcbiAgICAgICAgbGV0IGFyciA9IGRhdGEuZGF0YVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjZmcgPSBhcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZihjZmcgJiYgY2ZnLmF0eXBlID09IDE5IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNoYXJnZU1vZGVsLnNhZmVEYXRhID0gY2ZnLmNmZztcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB1cGRhdGVVSSgpe1xyXG4gICAgICAgIGxldCB5ZXN0ZXJkYXlCZXQgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS95ZXN0ZXJkYXlCZXRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgcG9pbnQgPSBOdW1iZXIodGhpcy5yZWNoYXJnZU1vZGVsLnNhZmVEYXRhLnByb2ZpdCkqLTEgLy8g5pi+56S65pe26ZyA6KaB5q2j6LSf6L2s5o2iXHJcbiAgICAgICAgeWVzdGVyZGF5QmV0LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKHBvaW50LCB0cnVlKVxyXG4gICAgICAgIHRoaXMuZ21ieE5vZGUgPSAgdGhpcy5hZGRDb21tb25DbGljaygnY2VudGVyTm9kZS9idG5fZ21ieC9idG5fZ21ieCcsIHRoaXMub25CdXlTYWZlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMubHFieGpOb2RlID0gdGhpcy5hZGRDb21tb25DbGljaygnY2VudGVyTm9kZS9idG5fbHFieGovYnRuX2xxYnhqJywgdGhpcy5vblJlY2VpdmVTYWZlLCB0aGlzKVxyXG4gICAgICAgIGxldCBidG5fbHFieGpfMSA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJOb2RlL2J0bl9scWJ4ai9idG5fbHFieGpfMVwiKVxyXG4gICAgICAgIGxldCBidG5fZ21ieF8xID0gdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvYnRuX2dtYngvYnRuX2dtYnhfMVwiKVxyXG4gICAgICAgIGlmKHRoaXMucmVjaGFyZ2VNb2RlbC5zYWZlRGF0YS5yZWNpdmVfcG9pbnQgPT0gMCl7IC8v5Y+v5Lul6aKG5Y+W5L+d6Zmp55qE6YeR6aKdXHJcbiAgICAgICAgICAgIHRoaXMubHFieGpOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBidG5fbHFieGpfMS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxxYnhqTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBidG5fbHFieGpfMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5yZWNoYXJnZU1vZGVsLnNhZmVEYXRhLnByZW1pdW0gIT0gMCl7IC8v5piv5ZCm6LSt5Lmw5LqG5L+d6ZmpXHJcbiAgICAgICAgICAgIHRoaXMuZ21ieE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGJ0bl9nbWJ4XzEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5nbWJ4Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBidG5fZ21ieF8xLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLnJlY2hhcmdlTW9kZWwuc2FmZURhdGEuY2ZnLmxpc3Q7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDM7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciB5ZXFpYW5Ob2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcInRvcHllcWlhbi95ZXFpYW5fXCIgKyBpLCB0aGlzLnllcWlhbkJ0bkZ1bmMsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnllcWlhbkFycltpICogMl0gPSBjYy5maW5kKFwibm9TZWxlY3RlZFwiLCB5ZXFpYW5Ob2RlKTtcclxuICAgICAgICAgICAgdGhpcy55ZXFpYW5BcnJbaSAqIDIgKyAxXSA9IGNjLmZpbmQoXCJzZWxlY3RlZFwiLCB5ZXFpYW5Ob2RlKTtcclxuICAgICAgICAgICAgaWYodGhpcy5saXN0ICYmIHRoaXMubGlzdFtpXSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9ICBjYy5maW5kKFwibm9TZWxlY3RlZC9udW1cIiwgeWVxaWFuTm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IChkYXRhLnByZW1pdW0vR2xvYmFsLlNldHRpbmcuZ2xvZFJhdGlvKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNsYWJlbCA9ICBjYy5maW5kKFwic2VsZWN0ZWQvbnVtXCIsIHllcWlhbk5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBzbGFiZWwuc3RyaW5nID0gKGRhdGEucHJlbWl1bS9HbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB5ZXFpYW5Ob2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB5ZXFpYW5Ob2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB5ZXFpYW5CdG5GdW5jKHRhcmdldCl7XHJcbiAgICAgICAgdmFyIGFyciA9IHRhcmdldC5ub2RlLm5hbWUuc3BsaXQoXCJfXCIpO1xyXG4gICAgICAgIHZhciBwYXJhbSA9IGFyclthcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgdmFyIHllcWlhbiA9IHBhcnNlSW50KHBhcmFtKTtcclxuICAgICAgICB0aGlzLkNoYW5nZVllcWlhbih5ZXFpYW4pO1xyXG4gICAgfVxyXG4gICAgVXBkYXRCdG4oKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMzsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGJTaG93OmJvb2xlYW4gPSAoaSA9PSB0aGlzLmN1cnJZZXFpYW4pO1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZSA9IHRoaXMueWVxaWFuQXJyW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgIHllcWlhbk5vZGUuYWN0aXZlID0gYlNob3c7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGlzdFtpXSAmJiBiU2hvdyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hTY3JvbGxWaWV3KHRoaXMubGlzdFtpXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oYXJncz86IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuQ2hhbmdlWWVxaWFuKDApO1xyXG4gICAgICAgIGlmKHRoaXMubGlzdFswXSl7XHJcbiAgICAgICAgICAgIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcodGhpcy5saXN0WzBdKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY2hhcmdlTW9kZWwucmVxR2V0QWN0aXZpdHlDZmcoZmFsc2UpXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoU2Nyb2xsVmlldyhkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJlY3ljbGUoKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5vZGRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUxpc3QucHVzaChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5vZGRzW2pdKXtcclxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiR2lmdE1vbmV5SXRlbVwiKS5Jbml0U2FmZShkYXRhLm9kZHNbal0sZGF0YS5wcmVtaXVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliIfmjaLpobXnrb5cclxuICAgICAqIEBwYXJhbSB5ZXFpYW4gXHJcbiAgICAgKi9cclxuICAgIENoYW5nZVllcWlhbih5ZXFpYW46IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJZZXFpYW4gIT0geWVxaWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyclllcWlhbiA9IHllcWlhbjtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdEJ0bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUnVsZSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU2FmZVJ1bGVVSVwiKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDotK3kubDkv53pmalcclxuICAgICAqL1xyXG4gICAgb25CdXlTYWZlKCl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5CdXlJbnN1cmFuY2UsIHtwcmVtaXVtOnRoaXMubGlzdFt0aGlzLmN1cnJZZXFpYW5dLnByZW1pdW19LChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLotK3kubDkv53pmanmiJDlip9cIik7XHJcbiAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VNb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLkdldFVzZXJQb2ludCx7fSk7XHJcbiAgICAgICAgfSwoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgfSxmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmihuWPluS/nemZqVxyXG4gICAgICovXHJcbiAgICBvblJlY2VpdmVTYWZlKCl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5SZWNpdmVJbnN1cmFuY2UsIHt9LChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgcmV0T2JqLnJlY2l2ZV9wb2ludCxudWxsLCgpID0+IHtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLkdldFVzZXJQb2ludCx7fSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VNb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuICAgICAgICB9LChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICB9LGZhbHNlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jdXJyWWVxaWFuID0gLTFcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyWWVxaWFuID0gLTFcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlc2V0UG9vbCgpXHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VNb2RlbC5vZmYoUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0Q2ZnLCB0aGlzLCB0aGlzLm9uR2V0Q29uZmlnKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IEdpZnRNb25leUl0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlY3ljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZWN5Y2xlQWxsKHRoaXMubm9kZUxpc3QpO1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBHaWZ0TW9uZXlJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgfVxyXG59Il19