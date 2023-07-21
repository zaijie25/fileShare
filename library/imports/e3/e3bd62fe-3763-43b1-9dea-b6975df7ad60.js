"use strict";
cc._RF.push(module, 'e3bd6L+N2NDsZ3qtpdd961g', 'ErmjFlowView');
// ermj/Ermj/scripts/subView/ErmjFlowView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjFlowView = /** @class */ (function (_super) {
    __extends(ErmjFlowView, _super);
    function ErmjFlowView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.setNode(node);
        return _this;
    }
    ErmjFlowView.prototype.initView = function () {
        this.actionNode = this.getChild("action");
        ErmjGameConst_1.default.addCommonClick(this.node, "action/continueBtn", this.onContinueClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "action/leaveBtn", this.onLeaveClick, this);
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjFlowView.prototype.onOpen = function () {
        this.clickLimit = false;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        this.actionNode.active = false;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.RewardLose, true);
        this.delayShowActionBtn(8000); // 以防没收到服务器协议情况
    };
    /** 等待多少ms后显示退出和继续按钮 等待服务器清桌 */
    ErmjFlowView.prototype.delayShowActionBtn = function (delay) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.showActionBtn(true);
        }, delay);
    };
    ErmjFlowView.prototype.showActionBtn = function (flag) {
        this.actionNode.active = flag;
        clearTimeout(this.timer);
    };
    ErmjFlowView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
        clearTimeout(this.timer);
    };
    ErmjFlowView.prototype.onContinueClick = function () {
        var _this = this;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ContinueGame, true);
        if (this.clickLimit)
            return;
        ErmjDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    ErmjFlowView.prototype.onLeaveClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        ErmjDriver_1.default.instance.leaveGame();
    };
    ErmjFlowView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjFlowView;
}(ErmjBaseView_1.default));
exports.default = ErmjFlowView;

cc._RF.pop();