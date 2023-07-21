
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/preload/scripts/DdzSettingPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31ec8mlt4VAi6cRA44JtgTF', 'DdzSettingPop');
// ddz/preload/scripts/DdzSettingPop.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DdzSettingPop = /** @class */ (function (_super) {
    __extends(DdzSettingPop, _super);
    function DdzSettingPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.version = '1.0.1';
        return _this;
    }
    DdzSettingPop.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        Global.UIHelper.addCommonClick(this.node, "centerNode/close", this.closeWnd, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "mask", this.closeWnd, this, cc.Button.Transition.NONE, cc.Button.Transition.SCALE, false);
        this.initVersion();
        this.initToggle();
        this.animComp = Global.UIHelper.addAnimComp(this.node, cc.find("centerNode", this.node), cc.find("mask", this.node));
    };
    DdzSettingPop.prototype.onEnable = function () {
        this.animComp.doPopupOpenAnim();
    };
    DdzSettingPop.prototype.initVersion = function () {
        this.versionLbl = cc.find("centerNode/versionLbl", this.node).getComponent(cc.Label);
        var gid = Game.GamePreloadTool.curGameId;
        var gameInfo = Global.GameData.getGameInfo(gid);
        if (gameInfo) {
            this.setVersion(gameInfo.native_version);
        }
        else {
            this.setVersion(this.version);
        }
    };
    DdzSettingPop.prototype.initToggle = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        var musicToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/musicToggle", SetToggle);
        musicToggle.setCallback(this.onMusicToggle, this);
        var audioToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/soundToggle", SetToggle);
        audioToggle.setCallback(this.onAudioToggle, this);
        musicToggle.isChecked = musicEnable;
        audioToggle.isChecked = soundEnable;
    };
    DdzSettingPop.prototype.setVersion = function (str) {
        this.versionLbl.string = "版本号：V" + str;
    };
    DdzSettingPop.prototype.onMusicToggle = function (toggle) {
        Global.Audio.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setMusicEnable(state);
    };
    DdzSettingPop.prototype.onAudioToggle = function (toggle) {
        var state = toggle.isChecked;
        Global.Audio.setSoundEnable(state);
        Global.Audio.playBtnSound();
    };
    DdzSettingPop.prototype.closeWnd = function () {
        var _this = this;
        Global.Audio.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    __decorate([
        property
    ], DdzSettingPop.prototype, "version", void 0);
    DdzSettingPop = __decorate([
        ccclass
    ], DdzSettingPop);
    return DdzSettingPop;
}(cc.Component));
exports.default = DdzSettingPop;
var SetToggle = /** @class */ (function (_super) {
    __extends(SetToggle, _super);
    function SetToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetToggle.prototype.setCallback = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    SetToggle.prototype.onLoad = function () {
        this.normalNode = cc.find("close", this.node);
        this.checkNode = cc.find("open", this.node);
        Global.UIHelper.addCommonClick(this.node, "", this.onToggleClick, this, cc.Button.Transition.SCALE, null, false);
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
}(cc.Component));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxwcmVsb2FkXFxzY3JpcHRzXFxEZHpTZXR0aW5nUG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTJDLGlDQUFZO0lBQXZEO1FBQUEscUVBbUVDO1FBakVXLGFBQU8sR0FBVyxPQUFPLENBQUM7O0lBaUV0QyxDQUFDO0lBN0RhLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1SCxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLFFB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QUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFURCxVQUFxQixJQUFhO1lBQzlCLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRO2dCQUN0QixPQUFPO1lBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBTU8sK0JBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDNUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F4Q0EsQUF3Q0MsQ0F4Q3VCLEVBQUUsQ0FBQyxTQUFTLEdBd0NuQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6U2V0dGluZ1BvcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHlcclxuICAgIHByaXZhdGUgdmVyc2lvbjogc3RyaW5nID0gJzEuMC4xJztcclxuICAgIHByaXZhdGUgYW5pbUNvbXA6IGFueTtcclxuICAgIHByaXZhdGUgdmVyc2lvbkxibDogY2MuTGFiZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJjZW50ZXJOb2RlL2Nsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJtYXNrXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBmYWxzZSk7ICBcclxuICAgICAgICB0aGlzLmluaXRWZXJzaW9uKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAgPSBHbG9iYWwuVUlIZWxwZXIuYWRkQW5pbUNvbXAodGhpcy5ub2RlLCBjYy5maW5kKFwiY2VudGVyTm9kZVwiLCB0aGlzLm5vZGUpLCBjYy5maW5kKFwibWFza1wiLCB0aGlzLm5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKXtcclxuICAgICAgICB0aGlzLmFuaW1Db21wLmRvUG9wdXBPcGVuQW5pbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFZlcnNpb24oKXtcclxuICAgICAgICB0aGlzLnZlcnNpb25MYmwgPSBjYy5maW5kKFwiY2VudGVyTm9kZS92ZXJzaW9uTGJsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuXHJcbiAgICAgICAgbGV0IGdpZCA9IEdhbWUuR2FtZVByZWxvYWRUb29sLmN1ckdhbWVJZDtcclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2lkKTtcclxuICAgICAgICBpZiAoZ2FtZUluZm8pe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZlcnNpb24oZ2FtZUluZm8ubmF0aXZlX3ZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNldFZlcnNpb24odGhpcy52ZXJzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VG9nZ2xlKCl7XHJcbiAgICAgICAgbGV0IG11c2ljRW5hYmxlID0gR2xvYmFsLlNldHRpbmcuc2V0dGluZ0RhdGEubXVzaWNFbmFibGU7XHJcbiAgICAgICAgbGV0IHNvdW5kRW5hYmxlID0gR2xvYmFsLlNldHRpbmcuc2V0dGluZ0RhdGEuc291bmRFbmFibGU7XHJcbiAgICAgICAgbGV0IG11c2ljVG9nZ2xlID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5ub2RlLCBcImNlbnRlck5vZGUvbXVzaWNUb2dnbGVcIiwgU2V0VG9nZ2xlKTtcclxuICAgICAgICBtdXNpY1RvZ2dsZS5zZXRDYWxsYmFjayh0aGlzLm9uTXVzaWNUb2dnbGUsIHRoaXMpO1xyXG4gICAgICAgIGxldCBhdWRpb1RvZ2dsZSA9IEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KHRoaXMubm9kZSwgXCJjZW50ZXJOb2RlL3NvdW5kVG9nZ2xlXCIsIFNldFRvZ2dsZSk7XHJcbiAgICAgICAgYXVkaW9Ub2dnbGUuc2V0Q2FsbGJhY2sodGhpcy5vbkF1ZGlvVG9nZ2xlLCB0aGlzKTtcclxuICAgICAgICBtdXNpY1RvZ2dsZS5pc0NoZWNrZWQgPSBtdXNpY0VuYWJsZTtcclxuICAgICAgICBhdWRpb1RvZ2dsZS5pc0NoZWNrZWQgPSBzb3VuZEVuYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFZlcnNpb24oc3RyOiBzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMudmVyc2lvbkxibC5zdHJpbmcgPSBcIueJiOacrOWPt++8mlZcIiArIHN0cjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTXVzaWNUb2dnbGUodG9nZ2xlOiBTZXRUb2dnbGUpe1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0b2dnbGUuaXNDaGVja2VkO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5zZXRNdXNpY0VuYWJsZShzdGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkF1ZGlvVG9nZ2xlKHRvZ2dsZTogU2V0VG9nZ2xlKXtcclxuICAgICAgICBsZXQgc3RhdGUgPSB0b2dnbGUuaXNDaGVja2VkO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5zZXRTb3VuZEVuYWJsZShzdGF0ZSk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwQ2xvc2VBbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2V0VG9nZ2xlIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBub3JtYWxOb2RlOiBhbnk7XHJcbiAgICBwcml2YXRlIGNoZWNrTm9kZTogYW55O1xyXG4gICAgcHJpdmF0ZSBfaXNDaGVjazogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSB0YXJnZXQ6IGFueVxyXG5cclxuICAgIHB1YmxpYyBzZXRDYWxsYmFjayhjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KXtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubm9ybWFsTm9kZSA9IGNjLmZpbmQoXCJjbG9zZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tOb2RlID0gY2MuZmluZChcIm9wZW5cIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIlwiLCB0aGlzLm9uVG9nZ2xlQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvZ2dsZUNsaWNrKCl7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSAhdGhpcy5faXNDaGVjaztcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiB0aGlzLnRhcmdldCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnRhcmdldCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNDaGVja2VkKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmIChmbGFnID09PSB0aGlzLl9pc0NoZWNrKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5faXNDaGVjayA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNDaGVja2VkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQ2hlY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTdHlsZSgpe1xyXG4gICAgICAgIHRoaXMubm9ybWFsTm9kZS5hY3RpdmUgPSAhdGhpcy5faXNDaGVjaztcclxuICAgICAgICB0aGlzLmNoZWNrTm9kZS5hY3RpdmUgPSAhIXRoaXMuX2lzQ2hlY2s7XHJcbiAgICB9XHJcbn0iXX0=