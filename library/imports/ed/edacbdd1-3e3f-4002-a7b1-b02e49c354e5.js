"use strict";
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