
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/poker/BbwzPokerGroupView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '83043+ytANHRZahvsojTBdl', 'BbwzPokerGroupView');
// bbwz/Bbwz/scripts/subview/poker/BbwzPokerGroupView.ts

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
var BbwzPokerView_1 = require("./BbwzPokerView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPokerTypeView_1 = require("./BbwzPokerTypeView");
var BbwzPokerTool_1 = require("../../tool/BbwzPokerTool");
var BbwzPokerGroupView = /** @class */ (function (_super) {
    __extends(BbwzPokerGroupView, _super);
    function BbwzPokerGroupView(node, name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.pokerList = [];
        _this.setNode(node);
        return _this;
    }
    BbwzPokerGroupView.prototype.initView = function () {
        for (var i = 0; i < BbwzConstDefine_1.default.GROUP_POKER_COUNT; i++) {
            var node = this.getChild("poker" + i);
            var view = new BbwzPokerView_1.default(node);
            this.pokerList.push(view);
        }
        if (BbwzConstDefine_1.default.checkZjhGroup(this.name)) {
            this.pokerTypeView = new BbwzPokerTypeView_1.BbwzZjhPokerTypeView(this.getChild("zjhPokerType"));
            this.pokerTypeView.active = false;
        }
        else {
            this.pokerTypeView = new BbwzPokerTypeView_1.BbwzBullPokerTypeView(this.getChild("bullPokerType"));
            this.pokerTypeView.active = false;
        }
        var transferNode = this.getChild("transferPoint");
        var centerIndex = Math.floor(BbwzConstDefine_1.default.GROUP_POKER_COUNT / 2); // 索引0开始
        this.transferPosOffset = transferNode.position.sub(this.pokerList[centerIndex].getRawPos());
    };
    /**
     * 显示所有手牌
     * @param isShow 是否显示
     * @param isFront 是否正面 默认背面
     */
    BbwzPokerGroupView.prototype.showGroupPokers = function (isShow, isFront) {
        if (isFront === void 0) { isFront = false; }
        this.pokerList.forEach(function (poker) {
            poker.active = isShow;
            poker.isFront = isFront;
        });
    };
    BbwzPokerGroupView.prototype.doFirstDeal = function (fromWPos, timeScale, delay, callback) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var fromPos = this.node.convertToNodeSpaceAR(fromWPos);
        this.pokerList.forEach(function (poker, index) {
            var endPos = poker.getRawPos().add(_this.transferPosOffset);
            poker.active = true;
            poker.doPokerMove(fromPos, endPos, timeScale, delay + 0.05 * (index - 1), (index == _this.pokerList.length - 1) && callback, index % 3 == 0, null, false);
        });
    };
    BbwzPokerGroupView.prototype.doFirstDealDirectly = function () {
        var _this = this;
        this.pokerList.forEach(function (poker) {
            var endPos = poker.getRawPos().add(_this.transferPosOffset);
            poker.active = true;
            poker.node.setPosition(endPos);
        });
    };
    BbwzPokerGroupView.prototype.doDispatch = function (dealTime) {
        var delay = 0;
        this.pokerList.forEach(function (poker, index) {
            var fromPos = poker.node.position;
            poker.active = true;
            poker.doPokerMove(fromPos, poker.getRawPos(), dealTime, delay + 0.05 * (index - 1), function () {
                // poker.showPokerEasyAnim(null, flopTime);
                poker.isFront = true;
            }, index % 3 == 0, null, true);
        });
    };
    BbwzPokerGroupView.prototype.dispatchPokersDirectly = function () {
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.isFront = false;
            poker.node.setPosition(poker.getRawPos());
        });
    };
    BbwzPokerGroupView.prototype.showDownPoker = function (data, type, multi, delay, showTime) {
        var _this = this;
        if (data === void 0) { data = []; }
        if (delay === void 0) { delay = 0; }
        if (showTime === void 0) { showTime = 1; }
        var collectTime = 0.3;
        var tween = Game.Tween.get(this.node);
        tween.delay(delay)
            .call(function () {
            _this.collectInCenter(collectTime / 2);
        })
            .delay(collectTime / 2)
            .call(function () {
            _this.setGroupPokerValue(data, type, multi);
            _this.collectInCenter(collectTime / 2, true);
        })
            .delay(collectTime / 2)
            .call(function () {
            _this.playTypeSound();
            _this.pokerTypeView.active = true;
            _this.pokerTypeView.setPokerTypeStyle(_this.pokerType, _this.pokerMulti); // 时机未细调
            if (BbwzPokerTool_1.default.checkIsThreeWithTwo(_this.pokerType)) {
                _this.placeThreeWithTwo(true);
            }
        })
            .delay(showTime - collectTime)
            .start();
    };
    BbwzPokerGroupView.prototype.collectInCenter = function (timeScale, isReserve) {
        if (isReserve === void 0) { isReserve = false; }
        var to = this.pokerList[2].getRawPos();
        if (isReserve) {
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_SHOWDOWN, true);
        }
        this.pokerList.forEach(function (poker) {
            var from = poker.getRawPos();
            if (!isReserve) {
                poker.doPokerMove(from, to, timeScale);
            }
            else {
                poker.doPokerMove(to, from, timeScale, 0, null, false, cc.easeBackOut());
            }
        });
    };
    BbwzPokerGroupView.prototype.placeThreeWithTwo = function (isAnim) {
        for (var i = 0; i <= this.pokerList.length - 1; i++) {
            var poker = this.pokerList[i];
            var from = poker.getRawPos();
            if (i >= 1 && i <= 2) {
                if (isAnim)
                    poker.doPokerMove(from, cc.v2(from.x - 5 * i, from.y), 0.2, 0);
                else
                    poker.node.setPosition(cc.v2(from.x - 5 * i, from.y));
            }
            else if (i == 3) {
                if (isAnim)
                    poker.doPokerMove(from, cc.v2(from.x + 5, from.y), 0.2, 0);
                else
                    poker.node.setPosition(cc.v2(from.x + 5, from.y));
            }
            else {
                poker.node.setPosition(from);
            }
        }
    };
    /**
     * 设置手牌数组和牌型
     * @param dataList 手牌数组
     * @param pokerType 手牌牌型
     */
    BbwzPokerGroupView.prototype.setGroupPokerValue = function (dataList, pokerType, pokerMulti) {
        var _this = this;
        if (pokerType === void 0) { pokerType = 0; }
        if (pokerMulti === void 0) { pokerMulti = 0; }
        this.pokerType = pokerType;
        this.pokerMulti = pokerMulti;
        this.pokerDataList = dataList;
        this.pokerList.forEach(function (poker, i) {
            if (_this.pokerDataList[i]) {
                poker.pokerValue = _this.pokerDataList[i];
            }
        });
    };
    /**
     * 翻牌动作
     * @param callback 播完动作钩子
     * @param timeScale 时长
     * @param delay 延时
     */
    BbwzPokerGroupView.prototype.flopPokers = function (timeScale, delay, callback) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.showPokerEasyAnim(callback, timeScale, delay, false);
        });
        // 翻牌播放五次可能导致别的声音播不出来
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        Game.Component.scheduleOnce(function () {
            _this.playTypeSound();
            _this.pokerTypeView.active = true;
            _this.pokerTypeView.setPokerTypeStyle(_this.pokerType, _this.pokerMulti); // 时机未细调
            if (BbwzPokerTool_1.default.checkIsThreeWithTwo(_this.pokerType)) {
                _this.placeThreeWithTwo(true);
            }
        }, timeScale + (this.pokerList.length - 1) * delay);
    };
    /**
     * 直接显示牌面 不翻转动画
     */
    BbwzPokerGroupView.prototype.flopPokersDirectly = function () {
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.isFront = true;
            poker.node.setPosition(poker.getRawPos());
        });
        this.pokerTypeView.active = true;
        this.pokerTypeView.setPokerTypeStyle(this.pokerType, this.pokerMulti);
        if (BbwzPokerTool_1.default.checkIsThreeWithTwo(this.pokerType)) {
            this.placeThreeWithTwo(false);
        }
    };
    /**
     * 播放牌型音效
     * @param soundArr 牌型音效列表
     */
    BbwzPokerGroupView.prototype.playTypeSound = function () {
        var soundArr = BbwzConstDefine_1.default.getGroupTypeSoundArr(this.name);
        if (soundArr) {
            var res = soundArr[this.pokerType];
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, res, true);
        }
    };
    BbwzPokerGroupView.prototype.reset = function () {
        this.pokerList.forEach(function (poker) {
            poker.reset();
            poker.active = false;
        });
        this.pokerTypeView.active = false;
    };
    return BbwzPokerGroupView;
}(BbwzBaseView_1.default));
exports.default = BbwzPokerGroupView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccG9rZXJcXEJid3pQb2tlckdyb3VwVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsaURBQTRDO0FBQzVDLDhEQUF5RDtBQUN6RCx5REFBcUc7QUFDckcsMERBQXFEO0FBRXJEO0lBQWdELHNDQUFZO0lBU3hELDRCQUFZLElBQWEsRUFBUyxJQUFZO1FBQTlDLFlBQ0ksaUJBQU8sU0FFVjtRQUhpQyxVQUFJLEdBQUosSUFBSSxDQUFRO1FBUnZDLGVBQVMsR0FBb0IsRUFBRSxDQUFDO1FBVW5DLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxxQ0FBUSxHQUFsQjtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx5QkFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3ZELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBUSxDQUFHLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLHVCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLHlCQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN6QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksd0NBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNyQzthQUNHO1lBQ0EsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHlDQUFxQixDQUFDLElBQUksQ0FB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LElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksdUJBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUM7WUFDbEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDBDQUFhLEdBQXBCO1FBQ0ksSUFBSSxRQUFRLEdBQUcseUJBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxRQUFRLEVBQUM7WUFDVCxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLHlCQUFlLENBQUMsT0FBTyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuRTtJQUNMLENBQUM7SUFFTSxrQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3hCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFDTCx5QkFBQztBQUFELENBL05BLEFBK05DLENBL04rQyxzQkFBWSxHQStOM0QiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekJhc2VWaWV3IGZyb20gXCIuLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pQb2tlclZpZXcgZnJvbSBcIi4vQmJ3elBva2VyVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3elBva2VyVHlwZVZpZXcsIHsgQmJ3elpqaFBva2VyVHlwZVZpZXcsIEJid3pCdWxsUG9rZXJUeXBlVmlldyB9IGZyb20gXCIuL0Jid3pQb2tlclR5cGVWaWV3XCI7XHJcbmltcG9ydCBCYnd6UG9rZXJUb29sIGZyb20gXCIuLi8uLi90b29sL0Jid3pQb2tlclRvb2xcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pQb2tlckdyb3VwVmlldyBleHRlbmRzIEJid3pCYXNlVmlld3tcclxuICAgIHB1YmxpYyBwb2tlckxpc3Q6IEJid3pQb2tlclZpZXdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBwb2tlclR5cGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcG9rZXJEYXRhTGlzdDogbnVtYmVyW107XHJcbiAgICBwcml2YXRlIHBva2VyTXVsdGk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgcG9rZXJUeXBlVmlldzogQmJ3elBva2VyVHlwZVZpZXc7XHJcbiAgICAvKiog56ys5LiA5qyh5Y+R54mM5Lit5b+D54mM5Y+C6ICD54K55Z2Q5qCH5YGP56e7LCDnlKjkuo7orqHnrpfnrKzkuIDmrKHlj5HniYzlnZDmoIcgKi9cclxuICAgIHByaXZhdGUgdHJhbnNmZXJQb3NPZmZzZXQ6IGNjLlZlYzI7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHVibGljIG5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCYnd6Q29uc3REZWZpbmUuR1JPVVBfUE9LRVJfQ09VTlQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRDaGlsZChgcG9rZXIke2l9YCk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEJid3pQb2tlclZpZXcobm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJMaXN0LnB1c2godmlldyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQmJ3ekNvbnN0RGVmaW5lLmNoZWNrWmpoR3JvdXAodGhpcy5uYW1lKSl7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJUeXBlVmlldyA9IG5ldyBCYnd6WmpoUG9rZXJUeXBlVmlldyh0aGlzLmdldENoaWxkKFwiempoUG9rZXJUeXBlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5wb2tlclR5cGVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBva2VyVHlwZVZpZXcgPSBuZXcgQmJ3ekJ1bGxQb2tlclR5cGVWaWV3KHRoaXMuZ2V0Q2hpbGQoXCJidWxsUG9rZXJUeXBlXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5wb2tlclR5cGVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyYW5zZmVyTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJ0cmFuc2ZlclBvaW50XCIpO1xyXG4gICAgICAgIGxldCBjZW50ZXJJbmRleCA9IE1hdGguZmxvb3IoQmJ3ekNvbnN0RGVmaW5lLkdST1VQX1BPS0VSX0NPVU5UIC8gMik7ICAgIC8vIOe0ouW8lTDlvIDlp4tcclxuICAgICAgICB0aGlzLnRyYW5zZmVyUG9zT2Zmc2V0ID0gdHJhbnNmZXJOb2RlLnBvc2l0aW9uLnN1Yih0aGlzLnBva2VyTGlzdFtjZW50ZXJJbmRleF0uZ2V0UmF3UG9zKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65omA5pyJ5omL54mMXHJcbiAgICAgKiBAcGFyYW0gaXNTaG93IOaYr+WQpuaYvuekulxyXG4gICAgICogQHBhcmFtIGlzRnJvbnQg5piv5ZCm5q2j6Z2iIOm7mOiupOiDjOmdolxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0dyb3VwUG9rZXJzKGlzU2hvdzogYm9vbGVhbiwgaXNGcm9udDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKHBva2VyPT57XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgICAgICAgICAgcG9rZXIuaXNGcm9udCA9IGlzRnJvbnQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvRmlyc3REZWFsKGZyb21XUG9zOiBjYy5WZWMyLCB0aW1lU2NhbGU6IG51bWJlciwgZGVsYXk6IG51bWJlciA9IDAsIGNhbGxiYWNrPzogRnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBmcm9tUG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGZyb21XUG9zKTtcclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKChwb2tlciwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSBwb2tlci5nZXRSYXdQb3MoKS5hZGQodGhpcy50cmFuc2ZlclBvc09mZnNldCk7XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHBva2VyLmRvUG9rZXJNb3ZlKGZyb21Qb3MsIGVuZFBvcywgdGltZVNjYWxlLCBkZWxheSArIDAuMDUgKiAoaW5kZXggLSAxKSwgKGluZGV4ID09IHRoaXMucG9rZXJMaXN0Lmxlbmd0aCAtIDEpICYmIGNhbGxiYWNrLCBpbmRleCAlIDMgPT0gMCwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb0ZpcnN0RGVhbERpcmVjdGx5KCl7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaChwb2tlcj0+e1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gcG9rZXIuZ2V0UmF3UG9zKCkuYWRkKHRoaXMudHJhbnNmZXJQb3NPZmZzZXQpO1xyXG4gICAgICAgICAgICBwb2tlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwb2tlci5ub2RlLnNldFBvc2l0aW9uKGVuZFBvcyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9EaXNwYXRjaChkZWFsVGltZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgZGVsYXkgPSAwO1xyXG4gICAgICAgIHRoaXMucG9rZXJMaXN0LmZvckVhY2goKHBva2VyLCBpbmRleCk9PntcclxuICAgICAgICAgICAgbGV0IGZyb21Qb3MgPSBwb2tlci5ub2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBwb2tlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwb2tlci5kb1Bva2VyTW92ZShmcm9tUG9zLCBwb2tlci5nZXRSYXdQb3MoKSwgZGVhbFRpbWUsIGRlbGF5ICsgMC4wNSAqIChpbmRleCAtIDEpLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rZXIuc2hvd1Bva2VyRWFzeUFuaW0obnVsbCwgZmxvcFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIGluZGV4ICUgMyA9PSAwLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hQb2tlcnNEaXJlY3RseSgpe1xyXG4gICAgICAgIHRoaXMucG9rZXJMaXN0LmZvckVhY2goKHBva2VyLCBpbmRleCk9PntcclxuICAgICAgICAgICAgcG9rZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcG9rZXIuaXNGcm9udCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBwb2tlci5ub2RlLnNldFBvc2l0aW9uKHBva2VyLmdldFJhd1BvcygpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0Rvd25Qb2tlcihkYXRhID0gW10sIHR5cGU6IG51bWJlciwgbXVsdGk6IG51bWJlciwgZGVsYXkgPSAwLCBzaG93VGltZSA9IDEpe1xyXG4gICAgICAgIGxldCBjb2xsZWN0VGltZSA9IDAuMztcclxuICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5KVxyXG4gICAgICAgIC5jYWxsKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEluQ2VudGVyKGNvbGxlY3RUaW1lIC8yKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheShjb2xsZWN0VGltZSAvMilcclxuICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEdyb3VwUG9rZXJWYWx1ZShkYXRhLCB0eXBlLCBtdWx0aSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEluQ2VudGVyKGNvbGxlY3RUaW1lIC8yLCB0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kZWxheShjb2xsZWN0VGltZSAvMilcclxuICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlUeXBlU291bmQoKTtcclxuICAgICAgICAgICAgdGhpcy5wb2tlclR5cGVWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJUeXBlVmlldy5zZXRQb2tlclR5cGVTdHlsZSh0aGlzLnBva2VyVHlwZSwgdGhpcy5wb2tlck11bHRpKTsgICAgICAvLyDml7bmnLrmnKrnu4bosINcclxuICAgICAgICAgICAgaWYgKEJid3pQb2tlclRvb2wuY2hlY2tJc1RocmVlV2l0aFR3byh0aGlzLnBva2VyVHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZVRocmVlV2l0aFR3byh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRlbGF5KHNob3dUaW1lIC0gY29sbGVjdFRpbWUpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb2xsZWN0SW5DZW50ZXIodGltZVNjYWxlLCBpc1Jlc2VydmUgPSBmYWxzZSl7XHJcbiAgICAgICAgbGV0IHRvID0gdGhpcy5wb2tlckxpc3RbMl0uZ2V0UmF3UG9zKCk7XHJcbiAgICAgICAgaWYoaXNSZXNlcnZlKXtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfU0hPV0RPV04sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKHBva2VyID0+IHtcclxuICAgICAgICAgICAgbGV0IGZyb20gPSBwb2tlci5nZXRSYXdQb3MoKTtcclxuICAgICAgICAgICAgaWYgKCFpc1Jlc2VydmUpe1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuZG9Qb2tlck1vdmUoZnJvbSwgdG8sIHRpbWVTY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHBva2VyLmRvUG9rZXJNb3ZlKHRvLCBmcm9tLCB0aW1lU2NhbGUsIDAsIG51bGwsIGZhbHNlLCBjYy5lYXNlQmFja091dCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwbGFjZVRocmVlV2l0aFR3byhpc0FuaW06IGJvb2xlYW4pe1xyXG4gICAgICAgIGZvcihsZXQgaT0gMDsgaSA8PSB0aGlzLnBva2VyTGlzdC5sZW5ndGgtMTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy5wb2tlckxpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBmcm9tID0gcG9rZXIuZ2V0UmF3UG9zKCk7XHJcbiAgICAgICAgICAgIGlmIChpID49MSAmJiBpIDw9IDIpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQW5pbSlcclxuICAgICAgICAgICAgICAgICAgICBwb2tlci5kb1Bva2VyTW92ZShmcm9tLCBjYy52Mihmcm9tLnggLSA1ICogaSwgZnJvbS55KSwgMC4yLCAwKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBwb2tlci5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKGZyb20ueCAtIDUgKiBpLCBmcm9tLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGkgPT0gMyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBbmltKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLmRvUG9rZXJNb3ZlKGZyb20sIGNjLnYyKGZyb20ueCArIDUsIGZyb20ueSksIDAuMiwgMCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIubm9kZS5zZXRQb3NpdGlvbihjYy52Mihmcm9tLnggKyA1LCBmcm9tLnkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcG9rZXIubm9kZS5zZXRQb3NpdGlvbihmcm9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruaJi+eJjOaVsOe7hOWSjOeJjOWei1xyXG4gICAgICogQHBhcmFtIGRhdGFMaXN0IOaJi+eJjOaVsOe7hFxyXG4gICAgICogQHBhcmFtIHBva2VyVHlwZSDmiYvniYzniYzlnotcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEdyb3VwUG9rZXJWYWx1ZShkYXRhTGlzdDogbnVtYmVyW10sIHBva2VyVHlwZTogbnVtYmVyID0gMCwgcG9rZXJNdWx0aTogbnVtYmVyID0gMCl7XHJcbiAgICAgICAgdGhpcy5wb2tlclR5cGUgPSBwb2tlclR5cGU7XHJcbiAgICAgICAgdGhpcy5wb2tlck11bHRpID0gcG9rZXJNdWx0aTtcclxuICAgICAgICB0aGlzLnBva2VyRGF0YUxpc3QgPSBkYXRhTGlzdDtcclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKChwb2tlciwgaSk9PntcclxuICAgICAgICAgICAgaWYgKHRoaXMucG9rZXJEYXRhTGlzdFtpXSl7XHJcbiAgICAgICAgICAgICAgICBwb2tlci5wb2tlclZhbHVlID0gdGhpcy5wb2tlckRhdGFMaXN0W2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnv7vniYzliqjkvZxcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDmkq3lrozliqjkvZzpkqnlrZBcclxuICAgICAqIEBwYXJhbSB0aW1lU2NhbGUg5pe26ZW/XHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5bu25pe2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmbG9wUG9rZXJzKHRpbWVTY2FsZSA9IDEsIGRlbGF5ID0gMCwgY2FsbGJhY2s/OiBGdW5jdGlvbil7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaCgocG9rZXIsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBwb2tlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwb2tlci5zaG93UG9rZXJFYXN5QW5pbShjYWxsYmFjaywgdGltZVNjYWxlLCBkZWxheSwgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g57+754mM5pKt5pS+5LqU5qyh5Y+v6IO95a+86Ie05Yir55qE5aOw6Z+z5pKt5LiN5Ye65p2lXHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfWkhFTkdQQUksIHRydWUpO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnVuZGxlU291bmQoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsQmJ3ekNvbnN0RGVmaW5lLlNPVU5EX1pIRU5HUEFJLCB0cnVlKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5wbGF5VHlwZVNvdW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJUeXBlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBva2VyVHlwZVZpZXcuc2V0UG9rZXJUeXBlU3R5bGUodGhpcy5wb2tlclR5cGUsIHRoaXMucG9rZXJNdWx0aSk7ICAgICAgLy8g5pe25py65pyq57uG6LCDXHJcbiAgICAgICAgICAgIGlmIChCYnd6UG9rZXJUb29sLmNoZWNrSXNUaHJlZVdpdGhUd28odGhpcy5wb2tlclR5cGUpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VUaHJlZVdpdGhUd28odHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0aW1lU2NhbGUgKyAodGhpcy5wb2tlckxpc3QubGVuZ3RoIC0gMSkgKiBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm7TmjqXmmL7npLrniYzpnaIg5LiN57+76L2s5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmbG9wUG9rZXJzRGlyZWN0bHkoKXtcclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKChwb2tlciwgaW5kZXgpPT57XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHBva2VyLmlzRnJvbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwb2tlci5ub2RlLnNldFBvc2l0aW9uKHBva2VyLmdldFJhd1BvcygpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wb2tlclR5cGVWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wb2tlclR5cGVWaWV3LnNldFBva2VyVHlwZVN0eWxlKHRoaXMucG9rZXJUeXBlLCB0aGlzLnBva2VyTXVsdGkpO1xyXG4gICAgICAgIGlmIChCYnd6UG9rZXJUb29sLmNoZWNrSXNUaHJlZVdpdGhUd28odGhpcy5wb2tlclR5cGUpKXtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZVRocmVlV2l0aFR3byhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+54mM5Z6L6Z+z5pWIXHJcbiAgICAgKiBAcGFyYW0gc291bmRBcnIg54mM5Z6L6Z+z5pWI5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5VHlwZVNvdW5kKCl7XHJcbiAgICAgICAgbGV0IHNvdW5kQXJyID0gQmJ3ekNvbnN0RGVmaW5lLmdldEdyb3VwVHlwZVNvdW5kQXJyKHRoaXMubmFtZSk7XHJcbiAgICAgICAgaWYgKHNvdW5kQXJyKXtcclxuICAgICAgICAgICAgbGV0IHJlcyA9IHNvdW5kQXJyW3RoaXMucG9rZXJUeXBlXTtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxyZXMsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnBva2VyTGlzdC5mb3JFYWNoKHBva2VyPT57XHJcbiAgICAgICAgICAgIHBva2VyLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucG9rZXJUeXBlVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==