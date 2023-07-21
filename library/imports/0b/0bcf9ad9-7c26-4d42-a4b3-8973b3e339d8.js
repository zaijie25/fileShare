"use strict";
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