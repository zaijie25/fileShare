
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/WndUnionBandConfirm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f14fcLL1URMxocpkiDBr8Jy', 'WndUnionBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndUnionBandConfirm.ts

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
var WndUnionBandConfirm = /** @class */ (function (_super) {
    __extends(WndUnionBandConfirm, _super);
    function WndUnionBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndUnionBandConfirm.prototype.onInit = function () {
        this.name = "WndUnionBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/unionBandConfirmUI";
    };
    WndUnionBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.bankbranchLabel = this.getComponent("BankbranchLabel", cc.Label);
        this.openBankLabel = this.getComponent("OpenBankLabel", cc.Label);
        this.PrivinceLabel = this.getComponent("ProvinceLabel", cc.Label);
        this.CityLabel = this.getComponent("CityLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndUnionBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankbranchData = args[2];
        this.openBankData = args[3];
        this.provinceData = args[4];
        this.cityData = args[5];
        this.bankCode = args[6];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankbranchLabel.string = this.bankbranchData;
        this.openBankLabel.string = this.openBankData;
        this.PrivinceLabel.string = this.provinceData;
        this.CityLabel.string = this.cityData;
    };
    WndUnionBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindUnionInfo(this.nameData, this.accountData, this.openBankData, this.bankbranchData, this.provinceData, this.cityData, this.bankCode);
    };
    //关闭按钮
    WndUnionBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndUnionBandConfirm;
}(WndBase_1.default));
exports.default = WndUnionBandConfirm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxXbmRVbmlvbkJhbmRDb25maXJtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFxRDtBQUVyRCwrQ0FBOEM7QUFHOUM7SUFBaUQsdUNBQU87SUFBeEQ7O0lBdUVBLENBQUM7SUFuRGEsb0NBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzREFBc0QsQ0FBQztJQUMxRSxDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBaUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV4RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0QsVUFBVTtRQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLDJCQUFZLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsb0NBQU0sR0FBaEIsVUFBaUIsSUFBSTtRQUVqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsNENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BKLENBQUM7SUFFRCxNQUFNO0lBQ04seUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQXZFQSxBQXVFQyxDQXZFZ0QsaUJBQU8sR0F1RXZEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5pbXBvcnQgeyBFeHRyYWN0RXZlbnQgfSBmcm9tIFwiLi9FeHRyYWN0RXZlbnRcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRVbmlvbkJhbmRDb25maXJtIGV4dGVuZHMgV25kQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEV4dHJhY3RNb2RlbDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWwgOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgYWNjb3VudExhYmVsIDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGJhbmticmFuY2hMYWJlbCA6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBvcGVuQmFua0xhYmVsIDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIFByaXZpbmNlTGFiZWw6Y2MuTGFiZWxcclxuICAgIHByaXZhdGUgQ2l0eUxhYmVsOmNjLkxhYmVsXHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lRGF0YSA6IHN0cmluZztcclxuICAgIHByaXZhdGUgYWNjb3VudERhdGEgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGJhbmticmFuY2hEYXRhIDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBvcGVuQmFua0RhdGEgOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHByb3ZpbmNlRGF0YTpzdHJpbmdcclxuICAgIHByaXZhdGUgY2l0eURhdGE6c3RyaW5nXHJcbiAgICBwcml2YXRlIGJhbmtDb2RlOnN0cmluZ1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFVuaW9uQmFuZENvbmZpcm1cIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2V4dHJhY3RDYXNoL3VuaW9uQmFuZENvbmZpcm1VSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEV4dHJhY3RNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiRXh0cmFjdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJOYW1lTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIkFjY291bnRMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmJhbmticmFuY2hMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiQmFua2JyYW5jaExhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMub3BlbkJhbmtMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiT3BlbkJhbmtMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLlByaXZpbmNlTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIlByb3ZpbmNlTGFiZWxcIixjYy5MYWJlbClcclxuICAgICAgICB0aGlzLkNpdHlMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiQ2l0eUxhYmVsXCIsY2MuTGFiZWwpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsdGhpcy5iYWNrQnRuRnVuYyx0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29uZmlybUJ0blwiLHRoaXMuY29uZmlybUJ0bkZ1bmMsdGhpcyk7XHJcblxyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKEV4dHJhY3RFdmVudC5CYW5rQmluZEluZm9PdmVyLHRoaXMsdGhpcy5jbG9zZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZURhdGEgPSBhcmdzWzBdO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudERhdGEgPSBhcmdzWzFdO1xyXG4gICAgICAgIHRoaXMuYmFua2JyYW5jaERhdGEgPSBhcmdzWzJdO1xyXG4gICAgICAgIHRoaXMub3BlbkJhbmtEYXRhID0gYXJnc1szXTtcclxuICAgICAgICB0aGlzLnByb3ZpbmNlRGF0YSA9IGFyZ3NbNF1cclxuICAgICAgICB0aGlzLmNpdHlEYXRhID0gYXJnc1s1XVxyXG4gICAgICAgIHRoaXMuYmFua0NvZGUgPSBhcmdzWzZdXHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gdGhpcy5uYW1lRGF0YTtcclxuICAgICAgICB0aGlzLmFjY291bnRMYWJlbC5zdHJpbmcgPSB0aGlzLmFjY291bnREYXRhO1xyXG4gICAgICAgIHRoaXMuYmFua2JyYW5jaExhYmVsLnN0cmluZyA9IHRoaXMuYmFua2JyYW5jaERhdGE7XHJcbiAgICAgICAgdGhpcy5vcGVuQmFua0xhYmVsLnN0cmluZyA9IHRoaXMub3BlbkJhbmtEYXRhO1xyXG4gICAgICAgIHRoaXMuUHJpdmluY2VMYWJlbC5zdHJpbmcgPSB0aGlzLnByb3ZpbmNlRGF0YVxyXG4gICAgICAgIHRoaXMuQ2l0eUxhYmVsLnN0cmluZyA9IHRoaXMuY2l0eURhdGFcclxuICAgIH1cclxuXHJcbiAgICBjb25maXJtQnRuRnVuYygpe1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVxQmluZFVuaW9uSW5mbyh0aGlzLm5hbWVEYXRhLHRoaXMuYWNjb3VudERhdGEsdGhpcy5vcGVuQmFua0RhdGEsdGhpcy5iYW5rYnJhbmNoRGF0YSx0aGlzLnByb3ZpbmNlRGF0YSx0aGlzLmNpdHlEYXRhLHRoaXMuYmFua0NvZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YWz6Zet5oyJ6ZKuXHJcbiAgICBiYWNrQnRuRnVuYygpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxufVxyXG4iXX0=