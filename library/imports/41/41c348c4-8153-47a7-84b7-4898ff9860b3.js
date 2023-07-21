"use strict";
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