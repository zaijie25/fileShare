
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzMenuView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd26eaArng1KTra2acmIr/HI', 'BbwzMenuView');
// bbwz/Bbwz/scripts/subview/BbwzMenuView.ts

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
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzData_1 = require("../data/BbwzData");
var BbwzMenuView = /** @class */ (function (_super) {
    __extends(BbwzMenuView, _super);
    function BbwzMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    BbwzMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        BbwzConstDefine_1.default.addCommonClick(this.node, "maskBg", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        BbwzConstDefine_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "settingBtn", this.onSettingBtnClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "ruleBtn", this.onRuleBtnClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "exitBtn", this.onExitBtnClick, this);
    };
    BbwzMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    BbwzMenuView.prototype.menuBtnClick = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (this.isPressed) {
            this.isPressed = false;
            this.pressUpBtn.active = false;
            this.pressDownBtn.active = true;
            this.bgNode.active = false;
            this.menuContainer.stopAllActions();
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, cc.v2(0, this.menuContainer.height)).easing(cc.easeBackIn()));
            }
            else {
                this.menuContainer.setPosition(cc.v2(0, this.menuContainer.height));
            }
        }
        else {
            this.isPressed = true;
            this.pressUpBtn.active = true;
            this.pressDownBtn.active = false;
            this.menuContainer.active = true;
            this.bgNode.active = true;
            this.menuContainer.stopAllActions();
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, cc.Vec2.ZERO).easing(cc.easeBackOut()));
            }
            else {
                this.menuContainer.setPosition(cc.Vec2.ZERO);
            }
        }
    };
    BbwzMenuView.prototype.onMenuBtnClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        this.menuBtnClick();
    };
    BbwzMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        BbwzConstDefine_1.default.playBtnSound();
        BbwzDriver_1.default.instance.settingPop.node.active = true;
    };
    BbwzMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        BbwzConstDefine_1.default.playBtnSound();
        BbwzDriver_1.default.instance.rulePop.node.active = true;
    };
    BbwzMenuView.prototype.onExitBtnClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        this.menuBtnClick(false);
        if (BbwzData_1.default.instance.gameState >= BbwzConstDefine_1.BbwzGameState.Reward) {
            //当前局已经开奖
            BbwzDriver_1.default.instance.reqLeaveGame();
            return;
        }
        else {
            //判断自己是否已经下注
            var myTotalBet = BbwzData_1.default.instance.getMyTotalBet();
            if (myTotalBet <= 0) {
                //自己没下注，可以直接退出
                BbwzDriver_1.default.instance.reqLeaveGame();
                return;
            }
        }
        var text = "您已开始游戏，退出游戏会自动托管，不影响金币结算，确定退出吗？";
        BbwzDriver_1.default.instance.noticePop.node.active = true;
        BbwzDriver_1.default.instance.noticePop.setCustomMessageBox(text, 0, function () {
            BbwzDriver_1.default.instance.reqLeaveGame();
        });
    };
    BbwzMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return BbwzMenuView;
}(BbwzBaseView_1.default));
exports.default = BbwzMenuView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3ek1lbnVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQywyREFBeUU7QUFDekUsNENBQXVDO0FBQ3ZDLDZDQUF3QztBQUV4QztJQUEwQyxnQ0FBWTtJQU9sRCxzQkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQVJPLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFPL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWhGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCx5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0YseUJBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6Rix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFTyxnQ0FBUyxHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLFVBQXFCLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsY0FBdUI7UUFDeEMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRTNCLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDcEMsSUFBSSxPQUFPLEVBQUM7Z0JBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzdHO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2RTtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBRWpDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQyxJQUFJLE9BQU8sRUFBQztnQkFDUixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZGO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEQ7U0FDSjtJQUNMLENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLHlCQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyx3Q0FBaUIsR0FBekI7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIseUJBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixvQkFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdEQsQ0FBQztJQUVPLHFDQUFjLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLHlCQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0Isb0JBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ25ELENBQUM7SUFFTyxxQ0FBYyxHQUF0QjtRQUNJLHlCQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixJQUFJLGtCQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSwrQkFBYSxDQUFDLE1BQU0sRUFBRTtZQUNyRCxTQUFTO1lBQ1Qsb0JBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbkMsT0FBTztTQUNWO2FBQU07WUFDSCxZQUFZO1lBQ1osSUFBSSxVQUFVLEdBQVcsa0JBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDM0QsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUNqQixjQUFjO2dCQUNkLG9CQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNuQyxPQUFPO2FBQ1Y7U0FDSjtRQUNELElBQUksSUFBSSxHQUFHLGlDQUFpQyxDQUFDO1FBQzdDLG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNqRCxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUN2RCxvQkFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxrQ0FBVyxHQUFsQjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQS9HQSxBQStHQyxDQS9HeUMsc0JBQVksR0ErR3JEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSwgeyBCYnd6R2FtZVN0YXRlIH0gZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6RHJpdmVyIGZyb20gXCIuLi9CYnd6RHJpdmVyXCI7XHJcbmltcG9ydCBCYnd6RGF0YSBmcm9tIFwiLi4vZGF0YS9CYnd6RGF0YVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ek1lbnVWaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBiZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGlzUHJlc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwcmVzc0Rvd25CdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHByZXNzVXBCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1lbnVDb250YWluZXI6IGNjLk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5iZ05vZGUgPSB0aGlzLmdldENoaWxkKCdtYXNrQmcnKTtcclxuICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tCZ1wiLCB0aGlzLm9uQmdUb3VjaCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5wcmVzc0Rvd25CdG4gPSB0aGlzLmdldENoaWxkKFwibWVudUJ0bi9zcHJpdGVfZG93blwiKTtcclxuICAgICAgICB0aGlzLnByZXNzVXBCdG4gPSB0aGlzLmdldENoaWxkKFwibWVudUJ0bi9zcHJpdGVfdXBcIik7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJtZW51QnRuXCIsIHRoaXMub25NZW51QnRuQ2xpY2ssIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIgPSB0aGlzLmdldENoaWxkKFwibWFza05vZGUvbWVudUNvbnRhaW5lclwiKTtcclxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnNldFBvc2l0aW9uKDAsIHRoaXMubWVudUNvbnRhaW5lci5oZWlnaHQpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm1lbnVDb250YWluZXIsIFwic2V0dGluZ0J0blwiLCB0aGlzLm9uU2V0dGluZ0J0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5tZW51Q29udGFpbmVyLCBcInJ1bGVCdG5cIiwgdGhpcy5vblJ1bGVCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLmFkZENvbW1vbkNsaWNrKHRoaXMubWVudUNvbnRhaW5lciwgXCJleGl0QnRuXCIsIHRoaXMub25FeGl0QnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CZ1RvdWNoKCl7XHJcbiAgICAgICAgdGhpcy5iZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lbnVCdG5DbGljayhpc1R3ZWVuOiBib29sZWFuID0gdHJ1ZSl7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NVcEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc0Rvd25CdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgaWYgKGlzVHdlZW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCBjYy52MigwLCB0aGlzLm1lbnVDb250YWluZXIuaGVpZ2h0KSkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuc2V0UG9zaXRpb24oY2MudjIoMCwgdGhpcy5tZW51Q29udGFpbmVyLmhlaWdodCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzVXBCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc0Rvd25CdG4uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBpZiAoaXNUd2Vlbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIGNjLlZlYzIuWkVSTykuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnNldFBvc2l0aW9uKGNjLlZlYzIuWkVSTyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lbnVCdG5DbGljaygpe1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLm1lbnVCdG5DbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TZXR0aW5nQnRuQ2xpY2soKXtcclxuICAgICAgICB0aGlzLm1lbnVCdG5DbGljaygpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLnNldHRpbmdQb3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SdWxlQnRuQ2xpY2soKXtcclxuICAgICAgICB0aGlzLm1lbnVCdG5DbGljaygpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLnJ1bGVQb3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGl0QnRuQ2xpY2soKXtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soZmFsc2UpO1xyXG5cclxuICAgICAgICBpZiAoQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVN0YXRlID49IEJid3pHYW1lU3RhdGUuUmV3YXJkKSB7XHJcbiAgICAgICAgICAgIC8v5b2T5YmN5bGA5bey57uP5byA5aWWXHJcbiAgICAgICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UucmVxTGVhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+WIpOaWreiHquW3seaYr+WQpuW3sue7j+S4i+azqFxyXG4gICAgICAgICAgICBsZXQgbXlUb3RhbEJldDogbnVtYmVyID0gQmJ3ekRhdGEuaW5zdGFuY2UuZ2V0TXlUb3RhbEJldCgpO1xyXG4gICAgICAgICAgICBpZiAobXlUb3RhbEJldCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+iHquW3seayoeS4i+azqO+8jOWPr+S7peebtOaOpemAgOWHulxyXG4gICAgICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5yZXFMZWF2ZUdhbWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGV4dCA9IFwi5oKo5bey5byA5aeL5ri45oiP77yM6YCA5Ye65ri45oiP5Lya6Ieq5Yqo5omY566h77yM5LiN5b2x5ZON6YeR5biB57uT566X77yM56Gu5a6a6YCA5Ye65ZCX77yfXCI7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5ub3RpY2VQb3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2Uubm90aWNlUG9wLnNldEN1c3RvbU1lc3NhZ2VCb3godGV4dCwgMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBCYnd6RHJpdmVyLmluc3RhbmNlLnJlcUxlYXZlR2FtZSgpOyAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNQcmVzc2VkKXtcclxuICAgICAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==