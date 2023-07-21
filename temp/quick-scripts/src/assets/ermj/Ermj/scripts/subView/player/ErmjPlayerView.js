"use strict";
cc._RF.push(module, 'dcd4dTzO5RGYaGYvakbO7m5', 'ErmjPlayerView');
// ermj/Ermj/scripts/subView/player/ErmjPlayerView.ts

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
var ErmjBaseView_1 = require("../ErmjBaseView");
var ErmjDriver_1 = require("../../ErmjDriver");
var ErmjPathHelper_1 = require("../../data/ErmjPathHelper");
var ErmjRuleConst_1 = require("../../data/ErmjRuleConst");
var ErmjGameConst_1 = require("../../data/ErmjGameConst");
var ErmjGameEvent_1 = require("../../data/ErmjGameEvent");
var ErmjPlayerView = /** @class */ (function (_super) {
    __extends(ErmjPlayerView, _super);
    function ErmjPlayerView(node, viewSeat) {
        var _this = _super.call(this) || this;
        _this.viewSeat = viewSeat;
        _this._someone = false;
        //客户端player索引
        _this.clientSit = 0;
        _this.setNode(node);
        return _this;
    }
    ErmjPlayerView.prototype.initView = function () {
        this.matchPos = this.getChild("matchPoint").position;
        this.infoNode = this.getChild("info");
        this.infoRawPos = this.infoNode.position;
        this.headImg = this.getComponent("info/mask/headImg", cc.Sprite);
        this.emjoyNode = this.getChild("info/emjoyNode");
        ErmjGameConst_1.default.addCommonClick(this.emjoyNode, "", this.onHeadClick, this, cc.Button.Transition.NONE);
        this.headBox = this.getComponent("info/headBox", cc.Sprite);
        this.nameLbl = this.getComponent("info/nameLbl", cc.Label);
        this.coinLbl = this.getComponent("info/coinLbl", cc.Label);
        this.bankerIcon = this.getChild("info/banker");
        this.bankerIcon.active = false;
        this.stateSp = this.getComponent("info/state", cc.Sprite);
        this.stateSp.node.active = false;
        this.stateEffect = this.getComponent("info/state/effect", sp.Skeleton);
        this.fanTypeNode = this.getChild("info/fanType");
        this.fanTypeNode.active = false;
        this.typeBgSp = this.getComponent("info/fanType/bgSp", cc.Sprite);
        this.typeSp = this.getComponent("info/fanType/bgSp/typeSp", cc.Sprite);
        this.typeSk = this.getComponent("info/fanType/effect", sp.Skeleton);
        this.typeStartPos = this.typeBgSp.node.position;
        this.tingSignNode = this.getChild("info/tingNode");
        this.tingSignNode.active = false;
        this.autoSign = this.getChild('info/auto');
        this.autoSign.active = false;
        this.headTipsRoot = this.getChild("headTipsRoot");
        this.headTipsRootRawPos = this.headTipsRoot.position;
    };
    ErmjPlayerView.prototype.getHeadTipWorldPos = function () {
        return this.headTipsRoot.parent.convertToWorldSpaceAR(this.headTipsRootRawPos);
    };
    ErmjPlayerView.prototype.onHeadClick = function () {
        if (this.viewSeat != 0) {
            ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
            Game.Event.event(ErmjGameEvent_1.default.onUserInfoTouch, this.clientSit, this.getHeadTipWorldPos());
        }
    };
    Object.defineProperty(ErmjPlayerView.prototype, "someone", {
        get: function () {
            return this._someone;
        },
        enumerable: false,
        configurable: true
    });
    ErmjPlayerView.prototype.show = function (data) {
        this.node.active = true;
        // this.setPlayerInfo("防作弊");
        this.setPlayerInfo(data.nickname);
        this.loadHeadImg(data.headimg);
        this.loadHeadBox(data.headkuang);
        this.setPlayerPoint(data.point);
        if (this.Context.isWaitMatch) {
            this.setMatching();
        }
        if (data == null) {
            this._someone = false;
            return;
        }
        this._someone = true;
    };
    ErmjPlayerView.prototype.setPlayerInfo = function (name) {
        this.nameLbl.string = name;
    };
    ErmjPlayerView.prototype.loadHeadImg = function (str) {
        var w = this.headImg.node.width;
        var h = this.headImg.node.height;
        this.headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(str);
        this.headImg.node.width = w;
        this.headImg.node.height = h;
    };
    ErmjPlayerView.prototype.loadHeadBox = function (str) {
        var w = this.headBox.node.width;
        var h = this.headBox.node.height;
        ErmjDriver_1.default.instance.LoadVipHeadKuang(this.headBox, str);
        this.headBox.node.width = w;
        this.headBox.node.height = h;
    };
    ErmjPlayerView.prototype.setPlayerPoint = function (point) {
        this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    ErmjPlayerView.prototype.hide = function () {
        this.node.active = false;
        this.nameLbl.string = '';
        this.coinLbl.string = '';
    };
    ErmjPlayerView.prototype.showBanker = function (flag) {
        this.bankerIcon.active = flag;
    };
    ErmjPlayerView.prototype.setMatching = function () {
        this.infoNode.setPosition(this.matchPos);
    };
    ErmjPlayerView.prototype.setMatched = function (isAnim, time) {
        if (time === void 0) { time = 0.5; }
        if (isAnim) {
            this.infoNode.setPosition(this.matchPos);
            var tween = Game.Tween.get(this.infoNode);
            tween.to(time, { position: this.infoRawPos }, cc.easeCubicActionOut())
                .start();
        }
        else {
            this.infoNode.setPosition(this.infoRawPos);
        }
    };
    ErmjPlayerView.prototype.showStateSp = function (flag, spStr) {
        this.stateSp.node.active = flag;
        this.stateEffect.clearTracks();
        if (flag) {
            this.stateEffect.setAnimation(0, "idle", false);
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.stateSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", spStr, null, true);
        }
    };
    ErmjPlayerView.prototype.showTingSign = function (flag) {
        this.tingSignNode.active = flag;
    };
    ErmjPlayerView.prototype.showFanType = function (flag, nType) {
        var _this = this;
        this.fanTypeNode.active = flag;
        if (flag) {
            this.typeSk.clearTracks();
            this.typeBgSp.node.stopAllActions();
            var config = ErmjRuleConst_1.default.cardTypeConfig[nType] || {};
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.typeBgSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", config.bg, null, true);
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.typeSp, ErmjPathHelper_1.default.gameTexturePath + "type/atlas_type", config.sp, null, true);
            this.typeSk.setAnimation(0, "idle", false);
            var endPos = this.typeStartPos.add(cc.v3(-150, 0));
            this.typeBgSp.node.setPosition(this.typeStartPos);
            this.typeBgSp.node.opacity = 1;
            var showAction = cc.spawn([
                cc.moveTo(0.4, cc.v2(endPos.x, endPos.y)).easing(cc.easeCubicActionOut()),
                cc.fadeTo(0.2, 255)
            ]);
            this.typeBgSp.node.runAction(cc.sequence([
                showAction,
                cc.delayTime(1.1),
                cc.callFunc(function () {
                    _this.fanTypeNode.active = false;
                }, this)
            ]));
        }
    };
    ErmjPlayerView.prototype.showAutoSign = function (isShow) {
        this.autoSign.active = isShow;
    };
    ErmjPlayerView.prototype.getPlayerHeadCenterPos = function () {
        var pos = this.headImg.node.parent.convertToWorldSpaceAR(this.headImg.node.position);
        return pos;
    };
    ErmjPlayerView.prototype.clearByRound = function () {
        this.autoSign.active = false;
        this.bankerIcon.active = false;
        this.tingSignNode.active = false;
        this.showStateSp(false);
        this.showFanType(false);
        this.infoNode.setPosition(this.infoRawPos);
    };
    return ErmjPlayerView;
}(ErmjBaseView_1.default));
exports.default = ErmjPlayerView;

cc._RF.pop();