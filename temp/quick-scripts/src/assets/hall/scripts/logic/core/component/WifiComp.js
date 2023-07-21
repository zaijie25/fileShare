"use strict";
cc._RF.push(module, '8a55eTewLlOprZ5aQym/Dlk', 'WifiComp');
// hall/scripts/logic/core/component/WifiComp.ts

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
var WifiComp = /** @class */ (function (_super) {
    __extends(WifiComp, _super);
    function WifiComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateSpriteArr = [];
        _this.EventString = "";
        return _this;
        // update (dt) {}
    }
    WifiComp.prototype.onLoad = function () {
        for (var index = 0; index < 3; index++) {
            this.stateSpriteArr[index] = cc.find("state" + (index + 1), this.node);
            this.stateSpriteArr[index].active = false;
        }
        this.msLabel = cc.find("msLabel", this.node).getComponent(cc.RichText);
        this.msLabel.node.active = false;
    };
    WifiComp.prototype.init = function (type) {
        if (type == 1) {
            this.EventString = GlobalEvent.RefreshHallNetCost;
        }
        else if (type == 2) {
            this.EventString = GlobalEvent.RefreshGameNetCost;
        }
    };
    WifiComp.prototype.startListen = function () {
        Global.Event.on(this.EventString, this, this.refreshState);
    };
    WifiComp.prototype.refreshState = function (ms) {
        if (!this.stateSpriteArr || this.stateSpriteArr.length == 0) {
            return;
        }
        if (ms <= 300) {
            this.msLabel.node.color = new cc.Color().fromHEX("#9DD500");
            this.stateSpriteArr[0].active = true;
            this.stateSpriteArr[1].active = false;
            this.stateSpriteArr[2].active = false;
        }
        else if (ms > 300 && ms <= 700) {
            this.msLabel.node.color = new cc.Color().fromHEX("#FFE500");
            this.stateSpriteArr[0].active = false;
            this.stateSpriteArr[1].active = true;
            this.stateSpriteArr[2].active = false;
        }
        else {
            this.msLabel.node.color = new cc.Color().fromHEX("#FF0000");
            this.stateSpriteArr[0].active = false;
            this.stateSpriteArr[1].active = false;
            this.stateSpriteArr[2].active = true;
        }
        this.msLabel.node.active = true;
        this.msLabel.string = "<b>" + ms + "ms</b>";
    };
    WifiComp.prototype.onDestroy = function () {
        Global.Event.off(this.EventString, this, this.refreshState);
        this.stateSpriteArr = [];
    };
    WifiComp = __decorate([
        ccclass
    ], WifiComp);
    return WifiComp;
}(cc.Component));
exports.default = WifiComp;

cc._RF.pop();