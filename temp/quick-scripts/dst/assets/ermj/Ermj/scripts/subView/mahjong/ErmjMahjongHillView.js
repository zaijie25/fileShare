
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjMahjongHillView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtak1haGpvbmdIaWxsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0MsMERBQXFEO0FBRXJELFVBQVU7QUFDVjtJQUFpRCx1Q0FBWTtJQVl6RCw2QkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQWRELHlEQUF5RDtRQUNsRCxjQUFRLEdBQTBCLEVBQUUsQ0FBQztRQUVwQyxtQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFLLDRDQUE0QztRQUNuRSxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGdCQUFVLEdBQUcsQ0FBQyxDQUFDLENBQVMsOENBQThDO1FBQ3RFLGNBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFXLDZDQUE2QztRQUU5RSxZQUFZO1FBQ0osY0FBUSxHQUFZLEtBQUssQ0FBQztRQUk5QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUUsdUJBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBVyxlQUFlO1lBQzNFLElBQUksUUFBUSxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ks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LHFDQUFPLEdBQWQsVUFBZSxJQUFhO1FBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCw0QkFBNEI7SUFDcEIsMkNBQWEsR0FBckIsVUFBc0IsS0FBYTtRQUMvQixJQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDZCxPQUFPLEtBQUssQ0FBQztRQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQU0sc0RBQXNEOztZQUU1RixPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFDTCwwQkFBQztBQUFELENBeENBLEFBd0NDLENBeENpQyxzQkFBWSxHQXdDN0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpHYW1lQ29uc3QgZnJvbSBcIi4uLy4uL2RhdGEvRXJtakdhbWVDb25zdFwiO1xyXG5cclxuLyoqIOm6u+WwhueJjOWxsSovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpNYWhqb25nSGlsbFZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICAvKiog54mM5aKZ5pWw57uEIGtleeS4ujDlsZ7kuo7oh6rlt7HniYzlopksIOWFtuS7luaMieeFp+aRuOeJjOmhuuW6j+mhuuaXtumSiOS+neasoeW+gOWQjjEyMy4uLiwg5LiO5bqn5L2N6YCG5pe26ZKI5LiN5ZCMICAqL1xyXG4gICAgcHVibGljIHdhbGxMaXN0OiBFcm1qTWFoam9uZ1dhbGxWaWV3W10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGZvcndhcmRPZmZzZXQgPSAwOyAgICAgLy8g6bq75bCG5aKZ5b2T5YmN6bq75bCG5oyH5ZCR5YGP56e7LCDljbPmraPlkJHmjqXkuIvmnaXopoHlj5HnmoTpgqPlvKAsIDB+NzEg5oyJ54Wn6Ieq5bex5byA5aeL6aG65pe26ZKI5pWwXHJcbiAgICBwcml2YXRlIHN0YXJ0SW5kZXggPSAwO1xyXG4gICAgcHJpdmF0ZSBiYWNrT2Zmc2V0ID0gMDsgICAgICAgICAvLyDpurvlsIblopnmnKvlsL7purvlsIbmjIflkJHlgY/np7ss5Y2z6YCG5ZCR5o6l5LiL5p2l6KaB5Y+R55qE6YKj5byg55qE5YmN5LiA5bygLCAwfi03Miwg55So5LqO5LuO5bC+6YOo6KGl54mMXHJcbiAgICBwcml2YXRlIGJhY2tKdW1wID0gLTE7ICAgICAgICAgICAvLyAgPiAw5pyJ5pWIIOiusOW9leWwvumDqOaRuOaXtui3s+i/h+eahOS4iuaWuXJlYWxJbmRleCDmraPlkJHmkbjniYzpnIDopoHnlKjmraTlpITnkIbkuLTnlYzmg4XlhrVcclxuICAgIFxyXG4gICAgLyoqIOeJjOWxseW3suaRuOWujCAqL1xyXG4gICAgcHJpdmF0ZSBpc0ZpbmlzaDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpPCBFcm1qR2FtZUNvbnN0Lm1haGpvbmdXYWxsOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJ3YWxsX1wiICsgaS50b1N0cmluZygpKTsgICAgICAgICAgIC8vIDDlsZ7kuo7oh6rlt7HluqfkvY3lj5bmnKzlnLDluqfkvY1cclxuICAgICAgICAgICAgbGV0IHdhbGxWaWV3ID0gbmV3IEVybWpNYWhqb25nV2FsbFZpZXcobm9kZSwgaSA9PSAxKTtcclxuICAgICAgICAgICAgd2FsbFZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YWxsTGlzdC5wdXNoKHdhbGxWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJblj5HniYzpurvlsIbloplcclxuICAgICAqIEBwYXJhbSBzdGFydFNlYXRWaWV3IOaRuOeJjOi1t+eCueaJgOWcqOW6p+S9jSDnlLHmraTojrflj5botbfngrnniYzlopnntKLlvJUo6aG65pe26ZKI6L2s6YCG5pe26ZKI6K6h566XKVxyXG4gICAgICogQHBhcmFtIG5TdGFydCDniYzlopnlhoXmkbjniYzotbfngrkg6ZyA6KaB6K6h566XXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0V2FsbERlYWwoc3RhcnRTZWF0VmlldzogbnVtYmVyLCBzdGFydEluV2FsbDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgd2FsbEluZGV4ID0gKEVybWpHYW1lQ29uc3QubWFoam9uZ1dhbGwgLSBzdGFydFNlYXRWaWV3KSAlIEVybWpHYW1lQ29uc3QubWFoam9uZ1dhbGw7ICAgICAgICAgICAgLy8g6aG65pe26ZKI6L2s6YCG5pe26ZKI5rGC5b6XIOeJjOWimee0ouW8lVxyXG4gICAgICAgIGxldCBpbmRleEluSGlsbCA9IHN0YXJ0SW5XYWxsICsgd2FsbEluZGV4ICooRXJtakdhbWVDb25zdC5tYWhqb25nVG90YWwgLyBFcm1qR2FtZUNvbnN0Lm1haGpvbmdXYWxsKSAgICAgICAgLy8g6K6h566X5b6X54mM5aKZ5YaF6LW354K55Zyo54mM5bGx5YaF55qE57Si5byVXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdGFydEluZGV4ID0gaW5kZXhJbkhpbGw7XHJcbiAgICAgICAgdGhpcy5mb3J3YXJkT2Zmc2V0ID0gMDtcclxuICAgICAgICB0aGlzLmJhY2tPZmZzZXQgPSAwO1xyXG4gICAgICAgIHRoaXMuYmFja0p1bXAgPSAtMTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0ZpbmlzaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2FsbExpc3QuZm9yRWFjaCh3YWxsPT57XHJcbiAgICAgICAgICAgIHdhbGwuc2hvd0FsbCh0cnVlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pG454mMXHJcbiAgICAgKiBAcGFyYW0gY291bnQg5Y+R5o6l5LiL5p2l5Yeg5byg54mMXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb0RlYWwoY291bnQ6IG51bWJlciA9IDEpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzRmluaXNoKVxyXG4gICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihcImRvRGVhbCBlcnJvciwg6bq75bCG5bey57uP5Y+R5a6M5ZWmXCIsIHRoaXMuZm9yd2FyZE9mZnNldCwgdGhpcy5iYWNrT2Zmc2V0KTsgICAgICAgIC8vIOeJjOWxgOe7k+adnywg55CG6K665LiK5LiN5Lya6L+b5p2l55qE5byC5bi45oOF5Ya1XHJcbiBcclxuICAgICAgICBsZXQgbmV4dFJlYWxJbmRleCA9IHRoaXMuZ2V0Rm9yd2FyZEN1ckluZGV4KHRoaXMuZm9yd2FyZE9mZnNldCArIDEpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCByZWFsSW5kZXggPSB0aGlzLmdldEZvcndhcmRDdXJJbmRleCh0aGlzLmZvcndhcmRPZmZzZXQpO1xyXG4gICAgICAgICAgICBsZXQgW3dhbGxJbmRleCwgY291bnRJbldhbGxdID0gdGhpcy5jYWxjdWxhdGVJbmRleChyZWFsSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5iYWNrSnVtcCA9PSBuZXh0UmVhbEluZGV4KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9yd2FyZE9mZnNldCArKztcclxuICAgICAgICAgICAgICAgIHJlYWxJbmRleCA9IHRoaXMuZ2V0Rm9yd2FyZEN1ckluZGV4KHRoaXMuZm9yd2FyZE9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBbd2FsbEluZGV4LCBjb3VudEluV2FsbF0gPSB0aGlzLmNhbGN1bGF0ZUluZGV4KHJlYWxJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy53YWxsTGlzdFt3YWxsSW5kZXhdLmRlYWxOZXh0Q291bnQoY291bnRJbldhbGwpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkT2Zmc2V0ICsrO1xyXG4gICAgICAgICAgICBsZXQgbGVmdCA9IHRoaXMuZ2V0RmluaXNoTGVmdCgpO1xyXG4gICAgICAgICAgICBpZiAobGVmdCA8PSAwKXsgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNGaW5pc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8g5Ymp5L2Z5LiA5byg5bm25LiUYmFja0p1bXDmnInmlYjkuLTnlYzlpITnkIbml7bkvJrmnInkuIDmrKEtMui3s+WPmCwg5omA5LulbGVmdOWIpOaWreS9v+eUqDw9XHJcbiAgICAgICAgICAgIC8vIGlmIChsZWZ0ID09IDEgJiYgdGhpcy5iYWNrSnVtcCA+IC0xKXtcclxuICAgICAgICAgICAgLy8gICAgIGlmICh0aGlzLmJhY2tKdW1wID09IG5leHRSZWFsSW5kZXgpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuZm9yd2FyZE9mZnNldCArPSAxO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO54mM5aKZ5pyr5bC+6KGl54mMXHJcbiAgICAgKiBAcGFyYW0gY291bnQg6KGl5pyr5bC+5Yeg5byg54mMXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1BhdGNod29yayhjb3VudDogbnVtYmVyID0gMSl7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaW5pc2gpXHJcbiAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKFwiZG9QYXRjaHdvcmsgZXJyb3IsIOm6u+WwhuW3sue7j+WPkeWujOWVplwiLCB0aGlzLmZvcndhcmRPZmZzZXQsIHRoaXMuYmFja09mZnNldCk7ICAgICAgICAvLyDniYzlsYDnu5PmnZ8sIOeQhuiuuuS4iuS4jeS8mui/m+adpeeahOW8guW4uOaDheWGtVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBmb3J3YXJkUmVhbEluZGV4ID0gdGhpcy5nZXRGb3J3YXJkQ3VySW5kZXgodGhpcy5mb3J3YXJkT2Zmc2V0KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmJhY2tPZmZzZXQtLTtcclxuICAgICAgICAgICAgbGV0IFtyZWFsSW5kZXgsIGp1bXBdID0gdGhpcy5nZXRCYWNrQ3VySW5kZXgodGhpcy5iYWNrT2Zmc2V0KTtcclxuICAgICAgICAgICAgdGhpcy5iYWNrSnVtcCA9IGp1bXA7ICAgLy8g6K6w5b2V57uZ5q2j5ZCR5pG454mMXHJcbiAgICAgICAgICAgIGlmIChqdW1wID09IGZvcndhcmRSZWFsSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrT2Zmc2V0LS07XHJcbiAgICAgICAgICAgICAgICBbcmVhbEluZGV4LCBqdW1wXSA9IHRoaXMuZ2V0QmFja0N1ckluZGV4KHRoaXMuYmFja09mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tKdW1wID0ganVtcDsgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IFt3YWxsSW5kZXgsIGNvdW50SW5XYWxsXSA9IHRoaXMuY2FsY3VsYXRlSW5kZXgocmVhbEluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy53YWxsTGlzdFt3YWxsSW5kZXhdLmRlYWxOZXh0Q291bnQoY291bnRJbldhbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IGxlZnQgPSB0aGlzLmdldEZpbmlzaExlZnQoKTtcclxuICAgICAgICAgICAgaWYgKGxlZnQgPD0gMCl7ICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyDliankvZnkuIDlvKDlubbkuJTkuKTkuKrmjIflkJHlt64y5Li05bGK5aSE55CG5pe2LCDkvJrmnInkuIDmrKEtMui3s+WPmCwg5LuOMeWPmOaIkC0xLCDmiYDku6VsZWZ05Yik5pat5L2/55SoPD1cclxuICAgICAgICAgICAgLy8gaWYgKGxlZnQgPT0gMSl7XHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoTWF0aC5hYnMocmVhbEluZGV4IC0gZm9yd2FyZFJlYWxJbmRleCkgPT0gMilcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmJhY2tPZmZzZXQgLT0gMTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+eJjOe0ouW8lVxyXG4gICAgICogQHJldHVybnMgW+eJjOWimee0ouW8lSwg5Zyo54mM5aKZ5YaF55qE57Si5byVXVxyXG4gICAgICogQHBhcmFtIHJlYWxJbmRleCDlnKjniYzlsbHnmoTntKLlvJVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjYWxjdWxhdGVJbmRleChyZWFsSW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBlckNvdW50ID0gRXJtakdhbWVDb25zdC5tYWhqb25nVG90YWwgLyBFcm1qR2FtZUNvbnN0Lm1haGpvbmdXYWxsO1xyXG4gICAgICAgIGxldCB3YWxsSW5kZXggPSBNYXRoLmZsb29yKHJlYWxJbmRleCAvIHBlckNvdW50KTtcclxuICAgICAgICBsZXQgY291bnRJbldhbGwgPSByZWFsSW5kZXggJSBwZXJDb3VudDtcclxuICAgICAgICByZXR1cm4gW3dhbGxJbmRleCwgY291bnRJbldhbGxdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmoLnmja7mraPlkJHlgY/np7vojrflj5bmkbjniYznmoTlrp7pmYVpbmRleCDmraPlkJHmkbjniYzmmK/lhYjkuIrpnaIsIOWGjeS4i+mdoiovXHJcbiAgICBwcml2YXRlIGdldEZvcndhcmRDdXJJbmRleChvZmZzZXQ6IG51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLnN0YXJ0SW5kZXggKyBvZmZzZXQgKyBFcm1qR2FtZUNvbnN0Lm1haGpvbmdUb3RhbCkgJSBFcm1qR2FtZUNvbnN0Lm1haGpvbmdUb3RhbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5qC55o2u6YCG5ZCR5YGP56e76I635Y+W5pG454mM55qE5a6e6ZmFaW5kZXgg6ZyA5qC55o2uaW5kZXjlpYflgbbkvZzmoKHlh4YsIOWboOS4uumAhuWQkeaRuOeJjOS5n+aYr+WFiOS4iumdoiwg5YaN5LiL6Z2iXHJcbiAgICAgKiBAcmV0dXJucyBb5qCh5YeG5ZCO55qEcmVhZGxJbmRleCwg5qCh5YeG6Lez6L+H55qE6YKj5bygcmVhZGxJbmRleF07XHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRCYWNrQ3VySW5kZXgob2Zmc2V0OiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBpbmRleCA9ICh0aGlzLnN0YXJ0SW5kZXggKyBvZmZzZXQgKyBFcm1qR2FtZUNvbnN0Lm1haGpvbmdUb3RhbCkgJSBFcm1qR2FtZUNvbnN0Lm1haGpvbmdUb3RhbDtcclxuICAgICAgICBsZXQganVtcCA9IC0xO1xyXG4gICAgICAgIGlmKGluZGV4ICUgMiA9PSAwKXtcclxuICAgICAgICAgICAganVtcCA9IC0xO1xyXG4gICAgICAgICAgICBpbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBqdW1wID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGluZGV4IC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbKGluZGV4ICsgRXJtakdhbWVDb25zdC5tYWhqb25nVG90YWwpICUgRXJtakdhbWVDb25zdC5tYWhqb25nVG90YWwsIGp1bXBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmo4Dmn6XniYzlsbHnnJ/lrp7liankvZnpurvlsIbmlbAgKi9cclxuICAgIHByaXZhdGUgZ2V0RmluaXNoTGVmdCgpe1xyXG4gICAgICAgIHJldHVybiBFcm1qR2FtZUNvbnN0Lm1haGpvbmdUb3RhbCAtIHRoaXMuZm9yd2FyZE9mZnNldCArIHRoaXMuYmFja09mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXJtak1haGpvbmdXYWxsVmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByaXZhdGUgbWFoam9uZ05vZGVMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgbWpDb3VudCA9IEVybWpHYW1lQ29uc3QubWFoam9uZ1RvdGFsIC8gRXJtakdhbWVDb25zdC5tYWhqb25nV2FsbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwdWJsaWMgaXNJbnZlcnNlOiBib29sZWFuKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5takNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJtYWppYW5nXCIgKyBpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB0aGlzLm1haGpvbmdOb2RlTGlzdC5wdXNoKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVhbE5leHRDb3VudChpbmRleDogbnVtYmVyLCBjb3VudDogbnVtYmVyID0gMSl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gaW5kZXg7IGkgPCBpbmRleCArIGNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxJbmRleCA9IHRoaXMuZ2V0TG9jYWxJbmRleChpKTtcclxuICAgICAgICAgICAgaWYodGhpcy5tYWhqb25nTm9kZUxpc3RbbG9jYWxJbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWhqb25nTm9kZUxpc3RbbG9jYWxJbmRleF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dBbGwoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5tYWhqb25nTm9kZUxpc3QuZm9yRWFjaChub2RlPT57XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmxhZztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlgJLnva7niYzlopnnmoTluo/lj7fmoKHlh4YgaW5kZXjvvJog5Li65LuOMOW8gOWniyovXHJcbiAgICBwcml2YXRlIGdldExvY2FsSW5kZXgoaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgaWYoIXRoaXMuaXNJbnZlcnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICAgICAgaWYgKGluZGV4ICUgMiA9PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5takNvdW50IC0gaW5kZXggLSAyOyAgICAgIC8vIOWboOS4uuWvueWutueJjOWimVVJ5piv55u05o6l6ZWc5YOP6L+H5Y6755qELCDlpLTlsL7lvpfkupLmjaIsIOmcgOimgeagoeWHhuW6j+WPtyAwLTM0IDEtMzUgMi0zMiAzLTMzXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5takNvdW50IC0gaW5kZXg7XHJcbiAgICB9XHJcbn0iXX0=