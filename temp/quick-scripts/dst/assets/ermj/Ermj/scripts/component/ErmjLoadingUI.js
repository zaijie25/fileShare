
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/component/ErmjLoadingUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcY29tcG9uZW50XFxFcm1qTG9hZGluZ1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtEQUE2QztBQUM3Qyx5REFBb0Q7QUFDcEQsdURBQWtEO0FBQ2xELDRDQUF1QztBQUVqQyxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQWdJQztRQS9IVyxpQkFBVyxHQUFHO1lBQ2xCLFFBQVE7WUFDUix3QkFBYyxDQUFDLGVBQWUsR0FBRyx1QkFBdUI7WUFDeEQsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsdUJBQXVCO1lBQ3hELHdCQUFjLENBQUMsZUFBZSxHQUFHLGlCQUFpQjtTQUNyRCxDQUFDO1FBQ00saUJBQVcsR0FBRztZQUNsQixLQUFLO1lBQ0wsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsa0JBQWtCO1lBRW5ELHdCQUFjLENBQUMsZUFBZSxHQUFHLCtCQUErQjtZQUNoRSx3QkFBYyxDQUFDLGVBQWUsR0FBRyw4QkFBOEI7WUFDL0Qsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsK0JBQStCO1lBRWhFLHdCQUFjLENBQUMsZUFBZSxHQUFHLCtCQUErQjtZQUNoRSx3QkFBYyxDQUFDLGVBQWUsR0FBRyw2QkFBNkI7U0FDakUsQ0FBQztRQUNGLHFCQUFxQjtRQUNiLGtCQUFZLEdBQUc7WUFDbkIsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsd0JBQXdCO1lBQ3pELHdCQUFjLENBQUMsZUFBZSxHQUFHLHlCQUF5QjtZQUMxRCx3QkFBYyxDQUFDLGVBQWUsR0FBRyw2QkFBNkI7WUFDOUQsd0JBQWMsQ0FBQyxlQUFlLEdBQUcsNkJBQTZCO1lBQzlELHdCQUFjLENBQUMsZUFB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Q0FBQyx3QkFBYyxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pGLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLG9CQUFVLENBQUMsQ0FBQztRQUM3RCxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUcsaUJBQWlCO1FBQ3JELE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTyxpQ0FBUyxHQUFqQixVQUFrQixJQUFJO1FBQ2xCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckYsSUFBRyxNQUFNLElBQUksSUFBSSxFQUNqQjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQS9IZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQWdJakM7SUFBRCxvQkFBQztDQWhJRCxBQWdJQyxDQWhJMEMsRUFBRSxDQUFDLFNBQVMsR0FnSXREO2tCQWhJb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qTWFpblVJIGZyb20gXCIuLi9wYW5lbC9Fcm1qTWFpblVJXCI7XHJcbmltcG9ydCBFcm1qUGF0aEhlbHBlciBmcm9tIFwiLi4vZGF0YS9Fcm1qUGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBFcm1qRHJpdmVyIGZyb20gXCIuLi9Fcm1qRHJpdmVyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpMb2FkaW5nVUkgZXh0ZW5kcyBjYy5Db21wb25lbnR7XHJcbiAgICBwcml2YXRlIGRlcGVuZEF0bGFzID0gW1xyXG4gICAgICAgIC8vIGF0bGFzXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJkeW5hbWljL2F0bGFzX2R5bmFtaWNcIixcclxuICAgICAgICBFcm1qUGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcIm1haGpvbmcvYXRsYXNfbWFoam9uZ1wiLFxyXG4gICAgICAgIEVybWpQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwidHlwZS9hdGxhc190eXBlXCIsXHJcbiAgICBdO1xyXG4gICAgcHJpdmF0ZSBkZXBlbmRjZUFyciA9IFtcclxuICAgICAgICAvLyB1aVxyXG4gICAgICAgIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvRXJtak1haW5VSVwiLFxyXG5cclxuICAgICAgICBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL21haGpvbmcvbWFoam9uZ0hpbGxWaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9tYWhqb25nL21haGpvbmdPdXRWaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9tYWhqb25nL21haGpvbmdPcGVyVmlld1wiLFxyXG5cclxuICAgICAgICBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvbWF0Y2hQbGF5ZXJWaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2dhbWVTdGFydFZpZXdcIixcclxuICAgIF07XHJcbiAgICAvLyDlkIzml7bliqDovb3lpKrlpJrmnInmmI7mmL7ljaHpob/mhJ8sIOWIhuaJueWKoOi9vVxyXG4gICAgcHJpdmF0ZSBkZXBlbmRjZUFycjIgPSBbXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2RpY2VBbmltXCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L3J1Yk1qQW5pbVwiLFxyXG4gICAgICAgIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9hc2tBY3Rpb25WaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2Fza05vdGljZVZpZXdcIixcclxuICAgICAgICBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvc2VsZlBsYXlWaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L2Zsb3dWaWV3XCIsXHJcbiAgICAgICAgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9zdWJWaWV3L3NldHRsZVZpZXdcIixcclxuICAgICAgICBFcm1qUGF0aEhlbHBlci5nYW1lUHJlZmFic1BhdGggKyBcInBhbmVsL3N1YlZpZXcvd2luTGlnaHRuaW5nVmlld1wiLFxyXG4gICAgICAgIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9hdXRvQnRuVklld1wiLFxyXG4gICAgXTtcclxuICAgIHByaXZhdGUgbG9hZGluZ0NvbnRlbnQ6IGNjLk5vZGU7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQ29udGVudCA9IGNjLmZpbmQoXCJjb250ZW50XCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQ29udGVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhcnQoKXtcclxuICAgICAgICB0aGlzLmluaXRMb2FkaW5nKCk7XHJcbiAgICAgICAgdGhpcy5wcmVsb2FkUmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBpbml0TG9hZGluZygpe1xyXG4gICAgICAgIGlmIChHbG9iYWwuR2FtZURhdGEuY2hlY2tIYXNDdXN0b21Mb2FkaW5nICYmICFHbG9iYWwuR2FtZURhdGEuY2hlY2tIYXNDdXN0b21Mb2FkaW5nKEVybWpHYW1lQ29uc3QuR2lkKSl7XHJcbiAgICAgICAgICAgIGxldCBjb21wID0gYXdhaXQgR2xvYmFsLlVJSGVscGVyLmdldEdhbWVMb2FkaW5nQ29tcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250ZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb21wLm5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGNvbXAubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdDb250ZW50LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgcHJlbG9hZFJlcygpe1xyXG4gICAgICAgIGxldCBsb2FkQXRsYXMgPSAoKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgdGhpcy5kZXBlbmRBdGxhcywgKGVyciwgcmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGNjLlNwcml0ZUF0bGFzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxvYWRQcmVmYWIxID0gKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVSZXMoRXJtakdhbWVDb25zdC5HaWQsIHRoaXMuZGVwZW5kY2VBcnIsIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBudWxsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsb2FkUHJlZmFiMiA9ICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCB0aGlzLmRlcGVuZGNlQXJyMiwgKGVyciwgcmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIG51bGwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGF3YWl0IEhlYWRUaXBzTWFuYWdlci5wcmVsb2FkUmVzKCk7XHJcbiAgICAgICAgYXdhaXQgVGFza01hbmFnZXIucHJlbG9hZFJlcygpO1xyXG4gICAgICAgIGF3YWl0IGxvYWRBdGxhcygpO1xyXG4gICAgICAgIGF3YWl0IGxvYWRQcmVmYWIxKCk7XHJcbiAgICAgICAgYXdhaXQgbG9hZFByZWZhYjIoKTtcclxuICAgICAgICAvLyDpmLLmraJsb2Fk6L+H56iL5Lit5by66Lii5Yiw5aSn5Y6F5ZCO6LCD55So5oql6ZSZXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUgfHwgIWNjLmlzVmFsaWQodGhpcy5ub2RlKSB8fCAhRXJtakRyaXZlci5pbnN0YW5jZS5pbkdhbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgRXJtakRyaXZlci5pbnN0YW5jZS5zdGFydFNjZW5lKCk7XHJcbiAgICAgICAgfSwgMC41KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRVSSgpe1xyXG4gICAgICAgIGxldCBDYW52YXNOb2RlID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XHJcblxyXG4gICAgICAgIGxldCBmdWxsU2NyZWVuTGF5ZXI6Y2MuTm9kZSA9IEdsb2JhbC5VSS5nZXRMYXllcihcIkZ1bGxTY3JlZW5MYXllclwiKSB8fCBDYW52YXNOb2RlO1xyXG4gICAgICAgIGxldCBwb3BMYXllcjpjYy5Ob2RlID0gR2xvYmFsLlVJLmdldExheWVyKFwiUG9wTGF5ZXJcIikgfHwgQ2FudmFzTm9kZTtcclxuICAgICAgICBsZXQgbWFpblVJID0gdGhpcy5nZXRVSU5vZGUoRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9Fcm1qTWFpblVJXCIpO1xyXG4gICAgICAgIEVybWpEcml2ZXIuaW5zdGFuY2UubWFpblVJID0gbWFpblVJLmdldENvbXBvbmVudChFcm1qTWFpblVJKTtcclxuICAgICAgICBmdWxsU2NyZWVuTGF5ZXIuYWRkQ2hpbGQobWFpblVJKTsgICAvLyDmlL7liLDlkIzkuIDlsYLmrKHvvIzmlrnkvr/ov5vlhaXlnLrliqjnlLtcclxuICAgICAgICBtYWluVUkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRVSU5vZGUocGF0aCl7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEVybWpHYW1lQ29uc3QuR2lkLCBwYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmKHByZWZhYiA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6I635Y+W6aKE6K6+5aSx6LSlXCIsIHBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICB9XHJcbn0iXX0=