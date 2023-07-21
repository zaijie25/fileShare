
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/BackUpGameUI/WndBackUpGame.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd5001NF7vhExI8hEwEZuIf0', 'WndBackUpGame');
// hall/scripts/logic/hall/ui/BackUpGameUI/WndBackUpGame.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndBackUpGame = /** @class */ (function (_super) {
    __extends(WndBackUpGame, _super);
    function WndBackUpGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBackUpGame.prototype.onInit = function () {
        this.name = "WndBackUpGame";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/BackUpGameUI";
        this.destoryType = WndBase_1.DestoryType.Now;
    };
    WndBackUpGame.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("content/saveBtn", this.onBackUpGameBtn, this);
        this.addCommonClick("content/copyBtn", this.onCopyOfficalBtnClicked, this);
        this.addCommonClick('close', this.close, this);
    };
    WndBackUpGame.prototype.onBackUpGameBtn = function () {
        var url = Global.Setting.Urls.getBackUrl();
        cc.sys.openURL(url);
        this.close();
    };
    WndBackUpGame.prototype.onCopyOfficalBtnClicked = function () {
        Global.NativeEvent.copyTextToClipboard(Global.Setting.Urls.downLoadUrl, function (retStr) {
            cc.log(retStr);
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
            }
            else {
                Global.UI.fastTip("复制失败");
            }
        });
    };
    return WndBackUpGame;
}(WndBase_1.default));
exports.default = WndBackUpGame;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxCYWNrVXBHYW1lVUlcXFduZEJhY2tVcEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBRWhFO0lBQTJDLGlDQUFPO0lBQWxEOztJQW1DQSxDQUFDO0lBakNhLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFTyx1Q0FBZSxHQUF2QjtRQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNoQixDQUFDO0lBRU8sK0NBQXVCLEdBQS9CO1FBRUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxNQUFNO1lBQzNFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDZCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUU3QjtpQkFBSztnQkFDRixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBRSxDQUFDO0lBQ1IsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FuQ0EsQUFtQ0MsQ0FuQzBDLGlCQUFPLEdBbUNqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQmFja1VwR2FtZSBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRCYWNrVXBHYW1lXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9CYWNrVXBHYW1lVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm93O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb250ZW50L3NhdmVCdG5cIiwgdGhpcy5vbkJhY2tVcEdhbWVCdG4sIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNvbnRlbnQvY29weUJ0blwiLCB0aGlzLm9uQ29weU9mZmljYWxCdG5DbGlja2VkLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soJ2Nsb3NlJyx0aGlzLmNsb3NlLHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJhY2tVcEdhbWVCdG4oKXtcclxuICAgICAgICBsZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5nZXRCYWNrVXJsKCk7XHJcbiAgICAgICAgY2Muc3lzLm9wZW5VUkwodXJsKTtcclxuICAgICAgICB0aGlzLmNsb3NlKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ29weU9mZmljYWxCdG5DbGlja2VkKClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZChHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsLCAocmV0U3RyKT0+e1xyXG4gICAgICAgICAgICBjYy5sb2cocmV0U3RyKVxyXG4gICAgICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG59Il19