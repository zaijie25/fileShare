"use strict";
cc._RF.push(module, '5ec727toKJOdpfjhG6pnMNS', 'ErmjLoadingUI');
// ermj/Ermj/scripts/component/ErmjLoadingUI.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjMainUI_1 = require("../panel/ErmjMainUI");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ErmjLoadingUI = /** @class */ (function (_super) {
    __extends(ErmjLoadingUI, _super);
    function ErmjLoadingUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependAtlas = [
            // atlas
            ErmjPathHelper_1.default.gameTexturePath + "dynamic/atlas_dynamic",
            ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong",
            ErmjPathHelper_1.default.gameTexturePath + "type/atlas_type",
        ];
        _this.dependceArr = [
            // ui
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/ErmjMainUI",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongHillView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongOutView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongOperView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/matchPlayerView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/gameStartView",
        ];
        // 同时加载太多有明显卡顿感, 分批加载
        _this.dependceArr2 = [
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/diceAnim",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/rubMjAnim",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/askActionView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/askNoticeView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/selfPlayView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/flowView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/settleView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/winLightningView",
            ErmjPathHelper_1.default.gamePrefabsPath + "panel/subView/autoBtnVIew",
        ];
        return _this;
    }
    ErmjLoadingUI.prototype.onLoad = function () {
        this.loadingContent = cc.find("content", this.node);
        this.loadingContent.active = false;
    };
    ErmjLoadingUI.prototype.start = function () {
        this.initLoading();
        this.preloadRes();
    };
    ErmjLoadingUI.prototype.initLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Global.GameData.checkHasCustomLoading && !Global.GameData.checkHasCustomLoading(ErmjGameConst_1.default.Gid))) return [3 /*break*/, 2];
                        return [4 /*yield*/, Global.UIHelper.getGameLoadingComp()];
                    case 1:
                        comp = _a.sent();
                        this.loadingContent.active = false;
                        comp.node.setParent(this.node);
                        comp.node.active = true;
                        return [3 /*break*/, 3];
                    case 2:
                        this.loadingContent.active = true;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ErmjLoadingUI.prototype.preloadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadAtlas, loadPrefab1, loadPrefab2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadAtlas = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadBundleRes(ErmjGameConst_1.default.Gid, _this.dependAtlas, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                }, cc.SpriteAtlas);
                            });
                        };
                        loadPrefab1 = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadBundleRes(ErmjGameConst_1.default.Gid, _this.dependceArr, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                }, null);
                            });
                        };
                        loadPrefab2 = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadBundleRes(ErmjGameConst_1.default.Gid, _this.dependceArr2, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                }, null);
                            });
                        };
                        return [4 /*yield*/, HeadTipsManager.preloadRes()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, TaskManager.preloadRes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, loadAtlas()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, loadPrefab1()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, loadPrefab2()];
                    case 5:
                        _a.sent();
                        // 防止load过程中强踢到大厅后调用报错
                        if (!this.node || !cc.isValid(this.node) || !ErmjDriver_1.default.instance.inGame) {
                            return [2 /*return*/];
                        }
                        this.initUI();
                        Game.Component.scheduleOnce(function () {
                            ErmjDriver_1.default.instance.startScene();
                        }, 0.5);
                        return [2 /*return*/];
                }
            });
        });
    };
    ErmjLoadingUI.prototype.initUI = function () {
        var CanvasNode = cc.Canvas.instance.node;
        var fullScreenLayer = Global.UI.getLayer("FullScreenLayer") || CanvasNode;
        var popLayer = Global.UI.getLayer("PopLayer") || CanvasNode;
        var mainUI = this.getUINode(ErmjPathHelper_1.default.gamePrefabsPath + "panel/ErmjMainUI");
        ErmjDriver_1.default.instance.mainUI = mainUI.getComponent(ErmjMainUI_1.default);
        fullScreenLayer.addChild(mainUI); // 放到同一层次，方便进入场动画
        mainUI.active = false;
    };
    ErmjLoadingUI.prototype.getUINode = function (path) {
        var prefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, path, cc.Prefab);
        if (prefab == null) {
            Logger.error("获取预设失败", path);
            return null;
        }
        return cc.instantiate(prefab);
    };
    ErmjLoadingUI = __decorate([
        ccclass
    ], ErmjLoadingUI);
    return ErmjLoadingUI;
}(cc.Component));
exports.default = ErmjLoadingUI;

cc._RF.pop();