
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzRulePop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39a08Ri+5hAqKS9F6DuDniC', 'BbwzRulePop');
// bbwz/Bbwz/scripts/panel/BbwzRulePop.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 弹窗 规则界面
var BbwzRulePop = /** @class */ (function (_super) {
    __extends(BbwzRulePop, _super);
    function BbwzRulePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzRulePop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize()); // 适配
        this.maskNode = this.node.getChildByName("mask");
        this.contentNode = this.node.getChildByName("content");
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        this.scroll = this.contentNode.getChildByName("scrollview").getComponent(cc.ScrollView);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
    };
    BbwzRulePop.prototype.onEnable = function () {
        this.scroll.scrollToTop(0);
        this.animComp.doPopupOpenAnim();
    };
    BbwzRulePop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzRulePop = __decorate([
        ccclass
    ], BbwzRulePop);
    return BbwzRulePop;
}(cc.Component));
exports.default = BbwzRulePop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pSdWxlUG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUVoRCxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxVQUFVO0FBRVY7SUFBeUMsK0JBQVk7SUFBckQ7O0lBNEJBLENBQUM7SUF0QmEsNEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFLLEtBQUs7UUFDN0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEYseUJBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRVMsOEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTyxrQ0FBWSxHQUFwQjtRQUFBLGlCQUtDO1FBSkcseUJBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQzNCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEzQmdCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0E0Qi9CO0lBQUQsa0JBQUM7Q0E1QkQsQUE0QkMsQ0E1QndDLEVBQUUsQ0FBQyxTQUFTLEdBNEJwRDtrQkE1Qm9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vLyDlvLnnqpcg6KeE5YiZ55WM6Z2iXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pSdWxlUG9wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGw6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIGFuaW1Db21wOiBhbnk7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5nZXRDb250ZW50U2l6ZSgpKTsgICAgIC8vIOmAgumFjVxyXG4gICAgICAgIHRoaXMubWFza05vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXNrXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAgPSBHbG9iYWwuVUlIZWxwZXIuYWRkQW5pbUNvbXAodGhpcy5ub2RlLCB0aGlzLmNvbnRlbnROb2RlLCB0aGlzLm1hc2tOb2RlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNjcm9sbCA9IHRoaXMuY29udGVudE5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJzY3JvbGx2aWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5jb250ZW50Tm9kZSwgXCJidXR0b25fY2xvc2VcIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza1wiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsLnNjcm9sbFRvVG9wKDApO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cE9wZW5BbmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQ2xpY2soKXtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwQ2xvc2VBbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=