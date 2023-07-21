
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/ScanCodeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcU2NhbkNvZGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCwwREFBcUQ7QUFDckQscURBQWdEO0FBQ2hELHlFQUErRTtBQUUvRTtJQUEwQyxnQ0FBUTtJQUFsRDtRQUFBLHFFQXVKQztRQWxKVyxZQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2Qsa0JBQVksR0FBRyxHQUFHLENBQUE7UUFDbEIsa0JBQVksR0FBRyxJQUFJLENBQUE7UUFFcEIsWUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUVYLFVBQUksR0FBRyxJQUFJLENBQUE7UUFFVixjQUFRLEdBQUcsdUVBQXVFLENBQUE7O0lBMEk5RixDQUFDO0lBeElhLCtCQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMscUJBQVcsQ0FBQyxDQUFBO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLEVBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFDLElBQUksQ0FBQyxD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QUFDO1lBQ3RCLEtBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFBO1lBQ3RCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3pFLElBQUcsS0FBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQ3pCO2dCQUNJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTthQUMzQjtRQUNMLENBQUMsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNTLG9DQUFhLEdBQXZCO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBQ3hCLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFDZDtZQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDN0I7SUFDTCxDQUFDO0lBQ1MsZ0NBQVMsR0FBbkI7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFHLElBQUksQ0FBQyxNQUFNLEVBQ2Q7WUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQzdCO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0F2SkEsQUF1SkMsQ0F2SnlDLGtCQUFRLEdBdUpqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBDYXB0dXJlVG9vbCBmcm9tIFwiLi4vU3ByZWFkL0NhcHR1cmVUb29sXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NhbkNvZGVWaWV3IGV4dGVuZHMgVmlld0Jhc2V7XHJcbiAgICBwcml2YXRlIHFyTm9kZTpjYy5TcHJpdGVcclxuICAgIHByaXZhdGUgdGltZXJMYWJlbDpjYy5SaWNoVGV4dFxyXG4gICAgcHJpdmF0ZSBtb25leUxhYmVsOmNjLkxhYmVsXHJcbiAgICBwcml2YXRlIENhcHR1cmVUb29sOkNhcHR1cmVUb29sXHJcbiAgICBwcml2YXRlIHRpbWVJRCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGludGVydmFsVGltZSA9IDE4MFxyXG4gICAgcHJpdmF0ZSBjaGVja0luZXJ2YWwgPSAxMDAwXHJcblxyXG4gICAgcHVibGljIGFtb3VudCA9IFwiXCJcclxuXHJcbiAgICBwdWJsaWMgZGF0YSA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIGZvcm1hc3RyID0gXCI8Y29sb3I9I0NDRTE5OD7ku5jmrL7lgJLorqHml7Y8L2M+PGNvbG9yPSNGRkYxMDA+JXM8L2NvbG9yPjxjb2xvcj0jQ0NFMTk4PuenkjwvYz5cIlxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5xck5vZGUgPSB0aGlzLmdldENvbXBvbmVudChcInNld21fdC9xcm5vZGVcIixjYy5TcHJpdGUpXHJcbiAgICAgICAgdGhpcy50aW1lckxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzZXdtX3QvY291bnREb3duXCIsY2MuUmljaFRleHQpXHJcbiAgICAgICAgdGhpcy50aW1lckxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLm1vbmV5TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInNld21fdC9tb25leVwiLGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMubW9uZXlMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdGhpcy5DYXB0dXJlVG9vbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic2V3bV90XCIsQ2FwdHVyZVRvb2wpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJ1dHRvbkdyb3VwL3NhdmVUb0FsYnVtXCIsdGhpcy5vblNhdmVQaWNCdG5DbGlja2VkLHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJ1dHRvbkdyb3VwL29wZW5BbGlcIix0aGlzLm9uT3BlbkFsaUJ0bkNsaWNrZWQsdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYnV0dG9uR3JvdXAvdXBsb2FkQnRuXCIsdGhpcy5vblVwbG9hZEJ0bkNsaWNrZWQsdGhpcylcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXRRcmNvZGUodXJsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORyxcImluaXRRcmNvZGVcIilcclxuICAgICAgICBjYy5sb2FkZXIubG9hZCh1cmwsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmU6Y2MuVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwiaW5pdFFyY29kZVwiKVxyXG4gICAgICAgICAgICBpZihlcnIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5ouJ5Y+W5LuY5qy+56CB5aSx6LSlXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYy5pc1ZhbGlkKHNlbGYucXJOb2RlLm5vZGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnFyTm9kZS5zcHJpdGVGcmFtZSA9IGZyYW1lXHJcbiAgICAgICAgICAgICAgICBzZWxmLnN0YXJ0VGltZXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIG9uU2F2ZVBpY0J0bkNsaWNrZWQoKSB7XHJcbiAgICAgICAgICAgIGxldCBvcmRlcklkID0gdGhpcy5kYXRhLm9yZGVyX25vXHJcbiAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBHbG9iYWwuVG9vbGtpdC5tZDUob3JkZXJJZCkgKyAnX2NhcEltYWdlLnBuZyc7XHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5zYXZlVG9BbGJ1bShmaWxlUGF0aCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vR2xvYmFsLlVJLmZhc3RUaXAoXCLkv53lrZjnm7jlhozmiJDlip9cIilcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5L+d5a2Y55u45YaM5oiQ5YqfXCIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ2FwdHVyZVRvb2wpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2FwdHVyZVRvb2wuQmVnaW5DYXB0dXJlKG9yZGVySWQsIGNhbGxiYWNrLGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25PcGVuQWxpQnRuQ2xpY2tlZCgpIHtcclxuICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlTREspIHtcclxuICAgICAgICAgICAgLy8g57G75Z6L5Li65pSv5LuY5a6d5pSv5LuY5pe26LCD55So5Y6f55Sf5pSv5LuY5YyF5pSv5LuYXHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGVja0FsaVBheUluc3RhbGxlZCgocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQWxpUGF5SW5zdGFsbGVkIHRydWVcIilcclxuICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZUFMaVBheUFwcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmV0T2JqLnJlc3VsdCA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4XmlK/ku5jlrp1cIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25VcGxvYWRCdG5DbGlja2VkKCkge1xyXG4gICAgICAgIGxldCBtb2RlbCA9ICBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU2VydmljZXJNb2RlbFwiKVxyXG4gICAgICAgIGlmKG1vZGVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbW9kZWwuZW50ZXJDdXN0b21lclNlcnZpY2UoQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpXHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgY29udGVudCA9IEpTT04ucGFyc2UodGhpcy5kYXRhLnVybClcclxuICAgICAgICAgICAgdGhpcy5pbml0UXJjb2RlKGNvbnRlbnQudXJsKVxyXG4gICAgICAgICAgICBsZXQgbW9uZXkgPSBjb250ZW50LmFtb3VudCAvIDEwMFxyXG4gICAgICAgICAgICB0aGlzLm1vbmV5TGFiZWwuc3RyaW5nID0gbW9uZXkudG9TdHJpbmcoKVxyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuino+aekOiuouWNleWksei0pe+8jOivt+mHjeivle+8gVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgcmVzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9uZXlMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbFRpbWUgPSAxODBcclxuICAgICAgICB0aGlzLnFyTm9kZS5zcHJpdGVGcmFtZSA9IG51bGxcclxuICAgICAgICBpZih0aGlzLnRpbWVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lSUQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VGltZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudGltZUlEKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVJRClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lckxhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cih0aGlzLmZvcm1hc3RyLHRoaXMuaW50ZXJ2YWxUaW1lKVxyXG4gICAgICAgIHRoaXMudGltZUlEID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbFRpbWUgLT0gMVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyTGFiZWwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKHRoaXMuZm9ybWFzdHIsdGhpcy5pbnRlcnZhbFRpbWUpXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJ2YWxUaW1lID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSx0aGlzLmNoZWNrSW5lcnZhbClcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsXHJcbiAgICAgICAgdGhpcy5hbW91bnQgPSBcIlwiXHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgaWYodGhpcy50aW1lSUQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZUlEKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYW1vdW50ID0gXCJcIlxyXG4gICAgICAgIHRoaXMuZGF0YSA9IG51bGxcclxuICAgICAgICBpZih0aGlzLnRpbWVJRClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lSUQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==