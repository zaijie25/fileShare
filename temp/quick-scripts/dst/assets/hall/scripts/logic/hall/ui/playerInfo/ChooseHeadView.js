
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/ChooseHeadView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8aed6xAjUNNJLx1YPrqR12+', 'ChooseHeadView');
// hall/scripts/logic/hall/ui/playerInfo/ChooseHeadView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var HeadLayerView_1 = require("./HeadLayerView");
var HeadFrameLayerView_1 = require("./HeadFrameLayerView");
var ChooseHeadView = /** @class */ (function (_super) {
    __extends(ChooseHeadView, _super);
    function ChooseHeadView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 当前页签
         */
        _this.curViewIndex = -1;
        /**
         * 页签根节点集合
         */
        _this.yeqianRootNodeArr = [];
        _this.yeqianArr = [];
        return _this;
    }
    ChooseHeadView.prototype.initView = function () {
        for (var i = 0; i < 2; i++) {
            var yeqianNode = this.addCommonClick("yeqian/yeqian_" + i, this.subViewBtnFunc, this);
            this.yeqianRootNodeArr[i] = yeqianNode;
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
        }
        this.headLayerView = this.addView("HeadLayerView", this.getChild("content/content_0"), HeadLayerView_1.default);
        this.headFrameLayerView = this.addView("HeadFrameLayerView", this.getChild("content/content_1"), HeadFrameLayerView_1.default);
        this.yeqianRootNodeArr[1].active = !Global.Setting.vipDisable;
    };
    /**
     * 页签按钮点击
     * @param target
     */
    ChooseHeadView.prototype.subViewBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var viewIndex = parseInt(param);
        this.changeView(viewIndex);
    };
    ChooseHeadView.prototype.UpdateUI = function () {
        for (var i = 0; i < 2; i++) {
            var bShow = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
    };
    ChooseHeadView.prototype.changeView = function (viewIndex) {
        if (this.curViewIndex != viewIndex) {
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0;
            this.headFrameLayerView.subViewState = this.curViewIndex == 1;
            this.UpdateUI();
        }
    };
    ChooseHeadView.prototype.onSubViewShow = function () {
        this.changeView(0);
    };
    ChooseHeadView.prototype.onSubViewHide = function () {
        this.curViewIndex = -1;
    };
    return ChooseHeadView;
}(ViewBase_1.default));
exports.default = ChooseHeadView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxDaG9vc2VIZWFkVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsaURBQTRDO0FBQzVDLDJEQUFzRDtBQUV0RDtJQUE0QyxrQ0FBUTtJQUFwRDtRQUFBLHFFQTZFQztRQTNFRzs7V0FFRztRQUNILGtCQUFZLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekI7O1dBRUc7UUFDSCx1QkFBaUIsR0FBYSxFQUFFLENBQUM7UUFPakMsZUFBUyxHQUFhLEVBQUUsQ0FBQzs7SUE2RDdCLENBQUM7SUEzRGEsaUNBQVEsR0FBbEI7UUFHSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3RCLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUUsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUV2QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FFL0Q7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsdUJBQWEsQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxrQkFBa0IsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsNEJBQWtCLENBQUMsQ0FBQztRQUN6SSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFFbEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVDQUFjLEdBQWQsVUFBZSxNQUFNO1FBQ2pCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMzQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUM3QjtJQUVMLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsU0FBaUI7UUFFeEIsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVMsRUFBQztZQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztZQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQTtZQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFBO1lBQzdELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFUyxzQ0FBYSxHQUF2QjtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUVTLHNDQUFhLEdBQXZCO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBSUwscUJBQUM7QUFBRCxDQTdFQSxBQTZFQyxDQTdFMkMsa0JBQVEsR0E2RW5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBIZWFkTGF5ZXJWaWV3IGZyb20gXCIuL0hlYWRMYXllclZpZXdcIjtcclxuaW1wb3J0IEhlYWRGcmFtZUxheWVyVmlldyBmcm9tIFwiLi9IZWFkRnJhbWVMYXllclZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENob29zZUhlYWRWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN6aG1562+XHJcbiAgICAgKi9cclxuICAgIGN1clZpZXdJbmRleDpudW1iZXIgPSAtMTtcclxuICAgIC8qKlxyXG4gICAgICog6aG1562+5qC56IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHllcWlhblJvb3ROb2RlQXJyOmNjLk5vZGVbXSA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXnrb7oioLngrnpm4blkIhcclxuICAgICAqL1xyXG5cclxuICAgIGhlYWRMYXllclZpZXc6SGVhZExheWVyVmlld1xyXG4gICAgaGVhZEZyYW1lTGF5ZXJWaWV3OkhlYWRGcmFtZUxheWVyVmlld1xyXG4gICAgeWVxaWFuQXJyOmNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAyOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZTpjYy5Ob2RlID0gdGhpcy5hZGRDb21tb25DbGljayggXCJ5ZXFpYW4veWVxaWFuX1wiICsgaSwgdGhpcy5zdWJWaWV3QnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMueWVxaWFuUm9vdE5vZGVBcnJbaV0gPSB5ZXFpYW5Ob2RlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy55ZXFpYW5BcnJbaSAqIDJdID0gY2MuZmluZChcIm5vU2VsZWN0ZWRcIiwgeWVxaWFuTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMueWVxaWFuQXJyW2kgKiAyICsgMV0gPSBjYy5maW5kKFwic2VsZWN0ZWRcIiwgeWVxaWFuTm9kZSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaGVhZExheWVyVmlldyA9IDxIZWFkTGF5ZXJWaWV3PnRoaXMuYWRkVmlldyhcIkhlYWRMYXllclZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvY29udGVudF8wXCIpLCBIZWFkTGF5ZXJWaWV3KTtcclxuICAgICAgICB0aGlzLmhlYWRGcmFtZUxheWVyVmlldyA9IDxIZWFkRnJhbWVMYXllclZpZXc+dGhpcy5hZGRWaWV3KFwiSGVhZEZyYW1lTGF5ZXJWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2NvbnRlbnRfMVwiKSwgSGVhZEZyYW1lTGF5ZXJWaWV3KTtcclxuICAgICAgICB0aGlzLnllcWlhblJvb3ROb2RlQXJyWzFdLmFjdGl2ZSA9ICFHbG9iYWwuU2V0dGluZy52aXBEaXNhYmxlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuaMiemSrueCueWHu1xyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgc3ViVmlld0J0bkZ1bmModGFyZ2V0KXtcclxuICAgICAgICB2YXIgYXJyID0gdGFyZ2V0Lm5vZGUubmFtZS5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgdmFyIHBhcmFtID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcclxuICAgICAgICB2YXIgdmlld0luZGV4ID0gcGFyc2VJbnQocGFyYW0pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVmlldyh2aWV3SW5kZXgpXHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlVUkoKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgMjsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGJTaG93OmJvb2xlYW4gPSAoaSA9PSB0aGlzLmN1clZpZXdJbmRleCk7XHJcbiAgICAgICAgICAgIHZhciB5ZXFpYW5Ob2RlID0gdGhpcy55ZXFpYW5BcnJbaSAqIDIgKyAxXTtcclxuICAgICAgICAgICAgeWVxaWFuTm9kZS5hY3RpdmUgPSBiU2hvdztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZpZXcodmlld0luZGV4OiBudW1iZXIpIHtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY3VyVmlld0luZGV4ICE9IHZpZXdJbmRleCl7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyVmlld0luZGV4ID0gdmlld0luZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmhlYWRMYXllclZpZXcuc3ViVmlld1N0YXRlID0gdGhpcy5jdXJWaWV3SW5kZXggPT0gMFxyXG4gICAgICAgICAgICB0aGlzLmhlYWRGcmFtZUxheWVyVmlldy5zdWJWaWV3U3RhdGUgPSB0aGlzLmN1clZpZXdJbmRleCA9PSAxXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVmlldygwKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmN1clZpZXdJbmRleCA9IC0xXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXX0=