
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjMahjongOutView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '59d2azgb0xMYa3FSsSURgaY', 'ErmjMahjongOutView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongOutView.ts

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
var ErmjPathHelper_1 = require("../../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../../data/ErmjGameConst");
var ErmjMahjongOutView = /** @class */ (function (_super) {
    __extends(ErmjMahjongOutView, _super);
    function ErmjMahjongOutView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongOutView.prototype.initView = function () {
        this.frontBg = this.getComponent("bg", cc.Sprite);
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backBg = this.getComponent("back", cc.Sprite);
        this.attentionPoint = this.getChild("attention");
    };
    Object.defineProperty(ErmjMahjongOutView.prototype, "mahjongValue", {
        get: function () {
            return this._value;
        },
        /** 设置牌值和图案样式 */
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjOutMap[value], null, true);
            if (cc.sys.isBrowser)
                this.node.name = String(value);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 设置麻将子显示样式
     * @param perspLevel 透视等级
     * @param nRelative 相对主机方位
     */
    ErmjMahjongOutView.prototype.setPerspStyle = function (perspLevel, nRelative) {
        this.node.angle = 0;
        this.node.skewX = 0;
        var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(perspLevel), cfg = _a.cfg, dir = _a.dir;
        var relativeCfg = ErmjMjStyleHelper_1.default.mjOutStyle[nRelative];
        this.frontSp.node.angle = -relativeCfg.frontAngle;
        this.frontSp.node.skewX = cfg.frontSkewX * dir * relativeCfg.perspScale;
        this.frontBg.node.scaleX = dir * relativeCfg.perspScale;
        this.backBg.node.scaleX = dir * relativeCfg.perspScale;
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontBg, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", cfg.bgSp, null, true);
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.backBg, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", cfg.backSp, null, true);
    };
    Object.defineProperty(ErmjMahjongOutView.prototype, "isFront", {
        /** 设置麻将正反面 */
        set: function (flag) {
            this.frontBg.node.active = flag;
            this.frontSp.node.active = flag;
            this.backBg.node.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    /** 设置正面背景特殊色提示 */
    ErmjMahjongOutView.prototype.setSpecialColor = function (flag) {
        this.frontBg.node.color = flag && ErmjMjStyleHelper_1.default.SpecialBgColor || ErmjMjStyleHelper_1.default.NormalBgColor;
    };
    /**
     * 出牌动画
     * @param from 本地起点坐标
     * @param to 本地终点坐标
     * @param perspLevel 目的位置透视
     * @param nRelative 相对主机朝向
     */
    ErmjMahjongOutView.prototype.doOutAnim = function (from, to, perspLevel, nRelative) {
        var _this = this;
        this.setPerspStyle(0, ErmjMjStyleHelper_1.ErmjRelativeDefine.Self);
        var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(perspLevel), cfg = _a.cfg, dir = _a.dir;
        var relativeCfg = ErmjMjStyleHelper_1.default.mjOutStyle[nRelative];
        this.node.scale = 1.5;
        this.node.setPosition(from);
        this.frontBg.node.scaleX = dir * relativeCfg.perspScale;
        this.backBg.node.scaleX = dir * relativeCfg.perspScale;
        var tween = Game.Tween.get(this.node);
        tween.delay(this.Define.outMjShowTime)
            .to(this.Define.outMjFlyTime, { position: to, scale: 1, angle: -relativeCfg.frontAngle, skewX: dir * cfg.frontSkewX * relativeCfg.perspScale }, cc.easeIn(1))
            .call(function () {
            _this.setPerspStyle(perspLevel, nRelative);
        })
            .start();
    };
    /**
     * 麻将移动(自身父坐标内)
     * @param to 终点坐标
     * @param timeScale 移动时长
     * @param timeWait 移动前延时
     * @param callback 完成回调
     */
    ErmjMahjongOutView.prototype.doMove = function (to, timeScale, timeWait, callback, isSound, ease) {
        if (timeScale === void 0) { timeScale = 1; }
        if (timeWait === void 0) { timeWait = 0; }
        if (isSound === void 0) { isSound = false; }
        if (ease === void 0) { ease = cc.easeIn(1); }
        var tween = Game.Tween.get(this.node);
        tween.delay(timeWait)
            .call(function () {
            // isSound && ErmjGameConst.playSound(ErmjAudioConst.commonAudio.DispatchPoker, true);
        })
            .to(timeScale, { position: to }, ease)
            .call(callback)
            .start();
    };
    ErmjMahjongOutView.prototype.getRealSize = function () {
        return [this.node.width * this.node.scaleX, this.node.height * this.node.scaleY];
    };
    ErmjMahjongOutView.prototype.getAttentionWorldPos = function () {
        return this.attentionPoint.parent.convertToWorldSpaceAR(this.attentionPoint.position);
    };
    ErmjMahjongOutView.prototype.reset = function () {
        this.isFront = false;
        this.frontBg.node.color = ErmjMjStyleHelper_1.default.NormalBgColor;
        this.frontSp.node.angle = 0;
        this.node.angle = 0;
        this.node.scale = 1;
        this.node.skewX = 0;
    };
    return ErmjMahjongOutView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongOutView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtak1haGpvbmdPdXRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyw0REFBMkU7QUFDM0Usa0VBQXFGO0FBQ3JGLDBEQUFxRDtBQUdyRDtJQUFnRCxzQ0FBWTtJQU94RCw0QkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxxQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBR0Qsc0JBQVcsNENBQVk7YUFTdkI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQVpELGdCQUFnQjthQUNoQixVQUF3QixLQUFhO1lBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLO2dCQUNwQixPQUFPO1lBQ1gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyx1QkFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLHdCQUFj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QUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQTFIQSxBQTBIQyxDQTFIK0Msc0JBQVksR0EwSDNEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlVmlldyBmcm9tIFwiLi4vRXJtakJhc2VWaWV3XCI7XHJcbmltcG9ydCBFcm1qUGF0aEhlbHBlciwgeyBFcm1qQXVkaW9Db25zdCB9IGZyb20gXCIuLi8uLi9kYXRhL0VybWpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qTWpTdHlsZUhlbHBlciwgeyBFcm1qUmVsYXRpdmVEZWZpbmUgfSBmcm9tIFwiLi4vLi4vdG9vbC9Fcm1qTWpTdHlsZUhlbHBlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtak1haGpvbmdPdXRWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBmcm9udEJnOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGZyb250U3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgYmFja0JnOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF92YWx1ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBhdHRlbnRpb25Qb2ludDogY2MuTm9kZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLmZyb250QmcgPSB0aGlzLmdldENvbXBvbmVudChcImJnXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5mcm9udFNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJmcm9udFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuYmFja0JnID0gdGhpcy5nZXRDb21wb25lbnQoXCJiYWNrXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5hdHRlbnRpb25Qb2ludCA9IHRoaXMuZ2V0Q2hpbGQoXCJhdHRlbnRpb25cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiuvue9rueJjOWAvOWSjOWbvuahiOagt+W8jyAqL1xyXG4gICAgcHVibGljIHNldCBtYWhqb25nVmFsdWUodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKHRoaXMuX3ZhbHVlID09IHZhbHVlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoRXJtakdhbWVDb25zdC5HaWQsIHRoaXMuZnJvbnRTcCwgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJtYWhqb25nL2F0bGFzX21haGpvbmdcIiwgRXJtak1qU3R5bGVIZWxwZXIubWpPdXRNYXBbdmFsdWVdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3NlcilcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm5hbWUgPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWFoam9uZ1ZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6bq75bCG5a2Q5pi+56S65qC35byPXHJcbiAgICAgKiBAcGFyYW0gcGVyc3BMZXZlbCDpgI/op4bnrYnnuqdcclxuICAgICAqIEBwYXJhbSBuUmVsYXRpdmUg55u45a+55Li75py65pa55L2NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRQZXJzcFN0eWxlKHBlcnNwTGV2ZWw6IG51bWJlciwgblJlbGF0aXZlOiBFcm1qUmVsYXRpdmVEZWZpbmUpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmdsZSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNrZXdYID0gMDtcclxuICAgICAgICBsZXQge2NmZywgZGlyfSA9IEVybWpNalN0eWxlSGVscGVyLmdldFBlcnNwZWN0aXZlQ2ZnKHBlcnNwTGV2ZWwpO1xyXG4gICAgICAgIGxldCByZWxhdGl2ZUNmZyA9IEVybWpNalN0eWxlSGVscGVyLm1qT3V0U3R5bGVbblJlbGF0aXZlXTtcclxuICAgICAgICB0aGlzLmZyb250U3Aubm9kZS5hbmdsZSA9IC1yZWxhdGl2ZUNmZy5mcm9udEFuZ2xlO1xyXG4gICAgICAgIHRoaXMuZnJvbnRTcC5ub2RlLnNrZXdYID0gY2ZnLmZyb250U2tld1ggKiBkaXIgKiByZWxhdGl2ZUNmZy5wZXJzcFNjYWxlO1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZy5ub2RlLnNjYWxlWCA9IGRpciAqIHJlbGF0aXZlQ2ZnLnBlcnNwU2NhbGU7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcubm9kZS5zY2FsZVggPSBkaXIgKiByZWxhdGl2ZUNmZy5wZXJzcFNjYWxlO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5mcm9udEJnLCBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcIm1haGpvbmcvYXRsYXNfbWFoam9uZ1wiLCBjZmcuYmdTcCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLmJhY2tCZywgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJtYWhqb25nL2F0bGFzX21haGpvbmdcIiwgY2ZnLmJhY2tTcCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiuvue9rum6u+Wwhuato+WPjemdoiAqL1xyXG4gICAgcHVibGljIHNldCBpc0Zyb250KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZy5ub2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5mcm9udFNwLm5vZGUuYWN0aXZlID0gZmxhZztcclxuICAgICAgICB0aGlzLmJhY2tCZy5ub2RlLmFjdGl2ZSA9ICFmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7mraPpnaLog4zmma/nibnmroroibLmj5DnpLogKi9cclxuICAgIHB1YmxpYyBzZXRTcGVjaWFsQ29sb3IoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5mcm9udEJnLm5vZGUuY29sb3IgPSBmbGFnICYmIEVybWpNalN0eWxlSGVscGVyLlNwZWNpYWxCZ0NvbG9yIHx8IEVybWpNalN0eWxlSGVscGVyLk5vcm1hbEJnQ29sb3I7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh7rniYzliqjnlLtcclxuICAgICAqIEBwYXJhbSBmcm9tIOacrOWcsOi1t+eCueWdkOaghyBcclxuICAgICAqIEBwYXJhbSB0byDmnKzlnLDnu4jngrnlnZDmoIdcclxuICAgICAqIEBwYXJhbSBwZXJzcExldmVsIOebrueahOS9jee9rumAj+inhlxyXG4gICAgICogQHBhcmFtIG5SZWxhdGl2ZSDnm7jlr7nkuLvmnLrmnJ3lkJFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvT3V0QW5pbShmcm9tOiBjYy5WZWMzLCB0bzogY2MuVmVjMywgcGVyc3BMZXZlbDogbnVtYmVyLCBuUmVsYXRpdmU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zZXRQZXJzcFN0eWxlKDAsIEVybWpSZWxhdGl2ZURlZmluZS5TZWxmKTtcclxuICAgICAgICBsZXQge2NmZywgZGlyfSA9IEVybWpNalN0eWxlSGVscGVyLmdldFBlcnNwZWN0aXZlQ2ZnKHBlcnNwTGV2ZWwpO1xyXG4gICAgICAgIGxldCByZWxhdGl2ZUNmZyA9IEVybWpNalN0eWxlSGVscGVyLm1qT3V0U3R5bGVbblJlbGF0aXZlXTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSAxLjU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGZyb20pO1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZy5ub2RlLnNjYWxlWCA9IGRpciAqIHJlbGF0aXZlQ2ZnLnBlcnNwU2NhbGU7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcubm9kZS5zY2FsZVggPSBkaXIgKiByZWxhdGl2ZUNmZy5wZXJzcFNjYWxlO1xyXG5cclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHR3ZWVuLmRlbGF5KHRoaXMuRGVmaW5lLm91dE1qU2hvd1RpbWUpXHJcbiAgICAgICAgLnRvKHRoaXMuRGVmaW5lLm91dE1qRmx5VGltZSwge3Bvc2l0aW9uOiB0bywgc2NhbGU6IDEsIGFuZ2xlOiAtcmVsYXRpdmVDZmcuZnJvbnRBbmdsZSwgc2tld1g6IGRpciAqIGNmZy5mcm9udFNrZXdYICogcmVsYXRpdmVDZmcucGVyc3BTY2FsZX0sIGNjLmVhc2VJbigxKSlcclxuICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldFBlcnNwU3R5bGUocGVyc3BMZXZlbCwgblJlbGF0aXZlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6bq75bCG56e75YqoKOiHqui6q+eItuWdkOagh+WGhSlcclxuICAgICAqIEBwYXJhbSB0byDnu4jngrnlnZDmoIdcclxuICAgICAqIEBwYXJhbSB0aW1lU2NhbGUg56e75Yqo5pe26ZW/XHJcbiAgICAgKiBAcGFyYW0gdGltZVdhaXQg56e75Yqo5YmN5bu25pe2XHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5a6M5oiQ5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb01vdmUodG86IGNjLlZlYzMsIHRpbWVTY2FsZSA9IDEsIHRpbWVXYWl0ID0gMCwgY2FsbGJhY2s/OiBGdW5jdGlvbiwgaXNTb3VuZCA9IGZhbHNlLCBlYXNlOiBhbnkgPSBjYy5lYXNlSW4oMSkpe1xyXG4gICAgICAgIGxldCB0d2VlbiA9IEdhbWUuVHdlZW4uZ2V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdHdlZW4uZGVsYXkodGltZVdhaXQpXHJcbiAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgLy8gaXNTb3VuZCAmJiBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5EaXNwYXRjaFBva2VyLCB0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50byh0aW1lU2NhbGUsIHtwb3NpdGlvbjogdG99LCBlYXNlKVxyXG4gICAgICAgIC5jYWxsKGNhbGxiYWNrKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRSZWFsU2l6ZSgpe1xyXG4gICAgICAgIHJldHVybiBbdGhpcy5ub2RlLndpZHRoICogdGhpcy5ub2RlLnNjYWxlWCwgdGhpcy5ub2RlLmhlaWdodCAqIHRoaXMubm9kZS5zY2FsZVldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBdHRlbnRpb25Xb3JsZFBvcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmF0dGVudGlvblBvaW50LnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5hdHRlbnRpb25Qb2ludC5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcm9udEJnLm5vZGUuY29sb3IgPSBFcm1qTWpTdHlsZUhlbHBlci5Ob3JtYWxCZ0NvbG9yO1xyXG4gICAgICAgIHRoaXMuZnJvbnRTcC5ub2RlLmFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAwO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNrZXdYID0gMDtcclxuICAgIH1cclxufSJdfQ==