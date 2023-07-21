
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/ServiceLeftItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9c493sLMuhOtKoPYM/nH+4Y', 'ServiceLeftItem');
// hall/scripts/logic/hall/ui/Feedback/ServiceLeftItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ServiceLeftItem = /** @class */ (function (_super) {
    __extends(ServiceLeftItem, _super);
    function ServiceLeftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BackgroundTxt = null;
        _this.CheckTxt = null;
        _this.Unread = null;
        _this.CheckSprite = null;
        _this.UnCheckSprite = null;
        _this.toggle = null;
        _this.typeSprite = null;
        return _this;
    }
    ServiceLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    ServiceLeftItem.prototype.getGameData = function () {
        return this.data;
    };
    ServiceLeftItem.prototype.onInit = function (data) {
        this.data = data;
        this.initView();
    };
    ServiceLeftItem.prototype.initView = function () {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name);
        // this.toggle.isChecked =false
        // this.toggle.uncheck()
    };
    ServiceLeftItem.prototype.SetToggleChecked = function (flag) {
        this.toggle.isChecked = flag;
        if (flag) {
            this.toggle.check();
        }
        else {
            this.toggle.uncheck();
        }
    };
    __decorate([
        property(cc.Label)
    ], ServiceLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], ServiceLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], ServiceLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServiceLeftItem.prototype, "typeSprite", void 0);
    ServiceLeftItem = __decorate([
        ccclass
    ], ServiceLeftItem);
    return ServiceLeftItem;
}(cc.Component));
exports.default = ServiceLeftItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcU2VydmljZUxlZnRJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBbURDO1FBaERHLG1CQUFhLEdBQWEsSUFBSSxDQUFDO1FBRy9CLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFHMUIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUV6QixpQkFBVyxHQUFjLElBQUksQ0FBQztRQUU5QixtQkFBYSxHQUFjLElBQUksQ0FBQztRQUVoQyxZQUFNLEdBQWMsSUFBSSxDQUFDO1FBRXpCLGdCQUFVLEdBQWMsSUFBSSxDQUFDOztJQWtDakMsQ0FBQztJQTlCRywrQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO0lBQzVCLENBQUM7SUFDRCxpQkFBaUI7SUFDVixxQ0FBVyxHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sZ0NBQU0sR0FBYixVQUFjLElBQVM7UUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pFLCtCQUErQjtRQUMvQix3QkFBd0I7SUFDNUIsQ0FBQztJQUNNLDBDQUFnQixHQUF2QixVQUF3QixJQUFJO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFFLElBQUksQ0FBQztRQUM1QixJQUFHLElBQUksRUFDUDtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7YUFFRDtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDekI7SUFFTCxDQUFDO0lBOUNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7MERBQ1k7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDTztJQUcxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNLO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ1U7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswREFDWTtJQUVoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNLO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1M7SUFqQlosZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQW1EbkM7SUFBRCxzQkFBQztDQW5ERCxBQW1EQyxDQW5ENEMsRUFBRSxDQUFDLFNBQVMsR0FtRHhEO2tCQW5Eb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlTGVmdEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEJhY2tncm91bmRUeHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBDaGVja1R4dDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBVbnJlYWQ6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgQ2hlY2tTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgVW5DaGVja1Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXHJcbiAgICB0b2dnbGU6IGNjLlRvZ2dsZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgdHlwZVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIHByaXZhdGUgX2VudGl0eURhdGE6IGFueTtcclxuXHJcbiAgICBjbG9zZSgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuICAgIHB1YmxpYyBnZXRHYW1lRGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uSW5pdChkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKVxyXG4gICAgfVxyXG4gICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5CYWNrZ3JvdW5kVHh0LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnJlbW92ZUVtb2ppKHRoaXMuZGF0YS5uYW1lKVxyXG4gICAgICAgIHRoaXMuQ2hlY2tUeHQuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkodGhpcy5kYXRhLm5hbWUpXHJcbiAgICAgICAgLy8gdGhpcy50b2dnbGUuaXNDaGVja2VkID1mYWxzZVxyXG4gICAgICAgIC8vIHRoaXMudG9nZ2xlLnVuY2hlY2soKVxyXG4gICAgfVxyXG4gICAgcHVibGljIFNldFRvZ2dsZUNoZWNrZWQoZmxhZyl7XHJcbiAgICAgICAgdGhpcy50b2dnbGUuaXNDaGVja2VkID1mbGFnO1xyXG4gICAgICAgIGlmKGZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZS5jaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZS51bmNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19