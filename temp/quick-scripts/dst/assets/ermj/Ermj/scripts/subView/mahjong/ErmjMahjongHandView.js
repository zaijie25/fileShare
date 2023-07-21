
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjMahjongHandView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '62a9bH/0rVJVrT796u68hfc', 'ErmjMahjongHandView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongHandView.ts

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
var ErmjMahjongHandView = /** @class */ (function (_super) {
    __extends(ErmjMahjongHandView, _super);
    function ErmjMahjongHandView(node) {
        var _this = _super.call(this) || this;
        _this._isSelect = false;
        _this.rawPos = cc.Vec3.ZERO;
        _this._isOut = false;
        _this._sortIndex = 0;
        _this.isTouchEnable = true;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongHandView.prototype.initView = function () {
        this.frontBg = this.getChild("bg");
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.backBg = this.getChild("back");
        this.selectSign = this.getChild("selectSign");
        this.selectSign.active = false;
    };
    Object.defineProperty(ErmjMahjongHandView.prototype, "isSelect", {
        get: function () {
            return this._isSelect;
        },
        set: function (flag) {
            this._isSelect = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "isOut", {
        get: function () {
            return this._isOut;
        },
        set: function (flag) {
            this._isOut = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "sortIndex", {
        get: function () {
            return this._sortIndex;
        },
        /** 设置排序, 同时设置在父节点的渲染顺序 */
        set: function (value) {
            this._sortIndex = value;
            this.node.setSiblingIndex(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "mahjongValue", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value == value)
                return;
            this._value = value;
            Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjHandMap[value], null, true);
            if (cc.sys.isBrowser)
                this.node.name = String(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjMahjongHandView.prototype, "isFront", {
        /** 设置麻将正反面 */
        set: function (flag) {
            this.frontBg.active = flag;
            this.frontSp.node.active = flag;
            this.backBg.active = !flag;
        },
        enumerable: false,
        configurable: true
    });
    ErmjMahjongHandView.prototype.setTouchEnable = function (flag) {
        Global.UIHelper.setNodeGray(this.node, !flag);
        this.isTouchEnable = flag;
    };
    /** 设置正面背景特殊色提示 */
    ErmjMahjongHandView.prototype.setSpecialColor = function (flag) {
        this.frontBg.color = flag && ErmjMjStyleHelper_1.default.SpecialBgColor || ErmjMjStyleHelper_1.default.NormalBgColor;
    };
    ErmjMahjongHandView.prototype.rememberRawPos = function () {
        this.rawPos = this.node.position;
    };
    ErmjMahjongHandView.prototype.onSelect = function (isSound) {
        if (isSound === void 0) { isSound = false; }
        this.isSelect = !this.isSelect;
        if (this.isSelect) {
            // isSound && ErmjGameConst.playSound(ErmjAudioConst.commonAudio.SelectPoker, true);
            this.rememberRawPos();
            this.node.setPosition(cc.v2(this.rawPos.x, this.rawPos.y + this.Define.ChooseOffsetY));
        }
        else {
            this.node.setPosition(this.rawPos);
        }
    };
    ErmjMahjongHandView.prototype.resetSelect = function () {
        this.node.setPosition(this.rawPos);
        this.isSelect = false;
    };
    /**
     * 麻将移动(自身父坐标内)
     * @param to 终点坐标
     * @param timeScale 移动时长
     * @param timeWait 移动前延时
     * @param callback 完成回调
     */
    ErmjMahjongHandView.prototype.doMove = function (to, timeScale, timeWait, callback, isSound, ease) {
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
    /**
     * 补花动画
     * @param newValue 补花进来的牌 0代表未知牌 以牌背显示
     * @param showTime 动画时长 消失出现动画时长
     * @param hideWaitTime 消失后等待时间
     */
    ErmjMahjongHandView.prototype.doChangeFlower = function (newValue, showTime, hideWaitTime) {
        var _this = this;
        if (hideWaitTime === void 0) { hideWaitTime = 0; }
        var _a = this.getRealSize(), width = _a[0], height = _a[1];
        var tween = Game.Tween.get(this.node);
        this.node.opacity = 255;
        tween.by(showTime, { position: cc.v3(0, height), opacity: -254 }, cc.easeIn(1))
            .call(function () {
            if (newValue > 0)
                _this.mahjongValue = newValue;
        })
            .delay(hideWaitTime)
            .by(showTime, { position: cc.v3(0, -height), opacity: 254 }, cc.easeOut(1))
            .start();
    };
    /**
     * 摸牌动画
     * @param endPos 终点
     * @param showTime 出现时长
     */
    ErmjMahjongHandView.prototype.doDraw = function (endPos, showTime) {
        var tween = Game.Tween.get(this.node);
        this.node.setPosition(endPos.add(cc.v3(0, 60)));
        this.node.opacity = 50;
        this.node.angle = 30;
        tween.to(showTime, { position: endPos, opacity: 255, angle: 0 }, cc.easeIn(1))
            .start();
    };
    /**
     * 获取麻将的落地原始位置
     */
    ErmjMahjongHandView.prototype.getRawPos = function () {
        return this.rawPos;
    };
    ErmjMahjongHandView.prototype.getWorldPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    /**
     * 检测点击坐标在麻将内
     * @param position 世界坐标点
     */
    ErmjMahjongHandView.prototype.checkIsTouch = function (position) {
        var rec = this.node.getBoundingBoxToWorld();
        return rec.contains(position);
    };
    ErmjMahjongHandView.prototype.getRealSize = function () {
        return [this.node.width * this.node.scaleX, this.node.height * this.node.scaleY];
    };
    /**
     * 是否是显示可选择的麻将子
     */
    ErmjMahjongHandView.prototype.checkMjValid = function () {
        return this.isTouchEnable && this.node.activeInHierarchy && this.node.active;
    };
    /** 选中光标位置 */
    ErmjMahjongHandView.prototype.getSelectSignWorldPos = function () {
        return this.selectSign.parent.convertToWorldSpaceAR(this.selectSign.position);
    };
    ErmjMahjongHandView.prototype.reset = function () {
        this.node.opacity = 255;
        this.node.angle = 0;
        this.isSelect = false;
        this.isFront = false;
        this.isOut = false;
        this.setTouchEnable(true);
    };
    return ErmjMahjongHandView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongHandView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtak1haGpvbmdIYW5kVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsNERBQTJFO0FBQzNFLGtFQUE2RDtBQUM3RCwwREFBcUQ7QUFFckQ7SUFBaUQsdUNBQVk7SUFZekQsNkJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFYTyxlQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWxCLFlBQU0sR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBSWxDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxzQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0JBQVcseUNBQVE7YUFJbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzthQU5ELFVBQW9CLElBQWE7WUFDN0IsSUFBSSxDQUFDLFNBQVMs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QUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTCwwQkFBQztBQUFELENBdE1BLEFBc01DLENBdE1nRCxzQkFBWSxHQXNNNUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpQYXRoSGVscGVyLCB7IEVybWpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uLy4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi8uLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi8uLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpNYWhqb25nSGFuZFZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGZyb250Qmc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGZyb250U3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgYmFja0JnOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfaXNTZWxlY3QgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3ZhbHVlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHJhd1BvczogY2MuVmVjMyA9IGNjLlZlYzMuWkVSTztcclxuICAgIHByaXZhdGUgX2lzT3V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zb3J0SW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHNlbGVjdFNpZ246IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGlzVG91Y2hFbmFibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZyA9IHRoaXMuZ2V0Q2hpbGQoXCJiZ1wiKTtcclxuICAgICAgICB0aGlzLmZyb250U3AgPSB0aGlzLmdldENvbXBvbmVudChcImZyb250XCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcgPSB0aGlzLmdldENoaWxkKFwiYmFja1wiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFNpZ24gPSB0aGlzLmdldENoaWxkKFwic2VsZWN0U2lnblwiKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFNpZ24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc1NlbGVjdChmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLl9pc1NlbGVjdCA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc1NlbGVjdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1NlbGVjdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzT3V0KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuX2lzT3V0ID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzT3V0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7mjpLluo8sIOWQjOaXtuiuvue9ruWcqOeItuiKgueCueeahOa4suafk+mhuuW6jyAqL1xyXG4gICAgcHVibGljIHNldCBzb3J0SW5kZXgodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5fc29ydEluZGV4ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNpYmxpbmdJbmRleCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzb3J0SW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbWFoam9uZ1ZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLl92YWx1ZSA9PSB2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLmZyb250U3AsIEVybWpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwibWFoam9uZy9hdGxhc19tYWhqb25nXCIsIEVybWpNalN0eWxlSGVscGVyLm1qSGFuZE1hcFt2YWx1ZV0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUubmFtZSA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtYWhqb25nVmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiuvue9rum6u+Wwhuato+WPjemdoiAqL1xyXG4gICAgcHVibGljIHNldCBpc0Zyb250KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZnJvbnRCZy5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMuZnJvbnRTcC5ub2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5iYWNrQmcuYWN0aXZlID0gIWZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRvdWNoRW5hYmxlKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5zZXROb2RlR3JheSh0aGlzLm5vZGUsICFmbGFnKTtcclxuICAgICAgICB0aGlzLmlzVG91Y2hFbmFibGUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDorr7nva7mraPpnaLog4zmma/nibnmroroibLmj5DnpLogKi9cclxuICAgIHB1YmxpYyBzZXRTcGVjaWFsQ29sb3IoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5mcm9udEJnLmNvbG9yID0gZmxhZyAmJiBFcm1qTWpTdHlsZUhlbHBlci5TcGVjaWFsQmdDb2xvciB8fCBFcm1qTWpTdHlsZUhlbHBlci5Ob3JtYWxCZ0NvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtZW1iZXJSYXdQb3MoKXtcclxuICAgICAgICB0aGlzLnJhd1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3QoaXNTb3VuZCA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ID0gIXRoaXMuaXNTZWxlY3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3Qpe1xyXG4gICAgICAgICAgICAvLyBpc1NvdW5kICYmIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLlNlbGVjdFBva2VyLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlclJhd1BvcygpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oY2MudjIodGhpcy5yYXdQb3MueCwgdGhpcy5yYXdQb3MueSArIHRoaXMuRGVmaW5lLkNob29zZU9mZnNldFkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMucmF3UG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0U2VsZWN0KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMucmF3UG9zKTtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpurvlsIbnp7vliqgo6Ieq6Lqr54i25Z2Q5qCH5YaFKVxyXG4gICAgICogQHBhcmFtIHRvIOe7iOeCueWdkOagh1xyXG4gICAgICogQHBhcmFtIHRpbWVTY2FsZSDnp7vliqjml7bplb9cclxuICAgICAqIEBwYXJhbSB0aW1lV2FpdCDnp7vliqjliY3lu7bml7ZcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDlrozmiJDlm57osINcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvTW92ZSh0bzogY2MuVmVjMywgdGltZVNjYWxlID0gMSwgdGltZVdhaXQgPSAwLCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBpc1NvdW5kID0gZmFsc2UsIGVhc2U6IGFueSA9IGNjLmVhc2VJbigxKSl7XHJcbiAgICAgICAgbGV0IHR3ZWVuID0gR2FtZS5Ud2Vlbi5nZXQodGhpcy5ub2RlKTtcclxuICAgICAgICB0d2Vlbi5kZWxheSh0aW1lV2FpdClcclxuICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAvLyBpc1NvdW5kICYmIEVybWpHYW1lQ29uc3QucGxheVNvdW5kKEVybWpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkRpc3BhdGNoUG9rZXIsIHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRvKHRpbWVTY2FsZSwge3Bvc2l0aW9uOiB0b30sIGVhc2UpXHJcbiAgICAgICAgLmNhbGwoY2FsbGJhY2spXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDooaXoirHliqjnlLtcclxuICAgICAqIEBwYXJhbSBuZXdWYWx1ZSDooaXoirHov5vmnaXnmoTniYwgMOS7o+ihqOacquefpeeJjCDku6XniYzog4zmmL7npLpcclxuICAgICAqIEBwYXJhbSBzaG93VGltZSDliqjnlLvml7bplb8g5raI5aSx5Ye6546w5Yqo55S75pe26ZW/XHJcbiAgICAgKiBAcGFyYW0gaGlkZVdhaXRUaW1lIOa2iOWkseWQjuetieW+heaXtumXtFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9DaGFuZ2VGbG93ZXIobmV3VmFsdWU6IG51bWJlciwgc2hvd1RpbWU6IG51bWJlciwgaGlkZVdhaXRUaW1lID0gMCl7XHJcbiAgICAgICAgbGV0IFt3aWR0aCwgaGVpZ2h0XSA9IHRoaXMuZ2V0UmVhbFNpemUoKTtcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIHR3ZWVuLmJ5KHNob3dUaW1lLCB7cG9zaXRpb246IGNjLnYzKDAsIGhlaWdodCksIG9wYWNpdHk6IC0yNTR9LCBjYy5lYXNlSW4oMSkpXHJcbiAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubWFoam9uZ1ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGVsYXkoaGlkZVdhaXRUaW1lKVxyXG4gICAgICAgIC5ieShzaG93VGltZSwge3Bvc2l0aW9uOiBjYy52MygwLCAtaGVpZ2h0KSwgb3BhY2l0eTogMjU0fSwgY2MuZWFzZU91dCgxKSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRuOeJjOWKqOeUu1xyXG4gICAgICogQHBhcmFtIGVuZFBvcyDnu4jngrlcclxuICAgICAqIEBwYXJhbSBzaG93VGltZSDlh7rnjrDml7bplb9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRvRHJhdyhlbmRQb3M6IGNjLlZlYzMsIHNob3dUaW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCB0d2VlbiA9IEdhbWUuVHdlZW4uZ2V0KHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKGVuZFBvcy5hZGQoY2MudjMoMCwgNjApKSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSA1MDtcclxuICAgICAgICB0aGlzLm5vZGUuYW5nbGUgPSAzMDtcclxuICAgICAgICB0d2Vlbi50byhzaG93VGltZSwge3Bvc2l0aW9uOiBlbmRQb3MsIG9wYWNpdHk6IDI1NSwgYW5nbGU6IDB9LCBjYy5lYXNlSW4oMSkpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpurvlsIbnmoTokL3lnLDljp/lp4vkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRSYXdQb3MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5yYXdQb3M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdvcmxkUG9zKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMubm9kZS5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvngrnlh7vlnZDmoIflnKjpurvlsIblhoVcclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiDkuJbnlYzlnZDmoIfngrlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrSXNUb3VjaChwb3NpdGlvbjogY2MuVmVjMil7XHJcbiAgICAgICAgbGV0IHJlYyA9IHRoaXMubm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcclxuICAgICAgICByZXR1cm4gcmVjLmNvbnRhaW5zKHBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UmVhbFNpemUoKXtcclxuICAgICAgICByZXR1cm4gW3RoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5zY2FsZVgsIHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuc2NhbGVZXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaYr+aYvuekuuWPr+mAieaLqeeahOm6u+WwhuWtkFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hlY2tNalZhbGlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUb3VjaEVuYWJsZSAmJiB0aGlzLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkgJiYgdGhpcy5ub2RlLmFjdGl2ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6YCJ5Lit5YWJ5qCH5L2N572uICovXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0U2lnbldvcmxkUG9zKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0U2lnbi5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuc2VsZWN0U2lnbi5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gMDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc091dCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0VG91Y2hFbmFibGUodHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=