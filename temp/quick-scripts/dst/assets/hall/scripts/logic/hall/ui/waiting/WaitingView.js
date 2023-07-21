
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/waiting/WaitingView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ebacJF9n9As7NJf3wIYZ8Z', 'WaitingView');
// hall/scripts/logic/hall/ui/waiting/WaitingView.ts

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
var WaitingView = /** @class */ (function (_super) {
    __extends(WaitingView, _super);
    function WaitingView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private counter = 0;
    // private model:WaitingModel;
    // private maxFrameCount = 0;
    // private UpdateInterval = 0.2;
    WaitingView.initWaitingView = function (node, position) {
        if (position === void 0) { position = cc.v2(0, 0); }
        var loadingNode = new cc.Node();
        var node2 = new WaitingView();
        Global.ResourceManager.loadRes("hall/prefabs/ui/viewWaitUI", function (error, prefab) {
            if (prefab) {
                node2.setNode(cc.instantiate(prefab));
                loadingNode.addChild(node2.node);
                loadingNode.setParent(node);
                loadingNode.setPosition(position);
                return loadingNode;
            }
        });
        return loadingNode;
    };
    WaitingView.prototype.initView = function () {
        this.tipsLabel = this.getComponent("tips", cc.Label);
        if (cc.isValid(this.tipsLabel)) {
            this.tipsLabel.string = "连接中";
        }
    };
    WaitingView.prototype.onSubViewShow = function () {
        Logger.error("--loading显示--");
    };
    WaitingView.prototype.onSubViewHide = function () {
        Logger.error("--loading消失");
    };
    return WaitingView;
}(ViewBase_1.default));
exports.default = WaitingView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFx3YWl0aW5nXFxXYWl0aW5nVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQ7SUFBeUMsK0JBQVE7SUFBakQ7O0lBZ0NBLENBQUM7SUE5QkcsdUJBQXVCO0lBQ3ZCLDhCQUE4QjtJQUM5Qiw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2xCLDJCQUFlLEdBQTdCLFVBQThCLElBQUksRUFBRSxRQUFzQjtRQUF0Qix5QkFBQSxFQUFBLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDOUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxLQUFLLEVBQUUsTUFBTTtZQUN2RSxJQUFJLE1BQU0sRUFBRTtnQkFDUixLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sV0FBVyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBQ1MsOEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtTQUNoQztJQUNMLENBQUM7SUFDUyxtQ0FBYSxHQUF2QjtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNTLG1DQUFhLEdBQXZCO1FBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQWhDQSxBQWdDQyxDQWhDd0Msa0JBQVEsR0FnQ2hEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdhaXRpbmdWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSB0aXBzTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgLy8gcHJpdmF0ZSBjb3VudGVyID0gMDtcclxuICAgIC8vIHByaXZhdGUgbW9kZWw6V2FpdGluZ01vZGVsO1xyXG4gICAgLy8gcHJpdmF0ZSBtYXhGcmFtZUNvdW50ID0gMDtcclxuICAgIC8vIHByaXZhdGUgVXBkYXRlSW50ZXJ2YWwgPSAwLjI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGluaXRXYWl0aW5nVmlldyhub2RlLCBwb3NpdGlvbiA9IGNjLnYyKDAsIDApKSB7XHJcbiAgICAgICAgbGV0IGxvYWRpbmdOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICBsZXQgbm9kZTIgPSBuZXcgV2FpdGluZ1ZpZXcoKTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXMoXCJoYWxsL3ByZWZhYnMvdWkvdmlld1dhaXRVSVwiLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocHJlZmFiKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlMi5zZXROb2RlKGNjLmluc3RhbnRpYXRlKHByZWZhYikpO1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ05vZGUuYWRkQ2hpbGQobm9kZTIubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nTm9kZS5zZXRQYXJlbnQobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nTm9kZS5zZXRQb3NpdGlvbihwb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGluZ05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbG9hZGluZ05vZGU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy50aXBzTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInRpcHNcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy50aXBzTGFiZWwpKXtcclxuICAgICAgICAgICAgdGhpcy50aXBzTGFiZWwuc3RyaW5nID0gXCLov57mjqXkuK1cIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KCkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIi0tbG9hZGluZ+aYvuekui0tXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiLS1sb2FkaW5n5raI5aSxXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==