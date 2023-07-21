
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/ui/UIManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHVpXFxVSU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBK0Q7QUFFL0Qsd0RBQW1EO0FBQ25ELGdFQUEyRDtBQUMzRCxzREFBa0Q7QUFDbEQsd0RBQW1EO0FBQ25ELGtEQUE2QztBQUM3QywrQ0FBMEM7QUFFMUM7SUErQkk7UUE5QkEsb0NBQW9DO1FBQ3BDLGlCQUFpQjtRQUNWLGNBQVMsR0FBRyxXQUFXLENBQUM7UUFDeEIsb0JBQWUsR0FBRyxpQkFBaUIsQ0FBQztRQUNwQyxhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLGNBQVMsR0FBRyxXQUFXLENBQUM7UUFNL0Isd0JBQXdCO1FBQ2hCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFLdEIsbUJBQW1CO1FBQ1gsY0FBUyxHQUErQixFQUFFLENBQUE7UUFDMUMsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFNNUI7O1dBRUc7UUFDSyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7SUFHM0MsQ0FBQztJQUVNLHlCQUFLLEdBQVosVUFBYSxXQUE0QjtRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFHRCwrQkFBK0I7SUFDeEIsa0NBQWMsR0FBckI7UUFDSSxJQUFJLENBQUMsVUFBVTtZQUNYLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFeEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksSUFBSSxXQUFXO1lBQzFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENB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QUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRCxPQUFPO2FBQ1Y7U0FDSjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBSUQ7OztPQUdHO0lBQ0ksdUNBQW1CLEdBQTFCLFVBQTJCLFdBQW9CO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUM7SUFDekMsQ0FBQztJQUdELDZFQUE2RTtJQUM3RTs7O09BR0c7SUFDSSwyQkFBTyxHQUFkLFVBQWUsR0FBRztRQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksNENBQXdCLEdBQS9CLFVBQWdDLGlCQUEyQixFQUFFLFFBQWlCO1FBQzFFLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTCxnQkFBQztBQUFELENBMWtCQSxBQTBrQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IExvYWRpbmdTdGF0ZSwgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi9XbmRCYXNlXCI7XHJcbmltcG9ydCBSZXNvdXJjZU1hbmFnZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9yZXNvdXJjZS9SZXNvdXJjZU1hbmFnZXJcIjtcclxuaW1wb3J0IEZhc3RUaXAgZnJvbSBcIi4uLy4uL2hhbGwvdWkvY29tbW9uL0Zhc3RUaXBcIjtcclxuaW1wb3J0IFVJQW5pbUNvbXBvbmVudCBmcm9tIFwiLi4vY29tcG9uZW50L1VJQW5pbUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTY2VuZVR5cGUgfSBmcm9tIFwiLi4vc2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBCbGFja0JnQ29tcCBmcm9tIFwiLi4vY29tcG9uZW50L0JsYWNrQmdDb21wXCI7XHJcbmltcG9ydCBZWEJ1dHRvbiBmcm9tIFwiLi4vY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uL3Rvb2wvQXBwSGVscGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1hbmFnZXIge1xyXG4gICAgLy/pmLLmraLlrZDmuLjmiI9pbXBvcnTkuI3kuobvvIzkvb/nlKjlj5jph4/nmoTlvaLlvI/vvIzlpoLmnpzmnInpnIDopoHlsLHmlLnmiJBlbnVtXHJcbiAgICAvL+eUqGxheWVy5Yy65YiG5LiN5ZCM55qE5by556qX5pWI5p6cXHJcbiAgICBwdWJsaWMgTWFpbkxheWVyID0gXCJNYWluTGF5ZXJcIjtcclxuICAgIHB1YmxpYyBGdWxsU2NyZWVuTGF5ZXIgPSBcIkZ1bGxTY3JlZW5MYXllclwiO1xyXG4gICAgcHVibGljIFBvcExheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgcHVibGljIFRpcHNMYXllciA9IFwiVGlwc0xheWVyXCI7XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVpUm9vdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgY2FudmFzTm9kZTogY2MuTm9kZTtcclxuICAgIC8vbGF5ZXJOYW1lID0+IGxheWVyTm9kZVxyXG4gICAgcHJpdmF0ZSBsYXllck1hcCA9IHt9O1xyXG5cclxuICAgIC8vYmfmqKHmnb9cclxuICAgIHByaXZhdGUgYmdUZW1wbGF0ZTogY2MuTm9kZTtcclxuXHJcbiAgICAvL3N0cmluZyA9PiB3bmRiYXNlXHJcbiAgICBwcml2YXRlIHdpbmRvd01hcDogeyBba2V5OiBzdHJpbmddOiBXbmRCYXNlIH0gPSB7fVxyXG4gICAgcHJpdmF0ZSBzaG93V2luZG93TGlzdCA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgcmVzb3VyY2VNZ3I6IFJlc291cmNlTWFuYWdlcjtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBmYXN0VGlwTWdyOiBGYXN0VGlwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3lrZDmuLjmiI/lhoXmmK/lkKbmnInlpITnkIblpKfljoVtZXNzYWdlYm94XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYk1lc3NhZ2VCb3hJbkdhbWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0dXAocmVzb3VyY2VNZ3I6IFJlc291cmNlTWFuYWdlcikge1xyXG4gICAgICAgIHRoaXMucmVzb3VyY2VNZ3IgPSByZXNvdXJjZU1ncjtcclxuICAgICAgICB0aGlzLmZhc3RUaXBNZ3IgPSBuZXcgRmFzdFRpcCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+i/m+WcuuaZr+WFrOWFseaTjeS9nCAgQHRvZG8gIOS4jeimgeaUvuWIsHVpTWFuYWdlclxyXG4gICAgcHVibGljIGVudGVyU2NlbmVJbml0KCkge1xyXG4gICAgICAgIGlmICghQ0NfUFJFVklFVylcclxuICAgICAgICAgICAgY2MuZGVidWcuc2V0RGlzcGxheVN0YXRzKGZhbHNlKTtcclxuICAgICAgICBjYy5zeXMuZ2FyYmFnZUNvbGxlY3QoKTtcclxuXHJcbiAgICAgICAgaWYgKGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZSA9PSBcIkhhbGxTY2VuZVwiKVxyXG4gICAgICAgICAgICBjYy5nYW1lLnNldEZyYW1lUmF0ZShHbG9iYWwuU2V0dGluZy5IYWxsRlBTQ29uZmlnKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGNjLmdhbWUuc2V0RnJhbWVSYXRlKEdsb2JhbC5TZXR0aW5nLkZQU0NvbmZpZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5Yid5aeL5YyW55WM6Z2iXHJcbiAgICBwdWJsaWMgaW5pdFVJUm9vdChmaXJzdEVudGVyID0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmVudGVyU2NlbmVJbml0KCk7XHJcbiAgICAgICAgLy/muIXnkIbkuIrkuIDlnLrmma/nlYzpnaJcclxuICAgICAgICB0aGlzLmNsZWFyQWxsVUlQcmVmYWIoKTtcclxuICAgICAgICBHbG9iYWwuUGVyc2lzdC5zZXRTdGF0ZShmYWxzZSlcclxuICAgICAgICBpZiAoIWZpcnN0RW50ZXIpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5yZWxlYXNlSGVscGVyLmNsZWFyVW51c2VBc3NldHMoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5yZWxlYXNlSGVscGVyLmFkanVzdEJ5SXBob25lNigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FudmFzTm9kZSA9IGNjLmZpbmQoXCJDYW52YXNcIik7XHJcblxyXG4gICAgICAgIGlmIChjYW52YXNOb2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwQ2FudmFzXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FudmFzTm9kZSA9IGNhbnZhc05vZGU7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGNhbnZhc05vZGUuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcyk7XHJcblxyXG5cclxuICAgICAgICAvLyAvL0B0b2RvIOagueaNruWIhui+qOeOh+WIpOaWrVxyXG4gICAgICAgIC8vIGNhbnZhcy5maXRIZWlnaHQgPSB0cnVlO1xyXG4gICAgICAgIC8vIC8vIGNhbnZhcy5maXRXaWR0aCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hZGp1ZXN0Q2FudmFzU2NyZWVuU3RyZXRjaChjYW52YXMpO1xyXG5cclxuICAgICAgICBsZXQgdWlSb290ID0gY2FudmFzTm9kZS5nZXRDaGlsZEJ5TmFtZShcIkhVSVJvb3RcIik7XHJcbiAgICAgICAgaWYgKHVpUm9vdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHVpUm9vdCA9IG5ldyBjYy5Ob2RlKFwiSFVJUm9vdFwiKTtcclxuICAgICAgICAgICAgdWlSb290LnpJbmRleCA9IDEwO1xyXG4gICAgICAgICAgICBjYW52YXNOb2RlLmFkZENoaWxkKHVpUm9vdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudWlSb290ID0gdWlSb290O1xyXG4gICAgICAgIHRoaXMuYWRkVUlMYXllcih1aVJvb3QsIHRoaXMuTWFpbkxheWVyKTtcclxuICAgICAgICB0aGlzLmFkZFVJTGF5ZXIodWlSb290LCB0aGlzLkZ1bGxTY3JlZW5MYXllcik7XHJcbiAgICAgICAgdGhpcy5hZGRVSUxheWVyKHVpUm9vdCwgdGhpcy5Qb3BMYXllcilcclxuICAgICAgICB0aGlzLmFkZFVJTGF5ZXIodWlSb290LCB0aGlzLlRpcHNMYXllcilcclxuICAgICAgICB0aGlzLmxvYWRDb21tb25CZygpO1xyXG5cclxuICAgICAgICB0aGlzLmZhc3RUaXBNZ3IuaW5pdFRpcCh0aGlzLmxheWVyTWFwW3RoaXMuVGlwc0xheWVyXSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzdG9yZVBlcnNpc3ROb2RlKCkge1xyXG4gICAgICAgIEdsb2JhbC5QZXJzaXN0LnNldFN0YXRlKHRydWUpO1x0XHQvLyBkZWJ1ZyDlpKfljoXpgInlnLrliIflnLrmma/kv53nlZnmmL7npLrml7blhYjmmL7npLrmoLksIOWGjeaMglVJLCDpgb/lhY3op6blj5HkuIDmrKFhY3RpdmVcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy53aW5kb3dNYXApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMud2luZG93TWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndpbmRvd01hcFtrZXldLmRlc3RvcnlUeXBlID09IERlc3RvcnlUeXBlLlBlcnNpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy53aW5kb3dNYXBba2V5XS5ub2RlICYmIHRoaXMud2luZG93TWFwW2tleV0ubm9kZS5pc1ZhbGlkICYmIHRoaXMud2luZG93TWFwW2tleV0uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5QZXJzaXN0LnNhdmVUb1Bvb2wodGhpcy53aW5kb3dNYXBba2V5XS5uYW1lLCB0aGlzLndpbmRvd01hcFtrZXldLm5vZGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IFJlc3RvcmVOb2RlID0gW1wiV25kR2FtZUxvYmJ5U2hlbGxcIl1cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgUmVzdG9yZU5vZGUubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBSZXN0b3JlTm9kZVtpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN0b3JlID0gdGhpcy5nZXRXaW5kb3coa2V5KVxyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcgPSByZXN0b3JlID8gcmVzdG9yZS5hY3RpdmUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKCFmbGFnKSAvLyDlj6rmnInlnKjmnInlpKfljoXpgInlnLrnmoTmuLjmiI8g6L+b5YWl5a2Q5ri45oiP55qE5oOF5Ya15LiLIOaJjeS/neeVmeWkp+WOhemAieWcuuaYvuekuiDpmLLmraLpl6rnjrDlpKfljoXnmoTpl67pophcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wTm9kZSA6Y2MuTm9kZSA9IEdsb2JhbC5QZXJzaXN0LmdldEZyb21Qb29sKGtleSlcclxuICAgICAgICAgICAgICAgICAgICBpZihjYy5pc1ZhbGlkKHRtcE5vZGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG1wTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcE5vZGUuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRtcE5vZGUgPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBlbHNlXHJcbiAgICAgICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgR2xvYmFsLlBlcnNpc3Quc2V0U3RhdGUoZmxhZylcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRqdWVzdENhbnZhc1NjcmVlblN0cmV0Y2goY2FudmFzOiBjYy5DYW52YXMpIHtcclxuICAgICAgICBsZXQgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8ub3JpZW50YXRpb25MYW5kc2NhcGUpIHtcclxuICAgICAgICAgICAgY2FudmFzLmRlc2lnblJlc29sdXRpb24gPSBjYy5zaXplKDEyODAsIDcyMCk7XHJcbiAgICAgICAgICAgIGxldCBkZXNpZ25TaXplID0gY2FudmFzLmRlc2lnblJlc29sdXRpb247XHJcbiAgICAgICAgICAgIGlmIChzaXplLndpZHRoIC8gc2l6ZS5oZWlnaHQgPj0gZGVzaWduU2l6ZS53aWR0aCAvIGRlc2lnblNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuZml0SGVpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5maXRXaWR0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmZpdEhlaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuZml0V2lkdGggPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FudmFzLmRlc2lnblJlc29sdXRpb24gPSBjYy5zaXplKDcyMCwgMTI4MCk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5maXRIZWlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2FudmFzLmZpdFdpZHRoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhZGRVSUxheWVyKHJvb3Q6IGNjLk5vZGUsIGxheWVyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IHJvb3QuZ2V0Q2hpbGRCeU5hbWUobGF5ZXIpO1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKGxheWVyKTtcclxuICAgICAgICAgICAgcm9vdC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXllck1hcFtsYXllcl0gPSBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMYXllcihrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllck1hcFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5rOo5YaMVUlcclxuICAgIHB1YmxpYyByZWdpc3RVSSh3bmRiYXNlOiBXbmRCYXNlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93TWFwW3duZGJhc2UubmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLph43lpI3ms6jlhoxVSVwiLCB3bmRiYXNlLm5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2luZG93TWFwW3duZGJhc2UubmFtZV0gPSB3bmRiYXNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIGdldFdpbmRvdzxUIGV4dGVuZHMgV25kQmFzZT4od25kTmFtZTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93TWFwW3duZE5hbWVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ5rOo5YaM55WM6Z2i77yB77yB77yB6ZyA6KaB5YWI5rOo5YaMXCIsIHduZE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdpbmRvdyA9IHRoaXMud2luZG93TWFwW3duZE5hbWVdO1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cgYXMgVDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNob3cod25kTmFtZTogc3RyaW5nLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2luZG93TWFwW3duZE5hbWVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ5rOo5YaM55WM6Z2i77yB77yB77yB6ZyA6KaB5YWI5rOo5YaMXCIsIHduZE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3aW5kb3cgPSB0aGlzLndpbmRvd01hcFt3bmROYW1lXSBhcyBXbmRCYXNlO1xyXG4gICAgICAgIHdpbmRvdy5hcmdzID0gYXJnc1xyXG4gICAgICAgIC8v55WM6Z2i5q2j5Zyo5Yqg6L29ICDlj6rorr7nva5hY3RpdmXlsZ7mgKdcclxuICAgICAgICBpZiAod2luZG93LmlzTG9hZGluZykge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+W3sue7j+WKoOi9vei/h1xyXG4gICAgICAgIGlmICh3aW5kb3cuaXNMb2FkZWQpIHtcclxuICAgICAgICAgICAgLy/nlYzpnaLlt7Lnu4/miZPlvIAgIOinpuWPkW9ucmVzaG93XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuYWN0aXZlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9Ub3Aod2luZG93KTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXNob3coKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9wZW5XaW5kb3dJbnRlcm5hbCh3aW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgd2luZG93LmxvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Mb2FkaW5nO1xyXG4gICAgICAgIGlmICh3aW5kb3cucmVzUGF0aCA9PSBudWxsIHx8IHdpbmRvdy5yZXNQYXRoID09IFwiXCIpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5pyq6K6+572u55WM6Z2i6LWE5rqQ6Lev5b6E77yB77yB77yBXCIsIHdpbmRvdy5uYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2luZG93LmRlc3RvcnlUeXBlID09IERlc3RvcnlUeXBlLlBlcnNpc3QpIHtcclxuICAgICAgICAgICAgbGV0IHRtcE5vZGUgPSBHbG9iYWwuUGVyc2lzdC5nZXRGcm9tUG9vbCh3aW5kb3cubmFtZSlcclxuICAgICAgICAgICAgaWYgKHRtcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25XaW5kb3dMb2FkZWQod2luZG93LCBudWxsLCB0bXBOb2RlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc291cmNlTWdyLmxvYWRSZXMod2luZG93LnJlc1BhdGgsIChlcnJvciwgcHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJzaG93IHdpbmRvd1wiLCB3bmROYW1lKVxyXG4gICAgICAgICAgICB0aGlzLm9uV2luZG93TG9hZGVkKHdpbmRvdywgZXJyb3IsIHByZWZhYik7XHJcbiAgICAgICAgfSwgbnVsbCwgbnVsbCwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSh3bmROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgd2luZG93ID0gdGhpcy5nZXRXaW5kb3c8V25kQmFzZT4od25kTmFtZSk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImNsb3NlIHduZFwiLCB3bmROYW1lKTtcclxuICAgICAgICBpZiAod2luZG93ID09IG51bGwgfHwgIXdpbmRvdy5pc0xvYWRlZCB8fCAhd2luZG93LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiLS0tLS1jbG9zZSBcIiArIHduZE5hbWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9AdG9kbyDmoLnmja7liqjnlLvnsbvlnovlhbPpl63nlYzpnaJcclxuICAgICAgICB0aGlzLnJlYWxDbG9zZSh3aW5kb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUhhbGxMb2FkaW5nKCkge1xyXG4gICAgICAgIC8vIGxldCBsb2FkaW5nID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJsb2FkaW5nXCIpO1xyXG4gICAgICAgIC8vIGlmKGxvYWRpbmcpXHJcbiAgICAgICAgLy8gICAgIGxvYWRpbmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dIYWxsTG9hZGluZygpIHtcclxuICAgICAgICAvLyBsZXQgbG9hZGluZyA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmdldENoaWxkQnlOYW1lKFwibG9hZGluZ1wiKTtcclxuICAgICAgICAvLyBpZihsb2FkaW5nKVxyXG4gICAgICAgIC8vICAgICBsb2FkaW5nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSh3bmROYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgd2luZG93ID0gdGhpcy5nZXRXaW5kb3c8V25kQmFzZT4od25kTmFtZSk7XHJcbiAgICAgICAgaWYgKHdpbmRvdyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2FkaW5nU3RhdGUgPT0gTG9hZGluZ1N0YXRlLk5vbmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAod2luZG93LmRlc3RvcnlUeXBlID09IERlc3RvcnlUeXBlLlBlcnNpc3QgJiYgd2luZG93LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmxvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Ob25lO1xyXG4gICAgICAgIHdpbmRvdy5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubm9kZSAhPSBudWxsICYmIGNjLmlzVmFsaWQod2luZG93Lm5vZGUpKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ub2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgd2luZG93Lm5vZGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cucmVsZWFzZVJlcygpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uV2luZG93TG9hZGVkKHdpbmRvdzogV25kQmFzZSwgZXJyb3IsIHByZWZhYiwgaXNOb2RlID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb1VSeWHuumUmVwiLCB3aW5kb3cubmFtZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm1zZ1wiLCBKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICBpZiAocHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy51aVJvb3QuaXNWYWxpZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHdpbmRvdy5sb2FkaW5nU3RhdGUgPSBMb2FkaW5nU3RhdGUuTG9hZGVkO1xyXG4gICAgICAgIGlmICh3aW5kb3cuZGVzdG9yeVR5cGUgPT0gRGVzdG9yeVR5cGUuUGVyc2lzdCkge1xyXG4gICAgICAgICAgICBpZiAoaXNOb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0Tm9kZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRtcE5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0Tm9kZSh0bXBOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNldE5vZGUoY2MuaW5zdGFudGlhdGUocHJlZmFiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAod2luZG93LmlzTmVlZERlbGF5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcHBIZWxwZXIuYWZ0ZXJXaW5kb3dJbml0KHdpbmRvdy5uYW1lLCB3aW5kb3cubm9kZSwgd2luZG93KVxyXG4gICAgICAgIHdpbmRvdy5ub2RlLmFjdGl2ZSA9IHdpbmRvdy5hY3RpdmU7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5jb21tb25CZyAhPSBudWxsICYmIHdpbmRvdy5jb21tb25CZy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmJnVGVtcGxhdGUpIHtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZyA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYmdUZW1wbGF0ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29tcCA9IEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KHdpbmRvdy5jb21tb25CZywgXCJcIiwgQmxhY2tCZ0NvbXApO1xyXG4gICAgICAgICAgICBjb21wLndpbmRvdyA9IHdpbmRvdztcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5jb21tb25CZykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0biA9IHdpbmRvdy5jb21tb25CZy5nZXRDb21wb25lbnQoWVhCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuID0gd2luZG93LmNvbW1vbkJnLmFkZENvbXBvbmVudChZWEJ1dHRvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnRyYW5zaXRpb24gPSBudWxsXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvbW1vbkJnLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYnRuLmlzQ2xpY2tWYWxpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5pc0NsaWNrVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBidG4uc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bi5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmlzQ2xpY2tWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFsQ2xvc2Uod2luZG93KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LmFuaW1Db21wID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQod2luZG93Lm5vZGUsIFwiXCIsIFVJQW5pbUNvbXBvbmVudCk7XHJcbiAgICAgICAgLy/pmLLmraLotYTmupDmsqHliqDovb3lrozlhbPpl61cclxuICAgICAgICBpZiAod2luZG93LmFjdGl2ZSB8fCB3aW5kb3cuaXNOZWVkRGVsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuV2luZG93SW50ZXJuYWwod2luZG93KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVhbENsb3NlKHdpbmRvdykge1xyXG4gICAgICAgIHdpbmRvdy5yZWFsQ2xvc2UoKTtcclxuICAgICAgICB0aGlzLnJlbW92ZVdpbmRvd0Zyb21TaG93TGlzdCh3aW5kb3cpO1xyXG4gICAgICAgIHRoaXMuZG9DbG9zZUFuaW0od2luZG93KVxyXG4gICAgICAgIC8vIHRoaXMuYWRqdXN0QmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvQ2xvc2VBbmltKHdpbmRvdykge1xyXG4gICAgICAgIGlmICh3aW5kb3cuYW5pbUNvbXAgJiYgd2luZG93LmxheWVyID09IHRoaXMuUG9wTGF5ZXIpIHtcclxuICAgICAgICAgICAgd2luZG93LmFuaW1Db21wLmRvUG9wdXBDbG9zZUFuaW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuY29tbW9uQmcpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/osIPmlbTlsYLnuqdcclxuICAgIHByaXZhdGUgYWRkVG9Ub3Aod2luZG93OiBXbmRCYXNlKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cuaXNMb2FkZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgbGF5ZXJWaWV3ID0gdGhpcy5sYXllck1hcFt3aW5kb3cubGF5ZXJdXHJcbiAgICAgICAgaWYgKGxheWVyVmlldyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxheWVyVmlldyA9IHRoaXMubGF5ZXJNYXBbdGhpcy5Qb3BMYXllcl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXdpbmRvdy5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKHdpbmRvdy5uYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxheWVyVmlldyA9PSBudWxsIHx8ICFsYXllclZpZXcuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5ub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgICAgICBpZiAod2luZG93LmxheWVyID09IHRoaXMuUG9wTGF5ZXIgJiYgd2luZG93LnNob3dCZyAmJiB3aW5kb3cuY29tbW9uQmcpIHtcclxuICAgICAgICAgICAgLy8gd2luZG93LmNvbW1vbkJnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jb21tb25CZy5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgbGF5ZXJWaWV3LmFkZENoaWxkKHdpbmRvdy5jb21tb25CZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxheWVyVmlldy5hZGRDaGlsZCh3aW5kb3cubm9kZSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9wZW5XaW5kb3dJbnRlcm5hbCh3aW5kb3c6IFduZEJhc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5zaG93V2luZG93TGlzdC5pbmRleE9mKHdpbmRvdykgPiAtMSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCIhISEhIOmHjeWkjWFkZCB3aW5kb3dcIiwgd2luZG93KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dXaW5kb3dMaXN0LnB1c2god2luZG93KTtcclxuICAgICAgICB0aGlzLmFkZFRvVG9wKHdpbmRvdyk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cuaXNOZWVkRGVsYXkpIHtcclxuICAgICAgICAgICAgd2luZG93LnRyeU9wZW4od2luZG93LmFyZ3MpO1xyXG4gICAgICAgICAgICB3aW5kb3cuYW5pbUNvbXAuYmcgPSB3aW5kb3cuY29tbW9uQmc7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hbmltQ29tcC51aSA9IHdpbmRvdy5ub2RlO1xyXG4gICAgICAgICAgICB3aW5kb3cuYW5pbUNvbXAudGFyZ2V0ID0gd2luZG93O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHdpbmRvdy5hcmdzKTtcclxuICAgICAgICAgICAgdGhpcy5vcGVuV2luZG93QnlMYXllcih3aW5kb3cpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgb3BlbldpbmRvd0J5TGF5ZXIod2luZG93OiBXbmRCYXNlKSB7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubGF5ZXIgPT0gdGhpcy5Qb3BMYXllcikge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgd2luZG93LmFuaW1Db21wLmJnID0gd2luZG93LmNvbW1vbkJnO1xyXG4gICAgICAgICAgICB3aW5kb3cuYW5pbUNvbXAudWkgPSB3aW5kb3cubm9kZTtcclxuICAgICAgICAgICAgd2luZG93LmFuaW1Db21wLnRhcmdldCA9IHdpbmRvdztcclxuICAgICAgICAgICAgd2luZG93LmFuaW1Db21wLmRvUG9wdXBPcGVuQW5pbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh3aW5kb3cubGF5ZXIgPT0gdGhpcy5GdWxsU2NyZWVuTGF5ZXIpIHtcclxuICAgICAgICAgICAgLy8gd2luZG93LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ub2RlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LmZyYW1lRW5kKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5ub2RlLm9wYWNpdHkgPSAyNTVcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZnRlck9wZW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlV2luZG93RnJvbVNob3dMaXN0KHdpbmRvdzogV25kQmFzZSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNob3dXaW5kb3dMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXaW5kb3dMaXN0W2ldID09IHdpbmRvdykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93V2luZG93TGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ29tbW9uQmcoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZU1nci5sb2FkUmVzKFwiaGFsbC9wcmVmYWJzL3VpL0NvbW1vbkJnXCIsIChlcnJvciwgcHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJoYWxsL3ByZWZhYnMvdWkvQ29tbW9uQmcgIOWKoOi9veWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmJnVGVtcGxhdGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICB0aGlzLmJnVGVtcGxhdGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHdpZGdldCA9IHRoaXMuYmdUZW1wbGF0ZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0LnRhcmdldCA9IHRoaXMuY2FudmFzTm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLmJnVGVtcGxhdGUuYWRkQ2hpbGQoYmcpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGVhckFsbFVJUHJlZmFiKCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLndpbmRvd01hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3Bvc2Uoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYmdUZW1wbGF0ZSAmJiBjYy5pc1ZhbGlkKHRoaXMuYmdUZW1wbGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5iZ1RlbXBsYXRlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1RlbXBsYXRlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93V2luZG93TGlzdCA9IFtdXHJcblxyXG4gICAgICAgIHRoaXMuZmFzdFRpcE1nci5jbGVhckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUFsbFVJUHJlZmFiKGlnbm9yZU1haW5MYXllciA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93SGFsbExvYWRpbmcoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2hvd1dpbmRvd0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNob3dXaW5kb3dMaXN0W2ldID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInNob3dXaW5kb3dMaXN0W2ldID09IG51bGwgfiEhISEhXCIsIGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1dpbmRvd0xpc3RbaV0ubGF5ZXIgPT0gdGhpcy5NYWluTGF5ZXIgJiYgaWdub3JlTWFpbkxheWVyXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKHRoaXMuc2hvd1dpbmRvd0xpc3RbaV0ubGF5ZXIgPT0gdGhpcy5GdWxsU2NyZWVuTGF5ZXIgJiYgaWdub3JlTWFpbkxheWVyKSkvL2dyYWNlIDIwMjAgMy4xOSDlpKfljoXot5/pmo/pgInlnLog5YiH5Zy65pmv5LiN5by65Yi25YWz6Zet6YCJ5Zy655WM6Z2iIOmYsuatoumXqueOsOWkp+WOheeahOmXrumimFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zaG93V2luZG93TGlzdFtpXS5uYW1lID09IFwiV25kTmV0V2FpdGluZ1wiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dXaW5kb3dMaXN0W2ldLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2NhbGVBbmltKHdpbmRvdzogV25kQmFzZSkge1xyXG4gICAgICAgIHdpbmRvdy5ub2RlLnNjYWxlID0gMC40O1xyXG4gICAgICAgIHdpbmRvdy5ub2RlLnJ1bkFjdGlvbihjYy5zY2FsZVRvKDAuMiwgMSkuZWFzaW5nKGNjLmVhc2VCYWNrT3V0KCkpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy5mYXN0VGlwTWdyLm9uVXBkYXRlKGR0KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tbWVzc2FnZWJveOaOpeWPoy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLyoqXHJcbiAgICAgKiDluKborabmiqVJY29u55qE5o+Q56S65by556qXXHJcbiAgICAgKiBAcGFyYW0gY29udGVudCDmmL7npLrmlofmnKxcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja1kg56Gu5a6a5Zue6LCDXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tOIOWPlua2iOaIluiAheWFs+mXreWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0FsZXJ0Qm94KGNvbnRlbnQ6IHN0cmluZywgY2FsbGJhY2tZPzogRnVuY3Rpb24sIGNhbGxiYWNrTj86IEZ1bmN0aW9uLCBhdXRvQ2xvc2UgPSB0cnVlLCBhdXRvUmVsZWFzZUZ1bmMgPSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBjb250ZW50LCAyLCBjYWxsYmFja1ksIGNhbGxiYWNrTiwgYXV0b0Nsb3NlLCBhdXRvUmVsZWFzZUZ1bmMsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj6rmnInnoa7lrprmjInpkq7nmoTmj5DnpLrlvLnnqpdcclxuICAgICAqIEBwYXJhbSBjb250ZW50IOaYvuekuuaWh+acrFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrWSDnoa7lrprlm57osINcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja04g5Y+W5raI5oiW6ICF5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93U2luZ2xlQm94KGNvbnRlbnQ6IHN0cmluZywgY2FsbGJhY2tZPzogRnVuY3Rpb24sIGNhbGxiYWNrTj86IEZ1bmN0aW9uLCBhdXRvQ2xvc2UgPSB0cnVlLCBhdXRvUmVsZWFzZUZ1bmMgPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TY2VuZU1hbmFnZXIuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5HYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJNZXNzYWdlQm94SW5HYW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqQXJyID0gW2NvbnRlbnQsIDIsIGNhbGxiYWNrWSwgY2FsbGJhY2tOLCBhdXRvQ2xvc2UsIGF1dG9SZWxlYXNlRnVuY107XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfTUVTU0FHRV9CT1gsIG9iakFycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBjb250ZW50LCAyLCBjYWxsYmFja1ksIGNhbGxiYWNrTiwgYXV0b0Nsb3NlLCBhdXRvUmVsZWFzZUZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93WWVzTm9Cb3goY29udGVudDogc3RyaW5nLCBjYWxsYmFja1k/OiBGdW5jdGlvbiwgY2FsbGJhY2tOPzogRnVuY3Rpb24sIGF1dG9DbG9zZSA9IHRydWUpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkdhbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYk1lc3NhZ2VCb3hJbkdhbWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvYmpBcnIgPSBbY29udGVudCwgMSwgY2FsbGJhY2tZLCBjYWxsYmFja04sIGF1dG9DbG9zZV07XHJcbiAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdhbWUuRVZFTlRfTUVTU0FHRV9CT1gsIG9iakFycik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBjb250ZW50LCAxLCBjYWxsYmFja1ksIGNhbGxiYWNrTiwgYXV0b0Nsb3NlKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5piv5ZCm5Zyo5a2Q5ri45oiP5YaF5aSE55CG5aSn5Y6FbWVzc2FnZWJveFxyXG4gICAgICogQHBhcmFtIGJNZXNzYWdlQm94IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0TWVzc2FnZUJveEluR2FtZShiTWVzc2FnZUJveDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuYk1lc3NhZ2VCb3hJbkdhbWUgPSBiTWVzc2FnZUJveDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKlxyXG4gICAgICog6YCa55SodGlwcyAg5pSv5oyB5a+M5paH5pysXHJcbiAgICAgKiBAcGFyYW0gbXNnIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZmFzdFRpcChtc2cpIHtcclxuICAgICAgICB0aGlzLmZhc3RUaXBNZ3Iuc2hvdyhtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S65qiq56uW5bGP5YiH5o2i5o+Q56S6VUlcclxuICAgICAqIEBwYXJhbSBjb21wZWxldGVDYWxsQmFjayDmj5DnpLrmkq3mlL7lrozku6XlkI7nmoTlm57osINcclxuICAgICAqIEBwYXJhbSBzaG93VGltZSDmj5DnpLrmmL7npLrml7bplb8o5Y2V5L2NOuenkilcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dQb3J0cmFpdFNjcmVlbk5vdGljZShjb21wZWxldGVDYWxsQmFjazogRnVuY3Rpb24sIHNob3dUaW1lPzogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwic2hvd1BvcnRyYWl0U2NyZWVuTm90aWNlKCkgY2FsbGVkISEhXCIpO1xyXG4gICAgICAgIHRoaXMuc2hvdyhcIlduZFNjcmVlblBvcnRyYWl0Tm90aWNlXCIsIGNvbXBlbGV0ZUNhbGxCYWNrLCBzaG93VGltZSk7XHJcbiAgICB9XHJcbn0iXX0=