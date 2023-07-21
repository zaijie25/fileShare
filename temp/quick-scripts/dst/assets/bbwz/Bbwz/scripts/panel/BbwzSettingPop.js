
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzSettingPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f451fHW3VPr6dvtWoUYHL2', 'BbwzSettingPop');
// bbwz/Bbwz/scripts/panel/BbwzSettingPop.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("../subview/BbwzBaseView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 弹窗 设置界面
 */
var BbwzSettingPop = /** @class */ (function (_super) {
    __extends(BbwzSettingPop, _super);
    function BbwzSettingPop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzSettingPop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
        this.versionLbl = cc.find('content/label_version', this.node).getComponent(cc.Label);
        var gameInfo = Global.GameData.getGameInfo(BbwzConstDefine_1.default.GAME_ID);
        if (gameInfo)
            this.versionLbl.string = "\u7248\u672C\u53F7:V" + gameInfo.native_version;
        this.initToggle();
    };
    BbwzSettingPop.prototype.initToggle = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        var musicToggle = new SetToggle(cc.find("musicToggle", this.contentNode), this.onMusicToggle, this);
        var soundToggle = new SetToggle(cc.find("soundToggle", this.contentNode), this.onAudioToggle, this);
        musicToggle.isChecked = musicEnable;
        soundToggle.isChecked = soundEnable;
    };
    BbwzSettingPop.prototype.onEnable = function () {
        this.animComp.doPopupOpenAnim();
    };
    BbwzSettingPop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzSettingPop.prototype.onMusicToggle = function (toggle) {
        BbwzConstDefine_1.default.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setMusicEnable(state);
    };
    BbwzSettingPop.prototype.onAudioToggle = function (toggle) {
        BbwzConstDefine_1.default.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setSoundEnable(state);
    };
    BbwzSettingPop = __decorate([
        ccclass
    ], BbwzSettingPop);
    return BbwzSettingPop;
}(cc.Component));
exports.default = BbwzSettingPop;
var SetToggle = /** @class */ (function (_super) {
    __extends(SetToggle, _super);
    function SetToggle(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.setNode(node);
        return _this;
    }
    SetToggle.prototype.initView = function () {
        this.normalNode = this.getChild("close");
        this.checkNode = this.getChild("open");
        BbwzConstDefine_1.default.addCommonClick(this.node, "", this.onToggleClick, this);
    };
    SetToggle.prototype.onToggleClick = function () {
        this.isChecked = !this._isCheck;
        if (this.callback && this.target) {
            this.callback.call(this.target, this);
        }
    };
    Object.defineProperty(SetToggle.prototype, "isChecked", {
        get: function () {
            return this._isCheck;
        },
        set: function (flag) {
            if (flag === this._isCheck)
                return;
            this._isCheck = flag;
            this.updateStyle();
        },
        enumerable: false,
        configurable: true
    });
    SetToggle.prototype.updateStyle = function () {
        this.normalNode.active = !this._isCheck;
        this.checkNode.active = !!this._isCheck;
    };
    return SetToggle;
}(BbwzBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pTZXR0aW5nUG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUN0RCx3REFBbUQ7QUFFN0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFDMUM7O0dBRUc7QUFFSDtJQUE0QyxrQ0FBWTtJQUF4RDs7SUFzREEsQ0FBQztJQWhEYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4Rix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFGLHlCQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFD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QyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8saUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVELHNCQUFXLGdDQUFTO2FBT3BCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFURCxVQUFxQixJQUFhO1lBQzlCLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRO2dCQUN0QixPQUFPO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBTU8sK0JBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDNUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F0Q0EsQUFzQ0MsQ0F0Q3VCLHNCQUFZLEdBc0NuQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4uL3N1YnZpZXcvQmJ3ekJhc2VWaWV3XCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuLyoqXHJcbiAqIOW8ueeqlyDorr7nva7nlYzpnaJcclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pTZXR0aW5nUG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBtYXNrTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgY29udGVudE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGFuaW1Db21wOiBhbnk7XHJcbiAgICBwcml2YXRlIHZlcnNpb25MYmw6IGNjLkxhYmVsO1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmdldENvbnRlbnRTaXplKCkpO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUgPSBjYy5maW5kKFwibWFza1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSBjYy5maW5kKFwiY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAgPSBHbG9iYWwuVUlIZWxwZXIuYWRkQW5pbUNvbXAodGhpcy5ub2RlLCB0aGlzLmNvbnRlbnROb2RlLCB0aGlzLm1hc2tOb2RlKTtcclxuXHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLmFkZENvbW1vbkNsaWNrKHRoaXMuY29udGVudE5vZGUsIFwiYnV0dG9uX2Nsb3NlXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tcIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcblxyXG4gICAgICAgIHRoaXMudmVyc2lvbkxibCA9IGNjLmZpbmQoJ2NvbnRlbnQvbGFiZWxfdmVyc2lvbicsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQpO1xyXG4gICAgICAgIGlmKGdhbWVJbmZvKVxyXG4gICAgICAgICAgICB0aGlzLnZlcnNpb25MYmwuc3RyaW5nID0gYOeJiOacrOWPtzpWJHtnYW1lSW5mby5uYXRpdmVfdmVyc2lvbn1gO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRUb2dnbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb2dnbGUoKXtcclxuICAgICAgICBsZXQgbXVzaWNFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5tdXNpY0VuYWJsZTtcclxuICAgICAgICBsZXQgc291bmRFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZTtcclxuICAgICAgICBsZXQgbXVzaWNUb2dnbGUgPSBuZXcgU2V0VG9nZ2xlKGNjLmZpbmQoXCJtdXNpY1RvZ2dsZVwiLCB0aGlzLmNvbnRlbnROb2RlKSwgdGhpcy5vbk11c2ljVG9nZ2xlLCB0aGlzKTtcclxuICAgICAgICBsZXQgc291bmRUb2dnbGUgPSBuZXcgU2V0VG9nZ2xlKGNjLmZpbmQoXCJzb3VuZFRvZ2dsZVwiLCB0aGlzLmNvbnRlbnROb2RlKSwgdGhpcy5vbkF1ZGlvVG9nZ2xlLCB0aGlzKTtcclxuICAgICAgICBtdXNpY1RvZ2dsZS5pc0NoZWNrZWQgPSBtdXNpY0VuYWJsZTtcclxuICAgICAgICBzb3VuZFRvZ2dsZS5pc0NoZWNrZWQgPSBzb3VuZEVuYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKXtcclxuICAgICAgICB0aGlzLmFuaW1Db21wLmRvUG9wdXBPcGVuQW5pbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUNsaWNrKCl7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cENsb3NlQW5pbSgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk11c2ljVG9nZ2xlKHRvZ2dsZTogU2V0VG9nZ2xlKXtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdG9nZ2xlLmlzQ2hlY2tlZDtcclxuICAgICAgICBHbG9iYWwuQXVkaW8uc2V0TXVzaWNFbmFibGUoc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BdWRpb1RvZ2dsZSh0b2dnbGU6IFNldFRvZ2dsZSl7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRvZ2dsZS5pc0NoZWNrZWQ7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnNldFNvdW5kRW5hYmxlKHN0YXRlKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2V0VG9nZ2xlIGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBub3JtYWxOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjaGVja05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9pc0NoZWNrOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uLCBwcml2YXRlIHRhcmdldDogYW55KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLm5vcm1hbE5vZGUgPSB0aGlzLmdldENoaWxkKFwiY2xvc2VcIik7XHJcbiAgICAgICAgdGhpcy5jaGVja05vZGUgPSB0aGlzLmdldENoaWxkKFwib3BlblwiKTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIlwiLCB0aGlzLm9uVG9nZ2xlQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub2dnbGVDbGljaygpe1xyXG4gICAgICAgIHRoaXMuaXNDaGVja2VkID0gIXRoaXMuX2lzQ2hlY2s7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2sgJiYgdGhpcy50YXJnZXQpe1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy50YXJnZXQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzQ2hlY2tlZChmbGFnOiBib29sZWFuKXtcclxuICAgICAgICBpZiAoZmxhZyA9PT0gdGhpcy5faXNDaGVjaylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2lzQ2hlY2sgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzQ2hlY2tlZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0NoZWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlU3R5bGUoKXtcclxuICAgICAgICB0aGlzLm5vcm1hbE5vZGUuYWN0aXZlID0gIXRoaXMuX2lzQ2hlY2s7XHJcbiAgICAgICAgdGhpcy5jaGVja05vZGUuYWN0aXZlID0gISF0aGlzLl9pc0NoZWNrO1xyXG4gICAgfVxyXG59Il19