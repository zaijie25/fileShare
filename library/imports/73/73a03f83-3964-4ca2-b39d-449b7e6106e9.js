"use strict";
cc._RF.push(module, '73a03+DOWRMorOdRJt+YQbp', 'WebViewControl');
// hall/scripts/logic/core/component/WebViewControl.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameData_1 = require("../../hallcommon/data/GameData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WebViewControl = /** @class */ (function () {
    function WebViewControl() {
        this.hasApplyTopPoint = false;
        this.style = 1; //默认为1
    }
    WebViewControl.prototype.init = function () {
    };
    WebViewControl.prototype.clear = function () {
        if (this.webViewGamePanel) {
            this.webViewGamePanel.removeFromParent(true);
            this.webViewGamePanel.destroy();
            this.webViewGamePanel = null;
        }
    };
    //显示百胜webview
    WebViewControl.prototype.showWebView = function (url, scheme, actionViewHidden, parent, gid) {
        var _this = this;
        if (gid === void 0) { gid = Game.Control.curGid; }
        this.url = url;
        this.scheme = scheme;
        this.hasApplyTopPoint = false;
        var direction = gid == 9001 ? 1 : -1; //竖屏
        var gameInfo = Global.GameData.getGameInfo(gid);
        var gameType = gameInfo ? gameInfo.gameType : -1;
        if (gameType === GameData_1.GameType.AGBG) { //AG BG 外接游戏类型
            this.style = 2;
        }
        if (!this.webViewGamePanel) {
            Global.ResourceManager.loadBundleRes("resources", "hall/prefabs/ui/WebViewGamePanel", function (error, prefab) {
                if (error) {
                    Logger.error("load WebViewGamePanel error");
                    return;
                }
                _this.webViewGamePanel = cc.instantiate(prefab);
                _this.webViewGamePanel.active = true;
                if (cc.isValid(_this.webViewGamePanel)) {
                    Logger.error("show WebViewGame --");
                    _this.webViewGamePanel.parent = parent;
                    var bg = _this.webViewGamePanel.getChildByName("bg");
                    if (bg) {
                        bg.active = false;
                    }
                }
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "showWebView");
                Logger.error("show WebViewGame bg 隐藏1111");
                Global.NativeEvent.openExternalGame(url, scheme, actionViewHidden, 2, direction);
            });
        }
        else {
            if (cc.isValid(this.webViewGamePanel)) {
                var bg = this.webViewGamePanel.getChildByName("bg");
                if (bg) {
                    bg.active = false;
                }
                this.webViewGamePanel.active = true;
            }
            Logger.error("show WebViewGame bg 隐藏222");
            Global.NativeEvent.openExternalGame(url, scheme, actionViewHidden, 2, direction);
        }
    };
    //原生调用js 
    WebViewControl.prototype.native2JSCallback = function (state, url) {
        var hallModel = Global.ModelManager.getModel("HallModel");
        if (state == "1") { //开始加载
            Logger.log("WebViewGame --开始加载");
        }
        else if (state == "2") { //加载成功
            //进游戏关闭大厅音乐
            Global.Audio.stopMusic();
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "showWebView");
            if (!this.hasApplyTopPoint) {
                this.hasApplyTopPoint = true;
                hallModel.requestApplyTopPoint(Game.Control.curGid);
            }
            if (this.webViewGamePanel) {
                var bg = this.webViewGamePanel.getChildByName("bg");
                if (bg) {
                    bg.active = true;
                }
            }
            Logger.log("WebViewGame --http加载成功");
        }
        else if (state == "3") { //http加载失败,404
            if (this.scheme) {
                // this.hideWebView()
                // Global.NativeEvent.closeBS()
                // Global.UI.fastTip("网络异常，请重试-1");
            }
            Logger.log("WebViewGame --http加载失败,404");
        }
        else if (state == "4") { //没有网
            if (this.scheme) {
                // this.hideWebView()
                // Global.NativeEvent.closeBS()
                // Global.UI.fastTip("网络异常，请重试-2");
            }
            Logger.log("WebViewGame --没有网");
        }
        else if (state == "5") { //shema的拦截
            hallModel.requestApplyDownPoint(Game.Control.curGid);
            this.hideWebView();
            Global.NativeEvent.closeExternalGame();
            Logger.log("WebViewGame --shema的拦截");
        }
        else if (state == "6") { //原生进行了刷新
            Logger.log("WebViewGame --原生进行了刷新");
        }
        else if (state == "7") { //原生退出游戏
            Logger.log("WebViewGame --原生退出游戏");
            this.hideWebView();
            hallModel.requestApplyDownPoint(Game.Control.curGid);
        }
        else {
            Logger.log("WebViewGame --state其他情况");
        }
    };
    WebViewControl.prototype.hideWebView = function () {
        this.playHallBGM();
        Global.Event.event(GlobalEvent.CloseWebViewGame);
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "showWebView");
        if (cc.isValid(this.webViewGamePanel) && this.webViewGamePanel.active) {
            this.webViewGamePanel.removeFromParent();
            this.webViewGamePanel.destroy();
            this.webViewGamePanel = null;
        }
        //有过上分才下分
        if (this.hasApplyTopPoint) {
            var hallModel = Global.ModelManager.getModel("HallModel");
            hallModel.requestApplyDownPoint(Game.Control.curGid);
        }
        //静默请求刷新玩家数据
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserInfo, {}, null, null, false);
    };
    WebViewControl.prototype.playHallBGM = function () {
        var model = Global.ModelManager.getModel("PlayerInfoModel");
        if (model) {
            model.InitBgm();
        }
    };
    WebViewControl = __decorate([
        ccclass
    ], WebViewControl);
    return WebViewControl;
}());
exports.default = WebViewControl;

cc._RF.pop();