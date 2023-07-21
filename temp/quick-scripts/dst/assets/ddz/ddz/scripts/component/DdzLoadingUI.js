
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/component/DdzLoadingUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGNvbXBvbmVudFxcRGR6TG9hZGluZ1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEyQztBQUMzQyx1REFBa0Q7QUFDbEQscURBQWdEO0FBQ2hELDBDQUFxQztBQUNyQyx1REFBa0Q7QUFFNUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFzS0M7UUFyS1csaUJBQVcsR0FBRztZQUNsQixRQUFRO1lBQ1IsdUJBQWEsQ0FBQyxlQUFlLEdBQUcscUJBQXFCO1lBQ3JELHVCQUFhLENBQUMsZUFBZSxHQUFHLHlCQUF5QjtTQUM1RCxDQUFDO1FBQ00saUJBQVcsR0FBRztZQUNsQix1QkFBYSxDQUFDLGVBQWUsR0FBRywwQkFBMEI7WUFDMUQsdUJBQWEsQ0FBQyxlQUFlLEdBQUcseUJBQXlCO1lBQ3pELEtBQUs7WUFDTCx1QkFBYSxDQUFDLGVBQWUsR0FBRyxpQkFBaUI7U0FDcEQsQ0FBQztRQUNNLGtCQUFZLEdBQUc7WUFDbkIsdUJBQWEsQ0FBQyxlQUFlLEdBQUcsMkJBQTJCO1lBQzNELHVCQUFhLENBQUMsZUFBZSxHQUFHLDRCQUE0QjtZQUM1RCx1QkFBYSxDQUFDLGVBQWUsR0FBRyx5QkFBeUI7WUFDekQsdUJBQWEsQ0FBQyxlQUFlLEdBQUcsK0JBQStCO1lBQy9ELHVCQUFhLENBQUMsZUFBZSxHQUFHLDBCQUEwQjtZQUMxRCx1QkFBYSxDQUFDLGVBQWUsR0FBRywwQkFBMEI7U0FDN0QsQ0FBQTtRQUNPLGlCQUFXLEdBQUc7WUFDbEIsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsaUJBQWlCO1lBQy9DLHVCQUFhLENBQUMsYUFBYSxHQUFHLGlCQUFpQjtZQUMvQyx1QkFBYSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0I7WUFDOUMsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsd0JBQXdCO1lBQ3RELHVCQUFhLENBQUMsYUFBYSxHQUFHLHNCQUFzQjtZQUNwRCx1QkFBYSxDQUFDLGFBQWEsR0FBRyxpQkFBaUI7WUFDL0MsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsaUJBQWlCO1lBQy9DLHVCQUFhLENBQUMsYUFBYSxHQUFHLHFCQUFxQjtZQUNuRCx1QkFBYSxDQUFDLGFBQWEsR0FBRyxrQkFBa0I7WUFDaEQsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsc0JBQXNCO1lBQ3BELHVCQUFhLENBQUMsYUFBYSxHQUFHLHVCQUF1QjtZQUNyRCx1QkFBYSxDQUFDLGFBQWEsR0FBRyxrQkFBa0I7WUFDaEQsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsaUJBQWlCO1lBQy9DLHVCQUFhLENBQUMsYUFBYSxHQUFHLFlBQVk7WUFDMUMsdUJBQWEsQ0FBQyxhQUFhLEdBQUcsV0FBVztTQUM1QyxDQUFDOztJQWtJTixDQUFDO0lBOUhHLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVTLDRCQUFLLEdBQWY7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFYSxrQ0FBVyxHQUF6Qjs7Ozs7OzZCQUNRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUF4RCx3QkFBd0Q7d0JBQzdDLHFCQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsRUFBQTs7d0JBQWpELElBQUksR0FBRyxTQUEwQzt3QkFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7O3dCQUd4QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Ozs7OztLQUV6QztJQUVhLGlDQUFVLEdBQXhCOzs7Ozs7O3dCQUNRLFlBQVksR0FBRzs0QkFDZixPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQy9CLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsdUJBQWEsQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztvQ0FDdEUsSUFBSSxHQUFHO3dDQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt5Q0FDWjt3Q0FDQSxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3Q0FDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNoQjtnQ0FDTCxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNyQixDQUFDLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUE7d0JBQ0csU0FBUyxHQUFHOzRCQUNaLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDL0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7b0NBQ2hFLElBQUksR0FBRyxFQUFDO3dDQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQ0FDZjt5Q0FDRzt3Q0FDQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUNBQ2hCO2dDQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3ZCLENBQUMsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQTt3QkFDRyxVQUFVLEdBQUc7NEJBQ2IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dDQUMvQixNQUFNLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEtBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztvQ0FDaEUsSUFBSSxHQUFHLEVBQUM7d0NBQ0osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNmO3lDQUNHO3dDQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQ0FDaEI7Z0NBQ0wsQ0FBQyxDQUFDLENBQUM7NEJBQ1AsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFBO3dCQUNHLFdBQVcsR0FBRzs0QkFDZCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07Z0NBQy9CLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO29DQUNqRSxJQUFJLEdBQUcsRUFBQzt3Q0FDSixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUNBQ2Y7eUNBQ0c7d0NBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNoQjtnQ0FDTCxDQUFDLENBQUMsQ0FBQzs0QkFDUCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDLENBQUE7d0JBQ0csU0FBUyxHQUFHOzRCQUNaLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtnQ0FDL0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFJLENBQUMsV0FBVyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7b0NBQ2hFLElBQUksR0FBRyxFQUFDO3dDQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQ0FDZjt5Q0FDRzt3Q0FDQSxxQ0FBcUM7d0NBQ3JDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDOzRDQUNULEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dDQUNqRCxDQUFDLENBQUMsQ0FBQzt3Q0FDSCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7cUNBQ2hCO2dDQUNMLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3JCLENBQUMsQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQTt3QkFFRCxxQkFBTSxlQUFlLENBQUMsVUFBVSxFQUFFLEVBQUE7O3dCQUFsQyxTQUFrQyxDQUFDO3dCQUNuQyxxQkFBTSxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUE7O3dCQUE5QixTQUE4QixDQUFDO3dCQUMvQixxQkFBTSxZQUFZLEVBQUUsRUFBQTs7d0JBQXBCLFNBQW9CLENBQUM7d0JBQ3JCLHFCQUFNLFNBQVMsRUFBRSxFQUFBOzt3QkFBakIsU0FBaUIsQ0FBQzt3QkFDbEIscUJBQU0sVUFBVSxFQUFFLEVBQUE7O3dCQUFsQixTQUFrQixDQUFDO3dCQUNuQixxQkFBTSxXQUFXLEVBQUUsRUFBQTs7d0JBQW5CLFNBQW1CLENBQUM7d0JBQ3BCLHFCQUFNLFNBQVMsRUFBRSxFQUFBOzt3QkFBakIsU0FBaUIsQ0FBQzt3QkFFbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDOzRCQUN2QixzQkFBTzt5QkFDVjt3QkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7NEJBQ3hCLG1CQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUNwQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7O0tBQ1g7SUFFTyw2QkFBTSxHQUFkO1FBQ0ksSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3pDLElBQUksU0FBUyxHQUFXLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFVBQVUsQ0FBQztRQUV0RSxJQUFJLGVBQWUsR0FBVyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLFVBQVUsQ0FBQztRQUNsRixJQUFJLFFBQVEsR0FBVyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUM7UUFDcEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx1QkFBYSxDQUFDLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9FLG1CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFTLENBQUMsQ0FBQztRQUMzRCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUcsaUJBQWlCO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTyxnQ0FBUyxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFHLE1BQU0sSUFBSSxJQUFJLEVBQ2pCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBcktnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBc0toQztJQUFELG1CQUFDO0NBdEtELEFBc0tDLENBdEt5QyxFQUFFLENBQUMsU0FBUyxHQXNLckQ7a0JBdEtvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkek1haW5VSSBmcm9tIFwiLi4vcGFuZWwvRGR6TWFpblVJXCI7XHJcbmltcG9ydCBEZHpQYXRoSGVscGVyIGZyb20gXCIuLi9kYXRhL0RkelBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IERkekdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcbmltcG9ydCBEZHpTa2luRGVmaW5lIGZyb20gXCIuLi9kYXRhL0RkelNraW5EZWZpbmVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6TG9hZGluZ1VJIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBkZXBlbmRBdGxhcyA9IFtcclxuICAgICAgICAvLyBhdGxhc1xyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJhdGxhcy9wb2tlcnMvcG9rZXJzXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2ZyYW1lL2F0bGFzX2ZyYW1lXCIsXHJcbiAgICBdO1xyXG4gICAgcHJpdmF0ZSBkZXBlbmRjZUFyciA9IFtcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZnJhbWUvZm9udC9udW1famlhXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2ZyYW1lL2ZvbnQvbnVtX2Z1XCIsXHJcbiAgICAgICAgLy8gdWlcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvZGR6R2FtZVVJXCIsXHJcbiAgICBdO1xyXG4gICAgcHJpdmF0ZSBkZXBlbmRjZUFycjIgPSBbXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvYWN0Um9vdFZpZXdcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9wb2tlclByZU5vZGVcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9wb2tlclZpZXdcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9tYXRjaFBsYXllclZpZXdcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9wbGF5ZXJWaWV3XCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvc2V0dGxlVmlld1wiLFxyXG4gICAgXVxyXG4gICAgcHJpdmF0ZSBkZXBlbmRBdWRpbyA9IFtcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImNvbW1vbi9jaHVudGlhblwiLFxyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiY29tbW9uL2xvc2VnYW1lXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjb21tb24vd2luZ2FtZVwiLFxyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiY29tbW9uL3BsYXlfZmFybWVyX3dpblwiLFxyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiY29tbW9uL3BsYXlfbG9yZF93aW5cIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImNvbW1vbi9kaXNwYXRjaFwiLFxyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiY29tbW9uL3NlbmRjYXJkXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjb21tb24vY29tbW9uX2FsZXJ0XCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjYXJkVHlwZS9odW9qaWFuXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjYXJkVHlwZS9jb21tb25fYm9tYlwiLFxyXG4gICAgICAgIERkelBhdGhIZWxwZXIuZ2FtZUF1ZGlvUGF0aCArIFwiY2FyZFR5cGUvY29tbW9uX3BsYW5lXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjYXJkVHlwZS9saWFuZHVpXCIsXHJcbiAgICAgICAgRGR6UGF0aEhlbHBlci5nYW1lQXVkaW9QYXRoICsgXCJjYXJkVHlwZS9zaHVuemlcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImJhY2tncm91bmRcIixcclxuICAgICAgICBEZHpQYXRoSGVscGVyLmdhbWVBdWRpb1BhdGggKyBcImFmdGVyYm9vbVwiLFxyXG4gICAgXTtcclxuXHJcbiAgICBwcml2YXRlIGxvYWRpbmdDb250ZW50OiBjYy5Ob2RlO1xyXG5cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0NvbnRlbnQgPSBjYy5maW5kKFwiY29udGVudFwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ0NvbnRlbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0KCl7XHJcbiAgICAgICAgdGhpcy5pbml0TG9hZGluZygpO1xyXG4gICAgICAgIHRoaXMucHJlbG9hZFJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdExvYWRpbmcoKXtcclxuICAgICAgICBpZiAoIUdsb2JhbC5HYW1lRGF0YS5jaGVja0hhc0N1c3RvbUxvYWRpbmcoRGR6R2FtZUNvbnN0LkdpZCkpe1xyXG4gICAgICAgICAgICBsZXQgY29tcCA9IGF3YWl0IEdsb2JhbC5VSUhlbHBlci5nZXRHYW1lTG9hZGluZ0NvbXAoKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ29udGVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29tcC5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICBjb21wLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nQ29udGVudC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIHByZWxvYWRSZXMoKXtcclxuICAgICAgICBsZXQgbG9hZFNraW5Kc29uID0gKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlUmVzKERkelNraW5EZWZpbmUuanNvblBhdGgsIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2Uuc2tpbkRlZmluZSA9IG5ldyBEZHpTa2luRGVmaW5lKHJlcy5qc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNjLkpzb25Bc3NldCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsb2FkQXRsYXMgPSAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEdhbWVCdW5kbGVSZXModGhpcy5kZXBlbmRBdGxhcywgKGVyciwgcmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNjLlNwcml0ZUF0bGFzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvYWRQcmVmYWIgPSAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEdhbWVCdW5kbGVSZXModGhpcy5kZXBlbmRjZUFyciwgKGVyciwgcmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvYWRQcmVmYWIyID0gKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlUmVzKHRoaXMuZGVwZW5kY2VBcnIyLCAoZXJyLCByZXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbG9hZEF1ZGlvID0gKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRHYW1lQnVuZGxlUmVzKHRoaXMuZGVwZW5kQXVkaW8sIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWkmuS4qumfs+aViOWQjOaXtuWKoOi9veaSreaUvuaIluiAhemfs+aViOWKoOi9veaXtumXtOi/h+mVvyDkvJrlr7zoh7TliqjnlLvljaHpob8g6aKE5Yqg6L296Kej5YazXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKHI9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHIubmF0aXZlVXJsLCBjYy5BdWRpb0NsaXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBhd2FpdCBIZWFkVGlwc01hbmFnZXIucHJlbG9hZFJlcygpO1xyXG4gICAgICAgIGF3YWl0IFRhc2tNYW5hZ2VyLnByZWxvYWRSZXMoKTtcclxuICAgICAgICBhd2FpdCBsb2FkU2tpbkpzb24oKTtcclxuICAgICAgICBhd2FpdCBsb2FkQXRsYXMoKTtcclxuICAgICAgICBhd2FpdCBsb2FkUHJlZmFiKCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZFByZWZhYjIoKTtcclxuICAgICAgICBhd2FpdCBsb2FkQXVkaW8oKTtcclxuXHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMubm9kZSkpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5zdGFydFNjZW5lKCk7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRVSSgpe1xyXG4gICAgICAgIGxldCBDYW52YXNOb2RlID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XHJcbiAgICAgICAgbGV0IG1haW5MYXllcjpjYy5Ob2RlID0gR2xvYmFsLlVJLmdldExheWVyKFwiTWFpbkxheWVyXCIpIHx8IENhbnZhc05vZGU7XHJcblxyXG4gICAgICAgIGxldCBmdWxsU2NyZWVuTGF5ZXI6Y2MuTm9kZSA9IEdsb2JhbC5VSS5nZXRMYXllcihcIkZ1bGxTY3JlZW5MYXllclwiKSB8fCBDYW52YXNOb2RlO1xyXG4gICAgICAgIGxldCBwb3BMYXllcjpjYy5Ob2RlID0gR2xvYmFsLlVJLmdldExheWVyKFwiUG9wTGF5ZXJcIikgfHwgQ2FudmFzTm9kZTtcclxuICAgICAgICBsZXQgbWFpblVJID0gdGhpcy5nZXRVSU5vZGUoRGR6UGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL2RkekdhbWVVSVwiKTtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UubWFpblVJID0gbWFpblVJLmdldENvbXBvbmVudChEZHpNYWluVUkpO1xyXG4gICAgICAgIGZ1bGxTY3JlZW5MYXllci5hZGRDaGlsZChtYWluVUkpOyAgIC8vIOaUvuWIsOWQjOS4gOWxguasoe+8jOaWueS+v+i/m+WFpeWcuuWKqOeUu1xyXG4gICAgICAgIG1haW5VSS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFVJTm9kZShwYXRoKXtcclxuICAgICAgICBsZXQgcHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRHYW1lQnVuZGxlUmVzKHBhdGgsIGNjLlByZWZhYik7XHJcbiAgICAgICAgaWYocHJlZmFiID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLojrflj5bpooTorr7lpLHotKVcIiwgcGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgIH1cclxufSJdfQ==