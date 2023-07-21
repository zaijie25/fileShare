
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/LoadingFacade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'decd6zU5CNIBoJEyeDpmM5s', 'LoadingFacade');
// hall/scripts/logic/core/loadingMVC/LoadingFacade.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingConst_1 = require("./LoadingConst");
var Global_1 = require("../Global");
var Game_1 = require("../Game");
var ViewSet_1 = require("../game/ViewSet");
var Logger_1 = require("../../../framework/debug/Logger");
var LoadingMediator_1 = require("./LoadingMediator");
var PreLoadProxy_1 = require("./PreLoadProxy");
var PvpSitHelper_1 = require("../game/pvp/PvpSitHelper");
var PVPPlayerData_1 = require("../game/pvp/PVPPlayerData");
var EventDispatcher_1 = require("../../../framework/event/EventDispatcher");
var NetEvent_1 = require("../net/hall/NetEvent");
var GlobalEvent_1 = require("../GlobalEvent");
var AppHelper_1 = require("../tool/AppHelper");
var HeadTipsManager_1 = require("../tool/HeadTipsManager");
var TaskManager_1 = require("../tool/TaskManager");
var AppHotUpdateProxy_1 = require("./AppHotUpdateProxy");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingFacade = /** @class */ (function (_super) {
    __extends(LoadingFacade, _super);
    function LoadingFacade() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onResume = function () {
            Logger_1.Logger.log("---------LoadingFacade----------onResume---------");
            this.sendNotification(LoadingConst_1.default.CHCEK_HOTUPDATE_PROGRESS);
        };
        return _this;
    }
    LoadingFacade_1 = LoadingFacade;
    LoadingFacade.prototype.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.gameStartUp();
        Global_1.default.Event.on(GlobalEvent_1.default.DunInitFinish, this, this.onDunInitFinish);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    };
    LoadingFacade.initGlobal = function () {
        window.Global = Global_1.default;
        window.Game = Game_1.default;
        window.Logger = Logger_1.Logger;
        window.ViewSet = ViewSet_1.default;
        window.PVPSitHelper = PvpSitHelper_1.default;
        window.PVPPlayerData = PVPPlayerData_1.default;
        window.NetAppface = NetEvent_1.NetAppface;
        window.EventDispatcher = EventDispatcher_1.default;
        window.GlobalEvent = GlobalEvent_1.default;
        window.HeadTipsManager = HeadTipsManager_1.default;
        window.TaskManager = TaskManager_1.default;
        Global_1.default.setup();
        Game_1.default.setup();
        AppHelper_1.default.init();
    };
    //初始化游戏内相关配置
    LoadingFacade.prototype.gameStartUp = function () {
        Logger_1.Logger.error("gameStartUp");
        LoadingFacade_1.initGlobal();
        //初始化section  注册ui  model
        Global_1.default.UI.initUIRoot();
        //初始化常驻节点
        Global_1.default.Persist.init();
        // if(!Global.SectionManager.hasSection("hallSection"))
        // {
        //     Global.SectionManager.register("hallSection", new HallSection());   
        // }
        // Global.SectionManager.callSectionInit("hallSection");
        // Global.UI.initUIRoot();
        Global_1.default.ModuleManager.loadSkinModuleCfg(Global_1.default.Setting.SkinConfig.moduleCfg);
        Global_1.default.Language.registLanguage("hall/config/language");
        cc.game.setFrameRate(Global_1.default.Setting.FPSConfig);
    };
    LoadingFacade.prototype.startUp = function (manifest, node, isStartUpdate, serverType) {
        Global_1.default.NativeEvent.Init();
        this.manifest = manifest;
        // Logger.log("--------manifest url -----" + this.manifest.nativeUrl)
        //正式环境下强制热更，后续有不热更需求再更新逻辑
        if (!CC_PREVIEW)
            isStartUpdate = true;
        Global_1.default.Setting.isStartHotUpdate = isStartUpdate;
        Global_1.default.Setting.serverType = serverType;
        this.registerProxy(new PreLoadProxy_1.default(this.manifest[this.manifest.length - 1]));
        this.registerProxy(new AppHotUpdateProxy_1.default(this.manifest));
        //this.registerProxy(new HotUpdateProxy(this.manifest))
        this.registerMediator(new LoadingMediator_1.default(node));
        this.sendNotification(LoadingConst_1.default.START_UP);
    };
    LoadingFacade.prototype.onDunInitFinish = function () {
        this.sendNotification(LoadingConst_1.default.DUN_INIT_FINISH);
    };
    LoadingFacade.prototype.unregisterFacade = function () {
        this.removeCommand(LoadingConst_1.default.START_UP);
        this.removeMediator(LoadingMediator_1.default.NAME);
        //this.removeProxy(HotUpdateProxy.NAME)
        this.removeProxy(AppHotUpdateProxy_1.default.NAME);
        Global_1.default.Event.off(GlobalEvent_1.default.DunInitFinish, this, this.onDunInitFinish);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    };
    LoadingFacade.releaseInstance = function () {
        var instance = LoadingFacade_1.instanceMap[LoadingFacade_1.NAME];
        if (instance) {
            instance.unregisterFacade();
            LoadingFacade_1.removeCore(LoadingFacade_1.NAME);
        }
        return;
    };
    Object.defineProperty(LoadingFacade, "Instance", {
        get: function () {
            if (!LoadingFacade_1.instanceMap[LoadingFacade_1.NAME])
                LoadingFacade_1.instanceMap[LoadingFacade_1.NAME] = new LoadingFacade_1(LoadingFacade_1.NAME);
            return (LoadingFacade_1.instanceMap[LoadingFacade_1.NAME]);
        },
        enumerable: false,
        configurable: true
    });
    var LoadingFacade_1;
    LoadingFacade.NAME = "LoadingFacade";
    LoadingFacade = LoadingFacade_1 = __decorate([
        ccclass
    ], LoadingFacade);
    return LoadingFacade;
}(puremvc.Facade));
exports.default = LoadingFacade;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXExvYWRpbmdGYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWtDO0FBRWxDLG9DQUErQjtBQUMvQixnQ0FBMkI7QUFDM0IsMkNBQXNDO0FBQ3RDLDBEQUF5RDtBQUN6RCxxREFBNkM7QUFFN0MsK0NBQTBDO0FBQzFDLHlEQUFvRDtBQUNwRCwyREFBc0Q7QUFDdEQsNEVBQXVFO0FBQ3ZFLGlEQUFrRDtBQUNsRCw4Q0FBeUM7QUFDekMsK0NBQTBDO0FBQzFDLDJEQUFzRDtBQUN0RCxtREFBOEM7QUFDOUMseURBQW9EO0FBRTlDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTJDLGlDQUFjO0lBQXpEO1FBQUEscUVBa0dDO1FBeEZHLGNBQVEsR0FBRztZQUNQLGVBQU0sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBQ3pELENBQUMsQ0FBQTs7SUFxRkwsQ0FBQztzQkFsR29CLGFBQWE7SUFHOUIsNENBQW9CLEdBQXBCO1FBQ0ksaUJBQU0sb0JBQW9CLFdBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFD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LENBQUMsTUFBTSxHQWtHeEQ7a0JBbEdvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnN0IGZyb20gJy4vTG9hZGluZ0NvbnN0J1xyXG5pbXBvcnQgU3RhcnRVcENvbW1hbmQgZnJvbSAnLi9Mb2FkaW5nU3RhcnRVcENtZCdcclxuaW1wb3J0IEdsb2JhbCBmcm9tIFwiLi4vR2xvYmFsXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9HYW1lXCI7XHJcbmltcG9ydCBWaWV3U2V0IGZyb20gXCIuLi9nYW1lL1ZpZXdTZXRcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9kZWJ1Zy9Mb2dnZXJcIjtcclxuaW1wb3J0IFZpZXdNZWRpYXRvciBmcm9tICcuL0xvYWRpbmdNZWRpYXRvcic7XHJcbmltcG9ydCBIb3RVcGRhdGVQcm94eSBmcm9tICcuL0hvdFVwZGF0ZVByb3h5JztcclxuaW1wb3J0IFByZUxvYWRQcm94eSBmcm9tICcuL1ByZUxvYWRQcm94eSc7XHJcbmltcG9ydCBQVlBTaXRIZWxwZXIgZnJvbSBcIi4uL2dhbWUvcHZwL1B2cFNpdEhlbHBlclwiO1xyXG5pbXBvcnQgUFZQUGxheWVyRGF0YSBmcm9tIFwiLi4vZ2FtZS9wdnAvUFZQUGxheWVyRGF0YVwiO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tICcuLi9uZXQvaGFsbC9OZXRFdmVudCc7XHJcbmltcG9ydCBHbG9iYWxFdmVudCBmcm9tICcuLi9HbG9iYWxFdmVudCc7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSAnLi4vdG9vbC9BcHBIZWxwZXInO1xyXG5pbXBvcnQgSGVhZFRpcHNNYW5hZ2VyIGZyb20gJy4uL3Rvb2wvSGVhZFRpcHNNYW5hZ2VyJztcclxuaW1wb3J0IFRhc2tNYW5hZ2VyIGZyb20gJy4uL3Rvb2wvVGFza01hbmFnZXInO1xyXG5pbXBvcnQgQXBwSG90VXBkYXRlUHJveHkgZnJvbSAnLi9BcHBIb3RVcGRhdGVQcm94eSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ0ZhY2FkZSBleHRlbmRzIHB1cmVtdmMuRmFjYWRlIHtcclxuICAgIHB1YmxpYyBtYW5pZmVzdDogY2MuQXNzZXRbXTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTkFNRSA9IFwiTG9hZGluZ0ZhY2FkZVwiO1xyXG4gICAgaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB0aGlzLmdhbWVTdGFydFVwKCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LkR1bkluaXRGaW5pc2gsIHRoaXMsIHRoaXMub25EdW5Jbml0RmluaXNoKTtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZXN1bWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLUxvYWRpbmdGYWNhZGUtLS0tLS0tLS0tb25SZXN1bWUtLS0tLS0tLS1cIilcclxuICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oQ29uc3QuQ0hDRUtfSE9UVVBEQVRFX1BST0dSRVNTKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaW5pdEdsb2JhbCgpXHJcbiAgICB7XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5HbG9iYWwgPSBHbG9iYWw7XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5HYW1lID0gR2FtZTtcclxuICAgICAgICAoPGFueT53aW5kb3cpLkxvZ2dlciA9IExvZ2dlcjtcclxuICAgICAgICAoPGFueT53aW5kb3cpLlZpZXdTZXQgPSBWaWV3U2V0O1xyXG4gICAgICAgICg8YW55PndpbmRvdykuUFZQU2l0SGVscGVyID0gUFZQU2l0SGVscGVyO1xyXG4gICAgICAgICg8YW55PndpbmRvdykuUFZQUGxheWVyRGF0YSA9IFBWUFBsYXllckRhdGE7XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5OZXRBcHBmYWNlID0gTmV0QXBwZmFjZTtcclxuICAgICAgICAoPGFueT53aW5kb3cpLkV2ZW50RGlzcGF0Y2hlciA9IEV2ZW50RGlzcGF0Y2hlcjtcclxuICAgICAgICAoPGFueT53aW5kb3cpLkdsb2JhbEV2ZW50ID0gR2xvYmFsRXZlbnQ7XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5IZWFkVGlwc01hbmFnZXIgPSBIZWFkVGlwc01hbmFnZXI7XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5UYXNrTWFuYWdlciA9IFRhc2tNYW5hZ2VyO1xyXG5cclxuICAgICAgICBHbG9iYWwuc2V0dXAoKTtcclxuICAgICAgICBHYW1lLnNldHVwKCk7XHJcbiAgICAgICAgQXBwSGVscGVyLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIneWni+WMlua4uOaIj+WGheebuOWFs+mFjee9rlxyXG4gICAgcHVibGljIGdhbWVTdGFydFVwKCkge1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImdhbWVTdGFydFVwXCIpO1xyXG4gICAgICAgIExvYWRpbmdGYWNhZGUuaW5pdEdsb2JhbCgpXHJcbiAgICAgICAgLy/liJ3lp4vljJZzZWN0aW9uICDms6jlhox1aSAgbW9kZWxcclxuICAgICAgICBHbG9iYWwuVUkuaW5pdFVJUm9vdCgpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5bi46am76IqC54K5XHJcbiAgICAgICAgR2xvYmFsLlBlcnNpc3QuaW5pdCgpO1xyXG4gICAgICAgIC8vIGlmKCFHbG9iYWwuU2VjdGlvbk1hbmFnZXIuaGFzU2VjdGlvbihcImhhbGxTZWN0aW9uXCIpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgR2xvYmFsLlNlY3Rpb25NYW5hZ2VyLnJlZ2lzdGVyKFwiaGFsbFNlY3Rpb25cIiwgbmV3IEhhbGxTZWN0aW9uKCkpOyAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBHbG9iYWwuU2VjdGlvbk1hbmFnZXIuY2FsbFNlY3Rpb25Jbml0KFwiaGFsbFNlY3Rpb25cIik7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLmluaXRVSVJvb3QoKTtcclxuICAgICAgICBHbG9iYWwuTW9kdWxlTWFuYWdlci5sb2FkU2tpbk1vZHVsZUNmZyhHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLm1vZHVsZUNmZylcclxuICAgICAgICBHbG9iYWwuTGFuZ3VhZ2UucmVnaXN0TGFuZ3VhZ2UoXCJoYWxsL2NvbmZpZy9sYW5ndWFnZVwiKTtcclxuICAgICAgICBjYy5nYW1lLnNldEZyYW1lUmF0ZShHbG9iYWwuU2V0dGluZy5GUFNDb25maWcpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGFydFVwKG1hbmlmZXN0LCBub2RlLCBpc1N0YXJ0VXBkYXRlLCBzZXJ2ZXJUeXBlKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LkluaXQoKTtcclxuICAgICAgICB0aGlzLm1hbmlmZXN0ID0gbWFuaWZlc3Q7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZyhcIi0tLS0tLS0tbWFuaWZlc3QgdXJsIC0tLS0tXCIgKyB0aGlzLm1hbmlmZXN0Lm5hdGl2ZVVybClcclxuICAgICAgICAvL+ato+W8j+eOr+Wig+S4i+W8uuWItueDreabtO+8jOWQjue7reacieS4jeeDreabtOmcgOaxguWGjeabtOaWsOmAu+i+kVxyXG4gICAgICAgIGlmKCFDQ19QUkVWSUVXKVxyXG4gICAgICAgICAgICBpc1N0YXJ0VXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5pc1N0YXJ0SG90VXBkYXRlID0gaXNTdGFydFVwZGF0ZTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zZXJ2ZXJUeXBlID0gc2VydmVyVHlwZTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyUHJveHkobmV3IFByZUxvYWRQcm94eSh0aGlzLm1hbmlmZXN0W3RoaXMubWFuaWZlc3QubGVuZ3RoIC0gMV0pKVxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJQcm94eShuZXcgQXBwSG90VXBkYXRlUHJveHkodGhpcy5tYW5pZmVzdCkpXHJcbiAgICAgICAgLy90aGlzLnJlZ2lzdGVyUHJveHkobmV3IEhvdFVwZGF0ZVByb3h5KHRoaXMubWFuaWZlc3QpKVxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNZWRpYXRvcihuZXcgVmlld01lZGlhdG9yKG5vZGUpKVxyXG4gICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihDb25zdC5TVEFSVF9VUClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EdW5Jbml0RmluaXNoKCl7XHJcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LkRVTl9JTklUX0ZJTklTSClcclxuICAgIH1cclxuXHJcbiAgICB1bnJlZ2lzdGVyRmFjYWRlKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ29tbWFuZChDb25zdC5TVEFSVF9VUClcclxuICAgICAgICB0aGlzLnJlbW92ZU1lZGlhdG9yKFZpZXdNZWRpYXRvci5OQU1FKVxyXG4gICAgICAgIC8vdGhpcy5yZW1vdmVQcm94eShIb3RVcGRhdGVQcm94eS5OQU1FKVxyXG4gICAgICAgIHRoaXMucmVtb3ZlUHJveHkoQXBwSG90VXBkYXRlUHJveHkuTkFNRSlcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LkR1bkluaXRGaW5pc2gsIHRoaXMsIHRoaXMub25EdW5Jbml0RmluaXNoKTtcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25SZXN1bWUsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKSB7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gTG9hZGluZ0ZhY2FkZS5pbnN0YW5jZU1hcFtMb2FkaW5nRmFjYWRlLk5BTUVdXHJcbiAgICAgICAgaWYgKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGluc3RhbmNlLnVucmVnaXN0ZXJGYWNhZGUoKTtcclxuICAgICAgICAgICAgTG9hZGluZ0ZhY2FkZS5yZW1vdmVDb3JlKExvYWRpbmdGYWNhZGUuTkFNRSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBMb2FkaW5nRmFjYWRlIHtcclxuICAgICAgICBpZiAoIUxvYWRpbmdGYWNhZGUuaW5zdGFuY2VNYXBbTG9hZGluZ0ZhY2FkZS5OQU1FXSlcclxuICAgICAgICAgICAgTG9hZGluZ0ZhY2FkZS5pbnN0YW5jZU1hcFtMb2FkaW5nRmFjYWRlLk5BTUVdID0gbmV3IExvYWRpbmdGYWNhZGUoTG9hZGluZ0ZhY2FkZS5OQU1FKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIDxMb2FkaW5nRmFjYWRlPjxhbnk+KExvYWRpbmdGYWNhZGUuaW5zdGFuY2VNYXBbTG9hZGluZ0ZhY2FkZS5OQU1FXSk7XHJcbiAgICB9XHJcbn1cclxuIl19