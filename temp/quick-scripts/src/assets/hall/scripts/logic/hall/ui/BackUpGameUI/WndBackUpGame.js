"use strict";
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