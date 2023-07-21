
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjAskNoticeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '889ecNRv1lJUIeShwSHdxvw', 'ErmjAskNoticeView');
// ermj/Ermj/scripts/subView/ErmjAskNoticeView.ts

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
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjTimeAutoRun_1 = require("../component/ErmjTimeAutoRun");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjAskNoticeView = /** @class */ (function (_super) {
    __extends(ErmjAskNoticeView, _super);
    function ErmjAskNoticeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjAskNoticeView.prototype.initView = function () {
        this.bgSp = this.getComponent("content/bgSp", cc.Sprite);
        this.oppNoticeSp = this.getComponent("content/oppNoticeSp", cc.Sprite);
        this.oppNoticeSp.node.active = false;
        this.selfNoticeSp = this.getComponent("content/selfNoticeSp", cc.Sprite);
        this.selfNoticeSp.node.active = false;
        this.timeRun = Global.UIHelper.safeGetComponent(this.getChild('content/timeLbl'), "", ErmjTimeAutoRun_1.default);
        this.timeRun.node.active = false;
    };
    /**
     * 自己enter时设置方位朝向
     * @param serChair 服务器座位 与ErmjLocation枚举对应
     */
    ErmjAskNoticeView.prototype.setChairLook = function (serChair) {
        var _a = ErmjGameConst_1.default.askNoticeStrCfg[serChair], bgStr = _a[0], selfStr = _a[1], oppStr = _a[2];
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.bgSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", bgStr, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.selfNoticeSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", selfStr, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.oppNoticeSp, ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic", oppStr, null, true);
        this.oppNoticeSp.node.active = false;
        this.selfNoticeSp.node.active = false;
    };
    /** 轮到谁了 */
    ErmjAskNoticeView.prototype.whichLocationTurn = function (localseat) {
        if (localseat == 0) {
            this.selfNoticeSp.node.active = true;
            this.oppNoticeSp.node.active = false;
            this.selfNoticeSp.node.stopAllActions();
            this.selfNoticeSp.node.opacity = 255;
            this.selfNoticeSp.node.runAction(cc.repeatForever(cc.sequence([
                cc.fadeTo(1, 100),
                cc.fadeTo(1, 255),
            ])));
        }
        else if (localseat == 1) {
            this.oppNoticeSp.node.active = true;
            this.selfNoticeSp.node.active = false;
            this.oppNoticeSp.node.stopAllActions();
            this.oppNoticeSp.node.opacity = 255;
            this.oppNoticeSp.node.runAction(cc.repeatForever(cc.sequence([
                cc.fadeTo(1, 100),
                cc.fadeTo(1, 255),
            ])));
        }
    };
    /** 设置倒计时 */
    ErmjAskNoticeView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRun.node.active = true;
        this.timeRun.setTimer(leftTime, callback, target);
    };
    ErmjAskNoticeView.prototype.setTimerShow = function (flag) {
        this.timeRun.node.active = flag;
    };
    ErmjAskNoticeView.prototype.clearByRound = function () {
        this.timeRun.node.active = false;
        this.selfNoticeSp.node.stopAllActions();
        this.oppNoticeSp.node.stopAllActions();
        this.selfNoticeSp.node.opacity = 255;
        this.oppNoticeSp.node.opacity = 255;
        this.active = false;
    };
    return ErmjAskNoticeView;
}(ErmjBaseView_1.default));
exports.default = ErmjAskNoticeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakFza05vdGljZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHVEQUFrRDtBQUNsRCxnRUFBMkQ7QUFDM0QseURBQW9EO0FBRXBEO0lBQStDLHFDQUFZO0lBTXZELDJCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSx5QkFBZSxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksd0NBQVksR0FBbkIsVUFBb0IsUUFB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UUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSx3Q0FBWSxHQUFuQixVQUFvQixJQUFhO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUVNLHdDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FoRkEsQUFnRkMsQ0FoRjhDLHNCQUFZLEdBZ0YxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4vRXJtakJhc2VWaWV3XCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IEVybWpUaW1lQXV0b1J1biBmcm9tIFwiLi4vY29tcG9uZW50L0VybWpUaW1lQXV0b1J1blwiO1xyXG5pbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpBc2tOb3RpY2VWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBiZ1NwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHRpbWVSdW46IEVybWpUaW1lQXV0b1J1bjtcclxuICAgIHByaXZhdGUgb3BwTm90aWNlU3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgc2VsZk5vdGljZVNwOiBjYy5TcHJpdGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5iZ1NwID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L2JnU3BcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLm9wcE5vdGljZVNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L29wcE5vdGljZVNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5vcHBOb3RpY2VTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZk5vdGljZVNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L3NlbGZOb3RpY2VTcFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuc2VsZk5vdGljZVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5nZXRDaGlsZCgnY29udGVudC90aW1lTGJsJyksIFwiXCIsIEVybWpUaW1lQXV0b1J1bik7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rlt7FlbnRlcuaXtuiuvue9ruaWueS9jeacneWQkVxyXG4gICAgICogQHBhcmFtIHNlckNoYWlyIOacjeWKoeWZqOW6p+S9jSDkuI5Fcm1qTG9jYXRpb27mnprkuL7lr7nlupRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENoYWlyTG9vayhzZXJDaGFpcjogbnVtYmVyKXtcclxuICAgICAgICBsZXQgW2JnU3RyLCBzZWxmU3RyLCBvcHBTdHJdID0gRXJtakdhbWVDb25zdC5hc2tOb3RpY2VTdHJDZmdbc2VyQ2hhaXJdO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5iZ1NwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImR5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBiZ1N0ciwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLnNlbGZOb3RpY2VTcCwgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJkeW5hbWljL2F0bGFzX2R5bmFtaWNcIiwgc2VsZlN0ciwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLm9wcE5vdGljZVNwLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImR5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBvcHBTdHIsIG51bGwsIHRydWUpO1xyXG4gICAgICAgIHRoaXMub3BwTm90aWNlU3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGZOb3RpY2VTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDova7liLDosIHkuoYgKi9cclxuICAgIHB1YmxpYyB3aGljaExvY2F0aW9uVHVybihsb2NhbHNlYXQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKGxvY2Fsc2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxmTm90aWNlU3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9wcE5vdGljZVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZk5vdGljZVNwLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxmTm90aWNlU3Aubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZOb3RpY2VTcC5ub2RlLnJ1bkFjdGlvbihjYy5yZXBlYXRGb3JldmVyKFxyXG4gICAgICAgICAgICAgICAgY2Muc2VxdWVuY2UoW1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbygxLCAxMDApLFxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmZhZGVUbygxLCAyNTUpLFxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgKSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobG9jYWxzZWF0ID09IDEpe1xyXG4gICAgICAgICAgICB0aGlzLm9wcE5vdGljZVNwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxmTm90aWNlU3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vcHBOb3RpY2VTcC5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BwTm90aWNlU3Aubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICB0aGlzLm9wcE5vdGljZVNwLm5vZGUucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoXHJcbiAgICAgICAgICAgICAgICBjYy5zZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKDEsIDEwMCksXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZmFkZVRvKDEsIDI1NSksXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6K6+572u5YCS6K6h5pe2ICovXHJcbiAgICBwdWJsaWMgc2V0VGltZVJ1bkNvbmZpZyhsZWZ0VGltZTogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KXtcclxuICAgICAgICB0aGlzLnRpbWVSdW4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGltZVJ1bi5zZXRUaW1lcihsZWZ0VGltZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRpbWVyU2hvdyhmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLnRpbWVSdW4ubm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLnRpbWVSdW4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNlbGZOb3RpY2VTcC5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5vcHBOb3RpY2VTcC5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5zZWxmTm90aWNlU3Aubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMub3BwTm90aWNlU3Aubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=