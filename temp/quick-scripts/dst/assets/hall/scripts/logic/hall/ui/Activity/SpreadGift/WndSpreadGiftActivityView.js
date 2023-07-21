
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/SpreadGift/WndSpreadGiftActivityView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a73fab4kS5MIJRdAXZGI3Mw', 'WndSpreadGiftActivityView');
// hall/scripts/logic/hall/ui/Activity/SpreadGift/WndSpreadGiftActivityView.ts

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
exports.RedPackState = void 0;
var YXButton_1 = require("../../../../core/component/YXButton");
var WndBase_1 = require("../../../../core/ui/WndBase");
var RechargeGiftModel_1 = require("../../../../hallcommon/model/RechargeGiftModel");
var HallPopMsgHelper_1 = require("../../../tool/HallPopMsgHelper");
var ActivityConstants_1 = require("../ActivityConstants");
var SpreadGiftItemView_1 = require("./SpreadGiftItemView");
var WndSpreadGiftActivityView = /** @class */ (function (_super) {
    __extends(WndSpreadGiftActivityView, _super);
    function WndSpreadGiftActivityView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.achieveIndex = -1;
        return _this;
    }
    WndSpreadGiftActivityView.prototype.onInit = function () {
        this.name = "WndSpreadGiftActivityView";
        this.isNeedDelay = false;
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadGift/spreadGiftNode";
    };
    WndSpreadGiftActivityView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeGiftModel");
        this.model.on(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.on(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
        this.personLabel = this.getComponent("count", cc.Label);
        this.monthAwardLabel = this.getComponent("monthAward", cc.Label);
        this.rechargePointLabel = this.getComponent("rechargePoint", cc.Label);
        for (var index = 0; index < 7; index++) {
            this.addCommonClick(cc.js.formatStr("sco/view/awardPanel/redPack_%s", index), this.onAwardBtnClicked, this);
        }
        // this.sc0Node = this.getComponent("sco", cc.ScrollView)
        // this.addCommonClick("sco/clickLeft", this.onClickLeftSco, this)
        // this.addCommonClick("sco/clickReight", this.onClickReightSco, this)
        // this.clickLeft = this.getChild("sco/clickLeft");
        // this.clickReight = this.getChild("sco/clickReight");
        // this.sc0Node.node.on("scroll-to-left",this.onClickLeftSco,this)
        // this.sc0Node.node.on("scroll-to-right",this.onClickReightSco,this)
        // this.onClickLeftSco();
        this.addCommonClick("close", this.close, this);
    };
    WndSpreadGiftActivityView.prototype.onClickLeftSco = function () {
        this.clickLeft.getComponent(YXButton_1.default).interactable = false;
        this.sc0Node.scrollToLeft(0.5);
        this.clickReight.getComponent(YXButton_1.default).interactable = true;
    };
    WndSpreadGiftActivityView.prototype.onClickReightSco = function () {
        this.clickReight.getComponent(YXButton_1.default).interactable = false;
        this.sc0Node.scrollToRight(0.5);
        this.clickLeft.getComponent(YXButton_1.default).interactable = true;
    };
    WndSpreadGiftActivityView.prototype.onAwardBtnClicked = function (target) {
        this.model.reqReceiveActivityAward(ActivityConstants_1.ActivityType.spreadAward);
    };
    WndSpreadGiftActivityView.prototype.onOpen = function () {
        this.model.reqGetActivityCfg(false);
    };
    WndSpreadGiftActivityView.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.spreadAward);
    };
    WndSpreadGiftActivityView.prototype.onGetAward = function (awardData) {
        if (awardData && awardData.atype != ActivityConstants_1.ActivityType.spreadAward) {
            return;
        }
        Global.UI.show("WndRebateGet", awardData.award);
        var giftItem = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s", this.achieveIndex), SpreadGiftItemView_1.default);
        if (giftItem) {
            giftItem.RefreshState(RedPackState.Open, null);
        }
        Global.Event.event(ActivityConstants_1.ActivityConstants.HIDE_RED_PORT, awardData.atype);
    };
    WndSpreadGiftActivityView.prototype.onDispose = function () {
        this.model.off(RechargeGiftModel_1.default.GetAward, this, this.onGetAward);
        this.model.off(RechargeGiftModel_1.default.GetCfg, this, this.onGetConfig);
    };
    WndSpreadGiftActivityView.prototype.onGetConfig = function (data) {
        if (data == null)
            return;
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
        var arr = data.data;
        if (arr == null)
            return;
        for (var index = 0; index < arr.length; index++) {
            if (arr[index].atype == ActivityConstants_1.ActivityType.spreadAward) {
                var actData = arr[index].cfg;
                this.achieveIndex = actData.doc;
                this.personLabel.string = cc.js.formatStr("%s", actData.num);
                this.rechargePointLabel.string = Global.Toolkit.formatPointStr(actData.pay);
                for (var index_1 = 0; index_1 < actData.list.length; index_1++) {
                    var element = actData.list[index_1];
                    var redPackState = this.getSpreadGiftItemState(actData.doc, index_1);
                    var giftItem = this.getComponent(cc.js.formatStr("sco/view/awardPanel/redPack_%s", index_1), SpreadGiftItemView_1.default);
                    if (giftItem) {
                        giftItem.RefreshState(redPackState, element);
                    }
                    if (index_1 == actData.list.length - 1) {
                        this.monthAwardLabel.string = Global.Toolkit.formatPointStr(actData.list[index_1].point);
                    }
                }
            }
        }
    };
    WndSpreadGiftActivityView.prototype.getSpreadGiftItemState = function (index, dataIndex) {
        if (index === -1) {
            return RedPackState.Normal;
        }
        if (index === dataIndex) {
            return RedPackState.HightLight;
        }
        return RedPackState.Normal;
    };
    return WndSpreadGiftActivityView;
}(WndBase_1.default));
exports.default = WndSpreadGiftActivityView;
var RedPackState;
(function (RedPackState) {
    RedPackState[RedPackState["Normal"] = 0] = "Normal";
    RedPackState[RedPackState["HightLight"] = 1] = "HightLight";
    RedPackState[RedPackState["Open"] = 2] = "Open";
    RedPackState[RedPackState["None"] = 3] = "None";
})(RedPackState = exports.RedPackState || (exports.RedPackState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcU3ByZWFkR2lmdFxcV25kU3ByZWFkR2lmdEFjdGl2aXR5Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBRTNELHVEQUFrRDtBQUNsRCxvRkFBK0U7QUFDL0UsbUVBQThEO0FBQzlELDBEQUF1RTtBQUN2RSwyREFBc0Q7QUFHdEQ7SUFBdUQsNkNBQU87SUFBOUQ7UUFBQSxxRUFzSUM7UUFqSVcsa0JBQVksR0FBRyxDQUFDLENBQUMsQ0FBQTs7SUFpSTdCLENBQUM7SUE1SGEsMENBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLDJCQUEyQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRywyQ0FBMkMsQ0FBQTtJQUM5RCxDQUFDO0lBRVMsNENBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFzQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWxGLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLDJCQUFpQixDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLDJCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBR3RELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQy9ELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDckUsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUFDLEtBQUssQ0FBQyxFQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUMzRztRQUNELHlEQUF5RDtRQUN6RCxrRUFBa0U7UUFDbEUsc0VBQXNFO1FBQ3RFLG1EQUFtRDtRQUNuRCx1REFBdUQ7UUFDdkQsa0VBQWtFO1FBQ2xFLHFFQUFxRTtRQUNyRSx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUVoRCxDQUFDO0lBQ0Qsa0RBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO1FBQzFELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO0lBQy9ELENBQUM7SUFDRCxvREFBZ0IsR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtJQUM3RCxDQUFDO0lBQ0QscURBQWlCLEdBQWpCLFVBQWtCLE1BQU07UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxnQ0FBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUFFUywwQ0FBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFdkMsQ0FBQztJQUdTLDJDQUFPLEdBQWpCO1FBRUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFHTyw4Q0FBVSxHQUFsQixVQUFtQixTQUFTO1FBQ3hCLElBQUcsU0FBUyxJQUFJLFNBQVMsQ0FBQyxLQUFLLElBQUksZ0NBQVksQ0FBQyxXQUFXLEVBQzNEO1lBQ0ksT0FBTTtTQUNUO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLFFBQVEsR0FBdUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQ0FBZ0MsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsNEJBQWtCLENBQUMsQ0FBQTtRQUM1SSxJQUFHLFFBQVEsRUFDWDtZQUNJLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQTtTQUNoRDtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHFDQUFpQixDQUFDLGFBQWEsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFdkUsQ0FBQztJQUNTLDZDQUFTLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsMkJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsMkJBQWlCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNPLCtDQUFXLEdBQW5CLFVBQW9CLElBQUk7UUFDcEIsSUFBRyxJQUFJLElBQUksSUFBSTtZQUFFLE9BQU07UUFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMscUNBQWlCLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDOUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUNuQixJQUFHLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTTtRQUN0QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUU3QyxJQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLElBQUksZ0NBQVksQ0FBQyxXQUFXLEVBQy9DO2dCQUNJLElBQUssT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUE7Z0JBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtnQkFFL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDM0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNFLEtBQUssSUFBSSxPQUFLLEdBQUcsQ0FBQyxFQUFFLE9BQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFLLEVBQUUsRUFBRTtvQkFDdEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFLLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsT0FBSyxDQUFDLENBQUE7b0JBQ2pFLElBQUksUUFBUSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUFDLE9BQUssQ0FBQyxFQUFDLDRCQUFrQixDQUFDLENBQUE7b0JBQ2hJLElBQUcsUUFBUSxFQUNYO3dCQUNJLFFBQVEsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFDLE9BQU8sQ0FBQyxDQUFBO3FCQUM5QztvQkFDRCxJQUFHLE9BQUssSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRSxDQUFDLEVBQ2xDO3dCQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7cUJBQzFGO2lCQUNKO2FBRUo7U0FDSjtJQUVMLENBQUM7SUFHRCwwREFBc0IsR0FBdEIsVUFBdUIsS0FBSyxFQUFDLFNBQVM7UUFFbEMsSUFBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQ2Y7WUFDSSxPQUFPLFlBQVksQ0FBQyxNQUFNLENBQUE7U0FDN0I7UUFDRCxJQUFHLEtBQUssS0FBSyxTQUFTLEVBQ3RCO1lBQ0ksT0FBTyxZQUFZLENBQUMsVUFBVSxDQUFBO1NBQ2pDO1FBQ0QsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFBO0lBRTlCLENBQUM7SUFFTCxnQ0FBQztBQUFELENBdElBLEFBc0lDLENBdElzRCxpQkFBTyxHQXNJN0Q7O0FBRUQsSUFBWSxZQU1YO0FBTkQsV0FBWSxZQUFZO0lBRXBCLG1EQUFVLENBQUE7SUFDViwyREFBYyxDQUFBO0lBQ2QsK0NBQVEsQ0FBQTtJQUNSLCtDQUFRLENBQUE7QUFDWixDQUFDLEVBTlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFNdkIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgSGFsbFBvcE1zZ0hlbHBlciBmcm9tIFwiLi4vLi4vLi4vdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5Q29uc3RhbnRzLCBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHlDb25zdGFudHNcIjtcclxuaW1wb3J0IFNwcmVhZEdpZnRJdGVtVmlldyBmcm9tIFwiLi9TcHJlYWRHaWZ0SXRlbVZpZXdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRTcHJlYWRHaWZ0QWN0aXZpdHlWaWV3IGV4dGVuZHMgV25kQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbDogUmVjaGFyZ2VHaWZ0TW9kZWxcclxuICAgIHByaXZhdGUgcGVyc29uTGFiZWwgOmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIHJlY2hhcmdlUG9pbnRMYWJlbCA6Y2MuTGFiZWxcclxuICAgIHByaXZhdGUgYWNoaWV2ZUluZGV4ID0gLTFcclxuICAgIHByaXZhdGUgbW9udGhBd2FyZExhYmVsOmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIHNjME5vZGU6IGNjLlNjcm9sbFZpZXdcclxuICAgIHByaXZhdGUgY2xpY2tMZWZ0OiBjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGNsaWNrUmVpZ2h0OiBjYy5Ob2RlXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRTcHJlYWRHaWZ0QWN0aXZpdHlWaWV3XCI7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9TcHJlYWRHaWZ0L3NwcmVhZEdpZnROb2RlXCJcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxSZWNoYXJnZUdpZnRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VHaWZ0TW9kZWxcIik7XHJcblxyXG4gICAgICAgIHRoaXMubW9kZWwub24oUmVjaGFyZ2VHaWZ0TW9kZWwuR2V0QXdhcmQsIHRoaXMsIHRoaXMub25HZXRBd2FyZCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihSZWNoYXJnZUdpZnRNb2RlbC5HZXRDZmcsIHRoaXMsIHRoaXMub25HZXRDb25maWcpO1xyXG4gICAgICAgIHRoaXMucGVyc29uTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcImNvdW50XCIsY2MuTGFiZWwpXHJcbiAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubW9udGhBd2FyZExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJtb250aEF3YXJkXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVBvaW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInJlY2hhcmdlUG9pbnRcIixjYy5MYWJlbClcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgNzsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKGNjLmpzLmZvcm1hdFN0cihcInNjby92aWV3L2F3YXJkUGFuZWwvcmVkUGFja18lc1wiLGluZGV4KSx0aGlzLm9uQXdhcmRCdG5DbGlja2VkLHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMuc2MwTm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic2NvXCIsIGNjLlNjcm9sbFZpZXcpXHJcbiAgICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcInNjby9jbGlja0xlZnRcIiwgdGhpcy5vbkNsaWNrTGVmdFNjbywgdGhpcylcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwic2NvL2NsaWNrUmVpZ2h0XCIsIHRoaXMub25DbGlja1JlaWdodFNjbywgdGhpcylcclxuICAgICAgICAvLyB0aGlzLmNsaWNrTGVmdCA9IHRoaXMuZ2V0Q2hpbGQoXCJzY28vY2xpY2tMZWZ0XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuY2xpY2tSZWlnaHQgPSB0aGlzLmdldENoaWxkKFwic2NvL2NsaWNrUmVpZ2h0XCIpO1xyXG4gICAgICAgIC8vIHRoaXMuc2MwTm9kZS5ub2RlLm9uKFwic2Nyb2xsLXRvLWxlZnRcIix0aGlzLm9uQ2xpY2tMZWZ0U2NvLHRoaXMpXHJcbiAgICAgICAgLy8gdGhpcy5zYzBOb2RlLm5vZGUub24oXCJzY3JvbGwtdG8tcmlnaHRcIix0aGlzLm9uQ2xpY2tSZWlnaHRTY28sdGhpcylcclxuICAgICAgICAvLyB0aGlzLm9uQ2xpY2tMZWZ0U2NvKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsdGhpcy5jbG9zZSx0aGlzKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25DbGlja0xlZnRTY28oKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja0xlZnQuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2MwTm9kZS5zY3JvbGxUb0xlZnQoMC41KVxyXG4gICAgICAgIHRoaXMuY2xpY2tSZWlnaHQuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKS5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICB9XHJcbiAgICBvbkNsaWNrUmVpZ2h0U2NvKCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tSZWlnaHQuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKS5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2MwTm9kZS5zY3JvbGxUb1JpZ2h0KDAuNSlcclxuICAgICAgICB0aGlzLmNsaWNrTGVmdC5nZXRDb21wb25lbnQoWVhCdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWVcclxuICAgIH1cclxuICAgIG9uQXdhcmRCdG5DbGlja2VkKHRhcmdldCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVxUmVjZWl2ZUFjdGl2aXR5QXdhcmQoQWN0aXZpdHlUeXBlLnNwcmVhZEF3YXJkKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRBY3Rpdml0eUNmZyhmYWxzZSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKEFjdGl2aXR5VHlwZS5zcHJlYWRBd2FyZCk7XHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHByaXZhdGUgb25HZXRBd2FyZChhd2FyZERhdGEpIHtcclxuICAgICAgICBpZihhd2FyZERhdGEgJiYgYXdhcmREYXRhLmF0eXBlICE9IEFjdGl2aXR5VHlwZS5zcHJlYWRBd2FyZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBhd2FyZERhdGEuYXdhcmQpO1xyXG4gICAgICAgIGxldCBnaWZ0SXRlbSA6U3ByZWFkR2lmdEl0ZW1WaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuanMuZm9ybWF0U3RyKFwic2NvL3ZpZXcvYXdhcmRQYW5lbC9yZWRQYWNrXyVzXCIsdGhpcy5hY2hpZXZlSW5kZXgpLFNwcmVhZEdpZnRJdGVtVmlldylcclxuICAgICAgICBpZihnaWZ0SXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdpZnRJdGVtLlJlZnJlc2hTdGF0ZShSZWRQYWNrU3RhdGUuT3BlbixudWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuSElERV9SRURfUE9SVCxhd2FyZERhdGEuYXR5cGUpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldEF3YXJkLCB0aGlzLCB0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlR2lmdE1vZGVsLkdldENmZywgdGhpcywgdGhpcy5vbkdldENvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uR2V0Q29uZmlnKGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhID09IG51bGwpIHJldHVyblxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5TSE9XX0FDVF9XQUlUVElORywgZmFsc2UpXHJcbiAgICAgICAgbGV0IGFyciA9IGRhdGEuZGF0YVxyXG4gICAgICAgIGlmKGFyciA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYXJyW2luZGV4XS5hdHlwZSA9PSBBY3Rpdml0eVR5cGUuc3ByZWFkQXdhcmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCAgYWN0RGF0YSA9IGFycltpbmRleF0uY2ZnXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjaGlldmVJbmRleCA9IGFjdERhdGEuZG9jXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25MYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlc1wiLGFjdERhdGEubnVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNoYXJnZVBvaW50TGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoYWN0RGF0YS5wYXkpXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYWN0RGF0YS5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gYWN0RGF0YS5saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVkUGFja1N0YXRlID0gdGhpcy5nZXRTcHJlYWRHaWZ0SXRlbVN0YXRlKGFjdERhdGEuZG9jLGluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBnaWZ0SXRlbSA6U3ByZWFkR2lmdEl0ZW1WaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuanMuZm9ybWF0U3RyKFwic2NvL3ZpZXcvYXdhcmRQYW5lbC9yZWRQYWNrXyVzXCIsaW5kZXgpLFNwcmVhZEdpZnRJdGVtVmlldylcclxuICAgICAgICAgICAgICAgICAgICBpZihnaWZ0SXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpZnRJdGVtLlJlZnJlc2hTdGF0ZShyZWRQYWNrU3RhdGUsZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gYWN0RGF0YS5saXN0Lmxlbmd0aCAtMSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9udGhBd2FyZExhYmVsLnN0cmluZyA9ICBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihhY3REYXRhLmxpc3RbaW5kZXhdLnBvaW50KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2V0U3ByZWFkR2lmdEl0ZW1TdGF0ZShpbmRleCxkYXRhSW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5kZXggPT09IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlZFBhY2tTdGF0ZS5Ob3JtYWxcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXggPT09IGRhdGFJbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWRQYWNrU3RhdGUuSGlnaHRMaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUmVkUGFja1N0YXRlLk5vcm1hbFxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJlZFBhY2tTdGF0ZVxyXG57XHJcbiAgICBOb3JtYWwgPSAwLFxyXG4gICAgSGlnaHRMaWdodCA9IDEsXHJcbiAgICBPcGVuID0gMixcclxuICAgIE5vbmUgPSAzXHJcbn0iXX0=