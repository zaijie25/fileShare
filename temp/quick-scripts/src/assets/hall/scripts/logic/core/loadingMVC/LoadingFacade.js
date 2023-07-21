"use strict";
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