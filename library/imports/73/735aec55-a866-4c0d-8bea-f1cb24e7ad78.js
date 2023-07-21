"use strict";
cc._RF.push(module, '735aexVqGZMDYvq8csk5614', 'WndGameRestoreUI');
// hall/scripts/logic/core/loadingMVC/WndGameRestoreUI.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndGameRestoreUI = /** @class */ (function (_super) {
    __extends(WndGameRestoreUI, _super);
    function WndGameRestoreUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndGameRestoreUI.prototype.onInit = function () {
        this.name = "WndGameRestoreUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameRestoreUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameRestoreUI.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.noBtnNode = this.addCommonClick("cancelBtn", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("okBtn", this.onYesBtnClick, this);
    };
    /**
    * @param {string} content
    * @param {number} type   1 显示 确定取消  2  显示 确定
    * @param {Function} yesCallback
    * @param {Function} noCallback
    * @param {boolean} autoClose  点击按钮后是否自动关闭界面
    * @memberof WndMessageBox
    */
    WndGameRestoreUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        this.yesCallback = this.args[0];
        this.noCallback = this.args[1];
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndGameRestoreUI.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndGameRestoreUI.prototype.onClose = function () {
    };
    WndGameRestoreUI.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    };
    WndGameRestoreUI.prototype.onYesBtnClick = function () {
        this.noCallback = null;
        if (this.autoClose)
            this.close();
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    };
    return WndGameRestoreUI;
}(WndBase_1.default));
exports.default = WndGameRestoreUI;

cc._RF.pop();