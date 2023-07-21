
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/SignActivityModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'afa2fawGchEOKZzKi2GKisd', 'SignActivityModel');
// hall/scripts/logic/hallcommon/model/SignActivityModel.ts

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
var ActivityConstants_1 = require("../../hall/ui/Activity/ActivityConstants");
var SignActivityModel = /** @class */ (function (_super) {
    __extends(SignActivityModel, _super);
    function SignActivityModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 红点控制
         */
        _this._redFlag = false;
        _this.actData = null;
        return _this;
    }
    Object.defineProperty(SignActivityModel.prototype, "Name", {
        get: function () {
            return "SignActivityModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignActivityModel.prototype, "redSwitch", {
        get: function () {
            return this._redFlag;
        },
        set: function (flag) {
            this._redFlag = flag;
        },
        enumerable: false,
        configurable: true
    });
    SignActivityModel.prototype.onInit = function () {
    };
    SignActivityModel.prototype.reqReceiveActivityAward = function (activityId, key) {
        var _this = this;
        var param = {};
        param.atype = activityId;
        param.key = key;
        Global.HallServer.send(NetAppface.mod, NetAppface.ReceiveActivityAward, param, function (data) {
            _this.event(SignActivityModel.OnGetAward, data);
        }, null, true, 0);
    };
    SignActivityModel.prototype.reqGetActivityCfg = function (showWaiting) {
        var _this = this;
        if (showWaiting === void 0) { showWaiting = false; }
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "reqGetActivityCfg");
        var param = {};
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, param, function (data) {
            var arr = data.data;
            for (var index = 0; index < arr.length; index++) {
                var cfg = arr[index];
                if (cfg && cfg.atype == ActivityConstants_1.RightViewType.signActivity) {
                    _this.actData = cfg.cfg;
                    break;
                }
            }
            _this.event(SignActivityModel.UpdataPanel, _this.actData);
        }, null, showWaiting, 0);
    };
    SignActivityModel.prototype.checkFlowStatusFinish = function () {
        if (!this.actData) {
            this.redSwitch = false;
            return false;
        }
        var day = this.actData.day;
        if (day == 4) {
            return true;
        }
        for (var index = 0; index < this.actData.list.length; index++) {
            var element = this.actData.list[index];
            switch (day) {
                case 1:
                    var dayOneData = element.one;
                    if (dayOneData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                case 2:
                    var dayTwoData = element.two;
                    if (dayTwoData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                case 3:
                    var dayThirdData = element.three;
                    if (dayThirdData.flow_status === 0) {
                        this.redSwitch = false;
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        this.redSwitch = this.actData.status == 1;
        return this.actData.status == 1;
    };
    SignActivityModel.UpdataPanel = "UpdataPanel";
    SignActivityModel.OnGetAward = "OnGetAward";
    return SignActivityModel;
}(ModelBase_1.default));
exports.default = SignActivityModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxTaWduQWN0aXZpdHlNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QsOEVBQXlFO0FBSXpFO0lBQStDLHFDQUFTO0lBQXhEO1FBQUEscUVBa0hDO1FBMUdHOztXQUVHO1FBQ0ssY0FBUSxHQUFXLEtBQUssQ0FBQTtRQWF4QixhQUFPLEdBQUcsSUFBSSxDQUFBOztJQTBGMUIsQ0FBQztJQS9HRyxzQkFBVyxtQ0FBSTthQUFmO1lBRUksT0FBTyxtQkFBbUIsQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQU9ELHNCQUFXLHdDQUFTO2FBTXBCO1lBRUcsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO1FBQ3ZCLENBQUM7YUFURCxVQUFxQixJQUFJO1lBRXJCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBRXhCLENBQUM7OztPQUFBO0lBY1Msa0NBQU0sR0FBaEI7SUFFQSxDQUFDO0lBR0csbURBQXVCLEdBQTlCLFVBQStCLFVBQWlCLEVBQUMsR0FBVztRQUE1RCxpQkFPSTtRQU5HLElBQUksS0FBSyxHQUFRLEVBQUUsQ0FBQTtRQUNuQixLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQTtRQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtRQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxVQUFDLElBQUk7WUFDaEYsS0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDakQsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLDZDQUFpQixH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Q0FBQTtJQUUzQiw0QkFBVSxHQUFHLFlBQVksQ0FBQTtJQXFGM0Msd0JBQUM7Q0FsSEQsQUFrSEMsQ0FsSDhDLG1CQUFTLEdBa0h2RDtrQkFsSG9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgUmlnaHRWaWV3VHlwZSB9IGZyb20gXCIuLi8uLi9oYWxsL3VpL0FjdGl2aXR5L0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpZ25BY3Rpdml0eU1vZGVsIGV4dGVuZHMgTW9kZWxCYXNle1xyXG4gICBcclxuICAgXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlNpZ25BY3Rpdml0eU1vZGVsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnuqLngrnmjqfliLZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVkRmxhZzpib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBwdWJsaWMgc2V0IHJlZFN3aXRjaChmbGFnKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JlZEZsYWcgPSBmbGFnXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCByZWRTd2l0Y2goKVxyXG4gICAge1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX3JlZEZsYWdcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFjdERhdGEgPSBudWxsXHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVXBkYXRhUGFuZWwgPSBcIlVwZGF0YVBhbmVsXCJcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE9uR2V0QXdhcmQgPSBcIk9uR2V0QXdhcmRcIlxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gcHVibGljIHJlcVJlY2VpdmVBY3Rpdml0eUF3YXJkKGFjdGl2aXR5SWQ6bnVtYmVyLGtleT86bnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgIHBhcmFtLmF0eXBlID0gYWN0aXZpdHlJZFxyXG4gICAgICAgIHBhcmFtLmtleSA9IGtleVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuUmVjZWl2ZUFjdGl2aXR5QXdhcmQsIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFNpZ25BY3Rpdml0eU1vZGVsLk9uR2V0QXdhcmQsZGF0YSlcclxuICAgICAgICB9LCBudWxsLCB0cnVlLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0QWN0aXZpdHlDZmcoc2hvd1dhaXRpbmcgPWZhbHNlKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJyZXFHZXRBY3Rpdml0eUNmZ1wiKVxyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldEFjdGl2aXR5Q2ZnLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IGRhdGEuZGF0YVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNmZyA9IGFycltpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZihjZmcgJiYgY2ZnLmF0eXBlID09IFJpZ2h0Vmlld1R5cGUuc2lnbkFjdGl2aXR5IClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdERhdGEgPSBjZmcuY2ZnXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFNpZ25BY3Rpdml0eU1vZGVsLlVwZGF0YVBhbmVsLHRoaXMuYWN0RGF0YSlcclxuICAgICAgICB9LCBudWxsLCBzaG93V2FpdGluZywgMCk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgY2hlY2tGbG93U3RhdHVzRmluaXNoKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5hY3REYXRhIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVkU3dpdGNoID0gZmFsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSBcclxuICAgICAgICBsZXQgZGF5ID0gdGhpcy5hY3REYXRhLmRheVxyXG4gICAgICAgIGlmKGRheSA9PSA0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuYWN0RGF0YS5saXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuYWN0RGF0YS5saXN0W2luZGV4XTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF5T25lRGF0YSA9IGVsZW1lbnQub25lXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF5T25lRGF0YS5mbG93X3N0YXR1cyA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkU3dpdGNoID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRheVR3b0RhdGEgPSBlbGVtZW50LnR3b1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRheVR3b0RhdGEuZmxvd19zdGF0dXMgPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZFN3aXRjaCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF5VGhpcmREYXRhID0gZWxlbWVudC50aHJlZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRheVRoaXJkRGF0YS5mbG93X3N0YXR1cyA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVkU3dpdGNoID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZWRTd2l0Y2ggPSB0aGlzLmFjdERhdGEuc3RhdHVzID09IDFcclxuICAgICAgICByZXR1cm4gdGhpcy5hY3REYXRhLnN0YXR1cyA9PSAxXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59Il19