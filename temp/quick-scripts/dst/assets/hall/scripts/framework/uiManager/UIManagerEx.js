
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/uiManager/UIManagerEx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFx1aU1hbmFnZXJcXFVJTWFuYWdlckV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFHSTtRQURRLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUNELHNCQUFrQix1QkFBUTthQUExQjtZQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQzthQUN0QztZQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVNLDRCQUFNLEdBQWIsVUFBYyxNQUFNLEVBQUUsUUFBbUI7UUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUcsRUFBRSxNQUFNO1lBQzNDLElBQUksR0FBRyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDakMsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7b0JBQzlDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0o7YUFDSjtZQUNELFVBQVU7WUFDVixJQUFJLFFBQVEsRUFBRTtnQkFDVixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFTSw2QkFBTyxHQUFkLFVBQWUsUUFBUTtRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0MsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQztJQUVNLDRCQUFNLEdBQWIsVUFBYyxNQUFNO1FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDOUIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQXhEYyxxQkFBUyxHQUFnQixJQUFJLENBQUM7SUEyRGpELGtCQUFDO0NBNURELEFBNERDLElBQUE7a0JBNURvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlckV4IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVUlNYW5hZ2VyRXggPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB1aUxpc3QgPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudWlMaXN0ID0gW11cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFVJTWFuYWdlckV4IHtcclxuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBVSU1hbmFnZXJFeCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5VSSh1aVBhdGgsIGNhbGxCYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModWlQYXRoLCBmdW5jdGlvbiAoZXJyLCBwcmVmYWIpIHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0ZW1wLnBhcmVudCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlO1xyXG4gICAgICAgICAgICBzZWxmLnVpTGlzdC5wdXNoKHRlbXApO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLnVpTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYudWlMaXN0W2ldICYmIHNlbGYudWlMaXN0W2ldLm5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0VUkgPSBzZWxmLnVpTGlzdFtpXS5nZXRDb21wb25lbnQoXCJ1aVBhbmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRVSSAmJiB0YXJnZXRVSS5pc1RvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRVSS5ub2RlLnNldFNpYmxpbmdJbmRleCg5OTk5OSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGV2ZW50LS1cclxuICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsQmFjayh0ZW1wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlVUkodGFyZ2V0VUkpe1xyXG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLnVpTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy51aUxpc3RbaV0gJiYgdGFyZ2V0VUkgPT09IHRoaXMudWlMaXN0W2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRVSS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVpTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZFVJKHVpTmFtZSl7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMudWlMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZW1wID0gdGhpcy51aUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wICYmIHRlbXAubmFtZSA9PT0gdWlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG59Il19