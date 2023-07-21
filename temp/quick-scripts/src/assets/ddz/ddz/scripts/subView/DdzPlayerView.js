"use strict";
cc._RF.push(module, '06f60r3y31IZ6+H9aqNjYxZ', 'DdzPlayerView');
// ddz/ddz/scripts/subView/DdzPlayerView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzPokerGroup_1 = require("./DdzPokerGroup");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzRoleView_1 = require("./DdzRoleView");
var DdzDriver_1 = require("../DdzDriver");
/**
 * 玩家信息包括飘字等
 */
var DdzPlayerView = /** @class */ (function (_super) {
    __extends(DdzPlayerView, _super);
    function DdzPlayerView(node, nSeat) {
        var _this = _super.call(this) || this;
        _this.nSeat = nSeat;
        _this.setNode(node);
        return _this;
    }
    DdzPlayerView.prototype.initView = function () {
        this.infoNode = this.getChild('info');
        this.infoNode.active = false;
        this.coinLbl = this.getComponent('info/coinLbl', cc.Label);
        this.nameLbl = this.getComponent('info/nameLbl', cc.Label);
        this.headImg = this.getComponent("info/mask/headImg", cc.Sprite);
        this.vipKuang = this.getComponent("info/headbox", cc.Sprite);
        this.rewardRoot = this.getChild('rewardRoot');
        this.rewardLbl = this.getComponent('rewardRoot/rewardLbl', cc.Label);
        this.endPos = this.rewardRoot.position;
        this.winFont = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gameTexturePath + 'atlas/frame/font/num_jia', cc.Font);
        this.loseFont = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gameTexturePath + 'atlas/frame/font/num_fu', cc.Font);
        this.warnSign = this.getChild('warn');
        this.warnSign.active = false;
        this.dzSign = this.getComponent('dzSign', sp.Skeleton);
        this.dzSign.node.active = false;
        this.stateIconSp = this.getComponent('state', cc.Sprite);
        this.clockRoot = this.getChild('clockRoot');
        this.autoSign = this.getChild('auto');
        this.autoSign.active = false;
        this.multNode = this.getChild('mult');
        this.multNode.active = false;
    };
    DdzPlayerView.prototype.initPokerGroup = function (node) {
        this.pokerGroup = new DdzPokerGroup_1.default(node, this.nSeat);
        this.pokerGroup.resetGroupPoker();
    };
    DdzPlayerView.prototype.setPlayerInfo = function (name) {
        if (name === void 0) { name = this.Define.DefaultNameStr; }
        this.nameLbl.string = name;
    };
    DdzPlayerView.prototype.setPlayerPoint = function (point) {
        this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    DdzPlayerView.prototype.setPlayerHeadImg = function (str) {
        if (this.headImg) {
            // this.headImg.node.active = !DdzDriver.instance.skinDefine.useRole;
            this.headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(str);
        }
    };
    DdzPlayerView.prototype.show = function (data) {
        this.node.active = true;
        this.setPlayerInfo(data.area);
        this.setPlayerPoint(data.point);
        this.setPlayerHeadImg(data.headimg);
        if (this.vipKuang) {
            DdzDriver_1.default.instance.LoadVipHeadKuang(this.vipKuang, data.headkuang);
        }
        if (this.nSeat !== 0)
            this.infoNode.active = true;
        if (!this.Context.get(this.Define.FieldGameStart)) { // 游戏未开始才显示角色为农民 开始不处理
            this.showRole(true, DdzRoleView_1.DdzRoleDefine.FFramer, false);
        }
    };
    DdzPlayerView.prototype.hide = function () {
        this.node.active = false;
        this.nameLbl.string = '';
        this.coinLbl.string = '';
        this.showRole(false);
        this.clearByRound();
    };
    DdzPlayerView.prototype.setDz = function (isDz, isAnim) {
        if (isAnim === void 0) { isAnim = false; }
        this.dzSign.node.active = isDz;
        if (isDz) {
            if (isAnim) {
                this.dzSign.setAnimation(0, 'idle', false);
                this.dzSign.addAnimation(0, "idle2", true, 1);
                this.showRole(true, DdzRoleView_1.DdzRoleDefine.FLandord, true);
            }
            else {
                this.dzSign.setAnimation(0, 'idle2', true);
                this.showRole(true, DdzRoleView_1.DdzRoleDefine.FLandord, false);
            }
        }
    };
    DdzPlayerView.prototype.setPlayerRole = function (node) {
        if (node && cc.isValid(node)) {
            this.roleView = new DdzRoleView_1.default(node);
            this.roleView.active = false;
        }
    };
    /**
     * 显示人物角色
     * @param isShow
     * @param nRole 1：地主 2：农民
     * @param isAnim 是否切换动画
     */
    DdzPlayerView.prototype.showRole = function (isShow, nRole, isAnim) {
        if (nRole === void 0) { nRole = 1; }
        if (isAnim === void 0) { isAnim = false; }
        this.roleView.active = isShow;
        if (isShow) {
            if (nRole == DdzRoleView_1.DdzRoleDefine.FLandord) {
                if (isAnim) {
                    this.roleView.switchRole();
                }
                else {
                    this.roleView.showRole(true, DdzRoleView_1.DdzRoleDefine.FLandord);
                }
            }
            else {
                this.roleView.showRole(true, DdzRoleView_1.DdzRoleDefine.FFramer);
            }
        }
    };
    DdzPlayerView.prototype.showRewardLbl = function (num, isWin) {
        this.rewardRoot.active = true;
        this.rewardLbl.string = Global.Toolkit.formatPointStr(num, true, true);
        this.rewardLbl.font = isWin && this.winFont || this.loseFont;
        this.rewardRoot.setPosition(cc.v2(this.endPos.x, this.endPos.y - 30));
        var tween = Game.Tween.get(this.rewardRoot);
        tween.to(this.Define.FloatScoreTime - 0.4, { position: this.endPos }, cc.easeCubicActionOut())
            .call(function () {
        })
            .start();
        this.roleView.playRoleSettleEffect(isWin);
    };
    DdzPlayerView.prototype.showPlayerThinkEffect = function () {
        this.roleView.playRoleThinkEffect();
    };
    DdzPlayerView.prototype.showPlayerNormalEffect = function () {
        this.roleView.playRoleNormalEffect();
    };
    DdzPlayerView.prototype.showPlayerPlayEffect = function (isBomb) {
        this.roleView.playRoleOutPokersEffect(isBomb);
    };
    DdzPlayerView.prototype.setState = function (isShow, stage, num) {
        if (isShow) {
            this.stateIconSp.node.children[0].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame();
            switch (stage) {
                case DdzGameConst_1.DdzGameActState.Rob:
                    this.stateIconSp.node.active = true;
                    Global.ResourceManager.loadGameBundleAutoAtlas(this.stateIconSp.node.children[0].getComponent(cc.Sprite), DdzPathHelper_1.default.gameTexturePath + 'atlas/frame/atlas_frame', DdzGameConst_1.default.GameRobStrCfg[num]);
                    break;
                case DdzGameConst_1.DdzGameActState.Mult:
                    this.stateIconSp.node.active = true;
                    Global.ResourceManager.loadGameBundleAutoAtlas(this.stateIconSp.node.children[0].getComponent(cc.Sprite), DdzPathHelper_1.default.gameTexturePath + 'atlas/frame/atlas_frame', DdzGameConst_1.default.GameMultStrCfg[num]);
                    break;
                case DdzGameConst_1.DdzGameActState.Play:
                    this.stateIconSp.node.active = true;
                    Global.ResourceManager.loadGameBundleAutoAtlas(this.stateIconSp.node.children[0].getComponent(cc.Sprite), DdzPathHelper_1.default.gameTexturePath + 'atlas/frame/atlas_frame', DdzGameConst_1.default.GamePlayStrCfg[num]);
                    break;
                default:
                    this.stateIconSp.node.active = false;
            }
        }
        this.stateIconSp.node.active = isShow;
    };
    DdzPlayerView.prototype.setPlayerLeftPokers = function (isShow, num) {
        this.pokerGroup.setRestCountShow(isShow, num);
    };
    DdzPlayerView.prototype.showPlayPokers = function (isShow, pokerArr, isAnim) {
        var _this = this;
        if (pokerArr === void 0) { pokerArr = []; }
        this.pokerGroup.showPlayPokers(isShow, pokerArr);
        if (isShow && pokerArr.length > 0) {
            Game.Component.scheduleOnce(function () {
                _this.pokerGroup.playOutPokersAnim(isAnim, pokerArr);
            }, this.Define.PokerPlayDelayTime);
        }
    };
    DdzPlayerView.prototype.showWarnSign = function (isShow) {
        if (this.warnSign.active == isShow)
            return;
        this.warnSign.active = isShow;
    };
    DdzPlayerView.prototype.showAutoSign = function (isShow) {
        this.autoSign.active = isShow;
    };
    DdzPlayerView.prototype.showMultSign = function (isShow) {
        this.multNode.active = isShow;
    };
    DdzPlayerView.prototype.getPlayerClockWorldPos = function () {
        return this.node.convertToWorldSpaceAR(this.clockRoot.position);
    };
    DdzPlayerView.prototype.clearByRound = function () {
        this.rewardRoot.active = false;
        this.warnSign.active = false;
        this.autoSign.active = false;
        this.setDz(false);
        this.setState(false);
        this.showMultSign(false);
        this.pokerGroup.resetGroupPoker();
    };
    DdzPlayerView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    return DdzPlayerView;
}(DdzBaseView_1.default));
exports.default = DdzPlayerView;

cc._RF.pop();