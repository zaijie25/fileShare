"use strict";
cc._RF.push(module, 'bcf9cDAmM5JUY0yNU3RftMP', 'WndGameUpdateUI');
// hall/scripts/logic/core/loadingMVC/WndGameUpdateUI.ts

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
var WndGameUpdateUI = /** @class */ (function (_super) {
    __extends(WndGameUpdateUI, _super);
    function WndGameUpdateUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndGameUpdateUI.prototype.onInit = function () {
        this.name = "WndGameUpdateUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpdateUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameUpdateUI.prototype.initView = function () {
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
    WndGameUpdateUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[0];
        this.updateBtnByType(type);
        this.yesCallback = this.args[1];
        this.noCallback = this.args[2];
        this.autoClose = this.args[3] != false;
        this.autoReleaseFunc = this.args[4] != false;
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndGameUpdateUI.prototype.updateBtnByType = function (type) {
        if (type == 1) {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = true;
            this.yesBtnNode.x = 157;
            this.noBtnNode.x = -157;
        }
        else {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = false;
            this.yesBtnNode.x = 0;
        }
    };
    WndGameUpdateUI.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndGameUpdateUI.prototype.onClose = function () {
    };
    WndGameUpdateUI.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
        else {
            Logger.error("onCloseAnimFinish noCallback is null");
        }
    };
    WndGameUpdateUI.prototype.onYesBtnClick = function () {
        // this.noCallback = null;
        // if(this.autoClose)
        //     this.close();
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    };
    return WndGameUpdateUI;
}(WndBase_1.default));
exports.default = WndGameUpdateUI;

cc._RF.pop();