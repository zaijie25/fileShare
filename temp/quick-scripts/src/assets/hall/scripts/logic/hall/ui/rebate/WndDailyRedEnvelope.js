"use strict";
cc._RF.push(module, 'b110eKVDHNM/JD1IExYqmJp', 'WndDailyRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndDailyRedEnvelope.ts

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
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndDailyRedEnvelope = /** @class */ (function (_super) {
    __extends(WndDailyRedEnvelope, _super);
    function WndDailyRedEnvelope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private closeCallback: Function;
        /**可领取 */
        _this.selectedNode = [];
        /**已经领取 */
        _this.noSelectedNode = [];
        _this.receivedNode = [];
        _this.dayImgNode = [];
        return _this;
    }
    WndDailyRedEnvelope.prototype.onInit = function () {
        this.name = "WndDailyRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/DailyRedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndDailyRedEnvelope.prototype.initView = function () {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.dayImgNode = [];
        for (var i = 0; i < 5; i++) {
            var item = this.getChild("centerNode/item" + i);
            var selected = cc.find("selectedRed", item);
            var noSelected = cc.find("unselectedRed", item);
            var received = cc.find("receivedRed", item);
            selected.active = false;
            received.active = false;
            noSelected.active = true;
            this.selectedNode.push(selected);
            this.receivedNode.push(received);
            Global.UIHelper.addCommonClick(item, "selectedRed", this.onGetDailyRed, this);
            this.noSelectedNode.push(noSelected);
        }
        var dayImgsNode = this.getChild("dayImgsNode");
        for (var i = 0; i < 5; i++) {
            var dayImg = cc.find("dayImg" + i, dayImgsNode);
            dayImg.active = true;
            this.dayImgNode.push(dayImg);
        }
        this.addCommonClick("button", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndDailyRedEnvelope.prototype.onOpenRechargeClick = function () {
        Global.UI.show("WndRecharge");
        this.closeWnd();
    };
    WndDailyRedEnvelope.prototype.onOpen = function (arr) {
        this.updateUI();
        // this.closeCallback = arr[0];
    };
    WndDailyRedEnvelope.prototype.updateUI = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetActivityCfg, {}, function (data) {
            var arr = data.data;
            for (var index = 0; index < data.data.length; index++) {
                var cfg = arr[index];
                if (cfg && cfg.atype == ActivityConstants_1.ActivityType.dailyPayRedpack) {
                    var dataArr = cfg.cfg.cfg.list;
                    for (var i = 0; i < dataArr.length; i++) {
                        var nodeData = dataArr[i];
                        var selected = _this.selectedNode[i];
                        selected.data = nodeData;
                        var noSelected = _this.noSelectedNode[i];
                        var received = _this.receivedNode[i];
                        var dayImg = _this.dayImgNode[i];
                        var selectedlabel = cc.find("jibiLabel", selected).getComponent(cc.Label);
                        var noSelectedlabel = cc.find("jibiLabel", noSelected).getComponent(cc.Label);
                        var receivedlabel = cc.find("jibiLabel", received).getComponent(cc.Label);
                        // let spine = cc.find("spine", selected);
                        selectedlabel.string = noSelectedlabel.string = receivedlabel.string = Global.Toolkit.GetMoneyFormat(nodeData.reward);
                        // 0未充值 1已充值不能领取 2可以领取 3已领取 4已失效
                        if (nodeData.status == 1) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }
                        else if (nodeData.status == 2) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }
                        else if (nodeData.status == 3) {
                            selected.active = false;
                            selected.active = false;
                            received.active = true;
                            noSelected.active = false;
                        }
                        else {
                            selected.active = true;
                            selected.active = false;
                            received.active = false;
                            noSelected.active = true;
                        }
                    }
                    break;
                }
            }
        }, null, false, 0);
    };
    WndDailyRedEnvelope.prototype.onGetDailyRed = function (target) {
        var _this = this;
        if (target && target.node && target.node.data) {
            if (target.node.data.status == 1) {
                Global.UI.fastTip("明日才可以领取红包哦");
            }
            else if (target.node.data.status == 2) {
                Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReciveDailyRedpack, {}, function (retObj) {
                    _this.updateUI();
                    Global.UI.show("WndRebateGet", retObj.recive_point, null, function () {
                    });
                }, function (error) {
                    Global.UI.fastTip(error._errstr);
                    // console.log(error);
                }, false);
            }
        }
    };
    WndDailyRedEnvelope.prototype.closeWnd = function () {
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    };
    WndDailyRedEnvelope.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.dailyPayRedpack);
    };
    WndDailyRedEnvelope.prototype.onDispose = function () {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.receivedNode = [];
    };
    return WndDailyRedEnvelope;
}(WndBase_1.default));
exports.default = WndDailyRedEnvelope;

cc._RF.pop();