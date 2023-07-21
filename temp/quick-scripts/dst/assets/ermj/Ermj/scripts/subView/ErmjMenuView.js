
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjMenuView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '50eeaih/QpGRqCR1FOSWiZ0', 'ErmjMenuView');
// ermj/Ermj/scripts/subView/ErmjMenuView.ts

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
var ErmjMenuView = /** @class */ (function (_super) {
    __extends(ErmjMenuView, _super);
    function ErmjMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    ErmjMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        ErmjGameConst_1.default.addCommonClick(this.bgNode, "", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        ErmjGameConst_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuRawPos = this.menuContainer.position;
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/settingBtn", this.onSettingBtnClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/ruleBtn", this.onRuleBtnClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/exitBtn", this.onExitBtnClick, this);
    };
    ErmjMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    ErmjMenuView.prototype.menuBtnClick = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (this.isPressed) {
            this.isPressed = false;
            this.pressUpBtn.active = false;
            this.pressDownBtn.active = true;
            this.bgNode.active = false;
            this.menuContainer.stopAllActions();
            var endPos = cc.v2(this.menuRawPos.x, this.menuRawPos.y + this.menuContainer.height);
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, endPos).easing(cc.easeBackIn()));
            }
            else {
                this.menuContainer.setPosition(endPos);
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
                this.menuContainer.runAction(cc.moveTo(0.2, cc.v2(this.menuRawPos.x, this.menuRawPos.y)).easing(cc.easeBackOut()));
            }
            else {
                this.menuContainer.setPosition(cc.v2(this.menuRawPos.x, this.menuRawPos.y));
            }
        }
    };
    ErmjMenuView.prototype.onMenuBtnClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick();
    };
    ErmjMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        ErmjDriver_1.default.instance.openSettingPop();
    };
    ErmjMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        ErmjDriver_1.default.instance.openRulePop();
    };
    ErmjMenuView.prototype.onExitBtnClick = function () {
        var _this = this;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick(false);
        var inGame = this.Context.get(this.Define.FieldGameStart);
        if (inGame) {
            Global.UI.showYesNoBox('退出后将自动变为托管出牌，且在牌局结束前无法进入其他游戏。确定退出吗？', function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                ErmjDriver_1.default.instance.leaveGame();
            });
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            ErmjDriver_1.default.instance.leaveGame();
            Global.UI.close("WndMessageBox");
        }
    };
    ErmjMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return ErmjMenuView;
}(ErmjBaseView_1.default));
exports.default = ErmjMenuView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtak1lbnVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQyx5REFBd0Q7QUFDeEQsdURBQWtEO0FBQ2xELDRDQUF1QztBQUV2QztJQUEwQyxnQ0FBWTtJQVFsRCxzQkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQVRPLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFRL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQix1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRCx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FB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RUFBRSxDQUFDLENBQUM7Z0JBQ3pELG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFDRztZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekQsb0JBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRU0sa0NBQVcsR0FBbEI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUM7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0E3R0EsQUE2R0MsQ0E3R3lDLHNCQUFZLEdBNkdyRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4vRXJtakJhc2VWaWV3XCI7XHJcbmltcG9ydCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpHYW1lQ29uc3QgZnJvbSBcIi4uL2RhdGEvRXJtakdhbWVDb25zdFwiO1xyXG5pbXBvcnQgRXJtakRyaXZlciBmcm9tIFwiLi4vRXJtakRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtak1lbnVWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBiZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGlzUHJlc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwcmVzc0Rvd25CdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHByZXNzVXBCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1lbnVDb250YWluZXI6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1lbnVSYXdQb3M6IGNjLlZlYzM7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5iZ05vZGUgPSB0aGlzLmdldENoaWxkKCdtYXNrQmcnKTtcclxuICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMuYmdOb2RlLCBcIlwiLCB0aGlzLm9uQmdUb3VjaCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5wcmVzc0Rvd25CdG4gPSB0aGlzLmdldENoaWxkKFwibWVudUJ0bi9zcHJpdGVfZG93blwiKTtcclxuICAgICAgICB0aGlzLnByZXNzVXBCdG4gPSB0aGlzLmdldENoaWxkKFwibWVudUJ0bi9zcHJpdGVfdXBcIik7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWVudUJ0blwiLCB0aGlzLm9uTWVudUJ0bkNsaWNrLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyID0gdGhpcy5nZXRDaGlsZChcIm1hc2tOb2RlL21lbnVDb250YWluZXJcIik7XHJcbiAgICAgICAgdGhpcy5tZW51UmF3UG9zID0gdGhpcy5tZW51Q29udGFpbmVyLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuc2V0UG9zaXRpb24oMCwgdGhpcy5tZW51Q29udGFpbmVyLmhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza05vZGUvbWVudUNvbnRhaW5lci9zZXR0aW5nQnRuXCIsIHRoaXMub25TZXR0aW5nQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tOb2RlL21lbnVDb250YWluZXIvcnVsZUJ0blwiLCB0aGlzLm9uUnVsZUJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJtYXNrTm9kZS9tZW51Q29udGFpbmVyL2V4aXRCdG5cIiwgdGhpcy5vbkV4aXRCdG5DbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJnVG91Y2goKXtcclxuICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1lbnVCdG5DbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbWVudUJ0bkNsaWNrKGlzVHdlZW46IGJvb2xlYW4gPSB0cnVlKXtcclxuICAgICAgICBpZiAodGhpcy5pc1ByZXNzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc1VwQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzRG93bkJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjIodGhpcy5tZW51UmF3UG9zLngsIHRoaXMubWVudVJhd1Bvcy55ICsgdGhpcy5tZW51Q29udGFpbmVyLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGlmIChpc1R3ZWVuKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMiwgZW5kUG9zKS5lYXNpbmcoY2MuZWFzZUJhY2tJbigpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5zZXRQb3NpdGlvbihlbmRQb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzVXBCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcmVzc0Rvd25CdG4uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBpZiAoaXNUd2Vlbil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDb250YWluZXIucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIGNjLnYyKHRoaXMubWVudVJhd1Bvcy54LCB0aGlzLm1lbnVSYXdQb3MueSkpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5zZXRQb3NpdGlvbihjYy52Mih0aGlzLm1lbnVSYXdQb3MueCwgdGhpcy5tZW51UmF3UG9zLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWVudUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWVudUJ0bkNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNldHRpbmdCdG5DbGljaygpe1xyXG4gICAgICAgIHRoaXMubWVudUJ0bkNsaWNrKCk7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2Uub3BlblNldHRpbmdQb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUnVsZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soKTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5vcGVuUnVsZVBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGl0QnRuQ2xpY2soKXtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soZmFsc2UpO1xyXG5cclxuICAgICAgICBsZXQgaW5HYW1lID0gdGhpcy5Db250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEdhbWVTdGFydCk7XHJcbiAgICAgICAgaWYoaW5HYW1lKXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dZZXNOb0JveCgn6YCA5Ye65ZCO5bCG6Ieq5Yqo5Y+Y5Li65omY566h5Ye654mM77yM5LiU5Zyo54mM5bGA57uT5p2f5YmN5peg5rOV6L+b5YWl5YW25LuW5ri45oiP44CC56Gu5a6a6YCA5Ye65ZCX77yfJywgKCk9PntcclxuICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICBFcm1qRHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRMZWF2ZSwgeyBcIklzQ2xvc2VcIjogMSB9KTtcclxuICAgICAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5sZWF2ZUdhbWUoKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmNsb3NlKFwiV25kTWVzc2FnZUJveFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1ByZXNzZWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCdG5DbGljayhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19