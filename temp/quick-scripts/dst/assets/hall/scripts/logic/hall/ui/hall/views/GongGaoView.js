
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/GongGaoView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd25fdqCDexK6a4PvaCELdZN', 'GongGaoView');
// hall/scripts/logic/hall/ui/hall/views/GongGaoView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var GongGaoViewItem_1 = require("./GongGaoViewItem");
var GongGaoView = /** @class */ (function (_super) {
    __extends(GongGaoView, _super);
    function GongGaoView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.itemList = new Array();
        _this.itemPool = new Array();
        _this.gongGaoCfg = [];
        //自动滚动间隔
        _this.scrollDelayTime = 3;
        //切页用时
        _this.scrollTime = 1;
        _this.gongGaoCount = 5;
        return _this;
    }
    // private getItem(){
    //     var item = null;
    //     if(this.itemPool.length > 0){
    //         item = this.itemPool.pop();
    //         item.node.active = true;
    //     }else{
    //         var itemObj = cc.instantiate(this.itemPrefab);
    //     }
    //     item.node.active = true;
    //     return item;
    // }
    GongGaoView.prototype.clearRecord = function () {
        //自动播放开关
        this.pageView.isAutoScroll = false;
        this.pageView.removeAllPages();
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            item.node.setParent(this.tempNode);
            // item.reset();
            item.node.active = false;
            this.itemPool.push(item);
        }
        this.itemList = [];
    };
    GongGaoView.prototype.initView = function () {
        this.pageView = this.node.getComponent("LoopPageView");
        this.tempNode = this.getChild("maskNode/view");
        this.itemPrefab = this.getChild("maskNode/view/gonggaoItem");
        this.initData();
        this.itemList = [];
        for (var i = 0; i < this.gongGaoCount; i++) {
            var node = this.getChild("maskNode/view/content/gonggaoItem" + i);
            var item = new GongGaoViewItem_1.default();
            item.setNode(node);
            item.setData(this.gongGaoCfg[i]);
            if (cc.sys.platform != cc.sys.IPHONE && i == 2) {
                item.node.removeFromParent();
                item.node.destroy();
            }
            else {
                // 0 //关闭财富秘籍
                // 4 //关闭返利5%
                if (i == 0 || i == 4) {
                    item.node.removeFromParent();
                    item.node.destroy();
                }
                else {
                    this.itemList.push(item);
                }
            }
        }
    };
    GongGaoView.prototype.initData = function () {
        this.gongGaoCfg = [];
        this.gongGaoCfg.push({ type: 1, subtype: 1 });
        this.gongGaoCfg.push({ type: 1, subtype: 2 });
        if (cc.sys.platform == cc.sys.IPHONE)
            this.gongGaoCfg.push({ type: 1, subtype: 3 });
        else
            this.gongGaoCfg.push(null);
        this.gongGaoCfg.push({ type: 2 });
        this.gongGaoCfg.push({ type: 1, subtype: 4 });
    };
    GongGaoView.prototype.onSubViewShow = function () {
        //自动切页滚动间隔
        this.pageView.autoScrollDelayTime = this.scrollDelayTime;
        //切页用时
        this.pageView.autoScrollTime = this.scrollTime;
        this.pageView.scrollToPage(0, 0);
        //
        this.updateView();
        this.updateQrCodeItem();
        //自动播放开关
        this.pageView.isAutoScroll = true;
    };
    GongGaoView.prototype.onDispose = function () {
        // this.clearRecord();
    };
    //刷新二维码
    GongGaoView.prototype.updateQrCodeItem = function () {
        if (this.itemList) {
            for (var i = 0; i < this.itemList.length; i++) {
                var item = this.itemList[i];
                var itemData = item.getData();
                if (itemData && itemData.type == 2) {
                    item.setData(itemData);
                    break;
                }
            }
        }
    };
    GongGaoView.prototype.updateView = function () {
        return;
        // this.clearRecord();
        // var datas = [1,2,3];
        // for (let index = 0; index < datas.length; index++) {
        //     const data = datas[index];
        //     var item = this.getItem();
        //     item.setData(data);
        //     this.pageView.addPage(item.node);
        // }
        // if(datas.length > 0){
        //     //自动播放开关
        //     this.pageView.isAutoScroll = true;
        // }
    };
    return GongGaoView;
}(ViewBase_1.default));
exports.default = GongGaoView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcR29uZ0dhb1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseURBQW9EO0FBQ3BELHFEQUFnRDtBQUVoRDtJQUF5QywrQkFBUTtJQUFqRDtRQUFBLHFFQTZJQztRQXpJVyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUMzQixjQUFRLEdBQTJCLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0MsY0FBUSxHQUEyQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBRy9DLGdCQUFVLEdBQVEsRUFBRSxDQUFBO1FBRTVCLFFBQVE7UUFDQSxxQkFBZSxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNO1FBQ0UsZ0JBQVUsR0FBRyxDQUFDLENBQUM7UUFFZixrQkFBWSxHQUFHLENBQUMsQ0FBQzs7SUE2SDdCLENBQUM7SUEzSEcscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2QixvQ0FBb0M7SUFDcEMsc0NBQXNDO0lBQ3RDLG1DQUFtQztJQUNuQyxhQUFhO0lBQ2IseURBQXlEO0lBQ3pELFFBQVE7SUFDUiwrQkFBK0I7SUFDL0IsbUJBQW1CO0lBQ25CLElBQUk7SUFFSSxpQ0FBVyxHQUFuQjtRQUNJLFFBQVE7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMvQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdkQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFD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UUFDSix3QkFBd0I7UUFDeEIsZUFBZTtRQUNmLHlDQUF5QztRQUN6QyxJQUFJO0lBQ1IsQ0FBQztJQU1MLGtCQUFDO0FBQUQsQ0E3SUEsQUE2SUMsQ0E3SXdDLGtCQUFRLEdBNkloRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEdvbmdHYW9WaWV3SXRlbSBmcm9tIFwiLi9Hb25nR2FvVmlld0l0ZW1cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvbmdHYW9WaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgdGVtcE5vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSBpdGVtUHJlZmFiOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXRlbUxpc3Q6IEFycmF5PEdvbmdHYW9WaWV3SXRlbT4gPSBuZXcgQXJyYXkoKTtcclxuICAgIHByaXZhdGUgaXRlbVBvb2w6IEFycmF5PEdvbmdHYW9WaWV3SXRlbT4gPSBuZXcgQXJyYXkoKTtcclxuICAgIHByaXZhdGUgcGFnZVZpZXc6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGdvbmdHYW9DZmc6IGFueSA9IFtdXHJcblxyXG4gICAgLy/oh6rliqjmu5rliqjpl7TpmpRcclxuICAgIHByaXZhdGUgc2Nyb2xsRGVsYXlUaW1lID0gMztcclxuICAgIC8v5YiH6aG155So5pe2XHJcbiAgICBwcml2YXRlIHNjcm9sbFRpbWUgPSAxO1xyXG5cclxuICAgIHByaXZhdGUgZ29uZ0dhb0NvdW50ID0gNTtcclxuXHJcbiAgICAvLyBwcml2YXRlIGdldEl0ZW0oKXtcclxuICAgIC8vICAgICB2YXIgaXRlbSA9IG51bGw7XHJcbiAgICAvLyAgICAgaWYodGhpcy5pdGVtUG9vbC5sZW5ndGggPiAwKXtcclxuICAgIC8vICAgICAgICAgaXRlbSA9IHRoaXMuaXRlbVBvb2wucG9wKCk7XHJcbiAgICAvLyAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgIH1lbHNle1xyXG4gICAgLy8gICAgICAgICB2YXIgaXRlbU9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgIHJldHVybiBpdGVtO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJSZWNvcmQoKSB7XHJcbiAgICAgICAgLy/oh6rliqjmkq3mlL7lvIDlhbNcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LmlzQXV0b1Njcm9sbCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LnJlbW92ZUFsbFBhZ2VzKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLnRlbXBOb2RlKTtcclxuICAgICAgICAgICAgLy8gaXRlbS5yZXNldCgpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcIkxvb3BQYWdlVmlld1wiKTtcclxuICAgICAgICB0aGlzLnRlbXBOb2RlID0gdGhpcy5nZXRDaGlsZChcIm1hc2tOb2RlL3ZpZXdcIik7XHJcbiAgICAgICAgdGhpcy5pdGVtUHJlZmFiID0gdGhpcy5nZXRDaGlsZChcIm1hc2tOb2RlL3ZpZXcvZ29uZ2dhb0l0ZW1cIik7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcclxuICAgICAgICB0aGlzLml0ZW1MaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdvbmdHYW9Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRDaGlsZChcIm1hc2tOb2RlL3ZpZXcvY29udGVudC9nb25nZ2FvSXRlbVwiICsgaSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IEdvbmdHYW9WaWV3SXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLnNldE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0RGF0YSh0aGlzLmdvbmdHYW9DZmdbaV0pO1xyXG4gICAgICAgICAgICBpZiAoY2Muc3lzLnBsYXRmb3JtICE9IGNjLnN5cy5JUEhPTkUgJiYgaSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIDAgLy/lhbPpl63otKLlr4znp5jnsY1cclxuICAgICAgICAgICAgICAgIC8vIDQgLy/lhbPpl63ov5TliKk1JVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCB8fCBpID09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLm5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuZ29uZ0dhb0NmZyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ29uZ0dhb0NmZy5wdXNoKHsgdHlwZTogMSwgc3VidHlwZTogMSB9KVxyXG4gICAgICAgIHRoaXMuZ29uZ0dhb0NmZy5wdXNoKHsgdHlwZTogMSwgc3VidHlwZTogMiB9KVxyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLklQSE9ORSlcclxuICAgICAgICAgICAgdGhpcy5nb25nR2FvQ2ZnLnB1c2goeyB0eXBlOiAxLCBzdWJ0eXBlOiAzIH0pXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmdvbmdHYW9DZmcucHVzaChudWxsKTtcclxuICAgICAgICB0aGlzLmdvbmdHYW9DZmcucHVzaCh7IHR5cGU6IDIgfSlcclxuICAgICAgICB0aGlzLmdvbmdHYW9DZmcucHVzaCh7IHR5cGU6IDEsIHN1YnR5cGU6IDQgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdTaG93KCkge1xyXG4gICAgICAgIC8v6Ieq5Yqo5YiH6aG15rua5Yqo6Ze06ZqUXHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5hdXRvU2Nyb2xsRGVsYXlUaW1lID0gdGhpcy5zY3JvbGxEZWxheVRpbWU7XHJcbiAgICAgICAgLy/liIfpobXnlKjml7ZcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LmF1dG9TY3JvbGxUaW1lID0gdGhpcy5zY3JvbGxUaW1lO1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDAsIDApO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVRckNvZGVJdGVtKCk7XHJcbiAgICAgICAgLy/oh6rliqjmkq3mlL7lvIDlhbNcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LmlzQXV0b1Njcm9sbCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIC8vIHRoaXMuY2xlYXJSZWNvcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIt+aWsOS6jOe7tOeggVxyXG4gICAgdXBkYXRlUXJDb2RlSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pdGVtTGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtTGlzdFtpXVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gaXRlbS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEgJiYgaXRlbURhdGEudHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXREYXRhKGl0ZW1EYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVZpZXcoKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIHRoaXMuY2xlYXJSZWNvcmQoKTtcclxuXHJcbiAgICAgICAgLy8gdmFyIGRhdGFzID0gWzEsMiwzXTtcclxuICAgICAgICAvLyBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGRhdGEgPSBkYXRhc1tpbmRleF07XHJcbiAgICAgICAgLy8gICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCk7XHJcbiAgICAgICAgLy8gICAgIGl0ZW0uc2V0RGF0YShkYXRhKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5wYWdlVmlldy5hZGRQYWdlKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmKGRhdGFzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgIC8vICAgICAvL+iHquWKqOaSreaUvuW8gOWFs1xyXG4gICAgICAgIC8vICAgICB0aGlzLnBhZ2VWaWV3LmlzQXV0b1Njcm9sbCA9IHRydWU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19