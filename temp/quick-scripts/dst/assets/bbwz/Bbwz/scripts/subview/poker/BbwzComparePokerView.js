
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/poker/BbwzComparePokerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '390c3sgKRhIL7E/5FgzmT+C', 'BbwzComparePokerView');
// bbwz/Bbwz/scripts/subview/poker/BbwzComparePokerView.ts

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
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPokerGroupView_1 = require("./BbwzPokerGroupView");
var BbwzComparePokerView = /** @class */ (function (_super) {
    __extends(BbwzComparePokerView, _super);
    function BbwzComparePokerView(node) {
        var _this = _super.call(this) || this;
        _this.groupMap = new Map;
        _this.setNode(node);
        return _this;
    }
    BbwzComparePokerView.prototype.initView = function () {
        for (var i = 0; i < BbwzConstDefine_1.default.GROUP_DEFINE.length; i++) {
            var key = BbwzConstDefine_1.default.GROUP_DEFINE[i];
            var groupNode = this.getChild("content/compare/group_" + key);
            var group = new BbwzPokerGroupView_1.default(groupNode, key);
            group.active = false;
            this.groupMap.set(key, group);
        }
        var dealRoot = this.getChild("content/dealRoot");
        this.dealWorldPos = dealRoot.parent.convertToWorldSpaceAR(dealRoot.position);
    };
    BbwzComparePokerView.prototype.doOneGroupPokersFirstDeal = function (groupKey, needPlay, callback) {
        if (!this.groupMap.has(groupKey))
            return;
        var group = this.groupMap.get(groupKey);
        group.active = true;
        group.showGroupPokers(true, false); // 显示牌背
        if (needPlay) {
            group.doFirstDeal(this.dealWorldPos, 0.15, 0, callback);
        }
        else {
            group.doFirstDealDirectly();
            if (callback)
                callback();
        }
    };
    BbwzComparePokerView.prototype.doOneGroupPokersFlop = function (groupKey, pointJson, needPlay) {
        var group = this.groupMap.get(groupKey);
        if (group && pointJson[groupKey]) {
            var groupData = pointJson[groupKey];
            if (needPlay)
                group.showDownPoker(groupData.poker, groupData.type, groupData.multi, 0, 1);
            else {
                group.setGroupPokerValue(groupData.poker, groupData.type, groupData.multi); // 设置牌面
                group.flopPokersDirectly();
            }
            // group.setGroupPokerValue(groupData.poker, groupData.type, groupData.multi);      // 设置牌面
            // if (needPlay){
            //     group.flopPokers(0.35);
            // }
            // else
            //     group.flopPokersDirectly();
        }
    };
    BbwzComparePokerView.prototype.doAllGroupPokersFirstDeal = function () {
        this.groupMap.forEach(function (group) {
            group.active = true;
            group.showGroupPokers(true, false); // 显示牌背
            group.doFirstDealDirectly();
        });
    };
    BbwzComparePokerView.prototype.doAllGroupPokerDispatch = function (needPlay, pointJson) {
        this.groupMap.forEach(function (group, key) {
            if (pointJson[key]) {
                var groupData = pointJson[key];
                group.setGroupPokerValue(groupData.src_poker, groupData.type, groupData.multi);
            }
            if (needPlay) {
                group.doDispatch(0.15);
            }
            else {
                group.dispatchPokersDirectly();
                group.showGroupPokers(true, true);
            }
        });
    };
    /**
     * 播报牌型点数
     * @param isPlay 是否播放
     * @param groupKey 手牌堆标识
     */
    BbwzComparePokerView.prototype.playPointSound = function (isPlay, groupKey) {
        if (isPlay) {
            var group = this.groupMap.get(groupKey);
            if (group) {
                group.playTypeSound();
            }
        }
    };
    BbwzComparePokerView.prototype.clearByRound = function () {
        this.groupMap.forEach(function (group) {
            group.reset();
            group.active = false;
        });
        this.active = false;
    };
    return BbwzComparePokerView;
}(BbwzBaseView_1.default));
exports.default = BbwzComparePokerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccG9rZXJcXEJid3pDb21wYXJlUG9rZXJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyw4REFBeUQ7QUFDekQsMkRBQXNEO0FBRXREO0lBQWtELHdDQUFZO0lBSTFELDhCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBTk8sY0FBUSxHQUFvQyxJQUFJLEdBQUcsQ0FBQztRQUt4RCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsdUNBQVEsR0FBbEI7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcseUJBQWUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLHlCQUFlLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQXlCLEdBQUssQ0FBQyxDQUFDO1lBQzlELElBQUksS0FBSyxHQUFHLElBQUksNEJBQWtCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25ELEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUNELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFTSx3REFBeUIsR0FBaEMsVUFBaUMsUUFB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QUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksS0FBSyxFQUFDO2dCQUNOLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVNLDJDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNMLDJCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsQ0FyR2lELHNCQUFZLEdBcUc3RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4uL0Jid3pCYXNlVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3elBva2VyR3JvdXBWaWV3IGZyb20gXCIuL0Jid3pQb2tlckdyb3VwVmlld1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekNvbXBhcmVQb2tlclZpZXcgZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGdyb3VwTWFwOiBNYXA8c3RyaW5nLCBCYnd6UG9rZXJHcm91cFZpZXc+ID0gbmV3IE1hcDtcclxuICAgIHByaXZhdGUgZGVhbFdvcmxkUG9zOiBjYy5WZWMyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBCYnd6Q29uc3REZWZpbmUuR1JPVVBfREVGSU5FLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IEJid3pDb25zdERlZmluZS5HUk9VUF9ERUZJTkVbaV07XHJcbiAgICAgICAgICAgIGxldCBncm91cE5vZGUgPSB0aGlzLmdldENoaWxkKGBjb250ZW50L2NvbXBhcmUvZ3JvdXBfJHtrZXl9YCk7XHJcbiAgICAgICAgICAgIGxldCBncm91cCA9IG5ldyBCYnd6UG9rZXJHcm91cFZpZXcoZ3JvdXBOb2RlLCBrZXkpO1xyXG4gICAgICAgICAgICBncm91cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ncm91cE1hcC5zZXQoa2V5LCBncm91cCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkZWFsUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2RlYWxSb290XCIpO1xyXG4gICAgICAgIHRoaXMuZGVhbFdvcmxkUG9zID0gZGVhbFJvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihkZWFsUm9vdC5wb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvT25lR3JvdXBQb2tlcnNGaXJzdERlYWwoZ3JvdXBLZXk6IHN0cmluZywgbmVlZFBsYXk6IGJvb2xlYW4sIGNhbGxiYWNrPzogRnVuY3Rpb24pe1xyXG4gICAgICAgIGlmICghdGhpcy5ncm91cE1hcC5oYXMoZ3JvdXBLZXkpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5ncm91cE1hcC5nZXQoZ3JvdXBLZXkpO1xyXG4gICAgICAgIGdyb3VwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZ3JvdXAuc2hvd0dyb3VwUG9rZXJzKHRydWUsIGZhbHNlKTsgICAgIC8vIOaYvuekuueJjOiDjFxyXG4gICAgICAgIGlmIChuZWVkUGxheSl7XHJcbiAgICAgICAgICAgIGdyb3VwLmRvRmlyc3REZWFsKHRoaXMuZGVhbFdvcmxkUG9zLCAwLjE1LCAwLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGdyb3VwLmRvRmlyc3REZWFsRGlyZWN0bHkoKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvT25lR3JvdXBQb2tlcnNGbG9wKGdyb3VwS2V5OiBzdHJpbmcsIHBvaW50SnNvbjogYW55LCBuZWVkUGxheTogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5ncm91cE1hcC5nZXQoZ3JvdXBLZXkpO1xyXG4gICAgICAgIGlmIChncm91cCAmJiBwb2ludEpzb25bZ3JvdXBLZXldKXtcclxuICAgICAgICAgICAgbGV0IGdyb3VwRGF0YSA9IHBvaW50SnNvbltncm91cEtleV07XHJcbiAgICAgICAgICAgIGlmIChuZWVkUGxheSlcclxuICAgICAgICAgICAgICAgIGdyb3VwLnNob3dEb3duUG9rZXIoZ3JvdXBEYXRhLnBva2VyLCBncm91cERhdGEudHlwZSwgZ3JvdXBEYXRhLm11bHRpLCAwLCAxKTtcclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGdyb3VwLnNldEdyb3VwUG9rZXJWYWx1ZShncm91cERhdGEucG9rZXIsIGdyb3VwRGF0YS50eXBlLCBncm91cERhdGEubXVsdGkpOyAgICAgIC8vIOiuvue9rueJjOmdolxyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZmxvcFBva2Vyc0RpcmVjdGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZ3JvdXAuc2V0R3JvdXBQb2tlclZhbHVlKGdyb3VwRGF0YS5wb2tlciwgZ3JvdXBEYXRhLnR5cGUsIGdyb3VwRGF0YS5tdWx0aSk7ICAgICAgLy8g6K6+572u54mM6Z2iXHJcbiAgICAgICAgICAgIC8vIGlmIChuZWVkUGxheSl7XHJcbiAgICAgICAgICAgIC8vICAgICBncm91cC5mbG9wUG9rZXJzKDAuMzUpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2VcclxuICAgICAgICAgICAgLy8gICAgIGdyb3VwLmZsb3BQb2tlcnNEaXJlY3RseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9BbGxHcm91cFBva2Vyc0ZpcnN0RGVhbCgpe1xyXG4gICAgICAgIHRoaXMuZ3JvdXBNYXAuZm9yRWFjaChncm91cD0+e1xyXG4gICAgICAgICAgICBncm91cC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBncm91cC5zaG93R3JvdXBQb2tlcnModHJ1ZSwgZmFsc2UpOyAgICAgLy8g5pi+56S654mM6IOMXHJcbiAgICAgICAgICAgIGdyb3VwLmRvRmlyc3REZWFsRGlyZWN0bHkoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb0FsbEdyb3VwUG9rZXJEaXNwYXRjaChuZWVkUGxheTogYm9vbGVhbiwgcG9pbnRKc29uOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuZ3JvdXBNYXAuZm9yRWFjaCgoZ3JvdXAsIGtleSk9PntcclxuICAgICAgICAgICAgaWYgKHBvaW50SnNvbltrZXldKXtcclxuICAgICAgICAgICAgICAgIGxldCBncm91cERhdGEgPSBwb2ludEpzb25ba2V5XTtcclxuICAgICAgICAgICAgICAgIGdyb3VwLnNldEdyb3VwUG9rZXJWYWx1ZShncm91cERhdGEuc3JjX3Bva2VyLCBncm91cERhdGEudHlwZSwgZ3JvdXBEYXRhLm11bHRpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmVlZFBsYXkpe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZG9EaXNwYXRjaCgwLjE1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuZGlzcGF0Y2hQb2tlcnNEaXJlY3RseSgpO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAuc2hvd0dyb3VwUG9rZXJzKHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3miqXniYzlnovngrnmlbBcclxuICAgICAqIEBwYXJhbSBpc1BsYXkg5piv5ZCm5pKt5pS+XHJcbiAgICAgKiBAcGFyYW0gZ3JvdXBLZXkg5omL54mM5aCG5qCH6K+GXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5UG9pbnRTb3VuZChpc1BsYXk6IGJvb2xlYW4sIGdyb3VwS2V5OiBzdHJpbmcpe1xyXG4gICAgICAgIGlmIChpc1BsYXkpIHtcclxuICAgICAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5ncm91cE1hcC5nZXQoZ3JvdXBLZXkpO1xyXG4gICAgICAgICAgICBpZiAoZ3JvdXApe1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAucGxheVR5cGVTb3VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmdyb3VwTWFwLmZvckVhY2goZ3JvdXA9PntcclxuICAgICAgICAgICAgZ3JvdXAucmVzZXQoKTtcclxuICAgICAgICAgICAgZ3JvdXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==