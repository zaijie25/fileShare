
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzRewardAreaRootView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a912b8jsSdN16n6/weUAeap', 'BbwzRewardAreaRootView');
// bbwz/Bbwz/scripts/subview/BbwzRewardAreaRootView.ts

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
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
// betArea_mix betArea_dragon betArea_tiger 区域命名与下注区域标识字符串对应
// 由于与筹码的层级问题, 从BbwzBetAreaRootView剥离出来
var BbwzRewardAreaRootView = /** @class */ (function (_super) {
    __extends(BbwzRewardAreaRootView, _super);
    function BbwzRewardAreaRootView(node) {
        var _this = _super.call(this) || this;
        _this.areaMap = new Map;
        _this.setNode(node);
        return _this;
    }
    BbwzRewardAreaRootView.prototype.initView = function () {
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_NAME.length; i++) {
            var key = BbwzConstDefine_1.default.BET_AREA_NAME[i];
            var node = this.getChild("reward_" + key);
            var view = new RewardAreaView(node);
            view.active = true;
            this.areaMap.set(key, view);
        }
    };
    /**
     * 显示区域结算状态
     * @param areaName 区域名
     * @param point {"dealer": {win_multi: 4, ...}, fu: {win_multi: -4,...}, ...}
     * @param my_bet {"fu": 100, ...}
     */
    BbwzRewardAreaRootView.prototype.showAreaResult = function (areaName, point, my_bet) {
        if (!point || !point[areaName] || !this.areaMap.has(areaName))
            return;
        var area = this.areaMap.get(areaName);
        var data = point[areaName] || {};
        var isMyBet = !!my_bet[areaName];
        area.showReward(isMyBet, data.win_multi);
    };
    BbwzRewardAreaRootView.prototype.clearByRound = function () {
        this.areaMap.forEach(function (area) {
            area.reset();
        });
    };
    return BbwzRewardAreaRootView;
}(BbwzBaseView_1.default));
exports.default = BbwzRewardAreaRootView;
var RewardAreaView = /** @class */ (function (_super) {
    __extends(RewardAreaView, _super);
    function RewardAreaView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    RewardAreaView.prototype.initView = function () {
        this.rewardRoot = this.getChild("reward");
        this.rewardRoot.active = false;
        this.rewardSp = this.getComponent("reward/rewardSp", cc.Sprite);
        this.beishuSp = this.getComponent("reward/beishuSp", cc.Sprite);
        this.multLbl = this.getComponent("reward/multLbl", cc.Label);
        this.peaceRoot = this.getChild("peace");
        this.peaceRoot.active = false;
    };
    RewardAreaView.prototype.showReward = function (isSelfBet, multi) {
        if (!isSelfBet) { // 自己没下注就显示没有下注
            this.rewardRoot.active = false;
            this.peaceRoot.active = true;
        }
        else {
            this.rewardRoot.active = true;
            this.peaceRoot.active = false;
            var rewardSpStr = multi >= 0 ? "brjhn_ying" : "brjhn_shu";
            var beishuStr = multi >= 0 ? "num2_bei" : "num_bei";
            var multFontStr = multi >= 0 ? BbwzConstDefine_1.default.areaRewardFontStr.Win : BbwzConstDefine_1.default.areaRewardFontStr.Lose;
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.rewardSp, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", rewardSpStr, null, true);
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.beishuSp, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", beishuStr, null, true);
            this.multLbl.font = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + multFontStr, cc.Font);
            this.multLbl.string = String(multi);
        }
    };
    RewardAreaView.prototype.reset = function () {
        this.rewardRoot.active = false;
        this.peaceRoot.active = false;
    };
    return RewardAreaView;
}(BbwzBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3elJld2FyZEFyZWFSb290Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsMkRBQXNEO0FBQ3RELHlEQUFvRDtBQUVwRCw0REFBNEQ7QUFDNUQsdUNBQXVDO0FBQ3ZDO0lBQW9ELDBDQUFZO0lBRzVELGdDQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBTE8sYUFBTyxHQUFnQyxJQUFJLEdBQUcsQ0FBQztRQUluRCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMseUNBQVEsR0FBbEI7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcseUJBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLHlCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBVSxHQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDL0I7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSwrQ0FBYyxHQUFyQixVQUFzQixRQUFnQixFQUFFLEtBQVUsRUFBRSxNQUFXO1FBQzNELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENB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QUksQ0FBQyxRQUFRLEVBQUUsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsNkJBQTZCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6SyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyx5QkFBZSxDQUFDLE9BQU8sRUFBQyx3QkFBYyxDQUFDLGVBQWUsR0FBRyxxQkFBcUIsR0FBRyxXQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9KLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQTVDQSxBQTRDQyxDQTVDNEIsc0JBQVksR0E0Q3hDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcblxyXG4vLyBiZXRBcmVhX21peCBiZXRBcmVhX2RyYWdvbiBiZXRBcmVhX3RpZ2VyIOWMuuWfn+WRveWQjeS4juS4i+azqOWMuuWfn+agh+ivhuWtl+espuS4suWvueW6lFxyXG4vLyDnlLHkuo7kuI7nrbnnoIHnmoTlsYLnuqfpl67popgsIOS7jkJid3pCZXRBcmVhUm9vdFZpZXfliaXnprvlh7rmnaVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3elJld2FyZEFyZWFSb290VmlldyBleHRlbmRzIEJid3pCYXNlVmlld3tcclxuICAgIHByaXZhdGUgYXJlYU1hcDogTWFwPHN0cmluZywgUmV3YXJkQXJlYVZpZXc+ID0gbmV3IE1hcDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICBmb3IobGV0IGk9IDA7IGkgPCBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRVtpXTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKGByZXdhcmRfJHtrZXl9YCk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IFJld2FyZEFyZWFWaWV3KG5vZGUpO1xyXG4gICAgICAgICAgICB2aWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYU1hcC5zZXQoa2V5LCB2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrljLrln5/nu5PnrpfnirbmgIFcclxuICAgICAqIEBwYXJhbSBhcmVhTmFtZSDljLrln5/lkI1cclxuICAgICAqIEBwYXJhbSBwb2ludCB7XCJkZWFsZXJcIjoge3dpbl9tdWx0aTogNCwgLi4ufSwgZnU6IHt3aW5fbXVsdGk6IC00LC4uLn0sIC4uLn1cclxuICAgICAqIEBwYXJhbSBteV9iZXQge1wiZnVcIjogMTAwLCAuLi59XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93QXJlYVJlc3VsdChhcmVhTmFtZTogc3RyaW5nLCBwb2ludDogYW55LCBteV9iZXQ6IGFueSl7XHJcbiAgICAgICAgaWYgKCFwb2ludCB8fCAhcG9pbnRbYXJlYU5hbWVdIHx8ICF0aGlzLmFyZWFNYXAuaGFzKGFyZWFOYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBhcmVhID0gdGhpcy5hcmVhTWFwLmdldChhcmVhTmFtZSk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBwb2ludFthcmVhTmFtZV0gfHwge307XHJcbiAgICAgICAgbGV0IGlzTXlCZXQgPSAhIW15X2JldFthcmVhTmFtZV07XHJcbiAgICAgICAgYXJlYS5zaG93UmV3YXJkKGlzTXlCZXQsIGRhdGEud2luX211bHRpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5hcmVhTWFwLmZvckVhY2goYXJlYT0+e1xyXG4gICAgICAgICAgICBhcmVhLnJlc2V0KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUmV3YXJkQXJlYVZpZXcgZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIHJld2FyZFJvb3Q6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHJld2FyZFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIG11bHRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBiZWlzaHVTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBwZWFjZVJvb3Q6IGNjLk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRSb290ID0gdGhpcy5nZXRDaGlsZChcInJld2FyZFwiKTtcclxuICAgICAgICB0aGlzLnJld2FyZFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXdhcmRTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicmV3YXJkL3Jld2FyZFNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5iZWlzaHVTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicmV3YXJkL2JlaXNodVNwXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5tdWx0TGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJyZXdhcmQvbXVsdExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5wZWFjZVJvb3QgPSB0aGlzLmdldENoaWxkKFwicGVhY2VcIik7XHJcbiAgICAgICAgdGhpcy5wZWFjZVJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dSZXdhcmQoaXNTZWxmQmV0OiBib29sZWFuLCBtdWx0aTogbnVtYmVyKXtcclxuICAgICAgICBpZighaXNTZWxmQmV0KXsgICAgIC8vIOiHquW3seayoeS4i+azqOWwseaYvuekuuayoeacieS4i+azqFxyXG4gICAgICAgICAgICB0aGlzLnJld2FyZFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGVhY2VSb290LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmV3YXJkUm9vdC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBlYWNlUm9vdC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHJld2FyZFNwU3RyID0gbXVsdGkgPj0gMCA/IFwiYnJqaG5feWluZ1wiIDogXCJicmpobl9zaHVcIjtcclxuICAgICAgICAgICAgbGV0IGJlaXNodVN0ciA9IG11bHRpID49IDAgPyBcIm51bTJfYmVpXCIgOiBcIm51bV9iZWlcIjtcclxuICAgICAgICAgICAgbGV0IG11bHRGb250U3RyID0gbXVsdGkgPj0gMCA/IEJid3pDb25zdERlZmluZS5hcmVhUmV3YXJkRm9udFN0ci5XaW4gOiBCYnd6Q29uc3REZWZpbmUuYXJlYVJld2FyZEZvbnRTdHIuTG9zZTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEJid3pDb25zdERlZmluZS5HQU1FX0lELHRoaXMucmV3YXJkU3AsIEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZHluYW1pYy9hdGxhc19keW5hbWljXCIsIHJld2FyZFNwU3RyLCBudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKEJid3pDb25zdERlZmluZS5HQU1FX0lELHRoaXMuYmVpc2h1U3AsIEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZHluYW1pYy9hdGxhc19keW5hbWljXCIsIGJlaXNodVN0ciwgbnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdExibC5mb250ID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsQmJ3elBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9keW5hbWljL2ZvbnQvXCIgKyBtdWx0Rm9udFN0ciwgY2MuRm9udCk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdExibC5zdHJpbmcgPSBTdHJpbmcobXVsdGkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnJld2FyZFJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wZWFjZVJvb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=