"use strict";
cc._RF.push(module, '6a10aEetitLIKF8GCMlBvwg', 'BbwzBaseView');
// bbwz/Bbwz/scripts/subview/BbwzBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//viewBase   暂时不继承compoennt，不需要额外的开销
var BbwzBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function BbwzBaseView() {
        this._active = false;
        this.Context = Game.Context;
    }
    Object.defineProperty(BbwzBaseView.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            if (value == this._active)
                return;
            this._active = value;
            this.node.active = value;
            if (this._active)
                this.onOpen();
            else
                this.onClose();
        },
        enumerable: false,
        configurable: true
    });
    //强制设置active 触发onClose onOpen
    BbwzBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    BbwzBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    BbwzBaseView.prototype.initView = function () {
    };
    BbwzBaseView.prototype.onOpen = function () { };
    BbwzBaseView.prototype.onClose = function () { };
    BbwzBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    BbwzBaseView.prototype.clearByRound = function () { };
    BbwzBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    BbwzBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return BbwzBaseView;
}());
exports.default = BbwzBaseView;

cc._RF.pop();