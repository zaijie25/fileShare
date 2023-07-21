"use strict";
cc._RF.push(module, '889ecNRv1lJUIeShwSHdxvw', 'ErmjAskNoticeView');
// ermj/Ermj/scripts/subView/ErmjAskNoticeView.ts

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
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjTimeAutoRun_1 = require("../component/ErmjTimeAutoRun");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjAskNoticeView = /** @class */ (function (_super) {
    __extends(ErmjAskNoticeView, _super);
    function ErmjAskNoticeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjAskNoticeView.prototype.initView = function () {
        this.bgSp = this.getComponent("content/bgSp", cc.Sprite);
        this.oppNoticeSp = this.getComponent("content/oppNoticeSp", cc.Sprite);
        this.oppNoticeSp.node.active = false;
        this.selfNoticeSp = this.getComponent("content/selfNoticeSp", cc.Sprite);
        this.selfNoticeSp.node.active = false;
        this.timeRun = Global.UIHelper.safeGetComponent(this.getChild('content/timeLbl'), "", ErmjTimeAutoRun_1.default);
        this.timeRun.node.active = false;
    };
    /**
     * 自己enter时设置方位朝向
     * @param serChair 服务器座位 与ErmjLocation枚举对应
     */
    ErmjAskNoticeView.prototype.setChairLook = function (serChair) {
        var _a = ErmjGameConst_1.default.askNoticeStrCfg[serChair], bgStr = _a[0], selfStr = _a[1], oppStr = _a[2];
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.bgSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", bgStr, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.selfNoticeSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", selfStr, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.oppNoticeSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", oppStr, null, true);
        this.oppNoticeSp.node.active = false;
        this.selfNoticeSp.node.active = false;
    };
    /** 轮到谁了 */
    ErmjAskNoticeView.prototype.whichLocationTurn = function (localseat) {
        if (localseat == 0) {
            this.selfNoticeSp.node.active = true;
            this.oppNoticeSp.node.active = false;
            this.selfNoticeSp.node.stopAllActions();
            this.selfNoticeSp.node.opacity = 255;
            this.selfNoticeSp.node.runAction(cc.repeatForever(cc.sequence([
                cc.fadeTo(1, 100),
                cc.fadeTo(1, 255),
            ])));
        }
        else if (localseat == 1) {
            this.oppNoticeSp.node.active = true;
            this.selfNoticeSp.node.active = false;
            this.oppNoticeSp.node.stopAllActions();
            this.oppNoticeSp.node.opacity = 255;
            this.oppNoticeSp.node.runAction(cc.repeatForever(cc.sequence([
                cc.fadeTo(1, 100),
                cc.fadeTo(1, 255),
            ])));
        }
    };
    /** 设置倒计时 */
    ErmjAskNoticeView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRun.node.active = true;
        this.timeRun.setTimer(leftTime, callback, target);
    };
    ErmjAskNoticeView.prototype.setTimerShow = function (flag) {
        this.timeRun.node.active = flag;
    };
    ErmjAskNoticeView.prototype.clearByRound = function () {
        this.timeRun.node.active = false;
        this.selfNoticeSp.node.stopAllActions();
        this.oppNoticeSp.node.stopAllActions();
        this.selfNoticeSp.node.opacity = 255;
        this.oppNoticeSp.node.opacity = 255;
        this.active = false;
    };
    return ErmjAskNoticeView;
}(ErmjBaseView_1.default));
exports.default = ErmjAskNoticeView;

cc._RF.pop();