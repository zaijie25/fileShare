
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/HallDriver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXEhhbGxEcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBRTFDLDJEQUFxRTtBQUNyRSxrRUFBNkQ7QUFJN0Qsb0JBQW9CO0FBQ3BCLGtGQUFrRjtBQUNsRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFFN0YsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBd0MsOEJBQVk7SUFBcEQ7UUFBQSxxRUF3TUM7UUF0TVcscUJBQWUsR0FBRyxhQUFhLENBQUM7UUFDaEMsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUdmLGlCQUFXLEdBQUUsRUFDbkIsQ0FBQztRQUVLLHNCQUFnQixHQUFFLEVBQ3hCLENBQUM7UUFFRixrQkFBa0I7UUFDWCx5QkFBbUIsR0FBRyxFQUM1QixDQUFDO1FBRU0scUJBQWUsR0FBRyxDQUFDLENBQUM7UUFLNUIsU0FBUztRQUNELG1CQUFhLEdBQUcsQ0FBQyxDQUFDOztRQWlMMUIsaUJBQWlCO0lBQ3JCLENBQUM7bUJBeE1vQixVQUFVO0lBaUMzQiwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0MsSUFBRyxNQUFNO1lBQ0wsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENB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Q0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU8sNkNBQXdCLEdBQWhDO1FBQ0ksSUFBSSxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUMscUNBQXFDO1lBQ3JDLFdBQVc7WUFDWCxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBR08sc0NBQWlCLEdBQXpCO1FBQ0ksT0FBTztRQUNQLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFakMsWUFBVSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsSUFBSSx3QkFBUyxDQUFDLElBQUksRUFBRTtZQUNqRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDaEM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLHdCQUFTLENBQUMsS0FBSyxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlCO0lBRUwsQ0FBQzs7SUE1S0QsVUFBVTtJQUNILHlCQUFjLEdBQUcsS0FBSyxDQUFDO0lBM0JiLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0F3TTlCO0lBQUQsaUJBQUM7Q0F4TUQsQUF3TUMsQ0F4TXVDLEVBQUUsQ0FBQyxTQUFTLEdBd01uRDtrQkF4TW9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFsbEZhY2FkZSBmcm9tIFwiLi9NVkMvSGFsbEZhY2FkZVwiO1xyXG5pbXBvcnQgSGFsbFNlY3Rpb24gZnJvbSBcIi4vSGFsbFNlY3Rpb25cIjtcclxuaW1wb3J0IFNjZW5lTWFuYWdlciwgeyBTY2VuZVR5cGUgfSBmcm9tIFwiLi4vY29yZS9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuaW1wb3J0IExvYWRpbmdGYWNhZGUgZnJvbSBcIi4uL2NvcmUvbG9hZGluZ01WQy9Mb2FkaW5nRmFjYWRlXCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuXHJcbi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsRHJpdmVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIGhhbGxTZWN0aW9uTmFtZSA9IFwiaGFsbFNlY3Rpb25cIjtcclxuICAgIHByaXZhdGUgc3RhcnRUaW1lID0gMDtcclxuXHJcblxyXG4gICAgcHVibGljIHJlcXVpcmVMaXN0ID1bXHJcbiAgICBdO1xyXG5cclxuICAgIHB1YmxpYyByZXF1aXJlQXRsYXNMaXN0ID1bXHJcbiAgICBdO1xyXG5cclxuICAgIC8vIOmihOWKoOi9vemcgOimgeWKqOaAgeWPmOaNoueahHNwaW5lXHJcbiAgICBwdWJsaWMgcmVxdWlyZUdhbWVJY29uTGlzdCA9IFtcclxuICAgIF07XHJcblxyXG4gICAgcHJpdmF0ZSBkZXBlbmRlbmNlQ291bnQgPSAwO1xyXG4gICAgLy/liqDovb3mnaHoioLngrlcclxuICAgIHByaXZhdGUgbG9hZGluZ05vZGU6Y2MuTm9kZTtcclxuICAgIC8vdGlwc+iKgueCuVxyXG4gICAgcHJpdmF0ZSB0aXBOb2RlOmNjLk5vZGU7XHJcbiAgICAvL+mihOWKoOi9veexu+Wei+aVsOmHj1xyXG4gICAgcHJpdmF0ZSBERVBFTkNFX0NPVU5UID0gMztcclxuXHJcbiAgICBwcml2YXRlIHNsaWRlcjpjYy5Qcm9ncmVzc0JhcjtcclxuXHJcbiAgICAvL+i1hOa6kOaYr+WQpumihOWKoOi9vei/h1xyXG4gICAgc3RhdGljIFBSRUxPQURfRklOSVNIID0gZmFsc2U7XHJcbiAgICBcclxuXHJcbiAgICAvL+iDjOaZr+WbvlxyXG4gICAgcHJpdmF0ZSBiZzpjYy5TcHJpdGU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubG9hZGluZ05vZGUgPSBjYy5maW5kKFwibG9hZGluZy9sb2FkaW5nQmFyXCIsIHRoaXMubm9kZSlcclxuICAgICAgICBsZXQgYmdOb2RlID0gY2MuZmluZChcImxvYWRpbmcvYmdcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIGlmKGJnTm9kZSlcclxuICAgICAgICAgICAgdGhpcy5iZyA9IGJnTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBsZXQgc2lsZGVyTm9kZSA9IGNjLmZpbmQoIFwibG9hZGluZy9sb2FkaW5nQmFyL2Jhcl8xXzFcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIGxldCBjaGVja05vZGUgPSBjYy5maW5kKFwibG9hZGluZy9jaGVja05vZGVcIix0aGlzLm5vZGUpXHJcbiAgICAgICAgbGV0IGNoZWNrTm9kZVNwcml0ZSA9IG51bGxcclxuICAgICAgICBsZXQgaW5mb0xhYmVsID0gbnVsbFxyXG4gICAgICAgIGlmIChjaGVja05vZGUpe1xyXG4gICAgICAgICAgICBjaGVja05vZGVTcHJpdGUgPSBjaGVja05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSlcclxuICAgICAgICAgICAgbGV0IGluZm9MYWJlbE5vZGUgPSBjaGVja05vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbmZvTGFiZWxcIilcclxuICAgICAgICAgICAgaWYgKGluZm9MYWJlbE5vZGUpe1xyXG4gICAgICAgICAgICAgICAgaW5mb0xhYmVsID0gaW5mb0xhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNpbGRlck5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlciA9IHNpbGRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXIucHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNjZW5lU2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNjZW5lU2V0dXAoKSB7XHJcblxyXG4gICAgICAgIGlmKHdpbmRvd1tcIkdsb2JhbFwiXSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9hZGluZ0ZhY2FkZS5pbml0R2xvYmFsKCk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcignR2xvYmFsIG5vdCBpbml0ISEhIScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlcGVuZGVuY2VDb3VudCA9IDA7XHJcbiAgICAgICAgLy/liJ3lp4vljJZtdmNcclxuICAgICAgICBIYWxsRmFjYWRlLkluc3RhbmNlLnN0YXJ0VXAoKTtcclxuICAgICAgICAvL+WIneWni+WMlnNlY3Rpb24gIOazqOWGjHVpICBtb2RlbFxyXG4gICAgICAgIC8vIGlmICghR2xvYmFsLlNlY3Rpb25NYW5hZ2VyLmhhc1NlY3Rpb24odGhpcy5oYWxsU2VjdGlvbk5hbWUpKSB7XHJcbiAgICAgICAgLy8gICAgIEdsb2JhbC5TZWN0aW9uTWFuYWdlci5yZWdpc3Rlcih0aGlzLmhhbGxTZWN0aW9uTmFtZSwgbmV3IEhhbGxTZWN0aW9uKCkpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBHbG9iYWwuU2VjdGlvbk1hbmFnZXIuY2FsbFNlY3Rpb25Jbml0KHRoaXMuaGFsbFNlY3Rpb25OYW1lKTtcclxuICAgICAgICAvL+WIneWni+WMlnVwZGF0ZempseWKqCAg5Yid5aeL5YyWdGltZXJcclxuICAgICAgICBHbG9iYWwuQ29tcG9uZW50LmluaXREcml2ZXIoKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2MuZ2FtZS5zZXRGcmFtZVJhdGUoR2xvYmFsLlNldHRpbmcuRlBTQ29uZmlnKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlVJLmluaXRVSVJvb3QoIUhhbGxEcml2ZXIuUFJFTE9BRF9GSU5JU0gpO1xyXG5cclxuXHJcbiAgICAgICAgLy8gR2xvYmFsLkF1ZGlvLnBsYXlIYWxsQkdNKCk7Ly94aWFvYyAyMDE5LTEwLTI4IOiDjOaZr+mfs+S5kOeahOaSreaUvuWcqOS4i+mdoueahOWHveaVsOS4reWkhOeQhlBsYXllckluZm9Nb2RlbC5Jbml0QmdtKCk7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlQXRsYXNMaXN0ID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5yZXF1aXJlQXRsYXNMaXN0O1xyXG4gICAgICAgIHRoaXMucmVxdWlyZUxpc3QgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlcXVpcmVMaXN0O1xyXG4gICAgICAgIHRoaXMucmVxdWlyZUdhbWVJY29uTGlzdCA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVxdWlyZUdhbWVJY29uTGlzdDtcclxuXHJcbiAgICAgICAgaWYgKCFIYWxsRHJpdmVyLlBSRUxPQURfRklOSVNIKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZUhlbHBlci5yZWNvcmRVbnVzZWRBc3NldCh0aGlzLnJlcXVpcmVHYW1lSWNvbkxpc3QsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVBY3ZpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICB0aGlzLnByZUxvYWRSZXMoKTtcclxuICAgICAgICAgICAgLy/mt7vliqDluLjpqbvoioLngrkgICDpmLLmraLpg6jliIblhoXnva7otYTmupDooqvliKDpmaRcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkUmVzKFwiaGFsbC9lZmZlY3Qvbm90RGVzdHJveVwiLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByZWZhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUGVyc2lzdC5zYXZlVG9Qb29sKFwia2VlcFwiLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhcImhhbGwvcHJlZmFicy91aS9DaG9vc2VSb29tL0dhbWVMb2JieVNoZWxsVUlcIiwgKGVycm9yLCBwcmVmYWIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlBlcnNpc3Quc2F2ZVRvUG9vbChcIlduZEdhbWVMb2JieVNoZWxsXCIsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQWN2aXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TY2VuZUxvYWRGaW5pc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZU5vZGVBY3ZpdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhpcy5sb2FkaW5nTm9kZS5hY3RpdmUgPSAhSGFsbERyaXZlci5QUkVMT0FEX0ZJTklTSDtcclxuICAgICAgICAvL3RoaXMudGlwTm9kZS5hY3RpdmUgPSBIYWxsRHJpdmVyLlBSRUxPQURfRklOSVNIO1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2FkaW5nTm9kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlTG9hZFJlcygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNlQ291bnQgPSAwO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZVJlcyhHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKCksdGhpcy5yZXF1aXJlR2FtZUljb25MaXN0KVxyXG4gICAgICAgIHRoaXMuYmVnaW5Mb2FkQWx0YXMoKTtcclxuICAgICAgICB0aGlzLmJlZ2luTG9hZERlcGVuZGVuY2UoKTtcclxuICAgICAgICB0aGlzLmJlZ2luTG9hZFNwaW5lKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVnaW5Mb2FkRGVwZW5kZW5jZSgpe1xyXG4gICAgICAgIC8v5pi+56S6bG9hZGluZyDpooTliqDovb3otYTmupBcclxuICAgICAgICBpZiAodGhpcy5yZXF1aXJlTGlzdCA9PSBudWxsIHx8IHRoaXMucmVxdWlyZUxpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgIHRoaXMub25EZXBlbmRlbmNlTG9hZGVkKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXNBcnIodGhpcy5yZXF1aXJlTGlzdCwgdGhpcy5vbkRlcGVuZGVuY2VMb2FkZWQuYmluZCh0aGlzKSwgbnVsbCwgbnVsbCwgZmFsc2UsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYmVnaW5Mb2FkQWx0YXMoKXtcclxuICAgICAgICAvL+aYvuekumxvYWRpbmcg6aKE5Yqg6L296LWE5rqQXHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWlyZUF0bGFzTGlzdCA9PSBudWxsIHx8IHRoaXMucmVxdWlyZUF0bGFzTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgdGhpcy5vbkFsdGFzTG9hZGVkKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdGxhc0Fycih0aGlzLnJlcXVpcmVBdGxhc0xpc3QsIHRoaXMub25BbHRhc0xvYWRlZC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGJlZ2luTG9hZFNwaW5lKCl7XHJcbiAgICAgICAgLy/mmL7npLpsb2FkaW5nIOmihOWKoOi9vXNwaW5l6LWE5rqQXHJcbiAgICAgICAgaWYgKHRoaXMucmVxdWlyZUdhbWVJY29uTGlzdCA9PSBudWxsIHx8IHRoaXMucmVxdWlyZUdhbWVJY29uTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25BbHRhc0xvYWRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVSZXMoR2xvYmFsLmN1c3RvbUFwcC5nZXRIYWxsQnVuZGxlTmFtZSgpLHRoaXMucmVxdWlyZUdhbWVJY29uTGlzdCwgdGhpcy5vbkFsdGFzTG9hZGVkLmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXNBcnIodGhpcy5yZXF1aXJlR2FtZUljb25MaXN0LCB0aGlzLm9uQWx0YXNMb2FkZWQuYmluZCh0aGlzKSwgbnVsbCwgbnVsbCxmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkFsdGFzTG9hZGVkKCkge1xyXG4gICAgICAgIHRoaXMuZGVwZW5kZW5jZUNvdW50Kys7XHJcbiAgICAgICAgdGhpcy5jaGVja0RlcGVuZGVuY2VBbGxGaW5pc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRGVwZW5kZW5jZUxvYWRlZCgpIHtcclxuICAgICAgICB0aGlzLmRlcGVuZGVuY2VDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuY2hlY2tEZXBlbmRlbmNlQWxsRmluaXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RlcGVuZGVuY2VBbGxGaW5pc2goKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGVwZW5kZW5jZUNvdW50ID49IHRoaXMuREVQRU5DRV9DT1VOVCkge1xyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJsb2FkZWRcIiwgRGF0ZS5ub3coKSlcclxuICAgICAgICAgICAgLy/lhbPpl61sb2FkaW5nXHJcbiAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFNjZW5lLm9uTG9hZGVkKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25TY2VuZUxvYWRGaW5pc2goKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25TY2VuZUxvYWRGaW5pc2goKSB7XHJcbiAgICAgICAgLy/lvIDlkK/lhpnml6Xlv5dcclxuICAgICAgICBHbG9iYWwuUmVwb3J0VG9vbC5lbmFibGVSZWNvcmQoKTtcclxuXHJcbiAgICAgICAgSGFsbERyaXZlci5QUkVMT0FEX0ZJTklTSCA9IHRydWU7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TY2VuZU1hbmFnZXIuc2NlbmVUeXBlID09IFNjZW5lVHlwZS5IYWxsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kSGFsbFwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmNsb3NlSGFsbExvYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgPT0gU2NlbmVUeXBlLkxvZ2luKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTG9naW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XHJcbn1cclxuIl19