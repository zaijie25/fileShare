
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzHistoryPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c310b3t/ZHDYXaNo1U+X4f', 'BbwzHistoryPop');
// bbwz/Bbwz/scripts/panel/BbwzHistoryPop.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("../subview/BbwzBaseView");
var BbwzBasePool_1 = require("../tool/BbwzBasePool");
var BbwzGameEvent_1 = require("../data/BbwzGameEvent");
var BbwzData_1 = require("../data/BbwzData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var viewShowCount = 8; // 一屏显示8
var maxShowCount = 30; // 总共显示最新的30
/** 弹窗 历史记录界面 */
var BbwzHistoryPop = /** @class */ (function (_super) {
    __extends(BbwzHistoryPop, _super);
    function BbwzHistoryPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOpen = false; // 引入打开变量 处理界面隐藏刷新item再打开scrollview定位不准问题
        return _this;
    }
    BbwzHistoryPop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
        this.historyInfoView = new HistoryInfo(cc.find("history", this.contentNode));
        this.historyInfoView.active = true;
        // 处理第一次打开卡顿问题
        Game.Event.on(BbwzGameEvent_1.default.onHistoryDataRes, this, this.onHisDataGet);
    };
    BbwzHistoryPop.prototype.onEnable = function () {
        var _this = this;
        this.animComp.doPopupOpenAnim(function () {
            _this.isOpen = true;
            // debug 动画过程中scroll会导致定位不到, 放到动画后
            _this.historyInfoView.scrollToSide();
        });
    };
    BbwzHistoryPop.prototype.onDisable = function () {
        this.isOpen = false;
    };
    BbwzHistoryPop.prototype.onDestroy = function () {
        Game.Event.off(BbwzGameEvent_1.default.onHistoryDataRes, this, this.onHisDataGet);
    };
    BbwzHistoryPop.prototype.onHisDataGet = function (isClear) {
        if (this.historyInfoView.curShowCount <= 0 || isClear) {
            this.showOnce();
        }
        else {
            this.updateAllUI();
        }
    };
    // 刚打开时 刷新数据
    BbwzHistoryPop.prototype.showOnce = function () {
        var total = BbwzData_1.default.instance.historyDataArr.length;
        var datas = BbwzData_1.default.instance.historyDataArr.slice(total - maxShowCount > 0 ? total - maxShowCount : 0, total);
        this.historyInfoView.curShowCount = datas.length;
        this.historyInfoView.updateUI(datas, this.isOpen);
    };
    // 打开着 刷新数据
    BbwzHistoryPop.prototype.updateAllUI = function () {
        var total = BbwzData_1.default.instance.historyDataArr.length;
        var datas = BbwzData_1.default.instance.historyDataArr.slice(total - maxShowCount > 0 ? total - maxShowCount : 0, total);
        var curCount = datas.length;
        // if (curCount != this.historyInfoView.curShowCount) {
        if (curCount - this.historyInfoView.curShowCount == 1) { // 添加单条数据
            var obj = datas[curCount - 1];
            this.historyInfoView.curShowCount = curCount;
            this.historyInfoView.addOne(obj, this.isOpen);
        }
        else { // 多条全刷新
            this.historyInfoView.curShowCount = curCount;
            this.historyInfoView.updateUI(datas, this.isOpen);
        }
        // }
    };
    BbwzHistoryPop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzHistoryPop = __decorate([
        ccclass
    ], BbwzHistoryPop);
    return BbwzHistoryPop;
}(cc.Component));
exports.default = BbwzHistoryPop;
/**
 * 走势滑动列表
 */
