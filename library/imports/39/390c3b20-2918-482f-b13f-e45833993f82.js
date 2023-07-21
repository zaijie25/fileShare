"use strict";
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