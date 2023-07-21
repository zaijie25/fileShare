"use strict";
cc._RF.push(module, 'e3092rL43NNzaEPgV4iUGfH', 'ErmjBaseView');
// ermj/Ermj/scripts/subView/ErmjBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjDriver_1 = require("../ErmjDriver");
//viewBase   暂时不继承compoennt，不需要额外的开销
var ErmjBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function ErmjBaseView() {
        this._active = false;
        this.Path = ErmjDriver_1.default.instance.Path;
        this.Define = ErmjDriver_1.default.instance.Define;
        this.Context = ErmjDriver_1.default.instance.Context;
    }
    Object.defineProperty(ErmjBaseView.prototype, "active", {
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
    ErmjBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    ErmjBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    ErmjBaseView.prototype.initView = function () {
    };
    ErmjBaseView.prototype.onOpen = function () { };
    ErmjBaseView.prototype.onClose = function () { };
    ErmjBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    ErmjBaseView.prototype.clearByRound = function () { };
    ErmjBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    ErmjBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return ErmjBaseView;
}());
exports.default = ErmjBaseView;

cc._RF.pop();