var HistoryInfo = /** @class */ (function (_super) {
    __extends(HistoryInfo, _super);
    function HistoryInfo(node) {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        /** 当前已显示多少局 */
        _this.curShowCount = 0;
        _this.setNode(node);
        return _this;
    }
    HistoryInfo.prototype.initView = function () {
        this.scrollView = this.getComponent("scrollView", cc.ScrollView);
        this.svLayout = this.getComponent("scrollView/view/content", cc.Layout);
        this.copyNode = this.getChild("scrollView/view/item");
        this.copyNode.active = false;
        var poolNode = this.getChild("pool");
        poolNode.active = false;
        this.pool = new HistoryItemPool(poolNode, this.copyNode);
    };
    HistoryInfo.prototype.updateUI = function (arr, isScroll) {
        var _this = this;
        if (isScroll === void 0) { isScroll = false; }
        this.clear();
        if (!arr || Global.Toolkit.isEmptyObject(arr))
            return;
        arr.forEach(function (data) {
            _this.addOneItem(data);
        });
        this.updateNewItem();
        if (isScroll) {
            this.scrollToSide(0);
        }
    };
    HistoryInfo.prototype.addOne = function (data, isScroll) {
        if (isScroll === void 0) { isScroll = false; }
        this.addOneItem(data);
        this.updateNewItem();
        if (isScroll) {
            this.scrollToSide(0.5);
        }
    };
    HistoryInfo.prototype.scrollToSide = function (time) {
        if (time === void 0) { time = 0; }
        if (this.scrollView.isScrolling())
            return;
        // debug 未超出显示区域时, 不能滚动右侧
        if (this.curShowCount > viewShowCount) {
            this.scrollView.scrollToRight(time);
        }
        else {
            this.scrollView.scrollToLeft(0);
        }
    };
    HistoryInfo.prototype.addOneItem = function (data) {
        var item = this.pool.getItem();
        item.active = true;
        item.setInfo(data.point);
        this.itemList.push(item);
        item.node.setParent(this.svLayout.node);
    };
    HistoryInfo.prototype.updateNewItem = function () {
        this.itemList.forEach(function (item) {
            item.setNew(false);
        });
        this.itemList[this.itemList.length - 1].setNew(true);
    };
    HistoryInfo.prototype.clear = function () {
        this.pool.recycleAll(this.itemList);
        this.itemList = [];
    };
    return HistoryInfo;
}(BbwzBaseView_1.default));
/**
 * 走势滑动列表item池
 */
