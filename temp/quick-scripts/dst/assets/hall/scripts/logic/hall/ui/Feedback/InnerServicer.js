
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/InnerServicer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae3c4fyqaRJjKB9DrOQBIX/', 'InnerServicer');
// hall/scripts/logic/hall/ui/Feedback/InnerServicer.ts

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
exports.AtServicer = void 0;
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var AbsServicer_1 = require("./AbsServicer");
/**
   应用内部打开的客服。如：艾特客服等
 */
var InnerServicer = /** @class */ (function (_super) {
    __extends(InnerServicer, _super);
    function InnerServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerServicer.prototype.acceptService = function (index) {
        this.openServicer(this.serviceDatas[index]);
    };
    return InnerServicer;
}(AbsServicer_1.default));
exports.default = InnerServicer;
var AtServicer = /** @class */ (function (_super) {
    __extends(AtServicer, _super);
    function AtServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AtServicer.prototype.openServicer = function (data) {
        Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
        Global.ChatServer.userSetting(null, data.info);
    };
    return AtServicer;
}(InnerServicer));
exports.AtServicer = AtServicer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcSW5uZXJTZXJ2aWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQStFO0FBQy9FLDZDQUF3QztBQUd4Qzs7R0FFRztBQUNIO0lBQW9ELGlDQUFXO0lBQS9EOztJQU9BLENBQUM7SUFMVSxxQ0FBYSxHQUFwQixVQUFxQixLQUFZO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHTCxvQkFBQztBQUFELENBUEEsQUFPQyxDQVBtRCxxQkFBVyxHQU85RDs7QUFFRDtJQUFnQyw4QkFBYTtJQUE3Qzs7SUFPQSxDQUFDO0lBTEcsaUNBQVksR0FBWixVQUFhLElBQVM7UUFDbEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsb0NBQW9CLENBQUMsV0FBVyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0FQQSxBQU9DLENBUCtCLGFBQWEsR0FPNUM7QUFQWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgQWJzU2VydmljZXIgZnJvbSBcIi4vQWJzU2VydmljZXJcIjtcclxuXHJcblxyXG4vKipcclxuICAg5bqU55So5YaF6YOo5omT5byA55qE5a6i5pyN44CC5aaC77ya6Im+54m55a6i5pyN562JXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBJbm5lclNlcnZpY2VyIGV4dGVuZHMgQWJzU2VydmljZXIge1xyXG5cclxuICAgIHB1YmxpYyBhY2NlcHRTZXJ2aWNlKGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5vcGVuU2VydmljZXIodGhpcy5zZXJ2aWNlRGF0YXNbaW5kZXhdKTtcclxuICAgIH1cclxuICAgIC8v5omT5byA5a6i5pyNXHJcbiAgICBhYnN0cmFjdCBvcGVuU2VydmljZXIoZGF0YSk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBdFNlcnZpY2VyIGV4dGVuZHMgSW5uZXJTZXJ2aWNlciB7XHJcblxyXG4gICAgb3BlblNlcnZpY2VyKGRhdGE6IGFueSkge1xyXG4gICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnNlcnZlclR5cGUgPSBDdXN0b21lckVudHJhbmNlVHlwZS5IYWxsU2VydmljZTtcclxuICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci51c2VyU2V0dGluZyhudWxsLGRhdGEuaW5mbyk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=