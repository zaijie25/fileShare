
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/WebViewControl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcV2ViVmlld0NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBMEQ7QUFlcEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBQTtRQUtZLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixVQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtJQWlKN0IsQ0FBQztJQTlJRyw2QkFBSSxHQUFKO0lBRUEsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNiLG9DQUFXLEdBQVgsVUFBWSxHQUFVLEVBQUUsTUFBYSxFQUFDLGdCQUF1QixFQUFDLE1BQWMsRUFBQyxHQUF5QjtRQUF0RyxpQkE0Q0M7UUE1QzRFLG9CQUFBLEVBQUEsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07UUFDbEcsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksU0FBUyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxJQUFJO1FBQ3pDLElBQUksUUFBUSxHQUFHLE1B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QyxDQUFBO1lBQ3BFLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3hEO1FBQ0QsWUFBWTtRQUNaLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztJQUV2RixDQUFDO0lBR0Qsb0NBQVcsR0FBWDtRQUNJLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDM0QsSUFBRyxLQUFLLEVBQ1I7WUFDSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDbEI7SUFDTCxDQUFDO0lBckpnQixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBdUpsQztJQUFELHFCQUFDO0NBdkpELEFBdUpDLElBQUE7a0JBdkpvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2FtZVR5cGUgfSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9kYXRhL0dhbWVEYXRhXCI7XHJcbi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuaW1wb3J0IEhhbGxNb2RlbCBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlld0NvbnRyb2wge1xyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgc2NoZW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhhc0FwcGx5VG9wUG9pbnQgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc3R5bGUgPSAxOyAvL+m7mOiupOS4ujFcclxuICAgIHByaXZhdGUgd2ViVmlld0dhbWVQYW5lbDpjYy5Ob2RlO1xyXG4gICAgICAgIFxyXG4gICAgaW5pdCgpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpe1xyXG4gICAgICAgIGlmICh0aGlzLndlYlZpZXdHYW1lUGFuZWwpe1xyXG4gICAgICAgICAgICB0aGlzLndlYlZpZXdHYW1lUGFuZWwucmVtb3ZlRnJvbVBhcmVudCh0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLndlYlZpZXdHYW1lUGFuZWwuZGVzdHJveSgpXHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S655m+6IOcd2Vidmlld1xyXG4gICAgc2hvd1dlYlZpZXcodXJsOnN0cmluZyAsc2NoZW1lOnN0cmluZyxhY3Rpb25WaWV3SGlkZGVuOnN0cmluZyxwYXJlbnQ6Y2MuTm9kZSxnaWQgPSBHYW1lLkNvbnRyb2wuY3VyR2lkKXtcclxuICAgICAgICB0aGlzLnVybCA9IHVybDtcclxuICAgICAgICB0aGlzLnNjaGVtZSA9IHNjaGVtZTtcclxuICAgICAgICB0aGlzLmhhc0FwcGx5VG9wUG9pbnQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gZ2lkID09IDkwMDEgPyAxIDogLTEgLy/nq5blsY9cclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2lkKVxyXG4gICAgICAgIGxldCBnYW1lVHlwZSA9IGdhbWVJbmZvID8gZ2FtZUluZm8uZ2FtZVR5cGUgOiAtMVxyXG4gICAgICAgIGlmKGdhbWVUeXBlID09PSBHYW1lVHlwZS5BR0JHKXsgLy9BRyBCRyDlpJbmjqXmuLjmiI/nsbvlnotcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy53ZWJWaWV3R2FtZVBhbmVsKXtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKFwicmVzb3VyY2VzXCIsXCJoYWxsL3ByZWZhYnMvdWkvV2ViVmlld0dhbWVQYW5lbFwiLChlcnJvcixwcmVmYWIpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxvYWQgV2ViVmlld0dhbWVQYW5lbCBlcnJvclwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYilcclxuICAgICAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLndlYlZpZXdHYW1lUGFuZWwpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInNob3cgV2ViVmlld0dhbWUgLS1cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndlYlZpZXdHYW1lUGFuZWwucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBiZyA9IHRoaXMud2ViVmlld0dhbWVQYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsXCJzaG93V2ViVmlld1wiKVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic2hvdyBXZWJWaWV3R2FtZSBiZyDpmpDol48xMTExXCIpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQub3BlbkV4dGVybmFsR2FtZSh1cmwsc2NoZW1lLGFjdGlvblZpZXdIaWRkZW4sMixkaXJlY3Rpb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2UgeyBcclxuICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLndlYlZpZXdHYW1lUGFuZWwpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSB0aGlzLndlYlZpZXdHYW1lUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKVxyXG4gICAgICAgICAgICAgICAgaWYgKGJnKXtcclxuICAgICAgICAgICAgICAgICAgICBiZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInNob3cgV2ViVmlld0dhbWUgYmcg6ZqQ6JePMjIyXCIpXHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5vcGVuRXh0ZXJuYWxHYW1lKHVybCxzY2hlbWUsYWN0aW9uVmlld0hpZGRlbiwyLGRpcmVjdGlvbilcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/ljp/nlJ/osIPnlKhqcyBcclxuICAgIG5hdGl2ZTJKU0NhbGxiYWNrKHN0YXRlOlN0cmluZyx1cmw6U3RyaW5nKXtcclxuICAgICAgICBsZXQgaGFsbE1vZGVsOiBIYWxsTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpXHJcbiAgICAgICAgaWYoc3RhdGU9PVwiMVwiKXsvL+W8gOWni+WKoOi9vVxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiV2ViVmlld0dhbWUgLS3lvIDlp4vliqDovb1cIik7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGU9PVwiMlwiKXsvL+WKoOi9veaIkOWKn1xyXG4gICAgICAgICAgICAvL+i/m+a4uOaIj+WFs+mXreWkp+WOhemfs+S5kFxyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8uc3RvcE11c2ljKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLFwic2hvd1dlYlZpZXdcIilcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0FwcGx5VG9wUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFzQXBwbHlUb3BQb2ludCA9IHRydWU7IFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBoYWxsTW9kZWwucmVxdWVzdEFwcGx5VG9wUG9pbnQoR2FtZS5Db250cm9sLmN1ckdpZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy53ZWJWaWV3R2FtZVBhbmVsKXtcclxuICAgICAgICAgICAgICAgIGxldCBiZyA9IHRoaXMud2ViVmlld0dhbWVQYW5lbC5nZXRDaGlsZEJ5TmFtZShcImJnXCIpXHJcbiAgICAgICAgICAgICAgICBpZiAoYmcpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIldlYlZpZXdHYW1lIC0taHR0cOWKoOi9veaIkOWKn1wiKTtcclxuICAgICAgICB9ZWxzZSBpZihzdGF0ZT09XCIzXCIpey8vaHR0cOWKoOi9veWksei0pSw0MDRcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2NoZW1lKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuaGlkZVdlYlZpZXcoKVxyXG4gICAgICAgICAgICAgICAgLy8gR2xvYmFsLk5hdGl2ZUV2ZW50LmNsb3NlQlMoKVxyXG4gICAgICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoXCLnvZHnu5zlvILluLjvvIzor7fph43or5UtMVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiV2ViVmlld0dhbWUgLS1odHRw5Yqg6L295aSx6LSlLDQwNFwiKTtcclxuICAgICAgICB9ZWxzZSBpZihzdGF0ZT09XCI0XCIpey8v5rKh5pyJ572RXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjaGVtZSl7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmhpZGVXZWJWaWV3KClcclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5OYXRpdmVFdmVudC5jbG9zZUJTKClcclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKFwi572R57uc5byC5bi477yM6K+36YeN6K+VLTJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIldlYlZpZXdHYW1lIC0t5rKh5pyJ572RXCIpO1xyXG4gICAgICAgIH1lbHNlIGlmKHN0YXRlPT1cIjVcIil7Ly9zaGVtYeeahOaLpuaIqlxyXG5cclxuICAgICAgICAgICAgaGFsbE1vZGVsLnJlcXVlc3RBcHBseURvd25Qb2ludChHYW1lLkNvbnRyb2wuY3VyR2lkKVxyXG4gICAgICAgICAgICB0aGlzLmhpZGVXZWJWaWV3KClcclxuICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNsb3NlRXh0ZXJuYWxHYW1lKClcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIldlYlZpZXdHYW1lIC0tc2hlbWHnmoTmi6bmiKpcIik7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGU9PVwiNlwiKXsvL+WOn+eUn+i/m+ihjOS6huWIt+aWsFxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiV2ViVmlld0dhbWUgLS3ljp/nlJ/ov5vooYzkuobliLfmlrBcIik7XHJcbiAgICAgICAgfWVsc2UgaWYoc3RhdGU9PVwiN1wiKXsvL+WOn+eUn+mAgOWHuua4uOaIj1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiV2ViVmlld0dhbWUgLS3ljp/nlJ/pgIDlh7rmuLjmiI9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVdlYlZpZXcoKVxyXG4gICAgICAgICAgICBoYWxsTW9kZWwucmVxdWVzdEFwcGx5RG93blBvaW50KEdhbWUuQ29udHJvbC5jdXJHaWQpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiV2ViVmlld0dhbWUgLS1zdGF0ZeWFtuS7luaDheWGtVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBoaWRlV2ViVmlldygpIHtcclxuICAgICAgICB0aGlzLnBsYXlIYWxsQkdNKClcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VXZWJWaWV3R2FtZSlcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORyxcInNob3dXZWJWaWV3XCIpXHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy53ZWJWaWV3R2FtZVBhbmVsKSAmJiB0aGlzLndlYlZpZXdHYW1lUGFuZWwuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbC5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld0dhbWVQYW5lbC5kZXN0cm95KClcclxuICAgICAgICAgICAgdGhpcy53ZWJWaWV3R2FtZVBhbmVsID0gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aciei/h+S4iuWIhuaJjeS4i+WIhlxyXG4gICAgICAgIGlmICh0aGlzLmhhc0FwcGx5VG9wUG9pbnQpe1xyXG4gICAgICAgICAgICBsZXQgaGFsbE1vZGVsOiBIYWxsTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpXHJcbiAgICAgICAgICAgIGhhbGxNb2RlbC5yZXF1ZXN0QXBwbHlEb3duUG9pbnQoIEdhbWUuQ29udHJvbC5jdXJHaWQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6Z2Z6buY6K+35rGC5Yi35paw546p5a625pWw5o2uXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRVc2VySW5mbywge30sbnVsbCxudWxsLGZhbHNlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcGxheUhhbGxCR00oKXtcclxuICAgICAgICB2YXIgbW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgaWYobW9kZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5Jbml0QmdtKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==