"use strict";
cc._RF.push(module, 'e97a4bc5cJJvaRQBATVqJ87', 'DdzBaseView');
// ddz/ddz/scripts/subView/DdzBaseView.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzDriver_1 = require("../DdzDriver");
//viewBase   暂时不继承compoennt，不需要额外的开销
var DdzBaseView = /** @class */ (function () {
    // debug 子类函数声明默认值在 父类构造之后
    function DdzBaseView() {
        this._active = false;
        this.Path = DdzDriver_1.default.instance.Path;
        this.Define = DdzDriver_1.default.instance.Define;
        this.Context = DdzDriver_1.default.instance.Context;
        this.PokerHelper = DdzDriver_1.default.instance.PokerHelper;
        this.PlayRuleHelper = DdzDriver_1.default.instance.PlayRuleHelper;
    }
    Object.defineProperty(DdzBaseView.prototype, "active", {
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
    DdzBaseView.prototype.setActive = function (value) {
        this._active = !value;
        this.active = value;
    };
    DdzBaseView.prototype.setNode = function (node) {
        this.node = node;
        if (node == null || !cc.isValid(node)) {
            Logger.error("node == null || !cc.isValid(node)");
            return;
        }
        this._active = node;
        this.initView();
    };
    DdzBaseView.prototype.initView = function () {
    };
    DdzBaseView.prototype.onOpen = function () { };
    DdzBaseView.prototype.onClose = function () { };
    DdzBaseView.prototype.clearByGame = function () {
        this.clearByRound();
    };
    DdzBaseView.prototype.clearByRound = function () { };
    DdzBaseView.prototype.getComponent = function (path, type) {
        return Global.UIHelper.getComponent(this.node, path, type);
    };
    DdzBaseView.prototype.getChild = function (path) {
        return Global.UIHelper.getChild(this.node, path);
    };
    return DdzBaseView;
}());
exports.default = DdzBaseView;

cc._RF.pop();