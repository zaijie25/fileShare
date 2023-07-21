"use strict";
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