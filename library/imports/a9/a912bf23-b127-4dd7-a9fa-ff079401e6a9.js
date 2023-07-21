"use strict";
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