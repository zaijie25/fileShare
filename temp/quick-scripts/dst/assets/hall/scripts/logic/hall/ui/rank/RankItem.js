
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rank/RankItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ac3d4Sx6W9Nup6Y7JFabOx+', 'RankItem');
// hall/scripts/logic/hall/ui/rank/RankItem.ts

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
//游戏列表item
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.LabelName = null;
        _this.LabelID = null;
        _this.LabelCount = null;
        _this.selfRankLab = null;
        _this.headImg = null;
        _this.selfRankSprite = null;
        return _this;
    }
    RankItem.prototype.onLoad = function () {
        this.headImg.on(cc.Node.EventType.TOUCH_END, this.onHeadClick, this);
    };
    RankItem.prototype.Init = function (data) {
        if (Number(data.headimg)) {
            var headSprite = this.headImg.getComponent(cc.Sprite);
            var tempFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
            headSprite.spriteFrame = tempFrame;
        }
        else {
            Global.Toolkit.loadWebPic(this.headImg, data.headimg);
        }
        var LabelStr = data.uid + "";
        this.LabelID.string = Global.Toolkit.formateStrWithAsterisk(LabelStr, LabelStr.length - 4, 1);
        this.LabelName.string = Global.Toolkit.substrEndWithElli(data.name, 8);
        this.LabelCount.string = Global.Toolkit.GetText(data.point);
        this.selfRankLab.string = (data.rank == null) ? "W" : data.rank;
        var self = this;
        this.selfRankLab.node.active = false;
        var atlasPath = "hall/texture/rank/rankAtlas";
        if (data.rank > 3) {
            //大于三 排名后紫色有背景图，红色没有背景图
            if (Global.Setting.SkinConfig.isPurple) {
                Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_04", null, false);
            }
            else {
                self.selfRankSprite.spriteFrame = null;
            }
            self.selfRankLab.node.active = true;
        }
        else {
            //中国红前三是图标和文本一起组成，需要显示
            if (Global.Setting.SkinConfig.isRed) {
                self.selfRankLab.node.active = true;
            }
            switch (data.rank) {
                case 1:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_01", null, false);
                    break;
                case 2:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_02", null, false);
                    break;
                case 3:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_03", null, false);
                    break;
            }
        }
    };
    RankItem.prototype.onHeadClick = function () {
        //Global.UI.getWindow<WndRank>("WndRank").RefreshInfoPanel()
    };
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelName", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelID", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "LabelCount", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "selfRankLab", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "headImg", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankItem.prototype, "selfRankSprite", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.default = RankItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyYW5rXFxSYW5rSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxVQUFVO0FBQ0osSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBc0MsNEJBQVk7SUFBbEQ7UUFBQSxxRUEyRUM7UUF6RUcsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBRXpCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTdCLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLGFBQU8sR0FBYSxJQUFJLENBQUM7UUFFekIsb0JBQWMsR0FBYyxJQUFJLENBQUM7O0lBK0RyQyxDQUFDO0lBN0RHLHlCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN4RSxDQUFDO0lBRUQsdUJBQUksR0FBSixVQUFLLElBQVE7UUFDVCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3JELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMzRCxVQUFVLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtTQUNyQzthQUFNO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENB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QUFDOzZDQUNPO0lBRXpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ2E7SUFaaEIsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQTJFNUI7SUFBRCxlQUFDO0NBM0VELEFBMkVDLENBM0VxQyxFQUFFLENBQUMsU0FBUyxHQTJFakQ7a0JBM0VvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vL+a4uOaIj+WIl+ihqGl0ZW1cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBMYWJlbE5hbWUgOmNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIExhYmVsSUQgOmNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIExhYmVsQ291bnQgOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBzZWxmUmFua0xhYiA6Y2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBoZWFkSW1nIDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgc2VsZlJhbmtTcHJpdGUgOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmhlYWRJbWcub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSGVhZENsaWNrLCB0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIEluaXQoZGF0YTphbnkpe1xyXG4gICAgICAgIGlmIChOdW1iZXIoZGF0YS5oZWFkaW1nKSkge1xyXG4gICAgICAgICAgICBsZXQgaGVhZFNwcml0ZSA9IHRoaXMuaGVhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICBsZXQgdGVtcEZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoZGF0YS5oZWFkaW1nKVxyXG4gICAgICAgICAgICBoZWFkU3ByaXRlLnNwcml0ZUZyYW1lID0gdGVtcEZyYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZFdlYlBpYyh0aGlzLmhlYWRJbWcsIGRhdGEuaGVhZGltZylcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IExhYmVsU3RyID0gZGF0YS51aWQrXCJcIlxyXG4gICAgICAgIHRoaXMuTGFiZWxJRC5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQuZm9ybWF0ZVN0cldpdGhBc3RlcmlzayhMYWJlbFN0ciwgTGFiZWxTdHIubGVuZ3RoLTQsIDEpO1xyXG5cclxuICAgICAgICB0aGlzLkxhYmVsTmFtZS5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkoIGRhdGEubmFtZSAsOCk7XHJcbiAgICAgICAgdGhpcy5MYWJlbENvdW50LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LkdldFRleHQoZGF0YS5wb2ludCk7XHJcbiAgICAgICAgdGhpcy5zZWxmUmFua0xhYi5zdHJpbmcgPShkYXRhLnJhbmsgPT0gbnVsbCk/XCJXXCI6ZGF0YS5yYW5rO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIHRoaXMuc2VsZlJhbmtMYWIubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGxldCBhdGxhc1BhdGggPSBcImhhbGwvdGV4dHVyZS9yYW5rL3JhbmtBdGxhc1wiXHJcbiAgICAgICAgaWYgKGRhdGEucmFuayA+IDMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+Wkp+S6juS4iSDmjpLlkI3lkI7ntKvoibLmnInog4zmma/lm77vvIznuqLoibLmsqHmnInog4zmma/lm75cclxuICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc2VsZlJhbmtTcHJpdGUsIGF0bGFzUGF0aCwgXCJyYW5rXzA0XCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZlJhbmtTcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZlJhbmtMYWIubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+S4reWbvee6ouWJjeS4ieaYr+Wbvuagh+WSjOaWh+acrOS4gOi1t+e7hOaIkO+8jOmcgOimgeaYvuekulxyXG4gICAgICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmlzUmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGZSYW5rTGFiLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGEucmFuaykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNlbGZSYW5rU3ByaXRlLCBhdGxhc1BhdGgsIFwicmFua18wMVwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDIgOlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNlbGZSYW5rU3ByaXRlLCBhdGxhc1BhdGgsIFwicmFua18wMlwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDMgOlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNlbGZSYW5rU3ByaXRlLCBhdGxhc1BhdGgsIFwicmFua18wM1wiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uSGVhZENsaWNrKCkge1xyXG4gICAgICAgIC8vR2xvYmFsLlVJLmdldFdpbmRvdzxXbmRSYW5rPihcIlduZFJhbmtcIikuUmVmcmVzaEluZm9QYW5lbCgpXHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG4iXX0=