"use strict";
cc._RF.push(module, '7145ccFYVBNeIm7wnBP+Sxi', 'WndRebateGet');
// hall/scripts/logic/hall/ui/rebate/WndRebateGet.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndRebateGet = /** @class */ (function (_super) {
    __extends(WndRebateGet, _super);
    function WndRebateGet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bindAwardType = -1; //默认方式
        return _this;
    }
    WndRebateGet.prototype.onInit = function () {
        this.name = "WndRebateGet";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/RebateGetUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndRebateGet.prototype.initView = function () {
        var _this = this;
        this.bindAwardType = -1;
        this.sureBtn = this.getChild("sureBtn");
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.sureBtn.active = false;
        this.sound = this.getComponent("sound", cc.AudioSource);
        this.rabateLbl = this.getComponent("labelBg/rebateLbl", cc.Label);
        this.effectSk = this.getComponent("effect", sp.Skeleton);
        this.effectSk && this.effectSk.setCompleteListener(function () {
            _this.effectSk.setAnimation(0, "idle2", true);
        });
    };
    WndRebateGet.prototype.onSureBtnClick = function () {
        // Global.Audio.stopAllEffect();
        if (this.sound && this.sound.isPlaying)
            this.sound.stop();
        this.closeWnd();
    };
    WndRebateGet.prototype.onOpen = function (arr) {
        var _this = this;
        var point = arr[0];
        this.bindAwardType = -1;
        if (arr[1]) {
            this.bindAwardType = arr[1];
        }
        var model = Global.ModelManager.getModel("BindingGiftModel");
        this.rabateLbl.string = Global.Toolkit.formatPointStr(point, true) || model.BindAwardNum.toString();
        this.rabateLbl.node.active = false;
        this.effectSk && this.effectSk.setAnimation(0, "idle", false);
        var soundEnable = Global.Setting.settingData.soundEnable;
        if (this.sound && !this.sound.isPlaying && soundEnable)
            this.sound.play();
        this.sureBtn.scale = 1;
        this.timeOut = setTimeout(function () {
            _this.rabateLbl.node.active = true;
            _this.sureBtn.active = true;
            _this.sureBtn.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1)));
            _this.addCommonClick("Mask", _this.onSureBtnClick, _this);
        }, 1000);
        if (arr[2]) {
            this.closeCallback = arr[2];
        }
    };
    WndRebateGet.prototype.closeWnd = function () {
        if (this.closeCallback) {
            this.closeCallback();
        }
        this.close();
    };
    WndRebateGet.prototype.onClose = function () {
        this.closeCallback = null;
        clearTimeout(this.timeOut);
        if (this.bindAwardType > 0) {
            if (this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.MegePoint) {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.MegePoint);
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
                return;
            }
            if (this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.share && this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.bindPoint) {
                Global.UI.fastTip("绑定手机成功");
            }
            if (this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.bindPoint) {
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
            }
            if (this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.onlyPhonePoint || this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.phonePoint) {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.PhoneGiftGet);
            }
            else {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.BindGiftGet);
            }
        }
    };
    WndRebateGet.prototype.onDispose = function () {
        if (this.sound)
            this.sound = null;
    };
    return WndRebateGet;
}(WndBase_1.default));
exports.default = WndRebateGet;

cc._RF.pop();