var HistoryItemPool = /** @class */ (function (_super) {
    __extends(HistoryItemPool, _super);
    function HistoryItemPool(root, copyNode) {
        var _this = _super.call(this, root) || this;
        _this.root = root;
        _this.copyNode = copyNode;
        return _this;
    }
    Object.defineProperty(HistoryItemPool.prototype, "preCount", {
        get: function () {
            return 20;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HistoryItemPool.prototype, "everyCount", {
        get: function () {
            return 20;
        },
        enumerable: false,
        configurable: true
    });
    HistoryItemPool.prototype.createItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.active = true;
        var view = new HistoryItemView(node);
        view.active = true;
        return view;
    };
    HistoryItemPool.prototype.resetItem = function (item) {
        item.active = false;
        item.node.setParent(this.root);
    };
    return HistoryItemPool;
}(BbwzBasePool_1.default));
/**
 * 走势滑动列表item抽象
 */
var HistoryItemView = /** @class */ (function (_super) {
    __extends(HistoryItemView, _super);
    function HistoryItemView(node) {
        var _this = _super.call(this) || this;
        _this.winIconNodeList = [];
        _this.loseIconNodeList = [];
        _this.multLblList = [];
        _this.setNode(node);
        return _this;
    }
    HistoryItemView.prototype.initView = function () {
        this.newNode = this.getChild("newIcon");
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_COUNT; i++) {
            var winNode = this.getChild("win" + i);
            var loseNode = this.getChild("lose" + i);
            var lbl = this.getComponent("multLbl" + i, cc.Label);
            this.winIconNodeList.push(winNode);
            this.loseIconNodeList.push(loseNode);
            this.multLblList.push(lbl);
        }
    };
    /**
     * 设置历史数据
     * @param pointData {fu_bull: {hit: 0, multi: 4, win_multi: 4}, fu_zjh: {hit: 1, multi: 2, win_multi: -4}}
     */
    HistoryItemView.prototype.setInfo = function (pointData) {
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_COUNT; i++) {
            var key = BbwzConstDefine_1.default.BET_AREA_NAME[i];
            var winNode = this.winIconNodeList[i];
            var loseNode = this.loseIconNodeList[i];
            var multLbl = this.multLblList[i];
            if (pointData[key]) {
                var total = pointData[key].win_multi;
                winNode.active = total >= 0;
                loseNode.active = total < 0;
                multLbl.string = total > 0 ? ("+" + String(total)) : String(total);
            }
            else {
                winNode.active = false;
                loseNode.active = false;
                multLbl.node.active = false;
            }
        }
    };
    HistoryItemView.prototype.setNew = function (flag) {
        this.newNode.active = flag;
    };
    return HistoryItemView;
}(BbwzBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pIaXN0b3J5UG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUN0RCx3REFBbUQ7QUFDbkQscURBQWdEO0FBQ2hELHVEQUFrRDtBQUNsRCw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQVEsUUFBUTtBQUN4QyxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBUSxZQUFZO0FBRTVDLGdCQUFnQjtBQUVoQjtJQUE0QyxrQ0FBWTtJQUF4RDtRQUFBLHFFQWtGQztRQTlFVyxZQUFNLEdBQUcsS0FBSyxDQUFDLENBQVMseUNBQXlDOztJQThFN0UsQ0FBQztJQTFFYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4Rix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGNB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QUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUM7Z0JBQ2YsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDckMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUM1QixRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RTtpQkFDRztnQkFDQSxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDdkIsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUMvQjtTQUNKO0lBQ0wsQ0FBQztJQUVNLGdDQUFNLEdBQWIsVUFBYyxJQUFhO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQWxEQSxBQWtEQyxDQWxENkIsc0JBQVksR0FrRHpDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi4vc3Vidmlldy9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pCYXNlUG9vbCBmcm9tIFwiLi4vdG9vbC9CYnd6QmFzZVBvb2xcIjtcclxuaW1wb3J0IEJid3pHYW1lRXZlbnQgZnJvbSBcIi4uL2RhdGEvQmJ3ekdhbWVFdmVudFwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCB2aWV3U2hvd0NvdW50ID0gODsgICAgICAgIC8vIOS4gOWxj+aYvuekujhcclxuY29uc3QgbWF4U2hvd0NvdW50ID0gMzA7ICAgICAgICAvLyDmgLvlhbHmmL7npLrmnIDmlrDnmoQzMFxyXG5cclxuLyoqIOW8ueeqlyDljoblj7LorrDlvZXnlYzpnaIgKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekhpc3RvcnlQb3AgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBtYXNrTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgY29udGVudE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGFuaW1Db21wOiBhbnk7XHJcbiAgICBwcml2YXRlIGlzT3BlbiA9IGZhbHNlOyAgICAgICAgIC8vIOW8leWFpeaJk+W8gOWPmOmHjyDlpITnkIbnlYzpnaLpmpDol4/liLfmlrBpdGVt5YaN5omT5byAc2Nyb2xsdmlld+WumuS9jeS4jeWHhumXrumimFxyXG4gICAgXHJcbiAgICBwcml2YXRlIGhpc3RvcnlJbmZvVmlldzogSGlzdG9yeUluZm87XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5nZXRDb250ZW50U2l6ZSgpKTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlID0gY2MuZmluZChcIm1hc2tcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gY2MuZmluZChcImNvbnRlbnRcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmFuaW1Db21wID0gR2xvYmFsLlVJSGVscGVyLmFkZEFuaW1Db21wKHRoaXMubm9kZSwgdGhpcy5jb250ZW50Tm9kZSwgdGhpcy5tYXNrTm9kZSk7XHJcbiAgICAgICAgQmJ3ekNvbnN0RGVmaW5lLmFkZENvbW1vbkNsaWNrKHRoaXMuY29udGVudE5vZGUsIFwiYnV0dG9uX2Nsb3NlXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIm1hc2tcIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGlzdG9yeUluZm9WaWV3ID0gbmV3IEhpc3RvcnlJbmZvKGNjLmZpbmQoXCJoaXN0b3J5XCIsIHRoaXMuY29udGVudE5vZGUpKTtcclxuICAgICAgICB0aGlzLmhpc3RvcnlJbmZvVmlldy5hY3RpdmUgPSB0cnVlO1xyXG5cclxuXHRcdC8vIOWkhOeQhuesrOS4gOasoeaJk+W8gOWNoemhv+mXrumimFxyXG4gICAgICAgIEdhbWUuRXZlbnQub24oQmJ3ekdhbWVFdmVudC5vbkhpc3RvcnlEYXRhUmVzLCB0aGlzLCB0aGlzLm9uSGlzRGF0YUdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwT3BlbkFuaW0oKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBkZWJ1ZyDliqjnlLvov4fnqIvkuK1zY3JvbGzkvJrlr7zoh7TlrprkvY3kuI3liLAsIOaUvuWIsOWKqOeUu+WQjlxyXG4gICAgICAgICAgICB0aGlzLmhpc3RvcnlJbmZvVmlldy5zY3JvbGxUb1NpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCl7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoQmJ3ekdhbWVFdmVudC5vbkhpc3RvcnlEYXRhUmVzLCB0aGlzLCB0aGlzLm9uSGlzRGF0YUdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkhpc0RhdGFHZXQoaXNDbGVhcjogYm9vbGVhbil7XHJcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeUluZm9WaWV3LmN1clNob3dDb3VudCA8PSAwIHx8IGlzQ2xlYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93T25jZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBbGxVSSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g5Yia5omT5byA5pe2IOWIt+aWsOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzaG93T25jZSgpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSBCYnd6RGF0YS5pbnN0YW5jZS5oaXN0b3J5RGF0YUFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGRhdGFzID0gQmJ3ekRhdGEuaW5zdGFuY2UuaGlzdG9yeURhdGFBcnIuc2xpY2UodG90YWwgLSBtYXhTaG93Q291bnQgPiAwID8gdG90YWwgLSBtYXhTaG93Q291bnQgOiAwLCB0b3RhbCk7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5SW5mb1ZpZXcuY3VyU2hvd0NvdW50ID0gZGF0YXMubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLmhpc3RvcnlJbmZvVmlldy51cGRhdGVVSShkYXRhcywgdGhpcy5pc09wZW4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaJk+W8gOedgCDliLfmlrDmlbDmja5cclxuICAgIHB1YmxpYyB1cGRhdGVBbGxVSSgpIHtcclxuICAgICAgICBsZXQgdG90YWwgPSBCYnd6RGF0YS5pbnN0YW5jZS5oaXN0b3J5RGF0YUFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGRhdGFzID0gQmJ3ekRhdGEuaW5zdGFuY2UuaGlzdG9yeURhdGFBcnIuc2xpY2UodG90YWwgLSBtYXhTaG93Q291bnQgPiAwID8gdG90YWwgLSBtYXhTaG93Q291bnQgOiAwLCB0b3RhbCk7XHJcblxyXG4gICAgICAgIGxldCBjdXJDb3VudCA9IGRhdGFzLmxlbmd0aDtcclxuICAgICAgICAvLyBpZiAoY3VyQ291bnQgIT0gdGhpcy5oaXN0b3J5SW5mb1ZpZXcuY3VyU2hvd0NvdW50KSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJDb3VudCAtIHRoaXMuaGlzdG9yeUluZm9WaWV3LmN1clNob3dDb3VudCA9PSAxKSB7ICAgICAgIC8vIOa3u+WKoOWNleadoeaVsOaNrlxyXG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IGRhdGFzW2N1ckNvdW50IC0gMV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnlJbmZvVmlldy5jdXJTaG93Q291bnQgPSBjdXJDb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlzdG9yeUluZm9WaWV3LmFkZE9uZShvYmosIHRoaXMuaXNPcGVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHsgICAgICAgICAgLy8g5aSa5p2h5YWo5Yi35pawXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpc3RvcnlJbmZvVmlldy5jdXJTaG93Q291bnQgPSBjdXJDb3VudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlzdG9yeUluZm9WaWV3LnVwZGF0ZVVJKGRhdGFzLCB0aGlzLmlzT3Blbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQ2xpY2soKXtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb1BvcHVwQ2xvc2VBbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOi1sOWKv+a7keWKqOWIl+ihqFxyXG4gKi9cclxuY2xhc3MgSGlzdG9yeUluZm8gZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIHN2TGF5b3V0OiBjYy5MYXlvdXQ7XHJcbiAgICBwcml2YXRlIGNvcHlOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwb29sOiBIaXN0b3J5SXRlbVBvb2w7XHJcbiAgICBwcml2YXRlIGl0ZW1MaXN0OiBIaXN0b3J5SXRlbVZpZXdbXSA9IFtdO1xyXG4gICAgLyoqIOW9k+WJjeW3suaYvuekuuWkmuWwkeWxgCAqL1xyXG4gICAgcHVibGljIGN1clNob3dDb3VudCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3ID0gPGNjLlNjcm9sbFZpZXc+dGhpcy5nZXRDb21wb25lbnQoXCJzY3JvbGxWaWV3XCIsIGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc3ZMYXlvdXQgPSA8Y2MuTGF5b3V0PnRoaXMuZ2V0Q29tcG9uZW50KFwic2Nyb2xsVmlldy92aWV3L2NvbnRlbnRcIiwgY2MuTGF5b3V0KTtcclxuICAgICAgICB0aGlzLmNvcHlOb2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbFZpZXcvdmlldy9pdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuY29weU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBwb29sTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJwb29sXCIpO1xyXG4gICAgICAgIHBvb2xOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9vbCA9IG5ldyBIaXN0b3J5SXRlbVBvb2wocG9vbE5vZGUsIHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVVSShhcnI6IGFueVtdLCBpc1Njcm9sbDogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgaWYgKCFhcnIgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChhcnIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgYXJyLmZvckVhY2goZGF0YT0+e1xyXG4gICAgICAgICAgICB0aGlzLmFkZE9uZUl0ZW0oZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVOZXdJdGVtKCk7XHJcbiAgICAgICAgaWYgKGlzU2Nyb2xsKXtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NpZGUoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRPbmUoZGF0YSwgaXNTY3JvbGw6IGJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5hZGRPbmVJdGVtKGRhdGEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTmV3SXRlbSgpO1xyXG4gICAgICAgIGlmIChpc1Njcm9sbCl7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TaWRlKDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzY3JvbGxUb1NpZGUodGltZTogbnVtYmVyID0gMCl7XHJcbiAgICAgICAgaWYodGhpcy5zY3JvbGxWaWV3LmlzU2Nyb2xsaW5nKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gZGVidWcg5pyq6LaF5Ye65pi+56S65Yy65Z+f5pe2LCDkuI3og73mu5rliqjlj7PkvqdcclxuICAgICAgICBpZiAodGhpcy5jdXJTaG93Q291bnQgPiB2aWV3U2hvd0NvdW50KXtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvUmlnaHQodGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0xlZnQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkT25lSXRlbShkYXRhKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGl0ZW0uc2V0SW5mbyhkYXRhLnBvaW50KTtcclxuICAgICAgICB0aGlzLml0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLnN2TGF5b3V0Lm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVOZXdJdGVtKCl7XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgaXRlbS5zZXROZXcoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3RbdGhpcy5pdGVtTGlzdC5sZW5ndGggLSAxXS5zZXROZXcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy5wb29sLnJlY3ljbGVBbGwodGhpcy5pdGVtTGlzdCk7XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6LWw5Yq/5ruR5Yqo5YiX6KGoaXRlbeaxoFxyXG4gKi9cclxuY2xhc3MgSGlzdG9yeUl0ZW1Qb29sIGV4dGVuZHMgQmJ3ekJhc2VQb29sPEhpc3RvcnlJdGVtVmlldz57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm9vdDogY2MuTm9kZSwgcHJvdGVjdGVkIGNvcHlOb2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcihyb290KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHByZUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDIwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgZXZlcnlDb3VudCgpe1xyXG4gICAgICAgIHJldHVybiAyMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5Tm9kZSk7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB2aWV3ID0gbmV3IEhpc3RvcnlJdGVtVmlldyhub2RlKTtcclxuICAgICAgICB2aWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SXRlbShpdGVtOiBIaXN0b3J5SXRlbVZpZXcpe1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLnJvb3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6LWw5Yq/5ruR5Yqo5YiX6KGoaXRlbeaKveixoVxyXG4gKi9cclxuY2xhc3MgSGlzdG9yeUl0ZW1WaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBuZXdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5JY29uTm9kZUxpc3Q6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBsb3NlSWNvbk5vZGVMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgbXVsdExibExpc3Q6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLm5ld05vZGUgPSB0aGlzLmdldENoaWxkKFwibmV3SWNvblwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9DT1VOVDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHdpbk5vZGUgPSB0aGlzLmdldENoaWxkKFwid2luXCIgKyBpKTtcclxuICAgICAgICAgICAgbGV0IGxvc2VOb2RlID0gdGhpcy5nZXRDaGlsZChcImxvc2VcIiArIGkpO1xyXG4gICAgICAgICAgICBsZXQgbGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJtdWx0TGJsXCIgKyBpLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIHRoaXMud2luSWNvbk5vZGVMaXN0LnB1c2god2luTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9zZUljb25Ob2RlTGlzdC5wdXNoKGxvc2VOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5tdWx0TGJsTGlzdC5wdXNoKGxibCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Y6G5Y+y5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gcG9pbnREYXRhIHtmdV9idWxsOiB7aGl0OiAwLCBtdWx0aTogNCwgd2luX211bHRpOiA0fSwgZnVfempoOiB7aGl0OiAxLCBtdWx0aTogMiwgd2luX211bHRpOiAtNH19XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRJbmZvKHBvaW50RGF0YTogYW55KSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfQ09VTlQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBCYnd6Q29uc3REZWZpbmUuQkVUX0FSRUFfTkFNRVtpXTtcclxuICAgICAgICAgICAgbGV0IHdpbk5vZGUgPSB0aGlzLndpbkljb25Ob2RlTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGxvc2VOb2RlID0gdGhpcy5sb3NlSWNvbk5vZGVMaXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgbXVsdExibCA9IHRoaXMubXVsdExibExpc3RbaV07XHJcbiAgICAgICAgICAgIGlmIChwb2ludERhdGFba2V5XSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG90YWwgPSBwb2ludERhdGFba2V5XS53aW5fbXVsdGk7XHJcbiAgICAgICAgICAgICAgICB3aW5Ob2RlLmFjdGl2ZSA9IHRvdGFsID49IDA7XHJcbiAgICAgICAgICAgICAgICBsb3NlTm9kZS5hY3RpdmUgPSB0b3RhbCA8IDA7XHJcbiAgICAgICAgICAgICAgICBtdWx0TGJsLnN0cmluZyA9IHRvdGFsID4gMCA/IChcIitcIiArIFN0cmluZyh0b3RhbCkpIDogU3RyaW5nKHRvdGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgd2luTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvc2VOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbXVsdExibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXROZXcoZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5uZXdOb2RlLmFjdGl2ZSA9IGZsYWc7XHJcbiAgICB9XHJcbn0iXX0=