
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/ScrollViewCarmack.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcU2Nyb2xsVmlld0Nhcm1hY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0JBQW9CO0FBQ3BCLGtGQUFrRjtBQUNsRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFFN0YsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUMsZ0RBQWdEO0FBRWhEO0lBQStDLHFDQUFZO0lBQTNEO1FBQUEscUVBMFNDO1FBeFNHLE9BQU87UUFFUCxnQkFBVSxHQUFhLElBQUksQ0FBQztRQUU1QixRQUFRO1FBRVIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUV6QixPQUFPO1FBRVAscUJBQWUsR0FBRyxDQUFDLENBQUM7UUFFcEIsbURBQW1EO1FBRW5ELGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCOztXQUVHO1FBQ0gsc0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBRXJCLE1BQU07UUFDTixnQkFBVSxHQUFtQixJQUFJLENBQUM7UUFFbEMsT0FBTztRQUNQLGtCQUFZLEdBQVUsR0FBRyxDQUFDO1FBQzFCLFFBQVE7UUFDUixrQkFBWSxHQUFZLENBQUMsQ0FBQztRQUUxQixlQUFlO1FBQ2Ysb0JBQWMsR0FBWSxDQUFDLENBQUMsQ0FBQztRQUU3QixTQUFTO1FBQ1QsaUJBQVcsR0FBZSxFQUFFLENBQUM7UUFFN0IsT0FBTztRQUNQLGNBQVEsR0FBVyxFQUFFLENBQUM7UUFJdEIsZ0JBQWdCO1FBQ2hCLHdCQUFrQixHQUFPLElBQUksQ0FBQztRQUU5Qjs7V0FFRztRQUNILGVBQVMsR0FBRyxJQUFJLENBQUM7O0lBMFByQixDQUFDO0lBeFBH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LFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ2pHO2lCQUFJO2dCQUNELFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztTQUNKO0lBQ0wsQ0FBQztJQW5TRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3lEQUNVO0lBSTVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7c0RBQ087SUFJekI7UUFEQyxRQUFROzhEQUNXO0lBSXBCO1FBREMsUUFBUTt5REFDTztJQWhCQyxpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQTBTckM7SUFBRCx3QkFBQztDQTFTRCxBQTBTQyxDQTFTOEMsRUFBRSxDQUFDLFNBQVMsR0EwUzFEO2tCQTFTb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW55IH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9saWJzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vL+atpOe7hOS7tuS9v+eUqO+8mkdsb2JhbC5VSUhlbHBlci5hZGRTY3JvbGxWaWV3Q2FybWFja0NvbXBcclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsVmlld0Nhcm1hY2sgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8v5a2Q6IqC54K56aKE6K6+XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIGl0ZW1QcmVmYWIgOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvL+WtkOiKgueCueeItuWvueixoVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50IDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy/lrZDoioLngrnpl7TpmpRcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgaXRlbU5vZGVQYWRkaW5nID0gMztcclxuXHJcbiAgICAvL+WtkOiKgueCueWBj+enu+WdkOagh++8mueUseS6juWtkOiKgueCueeahOmUmueCueWvvOiHtOeahOWdkOagh+iuoeeul+WBj+enu+mXrumimCjlrZDoioLngrnplJrngrnlnKjkuK3lv4PlsLHlgY/np7sgMS8yIOWtkOiKgueCuemrmClcclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgaXRlbU9mZnNldCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65a655Zmo6aKd5aSW5bC65a+4XHJcbiAgICAgKi9cclxuICAgIGNvbnRlbnRFeHRyYVNpemUgPSAwO1xyXG5cclxuICAgIC8v5rua5Yqo57uE5Lu2XHJcbiAgICBzY3JvbGxWaWV3IDogY2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcbiAgICBcclxuICAgIC8v5a2Q6IqC54K555qE6auYXHJcbiAgICBpdGVtTm9kZVNpemU6bnVtYmVyID0gMTI3O1xyXG4gICAgLy/lrZDoioLngrnmgLvmlbDph49cclxuICAgIGl0ZW1BbGxDb3VudCA6IG51bWJlciA9IDU7XHJcblxyXG4gICAgLy/lvZPliY3mmL7npLrnmoTnrKzkuIDkuKroioLngrnnmoTntKLlvJVcclxuICAgIGN1cnJTdGFydEluZGV4IDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgLy/miYDmnInlrZDoioLngrnpm4blkIhcclxuICAgIGl0ZW1Ob2RlQXJyIDogY2MuTm9kZVtdID0gW107XHJcblxyXG4gICAgLy/mgLvmlbDmja7pm4blkIhcclxuICAgIGFsbERhdGFzIDogYW55W10gPSBbXTtcclxuXHJcbiAgICAvL+WtkOiKgueCueabtOaWsOWHveaVsFxyXG4gICAgaXRlbV9zZXR0ZXI6KGl0ZW1Ob2RlOmNjLk5vZGUsIGluZGV4Om51bWJlciwgZGF0YTogYW55KT0+dm9pZDtcclxuICAgIC8v5a2Q6IqC54K55pu05paw5Ye95pWw55qEdGhpc+WvueixoVxyXG4gICAgaXRlbV9zZXR0ZXJfY2FsbGVyOmFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKblnoLnm7Tmu5rliqhcclxuICAgICAqL1xyXG4gICAgYlZlcnRpY2FsID0gdHJ1ZTtcclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgaWYodGhpcy5zY3JvbGxWaWV3Lmhvcml6b250YWwpe1xyXG4gICAgICAgICAgICAvL+awtOW5s+a7muWKqFxyXG4gICAgICAgICAgICB0aGlzLmJWZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuc2Nyb2xsVmlldy52ZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIC8v5Z6C55u05rua5YqoXHJcbiAgICAgICAgICAgIHRoaXMuYlZlcnRpY2FsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbU5vZGVTaXplID0gdGhpcy5iVmVydGljYWwgPyB0aGlzLml0ZW1QcmVmYWIuaGVpZ2h0IDogdGhpcy5pdGVtUHJlZmFiLndpZHRoO1xyXG4gICAgICAgIHZhciBzaG93U2l6ZSA9IHRoaXMuYlZlcnRpY2FsID8gdGhpcy5ub2RlLmhlaWdodCA6IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLml0ZW1BbGxDb3VudCA9IE1hdGguY2VpbChzaG93U2l6ZSAvICh0aGlzLml0ZW1Ob2RlU2l6ZSArIHRoaXMuaXRlbU5vZGVQYWRkaW5nKSkgKyAyO1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Ob2RlQXJyID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtQWxsQ291bnQ7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbU5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgICAgICBpdGVtTm9kZS5zZXRQYXJlbnQodGhpcy5jb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTm9kZUFyci5wdXNoKGl0ZW1Ob2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25fc2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLm9uU2l6ZUNoYW5nZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TmlrDmmL7npLpcclxuICAgIHB1YmxpYyB1cGRhdGVWaWV3KGJUb0JvdHRvbTpib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmFsbERhdGFzLmxlbmd0aCAqICh0aGlzLml0ZW1Ob2RlU2l6ZSArIHRoaXMuaXRlbU5vZGVQYWRkaW5nKSArIHRoaXMuY29udGVudEV4dHJhU2l6ZTtcclxuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuYlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgc2l6ZS5oZWlnaHQgPSBjb250ZW50U2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xyXG5cclxuICAgICAgICAgICAgaWYoYlRvQm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyclN0YXJ0SW5kZXggPSB0aGlzLmFsbERhdGFzLmxlbmd0aCAtIHRoaXMuaXRlbUFsbENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5hbGxEYXRhcy5sZW5ndGggPCAodGhpcy5pdGVtQWxsQ291bnQtMikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJTdGFydEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXhPZmZzZXRZID0gdGhpcy5jb250ZW50LmhlaWdodCAtIHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbE9mZnNldCA9IHRoaXMuc2Nyb2xsVmlldy5nZXRTY3JvbGxPZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gc2Nyb2xsT2Zmc2V0LnkgPj0gbWF4T2Zmc2V0WSA/IGNjLnYyKHNjcm9sbE9mZnNldC54LCBtYXhPZmZzZXRZKSA6IHNjcm9sbE9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9PZmZzZXQob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJTdGFydEluZGV4ID0gdGhpcy5vZmZzZXRUb0luZGV4KG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNpemUud2lkdGggPSBjb250ZW50U2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoYlRvQm90dG9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9SaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyU3RhcnRJbmRleCA9IHRoaXMuYWxsRGF0YXMubGVuZ3RoIC0gdGhpcy5pdGVtQWxsQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFsbERhdGFzLmxlbmd0aCA8ICh0aGlzLml0ZW1BbGxDb3VudC0yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb0xlZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJTdGFydEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxPZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuZ2V0U2Nyb2xsT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IHNjcm9sbE9mZnNldC54IDw9IHRoaXMuc2Nyb2xsVmlldy5nZXRNYXhTY3JvbGxPZmZzZXQoKS54ID8gdGhpcy5zY3JvbGxWaWV3LmdldE1heFNjcm9sbE9mZnNldCgpIDogc2Nyb2xsT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb09mZnNldChvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyclN0YXJ0SW5kZXggPSB0aGlzLm9mZnNldFRvSW5kZXgob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlcl9pdGVtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmoLnmja7lgY/np7vorqHnrpfmmL7npLrnmoRJbmRleCAqL1xyXG4gICAgcHJvdGVjdGVkIG9mZnNldFRvSW5kZXgob2Zmc2V0OmNjLlZlYzIpOm51bWJlciB7XHJcbiAgICAgICAgbGV0IHBvczpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBzY3JvbGxTaXplID0gMDtcclxuICAgICAgICBpZih0aGlzLmJWZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHBvcyA9IG9mZnNldC55O1xyXG4gICAgICAgICAgICBzY3JvbGxTaXplID0gdGhpcy5jb250ZW50LmhlaWdodCAtIHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHBvcyA9IC0gb2Zmc2V0Lng7XHJcbiAgICAgICAgICAgIHNjcm9sbFNpemUgPSB0aGlzLmNvbnRlbnQud2lkdGggLSB0aGlzLm5vZGUud2lkdGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBvcyA8IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwb3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwb3MgPiBzY3JvbGxTaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9zID0gc2Nyb2xsU2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpbmRleDpudW1iZXIgPSBNYXRoLmZsb29yKHBvcyAvICh0aGlzLml0ZW1Ob2RlU2l6ZSArIHRoaXMuaXRlbU5vZGVQYWRkaW5nKSkgLSAyO1xyXG4gICAgICAgIGlmKGluZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8v6YeN572uY29udGVudOWkp+Wwj1xyXG4gICAgcHVibGljIFVwRGF0ZVNjcm9sbERhdGEoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5hbGxEYXRhcy5sZW5ndGggKiAodGhpcy5pdGVtTm9kZVNpemUgKyB0aGlzLml0ZW1Ob2RlUGFkZGluZykgKyB0aGlzLmNvbnRlbnRFeHRyYVNpemU7XHJcbiAgICAgICAgbGV0IHNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmJWZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHNpemUuaGVpZ2h0ID0gY29udGVudFNpemU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHNpemUud2lkdGggPSBjb250ZW50U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnNldENvbnRlbnRTaXplKHNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZqQ6JeP5omA5pyJ5a2Q6IqC54K5XHJcbiAgICBwdWJsaWMgY2xlYXJWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5jdXJyU3RhcnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5jaGlsZHJlbi5mb3JFYWNoKGVsZW1lbnQ9PntcclxuICAgICAgICAgICAgZWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a7muWKqOS6i+S7tlxyXG4gICAgcHJpdmF0ZSBvbl9zY3JvbGxpbmcoKXtcclxuICAgICAgICBsZXQgcG9zOm51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIHNjcm9sbFNpemUgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuYlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgcG9zID0gdGhpcy5jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIHNjcm9sbFNpemUgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0IC0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcG9zID0gLXRoaXMuY29udGVudC54O1xyXG4gICAgICAgICAgICBzY3JvbGxTaXplID0gdGhpcy5jb250ZW50LndpZHRoIC0gdGhpcy5ub2RlLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwb3MgPCAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcG9zID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocG9zID4gc2Nyb2xsU2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBvcyA9IHNjcm9sbFNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdGFydDpudW1iZXIgPSBNYXRoLmNlaWwocG9zIC8gKHRoaXMuaXRlbU5vZGVTaXplICsgdGhpcy5pdGVtTm9kZVBhZGRpbmcpKSAtIDE7XHJcbiAgICAgICAgaWYoc3RhcnQgPCAwKXtcclxuICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGFydCA8IHRoaXMuY3VyclN0YXJ0SW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+W+gOS4iiDlvoDlt6ZcclxuICAgICAgICAgICAgdGhpcy5ib3R0b21Ob2RlVG9VcCgpO1xyXG4gICAgICAgIH1lbHNlIGlmKHN0YXJ0ID4gdGhpcy5jdXJyU3RhcnRJbmRleCl7XHJcbiAgICAgICAgICAgIC8v5b6A5LiLIOW+gOWPs1xyXG4gICAgICAgICAgICB0aGlzLlVwTm9kZVRvQm90dG9tKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZNzY3JvbGxWaWV35bC65a+45pS55Y+Y5pe26KaB5L+u5pS5aXRlbeeahOaVsOmHjyzpmLLmraLlh7rnjrDmlbDmja7mmL7npLrkuI3lrozmlbTnrYnpl67popjlh7rnjrAgKi9cclxuICAgIHByaXZhdGUgb25TaXplQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbU5vZGVTaXplID0gdGhpcy5iVmVydGljYWwgPyB0aGlzLml0ZW1QcmVmYWIuaGVpZ2h0IDogdGhpcy5pdGVtUHJlZmFiLndpZHRoO1xyXG4gICAgICAgIGxldCBzaG93U2l6ZSA9IHRoaXMuYlZlcnRpY2FsID8gdGhpcy5ub2RlLmhlaWdodCA6IHRoaXMubm9kZS53aWR0aDtcclxuICAgICAgICBsZXQgaXRlbUFsbENvdW50ID0gTWF0aC5jZWlsKHNob3dTaXplIC8gKHRoaXMuaXRlbU5vZGVTaXplICsgdGhpcy5pdGVtTm9kZVBhZGRpbmcpKSArIDI7XHJcblxyXG4gICAgICAgIGxldCBhZGRDb3VudCA9IGl0ZW1BbGxDb3VudCAtIHRoaXMuaXRlbU5vZGVBcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFkZENvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XHJcbiAgICAgICAgICAgIGl0ZW1Ob2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1Ob2RlQXJyLnB1c2goaXRlbU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhZGRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQWxsQ291bnQgPSBpdGVtQWxsQ291bnQ7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W6lemDqOWtkOiKgueCueaUvue9ruWIsOmhtumDqFxyXG4gICAgcHJpdmF0ZSBib3R0b21Ob2RlVG9VcCgpe1xyXG4gICAgICAgIGxldCBkYXRhSW5kZXggPSB0aGlzLmN1cnJTdGFydEluZGV4IC0gMTtcclxuICAgICAgICBpZihkYXRhSW5kZXggPCAwKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJTdGFydEluZGV4LS07XHJcbiAgICAgICAgbGV0IGJvdHRvbU5vZGUgPSB0aGlzLml0ZW1Ob2RlQXJyLnBvcCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbU5vZGVBcnIudW5zaGlmdChib3R0b21Ob2RlKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcG9zID0gZGF0YUluZGV4ICogKHRoaXMuaXRlbU5vZGVTaXplICsgdGhpcy5pdGVtTm9kZVBhZGRpbmcpO1xyXG4gICAgICAgIGlmKHRoaXMuYlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgYm90dG9tTm9kZS55ID0gLShwb3MgKyB0aGlzLml0ZW1PZmZzZXQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBib3R0b21Ob2RlLnggPSBwb3MgKyB0aGlzLml0ZW1PZmZzZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1fc2V0dGVyLmNhbGwodGhpcy5pdGVtX3NldHRlcl9jYWxsZXIsIGJvdHRvbU5vZGUsIGRhdGFJbmRleCwgdGhpcy5hbGxEYXRhc1tkYXRhSW5kZXhdKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mhtumDqOWtkOiKgueCueaUvue9ruWIsOW6lemDqFxyXG4gICAgcHJpdmF0ZSBVcE5vZGVUb0JvdHRvbSgpe1xyXG4gICAgICAgIGxldCBkYXRhSW5kZXggPSB0aGlzLmN1cnJTdGFydEluZGV4ICsgdGhpcy5pdGVtTm9kZUFyci5sZW5ndGg7XHJcbiAgICAgICAgaWYoZGF0YUluZGV4ID49IHRoaXMuYWxsRGF0YXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cnJTdGFydEluZGV4Kys7XHJcbiAgICAgICAgbGV0IHVwTm9kZSA9IHRoaXMuaXRlbU5vZGVBcnIuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlQXJyLnB1c2godXBOb2RlKTtcclxuXHJcbiAgICAgICAgbGV0IHBvcyA9IGRhdGFJbmRleCAqICh0aGlzLml0ZW1Ob2RlU2l6ZSArIHRoaXMuaXRlbU5vZGVQYWRkaW5nKTtcclxuICAgICAgICBpZih0aGlzLmJWZXJ0aWNhbCl7XHJcbiAgICAgICAgICAgIHVwTm9kZS55ID0gLShwb3MgKyB0aGlzLml0ZW1PZmZzZXQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB1cE5vZGUueCA9IHBvcyArIHRoaXMuaXRlbU9mZnNldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIuY2FsbCh0aGlzLml0ZW1fc2V0dGVyX2NhbGxlciwgdXBOb2RlLCBkYXRhSW5kZXgsIHRoaXMuYWxsRGF0YXNbZGF0YUluZGV4XSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5riy5p+T5a2Q6IqC54K5XHJcbiAgICBwcml2YXRlIHJlbmRlcl9pdGVtcygpe1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbUFsbENvdW50OyBpbmRleCsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW1Ob2RlID0gdGhpcy5pdGVtTm9kZUFycltpbmRleF07XHJcbiAgICAgICAgICAgIGxldCBkYXRhSW5kZXggPSB0aGlzLmN1cnJTdGFydEluZGV4ICsgaW5kZXg7XHJcbiAgICAgICAgICAgIGlmKGRhdGFJbmRleCA8IDApe1xyXG4gICAgICAgICAgICAgICAgaXRlbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBkYXRhSW5kZXggKiAodGhpcy5pdGVtTm9kZVNpemUgKyB0aGlzLml0ZW1Ob2RlUGFkZGluZyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYlZlcnRpY2FsKXtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnkgPSAtKHBvcyArIHRoaXMuaXRlbU9mZnNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnggPSBwb3MgKyB0aGlzLml0ZW1PZmZzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYWxsRGF0YXMubGVuZ3RoID4gZGF0YUluZGV4KXtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS5zZXRQYXJlbnQodGhpcy5jb250ZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIuY2FsbCh0aGlzLml0ZW1fc2V0dGVyX2NhbGxlciwgaXRlbU5vZGUsIGRhdGFJbmRleCwgdGhpcy5hbGxEYXRhc1tkYXRhSW5kZXhdKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG59XHJcbiJdfQ==