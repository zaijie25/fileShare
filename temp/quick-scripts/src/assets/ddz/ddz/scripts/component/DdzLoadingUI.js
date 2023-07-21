"use strict";
cc._RF.push(module, '09d4e6RS99Gpr9WYJ0Y3+Rd', 'DdzLoadingUI');
// ddz/ddz/scripts/component/DdzLoadingUI.ts

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
var DdzMainUI_1 = require("../panel/DdzMainUI");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzDriver_1 = require("../DdzDriver");
var DdzSkinDefine_1 = require("../data/DdzSkinDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DdzLoadingUI = /** @class */ (function (_super) {
    __extends(DdzLoadingUI, _super);
    function DdzLoadingUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dependAtlas = [
            // atlas
            DdzPathHelper_1.default.gameTexturePath + "atlas/pokers/pokers",
            DdzPathHelper_1.default.gameTexturePath + "atlas/frame/atlas_frame",
        ];
        _this.dependceArr = [
            DdzPathHelper_1.default.gameTexturePath + "atlas/frame/font/num_jia",
            DdzPathHelper_1.default.gameTexturePath + "atlas/frame/font/num_fu",
            // ui
            DdzPathHelper_1.default.gamePrefabsPath + "panel/ddzGameUI",
        ];
        _this.dependceArr2 = [
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/actRootView",
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/pokerPreNode",
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/pokerView",
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/matchPlayerView",
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/playerView",
            DdzPathHelper_1.default.gamePrefabsPath + "panel/subView/settleView",
        ];
        _this.dependAudio = [
            DdzPathHelper_1.default.gameAudioPath + "common/chuntian",
            DdzPathHelper_1.default.gameAudioPath + "common/losegame",
            DdzPathHelper_1.default.gameAudioPath + "common/wingame",
            DdzPathHelper_1.default.gameAudioPath + "common/play_farmer_win",
            DdzPathHelper_1.default.gameAudioPath + "common/play_lord_win",
            DdzPathHelper_1.default.gameAudioPath + "common/dispatch",
            DdzPathHelper_1.default.gameAudioPath + "common/sendcard",
            DdzPathHelper_1.default.gameAudioPath + "common/common_alert",
            DdzPathHelper_1.default.gameAudioPath + "cardType/huojian",
            DdzPathHelper_1.default.gameAudioPath + "cardType/common_bomb",
            DdzPathHelper_1.default.gameAudioPath + "cardType/common_plane",
            DdzPathHelper_1.default.gameAudioPath + "cardType/liandui",
            DdzPathHelper_1.default.gameAudioPath + "cardType/shunzi",
            DdzPathHelper_1.default.gameAudioPath + "background",
            DdzPathHelper_1.default.gameAudioPath + "afterboom",
        ];
        return _this;
    }
    DdzLoadingUI.prototype.onLoad = function () {
        this.loadingContent = cc.find("content", this.node);
        this.loadingContent.active = false;
    };
    DdzLoadingUI.prototype.start = function () {
        this.initLoading();
        this.preloadRes();
    };
    DdzLoadingUI.prototype.initLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var comp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!Global.GameData.checkHasCustomLoading(DdzGameConst_1.default.Gid)) return [3 /*break*/, 2];
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
    DdzLoadingUI.prototype.preloadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadSkinJson, loadAtlas, loadPrefab, loadPrefab2, loadAudio;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadSkinJson = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadGameBundleRes(DdzSkinDefine_1.default.jsonPath, function (err, res) {
                                    if (err)
                                        reject(err);
                                    else {
                                        DdzDriver_1.default.instance.skinDefine = new DdzSkinDefine_1.default(res.json);
                                        resolve(res);
                                    }
                                }, cc.JsonAsset);
                            });
                        };
                        loadAtlas = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadGameBundleRes(_this.dependAtlas, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                }, cc.SpriteAtlas);
                            });
                        };
                        loadPrefab = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadGameBundleRes(_this.dependceArr, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                });
                            });
                        };
                        loadPrefab2 = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadGameBundleRes(_this.dependceArr2, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        resolve(res);
                                    }
                                });
                            });
                        };
                        loadAudio = function () {
                            return new Promise(function (resolve, reject) {
                                Global.ResourceManager.loadGameBundleRes(_this.dependAudio, function (err, res) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        // 多个音效同时加载播放或者音效加载时间过长 会导致动画卡顿 预加载解决
                                        res.forEach(function (r) {
                                            cc.loader.loadRes(r.nativeUrl, cc.AudioClip);
                                        });
                                        resolve(res);
                                    }
                                }, cc.AudioClip);
                            });
                        };
                        return [4 /*yield*/, HeadTipsManager.preloadRes()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, TaskManager.preloadRes()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, loadSkinJson()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, loadAtlas()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, loadPrefab()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, loadPrefab2()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, loadAudio()];
                    case 7:
                        _a.sent();
                        if (!cc.isValid(this.node)) {
                            return [2 /*return*/];
                        }
                        this.initUI();
                        Game.Component.scheduleOnce(function () {
                            DdzDriver_1.default.instance.startScene();
                        }, 0.5);
                        return [2 /*return*/];
                }
            });
        });
    };
    DdzLoadingUI.prototype.initUI = function () {
        var CanvasNode = cc.Canvas.instance.node;
        var mainLayer = Global.UI.getLayer("MainLayer") || CanvasNode;
        var fullScreenLayer = Global.UI.getLayer("FullScreenLayer") || CanvasNode;
        var popLayer = Global.UI.getLayer("PopLayer") || CanvasNode;
        var mainUI = this.getUINode(DdzPathHelper_1.default.gamePrefabsPath + "panel/ddzGameUI");
        DdzDriver_1.default.instance.mainUI = mainUI.getComponent(DdzMainUI_1.default);
        fullScreenLayer.addChild(mainUI); // 放到同一层次，方便进入场动画
        mainUI.active = false;
    };
    DdzLoadingUI.prototype.getUINode = function (path) {
        var prefab = Global.ResourceManager.getGameBundleRes(path, cc.Prefab);
        if (prefab == null) {
            Logger.error("获取预设失败", path);
            return null;
        }
        return cc.instantiate(prefab);
    };
    DdzLoadingUI = __decorate([
        ccclass
    ], DdzLoadingUI);
    return DdzLoadingUI;
}(cc.Component));
exports.default = DdzLoadingUI;

cc._RF.pop();