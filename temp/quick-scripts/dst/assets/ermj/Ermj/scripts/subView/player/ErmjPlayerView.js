
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/player/ErmjPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xccGxheWVyXFxFcm1qUGxheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsK0NBQTBDO0FBQzFDLDREQUEyRTtBQUMzRSwwREFBcUQ7QUFDckQsMERBQXFEO0FBQ3JELDBEQUFxRDtBQUVyRDtJQUE0QyxrQ0FBWTtJQTJCcEQsd0JBQVksSUFBYSxFQUFTLFFBQWdCO1FBQWxELFlBQ0ksaUJBQU8sU0FFVjtRQUhpQyxjQUFRLEdBQVIsUUFBUSxDQUFRO1FBVjNDLGNBQVEsR0FBRyxLQUFLLENBQUM7UUFJeEIsYUFBYTtRQUNOLGVBQVMsR0FBRyxDQUFDLENBQUM7UUFPakIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELHVCQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElB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SyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDTCxxQkFBQztBQUFELENBeE1BLEFBd01DLENBeE0yQyxzQkFBWSxHQXdNdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uLy4uL0VybWpEcml2ZXJcIjtcclxuaW1wb3J0IEVybWpQYXRoSGVscGVyLCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uLy4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpSdWxlQ29uc3QgZnJvbSBcIi4uLy4uL2RhdGEvRXJtalJ1bGVDb25zdFwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBFcm1qR2FtZUV2ZW50IGZyb20gXCIuLi8uLi9kYXRhL0VybWpHYW1lRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpQbGF5ZXJWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgbWF0Y2hQb3M6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIGluZm9Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpbmZvUmF3UG9zOiBjYy5WZWMzO1xyXG4gICAgcHJpdmF0ZSBoZWFkSW1nOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGhlYWRCb3g6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgbmFtZUxibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGNvaW5MYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBiYW5rZXJJY29uOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzdGF0ZVNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHN0YXRlRWZmZWN0OiBzcC5Ta2VsZXRvbjtcclxuICAgIHByaXZhdGUgZmFuVHlwZU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHR5cGVTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSB0eXBlQmdTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSB0eXBlU2s6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSB0eXBlU3RhcnRQb3M6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIHRpbmdTaWduTm9kZTogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBfc29tZW9uZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBlbWpveU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgYXV0b1NpZ246IGNjLk5vZGU7XHJcblxyXG4gICAgLy/lrqLmiLfnq69wbGF5ZXLntKLlvJVcclxuICAgIHB1YmxpYyBjbGllbnRTaXQgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBoZWFkVGlwc1Jvb3Q6IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgaGVhZFRpcHNSb290UmF3UG9zOiBjYy5WZWMzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHB1YmxpYyB2aWV3U2VhdDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubWF0Y2hQb3MgPSB0aGlzLmdldENoaWxkKFwibWF0Y2hQb2ludFwiKS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmluZm9Ob2RlID0gdGhpcy5nZXRDaGlsZChcImluZm9cIik7XHJcbiAgICAgICAgdGhpcy5pbmZvUmF3UG9zID0gdGhpcy5pbmZvTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLmhlYWRJbWcgPSB0aGlzLmdldENvbXBvbmVudChcImluZm8vbWFzay9oZWFkSW1nXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5lbWpveU5vZGUgPSB0aGlzLmdldENoaWxkKFwiaW5mby9lbWpveU5vZGVcIik7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLmVtam95Tm9kZSwgXCJcIiwgdGhpcy5vbkhlYWRDbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5oZWFkQm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJpbmZvL2hlYWRCb3hcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwgPSB0aGlzLmdldENvbXBvbmVudChcImluZm8vbmFtZUxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb2luTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJpbmZvL2NvaW5MYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmFua2VySWNvbiA9IHRoaXMuZ2V0Q2hpbGQoXCJpbmZvL2JhbmtlclwiKTtcclxuICAgICAgICB0aGlzLmJhbmtlckljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0ZVNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJpbmZvL3N0YXRlXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUVmZmVjdCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaW5mby9zdGF0ZS9lZmZlY3RcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuZmFuVHlwZU5vZGUgPSB0aGlzLmdldENoaWxkKFwiaW5mby9mYW5UeXBlXCIpO1xyXG4gICAgICAgIHRoaXMuZmFuVHlwZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50eXBlQmdTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaW5mby9mYW5UeXBlL2JnU3BcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnR5cGVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaW5mby9mYW5UeXBlL2JnU3AvdHlwZVNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy50eXBlU2sgPSB0aGlzLmdldENvbXBvbmVudChcImluZm8vZmFuVHlwZS9lZmZlY3RcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMudHlwZVN0YXJ0UG9zID0gdGhpcy50eXBlQmdTcC5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMudGluZ1NpZ25Ob2RlID0gdGhpcy5nZXRDaGlsZChcImluZm8vdGluZ05vZGVcIik7XHJcbiAgICAgICAgdGhpcy50aW5nU2lnbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvU2lnbiA9IHRoaXMuZ2V0Q2hpbGQoJ2luZm8vYXV0bycpO1xyXG4gICAgICAgIHRoaXMuYXV0b1NpZ24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oZWFkVGlwc1Jvb3QgPSB0aGlzLmdldENoaWxkKFwiaGVhZFRpcHNSb290XCIpO1xyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNSb290UmF3UG9zID0gdGhpcy5oZWFkVGlwc1Jvb3QucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhlYWRUaXBXb3JsZFBvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkVGlwc1Jvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmhlYWRUaXBzUm9vdFJhd1Bvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkhlYWRDbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3U2VhdCAhPSAwKSB7XHJcbiAgICAgICAgICAgIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChFcm1qR2FtZUV2ZW50Lm9uVXNlckluZm9Ub3VjaCwgdGhpcy5jbGllbnRTaXQsIHRoaXMuZ2V0SGVhZFRpcFdvcmxkUG9zKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNvbWVvbmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvbWVvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5zZXRQbGF5ZXJJbmZvKFwi6Ziy5L2c5byKXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0UGxheWVySW5mbyhkYXRhLm5pY2tuYW1lKTtcclxuICAgICAgICB0aGlzLmxvYWRIZWFkSW1nKGRhdGEuaGVhZGltZyk7XHJcbiAgICAgICAgdGhpcy5sb2FkSGVhZEJveChkYXRhLmhlYWRrdWFuZyk7XHJcbiAgICAgICAgdGhpcy5zZXRQbGF5ZXJQb2ludChkYXRhLnBvaW50KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQ29udGV4dC5pc1dhaXRNYXRjaCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1hdGNoaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc29tZW9uZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NvbWVvbmUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQbGF5ZXJJbmZvKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSBuYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEhlYWRJbWcoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdyA9IHRoaXMuaGVhZEltZy5ub2RlLndpZHRoO1xyXG4gICAgICAgIGxldCBoID0gdGhpcy5oZWFkSW1nLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuaGVhZEltZy5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKHN0cik7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLm5vZGUud2lkdGggPSB3O1xyXG4gICAgICAgIHRoaXMuaGVhZEltZy5ub2RlLmhlaWdodCA9IGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkSGVhZEJveChzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5oZWFkQm94Lm5vZGUud2lkdGg7XHJcbiAgICAgICAgbGV0IGggPSB0aGlzLmhlYWRCb3gubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5Mb2FkVmlwSGVhZEt1YW5nKHRoaXMuaGVhZEJveCwgc3RyKTtcclxuICAgICAgICB0aGlzLmhlYWRCb3gubm9kZS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5oZWFkQm94Lm5vZGUuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UGxheWVyUG9pbnQocG9pbnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29pbkxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihwb2ludCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSAnJztcclxuICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dCYW5rZXIoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYmFua2VySWNvbi5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNYXRjaGluZygpIHtcclxuICAgICAgICB0aGlzLmluZm9Ob2RlLnNldFBvc2l0aW9uKHRoaXMubWF0Y2hQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNYXRjaGVkKGlzQW5pbTogYm9vbGVhbiwgdGltZTogbnVtYmVyID0gMC41KSB7XHJcbiAgICAgICAgaWYgKGlzQW5pbSkge1xyXG4gICAgICAgICAgICB0aGlzLmluZm9Ob2RlLnNldFBvc2l0aW9uKHRoaXMubWF0Y2hQb3MpO1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLmluZm9Ob2RlKTtcclxuICAgICAgICAgICAgdHdlZW4udG8odGltZSwgeyBwb3NpdGlvbjogdGhpcy5pbmZvUmF3UG9zIH0sIGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmluZm9Ob2RlLnNldFBvc2l0aW9uKHRoaXMuaW5mb1Jhd1Bvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U3RhdGVTcChmbGFnOiBib29sZWFuLCBzcFN0cj86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdGVTcC5ub2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5zdGF0ZUVmZmVjdC5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVFZmZlY3Quc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5zdGF0ZVNwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImR5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBzcFN0ciwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VGluZ1NpZ24oZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudGluZ1NpZ25Ob2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dGYW5UeXBlKGZsYWc6IGJvb2xlYW4sIG5UeXBlPzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5mYW5UeXBlTm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZVNrLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZUJnU3Aubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBsZXQgY29uZmlnID0gRXJtalJ1bGVDb25zdC5jYXJkVHlwZUNvbmZpZ1tuVHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy50eXBlQmdTcCwgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJkeW5hbWljL2F0bGFzX2R5bmFtaWNcIiwgY29uZmlnLmJnLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLnR5cGVTcCwgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJ0eXBlL2F0bGFzX3R5cGVcIiwgY29uZmlnLnNwLCBudWxsLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHlwZVNrLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gdGhpcy50eXBlU3RhcnRQb3MuYWRkKGNjLnYzKC0xNTAsIDApKTtcclxuICAgICAgICAgICAgdGhpcy50eXBlQmdTcC5ub2RlLnNldFBvc2l0aW9uKHRoaXMudHlwZVN0YXJ0UG9zKTtcclxuICAgICAgICAgICAgdGhpcy50eXBlQmdTcC5ub2RlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICBsZXQgc2hvd0FjdGlvbiA9IGNjLnNwYXduKFtcclxuICAgICAgICAgICAgICAgIGNjLm1vdmVUbygwLjQsIGNjLnYyKGVuZFBvcy54LCBlbmRQb3MueSkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSksXHJcbiAgICAgICAgICAgICAgICBjYy5mYWRlVG8oMC4yLCAyNTUpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoaXMudHlwZUJnU3Aubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgc2hvd0FjdGlvbixcclxuICAgICAgICAgICAgICAgIGNjLmRlbGF5VGltZSgxLjEpLFxyXG4gICAgICAgICAgICAgICAgY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFuVHlwZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKVxyXG4gICAgICAgICAgICBdKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd0F1dG9TaWduKGlzU2hvdzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYXV0b1NpZ24uYWN0aXZlID0gaXNTaG93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQbGF5ZXJIZWFkQ2VudGVyUG9zKCkge1xyXG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmhlYWRJbWcubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuaGVhZEltZy5ub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5hdXRvU2lnbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJhbmtlckljb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW5nU2lnbk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U3RhdGVTcChmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zaG93RmFuVHlwZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbmZvTm9kZS5zZXRQb3NpdGlvbih0aGlzLmluZm9SYXdQb3MpO1xyXG4gICAgfVxyXG59Il19