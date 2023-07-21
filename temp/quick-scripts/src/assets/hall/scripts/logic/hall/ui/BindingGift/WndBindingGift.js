"use strict";
cc._RF.push(module, 'bd48ezZGKJH8opArceG4Ezu', 'WndBindingGift');
// hall/scripts/logic/hall/ui/BindingGift/WndBindingGift.ts

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
var GlobalEvent_1 = require("../../../core/GlobalEvent");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndBindingGift = /** @class */ (function (_super) {
    __extends(WndBindingGift, _super);
    function WndBindingGift() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBindingGift.prototype.onInit = function () {
        this.name = "WndBindingGift";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/BindingGift/BindingGift";
        this.model = Global.ModelManager.getModel("BindingGiftModel");
        this.destoryType = WndBase_1.DestoryType.Now;
    };
    WndBindingGift.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.bindBtn = cc.find("BindBtn", this.node);
        this.bindGiftLabel = this.getComponent("awardLabel", cc.Label);
        this.addCommonClick("close", this.close, this);
        this.bindBtn = this.addCommonClick("BindBtn", this.OpenBindingPhone, this);
        if (this.bindBtn) {
            this.bindBtn.active = true;
        }
    };
    WndBindingGift.prototype.playSpineAward = function () {
        var _this = this;
        if (this.SpineNode == null) {
            this.SpineNode = cc.find("spineNode", this.node).getComponent(sp.Skeleton);
            this.SpineNode.setCompleteListener(function () {
                _this.SpineNode.clearTrack(0);
                _this.SpineNode.setAnimation(0, "idle2", true);
            });
        }
        this.SpineNode.clearTrack(0);
        this.SpineNode.setAnimation(0, "idle", false);
    };
    WndBindingGift.prototype.OpenBindingPhone = function () {
        Logger.error("点击绑定手机:0000");
        HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.BindPhone, function () {
            Logger.error("点击绑定手机");
            Global.Event.event(GlobalEvent_1.default.POP_BIND_PHONE);
        });
        this.close();
    };
    WndBindingGift.prototype.onOpen = function (args) {
        if (this.model.BindAwardNum === 3)
            Global.Audio.playAudioSource("hall/sound/binding");
        this.model.SetStatus(false);
        this.bindGiftLabel.string = this.model.BindAwardNum.toString() || "";
        if (Global.Setting.SkinConfig.isPurple)
            this.playSpineAward();
    };
    WndBindingGift.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.BindGift);
        clearTimeout(this.timerId);
    };
    return WndBindingGift;
}(WndBase_1.default));
exports.default = WndBindingGift;

cc._RF.pop();