
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/FeedbackModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxGZWVkYmFja01vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBdUQ7QUFDdkQsOEVBQTZFO0FBSTdFO0lBQTJDLGlDQUFTO0lBQXBEO1FBQUEscUVBeURDO1FBbkRXLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBbUQ5QixDQUFDO0lBaERHLHNCQUFXLCtCQUFJO1FBRmYsK0JBQStCO2FBRS9CO1lBQ0ksT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFFTSxzQ0FBYyxHQUFyQixVQUFzQixPQUFjLEVBQUUsVUFBMkIsRUFBRSxPQUFzQixFQUFDLFdBQTRCO1FBQXRILGlCQVNDO1FBVHFDLDJCQUFBLEVBQUEsa0JBQTJCO1FBQUUsd0JBQUEsRUFBQSxlQUFzQjtRQUFDLDRCQUFBLEVBQUEsbUJBQTRCO1FBQ2xILE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsVUFBVSxFQUFFLEVBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFDLFVBQUMsR0FBRztZQUM5RixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUM1QixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELEtBQUksQ0FBQyxLQUFLLENBQUMscUNBQWlCLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUQsQ0FBQyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxvQ0FBWSxHQUFuQixVQUFvQixLQUFLLEVBQUUsUUFBZ0I7UUFBM0MsaUJBWUM7UUFYRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsVUFBQyxHQUFHO1lBQ3BFLGNBQWM7WUFDZCxJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUUsQ0FBQyxFQUFDO2dCQUNiLEtBQUksQ0FBQyxLQUFLLENBQUMscUNBQWlCLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNwRDtpQkFBSyxJQUFHLEtBQUssQ0FBQyxJQUFJLElBQUUsQ0FBQyxFQUFDO2dCQUNuQixJQUFJLGNBQWMsR0FBbUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2xHLElBQUksUUFBUSxHQUFpQixjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVPLHVDQUFlLEdBQXZCLFVBQXlCLElBQVU7UUFDL0IsSUFBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBQztZQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0wsb0JBQUM7QUFBRCxDQXpEQSxBQXlEQyxDQXpEMEMsbUJBQVMsR0F5RG5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQge05ldEFwcGZhY2V9IGZyb20gXCIuLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCJcclxuaW1wb3J0IHsgRmVlZGJhY2tDb25zdGFudHMgfSBmcm9tIFwiLi4vLi4vaGFsbC91aS9GZWVkYmFjay9GZWVkYmFja0NvbnN0YW50c1wiO1xyXG5pbXBvcnQgUmlnaHRQYW5lbFZpZXcgZnJvbSBcIi4uLy4uL2hhbGwvdWkvRmVlZGJhY2svUmlnaHRQYW5lbFZpZXdcIjtcclxuaW1wb3J0IEZlZWRiYWNrVmlldyBmcm9tIFwiLi4vLi4vaGFsbC91aS9GZWVkYmFjay9GZWVkYmFja1ZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcblxyXG5cclxuICAgIHByaXZhdGUgdG90YWw6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0b3RhbFBhZ2U6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZXNwb25lUGFnZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsaW1pdDogbnVtYmVyID0gNTtcclxuICAgIC8vIHByaXZhdGUgZGF0YTogQXJyYXk8YW55Pj1bXTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKXtcclxuICAgICAgICByZXR1cm4gXCJGZWVkYmFja01vZGVsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFByb2JsZW1MaXN0KGN1clBhZ2U6bnVtYmVyLCBpc0Zyb21IYWxsIDpib29sZWFuID0gZmFsc2UsIGlzRnJlc2ggOmJvb2xlYW49ZmFsc2Usc2hvd3dhaXRpbmcgOmJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRQcm9ibGVtLCB7bGltaXQ6dGhpcy5saW1pdCxwYWdlOmN1clBhZ2V9LChtc2cpID0+e1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IG1zZy5kYXRhO1xyXG4gICAgICAgICAgICB0aGlzLnJlc3BvbmVQYWdlID0gbXNnLnBhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWwgPSBtc2cudG90YWw7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxQYWdlID0gTWF0aC5jZWlsKHRoaXMudG90YWwvdGhpcy5saW1pdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoRmVlZGJhY2tDb25zdGFudHMuRmVlZGJhY2tMaXN0Q2FsbGJhY2ssZGF0YSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sdGhpcy5TcHJlYWRFcnJvbkZ1bmMuYmluZCh0aGlzKSwgc2hvd3dhaXRpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gXHJcbiAgICAgKiB7XHJcbiAgICAgKiAgXCJ0eXBlXCI6ICAvLzAg5o+Q5LqkIDHliKDpmaRcclxuXHQgKlx0XCJwcm9ibGVtXCI6XCIyMjIyMTJcIiAvL+mXrumimCAw55qE5pe25YCZXHJcbiAgICAgKlx0XCJpZFwiOiAx55qE5pe25YCZXHJcbiAgICAgKiAgfVxyXG4gICAgICogICAgIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhbEZlZWRiYWNrKHBhcmFtLCBkZWFsUGFnZTogbnVtYmVyKXtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlNldFByb2JsZW0sIHBhcmFtLChtc2cpID0+e1xyXG4gICAgICAgICAgICAvLyBsZXQgc3M9bXNnO1xyXG4gICAgICAgICAgICBpZihwYXJhbS50eXBlPT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQoRmVlZGJhY2tDb25zdGFudHMuRGVhbEZlZWRiYWNrQ29tbWl0KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYocGFyYW0udHlwZT09MSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRQYW5lbFZpZXcgPSA8UmlnaHRQYW5lbFZpZXc+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEZlZWRiYWNrXCIpLmdldFZpZXcoXCJSaWdodFBhbmVsVmlld1wiKTtcclxuICAgICAgICAgICAgICAgIGxldCBmZWVkYmFjayA9IDxGZWVkYmFja1ZpZXc+cmlnaHRQYW5lbFZpZXcuZ2V0VmlldyhcImZlZWRiYWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgZmVlZGJhY2suY2xlYXJJdGVtKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZXRQcm9ibGVtTGlzdChkZWFsUGFnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIFNwcmVhZEVycm9uRnVuYyggZGF0YSA6IGFueSApe1xyXG4gICAgICAgIGlmKGRhdGEuX2VycnN0ciAhPSBudWxsKXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZGF0YS5fZXJyc3RyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG5cclxufSJdfQ==