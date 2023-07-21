
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzSyncHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '319dbgJd9FAMLSv1V+QdBjR', 'DdzSyncHandler');
// ddz/ddz/scripts/handlers/DdzSyncHandler.ts

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
exports.DdzSyncRefreshHandler = exports.DdzSyncEndHandler = exports.DdzSyncBeginHandler = void 0;
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzSyncBeginHandler = /** @class */ (function (_super) {
    __extends(DdzSyncBeginHandler, _super);
    function DdzSyncBeginHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncBeginHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = true;
    };
    DdzSyncBeginHandler.prototype.execute = function (msg) {
        DdzDriver_1.default.instance.beginSync();
    };
    return DdzSyncBeginHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncBeginHandler = DdzSyncBeginHandler;
var DdzSyncEndHandler = /** @class */ (function (_super) {
    __extends(DdzSyncEndHandler, _super);
    function DdzSyncEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncEndHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = false;
    };
    return DdzSyncEndHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncEndHandler = DdzSyncEndHandler;
var DdzSyncRefreshHandler = /** @class */ (function (_super) {
    __extends(DdzSyncRefreshHandler, _super);
    function DdzSyncRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzSyncRefreshHandler.prototype.execute = function (msg) {
        var _this = this;
        this.context.updateMarkerData(msg._para.out_cards);
        var userPlays = msg._para.user_plays;
        var bombCount = msg._para.bomb_count;
        if (bombCount && bombCount > 0) {
            if (!this.context.get(this.Define.FieldBombBgm)) {
                Global.Audio.playGameBundleMusic(DdzPathHelper_1.DdzAudioConst.Bgm2, true);
                this.context.set(this.Define.FieldBombBgm, true);
            }
        }
        if (userPlays && userPlays.length > 0) {
            userPlays.forEach(function (user) {
                var pokers = user.cards;
                var type = user.type;
                var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
                var isPlay = user.status == 1;
                if (isPlay && pokers && type) {
                    // 已出牌显示
                    _this.context.set(_this.Define.FieldOnOutPokers, DdzDriver_1.default.instance.PlayRuleHelper.getPokersType(pokers)); // 需要按顺序来
                    _this.mainUI.callPlayer(localSeat, 'showPlayPokers', true, pokers, false);
                }
                else {
                    _this.mainUI.callPlayer(localSeat, 'setState', true, DdzGameConst_1.DdzGameActState.Play, 0);
                }
            });
        }
    };
    return DdzSyncRefreshHandler;
}(DdzBaseHandler_1.default));
exports.DdzSyncRefreshHandler = DdzSyncRefreshHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpTeW5jSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLHFEQUF1RDtBQUV2RCx1REFBc0Q7QUFDdEQsMENBQXFDO0FBRXJDO0lBQXlDLHVDQUFjO0lBQXZEOztJQVVBLENBQUM7SUFUYSx5Q0FBVyxHQUFyQixVQUFzQixHQUFHO1FBRXJCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRVMscUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUVqQixtQkFBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQVZBLEFBVUMsQ0FWd0Msd0JBQWMsR0FVdEQ7QUFWWSxrREFBbUI7QUFhaEM7SUFBdUMscUNBQWM7SUFBckQ7O0lBS0EsQ0FBQztJQUphLHVDQUFXLEdBQXJCLFVBQXNCLEdBQUc7UUFFckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLENBQUM7SUFDTCx3QkFBQztBQUFELENBTEEsQUFLQyxDQUxzQyx3QkFBYyxHQUtwRDtBQUxZLDhDQUFpQjtBQU85QjtJQUEyQyx5Q0FBYztJQUF6RDs7SUE0QkEsQ0FBQztJQTNCYSx1Q0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQXJCLGlCQTBCQztRQXpCRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDckMsSUFBSSxTQUFTLElBQUksU0FBUyxHQUFHLENBQUMsRUFBQztZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQztnQkFDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyw2QkFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDcEQ7U0FDSjtRQUNELElBQUksU0FBUyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNyQixJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO2dCQUM5QixJQUFHLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFDO29CQUN4QixRQUFRO29CQUNSLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsbUJBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUksU0FBUztvQkFDckgsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQzVFO3FCQUNHO29CQUNBLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLDhCQUFlLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQTVCQSxBQTRCQyxDQTVCMEMsd0JBQWMsR0E0QnhEO0FBNUJZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5pbXBvcnQgeyBEZHpHYW1lQWN0U3RhdGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IERkelJ1bGVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuaW1wb3J0IHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGR6U3luY0JlZ2luSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuc3luY01vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZylcclxuICAgIHtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UuYmVnaW5TeW5jKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRGR6U3luY0VuZEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCByZWZyZXNoRGF0YShtc2cpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnN5bmNNb2RlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEZHpTeW5jUmVmcmVzaEhhbmRsZXIgZXh0ZW5kcyBEZHpCYXNlSGFuZGxlcntcclxuICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LnVwZGF0ZU1hcmtlckRhdGEobXNnLl9wYXJhLm91dF9jYXJkcyk7XHJcbiAgICAgICAgbGV0IHVzZXJQbGF5cyA9IG1zZy5fcGFyYS51c2VyX3BsYXlzO1xyXG4gICAgICAgIGxldCBib21iQ291bnQgPSBtc2cuX3BhcmEuYm9tYl9jb3VudDtcclxuICAgICAgICBpZiAoYm9tYkNvdW50ICYmIGJvbWJDb3VudCA+IDApe1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRCb21iQmdtKSl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVNdXNpYyhEZHpBdWRpb0NvbnN0LkJnbTIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEJvbWJCZ20sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1c2VyUGxheXMgJiYgdXNlclBsYXlzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB1c2VyUGxheXMuZm9yRWFjaCh1c2VyID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2tlcnMgPSB1c2VyLmNhcmRzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB1c2VyLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKHVzZXIuY2hhaXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzUGxheSA9IHVzZXIuc3RhdHVzID09IDE7XHJcbiAgICAgICAgICAgICAgICBpZihpc1BsYXkgJiYgcG9rZXJzICYmIHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW3suWHuueJjOaYvuekulxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5zZXQodGhpcy5EZWZpbmUuRmllbGRPbk91dFBva2VycywgRGR6RHJpdmVyLmluc3RhbmNlLlBsYXlSdWxlSGVscGVyLmdldFBva2Vyc1R5cGUocG9rZXJzKSk7ICAgIC8vIOmcgOimgeaMiemhuuW6j+adpVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd1BsYXlQb2tlcnMnLCB0cnVlLCBwb2tlcnMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluVUkuY2FsbFBsYXllcihsb2NhbFNlYXQsICdzZXRTdGF0ZScsIHRydWUsIERkekdhbWVBY3RTdGF0ZS5QbGF5LCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19