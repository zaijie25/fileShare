
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/tool/DdzPokerPool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHRvb2xcXERkelBva2VyUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFtRDtBQUNuRCx1REFBa0Q7QUFHbEQ7SUFJSSxzQkFBb0IsUUFBaUI7UUFBakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUg3QixTQUFJLEdBQXlCLEVBQUUsQ0FBQztRQUNoQyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBY08sZ0NBQVMsR0FBakI7UUFBQSxpQkFjQztRQWJHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksV0FBVyxHQUFHO1lBQ2QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLEdBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNyQyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksS0FBSyxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLGlDQUFVLEdBQWxCO1FBQ0ksSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBYSxDQUFDLGVBQWUsR0FBRyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUgs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bGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpQb2tlclZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6UG9rZXJWaWV3XCI7XHJcbmltcG9ydCBEZHpQYXRoSGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkelBva2VySGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBva2VySGVscGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpQb2tlclBvb2x7XHJcbiAgICBwcml2YXRlIHBvb2w6IEFycmF5PERkelBva2VyVmlldz4gPSAgW107XHJcbiAgICBwcml2YXRlIHByZUNvdW50ID0gNTQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb290Tm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5wcmVDcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiDmiZHlhYvniYznmoTpnaLlgLzvvJpBLUsg5bCP6ay8IOWkp+msvFxyXG4gICAgICog57Si5byV5YC85Li65YmN56uv5a6a5LmJIOaVsOe7hOS4reeahOWAvOS4uuWQjuerr+WumuS5iVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgcmVhZG9ubHkgUE9LRVJfVkFMVUUgPSBbXHJcbiAgICAgICAgMHgwRSwgMHgwMiwgMHgwMywgMHgwNCwgMHgwNSwgMHgwNiwgMHgwNywgMHgwOCwgMHgwOSwgMHgwQSwgMHgwQiwgMHgwQywgMHgwRCwgIC8vLS3mlrnlnZcgQSAtIEtcclxuICAgICAgICAweDFFLCAweDEyLCAweDEzLCAweDE0LCAweDE1LCAweDE2LCAweDE3LCAweDE4LCAweDE5LCAweDFBLCAweDFCLCAweDFDLCAweDFELCAgLy8tLeaiheiKsSBBIC0gS1xyXG4gICAgICAgIDB4MkUsIDB4MjIsIDB4MjMsIDB4MjQsIDB4MjUsIDB4MjYsIDB4MjcsIDB4MjgsIDB4MjksIDB4MkEsIDB4MkIsIDB4MkMsIDB4MkQsICAvLy0t57qi5qGDIEEgLSBLXHJcbiAgICAgICAgMHgzRSwgMHgzMiwgMHgzMywgMHgzNCwgMHgzNSwgMHgzNiwgMHgzNywgMHgzOCwgMHgzOSwgMHgzQSwgMHgzQiwgMHgzQywgMHgzRCwgIC8vLS3pu5HmoYMgQSAtIEtcclxuICAgICAgICAweDRGLCAweDVGICAvL+Wwj+msvCDlpKfprLxcclxuICAgIF07XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVDcmVhdGUoKXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCBsb2FkQnlGcmFtZSA9ICgpPT57XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnByZUNvdW50IC8yOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZUl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IHRoaXMucHJlQ291bnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGUobG9hZEJ5RnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlKGxvYWRCeUZyYW1lLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUl0ZW0oKXtcclxuICAgICAgICBsZXQgcHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRHYW1lQnVuZGxlUmVzKERkelBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L3Bva2VyUHJlTm9kZVwiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnJvb3ROb2RlKTtcclxuICAgICAgICBsZXQgaXRlbSA9IG5ldyBEZHpQb2tlclZpZXcobm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldEl0ZW0oaXRlbTogRGR6UG9rZXJWaWV3KXtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGl0ZW0ucmVzZXQoKTtcclxuICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMucm9vdE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtKCk6IERkelBva2VyVmlld3tcclxuICAgICAgICBpZiAodGhpcy5wb29sLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb29sLnBvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW1BcnIoY291bnQ6IG51bWJlcik6IERkelBva2VyVmlld1tde1xyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlSXRlbShpdGVtOiBEZHpQb2tlclZpZXcpe1xyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8RGR6UG9rZXJWaWV3Pil7XHJcbiAgICAgICAgYXJyLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWN5Y2xlSXRlbShlbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFBvb2woKXtcclxuICAgICAgICB0aGlzLnBvb2wgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAgICAvKipcclxuICAgICAqIOagueaNruaJkeWFi+eahOWAvCDlvpfmiZHlhYvoirHoibLntKLlvJVcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlkI7nq6/lrprkuYnnmoTmiZHlhYvniYznmoTlgLxcclxuICAgICAqIEByZXR1cm4gbnVtYmVyIDAt6buR5qGDIDEt57qi5b+DIDIt6I2J6IqxIDMt5pa55Z2XIDQt6ay854mM77yI5bCP6ay877yJIDUt6ay854mM77yI5aSn6ay877yJXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBHZXRQb2tlckh1YXNlQnlWYWx1ZSh2YWx1ZTpudW1iZXIpOm51bWJlcntcclxuICAgICAgICB2YXIgaW5kZXggPSBEZHpQb2tlclBvb2wuUE9LRVJfVkFMVUUuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgaWYoaW5kZXggPCAwKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6K6h566X6Iqx6Imy6ZSZ6K+v77yaXCIgKyB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGh1YXNlID0gTWF0aC5mbG9vcihpbmRleCAvIDEzKTtcclxuICAgICAgICBpZihodWFzZSA+PSA0KXtcclxuICAgICAgICAgICAgLy/prLzniYxcclxuICAgICAgICAgICAgaWYoaW5kZXggPT0gNTIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDQ7Ly80XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGluZGV4ID09IDUzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiA1Oy8vNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuiuoeeul+msvOeJjOiKseiJsumUmeivr++8mlwiICsgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaHVhc2U7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICog5qC55o2u5omR5YWL55qE5YC8IOW+l+aJkeWFi+mdouWAvFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOWQjuerr+WumuS5ieeahOaJkeWFi+eJjOeahOWAvFxyXG4gICAgICogQHJldHVybiBudW1iZXIgMC0xMjpBLUsg5aaC5p6c5piv6ay854mM77yMLTE66ay854mMXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBHZXRQb2tlck51bUJ5VmFsdWUodmFsdWU6bnVtYmVyKTpudW1iZXJ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gRGR6UG9rZXJQb29sLlBPS0VSX1ZBTFVFLmluZGV4T2YodmFsdWUpO1xyXG4gICAgICAgIGlmKGluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuiuoeeul+mdouWAvOmUmeivr++8mlwiICsgdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gLTI7XHJcbiAgICAgICAgfWVsc2UgaWYoaW5kZXggPj0gNTIpe1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBudW0gPSBNYXRoLmZsb29yKGluZGV4ICUgMTMpO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbn0iXX0=