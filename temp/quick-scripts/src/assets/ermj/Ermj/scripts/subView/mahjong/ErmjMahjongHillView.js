"use strict";
cc._RF.push(module, '8d0a9wLRs5Ffo2ZxXca/SL6', 'ErmjMahjongHillView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongHillView.ts

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
var ErmjGameConst_1 = require("../../data/ErmjGameConst");
/** 麻将牌山*/
var ErmjMahjongHillView = /** @class */ (function (_super) {
    __extends(ErmjMahjongHillView, _super);
    function ErmjMahjongHillView(node) {
        var _this = _super.call(this) || this;
        /** 牌墙数组 key为0属于自己牌墙, 其他按照摸牌顺序顺时针依次往后123..., 与座位逆时针不同  */
        _this.wallList = [];
        _this.forwardOffset = 0; // 麻将墙当前麻将指向偏移, 即正向接下来要发的那张, 0~71 按照自己开始顺时针数
        _this.startIndex = 0;
        _this.backOffset = 0; // 麻将墙末尾麻将指向偏移,即逆向接下来要发的那张的前一张, 0~-72, 用于从尾部补牌
        _this.backJump = -1; //  > 0有效 记录尾部摸时跳过的上方realIndex 正向摸牌需要用此处理临界情况
        /** 牌山已摸完 */
        _this.isFinish = false;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongHillView.prototype.initView = function () {
        for (var i = 0; i < ErmjGameConst_1.default.mahjongWall; i++) {
            var node = this.getChild("wall_" + i.toString()); // 0属于自己座位取本地座位
            var wallView = new ErmjMahjongWallView(node, i == 1);
            wallView.active = true;
            this.wallList.push(wallView);
        }
    };
    /**
     * 初始化发牌麻将墙
     * @param startSeatView 摸牌起点所在座位 由此获取起点牌墙索引(顺时针转逆时针计算)
     * @param nStart 牌墙内摸牌起点 需要计算
     */
    ErmjMahjongHillView.prototype.initWallDeal = function (startSeatView, startInWall) {
        var wallIndex = (ErmjGameConst_1.default.mahjongWall - startSeatView) % ErmjGameConst_1.default.mahjongWall; // 顺时针转逆时针求得 牌墙索引
        var indexInHill = startInWall + wallIndex * (ErmjGameConst_1.default.mahjongTotal / ErmjGameConst_1.default.mahjongWall); // 计算得牌墙内起点在牌山内的索引
        this.startIndex = indexInHill;
        this.forwardOffset = 0;
        this.backOffset = 0;
        this.backJump = -1;
        this.isFinish = false;
        this.wallList.forEach(function (wall) {
            wall.showAll(true);
        });
    };
    /**
     * 摸牌
     * @param count 发接下来几张牌
     */
    ErmjMahjongHillView.prototype.doDeal = function (count) {
        var _a;
        if (count === void 0) { count = 1; }
        if (this.isFinish)
            return console.error("doDeal error, 麻将已经发完啦", this.forwardOffset, this.backOffset); // 牌局结束, 理论上不会进来的异常情况
        var nextRealIndex = this.getForwardCurIndex(this.forwardOffset + 1);
        for (var i = 0; i < count; i++) {
            var realIndex = this.getForwardCurIndex(this.forwardOffset);
            var _b = this.calculateIndex(realIndex), wallIndex = _b[0], countInWall = _b[1];
            if (this.backJump == nextRealIndex) {
                this.forwardOffset++;
                realIndex = this.getForwardCurIndex(this.forwardOffset);
                _a = this.calculateIndex(realIndex), wallIndex = _a[0], countInWall = _a[1];
            }
            this.wallList[wallIndex].dealNextCount(countInWall);
            this.forwardOffset++;
            var left = this.getFinishLeft();
            if (left <= 0) {
                this.isFinish = true;
                break;
            }
            // 剩余一张并且backJump有效临界处理时会有一次-2跳变, 所以left判断使用<=
            // if (left == 1 && this.backJump > -1){
            //     if (this.backJump == nextRealIndex){
            //         this.forwardOffset += 1;
            //     }
            // }
        }
    };
    /**
     * 从牌墙末尾补牌
     * @param count 补末尾几张牌
     */
    ErmjMahjongHillView.prototype.doPatchwork = function (count) {
        var _a;
        if (count === void 0) { count = 1; }
        if (this.isFinish)
            return console.error("doPatchwork error, 麻将已经发完啦", this.forwardOffset, this.backOffset); // 牌局结束, 理论上不会进来的异常情况
        var forwardRealIndex = this.getForwardCurIndex(this.forwardOffset);
        for (var i = 0; i < count; i++) {
            this.backOffset--;
            var _b = this.getBackCurIndex(this.backOffset), realIndex = _b[0], jump = _b[1];
            this.backJump = jump; // 记录给正向摸牌
            if (jump == forwardRealIndex) {
                this.backOffset--;
                _a = this.getBackCurIndex(this.backOffset), realIndex = _a[0], jump = _a[1];
                this.backJump = jump;
            }
            var _c = this.calculateIndex(realIndex), wallIndex = _c[0], countInWall = _c[1];
            this.wallList[wallIndex].dealNextCount(countInWall);
            var left = this.getFinishLeft();
            if (left <= 0) {
                this.isFinish = true;
                break;
            }
            // 剩余一张并且两个指向差2临届处理时, 会有一次-2跳变, 从1变成-1, 所以left判断使用<=
            // if (left == 1){
            //     if (Math.abs(realIndex - forwardRealIndex) == 2)
            //         this.backOffset -= 1;
            // }
        }
    };
    /**
     * 计算牌索引
     * @returns [牌墙索引, 在牌墙内的索引]
     * @param realIndex 在牌山的索引
     */
    ErmjMahjongHillView.prototype.calculateIndex = function (realIndex) {
        var perCount = ErmjGameConst_1.default.mahjongTotal / ErmjGameConst_1.default.mahjongWall;
        var wallIndex = Math.floor(realIndex / perCount);
        var countInWall = realIndex % perCount;
        return [wallIndex, countInWall];
    };
    /** 根据正向偏移获取摸牌的实际index 正向摸牌是先上面, 再下面*/
    ErmjMahjongHillView.prototype.getForwardCurIndex = function (offset) {
        return (this.startIndex + offset + ErmjGameConst_1.default.mahjongTotal) % ErmjGameConst_1.default.mahjongTotal;
    };
    /** 根据逆向偏移获取摸牌的实际index 需根据index奇偶作校准, 因为逆向摸牌也是先上面, 再下面
     * @returns [校准后的readlIndex, 校准跳过的那张readlIndex];
    */
    ErmjMahjongHillView.prototype.getBackCurIndex = function (offset) {
        var index = (this.startIndex + offset + ErmjGameConst_1.default.mahjongTotal) % ErmjGameConst_1.default.mahjongTotal;
        var jump = -1;
        if (index % 2 == 0) {
            jump = -1;
            index += 1;
        }
        else {
            jump = index;
            index -= 1;
        }
        return [(index + ErmjGameConst_1.default.mahjongTotal) % ErmjGameConst_1.default.mahjongTotal, jump];
    };
    /** 检查牌山真实剩余麻将数 */
    ErmjMahjongHillView.prototype.getFinishLeft = function () {
        return ErmjGameConst_1.default.mahjongTotal - this.forwardOffset + this.backOffset;
    };
    ErmjMahjongHillView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjMahjongHillView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongHillView;
var ErmjMahjongWallView = /** @class */ (function (_super) {
    __extends(ErmjMahjongWallView, _super);
    function ErmjMahjongWallView(node, isInverse) {
        var _this = _super.call(this) || this;
        _this.isInverse = isInverse;
        _this.mahjongNodeList = [];
        _this.mjCount = ErmjGameConst_1.default.mahjongTotal / ErmjGameConst_1.default.mahjongWall;
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongWallView.prototype.initView = function () {
        for (var i = 0; i < this.mjCount; i++) {
            var node = this.getChild("majiang" + i.toString());
            this.mahjongNodeList.push(node);
        }
    };
    ErmjMahjongWallView.prototype.dealNextCount = function (index, count) {
        if (count === void 0) { count = 1; }
        for (var i = index; i < index + count; i++) {
            var localIndex = this.getLocalIndex(i);
            if (this.mahjongNodeList[localIndex]) {
                this.mahjongNodeList[localIndex].active = false;
            }
        }
    };
    ErmjMahjongWallView.prototype.showAll = function (flag) {
        this.mahjongNodeList.forEach(function (node) {
            node.active = flag;
        });
    };
    /** 倒置牌墙的序号校准 index： 为从0开始*/
    ErmjMahjongWallView.prototype.getLocalIndex = function (index) {
        if (!this.isInverse)
            return index;
        if (index % 2 == 0)
            return this.mjCount - index - 2; // 因为对家牌墙UI是直接镜像过去的, 头尾得互换, 需要校准序号 0-34 1-35 2-32 3-33
        else
            return this.mjCount - index;
    };
    return ErmjMahjongWallView;
}(ErmjBaseView_1.default));

cc._RF.pop();