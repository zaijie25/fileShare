
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/WndOverseasBandConfirm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '89ff6EPXvJFlrCELxjrjjYd', 'WndOverseasBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndOverseasBandConfirm.ts

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
var WndBase_1 = require("../../../../../core/ui/WndBase");
var ExtractEvent_1 = require("./ExtractEvent");
var WndOverseasBandConfirm = /** @class */ (function (_super) {
    __extends(WndOverseasBandConfirm, _super);
    function WndOverseasBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndOverseasBandConfirm.prototype.onInit = function () {
        this.name = "WndOverseasBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/overseasBandConfirmUI";
        this.model = Global.ModelManager.getModel("ExtractModel");
    };
    WndOverseasBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.bankTipLabel = this.getComponent("BankLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndOverseasBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankData = args[2];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankTipLabel.string = this.bankData;
    };
    WndOverseasBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindOverseasInfo(this.nameData, this.accountData, this.bankData);
        //接口请求
        this.backBtnFunc();
    };
    //关闭按钮
    WndOverseasBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndOverseasBandConfirm;
}(WndBase_1.default));
exports.default = WndOverseasBandConfirm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxXbmRPdmVyc2Vhc0JhbmRDb25maXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFvRDtBQUVwRCwrQ0FBOEM7QUFFOUM7SUFBb0QsMENBQU87SUFBM0Q7O0lBdURBLENBQUM7SUE1Q2EsdUNBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLHdCQUF3QixDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx5REFBeUQsQ0FBQztRQUN6RSxJQUFJLENBQUMsS0FBSyxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRVMseUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNELFVBQVU7UUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQywyQkFBWSxDQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVTLHVDQUFNLEdBQWhCLFVBQWlCLElBQUk7UUFFakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUdELCtDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsTUFBTTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsTUFBTTtJQUNOLDRDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0F2REEsQUF1REMsQ0F2RG1ELGlCQUFPLEdBdUQxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIlxyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5pbXBvcnQgeyBFeHRyYWN0RXZlbnQgfSBmcm9tIFwiLi9FeHRyYWN0RXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZE92ZXJzZWFzQmFuZENvbmZpcm0gZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEV4dHJhY3RNb2RlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWwgOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgYWNjb3VudExhYmVsIDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGJhbmtUaXBMYWJlbCA6IGNjLkxhYmVsO1xyXG5cclxuICAgIHByaXZhdGUgbmFtZURhdGEgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFjY291bnREYXRhIDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBiYW5rRGF0YSA6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZE92ZXJzZWFzQmFuZENvbmZpcm1cIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2V4dHJhY3RDYXNoL292ZXJzZWFzQmFuZENvbmZpcm1VSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8RXh0cmFjdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJFeHRyYWN0TW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIk5hbWVMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmFjY291bnRMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiQWNjb3VudExhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmFua1RpcExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJCYW5rTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsdGhpcy5iYWNrQnRuRnVuYyx0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29uZmlybUJ0blwiLHRoaXMuY29uZmlybUJ0bkZ1bmMsdGhpcyk7XHJcblxyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKEV4dHJhY3RFdmVudC5CYW5rQmluZEluZm9PdmVyLHRoaXMsdGhpcy5jbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZURhdGEgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudERhdGEgPSBhcmdzWzFdO1xyXG4gICAgICAgIHRoaXMuYmFua0RhdGEgPSBhcmdzWzJdO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IHRoaXMubmFtZURhdGE7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50TGFiZWwuc3RyaW5nID0gdGhpcy5hY2NvdW50RGF0YTtcclxuICAgICAgICB0aGlzLmJhbmtUaXBMYWJlbC5zdHJpbmcgPSB0aGlzLmJhbmtEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25maXJtQnRuRnVuYygpe1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVxQmluZE92ZXJzZWFzSW5mbyh0aGlzLm5hbWVEYXRhLHRoaXMuYWNjb3VudERhdGEsdGhpcy5iYW5rRGF0YSk7XHJcbiAgICAgICAgLy/mjqXlj6Por7fmsYJcclxuICAgICAgICB0aGlzLmJhY2tCdG5GdW5jKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhbPpl63mjInpkq5cclxuICAgIGJhY2tCdG5GdW5jKCl7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG59Il19