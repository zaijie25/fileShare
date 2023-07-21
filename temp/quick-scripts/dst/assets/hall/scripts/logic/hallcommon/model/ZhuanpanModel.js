
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/ZhuanpanModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ea3a/vZ1NIfp26V5SKwaog', 'ZhuanpanModel');
// hall/scripts/logic/hallcommon/model/ZhuanpanModel.ts

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
/**
 * 活动：转盘抽奖 数据类
 */
var ZhuanpanModel = /** @class */ (function (_super) {
    __extends(ZhuanpanModel, _super);
    function ZhuanpanModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardResult = -1;
        /**
         * 数据对象
         */
        _this.data = null;
        /**
         * 轮播数据集合
         */
        _this.lunboDataArr = [];
        /**
         * 是否开启此活动
         */
        _this.bOpen = false;
        /**
         * 登录是否自动打开界面
         */
        _this._Status = false;
        return _this;
    }
    ZhuanpanModel.prototype.onInit = function () {
        ZhuanpanModel.instance = this;
    };
    Object.defineProperty(ZhuanpanModel.prototype, "Status", {
        get: function () {
            return this._Status;
        },
        enumerable: false,
        configurable: true
    });
    ZhuanpanModel.prototype.SetStatus = function (status) {
        this._Status = status;
        // if (status){
        //     //每次登录自动弹窗
        //     HallPopMsgHelper.Instance.addMsgList(PopWndName.Zhuanpan, ()=>{
        //         HallPopMsgHelper.Instance.addLock(PopWndName.Zhuanpan);
        //         HallBtnHelper.WndZhuanpanOpen();
        //     });
        // }
    };
    Object.defineProperty(ZhuanpanModel.prototype, "Name", {
        get: function () {
            return "ZhuanpanModel";
        },
        enumerable: false,
        configurable: true
    });
    ZhuanpanModel.prototype.clear = function () {
        this.SetStatus(false);
    };
    /**
     * 请求活动配置
     */
    ZhuanpanModel.prototype.reqActivityCfg = function () {
        var _param = {};
        var self = this;
        Global.HallServer.send(NetAppface.mod, "GetActivityCfg", _param, function (data) {
            //成功
            Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
            var dataArr = data["data"];
            for (var i = 0; i < dataArr.length; i++) {
                var obj = dataArr[i];
                if (obj.atype == ActivityConstants_1.ActivityType.zhuanpan) {
                    self.data = obj.cfg;
                    self.event(ZhuanpanModel.RefreshPanelUI, self.data);
                    self.event(ZhuanpanModel.RefreshScore);
                }
            }
        }.bind(this), function (data) {
            //失败
            // self.bOpen = false;
            Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
            Logger.error("zhuanpanModel reqActivityCfg failed");
        }.bind(this), false);
    };
    /**
     * 请求抽奖
     */
    ZhuanpanModel.prototype.reqChoujiang = function (type) {
        var _param = {
            "atype": ActivityConstants_1.ActivityType.zhuanpan,
            "type": type,
        };
        var self = this;
        Global.HallServer.sendWithNoRetry(NetAppface.mod, "ReceiveActivityAward", _param, function (data) {
            //成功
            var award = data["award"];
            if (award == 0) {
                Global.UI.fastTip("转盘活动已结束！");
                return;
            }
            var num = data["num"];
            var coin = data["coin"];
            self.data.coin = coin;
            if (coin < 50) {
                Global.Event.event(ActivityConstants_1.ActivityConstants.HIDE_RED_PORT, ActivityConstants_1.ActivityType.zhuanpan);
            }
            self.awardResult = award;
            self.event(ZhuanpanModel.StartDrawLucky, num);
            self.event(ZhuanpanModel.RefreshScore);
            //ZhuanpanJifen.instance.UpdateUI();
            //ZhuanpanChoujiang.instance.StartChoujiangAnimation(num);
        }.bind(this), function (data) {
            //失败
            Logger.error("zhuanpanModel reqChoujiang failed");
        }.bind(this), false);
    };
    /**
     * 请求轮播数据
     */
    ZhuanpanModel.prototype.reqLunbo = function (startIndex) {
        if (startIndex === void 0) { startIndex = -1; }
        var _param = {
            "id": 0,
        };
        var self = this;
        Global.HallServer.send(NetAppface.mod, "GetActivityAwardRecord", _param, function (data) {
            //成功
            self.lunboDataArr = data["data"];
            self.event(ZhuanpanModel.RefreshRecordUI, startIndex);
        }.bind(this), function (data) {
            //失败
            Logger.error("zhuanpanModel reqLunbo failed:" + JSON.stringify(data));
        }.bind(this), false);
    };
    /**
     * 全局单例
     */
    ZhuanpanModel.instance = null;
    /**
     * 刷新转盘 积分数据
     */
    ZhuanpanModel.RefreshPanelUI = "RefreshPanelUI";
    /**
     * 刷新轮播数据
     */
    ZhuanpanModel.RefreshRecordUI = "RefreshRecordUI";
    /**
     * 刷新积分
     */
    ZhuanpanModel.RefreshScore = "RefreshScore";
    /**
     * 开始抽奖
     */
    ZhuanpanModel.StartDrawLucky = "StartDrawLucky";
    return ZhuanpanModel;
}(ModelBase_1.default));
exports.default = ZhuanpanModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxaaHVhbnBhbk1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUkzRCw4RUFBMkY7QUFHM0Y7O0dBRUc7QUFDSDtJQUEyQyxpQ0FBUztJQUFwRDtRQUFBLHFFQWdMQztRQWpKRyxpQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2hCOztXQUVHO1FBQ0gsVUFBSSxHQUFRLElBQUksQ0FBQztRQUNqQjs7V0FFRztRQUNILGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBRWxCOztXQUVHO1FBQ0gsV0FBSyxHQUFXLEtBQUssQ0FBQztRQUV0Qjs7V0FFRztRQUNLLGFBQU8sR0FBVyxLQUFLLENBQUM7O0lBK0hwQyxDQUFDO0lBM0thLDhCQUFNLEdBQWhCO1FBQ0ksYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQTJDRCxzQkFBSSxpQ0FBTTthQUFWO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsaUNBQVMsR0FBVCxVQUFVLE1BQU07UUFFWixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLHNFQUFzRTtRQUN0RSxrRUFBa0U7UUFDbEUsMkNBQTJDO1FBQzNDLFVBQVU7UUFDVixJQUFJO0lBQ1IsQ0FBQztJQUVELHNCQUFJLCtCQUFJO2FBQVI7WUFFSSxPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELDZCQUFLLEdBQUw7UUFFSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILHNDQUFjLEdBQWQ7UUFDSSxJQUFJLE1BQU0sR0FBRyxFQUNaLENBQUE7UUFFRCxJQUFJLElBQUks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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgSGFsbFBvcE1zZ0hlbHBlciwgeyBQb3BXbmROYW1lIH0gZnJvbSBcIi4uLy4uL2hhbGwvdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCBIYWxsQnRuSGVscGVyIGZyb20gXCIuLi8uLi9oYWxsL3VpL2hhbGwvdmlld3MvSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuaW1wb3J0IHsgQWN0aXZpdHlDb25zdGFudHMsIEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi8uLi9oYWxsL3VpL0FjdGl2aXR5L0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOa0u+WKqO+8mui9rOebmOaKveWlliDmlbDmja7nsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpodWFucGFuTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOWNleS+i1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6Wmh1YW5wYW5Nb2RlbCA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgWmh1YW5wYW5Nb2RlbC5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliLfmlrDovaznm5gg56ev5YiG5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBSZWZyZXNoUGFuZWxVSSA9IFwiUmVmcmVzaFBhbmVsVUlcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw6L2u5pKt5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBSZWZyZXNoUmVjb3JkVUkgPSBcIlJlZnJlc2hSZWNvcmRVSVwiXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yi35paw56ev5YiGXHJcbiAgICAgKi9cclxuXHJcbiAgICAgc3RhdGljIFJlZnJlc2hTY29yZSA9IFwiUmVmcmVzaFNjb3JlXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+aKveWlllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgU3RhcnREcmF3THVja3kgPSBcIlN0YXJ0RHJhd0x1Y2t5XCJcclxuXHJcbiAgICBhd2FyZFJlc3VsdCA9IC0xXHJcbiAgICAvKipcclxuICAgICAqIOaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICBkYXRhOiBhbnkgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDova7mkq3mlbDmja7pm4blkIhcclxuICAgICAqL1xyXG4gICAgbHVuYm9EYXRhQXJyID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblvIDlkK/mraTmtLvliqhcclxuICAgICAqL1xyXG4gICAgYk9wZW46Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55m75b2V5piv5ZCm6Ieq5Yqo5omT5byA55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX1N0YXR1czpib29sZWFuID0gZmFsc2U7XHJcbiAgICBnZXQgU3RhdHVzKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFN0YXR1cyhzdGF0dXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIC8vIGlmIChzdGF0dXMpe1xyXG4gICAgICAgIC8vICAgICAvL+avj+asoeeZu+W9leiHquWKqOW8ueeql1xyXG4gICAgICAgIC8vICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLmFkZE1zZ0xpc3QoUG9wV25kTmFtZS5aaHVhbnBhbiwgKCk9PntcclxuICAgICAgICAvLyAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UuYWRkTG9jayhQb3BXbmROYW1lLlpodWFucGFuKTtcclxuICAgICAgICAvLyAgICAgICAgIEhhbGxCdG5IZWxwZXIuV25kWmh1YW5wYW5PcGVuKCk7XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiWmh1YW5wYW5Nb2RlbFwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXRTdGF0dXMoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5rS75Yqo6YWN572uXHJcbiAgICAgKi9cclxuICAgIHJlcUFjdGl2aXR5Q2ZnKCl7XHJcbiAgICAgICAgbGV0IF9wYXJhbSA9IHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBcIkdldEFjdGl2aXR5Q2ZnXCIsIF9wYXJhbSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpe1xyXG4gICAgICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5TSE9XX0FDVF9XQUlUVElORywgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUFyciA9IGRhdGFbXCJkYXRhXCJdO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGRhdGFBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBkYXRhQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9iai5hdHlwZSA9PSBBY3Rpdml0eVR5cGUuemh1YW5wYW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGEgPSBvYmouY2ZnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV2ZW50KFpodWFucGFuTW9kZWwuUmVmcmVzaFBhbmVsVUksc2VsZi5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmV2ZW50KFpodWFucGFuTW9kZWwuUmVmcmVzaFNjb3JlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIC8v5aSx6LSlXHJcbiAgICAgICAgICAgICAgICAvLyBzZWxmLmJPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiemh1YW5wYW5Nb2RlbCByZXFBY3Rpdml0eUNmZyBmYWlsZWRcIik7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5oq95aWWXHJcbiAgICAgKi9cclxuICAgIHJlcUNob3VqaWFuZyh0eXBlKXtcclxuICAgICAgICBsZXQgX3BhcmFtID0ge1xyXG4gICAgICAgICAgICBcImF0eXBlXCI6IEFjdGl2aXR5VHlwZS56aHVhbnBhbixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IHR5cGUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZFdpdGhOb1JldHJ5KE5ldEFwcGZhY2UubW9kLCBcIlJlY2VpdmVBY3Rpdml0eUF3YXJkXCIsIF9wYXJhbSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpe1xyXG4gICAgICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgICAgIHZhciBhd2FyZCA9IGRhdGFbXCJhd2FyZFwiXTtcclxuICAgICAgICAgICAgICAgIGlmKGF3YXJkPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIui9rOebmOa0u+WKqOW3sue7k+adn++8gVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgbnVtID0gZGF0YVtcIm51bVwiXTtcclxuICAgICAgICAgICAgICAgIHZhciBjb2luID0gZGF0YVtcImNvaW5cIl07XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGEuY29pbiA9IGNvaW47XHJcbiAgICAgICAgICAgICAgICBpZihjb2luIDwgNTApe1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChBY3Rpdml0eUNvbnN0YW50cy5ISURFX1JFRF9QT1JULEFjdGl2aXR5VHlwZS56aHVhbnBhbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuYXdhcmRSZXN1bHQgPSBhd2FyZDsgIFxyXG4gICAgICAgICAgICAgICAgc2VsZi5ldmVudChaaHVhbnBhbk1vZGVsLlN0YXJ0RHJhd0x1Y2t5LG51bSkgXHJcbiAgICAgICAgICAgICAgICBzZWxmLmV2ZW50KFpodWFucGFuTW9kZWwuUmVmcmVzaFNjb3JlKSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vWmh1YW5wYW5KaWZlbi5pbnN0YW5jZS5VcGRhdGVVSSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vWmh1YW5wYW5DaG91amlhbmcuaW5zdGFuY2UuU3RhcnRDaG91amlhbmdBbmltYXRpb24obnVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIC8v5aSx6LSlXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ6aHVhbnBhbk1vZGVsIHJlcUNob3VqaWFuZyBmYWlsZWRcIik7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgZmFsc2VcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC6L2u5pKt5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHJlcUx1bmJvKHN0YXJ0SW5kZXg6bnVtYmVyID0gLTEpe1xyXG4gICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogMCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBcIkdldEFjdGl2aXR5QXdhcmRSZWNvcmRcIiwgX3BhcmFtLFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZGF0YSA6IGFueSl7XHJcbiAgICAgICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sdW5ib0RhdGFBcnIgPSBkYXRhW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZXZlbnQoWmh1YW5wYW5Nb2RlbC5SZWZyZXNoUmVjb3JkVUksc3RhcnRJbmRleClcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGEgOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIC8v5aSx6LSlXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ6aHVhbnBhbk1vZGVsIHJlcUx1bmJvIGZhaWxlZDpcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIGZhbHNlXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSJdfQ==