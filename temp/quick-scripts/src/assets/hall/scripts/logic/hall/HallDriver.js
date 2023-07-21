"use strict";
cc._RF.push(module, 'f6c49H4RJpEOKEDbfW2p03q', 'HallDriver');
// hall/scripts/logic/hall/HallDriver.ts

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
var HallFacade_1 = require("./MVC/HallFacade");
var SceneManager_1 = require("../core/scene/SceneManager");
var LoadingFacade_1 = require("../core/loadingMVC/LoadingFacade");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HallDriver = /** @class */ (function (_super) {
    __extends(HallDriver, _super);
    function HallDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hallSectionName = "hallSection";
        _this.startTime = 0;
        _this.requireList = [];
        _this.requireAtlasList = [];
        // 预加载需要动态变换的spine
        _this.requireGameIconList = [];
        _this.dependenceCount = 0;
        //预加载类型数量
        _this.DEPENCE_COUNT = 3;
        return _this;
        // update (dt) {}
    }
    HallDriver_1 = HallDriver;
    HallDriver.prototype.onLoad = function () {
        this.loadingNode = cc.find("loading/loadingBar", this.node);
        var bgNode = cc.find("loading/bg", this.node);
        if (bgNode)
            this.bg = bgNode.getComponent(cc.Sprite);
        var silderNode = cc.find("loading/loadingBar/bar_1_1", this.node);
        var checkNode = cc.find("loading/checkNode", this.node);
        var checkNodeSprite = null;
        var infoLabel = null;
        if (checkNode) {
            checkNodeSprite = checkNode.getComponent(cc.Sprite);
            var infoLabelNode = checkNode.getChildByName("infoLabel");
            if (infoLabelNode) {
                infoLabel = infoLabelNode.getComponent(cc.Label);
            }
        }
        if (silderNode) {
            this.slider = silderNode.getComponent(cc.ProgressBar);
            this.slider.progress = 0;
        }
        this.sceneSetup();
    };
    HallDriver.prototype.sceneSetup = function () {
        if (window["Global"] == null) {
            LoadingFacade_1.default.initGlobal();
            Logger.error('Global not init!!!!');
        }
        this.dependenceCount = 0;
        //初始化mvc
        HallFacade_1.default.Instance.startUp();
        //初始化section  注册ui  model
        // if (!Global.SectionManager.hasSection(this.hallSectionName)) {
        //     Global.SectionManager.register(this.hallSectionName, new HallSection());
        // }
        // Global.SectionManager.callSectionInit(this.hallSectionName);
        //初始化update驱动  初始化timer
        Global.Component.initDriver();
        cc.game.setFrameRate(Global.Setting.FPSConfig);
        Global.UI.initUIRoot(!HallDriver_1.PRELOAD_FINISH);
        // Global.Audio.playHallBGM();//xiaoc 2019-10-28 背景音乐的播放在下面的函数中处理PlayerInfoModel.InitBgm();
        this.requireAtlasList = Global.Setting.SkinConfig.requireAtlasList;
        this.requireList = Global.Setting.SkinConfig.requireList;
        this.requireGameIconList = Global.Setting.SkinConfig.requireGameIconList;
        if (!HallDriver_1.PRELOAD_FINISH) {
            Global.ResourceManager.releaseHelper.recordUnusedAsset(this.requireGameIconList, null);
            this.updateNodeAcvite();
            this.startTime = Date.now();
            this.preLoadRes();
            //添加常驻节点   防止部分内置资源被删除
            Global.ResourceManager.loadRes("hall/effect/notDestroy", function (error, prefab) {
                if (prefab) {
                    var node = cc.instantiate(prefab);
                    Global.Persist.saveToPool("keep", node);
                }
            });
            Global.ResourceManager.loadRes("hall/prefabs/ui/ChooseRoom/GameLobbyShellUI", function (error, prefab) {
                if (prefab) {
                    var node = cc.instantiate(prefab);
                    Global.Persist.saveToPool("WndGameLobbyShell", node);
                }
            });
        }
        else {
            this.updateNodeAcvite();
            this.onSceneLoadFinish();
        }
    };
    HallDriver.prototype.updateNodeAcvite = function () {
        //this.loadingNode.active = !HallDriver.PRELOAD_FINISH;
        //this.tipNode.active = HallDriver.PRELOAD_FINISH;
        if (cc.sys.isNative) {
            if (this.loadingNode) {
                this.loadingNode.active = false;
            }
        }
    };
    HallDriver.prototype.preLoadRes = function () {
        this.dependenceCount = 0;
        Global.ResourceManager.loadBundleRes(Global.customApp.getHallBundleName(), this.requireGameIconList);
        this.beginLoadAltas();
        this.beginLoadDependence();
        this.beginLoadSpine();
    };
    HallDriver.prototype.beginLoadDependence = function () {
        //显示loading 预加载资源
        if (this.requireList == null || this.requireList.length == 0)
            this.onDependenceLoaded();
        else
            Global.ResourceManager.loadResArr(this.requireList, this.onDependenceLoaded.bind(this), null, null, false, true);
    };
    HallDriver.prototype.beginLoadAltas = function () {
        //显示loading 预加载资源
        if (this.requireAtlasList == null || this.requireAtlasList.length == 0)
            this.onAltasLoaded();
        else
            Global.ResourceManager.loadAtlasArr(this.requireAtlasList, this.onAltasLoaded.bind(this));
    };
    HallDriver.prototype.beginLoadSpine = function () {
        //显示loading 预加载spine资源
        if (this.requireGameIconList == null || this.requireGameIconList.length == 0) {
            this.onAltasLoaded();
        }
        else {
            Global.ResourceManager.loadBundleRes(Global.customApp.getHallBundleName(), this.requireGameIconList, this.onAltasLoaded.bind(this));
        }
        // Global.ResourceManager.loadResArr(this.requireGameIconList, this.onAltasLoaded.bind(this), null, null,false, true);
    };
    HallDriver.prototype.onAltasLoaded = function () {
        this.dependenceCount++;
        this.checkDependenceAllFinish();
    };
    HallDriver.prototype.onDependenceLoaded = function () {
        this.dependenceCount++;
        this.checkDependenceAllFinish();
    };
    HallDriver.prototype.checkDependenceAllFinish = function () {
        if (this.dependenceCount >= this.DEPENCE_COUNT) {
            // Logger.error("loaded", Date.now())
            //关闭loading
            // this.currentScene.onLoaded();
            this.onSceneLoadFinish();
        }
    };
    HallDriver.prototype.onSceneLoadFinish = function () {
        //开启写日志
        Global.ReportTool.enableRecord();
        HallDriver_1.PRELOAD_FINISH = true;
        if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Hall) {
            Global.UI.show("WndHall");
            Global.UI.closeHallLoading();
        }
        else if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Login) {
            Global.UI.show("WndLogin");
        }
    };
    var HallDriver_1;
    //资源是否预加载过
    HallDriver.PRELOAD_FINISH = false;
    HallDriver = HallDriver_1 = __decorate([
        ccclass
    ], HallDriver);
    return HallDriver;
}(cc.Component));
exports.default = HallDriver;

cc._RF.pop();