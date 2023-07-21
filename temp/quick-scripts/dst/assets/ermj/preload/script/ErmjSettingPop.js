
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/preload/script/ErmjSettingPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f5246hAg6FGOoge/N2Tro9o', 'ErmjSettingPop');
// ermj/preload/script/ErmjSettingPop.ts

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
var ErmjSettingPop = /** @class */ (function (_super) {
    __extends(ErmjSettingPop, _super);
    function ErmjSettingPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.version = '1.0.1';
        return _this;
    }
    ErmjSettingPop.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        Global.UIHelper.addCommonClick(this.node, "centerNode/close", this.closeWnd, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "mask", this.closeWnd, this, cc.Button.Transition.NONE, cc.Button.Transition.SCALE, false);
        this.initVersion();
        this.initToggle();
        this.animComp = Global.UIHelper.addAnimComp(this.node, cc.find("centerNode", this.node), cc.find("mask", this.node));
    };
    ErmjSettingPop.prototype.onEnable = function () {
        this.animComp.doPopupOpenAnim();
    };
    ErmjSettingPop.prototype.initVersion = function () {
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
    ErmjSettingPop.prototype.initToggle = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        var musicToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/musicToggle", SetToggle);
        musicToggle.setCallback(this.onMusicToggle, this);
        var audioToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/soundToggle", SetToggle);
        audioToggle.setCallback(this.onAudioToggle, this);
        musicToggle.isChecked = musicEnable;
        audioToggle.isChecked = soundEnable;
    };
    ErmjSettingPop.prototype.setVersion = function (str) {
        this.versionLbl.string = "版本号：V" + str;
    };
    ErmjSettingPop.prototype.onMusicToggle = function (toggle) {
        Global.Audio.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setMusicEnable(state);
    };
    ErmjSettingPop.prototype.onAudioToggle = function (toggle) {
        var state = toggle.isChecked;
        Global.Audio.setSoundEnable(state);
        Global.Audio.playBtnSound();
    };
    ErmjSettingPop.prototype.closeWnd = function () {
        var _this = this;
        Global.Audio.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    __decorate([
        property
    ], ErmjSettingPop.prototype, "version", void 0);
    ErmjSettingPop = __decorate([
        ccclass
    ], ErmjSettingPop);
    return ErmjSettingPop;
}(cc.Component));
exports.default = ErmjSettingPop;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxccHJlbG9hZFxcc2NyaXB0XFxFcm1qU2V0dGluZ1BvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQW1FQztRQWpFVyxhQUFPLEdBQVcsT0FBTyxDQUFDOztJQWlFdEMsQ0FBQztJQTdEYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUgsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxR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QUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBVEQsVUFBcUIsSUFBYTtZQUM5QixJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsUUFBUTtnQkFDdEIsT0FBTztZQUNYLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQU1PLCtCQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzVDLENBQUM7SUFDTCxnQkFBQztBQUFELENBeENBLEFBd0NDLENBeEN1QixFQUFFLENBQUMsU0FBUyxHQXdDbkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpTZXR0aW5nUG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgcHJpdmF0ZSB2ZXJzaW9uOiBzdHJpbmcgPSAnMS4wLjEnO1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG4gICAgcHJpdmF0ZSB2ZXJzaW9uTGJsOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImNlbnRlck5vZGUvY2xvc2VcIiwgdGhpcy5jbG9zZVduZCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tcIiwgdGhpcy5jbG9zZVduZCwgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSwgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIGZhbHNlKTsgIFxyXG4gICAgICAgIHRoaXMuaW5pdFZlcnNpb24oKTtcclxuICAgICAgICB0aGlzLmluaXRUb2dnbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5hZGRBbmltQ29tcCh0aGlzLm5vZGUsIGNjLmZpbmQoXCJjZW50ZXJOb2RlXCIsIHRoaXMubm9kZSksIGNjLmZpbmQoXCJtYXNrXCIsIHRoaXMubm9kZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cE9wZW5BbmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VmVyc2lvbigpe1xyXG4gICAgICAgIHRoaXMudmVyc2lvbkxibCA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlL3ZlcnNpb25MYmxcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICBsZXQgZ2lkID0gR2FtZS5HYW1lUHJlbG9hZFRvb2wuY3VyR2FtZUlkO1xyXG4gICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhnaWQpO1xyXG4gICAgICAgIGlmIChnYW1lSW5mbyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmVyc2lvbihnYW1lSW5mby5uYXRpdmVfdmVyc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmVyc2lvbih0aGlzLnZlcnNpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb2dnbGUoKXtcclxuICAgICAgICBsZXQgbXVzaWNFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5tdXNpY0VuYWJsZTtcclxuICAgICAgICBsZXQgc291bmRFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZTtcclxuICAgICAgICBsZXQgbXVzaWNUb2dnbGUgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudCh0aGlzLm5vZGUsIFwiY2VudGVyTm9kZS9tdXNpY1RvZ2dsZVwiLCBTZXRUb2dnbGUpO1xyXG4gICAgICAgIG11c2ljVG9nZ2xlLnNldENhbGxiYWNrKHRoaXMub25NdXNpY1RvZ2dsZSwgdGhpcyk7XHJcbiAgICAgICAgbGV0IGF1ZGlvVG9nZ2xlID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5ub2RlLCBcImNlbnRlck5vZGUvc291bmRUb2dnbGVcIiwgU2V0VG9nZ2xlKTtcclxuICAgICAgICBhdWRpb1RvZ2dsZS5zZXRDYWxsYmFjayh0aGlzLm9uQXVkaW9Ub2dnbGUsIHRoaXMpO1xyXG4gICAgICAgIG11c2ljVG9nZ2xlLmlzQ2hlY2tlZCA9IG11c2ljRW5hYmxlO1xyXG4gICAgICAgIGF1ZGlvVG9nZ2xlLmlzQ2hlY2tlZCA9IHNvdW5kRW5hYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VmVyc2lvbihzdHI6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uTGJsLnN0cmluZyA9IFwi54mI5pys5Y+377yaVlwiICsgc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NdXNpY1RvZ2dsZSh0b2dnbGU6IFNldFRvZ2dsZSl7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRvZ2dsZS5pc0NoZWNrZWQ7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnNldE11c2ljRW5hYmxlKHN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQXVkaW9Ub2dnbGUodG9nZ2xlOiBTZXRUb2dnbGUpe1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRvZ2dsZS5pc0NoZWNrZWQ7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnNldFNvdW5kRW5hYmxlKHN0YXRlKTtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLmFuaW1Db21wLmRvUG9wdXBDbG9zZUFuaW0oKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTZXRUb2dnbGUgZXh0ZW5kcyBjYy5Db21wb25lbnR7XHJcbiAgICBwcml2YXRlIG5vcm1hbE5vZGU6IGFueTtcclxuICAgIHByaXZhdGUgY2hlY2tOb2RlOiBhbnk7XHJcbiAgICBwcml2YXRlIF9pc0NoZWNrOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHRhcmdldDogYW55XHJcblxyXG4gICAgcHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlID0gY2MuZmluZChcImNsb3NlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5jaGVja05vZGUgPSBjYy5maW5kKFwib3BlblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25Ub2dnbGVDbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIG51bGwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2xpY2soKXtcclxuICAgICAgICB0aGlzLmlzQ2hlY2tlZCA9ICF0aGlzLl9pc0NoZWNrO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHRoaXMudGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0NoZWNrZWQoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgaWYgKGZsYWcgPT09IHRoaXMuX2lzQ2hlY2spXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9pc0NoZWNrID0gZmxhZztcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0NoZWNrZWQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNDaGVjaztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVN0eWxlKCl7XHJcbiAgICAgICAgdGhpcy5ub3JtYWxOb2RlLmFjdGl2ZSA9ICF0aGlzLl9pc0NoZWNrO1xyXG4gICAgICAgIHRoaXMuY2hlY2tOb2RlLmFjdGl2ZSA9ICEhdGhpcy5faXNDaGVjaztcclxuICAgIH1cclxufSJdfQ==