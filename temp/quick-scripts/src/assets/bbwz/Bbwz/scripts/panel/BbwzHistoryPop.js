"use strict";
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