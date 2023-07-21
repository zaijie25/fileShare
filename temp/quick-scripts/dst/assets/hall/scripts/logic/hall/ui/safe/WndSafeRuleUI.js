
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/safe/WndSafeRuleUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '349530sXxdHBZZUj/zvOzjI', 'WndSafeRuleUI');
// hall/scripts/logic/hall/ui/safe/WndSafeRuleUI.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndSafeRuleUI = /** @class */ (function (_super) {
    __extends(WndSafeRuleUI, _super);
    function WndSafeRuleUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private dayLabel : cc.Label;
    // private weekLabel : cc.Label;
    // private monthLabel : cc.Label;
    WndSafeRuleUI.prototype.onInit = function () {
        // this.isNeedDelay = true
        this.name = "WndSafeRuleUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/safe/SafeRuleUI";
    };
    WndSafeRuleUI.prototype.initView = function () {
        // this.dayLabel = this.getComponent("item1/jibiLabel",cc.Label);
        // this.weekLabel = this.getComponent("item2/jibiLabel",cc.Label);
        // this.monthLabel = this.getComponent("item3/jibiLabel",cc.Label);
        // this.addCommonClick("button", this.giftMoneyList, this)
        this.addCommonClick('close', this.close, this);
        // for (let i = 1; i < 4; i++) {
        //     let item = this.getChild("item"+i)
        //     let selected = cc.find("button/btn_lqjl1",item)
        //     let noSelected = cc.find("button/btn_lqjl2",item)
        //     noSelected.active = false;
        // }
    };
    WndSafeRuleUI.prototype.onOpen = function (args) {
        // this.OnDataPrepared();
        // this.CashBackModel.GetActivityCfg();
    };
    WndSafeRuleUI.prototype.onDispose = function () {
        // this.CashBackModel.off(CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        // this.CashBackModel.off(CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    return WndSafeRuleUI;
}(WndBase_1.default));
exports.default = WndSafeRuleUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxzYWZlXFxXbmRTYWZlUnVsZVVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUUvQztJQUEyQyxpQ0FBTztJQUFsRDs7SUFvQ0EsQ0FBQztJQW5DRywrQkFBK0I7SUFDL0IsZ0NBQWdDO0lBQ2hDLGlDQUFpQztJQUN2Qiw4QkFBTSxHQUFoQjtRQUNJLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUNBQWlDLENBQUM7SUFDckQsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBQ0ksaUVBQWlFO1FBQ2pFLGtFQUFrRTtRQUNsRSxtRUFBbUU7UUFDbkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsZ0NBQWdDO1FBQ2hDLHlDQUF5QztRQUN6QyxzREFBc0Q7UUFDdEQsd0RBQXdEO1FBQ3hELGlDQUFpQztRQUNqQyxJQUFJO0lBQ1IsQ0FBQztJQUNTLDhCQUFNLEdBQWhCLFVBQWlCLElBQVk7UUFDekIseUJBQXlCO1FBQ3pCLHVDQUF1QztJQUMzQyxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLG1GQUFtRjtRQUNuRixvRkFBb0Y7SUFDeEYsQ0FBQztJQUlMLG9CQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQzBDLGlCQUFPLEdBb0NqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFNhZmVSdWxlVUkgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgLy8gcHJpdmF0ZSBkYXlMYWJlbCA6IGNjLkxhYmVsO1xyXG4gICAgLy8gcHJpdmF0ZSB3ZWVrTGFiZWwgOiBjYy5MYWJlbDtcclxuICAgIC8vIHByaXZhdGUgbW9udGhMYWJlbCA6IGNjLkxhYmVsO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICAvLyB0aGlzLmlzTmVlZERlbGF5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kU2FmZVJ1bGVVSVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvc2FmZS9TYWZlUnVsZVVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIC8vIHRoaXMuZGF5TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIml0ZW0xL2ppYmlMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICAvLyB0aGlzLndlZWtMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaXRlbTIvamliaUxhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIHRoaXMubW9udGhMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaXRlbTMvamliaUxhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJidXR0b25cIiwgdGhpcy5naWZ0TW9uZXlMaXN0LCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soJ2Nsb3NlJywgdGhpcy5jbG9zZSwgdGhpcylcclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJpdGVtXCIraSlcclxuICAgICAgICAvLyAgICAgbGV0IHNlbGVjdGVkID0gY2MuZmluZChcImJ1dHRvbi9idG5fbHFqbDFcIixpdGVtKVxyXG4gICAgICAgIC8vICAgICBsZXQgbm9TZWxlY3RlZCA9IGNjLmZpbmQoXCJidXR0b24vYnRuX2xxamwyXCIsaXRlbSlcclxuICAgICAgICAvLyAgICAgbm9TZWxlY3RlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3M/OiBhbnlbXSkge1xyXG4gICAgICAgIC8vIHRoaXMuT25EYXRhUHJlcGFyZWQoKTtcclxuICAgICAgICAvLyB0aGlzLkNhc2hCYWNrTW9kZWwuR2V0QWN0aXZpdHlDZmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5DYXNoQmFja01vZGVsLm9mZihDYXNoQmFja0V2ZW50LkdldEFjdGl2aXR5Q2ZnLCB0aGlzLCB0aGlzLkRlc2NyaXB0aW9uRGF5KTtcclxuICAgICAgICAvLyB0aGlzLkNhc2hCYWNrTW9kZWwub2ZmKENhc2hCYWNrRXZlbnQuR2V0RGF5Rmxvd0JhY2tBbGwsIHRoaXMsIHRoaXMuR2V0QXdhcmRSZXNxKTtcclxuICAgIH1cclxuICAgIC8vIGdpZnRNb25leUxpc3QoKXtcclxuICAgIC8vICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEdpZnRNb25leUxpc3RVSVwiKVxyXG4gICAgLy8gfVxyXG59IFxyXG4iXX0=