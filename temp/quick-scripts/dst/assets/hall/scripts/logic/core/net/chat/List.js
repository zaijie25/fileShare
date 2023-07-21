
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/chat/List.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9f765MRLpRF1LPK6Jhd+rM4', 'List');
// hall/scripts/logic/core/net/chat/List.ts

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
/******************************************
 * @author kL <klk0@qq.com>
 * @date 2019/6/6
 * @doc 列表组件.
 * @end
 ******************************************/
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple, menu = _a.menu, executionOrder = _a.executionOrder, requireComponent = _a.requireComponent;
var ListItem_1 = require("./ListItem");
var TemplateType;
(function (TemplateType) {
    TemplateType[TemplateType["NODE"] = 1] = "NODE";
    TemplateType[TemplateType["PREFAB"] = 2] = "PREFAB";
})(TemplateType || (TemplateType = {}));
var SlideType;
(function (SlideType) {
    SlideType[SlideType["NORMAL"] = 1] = "NORMAL";
    SlideType[SlideType["ADHERING"] = 2] = "ADHERING";
    SlideType[SlideType["PAGE"] = 3] = "PAGE";
})(SlideType || (SlideType = {}));
var SelectedType;
(function (SelectedType) {
    SelectedType[SelectedType["NONE"] = 0] = "NONE";
    SelectedType[SelectedType["SINGLE"] = 1] = "SINGLE";
    SelectedType[SelectedType["MULT"] = 2] = "MULT";
})(SelectedType || (SelectedType = {}));
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //模板类型
        _this.templateType = TemplateType.NODE;
        //模板Item（Node）
        _this.tmpNode = null;
        //模板Item（Prefab）
        _this.tmpPrefab = null;
        //滑动模式
        _this._slideMode = SlideType.NORMAL;
        //翻页作用距离
        _this.pageDistance = .3;
        //页面改变事件
        _this.pageChangeEvent = new cc.Component.EventHandler();
        //是否为虚拟列表（动态列表）
        _this._virtual = true;
        //是否为循环列表
        _this.cyclic = false;
        //缺省居中
        _this.lackCenter = false;
        //缺省可滑动
        _this.lackSlide = false;
        //刷新频率
        _this._updateRate = 0;
        //分帧渲染（每帧渲染的Item数量（<=0时关闭分帧渲染））
        _this.frameByFrameRenderNum = 0;
        //渲染事件（渲染器）
        _this.renderEvent = new cc.Component.EventHandler();
        //选择模式
        _this.selectedMode = SelectedType.NONE;
        _this.repeatEventSingle = false;
        //触发选择事件
        _this.selectedEvent = null; //new cc.Component.EventHandler();
        //当前选择id
        _this._selectedId = -1;
        _this._forceUpdate = false;
        _this._updateDone = true;
        //列表数量
        _this._numItems = 0;
        _this._inited = false;
        _this._needUpdateWidget = false;
        _this._aniDelRuning = false;
        _this._doneAfterUpdate = false;
        _this.adhering = false;
        _this._adheringBarrier = false;
        _this.curPageNum = 0;
        return _this;
    }
    Object.defineProperty(List.prototype, "slideMode", {
        get: function () {
            return this._slideMode;
        },
        set: function (val) {
            this._slideMode = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "virtual", {
        get: function () {
            return this._virtual;
        },
        set: function (val) {
            if (val != null)
                this._virtual = val;
            if (!CC_DEV && this._numItems != 0) {
                this._onScrolling();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "updateRate", {
        get: function () {
            return this._updateRate;
        },
        set: function (val) {
            if (val >= 0 && val <= 6) {
                this._updateRate = val;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "selectedId", {
        get: function () {
            return this._selectedId;
        },
        set: function (val) {
            var t = this;
            var item;
            switch (t.selectedMode) {
                case SelectedType.SINGLE: {
                    if (!t.repeatEventSingle && val == t._selectedId)
                        return;
                    item = t.getItemByListId(val);
                    // if (!item && val >= 0)
                    //     return;
                    var listItem = void 0;
                    if (t._selectedId >= 0)
                        t._lastSelectedId = t._selectedId;
                    else //如果＜0则取消选择，把_lastSelectedId也置空吧，如果以后有特殊需求再改吧。
                        t._lastSelectedId = null;
                    t._selectedId = val;
                    if (item) {
                        listItem = item.getComponent(ListItem_1.default);
                        listItem.selected = true;
                    }
                    if (t._lastSelectedId >= 0 && t._lastSelectedId != t._selectedId) {
                        var lastItem = t.getItemByListId(t._lastSelectedId);
                        if (lastItem) {
                            lastItem.getComponent(ListItem_1.default).selected = false;
                        }
                    }
                    if (t.selectedEvent) {
                        cc.Component.EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId == null ? null : (t._lastSelectedId % this._actualNumItems));
                    }
                    break;
                }
                case SelectedType.MULT: {
                    item = t.getItemByListId(val);
                    if (!item)
                        return;
                    var listItem = item.getComponent(ListItem_1.default);
                    if (t._selectedId >= 0)
                        t._lastSelectedId = t._selectedId;
                    t._selectedId = val;
                    var bool = !listItem.selected;
                    listItem.selected = bool;
                    var sub = t.multSelected.indexOf(val);
                    if (bool && sub < 0) {
                        t.multSelected.push(val);
                    }
                    else if (!bool && sub >= 0) {
                        t.multSelected.splice(sub, 1);
                    }
                    if (t.selectedEvent) {
                        cc.Component.EventHandler.emitEvents([t.selectedEvent], item, val % this._actualNumItems, t._lastSelectedId == null ? null : (t._lastSelectedId % this._actualNumItems), bool);
                    }
                    break;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "numItems", {
        get: function () {
            return this._actualNumItems;
        },
        set: function (val) {
            var t = this;
            if (!t.checkInited(false))
                return;
            if (val == null || val < 0) {
                cc.error('numItems set the wrong::', val);
                return;
            }
            t._actualNumItems = t._numItems = val;
            t._forceUpdate = true;
            if (t._virtual) {
                t._resizeContent();
                if (t.cyclic) {
                    t._numItems = t._cyclicNum * t._numItems;
                }
                t._onScrolling();
                if (!t.frameByFrameRenderNum && t.slideMode == SlideType.PAGE)
                    t.curPageNum = t.nearestListId;
            }
            else {
                var layout = t.content.getComponent(cc.Layout);
                if (layout) {
                    layout.enabled = true;
                }
                t._delRedundantItem();
                t.firstListId = 0;
                if (t.frameByFrameRenderNum > 0) {
                    //先渲染几个出来
                    var len = t.frameByFrameRenderNum > t._numItems ? t._numItems : t.frameByFrameRenderNum;
                    for (var n = 0; n < len; n++) {
                        t._createOrUpdateItem2(n);
                    }
                    if (t.frameByFrameRenderNum < t._numItems) {
                        t._updateCounter = t.frameByFrameRenderNum;
                        t._updateDone = false;
                    }
                }
                else {
                    for (var n = 0; n < val; n++) {
                        t._createOrUpdateItem2(n);
                    }
                    t.displayItemNum = val;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(List.prototype, "scrollView", {
        get: function () {
            return this._scrollView;
        },
        enumerable: false,
        configurable: true
    });
    //----------------------------------------------------------------------------
    List.prototype.onLoad = function () {
        this._init();
    };
    List.prototype.onDestroy = function () {
        var t = this;
        if (t._itemTmp && t._itemTmp.isValid)
            t._itemTmp.destroy();
        if (t.tmpNode && t.tmpNode.isValid)
            t.tmpNode.destroy();
        // let total = t._pool.size();
        while (t._pool.size()) {
            var node = t._pool.get();
            node.destroy();
        }
        // if (total)
        //     cc.log('-----------------' + t.node.name + '<List> destroy node total num. =>', total);
    };
    List.prototype.onEnable = function () {
        // if (!CC_EDITOR) 
        this._registerEvent();
        this._init();
    };
    List.prototype.onDisable = function () {
        // if (!CC_EDITOR) 
        this._unregisterEvent();
    };
    //注册事件
    List.prototype._registerEvent = function () {
        var t = this;
        t.node.on(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, true);
        t.node.on('touch-up', t._onTouchUp, t);
        t.node.on(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
        t.node.on('scroll-began', t._onScrollBegan, t, true);
        t.node.on('scroll-ended', t._onScrollEnded, t, true);
        t.node.on('scrolling', t._onScrolling, t, true);
        t.node.on(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    };
    //卸载事件
    List.prototype._unregisterEvent = function () {
        var t = this;
        t.node.off(cc.Node.EventType.TOUCH_START, t._onTouchStart, t, true);
        t.node.off('touch-up', t._onTouchUp, t);
        t.node.off(cc.Node.EventType.TOUCH_CANCEL, t._onTouchCancelled, t, true);
        t.node.off('scroll-began', t._onScrollBegan, t, true);
        t.node.off('scroll-ended', t._onScrollEnded, t, true);
        t.node.off('scrolling', t._onScrolling, t, true);
        t.node.off(cc.Node.EventType.SIZE_CHANGED, t._onSizeChanged, t);
    };
    //初始化各种..
    List.prototype._init = function () {
        var t = this;
        if (t._inited)
            return;
        t._scrollView = t.node.getComponent(cc.ScrollView);
        t.content = t._scrollView.content;
        if (!t.content) {
            cc.error(t.node.name + "'s cc.ScrollView unset content!");
            return;
        }
        t._layout = t.content.getComponent(cc.Layout);
        t._align = t._layout.type; //排列模式
        t._resizeMode = t._layout.resizeMode; //自适应模式
        t._startAxis = t._layout.startAxis;
        t._topGap = t._layout.paddingTop; //顶边距
        t._rightGap = t._layout.paddingRight; //右边距
        t._bottomGap = t._layout.paddingBottom; //底边距
        t._leftGap = t._layout.paddingLeft; //左边距
        t._columnGap = t._layout.spacingX; //列距
        t._lineGap = t._layout.spacingY; //行距
        t._colLineNum; //列数或行数（非GRID模式则=1，表示单列或单行）;
        t._verticalDir = t._layout.verticalDirection; //垂直排列子节点的方向
        t._horizontalDir = t._layout.horizontalDirection; //水平排列子节点的方向
        t.setTemplateItem(cc.instantiate(t.templateType == TemplateType.PREFAB ? t.tmpPrefab : t.tmpNode));
        // 特定的滑动模式处理
        if (t._slideMode == SlideType.ADHERING || t._slideMode == SlideType.PAGE) {
            t._scrollView.inertia = false;
            t._scrollView._onMouseWheel = function () {
                return;
            };
        }
        if (!t.virtual) // lackCenter 仅支持 Virtual 模式
            t.lackCenter = false;
        t._lastDisplayData = []; //最后一次刷新的数据
        t.displayData = []; //当前数据
        t._pool = new cc.NodePool(); //这是个池子..
        t._forceUpdate = false; //是否强制更新
        t._updateCounter = 0; //当前分帧渲染帧数
        t._updateDone = true; //分帧渲染是否完成
        t.curPageNum = 0; //当前页数
        if (t.cyclic || 0) {
            t._scrollView._processAutoScrolling = this._processAutoScrolling.bind(t);
            t._scrollView._startBounceBackIfNeeded = function () {
                return false;
            };
            // t._scrollView._scrollChildren = function () {
            //     return false;
            // }
        }
        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL: {
                switch (t._horizontalDir) {
                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                        t._alignCalcType = 1;
                        break;
                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                        t._alignCalcType = 2;
                        break;
                }
                break;
            }
            case cc.Layout.Type.VERTICAL: {
                switch (t._verticalDir) {
                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                        t._alignCalcType = 3;
                        break;
                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                        t._alignCalcType = 4;
                        break;
                }
                break;
            }
            case cc.Layout.Type.GRID: {
                switch (t._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        switch (t._verticalDir) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM:
                                t._alignCalcType = 3;
                                break;
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP:
                                t._alignCalcType = 4;
                                break;
                        }
                        break;
                    case cc.Layout.AxisDirection.VERTICAL:
                        switch (t._horizontalDir) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT:
                                t._alignCalcType = 1;
                                break;
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT:
                                t._alignCalcType = 2;
                                break;
                        }
                        break;
                }
                break;
            }
        }
        // 清空 content
        // t.content.children.forEach((child: cc.Node) => {
        //     child.removeFromParent();
        //     if (child != t.tmpNode && child.isValid)
        //         child.destroy();
        // });
        t.content.removeAllChildren();
        t._inited = true;
    };
    /**
     * 为了实现循环列表，必须覆写cc.ScrollView的某些函数
     * @param {Number} dt
     */
    List.prototype._processAutoScrolling = function (dt) {
        // let isAutoScrollBrake = this._scrollView._isNecessaryAutoScrollBrake();
        var brakingFactor = 1;
        this._scrollView['_autoScrollAccumulatedTime'] += dt * (1 / brakingFactor);
        var percentage = Math.min(1, this._scrollView['_autoScrollAccumulatedTime'] / this._scrollView['_autoScrollTotalTime']);
        if (this._scrollView['_autoScrollAttenuate']) {
            var time = percentage - 1;
            percentage = time * time * time * time * time + 1;
        }
        var newPosition = this._scrollView['_autoScrollStartPosition'].add(this._scrollView['_autoScrollTargetDelta'].mul(percentage));
        var EPSILON = this._scrollView['getScrollEndedEventTiming']();
        var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
        // cc.log(reachedEnd, Math.abs(percentage - 1), EPSILON)
        var fireEvent = Math.abs(percentage - 1) <= this._scrollView['getScrollEndedEventTiming']();
        if (fireEvent && !this._scrollView['_isScrollEndedWithThresholdEventFired']) {
            this._scrollView['_dispatchEvent']('scroll-ended-with-threshold');
            this._scrollView['_isScrollEndedWithThresholdEventFired'] = true;
        }
        // if (this._scrollView.elastic && !reachedEnd) {
        //     let brakeOffsetPosition = newPosition.sub(this._scrollView._autoScrollBrakingStartPosition);
        //     if (isAutoScrollBrake) {
        //         brakeOffsetPosition = brakeOffsetPosition.mul(brakingFactor);
        //     }
        //     newPosition = this._scrollView._autoScrollBrakingStartPosition.add(brakeOffsetPosition);
        // } else {
        //     let moveDelta = newPosition.sub(this._scrollView.getContentPosition());
        //     let outOfBoundary = this._scrollView._getHowMuchOutOfBoundary(moveDelta);
        //     if (!outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
        //         newPosition = newPosition.add(outOfBoundary);
        //         reachedEnd = true;
        //     }
        // }
        if (reachedEnd) {
            this._scrollView['_autoScrolling'] = false;
        }
        var deltaMove = newPosition.sub(this._scrollView.getContentPosition());
        // cc.log(deltaMove)
        this._scrollView['_moveContent'](this._scrollView['_clampDelta'](deltaMove), reachedEnd);
        this._scrollView['_dispatchEvent']('scrolling');
        // scollTo API controll move
        if (!this._scrollView['_autoScrolling']) {
            this._scrollView['_isBouncing'] = false;
            this._scrollView['_scrolling'] = false;
            this._scrollView['_dispatchEvent']('scroll-ended');
        }
    };
    //设置模板Item
    List.prototype.setTemplateItem = function (item) {
        if (!item)
            return;
        var t = this;
        t._itemTmp = item;
        if (t._resizeMode == cc.Layout.ResizeMode.CHILDREN)
            t._itemSize = t._layout.cellSize;
        else
            t._itemSize = cc.size(item.width, item.height);
        //获取ListItem，如果没有就取消选择模式
        var com = item.getComponent(ListItem_1.default);
        var remove = false;
        if (!com)
            remove = true;
        // if (com) {
        //     if (!com._btnCom && !item.getComponent(cc.Button)) {
        //         remove = true;
        //     }
        // }
        if (remove) {
            t.selectedMode = SelectedType.NONE;
        }
        com = item.getComponent(cc.Widget);
        if (com && com.enabled) {
            t._needUpdateWidget = true;
        }
        if (t.selectedMode == SelectedType.MULT)
            t.multSelected = [];
        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL:
                t._colLineNum = 1;
                t._sizeType = false;
                break;
            case cc.Layout.Type.VERTICAL:
                t._colLineNum = 1;
                t._sizeType = true;
                break;
            case cc.Layout.Type.GRID:
                switch (t._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        //计算列数
                        var trimW = t.content.width - t._leftGap - t._rightGap;
                        t._colLineNum = Math.floor((trimW + t._columnGap) / (t._itemSize.width + t._columnGap));
                        t._sizeType = true;
                        break;
                    case cc.Layout.AxisDirection.VERTICAL:
                        //计算行数
                        var trimH = t.content.height - t._topGap - t._bottomGap;
                        t._colLineNum = Math.floor((trimH + t._lineGap) / (t._itemSize.height + t._lineGap));
                        t._sizeType = false;
                        break;
                }
                break;
        }
    };
    /**
     * 检查是否初始化
     * @param {Boolean} printLog 是否打印错误信息
     * @returns
     */
    List.prototype.checkInited = function (printLog) {
        if (printLog === void 0) { printLog = true; }
        if (!this._inited) {
            if (printLog)
                cc.error('List initialization not completed!');
            return false;
        }
        return true;
    };
    //禁用 Layout 组件，自行计算 Content Size
    List.prototype._resizeContent = function () {
        var t = this;
        var result;
        switch (t._align) {
            case cc.Layout.Type.HORIZONTAL: {
                if (t._customSize) {
                    var fixed = t._getFixedSize(null);
                    result = t._leftGap + fixed.val + (t._itemSize.width * (t._numItems - fixed.count)) + (t._columnGap * (t._numItems - 1)) + t._rightGap;
                }
                else {
                    result = t._leftGap + (t._itemSize.width * t._numItems) + (t._columnGap * (t._numItems - 1)) + t._rightGap;
                }
                break;
            }
            case cc.Layout.Type.VERTICAL: {
                if (t._customSize) {
                    var fixed = t._getFixedSize(null);
                    result = t._topGap + fixed.val + (t._itemSize.height * (t._numItems - fixed.count)) + (t._lineGap * (t._numItems - 1)) + t._bottomGap;
                }
                else {
                    result = t._topGap + (t._itemSize.height * t._numItems) + (t._lineGap * (t._numItems - 1)) + t._bottomGap;
                }
                break;
            }
            case cc.Layout.Type.GRID: {
                //网格模式不支持居中
                if (t.lackCenter)
                    t.lackCenter = false;
                switch (t._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL:
                        var lineNum = Math.ceil(t._numItems / t._colLineNum);
                        result = t._topGap + (t._itemSize.height * lineNum) + (t._lineGap * (lineNum - 1)) + t._bottomGap;
                        break;
                    case cc.Layout.AxisDirection.VERTICAL:
                        var colNum = Math.ceil(t._numItems / t._colLineNum);
                        result = t._leftGap + (t._itemSize.width * colNum) + (t._columnGap * (colNum - 1)) + t._rightGap;
                        break;
                }
                break;
            }
        }
        var layout = t.content.getComponent(cc.Layout);
        if (layout)
            layout.enabled = false;
        t._allItemSize = result;
        t._allItemSizeNoEdge = t._allItemSize - (t._sizeType ? (t._topGap + t._bottomGap) : (t._leftGap + t._rightGap));
        if (t.cyclic) {
            var totalSize = (t._sizeType ? t.node.height : t.node.width);
            t._cyclicPos1 = 0;
            totalSize -= t._cyclicPos1;
            t._cyclicNum = Math.ceil(totalSize / t._allItemSizeNoEdge) + 1;
            var spacing = t._sizeType ? t._lineGap : t._columnGap;
            t._cyclicPos2 = t._cyclicPos1 + t._allItemSizeNoEdge + spacing;
            t._cyclicAllItemSize = t._allItemSize + (t._allItemSizeNoEdge * (t._cyclicNum - 1)) + (spacing * (t._cyclicNum - 1));
            t._cycilcAllItemSizeNoEdge = t._allItemSizeNoEdge * t._cyclicNum;
            t._cycilcAllItemSizeNoEdge += spacing * (t._cyclicNum - 1);
            // cc.log('_cyclicNum ->', t._cyclicNum, t._allItemSizeNoEdge, t._allItemSize, t._cyclicPos1, t._cyclicPos2);
        }
        t._lack = !t.cyclic && t._allItemSize < (t._sizeType ? t.node.height : t.node.width);
        var slideOffset = ((!t._lack || !t.lackCenter) && t.lackSlide) ? 0 : .1;
        var targetWH = t._lack ? ((t._sizeType ? t.node.height : t.node.width) - slideOffset) : (t.cyclic ? t._cyclicAllItemSize : t._allItemSize);
        if (targetWH < 0)
            targetWH = 0;
        if (t._sizeType) {
            t.content.height = targetWH;
        }
        else {
            t.content.width = targetWH;
        }
        // cc.log('_resizeContent()  numItems =', t._numItems, '，content =', t.content);
    };
    //滚动进行时...
    List.prototype._onScrolling = function (ev) {
        if (ev === void 0) { ev = null; }
        if (this.frameCount == null)
            this.frameCount = this._updateRate;
        if (!this._forceUpdate && (ev && ev.type != 'scroll-ended') && this.frameCount > 0) {
            this.frameCount--;
            return;
        }
        else
            this.frameCount = this._updateRate;
        if (this._aniDelRuning)
            return;
        //循环列表处理
        if (this.cyclic) {
            var scrollPos = this.content.getPosition();
            scrollPos = this._sizeType ? scrollPos.y : scrollPos.x;
            var addVal = this._allItemSizeNoEdge + (this._sizeType ? this._lineGap : this._columnGap);
            var add = this._sizeType ? cc.v2(0, addVal) : cc.v2(addVal, 0);
            switch (this._alignCalcType) {
                case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                    if (scrollPos > -this._cyclicPos1) {
                        this.content.x = -this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].sub(add);
                        }
                        // if (this._beganPos) {
                        //     this._beganPos += add;
                        // }
                    }
                    else if (scrollPos < -this._cyclicPos2) {
                        this.content.x = -this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].add(add);
                        }
                        // if (this._beganPos) {
                        //     this._beganPos -= add;
                        // }
                    }
                    break;
                case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                    if (scrollPos < this._cyclicPos1) {
                        this.content.x = this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].add(add);
                        }
                    }
                    else if (scrollPos > this._cyclicPos2) {
                        this.content.x = this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].sub(add);
                        }
                    }
                    break;
                case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (scrollPos < this._cyclicPos1) {
                        this.content.y = this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].add(add);
                        }
                    }
                    else if (scrollPos > this._cyclicPos2) {
                        this.content.y = this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].sub(add);
                        }
                    }
                    break;
                case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (scrollPos > -this._cyclicPos1) {
                        this.content.y = -this._cyclicPos2;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].sub(add);
                        }
                    }
                    else if (scrollPos < -this._cyclicPos2) {
                        this.content.y = -this._cyclicPos1;
                        if (this._scrollView.isAutoScrolling()) {
                            this._scrollView['_autoScrollStartPosition'] = this._scrollView['_autoScrollStartPosition'].add(add);
                        }
                    }
                    break;
            }
        }
        this._calcViewPos();
        var vTop, vRight, vBottom, vLeft;
        if (this._sizeType) {
            vTop = this.viewTop;
            vBottom = this.viewBottom;
        }
        else {
            vRight = this.viewRight;
            vLeft = this.viewLeft;
        }
        if (this._virtual) {
            this.displayData = [];
            var itemPos = void 0;
            var curId = 0;
            var endId = this._numItems - 1;
            if (this._customSize) {
                var breakFor = false;
                //如果该item的位置在可视区域内，就推入displayData
                for (; curId <= endId && !breakFor; curId++) {
                    itemPos = this._calcItemPos(curId);
                    switch (this._align) {
                        case cc.Layout.Type.HORIZONTAL:
                            if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                                this.displayData.push(itemPos);
                            }
                            else if (curId != 0 && this.displayData.length > 0) {
                                breakFor = true;
                            }
                            break;
                        case cc.Layout.Type.VERTICAL:
                            if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                                this.displayData.push(itemPos);
                            }
                            else if (curId != 0 && this.displayData.length > 0) {
                                breakFor = true;
                            }
                            break;
                        case cc.Layout.Type.GRID:
                            switch (this._startAxis) {
                                case cc.Layout.AxisDirection.HORIZONTAL:
                                    if (itemPos.bottom <= vTop && itemPos.top >= vBottom) {
                                        this.displayData.push(itemPos);
                                    }
                                    else if (curId != 0 && this.displayData.length > 0) {
                                        breakFor = true;
                                    }
                                    break;
                                case cc.Layout.AxisDirection.VERTICAL:
                                    if (itemPos.right >= vLeft && itemPos.left <= vRight) {
                                        this.displayData.push(itemPos);
                                    }
                                    else if (curId != 0 && this.displayData.length > 0) {
                                        breakFor = true;
                                    }
                                    break;
                            }
                            break;
                    }
                }
            }
            else {
                var ww = this._itemSize.width + this._columnGap;
                var hh = this._itemSize.height + this._lineGap;
                switch (this._alignCalcType) {
                    case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                        curId = (vLeft + this._leftGap) / ww;
                        endId = (vRight + this._rightGap) / ww;
                        break;
                    case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                        curId = (-vRight - this._rightGap) / ww;
                        endId = (-vLeft - this._leftGap) / ww;
                        break;
                    case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                        curId = (-vTop - this._topGap) / hh;
                        endId = (-vBottom - this._bottomGap) / hh;
                        break;
                    case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                        curId = (vBottom + this._bottomGap) / hh;
                        endId = (vTop + this._topGap) / hh;
                        break;
                }
                curId = Math.floor(curId) * this._colLineNum;
                endId = Math.ceil(endId) * this._colLineNum;
                endId--;
                if (curId < 0)
                    curId = 0;
                if (endId >= this._numItems)
                    endId = this._numItems - 1;
                for (; curId <= endId; curId++) {
                    this.displayData.push(this._calcItemPos(curId));
                }
            }
            this._delRedundantItem();
            if (this.displayData.length <= 0 || !this._numItems) { //if none, delete all.
                this._lastDisplayData = [];
                return;
            }
            this.firstListId = this.displayData[0].id;
            this.displayItemNum = this.displayData.length;
            var len = this._lastDisplayData.length;
            var haveDataChange = this.displayItemNum != len;
            if (haveDataChange) {
                // 如果是逐帧渲染，需要排序
                if (this.frameByFrameRenderNum > 0) {
                    this._lastDisplayData.sort(function (a, b) { return a - b; });
                }
                // 因List的显示数据是有序的，所以只需要判断数组长度是否相等，以及头、尾两个元素是否相等即可。
                haveDataChange = this.firstListId != this._lastDisplayData[0] || this.displayData[this.displayItemNum - 1].id != this._lastDisplayData[len - 1];
            }
            if (this._forceUpdate || haveDataChange) { //如果是强制更新
                if (this.frameByFrameRenderNum > 0) {
                    // if (this._updateDone) {
                    // this._lastDisplayData = [];
                    //逐帧渲染
                    if (this._numItems > 0) {
                        if (!this._updateDone) {
                            this._doneAfterUpdate = true;
                        }
                        else {
                            this._updateCounter = 0;
                        }
                        this._updateDone = false;
                    }
                    else {
                        this._updateCounter = 0;
                        this._updateDone = true;
                    }
                    // }
                }
                else {
                    //直接渲染
                    this._lastDisplayData = [];
                    // cc.log('List Display Data II::', this.displayData);
                    for (var c = 0; c < this.displayItemNum; c++) {
                        this._createOrUpdateItem(this.displayData[c]);
                    }
                    this._forceUpdate = false;
                }
            }
            this._calcNearestItem();
        }
    };
    //计算可视范围
    List.prototype._calcViewPos = function () {
        var scrollPos = this.content.getPosition();
        switch (this._alignCalcType) {
            case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                this.elasticLeft = scrollPos.x > 0 ? scrollPos.x : 0;
                this.viewLeft = (scrollPos.x < 0 ? -scrollPos.x : 0) - this.elasticLeft;
                this.viewRight = this.viewLeft + this.node.width;
                this.elasticRight = this.viewRight > this.content.width ? Math.abs(this.viewRight - this.content.width) : 0;
                this.viewRight += this.elasticRight;
                // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);
                break;
            case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                this.elasticRight = scrollPos.x < 0 ? -scrollPos.x : 0;
                this.viewRight = (scrollPos.x > 0 ? -scrollPos.x : 0) + this.elasticRight;
                this.viewLeft = this.viewRight - this.node.width;
                this.elasticLeft = this.viewLeft < -this.content.width ? Math.abs(this.viewLeft + this.content.width) : 0;
                this.viewLeft -= this.elasticLeft;
                // cc.log(this.elasticLeft, this.elasticRight, this.viewLeft, this.viewRight);
                break;
            case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                this.elasticTop = scrollPos.y < 0 ? Math.abs(scrollPos.y) : 0;
                this.viewTop = (scrollPos.y > 0 ? -scrollPos.y : 0) + this.elasticTop;
                this.viewBottom = this.viewTop - this.node.height;
                this.elasticBottom = this.viewBottom < -this.content.height ? Math.abs(this.viewBottom + this.content.height) : 0;
                this.viewBottom += this.elasticBottom;
                // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);
                break;
            case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                this.elasticBottom = scrollPos.y > 0 ? Math.abs(scrollPos.y) : 0;
                this.viewBottom = (scrollPos.y < 0 ? -scrollPos.y : 0) - this.elasticBottom;
                this.viewTop = this.viewBottom + this.node.height;
                this.elasticTop = this.viewTop > this.content.height ? Math.abs(this.viewTop - this.content.height) : 0;
                this.viewTop -= this.elasticTop;
                // cc.log(this.elasticTop, this.elasticBottom, this.viewTop, this.viewBottom);
                break;
        }
    };
    //计算位置 根据id
    List.prototype._calcItemPos = function (id) {
        var width, height, top, bottom, left, right, itemX, itemY;
        switch (this._align) {
            case cc.Layout.Type.HORIZONTAL:
                switch (this._horizontalDir) {
                    case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT: {
                        if (this._customSize) {
                            var fixed = this._getFixedSize(id);
                            left = this._leftGap + ((this._itemSize.width + this._columnGap) * (id - fixed.count)) + (fixed.val + (this._columnGap * fixed.count));
                            var cs = this._customSize[id];
                            width = (cs > 0 ? cs : this._itemSize.width);
                        }
                        else {
                            left = this._leftGap + ((this._itemSize.width + this._columnGap) * id);
                            width = this._itemSize.width;
                        }
                        right = left + width;
                        if (this.lackCenter) {
                            var offset = (this.content.width / 2) - (this._allItemSizeNoEdge / 2);
                            left += offset;
                            right += offset;
                        }
                        return {
                            id: id,
                            left: left,
                            right: right,
                            x: left + (this._itemTmp.anchorX * width),
                            y: this._itemTmp.y,
                        };
                    }
                    case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT: {
                        if (this._customSize) {
                            var fixed = this._getFixedSize(id);
                            right = -this._rightGap - ((this._itemSize.width + this._columnGap) * (id - fixed.count)) - (fixed.val + (this._columnGap * fixed.count));
                            var cs = this._customSize[id];
                            width = (cs > 0 ? cs : this._itemSize.width);
                        }
                        else {
                            right = -this._rightGap - ((this._itemSize.width + this._columnGap) * id);
                            width = this._itemSize.width;
                        }
                        left = right - width;
                        if (this.lackCenter) {
                            var offset = (this.content.width / 2) - (this._allItemSizeNoEdge / 2);
                            left -= offset;
                            right -= offset;
                        }
                        return {
                            id: id,
                            right: right,
                            left: left,
                            x: left + (this._itemTmp.anchorX * width),
                            y: this._itemTmp.y,
                        };
                    }
                }
                break;
            case cc.Layout.Type.VERTICAL: {
                switch (this._verticalDir) {
                    case cc.Layout.VerticalDirection.TOP_TO_BOTTOM: {
                        if (this._customSize) {
                            var fixed = this._getFixedSize(id);
                            top = -this._topGap - ((this._itemSize.height + this._lineGap) * (id - fixed.count)) - (fixed.val + (this._lineGap * fixed.count));
                            var cs = this._customSize[id];
                            height = (cs > 0 ? cs : this._itemSize.height);
                        }
                        else {
                            top = -this._topGap - ((this._itemSize.height + this._lineGap) * id);
                            height = this._itemSize.height;
                        }
                        bottom = top - height;
                        if (this.lackCenter) {
                            var offset = (this.content.height / 2) - (this._allItemSizeNoEdge / 2);
                            top -= offset;
                            bottom -= offset;
                        }
                        return {
                            id: id,
                            top: top,
                            bottom: bottom,
                            x: this._itemTmp.x,
                            y: bottom + (this._itemTmp.anchorY * height),
                        };
                    }
                    case cc.Layout.VerticalDirection.BOTTOM_TO_TOP: {
                        if (this._customSize) {
                            var fixed = this._getFixedSize(id);
                            bottom = this._bottomGap + ((this._itemSize.height + this._lineGap) * (id - fixed.count)) + (fixed.val + (this._lineGap * fixed.count));
                            var cs = this._customSize[id];
                            height = (cs > 0 ? cs : this._itemSize.height);
                        }
                        else {
                            bottom = this._bottomGap + ((this._itemSize.height + this._lineGap) * id);
                            height = this._itemSize.height;
                        }
                        top = bottom + height;
                        if (this.lackCenter) {
                            var offset = (this.content.height / 2) - (this._allItemSizeNoEdge / 2);
                            top += offset;
                            bottom += offset;
                        }
                        return {
                            id: id,
                            top: top,
                            bottom: bottom,
                            x: this._itemTmp.x,
                            y: bottom + (this._itemTmp.anchorY * height),
                        };
                        break;
                    }
                }
            }
            case cc.Layout.Type.GRID: {
                var colLine = Math.floor(id / this._colLineNum);
                switch (this._startAxis) {
                    case cc.Layout.AxisDirection.HORIZONTAL: {
                        switch (this._verticalDir) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM: {
                                top = -this._topGap - ((this._itemSize.height + this._lineGap) * colLine);
                                bottom = top - this._itemSize.height;
                                itemY = bottom + (this._itemTmp.anchorY * this._itemSize.height);
                                break;
                            }
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP: {
                                bottom = this._bottomGap + ((this._itemSize.height + this._lineGap) * colLine);
                                top = bottom + this._itemSize.height;
                                itemY = bottom + (this._itemTmp.anchorY * this._itemSize.height);
                                break;
                            }
                        }
                        itemX = this._leftGap + ((id % this._colLineNum) * (this._itemSize.width + this._columnGap));
                        switch (this._horizontalDir) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT: {
                                itemX += (this._itemTmp.anchorX * this._itemSize.width);
                                itemX -= (this.content.anchorX * this.content.width);
                                break;
                            }
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT: {
                                itemX += ((1 - this._itemTmp.anchorX) * this._itemSize.width);
                                itemX -= ((1 - this.content.anchorX) * this.content.width);
                                itemX *= -1;
                                break;
                            }
                        }
                        return {
                            id: id,
                            top: top,
                            bottom: bottom,
                            x: itemX,
                            y: itemY,
                        };
                    }
                    case cc.Layout.AxisDirection.VERTICAL: {
                        switch (this._horizontalDir) {
                            case cc.Layout.HorizontalDirection.LEFT_TO_RIGHT: {
                                left = this._leftGap + ((this._itemSize.width + this._columnGap) * colLine);
                                right = left + this._itemSize.width;
                                itemX = left + (this._itemTmp.anchorX * this._itemSize.width);
                                itemX -= (this.content.anchorX * this.content.width);
                                break;
                            }
                            case cc.Layout.HorizontalDirection.RIGHT_TO_LEFT: {
                                right = -this._rightGap - ((this._itemSize.width + this._columnGap) * colLine);
                                left = right - this._itemSize.width;
                                itemX = left + (this._itemTmp.anchorX * this._itemSize.width);
                                itemX += ((1 - this.content.anchorX) * this.content.width);
                                break;
                            }
                        }
                        itemY = -this._topGap - ((id % this._colLineNum) * (this._itemSize.height + this._lineGap));
                        switch (this._verticalDir) {
                            case cc.Layout.VerticalDirection.TOP_TO_BOTTOM: {
                                itemY -= ((1 - this._itemTmp.anchorY) * this._itemSize.height);
                                itemY += ((1 - this.content.anchorY) * this.content.height);
                                break;
                            }
                            case cc.Layout.VerticalDirection.BOTTOM_TO_TOP: {
                                itemY -= ((this._itemTmp.anchorY) * this._itemSize.height);
                                itemY += (this.content.anchorY * this.content.height);
                                itemY *= -1;
                                break;
                            }
                        }
                        return {
                            id: id,
                            left: left,
                            right: right,
                            x: itemX,
                            y: itemY,
                        };
                    }
                }
                break;
            }
        }
    };
    //计算已存在的Item的位置
    List.prototype._calcExistItemPos = function (id) {
        var item = this.getItemByListId(id);
        if (!item)
            return null;
        var data = {
            id: id,
            x: item.x,
            y: item.y,
        };
        if (this._sizeType) {
            data.top = item.y + (item.height * (1 - item.anchorY));
            data.bottom = item.y - (item.height * item.anchorY);
        }
        else {
            data.left = item.x - (item.width * item.anchorX);
            data.right = item.x + (item.width * (1 - item.anchorX));
        }
        return data;
    };
    //获取Item位置
    List.prototype.getItemPos = function (id) {
        if (this._virtual)
            return this._calcItemPos(id);
        else {
            if (this.frameByFrameRenderNum)
                return this._calcItemPos(id);
            else
                return this._calcExistItemPos(id);
        }
    };
    //获取固定尺寸
    List.prototype._getFixedSize = function (listId) {
        if (!this._customSize)
            return null;
        if (listId == null)
            listId = this._numItems;
        var fixed = 0;
        var count = 0;
        for (var id in this._customSize) {
            if (parseInt(id) < listId) {
                fixed += this._customSize[id];
                count++;
            }
        }
        return {
            val: fixed,
            count: count,
        };
    };
    //滚动结束时..
    List.prototype._onScrollBegan = function () {
        this._beganPos = this._sizeType ? this.viewTop : this.viewLeft;
    };
    //滚动结束时..
    List.prototype._onScrollEnded = function () {
        var t = this;
        if (t.scrollToListId != null) {
            var item = t.getItemByListId(t.scrollToListId);
            t.scrollToListId = null;
            if (item) {
                item.runAction(cc.sequence(cc.scaleTo(.1, 1.06), cc.scaleTo(.1, 1)));
            }
        }
        t._onScrolling();
        if (t._slideMode == SlideType.ADHERING &&
            !t.adhering) {
            //cc.log(t.adhering, t._scrollView.isAutoScrolling(), t._scrollView.isScrolling());
            t.adhere();
        }
        else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                this._pageAdhere();
            }
            else {
                t.adhere();
            }
        }
    };
    // 触摸时
    List.prototype._onTouchStart = function (ev, captureListeners) {
        if (this._scrollView['_hasNestedViewGroup'](ev, captureListeners))
            return;
        var isMe = ev.eventPhase === cc.Event.AT_TARGET && ev.target === this.node;
        if (!isMe) {
            var itemNode = ev.target;
            while (itemNode._listId == null && itemNode.parent)
                itemNode = itemNode.parent;
            this._scrollItem = itemNode._listId != null ? itemNode : ev.target;
        }
    };
    //触摸抬起时..
    List.prototype._onTouchUp = function () {
        var t = this;
        t._scrollPos = null;
        if (t._slideMode == SlideType.ADHERING) {
            if (this.adhering)
                this._adheringBarrier = true;
            t.adhere();
        }
        else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                this._pageAdhere();
            }
            else {
                t.adhere();
            }
        }
        this._scrollItem = null;
    };
    List.prototype._onTouchCancelled = function (ev, captureListeners) {
        var t = this;
        if (t._scrollView['_hasNestedViewGroup'](ev, captureListeners) || ev.simulate)
            return;
        t._scrollPos = null;
        if (t._slideMode == SlideType.ADHERING) {
            if (t.adhering)
                t._adheringBarrier = true;
            t.adhere();
        }
        else if (t._slideMode == SlideType.PAGE) {
            if (t._beganPos != null) {
                t._pageAdhere();
            }
            else {
                t.adhere();
            }
        }
        this._scrollItem = null;
    };
    //当尺寸改变
    List.prototype._onSizeChanged = function () {
        if (this.checkInited(false))
            this._onScrolling();
    };
    //当Item自适应
    List.prototype._onItemAdaptive = function (item) {
        // if (this.checkInited(false)) {
        if ((!this._sizeType && item.width != this._itemSize.width)
            || (this._sizeType && item.height != this._itemSize.height)) {
            if (!this._customSize)
                this._customSize = {};
            var val = this._sizeType ? item.height : item.width;
            if (this._customSize[item._listId] != val) {
                this._customSize[item._listId] = val;
                this._resizeContent();
                // this.content.children.forEach((child: cc.Node) => {
                //     this._updateItemPos(child);
                // });
                this.updateAll();
                // 如果当前正在运行 scrollTo，肯定会不准确，在这里做修正
                if (this._scrollToListId != null) {
                    this._scrollPos = null;
                    this.unschedule(this._scrollToSo);
                    this.scrollTo(this._scrollToListId, Math.max(0, this._scrollToEndTime - ((new Date()).getTime() / 1000)));
                }
            }
        }
        // }
    };
    //PAGE粘附
    List.prototype._pageAdhere = function () {
        var t = this;
        if (!t.cyclic && (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0))
            return;
        var curPos = t._sizeType ? t.viewTop : t.viewLeft;
        var dis = (t._sizeType ? t.node.height : t.node.width) * t.pageDistance;
        var canSkip = Math.abs(t._beganPos - curPos) > dis;
        if (canSkip) {
            var timeInSecond = .5;
            switch (t._alignCalcType) {
                case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (t._beganPos > curPos) {
                        t.prePage(timeInSecond);
                        // cc.log('_pageAdhere   PPPPPPPPPPPPPPP');
                    }
                    else {
                        t.nextPage(timeInSecond);
                        // cc.log('_pageAdhere   NNNNNNNNNNNNNNN');
                    }
                    break;
                case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (t._beganPos < curPos) {
                        t.prePage(timeInSecond);
                    }
                    else {
                        t.nextPage(timeInSecond);
                    }
                    break;
            }
        }
        else if (t.elasticTop <= 0 && t.elasticRight <= 0 && t.elasticBottom <= 0 && t.elasticLeft <= 0) {
            t.adhere();
        }
        t._beganPos = null;
    };
    //粘附
    List.prototype.adhere = function () {
        var t = this;
        if (!t.checkInited())
            return;
        if (t.elasticTop > 0 || t.elasticRight > 0 || t.elasticBottom > 0 || t.elasticLeft > 0)
            return;
        t.adhering = true;
        t._calcNearestItem();
        var offset = (t._sizeType ? t._topGap : t._leftGap) / (t._sizeType ? t.node.height : t.node.width);
        var timeInSecond = .7;
        t.scrollTo(t.nearestListId, timeInSecond, offset);
    };
    //Update..
    List.prototype.update = function () {
        if (this.frameByFrameRenderNum <= 0 || this._updateDone)
            return;
        // cc.log(this.displayData.length, this._updateCounter, this.displayData[this._updateCounter]);
        if (this._virtual) {
            var len = (this._updateCounter + this.frameByFrameRenderNum) > this.displayItemNum ? this.displayItemNum : (this._updateCounter + this.frameByFrameRenderNum);
            for (var n = this._updateCounter; n < len; n++) {
                var data = this.displayData[n];
                if (data) {
                    this._createOrUpdateItem(data);
                }
            }
            if (this._updateCounter >= this.displayItemNum - 1) { //最后一个
                if (this._doneAfterUpdate) {
                    this._updateCounter = 0;
                    this._updateDone = false;
                    // if (!this._scrollView.isScrolling())
                    this._doneAfterUpdate = false;
                }
                else {
                    this._updateDone = true;
                    this._delRedundantItem();
                    this._forceUpdate = false;
                    this._calcNearestItem();
                    if (this.slideMode == SlideType.PAGE)
                        this.curPageNum = this.nearestListId;
                }
            }
            else {
                this._updateCounter += this.frameByFrameRenderNum;
            }
        }
        else {
            if (this._updateCounter < this._numItems) {
                var len = (this._updateCounter + this.frameByFrameRenderNum) > this._numItems ? this._numItems : (this._updateCounter + this.frameByFrameRenderNum);
                for (var n = this._updateCounter; n < len; n++) {
                    this._createOrUpdateItem2(n);
                }
                this._updateCounter += this.frameByFrameRenderNum;
            }
            else {
                this._updateDone = true;
                this._calcNearestItem();
                if (this.slideMode == SlideType.PAGE)
                    this.curPageNum = this.nearestListId;
            }
        }
    };
    /**
     * 创建或更新Item（虚拟列表用）
     * @param {Object} data 数据
     */
    List.prototype._createOrUpdateItem = function (data) {
        var item = this.getItemByListId(data.id);
        if (!item) { //如果不存在
            var canGet = this._pool.size() > 0;
            if (canGet) {
                item = this._pool.get();
                // cc.log('从池中取出::   旧id =', item['_listId'], '，新id =', data.id, item);
            }
            else {
                item = cc.instantiate(this._itemTmp);
                // cc.log('新建::', data.id, item);
            }
            if (item._listId != data.id) {
                item._listId = data.id;
                item.setContentSize(this._itemSize);
            }
            item.setPosition(cc.v2(data.x, data.y));
            this._resetItemSize(item);
            this.content.addChild(item);
            if (canGet && this._needUpdateWidget) {
                var widget = item.getComponent(cc.Widget);
                if (widget)
                    widget.updateAlignment();
            }
            item.setSiblingIndex(this.content.childrenCount - 1);
            var listItem = item.getComponent(ListItem_1.default);
            item['listItem'] = listItem;
            if (listItem) {
                listItem.listId = data.id;
                listItem.list = this;
                listItem._registerEvent();
            }
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
        }
        else if (this._forceUpdate && this.renderEvent) { //强制更新
            item.setPosition(cc.v2(data.x, data.y));
            this._resetItemSize(item);
            // cc.log('ADD::', data.id, item);
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, data.id % this._actualNumItems);
            }
        }
        this._resetItemSize(item);
        this._updateListItem(item['listItem']);
        if (this._lastDisplayData.indexOf(data.id) < 0) {
            this._lastDisplayData.push(data.id);
        }
    };
    //创建或更新Item（非虚拟列表用）
    List.prototype._createOrUpdateItem2 = function (listId) {
        var item = this.content.children[listId];
        var listItem;
        if (!item) { //如果不存在
            item = cc.instantiate(this._itemTmp);
            item._listId = listId;
            this.content.addChild(item);
            listItem = item.getComponent(ListItem_1.default);
            item['listItem'] = listItem;
            if (listItem) {
                listItem.listId = listId;
                listItem.list = this;
                listItem._registerEvent();
            }
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId);
            }
        }
        else if (this._forceUpdate && this.renderEvent) { //强制更新
            item._listId = listId;
            if (listItem)
                listItem.listId = listId;
            if (this.renderEvent) {
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId);
            }
        }
        this._updateListItem(listItem);
        if (this._lastDisplayData.indexOf(listId) < 0) {
            this._lastDisplayData.push(listId);
        }
    };
    List.prototype._updateListItem = function (listItem) {
        if (!listItem)
            return;
        if (this.selectedMode > SelectedType.NONE) {
            var item = listItem.node;
            switch (this.selectedMode) {
                case SelectedType.SINGLE:
                    listItem.selected = this.selectedId == item._listId;
                    break;
                case SelectedType.MULT:
                    listItem.selected = this.multSelected.indexOf(item._listId) >= 0;
                    break;
            }
        }
    };
    //仅虚拟列表用
    List.prototype._resetItemSize = function (item) {
        return;
        var size;
        if (this._customSize && this._customSize[item._listId]) {
            size = this._customSize[item._listId];
        }
        else {
            if (this._colLineNum > 1)
                item.setContentSize(this._itemSize);
            else
                size = this._sizeType ? this._itemSize.height : this._itemSize.width;
        }
        if (size) {
            if (this._sizeType)
                item.height = size;
            else
                item.width = size;
        }
    };
    /**
     * 更新Item位置
     * @param {Number||Node} listIdOrItem
     */
    List.prototype._updateItemPos = function (listIdOrItem) {
        var item = isNaN(listIdOrItem) ? listIdOrItem : this.getItemByListId(listIdOrItem);
        var pos = this.getItemPos(item._listId);
        item.setPosition(pos.x, pos.y);
    };
    /**
     * 设置多选
     * @param {Array} args 可以是单个listId，也可是个listId数组
     * @param {Boolean} bool 值，如果为null的话，则直接用args覆盖
     */
    List.prototype.setMultSelected = function (args, bool) {
        var t = this;
        if (!t.checkInited())
            return;
        if (!Array.isArray(args)) {
            args = [args];
        }
        if (bool == null) {
            t.multSelected = args;
        }
        else {
            var listId = void 0, sub = void 0;
            if (bool) {
                for (var n = args.length - 1; n >= 0; n--) {
                    listId = args[n];
                    sub = t.multSelected.indexOf(listId);
                    if (sub < 0) {
                        t.multSelected.push(listId);
                    }
                }
            }
            else {
                for (var n = args.length - 1; n >= 0; n--) {
                    listId = args[n];
                    sub = t.multSelected.indexOf(listId);
                    if (sub >= 0) {
                        t.multSelected.splice(sub, 1);
                    }
                }
            }
        }
        t._forceUpdate = true;
        t._onScrolling();
    };
    /**
     * 更新指定的Item
     * @param {Array} args 单个listId，或者数组
     * @returns
     */
    List.prototype.updateItem = function (args) {
        if (!this.checkInited())
            return;
        if (!Array.isArray(args)) {
            args = [args];
        }
        for (var n = 0, len = args.length; n < len; n++) {
            var listId = args[n];
            var item = this.getItemByListId(listId);
            if (item)
                cc.Component.EventHandler.emitEvents([this.renderEvent], item, listId % this._actualNumItems);
        }
    };
    /**
     * 更新全部
     */
    List.prototype.updateAll = function () {
        if (!this.checkInited())
            return;
        this.numItems = this.numItems;
    };
    /**
     * 根据ListID获取Item
     * @param {Number} listId
     * @returns
     */
    List.prototype.getItemByListId = function (listId) {
        for (var n = this.content.childrenCount - 1; n >= 0; n--) {
            var item = this.content.children[n];
            if (item._listId == listId)
                return item;
        }
    };
    /**
     * 获取在显示区域外的Item
     * @returns
     */
    List.prototype._getOutsideItem = function () {
        var item;
        var result = [];
        for (var n = this.content.childrenCount - 1; n >= 0; n--) {
            item = this.content.children[n];
            if (!this.displayData.find(function (d) { return d.id == item._listId; })) {
                result.push(item);
            }
        }
        return result;
    };
    //删除显示区域以外的Item
    List.prototype._delRedundantItem = function () {
        if (this._virtual) {
            var arr = this._getOutsideItem();
            for (var n = arr.length - 1; n >= 0; n--) {
                var item = arr[n];
                if (this._scrollItem && item._listId == this._scrollItem._listId)
                    continue;
                this._pool.put(item);
                for (var m = this._lastDisplayData.length - 1; m >= 0; m--) {
                    if (this._lastDisplayData[m] == item._listId) {
                        this._lastDisplayData.splice(m, 1);
                        break;
                    }
                }
            }
            // cc.log('存入::', str, '    pool.length =', this._pool.length);
        }
        else {
            while (this.content.childrenCount > this._numItems) {
                this._delSingleItem(this.content.children[this.content.childrenCount - 1]);
            }
        }
    };
    //删除单个Item
    List.prototype._delSingleItem = function (item) {
        // cc.log('DEL::', item['_listId'], item);
        item.removeFromParent();
        if (item.destroy)
            item.destroy();
        item = null;
    };
    /**
     * 动效删除Item（此方法只适用于虚拟列表，即_virtual=true）
     * 一定要在回调函数里重新设置新的numItems进行刷新，毕竟本List是靠数据驱动的。
     */
    List.prototype.aniDelItem = function (listId, callFunc, aniType) {
        var t = this;
        if (!t.checkInited() || t.cyclic || !t._virtual)
            return cc.error('This function is not allowed to be called!');
        if (t._aniDelRuning)
            return cc.warn('Please wait for the current deletion to finish!');
        var item = t.getItemByListId(listId);
        var listItem;
        if (!item) {
            callFunc(listId);
            return;
        }
        else {
            listItem = item.getComponent(ListItem_1.default);
        }
        t._aniDelRuning = true;
        var curLastId = t.displayData[t.displayData.length - 1].id;
        var resetSelectedId = listItem.selected;
        listItem.showAni(aniType, function () {
            //判断有没有下一个，如果有的话，创建粗来
            var newId;
            if (curLastId < t._numItems - 2) {
                newId = curLastId + 1;
            }
            if (newId != null) {
                var newData = t._calcItemPos(newId);
                t.displayData.push(newData);
                if (t._virtual)
                    t._createOrUpdateItem(newData);
                else
                    t._createOrUpdateItem2(newId);
            }
            else
                t._numItems--;
            if (t.selectedMode == SelectedType.SINGLE) {
                if (resetSelectedId) {
                    t._selectedId = -1;
                }
                else if (t._selectedId - 1 >= 0) {
                    t._selectedId--;
                }
            }
            else if (t.selectedMode == SelectedType.MULT && t.multSelected.length) {
                var sub = t.multSelected.indexOf(listId);
                if (sub >= 0) {
                    t.multSelected.splice(sub, 1);
                }
                //多选的数据，在其后的全部减一
                for (var n = t.multSelected.length - 1; n >= 0; n--) {
                    var id = t.multSelected[n];
                    if (id >= listId)
                        t.multSelected[n]--;
                }
            }
            if (t._customSize) {
                if (t._customSize[listId])
                    delete t._customSize[listId];
                var newCustomSize = {};
                var size = void 0;
                for (var id in t._customSize) {
                    size = t._customSize[id];
                    var idNumber = parseInt(id);
                    newCustomSize[idNumber - (idNumber >= listId ? 1 : 0)] = size;
                }
                t._customSize = newCustomSize;
            }
            //后面的Item向前怼的动效
            var sec = .2333;
            var acts, haveCB;
            for (var n = newId != null ? newId : curLastId; n >= listId + 1; n--) {
                item = t.getItemByListId(n);
                if (item) {
                    var posData = t._calcItemPos(n - 1);
                    acts = [
                        cc.moveTo(sec, cc.v2(posData.x, posData.y)),
                    ];
                    if (n <= listId + 1) {
                        haveCB = true;
                        acts.push(cc.callFunc(function () {
                            t._aniDelRuning = false;
                            callFunc(listId);
                        }));
                    }
                    if (acts.length > 1)
                        item.runAction(cc.sequence(acts));
                    else
                        item.runAction(acts[0]);
                }
            }
            if (!haveCB) {
                t._aniDelRuning = false;
                callFunc(listId);
            }
        }, true);
    };
    /**
     * 滚动到..
     * @param {Number} listId 索引（如果<0，则滚到首个Item位置，如果>=_numItems，则滚到最末Item位置）
     * @param {Number} timeInSecond 时间
     * @param {Number} offset 索引目标位置偏移，0-1
     * @param {Boolean} overStress 滚动后是否强调该Item（这只是个实验功能）
     */
    List.prototype.scrollTo = function (listId, timeInSecond, offset, overStress) {
        if (timeInSecond === void 0) { timeInSecond = .5; }
        if (offset === void 0) { offset = null; }
        if (overStress === void 0) { overStress = false; }
        var t = this;
        if (!t.checkInited(false))
            return;
        // t._scrollView.stopAutoScroll();
        if (timeInSecond == null) //默认0.5
            timeInSecond = .5;
        else if (timeInSecond < 0)
            timeInSecond = 0;
        if (listId < 0)
            listId = 0;
        else if (listId >= t._numItems)
            listId = t._numItems - 1;
        // 以防设置了numItems之后layout的尺寸还未更新
        if (!t._virtual && t._layout && t._layout.enabled)
            t._layout.updateLayout();
        var pos = t.getItemPos(listId);
        var targetX, targetY;
        switch (t._alignCalcType) {
            case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                targetX = pos.left;
                if (offset != null)
                    targetX -= t.node.width * offset;
                else
                    targetX -= t._leftGap;
                pos = cc.v2(targetX, 0);
                break;
            case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                targetX = pos.right - t.node.width;
                if (offset != null)
                    targetX += t.node.width * offset;
                else
                    targetX += t._rightGap;
                pos = cc.v2(targetX + t.content.width, 0);
                break;
            case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                targetY = pos.top;
                if (offset != null)
                    targetY += t.node.height * offset;
                else
                    targetY += t._topGap;
                pos = cc.v2(0, -targetY);
                break;
            case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                targetY = pos.bottom + t.node.height;
                if (offset != null)
                    targetY -= t.node.height * offset;
                else
                    targetY -= t._bottomGap;
                pos = cc.v2(0, -targetY + t.content.height);
                break;
        }
        var viewPos = t.content.getPosition();
        viewPos = Math.abs(t._sizeType ? viewPos.y : viewPos.x);
        var comparePos = t._sizeType ? pos.y : pos.x;
        var runScroll = Math.abs((t._scrollPos != null ? t._scrollPos : viewPos) - comparePos) > .5;
        // cc.log(runScroll, t._scrollPos, viewPos, comparePos)
        // t._scrollView.stopAutoScroll();
        if (runScroll) {
            t._scrollView.scrollToOffset(pos, timeInSecond);
            t._scrollToListId = listId;
            t._scrollToEndTime = ((new Date()).getTime() / 1000) + timeInSecond;
            // cc.log(listId, t.content.width, t.content.getPosition(), pos);
            t._scrollToSo = t.scheduleOnce(function () {
                if (!t._adheringBarrier) {
                    t.adhering = t._adheringBarrier = false;
                }
                t._scrollPos =
                    t._scrollToListId =
                        t._scrollToEndTime =
                            t._scrollToSo =
                                null;
                //cc.log('2222222222', t._adheringBarrier)
                if (overStress) {
                    // t.scrollToListId = listId;
                    var item = t.getItemByListId(listId);
                    if (item) {
                        item.runAction(cc.sequence(cc.scaleTo(.1, 1.05), cc.scaleTo(.1, 1)));
                    }
                }
            }, timeInSecond + .1);
            if (timeInSecond <= 0) {
                t._onScrolling();
            }
        }
    };
    /**
     * 计算当前滚动窗最近的Item
     */
    List.prototype._calcNearestItem = function () {
        var t = this;
        t.nearestListId = null;
        var data, center;
        if (t._virtual)
            t._calcViewPos();
        var vTop, vRight, vBottom, vLeft;
        vTop = t.viewTop;
        vRight = t.viewRight;
        vBottom = t.viewBottom;
        vLeft = t.viewLeft;
        var breakFor = false;
        for (var n = 0; n < t.content.childrenCount && !breakFor; n += t._colLineNum) {
            data = t._virtual ? t.displayData[n] : t._calcExistItemPos(n);
            if (data) {
                center = t._sizeType ? ((data.top + data.bottom) / 2) : (center = (data.left + data.right) / 2);
                switch (t._alignCalcType) {
                    case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                        if (data.right >= vLeft) {
                            t.nearestListId = data.id;
                            if (vLeft > center)
                                t.nearestListId += t._colLineNum;
                            breakFor = true;
                        }
                        break;
                    case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                        if (data.left <= vRight) {
                            t.nearestListId = data.id;
                            if (vRight < center)
                                t.nearestListId += t._colLineNum;
                            breakFor = true;
                        }
                        break;
                    case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                        if (data.bottom <= vTop) {
                            t.nearestListId = data.id;
                            if (vTop < center)
                                t.nearestListId += t._colLineNum;
                            breakFor = true;
                        }
                        break;
                    case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                        if (data.top >= vBottom) {
                            t.nearestListId = data.id;
                            if (vBottom > center)
                                t.nearestListId += t._colLineNum;
                            breakFor = true;
                        }
                        break;
                }
            }
        }
        //判断最后一个Item。。。（哎，这些判断真心恶心，判断了前面的还要判断最后一个。。。一开始呢，就只有一个布局（单列布局），那时候代码才三百行，后来就想着完善啊，艹..这坑真深，现在这行数都一千五了= =||）
        data = t._virtual ? t.displayData[t.displayItemNum - 1] : t._calcExistItemPos(t._numItems - 1);
        if (data && data.id == t._numItems - 1) {
            center = t._sizeType ? ((data.top + data.bottom) / 2) : (center = (data.left + data.right) / 2);
            switch (t._alignCalcType) {
                case 1: //单行HORIZONTAL（LEFT_TO_RIGHT）、网格VERTICAL（LEFT_TO_RIGHT）
                    if (vRight > center)
                        t.nearestListId = data.id;
                    break;
                case 2: //单行HORIZONTAL（RIGHT_TO_LEFT）、网格VERTICAL（RIGHT_TO_LEFT）
                    if (vLeft < center)
                        t.nearestListId = data.id;
                    break;
                case 3: //单列VERTICAL（TOP_TO_BOTTOM）、网格HORIZONTAL（TOP_TO_BOTTOM）
                    if (vBottom < center)
                        t.nearestListId = data.id;
                    break;
                case 4: //单列VERTICAL（BOTTOM_TO_TOP）、网格HORIZONTAL（BOTTOM_TO_TOP）
                    if (vTop > center)
                        t.nearestListId = data.id;
                    break;
            }
        }
        // cc.log('t.nearestListId =', t.nearestListId);
    };
    //上一页
    List.prototype.prePage = function (timeInSecond) {
        if (timeInSecond === void 0) { timeInSecond = .5; }
        // cc.log('👈');
        if (!this.checkInited())
            return;
        this.skipPage(this.curPageNum - 1, timeInSecond);
    };
    //下一页
    List.prototype.nextPage = function (timeInSecond) {
        if (timeInSecond === void 0) { timeInSecond = .5; }
        // cc.log('👉');
        if (!this.checkInited())
            return;
        this.skipPage(this.curPageNum + 1, timeInSecond);
    };
    //跳转到第几页
    List.prototype.skipPage = function (pageNum, timeInSecond) {
        var t = this;
        if (!t.checkInited())
            return;
        if (t._slideMode != SlideType.PAGE)
            return cc.error('This function is not allowed to be called, Must SlideMode = PAGE!');
        if (pageNum < 0 || pageNum >= t._numItems)
            return;
        if (t.curPageNum == pageNum)
            return;
        // cc.log(pageNum);
        t.curPageNum = pageNum;
        if (t.pageChangeEvent) {
            cc.Component.EventHandler.emitEvents([t.pageChangeEvent], pageNum);
        }
        t.scrollTo(pageNum, timeInSecond);
    };
    //计算 CustomSize（这个函数还是保留吧，某些罕见的情况的确还是需要手动计算customSize的）
    List.prototype.calcCustomSize = function (numItems) {
        var t = this;
        if (!t.checkInited())
            return;
        if (!t._itemTmp)
            return cc.error('Unset template item!');
        if (!t.renderEvent)
            return cc.error('Unset Render-Event!');
        t._customSize = {};
        var temp = cc.instantiate(t._itemTmp);
        t.content.addChild(temp);
        for (var n = 0; n < numItems; n++) {
            cc.Component.EventHandler.emitEvents([t.renderEvent], temp, n);
            if (temp.height != t._itemSize.height || temp.width != t._itemSize.width) {
                t._customSize[n] = t._sizeType ? temp.height : temp.width;
            }
        }
        if (!Object.keys(t._customSize).length)
            t._customSize = null;
        temp.removeFromParent();
        if (temp.destroy)
            temp.destroy();
        return t._customSize;
    };
    __decorate([
        property({ type: cc.Enum(TemplateType), tooltip: CC_DEV && '模板类型', })
    ], List.prototype, "templateType", void 0);
    __decorate([
        property({
            type: cc.Node,
            tooltip: CC_DEV && '模板Item',
            visible: function () { return this.templateType == TemplateType.NODE; }
        })
    ], List.prototype, "tmpNode", void 0);
    __decorate([
        property({
            type: cc.Prefab,
            tooltip: CC_DEV && '模板Item',
            visible: function () { return this.templateType == TemplateType.PREFAB; }
        })
    ], List.prototype, "tmpPrefab", void 0);
    __decorate([
        property()
    ], List.prototype, "_slideMode", void 0);
    __decorate([
        property({
            type: cc.Enum(SlideType),
            tooltip: CC_DEV && '滑动模式'
        })
    ], List.prototype, "slideMode", null);
    __decorate([
        property({
            type: cc.Float,
            range: [0, 1, .1],
            tooltip: CC_DEV && '翻页作用距离',
            slide: true,
            visible: function () { return this._slideMode == SlideType.PAGE; }
        })
    ], List.prototype, "pageDistance", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '页面改变事件',
            visible: function () { return this._slideMode == SlideType.PAGE; }
        })
    ], List.prototype, "pageChangeEvent", void 0);
    __decorate([
        property()
    ], List.prototype, "_virtual", void 0);
    __decorate([
        property({
            type: cc.Boolean,
            tooltip: CC_DEV && '是否为虚拟列表（动态列表）'
        })
    ], List.prototype, "virtual", null);
    __decorate([
        property({
            tooltip: CC_DEV && '是否为循环列表',
            visible: function () {
                var val = this.virtual && this.slideMode == SlideType.NORMAL;
                if (!val)
                    this.cyclic = false;
                return val;
            }
        })
    ], List.prototype, "cyclic", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && 'Item数量不足以填满Content时，是否居中显示Item（不支持Grid布局）',
            visible: function () { return this.virtual; }
        })
    ], List.prototype, "lackCenter", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && 'Item数量不足以填满Content时，是否可滑动',
            visible: function () {
                var val = this.virtual && !this.lackCenter;
                if (!val)
                    this.lackSlide = false;
                return val;
            }
        })
    ], List.prototype, "lackSlide", void 0);
    __decorate([
        property({ type: cc.Integer })
    ], List.prototype, "_updateRate", void 0);
    __decorate([
        property({
            type: cc.Integer,
            range: [0, 6, 1],
            tooltip: CC_DEV && '刷新频率（值越大刷新频率越低、性能越高）',
            slide: true,
        })
    ], List.prototype, "updateRate", null);
    __decorate([
        property({
            type: cc.Integer,
            range: [0, 12, 1],
            tooltip: CC_DEV && '逐帧渲染时，每帧渲染的Item数量（<=0时关闭分帧渲染）',
            slide: true,
        })
    ], List.prototype, "frameByFrameRenderNum", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '渲染事件（渲染器）',
        })
    ], List.prototype, "renderEvent", void 0);
    __decorate([
        property({
            type: cc.Enum(SelectedType),
            tooltip: CC_DEV && '选择模式'
        })
    ], List.prototype, "selectedMode", void 0);
    __decorate([
        property({
            tooltip: CC_DEV && '是否重复响应单选事件',
            visible: function () { return this.selectedMode == SelectedType.SINGLE; }
        })
    ], List.prototype, "repeatEventSingle", void 0);
    __decorate([
        property({
            type: cc.Component.EventHandler,
            tooltip: CC_DEV && '触发选择事件',
            visible: function () { return this.selectedMode > SelectedType.NONE; }
        })
    ], List.prototype, "selectedEvent", void 0);
    __decorate([
        property({
            serializable: false
        })
    ], List.prototype, "_numItems", void 0);
    List = __decorate([
        ccclass,
        disallowMultiple(),
        menu('自定义组件/List'),
        requireComponent(cc.ScrollView)
        //脚本生命周期回调的执行优先级。小于 0 的脚本将优先执行，大于 0 的脚本将最后执行。该优先级只对 onLoad, onEnable, start, update 和 lateUpdate 有效，对 onDisable 和 onDestroy 无效。
        ,
        executionOrder(-5000)
    ], List);
    return List;
}(cc.Component));
exports.default = List;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcY2hhdFxcTGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7NENBSzRDO0FBQ3RDLElBQUEsS0FBa0YsRUFBRSxDQUFDLFVBQVUsRUFBN0YsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsZ0JBQWdCLHNCQUFBLEVBQUUsSUFBSSxVQUFBLEVBQUUsY0FBYyxvQkFBQSxFQUFFLGdCQUFnQixzQkFBa0IsQ0FBQztBQUV0Ryx1Q0FBa0M7QUFFbEMsSUFBSyxZQUdKO0FBSEQsV0FBSyxZQUFZO0lBQ2IsK0NBQVEsQ0FBQTtJQUNSLG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBSEksWUFBWSxLQUFaLFlBQVksUUFHaEI7QUFFRCxJQUFLLFNBSUo7QUFKRCxXQUFLLFNBQVM7SUFDViw2Q0FBVSxDQUFBO0lBQ1YsaURBQVksQ0FBQTtJQUNaLHlDQUFRLENBQUE7QUFDWixDQUFDLEVBSkksU0FBUyxLQUFULFNBQVMsUUFJYjtBQUVELElBQUssWUFJSjtBQUpELFdBQUssWUFBWTtJQUNiLCtDQUFRLENBQUE7SUFDUixtREFBVSxDQUFBO0lBQ1YsK0NBQVEsQ0FBQTtBQUNaLENBQUMsRUFKSSxZQUFZLEtBQVosWUFBWSxRQUloQjtBQVFEO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBaytEQztRQWorREcsTUFBTTtRQUVFLGtCQUFZLEdBQWlCLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDdkQsY0FBYztRQU1kLGFBQU8sR0FBWSxJQUFJLENBQUM7UUFDeEIsZ0JBQWdCO1FBTWhCLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFDNUIsTUFBTTtRQUVFLGdCQUFVLEdBQWMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQVdqRCxRQUFRO1FBUUQsa0JBQVksR0FBVyxFQUFFLENBQUM7UUFDakMsUUFBUTtRQU1BLHFCQUFlLEdB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QztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUMzQixPQUFPLEVBQUUsTUFBTSxJQUFJLE1BQU07U0FDNUIsQ0FBQzs4Q0FDb0Q7SUFLdEQ7UUFKQyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsTUFBTSxJQUFJLFlBQVk7WUFDL0IsT0FBTyxnQkFBSyxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDakUsQ0FBQzttREFDd0M7SUFPMUM7UUFMQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZO1lBQy9CLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUTtZQUMzQixPQUFPLGdCQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5RCxDQUFDOytDQUNxRDtJQWlGdkQ7UUFIQyxRQUFRLENBQUM7WUFDTixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDOzJDQUM0QjtJQTdOYixJQUFJO1FBTnhCLE9BQU87UUFDUCxnQkFBZ0IsRUFBRTtRQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2xCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDaEMsK0hBQStIOztRQUM5SCxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUM7T0FDRCxJQUFJLENBaytEeEI7SUFBRCxXQUFDO0NBbCtERCxBQWsrREMsQ0FsK0RpQyxFQUFFLENBQUMsU0FBUyxHQWsrRDdDO2tCQWwrRG9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAqIEBhdXRob3Iga0wgPGtsazBAcXEuY29tPlxyXG4gKiBAZGF0ZSAyMDE5LzYvNlxyXG4gKiBAZG9jIOWIl+ihqOe7hOS7ti5cclxuICogQGVuZFxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBkaXNhbGxvd011bHRpcGxlLCBtZW51LCBleGVjdXRpb25PcmRlciwgcmVxdWlyZUNvbXBvbmVudCB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmltcG9ydCBMaXN0SXRlbSBmcm9tICcuL0xpc3RJdGVtJztcclxuXHJcbmVudW0gVGVtcGxhdGVUeXBlIHtcclxuICAgIE5PREUgPSAxLFxyXG4gICAgUFJFRkFCID0gMixcclxufVxyXG5cclxuZW51bSBTbGlkZVR5cGUge1xyXG4gICAgTk9STUFMID0gMSwvL+aZrumAmlxyXG4gICAgQURIRVJJTkcgPSAyLC8v57KY6ZmE5qih5byP77yM5bCG5by65Yi25YWz6Zet5rua5Yqo5oOv5oCnXHJcbiAgICBQQUdFID0gMywvL+mhtemdouaooeW8j++8jOWwhuW8uuWItuWFs+mXrea7muWKqOaDr+aAp1xyXG59XHJcblxyXG5lbnVtIFNlbGVjdGVkVHlwZSB7XHJcbiAgICBOT05FID0gMCxcclxuICAgIFNJTkdMRSA9IDEsLy/ljZXpgIlcclxuICAgIE1VTFQgPSAyLC8v5aSa6YCJXHJcbn1cclxuXHJcbkBjY2NsYXNzXHJcbkBkaXNhbGxvd011bHRpcGxlKClcclxuQG1lbnUoJ+iHquWumuS5iee7hOS7ti9MaXN0JylcclxuQHJlcXVpcmVDb21wb25lbnQoY2MuU2Nyb2xsVmlldylcclxuLy/ohJrmnKznlJ/lkb3lkajmnJ/lm57osIPnmoTmiafooYzkvJjlhYjnuqfjgILlsI/kuo4gMCDnmoTohJrmnKzlsIbkvJjlhYjmiafooYzvvIzlpKfkuo4gMCDnmoTohJrmnKzlsIbmnIDlkI7miafooYzjgILor6XkvJjlhYjnuqflj6rlr7kgb25Mb2FkLCBvbkVuYWJsZSwgc3RhcnQsIHVwZGF0ZSDlkowgbGF0ZVVwZGF0ZSDmnInmlYjvvIzlr7kgb25EaXNhYmxlIOWSjCBvbkRlc3Ryb3kg5peg5pWI44CCXHJcbkBleGVjdXRpb25PcmRlcigtNTAwMClcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvL+aooeadv+exu+Wei1xyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRW51bShUZW1wbGF0ZVR5cGUpLCB0b29sdGlwOiBDQ19ERVYgJiYgJ+aooeadv+exu+WeiycsIH0pXHJcbiAgICBwcml2YXRlIHRlbXBsYXRlVHlwZTogVGVtcGxhdGVUeXBlID0gVGVtcGxhdGVUeXBlLk5PREU7XHJcbiAgICAvL+aooeadv0l0ZW3vvIhOb2Rl77yJXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfmqKHmnb9JdGVtJyxcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50ZW1wbGF0ZVR5cGUgPT0gVGVtcGxhdGVUeXBlLk5PREU7IH1cclxuICAgIH0pXHJcbiAgICB0bXBOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8v5qih5p2/SXRlbe+8iFByZWZhYu+8iVxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfmqKHmnb9JdGVtJyxcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy50ZW1wbGF0ZVR5cGUgPT0gVGVtcGxhdGVUeXBlLlBSRUZBQjsgfVxyXG4gICAgfSlcclxuICAgIHRtcFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIC8v5ruR5Yqo5qih5byPXHJcbiAgICBAcHJvcGVydHkoKVxyXG4gICAgcHJpdmF0ZSBfc2xpZGVNb2RlOiBTbGlkZVR5cGUgPSBTbGlkZVR5cGUuTk9STUFMO1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5FbnVtKFNsaWRlVHlwZSksXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfmu5HliqjmqKHlvI8nXHJcbiAgICB9KVxyXG4gICAgc2V0IHNsaWRlTW9kZSh2YWw6IFNsaWRlVHlwZSkge1xyXG4gICAgICAgIHRoaXMuX3NsaWRlTW9kZSA9IHZhbDtcclxuICAgIH1cclxuICAgIGdldCBzbGlkZU1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlTW9kZTtcclxuICAgIH1cclxuICAgIC8v57+76aG15L2c55So6Led56a7XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgIHJhbmdlOiBbMCwgMSwgLjFdLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAn57+76aG15L2c55So6Led56a7JyxcclxuICAgICAgICBzbGlkZTogdHJ1ZSxcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy5fc2xpZGVNb2RlID09IFNsaWRlVHlwZS5QQUdFOyB9XHJcbiAgICB9KVxyXG4gICAgcHVibGljIHBhZ2VEaXN0YW5jZTogbnVtYmVyID0gLjM7XHJcbiAgICAvL+mhtemdouaUueWPmOS6i+S7tlxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAn6aG16Z2i5pS55Y+Y5LqL5Lu2JyxcclxuICAgICAgICB2aXNpYmxlKCkgeyByZXR1cm4gdGhpcy5fc2xpZGVNb2RlID09IFNsaWRlVHlwZS5QQUdFOyB9XHJcbiAgICB9KVxyXG4gICAgcHJpdmF0ZSBwYWdlQ2hhbmdlRXZlbnQ6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgLy/mmK/lkKbkuLromZrmi5/liJfooajvvIjliqjmgIHliJfooajvvIlcclxuICAgIEBwcm9wZXJ0eSgpXHJcbiAgICBwcml2YXRlIF92aXJ0dWFsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuQm9vbGVhbixcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+aYr+WQpuS4uuiZmuaLn+WIl+ihqO+8iOWKqOaAgeWIl+ihqO+8iSdcclxuICAgIH0pXHJcbiAgICBzZXQgdmlydHVhbCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpcnR1YWwgPSB2YWw7XHJcbiAgICAgICAgaWYgKCFDQ19ERVYgJiYgdGhpcy5fbnVtSXRlbXMgIT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vblNjcm9sbGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCB2aXJ0dWFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXJ0dWFsO1xyXG4gICAgfVxyXG4gICAgLy/mmK/lkKbkuLrlvqrnjq/liJfooahcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfmmK/lkKbkuLrlvqrnjq/liJfooagnLFxyXG4gICAgICAgIHZpc2libGUoKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWw6IGJvb2xlYW4gPSB0aGlzLnZpcnR1YWwgJiYgdGhpcy5zbGlkZU1vZGUgPT0gU2xpZGVUeXBlLk5PUk1BTDtcclxuICAgICAgICAgICAgaWYgKCF2YWwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN5Y2xpYyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgY3ljbGljOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+e8uuecgeWxheS4rVxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ0l0ZW3mlbDph4/kuI3otrPku6Xloavmu6FDb250ZW505pe277yM5piv5ZCm5bGF5Lit5pi+56S6SXRlbe+8iOS4jeaUr+aMgUdyaWTluIPlsYDvvIknLFxyXG4gICAgICAgIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnZpcnR1YWw7IH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgbGFja0NlbnRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy/nvLrnnIHlj6/mu5HliqhcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdJdGVt5pWw6YeP5LiN6Laz5Lul5aGr5ruhQ29udGVudOaXtu+8jOaYr+WQpuWPr+a7keWKqCcsXHJcbiAgICAgICAgdmlzaWJsZSgpIHtcclxuICAgICAgICAgICAgbGV0IHZhbDogYm9vbGVhbiA9IHRoaXMudmlydHVhbCAmJiAhdGhpcy5sYWNrQ2VudGVyO1xyXG4gICAgICAgICAgICBpZiAoIXZhbClcclxuICAgICAgICAgICAgICAgIHRoaXMubGFja1NsaWRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBsYWNrU2xpZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5Yi35paw6aKR546HXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5JbnRlZ2VyIH0pXHJcbiAgICBwcml2YXRlIF91cGRhdGVSYXRlOiBudW1iZXIgPSAwO1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgIHJhbmdlOiBbMCwgNiwgMV0sXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfliLfmlrDpopHnjofvvIjlgLzotorlpKfliLfmlrDpopHnjofotorkvY7jgIHmgKfog73otorpq5jvvIknLFxyXG4gICAgICAgIHNsaWRlOiB0cnVlLFxyXG4gICAgfSlcclxuICAgIHNldCB1cGRhdGVSYXRlKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbCA+PSAwICYmIHZhbCA8PSA2KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJhdGUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHVwZGF0ZVJhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVJhdGU7XHJcbiAgICB9XHJcbiAgICAvL+WIhuW4p+a4suafk++8iOavj+W4p+a4suafk+eahEl0ZW3mlbDph4/vvIg8PTDml7blhbPpl63liIbluKfmuLLmn5PvvInvvIlcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuSW50ZWdlcixcclxuICAgICAgICByYW5nZTogWzAsIDEyLCAxXSxcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+mAkOW4p+a4suafk+aXtu+8jOavj+W4p+a4suafk+eahEl0ZW3mlbDph4/vvIg8PTDml7blhbPpl63liIbluKfmuLLmn5PvvIknLFxyXG4gICAgICAgIHNsaWRlOiB0cnVlLFxyXG4gICAgfSlcclxuICAgIHB1YmxpYyBmcmFtZUJ5RnJhbWVSZW5kZXJOdW06IG51bWJlciA9IDA7XHJcbiAgICAvL+a4suafk+S6i+S7tu+8iOa4suafk+WZqO+8iVxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAn5riy5p+T5LqL5Lu277yI5riy5p+T5Zmo77yJJyxcclxuICAgIH0pXHJcbiAgICBwdWJsaWMgcmVuZGVyRXZlbnQ6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xyXG4gICAgLy/pgInmi6nmqKHlvI9cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogY2MuRW51bShTZWxlY3RlZFR5cGUpLFxyXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAn6YCJ5oup5qih5byPJ1xyXG4gICAgfSlcclxuICAgIHB1YmxpYyBzZWxlY3RlZE1vZGU6IFNlbGVjdGVkVHlwZSA9IFNlbGVjdGVkVHlwZS5OT05FO1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ+aYr+WQpumHjeWkjeWTjeW6lOWNlemAieS6i+S7ticsXHJcbiAgICAgICAgdmlzaWJsZSgpIHsgcmV0dXJuIHRoaXMuc2VsZWN0ZWRNb2RlID09IFNlbGVjdGVkVHlwZS5TSU5HTEU7IH1cclxuICAgIH0pXHJcbiAgICBwdWJsaWMgcmVwZWF0RXZlbnRTaW5nbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v6Kem5Y+R6YCJ5oup5LqL5Lu2XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXHJcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICfop6blj5HpgInmi6nkuovku7YnLFxyXG4gICAgICAgIHZpc2libGUoKSB7IHJldHVybiB0aGlzLnNlbGVjdGVkTW9kZSA+IFNlbGVjdGVkVHlwZS5OT05FOyB9XHJcbiAgICB9KVxyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZEV2ZW50OiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyID0gbnVsbC8vbmV3IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIoKTtcclxuICAgIC8v5b2T5YmN6YCJ5oupaWRcclxuICAgIHByaXZhdGUgX3NlbGVjdGVkSWQ6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBfbGFzdFNlbGVjdGVkSWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbXVsdFNlbGVjdGVkOiBudW1iZXJbXTtcclxuICAgIHNldCBzZWxlY3RlZElkKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGl0ZW06IGFueTtcclxuICAgICAgICBzd2l0Y2ggKHQuc2VsZWN0ZWRNb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0ZWRUeXBlLlNJTkdMRToge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0LnJlcGVhdEV2ZW50U2luZ2xlICYmIHZhbCA9PSB0Ll9zZWxlY3RlZElkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0LmdldEl0ZW1CeUxpc3RJZCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFpdGVtICYmIHZhbCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0SXRlbTogTGlzdEl0ZW07XHJcbiAgICAgICAgICAgICAgICBpZiAodC5fc2VsZWN0ZWRJZCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHQuX2xhc3RTZWxlY3RlZElkID0gdC5fc2VsZWN0ZWRJZDtcclxuICAgICAgICAgICAgICAgIGVsc2UgLy/lpoLmnpzvvJww5YiZ5Y+W5raI6YCJ5oup77yM5oqKX2xhc3RTZWxlY3RlZElk5Lmf572u56m65ZCn77yM5aaC5p6c5Lul5ZCO5pyJ54m55q6K6ZyA5rGC5YaN5pS55ZCn44CCXHJcbiAgICAgICAgICAgICAgICAgICAgdC5fbGFzdFNlbGVjdGVkSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdC5fc2VsZWN0ZWRJZCA9IHZhbDtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBpdGVtLmdldENvbXBvbmVudChMaXN0SXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHQuX2xhc3RTZWxlY3RlZElkID49IDAgJiYgdC5fbGFzdFNlbGVjdGVkSWQgIT0gdC5fc2VsZWN0ZWRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0SXRlbTogYW55ID0gdC5nZXRJdGVtQnlMaXN0SWQodC5fbGFzdFNlbGVjdGVkSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0SXRlbS5nZXRDb21wb25lbnQoTGlzdEl0ZW0pLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHQuc2VsZWN0ZWRFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhbdC5zZWxlY3RlZEV2ZW50XSwgaXRlbSwgdmFsICUgdGhpcy5fYWN0dWFsTnVtSXRlbXMsIHQuX2xhc3RTZWxlY3RlZElkID09IG51bGwgPyBudWxsIDogKHQuX2xhc3RTZWxlY3RlZElkICUgdGhpcy5fYWN0dWFsTnVtSXRlbXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0ZWRUeXBlLk1VTFQ6IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0LmdldEl0ZW1CeUxpc3RJZCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KExpc3RJdGVtKTtcclxuICAgICAgICAgICAgICAgIGlmICh0Ll9zZWxlY3RlZElkID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdC5fbGFzdFNlbGVjdGVkSWQgPSB0Ll9zZWxlY3RlZElkO1xyXG4gICAgICAgICAgICAgICAgdC5fc2VsZWN0ZWRJZCA9IHZhbDtcclxuICAgICAgICAgICAgICAgIGxldCBib29sOiBib29sZWFuID0gIWxpc3RJdGVtLnNlbGVjdGVkO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uc2VsZWN0ZWQgPSBib29sO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YjogbnVtYmVyID0gdC5tdWx0U2VsZWN0ZWQuaW5kZXhPZih2YWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvb2wgJiYgc3ViIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHQubXVsdFNlbGVjdGVkLnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWJvb2wgJiYgc3ViID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0Lm11bHRTZWxlY3RlZC5zcGxpY2Uoc3ViLCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0LnNlbGVjdGVkRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHMoW3Quc2VsZWN0ZWRFdmVudF0sIGl0ZW0sIHZhbCAlIHRoaXMuX2FjdHVhbE51bUl0ZW1zLCB0Ll9sYXN0U2VsZWN0ZWRJZCA9PSBudWxsID8gbnVsbCA6ICh0Ll9sYXN0U2VsZWN0ZWRJZCAlIHRoaXMuX2FjdHVhbE51bUl0ZW1zKSwgYm9vbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBzZWxlY3RlZElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZElkO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZm9yY2VVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX2FsaWduOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9ob3Jpem9udGFsRGlyOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF92ZXJ0aWNhbERpcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRBeGlzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9hbGlnbkNhbGNUeXBlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29udGVudDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZmlyc3RMaXN0SWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBkaXNwbGF5SXRlbU51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfdXBkYXRlRG9uZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIF91cGRhdGVDb3VudGVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgX2FjdHVhbE51bUl0ZW1zOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jeWNsaWNOdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2N5Y2xpY1BvczE6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2N5Y2xpY1BvczI6IG51bWJlcjtcclxuICAgIC8v5YiX6KGo5pWw6YePXHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2VcclxuICAgIH0pXHJcbiAgICBwcml2YXRlIF9udW1JdGVtczogbnVtYmVyID0gMDtcclxuICAgIHNldCBudW1JdGVtcyh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBpZiAoIXQuY2hlY2tJbml0ZWQoZmFsc2UpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHZhbCA9PSBudWxsIHx8IHZhbCA8IDApIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoJ251bUl0ZW1zIHNldCB0aGUgd3Jvbmc6OicsIHZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdC5fYWN0dWFsTnVtSXRlbXMgPSB0Ll9udW1JdGVtcyA9IHZhbDtcclxuICAgICAgICB0Ll9mb3JjZVVwZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0Ll92aXJ0dWFsKSB7XHJcbiAgICAgICAgICAgIHQuX3Jlc2l6ZUNvbnRlbnQoKTtcclxuICAgICAgICAgICAgaWYgKHQuY3ljbGljKSB7XHJcbiAgICAgICAgICAgICAgICB0Ll9udW1JdGVtcyA9IHQuX2N5Y2xpY051bSAqIHQuX251bUl0ZW1zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHQuX29uU2Nyb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGlmICghdC5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0gJiYgdC5zbGlkZU1vZGUgPT0gU2xpZGVUeXBlLlBBR0UpXHJcbiAgICAgICAgICAgICAgICB0LmN1clBhZ2VOdW0gPSB0Lm5lYXJlc3RMaXN0SWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGxheW91dDogY2MuTGF5b3V0ID0gdC5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpO1xyXG4gICAgICAgICAgICBpZiAobGF5b3V0KSB7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdC5fZGVsUmVkdW5kYW50SXRlbSgpO1xyXG5cclxuICAgICAgICAgICAgdC5maXJzdExpc3RJZCA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0LmZyYW1lQnlGcmFtZVJlbmRlck51bSA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8v5YWI5riy5p+T5Yeg5Liq5Ye65p2lXHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0LmZyYW1lQnlGcmFtZVJlbmRlck51bSA+IHQuX251bUl0ZW1zID8gdC5fbnVtSXRlbXMgOiB0LmZyYW1lQnlGcmFtZVJlbmRlck51bTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG46IG51bWJlciA9IDA7IG4gPCBsZW47IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuX2NyZWF0ZU9yVXBkYXRlSXRlbTIobik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodC5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0gPCB0Ll9udW1JdGVtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHQuX3VwZGF0ZUNvdW50ZXIgPSB0LmZyYW1lQnlGcmFtZVJlbmRlck51bTtcclxuICAgICAgICAgICAgICAgICAgICB0Ll91cGRhdGVEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSAwOyBuIDwgdmFsOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0Ll9jcmVhdGVPclVwZGF0ZUl0ZW0yKG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdC5kaXNwbGF5SXRlbU51bSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBudW1JdGVtcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0dWFsTnVtSXRlbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3O1xyXG4gICAgZ2V0IHNjcm9sbFZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbFZpZXc7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9sYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgX3Jlc2l6ZU1vZGU6IGNjLkxheW91dC5SZXNpemVNb2RlO1xyXG4gICAgcHJpdmF0ZSBfdG9wR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9yaWdodEdhcDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYm90dG9tR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9sZWZ0R2FwOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY29sdW1uR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9saW5lR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jb2xMaW5lTnVtOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdERpc3BsYXlEYXRhOiBudW1iZXJbXTtcclxuICAgIHB1YmxpYyBkaXNwbGF5RGF0YTogYW55W107XHJcbiAgICBwcml2YXRlIF9wb29sOiBjYy5Ob2RlUG9vbDtcclxuXHJcbiAgICBwcml2YXRlIF9pdGVtVG1wOiBhbnk7XHJcbiAgICBwcml2YXRlIF9uZWVkVXBkYXRlV2lkZ2V0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pdGVtU2l6ZTogY2MuU2l6ZTtcclxuICAgIHByaXZhdGUgX3NpemVUeXBlOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBfY3VzdG9tU2l6ZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgZnJhbWVDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYW5pRGVsUnVuaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHZpZXdUb3A6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdmlld1JpZ2h0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHZpZXdCb3R0b206IG51bWJlcjtcclxuICAgIHByaXZhdGUgdmlld0xlZnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9kb25lQWZ0ZXJVcGRhdGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIGVsYXN0aWNUb3A6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZWxhc3RpY1JpZ2h0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGVsYXN0aWNCb3R0b206IG51bWJlcjtcclxuICAgIHByaXZhdGUgZWxhc3RpY0xlZnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHNjcm9sbFRvTGlzdElkOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBhZGhlcmluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2FkaGVyaW5nQmFycmllcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBuZWFyZXN0TGlzdElkOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGN1clBhZ2VOdW06IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9iZWdhblBvczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc2Nyb2xsUG9zOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2Nyb2xsVG9MaXN0SWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3Njcm9sbFRvRW5kVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfc2Nyb2xsVG9TbzogYW55O1xyXG5cclxuICAgIHByaXZhdGUgX2xhY2s6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9hbGxJdGVtU2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYWxsSXRlbVNpemVOb0VkZ2U6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9zY3JvbGxJdGVtOiBhbnk7Ly/lvZPliY3mjqfliLYgU2Nyb2xsVmlldyDmu5rliqjnmoQgSXRlbVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0Ll9pdGVtVG1wICYmIHQuX2l0ZW1UbXAuaXNWYWxpZClcclxuICAgICAgICAgICAgdC5faXRlbVRtcC5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYgKHQudG1wTm9kZSAmJiB0LnRtcE5vZGUuaXNWYWxpZClcclxuICAgICAgICAgICAgdC50bXBOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyBsZXQgdG90YWwgPSB0Ll9wb29sLnNpemUoKTtcclxuICAgICAgICB3aGlsZSAodC5fcG9vbC5zaXplKCkpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0Ll9wb29sLmdldCgpO1xyXG4gICAgICAgICAgICBub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKHRvdGFsKVxyXG4gICAgICAgIC8vICAgICBjYy5sb2coJy0tLS0tLS0tLS0tLS0tLS0tJyArIHQubm9kZS5uYW1lICsgJzxMaXN0PiBkZXN0cm95IG5vZGUgdG90YWwgbnVtLiA9PicsIHRvdGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICAvLyBpZiAoIUNDX0VESVRPUikgXHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgLy8gaWYgKCFDQ19FRElUT1IpIFxyXG4gICAgICAgIHRoaXMuX3VucmVnaXN0ZXJFdmVudCgpO1xyXG4gICAgfVxyXG4gICAgLy/ms6jlhozkuovku7ZcclxuICAgIF9yZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIHQubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdC5fb25Ub3VjaFN0YXJ0LCB0LCB0cnVlKTtcclxuICAgICAgICB0Lm5vZGUub24oJ3RvdWNoLXVwJywgdC5fb25Ub3VjaFVwLCB0KTtcclxuICAgICAgICB0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0Ll9vblRvdWNoQ2FuY2VsbGVkLCB0LCB0cnVlKTtcclxuICAgICAgICB0Lm5vZGUub24oJ3Njcm9sbC1iZWdhbicsIHQuX29uU2Nyb2xsQmVnYW4sIHQsIHRydWUpO1xyXG4gICAgICAgIHQubm9kZS5vbignc2Nyb2xsLWVuZGVkJywgdC5fb25TY3JvbGxFbmRlZCwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgdC5ub2RlLm9uKCdzY3JvbGxpbmcnLCB0Ll9vblNjcm9sbGluZywgdCwgdHJ1ZSk7XHJcbiAgICAgICAgdC5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdC5fb25TaXplQ2hhbmdlZCwgdCk7XHJcbiAgICB9XHJcbiAgICAvL+WNuOi9veS6i+S7tlxyXG4gICAgX3VucmVnaXN0ZXJFdmVudCgpIHtcclxuICAgICAgICBsZXQgdDogYW55ID0gdGhpcztcclxuICAgICAgICB0Lm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0Ll9vblRvdWNoU3RhcnQsIHQsIHRydWUpO1xyXG4gICAgICAgIHQubm9kZS5vZmYoJ3RvdWNoLXVwJywgdC5fb25Ub3VjaFVwLCB0KTtcclxuICAgICAgICB0Lm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdC5fb25Ub3VjaENhbmNlbGxlZCwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgdC5ub2RlLm9mZignc2Nyb2xsLWJlZ2FuJywgdC5fb25TY3JvbGxCZWdhbiwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgdC5ub2RlLm9mZignc2Nyb2xsLWVuZGVkJywgdC5fb25TY3JvbGxFbmRlZCwgdCwgdHJ1ZSk7XHJcbiAgICAgICAgdC5ub2RlLm9mZignc2Nyb2xsaW5nJywgdC5fb25TY3JvbGxpbmcsIHQsIHRydWUpO1xyXG4gICAgICAgIHQubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0Ll9vblNpemVDaGFuZ2VkLCB0KTtcclxuICAgIH1cclxuICAgIC8v5Yid5aeL5YyW5ZCE56eNLi5cclxuICAgIF9pbml0KCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0Ll9pbml0ZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdC5fc2Nyb2xsVmlldyA9IHQubm9kZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcblxyXG4gICAgICAgIHQuY29udGVudCA9IHQuX3Njcm9sbFZpZXcuY29udGVudDtcclxuICAgICAgICBpZiAoIXQuY29udGVudCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcih0Lm5vZGUubmFtZSArIFwiJ3MgY2MuU2Nyb2xsVmlldyB1bnNldCBjb250ZW50IVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdC5fbGF5b3V0ID0gdC5jb250ZW50LmdldENvbXBvbmVudChjYy5MYXlvdXQpO1xyXG5cclxuICAgICAgICB0Ll9hbGlnbiA9IHQuX2xheW91dC50eXBlOyAvL+aOkuWIl+aooeW8j1xyXG4gICAgICAgIHQuX3Jlc2l6ZU1vZGUgPSB0Ll9sYXlvdXQucmVzaXplTW9kZTsgLy/oh6rpgILlupTmqKHlvI9cclxuICAgICAgICB0Ll9zdGFydEF4aXMgPSB0Ll9sYXlvdXQuc3RhcnRBeGlzO1xyXG5cclxuICAgICAgICB0Ll90b3BHYXAgPSB0Ll9sYXlvdXQucGFkZGluZ1RvcDsgLy/pobbovrnot51cclxuICAgICAgICB0Ll9yaWdodEdhcCA9IHQuX2xheW91dC5wYWRkaW5nUmlnaHQ7IC8v5Y+z6L656LedXHJcbiAgICAgICAgdC5fYm90dG9tR2FwID0gdC5fbGF5b3V0LnBhZGRpbmdCb3R0b207IC8v5bqV6L656LedXHJcbiAgICAgICAgdC5fbGVmdEdhcCA9IHQuX2xheW91dC5wYWRkaW5nTGVmdDsgLy/lt6bovrnot51cclxuXHJcbiAgICAgICAgdC5fY29sdW1uR2FwID0gdC5fbGF5b3V0LnNwYWNpbmdYOyAvL+WIl+i3nVxyXG4gICAgICAgIHQuX2xpbmVHYXAgPSB0Ll9sYXlvdXQuc3BhY2luZ1k7IC8v6KGM6LedXHJcblxyXG4gICAgICAgIHQuX2NvbExpbmVOdW07IC8v5YiX5pWw5oiW6KGM5pWw77yI6Z2eR1JJROaooeW8j+WImT0x77yM6KGo56S65Y2V5YiX5oiW5Y2V6KGM77yJO1xyXG5cclxuICAgICAgICB0Ll92ZXJ0aWNhbERpciA9IHQuX2xheW91dC52ZXJ0aWNhbERpcmVjdGlvbjsgLy/lnoLnm7TmjpLliJflrZDoioLngrnnmoTmlrnlkJFcclxuICAgICAgICB0Ll9ob3Jpem9udGFsRGlyID0gdC5fbGF5b3V0Lmhvcml6b250YWxEaXJlY3Rpb247IC8v5rC05bmz5o6S5YiX5a2Q6IqC54K555qE5pa55ZCRXHJcblxyXG4gICAgICAgIHQuc2V0VGVtcGxhdGVJdGVtKGNjLmluc3RhbnRpYXRlKHQudGVtcGxhdGVUeXBlID09IFRlbXBsYXRlVHlwZS5QUkVGQUIgPyB0LnRtcFByZWZhYiA6IHQudG1wTm9kZSkpO1xyXG5cclxuICAgICAgICAvLyDnibnlrprnmoTmu5HliqjmqKHlvI/lpITnkIZcclxuICAgICAgICBpZiAodC5fc2xpZGVNb2RlID09IFNsaWRlVHlwZS5BREhFUklORyB8fCB0Ll9zbGlkZU1vZGUgPT0gU2xpZGVUeXBlLlBBR0UpIHtcclxuICAgICAgICAgICAgdC5fc2Nyb2xsVmlldy5pbmVydGlhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHQuX3Njcm9sbFZpZXcuX29uTW91c2VXaGVlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0LnZpcnR1YWwpICAgICAgICAgLy8gbGFja0NlbnRlciDku4XmlK/mjIEgVmlydHVhbCDmqKHlvI9cclxuICAgICAgICAgICAgdC5sYWNrQ2VudGVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHQuX2xhc3REaXNwbGF5RGF0YSA9IFtdOyAvL+acgOWQjuS4gOasoeWIt+aWsOeahOaVsOaNrlxyXG4gICAgICAgIHQuZGlzcGxheURhdGEgPSBbXTsgLy/lvZPliY3mlbDmja5cclxuICAgICAgICB0Ll9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7ICAgIC8v6L+Z5piv5Liq5rGg5a2QLi5cclxuICAgICAgICB0Ll9mb3JjZVVwZGF0ZSA9IGZhbHNlOyAgICAgICAgIC8v5piv5ZCm5by65Yi25pu05pawXHJcbiAgICAgICAgdC5fdXBkYXRlQ291bnRlciA9IDA7ICAgICAgICAgICAvL+W9k+WJjeWIhuW4p+a4suafk+W4p+aVsFxyXG4gICAgICAgIHQuX3VwZGF0ZURvbmUgPSB0cnVlOyAgICAgICAgICAgLy/liIbluKfmuLLmn5PmmK/lkKblrozmiJBcclxuXHJcbiAgICAgICAgdC5jdXJQYWdlTnVtID0gMDsgICAgICAgICAgICAgICAvL+W9k+WJjemhteaVsFxyXG5cclxuICAgICAgICBpZiAodC5jeWNsaWMgfHwgMCkge1xyXG4gICAgICAgICAgICB0Ll9zY3JvbGxWaWV3Ll9wcm9jZXNzQXV0b1Njcm9sbGluZyA9IHRoaXMuX3Byb2Nlc3NBdXRvU2Nyb2xsaW5nLmJpbmQodCk7XHJcbiAgICAgICAgICAgIHQuX3Njcm9sbFZpZXcuX3N0YXJ0Qm91bmNlQmFja0lmTmVlZGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHQuX3Njcm9sbFZpZXcuX3Njcm9sbENoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHQuX2FsaWduKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuSE9SSVpPTlRBTDoge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0Ll9ob3Jpem9udGFsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5MRUZUX1RPX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ll9hbGlnbkNhbGNUeXBlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ll9hbGlnbkNhbGNUeXBlID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHQuX3ZlcnRpY2FsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC5fYWxpZ25DYWxjVHlwZSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlZlcnRpY2FsRGlyZWN0aW9uLkJPVFRPTV9UT19UT1A6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuX2FsaWduQ2FsY1R5cGUgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuR1JJRDoge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0Ll9zdGFydEF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5BeGlzRGlyZWN0aW9uLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodC5fdmVydGljYWxEaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlZlcnRpY2FsRGlyZWN0aW9uLlRPUF9UT19CT1RUT006XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5fYWxpZ25DYWxjVHlwZSA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5WZXJ0aWNhbERpcmVjdGlvbi5CT1RUT01fVE9fVE9QOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuX2FsaWduQ2FsY1R5cGUgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LkF4aXNEaXJlY3Rpb24uVkVSVElDQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodC5faG9yaXpvbnRhbERpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5MRUZUX1RPX1JJR0hUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuX2FsaWduQ2FsY1R5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuX2FsaWduQ2FsY1R5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g5riF56m6IGNvbnRlbnRcclxuICAgICAgICAvLyB0LmNvbnRlbnQuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6IGNjLk5vZGUpID0+IHtcclxuICAgICAgICAvLyAgICAgY2hpbGQucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIC8vICAgICBpZiAoY2hpbGQgIT0gdC50bXBOb2RlICYmIGNoaWxkLmlzVmFsaWQpXHJcbiAgICAgICAgLy8gICAgICAgICBjaGlsZC5kZXN0cm95KCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdC5jb250ZW50LnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgdC5faW5pdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Li65LqG5a6e546w5b6q546v5YiX6KGo77yM5b+F6aG76KaG5YaZY2MuU2Nyb2xsVmlld+eahOafkOS6m+WHveaVsFxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGR0XHJcbiAgICAgKi9cclxuICAgIF9wcm9jZXNzQXV0b1Njcm9sbGluZyhkdDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gbGV0IGlzQXV0b1Njcm9sbEJyYWtlID0gdGhpcy5fc2Nyb2xsVmlldy5faXNOZWNlc3NhcnlBdXRvU2Nyb2xsQnJha2UoKTtcclxuICAgICAgICBsZXQgYnJha2luZ0ZhY3RvcjogbnVtYmVyID0gMTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbEFjY3VtdWxhdGVkVGltZSddICs9IGR0ICogKDEgLyBicmFraW5nRmFjdG9yKTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2U6IG51bWJlciA9IE1hdGgubWluKDEsIHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsQWNjdW11bGF0ZWRUaW1lJ10gLyB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFRvdGFsVGltZSddKTtcclxuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxBdHRlbnVhdGUnXSkge1xyXG4gICAgICAgICAgICBsZXQgdGltZTogbnVtYmVyID0gcGVyY2VudGFnZSAtIDE7XHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSB0aW1lICogdGltZSAqIHRpbWUgKiB0aW1lICogdGltZSArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3UG9zaXRpb246IGFueSA9IHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddLmFkZCh0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFRhcmdldERlbHRhJ10ubXVsKHBlcmNlbnRhZ2UpKTtcclxuICAgICAgICBsZXQgRVBTSUxPTjogbnVtYmVyID0gdGhpcy5fc2Nyb2xsVmlld1snZ2V0U2Nyb2xsRW5kZWRFdmVudFRpbWluZyddKCk7XHJcbiAgICAgICAgbGV0IHJlYWNoZWRFbmQ6IGJvb2xlYW4gPSBNYXRoLmFicyhwZXJjZW50YWdlIC0gMSkgPD0gRVBTSUxPTjtcclxuICAgICAgICAvLyBjYy5sb2cocmVhY2hlZEVuZCwgTWF0aC5hYnMocGVyY2VudGFnZSAtIDEpLCBFUFNJTE9OKVxyXG5cclxuICAgICAgICBsZXQgZmlyZUV2ZW50OiBib29sZWFuID0gTWF0aC5hYnMocGVyY2VudGFnZSAtIDEpIDw9IHRoaXMuX3Njcm9sbFZpZXdbJ2dldFNjcm9sbEVuZGVkRXZlbnRUaW1pbmcnXSgpO1xyXG4gICAgICAgIGlmIChmaXJlRXZlbnQgJiYgIXRoaXMuX3Njcm9sbFZpZXdbJ19pc1Njcm9sbEVuZGVkV2l0aFRocmVzaG9sZEV2ZW50RmlyZWQnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfZGlzcGF0Y2hFdmVudCddKCdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnKTtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCddID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmICh0aGlzLl9zY3JvbGxWaWV3LmVsYXN0aWMgJiYgIXJlYWNoZWRFbmQpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGJyYWtlT2Zmc2V0UG9zaXRpb24gPSBuZXdQb3NpdGlvbi5zdWIodGhpcy5fc2Nyb2xsVmlldy5fYXV0b1Njcm9sbEJyYWtpbmdTdGFydFBvc2l0aW9uKTtcclxuICAgICAgICAvLyAgICAgaWYgKGlzQXV0b1Njcm9sbEJyYWtlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBicmFrZU9mZnNldFBvc2l0aW9uID0gYnJha2VPZmZzZXRQb3NpdGlvbi5tdWwoYnJha2luZ0ZhY3Rvcik7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgbmV3UG9zaXRpb24gPSB0aGlzLl9zY3JvbGxWaWV3Ll9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24uYWRkKGJyYWtlT2Zmc2V0UG9zaXRpb24pO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIGxldCBtb3ZlRGVsdGEgPSBuZXdQb3NpdGlvbi5zdWIodGhpcy5fc2Nyb2xsVmlldy5nZXRDb250ZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgLy8gICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fc2Nyb2xsVmlldy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkobW92ZURlbHRhKTtcclxuICAgICAgICAvLyAgICAgaWYgKCFvdXRPZkJvdW5kYXJ5LmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgbmV3UG9zaXRpb24gPSBuZXdQb3NpdGlvbi5hZGQob3V0T2ZCb3VuZGFyeSk7XHJcbiAgICAgICAgLy8gICAgICAgICByZWFjaGVkRW5kID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKHJlYWNoZWRFbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxpbmcnXSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRlbHRhTW92ZTogYW55ID0gbmV3UG9zaXRpb24uc3ViKHRoaXMuX3Njcm9sbFZpZXcuZ2V0Q29udGVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIC8vIGNjLmxvZyhkZWx0YU1vdmUpXHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX21vdmVDb250ZW50J10odGhpcy5fc2Nyb2xsVmlld1snX2NsYW1wRGVsdGEnXShkZWx0YU1vdmUpLCByZWFjaGVkRW5kKTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfZGlzcGF0Y2hFdmVudCddKCdzY3JvbGxpbmcnKTtcclxuXHJcbiAgICAgICAgLy8gc2NvbGxUbyBBUEkgY29udHJvbGwgbW92ZVxyXG4gICAgICAgIGlmICghdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxpbmcnXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfaXNCb3VuY2luZyddID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXdbJ19zY3JvbGxpbmcnXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfZGlzcGF0Y2hFdmVudCddKCdzY3JvbGwtZW5kZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iuvue9ruaooeadv0l0ZW1cclxuICAgIHNldFRlbXBsYXRlSXRlbShpdGVtOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWl0ZW0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgdDogYW55ID0gdGhpcztcclxuICAgICAgICB0Ll9pdGVtVG1wID0gaXRlbTtcclxuXHJcbiAgICAgICAgaWYgKHQuX3Jlc2l6ZU1vZGUgPT0gY2MuTGF5b3V0LlJlc2l6ZU1vZGUuQ0hJTERSRU4pXHJcbiAgICAgICAgICAgIHQuX2l0ZW1TaXplID0gdC5fbGF5b3V0LmNlbGxTaXplO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdC5faXRlbVNpemUgPSBjYy5zaXplKGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgLy/ojrflj5ZMaXN0SXRlbe+8jOWmguaenOayoeacieWwseWPlua2iOmAieaLqeaooeW8j1xyXG4gICAgICAgIGxldCBjb20gPSBpdGVtLmdldENvbXBvbmVudChMaXN0SXRlbSk7XHJcbiAgICAgICAgbGV0IHJlbW92ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghY29tKVxyXG4gICAgICAgICAgICByZW1vdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIGlmIChjb20pIHtcclxuICAgICAgICAvLyAgICAgaWYgKCFjb20uX2J0bkNvbSAmJiAhaXRlbS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKSkge1xyXG4gICAgICAgIC8vICAgICAgICAgcmVtb3ZlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZiAocmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIHQuc2VsZWN0ZWRNb2RlID0gU2VsZWN0ZWRUeXBlLk5PTkU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgaWYgKGNvbSAmJiBjb20uZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0Ll9uZWVkVXBkYXRlV2lkZ2V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHQuc2VsZWN0ZWRNb2RlID09IFNlbGVjdGVkVHlwZS5NVUxUKVxyXG4gICAgICAgICAgICB0Lm11bHRTZWxlY3RlZCA9IFtdO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHQuX2FsaWduKSB7XHJcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuSE9SSVpPTlRBTDpcclxuICAgICAgICAgICAgICAgIHQuX2NvbExpbmVOdW0gPSAxO1xyXG4gICAgICAgICAgICAgICAgdC5fc2l6ZVR5cGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgdC5fY29sTGluZU51bSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0Ll9zaXplVHlwZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVHlwZS5HUklEOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0Ll9zdGFydEF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5BeGlzRGlyZWN0aW9uLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6K6h566X5YiX5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmltVzogbnVtYmVyID0gdC5jb250ZW50LndpZHRoIC0gdC5fbGVmdEdhcCAtIHQuX3JpZ2h0R2FwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ll9jb2xMaW5lTnVtID0gTWF0aC5mbG9vcigodHJpbVcgKyB0Ll9jb2x1bW5HYXApIC8gKHQuX2l0ZW1TaXplLndpZHRoICsgdC5fY29sdW1uR2FwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuX3NpemVUeXBlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuQXhpc0RpcmVjdGlvbi5WRVJUSUNBTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/orqHnrpfooYzmlbBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyaW1IOiBudW1iZXIgPSB0LmNvbnRlbnQuaGVpZ2h0IC0gdC5fdG9wR2FwIC0gdC5fYm90dG9tR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Ll9jb2xMaW5lTnVtID0gTWF0aC5mbG9vcigodHJpbUggKyB0Ll9saW5lR2FwKSAvICh0Ll9pdGVtU2l6ZS5oZWlnaHQgKyB0Ll9saW5lR2FwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQuX3NpemVUeXBlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6XmmK/lkKbliJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJpbnRMb2cg5piv5ZCm5omT5Y2w6ZSZ6K+v5L+h5oGvXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBjaGVja0luaXRlZChwcmludExvZzogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luaXRlZCkge1xyXG4gICAgICAgICAgICBpZiAocHJpbnRMb2cpXHJcbiAgICAgICAgICAgICAgICBjYy5lcnJvcignTGlzdCBpbml0aWFsaXphdGlvbiBub3QgY29tcGxldGVkIScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy/npoHnlKggTGF5b3V0IOe7hOS7tu+8jOiHquihjOiuoeeulyBDb250ZW50IFNpemVcclxuICAgIF9yZXNpemVDb250ZW50KCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0Ll9hbGlnbikge1xyXG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLkhPUklaT05UQUw6IHtcclxuICAgICAgICAgICAgICAgIGlmICh0Ll9jdXN0b21TaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpeGVkOiBhbnkgPSB0Ll9nZXRGaXhlZFNpemUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdC5fbGVmdEdhcCArIGZpeGVkLnZhbCArICh0Ll9pdGVtU2l6ZS53aWR0aCAqICh0Ll9udW1JdGVtcyAtIGZpeGVkLmNvdW50KSkgKyAodC5fY29sdW1uR2FwICogKHQuX251bUl0ZW1zIC0gMSkpICsgdC5fcmlnaHRHYXA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHQuX2xlZnRHYXAgKyAodC5faXRlbVNpemUud2lkdGggKiB0Ll9udW1JdGVtcykgKyAodC5fY29sdW1uR2FwICogKHQuX251bUl0ZW1zIC0gMSkpICsgdC5fcmlnaHRHYXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodC5fY3VzdG9tU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXhlZDogYW55ID0gdC5fZ2V0Rml4ZWRTaXplKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHQuX3RvcEdhcCArIGZpeGVkLnZhbCArICh0Ll9pdGVtU2l6ZS5oZWlnaHQgKiAodC5fbnVtSXRlbXMgLSBmaXhlZC5jb3VudCkpICsgKHQuX2xpbmVHYXAgKiAodC5fbnVtSXRlbXMgLSAxKSkgKyB0Ll9ib3R0b21HYXA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHQuX3RvcEdhcCArICh0Ll9pdGVtU2l6ZS5oZWlnaHQgKiB0Ll9udW1JdGVtcykgKyAodC5fbGluZUdhcCAqICh0Ll9udW1JdGVtcyAtIDEpKSArIHQuX2JvdHRvbUdhcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LlR5cGUuR1JJRDoge1xyXG4gICAgICAgICAgICAgICAgLy/nvZHmoLzmqKHlvI/kuI3mlK/mjIHlsYXkuK1cclxuICAgICAgICAgICAgICAgIGlmICh0LmxhY2tDZW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgdC5sYWNrQ2VudGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHQuX3N0YXJ0QXhpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LkF4aXNEaXJlY3Rpb24uSE9SSVpPTlRBTDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVOdW06IG51bWJlciA9IE1hdGguY2VpbCh0Ll9udW1JdGVtcyAvIHQuX2NvbExpbmVOdW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0Ll90b3BHYXAgKyAodC5faXRlbVNpemUuaGVpZ2h0ICogbGluZU51bSkgKyAodC5fbGluZUdhcCAqIChsaW5lTnVtIC0gMSkpICsgdC5fYm90dG9tR2FwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5BeGlzRGlyZWN0aW9uLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29sTnVtOiBudW1iZXIgPSBNYXRoLmNlaWwodC5fbnVtSXRlbXMgLyB0Ll9jb2xMaW5lTnVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdC5fbGVmdEdhcCArICh0Ll9pdGVtU2l6ZS53aWR0aCAqIGNvbE51bSkgKyAodC5fY29sdW1uR2FwICogKGNvbE51bSAtIDEpKSArIHQuX3JpZ2h0R2FwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGF5b3V0OiBjYy5MYXlvdXQgPSB0LmNvbnRlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgaWYgKGxheW91dClcclxuICAgICAgICAgICAgbGF5b3V0LmVuYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdC5fYWxsSXRlbVNpemUgPSByZXN1bHQ7XHJcbiAgICAgICAgdC5fYWxsSXRlbVNpemVOb0VkZ2UgPSB0Ll9hbGxJdGVtU2l6ZSAtICh0Ll9zaXplVHlwZSA/ICh0Ll90b3BHYXAgKyB0Ll9ib3R0b21HYXApIDogKHQuX2xlZnRHYXAgKyB0Ll9yaWdodEdhcCkpO1xyXG5cclxuICAgICAgICBpZiAodC5jeWNsaWMpIHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsU2l6ZTogbnVtYmVyID0gKHQuX3NpemVUeXBlID8gdC5ub2RlLmhlaWdodCA6IHQubm9kZS53aWR0aCk7XHJcblxyXG4gICAgICAgICAgICB0Ll9jeWNsaWNQb3MxID0gMDtcclxuICAgICAgICAgICAgdG90YWxTaXplIC09IHQuX2N5Y2xpY1BvczE7XHJcbiAgICAgICAgICAgIHQuX2N5Y2xpY051bSA9IE1hdGguY2VpbCh0b3RhbFNpemUgLyB0Ll9hbGxJdGVtU2l6ZU5vRWRnZSkgKyAxO1xyXG4gICAgICAgICAgICBsZXQgc3BhY2luZzogbnVtYmVyID0gdC5fc2l6ZVR5cGUgPyB0Ll9saW5lR2FwIDogdC5fY29sdW1uR2FwO1xyXG4gICAgICAgICAgICB0Ll9jeWNsaWNQb3MyID0gdC5fY3ljbGljUG9zMSArIHQuX2FsbEl0ZW1TaXplTm9FZGdlICsgc3BhY2luZztcclxuICAgICAgICAgICAgdC5fY3ljbGljQWxsSXRlbVNpemUgPSB0Ll9hbGxJdGVtU2l6ZSArICh0Ll9hbGxJdGVtU2l6ZU5vRWRnZSAqICh0Ll9jeWNsaWNOdW0gLSAxKSkgKyAoc3BhY2luZyAqICh0Ll9jeWNsaWNOdW0gLSAxKSk7XHJcbiAgICAgICAgICAgIHQuX2N5Y2lsY0FsbEl0ZW1TaXplTm9FZGdlID0gdC5fYWxsSXRlbVNpemVOb0VkZ2UgKiB0Ll9jeWNsaWNOdW07XHJcbiAgICAgICAgICAgIHQuX2N5Y2lsY0FsbEl0ZW1TaXplTm9FZGdlICs9IHNwYWNpbmcgKiAodC5fY3ljbGljTnVtIC0gMSk7XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZygnX2N5Y2xpY051bSAtPicsIHQuX2N5Y2xpY051bSwgdC5fYWxsSXRlbVNpemVOb0VkZ2UsIHQuX2FsbEl0ZW1TaXplLCB0Ll9jeWNsaWNQb3MxLCB0Ll9jeWNsaWNQb3MyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHQuX2xhY2sgPSAhdC5jeWNsaWMgJiYgdC5fYWxsSXRlbVNpemUgPCAodC5fc2l6ZVR5cGUgPyB0Lm5vZGUuaGVpZ2h0IDogdC5ub2RlLndpZHRoKTtcclxuICAgICAgICBsZXQgc2xpZGVPZmZzZXQ6IG51bWJlciA9ICgoIXQuX2xhY2sgfHwgIXQubGFja0NlbnRlcikgJiYgdC5sYWNrU2xpZGUpID8gMCA6IC4xO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0V0g6IG51bWJlciA9IHQuX2xhY2sgPyAoKHQuX3NpemVUeXBlID8gdC5ub2RlLmhlaWdodCA6IHQubm9kZS53aWR0aCkgLSBzbGlkZU9mZnNldCkgOiAodC5jeWNsaWMgPyB0Ll9jeWNsaWNBbGxJdGVtU2l6ZSA6IHQuX2FsbEl0ZW1TaXplKTtcclxuICAgICAgICBpZiAodGFyZ2V0V0ggPCAwKVxyXG4gICAgICAgICAgICB0YXJnZXRXSCA9IDA7XHJcblxyXG4gICAgICAgIGlmICh0Ll9zaXplVHlwZSkge1xyXG4gICAgICAgICAgICB0LmNvbnRlbnQuaGVpZ2h0ID0gdGFyZ2V0V0g7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdC5jb250ZW50LndpZHRoID0gdGFyZ2V0V0g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYy5sb2coJ19yZXNpemVDb250ZW50KCkgIG51bUl0ZW1zID0nLCB0Ll9udW1JdGVtcywgJ++8jGNvbnRlbnQgPScsIHQuY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mu5rliqjov5vooYzml7YuLi5cclxuICAgIF9vblNjcm9sbGluZyhldjogY2MuRXZlbnQgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVDb3VudCA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ291bnQgPSB0aGlzLl91cGRhdGVSYXRlO1xyXG4gICAgICAgIGlmICghdGhpcy5fZm9yY2VVcGRhdGUgJiYgKGV2ICYmIGV2LnR5cGUgIT0gJ3Njcm9sbC1lbmRlZCcpICYmIHRoaXMuZnJhbWVDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUNvdW50LS07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUNvdW50ID0gdGhpcy5fdXBkYXRlUmF0ZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FuaURlbFJ1bmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL+W+queOr+WIl+ihqOWkhOeQhlxyXG4gICAgICAgIGlmICh0aGlzLmN5Y2xpYykge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsUG9zOiBhbnkgPSB0aGlzLmNvbnRlbnQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICAgICAgc2Nyb2xsUG9zID0gdGhpcy5fc2l6ZVR5cGUgPyBzY3JvbGxQb3MueSA6IHNjcm9sbFBvcy54O1xyXG5cclxuICAgICAgICAgICAgbGV0IGFkZFZhbCA9IHRoaXMuX2FsbEl0ZW1TaXplTm9FZGdlICsgKHRoaXMuX3NpemVUeXBlID8gdGhpcy5fbGluZUdhcCA6IHRoaXMuX2NvbHVtbkdhcCk7XHJcbiAgICAgICAgICAgIGxldCBhZGQ6IGFueSA9IHRoaXMuX3NpemVUeXBlID8gY2MudjIoMCwgYWRkVmFsKSA6IGNjLnYyKGFkZFZhbCwgMCk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2FsaWduQ2FsY1R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTovL+WNleihjEhPUklaT05UQUzvvIhMRUZUX1RPX1JJR0hU77yJ44CB572R5qC8VkVSVElDQUzvvIhMRUZUX1RPX1JJR0hU77yJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvcyA+IC10aGlzLl9jeWNsaWNQb3MxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gLXRoaXMuX2N5Y2xpY1BvczI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxWaWV3LmlzQXV0b1Njcm9sbGluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXSA9IHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddLnN1YihhZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl9iZWdhblBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fYmVnYW5Qb3MgKz0gYWRkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxQb3MgPCAtdGhpcy5fY3ljbGljUG9zMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueCA9IC10aGlzLl9jeWNsaWNQb3MxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVmlldy5pc0F1dG9TY3JvbGxpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uJ10gPSB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXS5hZGQoYWRkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5fYmVnYW5Qb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2JlZ2FuUG9zIC09IGFkZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjovL+WNleihjEhPUklaT05UQUzvvIhSSUdIVF9UT19MRUZU77yJ44CB572R5qC8VkVSVElDQUzvvIhSSUdIVF9UT19MRUZU77yJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbFBvcyA8IHRoaXMuX2N5Y2xpY1BvczEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnggPSB0aGlzLl9jeWNsaWNQb3MyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVmlldy5pc0F1dG9TY3JvbGxpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uJ10gPSB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXS5hZGQoYWRkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zID4gdGhpcy5fY3ljbGljUG9zMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueCA9IHRoaXMuX2N5Y2xpY1BvczE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxWaWV3LmlzQXV0b1Njcm9sbGluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXSA9IHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddLnN1YihhZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOi8v5Y2V5YiXVkVSVElDQUzvvIhUT1BfVE9fQk9UVE9N77yJ44CB572R5qC8SE9SSVpPTlRBTO+8iFRPUF9UT19CT1RUT03vvIlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUG9zIDwgdGhpcy5fY3ljbGljUG9zMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IHRoaXMuX2N5Y2xpY1BvczI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxWaWV3LmlzQXV0b1Njcm9sbGluZygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXSA9IHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddLmFkZChhZGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzY3JvbGxQb3MgPiB0aGlzLl9jeWNsaWNQb3MyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC55ID0gdGhpcy5fY3ljbGljUG9zMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Njcm9sbFZpZXcuaXNBdXRvU2Nyb2xsaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddID0gdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uJ10uc3ViKGFkZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6Ly/ljZXliJdWRVJUSUNBTO+8iEJPVFRPTV9UT19UT1DvvInjgIHnvZHmoLxIT1JJWk9OVEFM77yIQk9UVE9NX1RPX1RPUO+8iVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQb3MgPiAtdGhpcy5fY3ljbGljUG9zMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IC10aGlzLl9jeWNsaWNQb3MyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2Nyb2xsVmlldy5pc0F1dG9TY3JvbGxpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uJ10gPSB0aGlzLl9zY3JvbGxWaWV3WydfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24nXS5zdWIoYWRkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsUG9zIDwgLXRoaXMuX2N5Y2xpY1BvczIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50LnkgPSAtdGhpcy5fY3ljbGljUG9zMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Njcm9sbFZpZXcuaXNBdXRvU2Nyb2xsaW5nKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbFZpZXdbJ19hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiddID0gdGhpcy5fc2Nyb2xsVmlld1snX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uJ10uYWRkKGFkZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2NhbGNWaWV3UG9zKCk7XHJcblxyXG4gICAgICAgIGxldCB2VG9wOiBudW1iZXIsIHZSaWdodDogbnVtYmVyLCB2Qm90dG9tOiBudW1iZXIsIHZMZWZ0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NpemVUeXBlKSB7XHJcbiAgICAgICAgICAgIHZUb3AgPSB0aGlzLnZpZXdUb3A7XHJcbiAgICAgICAgICAgIHZCb3R0b20gPSB0aGlzLnZpZXdCb3R0b207XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdlJpZ2h0ID0gdGhpcy52aWV3UmlnaHQ7XHJcbiAgICAgICAgICAgIHZMZWZ0ID0gdGhpcy52aWV3TGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl92aXJ0dWFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheURhdGEgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGl0ZW1Qb3M6IGFueTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJJZDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgbGV0IGVuZElkOiBudW1iZXIgPSB0aGlzLl9udW1JdGVtcyAtIDE7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJyZWFrRm9yOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOivpWl0ZW3nmoTkvY3nva7lnKjlj6/op4bljLrln5/lhoXvvIzlsLHmjqjlhaVkaXNwbGF5RGF0YVxyXG4gICAgICAgICAgICAgICAgZm9yICg7IGN1cklkIDw9IGVuZElkICYmICFicmVha0ZvcjsgY3VySWQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1Qb3MgPSB0aGlzLl9jYWxjSXRlbVBvcyhjdXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9hbGlnbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVBvcy5yaWdodCA+PSB2TGVmdCAmJiBpdGVtUG9zLmxlZnQgPD0gdlJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5RGF0YS5wdXNoKGl0ZW1Qb3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJJZCAhPSAwICYmIHRoaXMuZGlzcGxheURhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrRm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1Qb3MuYm90dG9tIDw9IHZUb3AgJiYgaXRlbVBvcy50b3AgPj0gdkJvdHRvbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheURhdGEucHVzaChpdGVtUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VySWQgIT0gMCAmJiB0aGlzLmRpc3BsYXlEYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha0ZvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVHlwZS5HUklEOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFydEF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5BeGlzRGlyZWN0aW9uLkhPUklaT05UQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtUG9zLmJvdHRvbSA8PSB2VG9wICYmIGl0ZW1Qb3MudG9wID49IHZCb3R0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheURhdGEucHVzaChpdGVtUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJJZCAhPSAwICYmIHRoaXMuZGlzcGxheURhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtGb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LkF4aXNEaXJlY3Rpb24uVkVSVElDQUw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtUG9zLnJpZ2h0ID49IHZMZWZ0ICYmIGl0ZW1Qb3MubGVmdCA8PSB2UmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheURhdGEucHVzaChpdGVtUG9zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJJZCAhPSAwICYmIHRoaXMuZGlzcGxheURhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtGb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHd3OiBudW1iZXIgPSB0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX2NvbHVtbkdhcDtcclxuICAgICAgICAgICAgICAgIGxldCBoaDogbnVtYmVyID0gdGhpcy5faXRlbVNpemUuaGVpZ2h0ICsgdGhpcy5fbGluZUdhcDtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fYWxpZ25DYWxjVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTovL+WNleihjEhPUklaT05UQUzvvIhMRUZUX1RPX1JJR0hU77yJ44CB572R5qC8VkVSVElDQUzvvIhMRUZUX1RPX1JJR0hU77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cklkID0gKHZMZWZ0ICsgdGhpcy5fbGVmdEdhcCkgLyB3dztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kSWQgPSAodlJpZ2h0ICsgdGhpcy5fcmlnaHRHYXApIC8gd3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjovL+WNleihjEhPUklaT05UQUzvvIhSSUdIVF9UT19MRUZU77yJ44CB572R5qC8VkVSVElDQUzvvIhSSUdIVF9UT19MRUZU77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cklkID0gKC12UmlnaHQgLSB0aGlzLl9yaWdodEdhcCkgLyB3dztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kSWQgPSAoLXZMZWZ0IC0gdGhpcy5fbGVmdEdhcCkgLyB3dztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOi8v5Y2V5YiXVkVSVElDQUzvvIhUT1BfVE9fQk9UVE9N77yJ44CB572R5qC8SE9SSVpPTlRBTO+8iFRPUF9UT19CT1RUT03vvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VySWQgPSAoLXZUb3AgLSB0aGlzLl90b3BHYXApIC8gaGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZElkID0gKC12Qm90dG9tIC0gdGhpcy5fYm90dG9tR2FwKSAvIGhoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6Ly/ljZXliJdWRVJUSUNBTO+8iEJPVFRPTV9UT19UT1DvvInjgIHnvZHmoLxIT1JJWk9OVEFM77yIQk9UVE9NX1RPX1RPUO+8iVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJJZCA9ICh2Qm90dG9tICsgdGhpcy5fYm90dG9tR2FwKSAvIGhoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRJZCA9ICh2VG9wICsgdGhpcy5fdG9wR2FwKSAvIGhoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGN1cklkID0gTWF0aC5mbG9vcihjdXJJZCkgKiB0aGlzLl9jb2xMaW5lTnVtO1xyXG4gICAgICAgICAgICAgICAgZW5kSWQgPSBNYXRoLmNlaWwoZW5kSWQpICogdGhpcy5fY29sTGluZU51bTtcclxuICAgICAgICAgICAgICAgIGVuZElkLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VySWQgPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cklkID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChlbmRJZCA+PSB0aGlzLl9udW1JdGVtcylcclxuICAgICAgICAgICAgICAgICAgICBlbmRJZCA9IHRoaXMuX251bUl0ZW1zIC0gMTtcclxuICAgICAgICAgICAgICAgIGZvciAoOyBjdXJJZCA8PSBlbmRJZDsgY3VySWQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheURhdGEucHVzaCh0aGlzLl9jYWxjSXRlbVBvcyhjdXJJZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbFJlZHVuZGFudEl0ZW0oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheURhdGEubGVuZ3RoIDw9IDAgfHwgIXRoaXMuX251bUl0ZW1zKSB7IC8vaWYgbm9uZSwgZGVsZXRlIGFsbC5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REaXNwbGF5RGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3RMaXN0SWQgPSB0aGlzLmRpc3BsYXlEYXRhWzBdLmlkO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlJdGVtTnVtID0gdGhpcy5kaXNwbGF5RGF0YS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9sYXN0RGlzcGxheURhdGEubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgbGV0IGhhdmVEYXRhQ2hhbmdlOiBib29sZWFuID0gdGhpcy5kaXNwbGF5SXRlbU51bSAhPSBsZW47XHJcbiAgICAgICAgICAgIGlmIChoYXZlRGF0YUNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5piv6YCQ5bin5riy5p+T77yM6ZyA6KaB5o6S5bqPXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdERpc3BsYXlEYXRhLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g5ZugTGlzdOeahOaYvuekuuaVsOaNruaYr+acieW6j+eahO+8jOaJgOS7peWPqumcgOimgeWIpOaWreaVsOe7hOmVv+W6puaYr+WQpuebuOetie+8jOS7peWPiuWktOOAgeWwvuS4pOS4quWFg+e0oOaYr+WQpuebuOetieWNs+WPr+OAglxyXG4gICAgICAgICAgICAgICAgaGF2ZURhdGFDaGFuZ2UgPSB0aGlzLmZpcnN0TGlzdElkICE9IHRoaXMuX2xhc3REaXNwbGF5RGF0YVswXSB8fCB0aGlzLmRpc3BsYXlEYXRhW3RoaXMuZGlzcGxheUl0ZW1OdW0gLSAxXS5pZCAhPSB0aGlzLl9sYXN0RGlzcGxheURhdGFbbGVuIC0gMV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mb3JjZVVwZGF0ZSB8fCBoYXZlRGF0YUNoYW5nZSkgeyAgICAvL+WmguaenOaYr+W8uuWItuabtOaWsFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWVCeUZyYW1lUmVuZGVyTnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLl91cGRhdGVEb25lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5fbGFzdERpc3BsYXlEYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJDluKfmuLLmn5NcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbnVtSXRlbXMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fdXBkYXRlRG9uZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9uZUFmdGVyVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURvbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlRG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/nm7TmjqXmuLLmn5NcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RGlzcGxheURhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ0xpc3QgRGlzcGxheSBEYXRhIElJOjonLCB0aGlzLmRpc3BsYXlEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuZGlzcGxheUl0ZW1OdW07IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcmVhdGVPclVwZGF0ZUl0ZW0odGhpcy5kaXNwbGF5RGF0YVtjXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmNlVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2FsY05lYXJlc3RJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/orqHnrpflj6/op4bojIPlm7RcclxuICAgIF9jYWxjVmlld1BvcygpIHtcclxuICAgICAgICBsZXQgc2Nyb2xsUG9zOiBhbnkgPSB0aGlzLmNvbnRlbnQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2FsaWduQ2FsY1R5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iExFRlRfVE9fUklHSFTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iExFRlRfVE9fUklHSFTvvIlcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY0xlZnQgPSBzY3JvbGxQb3MueCA+IDAgPyBzY3JvbGxQb3MueCA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdMZWZ0ID0gKHNjcm9sbFBvcy54IDwgMCA/IC1zY3JvbGxQb3MueCA6IDApIC0gdGhpcy5lbGFzdGljTGVmdDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld1JpZ2h0ID0gdGhpcy52aWV3TGVmdCArIHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY1JpZ2h0ID0gdGhpcy52aWV3UmlnaHQgPiB0aGlzLmNvbnRlbnQud2lkdGggPyBNYXRoLmFicyh0aGlzLnZpZXdSaWdodCAtIHRoaXMuY29udGVudC53aWR0aCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3UmlnaHQgKz0gdGhpcy5lbGFzdGljUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2codGhpcy5lbGFzdGljTGVmdCwgdGhpcy5lbGFzdGljUmlnaHQsIHRoaXMudmlld0xlZnQsIHRoaXMudmlld1JpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6Ly/ljZXooYxIT1JJWk9OVEFM77yIUklHSFRfVE9fTEVGVO+8ieOAgee9keagvFZFUlRJQ0FM77yIUklHSFRfVE9fTEVGVO+8iVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGFzdGljUmlnaHQgPSBzY3JvbGxQb3MueCA8IDAgPyAtc2Nyb2xsUG9zLnggOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3UmlnaHQgPSAoc2Nyb2xsUG9zLnggPiAwID8gLXNjcm9sbFBvcy54IDogMCkgKyB0aGlzLmVsYXN0aWNSaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0xlZnQgPSB0aGlzLnZpZXdSaWdodCAtIHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY0xlZnQgPSB0aGlzLnZpZXdMZWZ0IDwgLXRoaXMuY29udGVudC53aWR0aCA/IE1hdGguYWJzKHRoaXMudmlld0xlZnQgKyB0aGlzLmNvbnRlbnQud2lkdGgpIDogMDtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0xlZnQgLT0gdGhpcy5lbGFzdGljTGVmdDtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0aGlzLmVsYXN0aWNMZWZ0LCB0aGlzLmVsYXN0aWNSaWdodCwgdGhpcy52aWV3TGVmdCwgdGhpcy52aWV3UmlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzovL+WNleWIl1ZFUlRJQ0FM77yIVE9QX1RPX0JPVFRPTe+8ieOAgee9keagvEhPUklaT05UQUzvvIhUT1BfVE9fQk9UVE9N77yJXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsYXN0aWNUb3AgPSBzY3JvbGxQb3MueSA8IDAgPyBNYXRoLmFicyhzY3JvbGxQb3MueSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3VG9wID0gKHNjcm9sbFBvcy55ID4gMCA/IC1zY3JvbGxQb3MueSA6IDApICsgdGhpcy5lbGFzdGljVG9wO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Qm90dG9tID0gdGhpcy52aWV3VG9wIC0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY0JvdHRvbSA9IHRoaXMudmlld0JvdHRvbSA8IC10aGlzLmNvbnRlbnQuaGVpZ2h0ID8gTWF0aC5hYnModGhpcy52aWV3Qm90dG9tICsgdGhpcy5jb250ZW50LmhlaWdodCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Qm90dG9tICs9IHRoaXMuZWxhc3RpY0JvdHRvbTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZyh0aGlzLmVsYXN0aWNUb3AsIHRoaXMuZWxhc3RpY0JvdHRvbSwgdGhpcy52aWV3VG9wLCB0aGlzLnZpZXdCb3R0b20pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDovL+WNleWIl1ZFUlRJQ0FM77yIQk9UVE9NX1RPX1RPUO+8ieOAgee9keagvEhPUklaT05UQUzvvIhCT1RUT01fVE9fVE9Q77yJXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsYXN0aWNCb3R0b20gPSBzY3JvbGxQb3MueSA+IDAgPyBNYXRoLmFicyhzY3JvbGxQb3MueSkgOiAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Qm90dG9tID0gKHNjcm9sbFBvcy55IDwgMCA/IC1zY3JvbGxQb3MueSA6IDApIC0gdGhpcy5lbGFzdGljQm90dG9tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3VG9wID0gdGhpcy52aWV3Qm90dG9tICsgdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY1RvcCA9IHRoaXMudmlld1RvcCA+IHRoaXMuY29udGVudC5oZWlnaHQgPyBNYXRoLmFicyh0aGlzLnZpZXdUb3AgLSB0aGlzLmNvbnRlbnQuaGVpZ2h0KSA6IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdUb3AgLT0gdGhpcy5lbGFzdGljVG9wO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKHRoaXMuZWxhc3RpY1RvcCwgdGhpcy5lbGFzdGljQm90dG9tLCB0aGlzLnZpZXdUb3AsIHRoaXMudmlld0JvdHRvbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iuoeeul+S9jee9riDmoLnmja5pZFxyXG4gICAgX2NhbGNJdGVtUG9zKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBpdGVtWDogbnVtYmVyLCBpdGVtWTogbnVtYmVyO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fYWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVHlwZS5IT1JJWk9OVEFMOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9ob3Jpem9udGFsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5MRUZUX1RPX1JJR0hUOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b21TaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZml4ZWQ6IGFueSA9IHRoaXMuX2dldEZpeGVkU2l6ZShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gdGhpcy5fbGVmdEdhcCArICgodGhpcy5faXRlbVNpemUud2lkdGggKyB0aGlzLl9jb2x1bW5HYXApICogKGlkIC0gZml4ZWQuY291bnQpKSArIChmaXhlZC52YWwgKyAodGhpcy5fY29sdW1uR2FwICogZml4ZWQuY291bnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjczogbnVtYmVyID0gdGhpcy5fY3VzdG9tU2l6ZVtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IChjcyA+IDAgPyBjcyA6IHRoaXMuX2l0ZW1TaXplLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSB0aGlzLl9sZWZ0R2FwICsgKCh0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX2NvbHVtbkdhcCkgKiBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IHRoaXMuX2l0ZW1TaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gbGVmdCArIHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYWNrQ2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSAodGhpcy5jb250ZW50LndpZHRoIC8gMikgLSAodGhpcy5fYWxsSXRlbVNpemVOb0VkZ2UgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgKz0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgKz0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogbGVmdCArICh0aGlzLl9pdGVtVG1wLmFuY2hvclggKiB3aWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB0aGlzLl9pdGVtVG1wLnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0Lkhvcml6b250YWxEaXJlY3Rpb24uUklHSFRfVE9fTEVGVDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpeGVkOiBhbnkgPSB0aGlzLl9nZXRGaXhlZFNpemUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSAtdGhpcy5fcmlnaHRHYXAgLSAoKHRoaXMuX2l0ZW1TaXplLndpZHRoICsgdGhpcy5fY29sdW1uR2FwKSAqIChpZCAtIGZpeGVkLmNvdW50KSkgLSAoZml4ZWQudmFsICsgKHRoaXMuX2NvbHVtbkdhcCAqIGZpeGVkLmNvdW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3M6IG51bWJlciA9IHRoaXMuX2N1c3RvbVNpemVbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSAoY3MgPiAwID8gY3MgOiB0aGlzLl9pdGVtU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IC10aGlzLl9yaWdodEdhcCAtICgodGhpcy5faXRlbVNpemUud2lkdGggKyB0aGlzLl9jb2x1bW5HYXApICogaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGggPSB0aGlzLl9pdGVtU2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gcmlnaHQgLSB3aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGFja0NlbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldDogbnVtYmVyID0gKHRoaXMuY29udGVudC53aWR0aCAvIDIpIC0gKHRoaXMuX2FsbEl0ZW1TaXplTm9FZGdlIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0IC09IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0IC09IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGxlZnQgKyAodGhpcy5faXRlbVRtcC5hbmNob3JYICogd2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5faXRlbVRtcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLkxheW91dC5UeXBlLlZFUlRJQ0FMOiB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3ZlcnRpY2FsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpeGVkOiBhbnkgPSB0aGlzLl9nZXRGaXhlZFNpemUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gLXRoaXMuX3RvcEdhcCAtICgodGhpcy5faXRlbVNpemUuaGVpZ2h0ICsgdGhpcy5fbGluZUdhcCkgKiAoaWQgLSBmaXhlZC5jb3VudCkpIC0gKGZpeGVkLnZhbCArICh0aGlzLl9saW5lR2FwICogZml4ZWQuY291bnQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjczogbnVtYmVyID0gdGhpcy5fY3VzdG9tU2l6ZVtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSAoY3MgPiAwID8gY3MgOiB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gLXRoaXMuX3RvcEdhcCAtICgodGhpcy5faXRlbVNpemUuaGVpZ2h0ICsgdGhpcy5fbGluZUdhcCkgKiBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tID0gdG9wIC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYWNrQ2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSAodGhpcy5jb250ZW50LmhlaWdodCAvIDIpIC0gKHRoaXMuX2FsbEl0ZW1TaXplTm9FZGdlIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgLT0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tIC09IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX2l0ZW1UbXAueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGJvdHRvbSArICh0aGlzLl9pdGVtVG1wLmFuY2hvclkgKiBoZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5WZXJ0aWNhbERpcmVjdGlvbi5CT1RUT01fVE9fVE9QOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b21TaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZml4ZWQ6IGFueSA9IHRoaXMuX2dldEZpeGVkU2l6ZShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b20gPSB0aGlzLl9ib3R0b21HYXAgKyAoKHRoaXMuX2l0ZW1TaXplLmhlaWdodCArIHRoaXMuX2xpbmVHYXApICogKGlkIC0gZml4ZWQuY291bnQpKSArIChmaXhlZC52YWwgKyAodGhpcy5fbGluZUdhcCAqIGZpeGVkLmNvdW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3M6IG51bWJlciA9IHRoaXMuX2N1c3RvbVNpemVbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gKGNzID4gMCA/IGNzIDogdGhpcy5faXRlbVNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMuX2JvdHRvbUdhcCArICgodGhpcy5faXRlbVNpemUuaGVpZ2h0ICsgdGhpcy5fbGluZUdhcCkgKiBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wID0gYm90dG9tICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYWNrQ2VudGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0OiBudW1iZXIgPSAodGhpcy5jb250ZW50LmhlaWdodCAvIDIpIC0gKHRoaXMuX2FsbEl0ZW1TaXplTm9FZGdlIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3AgKz0gb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tICs9IG9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHRoaXMuX2l0ZW1UbXAueCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IGJvdHRvbSArICh0aGlzLl9pdGVtVG1wLmFuY2hvclkgKiBoZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVHlwZS5HUklEOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sTGluZTogbnVtYmVyID0gTWF0aC5mbG9vcihpZCAvIHRoaXMuX2NvbExpbmVOdW0pO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9zdGFydEF4aXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5BeGlzRGlyZWN0aW9uLkhPUklaT05UQUw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl92ZXJ0aWNhbERpcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IC10aGlzLl90b3BHYXAgLSAoKHRoaXMuX2l0ZW1TaXplLmhlaWdodCArIHRoaXMuX2xpbmVHYXApICogY29sTGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tID0gdG9wIC0gdGhpcy5faXRlbVNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1ZID0gYm90dG9tICsgKHRoaXMuX2l0ZW1UbXAuYW5jaG9yWSAqIHRoaXMuX2l0ZW1TaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5WZXJ0aWNhbERpcmVjdGlvbi5CT1RUT01fVE9fVE9QOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tID0gdGhpcy5fYm90dG9tR2FwICsgKCh0aGlzLl9pdGVtU2l6ZS5oZWlnaHQgKyB0aGlzLl9saW5lR2FwKSAqIGNvbExpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcCA9IGJvdHRvbSArIHRoaXMuX2l0ZW1TaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtWSA9IGJvdHRvbSArICh0aGlzLl9pdGVtVG1wLmFuY2hvclkgKiB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1YID0gdGhpcy5fbGVmdEdhcCArICgoaWQgJSB0aGlzLl9jb2xMaW5lTnVtKSAqICh0aGlzLl9pdGVtU2l6ZS53aWR0aCArIHRoaXMuX2NvbHVtbkdhcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX2hvcml6b250YWxEaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0Lkhvcml6b250YWxEaXJlY3Rpb24uTEVGVF9UT19SSUdIVDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1YICs9ICh0aGlzLl9pdGVtVG1wLmFuY2hvclggKiB0aGlzLl9pdGVtU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVggLT0gKHRoaXMuY29udGVudC5hbmNob3JYICogdGhpcy5jb250ZW50LndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0Lkhvcml6b250YWxEaXJlY3Rpb24uUklHSFRfVE9fTEVGVDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1YICs9ICgoMSAtIHRoaXMuX2l0ZW1UbXAuYW5jaG9yWCkgKiB0aGlzLl9pdGVtU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVggLT0gKCgxIC0gdGhpcy5jb250ZW50LmFuY2hvclgpICogdGhpcy5jb250ZW50LndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtWCAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IGJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGl0ZW1YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogaXRlbVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuTGF5b3V0LkF4aXNEaXJlY3Rpb24uVkVSVElDQUw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLl9ob3Jpem9udGFsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5Ib3Jpem9udGFsRGlyZWN0aW9uLkxFRlRfVE9fUklHSFQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gdGhpcy5fbGVmdEdhcCArICgodGhpcy5faXRlbVNpemUud2lkdGggKyB0aGlzLl9jb2x1bW5HYXApICogY29sTGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBsZWZ0ICsgdGhpcy5faXRlbVNpemUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVggPSBsZWZ0ICsgKHRoaXMuX2l0ZW1UbXAuYW5jaG9yWCAqIHRoaXMuX2l0ZW1TaXplLndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtWCAtPSAodGhpcy5jb250ZW50LmFuY2hvclggKiB0aGlzLmNvbnRlbnQud2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5MYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSAtdGhpcy5fcmlnaHRHYXAgLSAoKHRoaXMuX2l0ZW1TaXplLndpZHRoICsgdGhpcy5fY29sdW1uR2FwKSAqIGNvbExpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSByaWdodCAtIHRoaXMuX2l0ZW1TaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1YID0gbGVmdCArICh0aGlzLl9pdGVtVG1wLmFuY2hvclggKiB0aGlzLl9pdGVtU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVggKz0gKCgxIC0gdGhpcy5jb250ZW50LmFuY2hvclgpICogdGhpcy5jb250ZW50LndpZHRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtWSA9IC10aGlzLl90b3BHYXAgLSAoKGlkICUgdGhpcy5fY29sTGluZU51bSkgKiAodGhpcy5faXRlbVNpemUuaGVpZ2h0ICsgdGhpcy5fbGluZUdhcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuX3ZlcnRpY2FsRGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5WZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVkgLT0gKCgxIC0gdGhpcy5faXRlbVRtcC5hbmNob3JZKSAqIHRoaXMuX2l0ZW1TaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVkgKz0gKCgxIC0gdGhpcy5jb250ZW50LmFuY2hvclkpICogdGhpcy5jb250ZW50LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLkxheW91dC5WZXJ0aWNhbERpcmVjdGlvbi5CT1RUT01fVE9fVE9QOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVkgLT0gKCh0aGlzLl9pdGVtVG1wLmFuY2hvclkpICogdGhpcy5faXRlbVNpemUuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtWSArPSAodGhpcy5jb250ZW50LmFuY2hvclkgKiB0aGlzLmNvbnRlbnQuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtWSAqPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiByaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IGl0ZW1YLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogaXRlbVksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iuoeeul+W3suWtmOWcqOeahEl0ZW3nmoTkvY3nva5cclxuICAgIF9jYWxjRXhpc3RJdGVtUG9zKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgaXRlbTogYW55ID0gdGhpcy5nZXRJdGVtQnlMaXN0SWQoaWQpO1xyXG4gICAgICAgIGlmICghaXRlbSlcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHtcclxuICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICB4OiBpdGVtLngsXHJcbiAgICAgICAgICAgIHk6IGl0ZW0ueSxcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3NpemVUeXBlKSB7XHJcbiAgICAgICAgICAgIGRhdGEudG9wID0gaXRlbS55ICsgKGl0ZW0uaGVpZ2h0ICogKDEgLSBpdGVtLmFuY2hvclkpKTtcclxuICAgICAgICAgICAgZGF0YS5ib3R0b20gPSBpdGVtLnkgLSAoaXRlbS5oZWlnaHQgKiBpdGVtLmFuY2hvclkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRhdGEubGVmdCA9IGl0ZW0ueCAtIChpdGVtLndpZHRoICogaXRlbS5hbmNob3JYKTtcclxuICAgICAgICAgICAgZGF0YS5yaWdodCA9IGl0ZW0ueCArIChpdGVtLndpZHRoICogKDEgLSBpdGVtLmFuY2hvclgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPlkl0ZW3kvY3nva5cclxuICAgIGdldEl0ZW1Qb3MoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl92aXJ0dWFsKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsY0l0ZW1Qb3MoaWQpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsY0l0ZW1Qb3MoaWQpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsY0V4aXN0SXRlbVBvcyhpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/ojrflj5blm7rlrprlsLrlr7hcclxuICAgIF9nZXRGaXhlZFNpemUobGlzdElkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2N1c3RvbVNpemUpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChsaXN0SWQgPT0gbnVsbClcclxuICAgICAgICAgICAgbGlzdElkID0gdGhpcy5fbnVtSXRlbXM7XHJcbiAgICAgICAgbGV0IGZpeGVkOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpZCBpbiB0aGlzLl9jdXN0b21TaXplKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChpZCkgPCBsaXN0SWQpIHtcclxuICAgICAgICAgICAgICAgIGZpeGVkICs9IHRoaXMuX2N1c3RvbVNpemVbaWRdO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWw6IGZpeGVkLFxyXG4gICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mu5rliqjnu5PmnZ/ml7YuLlxyXG4gICAgX29uU2Nyb2xsQmVnYW4oKSB7XHJcbiAgICAgICAgdGhpcy5fYmVnYW5Qb3MgPSB0aGlzLl9zaXplVHlwZSA/IHRoaXMudmlld1RvcCA6IHRoaXMudmlld0xlZnQ7XHJcbiAgICB9XHJcbiAgICAvL+a7muWKqOe7k+adn+aXti4uXHJcbiAgICBfb25TY3JvbGxFbmRlZCgpIHtcclxuICAgICAgICBsZXQgdDogYW55ID0gdGhpcztcclxuICAgICAgICBpZiAodC5zY3JvbGxUb0xpc3RJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBhbnkgPSB0LmdldEl0ZW1CeUxpc3RJZCh0LnNjcm9sbFRvTGlzdElkKTtcclxuICAgICAgICAgICAgdC5zY3JvbGxUb0xpc3RJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKC4xLCAxLjA2KSxcclxuICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKC4xLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICAvL25ldyBjYy5jYWxsRnVuYyhmdW5jdGlvbiAocnVuTm9kZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdC5fb25TY3JvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHQuX3NsaWRlTW9kZSA9PSBTbGlkZVR5cGUuQURIRVJJTkcgJiZcclxuICAgICAgICAgICAgIXQuYWRoZXJpbmdcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgLy9jYy5sb2codC5hZGhlcmluZywgdC5fc2Nyb2xsVmlldy5pc0F1dG9TY3JvbGxpbmcoKSwgdC5fc2Nyb2xsVmlldy5pc1Njcm9sbGluZygpKTtcclxuICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQuX3NsaWRlTW9kZSA9PSBTbGlkZVR5cGUuUEFHRSkge1xyXG4gICAgICAgICAgICBpZiAodC5fYmVnYW5Qb3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZUFkaGVyZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOinpuaRuOaXtlxyXG4gICAgX29uVG91Y2hTdGFydChldiwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxWaWV3WydfaGFzTmVzdGVkVmlld0dyb3VwJ10oZXYsIGNhcHR1cmVMaXN0ZW5lcnMpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGlzTWUgPSBldi5ldmVudFBoYXNlID09PSBjYy5FdmVudC5BVF9UQVJHRVQgJiYgZXYudGFyZ2V0ID09PSB0aGlzLm5vZGU7XHJcbiAgICAgICAgaWYgKCFpc01lKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtTm9kZTogYW55ID0gZXYudGFyZ2V0O1xyXG4gICAgICAgICAgICB3aGlsZSAoaXRlbU5vZGUuX2xpc3RJZCA9PSBudWxsICYmIGl0ZW1Ob2RlLnBhcmVudClcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlID0gaXRlbU5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxJdGVtID0gaXRlbU5vZGUuX2xpc3RJZCAhPSBudWxsID8gaXRlbU5vZGUgOiBldi50YXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/op6bmkbjmiqzotbfml7YuLlxyXG4gICAgX29uVG91Y2hVcCgpIHtcclxuICAgICAgICBsZXQgdDogYW55ID0gdGhpcztcclxuICAgICAgICB0Ll9zY3JvbGxQb3MgPSBudWxsO1xyXG4gICAgICAgIGlmICh0Ll9zbGlkZU1vZGUgPT0gU2xpZGVUeXBlLkFESEVSSU5HKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkaGVyaW5nKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRoZXJpbmdCYXJyaWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQuX3NsaWRlTW9kZSA9PSBTbGlkZVR5cGUuUEFHRSkge1xyXG4gICAgICAgICAgICBpZiAodC5fYmVnYW5Qb3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZUFkaGVyZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY3JvbGxJdGVtID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBfb25Ub3VjaENhbmNlbGxlZChldiwgY2FwdHVyZUxpc3RlbmVycykge1xyXG4gICAgICAgIGxldCB0ID0gdGhpcztcclxuICAgICAgICBpZiAodC5fc2Nyb2xsVmlld1snX2hhc05lc3RlZFZpZXdHcm91cCddKGV2LCBjYXB0dXJlTGlzdGVuZXJzKSB8fCBldi5zaW11bGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICB0Ll9zY3JvbGxQb3MgPSBudWxsO1xyXG4gICAgICAgIGlmICh0Ll9zbGlkZU1vZGUgPT0gU2xpZGVUeXBlLkFESEVSSU5HKSB7XHJcbiAgICAgICAgICAgIGlmICh0LmFkaGVyaW5nKVxyXG4gICAgICAgICAgICAgICAgdC5fYWRoZXJpbmdCYXJyaWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHQuX3NsaWRlTW9kZSA9PSBTbGlkZVR5cGUuUEFHRSkge1xyXG4gICAgICAgICAgICBpZiAodC5fYmVnYW5Qb3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdC5fcGFnZUFkaGVyZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdC5hZGhlcmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY3JvbGxJdGVtID0gbnVsbDtcclxuICAgIH1cclxuICAgIC8v5b2T5bC65a+45pS55Y+YXHJcbiAgICBfb25TaXplQ2hhbmdlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0luaXRlZChmYWxzZSkpXHJcbiAgICAgICAgICAgIHRoaXMuX29uU2Nyb2xsaW5nKCk7XHJcbiAgICB9XHJcbiAgICAvL+W9k0l0ZW3oh6rpgILlupRcclxuICAgIF9vbkl0ZW1BZGFwdGl2ZShpdGVtKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuY2hlY2tJbml0ZWQoZmFsc2UpKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAoIXRoaXMuX3NpemVUeXBlICYmIGl0ZW0ud2lkdGggIT0gdGhpcy5faXRlbVNpemUud2lkdGgpXHJcbiAgICAgICAgICAgIHx8ICh0aGlzLl9zaXplVHlwZSAmJiBpdGVtLmhlaWdodCAhPSB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fY3VzdG9tU2l6ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbVNpemUgPSB7fTtcclxuICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMuX3NpemVUeXBlID8gaXRlbS5oZWlnaHQgOiBpdGVtLndpZHRoO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tU2l6ZVtpdGVtLl9saXN0SWRdICE9IHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tU2l6ZVtpdGVtLl9saXN0SWRdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzaXplQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5jb250ZW50LmNoaWxkcmVuLmZvckVhY2goKGNoaWxkOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fdXBkYXRlSXRlbVBvcyhjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWxsKCk7XHJcbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzlvZPliY3mraPlnKjov5DooYwgc2Nyb2xsVG/vvIzogq/lrprkvJrkuI3lh4bnoa7vvIzlnKjov5nph4zlgZrkv67mraNcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxUb0xpc3RJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsUG9zID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5fc2Nyb2xsVG9Tbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyh0aGlzLl9zY3JvbGxUb0xpc3RJZCwgTWF0aC5tYXgoMCwgdGhpcy5fc2Nyb2xsVG9FbmRUaW1lIC0gKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgLyAxMDAwKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIC8vUEFHReeymOmZhFxyXG4gICAgX3BhZ2VBZGhlcmUoKSB7XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdC5jeWNsaWMgJiYgKHQuZWxhc3RpY1RvcCA+IDAgfHwgdC5lbGFzdGljUmlnaHQgPiAwIHx8IHQuZWxhc3RpY0JvdHRvbSA+IDAgfHwgdC5lbGFzdGljTGVmdCA+IDApKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGN1clBvcyA9IHQuX3NpemVUeXBlID8gdC52aWV3VG9wIDogdC52aWV3TGVmdDtcclxuICAgICAgICBsZXQgZGlzID0gKHQuX3NpemVUeXBlID8gdC5ub2RlLmhlaWdodCA6IHQubm9kZS53aWR0aCkgKiB0LnBhZ2VEaXN0YW5jZTtcclxuICAgICAgICBsZXQgY2FuU2tpcCA9IE1hdGguYWJzKHQuX2JlZ2FuUG9zIC0gY3VyUG9zKSA+IGRpcztcclxuICAgICAgICBpZiAoY2FuU2tpcCkge1xyXG4gICAgICAgICAgICBsZXQgdGltZUluU2Vjb25kID0gLjU7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodC5fYWxpZ25DYWxjVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iExFRlRfVE9fUklHSFTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iExFRlRfVE9fUklHSFTvvIlcclxuICAgICAgICAgICAgICAgIGNhc2UgNDovL+WNleWIl1ZFUlRJQ0FM77yIQk9UVE9NX1RPX1RPUO+8ieOAgee9keagvEhPUklaT05UQUzvvIhCT1RUT01fVE9fVE9Q77yJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuX2JlZ2FuUG9zID4gY3VyUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucHJlUGFnZSh0aW1lSW5TZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ19wYWdlQWRoZXJlICAgUFBQUFBQUFBQUFBQUFBQJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC5uZXh0UGFnZSh0aW1lSW5TZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYy5sb2coJ19wYWdlQWRoZXJlICAgTk5OTk5OTk5OTk5OTk5OJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iFJJR0hUX1RPX0xFRlTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iFJJR0hUX1RPX0xFRlTvvIlcclxuICAgICAgICAgICAgICAgIGNhc2UgMzovL+WNleWIl1ZFUlRJQ0FM77yIVE9QX1RPX0JPVFRPTe+8ieOAgee9keagvEhPUklaT05UQUzvvIhUT1BfVE9fQk9UVE9N77yJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQuX2JlZ2FuUG9zIDwgY3VyUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQucHJlUGFnZSh0aW1lSW5TZWNvbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubmV4dFBhZ2UodGltZUluU2Vjb25kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHQuZWxhc3RpY1RvcCA8PSAwICYmIHQuZWxhc3RpY1JpZ2h0IDw9IDAgJiYgdC5lbGFzdGljQm90dG9tIDw9IDAgJiYgdC5lbGFzdGljTGVmdCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHQuYWRoZXJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQuX2JlZ2FuUG9zID0gbnVsbDtcclxuICAgIH1cclxuICAgIC8v57KY6ZmEXHJcbiAgICBhZGhlcmUoKSB7XHJcbiAgICAgICAgbGV0IHQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0LmNoZWNrSW5pdGVkKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodC5lbGFzdGljVG9wID4gMCB8fCB0LmVsYXN0aWNSaWdodCA+IDAgfHwgdC5lbGFzdGljQm90dG9tID4gMCB8fCB0LmVsYXN0aWNMZWZ0ID4gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHQuYWRoZXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIHQuX2NhbGNOZWFyZXN0SXRlbSgpO1xyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9ICh0Ll9zaXplVHlwZSA/IHQuX3RvcEdhcCA6IHQuX2xlZnRHYXApIC8gKHQuX3NpemVUeXBlID8gdC5ub2RlLmhlaWdodCA6IHQubm9kZS53aWR0aCk7XHJcbiAgICAgICAgbGV0IHRpbWVJblNlY29uZDogbnVtYmVyID0gLjc7XHJcbiAgICAgICAgdC5zY3JvbGxUbyh0Lm5lYXJlc3RMaXN0SWQsIHRpbWVJblNlY29uZCwgb2Zmc2V0KTtcclxuICAgIH1cclxuICAgIC8vVXBkYXRlLi5cclxuICAgIHVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0gPD0gMCB8fCB0aGlzLl91cGRhdGVEb25lKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gY2MubG9nKHRoaXMuZGlzcGxheURhdGEubGVuZ3RoLCB0aGlzLl91cGRhdGVDb3VudGVyLCB0aGlzLmRpc3BsYXlEYXRhW3RoaXMuX3VwZGF0ZUNvdW50ZXJdKTtcclxuICAgICAgICBpZiAodGhpcy5fdmlydHVhbCkge1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSAodGhpcy5fdXBkYXRlQ291bnRlciArIHRoaXMuZnJhbWVCeUZyYW1lUmVuZGVyTnVtKSA+IHRoaXMuZGlzcGxheUl0ZW1OdW0gPyB0aGlzLmRpc3BsYXlJdGVtTnVtIDogKHRoaXMuX3VwZGF0ZUNvdW50ZXIgKyB0aGlzLmZyYW1lQnlGcmFtZVJlbmRlck51bSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG46IG51bWJlciA9IHRoaXMuX3VwZGF0ZUNvdW50ZXI7IG4gPCBsZW47IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuZGlzcGxheURhdGFbbl07XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU9yVXBkYXRlSXRlbShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VwZGF0ZUNvdW50ZXIgPj0gdGhpcy5kaXNwbGF5SXRlbU51bSAtIDEpIHsgLy/mnIDlkI7kuIDkuKpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kb25lQWZ0ZXJVcGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVDb3VudGVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEb25lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCF0aGlzLl9zY3JvbGxWaWV3LmlzU2Nyb2xsaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9uZUFmdGVyVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURvbmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbFJlZHVuZGFudEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mb3JjZVVwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGNOZWFyZXN0SXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNsaWRlTW9kZSA9PSBTbGlkZVR5cGUuUEFHRSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJQYWdlTnVtID0gdGhpcy5uZWFyZXN0TGlzdElkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ291bnRlciArPSB0aGlzLmZyYW1lQnlGcmFtZVJlbmRlck51bTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl91cGRhdGVDb3VudGVyIDwgdGhpcy5fbnVtSXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9ICh0aGlzLl91cGRhdGVDb3VudGVyICsgdGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0pID4gdGhpcy5fbnVtSXRlbXMgPyB0aGlzLl9udW1JdGVtcyA6ICh0aGlzLl91cGRhdGVDb3VudGVyICsgdGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbjogbnVtYmVyID0gdGhpcy5fdXBkYXRlQ291bnRlcjsgbiA8IGxlbjsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlT3JVcGRhdGVJdGVtMihuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvdW50ZXIgKz0gdGhpcy5mcmFtZUJ5RnJhbWVSZW5kZXJOdW07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEb25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGNOZWFyZXN0SXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVNb2RlID09IFNsaWRlVHlwZS5QQUdFKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyUGFnZU51bSA9IHRoaXMubmVhcmVzdExpc3RJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu65oiW5pu05pawSXRlbe+8iOiZmuaLn+WIl+ihqOeUqO+8iVxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIF9jcmVhdGVPclVwZGF0ZUl0ZW0oZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IGl0ZW06IGFueSA9IHRoaXMuZ2V0SXRlbUJ5TGlzdElkKGRhdGEuaWQpO1xyXG4gICAgICAgIGlmICghaXRlbSkgeyAvL+WmguaenOS4jeWtmOWcqFxyXG4gICAgICAgICAgICBsZXQgY2FuR2V0OiBib29sZWFuID0gdGhpcy5fcG9vbC5zaXplKCkgPiAwO1xyXG4gICAgICAgICAgICBpZiAoY2FuR2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5fcG9vbC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmxvZygn5LuO5rGg5Lit5Y+W5Ye6OjogICDml6dpZCA9JywgaXRlbVsnX2xpc3RJZCddLCAn77yM5pawaWQgPScsIGRhdGEuaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX2l0ZW1UbXApO1xyXG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKCfmlrDlu7o6OicsIGRhdGEuaWQsIGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtLl9saXN0SWQgIT0gZGF0YS5pZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5fbGlzdElkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0Q29udGVudFNpemUodGhpcy5faXRlbVNpemUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oY2MudjIoZGF0YS54LCBkYXRhLnkpKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVzZXRJdGVtU2l6ZShpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBpZiAoY2FuR2V0ICYmIHRoaXMuX25lZWRVcGRhdGVXaWRnZXQpIHtcclxuICAgICAgICAgICAgICAgIGxldCB3aWRnZXQ6IGNjLldpZGdldCA9IGl0ZW0uZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdldC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLnNldFNpYmxpbmdJbmRleCh0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCAtIDEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxpc3RJdGVtOiBMaXN0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KExpc3RJdGVtKTtcclxuICAgICAgICAgICAgaXRlbVsnbGlzdEl0ZW0nXSA9IGxpc3RJdGVtO1xyXG4gICAgICAgICAgICBpZiAobGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmxpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5saXN0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLl9yZWdpc3RlckV2ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMucmVuZGVyRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhbdGhpcy5yZW5kZXJFdmVudF0sIGl0ZW0sIGRhdGEuaWQgJSB0aGlzLl9hY3R1YWxOdW1JdGVtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2ZvcmNlVXBkYXRlICYmIHRoaXMucmVuZGVyRXZlbnQpIHsgLy/lvLrliLbmm7TmlrBcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MihkYXRhLngsIGRhdGEueSkpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNldEl0ZW1TaXplKGl0ZW0pO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2coJ0FERDo6JywgZGF0YS5pZCwgaXRlbSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbmRlckV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHMoW3RoaXMucmVuZGVyRXZlbnRdLCBpdGVtLCBkYXRhLmlkICUgdGhpcy5fYWN0dWFsTnVtSXRlbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Jlc2V0SXRlbVNpemUoaXRlbSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUxpc3RJdGVtKGl0ZW1bJ2xpc3RJdGVtJ10pO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0RGlzcGxheURhdGEuaW5kZXhPZihkYXRhLmlkKSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdERpc3BsYXlEYXRhLnB1c2goZGF0YS5pZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/liJvlu7rmiJbmm7TmlrBJdGVt77yI6Z2e6Jma5ouf5YiX6KGo55So77yJXHJcbiAgICBfY3JlYXRlT3JVcGRhdGVJdGVtMihsaXN0SWQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBpdGVtOiBhbnkgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bbGlzdElkXTtcclxuICAgICAgICBsZXQgbGlzdEl0ZW06IExpc3RJdGVtO1xyXG4gICAgICAgIGlmICghaXRlbSkgeyAvL+WmguaenOS4jeWtmOWcqFxyXG4gICAgICAgICAgICBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5faXRlbVRtcCk7XHJcbiAgICAgICAgICAgIGl0ZW0uX2xpc3RJZCA9IGxpc3RJZDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBsaXN0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KExpc3RJdGVtKTtcclxuICAgICAgICAgICAgaXRlbVsnbGlzdEl0ZW0nXSA9IGxpc3RJdGVtO1xyXG4gICAgICAgICAgICBpZiAobGlzdEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmxpc3RJZCA9IGxpc3RJZDtcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmxpc3QgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uX3JlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZW5kZXJFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKFt0aGlzLnJlbmRlckV2ZW50XSwgaXRlbSwgbGlzdElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fZm9yY2VVcGRhdGUgJiYgdGhpcy5yZW5kZXJFdmVudCkgeyAvL+W8uuWItuabtOaWsFxyXG4gICAgICAgICAgICBpdGVtLl9saXN0SWQgPSBsaXN0SWQ7XHJcbiAgICAgICAgICAgIGlmIChsaXN0SXRlbSlcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmxpc3RJZCA9IGxpc3RJZDtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVuZGVyRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIuZW1pdEV2ZW50cyhbdGhpcy5yZW5kZXJFdmVudF0sIGl0ZW0sIGxpc3RJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlTGlzdEl0ZW0obGlzdEl0ZW0pO1xyXG4gICAgICAgIGlmICh0aGlzLl9sYXN0RGlzcGxheURhdGEuaW5kZXhPZihsaXN0SWQpIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0RGlzcGxheURhdGEucHVzaChsaXN0SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfdXBkYXRlTGlzdEl0ZW0obGlzdEl0ZW06IExpc3RJdGVtKSB7XHJcbiAgICAgICAgaWYgKCFsaXN0SXRlbSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kZSA+IFNlbGVjdGVkVHlwZS5OT05FKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBhbnkgPSBsaXN0SXRlbS5ub2RlO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuc2VsZWN0ZWRNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFNlbGVjdGVkVHlwZS5TSU5HTEU6XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSWQgPT0gaXRlbS5fbGlzdElkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBTZWxlY3RlZFR5cGUuTVVMVDpcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5zZWxlY3RlZCA9IHRoaXMubXVsdFNlbGVjdGVkLmluZGV4T2YoaXRlbS5fbGlzdElkKSA+PSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/ku4XomZrmi5/liJfooajnlKhcclxuICAgIF9yZXNldEl0ZW1TaXplKGl0ZW06IGFueSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgc2l6ZTogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXN0b21TaXplICYmIHRoaXMuX2N1c3RvbVNpemVbaXRlbS5fbGlzdElkXSkge1xyXG4gICAgICAgICAgICBzaXplID0gdGhpcy5fY3VzdG9tU2l6ZVtpdGVtLl9saXN0SWRdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb2xMaW5lTnVtID4gMSlcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0Q29udGVudFNpemUodGhpcy5faXRlbVNpemUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzaXplID0gdGhpcy5fc2l6ZVR5cGUgPyB0aGlzLl9pdGVtU2l6ZS5oZWlnaHQgOiB0aGlzLl9pdGVtU2l6ZS53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNpemUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NpemVUeXBlKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBzaXplO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gc2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsEl0ZW3kvY3nva5cclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfHxOb2RlfSBsaXN0SWRPckl0ZW1cclxuICAgICAqL1xyXG4gICAgX3VwZGF0ZUl0ZW1Qb3MobGlzdElkT3JJdGVtOiBhbnkpIHtcclxuICAgICAgICBsZXQgaXRlbTogYW55ID0gaXNOYU4obGlzdElkT3JJdGVtKSA/IGxpc3RJZE9ySXRlbSA6IHRoaXMuZ2V0SXRlbUJ5TGlzdElkKGxpc3RJZE9ySXRlbSk7XHJcbiAgICAgICAgbGV0IHBvczogYW55ID0gdGhpcy5nZXRJdGVtUG9zKGl0ZW0uX2xpc3RJZCk7XHJcbiAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihwb3MueCwgcG9zLnkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lpJrpgIlcclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3Mg5Y+v5Lul5piv5Y2V5LiqbGlzdElk77yM5Lmf5Y+v5piv5LiqbGlzdElk5pWw57uEXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGJvb2wg5YC877yM5aaC5p6c5Li6bnVsbOeahOivne+8jOWImeebtOaOpeeUqGFyZ3Popobnm5ZcclxuICAgICAqL1xyXG4gICAgc2V0TXVsdFNlbGVjdGVkKGFyZ3M6IGFueSwgYm9vbDogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdC5jaGVja0luaXRlZCgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFyZ3MpKSB7XHJcbiAgICAgICAgICAgIGFyZ3MgPSBbYXJnc107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29sID09IG51bGwpIHtcclxuICAgICAgICAgICAgdC5tdWx0U2VsZWN0ZWQgPSBhcmdzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0SWQ6IG51bWJlciwgc3ViOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSBhcmdzLmxlbmd0aCAtIDE7IG4gPj0gMDsgbi0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdElkID0gYXJnc1tuXTtcclxuICAgICAgICAgICAgICAgICAgICBzdWIgPSB0Lm11bHRTZWxlY3RlZC5pbmRleE9mKGxpc3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YiA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC5tdWx0U2VsZWN0ZWQucHVzaChsaXN0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG46IG51bWJlciA9IGFyZ3MubGVuZ3RoIC0gMTsgbiA+PSAwOyBuLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SWQgPSBhcmdzW25dO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YiA9IHQubXVsdFNlbGVjdGVkLmluZGV4T2YobGlzdElkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC5tdWx0U2VsZWN0ZWQuc3BsaWNlKHN1YiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHQuX2ZvcmNlVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB0Ll9vblNjcm9sbGluZygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDmjIflrprnmoRJdGVtXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzIOWNleS4qmxpc3RJZO+8jOaIluiAheaVsOe7hFxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqL1xyXG4gICAgdXBkYXRlSXRlbShhcmdzOiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0ZWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShhcmdzKSkge1xyXG4gICAgICAgICAgICBhcmdzID0gW2FyZ3NdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSAwLCBsZW46IG51bWJlciA9IGFyZ3MubGVuZ3RoOyBuIDwgbGVuOyBuKyspIHtcclxuICAgICAgICAgICAgbGV0IGxpc3RJZDogbnVtYmVyID0gYXJnc1tuXTtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGFueSA9IHRoaXMuZ2V0SXRlbUJ5TGlzdElkKGxpc3RJZCk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKVxyXG4gICAgICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKFt0aGlzLnJlbmRlckV2ZW50XSwgaXRlbSwgbGlzdElkICUgdGhpcy5fYWN0dWFsTnVtSXRlbXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5YWo6YOoXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZUFsbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0ZWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubnVtSXRlbXMgPSB0aGlzLm51bUl0ZW1zO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5MaXN0SUTojrflj5ZJdGVtXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGlzdElkXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBnZXRJdGVtQnlMaXN0SWQobGlzdElkOiBudW1iZXIpIHtcclxuICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5Db3VudCAtIDE7IG4gPj0gMDsgbi0tKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOiBhbnkgPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW5bbl07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLl9saXN0SWQgPT0gbGlzdElkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blnKjmmL7npLrljLrln5/lpJbnmoRJdGVtXHJcbiAgICAgKiBAcmV0dXJuc1xyXG4gICAgICovXHJcbiAgICBfZ2V0T3V0c2lkZUl0ZW0oKSB7XHJcbiAgICAgICAgbGV0IGl0ZW06IGFueTtcclxuICAgICAgICBsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG46IG51bWJlciA9IHRoaXMuY29udGVudC5jaGlsZHJlbkNvdW50IC0gMTsgbiA+PSAwOyBuLS0pIHtcclxuICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29udGVudC5jaGlsZHJlbltuXTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRpc3BsYXlEYXRhLmZpbmQoZCA9PiBkLmlkID09IGl0ZW0uX2xpc3RJZCkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICAvL+WIoOmZpOaYvuekuuWMuuWfn+S7peWklueahEl0ZW1cclxuICAgIF9kZWxSZWR1bmRhbnRJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl92aXJ0dWFsKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnI6IGFueVtdID0gdGhpcy5fZ2V0T3V0c2lkZUl0ZW0oKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbjogbnVtYmVyID0gYXJyLmxlbmd0aCAtIDE7IG4gPj0gMDsgbi0tKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogYW55ID0gYXJyW25dO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Njcm9sbEl0ZW0gJiYgaXRlbS5fbGlzdElkID09IHRoaXMuX3Njcm9sbEl0ZW0uX2xpc3RJZClcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvb2wucHV0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbTogbnVtYmVyID0gdGhpcy5fbGFzdERpc3BsYXlEYXRhLmxlbmd0aCAtIDE7IG0gPj0gMDsgbS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3REaXNwbGF5RGF0YVttXSA9PSBpdGVtLl9saXN0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdERpc3BsYXlEYXRhLnNwbGljZShtLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNjLmxvZygn5a2Y5YWlOjonLCBzdHIsICcgICAgcG9vbC5sZW5ndGggPScsIHRoaXMuX3Bvb2wubGVuZ3RoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgPiB0aGlzLl9udW1JdGVtcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsU2luZ2xlSXRlbSh0aGlzLmNvbnRlbnQuY2hpbGRyZW5bdGhpcy5jb250ZW50LmNoaWxkcmVuQ291bnQgLSAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WIoOmZpOWNleS4qkl0ZW1cclxuICAgIF9kZWxTaW5nbGVJdGVtKGl0ZW06IGFueSkge1xyXG4gICAgICAgIC8vIGNjLmxvZygnREVMOjonLCBpdGVtWydfbGlzdElkJ10sIGl0ZW0pO1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmIChpdGVtLmRlc3Ryb3kpXHJcbiAgICAgICAgICAgIGl0ZW0uZGVzdHJveSgpO1xyXG4gICAgICAgIGl0ZW0gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLyoqIFxyXG4gICAgICog5Yqo5pWI5Yig6ZmkSXRlbe+8iOatpOaWueazleWPqumAgueUqOS6juiZmuaLn+WIl+ihqO+8jOWNs192aXJ0dWFsPXRydWXvvIlcclxuICAgICAqIOS4gOWumuimgeWcqOWbnuiwg+WHveaVsOmHjOmHjeaWsOiuvue9ruaWsOeahG51bUl0ZW1z6L+b6KGM5Yi35paw77yM5q+V56uf5pysTGlzdOaYr+mdoOaVsOaNrumpseWKqOeahOOAglxyXG4gICAgICovXHJcbiAgICBhbmlEZWxJdGVtKGxpc3RJZDogbnVtYmVyLCBjYWxsRnVuYzogRnVuY3Rpb24sIGFuaVR5cGU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoIXQuY2hlY2tJbml0ZWQoKSB8fCB0LmN5Y2xpYyB8fCAhdC5fdmlydHVhbClcclxuICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9yKCdUaGlzIGZ1bmN0aW9uIGlzIG5vdCBhbGxvd2VkIHRvIGJlIGNhbGxlZCEnKTtcclxuXHJcbiAgICAgICAgaWYgKHQuX2FuaURlbFJ1bmluZylcclxuICAgICAgICAgICAgcmV0dXJuIGNjLndhcm4oJ1BsZWFzZSB3YWl0IGZvciB0aGUgY3VycmVudCBkZWxldGlvbiB0byBmaW5pc2ghJyk7XHJcblxyXG4gICAgICAgIGxldCBpdGVtOiBhbnkgPSB0LmdldEl0ZW1CeUxpc3RJZChsaXN0SWQpO1xyXG4gICAgICAgIGxldCBsaXN0SXRlbTogTGlzdEl0ZW07XHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIGNhbGxGdW5jKGxpc3RJZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KExpc3RJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdC5fYW5pRGVsUnVuaW5nID0gdHJ1ZTtcclxuICAgICAgICBsZXQgY3VyTGFzdElkOiBudW1iZXIgPSB0LmRpc3BsYXlEYXRhW3QuZGlzcGxheURhdGEubGVuZ3RoIC0gMV0uaWQ7XHJcbiAgICAgICAgbGV0IHJlc2V0U2VsZWN0ZWRJZDogYm9vbGVhbiA9IGxpc3RJdGVtLnNlbGVjdGVkO1xyXG4gICAgICAgIGxpc3RJdGVtLnNob3dBbmkoYW5pVHlwZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+WIpOaWreacieayoeacieS4i+S4gOS4qu+8jOWmguaenOacieeahOivne+8jOWIm+W7uueyl+adpVxyXG4gICAgICAgICAgICBsZXQgbmV3SWQ6IG51bWJlcjtcclxuICAgICAgICAgICAgaWYgKGN1ckxhc3RJZCA8IHQuX251bUl0ZW1zIC0gMikge1xyXG4gICAgICAgICAgICAgICAgbmV3SWQgPSBjdXJMYXN0SWQgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdJZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3RGF0YTogYW55ID0gdC5fY2FsY0l0ZW1Qb3MobmV3SWQpO1xyXG4gICAgICAgICAgICAgICAgdC5kaXNwbGF5RGF0YS5wdXNoKG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQuX3ZpcnR1YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdC5fY3JlYXRlT3JVcGRhdGVJdGVtKG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHQuX2NyZWF0ZU9yVXBkYXRlSXRlbTIobmV3SWQpO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHQuX251bUl0ZW1zLS07XHJcbiAgICAgICAgICAgIGlmICh0LnNlbGVjdGVkTW9kZSA9PSBTZWxlY3RlZFR5cGUuU0lOR0xFKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzZXRTZWxlY3RlZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5fc2VsZWN0ZWRJZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0Ll9zZWxlY3RlZElkIC0gMSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5fc2VsZWN0ZWRJZC0tO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQuc2VsZWN0ZWRNb2RlID09IFNlbGVjdGVkVHlwZS5NVUxUICYmIHQubXVsdFNlbGVjdGVkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YjogbnVtYmVyID0gdC5tdWx0U2VsZWN0ZWQuaW5kZXhPZihsaXN0SWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN1YiA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdC5tdWx0U2VsZWN0ZWQuc3BsaWNlKHN1YiwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+WkmumAieeahOaVsOaNru+8jOWcqOWFtuWQjueahOWFqOmDqOWHj+S4gFxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbjogbnVtYmVyID0gdC5tdWx0U2VsZWN0ZWQubGVuZ3RoIC0gMTsgbiA+PSAwOyBuLS0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ6IG51bWJlciA9IHQubXVsdFNlbGVjdGVkW25dO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCA+PSBsaXN0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubXVsdFNlbGVjdGVkW25dLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHQuX2N1c3RvbVNpemUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0Ll9jdXN0b21TaXplW2xpc3RJZF0pXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHQuX2N1c3RvbVNpemVbbGlzdElkXTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXdDdXN0b21TaXplOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBzaXplOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBpbiB0Ll9jdXN0b21TaXplKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHQuX2N1c3RvbVNpemVbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZE51bWJlcjogbnVtYmVyID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0N1c3RvbVNpemVbaWROdW1iZXIgLSAoaWROdW1iZXIgPj0gbGlzdElkID8gMSA6IDApXSA9IHNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0Ll9jdXN0b21TaXplID0gbmV3Q3VzdG9tU2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WQjumdoueahEl0ZW3lkJHliY3mgLznmoTliqjmlYhcclxuICAgICAgICAgICAgbGV0IHNlYzogbnVtYmVyID0gLjIzMzM7XHJcbiAgICAgICAgICAgIGxldCBhY3RzOiBhbnlbXSwgaGF2ZUNCOiBib29sZWFuO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSBuZXdJZCAhPSBudWxsID8gbmV3SWQgOiBjdXJMYXN0SWQ7IG4gPj0gbGlzdElkICsgMTsgbi0tKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdC5nZXRJdGVtQnlMaXN0SWQobik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3NEYXRhOiBhbnkgPSB0Ll9jYWxjSXRlbVBvcyhuIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0cyA9IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MubW92ZVRvKHNlYywgY2MudjIocG9zRGF0YS54LCBwb3NEYXRhLnkpKSxcclxuICAgICAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuIDw9IGxpc3RJZCArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGF2ZUNCID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0cy5wdXNoKGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuX2FuaURlbFJ1bmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbEZ1bmMobGlzdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0cy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3RzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnJ1bkFjdGlvbihhY3RzWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWhhdmVDQikge1xyXG4gICAgICAgICAgICAgICAgdC5fYW5pRGVsUnVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjYWxsRnVuYyhsaXN0SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa7muWKqOWIsC4uXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGlzdElkIOe0ouW8le+8iOWmguaenDww77yM5YiZ5rua5Yiw6aaW5LiqSXRlbeS9jee9ru+8jOWmguaenD49X251bUl0ZW1z77yM5YiZ5rua5Yiw5pyA5pyrSXRlbeS9jee9ru+8iVxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVJblNlY29uZCDml7bpl7RcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQg57Si5byV55uu5qCH5L2N572u5YGP56e777yMMC0xXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IG92ZXJTdHJlc3Mg5rua5Yqo5ZCO5piv5ZCm5by66LCD6K+lSXRlbe+8iOi/meWPquaYr+S4quWunumqjOWKn+iDve+8iVxyXG4gICAgICovXHJcbiAgICBzY3JvbGxUbyhsaXN0SWQ6IG51bWJlciwgdGltZUluU2Vjb25kOiBudW1iZXIgPSAuNSwgb2Zmc2V0OiBudW1iZXIgPSBudWxsLCBvdmVyU3RyZXNzOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgdCA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0LmNoZWNrSW5pdGVkKGZhbHNlKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIHQuX3Njcm9sbFZpZXcuc3RvcEF1dG9TY3JvbGwoKTtcclxuICAgICAgICBpZiAodGltZUluU2Vjb25kID09IG51bGwpICAgLy/pu5jorqQwLjVcclxuICAgICAgICAgICAgdGltZUluU2Vjb25kID0gLjU7XHJcbiAgICAgICAgZWxzZSBpZiAodGltZUluU2Vjb25kIDwgMClcclxuICAgICAgICAgICAgdGltZUluU2Vjb25kID0gMDtcclxuICAgICAgICBpZiAobGlzdElkIDwgMClcclxuICAgICAgICAgICAgbGlzdElkID0gMDtcclxuICAgICAgICBlbHNlIGlmIChsaXN0SWQgPj0gdC5fbnVtSXRlbXMpXHJcbiAgICAgICAgICAgIGxpc3RJZCA9IHQuX251bUl0ZW1zIC0gMTtcclxuICAgICAgICAvLyDku6XpmLLorr7nva7kuoZudW1JdGVtc+S5i+WQjmxheW91dOeahOWwuuWvuOi/mOacquabtOaWsFxyXG4gICAgICAgIGlmICghdC5fdmlydHVhbCAmJiB0Ll9sYXlvdXQgJiYgdC5fbGF5b3V0LmVuYWJsZWQpXHJcbiAgICAgICAgICAgIHQuX2xheW91dC51cGRhdGVMYXlvdXQoKTtcclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IHQuZ2V0SXRlbVBvcyhsaXN0SWQpO1xyXG4gICAgICAgIGxldCB0YXJnZXRYOiBudW1iZXIsIHRhcmdldFk6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0Ll9hbGlnbkNhbGNUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTovL+WNleihjEhPUklaT05UQUzvvIhMRUZUX1RPX1JJR0hU77yJ44CB572R5qC8VkVSVElDQUzvvIhMRUZUX1RPX1JJR0hU77yJXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRYID0gcG9zLmxlZnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WCAtPSB0Lm5vZGUud2lkdGggKiBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WCAtPSB0Ll9sZWZ0R2FwO1xyXG4gICAgICAgICAgICAgICAgcG9zID0gY2MudjIodGFyZ2V0WCwgMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iFJJR0hUX1RPX0xFRlTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iFJJR0hUX1RPX0xFRlTvvIlcclxuICAgICAgICAgICAgICAgIHRhcmdldFggPSBwb3MucmlnaHQgLSB0Lm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WCArPSB0Lm5vZGUud2lkdGggKiBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WCArPSB0Ll9yaWdodEdhcDtcclxuICAgICAgICAgICAgICAgIHBvcyA9IGNjLnYyKHRhcmdldFggKyB0LmNvbnRlbnQud2lkdGgsIDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzovL+WNleWIl1ZFUlRJQ0FM77yIVE9QX1RPX0JPVFRPTe+8ieOAgee9keagvEhPUklaT05UQUzvvIhUT1BfVE9fQk9UVE9N77yJXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRZID0gcG9zLnRvcDtcclxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRZICs9IHQubm9kZS5oZWlnaHQgKiBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WSArPSB0Ll90b3BHYXA7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBjYy52MigwLCAtdGFyZ2V0WSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA0Oi8v5Y2V5YiXVkVSVElDQUzvvIhCT1RUT01fVE9fVE9Q77yJ44CB572R5qC8SE9SSVpPTlRBTO+8iEJPVFRPTV9UT19UT1DvvIlcclxuICAgICAgICAgICAgICAgIHRhcmdldFkgPSBwb3MuYm90dG9tICsgdC5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRZIC09IHQubm9kZS5oZWlnaHQgKiBvZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WSAtPSB0Ll9ib3R0b21HYXA7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBjYy52MigwLCAtdGFyZ2V0WSArIHQuY29udGVudC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2aWV3UG9zOiBhbnkgPSB0LmNvbnRlbnQuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB2aWV3UG9zID0gTWF0aC5hYnModC5fc2l6ZVR5cGUgPyB2aWV3UG9zLnkgOiB2aWV3UG9zLngpO1xyXG5cclxuICAgICAgICBsZXQgY29tcGFyZVBvcyA9IHQuX3NpemVUeXBlID8gcG9zLnkgOiBwb3MueDtcclxuICAgICAgICBsZXQgcnVuU2Nyb2xsID0gTWF0aC5hYnMoKHQuX3Njcm9sbFBvcyAhPSBudWxsID8gdC5fc2Nyb2xsUG9zIDogdmlld1BvcykgLSBjb21wYXJlUG9zKSA+IC41O1xyXG4gICAgICAgIC8vIGNjLmxvZyhydW5TY3JvbGwsIHQuX3Njcm9sbFBvcywgdmlld1BvcywgY29tcGFyZVBvcylcclxuXHJcbiAgICAgICAgLy8gdC5fc2Nyb2xsVmlldy5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgIGlmIChydW5TY3JvbGwpIHtcclxuICAgICAgICAgICAgdC5fc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldChwb3MsIHRpbWVJblNlY29uZCk7XHJcbiAgICAgICAgICAgIHQuX3Njcm9sbFRvTGlzdElkID0gbGlzdElkO1xyXG4gICAgICAgICAgICB0Ll9zY3JvbGxUb0VuZFRpbWUgPSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAvIDEwMDApICsgdGltZUluU2Vjb25kO1xyXG4gICAgICAgICAgICAvLyBjYy5sb2cobGlzdElkLCB0LmNvbnRlbnQud2lkdGgsIHQuY29udGVudC5nZXRQb3NpdGlvbigpLCBwb3MpO1xyXG4gICAgICAgICAgICB0Ll9zY3JvbGxUb1NvID0gdC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0Ll9hZGhlcmluZ0JhcnJpZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0LmFkaGVyaW5nID0gdC5fYWRoZXJpbmdCYXJyaWVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0Ll9zY3JvbGxQb3MgPVxyXG4gICAgICAgICAgICAgICAgICAgIHQuX3Njcm9sbFRvTGlzdElkID1cclxuICAgICAgICAgICAgICAgICAgICB0Ll9zY3JvbGxUb0VuZFRpbWUgPVxyXG4gICAgICAgICAgICAgICAgICAgIHQuX3Njcm9sbFRvU28gPVxyXG4gICAgICAgICAgICAgICAgICAgIG51bGw7XHJcbiAgICAgICAgICAgICAgICAvL2NjLmxvZygnMjIyMjIyMjIyMicsIHQuX2FkaGVyaW5nQmFycmllcilcclxuICAgICAgICAgICAgICAgIGlmIChvdmVyU3RyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdC5zY3JvbGxUb0xpc3RJZCA9IGxpc3RJZDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHQuZ2V0SXRlbUJ5TGlzdElkKGxpc3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5zY2FsZVRvKC4xLCAxLjA1KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnNjYWxlVG8oLjEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRpbWVJblNlY29uZCArIC4xKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aW1lSW5TZWNvbmQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdC5fb25TY3JvbGxpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6h566X5b2T5YmN5rua5Yqo56qX5pyA6L+R55qESXRlbVxyXG4gICAgICovXHJcbiAgICBfY2FsY05lYXJlc3RJdGVtKCkge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIHQubmVhcmVzdExpc3RJZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSwgY2VudGVyOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGlmICh0Ll92aXJ0dWFsKVxyXG4gICAgICAgICAgICB0Ll9jYWxjVmlld1BvcygpO1xyXG5cclxuICAgICAgICBsZXQgdlRvcDogbnVtYmVyLCB2UmlnaHQ6IG51bWJlciwgdkJvdHRvbTogbnVtYmVyLCB2TGVmdDogbnVtYmVyO1xyXG4gICAgICAgIHZUb3AgPSB0LnZpZXdUb3A7XHJcbiAgICAgICAgdlJpZ2h0ID0gdC52aWV3UmlnaHQ7XHJcbiAgICAgICAgdkJvdHRvbSA9IHQudmlld0JvdHRvbTtcclxuICAgICAgICB2TGVmdCA9IHQudmlld0xlZnQ7XHJcblxyXG4gICAgICAgIGxldCBicmVha0ZvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdC5jb250ZW50LmNoaWxkcmVuQ291bnQgJiYgIWJyZWFrRm9yOyBuICs9IHQuX2NvbExpbmVOdW0pIHtcclxuICAgICAgICAgICAgZGF0YSA9IHQuX3ZpcnR1YWwgPyB0LmRpc3BsYXlEYXRhW25dIDogdC5fY2FsY0V4aXN0SXRlbVBvcyhuKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNlbnRlciA9IHQuX3NpemVUeXBlID8gKChkYXRhLnRvcCArIGRhdGEuYm90dG9tKSAvIDIpIDogKGNlbnRlciA9IChkYXRhLmxlZnQgKyBkYXRhLnJpZ2h0KSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0Ll9hbGlnbkNhbGNUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iExFRlRfVE9fUklHSFTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iExFRlRfVE9fUklHSFTvvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEucmlnaHQgPj0gdkxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodkxlZnQgPiBjZW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5uZWFyZXN0TGlzdElkICs9IHQuX2NvbExpbmVOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha0ZvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOi8v5Y2V6KGMSE9SSVpPTlRBTO+8iFJJR0hUX1RPX0xFRlTvvInjgIHnvZHmoLxWRVJUSUNBTO+8iFJJR0hUX1RPX0xFRlTvvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVmdCA8PSB2UmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodlJpZ2h0IDwgY2VudGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCArPSB0Ll9jb2xMaW5lTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtGb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzovL+WNleWIl1ZFUlRJQ0FM77yIVE9QX1RPX0JPVFRPTe+8ieOAgee9keagvEhPUklaT05UQUzvvIhUT1BfVE9fQk9UVE9N77yJXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvdHRvbSA8PSB2VG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5lYXJlc3RMaXN0SWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZUb3AgPCBjZW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdC5uZWFyZXN0TGlzdElkICs9IHQuX2NvbExpbmVOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha0ZvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0Oi8v5Y2V5YiXVkVSVElDQUzvvIhCT1RUT01fVE9fVE9Q77yJ44CB572R5qC8SE9SSVpPTlRBTO+8iEJPVFRPTV9UT19UT1DvvIlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudG9wID49IHZCb3R0b20pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodkJvdHRvbSA+IGNlbnRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0Lm5lYXJlc3RMaXN0SWQgKz0gdC5fY29sTGluZU51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrRm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIpOaWreacgOWQjuS4gOS4qkl0ZW3jgILjgILjgILvvIjlk47vvIzov5nkupvliKTmlq3nnJ/lv4Pmgbblv4PvvIzliKTmlq3kuobliY3pnaLnmoTov5jopoHliKTmlq3mnIDlkI7kuIDkuKrjgILjgILjgILkuIDlvIDlp4vlkaLvvIzlsLHlj6rmnInkuIDkuKrluIPlsYDvvIjljZXliJfluIPlsYDvvInvvIzpgqPml7blgJnku6PnoIHmiY3kuInnmb7ooYzvvIzlkI7mnaXlsLHmg7PnnYDlrozlloTllYrvvIzoibkuLui/meWdkeecn+a3se+8jOeOsOWcqOi/meihjOaVsOmDveS4gOWNg+S6lOS6hj0gPXx877yJXHJcbiAgICAgICAgZGF0YSA9IHQuX3ZpcnR1YWwgPyB0LmRpc3BsYXlEYXRhW3QuZGlzcGxheUl0ZW1OdW0gLSAxXSA6IHQuX2NhbGNFeGlzdEl0ZW1Qb3ModC5fbnVtSXRlbXMgLSAxKTtcclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmlkID09IHQuX251bUl0ZW1zIC0gMSkge1xyXG4gICAgICAgICAgICBjZW50ZXIgPSB0Ll9zaXplVHlwZSA/ICgoZGF0YS50b3AgKyBkYXRhLmJvdHRvbSkgLyAyKSA6IChjZW50ZXIgPSAoZGF0YS5sZWZ0ICsgZGF0YS5yaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgc3dpdGNoICh0Ll9hbGlnbkNhbGNUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6Ly/ljZXooYxIT1JJWk9OVEFM77yITEVGVF9UT19SSUdIVO+8ieOAgee9keagvFZFUlRJQ0FM77yITEVGVF9UT19SSUdIVO+8iVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2UmlnaHQgPiBjZW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6Ly/ljZXooYxIT1JJWk9OVEFM77yIUklHSFRfVE9fTEVGVO+8ieOAgee9keagvFZFUlRJQ0FM77yIUklHSFRfVE9fTEVGVO+8iVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2TGVmdCA8IGNlbnRlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdC5uZWFyZXN0TGlzdElkID0gZGF0YS5pZDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzovL+WNleWIl1ZFUlRJQ0FM77yIVE9QX1RPX0JPVFRPTe+8ieOAgee9keagvEhPUklaT05UQUzvvIhUT1BfVE9fQk9UVE9N77yJXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZCb3R0b20gPCBjZW50ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQubmVhcmVzdExpc3RJZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6Ly/ljZXliJdWRVJUSUNBTO+8iEJPVFRPTV9UT19UT1DvvInjgIHnvZHmoLxIT1JJWk9OVEFM77yIQk9UVE9NX1RPX1RPUO+8iVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2VG9wID4gY2VudGVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0Lm5lYXJlc3RMaXN0SWQgPSBkYXRhLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmxvZygndC5uZWFyZXN0TGlzdElkID0nLCB0Lm5lYXJlc3RMaXN0SWQpO1xyXG4gICAgfVxyXG4gICAgLy/kuIrkuIDpobVcclxuICAgIHByZVBhZ2UodGltZUluU2Vjb25kOiBudW1iZXIgPSAuNSkge1xyXG4gICAgICAgIC8vIGNjLmxvZygn8J+RiCcpO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0luaXRlZCgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5za2lwUGFnZSh0aGlzLmN1clBhZ2VOdW0gLSAxLCB0aW1lSW5TZWNvbmQpO1xyXG4gICAgfVxyXG4gICAgLy/kuIvkuIDpobVcclxuICAgIG5leHRQYWdlKHRpbWVJblNlY29uZDogbnVtYmVyID0gLjUpIHtcclxuICAgICAgICAvLyBjYy5sb2coJ/CfkYknKTtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tJbml0ZWQoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2tpcFBhZ2UodGhpcy5jdXJQYWdlTnVtICsgMSwgdGltZUluU2Vjb25kKTtcclxuICAgIH1cclxuICAgIC8v6Lez6L2s5Yiw56ys5Yeg6aG1XHJcbiAgICBza2lwUGFnZShwYWdlTnVtOiBudW1iZXIsIHRpbWVJblNlY29uZDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCF0LmNoZWNrSW5pdGVkKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodC5fc2xpZGVNb2RlICE9IFNsaWRlVHlwZS5QQUdFKVxyXG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3IoJ1RoaXMgZnVuY3Rpb24gaXMgbm90IGFsbG93ZWQgdG8gYmUgY2FsbGVkLCBNdXN0IFNsaWRlTW9kZSA9IFBBR0UhJyk7XHJcbiAgICAgICAgaWYgKHBhZ2VOdW0gPCAwIHx8IHBhZ2VOdW0gPj0gdC5fbnVtSXRlbXMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAodC5jdXJQYWdlTnVtID09IHBhZ2VOdW0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBjYy5sb2cocGFnZU51bSk7XHJcbiAgICAgICAgdC5jdXJQYWdlTnVtID0gcGFnZU51bTtcclxuICAgICAgICBpZiAodC5wYWdlQ2hhbmdlRXZlbnQpIHtcclxuICAgICAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKFt0LnBhZ2VDaGFuZ2VFdmVudF0sIHBhZ2VOdW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0LnNjcm9sbFRvKHBhZ2VOdW0sIHRpbWVJblNlY29uZCk7XHJcbiAgICB9XHJcbiAgICAvL+iuoeeulyBDdXN0b21TaXpl77yI6L+Z5Liq5Ye95pWw6L+Y5piv5L+d55WZ5ZCn77yM5p+Q5Lqb572V6KeB55qE5oOF5Ya155qE56Gu6L+Y5piv6ZyA6KaB5omL5Yqo6K6h566XY3VzdG9tU2l6ZeeahO+8iVxyXG4gICAgY2FsY0N1c3RvbVNpemUobnVtSXRlbXM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB0OiBhbnkgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdC5jaGVja0luaXRlZCgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0Ll9pdGVtVG1wKVxyXG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3IoJ1Vuc2V0IHRlbXBsYXRlIGl0ZW0hJyk7XHJcbiAgICAgICAgaWYgKCF0LnJlbmRlckV2ZW50KVxyXG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3IoJ1Vuc2V0IFJlbmRlci1FdmVudCEnKTtcclxuICAgICAgICB0Ll9jdXN0b21TaXplID0ge307XHJcbiAgICAgICAgbGV0IHRlbXA6IGFueSA9IGNjLmluc3RhbnRpYXRlKHQuX2l0ZW1UbXApO1xyXG4gICAgICAgIHQuY29udGVudC5hZGRDaGlsZCh0ZW1wKTtcclxuICAgICAgICBmb3IgKGxldCBuOiBudW1iZXIgPSAwOyBuIDwgbnVtSXRlbXM7IG4rKykge1xyXG4gICAgICAgICAgICBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyLmVtaXRFdmVudHMoW3QucmVuZGVyRXZlbnRdLCB0ZW1wLCBuKTtcclxuICAgICAgICAgICAgaWYgKHRlbXAuaGVpZ2h0ICE9IHQuX2l0ZW1TaXplLmhlaWdodCB8fCB0ZW1wLndpZHRoICE9IHQuX2l0ZW1TaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICB0Ll9jdXN0b21TaXplW25dID0gdC5fc2l6ZVR5cGUgPyB0ZW1wLmhlaWdodCA6IHRlbXAud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFPYmplY3Qua2V5cyh0Ll9jdXN0b21TaXplKS5sZW5ndGgpXHJcbiAgICAgICAgICAgIHQuX2N1c3RvbVNpemUgPSBudWxsO1xyXG4gICAgICAgIHRlbXAucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgIGlmICh0ZW1wLmRlc3Ryb3kpXHJcbiAgICAgICAgICAgIHRlbXAuZGVzdHJveSgpO1xyXG4gICAgICAgIHJldHVybiB0Ll9jdXN0b21TaXplO1xyXG4gICAgfVxyXG59Il19