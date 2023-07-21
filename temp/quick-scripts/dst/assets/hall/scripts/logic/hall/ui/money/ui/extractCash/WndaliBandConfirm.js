
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/WndaliBandConfirm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1ee02+2l4VFWZJaUENyoQNV', 'WndaliBandConfirm');
// hall/scripts/logic/hall/ui/money/ui/extractCash/WndaliBandConfirm.ts

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
var WndaliBandConfirm = /** @class */ (function (_super) {
    __extends(WndaliBandConfirm, _super);
    function WndaliBandConfirm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndaliBandConfirm.prototype.onInit = function () {
        this.name = "WndaliBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/aliBandConfirmUI";
        this.model = Global.ModelManager.getModel("ExtractModel");
    };
    WndaliBandConfirm.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getComponent("NameLabel", cc.Label);
        this.accountLabel = this.getComponent("AccountLabel", cc.Label);
        this.addCommonClick("close", this.backBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.BankBindInfoOver, this, this.close);
    };
    WndaliBandConfirm.prototype.onOpen = function (args) {
        this.nameData = args[0];
        this.accountData = args[1];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
    };
    WndaliBandConfirm.prototype.confirmBtnFunc = function () {
        this.model.reqBindAliInfo(this.nameData, this.accountData);
    };
    //关闭按钮
    WndaliBandConfirm.prototype.backBtnFunc = function () {
        this.close();
    };
    return WndaliBandConfirm;
}(WndBase_1.default));
exports.default = WndaliBandConfirm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxXbmRhbGlCYW5kQ29uZmlybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFFckQsK0NBQThDO0FBRzlDO0lBQStDLHFDQUFPO0lBQXREOztJQWtEQSxDQUFDO0lBdkNhLGtDQUFNLEdBQWhCO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsb0RBQW9ELENBQUM7UUFDcEUsSUFBSSxDQUFDLEtBQUssR0FBaUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWxELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUUzRCxVQUFVO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQVksQ0FBQyxnQkFBZ0IsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFUyxrQ0FBTSxHQUFoQixVQUFpQixJQUFJO1FBRWpCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUNoRCxDQUFDO0lBRUQsMENBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxNQUFNO0lBQ04sdUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWxEQSxBQWtEQyxDQWxEOEMsaUJBQU8sR0FrRHJEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5pbXBvcnQgeyBFeHRyYWN0RXZlbnQgfSBmcm9tIFwiLi9FeHRyYWN0RXZlbnRcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRhbGlCYW5kQ29uZmlybSBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgbW9kZWwgOiBFeHRyYWN0TW9kZWw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgbmFtZUxhYmVsIDogY2MuTGFiZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBhY2NvdW50TGFiZWwgOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcml2YXRlIG5hbWVEYXRhIDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhY2NvdW50RGF0YSA6IHN0cmluZztcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZGFsaUJhbmRDb25maXJtXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9tb25leS9leHRyYWN0Q2FzaC9hbGlCYW5kQ29uZmlybVVJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxFeHRyYWN0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkV4dHJhY3RNb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJOYW1lTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5hY2NvdW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIkFjY291bnRMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmJhY2tCdG5GdW5jLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb25maXJtQnRuXCIsdGhpcy5jb25maXJtQnRuRnVuYyx0aGlzKTtcclxuXHJcbiAgICAgICAgLy9MaXN0ZW5lclxyXG4gICAgICAgIHRoaXMubW9kZWwub24oRXh0cmFjdEV2ZW50LkJhbmtCaW5kSW5mb092ZXIsdGhpcyx0aGlzLmNsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3MpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lRGF0YSA9IGFyZ3NbMF07XHJcbiAgICAgICAgdGhpcy5hY2NvdW50RGF0YSA9IGFyZ3NbMV07XHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gdGhpcy5uYW1lRGF0YTtcclxuICAgICAgICB0aGlzLmFjY291bnRMYWJlbC5zdHJpbmcgPSB0aGlzLmFjY291bnREYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpcm1CdG5GdW5jKCl7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFCaW5kQWxpSW5mbyh0aGlzLm5hbWVEYXRhLHRoaXMuYWNjb3VudERhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YWz6Zet5oyJ6ZKuXHJcbiAgICBiYWNrQnRuRnVuYygpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxufVxyXG4iXX0=