"use strict";
cc._RF.push(module, 'e28c61SyGtLFoNmyjAiFDY0', 'WndDailyCashBackUI');
// hall/scripts/logic/hall/ui/CashBack/WndDailyCashBackUI.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var CashBackEvent_1 = require("./CashBackEvent");
var YXButton_1 = require("../../../core/component/YXButton");
var SkinConfig_1 = require("../../../hallcommon/app/SkinConfig");
var AppCfg_1 = require("../../AppCfg");
var WndDailyCashBackUI = /** @class */ (function (_super) {
    __extends(WndDailyCashBackUI, _super);
    function WndDailyCashBackUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardId = ""; //领取奖励id
        return _this;
    }
    WndDailyCashBackUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndDailyCashBackUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/CashBack/DailyCashBackUI";
    };
    WndDailyCashBackUI.prototype.initView = function () {
        this.copyItem = this.getChild("scrollview/view/content/item");
        this.copyItem.active = false;
        this.contentNode = this.getChild("scrollview/view/content");
        this.myDailyCash = this.getComponent("myDailyCash", cc.Label);
        this.dayNum = this.getComponent("dayNum", cc.Label);
        this.awardNumLabel = this.getComponent("awardNum/awardNumLabel", cc.Label);
        this.initItemPool();
        this.addCommonClick("getAwardBtn", this.getAward, this);
        this.addCommonClick('close', this.close, this);
        this.awardBtn = this.getChild("getAwardBtn");
        this.setAwardBtnState(false);
        this.CashBackModel = Global.ModelManager.getModel("CashBackModel");
        this.CashBackModel.on(CashBackEvent_1.CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.on(CashBackEvent_1.CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    WndDailyCashBackUI.prototype.setAwardBtnState = function (canget) {
        var btn = this.awardBtn.getComponent(YXButton_1.default);
        var btnEffect = this.getChild("getAwardBtn/effect");
        btnEffect.active = canget;
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, !canget, 150, true);
            btn.interactable = canget;
        }
    };
    WndDailyCashBackUI.prototype.getAward = function () {
        if (this.awardId == "") {
            Global.UI.fastTip("暂无奖励可以领取");
            return;
        }
        this.CashBackModel.GetDayFlowBack(this.awardId);
    };
    WndDailyCashBackUI.prototype.GetAwardResq = function (data) {
        if (!data || !data.get_point)
            return;
        Global.UI.show("WndRebateGet", data.get_point, 6);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(0, true));
        this.setAwardBtnState(false);
    };
    WndDailyCashBackUI.prototype.DescriptionDay = function (data) {
        this.OnDataPrepared();
        this.contentNode.removeAllChildren();
        if (data == null) {
            return;
        }
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].atype === 7) {
                this.refreshCfg(data.data[i].cfg);
                break;
            }
        }
    };
    WndDailyCashBackUI.prototype.refreshCfg = function (data) {
        if (!data)
            return;
        var arr = data.cfg || [];
        var dayCount = data.read_day || 0;
        var awardNum = data.day_un_read_point || 0;
        var dayFlow = data.day_flow || 0;
        this.awardId = data.read_id || "";
        this.nodeList = [];
        for (var j = 0; j < arr.length; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("CashBackDescription").Init(arr[j]);
        }
        this.myDailyCash.string = Global.Toolkit.formatPointStr(dayFlow);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(awardNum, false));
        if (AppCfg_1.default.SKIN_TYPE == SkinConfig_1.SkinType.green) {
            this.dayNum.string = dayCount + "天";
        }
        else {
            this.dayNum.string = dayCount;
        }
        this.setAwardBtnState(this.awardId != "");
    };
    WndDailyCashBackUI.prototype.initItemPool = function () {
        this.itemPool = new ItemPool(this.copyItem);
    };
    WndDailyCashBackUI.prototype.onOpen = function (args) {
        this.CashBackModel.GetActivityCfg();
    };
    WndDailyCashBackUI.prototype.onDispose = function () {
        this.CashBackModel.off(CashBackEvent_1.CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.off(CashBackEvent_1.CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    return WndDailyCashBackUI;
}(WndBase_1.default));
exports.default = WndDailyCashBackUI;
var ItemPool = /** @class */ (function (_super) {
    __extends(ItemPool, _super);
    function ItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    ItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    ItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return ItemPool;
}(PoolBase_1.default));

cc._RF.pop();