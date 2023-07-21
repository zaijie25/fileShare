"use strict";
cc._RF.push(module, 'bbc3cTEDHhANrZENcqN/V/b', 'DdzPokerPool');
// ddz/ddz/scripts/tool/DdzPokerPool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPokerView_1 = require("../subView/DdzPokerView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzPokerPool = /** @class */ (function () {
    function DdzPokerPool(rootNode) {
        this.rootNode = rootNode;
        this.pool = [];
        this.preCount = 54;
        this.preCreate();
    }
    DdzPokerPool.prototype.preCreate = function () {
        var _this = this;
        var count = 0;
        var loadByFrame = function () {
            for (var i = 0; i < _this.preCount / 2; i++) {
                var item = _this.createItem();
                _this.recycleItem(item);
                count++;
                if (count >= _this.preCount) {
                    Game.Component.unschedule(loadByFrame);
                    break;
                }
            }
        };
        Game.Component.schedule(loadByFrame, 0);
    };
    DdzPokerPool.prototype.createItem = function () {
        var prefab = Global.ResourceManager.getGameBundleRes(DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/pokerPreNode", cc.Prefab);
        var node = cc.instantiate(prefab);
        node.setParent(this.rootNode);
        var item = new DdzPokerView_1.default(node);
        return item;
    };
    DdzPokerPool.prototype.resetItem = function (item) {
        item.active = false;
        item.reset();
        item.node.setParent(this.rootNode);
    };
    DdzPokerPool.prototype.getItem = function () {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createItem();
    };
    DdzPokerPool.prototype.getItemArr = function (count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            var item = this.getItem();
            arr.push(item);
        }
        return arr;
    };
    DdzPokerPool.prototype.recycleItem = function (item) {
        this.resetItem(item);
        this.pool.push(item);
    };
    DdzPokerPool.prototype.recycleAll = function (arr) {
        var _this = this;
        arr.forEach(function (ele) {
            _this.recycleItem(ele);
        });
    };
    DdzPokerPool.prototype.resetPool = function () {
        this.pool = [];
    };
    /**
  * 根据扑克的值 得扑克花色索引
  * @param value 后端定义的扑克牌的值
  * @return number 0-黑桃 1-红心 2-草花 3-方块 4-鬼牌（小鬼） 5-鬼牌（大鬼）
  */
    DdzPokerPool.GetPokerHuaseByValue = function (value) {
        var index = DdzPokerPool.POKER_VALUE.indexOf(value);
        if (index < 0) {
            Logger.error("计算花色错误：" + value);
            return -1;
        }
        var huase = Math.floor(index / 13);
        if (huase >= 4) {
            //鬼牌
            if (index == 52) {
                return 4; //4
            }
            else if (index == 53) {
                return 5; //5
            }
            Logger.error("计算鬼牌花色错误：" + value);
            return -1;
        }
        return huase;
    };
    /**
 * 根据扑克的值 得扑克面值
 * @param value 后端定义的扑克牌的值
 * @return number 0-12:A-K 如果是鬼牌，-1:鬼牌
 */
    DdzPokerPool.GetPokerNumByValue = function (value) {
        var index = DdzPokerPool.POKER_VALUE.indexOf(value);
        if (index < 0) {
            Logger.error("计算面值错误：" + value);
            return -2;
        }
        else if (index >= 52) {
            return -1;
        }
        var num = Math.floor(index % 13);
        return num;
    };
    /**
 * 扑克牌的面值：A-K 小鬼 大鬼
 * 索引值为前端定义 数组中的值为后端定义
 */
    DdzPokerPool.POKER_VALUE = [
        0x0E, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D,
        0x1E, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D,
        0x2E, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D,
        0x3E, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D,
        0x4F, 0x5F //小鬼 大鬼
    ];
    return DdzPokerPool;
}());
exports.default = DdzPokerPool;

cc._RF.pop();