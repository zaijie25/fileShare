"use strict";
cc._RF.push(module, '39e695Jig9BlZDbrUSNqQxv', 'ErmjAskBtnView');
// ermj/Ermj/scripts/subView/ErmjAskBtnView.ts

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
var ErmjAskBtnView = /** @class */ (function (_super) {
    __extends(ErmjAskBtnView, _super);
    function ErmjAskBtnView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjAskBtnView.prototype.initView = function () {
        this.autoBtn = this.getChild('autoBtn');
        this.autoBtn.active = false;
        this.autoCloseBtn = this.getChild('autoBtn/autoClose');
        this.autoCloseBtn.active = false;
        ErmjGameConst_1.default.addCommonClick(this.autoBtn, "", this.onAutoPlayClick, this);
        this.cancelAuto = this.getChild('cancelAuto');
        this.cancelAuto.active = false;
        ErmjGameConst_1.default.addCommonClick(this.node, "cancelAuto/btnCancel", this.onCancelAutoClick, this);
    };
    ErmjAskBtnView.prototype.onClose = function () {
        this.clearByRound();
    };
    ErmjAskBtnView.prototype.clearByRound = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
        this.autoCloseBtn.active = false;
    };
    ErmjAskBtnView.prototype.clearByGame = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
        this.autoCloseBtn.active = false;
    };
    //挂机按钮
    ErmjAskBtnView.prototype.onAutoPlayClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(false);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 1 });
    };
    //取消挂机按钮
    ErmjAskBtnView.prototype.onCancelAutoClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(true);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 0 });
    };
    ErmjAskBtnView.prototype.setAutoPlayBtnShow = function (isShow) {
        this.autoBtn.active = true;
        this.cancelAuto.active = !isShow;
        this.autoCloseBtn.active = !isShow;
    };
    return ErmjAskBtnView;
}(ErmjBaseView_1.default));
exports.default = ErmjAskBtnView;

cc._RF.pop();