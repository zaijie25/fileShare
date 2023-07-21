"use strict";
cc._RF.push(module, '0cb46Ui9gJB3aQM+NwwoRAX', 'TextRollSceen.ts');
// hall/scripts/logic/core/component/TextRollSceen.ts.ts

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
var TextRollSceen = /** @class */ (function (_super) {
    __extends(TextRollSceen, _super);
    function TextRollSceen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showOrderArr = [];
        _this.index = 0;
        _this.timeInterval = 6;
        _this.changeTime = 1;
        return _this;
    }
    TextRollSceen.prototype.onLoad = function () {
        this.showText = cc.find("txt", this.node).getComponent(cc.Label);
    };
    // 有需求再优化通用
    TextRollSceen.prototype.start = function () {
        if (window["Global"] == null) {
            Logger.error("global is null");
            return;
        }
        if (Global.Setting.SkinConfig && Global.Setting.SkinConfig.loadedFinish)
            this.startRun();
        else
            Global.Event.once(GlobalEvent.SkinConfigLoadFinish, this, this.startRun);
    };
    TextRollSceen.prototype.startRun = function () {
        this.showOrderArr = Global.Toolkit.getOutOrderArray(Global.Setting.SkinConfig.loadingTips);
        this.setShowText(this.showOrderArr[this.index]);
        this.schedule(this.onTimerUpdate, this.timeInterval);
    };
    TextRollSceen.prototype.setShowText = function (str) {
        var _this = this;
        if (str === void 0) { str = ''; }
        if (this.showText == null)
            return;
        this.showText.string = str;
        this.scheduleOnce(function () {
            if (_this.node.isValid)
                _this.node.width = _this.showText.node.width + 200;
        }, 0);
        // let len = Global.Toolkit.getTotalBytes(str);
        // this.node.width = len * 15 + 80;
    };
    TextRollSceen.prototype.onTimerUpdate = function () {
        var _this = this;
        this.index++;
        var fadeOutAc = cc.fadeTo(this.changeTime / 2, 30);
        var funcAc = cc.callFunc(function () {
            _this.setShowText(_this.showOrderArr[_this.index]);
        }, this);
        var fadeInAc = cc.fadeTo(this.changeTime / 2, 255);
        this.node.runAction(cc.sequence(fadeOutAc, funcAc, fadeInAc));
        if (this.index == this.showOrderArr.length - 1) {
            this.index = 0;
        }
    };
    TextRollSceen.prototype.onDestroy = function () {
        this.node.stopAllActions();
        this.unschedule(this.onTimerUpdate);
    };
    TextRollSceen = __decorate([
        ccclass
    ], TextRollSceen);
    return TextRollSceen;
}(cc.Component));
exports.default = TextRollSceen;

cc._RF.pop();