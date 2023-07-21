
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzChipItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1cfaeDTX7xFRp50CToruZY4', 'BbwzChipItem');
// bbwz/Bbwz/scripts/subview/BbwzChipItem.ts

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
var BbwzData_1 = require("../data/BbwzData");
var BbwzBetGameTool_1 = require("../tool/BbwzBetGameTool");
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
/**
 * 游戏层 单个筹码的控制组件
 */
var BbwzChipItem = /** @class */ (function (_super) {
    __extends(BbwzChipItem, _super);
    function BbwzChipItem(node) {
        var _this = _super.call(this) || this;
        /**
         * 筹码精灵
         */
        _this.spriteIcon = null;
        /**
         * 属于哪个玩家
         */
        _this.playerIndex = -1;
        /**
         * 下注在哪个区域
         */
        _this.betAreaIndex = -1;
        /**
         * 筹码面值索引
         */
        _this.chipIndex = 0;
        /**
         * 筹码面值
         */
        _this.chipNumber = 1;
        /**
         * 动画对象
         */
        _this.tween = null;
        _this.setNode(node);
        return _this;
    }
    BbwzChipItem.prototype.initView = function () {
        this.spriteIcon = this.node.getComponent(cc.Sprite);
    };
    /**
     * 更新显示
     */
    BbwzChipItem.prototype.updateUI = function () {
        var strArr = BbwzData_1.default.instance.getBetChipsIconStr();
        var str = strArr[this.chipIndex];
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.spriteIcon, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", str, null, true);
    };
    /**
     * 设置筹码
     * @param index
     */
    BbwzChipItem.prototype.setChipIndex = function (index) {
        this.chipIndex = index;
        this.chipNumber = BbwzData_1.default.instance.chipList[index];
        this.updateUI();
    };
    /**
     * 设置筹码
     * @param chipNum
     */
    BbwzChipItem.prototype.setChipNumber = function (chipNum) {
        this.chipIndex = BbwzData_1.default.instance.chipList.indexOf(chipNum);
        this.chipNumber = chipNum;
        this.updateUI();
    };
    /**
     * 停止动画
     */
    BbwzChipItem.prototype.stopAnim = function () {
        this.node.scale = 1;
        if (this.tween) {
            this.tween.stop();
            this.tween = null;
        }
    };
    /**
     * 设置数据
     * @param playerIndex
     * @param chipNum
     */
    BbwzChipItem.prototype.setData = function (playerIndex, chipNum) {
        this.playerIndex = playerIndex;
        this.setChipNumber(chipNum);
    };
    /**
     * 随机旋转
     */
    BbwzChipItem.prototype.randomRotate = function () {
        var rotation = this.getRandomRotation();
        this.node.angle = -rotation;
    };
    /**
     * 获得随机旋转角度
     */
    BbwzChipItem.prototype.getRandomRotation = function () {
        var rotation = BbwzBetGameTool_1.default.random() * 120 - 60;
        return rotation;
    };
    /**
     * 下注飞筹码动画
     */
    BbwzChipItem.prototype.betFlyAnim = function (startPos, endPos) {
        this.stopAnim();
        this.node.setPosition(startPos);
        this.tween = Game.Tween.get(this.node);
        var animTime = startPos.sub(endPos).mag() / 1000; //1500
        var randomRotation = this.getRandomRotation() + 1080;
        this.tween.to(animTime, { position: cc.v2(endPos.x, endPos.y), angle: randomRotation }, cc.easeQuadraticActionOut())
            .to(0.15, { scale: 1.1 }, cc.easeIn(1))
            .to(0.1, { scale: 1 }, cc.easeOut(1))
            .start();
    };
    /**
     * 尝试设置最大筹码
     * @param money
     */
    BbwzChipItem.prototype.tryBigest = function (money) {
        var chipIndex = BbwzData_1.default.instance.tryBigest(money);
        this.setChipIndex(chipIndex);
    };
    /**
     * 尝试设置最合适的筹码
     * @param money
     */
    BbwzChipItem.prototype.tryRight = function (money) {
        var chipIndex = BbwzData_1.default.instance.tryRight(money);
        this.setChipIndex(chipIndex);
    };
    /**
     * 聚合动画
     * @param animTime
     * @param endPos
     * @param complete
     */
    BbwzChipItem.prototype.playItemMoveToBank = function (animTime, endPos, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        this.tween = Game.Tween.get(this.node);
        this.tween.to(animTime, { position: endPos }, null)
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    /**
     * 去往返回区动画
     * @param animTime
     * @param endPos
     * @param complete
     */
    BbwzChipItem.prototype.playItemMoveToArea = function (animTime, endPos, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        this.tween = Game.Tween.get(this.node);
        this.tween.to(animTime, { position: endPos }, { progress: null, easing: "sineIn" })
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    /**
     * 去往头像动画
     * @param endPos
     * @param index
     * @param complete
     */
    BbwzChipItem.prototype.playOneChipAwardAnim = function (endPos, index, complete) {
        var _this = this;
        if (complete === void 0) { complete = null; }
        this.stopAnim();
        var animTime = endPos.sub(this.node.position).mag() / 1200;
        var delayTime = index * 0.001;
        this.tween = Game.Tween.get(this.node);
        this.tween.delay(delayTime).to(animTime, { position: endPos }, { progress: null, easing: "sineIn" })
            .call(function () {
            _this.stopAnim();
            if (complete)
                complete();
        }).start();
    };
    BbwzChipItem.prototype.reset = function () {
        this.stopAnim();
        if (this.node) {
            this.spriteIcon.spriteFrame = null;
            this.active = true;
        }
        this.playerIndex = -1;
        this.betAreaIndex = -1;
    };
    return BbwzChipItem;
}(BbwzBaseView_1.default));
exports.default = BbwzChipItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3ekNoaXBJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4QywyREFBc0Q7QUFDdEQsK0NBQTBDO0FBQzFDLHlEQUFvRDtBQUNwRCwyREFBc0Q7QUFFdEQ7O0dBRUc7QUFDSDtJQUEwQyxnQ0FBWTtJQTRCbEQsc0JBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUE3QkQ7O1dBRUc7UUFDSCxnQkFBVSxHQUFjLElBQUksQ0FBQztRQUU3Qjs7V0FFRztRQUNILGlCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakI7O1dBRUc7UUFDSCxrQkFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xCOztXQUVHO1FBQ0gsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkOztXQUVHO1FBQ0gsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFDZjs7V0FFRztRQUNILFdBQUssR0FBYSxJQUFJLENBQUM7UUFJbkIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQkFBUSxHQUFSO1FBQ0ksSUFBSSxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMseUJBQWUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSx3QkFBYyxDQUFDLGVBQWUsR0FBRyw2QkFBNkIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pLLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQ0FBWSxHQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILG9DQUFhLEdBQWIsVUFBYyxPQUFlO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsa0JBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsK0JBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCw4QkFBTyxHQUFQLFVBQVEsV0FBbUIsRUFBRSxPQUFlO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUNBQVksR0FBWjtRQUNJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7T0FFRztJQUNILHdDQUFpQixHQUFqQjtRQUNJLElBQUksUUFBUSxHQUFHLHlCQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNuRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBVSxHQUFWLFVBQVcsUUFBaUIsRUFBRSxNQUFlO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBLE1BQU07UUFDdkQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRyxjQUFjLEVBQUUsRUFBRSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUNoSCxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3BDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixJQUFJLFNBQVMsR0FBRyxrQkFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsK0JBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsSUFBSSxTQUFTLEdBQUcsa0JBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUdEOzs7OztPQUtHO0lBQ0gseUNBQWtCLEdBQWxCLFVBQW1CLFFBQWdCLEVBQUUsTUFBZSxFQUFFLFFBQXlCO1FBQS9FLGlCQVFDO1FBUnFELHlCQUFBLEVBQUEsZUFBeUI7UUFDM0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUM7YUFDOUMsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx5Q0FBa0IsR0FBbEIsVUFBbUIsUUFBZ0IsRUFBRSxNQUFlLEVBQUUsUUFBeUI7UUFBL0UsaUJBUUM7UUFScUQseUJBQUEsRUFBQSxlQUF5QjtRQUMzRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUM7YUFDOUUsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSwyQ0FBb0IsR0FBM0IsVUFBNEIsTUFBZSxFQUFFLEtBQWEsRUFBRSxRQUF5QjtRQUFyRixpQkFXQztRQVgyRCx5QkFBQSxFQUFBLGVBQXlCO1FBQ2pGLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzNELElBQUksU0FBUyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUM7UUFFOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDO2FBQy9GLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVNLDRCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDTCxtQkFBQztBQUFELENBck1BLEFBcU1DLENBck15QyxzQkFBWSxHQXFNckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pCZXRHYW1lVG9vbCBmcm9tIFwiLi4vdG9vbC9CYnd6QmV0R2FtZVRvb2xcIjtcclxuaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcblxyXG4vKipcclxuICog5ri45oiP5bGCIOWNleS4quetueeggeeahOaOp+WItue7hOS7tlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekNoaXBJdGVtIGV4dGVuZHMgQmJ3ekJhc2VWaWV3IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOetueeggeeyvueBtVxyXG4gICAgICovXHJcbiAgICBzcHJpdGVJY29uOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bGe5LqO5ZOq5Liq546p5a62XHJcbiAgICAgKi9cclxuICAgIHBsYXllckluZGV4ID0gLTE7XHJcbiAgICAvKipcclxuICAgICAqIOS4i+azqOWcqOWTquS4quWMuuWfn1xyXG4gICAgICovXHJcbiAgICBiZXRBcmVhSW5kZXggPSAtMTtcclxuICAgIC8qKlxyXG4gICAgICog562556CB6Z2i5YC857Si5byVXHJcbiAgICAgKi9cclxuICAgIGNoaXBJbmRleCA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOetueeggemdouWAvFxyXG4gICAgICovXHJcbiAgICBjaGlwTnVtYmVyID0gMTtcclxuICAgIC8qKlxyXG4gICAgICog5Yqo55S75a+56LGhXHJcbiAgICAgKi9cclxuICAgIHR3ZWVuOiBjYy5Ud2VlbiA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuc3ByaXRlSWNvbiA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5pi+56S6XHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVVJKCkge1xyXG4gICAgICAgIGxldCBzdHJBcnIgPSBCYnd6RGF0YS5pbnN0YW5jZS5nZXRCZXRDaGlwc0ljb25TdHIoKTtcclxuICAgICAgICBsZXQgc3RyID0gc3RyQXJyW3RoaXMuY2hpcEluZGV4XTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsdGhpcy5zcHJpdGVJY29uLCBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2R5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBzdHIsIG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u562556CBXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIHNldENoaXBJbmRleChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jaGlwSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLmNoaXBOdW1iZXIgPSBCYnd6RGF0YS5pbnN0YW5jZS5jaGlwTGlzdFtpbmRleF07XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u562556CBXHJcbiAgICAgKiBAcGFyYW0gY2hpcE51bSBcclxuICAgICAqL1xyXG4gICAgc2V0Q2hpcE51bWJlcihjaGlwTnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNoaXBJbmRleCA9IEJid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0LmluZGV4T2YoY2hpcE51bSk7XHJcbiAgICAgICAgdGhpcy5jaGlwTnVtYmVyID0gY2hpcE51bTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLliqjnlLtcclxuICAgICAqL1xyXG4gICAgc3RvcEFuaW0oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICBpZiAodGhpcy50d2Vlbikge1xyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuLnN0b3AoKTtcclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gcGxheWVySW5kZXggXHJcbiAgICAgKiBAcGFyYW0gY2hpcE51bSBcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShwbGF5ZXJJbmRleDogbnVtYmVyLCBjaGlwTnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnBsYXllckluZGV4ID0gcGxheWVySW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZXRDaGlwTnVtYmVyKGNoaXBOdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py65peL6L2sXHJcbiAgICAgKi9cclxuICAgIHJhbmRvbVJvdGF0ZSgpIHtcclxuICAgICAgICBsZXQgcm90YXRpb24gPSB0aGlzLmdldFJhbmRvbVJvdGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuZ2xlID0gLXJvdGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635b6X6ZqP5py65peL6L2s6KeS5bqmXHJcbiAgICAgKi9cclxuICAgIGdldFJhbmRvbVJvdGF0aW9uKCkge1xyXG4gICAgICAgIGxldCByb3RhdGlvbiA9IEJid3pCZXRHYW1lVG9vbC5yYW5kb20oKSAqIDEyMCAtIDYwO1xyXG4gICAgICAgIHJldHVybiByb3RhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+azqOmjnuetueeggeWKqOeUu1xyXG4gICAgICovXHJcbiAgICBiZXRGbHlBbmltKHN0YXJ0UG9zOiBjYy5WZWMyLCBlbmRQb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLnN0b3BBbmltKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0UG9zKTtcclxuICAgICAgICB0aGlzLnR3ZWVuID0gR2FtZS5Ud2Vlbi5nZXQodGhpcy5ub2RlKTtcclxuICAgICAgICBsZXQgYW5pbVRpbWUgPSBzdGFydFBvcy5zdWIoZW5kUG9zKS5tYWcoKSAvIDEwMDA7Ly8xNTAwXHJcbiAgICAgICAgbGV0IHJhbmRvbVJvdGF0aW9uID0gdGhpcy5nZXRSYW5kb21Sb3RhdGlvbigpICsgMTA4MDtcclxuICAgICAgICB0aGlzLnR3ZWVuLnRvKGFuaW1UaW1lLCB7IHBvc2l0aW9uOiBjYy52MihlbmRQb3MueCwgZW5kUG9zLnkpLCBhbmdsZSA6IHJhbmRvbVJvdGF0aW9uIH0sIGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25PdXQoKSlcclxuICAgICAgICAgICAgLnRvKDAuMTUsIHsgc2NhbGU6IDEuMSB9LCBjYy5lYXNlSW4oMSkpXHJcbiAgICAgICAgICAgIC50bygwLjEsIHsgc2NhbGU6IDEgfSwgY2MuZWFzZU91dCgxKSlcclxuICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsJ3or5Xorr7nva7mnIDlpKfnrbnnoIFcclxuICAgICAqIEBwYXJhbSBtb25leSBcclxuICAgICAqL1xyXG4gICAgdHJ5QmlnZXN0KG1vbmV5OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgY2hpcEluZGV4ID0gQmJ3ekRhdGEuaW5zdGFuY2UudHJ5QmlnZXN0KG1vbmV5KTtcclxuICAgICAgICB0aGlzLnNldENoaXBJbmRleChjaGlwSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCd6K+V6K6+572u5pyA5ZCI6YCC55qE562556CBXHJcbiAgICAgKiBAcGFyYW0gbW9uZXkgXHJcbiAgICAgKi9cclxuICAgIHRyeVJpZ2h0KG1vbmV5OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgY2hpcEluZGV4ID0gQmJ3ekRhdGEuaW5zdGFuY2UudHJ5UmlnaHQobW9uZXkpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hpcEluZGV4KGNoaXBJbmRleCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6IGa5ZCI5Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gYW5pbVRpbWUgXHJcbiAgICAgKiBAcGFyYW0gZW5kUG9zIFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIFxyXG4gICAgICovXHJcbiAgICBwbGF5SXRlbU1vdmVUb0JhbmsoYW5pbVRpbWU6IG51bWJlciwgZW5kUG9zOiBjYy5WZWMyLCBjb21wbGV0ZTogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wQW5pbSgpO1xyXG4gICAgICAgIHRoaXMudHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMudHdlZW4udG8oYW5pbVRpbWUsIHsgcG9zaXRpb246IGVuZFBvcyB9LCBudWxsKVxyXG4gICAgICAgICAgICAuY2FsbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wQW5pbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRlKSBjb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y675b6A6L+U5Zue5Yy65Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gYW5pbVRpbWUgXHJcbiAgICAgKiBAcGFyYW0gZW5kUG9zIFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlIFxyXG4gICAgICovXHJcbiAgICBwbGF5SXRlbU1vdmVUb0FyZWEoYW5pbVRpbWU6IG51bWJlciwgZW5kUG9zOiBjYy5WZWMyLCBjb21wbGV0ZTogRnVuY3Rpb24gPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wQW5pbSgpO1xyXG4gICAgICAgIHRoaXMudHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMudHdlZW4udG8oYW5pbVRpbWUsIHsgcG9zaXRpb246IGVuZFBvcyB9LCB7IHByb2dyZXNzOiBudWxsLCBlYXNpbmc6IFwic2luZUluXCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWOu+W+gOWktOWDj+WKqOeUu1xyXG4gICAgICogQHBhcmFtIGVuZFBvcyBcclxuICAgICAqIEBwYXJhbSBpbmRleCBcclxuICAgICAqIEBwYXJhbSBjb21wbGV0ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlPbmVDaGlwQXdhcmRBbmltKGVuZFBvczogY2MuVmVjMiwgaW5kZXg6IG51bWJlciwgY29tcGxldGU6IEZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcclxuICAgICAgICBsZXQgYW5pbVRpbWUgPSBlbmRQb3Muc3ViKHRoaXMubm9kZS5wb3NpdGlvbikubWFnKCkgLyAxMjAwO1xyXG4gICAgICAgIGxldCBkZWxheVRpbWUgPSBpbmRleCAqIDAuMDAxO1xyXG5cclxuICAgICAgICB0aGlzLnR3ZWVuID0gR2FtZS5Ud2Vlbi5nZXQodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLnR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8oYW5pbVRpbWUsIHsgcG9zaXRpb246IGVuZFBvcyB9LCB7IHByb2dyZXNzOiBudWxsLCBlYXNpbmc6IFwic2luZUluXCIgfSlcclxuICAgICAgICAgICAgLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFuaW0oKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZSkgY29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKXtcclxuICAgICAgICB0aGlzLnN0b3BBbmltKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUljb24uc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheWVySW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmJldEFyZWFJbmRleCA9IC0xO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==