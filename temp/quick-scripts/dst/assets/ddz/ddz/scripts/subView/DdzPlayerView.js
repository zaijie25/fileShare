
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelBsYXllclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLHVEQUFrRDtBQUNsRCxpREFBNEM7QUFDNUMscURBQXFFO0FBQ3JFLDZDQUEyRDtBQUMzRCwwQ0FBcUM7QUFFckM7O0dBRUc7QUFDSDtJQUEyQyxpQ0FBVztJQXFCbEQsdUJBQVksSUFBYSxFQUFTLEtBQWE7UUFBL0MsWUFDSSxpQkFBTyxTQUVWO1FBSGlDLFdBQUssR0FBTCxLQUFLLENBQVE7UUFFM0MsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLEdBQWMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxH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b3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VWaWV3IGZyb20gXCIuL0RkekJhc2VWaWV3XCI7XHJcbmltcG9ydCBEZHpQYXRoSGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkelBva2VyR3JvdXAgZnJvbSBcIi4vRGR6UG9rZXJHcm91cFwiO1xyXG5pbXBvcnQgRGR6R2FtZUNvbnN0LCB7IERkekdhbWVBY3RTdGF0ZSB9IGZyb20gXCIuLi9kYXRhL0RkekdhbWVDb25zdFwiO1xyXG5pbXBvcnQgRGR6Um9sZVZpZXcsIHsgRGR6Um9sZURlZmluZSB9IGZyb20gXCIuL0RkelJvbGVWaWV3XCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuLyoqXHJcbiAqIOeOqeWutuS/oeaBr+WMheaLrOmjmOWtl+etiVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UGxheWVyVmlldyBleHRlbmRzIERkekJhc2VWaWV3e1xyXG4gICAgcHJvdGVjdGVkIGluZm9Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGNvaW5MYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJvdGVjdGVkIG5hbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJvdGVjdGVkIGhlYWRJbWc6Y2MuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIHZpcEt1YW5nOmNjLlNwcml0ZTtcclxuICAgIHByb3RlY3RlZCByZXdhcmRSb290OiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIHJld2FyZExibDogY2MuTGFiZWw7XHJcbiAgICBwcm90ZWN0ZWQgZW5kUG9zOiBjYy5WZWMzO1xyXG4gICAgcHJvdGVjdGVkIHdpbkZvbnQ6IGNjLkZvbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbG9zZUZvbnQ6IGNjLkZvbnQ7XHJcbiAgICBwcm90ZWN0ZWQgd2FyblNpZ246IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgZHpTaWduOiBzcC5Ta2VsZXRvbjtcclxuICAgIHByb3RlY3RlZCBzdGF0ZUljb25TcDogY2MuU3ByaXRlO1xyXG4gICAgcHVibGljIHBva2VyR3JvdXA6IERkelBva2VyR3JvdXA7XHJcbiAgICBwcm90ZWN0ZWQgZHpJY29uUG9zOiBjYy5WZWMyO1xyXG4gICAgcHJvdGVjdGVkIGNsb2NrUm9vdDogY2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBhdXRvU2lnbjogY2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBtdWx0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCByb2xlVmlldzogRGR6Um9sZVZpZXc7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHVibGljIG5TZWF0OiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuaW5mb05vZGUgPSB0aGlzLmdldENoaWxkKCdpbmZvJyk7XHJcbiAgICAgICAgdGhpcy5pbmZvTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvaW5MYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ2luZm8vY29pbkxibCcsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ2luZm8vbmFtZUxibCcsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmhlYWRJbWcgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiaW5mby9tYXNrL2hlYWRJbWdcIixjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMudmlwS3VhbmcgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiaW5mby9oZWFkYm94XCIsY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnJld2FyZFJvb3QgPSB0aGlzLmdldENoaWxkKCdyZXdhcmRSb290Jyk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ3Jld2FyZFJvb3QvcmV3YXJkTGJsJywgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuZW5kUG9zID0gdGhpcy5yZXdhcmRSb290LnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMud2luRm9udCA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0R2FtZUJ1bmRsZVJlcyhEZHpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArICdhdGxhcy9mcmFtZS9mb250L251bV9qaWEnLCBjYy5Gb250KTtcclxuICAgICAgICB0aGlzLmxvc2VGb250ID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRHYW1lQnVuZGxlUmVzKERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgJ2F0bGFzL2ZyYW1lL2ZvbnQvbnVtX2Z1JywgY2MuRm9udCk7XHJcbiAgICAgICAgdGhpcy53YXJuU2lnbiA9IHRoaXMuZ2V0Q2hpbGQoJ3dhcm4nKTtcclxuICAgICAgICB0aGlzLndhcm5TaWduLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZHpTaWduID0gPHNwLlNrZWxldG9uPnRoaXMuZ2V0Q29tcG9uZW50KCdkelNpZ24nLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5kelNpZ24ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXRlSWNvblNwID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudCgnc3RhdGUnLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuY2xvY2tSb290ID0gdGhpcy5nZXRDaGlsZCgnY2xvY2tSb290Jyk7XHJcbiAgICAgICAgdGhpcy5hdXRvU2lnbiA9IHRoaXMuZ2V0Q2hpbGQoJ2F1dG8nKTtcclxuICAgICAgICB0aGlzLmF1dG9TaWduLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubXVsdE5vZGUgPSB0aGlzLmdldENoaWxkKCdtdWx0Jyk7XHJcbiAgICAgICAgdGhpcy5tdWx0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdFBva2VyR3JvdXAobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5wb2tlckdyb3VwID0gbmV3IERkelBva2VyR3JvdXAobm9kZSwgdGhpcy5uU2VhdCk7XHJcbiAgICAgICAgdGhpcy5wb2tlckdyb3VwLnJlc2V0R3JvdXBQb2tlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQbGF5ZXJJbmZvKG5hbWU6IHN0cmluZyA9IHRoaXMuRGVmaW5lLkRlZmF1bHROYW1lU3RyKXtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGxheWVyUG9pbnQocG9pbnQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5jb2luTGJsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKHBvaW50LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGxheWVySGVhZEltZyhzdHI6IHN0cmluZyl7XHJcbiAgICAgICAgaWYodGhpcy5oZWFkSW1nKXtcclxuICAgICAgICAgICAgLy8gdGhpcy5oZWFkSW1nLm5vZGUuYWN0aXZlID0gIURkekRyaXZlci5pbnN0YW5jZS5za2luRGVmaW5lLnVzZVJvbGU7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZEltZy5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93KGRhdGEpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0UGxheWVySW5mbyhkYXRhLmFyZWEpO1xyXG4gICAgICAgIHRoaXMuc2V0UGxheWVyUG9pbnQoZGF0YS5wb2ludCk7XHJcbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJIZWFkSW1nKGRhdGEuaGVhZGltZyk7XHJcbiAgICAgICAgaWYodGhpcy52aXBLdWFuZyl7XHJcbiAgICAgICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5Mb2FkVmlwSGVhZEt1YW5nKHRoaXMudmlwS3VhbmcsZGF0YS5oZWFka3VhbmcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5TZWF0ICE9PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmluZm9Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5Db250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEdhbWVTdGFydCkpeyAgICAgLy8g5ri45oiP5pyq5byA5aeL5omN5pi+56S66KeS6Imy5Li65Yac5rCRIOW8gOWni+S4jeWkhOeQhlxyXG4gICAgICAgICAgICB0aGlzLnNob3dSb2xlKHRydWUsIERkelJvbGVEZWZpbmUuRkZyYW1lciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gJyc7XHJcbiAgICAgICAgdGhpcy5jb2luTGJsLnN0cmluZyA9ICcnO1xyXG4gICAgICAgIHRoaXMuc2hvd1JvbGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldER6KGlzRHo6IGJvb2xlYW4sIGlzQW5pbSA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmR6U2lnbi5ub2RlLmFjdGl2ZSA9IGlzRHo7XHJcbiAgICAgICAgaWYgKGlzRHope1xyXG4gICAgICAgICAgICBpZiAoaXNBbmltKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHpTaWduLnNldEFuaW1hdGlvbigwLCAnaWRsZScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHpTaWduLmFkZEFuaW1hdGlvbigwLCBcImlkbGUyXCIsIHRydWUsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Um9sZSh0cnVlLCBEZHpSb2xlRGVmaW5lLkZMYW5kb3JkLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kelNpZ24uc2V0QW5pbWF0aW9uKDAsICdpZGxlMicsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Um9sZSh0cnVlLCBEZHpSb2xlRGVmaW5lLkZMYW5kb3JkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBsYXllclJvbGUobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgaWYgKG5vZGUgJiYgY2MuaXNWYWxpZChub2RlKSl7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZVZpZXcgPSBuZXcgRGR6Um9sZVZpZXcobm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMucm9sZVZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65Lq654mp6KeS6ImyXHJcbiAgICAgKiBAcGFyYW0gaXNTaG93IFxyXG4gICAgICogQHBhcmFtIG5Sb2xlIDHvvJrlnLDkuLsgMu+8muWGnOawkVxyXG4gICAgICogQHBhcmFtIGlzQW5pbSDmmK/lkKbliIfmjaLliqjnlLtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dSb2xlKGlzU2hvdzogYm9vbGVhbiwgblJvbGUgPSAxLCBpc0FuaW0gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5yb2xlVmlldy5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYoaXNTaG93KXtcclxuICAgICAgICAgICAgaWYgKG5Sb2xlID09IERkelJvbGVEZWZpbmUuRkxhbmRvcmQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQW5pbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb2xlVmlldy5zd2l0Y2hSb2xlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9sZVZpZXcuc2hvd1JvbGUodHJ1ZSwgRGR6Um9sZURlZmluZS5GTGFuZG9yZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sZVZpZXcuc2hvd1JvbGUodHJ1ZSwgRGR6Um9sZURlZmluZS5GRnJhbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1Jld2FyZExibChudW06IG51bWJlciwgaXNXaW46IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMucmV3YXJkUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmV3YXJkTGJsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKG51bSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRMYmwuZm9udCA9IGlzV2luICYmIHRoaXMud2luRm9udCB8fCB0aGlzLmxvc2VGb250O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmV3YXJkUm9vdC5zZXRQb3NpdGlvbihjYy52Mih0aGlzLmVuZFBvcy54LCB0aGlzLmVuZFBvcy55IC0gMzApKTtcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLnJld2FyZFJvb3QpO1xyXG4gICAgICAgIHR3ZWVuLnRvKHRoaXMuRGVmaW5lLkZsb2F0U2NvcmVUaW1lIC0gMC40LCB7cG9zaXRpb246IHRoaXMuZW5kUG9zfSwgY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpXHJcbiAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnJvbGVWaWV3LnBsYXlSb2xlU2V0dGxlRWZmZWN0KGlzV2luKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1BsYXllclRoaW5rRWZmZWN0KCl7XHJcbiAgICAgICAgdGhpcy5yb2xlVmlldy5wbGF5Um9sZVRoaW5rRWZmZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dQbGF5ZXJOb3JtYWxFZmZlY3QoKXtcclxuICAgICAgICB0aGlzLnJvbGVWaWV3LnBsYXlSb2xlTm9ybWFsRWZmZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dQbGF5ZXJQbGF5RWZmZWN0KGlzQm9tYjogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5yb2xlVmlldy5wbGF5Um9sZU91dFBva2Vyc0VmZmVjdChpc0JvbWIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdGF0ZShpc1Nob3c6IGJvb2xlYW4sIHN0YWdlPzogbnVtYmVyLCBudW0/OiBudW1iZXIpe1xyXG4gICAgICAgIGlmIChpc1Nob3cpe1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSWNvblNwLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUoKTtcclxuICAgICAgICAgICAgc3dpdGNoIChzdGFnZSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERkekdhbWVBY3RTdGF0ZS5Sb2I6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUljb25TcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkR2FtZUJ1bmRsZUF1dG9BdGxhcyh0aGlzLnN0YXRlSWNvblNwLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgJ2F0bGFzL2ZyYW1lL2F0bGFzX2ZyYW1lJywgRGR6R2FtZUNvbnN0LkdhbWVSb2JTdHJDZmdbbnVtXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIERkekdhbWVBY3RTdGF0ZS5NdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVJY29uU3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEdhbWVCdW5kbGVBdXRvQXRsYXModGhpcy5zdGF0ZUljb25TcC5ub2RlLmNoaWxkcmVuWzBdLmdldENvbXBvbmVudChjYy5TcHJpdGUpLCBEZHpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArICdhdGxhcy9mcmFtZS9hdGxhc19mcmFtZScsIERkekdhbWVDb25zdC5HYW1lTXVsdFN0ckNmZ1tudW1dKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgRGR6R2FtZUFjdFN0YXRlLlBsYXk6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUljb25TcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkR2FtZUJ1bmRsZUF1dG9BdGxhcyh0aGlzLnN0YXRlSWNvblNwLm5vZGUuY2hpbGRyZW5bMF0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSksIERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgJ2F0bGFzL2ZyYW1lL2F0bGFzX2ZyYW1lJywgRGR6R2FtZUNvbnN0LkdhbWVQbGF5U3RyQ2ZnW251bV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlSWNvblNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZUljb25TcC5ub2RlLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGxheWVyTGVmdFBva2Vycyhpc1Nob3c6IGJvb2xlYW4sIG51bT86IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5wb2tlckdyb3VwLnNldFJlc3RDb3VudFNob3coaXNTaG93LCBudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UGxheVBva2Vycyhpc1Nob3c6IGJvb2xlYW4sIHBva2VyQXJyOiBudW1iZXJbXSA9IFtdLCBpc0FuaW06IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMucG9rZXJHcm91cC5zaG93UGxheVBva2Vycyhpc1Nob3csIHBva2VyQXJyKTtcclxuICAgICAgICBpZiAoaXNTaG93ICYmIHBva2VyQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJHcm91cC5wbGF5T3V0UG9rZXJzQW5pbShpc0FuaW0sIHBva2VyQXJyKTtcclxuICAgICAgICAgICAgfSwgdGhpcy5EZWZpbmUuUG9rZXJQbGF5RGVsYXlUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dXYXJuU2lnbihpc1Nob3c6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmICh0aGlzLndhcm5TaWduLmFjdGl2ZSA9PSBpc1Nob3cpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLndhcm5TaWduLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0F1dG9TaWduKGlzU2hvdzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5hdXRvU2lnbi5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dNdWx0U2lnbihpc1Nob3c6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubXVsdE5vZGUuYWN0aXZlID0gaXNTaG93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJDbG9ja1dvcmxkUG9zKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5jbG9ja1Jvb3QucG9zaXRpb24pO1xyXG4gICAgfVxyXG4gXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2FyblNpZ24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvU2lnbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldER6KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNob3dNdWx0U2lnbihmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wb2tlckdyb3VwLnJlc2V0R3JvdXBQb2tlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpe1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcbn0iXX0=