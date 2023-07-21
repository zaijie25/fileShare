"use strict";
cc._RF.push(module, 'e1e77CDS7VPdpHtAszMRC7t', 'UIManagerEx');
// hall/scripts/framework/uiManager/UIManagerEx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIManagerEx = /** @class */ (function () {
    function UIManagerEx() {
        this.uiList = [];
        this.uiList = [];
    }
    Object.defineProperty(UIManagerEx, "Instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new UIManagerEx();
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    UIManagerEx.prototype.openUI = function (uiPath, callBack) {
        var self = this;
        cc.loader.loadRes(uiPath, function (err, prefab) {
            if (err) {
                Logger.error(err.message || err);
                return;
            }
            var temp = cc.instantiate(prefab);
            temp.parent = cc.Canvas.instance.node;
            self.uiList.push(temp);
            for (var i = 0; i < self.uiList.length; i++) {
                if (self.uiList[i] && self.uiList[i].name !== "") {
                    var targetUI = self.uiList[i].getComponent("uiPanel");
                    if (targetUI && targetUI.isTop) {
                        targetUI.node.setSiblingIndex(99999);
                    }
                }
            }
            // event--
            if (callBack) {
                callBack(temp);
            }
        });
    };
    UIManagerEx.prototype.closeUI = function (targetUI) {
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            if (this.uiList[i] && targetUI === this.uiList[i]) {
                targetUI.destroy();
                this.uiList.splice(i, 1);
                break;
            }
        }
    };
    UIManagerEx.prototype.findUI = function (uiName) {
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            var temp = this.uiList[i];
            if (temp && temp.name === uiName) {
                return temp;
            }
        }
        return null;
    };
    UIManagerEx._instance = null;
    return UIManagerEx;
}());
exports.default = UIManagerEx;

cc._RF.pop();