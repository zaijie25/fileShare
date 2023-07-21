"use strict";
cc._RF.push(module, '795e1Jx9oBC2Irr2CquCDzH', 'UIManager');
// hall/scripts/logic/core/ui/UIManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WndBase_1 = require("./WndBase");
var FastTip_1 = require("../../hall/ui/common/FastTip");
var UIAnimComponent_1 = require("../component/UIAnimComponent");
var SceneManager_1 = require("../scene/SceneManager");
var BlackBgComp_1 = require("../component/BlackBgComp");
var YXButton_1 = require("../component/YXButton");
var AppHelper_1 = require("../tool/AppHelper");
var UIManager = /** @class */ (function () {
    function UIManager() {
        //防止子游戏import不了，使用变量的形式，如果有需要就改成enum
        //用layer区分不同的弹窗效果
        this.MainLayer = "MainLayer";
        this.FullScreenLayer = "FullScreenLayer";
        this.PopLayer = "PopLayer";
        this.TipsLayer = "TipsLayer";
        //layerName => layerNode
        this.layerMap = {};
        //string => wndbase
        this.windowMap = {};
        this.showWindowList = [];
        /**
         * 当前子游戏内是否有处理大厅messagebox
         */
        this.bMessageBoxInGame = false;
    }
    UIManager.prototype.setup = function (resourceMgr) {
        this.resourceMgr = resourceMgr;
        this.fastTipMgr = new FastTip_1.default();
    };
    //进场景公共操作  @todo  不要放到uiManager
    UIManager.prototype.enterSceneInit = function () {
        if (!CC_PREVIEW)
            cc.debug.setDisplayStats(false);
        cc.sys.garbageCollect();
        if (cc.director.getScene().name == "HallScene")
            cc.game.setFrameRate(Global.Setting.HallFPSConfig);
        else
            cc.game.setFrameRate(Global.Setting.FPSConfig);
    };
    //初始化界面
    UIManager.prototype.initUIRoot = function (firstEnter) {
        if (firstEnter === void 0) { firstEnter = false; }
        this.enterSceneInit();
        //清理上一场景界面
        this.clearAllUIPrefab();
        Global.Persist.setState(false);
        if (!firstEnter) {
            Global.ResourceManager.releaseHelper.clearUnuseAssets();
        }
        else {
            Global.ResourceManager.releaseHelper.adjustByIphone6();
        }
        var canvasNode = cc.find("Canvas");
        if (canvasNode == null) {
            Logger.error("找不到Canvas");
            return;
        }
        this.canvasNode = canvasNode;
        var canvas = canvasNode.getComponent(cc.Canvas);
        // //@todo 根据分辨率判断
        // canvas.fitHeight = true;
        // // canvas.fitWidth = true;
        this.adjuestCanvasScreenStretch(canvas);
        var uiRoot = canvasNode.getChildByName("HUIRoot");
        if (uiRoot == null) {
            uiRoot = new cc.Node("HUIRoot");
            uiRoot.zIndex = 10;
            canvasNode.addChild(uiRoot);
        }
        this.uiRoot = uiRoot;
        this.addUILayer(uiRoot, this.MainLayer);
        this.addUILayer(uiRoot, this.FullScreenLayer);
        this.addUILayer(uiRoot, this.PopLayer);
        this.addUILayer(uiRoot, this.TipsLayer);
        this.loadCommonBg();
        this.fastTipMgr.initTip(this.layerMap[this.TipsLayer]);
    };
    UIManager.prototype.RestorePersistNode = function () {
        Global.Persist.setState(true); // debug 大厅选场切场景保留显示时先显示根, 再挂UI, 避免触发一次active
        for (var key in this.windowMap) {
            if (this.windowMap[key]) {
                if (this.windowMap[key].destoryType == WndBase_1.DestoryType.Persist) {
                    if (this.windowMap[key].node && this.windowMap[key].node.isValid && this.windowMap[key].active) {
                        Global.Persist.saveToPool(this.windowMap[key].name, this.windowMap[key].node, true);
                    }
                }
            }
        }
        var RestoreNode = ["WndGameLobbyShell"];
        for (var index = 0; index < RestoreNode.length; index++) {
            var key = RestoreNode[index];
            if (key) {
                var restore = this.getWindow(key);
                var flag = restore ? restore.active : false;
                if (!flag) // 只有在有大厅选场的游戏 进入子游戏的情况下 才保留大厅选场显示 防止闪现大厅的问题
                 {
                    var tmpNode = Global.Persist.getFromPool(key);
                    if (cc.isValid(tmpNode)) {
                        tmpNode.removeFromParent(true);
                        tmpNode.destroy();
                        tmpNode = null;
                    }
                    continue;
                }
                // else
                // {
                //     Global.Persist.setState(flag)
                // }
            }
        }
    };
    UIManager.prototype.adjuestCanvasScreenStretch = function (canvas) {
        var size = cc.winSize;
        if (Global.Setting.SystemInfo.orientationLandscape) {
            canvas.designResolution = cc.size(1280, 720);
            var designSize = canvas.designResolution;
            if (size.width / size.height >= designSize.width / designSize.height) {
                canvas.fitHeight = true;
                canvas.fitWidth = false;
            }
            else {
                canvas.fitHeight = true;
                canvas.fitWidth = true;
            }
        }
        else {
            canvas.designResolution = cc.size(720, 1280);
            canvas.fitHeight = false;
            canvas.fitWidth = true;
        }
    };
    UIManager.prototype.addUILayer = function (root, layer) {
        var node = root.getChildByName(layer);
        if (node == null) {
            node = new cc.Node(layer);
            root.addChild(node);
        }
        this.layerMap[layer] = node;
    };
    UIManager.prototype.getLayer = function (key) {
        return this.layerMap[key];
    };
    //注册UI
    UIManager.prototype.registUI = function (wndbase) {
        if (this.windowMap[wndbase.name] != null) {
            Logger.error("重复注册UI", wndbase.name);
            return;
        }
        this.windowMap[wndbase.name] = wndbase;
    };
    UIManager.prototype.getWindow = function (wndName) {
        if (this.windowMap[wndName] == null) {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return null;
        }
        var window = this.windowMap[wndName];
        return window;
    };
    UIManager.prototype.show = function (wndName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.windowMap[wndName] == null) {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return;
        }
        var window = this.windowMap[wndName];
        window.args = args;
        //界面正在加载  只设置active属性
        if (window.isLoading) {
            window.active = true;
            return;
        }
        //已经加载过
        if (window.isLoaded) {
            //界面已经打开  触发onreshow
            if (window.active == true) {
                this.addToTop(window);
                window.reshow();
                return;
            }
            this.openWindowInternal(window);
            return;
        }
        window.active = true;
        window.loadingState = WndBase_1.LoadingState.Loading;
        if (window.resPath == null || window.resPath == "") {
            Logger.error("未设置界面资源路径！！！", window.name);
            return;
        }
        if (window.destoryType == WndBase_1.DestoryType.Persist) {
            var tmpNode = Global.Persist.getFromPool(window.name);
            if (tmpNode) {
                this.onWindowLoaded(window, null, tmpNode, true);
                return;
            }
        }
        this.resourceMgr.loadRes(window.resPath, function (error, prefab) {
            Logger.log("show window", wndName);
            _this.onWindowLoaded(window, error, prefab);
        }, null, null, false, true);
    };
    UIManager.prototype.close = function (wndName) {
        var window = this.getWindow(wndName);
        Logger.log("close wnd", wndName);
        if (window == null || !window.isLoaded || !window.active) {
            Logger.log("-----close " + wndName);
            return;
        }
        //@todo 根据动画类型关闭界面
        this.realClose(window);
    };
    UIManager.prototype.closeHallLoading = function () {
        // let loading = cc.Canvas.instance.node.getChildByName("loading");
        // if(loading)
        //     loading.active = false;
    };
    UIManager.prototype.showHallLoading = function () {
        // let loading = cc.Canvas.instance.node.getChildByName("loading");
        // if(loading)
        //     loading.active = true;
    };
    UIManager.prototype.dispose = function (wndName) {
        var window = this.getWindow(wndName);
        if (window == null)
            return;
        if (window.loadingState == WndBase_1.LoadingState.None)
            return;
        if (window.destoryType == WndBase_1.DestoryType.Persist && window.active) {
            return;
        }
        window.loadingState = WndBase_1.LoadingState.None;
        window.dispose();
        if (window.node != null && cc.isValid(window.node)) {
            window.node.removeFromParent(true);
            window.node.destroy();
            window.node = null;
        }
        window.releaseRes();
    };
    UIManager.prototype.onWindowLoaded = function (window, error, prefab, isNode) {
        var _this = this;
        if (isNode === void 0) { isNode = false; }
        if (error != null) {
            Logger.error("加载UI出错", window.name, error.message);
            Logger.error("msg", JSON.stringify(error));
            if (prefab == null) {
                return;
            }
            // return;
        }
        if (!this.uiRoot.isValid)
            return;
        window.loadingState = WndBase_1.LoadingState.Loaded;
        if (window.destoryType == WndBase_1.DestoryType.Persist) {
            if (isNode) {
                window.setNode(prefab);
            }
            else {
                var tmpNode = cc.instantiate(prefab);
                window.setNode(tmpNode);
            }
        }
        else {
            window.setNode(cc.instantiate(prefab));
        }
        if (window.isNeedDelay) {
            window.active = false;
        }
        AppHelper_1.default.afterWindowInit(window.name, window.node, window);
        window.node.active = window.active;
        if (window.commonBg != null && window.commonBg.isValid) {
            window.commonBg.removeFromParent();
            window.commonBg.destroy();
            window.commonBg = null;
        }
        if (this.bgTemplate) {
            window.commonBg = cc.instantiate(this.bgTemplate);
            var comp = Global.UIHelper.safeGetComponent(window.commonBg, "", BlackBgComp_1.default);
            comp.window = window;
            if (window.commonBg) {
                var btn_1 = window.commonBg.getComponent(YXButton_1.default);
                if (btn_1 == null) {
                    btn_1 = window.commonBg.addComponent(YXButton_1.default);
                    btn_1.transition = null;
                }
                window.commonBg.on("click", function () {
                    if (!btn_1.isClickValid)
                        return;
                    btn_1.isClickValid = false;
                    btn_1.scheduleOnce(function () {
                        if (btn_1.isValid)
                            btn_1.isClickValid = true;
                    }, 1);
                    _this.realClose(window);
                });
            }
        }
        window.animComp = Global.UIHelper.safeGetComponent(window.node, "", UIAnimComponent_1.default);
        //防止资源没加载完关闭
        if (window.active || window.isNeedDelay) {
            this.openWindowInternal(window);
        }
    };
    UIManager.prototype.realClose = function (window) {
        window.realClose();
        this.removeWindowFromShowList(window);
        this.doCloseAnim(window);
        // this.adjustBg();
    };
    UIManager.prototype.doCloseAnim = function (window) {
        if (window.animComp && window.layer == this.PopLayer) {
            window.animComp.doPopupCloseAnim();
        }
        else {
            if (window.commonBg) {
                window.commonBg.active = false;
                window.active = false;
            }
        }
    };
    //调整层级
    UIManager.prototype.addToTop = function (window) {
        if (!window.isLoaded)
            return;
        var layerView = this.layerMap[window.layer];
        if (layerView == null) {
            layerView = this.layerMap[this.PopLayer];
        }
        if (!window.node.isValid) {
            this.dispose(window.name);
            return;
        }
        if (layerView == null || !layerView.isValid) {
            return;
        }
        window.node.setParent(null);
        if (window.layer == this.PopLayer && window.showBg && window.commonBg) {
            // window.commonBg.active = true;
            window.commonBg.removeFromParent(false);
            layerView.addChild(window.commonBg);
        }
        layerView.addChild(window.node);
    };
    UIManager.prototype.openWindowInternal = function (window) {
        if (this.showWindowList.indexOf(window) > -1) {
            Logger.error("!!!! 重复add window", window);
        }
        this.showWindowList.push(window);
        this.addToTop(window);
        if (window.isNeedDelay) {
            window.tryOpen(window.args);
            window.animComp.bg = window.commonBg;
            window.animComp.ui = window.node;
            window.animComp.target = window;
        }
        else {
            window.active = true;
            window.open(window.args);
            this.openWindowByLayer(window);
        }
    };
    UIManager.prototype.openWindowByLayer = function (window) {
        if (window.layer == this.PopLayer) {
            window.active = true;
            window.animComp.bg = window.commonBg;
            window.animComp.ui = window.node;
            window.animComp.target = window;
            window.animComp.doPopupOpenAnim();
        }
        else if (window.layer == this.FullScreenLayer) {
            // window.active = true;
            window.node.opacity = 1;
            Global.Component.frameEnd(function () {
                window.node.opacity = 255;
                window.afterOpen();
            });
        }
        else {
            window.active = true;
        }
    };
    UIManager.prototype.removeWindowFromShowList = function (window) {
        for (var i = this.showWindowList.length - 1; i >= 0; i--) {
            if (this.showWindowList[i] == window) {
                this.showWindowList.splice(i, 1);
            }
        }
    };
    UIManager.prototype.loadCommonBg = function () {
        var _this = this;
        this.resourceMgr.loadRes("hall/prefabs/ui/CommonBg", function (error, prefab) {
            if (error != null) {
                Logger.error("hall/prefabs/ui/CommonBg  加载失败");
                return;
            }
            _this.bgTemplate = cc.instantiate(prefab);
            _this.bgTemplate.active = false;
            var widget = _this.bgTemplate.getComponent(cc.Widget);
            if (widget) {
                widget.target = _this.canvasNode;
            }
            // this.bgTemplate.addChild(bg);
        });
    };
    UIManager.prototype.clearAllUIPrefab = function () {
        for (var key in this.windowMap) {
            this.dispose(key);
        }
        if (this.bgTemplate && cc.isValid(this.bgTemplate)) {
            this.bgTemplate.destroy();
            this.bgTemplate = null;
        }
        this.showWindowList = [];
        this.fastTipMgr.clearAll();
    };
    UIManager.prototype.closeAllUIPrefab = function (ignoreMainLayer) {
        if (ignoreMainLayer === void 0) { ignoreMainLayer = false; }
        this.showHallLoading();
        for (var i = this.showWindowList.length - 1; i >= 0; i--) {
            if (this.showWindowList[i] == null) {
                Logger.error("showWindowList[i] == null ~!!!!!", i);
            }
            else {
                if (this.showWindowList[i].layer == this.MainLayer && ignoreMainLayer
                    || (this.showWindowList[i].layer == this.FullScreenLayer && ignoreMainLayer)) //grace 2020 3.19 大厅跟随选场 切场景不强制关闭选场界面 防止闪现大厅的问题
                 {
                    continue;
                }
                if (this.showWindowList[i].name == "WndNetWaiting") {
                    continue;
                }
                this.showWindowList[i].close();
            }
        }
    };
    UIManager.prototype.scaleAnim = function (window) {
        window.node.scale = 0.4;
        window.node.runAction(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()));
    };
    UIManager.prototype.onUpdate = function (dt) {
        this.fastTipMgr.onUpdate(dt);
    };
    //-------------messagebox接口------------------------------------------------
    /**
     * 带警报Icon的提示弹窗
     * @param content 显示文本
     * @param callbackY 确定回调
     * @param callbackN 取消或者关闭回调
     */
    UIManager.prototype.showAlertBox = function (content, callbackY, callbackN, autoClose, autoReleaseFunc) {
        if (autoClose === void 0) { autoClose = true; }
        if (autoReleaseFunc === void 0) { autoReleaseFunc = true; }
        this.show("WndMessageBox", content, 2, callbackY, callbackN, autoClose, autoReleaseFunc, true);
    };
    /**
     * 只有确定按钮的提示弹窗
     * @param content 显示文本
     * @param callbackY 确定回调
     * @param callbackN 取消或者关闭回调
     */
    UIManager.prototype.showSingleBox = function (content, callbackY, callbackN, autoClose, autoReleaseFunc) {
        if (autoClose === void 0) { autoClose = true; }
        if (autoReleaseFunc === void 0) { autoReleaseFunc = true; }
        if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Game) {
            if (this.bMessageBoxInGame) {
                var objArr = [content, 2, callbackY, callbackN, autoClose, autoReleaseFunc];
                Game.Event.event(Game.EVENT_MESSAGE_BOX, objArr);
                return;
            }
        }
        this.show("WndMessageBox", content, 2, callbackY, callbackN, autoClose, autoReleaseFunc);
    };
    UIManager.prototype.showYesNoBox = function (content, callbackY, callbackN, autoClose) {
        if (autoClose === void 0) { autoClose = true; }
        if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Game) {
            if (this.bMessageBoxInGame) {
                var objArr = [content, 1, callbackY, callbackN, autoClose];
                Game.Event.event(Game.EVENT_MESSAGE_BOX, objArr);
                return;
            }
        }
        this.show("WndMessageBox", content, 1, callbackY, callbackN, autoClose);
    };
    /**
     * 设置是否在子游戏内处理大厅messagebox
     * @param bMessageBox
     */
    UIManager.prototype.SetMessageBoxInGame = function (bMessageBox) {
        this.bMessageBoxInGame = bMessageBox;
    };
    //---------------------------------------------------------------------------
    /**
     * 通用tips  支持富文本
     * @param msg
     */
    UIManager.prototype.fastTip = function (msg) {
        this.fastTipMgr.show(msg);
    };
    /**
     * 显示横竖屏切换提示UI
     * @param compeleteCallBack 提示播放完以后的回调
     * @param showTime 提示显示时长(单位:秒)
     */
    UIManager.prototype.showPortraitScreenNotice = function (compeleteCallBack, showTime) {
        // Logger.error("showPortraitScreenNotice() called!!!");
        this.show("WndScreenPortraitNotice", compeleteCallBack, showTime);
    };
    return UIManager;
}());
exports.default = UIManager;

cc._RF.pop();