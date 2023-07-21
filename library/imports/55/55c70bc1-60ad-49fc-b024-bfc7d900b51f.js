"use strict";
cc._RF.push(module, '55c70vBYK1J/LAkv8fZALUf', 'FeedbackModel');
// hall/scripts/logic/hallcommon/model/FeedbackModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var FeedbackConstants_1 = require("../../hall/ui/Feedback/FeedbackConstants");
var FeedbackModel = /** @class */ (function (_super) {
    __extends(FeedbackModel, _super);
    function FeedbackModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.limit = 5;
        return _this;
    }
    Object.defineProperty(FeedbackModel.prototype, "Name", {
        // private data: Array<any>=[];
        get: function () {
            return "FeedbackModel";
        },
        enumerable: false,
        configurable: true
    });
    FeedbackModel.prototype.GetProblemList = function (curPage, isFromHall, isFresh, showwaiting) {
        var _this = this;
        if (isFromHall === void 0) { isFromHall = false; }
        if (isFresh === void 0) { isFresh = false; }
        if (showwaiting === void 0) { showwaiting = false; }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetProblem, { limit: this.limit, page: curPage }, function (msg) {
            var data = msg.data;
            _this.responePage = msg.page;
            _this.total = msg.total;
            _this.totalPage = Math.ceil(_this.total / _this.limit);
            _this.event(FeedbackConstants_1.FeedbackConstants.FeedbackListCallback, data);
        }, this.SpreadErronFunc.bind(this), showwaiting);
    };
    /**
     *
     * @param param
     * {
     *  "type":  //0 提交 1删除
     *	"problem":"222212" //问题 0的时候
     *	"id": 1的时候
     *  }
     *
     */
    FeedbackModel.prototype.dealFeedback = function (param, dealPage) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SetProblem, param, function (msg) {
            // let ss=msg;
            if (param.type == 0) {
                _this.event(FeedbackConstants_1.FeedbackConstants.DealFeedbackCommit);
            }
            else if (param.type == 1) {
                var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
                var feedback = rightPanelView.getView("feedback");
                feedback.clearItem(true);
                _this.GetProblemList(dealPage);
            }
        }, this.SpreadErronFunc.bind(this));
    };
    FeedbackModel.prototype.SpreadErronFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    };
    return FeedbackModel;
}(ModelBase_1.default));
exports.default = FeedbackModel;

cc._RF.pop();