
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/listview.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbGlzdHZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF5QztBQUV6QztJQThCSSxrQkFBWSxNQUFxQjtRQUZ6QixvQkFBZSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBSWhDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFD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SSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFDbkM7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzVFO0lBQ0wsQ0FBQztJQUVELHNCQUFJLDJCQUFLO2FBQVQ7WUFFSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBYzthQUFsQjtZQUVJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGtDQUFZO2FBQWhCO1lBRUksSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsSUFBRyxJQUFJLEVBQ1A7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFDTCxlQUFDO0FBQUQsQ0F4akJBLEFBd2pCQyxJQUFBO0FBeGpCWSw0QkFBUTtBQTBqQnJCLElBQVksV0FJWDtBQUpELFdBQVksV0FBVztJQUVuQixxREFBWSxDQUFBO0lBQ1oseURBQWMsQ0FBQTtBQUNsQixDQUFDLEVBSlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFJdEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xheW91dFV0aWx9IGZyb20gXCIuL2xheW91dF91dGlsc1wiXHJcblxyXG5leHBvcnQgY2xhc3MgTGlzdFZpZXdcclxue1xyXG4gICAgcHJpdmF0ZSBzY3JvbGx2aWV3OmNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIG1hc2s6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgY29udGVudDpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpdGVtX3RwbDpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBub2RlX3Bvb2w6Y2MuTm9kZVtdO1xyXG5cclxuICAgIHByaXZhdGUgZGlyOm51bWJlcjtcclxuICAgIHByaXZhdGUgd2lkdGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBoZWlnaHQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBnYXBfeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIGdhcF95Om51bWJlcjtcclxuICAgIHByaXZhdGUgcm93Om51bWJlcjtcclxuICAgIHByaXZhdGUgY29sOm51bWJlcjtcclxuICAgIHByaXZhdGUgaXRlbV93aWR0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIGl0ZW1faGVpZ2h0Om51bWJlcjtcclxuICAgIHByaXZhdGUgY2JfaG9zdDphbnk7XHJcbiAgICBwcml2YXRlIGl0ZW1fc2V0dGVyOihpdGVtOmNjLk5vZGUsIGRhdGE6YW55LCBpbmRleDpudW1iZXIpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSByZWN5Y2xlX2NiOihpdGVtOmNjLk5vZGUpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RfY2I6KGRhdGE6YW55LCBpbmRleDpudW1iZXIpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBzZWxlY3Rfc2V0dGVyOihpdGVtOmNjLk5vZGUsIGlzX3NlbGVjdDpib29sZWFuLCBpbmRleDpudW1iZXIpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxfdG9fZW5kX2NiOigpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBhdXRvX3Njcm9sbGluZzpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBpdGVtczpMaXN0SXRlbVtdO1xyXG4gICAgcHJpdmF0ZSBzdGFydF9pbmRleDpudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0b3BfaW5kZXg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZGF0YXM6YW55W107XHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZF9pbmRleDpudW1iZXIgPSAtMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6TGlzdFZpZXdQYXJhbXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3ID0gcGFyYW1zLnNjcm9sbHZpZXc7XHJcbiAgICAgICAgdGhpcy5tYXNrID0gcGFyYW1zLm1hc2s7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gcGFyYW1zLmNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5pdGVtX3RwbCA9IHBhcmFtcy5pdGVtX3RwbDtcclxuICAgICAgICB0aGlzLml0ZW1fdHBsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXRlbV93aWR0aCA9IHRoaXMuaXRlbV90cGwud2lkdGg7XHJcbiAgICAgICAgdGhpcy5pdGVtX2hlaWdodCA9IHRoaXMuaXRlbV90cGwuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZGlyID0gcGFyYW1zLmRpcmVjdGlvbiB8fCBMaXN0Vmlld0Rpci5WZXJ0aWNhbDtcclxuICAgICAgICB0aGlzLndpZHRoID0gcGFyYW1zLndpZHRoIHx8IHRoaXMubWFzay53aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHBhcmFtcy5oZWlnaHQgfHwgdGhpcy5tYXNrLmhlaWdodDtcclxuICAgICAgICB0aGlzLmdhcF94ID0gcGFyYW1zLmdhcF94IHx8IDA7XHJcbiAgICAgICAgdGhpcy5nYXBfeSA9IHBhcmFtcy5nYXBfeSB8fCAwO1xyXG4gICAgICAgIHRoaXMucm93ID0gcGFyYW1zLnJvdyB8fCAxO1xyXG4gICAgICAgIHRoaXMuY29sID0gcGFyYW1zLmNvbHVtbiB8fCAxO1xyXG4gICAgICAgIHRoaXMuY2JfaG9zdCA9IHBhcmFtcy5jYl9ob3N0O1xyXG4gICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIgPSBwYXJhbXMuaXRlbV9zZXR0ZXI7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlX2NiID0gcGFyYW1zLnJlY3ljbGVfY2I7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RfY2IgPSBwYXJhbXMuc2VsZWN0X2NiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0X3NldHRlciA9IHBhcmFtcy5zZWxlY3Rfc2V0dGVyO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsX3RvX2VuZF9jYiA9IHBhcmFtcy5zY3JvbGxfdG9fZW5kX2NiO1xyXG4gICAgICAgIHRoaXMuYXV0b19zY3JvbGxpbmcgPSBwYXJhbXMuYXV0b19zY3JvbGxpbmcgfHwgZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlX3Bvb2wgPSBbXTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kaXIgPT0gTGlzdFZpZXdEaXIuVmVydGljYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmVhbF93aWR0aDpudW1iZXIgPSAodGhpcy5pdGVtX3dpZHRoICsgdGhpcy5nYXBfeCkgKiB0aGlzLmNvbCAtIHRoaXMuZ2FwX3g7XHJcbiAgICAgICAgICAgIGlmKHJlYWxfd2lkdGggPiB0aGlzLndpZHRoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwicmVhbCB3aWR0aCA+IHdpZHRoLCByZXNpemUgc2Nyb2xsdmlldyB0byByZWFsd2lkdGgsXCIsIHRoaXMud2lkdGgsIFwiLT5cIiwgcmVhbF93aWR0aCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gcmVhbF93aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcmVhbF9oZWlnaHQ6bnVtYmVyID0gKHRoaXMuaXRlbV9oZWlnaHQgKyB0aGlzLmdhcF95KSAqIHRoaXMucm93IC0gdGhpcy5nYXBfeTtcclxuICAgICAgICAgICAgaWYocmVhbF9oZWlnaHQgPiB0aGlzLmhlaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcInJlYWwgaGVpZ2h0ID4gaGVpZ2h0LCByZXNpemUgc2Nyb2xsdmlldyB0byByZWFsaGVpZ2h0LFwiLCB0aGlzLmhlaWdodCwgXCItPlwiLCByZWFsX2hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IHJlYWxfaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tYXNrLnNldENvbnRlbnRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICAvLyB0aGlzLm1hc2suYWRkQ29tcG9uZW50KGNjLk1hc2spO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsdmlldy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcudmVydGljYWwgPSB0aGlzLmRpciA9PSBMaXN0Vmlld0Rpci5WZXJ0aWNhbDtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcuaG9yaXpvbnRhbCA9IHRoaXMuZGlyID09IExpc3RWaWV3RGlyLkhvcml6b250YWw7XHJcbiAgICAgICAgdGhpcy5zY3JvbGx2aWV3LmluZXJ0aWEgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsdmlldy5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25fc2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vbl9zY3JvbGxfdG9fZW5kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vbihcInNjcm9sbC10by1yaWdodFwiLCB0aGlzLm9uX3Njcm9sbF90b19lbmQsIHRoaXMpO1xyXG4gICAgICAgIC8vIGNjLmluZm8oXCJjb25zdHJ1Y3RvclwiLCB0aGlzLm1hc2sud2lkdGgsIHRoaXMubWFzay5oZWlnaHQsIHRoaXMuc2Nyb2xsdmlldy5ub2RlLndpZHRoLCB0aGlzLnNjcm9sbHZpZXcubm9kZS5oZWlnaHQsIHRoaXMuY29udGVudC53aWR0aCwgdGhpcy5jb250ZW50LmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9zY3JvbGxfdG9fZW5kKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnNjcm9sbF90b19lbmRfY2IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbF90b19lbmRfY2IuY2FsbCh0aGlzLmNiX2hvc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uX3Njcm9sbGluZygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXRlbXMgfHwgIXRoaXMuaXRlbXMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmRpciA9PSBMaXN0Vmlld0Rpci5WZXJ0aWNhbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBwb3N5Om51bWJlciA9IHRoaXMuY29udGVudC55O1xyXG4gICAgICAgICAgICAvLyBjYy5pbmZvKFwib25zY3JvbGxpbmcsIGNvbnRlbnQgcG9zeT1cIiwgcG9zeSk7XHJcbiAgICAgICAgICAgIGlmKHBvc3kgPCAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3N5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihwb3N5ID4gdGhpcy5jb250ZW50LmhlaWdodCAtIHRoaXMuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3N5ID0gdGhpcy5jb250ZW50LmhlaWdodCAtIHRoaXMuaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdGFydDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgc3RvcDpudW1iZXIgPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydF9zdGFydDpudW1iZXIgPSAtcG9zeTtcclxuICAgICAgICAgICAgbGV0IHZpZXdwb3J0X3N0b3A6bnVtYmVyID0gdmlld3BvcnRfc3RhcnQgLSB0aGlzLmhlaWdodDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5pdGVtc1tzdGFydF0ueSAtIHRoaXMuaXRlbV9oZWlnaHQgPiB2aWV3cG9ydF9zdGFydClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RhcnQrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLml0ZW1zW3N0b3BdLnkgPCB2aWV3cG9ydF9zdG9wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdG9wLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc3RhcnQgIT0gdGhpcy5zdGFydF9pbmRleCAmJiBzdG9wICE9IHRoaXMuc3RvcF9pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydF9pbmRleCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gc3RvcDtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmluZm8oXCJyZW5kZXJfZnJvbTpcIiwgc3RhcnQsIHN0b3ApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJfaXRlbXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgcG9zeDpudW1iZXIgPSB0aGlzLmNvbnRlbnQueDtcclxuICAgICAgICAgICAgLy8gY2MuaW5mbyhcIm9uc2Nyb2xsaW5nLCBjb250ZW50IHBvc3g9XCIsIHBvc3gpO1xyXG4gICAgICAgICAgICBpZihwb3N4ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zeCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocG9zeCA8IHRoaXMud2lkdGggLSB0aGlzLmNvbnRlbnQud2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc3ggPSB0aGlzLndpZHRoIC0gdGhpcy5jb250ZW50LndpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzdGFydDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICBsZXQgc3RvcDpudW1iZXIgPSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydF9zdGFydDpudW1iZXIgPSAtcG9zeDtcclxuICAgICAgICAgICAgbGV0IHZpZXdwb3J0X3N0b3A6bnVtYmVyID0gdmlld3BvcnRfc3RhcnQgKyB0aGlzLndpZHRoO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLml0ZW1zW3N0YXJ0XS54ICsgdGhpcy5pdGVtX3dpZHRoIDwgdmlld3BvcnRfc3RhcnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2hpbGUodGhpcy5pdGVtc1tzdG9wXS54ID4gdmlld3BvcnRfc3RvcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RvcC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0ICE9IHRoaXMuc3RhcnRfaW5kZXggJiYgc3RvcCAhPSB0aGlzLnN0b3BfaW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRfaW5kZXggPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcF9pbmRleCA9IHN0b3A7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5pbmZvKFwicmVuZGVyX2Zyb206XCIsIHN0YXJ0LCBzdG9wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyX2l0ZW1zKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0X2l0ZW0oaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5kZXggPT0gdGhpcy5fc2VsZWN0ZWRfaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkX2luZGV4ICE9IC0xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pbm5lcl9zZWxlY3RfaXRlbSh0aGlzLl9zZWxlY3RlZF9pbmRleCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlubmVyX3NlbGVjdF9pdGVtKGluZGV4LCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlubmVyX3NlbGVjdF9pdGVtKGluZGV4Om51bWJlciwgaXNfc2VsZWN0OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGl0ZW06TGlzdEl0ZW0gPSB0aGlzLml0ZW1zW2luZGV4XTtcclxuICAgICAgICBpZighaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci53YXJuKFwiaW5uZXJfc2VsZWN0X2l0ZW0gaW5kZXggaXMgb3V0IG9mIHJhbmdle1wiLCAwLCB0aGlzLml0ZW1zLmxlbmd0aCAtIDEsIFwifVwiLCBpbmRleCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5pc19zZWxlY3QgPSBpc19zZWxlY3Q7XHJcbiAgICAgICAgaWYoaXRlbS5ub2RlICYmIHRoaXMuc2VsZWN0X3NldHRlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0X3NldHRlci5jYWxsKHRoaXMuY2JfaG9zdCwgaXRlbS5ub2RlLCBpc19zZWxlY3QsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNfc2VsZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRfaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RfY2IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0X2NiLmNhbGwodGhpcy5jYl9ob3N0LCBpdGVtLmRhdGEsIGluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNwYXduX25vZGUoaW5kZXg6bnVtYmVyKTpjYy5Ob2RlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5vZGU6Y2MuTm9kZSA9IHRoaXMubm9kZV9wb29sLnBvcCgpO1xyXG4gICAgICAgIGlmKCFub2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbV90cGwpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBidG46Y2MuQnV0dG9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgaWYoYnRuID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBidG4gPSBub2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICBub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICAgICAgICAgIC8vIGNjLmluZm8oXCJzcGF3bl9ub2RlXCIsIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmNvbnRlbnQ7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1DbGljayh0YXJnZXQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gTnVtYmVyKHRhcmdldC5ub2RlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0X2l0ZW0oaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjeWNsZV9pdGVtKGl0ZW06TGlzdEl0ZW0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXRlbS5ub2RlICYmIGNjLmlzVmFsaWQoaXRlbS5ub2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVjeWNsZV9jYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2NiLmNhbGwodGhpcy5jYl9ob3N0LCBpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZV9wb29sLnB1c2goaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhcl9pdGVtcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2l0ZW0oaXRlbSk7ICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyX2l0ZW1zKClcclxuICAgIHtcclxuICAgICAgICBsZXQgaXRlbTpMaXN0SXRlbTtcclxuICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0gMDsgaSA8IHRoaXMuc3RhcnRfaW5kZXg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xyXG4gICAgICAgICAgICBpZihpdGVtLm5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNjLmluZm8oXCJyZWN5Y2xlX2l0ZW1cIiwgaSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVfaXRlbShpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0gdGhpcy5pdGVtcy5sZW5ndGggLSAxOyBpID4gdGhpcy5zdG9wX2luZGV4OyBpLS0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcclxuICAgICAgICAgICAgaWYoaXRlbS5ub2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5pbmZvKFwicmVjeWNsZV9pdGVtXCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2l0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpOm51bWJlciA9IHRoaXMuc3RhcnRfaW5kZXg7IGkgPD0gdGhpcy5zdG9wX2luZGV4OyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtID0gdGhpcy5pdGVtc1tpXTtcclxuICAgICAgICAgICAgaWYoIWl0ZW0ubm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gY2MuaW5mbyhcInJlbmRlcl9pdGVtXCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlID0gdGhpcy5zcGF3bl9ub2RlKGkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtX3NldHRlci5jYWxsKHRoaXMuY2JfaG9zdCwgaXRlbS5ub2RlLCBpdGVtLmRhdGEsIGkpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3Rfc2V0dGVyKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0X3NldHRlci5jYWxsKHRoaXMuY2JfaG9zdCwgaXRlbS5ub2RlLCBpdGVtLmlzX3NlbGVjdCwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5ub2RlLm5hbWUgPSBpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRQb3NpdGlvbihpdGVtLngsIGl0ZW0ueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFja19pdGVtKGRhdGE6YW55KTpMaXN0SXRlbVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB7eDowLCB5OjAsIGRhdGE6ZGF0YSwgbm9kZTpudWxsLCBpc19zZWxlY3Q6ZmFsc2V9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGF5b3V0X2l0ZW1zKHN0YXJ0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvLyBjYy5pbmZvKFwibGF5b3V0X2l0ZW1zLCBzdGFydD1cIiwgc3RhcnQpO1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXg6bnVtYmVyID0gc3RhcnQsIHN0b3A6bnVtYmVyID0gdGhpcy5pdGVtcy5sZW5ndGg7IGluZGV4IDwgc3RvcDsgaW5kZXgrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOkxpc3RJdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGlyID09IExpc3RWaWV3RGlyLlZlcnRpY2FsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBbaXRlbS54LCBpdGVtLnldID0gTGF5b3V0VXRpbC52ZXJ0aWNhbF9sYXlvdXQoaW5kZXgsIHRoaXMuaXRlbV93aWR0aCwgdGhpcy5pdGVtX2hlaWdodCwgdGhpcy5jb2wsIHRoaXMuZ2FwX3gsIHRoaXMuZ2FwX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgW2l0ZW0ueCwgaXRlbS55XSA9IExheW91dFV0aWwuaG9yaXpvbnRhbF9sYXlvdXQoaW5kZXgsIHRoaXMuaXRlbV93aWR0aCwgdGhpcy5pdGVtX2hlaWdodCwgdGhpcy5yb3csIHRoaXMuZ2FwX3gsIHRoaXMuZ2FwX3kpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzaXplX2NvbnRlbnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaXRlbXMubGVuZ3RoIDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGFzdF9pdGVtOkxpc3RJdGVtID0gdGhpcy5pdGVtc1t0aGlzLml0ZW1zLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGlmKHRoaXMuZGlyID09IExpc3RWaWV3RGlyLlZlcnRpY2FsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IE1hdGgubWF4KHRoaXMuaGVpZ2h0LCB0aGlzLml0ZW1faGVpZ2h0IC0gbGFzdF9pdGVtLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQud2lkdGggPSBNYXRoLm1heCh0aGlzLndpZHRoLCBsYXN0X2l0ZW0ueCArIHRoaXMuaXRlbV93aWR0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNjLmluZm8oXCJyZXNpemVfY29udGVudFwiLCB0aGlzLm1hc2sud2lkdGgsIHRoaXMubWFzay5oZWlnaHQsIHRoaXMuc2Nyb2xsdmlldy5ub2RlLndpZHRoLCB0aGlzLnNjcm9sbHZpZXcubm9kZS5oZWlnaHQsIHRoaXMuY29udGVudC53aWR0aCwgdGhpcy5jb250ZW50LmhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X2RhdGEoZGF0YXM6YW55W10pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jbGVhcl9pdGVtcygpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9kYXRhcyA9IGRhdGFzO1xyXG4gICAgICAgIGRhdGFzLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06TGlzdEl0ZW0gPSB0aGlzLnBhY2tfaXRlbShkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X2l0ZW1zKDApO1xyXG4gICAgICAgIHRoaXMucmVzaXplX2NvbnRlbnQoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0X2luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5zdG9wX2luZGV4ID0gLTE7XHJcbiAgICAgICAgaWYodGhpcy5kaXIgPT0gTGlzdFZpZXdEaXIuVmVydGljYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQueSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pdGVtcy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5vbl9zY3JvbGxpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0X2RhdGEoaW5kZXg6bnVtYmVyLCAuLi5kYXRhczphbnlbXSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhcy5sZW5ndGggPT0gMCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwibm90aGluZyB0byBpbnNlcnRcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuaXRlbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLl9kYXRhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuaXRlbXMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLndhcm4oXCJpbnZhbGlkIGluZGV4XCIsIGluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaXNfYXBwZW5kOmJvb2xlYW4gPSBpbmRleCA9PSB0aGlzLml0ZW1zLmxlbmd0aDtcclxuICAgICAgICBsZXQgaXRlbXM6TGlzdEl0ZW1bXSA9IFtdO1xyXG4gICAgICAgIGRhdGFzLmZvckVhY2goKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06TGlzdEl0ZW0gPSB0aGlzLnBhY2tfaXRlbShkYXRhKTtcclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9kYXRhcy5zcGxpY2UoaW5kZXgsIDAsIC4uLmRhdGFzKTtcclxuICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMCwgLi4uaXRlbXMpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X2l0ZW1zKGluZGV4KTtcclxuICAgICAgICB0aGlzLnJlc2l6ZV9jb250ZW50KCk7XHJcbiAgICAgICAgdGhpcy5zdGFydF9pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc3RvcF9pbmRleCA9IC0xO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuYXV0b19zY3JvbGxpbmcgJiYgaXNfYXBwZW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxfdG9fZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25fc2Nyb2xsaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlX2RhdGEoaW5kZXg6bnVtYmVyLCBjb3VudDpudW1iZXIgPSAxKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLml0ZW1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImNhbGwgc2V0X2RhdGEgYmVmb3JlIGNhbGwgdGhpcyBtZXRob2RcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMuaXRlbXMubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLndhcm4oXCJpbnZhbGlkIGluZGV4XCIsIGluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb3VudCA8IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwibm90aGluZyB0byByZW1vdmVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9sZF9sZW5ndGg6bnVtYmVyID0gdGhpcy5pdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgbGV0IGRlbF9pdGVtczpMaXN0SXRlbVtdID0gdGhpcy5pdGVtcy5zcGxpY2UoaW5kZXgsIGNvdW50KTtcclxuICAgICAgICB0aGlzLl9kYXRhcy5zcGxpY2UoaW5kZXgsIGNvdW50KTtcclxuICAgICAgICAvL+WbnuaUtm5vZGVcclxuICAgICAgICBkZWxfaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlY3ljbGVfaXRlbShpdGVtKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/ph43mlrDmjpLluo9pbmRleOWQjumdoueahFxyXG4gICAgICAgIGlmKGluZGV4ICsgY291bnQgPCBvbGRfbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRfaXRlbXMoaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc2l6ZV9jb250ZW50KCk7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtcy5sZW5ndGggPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydF9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BfaW5kZXggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5vbl9zY3JvbGxpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kX2RhdGEoLi4uZGF0YXM6YW55W10pXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXRlbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5zZXJ0X2RhdGEodGhpcy5pdGVtcy5sZW5ndGgsIC4uLmRhdGFzKTtcclxuICAgIH1cclxuXHJcbiAgICBzY3JvbGxfdG8oaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuZGlyID09IExpc3RWaWV3RGlyLlZlcnRpY2FsKVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29uc3QgbWluX3kgPSB0aGlzLmhlaWdodCAtIHRoaXMuY29udGVudC5oZWlnaHQ7XHJcblx0XHRcdGlmKG1pbl95ID49IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRMb2dnZXIubG9nKFwibm8gbmVlZCB0byBzY3JvbGxcIik7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxldCBbXywgeV0gPSBMYXlvdXRVdGlsLnZlcnRpY2FsX2xheW91dChpbmRleCwgdGhpcy5pdGVtX3dpZHRoLCB0aGlzLml0ZW1faGVpZ2h0LCB0aGlzLmNvbCwgdGhpcy5nYXBfeCwgdGhpcy5nYXBfeSk7XHJcblx0XHRcdGlmKHkgPCBtaW5feSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHkgPSBtaW5feTtcclxuXHRcdFx0XHRMb2dnZXIubG9nKFwiY29udGVudCByZWFjaCBib3R0b21cIik7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYoeSA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHR5ID0gMDtcclxuXHRcdFx0XHRMb2dnZXIubG9nKFwiY29udGVudCByZWFjaCB0b3BcIik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zY3JvbGx2aWV3LnNldENvbnRlbnRQb3NpdGlvbihjYy52Mih0aGlzLmNvbnRlbnQueCwgLXkpKTtcclxuXHRcdFx0dGhpcy5vbl9zY3JvbGxpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuXHRcdFx0Y29uc3QgbWF4X3ggPSB0aGlzLmNvbnRlbnQud2lkdGggLSB0aGlzLndpZHRoO1xyXG5cdFx0XHRpZihtYXhfeCA8PSAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0TG9nZ2VyLmxvZyhcIm5vIG5lZWQgdG8gc2Nyb2xsXCIpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgW3gsIF9dID0gTGF5b3V0VXRpbC5ob3Jpem9udGFsX2xheW91dChpbmRleCwgdGhpcy5pdGVtX3dpZHRoLCB0aGlzLml0ZW1faGVpZ2h0LCB0aGlzLnJvdywgdGhpcy5nYXBfeCwgdGhpcy5nYXBfeSk7XHJcblx0XHRcdGlmKHggPiBtYXhfeClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHggPSBtYXhfeDtcclxuXHRcdFx0XHRMb2dnZXIubG9nKFwiY29udGVudCByZWFjaCByaWdodFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZih4IDwgMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHggPSAwO1xyXG5cdFx0XHRcdExvZ2dlci5sb2coXCJjb250ZW50IHJlYWNoIGxlZnRcIik7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5zY3JvbGx2aWV3LnNldENvbnRlbnRQb3NpdGlvbihjYy52MigteCwgdGhpcy5jb250ZW50LnBvc2l0aW9uLnkpKTtcclxuXHRcdFx0dGhpcy5vbl9zY3JvbGxpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsX3RvX2VuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5kaXIgPT0gTGlzdFZpZXdEaXIuVmVydGljYWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbHZpZXcuc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3LnNjcm9sbFRvUmlnaHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaF9pdGVtKGluZGV4Om51bWJlciwgZGF0YTphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaXRlbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiY2FsbCBzZXRfZGF0YSBiZWZvcmUgY2FsbCB0aGlzIG1ldGhvZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5pdGVtcy5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIud2FybihcImludmFsaWQgaW5kZXhcIiwgaW5kZXgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpdGVtOkxpc3RJdGVtID0gdGhpcy5pdGVtc1tpbmRleF07XHJcbiAgICAgICAgaXRlbS5kYXRhID0gZGF0YTtcclxuICAgICAgICB0aGlzLl9kYXRhc1tpbmRleF0gPSBkYXRhO1xyXG4gICAgICAgIGlmKGl0ZW0ubm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVjeWNsZV9jYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlX2NiLmNhbGwodGhpcy5jYl9ob3N0LCBpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbV9zZXR0ZXIuY2FsbCh0aGlzLmNiX2hvc3QsIGl0ZW0ubm9kZSwgaXRlbS5kYXRhLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2xlYXJfaXRlbXMoKTtcclxuICAgICAgICB0aGlzLm5vZGVfcG9vbC5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZV9wb29sID0gbnVsbDtcclxuICAgICAgICB0aGlzLml0ZW1zID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9kYXRhcyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5zY3JvbGx2aWV3Lm5vZGUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub2ZmKFwic2Nyb2xsaW5nXCIsIHRoaXMub25fc2Nyb2xsaW5nLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGx2aWV3Lm5vZGUub2ZmKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uX3Njcm9sbF90b19lbmQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbHZpZXcubm9kZS5vZmYoXCJzY3JvbGwtdG8tcmlnaHRcIiwgdGhpcy5vbl9zY3JvbGxfdG9fZW5kLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRhdGFzKCk6YW55W11cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdGVkX2luZGV4KCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RkX2RhdGEoKTphbnlcclxuICAgIHtcclxuICAgICAgICBsZXQgaXRlbTpMaXN0SXRlbSA9IHRoaXMuaXRlbXNbdGhpcy5fc2VsZWN0ZWRfaW5kZXhdO1xyXG4gICAgICAgIGlmKGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5kYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gTGlzdFZpZXdEaXIgXHJcbntcclxuICAgIFZlcnRpY2FsID0gMSxcclxuICAgIEhvcml6b250YWwgPSAyLFxyXG59XHJcblxyXG50eXBlIExpc3RWaWV3UGFyYW1zID0ge1xyXG4gICAgc2Nyb2xsdmlldzpjYy5TY3JvbGxWaWV3O1xyXG4gICAgbWFzazpjYy5Ob2RlO1xyXG4gICAgY29udGVudDpjYy5Ob2RlO1xyXG4gICAgaXRlbV90cGw6Y2MuTm9kZTtcclxuICAgIGRpcmVjdGlvbj86TGlzdFZpZXdEaXI7XHJcbiAgICB3aWR0aD86bnVtYmVyO1xyXG4gICAgaGVpZ2h0PzpudW1iZXI7XHJcbiAgICBnYXBfeD86bnVtYmVyO1xyXG4gICAgZ2FwX3k/Om51bWJlcjtcclxuICAgIHJvdz86bnVtYmVyOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+awtOW5s+aWueWQkeaOkueJiOaXtu+8jOWeguebtOaWueWQkeS4iueahOihjOaVsFxyXG4gICAgY29sdW1uPzpudW1iZXI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5Z6C55u05pa55ZCR5o6S54mI5pe277yM5rC05bmz5pa55ZCR5LiK55qE5YiX5pWwXHJcbiAgICBjYl9ob3N0Pzphbnk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lm57osIPlh73mlbBob3N0XHJcbiAgICBpdGVtX3NldHRlcjooaXRlbTpjYy5Ob2RlLCBkYXRhOmFueSwgaW5kZXg6bnVtYmVyKT0+dm9pZDsgICAgICAgICAgICAgICAgICAgLy9pdGVt5pu05pawc2V0dGVyXHJcbiAgICByZWN5Y2xlX2NiPzooaXRlbTpjYy5Ob2RlKT0+dm9pZDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/lm57mlLbml7bnmoTlm57osINcclxuICAgIHNlbGVjdF9jYj86KGRhdGE6YW55LCBpbmRleDpudW1iZXIpPT52b2lkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2l0ZW3pgInkuK3lm57osINcclxuICAgIHNlbGVjdF9zZXR0ZXI/OihpdGVtOmNjLk5vZGUsIGlzX3NlbGVjdDpib29sZWFuLCBpbmRleDpudW1iZXIpPT52b2lkOyAgICAgICAvL2l0ZW3pgInkuK3mlYjmnpxzZXR0ZXJcclxuICAgIHNjcm9sbF90b19lbmRfY2I/OigpPT52b2lkOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+a7muWKqOWIsOWwveWktOeahOWbnuiwg1xyXG4gICAgYXV0b19zY3JvbGxpbmc/OmJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYXBwZW5k5pe26Ieq5Yqo5rua5Yqo5Yiw5bC95aS0XHJcbn1cclxuXHJcbnR5cGUgTGlzdEl0ZW0gPSB7XHJcbiAgICB4Om51bWJlcjtcclxuICAgIHk6bnVtYmVyO1xyXG4gICAgZGF0YTphbnk7XHJcbiAgICBub2RlOmNjLk5vZGU7XHJcbiAgICBpc19zZWxlY3Q6Ym9vbGVhbjtcclxufSJdfQ==