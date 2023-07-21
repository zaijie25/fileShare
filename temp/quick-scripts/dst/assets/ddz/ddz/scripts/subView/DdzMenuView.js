
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzMenuView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a0dbcpZuBNLw7dIcKUoSYcf', 'DdzMenuView');
// ddz/ddz/scripts/subView/DdzMenuView.ts

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
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzMenuView = /** @class */ (function (_super) {
    __extends(DdzMenuView, _super);
    function DdzMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    DdzMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        DdzGameConst_1.default.addCommonClick(this.bgNode, "", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressDownBtn.active = true;
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        this.pressUpBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuRawPos = this.menuContainer.position;
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/settingBtn", this.onSettingBtnClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/ruleBtn", this.onRuleBtnClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/exitBtn", this.onExitBtnClick, this);
    };
    DdzMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    DdzMenuView.prototype.menuBtnClick = function (isTween) {
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
    DdzMenuView.prototype.onMenuBtnClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick();
    };
    DdzMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        DdzDriver_1.default.instance.openSettingPop();
    };
    DdzMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        DdzDriver_1.default.instance.openRulePop();
    };
    DdzMenuView.prototype.onExitBtnClick = function () {
        var _this = this;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick(false);
        var inGame = this.Context.get(this.Define.FieldGameStart);
        if (inGame) {
            Global.UI.showYesNoBox('退出后将自动变为托管出牌，且在牌局结束前无法进入其他游戏。确定退出吗？', function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                DdzDriver_1.default.instance.leaveGame();
            });
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            DdzDriver_1.default.instance.leaveGame();
            Global.UI.close("WndMessageBox");
        }
    };
    DdzMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return DdzMenuView;
}(DdzBaseView_1.default));
exports.default = DdzMenuView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkek1lbnVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4Qyx1REFBcUU7QUFDckUsMENBQXFDO0FBQ3JDLHFEQUFnRDtBQUVoRDtJQUF5QywrQkFBVztJQVFoRCxxQkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQVRPLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFRL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixzQkFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLHNCQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLGFB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QUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxJQUFHLE1BQU0sRUFBQztZQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLHFDQUFxQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RCxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQ0c7WUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELG1CQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVNLGlDQUFXLEdBQWxCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFDTCxrQkFBQztBQUFELENBL0dBLEFBK0dDLENBL0d3QyxxQkFBVyxHQStHbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6QmFzZVZpZXcgZnJvbSBcIi4vRGR6QmFzZVZpZXdcIjtcclxuaW1wb3J0IERkelBhdGhIZWxwZXIsIHsgRGR6QXVkaW9Db25zdCB9IGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcbmltcG9ydCBEZHpHYW1lQ29uc3QgZnJvbSBcIi4uL2RhdGEvRGR6R2FtZUNvbnN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpNZW51VmlldyBleHRlbmRzIERkekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBiZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGlzUHJlc3NlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwcmVzc0Rvd25CdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHByZXNzVXBCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1lbnVDb250YWluZXI6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG1lbnVSYXdQb3M6IGNjLlZlYzM7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5iZ05vZGUgPSB0aGlzLmdldENoaWxkKCdtYXNrQmcnKTtcclxuICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5iZ05vZGUsIFwiXCIsIHRoaXMub25CZ1RvdWNoLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICB0aGlzLnByZXNzRG93bkJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJtZW51QnRuL3Nwcml0ZV9kb3duXCIpO1xyXG4gICAgICAgIHRoaXMucHJlc3NEb3duQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wcmVzc1VwQnRuID0gdGhpcy5nZXRDaGlsZChcIm1lbnVCdG4vc3ByaXRlX3VwXCIpO1xyXG4gICAgICAgIHRoaXMucHJlc3NVcEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1lbnVCdG5cIiwgdGhpcy5vbk1lbnVCdG5DbGljaywgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IHRoaXMuZ2V0Q2hpbGQoXCJtYXNrTm9kZS9tZW51Q29udGFpbmVyXCIpO1xyXG4gICAgICAgIHRoaXMubWVudVJhd1BvcyA9IHRoaXMubWVudUNvbnRhaW5lci5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnNldFBvc2l0aW9uKDAsIHRoaXMubWVudUNvbnRhaW5lci5oZWlnaHQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza05vZGUvbWVudUNvbnRhaW5lci9zZXR0aW5nQnRuXCIsIHRoaXMub25TZXR0aW5nQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza05vZGUvbWVudUNvbnRhaW5lci9ydWxlQnRuXCIsIHRoaXMub25SdWxlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza05vZGUvbWVudUNvbnRhaW5lci9leGl0QnRuXCIsIHRoaXMub25FeGl0QnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CZ1RvdWNoKCl7XHJcbiAgICAgICAgdGhpcy5iZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1lbnVCdG5DbGljayhpc1R3ZWVuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUHJlc3NlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzVXBCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NEb3duQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSBjYy52Mih0aGlzLm1lbnVSYXdQb3MueCwgdGhpcy5tZW51UmF3UG9zLnkgKyB0aGlzLm1lbnVDb250YWluZXIuaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKGlzVHdlZW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCBlbmRQb3MpLmVhc2luZyhjYy5lYXNlQmFja0luKCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnNldFBvc2l0aW9uKGVuZFBvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlzUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJlc3NVcEJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByZXNzRG93bkJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmJnTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGlmIChpc1R3ZWVuKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMiwgY2MudjIodGhpcy5tZW51UmF3UG9zLngsIHRoaXMubWVudVJhd1Bvcy55KSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnNldFBvc2l0aW9uKGNjLnYyKHRoaXMubWVudVJhd1Bvcy54LCB0aGlzLm1lbnVSYXdQb3MueSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZW51QnRuQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWVudUJ0bkNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNldHRpbmdCdG5DbGljaygpe1xyXG4gICAgICAgIHRoaXMubWVudUJ0bkNsaWNrKCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2Uub3BlblNldHRpbmdQb3AoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUnVsZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soKTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5vcGVuUnVsZVBvcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25FeGl0QnRuQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMubWVudUJ0bkNsaWNrKGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW5HYW1lID0gdGhpcy5Db250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEdhbWVTdGFydCk7XHJcbiAgICAgICAgaWYoaW5HYW1lKXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dZZXNOb0JveCgn6YCA5Ye65ZCO5bCG6Ieq5Yqo5Y+Y5Li65omY566h5Ye654mM77yM5LiU5Zyo54mM5bGA57uT5p2f5YmN5peg5rOV6L+b5YWl5YW25LuW5ri45oiP44CC56Gu5a6a6YCA5Ye65ZCX77yfJywgKCk9PntcclxuICAgICAgICAgICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubGVhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZExlYXZlLCB7IFwiSXNDbG9zZVwiOiAxIH0pO1xyXG4gICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubGVhdmVHYW1lKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5jbG9zZShcIlduZE1lc3NhZ2VCb3hcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXNQcmVzc2VkKXtcclxuICAgICAgICAgICAgdGhpcy5tZW51QnRuQ2xpY2soZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==