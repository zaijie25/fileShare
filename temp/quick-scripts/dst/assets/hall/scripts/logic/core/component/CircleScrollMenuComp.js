
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/CircleScrollMenuComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41c34jEgVNHp4S3SJj/mGCz', 'CircleScrollMenuComp');
// hall/scripts/logic/core/component/CircleScrollMenuComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CircleScrollMenuComp = /** @class */ (function (_super) {
    __extends(CircleScrollMenuComp, _super);
    function CircleScrollMenuComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showCount = 0;
        _this.moveTime = 0.2; // 滚动时长
        _this.slideDev = 5; // 手势判定有效位移
        _this.itemList = [];
        _this.itemRawPosArr = [];
        _this.isRolling = false;
        _this.dataList = [];
        /** 显示的item序号 上第一个item基准 */
        _this.showIndex = 0;
        /** 实际显示的数据序号 上第一个item基准 */
        _this.realIndex = 0;
        /** 中心指向的本地item序号 1~showCount+2 */
        _this.curSelectIndex = 0;
        /** 是否可滚动 */
        _this.isRollEnable = false;
        return _this;
    }
    Object.defineProperty(CircleScrollMenuComp.prototype, "totalCount", {
        get: function () {
            return this.showCount + 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CircleScrollMenuComp.prototype, "centerCount", {
        get: function () {
            return Math.floor(this.showCount / 2);
        },
        enumerable: false,
        configurable: true
    });
    CircleScrollMenuComp.prototype.onLoad = function () {
        var contentNode = cc.find("mask/touch", this.node);
        contentNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        contentNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        contentNode._touchListener.setSwallowTouches(false);
        this.dotNode = cc.find("mask/circleDot", this.node);
        for (var i = 0; i < this.totalCount; i++) { // 额外多出两个用于辅助滚动动画
            var node = cc.find("item" + i, this.dotNode);
            if (node) {
                var item = Global.UIHelper.safeGetComponent(node, "", MenuItem);
                item.index = i;
                item.setCallback(this.onMenuItemClick, this);
                item.node.active = false;
                item.setCheck(false);
                this.itemList.push(item);
                this.itemRawPosArr.push(node.position);
            }
        }
        if (this.itemList.length != this.totalCount) {
            //  console.error("节点数量异常", this.itemList.length, this.totalCount);
        }
    };
    CircleScrollMenuComp.prototype.onTouchStart = function (event) {
        this.touchStartPos = event.getLocation();
    };
    CircleScrollMenuComp.prototype.onTouchEnd = function (event) {
        var _this = this;
        if (!this.isRollEnable) // 数量太少
            return;
        if (this.isRolling)
            return;
        var endPos = event.getLocation();
        var se = endPos.sub(this.touchStartPos);
        var dev = se.mag();
        var comDev = Math.pow(this.slideDev, 2);
        if (se.y > 0) { // 向上滑   先判断y方向偏移量, 处理横向滑动的问题 暂未扩展到横向滑动
            if (dev >= comDev) {
                // event.stopPropagation();
                this.rollForward(this.moveTime, 1, true, function () {
                    _this.itemList[_this.curSelectIndex].setCheck(false);
                    _this.curSelectIndex = _this.getNextIndex(_this.showIndex, _this.centerCount);
                    _this.onMenuSelect(_this.curSelectIndex);
                });
            }
        }
        else { // 向下滑
            if (dev >= comDev) {
                // event.stopPropagation();
                this.rollBack(this.moveTime, 1, true, function () {
                    _this.itemList[_this.curSelectIndex].setCheck(false);
                    _this.curSelectIndex = _this.getNextIndex(_this.showIndex, _this.centerCount);
                    _this.onMenuSelect(_this.curSelectIndex);
                });
            }
        }
    };
    CircleScrollMenuComp.prototype.onMenuItemClick = function (index) {
        var _this = this;
        if (this.isRolling)
            return;
        if (this.isRollEnable) {
            this.autoRollToItem(index, function () {
                _this.itemList[_this.curSelectIndex].setCheck(false);
                _this.curSelectIndex = _this.getNextIndex(_this.showIndex, _this.centerCount);
                _this.onMenuSelect(_this.curSelectIndex);
            });
        }
        else {
            this.switchItemWithoutRoll(index);
        }
    };
    CircleScrollMenuComp.prototype.onMenuSelect = function (index) {
        var curItem = this.itemList[index];
        if (curItem) {
            curItem.setCheck(true);
            if (this.menuSelectTarget && this.menuSelectCallback) {
                this.menuSelectCallback.call(this.menuSelectTarget, curItem.key);
            }
        }
        else {
            // console.error("item not exist", index, this.itemList.length);
        }
    };
    CircleScrollMenuComp.prototype.setMenuItemCallback = function (callback, target) {
        this.menuSelectCallback = callback;
        this.menuSelectTarget = target;
    };
    CircleScrollMenuComp.prototype.initData = function (list) {
        if (list === void 0) { list = []; }
        if (list.length <= 0) {
            this.node.active = false;
            return Global.UI.fastTip("菜单项列表为空: " + list.length);
        }
        this.dataList = list || [];
        // 数据数量小于showCount 设置标志不可滚动, 直接刷新
        this.isRollEnable = list.length >= this.showCount;
        for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            if (list[i]) {
                item.node.active = true;
                item.setData(list[i]);
            }
            else {
                item.node.active = this.isRollEnable; // 可转动时显示辅助item
            }
        }
    };
    CircleScrollMenuComp.prototype.setDefaultSelect = function (rIndex) {
        if (rIndex >= 0)
            this.realIndex = this.getPrevRealIndex(rIndex, this.centerCount);
        else
            this.realIndex = 0;
        for (var i = 0; i < this.showCount; i++) {
            var next = this.getNextIndex(this.showIndex, i);
            var item = this.itemList[next];
            var tempRealIndex = this.getNextRealIndex(this.realIndex, i);
            item.setData(this.dataList[tempRealIndex]);
        }
        var nSelectIndex = this.getNextIndex(this.showIndex, this.centerCount);
        this.onMenuSelect(nSelectIndex);
        this.curSelectIndex = nSelectIndex;
    };
    CircleScrollMenuComp.prototype.autoRollToItem = function (index, finishCal) {
        var pos = index - this.curSelectIndex;
        var dev = Math.abs(pos);
        if (dev > this.centerCount) { // 超过显示的一半 就反向
            if (pos > 0)
                pos -= this.totalCount;
            else
                pos += this.totalCount;
            dev = Math.abs(pos);
        }
        if (dev != 0) {
            this.isRolling = true;
            if (pos > 0) {
                this.rollForward(this.moveTime, dev, true, finishCal);
            }
            else {
                this.rollBack(this.moveTime, dev, true, finishCal);
            }
        }
    };
    CircleScrollMenuComp.prototype.switchItemWithoutRoll = function (index) {
        var pos = index - this.curSelectIndex;
        var dev = Math.abs(pos);
        if (dev != 0) {
            var dataCount = this.dataList.length;
            var realIndex = this.realIndex;
            for (var i = 0; i < this.itemList.length; i++) { // 不旋转 第一个item索引一直都是0 切换数据
                var item = this.itemList[i];
                var rIndex = 0;
                var tempIndex = this.getNextRealIndex(this.realIndex, i); // 先计算每个item的当前realIndex, 再前移或后移
                if (pos > 0) {
                    rIndex = this.getNextRealIndex(tempIndex, dev);
                }
                else {
                    rIndex = this.getPrevRealIndex(tempIndex, dev);
                }
                if (this.dataList[rIndex]) {
                    item.setData(this.dataList[rIndex]);
                    if (i == 0)
                        realIndex = rIndex;
                }
                if (i >= dataCount - 1)
                    break;
            }
            this.realIndex = realIndex;
            this.onMenuSelect(this.curSelectIndex);
        }
    };
    /** 转盘向下转 */
    CircleScrollMenuComp.prototype.rollBack = function (time, step, isAnim, callback) {
        var _this = this;
        if (step === void 0) { step = 1; }
        if (isAnim === void 0) { isAnim = true; }
        Logger.error("rollBack 向下转");
        this.setHideItemDataBack(); // 设置首尾显示的内容更新
        var frameInSecond = cc.game.getFrameRate();
        var everyFrame = Math.floor(frameInSecond * time / step);
        for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            var next = this.getNextIndex(i + this.totalCount - this.showIndex, step);
            // Logger.error("rollBack", this.showIndex, i, next);
            if (isAnim) {
                var arr = [];
                var start = cc.v2(item.node.position);
                for (var s = 1; s <= step; s++) {
                    var nextStep = this.getNextIndex(i + this.totalCount - this.showIndex, s);
                    var end = cc.v2(this.itemRawPosArr[nextStep]);
                    var temp = this.getLerpPosArr(start, end, everyFrame);
                    start = end;
                    arr = arr.concat(temp);
                }
                item.startRun(arr);
            }
            else {
                item.node.setPosition(this.itemRawPosArr[next]);
            }
        }
        if (isAnim) {
            this.isRolling = true;
            this.scheduleOnce(function () {
                if (!cc.isValid(_this.node))
                    return;
                _this.isRolling = false;
                _this.realIndex = _this.getPrevRealIndex(_this.realIndex, step);
                _this.showIndex = _this.getPrevIndex(_this.showIndex, step);
                callback && callback();
            }, time + 0.05);
        }
        else {
            this.realIndex = this.getPrevRealIndex(this.realIndex, step);
            this.showIndex = this.getPrevIndex(this.showIndex, step);
            callback && callback();
        }
    };
    /** 转盘向上转 */
    CircleScrollMenuComp.prototype.rollForward = function (time, step, isAnim, callback) {
        var _this = this;
        if (step === void 0) { step = 1; }
        if (isAnim === void 0) { isAnim = true; }
        Logger.error("rollForward 向上转");
        this.setHideItemDataForward(); // 设置首尾显示的内容更新
        var frameInSecond = cc.game.getFrameRate();
        var everyFrame = Math.floor(frameInSecond * time / step);
        for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            var prev = this.getPrevIndex(i + this.totalCount - this.showIndex, step);
            // Logger.error("rollForward", this.showIndex, i, prev);
            if (isAnim) {
                var arr = [];
                var start = cc.v2(item.node.position);
                for (var s = 1; s <= step; s++) {
                    var nextStep = this.getPrevIndex(i + this.totalCount - this.showIndex, s);
                    var end = cc.v2(this.itemRawPosArr[nextStep]);
                    var temp = this.getLerpPosArr(start, end, everyFrame);
                    start = end;
                    arr = arr.concat(temp);
                }
                item.startRun(arr);
            }
            else {
                item.node.setPosition(this.itemRawPosArr[prev]);
            }
        }
        if (isAnim) {
            this.isRolling = true;
            this.scheduleOnce(function () {
                if (!cc.isValid(_this.node))
                    return;
                _this.isRolling = false;
                _this.realIndex = _this.getNextRealIndex(_this.realIndex, step);
                _this.showIndex = _this.getNextIndex(_this.showIndex, step);
                callback && callback();
            }, time + 0.05);
        }
        else {
            this.realIndex = this.getNextRealIndex(this.realIndex, step);
            this.showIndex = this.getNextIndex(this.showIndex, step);
            callback && callback();
        }
    };
    CircleScrollMenuComp.prototype.setHideItemDataForward = function () {
        var step = this.showCount;
        var last2nd = this.getNextIndex(this.showIndex, step);
        var last = this.getNextIndex(this.showIndex, step + 1);
        var last2ndRealIndex = this.getNextRealIndex(this.realIndex, step);
        var lastRealIndex = this.getNextRealIndex(this.realIndex, step + 1);
        this.itemList[last2nd].setData(this.dataList[last2ndRealIndex]);
        this.itemList[last].setData(this.dataList[lastRealIndex]);
    };
    CircleScrollMenuComp.prototype.setHideItemDataBack = function () {
        var step = this.showCount;
        var last2nd = this.getNextIndex(this.showIndex, step);
        var last = this.getNextIndex(this.showIndex, step + 1);
        var last2ndRealIndex = this.getPrevRealIndex(this.realIndex, 2);
        var lastRealIndex = this.getPrevRealIndex(this.realIndex, 1);
        this.itemList[last2nd].setData(this.dataList[last2ndRealIndex]);
        this.itemList[last].setData(this.dataList[lastRealIndex]);
    };
    CircleScrollMenuComp.prototype.getLerpPosArr = function (start, end, totalFrame) {
        var arr = [];
        for (var i = 1; i <= totalFrame; i++) {
            arr.push(start.lerp(end, i / totalFrame));
        }
        return arr;
    };
    CircleScrollMenuComp.prototype.getNextIndex = function (value, step) {
        if (step === void 0) { step = 1; }
        return (value + step) % this.totalCount;
    };
    CircleScrollMenuComp.prototype.getPrevIndex = function (value, step) {
        if (step === void 0) { step = 1; }
        return (value - step + this.totalCount) % this.totalCount;
    };
    CircleScrollMenuComp.prototype.getNextRealIndex = function (value, step) {
        if (step === void 0) { step = 1; }
        return (value + step) % this.dataList.length;
    };
    CircleScrollMenuComp.prototype.getPrevRealIndex = function (value, step) {
        if (step === void 0) { step = 1; }
        return (value - step + this.dataList.length) % this.dataList.length;
    };
    CircleScrollMenuComp.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
    };
    __decorate([
        property({
            tooltip: "显示可见的最大item数量, 并且预设上要多两个节点用于动画"
        })
    ], CircleScrollMenuComp.prototype, "showCount", void 0);
    CircleScrollMenuComp = __decorate([
        ccclass
    ], CircleScrollMenuComp);
    return CircleScrollMenuComp;
}(cc.Component));
exports.default = CircleScrollMenuComp;
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._key = 0;
        _this._index = 0;
        _this.runEnable = false;
        _this.runPosArr = [];
        _this.frameCount = 0;
        return _this;
    }
    Object.defineProperty(MenuItem.prototype, "key", {
        get: function () {
            return this._key;
        },
        enumerable: false,
        configurable: true
    });
    MenuItem.prototype.onLoad = function () {
        this.uncheckNode = cc.find("uncheckNode", this.node);
        this.uncheckIconSp = cc.find("iconSp", this.uncheckNode).getComponent(cc.Sprite);
        this.uncheckTextSp = cc.find("textSp", this.uncheckNode).getComponent(cc.Sprite);
        this.checkNode = cc.find("checkNode", this.node);
        this.checkIconSp = cc.find("iconSp", this.checkNode).getComponent(cc.Sprite);
        this.checkTextSp = cc.find("textSp", this.checkNode).getComponent(cc.Sprite);
        Global.UIHelper.addCommonClick(this.node, "", this.onItemClick, this);
    };
    MenuItem.prototype.setData = function (data) {
        this._key = data.key;
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.uncheckIconSp, "hall/images/circle/atlas_circle", data.icon);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.uncheckTextSp, "hall/images/circle/atlas_circle", data.ucText);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.checkIconSp, "hall/images/circle/atlas_circle", data.icon);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.checkTextSp, "hall/images/circle/atlas_circle", data.cText);
        if (!data.cText) {
            this.checkTextSp.node.active = false;
        }
        if (!data.ucText) {
            this.uncheckTextSp.node.active = false;
        }
    };
    Object.defineProperty(MenuItem.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: false,
        configurable: true
    });
    MenuItem.prototype.setCallback = function (func, target) {
        this.callback = func;
        this.target = target;
    };
    MenuItem.prototype.onItemClick = function () {
        if (this.callback && this.target) {
            this.callback.call(this.target, this.index, this.key);
        }
    };
    MenuItem.prototype.setCheck = function (flag) {
        this.uncheckNode.active = !flag;
        this.checkNode.active = flag;
    };
    MenuItem.prototype.startRun = function (arr) {
        if (arr && arr.length > 0) {
            this.frameCount = 0;
            this.runPosArr = arr;
            this.runEnable = true;
        }
    };
    MenuItem.prototype.update = function () {
        if (!this.runEnable || this.runPosArr.length <= 0)
            return;
        var pos = this.runPosArr[this.frameCount];
        if (pos) {
            this.node.setPosition(pos);
            this.frameCount += 1;
            if (this.frameCount == this.runPosArr.length) {
                this.runEnable = false;
                this.runPosArr = [];
            }
        }
    };
    return MenuItem;
}(cc.Component));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcQ2lyY2xlU2Nyb2xsTWVudUNvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Qsd0NBQVk7SUFBOUQ7UUFBQSxxRUFrV0M7UUE5VlUsZUFBUyxHQUFXLENBQUMsQ0FBQztRQUVaLGNBQVEsR0FBRyxHQUFHLENBQUMsQ0FBUSxPQUFPO1FBQzlCLGNBQVEsR0FBRyxDQUFDLENBQUMsQ0FBVSxXQUFXO1FBRzNDLGNBQVEsR0FBZSxFQUFFLENBQUM7UUFDMUIsbUJBQWEsR0FBYyxFQUFFLENBQUM7UUFDOUIsZUFBUyxHQUFZLEtBQUssQ0FBQztRQUszQixjQUFRLEdBQVUsRUFBRSxDQUFDO1FBQzdCLDJCQUEyQjtRQUNuQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLDJCQUEyQjtRQUNuQixlQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGtDQUFrQztRQUMxQixvQkFBYyxHQUFXLENBQUMsQ0FBQztRQUNuQyxZQUFZO1FBQ0osa0JBQVksR0FBWSxLQUFLLENBQUM7O0lBeVUxQyxDQUFDO0lBdFVHLHNCQUFZLDRDQUFVO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUFZLDZDQUFXO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFUyxxQ0FBTSxHQUFoQjtRQUNJLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJ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QU0sRUFBQztnQkFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQ3ZCO1NBQ0o7SUFDTCxDQUFDO0lBQ0wsZUFBQztBQUFELENBekZBLEFBeUZDLENBekZzQixFQUFFLENBQUMsU0FBUyxHQXlGbEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZVNjcm9sbE1lbnVDb21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogXCLmmL7npLrlj6/op4HnmoTmnIDlpKdpdGVt5pWw6YePLCDlubbkuJTpooTorr7kuIropoHlpJrkuKTkuKroioLngrnnlKjkuo7liqjnlLtcIlxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBzaG93Q291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBtb3ZlVGltZSA9IDAuMjsgICAgICAgIC8vIOa7muWKqOaXtumVv1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzbGlkZURldiA9IDU7ICAgICAgICAgIC8vIOaJi+WKv+WIpOWumuacieaViOS9jeenu1xyXG5cclxuICAgIHByaXZhdGUgZG90Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgaXRlbUxpc3Q6IE1lbnVJdGVtW10gPSBbXTtcclxuICAgIHByaXZhdGUgaXRlbVJhd1Bvc0FycjogY2MuVmVjM1tdID0gW107XHJcbiAgICBwcml2YXRlIGlzUm9sbGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB0b3VjaFN0YXJ0UG9zOiBjYy5WZWMyO1xyXG4gICAgcHJpdmF0ZSBtZW51U2VsZWN0Q2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBtZW51U2VsZWN0VGFyZ2V0OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhTGlzdDogYW55W10gPSBbXTtcclxuICAgIC8qKiDmmL7npLrnmoRpdGVt5bqP5Y+3IOS4iuesrOS4gOS4qml0ZW3ln7rlh4YgKi9cclxuICAgIHByaXZhdGUgc2hvd0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOWunumZheaYvuekuueahOaVsOaNruW6j+WPtyDkuIrnrKzkuIDkuKppdGVt5Z+65YeGICovXHJcbiAgICBwcml2YXRlIHJlYWxJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKiDkuK3lv4PmjIflkJHnmoTmnKzlnLBpdGVt5bqP5Y+3IDF+c2hvd0NvdW50KzIgKi9cclxuICAgIHByaXZhdGUgY3VyU2VsZWN0SW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAvKiog5piv5ZCm5Y+v5rua5YqoICovXHJcbiAgICBwcml2YXRlIGlzUm9sbEVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgXHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgdG90YWxDb3VudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNob3dDb3VudCArIDI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgY2VudGVyQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnNob3dDb3VudCAvIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICBsZXQgY29udGVudE5vZGUgPSBjYy5maW5kKFwibWFzay90b3VjaFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGNvbnRlbnROb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcyk7IFxyXG4gICAgICAgIGNvbnRlbnROb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICBjb250ZW50Tm9kZS5fdG91Y2hMaXN0ZW5lci5zZXRTd2FsbG93VG91Y2hlcyhmYWxzZSlcclxuXHJcbiAgICAgICAgdGhpcy5kb3ROb2RlID0gY2MuZmluZChcIm1hc2svY2lyY2xlRG90XCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxDb3VudDsgaSsrKXsgICAgICAgIC8vIOmineWkluWkmuWHuuS4pOS4queUqOS6jui+heWKqea7muWKqOWKqOeUu1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoXCJpdGVtXCIgKyBpLCB0aGlzLmRvdE5vZGUpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogTWVudUl0ZW0gPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChub2RlLCBcIlwiLCBNZW51SXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0Q2FsbGJhY2sodGhpcy5vbk1lbnVJdGVtQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1SYXdQb3NBcnIucHVzaChub2RlLnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pdGVtTGlzdC5sZW5ndGggIT0gdGhpcy50b3RhbENvdW50KXtcclxuICAgICAgICAgIC8vICBjb25zb2xlLmVycm9yKFwi6IqC54K55pWw6YeP5byC5bi4XCIsIHRoaXMuaXRlbUxpc3QubGVuZ3RoLCB0aGlzLnRvdGFsQ291bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCl7XHJcbiAgICAgICAgdGhpcy50b3VjaFN0YXJ0UG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hFbmQoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpe1xyXG4gICAgICAgIGlmICghdGhpcy5pc1JvbGxFbmFibGUpICAgICAvLyDmlbDph4/lpKrlsJFcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm9sbGluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBlbmRQb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIGxldCBzZSA9IGVuZFBvcy5zdWIodGhpcy50b3VjaFN0YXJ0UG9zKTtcclxuICAgICAgICBsZXQgZGV2ID0gc2UubWFnKCk7XHJcbiAgICAgICAgbGV0IGNvbURldiA9IE1hdGgucG93KHRoaXMuc2xpZGVEZXYsIDIpO1xyXG4gICAgICAgIGlmIChzZS55ID4gMCl7ICAgICAgLy8g5ZCR5LiK5ruRICAg5YWI5Yik5pateeaWueWQkeWBj+enu+mHjywg5aSE55CG5qiq5ZCR5ruR5Yqo55qE6Zeu6aKYIOaaguacquaJqeWxleWIsOaoquWQkea7keWKqFxyXG4gICAgICAgICAgICBpZiAoZGV2ID49IGNvbURldil7XHJcbiAgICAgICAgICAgICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm9sbEZvcndhcmQodGhpcy5tb3ZlVGltZSwgMSwgdHJ1ZSwgKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1MaXN0W3RoaXMuY3VyU2VsZWN0SW5kZXhdLnNldENoZWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clNlbGVjdEluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgodGhpcy5zaG93SW5kZXgsIHRoaXMuY2VudGVyQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25NZW51U2VsZWN0KHRoaXMuY3VyU2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgICAgICAgICAgICAgICAvLyDlkJHkuIvmu5FcclxuICAgICAgICAgICAgaWYgKGRldiA+PSBjb21EZXYpe1xyXG4gICAgICAgICAgICAgICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGxCYWNrKHRoaXMubW92ZVRpbWUsIDEsIHRydWUsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtTGlzdFt0aGlzLmN1clNlbGVjdEluZGV4XS5zZXRDaGVjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJTZWxlY3RJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCB0aGlzLmNlbnRlckNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTWVudVNlbGVjdCh0aGlzLmN1clNlbGVjdEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZW51SXRlbUNsaWNrKGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm9sbGluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm9sbEVuYWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b1JvbGxUb0l0ZW0oaW5kZXgsICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1MaXN0W3RoaXMuY3VyU2VsZWN0SW5kZXhdLnNldENoZWNrKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyU2VsZWN0SW5kZXggPSB0aGlzLmdldE5leHRJbmRleCh0aGlzLnNob3dJbmRleCwgdGhpcy5jZW50ZXJDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTWVudVNlbGVjdCh0aGlzLmN1clNlbGVjdEluZGV4KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zd2l0Y2hJdGVtV2l0aG91dFJvbGwoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWVudVNlbGVjdChpbmRleDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgY3VySXRlbSA9IHRoaXMuaXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjdXJJdGVtKXtcclxuICAgICAgICAgICAgY3VySXRlbS5zZXRDaGVjayh0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWVudVNlbGVjdFRhcmdldCAmJiB0aGlzLm1lbnVTZWxlY3RDYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVTZWxlY3RDYWxsYmFjay5jYWxsKHRoaXMubWVudVNlbGVjdFRhcmdldCwgY3VySXRlbS5rZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcIml0ZW0gbm90IGV4aXN0XCIsIGluZGV4LCB0aGlzLml0ZW1MaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNZW51SXRlbUNhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMubWVudVNlbGVjdENhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0VGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0RGF0YShsaXN0OiBhbnlbXSA9IFtdKXtcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIEdsb2JhbC5VSS5mYXN0VGlwKFwi6I+c5Y2V6aG55YiX6KGo5Li656m6OiBcIiArIGxpc3QubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhTGlzdCA9IGxpc3QgfHwgW107XHJcbiAgICAgICAgLy8g5pWw5o2u5pWw6YeP5bCP5LqOc2hvd0NvdW50IOiuvue9ruagh+W/l+S4jeWPr+a7muWKqCwg55u05o6l5Yi35pawXHJcbiAgICAgICAgdGhpcy5pc1JvbGxFbmFibGUgPSBsaXN0Lmxlbmd0aCA+PSB0aGlzLnNob3dDb3VudDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXREYXRhKGxpc3RbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gdGhpcy5pc1JvbGxFbmFibGU7ICAgICAgIC8vIOWPr+i9rOWKqOaXtuaYvuekuui+heWKqWl0ZW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0RGVmYXVsdFNlbGVjdChySW5kZXg/OiBudW1iZXIpe1xyXG4gICAgICAgIGlmIChySW5kZXggPj0gMClcclxuICAgICAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLmdldFByZXZSZWFsSW5kZXgockluZGV4LCB0aGlzLmNlbnRlckNvdW50KTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMucmVhbEluZGV4ID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zaG93Q291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBuZXh0ID0gdGhpcy5nZXROZXh0SW5kZXgodGhpcy5zaG93SW5kZXgsIGkpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbbmV4dF07XHJcbiAgICAgICAgICAgIGxldCB0ZW1wUmVhbEluZGV4ID0gdGhpcy5nZXROZXh0UmVhbEluZGV4KHRoaXMucmVhbEluZGV4LCBpKTtcclxuICAgICAgICAgICAgaXRlbS5zZXREYXRhKHRoaXMuZGF0YUxpc3RbdGVtcFJlYWxJbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgblNlbGVjdEluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgodGhpcy5zaG93SW5kZXgsIHRoaXMuY2VudGVyQ291bnQpO1xyXG4gICAgICAgIHRoaXMub25NZW51U2VsZWN0KG5TZWxlY3RJbmRleCk7XHJcbiAgICAgICAgdGhpcy5jdXJTZWxlY3RJbmRleCA9IG5TZWxlY3RJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF1dG9Sb2xsVG9JdGVtKGluZGV4OiBudW1iZXIsIGZpbmlzaENhbDogRnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBwb3MgPSBpbmRleCAtIHRoaXMuY3VyU2VsZWN0SW5kZXg7XHJcbiAgICAgICAgbGV0IGRldiA9IE1hdGguYWJzKHBvcyk7XHJcbiAgICAgICAgaWYgKGRldiA+IHRoaXMuY2VudGVyQ291bnQpeyAgICAvLyDotoXov4fmmL7npLrnmoTkuIDljYog5bCx5Y+N5ZCRXHJcbiAgICAgICAgICAgIGlmIChwb3MgPiAwKVxyXG4gICAgICAgICAgICAgICAgcG9zIC09IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcG9zICs9IHRoaXMudG90YWxDb3VudDtcclxuICAgICAgICAgICAgZGV2ID0gTWF0aC5hYnMocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRldiAhPSAwKXtcclxuICAgICAgICAgICAgdGhpcy5pc1JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAocG9zID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvbGxGb3J3YXJkKHRoaXMubW92ZVRpbWUsIGRldiwgdHJ1ZSwgZmluaXNoQ2FsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xsQmFjayh0aGlzLm1vdmVUaW1lLCBkZXYsIHRydWUsIGZpbmlzaENhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzd2l0Y2hJdGVtV2l0aG91dFJvbGwoaW5kZXg6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IHBvcyA9IGluZGV4IC0gdGhpcy5jdXJTZWxlY3RJbmRleDtcclxuICAgICAgICBsZXQgZGV2ID0gTWF0aC5hYnMocG9zKTtcclxuICAgICAgICBpZiAoZGV2ICE9IDApe1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNvdW50ID0gdGhpcy5kYXRhTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCByZWFsSW5kZXggPSB0aGlzLnJlYWxJbmRleDtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspeyAgICAgICAvLyDkuI3ml4vovawg56ys5LiA5LiqaXRlbee0ouW8leS4gOebtOmDveaYrzAg5YiH5o2i5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgckluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wSW5kZXggPSB0aGlzLmdldE5leHRSZWFsSW5kZXgodGhpcy5yZWFsSW5kZXgsIGkpOyAgICAgICAvLyDlhYjorqHnrpfmr4/kuKppdGVt55qE5b2T5YmNcmVhbEluZGV4LCDlho3liY3np7vmiJblkI7np7tcclxuICAgICAgICAgICAgICAgIGlmIChwb3MgPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBySW5kZXggPSB0aGlzLmdldE5leHRSZWFsSW5kZXgodGVtcEluZGV4LCBkZXYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBySW5kZXggPSB0aGlzLmdldFByZXZSZWFsSW5kZXgodGVtcEluZGV4LCBkZXYpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUxpc3RbckluZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXREYXRhKHRoaXMuZGF0YUxpc3RbckluZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbEluZGV4ID0gckluZGV4O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gZGF0YUNvdW50IC0gMSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHJlYWxJbmRleDtcclxuICAgICAgICAgICAgdGhpcy5vbk1lbnVTZWxlY3QodGhpcy5jdXJTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDovaznm5jlkJHkuIvovawgKi9cclxuICAgIHByaXZhdGUgcm9sbEJhY2sodGltZTogbnVtYmVyLCBzdGVwOiBudW1iZXIgPSAxLCBpc0FuaW06IGJvb2xlYW4gPSB0cnVlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKXtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJyb2xsQmFjayDlkJHkuIvovaxcIik7XHJcbiAgICAgICAgdGhpcy5zZXRIaWRlSXRlbURhdGFCYWNrKCk7ICAgICAgLy8g6K6+572u6aaW5bC+5pi+56S655qE5YaF5a655pu05pawXHJcbiAgICAgICAgbGV0IGZyYW1lSW5TZWNvbmQgPSBjYy5nYW1lLmdldEZyYW1lUmF0ZSgpO1xyXG4gICAgICAgIGxldCBldmVyeUZyYW1lID0gTWF0aC5mbG9vcihmcmFtZUluU2Vjb25kICogdGltZSAvIHN0ZXApO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBuZXh0ID0gdGhpcy5nZXROZXh0SW5kZXgoaSArIHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2hvd0luZGV4LCBzdGVwKTtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwicm9sbEJhY2tcIiwgdGhpcy5zaG93SW5kZXgsIGksIG5leHQpO1xyXG4gICAgICAgICAgICBpZiAoaXNBbmltKXtcclxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBzdGFydCA9IGNjLnYyKGl0ZW0ubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IHMgPSAxOyBzIDw9IHN0ZXA7IHMgKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0U3RlcCA9IHRoaXMuZ2V0TmV4dEluZGV4KGkgKyB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNob3dJbmRleCwgcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVuZCA9IGNjLnYyKHRoaXMuaXRlbVJhd1Bvc0FycltuZXh0U3RlcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5nZXRMZXJwUG9zQXJyKHN0YXJ0LCBlbmQsIGV2ZXJ5RnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyciA9IGFyci5jb25jYXQodGVtcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXJ0UnVuKGFycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRQb3NpdGlvbih0aGlzLml0ZW1SYXdQb3NBcnJbbmV4dF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpc0FuaW0pe1xyXG4gICAgICAgICAgICB0aGlzLmlzUm9sbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLm5vZGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1JvbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVhbEluZGV4ID0gdGhpcy5nZXRQcmV2UmVhbEluZGV4KHRoaXMucmVhbEluZGV4LCBzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0luZGV4ID0gdGhpcy5nZXRQcmV2SW5kZXgodGhpcy5zaG93SW5kZXgsIHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgdGltZSArIDAuMDUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZ2V0UHJldlJlYWxJbmRleCh0aGlzLnJlYWxJbmRleCwgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0luZGV4ID0gdGhpcy5nZXRQcmV2SW5kZXgodGhpcy5zaG93SW5kZXgsIHN0ZXApO1xyXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6L2s55uY5ZCR5LiK6L2sICovXHJcbiAgICBwcml2YXRlIHJvbGxGb3J3YXJkKHRpbWU6IG51bWJlciwgc3RlcDogbnVtYmVyID0gMSwgaXNBbmltOiBib29sZWFuID0gdHJ1ZSwgY2FsbGJhY2s/OiBGdW5jdGlvbil7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwicm9sbEZvcndhcmQg5ZCR5LiK6L2sXCIpO1xyXG4gICAgICAgIHRoaXMuc2V0SGlkZUl0ZW1EYXRhRm9yd2FyZCgpOyAgICAgLy8g6K6+572u6aaW5bC+5pi+56S655qE5YaF5a655pu05pawXHJcbiAgICAgICAgbGV0IGZyYW1lSW5TZWNvbmQgPSBjYy5nYW1lLmdldEZyYW1lUmF0ZSgpO1xyXG4gICAgICAgIGxldCBldmVyeUZyYW1lID0gTWF0aC5mbG9vcihmcmFtZUluU2Vjb25kICogdGltZSAvIHN0ZXApO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBwcmV2ID0gdGhpcy5nZXRQcmV2SW5kZXgoaSAgKyB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNob3dJbmRleCwgc3RlcCk7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcInJvbGxGb3J3YXJkXCIsIHRoaXMuc2hvd0luZGV4LCBpLCBwcmV2KTtcclxuICAgICAgICAgICAgaWYgKGlzQW5pbSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBjYy52MihpdGVtLm5vZGUucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBzID0gMTsgcyA8PSBzdGVwOyBzICsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFN0ZXAgPSB0aGlzLmdldFByZXZJbmRleChpICsgdGhpcy50b3RhbENvdW50IC0gdGhpcy5zaG93SW5kZXgsIHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbmQgPSBjYy52Mih0aGlzLml0ZW1SYXdQb3NBcnJbbmV4dFN0ZXBdKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMuZ2V0TGVycFBvc0FycihzdGFydCwgZW5kLCBldmVyeUZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgICAgICAgICAgICAgICBhcnIgPSBhcnIuY29uY2F0KHRlbXApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5zdGFydFJ1bihhcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24odGhpcy5pdGVtUmF3UG9zQXJyW3ByZXZdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZiAoaXNBbmltKXtcclxuICAgICAgICAgICAgdGhpcy5pc1JvbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNSb2xsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWxJbmRleCA9IHRoaXMuZ2V0TmV4dFJlYWxJbmRleCh0aGlzLnJlYWxJbmRleCwgc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIHRpbWUgKyAwLjA1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZWFsSW5kZXggPSB0aGlzLmdldE5leHRSZWFsSW5kZXgodGhpcy5yZWFsSW5kZXgsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dJbmRleCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwKTtcclxuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRIaWRlSXRlbURhdGFGb3J3YXJkKCl7XHJcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnNob3dDb3VudDtcclxuICAgICAgICBsZXQgbGFzdDJuZCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwKTtcclxuICAgICAgICBsZXQgbGFzdCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwICsgMSk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0Mm5kUmVhbEluZGV4ID0gdGhpcy5nZXROZXh0UmVhbEluZGV4KHRoaXMucmVhbEluZGV4LCBzdGVwKTtcclxuICAgICAgICBsZXQgbGFzdFJlYWxJbmRleCA9IHRoaXMuZ2V0TmV4dFJlYWxJbmRleCh0aGlzLnJlYWxJbmRleCwgc3RlcCArIDEpO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3RbbGFzdDJuZF0uc2V0RGF0YSh0aGlzLmRhdGFMaXN0W2xhc3QybmRSZWFsSW5kZXhdKTtcclxuICAgICAgICB0aGlzLml0ZW1MaXN0W2xhc3RdLnNldERhdGEodGhpcy5kYXRhTGlzdFtsYXN0UmVhbEluZGV4XSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRIaWRlSXRlbURhdGFCYWNrKCl7XHJcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnNob3dDb3VudDtcclxuICAgICAgICBsZXQgbGFzdDJuZCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwKTtcclxuICAgICAgICBsZXQgbGFzdCA9IHRoaXMuZ2V0TmV4dEluZGV4KHRoaXMuc2hvd0luZGV4LCBzdGVwICsgMSk7XHJcblxyXG4gICAgICAgIGxldCBsYXN0Mm5kUmVhbEluZGV4ID0gdGhpcy5nZXRQcmV2UmVhbEluZGV4KHRoaXMucmVhbEluZGV4LCAyKTtcclxuICAgICAgICBsZXQgbGFzdFJlYWxJbmRleCA9IHRoaXMuZ2V0UHJldlJlYWxJbmRleCh0aGlzLnJlYWxJbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdFtsYXN0Mm5kXS5zZXREYXRhKHRoaXMuZGF0YUxpc3RbbGFzdDJuZFJlYWxJbmRleF0pO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3RbbGFzdF0uc2V0RGF0YSh0aGlzLmRhdGFMaXN0W2xhc3RSZWFsSW5kZXhdKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBnZXRMZXJwUG9zQXJyKHN0YXJ0OiBjYy5WZWMyLCBlbmQ6IGNjLlZlYzIsIHRvdGFsRnJhbWU6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPD0gdG90YWxGcmFtZTsgaSsrKXtcclxuICAgICAgICAgICAgYXJyLnB1c2goc3RhcnQubGVycChlbmQsIGkgLyB0b3RhbEZyYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROZXh0SW5kZXgodmFsdWU6IG51bWJlciwgc3RlcDogbnVtYmVyID0gMSl7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSArIHN0ZXApICUgdGhpcy50b3RhbENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UHJldkluZGV4KHZhbHVlOiBudW1iZXIsIHN0ZXA6IG51bWJlciA9IDEpe1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgLSBzdGVwICsgdGhpcy50b3RhbENvdW50KSAlIHRoaXMudG90YWxDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5leHRSZWFsSW5kZXgodmFsdWU6IG51bWJlciwgc3RlcDogbnVtYmVyID0gMSl7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSArIHN0ZXApICUgdGhpcy5kYXRhTGlzdC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRQcmV2UmVhbEluZGV4KHZhbHVlOiBudW1iZXIsIHN0ZXA6IG51bWJlciA9IDEpe1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgLSBzdGVwICsgdGhpcy5kYXRhTGlzdC5sZW5ndGgpICUgdGhpcy5kYXRhTGlzdC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpe1xyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNZW51SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudHtcclxuICAgIHByaXZhdGUgdW5jaGVja05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNoZWNrTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgdW5jaGVja0ljb25TcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBjaGVja0ljb25TcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSB1bmNoZWNrVGV4dFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGNoZWNrVGV4dFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgdGFyZ2V0OiBhbnk7XHJcbiAgICBwcml2YXRlIF9rZXk6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9pbmRleDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZXQga2V5KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJ1bkVuYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBydW5Qb3NBcnI6IGNjLlZlYzNbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBmcmFtZUNvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLnVuY2hlY2tOb2RlID0gY2MuZmluZChcInVuY2hlY2tOb2RlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy51bmNoZWNrSWNvblNwID0gY2MuZmluZChcImljb25TcFwiLCB0aGlzLnVuY2hlY2tOb2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnVuY2hlY2tUZXh0U3AgPSBjYy5maW5kKFwidGV4dFNwXCIsIHRoaXMudW5jaGVja05vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tOb2RlID0gY2MuZmluZChcImNoZWNrTm9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tJY29uU3AgPSBjYy5maW5kKFwiaWNvblNwXCIsIHRoaXMuY2hlY2tOb2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmNoZWNrVGV4dFNwID0gY2MuZmluZChcInRleHRTcFwiLCB0aGlzLmNoZWNrTm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcblxyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25JdGVtQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREYXRhKGRhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5fa2V5ID0gZGF0YS5rZXk7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKFwicmVzb3VyY2VzXCIsIHRoaXMudW5jaGVja0ljb25TcCwgXCJoYWxsL2ltYWdlcy9jaXJjbGUvYXRsYXNfY2lyY2xlXCIsIGRhdGEuaWNvbik7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKFwicmVzb3VyY2VzXCIsIHRoaXMudW5jaGVja1RleHRTcCwgXCJoYWxsL2ltYWdlcy9jaXJjbGUvYXRsYXNfY2lyY2xlXCIsIGRhdGEudWNUZXh0KTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoXCJyZXNvdXJjZXNcIiwgdGhpcy5jaGVja0ljb25TcCwgXCJoYWxsL2ltYWdlcy9jaXJjbGUvYXRsYXNfY2lyY2xlXCIsIGRhdGEuaWNvbik7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlQXV0b0F0bGFzKFwicmVzb3VyY2VzXCIsIHRoaXMuY2hlY2tUZXh0U3AsIFwiaGFsbC9pbWFnZXMvY2lyY2xlL2F0bGFzX2NpcmNsZVwiLCBkYXRhLmNUZXh0KTtcclxuICAgICAgICBpZiAoIWRhdGEuY1RleHQpe1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVGV4dFNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGF0YS51Y1RleHQpe1xyXG4gICAgICAgICAgICB0aGlzLnVuY2hlY2tUZXh0U3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpbmRleCh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaW5kZXgoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENhbGxiYWNrKGZ1bmM6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSl7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGZ1bmM7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1DbGljaygpe1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHRoaXMudGFyZ2V0KXtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLmluZGV4LCB0aGlzLmtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDaGVjayhmbGFnOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLnVuY2hlY2tOb2RlLmFjdGl2ZSA9ICFmbGFnO1xyXG4gICAgICAgIHRoaXMuY2hlY2tOb2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0UnVuKGFycjogY2MuVmVjM1tdKXtcclxuICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ydW5Qb3NBcnIgPSBhcnI7XHJcbiAgICAgICAgICAgIHRoaXMucnVuRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZSgpe1xyXG4gICAgICAgIGlmICghdGhpcy5ydW5FbmFibGUgfHwgdGhpcy5ydW5Qb3NBcnIubGVuZ3RoIDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5ydW5Qb3NBcnJbdGhpcy5mcmFtZUNvdW50XTtcclxuICAgICAgICBpZiAocG9zKXtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb3VudCArPSAxO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZUNvdW50ID09IHRoaXMucnVuUG9zQXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bkVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5Qb3NBcnIgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==