"use strict";
cc._RF.push(module, '7ead6CU+MxGd7OQaoNPsjrD', 'WndBase');
// hall/scripts/logic/core/ui/WndBase.ts

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
exports.DestoryType = exports.LoadingState = void 0;
var EventDispatcher_1 = require("../../../framework/event/EventDispatcher");
var ViewBase_1 = require("./ViewBase");
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["None"] = 0] = "None";
    LoadingState[LoadingState["Loading"] = 1] = "Loading";
    LoadingState[LoadingState["Loaded"] = 2] = "Loaded";
})(LoadingState = exports.LoadingState || (exports.LoadingState = {}));
var DestoryType;
(function (DestoryType) {
    DestoryType[DestoryType["None"] = 0] = "None";
    DestoryType[DestoryType["Now"] = 1] = "Now";
    DestoryType[DestoryType["ChangeScene"] = 2] = "ChangeScene";
    DestoryType[DestoryType["Persist"] = 3] = "Persist";
})(DestoryType = exports.DestoryType || (exports.DestoryType = {}));
var WndBase = /** @class */ (function (_super) {
    __extends(WndBase, _super);
    function WndBase() {
        var _this = _super.call(this) || this;
        //加载状态
        _this.loadingState = LoadingState.None;
        //销毁类型
        _this.destoryType = DestoryType.ChangeScene;
        _this.args = null;
        //只有popup层有效
        _this.showBg = true;
        //是否初始化成功（拉取数据）
        _this.isInited = false;
        //是否需要先拉拉取数据再显示弹窗
        _this.isNeedDelay = false;
        //当节点打开切场景的时候，界面不销毁，转移到持久化节点
        _this.putToPersistWhenVisible = false;
        _this.internalEvent = new EventDispatcher_1.default();
        _this.onInit();
        _this.registToUIManager();
        return _this;
    }
    WndBase.prototype.onInit = function () { };
    WndBase.prototype.registToUIManager = function () {
        Global.UI.registUI(this);
    };
    //界面显示之前调用  负责初始化
    WndBase.prototype.prepare = function () { };
    WndBase.prototype.afterOpen = function () { };
    WndBase.prototype.reshow = function () {
        this.onReshow();
    };
    WndBase.prototype.onReshow = function () { };
    WndBase.prototype.close = function () {
        Global.UI.close(this.name);
    };
    WndBase.prototype.realClose = function () {
        this.resetState();
        this.onClose();
        this.closeAllSubView();
        // this.callAllView("realClose");
    };
    Object.defineProperty(WndBase.prototype, "isLoaded", {
        get: function () {
            return this.loadingState == LoadingState.Loaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WndBase.prototype, "isLoading", {
        get: function () {
            return this.loadingState == LoadingState.Loading;
        },
        enumerable: false,
        configurable: true
    });
    WndBase.prototype.openAnimFinish = function () { };
    WndBase.prototype.afterAnimFinish = function () { };
    WndBase.prototype.closeAnimFinish = function () {
        this.active = false;
        if (this.commonBg)
            this.commonBg.active = false;
        this.onCloseAnimFinish();
        if (this.destoryType == DestoryType.Now) {
            Global.UI.dispose(this.name);
            if (this.node != null && cc.isValid(this.node)) {
                this.node.removeFromParent(true);
                this.node.destroy();
                this.node = null;
            }
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    };
    WndBase.prototype.releaseRes = function () {
        if (this.destoryType == DestoryType.ChangeScene) {
            Logger.error("release", this.resPath);
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    };
    WndBase.prototype.onCloseAnimFinish = function () {
    };
    WndBase.prototype.OnDataPrepared = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.name);
        if (this.active == true) {
            return;
        }
        this.isInited = true;
        if (this.isInited && this.isNeedDelay) {
            this.active = true;
            this.animComp.bg = this.commonBg;
            this.animComp.ui = this.node;
            this.animComp.target = this;
            this.animComp.doPopupOpenAnim();
        }
    };
    WndBase.prototype.resetState = function () {
        this.isInited = false;
    };
    //在持久化节点打开，退出游戏时，切场景之前打开
    WndBase.prototype.onOpenPersist = function () {
    };
    //在持久化节点关闭，进入游戏时，切场景之后
    WndBase.prototype.onClosePersist = function () {
    };
    Object.defineProperty(WndBase.prototype, "activeInPersistNode", {
        //在持久化节点下，改变active
        set: function (value) {
            if (this._active == value)
                return;
            this._active = value;
            this.node.active = value;
            if (value) {
                this.onOpenPersist();
            }
            else {
                this.onClosePersist();
            }
        },
        enumerable: false,
        configurable: true
    });
    return WndBase;
}(ViewBase_1.default));
exports.default = WndBase;

cc._RF.pop();