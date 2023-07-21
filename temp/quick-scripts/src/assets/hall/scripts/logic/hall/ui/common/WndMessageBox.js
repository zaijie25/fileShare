"use strict";
cc._RF.push(module, 'ca1e1zjmYhE8aUGKz+pXPXO', 'WndMessageBox');
// hall/scripts/logic/hall/ui/common/WndMessageBox.ts

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
var WndMessageBox = /** @class */ (function (_super) {
    __extends(WndMessageBox, _super);
    function WndMessageBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndMessageBox.prototype.onInit = function () {
        this.name = "WndMessageBox";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/MessageBoxUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndMessageBox.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("yesBtn", this.onYesBtnClick, this);
        this.noBtnNode = this.addCommonClick("noBtn", this.onCloseClick, this);
        this.content = this.getComponent("content", cc.RichText);
        this.versionLabel = this.getComponent("versionLabel", cc.Label);
        this.versionLabel.string = "";
        this.content.string = "";
    };
    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndMessageBox
     */
    WndMessageBox.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if (this.args[6]) {
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        this.setNativeVersion();
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    // 重新打开时覆盖参数
    WndMessageBox.prototype.onReshow = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if (this.args[6]) {
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndMessageBox.prototype.updateBtnByType = function (type) {
        if (!cc.isValid(this.node))
            return;
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
    WndMessageBox.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndMessageBox.prototype.onClose = function () {
    };
    WndMessageBox.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    };
    WndMessageBox.prototype.onYesBtnClick = function () {
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
    WndMessageBox.prototype.setNativeVersion = function () {
        // let version = Global.HotUpdateManager.hallNewVersion
        // let version =  Global.Toolkit.genLoadingAppInfo();
        // if(version)
        // {
        //     version = version  + "_"+ Global.ReportTool.GetReportTimes()
        // }
        // if(this.versionLabel && this.versionLabel.node.isValid){
        //     this.versionLabel.string =  version
        // }
    };
    return WndMessageBox;
}(WndBase_1.default));
exports.default = WndMessageBox;

cc._RF.pop();