"use strict";
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