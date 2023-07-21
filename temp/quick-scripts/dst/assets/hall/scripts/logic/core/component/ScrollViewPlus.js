
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/ScrollViewPlus.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0bcf9rZfCZNQqSziXOz4znY', 'ScrollViewPlus');
// hall/scripts/logic/core/component/ScrollViewPlus.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScrollViewPlus = /** @class */ (function (_super) {
    __extends(ScrollViewPlus, _super);
    function ScrollViewPlus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.itemsArr = [];
        _this.Vertical = false;
        _this.gap_x = 0; //横向间距
        _this.gap_y = 0;
        //子节点父对象
        _this.content = null;
        //滚动组件
        _this.scrView = null;
        _this.height = 0;
        _this.width = 0;
        //实际拥有items数量
        _this.items = [];
        _this.start_index = -1;
        _this.stop_index = -1;
        //子节点更新函数的this对象
        _this.item_setter_caller = null;
        return _this;
    }
    ScrollViewPlus.prototype.init = function () {
        var _this = this;
        this.scrView = this.scrollView.getComponent(cc.ScrollView);
        this.content = this.scrView.content;
        this.height = this.content.height;
        this.width = this.content.width;
        this.node_pools = new Map();
        //存储item的map
        this.item_templates = new Map();
        this.itemsArr.forEach(function (tpl, index) {
            tpl.data.active = false;
            _this.item_templates.set(index, tpl.data);
        });
        //scrollView监听事件
        this.scrollView.on('scrolling', this.on_scrolling, this);
    };
    //滑动中回调
    ScrollViewPlus.prototype.on_scrolling = function () {
        if (!this.items || !this.items.length) {
            return;
        }
        //垂直滚动
        if (this.Vertical) {
            var posy = this.content.y;
            if (posy < 0) {
                posy = 0;
            }
            if (posy > this.content.height - this.height) {
                posy = this.content.height - this.height;
            }
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = -posy;
            var viewport_stop = viewport_start - this.height;
            while (this.items[start].y - this.items[start].height > viewport_start) {
                start++;
            }
            while (this.items[stop].y < viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                this.render_items();
            }
        }
        else { //水平滚动
            var posx = this.content.x;
            if (posx > 0) {
                posx = 0;
            }
            if (posx < this.width - this.content.width) {
                posx = this.width - this.content.width;
            }
            var start = 0;
            var stop = this.items.length - 1;
            var viewport_start = -posx;
            var viewport_stop = viewport_start + this.width;
            while (this.items[start].x + this.items[start].width < viewport_start) {
                start++;
            }
            while (this.items[stop].x > viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                this.render_items();
            }
        }
    };
    //生成node
    ScrollViewPlus.prototype.spawn_node = function (key) {
        var node;
        var pools = this.node_pools.get(key);
        if (pools && pools.length > 0) {
            node = pools.pop();
        }
        else {
            node = cc.instantiate(this.item_templates.get(key));
            node.active = true;
        }
        node.parent = this.content;
        return node;
    };
    //回收item
    ScrollViewPlus.prototype.recycle_item = function (item) {
        if (item.node && cc.isValid(item.node)) {
            var pools = this.node_pools.get(item.data.key);
            if (!pools) {
                pools = [];
                this.node_pools.set(item.data.key, pools);
            }
            pools.push(item.node);
            // if (this.recycle_cb) {
            //     this.recycle_cb.call(item.node, item.data.key);
            // }
            item.node.removeFromParent();
            item.node = null;
        }
    };
    //清除items
    ScrollViewPlus.prototype.clear_items = function () {
        var _this = this;
        if (this.items) {
            this.items.forEach(function (item) {
                _this.recycle_item(item);
            });
        }
    };
    //渲染items
    ScrollViewPlus.prototype.render_items = function () {
        var item;
        for (var i = 0; i < this.start_index; i++) {
            item = this.items[i];
            if (item.node) {
                this.recycle_item(item);
            }
        }
        for (var i = this.items.length - 1; i > this.stop_index; i--) {
            item = this.items[i];
            if (item.node) {
                this.recycle_item(item);
            }
        }
        for (var i = this.start_index; i <= this.stop_index + 1; i++) {
            if (!this.items[i]) {
                return;
            }
            item = this.items[i];
            if (!item.node) {
                item.node = this.spawn_node(item.data.key);
                this.item_setter.call(this.item_setter_caller, item.node, item.dataIndex, item.data);
            }
            item.node.setPosition(item.x, item.y);
        }
    };
    //赋值item
    ScrollViewPlus.prototype.pack_item = function (index, data) {
        var node = this.spawn_node(data.key);
        var _a = this.item_setter.call(this.item_setter_caller, node, index, data), width = _a[0], height = _a[1];
        var item = {
            x: 0,
            y: 0,
            width: width,
            height: height,
            data: data,
            node: node,
            dataIndex: index
        };
        this.recycle_item(item);
        return item;
    };
    // //item具体赋值
    // item_setter(item, data) {
    //     item.getComponent(cc.Component).itemDataAssignment(data);
    //     return [item.width, item.height];
    // }
    //布局items
    ScrollViewPlus.prototype.layout_items = function (start) {
        if (this.items.length <= 0) {
            return;
        }
        var start_pos = 0;
        if (start > 0) {
            var prev_item = this.items[start - 1];
            if (this.Vertical) {
                start_pos = prev_item.y - prev_item.height - this.gap_y;
            }
            else {
                start_pos = prev_item.x + prev_item.width + this.gap_x;
            }
        }
        for (var index = start, stop = this.items.length; index < stop; index++) {
            var item = this.items[index];
            if (this.Vertical) {
                item.x = 0;
                item.y = start_pos;
                start_pos -= item.height + this.gap_y;
            }
            else {
                item.y = 0;
                item.x = start_pos;
                start_pos += item.width + this.gap_x;
            }
        }
    };
    //调整content
    ScrollViewPlus.prototype.resize_content = function () {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        var last_item = this.items[this.items.length - 1];
        if (this.Vertical) {
            this.content.height = Math.max(this.height, last_item.height - last_item.y);
        }
        else {
            this.content.width = Math.max(this.width, last_item.x + last_item.width);
        }
    };
    //设置数据
    ScrollViewPlus.prototype.set_data = function (datas) {
        var _this = this;
        this.clear_items();
        this.items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            _this.items.push(item);
        });
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.Vertical) {
            this.content.y = 0;
        }
        else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    };
    //插入数据
    ScrollViewPlus.prototype.insert_data = function (index, datas) {
        var _a;
        var _this = this;
        if (datas.length == 0) {
            // console.log("没有要添加的数据");
            return;
        }
        if (!this.items) {
            this.items = [];
        }
        if (index < 0 || index > this.items.length) {
            // console.log("无效的index", index);
            return;
        }
        var items = [];
        datas.forEach(function (data, index) {
            var item = _this.pack_item(index, data);
            items.push(item);
        });
        (_a = this.items).splice.apply(_a, __spreadArrays([index, 0], items));
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        this.on_scrolling();
    };
    //追加数据
    ScrollViewPlus.prototype.append_data = function (datas) {
        if (!this.items) {
            this.items = [];
        }
        this.insert_data(this.items.length, datas);
    };
    //滑动到底
    ScrollViewPlus.prototype.scroll_to_end = function () {
        if (this.Vertical) {
            this.scrView.getComponent(cc.ScrollView).scrollToBottom(2);
        }
        else {
            this.scrView.getComponent(cc.ScrollView).scrollToRight(2);
        }
    };
    //销毁
    ScrollViewPlus.prototype.destroy_items = function () {
        this.clear_items();
        this.node_pools.forEach(function (pools, key) {
            pools.forEach(function (node) {
                node.destroy();
            });
        });
        this.node_pools = null;
        this.items = null;
        if (cc.isValid(this.scrollView)) {
            this.scrollView.off("scrolling", this.on_scrolling, this);
            // this.scrollview.node.off("scroll-to-bottom", this.on_scroll_to_end, this);
            // this.scrollview.node.off("scroll-to-right", this.on_scroll_to_end, this);
        }
    };
    __decorate([
        property(cc.Node)
    ], ScrollViewPlus.prototype, "scrollView", void 0);
    __decorate([
        property([cc.Prefab])
    ], ScrollViewPlus.prototype, "itemsArr", void 0);
    __decorate([
        property
    ], ScrollViewPlus.prototype, "Vertical", void 0);
    __decorate([
        property
    ], ScrollViewPlus.prototype, "gap_x", void 0);
    __decorate([
        property
    ], ScrollViewPlus.prototype, "gap_y", void 0);
    __decorate([
        property(cc.Node)
    ], ScrollViewPlus.prototype, "content", void 0);
    ScrollViewPlus = __decorate([
        ccclass
    ], ScrollViewPlus);
    return ScrollViewPlus;
}(cc.Component));
exports.default = ScrollViewPlus;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcU2Nyb2xsVmlld1BsdXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBbVVDO1FBaFVHLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRzNCLGNBQVEsR0FBZ0IsRUFBRSxDQUFDO1FBRzNCLGNBQVEsR0FBVyxLQUFLLENBQUE7UUFHeEIsV0FBSyxHQUFVLENBQUMsQ0FBQyxDQUFBLE1BQU07UUFHdkIsV0FBSyxHQUFVLENBQUMsQ0FBQztRQUVqQixRQUFRO1FBRVIsYUFBTyxHQUFhLElBQUksQ0FBQztRQUV6QixNQUFNO1FBQ04sYUFBTyxHQUFtQixJQUFJLENBQUM7UUFFdkIsWUFBTSxHQUFZLENBQUMsQ0FBQTtRQUVuQixXQUFLLEdBQVksQ0FBQyxDQUFBO1FBSzFCLGFBQWE7UUFDYixXQUFLLEdBQUcsRUFBRSxDQUFBO1FBRVYsaUJBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUVoQixnQkFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBSWYsZ0JBQWdCO1FBQ2hCLHdCQUFrQixHQUFPLElBQUksQ0FBQzs7SUEwUmxDLENBQUM7SUFyUkcsNkJBQUksR0FBSjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFD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O3NEQUNTO0lBRzNCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29EQUNLO0lBRzNCO1FBREMsUUFBUTtvREFDZTtJQUd4QjtRQURDLFFBQVE7aURBQ1E7SUFHakI7UUFEQyxRQUFRO2lEQUNRO0lBSWpCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7bURBQ087SUFuQlIsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQW1VbEM7SUFBRCxxQkFBQztDQW5VRCxBQW1VQyxDQW5VMkMsRUFBRSxDQUFDLFNBQVMsR0FtVXZEO2tCQW5Vb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxWaWV3UGx1cyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBzY3JvbGxWaWV3OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlByZWZhYl0pXHJcbiAgICBpdGVtc0FyciA6Y2MuUHJlZmFiW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHlcclxuICAgIFZlcnRpY2FsOmJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2FwX3g6bnVtYmVyID0gMDsvL+aoquWQkemXtOi3nVxyXG5cclxuICAgIEBwcm9wZXJ0eVxyXG4gICAgZ2FwX3k6bnVtYmVyID0gMDtcclxuXHJcbiAgICAvL+WtkOiKgueCueeItuWvueixoVxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBjb250ZW50IDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy/mu5rliqjnu4Tku7ZcclxuICAgIHNjclZpZXcgOiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGhlaWdodCAgOm51bWJlciA9IDBcclxuXHJcbiAgICBwcml2YXRlIHdpZHRoICA6bnVtYmVyID0gMFxyXG4gICAgLy9ub2Rl57yT5a2Y5rGgXHJcbiAgICBub2RlX3Bvb2xzOmFueVxyXG4gICAgLy/pooTorr7np43nsbvmsaBcclxuICAgIGl0ZW1fdGVtcGxhdGVzOmFueVxyXG4gICAgLy/lrp7pmYXmi6XmnIlpdGVtc+aVsOmHj1xyXG4gICAgaXRlbXMgPSBbXVxyXG5cclxuICAgIHN0YXJ0X2luZGV4ID0gLTFcclxuXHJcbiAgICBzdG9wX2luZGV4ID0gLTFcclxuXHJcbiAgICAvL+WtkOiKgueCueabtOaWsOWHveaVsFxyXG4gICAgaXRlbV9zZXR0ZXI6KGl0ZW1Ob2RlOmNjLk5vZGUsIGluZGV4Om51bWJlciwgZGF0YTogYW55KT0+W2FueV07XHJcbiAgICAvL+WtkOiKgueCueabtOaWsOWHveaVsOeahHRoaXPlr7nosaFcclxuICAgIGl0ZW1fc2V0dGVyX2NhbGxlcjphbnkgPSBudWxsO1xyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2NyVmlldyA9IHRoaXMuc2Nyb2xsVmlldy5nZXRDb21wb25lbnQoY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5zY3JWaWV3LmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvbnRlbnQud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Bvb2xzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIC8v5a2Y5YKoaXRlbeeahG1hcFxyXG4gICAgICAgIHRoaXMuaXRlbV90ZW1wbGF0ZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5pdGVtc0Fyci5mb3JFYWNoKCh0cGwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRwbC5kYXRhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1fdGVtcGxhdGVzLnNldChpbmRleCwgdHBsLmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vc2Nyb2xsVmlld+ebkeWQrOS6i+S7tlxyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlldy5vbignc2Nyb2xsaW5nJywgdGhpcy5vbl9zY3JvbGxpbmcsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+a7keWKqOS4reWbnuiwg1xyXG4gICAgb25fc2Nyb2xsaW5nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pdGVtcyB8fCAhdGhpcy5pdGVtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WeguebtOa7muWKqFxyXG4gICAgICAgIGlmICh0aGlzLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3N5ID0gdGhpcy5jb250ZW50Lnk7XHJcbiAgICAgICAgICAgIGlmIChwb3N5IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcG9zeSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvc3kgPiB0aGlzLmNvbnRlbnQuaGVpZ2h0IC0gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHBvc3kgPSB0aGlzLmNvbnRlbnQuaGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgbGV0IHN0b3AgPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydF9zdGFydCA9IC1wb3N5O1xyXG4gICAgICAgICAgICBsZXQgdmlld3BvcnRfc3RvcCA9IHZpZXdwb3J0X3N0YXJ0IC0gdGhpcy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLml0ZW1zW3N0YXJ0XS55IC0gdGhpcy5pdGVtc1tzdGFydF0uaGVpZ2h0ID4gdmlld3BvcnRfc3RhcnQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuaXRlbXNbc3RvcF0ueSA8IHZpZXdwb3J0X3N0b3ApIHtcclxuICAgICAgICAgICAgICAgIHN0b3AtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhcnQgIT0gdGhpcy5zdGFydF9pbmRleCAmJiBzdG9wICE9IHRoaXMuc3RvcF9pbmRleCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF9pbmRleCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gc3RvcDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyX2l0ZW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgeyAvL+awtOW5s+a7muWKqFxyXG4gICAgICAgICAgICBsZXQgcG9zeCA9IHRoaXMuY29udGVudC54O1xyXG4gICAgICAgICAgICBpZiAocG9zeCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBvc3ggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb3N4IDwgdGhpcy53aWR0aCAtIHRoaXMuY29udGVudC53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgcG9zeCA9IHRoaXMud2lkdGggLSB0aGlzLmNvbnRlbnQud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgbGV0IHN0b3AgPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydF9zdGFydCA9IC1wb3N4O1xyXG4gICAgICAgICAgICBsZXQgdmlld3BvcnRfc3RvcCA9IHZpZXdwb3J0X3N0YXJ0ICsgdGhpcy53aWR0aDtcclxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuaXRlbXNbc3RhcnRdLnggKyB0aGlzLml0ZW1zW3N0YXJ0XS53aWR0aCA8IHZpZXdwb3J0X3N0YXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLml0ZW1zW3N0b3BdLnggPiB2aWV3cG9ydF9zdG9wKSB7XHJcbiAgICAgICAgICAgICAgICBzdG9wLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXJ0ICE9IHRoaXMuc3RhcnRfaW5kZXggJiYgc3RvcCAhPSB0aGlzLnN0b3BfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfaW5kZXggPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF9pbmRleCA9IHN0b3A7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcl9pdGVtcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAgLy/nlJ/miJBub2RlXHJcbiAgICAgc3Bhd25fbm9kZShrZXkpIHtcclxuICAgICAgICBsZXQgbm9kZTtcclxuICAgICAgICBsZXQgcG9vbHMgPSB0aGlzLm5vZGVfcG9vbHMuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYgKHBvb2xzICYmIHBvb2xzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbm9kZSA9IHBvb2xzLnBvcCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1fdGVtcGxhdGVzLmdldChrZXkpKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMuY29udGVudDtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIC8v5Zue5pS2aXRlbVxyXG4gICAgcmVjeWNsZV9pdGVtKGl0ZW0pIHtcclxuICAgICAgICBpZiAoaXRlbS5ub2RlICYmIGNjLmlzVmFsaWQoaXRlbS5ub2RlKSkge1xyXG4gICAgICAgICAgICBsZXQgcG9vbHMgPSB0aGlzLm5vZGVfcG9vbHMuZ2V0KGl0ZW0uZGF0YS5rZXkpO1xyXG4gICAgICAgICAgICBpZiAoIXBvb2xzKSB7XHJcbiAgICAgICAgICAgICAgICBwb29scyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlX3Bvb2xzLnNldChpdGVtLmRhdGEua2V5LCBwb29scyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9vbHMucHVzaChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5yZWN5Y2xlX2NiKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJlY3ljbGVfY2IuY2FsbChpdGVtLm5vZGUsIGl0ZW0uZGF0YS5rZXkpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/muIXpmaRpdGVtc1xyXG4gICAgY2xlYXJfaXRlbXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVfaXRlbShpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/muLLmn5NpdGVtc1xyXG4gICAgcmVuZGVyX2l0ZW1zKCkge1xyXG4gICAgICAgIGxldCBpdGVtO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFydF9pbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVfaXRlbShpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxOyBpID4gdGhpcy5zdG9wX2luZGV4OyBpLS0pIHtcclxuICAgICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZV9pdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0X2luZGV4OyBpIDw9IHRoaXMuc3RvcF9pbmRleCArIDE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXRlbXNbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZSA9IHRoaXMuc3Bhd25fbm9kZShpdGVtLmRhdGEua2V5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIuY2FsbCh0aGlzLml0ZW1fc2V0dGVyX2NhbGxlcixpdGVtLm5vZGUsaXRlbS5kYXRhSW5kZXgsaXRlbS5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24oaXRlbS54LCBpdGVtLnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6LWL5YC8aXRlbVxyXG4gICAgcGFja19pdGVtKGluZGV4LCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnNwYXduX25vZGUoZGF0YS5rZXkpO1xyXG4gICAgICAgIGxldCBbd2lkdGgsIGhlaWdodF0gPSB0aGlzLml0ZW1fc2V0dGVyLmNhbGwodGhpcy5pdGVtX3NldHRlcl9jYWxsZXIsbm9kZSxpbmRleCwgZGF0YSk7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSB7XHJcbiAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIG5vZGU6IG5vZGUsXHJcbiAgICAgICAgICAgIGRhdGFJbmRleDppbmRleFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlX2l0ZW0oaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICAvLyAvL2l0ZW3lhbfkvZPotYvlgLxcclxuICAgIC8vIGl0ZW1fc2V0dGVyKGl0ZW0sIGRhdGEpIHtcclxuICAgIC8vICAgICBpdGVtLmdldENvbXBvbmVudChjYy5Db21wb25lbnQpLml0ZW1EYXRhQXNzaWdubWVudChkYXRhKTtcclxuICAgIC8vICAgICByZXR1cm4gW2l0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0XTtcclxuICAgIC8vIH1cclxuICAgIC8v5biD5bGAaXRlbXNcclxuICAgIGxheW91dF9pdGVtcyhzdGFydCkge1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXJ0X3BvcyA9IDA7XHJcbiAgICAgICAgaWYgKHN0YXJ0ID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgcHJldl9pdGVtID0gdGhpcy5pdGVtc1tzdGFydCAtIDFdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgc3RhcnRfcG9zID0gcHJldl9pdGVtLnkgLSBwcmV2X2l0ZW0uaGVpZ2h0IC0gdGhpcy5nYXBfeTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0X3BvcyA9IHByZXZfaXRlbS54ICsgcHJldl9pdGVtLndpZHRoICsgdGhpcy5nYXBfeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IHN0YXJ0LCBzdG9wID0gdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4IDwgc3RvcDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5WZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS54ID0gMDtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IHN0YXJ0X3BvcztcclxuICAgICAgICAgICAgICAgIHN0YXJ0X3BvcyAtPSBpdGVtLmhlaWdodCArIHRoaXMuZ2FwX3k7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgaXRlbS54ID0gc3RhcnRfcG9zO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRfcG9zICs9IGl0ZW0ud2lkdGggKyB0aGlzLmdhcF94O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/osIPmlbRjb250ZW50XHJcbiAgICByZXNpemVfY29udGVudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdF9pdGVtID0gdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmICh0aGlzLlZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSBNYXRoLm1heCh0aGlzLmhlaWdodCwgbGFzdF9pdGVtLmhlaWdodCAtIGxhc3RfaXRlbS55KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSBNYXRoLm1heCh0aGlzLndpZHRoLCBsYXN0X2l0ZW0ueCArIGxhc3RfaXRlbS53aWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/orr7nva7mlbDmja5cclxuICAgIHNldF9kYXRhKGRhdGFzKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcl9pdGVtcygpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICBkYXRhcy5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucGFja19pdGVtKGluZGV4LCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X2l0ZW1zKDApO1xyXG4gICAgICAgIHRoaXMucmVzaXplX2NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuVmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LnkgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uX3Njcm9sbGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5o+S5YWl5pWw5o2uXHJcbiAgICBpbnNlcnRfZGF0YShpbmRleCwgZGF0YXMpIHtcclxuICAgICAgICBpZiAoZGF0YXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmsqHmnInopoHmt7vliqDnmoTmlbDmja5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuaXRlbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLml6DmlYjnmoRpbmRleFwiLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XHJcbiAgICAgICAgZGF0YXMuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnBhY2tfaXRlbShpbmRleCwgZGF0YSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIC4uLml0ZW1zKTtcclxuICAgICAgICB0aGlzLmxheW91dF9pdGVtcyhpbmRleCk7XHJcbiAgICAgICAgdGhpcy5yZXNpemVfY29udGVudCgpO1xyXG4gICAgICAgIHRoaXMuc3RhcnRfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLnN0b3BfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLm9uX3Njcm9sbGluZygpO1xyXG4gICAgfVxyXG4gICAgLy/ov73liqDmlbDmja5cclxuICAgIGFwcGVuZF9kYXRhKGRhdGFzKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnNlcnRfZGF0YSh0aGlzLml0ZW1zLmxlbmd0aCwgZGF0YXMpO1xyXG4gICAgfVxyXG4gICAgLy/mu5HliqjliLDlupVcclxuICAgIHNjcm9sbF90b19lbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuVmVydGljYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JWaWV3LmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KS5zY3JvbGxUb0JvdHRvbSgyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNjclZpZXcuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvUmlnaHQoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/plIDmr4FcclxuICAgIGRlc3Ryb3lfaXRlbXMoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcl9pdGVtcygpO1xyXG4gICAgICAgIHRoaXMubm9kZV9wb29scy5mb3JFYWNoKChwb29scywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHBvb2xzLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm5vZGVfcG9vbHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBudWxsO1xyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuc2Nyb2xsVmlldykpIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxWaWV3Lm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uX3Njcm9sbGluZywgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2Nyb2xsdmlldy5ub2RlLm9mZihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vbl9zY3JvbGxfdG9fZW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zY3JvbGx2aWV3Lm5vZGUub2ZmKFwic2Nyb2xsLXRvLXJpZ2h0XCIsIHRoaXMub25fc2Nyb2xsX3RvX2VuZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==