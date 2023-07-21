
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackLeftItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c09d0emPK1EuoZMqPeuAaCH', 'FeedbackLeftItem');
// hall/scripts/logic/hall/ui/Feedback/FeedbackLeftItem.ts

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
var FeedbackLeftItem = /** @class */ (function (_super) {
    __extends(FeedbackLeftItem, _super);
    function FeedbackLeftItem() {
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
    FeedbackLeftItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    FeedbackLeftItem.prototype.getGameData = function () {
        return this.nameData;
    };
    FeedbackLeftItem.prototype.onInit = function (data) {
        this.nameData = data;
        this.initView();
    };
    FeedbackLeftItem.prototype.initView = function () {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.nameData);
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.nameData);
        this.toggle.isChecked = false;
        this.toggle.uncheck();
    };
    FeedbackLeftItem.prototype.SetBackgroundChecked = function (state) {
        this.CheckSprite.node.active = state;
        this.UnCheckSprite.node.active = !state;
    };
    FeedbackLeftItem.prototype.SetTypeSprite = function (path, name) {
        if (name === void 0) { name = ""; }
        if (this.typeSprite && cc.isValid(this.typeSprite) && this.typeSprite.node != null) {
            if (name != "") {
                this.typeSprite.node.active = true;
                Global.ResourceManager.loadAutoAtlas(this.typeSprite, path, name, null, false);
            }
            else {
                this.typeSprite.node.active = false;
            }
        }
    };
    FeedbackLeftItem.prototype.SetToggleChecked = function () {
        this.toggle.isChecked = true;
        this.toggle.check();
    };
    FeedbackLeftItem.prototype.SetUnReadActiveState = function (state) {
        this.Unread.node.active = state;
    };
    Object.defineProperty(FeedbackLeftItem.prototype, "entityData", {
        get: function () {
            return this._entityData;
        },
        set: function (data) {
            this._entityData = data;
            if (this._entityData.red_status != undefined)
                this.SetUnReadActiveState(this._entityData.red_status === 0);
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        property(cc.Label)
    ], FeedbackLeftItem.prototype, "BackgroundTxt", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackLeftItem.prototype, "CheckTxt", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "Unread", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "CheckSprite", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "UnCheckSprite", void 0);
    __decorate([
        property(cc.Toggle)
    ], FeedbackLeftItem.prototype, "toggle", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackLeftItem.prototype, "typeSprite", void 0);
    FeedbackLeftItem = __decorate([
        ccclass
    ], FeedbackLeftItem);
    return FeedbackLeftItem;
}(cc.Component));
exports.default = FeedbackLeftItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tMZWZ0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE4QyxvQ0FBWTtJQUExRDtRQUFBLHFFQXNFQztRQW5FRyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFFekIsaUJBQVcsR0FBYyxJQUFJLENBQUM7UUFFOUIsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFFaEMsWUFBTSxHQUFjLElBQUksQ0FBQztRQUV6QixnQkFBVSxHQUFjLElBQUksQ0FBQzs7SUFxRGpDLENBQUM7SUFqREcsZ0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUM1QixDQUFDO0lBQ0QsaUJBQWlCO0lBQ1Ysc0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNNLGlDQUFNLEdBQWIsVUFBYyxJQUFTO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUUsS0FBSyxDQUFBO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNNLCtDQUFvQixHQUEzQixVQUE0QixLQUFhO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQzNDLENBQUM7SUFDTSx3Q0FBYSxHQUFwQixVQUFxQixJQUFJLEVBQUMsSUFBTztRQUFQLHFCQUFBLEVBQUEsU0FBTztRQUM3QixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNqRjtZQUNJLElBQUcsSUFBSSxJQUFHLEVBQUUsRUFBQztnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9FO2lCQUFJO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkM7U0FDSjtJQUNMLENBQUM7SUFDTSwyQ0FBZ0IsR0FBdkI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQ00sK0NBQW9CLEdBQTNCLFVBQTRCLEtBQWE7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUNuQyxDQUFDO0lBRUQsc0JBQVcsd0NBQVU7YUFNckI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzthQVJELFVBQXNCLElBQUk7WUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsSUFBSSxTQUFTO2dCQUN2QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQzs7O09BQUE7SUE5REQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzsyREFDWTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNPO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ0s7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNZO0lBRWhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ0s7SUFFekI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDUztJQWpCWixnQkFBZ0I7UUFEcEMsT0FBTztPQUNhLGdCQUFnQixDQXNFcEM7SUFBRCx1QkFBQztDQXRFRCxBQXNFQyxDQXRFNkMsRUFBRSxDQUFDLFNBQVMsR0FzRXpEO2tCQXRFb0IsZ0JBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrTGVmdEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIEJhY2tncm91bmRUeHQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBDaGVja1R4dDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBVbnJlYWQ6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgQ2hlY2tTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgVW5DaGVja1Nwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGUpXHJcbiAgICB0b2dnbGU6IGNjLlRvZ2dsZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgdHlwZVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIG5hbWVEYXRhOiBhbnk7XHJcbiAgICBwcml2YXRlIF9lbnRpdHlEYXRhOiBhbnk7XHJcblxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbiAgICBwdWJsaWMgZ2V0R2FtZURhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZURhdGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25Jbml0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMubmFtZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuaW5pdFZpZXcoKVxyXG4gICAgfVxyXG4gICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5CYWNrZ3JvdW5kVHh0LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnJlbW92ZUVtb2ppKHRoaXMubmFtZURhdGEpXHJcbiAgICAgICAgdGhpcy5DaGVja1R4dC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaSh0aGlzLm5hbWVEYXRhKVxyXG4gICAgICAgIHRoaXMudG9nZ2xlLmlzQ2hlY2tlZCA9ZmFsc2VcclxuICAgICAgICB0aGlzLnRvZ2dsZS51bmNoZWNrKClcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRCYWNrZ3JvdW5kQ2hlY2tlZChzdGF0ZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLkNoZWNrU3ByaXRlLm5vZGUuYWN0aXZlID0gc3RhdGVcclxuICAgICAgICB0aGlzLlVuQ2hlY2tTcHJpdGUubm9kZS5hY3RpdmUgPSAhc3RhdGVcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRUeXBlU3ByaXRlKHBhdGgsbmFtZT1cIlwiKXtcclxuICAgICAgICBpZih0aGlzLnR5cGVTcHJpdGUgJiYgY2MuaXNWYWxpZCh0aGlzLnR5cGVTcHJpdGUpICYmIHRoaXMudHlwZVNwcml0ZS5ub2RlICE9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihuYW1lICE9XCJcIil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMudHlwZVNwcml0ZSxwYXRoLCBuYW1lLG51bGwsZmFsc2UpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZVNwcml0ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIFNldFRvZ2dsZUNoZWNrZWQoKXtcclxuICAgICAgICB0aGlzLnRvZ2dsZS5pc0NoZWNrZWQgPXRydWU7XHJcbiAgICAgICAgdGhpcy50b2dnbGUuY2hlY2soKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXRVblJlYWRBY3RpdmVTdGF0ZShzdGF0ZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLlVucmVhZC5ub2RlLmFjdGl2ZSA9IHN0YXRlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBlbnRpdHlEYXRhKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuX2VudGl0eURhdGEgPSBkYXRhO1xyXG4gICAgICAgIGlmKHRoaXMuX2VudGl0eURhdGEucmVkX3N0YXR1cyAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRoaXMuU2V0VW5SZWFkQWN0aXZlU3RhdGUodGhpcy5fZW50aXR5RGF0YS5yZWRfc3RhdHVzID09PSAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVudGl0eURhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW50aXR5RGF0YTtcclxuICAgIH1cclxufVxyXG4iXX0=