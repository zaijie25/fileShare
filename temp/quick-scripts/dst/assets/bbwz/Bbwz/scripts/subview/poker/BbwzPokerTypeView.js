
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/poker/BbwzPokerTypeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfd3eF63+hCWZbDWMrgoVI9', 'BbwzPokerTypeView');
// bbwz/Bbwz/scripts/subview/poker/BbwzPokerTypeView.ts

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
exports.BbwzBullPokerTypeView = exports.BbwzZjhPokerTypeView = void 0;
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzPokerTool_1 = require("../../tool/BbwzPokerTool");
var BbwzPathHelper_1 = require("../../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzPokerTypeView, _super);
    function BbwzPokerTypeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
    };
    return BbwzPokerTypeView;
}(BbwzBaseView_1.default));
exports.default = BbwzPokerTypeView;
var BbwzZjhPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzZjhPokerTypeView, _super);
    function BbwzZjhPokerTypeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzZjhPokerTypeView.prototype.initView = function () {
        this.typeSp = this.getComponent("layout/typeSp", cc.Sprite);
        this.multSp = this.getComponent("layout/multSp", cc.Sprite);
        this.highTypeSk = this.getComponent("highSk", sp.Skeleton);
    };
    BbwzZjhPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
        this.typeSp.node.active = true;
        var atlasPath = BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker";
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.typeSp, atlasPath, BbwzPokerTool_1.default.zjhPokerTypeSf[nType], null, true);
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        var sort = BbwzPokerTool_1.default.sortZjhPokerType(nType);
        var isSpecial = sort == 2 || sort == 3;
        this.highTypeSk.node.active = isSpecial;
        if (isSpecial) {
            this.highTypeSk.clearTracks();
            this.highTypeSk.setAnimation(0, "idle", false);
        }
    };
    return BbwzZjhPokerTypeView;
}(BbwzPokerTypeView));
exports.BbwzZjhPokerTypeView = BbwzZjhPokerTypeView;
var BbwzBullPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzBullPokerTypeView, _super);
    function BbwzBullPokerTypeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzBullPokerTypeView.prototype.initView = function () {
        this.typeSp = this.getComponent("layout/typeSp", cc.Sprite);
        this.multSp = this.getComponent("layout/multSp", cc.Sprite);
        this.highTypeSk = this.getComponent("highSk", sp.Skeleton);
    };
    BbwzBullPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
        this.typeSp.node.active = true;
        var atlasPath = BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker";
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.typeSp, atlasPath, BbwzPokerTool_1.default.bullPokerTypeSf[nType], null, true);
        var sort = BbwzPokerTool_1.default.sortBullPokerType(nType);
        if (sort == 3) {
            this.multSp.node.active = true;
            this.highTypeSk.node.active = true;
            this.highTypeSk.clearTracks();
            this.highTypeSk.setAnimation(0, "idle", false);
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        }
        else {
            this.highTypeSk.node.active = false;
            this.multSp.node.active = true;
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        }
    };
    return BbwzBullPokerTypeView;
}(BbwzPokerTypeView));
exports.BbwzBullPokerTypeView = BbwzBullPokerTypeView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccG9rZXJcXEJid3pQb2tlclR5cGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsMERBQXFEO0FBQ3JELDREQUF1RDtBQUN2RCw4REFBeUQ7QUFFekQ7SUFBK0MscUNBQVk7SUFBM0Q7O0lBSUEsQ0FBQztJQUhVLDZDQUFpQixHQUF4QixVQUF5QixLQUFhLEVBQUUsS0FBYTtJQUVyRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKOEMsc0JBQVksR0FJMUQ7O0FBRUQ7SUFBMEMsd0NBQWlCO0lBS3ZELDhCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLHVDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGdEQUFpQixHQUF4QixVQUF5QixLQUFhLEVBQUUsS0FBYTtRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksU0FBUyxHQUFHLHdCQUFjLENBQUMsZUFBZSxHQUFHLHlCQUF5QixDQUFDO1FBQzNFLE1BQU0sQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMseUJBQWUs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LElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQixNQUFNLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLHlCQUFlLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLHVCQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMzSTtJQUNMLENBQUM7SUFDTCw0QkFBQztBQUFELENBbENBLEFBa0NDLENBbEMwQyxpQkFBaUIsR0FrQzNEO0FBbENZLHNEQUFxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4uL0Jid3pCYXNlVmlld1wiO1xyXG5pbXBvcnQgQmJ3elBva2VyVG9vbCBmcm9tIFwiLi4vLi4vdG9vbC9CYnd6UG9rZXJUb29sXCI7XHJcbmltcG9ydCBCYnd6UGF0aEhlbHBlciBmcm9tIFwiLi4vLi4vdG9vbC9CYnd6UGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3elBva2VyVHlwZVZpZXcgZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwdWJsaWMgc2V0UG9rZXJUeXBlU3R5bGUoblR5cGU6IG51bWJlciwgbk11bHQ6IG51bWJlcil7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmJ3elpqaFBva2VyVHlwZVZpZXcgZXh0ZW5kcyBCYnd6UG9rZXJUeXBlVmlld3tcclxuICAgIHByaXZhdGUgdHlwZVNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIG11bHRTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBoaWdoVHlwZVNrOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLnR5cGVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGF5b3V0L3R5cGVTcFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubXVsdFNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJsYXlvdXQvbXVsdFNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoVHlwZVNrID0gdGhpcy5nZXRDb21wb25lbnQoXCJoaWdoU2tcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb2tlclR5cGVTdHlsZShuVHlwZTogbnVtYmVyLCBuTXVsdDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnR5cGVTcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGF0bGFzUGF0aCA9IEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvcG9rZXIvYXRsYXNfcG9rZXJcIjtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsdGhpcy50eXBlU3AsIGF0bGFzUGF0aCwgQmJ3elBva2VyVG9vbC56amhQb2tlclR5cGVTZltuVHlwZV0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCx0aGlzLm11bHRTcCwgYXRsYXNQYXRoLCBCYnd6UG9rZXJUb29sLm11bHRpU2ZSZXNbbk11bHRdLCBudWxsLCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IHNvcnQgPSBCYnd6UG9rZXJUb29sLnNvcnRaamhQb2tlclR5cGUoblR5cGUpO1xyXG4gICAgICAgIGxldCBpc1NwZWNpYWwgPSBzb3J0ID09IDIgfHwgc29ydCA9PSAzO1xyXG4gICAgICAgIHRoaXMuaGlnaFR5cGVTay5ub2RlLmFjdGl2ZSA9IGlzU3BlY2lhbDtcclxuICAgICAgICBpZiAoaXNTcGVjaWFsKXtcclxuICAgICAgICAgICAgdGhpcy5oaWdoVHlwZVNrLmNsZWFyVHJhY2tzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaFR5cGVTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYnd6QnVsbFBva2VyVHlwZVZpZXcgZXh0ZW5kcyBCYnd6UG9rZXJUeXBlVmlld3tcclxuICAgIHByaXZhdGUgdHlwZVNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIG11bHRTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBoaWdoVHlwZVNrOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLnR5cGVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGF5b3V0L3R5cGVTcFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubXVsdFNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJsYXlvdXQvbXVsdFNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oaWdoVHlwZVNrID0gdGhpcy5nZXRDb21wb25lbnQoXCJoaWdoU2tcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRQb2tlclR5cGVTdHlsZShuVHlwZTogbnVtYmVyLCBuTXVsdDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnR5cGVTcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGF0bGFzUGF0aCA9IEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvcG9rZXIvYXRsYXNfcG9rZXJcIjtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsdGhpcy50eXBlU3AsIGF0bGFzUGF0aCwgQmJ3elBva2VyVG9vbC5idWxsUG9rZXJUeXBlU2ZbblR5cGVdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICBsZXQgc29ydCA9IEJid3pQb2tlclRvb2wuc29ydEJ1bGxQb2tlclR5cGUoblR5cGUpO1xyXG4gICAgICAgIGlmIChzb3J0ID09IDMpe1xyXG4gICAgICAgICAgICB0aGlzLm11bHRTcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaFR5cGVTay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaGlnaFR5cGVTay5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLmhpZ2hUeXBlU2suc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCx0aGlzLm11bHRTcCwgYXRsYXNQYXRoLCBCYnd6UG9rZXJUb29sLm11bHRpU2ZSZXNbbk11bHRdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5oaWdoVHlwZVNrLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdFNwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEJid3pDb25zdERlZmluZS5HQU1FX0lELHRoaXMubXVsdFNwLCBhdGxhc1BhdGgsIEJid3pQb2tlclRvb2wubXVsdGlTZlJlc1tuTXVsdF0sIG51bGwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==