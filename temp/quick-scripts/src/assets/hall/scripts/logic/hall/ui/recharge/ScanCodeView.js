"use strict";
cc._RF.push(module, '15084ihSlRMvYzKpKWOYZT3', 'ScanCodeView');
// hall/scripts/logic/hall/ui/recharge/ScanCodeView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var AppHelper_1 = require("../../../core/tool/AppHelper");
var CaptureTool_1 = require("../Spread/CaptureTool");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var ScanCodeView = /** @class */ (function (_super) {
    __extends(ScanCodeView, _super);
    function ScanCodeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeID = null;
        _this.intervalTime = 180;
        _this.checkInerval = 1000;
        _this.amount = "";
        _this.data = null;
        _this.formastr = "<color=#CCE198>付款倒计时</c><color=#FFF100>%s</color><color=#CCE198>秒</c>";
        return _this;
    }
    ScanCodeView.prototype.initView = function () {
        this.qrNode = this.getComponent("sewm_t/qrnode", cc.Sprite);
        this.timerLabel = this.getComponent("sewm_t/countDown", cc.RichText);
        this.timerLabel.string = "";
        this.moneyLabel = this.getComponent("sewm_t/money", cc.Label);
        this.moneyLabel.string = "";
        this.CaptureTool = this.getComponent("sewm_t", CaptureTool_1.default);
        this.addCommonClick("buttonGroup/saveToAlbum", this.onSavePicBtnClicked, this);
        this.addCommonClick("buttonGroup/openAli", this.onOpenAliBtnClicked, this);
        this.addCommonClick("buttonGroup/uploadBtn", this.onUploadBtnClicked, this);
    };
    ScanCodeView.prototype.initQrcode = function (url) {
        var self = this;
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "initQrcode");
        cc.loader.load(url, function (err, texture) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "initQrcode");
            if (err) {
                Global.UI.fastTip("拉取付款码失败");
                return;
            }
            if (cc.isValid(self.qrNode.node)) {
                var frame = new cc.SpriteFrame(texture);
                self.qrNode.spriteFrame = frame;
                self.startTimer();
            }
        });
    };
    ScanCodeView.prototype.onSavePicBtnClicked = function () {
        var orderId = this.data.order_no;
        var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(orderId) + '_capImage.png';
        var callback = function () {
            Global.NativeEvent.saveToAlbum(filePath, function () {
                //Global.UI.fastTip("保存相册成功")
                Logger.log("保存相册成功");
            });
        };
        if (this.CaptureTool) {
            this.CaptureTool.BeginCapture(orderId, callback, false);
        }
    };
    ScanCodeView.prototype.onOpenAliBtnClicked = function () {
        if (AppHelper_1.default.enableAliPaySDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                if (retObj.result == 0) {
                    Logger.error("AliPayInstalled true");
                    Global.NativeEvent.awakeALiPayApp();
                }
                else if (retObj.result == -1) {
                    Global.UI.showSingleBox("请先安装支付宝", null);
                }
            });
        }
    };
    ScanCodeView.prototype.onUploadBtnClicked = function () {
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            model.enterCustomerService(ServicerModel_1.CustomerEntranceType.HallService);
        }
    };
    ScanCodeView.prototype.onSubViewShow = function () {
        this.reset();
        if (!this.data) {
            return;
        }
        try {
            var content = JSON.parse(this.data.url);
            this.initQrcode(content.url);
            var money = content.amount / 100;
            this.moneyLabel.string = money.toString();
        }
        catch (error) {
            Global.UI.fastTip("解析订单失败，请重试！");
        }
    };
    ScanCodeView.prototype.reset = function () {
        this.moneyLabel.string = "";
        this.intervalTime = 180;
        this.qrNode.spriteFrame = null;
        if (this.timeID) {
            clearInterval(this.timeID);
        }
    };
    ScanCodeView.prototype.startTimer = function () {
        var _this = this;
        if (this.timeID) {
            clearInterval(this.timeID);
        }
        this.timerLabel.string = cc.js.formatStr(this.formastr, this.intervalTime);
        this.timeID = setInterval(function () {
            _this.intervalTime -= 1;
            _this.timerLabel.string = cc.js.formatStr(_this.formastr, _this.intervalTime);
            if (_this.intervalTime == 0) {
                _this.node.active = false;
            }
        }, this.checkInerval);
    };
    ScanCodeView.prototype.onSubViewHide = function () {
        this.data = null;
        this.amount = "";
        this.node.active = false;
        if (this.timeID) {
            clearInterval(this.timeID);
        }
    };
    ScanCodeView.prototype.onDispose = function () {
        this.amount = "";
        this.data = null;
        if (this.timeID) {
            clearInterval(this.timeID);
        }
    };
    return ScanCodeView;
}(ViewBase_1.default));
exports.default = ScanCodeView;

cc._RF.pop();