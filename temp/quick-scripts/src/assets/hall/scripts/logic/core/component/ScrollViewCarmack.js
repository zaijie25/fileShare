"use strict";
cc._RF.push(module, '34f015q8PlCPqGuRWHH6qWB', 'ScrollViewCarmack');
// hall/scripts/logic/core/component/ScrollViewCarmack.ts

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
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//此组件使用：Global.UIHelper.addScrollViewCarmackComp
var ScrollViewCarmack = /** @class */ (function (_super) {
    __extends(ScrollViewCarmack, _super);
    function ScrollViewCarmack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //子节点预设
        _this.itemPrefab = null;
        //子节点父对象
        _this.content = null;
        //子节点间隔
        _this.itemNodePadding = 3;
        //子节点偏移坐标：由于子节点的锚点导致的坐标计算偏移问题(子节点锚点在中心就偏移 1/2 子节点高)
        _this.itemOffset = 64;
        /**
         * 显示容器额外尺寸
         */
        _this.contentExtraSize = 0;
        //滚动组件
        _this.scrollView = null;
        //子节点的高
        _this.itemNodeSize = 127;
        //子节点总数量
        _this.itemAllCount = 5;
        //当前显示的第一个节点的索引
        _this.currStartIndex = -1;
        //所有子节点集合
        _this.itemNodeArr = [];
        //总数据集合
        _this.allDatas = [];
        //子节点更新函数的this对象
        _this.item_setter_caller = null;
        /**
         * 是否垂直滚动
         */
        _this.bVertical = true;
        return _this;
    }
    ScrollViewCarmack.prototype.init = function () {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        if (this.scrollView.horizontal) {
            //水平滚动
            this.bVertical = false;
        }
        else if (this.scrollView.vertical) {
            //垂直滚动
            this.bVertical = true;
        }
        this.content = this.scrollView.content;
        this.itemNodeSize = this.bVertical ? this.itemPrefab.height : this.itemPrefab.width;
        var showSize = this.bVertical ? this.node.height : this.node.width;
        this.itemAllCount = Math.ceil(showSize / (this.itemNodeSize + this.itemNodePadding)) + 2;
        this.itemNodeArr = [];
        for (var index = 0; index < this.itemAllCount; index++) {
            var itemNode = cc.instantiate(this.itemPrefab);
            itemNode.setParent(this.content);
            this.itemNodeArr.push(itemNode);
        }
        this.node.on("scrolling", this.on_scrolling, this);
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
    };
    //更新显示
    ScrollViewCarmack.prototype.updateView = function (bToBottom) {
        if (bToBottom === void 0) { bToBottom = false; }
        var contentSize = this.allDatas.length * (this.itemNodeSize + this.itemNodePadding) + this.contentExtraSize;
        var size = this.content.getContentSize();
        if (this.bVertical) {
            size.height = contentSize;
            this.content.setContentSize(size);
            if (bToBottom) {
                this.scrollView.scrollToBottom();
                this.currStartIndex = this.allDatas.length - this.itemAllCount;
            }
            else {
                if (this.allDatas.length < (this.itemAllCount - 2)) {
                    this.scrollView.scrollToTop();
                    this.currStartIndex = 0;
                }
                else {
                    var maxOffsetY = this.content.height - this.node.height;
                    var scrollOffset = this.scrollView.getScrollOffset();
                    var offset = scrollOffset.y >= maxOffsetY ? cc.v2(scrollOffset.x, maxOffsetY) : scrollOffset;
                    this.scrollView.scrollToOffset(offset);
                    this.currStartIndex = this.offsetToIndex(offset);
                }
            }
        }
        else {
            size.width = contentSize;
            this.content.setContentSize(size);
            if (bToBottom) {
                this.scrollView.scrollToRight();
                this.currStartIndex = this.allDatas.length - this.itemAllCount;
            }
            else {
                if (this.allDatas.length < (this.itemAllCount - 2)) {
                    this.scrollView.scrollToLeft();
                    this.currStartIndex = 0;
                }
                else {
                    var scrollOffset = this.scrollView.getScrollOffset();
                    var offset = scrollOffset.x <= this.scrollView.getMaxScrollOffset().x ? this.scrollView.getMaxScrollOffset() : scrollOffset;
                    this.scrollView.scrollToOffset(offset);
                    this.currStartIndex = this.offsetToIndex(offset);
                }
            }
        }
        this.render_items();
    };
    /** 根据偏移计算显示的Index */
    ScrollViewCarmack.prototype.offsetToIndex = function (offset) {
        var pos = 0;
        var scrollSize = 0;
        if (this.bVertical) {
            pos = offset.y;
            scrollSize = this.content.height - this.node.height;
        }
        else {
            pos = -offset.x;
            scrollSize = this.content.width - this.node.width;
        }
        if (pos < 0) {
            pos = 0;
        }
        if (pos > scrollSize) {
            pos = scrollSize;
        }
        var index = Math.floor(pos / (this.itemNodeSize + this.itemNodePadding)) - 2;
        if (index < 0) {
            index = 0;
        }
        return index;
    };
    //重置content大小
    ScrollViewCarmack.prototype.UpDateScrollData = function () {
        var contentSize = this.allDatas.length * (this.itemNodeSize + this.itemNodePadding) + this.contentExtraSize;
        var size = this.content.getContentSize();
        if (this.bVertical) {
            size.height = contentSize;
        }
        else {
            size.width = contentSize;
        }
        this.content.setContentSize(size);
    };
    //隐藏所有子节点
    ScrollViewCarmack.prototype.clearView = function () {
        this.currStartIndex = 0;
        this.scrollView.scrollToLeft();
        this.scrollView.scrollToTop();
        this.content.children.forEach(function (element) {
            element.active = false;
        });
    };
    //滚动事件
    ScrollViewCarmack.prototype.on_scrolling = function () {
        var pos = 0;
        var scrollSize = 0;
        if (this.bVertical) {
            pos = this.content.y;
            scrollSize = this.content.height - this.node.height;
        }
        else {
            pos = -this.content.x;
            scrollSize = this.content.width - this.node.width;
        }
        if (pos < 0) {
            pos = 0;
        }
        if (pos > scrollSize) {
            pos = scrollSize;
        }
        var start = Math.ceil(pos / (this.itemNodeSize + this.itemNodePadding)) - 1;
        if (start < 0) {
            start = 0;
        }
        if (start < this.currStartIndex) {
            //往上 往左
            this.bottomNodeToUp();
        }
        else if (start > this.currStartIndex) {
            //往下 往右
            this.UpNodeToBottom();
        }
    };
    /** 当scrollView尺寸改变时要修改item的数量,防止出现数据显示不完整等问题出现 */
    ScrollViewCarmack.prototype.onSizeChange = function () {
        this.itemNodeSize = this.bVertical ? this.itemPrefab.height : this.itemPrefab.width;
        var showSize = this.bVertical ? this.node.height : this.node.width;
        var itemAllCount = Math.ceil(showSize / (this.itemNodeSize + this.itemNodePadding)) + 2;
        var addCount = itemAllCount - this.itemNodeArr.length;
        for (var index = 0; index < addCount; index++) {
            var itemNode = cc.instantiate(this.itemPrefab);
            itemNode.setParent(this.content);
            this.itemNodeArr.push(itemNode);
        }
        if (addCount > 0) {
            this.itemAllCount = itemAllCount;
            this.updateView();
        }
    };
    //底部子节点放置到顶部
    ScrollViewCarmack.prototype.bottomNodeToUp = function () {
        var dataIndex = this.currStartIndex - 1;
        if (dataIndex < 0) {
            return;
        }
        this.currStartIndex--;
        var bottomNode = this.itemNodeArr.pop();
        this.itemNodeArr.unshift(bottomNode);
        var pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
        if (this.bVertical) {
            bottomNode.y = -(pos + this.itemOffset);
        }
        else {
            bottomNode.x = pos + this.itemOffset;
        }
        this.item_setter.call(this.item_setter_caller, bottomNode, dataIndex, this.allDatas[dataIndex]);
    };
    //顶部子节点放置到底部
    ScrollViewCarmack.prototype.UpNodeToBottom = function () {
        var dataIndex = this.currStartIndex + this.itemNodeArr.length;
        if (dataIndex >= this.allDatas.length) {
            return;
        }
        this.currStartIndex++;
        var upNode = this.itemNodeArr.shift();
        this.itemNodeArr.push(upNode);
        var pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
        if (this.bVertical) {
            upNode.y = -(pos + this.itemOffset);
        }
        else {
            upNode.x = pos + this.itemOffset;
        }
        this.item_setter.call(this.item_setter_caller, upNode, dataIndex, this.allDatas[dataIndex]);
    };
    //渲染子节点
    ScrollViewCarmack.prototype.render_items = function () {
        for (var index = 0; index < this.itemAllCount; index++) {
            var itemNode = this.itemNodeArr[index];
            var dataIndex = this.currStartIndex + index;
            if (dataIndex < 0) {
                itemNode.active = false;
                itemNode.setParent(this.node);
                continue;
            }
            var pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
            if (this.bVertical) {
                itemNode.y = -(pos + this.itemOffset);
            }
            else {
                itemNode.x = pos + this.itemOffset;
            }
            if (this.allDatas.length > dataIndex) {
                itemNode.active = true;
                itemNode.setParent(this.content);
                this.item_setter.call(this.item_setter_caller, itemNode, dataIndex, this.allDatas[dataIndex]);
            }
            else {
                itemNode.active = false;
                itemNode.setParent(this.node);
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], ScrollViewCarmack.prototype, "itemPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], ScrollViewCarmack.prototype, "content", void 0);
    __decorate([
        property
    ], ScrollViewCarmack.prototype, "itemNodePadding", void 0);
    __decorate([
        property
    ], ScrollViewCarmack.prototype, "itemOffset", void 0);
    ScrollViewCarmack = __decorate([
        ccclass
    ], ScrollViewCarmack);
    return ScrollViewCarmack;
}(cc.Component));
exports.default = ScrollViewCarmack;

cc._RF.pop();