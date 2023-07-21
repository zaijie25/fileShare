"use strict";
cc._RF.push(module, 'cd507k2sdhGJYqIYw+TPWjC', 'HallGuiDelinesView');
// hall/scripts/logic/hall/ui/hall/views/HallGuiDelinesView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var HallBtnHelper_1 = require("./HallBtnHelper");
var HallGuiDelinesView = /** @class */ (function (_super) {
    __extends(HallGuiDelinesView, _super);
    function HallGuiDelinesView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sf = true;
        _this.sfshou = true;
        _this.tipscale = 2;
        return _this;
    }
    HallGuiDelinesView.prototype.initView = function () {
        this.node.active = false;
        this.quan = cc.find("newGet/anim/quan", this.node);
        this.shou = cc.find("newGet/anim/shou", this.node);
        this.newGetNode = cc.find("newGet", this.node);
        this.animNode = cc.find("newGet/anim", this.node);
        this.addCommonClick("bg", this.onSubViewHide, this, 0);
        this.addCommonClick("newGet/anim", this.onOpenCommision, this, 0);
        this.tips = cc.find("tips", this.node);
    };
    HallGuiDelinesView.prototype.onSubViewHide = function () {
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
    };
    HallGuiDelinesView.prototype.onOpenCommision = function () {
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
        HallBtnHelper_1.default.WndCommision();
    };
    HallGuiDelinesView.prototype.getNewMsg = function () {
        var _this = this;
        Global.HallServer.send(NetAppface.mod, "GetTaskStatus", {}, function (data) {
            var msg = data;
            if (msg.num > 0) {
                _this.tips.scale = _this.tipscale;
                _this.node.active = true;
                _this.showGuiDelines();
                Global.Audio.playAudioSource("hall/sound/guidelines");
            }
        }, null, false, 0);
    };
    HallGuiDelinesView.prototype.showGuiDelines = function () {
        var hallModel = Global.ModelManager.getModel("HallModel");
        var csNode = hallModel.csNodePos;
        var wPos = csNode.parent.convertToWorldSpaceAR(csNode.position);
        var lpos = this.animNode.parent.convertToNodeSpaceAR(wPos);
        this.animNode.position = lpos;
        if (this.quan) {
            Global.Component.schedule(this.ShowQuanUi.bind(this), 0.1);
            Global.Component.schedule(this.ShowShouUi.bind(this), 0.15);
            Global.Component.schedule(this.showTip.bind(this), 0.05);
        }
    };
    HallGuiDelinesView.prototype.ShowQuanUi = function () {
        var num = this.quan.scale;
        if (this.sf) {
            num -= 0.15;
            if (num <= 1) {
                this.sf = false;
            }
        }
        else {
            num += 0.15;
            if (num >= 1.3) {
                this.sf = true;
            }
        }
        this.quan.setScale(num);
    };
    HallGuiDelinesView.prototype.ShowShouUi = function () {
        var num = this.shou.scale;
        if (this.sfshou) {
            num -= 0.1;
            if (num <= 1) {
                this.sfshou = false;
            }
        }
        else {
            num += 0.1;
            if (num >= 1.3) {
                this.sfshou = true;
            }
        }
        this.shou.setScale(num);
    };
    HallGuiDelinesView.prototype.showTip = function () {
        var num = this.tips.scale;
        if (this.tips.scale > 1) {
            num -= 0.2;
            this.tips.setScale(num);
        }
        else {
            Game.Component.unschedule(this.showTip.bind(this));
            return;
        }
    };
    return HallGuiDelinesView;
}(ViewBase_1.default));
exports.default = HallGuiDelinesView;

cc._RF.pop();