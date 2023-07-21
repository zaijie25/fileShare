
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/RankModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'edacb3RPj9AAqexsC5Jw1Tl', 'RankModel');
// hall/scripts/logic/hallcommon/model/RankModel.ts

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
var RankModel = /** @class */ (function (_super) {
    __extends(RankModel, _super);
    function RankModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataMap = {};
        return _this;
    }
    RankModel.prototype.onInit = function () {
    };
    /**
     * rank_type 1 今日盈亏榜 2财富榜 3周排行榜 4 流水日佣金榜 5 税收周佣金榜 6佣金排行榜总榜
     */
    RankModel.prototype.reqRankInfo = function (rank_type, next) {
        var _this = this;
        if (!next && this.dataMap.hasOwnProperty(rank_type)) {
            this.event(RankModel.RefreshScrollview, this.dataMap[rank_type].data);
            return;
        }
        if (!this.dataMap.hasOwnProperty(rank_type)) {
            this.dataMap[rank_type] = new RankData();
        }
        if (next) {
            var data = this.dataMap[rank_type].data || {};
            if (data.pointRankList && data.pointRankList.length >= this.dataMap[rank_type].total) {
                Global.UI.fastTip("无更多信息");
                return;
            }
            this.dataMap[rank_type].page++;
        }
        else {
            this.dataMap[rank_type].page = 0;
        }
        var param = {
            "page": this.dataMap[rank_type].page,
            "type": rank_type
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetPointRank, param, function (res) {
            _this.dataMap[rank_type].total = res.total || 100;
            var page = res.page;
            var list = res.pointRankList || [];
            if (!list) {
                return;
            }
            if (page == 0) {
                _this.dataMap[rank_type].data = res;
                _this.event(RankModel.RefreshScrollview, res);
            }
            else {
                if (_this.dataMap[rank_type].page > page)
                    return;
                _this.dataMap[rank_type].data.pointRankList = _this.dataMap[rank_type].data.pointRankList.concat(list);
                _this.event(RankModel.UpdateRankData, _this.dataMap[rank_type].data.pointRankList);
            }
        }, null, false, 60);
    };
    Object.defineProperty(RankModel.prototype, "Name", {
        get: function () {
            return "RankModel";
        },
        enumerable: false,
        configurable: true
    });
    RankModel.prototype.clear = function () {
        this.dataMap = {};
    };
    RankModel.UpdateRankData = "UpdateRankData";
    RankModel.RefreshScrollview = "RefreshScrollview";
    return RankModel;
}(ModelBase_1.default));
exports.default = RankModel;
var RankData = /** @class */ (function () {
    function RankData() {
        this.page = 0;
        this.total = 0;
        this.data = null;
    }
    return RankData;
}());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxSYW5rTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJEO0FBQzNELHlEQUEwRDtBQUUxRDtJQUF1Qyw2QkFBUztJQUFoRDtRQUFBLHFFQWtFQztRQS9EVyxhQUFPLEdBQWdDLEVBQUUsQ0FBQTs7SUErRHJELENBQUM7SUE5RGEsMEJBQU0sR0FBaEI7SUFFQSxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrQkFBVyxHQUFsQixVQUFtQixTQUFpQixFQUFFLElBQWE7UUFBbkQsaUJBNENDO1FBM0NHLElBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQ2xEO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxPQUFNO1NBQ1Q7UUFDRCxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQzFDO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFBO1NBQzNDO1FBQ0QsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDOUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUNsRixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDMUIsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNsQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxLQUFLLEdBQUc7WUFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ3BDLE1BQU0sRUFBRSxTQUFTO1NBQ3BCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsVUFBQyxHQUFHO1lBQ3ZFLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO1lBQ2pELElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDUCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNoRDtpQkFDSTtnQkFDRCxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUk7b0JBQ25DLE9BQU87Z0JBQ1gsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JHLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNwRjtRQUVMLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxzQkFBVywyQkFBSTthQUFmO1lBQ0ksT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTSx5QkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDckIsQ0FBQztJQS9EYSx3QkFBYyxHQUFHLGdCQUFnQixDQUFDO0lBQ2xDLDJCQUFpQixHQUFHLG1CQUFtQixDQUFDO0lBZ0UxRCxnQkFBQztDQWxFRCxBQWtFQyxDQWxFc0MsbUJBQVMsR0FrRS9DO2tCQWxFb0IsU0FBUztBQW9FOUI7SUFBQTtRQUNXLFNBQUksR0FBRyxDQUFDLENBQUE7UUFDUixVQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsU0FBSSxHQUFRLElBQUksQ0FBQTtJQUMzQixDQUFDO0lBQUQsZUFBQztBQUFELENBSkEsQUFJQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhbmtNb2RlbCBleHRlbmRzIE1vZGVsQmFzZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFVwZGF0ZVJhbmtEYXRhID0gXCJVcGRhdGVSYW5rRGF0YVwiO1xyXG4gICAgcHVibGljIHN0YXRpYyBSZWZyZXNoU2Nyb2xsdmlldyA9IFwiUmVmcmVzaFNjcm9sbHZpZXdcIjtcclxuICAgIHByaXZhdGUgZGF0YU1hcDogeyBba2V5OiBudW1iZXJdOiBSYW5rRGF0YSB9ID0ge31cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIG1zZzogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiByYW5rX3R5cGUgMSDku4rml6Xnm4jkuo/mppwgMui0ouWvjOamnCAz5ZGo5o6S6KGM5qacIDQg5rWB5rC05pel5L2j6YeR5qacIDUg56iO5pS25ZGo5L2j6YeR5qacIDbkvaPph5HmjpLooYzmppzmgLvmppxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlcVJhbmtJbmZvKHJhbmtfdHlwZTogbnVtYmVyLCBuZXh0OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYoIW5leHQgJiYgdGhpcy5kYXRhTWFwLmhhc093blByb3BlcnR5KHJhbmtfdHlwZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFJhbmtNb2RlbC5SZWZyZXNoU2Nyb2xsdmlldywgdGhpcy5kYXRhTWFwW3JhbmtfdHlwZV0uZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhpcy5kYXRhTWFwLmhhc093blByb3BlcnR5KHJhbmtfdHlwZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFNYXBbcmFua190eXBlXSA9IG5ldyBSYW5rRGF0YSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhTWFwW3JhbmtfdHlwZV0uZGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucG9pbnRSYW5rTGlzdCAmJiBkYXRhLnBvaW50UmFua0xpc3QubGVuZ3RoID49IHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLnRvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaXoOabtOWkmuS/oeaBr1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRhdGFNYXBbcmFua190eXBlXS5wYWdlKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhTWFwW3JhbmtfdHlwZV0ucGFnZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLnBhZ2UsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiByYW5rX3R5cGVcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRQb2ludFJhbmssIHBhcmFtLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLnRvdGFsID0gcmVzLnRvdGFsIHx8IDEwMDtcclxuICAgICAgICAgICAgbGV0IHBhZ2UgPSByZXMucGFnZTtcclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMucG9pbnRSYW5rTGlzdCB8fCBbXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBhZ2UgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTWFwW3JhbmtfdHlwZV0uZGF0YSA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQoUmFua01vZGVsLlJlZnJlc2hTY3JvbGx2aWV3LCByZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLnBhZ2UgPiBwYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLmRhdGEucG9pbnRSYW5rTGlzdCA9IHRoaXMuZGF0YU1hcFtyYW5rX3R5cGVdLmRhdGEucG9pbnRSYW5rTGlzdC5jb25jYXQobGlzdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50KFJhbmtNb2RlbC5VcGRhdGVSYW5rRGF0YSwgdGhpcy5kYXRhTWFwW3JhbmtfdHlwZV0uZGF0YS5wb2ludFJhbmtMaXN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LCBudWxsLCBmYWxzZSwgNjApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gXCJSYW5rTW9kZWxcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGF0YU1hcCA9IHt9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBSYW5rRGF0YSB7XHJcbiAgICBwdWJsaWMgcGFnZSA9IDBcclxuICAgIHB1YmxpYyB0b3RhbCA9IDBcclxuICAgIHB1YmxpYyBkYXRhIDphbnkgPSBudWxsXHJcbn0iXX0=