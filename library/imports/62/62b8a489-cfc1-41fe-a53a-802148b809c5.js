"use strict";
cc._RF.push(module, '62b8aSJz8FB/qU6gCFIuAnF', 'listview');
// hall/scripts/listview.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListViewDir = exports.ListView = void 0;
var layout_utils_1 = require("./layout_utils");
var ListView = /** @class */ (function () {
    function ListView(params) {
        this._selected_index = -1;
        this.scrollview = params.scrollview;
        this.mask = params.mask;
        this.content = params.content;
        this.item_tpl = params.item_tpl;
        this.item_tpl.active = false;
        this.item_width = this.item_tpl.width;
        this.item_height = this.item_tpl.height;
        this.dir = params.direction || ListViewDir.Vertical;
        this.width = params.width || this.mask.width;
        this.height = params.height || this.mask.height;
        this.gap_x = params.gap_x || 0;
        this.gap_y = params.gap_y || 0;
        this.row = params.row || 1;
        this.col = params.column || 1;
        this.cb_host = params.cb_host;
        this.item_setter = params.item_setter;
        this.recycle_cb = params.recycle_cb;
        this.select_cb = params.select_cb;
        this.select_setter = params.select_setter;
        this.scroll_to_end_cb = params.scroll_to_end_cb;
        this.auto_scrolling = params.auto_scrolling || false;
        this.node_pool = [];
        if (this.dir == ListViewDir.Vertical) {
            var real_width = (this.item_width + this.gap_x) * this.col - this.gap_x;
            if (real_width > this.width) {
                Logger.log("real width > width, resize scrollview to realwidth,", this.width, "->", real_width);
                this.width = real_width;
            }
            this.content.width = this.width;
        }
        else {
            var real_height = (this.item_height + this.gap_y) * this.row - this.gap_y;
            if (real_height > this.height) {
                Logger.log("real height > height, resize scrollview to realheight,", this.height, "->", real_height);
                this.height = real_height;
            }
            this.content.height = this.height;
        }
        this.mask.setContentSize(this.width, this.height);
        // this.mask.addComponent(cc.Mask);
        this.scrollview.node.setContentSize(this.width, this.height);
        this.scrollview.vertical = this.dir == ListViewDir.Vertical;
        this.scrollview.horizontal = this.dir == ListViewDir.Horizontal;
        this.scrollview.inertia = true;
        this.scrollview.node.on("scrolling", this.on_scrolling, this);
        this.scrollview.node.on("scroll-to-bottom", this.on_scroll_to_end, this);
        this.scrollview.node.on("scroll-to-right", this.on_scroll_to_end, this);
        // cc.info("constructor", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    }
    ListView.prototype.on_scroll_to_end = function () {
        if (this.scroll_to_end_cb) {
            this.scroll_to_end_cb.call(this.cb_host);
        }
    };
    ListView.prototype.on_scrolling = function () {
        if (!this.items || !this.items.length) {
            return;
        }
        if (this.dir == ListViewDir.Vertical) {
            var posy = this.content.y;
            // cc.info("onscrolling, content posy=", posy);
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
            while (this.items[start].y - this.item_height > viewport_start) {
                start++;
            }
            while (this.items[stop].y < viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                // cc.info("render_from:", start, stop);
                this.render_items();
            }
        }
        else {
            var posx = this.content.x;
            // cc.info("onscrolling, content posx=", posx);
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
            while (this.items[start].x + this.item_width < viewport_start) {
                start++;
            }
            while (this.items[stop].x > viewport_stop) {
                stop--;
            }
            if (start != this.start_index && stop != this.stop_index) {
                this.start_index = start;
                this.stop_index = stop;
                // cc.info("render_from:", start, stop);
                this.render_items();
            }
        }
    };
    ListView.prototype.select_item = function (index) {
        if (index == this._selected_index) {
            return;
        }
        if (this._selected_index != -1) {
            this.inner_select_item(this._selected_index, false);
        }
        this.inner_select_item(index, true);
    };
    ListView.prototype.inner_select_item = function (index, is_select) {
        var item = this.items[index];
        if (!item) {
            Logger.warn("inner_select_item index is out of range{", 0, this.items.length - 1, "}", index);
            return;
        }
        item.is_select = is_select;
        if (item.node && this.select_setter) {
            this.select_setter.call(this.cb_host, item.node, is_select, index);
        }
        if (is_select) {
            this._selected_index = index;
            if (this.select_cb) {
                this.select_cb.call(this.cb_host, item.data, index);
            }
        }
    };
    ListView.prototype.spawn_node = function (index) {
        var node = this.node_pool.pop();
        if (!node) {
            node = cc.instantiate(this.item_tpl);
            node.active = true;
            var btn = node.getComponent(cc.Button);
            if (btn == null)
                btn = node.addComponent(cc.Button);
            node.on("click", this.onItemClick, this);
            // cc.info("spawn_node", index);
        }
        node.parent = this.content;
        return node;
    };
    ListView.prototype.onItemClick = function (target) {
        var index = Number(target.node.name);
        this.select_item(index);
    };
    ListView.prototype.recycle_item = function (item) {
        if (item.node && cc.isValid(item.node)) {
            if (this.recycle_cb) {
                this.recycle_cb.call(this.cb_host, item.node);
            }
            item.node.removeFromParent();
            this.node_pool.push(item.node);
            item.node = null;
        }
    };
    ListView.prototype.clear_items = function () {
        var _this = this;
        if (this.items) {
            this.items.forEach(function (item) {
                _this.recycle_item(item);
            });
        }
    };
    ListView.prototype.render_items = function () {
        var item;
        for (var i = 0; i < this.start_index; i++) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.items.length - 1; i > this.stop_index; i--) {
            item = this.items[i];
            if (item.node) {
                // cc.info("recycle_item", i);
                this.recycle_item(item);
            }
        }
        for (var i = this.start_index; i <= this.stop_index; i++) {
            item = this.items[i];
            if (!item.node) {
                // cc.info("render_item", i);
                item.node = this.spawn_node(i);
                this.item_setter.call(this.cb_host, item.node, item.data, i);
                if (this.select_setter) {
                    this.select_setter.call(this.cb_host, item.node, item.is_select, i);
                }
            }
            item.node.name = i.toString();
            item.node.setPosition(item.x, item.y);
        }
    };
    ListView.prototype.pack_item = function (data) {
        return { x: 0, y: 0, data: data, node: null, is_select: false };
    };
    ListView.prototype.layout_items = function (start) {
        var _a, _b;
        // cc.info("layout_items, start=", start);
        for (var index = start, stop = this.items.length; index < stop; index++) {
            var item = this.items[index];
            if (this.dir == ListViewDir.Vertical) {
                _a = layout_utils_1.LayoutUtil.vertical_layout(index, this.item_width, this.item_height, this.col, this.gap_x, this.gap_y), item.x = _a[0], item.y = _a[1];
            }
            else {
                _b = layout_utils_1.LayoutUtil.horizontal_layout(index, this.item_width, this.item_height, this.row, this.gap_x, this.gap_y), item.x = _b[0], item.y = _b[1];
            }
        }
    };
    ListView.prototype.resize_content = function () {
        if (this.items.length <= 0) {
            this.content.width = 0;
            this.content.height = 0;
            return;
        }
        var last_item = this.items[this.items.length - 1];
        if (this.dir == ListViewDir.Vertical) {
            this.content.height = Math.max(this.height, this.item_height - last_item.y);
        }
        else {
            this.content.width = Math.max(this.width, last_item.x + this.item_width);
        }
        // cc.info("resize_content", this.mask.width, this.mask.height, this.scrollview.node.width, this.scrollview.node.height, this.content.width, this.content.height);
    };
    ListView.prototype.set_data = function (datas) {
        var _this = this;
        this.clear_items();
        this.items = [];
        this._datas = datas;
        datas.forEach(function (data) {
            var item = _this.pack_item(data);
            _this.items.push(item);
        });
        this.layout_items(0);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.dir == ListViewDir.Vertical) {
            this.content.y = 0;
        }
        else {
            this.content.x = 0;
        }
        if (this.items.length > 0) {
            this.on_scrolling();
        }
    };
    ListView.prototype.insert_data = function (index) {
        var _a, _b;
        var _this = this;
        var datas = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            datas[_i - 1] = arguments[_i];
        }
        if (datas.length == 0) {
            Logger.log("nothing to insert");
            return;
        }
        if (!this.items) {
            this.items = [];
        }
        if (!this._datas) {
            this._datas = [];
        }
        if (index < 0 || index > this.items.length) {
            Logger.warn("invalid index", index);
            return;
        }
        var is_append = index == this.items.length;
        var items = [];
        datas.forEach(function (data) {
            var item = _this.pack_item(data);
            items.push(item);
        });
        (_a = this._datas).splice.apply(_a, __spreadArrays([index, 0], datas));
        (_b = this.items).splice.apply(_b, __spreadArrays([index, 0], items));
        this.layout_items(index);
        this.resize_content();
        this.start_index = -1;
        this.stop_index = -1;
        if (this.auto_scrolling && is_append) {
            this.scroll_to_end();
        }
        this.on_scrolling();
    };
    ListView.prototype.remove_data = function (index, count) {
        var _this = this;
        if (count === void 0) { count = 1; }
        if (!this.items) {
            Logger.log("call set_data before call this method");
            return;
        }
        if (index < 0 || index >= this.items.length) {
            Logger.warn("invalid index", index);
            return;
        }
        if (count < 1) {
            Logger.log("nothing to remove");
            return;
        }
        var old_length = this.items.length;
        var del_items = this.items.splice(index, count);
        this._datas.splice(index, count);
        //回收node
        del_items.forEach(function (item) {
            _this.recycle_item(item);
        });
        //重新排序index后面的
        if (index + count < old_length) {
            this.layout_items(index);
        }
        this.resize_content();
        if (this.items.length > 0) {
            this.start_index = -1;
            this.stop_index = -1;
            this.on_scrolling();
        }
    };
    ListView.prototype.append_data = function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i] = arguments[_i];
        }
        if (!this.items) {
            this.items = [];
        }
        this.insert_data.apply(this, __spreadArrays([this.items.length], datas));
    };
    ListView.prototype.scroll_to = function (index) {
        if (this.dir == ListViewDir.Vertical) {
            var min_y = this.height - this.content.height;
            if (min_y >= 0) {
                Logger.log("no need to scroll");
                return;
            }
            var _a = layout_utils_1.LayoutUtil.vertical_layout(index, this.item_width, this.item_height, this.col, this.gap_x, this.gap_y), _ = _a[0], y = _a[1];
            if (y < min_y) {
                y = min_y;
                Logger.log("content reach bottom");
            }
            if (y > 0) {
                y = 0;
                Logger.log("content reach top");
            }
            this.scrollview.setContentPosition(cc.v2(this.content.x, -y));
            this.on_scrolling();
        }
        else {
            var max_x = this.content.width - this.width;
            if (max_x <= 0) {
                Logger.log("no need to scroll");
                return;
            }
            var _b = layout_utils_1.LayoutUtil.horizontal_layout(index, this.item_width, this.item_height, this.row, this.gap_x, this.gap_y), x = _b[0], _ = _b[1];
            if (x > max_x) {
                x = max_x;
                Logger.log("content reach right");
            }
            if (x < 0) {
                x = 0;
                Logger.log("content reach left");
            }
            this.scrollview.setContentPosition(cc.v2(-x, this.content.position.y));
            this.on_scrolling();
        }
    };
    ListView.prototype.scroll_to_end = function () {
        if (this.dir == ListViewDir.Vertical) {
            this.scrollview.scrollToBottom();
        }
        else {
            this.scrollview.scrollToRight();
        }
    };
    ListView.prototype.refresh_item = function (index, data) {
        if (!this.items) {
            Logger.log("call set_data before call this method");
            return;
        }
        if (index < 0 || index >= this.items.length) {
            Logger.warn("invalid index", index);
            return;
        }
        var item = this.items[index];
        item.data = data;
        this._datas[index] = data;
        if (item.node) {
            if (this.recycle_cb) {
                this.recycle_cb.call(this.cb_host, item.node);
            }
            this.item_setter.call(this.cb_host, item.node, item.data, index);
        }
    };
    ListView.prototype.destroy = function () {
        this.clear_items();
        this.node_pool.forEach(function (node) {
            node.destroy();
        });
        this.node_pool = null;
        this.items = null;
        this._datas = null;
        if (cc.isValid(this.scrollview.node)) {
            this.scrollview.node.off("scrolling", this.on_scrolling, this);
            this.scrollview.node.off("scroll-to-bottom", this.on_scroll_to_end, this);
            this.scrollview.node.off("scroll-to-right", this.on_scroll_to_end, this);
        }
    };
    Object.defineProperty(ListView.prototype, "datas", {
        get: function () {
            return this._datas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "selected_index", {
        get: function () {
            return this._selected_index;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListView.prototype, "selectd_data", {
        get: function () {
            var item = this.items[this._selected_index];
            if (item) {
                return item.data;
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return ListView;
}());
exports.ListView = ListView;
var ListViewDir;
(function (ListViewDir) {
    ListViewDir[ListViewDir["Vertical"] = 1] = "Vertical";
    ListViewDir[ListViewDir["Horizontal"] = 2] = "Horizontal";
})(ListViewDir = exports.ListViewDir || (exports.ListViewDir = {}));

cc._RF.pop();