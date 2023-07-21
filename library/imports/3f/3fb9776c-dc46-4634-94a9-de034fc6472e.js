"use strict";
cc._RF.push(module, '3fb97ds3EZGNJSp3gNPxkcu', 'PrivateMarqueeComp');
// hall/scripts/logic/core/component/PrivateMarqueeComp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PrivateMarqueeComp = /** @class */ (function (_super) {
    __extends(PrivateMarqueeComp, _super);
    function PrivateMarqueeComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameid = 0;
        return _this;
    }
    PrivateMarqueeComp.prototype.onLoad = function () {
        this.textNode = cc.find("text", this.node).getComponent(cc.RichText);
        var addNode = cc.find("tuwan_03", this.node);
        addNode.on(cc.Node.EventType.TOUCH_END, this.onOpenGame, this);
        this.updateUseInfo(null);
    };
    PrivateMarqueeComp.prototype.updateUseInfo = function (data) {
        if (data && data.gid != 0) {
            var gameInfo = Global.GameData.getGameInfo(data.gid);
            if (!gameInfo || gameInfo.name == null) {
                Logger.error("找不到gameid", data.gid);
                return;
            }
            this.gameid = data.gid;
            var text = "<outline color=#791e02 width=1>哇！玩家<color=#70f0f6>%s</color>太棒了，在<color=#ed0353>%s</color>游戏中一把赢得了<color=#fbed7b>%s</color>元！</outline>";
            var point = Global.Toolkit.formatPoint(data.point); //佣金或者返利数
            var msgStr = cc.js.formatStr(text, data.nickname, data.gname, point);
            this.textNode.string = msgStr;
        }
    };
    //界面销毁
    PrivateMarqueeComp.prototype.onDestroy = function () {
    };
    PrivateMarqueeComp.prototype.onOpenGame = function () {
        var _this = this;
        var gid = this.gameid;
        this.gameData = Global.GameData.getGameInfo(gid);
        Global.HotUpdateManager.CurrentGame = this.gameData.game_id;
        if (Game.Control.GAME_DDZ_HJ_ARR.indexOf(gid) >= 0) {
            //斗地主合集
            Global.HotUpdateManager.CurrentGame = "" + Game.Control.GAME_DDZ_HJ_ARR[0];
            Game.Control.curGid = gid;
        }
        if (Global.SceneManager.inGame())
            return;
        //百盛游戏
        if (this.gameData.gtype === 8) {
            if (this.checkVersion()) {
                var hallModel = Global.ModelManager.getModel("HallModel");
                hallModel.requestApplyEnterGame(this.gameData.game_id);
            }
            return;
        }
        //外接web游戏
        if (this.gameData.gameType === 9) {
            var hallModel = Global.ModelManager.getModel("HallModel");
            hallModel.requestApplyEnterGame(this.gameData.game_id);
        }
        if (!Global.HotUpdateManager.checkIsGameDownload(gid) && cc.sys.isNative) {
            Global.UI.fastTip("未下载游戏");
            return;
        }
        //没有更新游戏
        if (!Global.HotUpdateManager.checkIsGameNewest(gid) && cc.sys.isNative) {
            return;
        }
        var self = this;
        var enterFunc = function () { return __awaiter(_this, void 0, void 0, function () {
            var level;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Global.Setting.needHallChooseRoom && self.gameData.levels.length == 1 && self.gameData.gameType != 1) //除了PVP只有一个选场直接进游戏
                         {
                            level = self.gameData.levels[0].level || "l0";
                            if (!Global.Toolkit.checkMoney(level, self.gameData)) {
                                return [2 /*return*/];
                            }
                            Global.Event.event(GlobalEvent.RecordGameListOffsetX);
                            Game.Control.curLv = level;
                            if (self.gameData.levelType == 1) {
                                Game.Control.connnectAndEnterGame(self.gameData.game_id, "l0");
                            }
                            else {
                                Global.SceneManager.loadGameScene();
                            }
                            return [2 /*return*/];
                        }
                        Game.GamePreloadTool.setup(gid);
                        if (!Game.GamePreloadTool.checkPreloadBundleExist(gid)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Game.GamePreloadTool.preloadBundle()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.lobbyUIPath)];
                    case 2:
                        _a.sent();
                        Global.UI.show("WndGameLobbyShell", gid);
                        return [2 /*return*/];
                    case 3:
                        Global.Event.event(GlobalEvent.RecordGameListOffsetX);
                        if (self.gameData.levelType == 1) {
                            Game.Control.connnectAndEnterGame(self.gameData.game_id, "l0");
                        }
                        else {
                            Global.SceneManager.loadGameScene();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        //进游戏前判断是否拉到游戏配置
        if (!this.checkGameCfg()) {
            //弹框提示游戏没有配置
            Global.UI.showSingleBox("游戏配置没有拉到，请稍等~");
            return;
        }
        if (!this.checkMoney())
            return;
        if (!this.checkVersion())
            return;
        //检查是否需要显示横竖屏切换提示
        if (self.gameData.portraitModel) {
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    };
    PrivateMarqueeComp.prototype.onDisable = function () {
    };
    PrivateMarqueeComp.prototype.hideNode = function () {
        var _this = this;
        var hide = function () {
            _this.node.active = false;
        };
        if (this.node.active) {
            this.node.stopAllActions();
            this.node.opacity = 255;
            var ac = cc.fadeOut(0.5);
            var af = cc.callFunc(function () {
                hide();
                _this.node.opacity = 255;
            });
            var seq = cc.sequence(ac, af);
            this.node.runAction(seq);
            return;
        }
    };
    PrivateMarqueeComp.prototype.showNode = function (data) {
        var _this = this;
        this.updateUseInfo(data);
        var show = function () {
            _this.node.active = true;
        };
        this.node.y = -500;
        if (this.node) {
            this.node.stopAllActions();
            this.node.opacity = 255;
            var mv = cc.moveTo(0.2, 0, -200);
            var af = cc.callFunc(function () {
                show();
                _this.node.opacity = 255;
            });
            var seq = cc.sequence(mv, af);
            this.node.runAction(seq);
            Global.Component.scheduleOnce(function () {
                _this.hideNode();
            }, 10);
            return;
        }
    };
    PrivateMarqueeComp.prototype.checkMoney = function () {
        if (this.gameData.checkMoney) {
            if (this.gameData.levels && this.gameData.levels.length == 1) {
                var pointLow = this.gameData.levels[0].PointLow;
                if (Global.PlayerData.point < pointLow) {
                    var limit = Global.Toolkit.formatPointStr(pointLow);
                    var str = "游戏准入" + limit + "金币，请您充值哦！";
                    //Global.UI.fastTip();
                    Global.Toolkit.showMoneyNotEnough(str);
                    return false;
                }
            }
        }
        return true;
    };
    PrivateMarqueeComp.prototype.checkVersion = function () {
        if (this.gameData.supportVersion && this.gameData.supportVersion > 0) {
            if (!Global.Toolkit.checkVersionSupport(this.gameData.supportVersion, this.gameData.supportIosVersion)) {
                Global.UI.showYesNoBox("版本过旧，请下载新包使用该功能", function () {
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
                });
                return false;
            }
        }
        return true;
    };
    PrivateMarqueeComp.prototype.checkGameCfg = function () {
        //进游戏前判断是否拉到游戏配置
        if (this.gameData && this.gameData.levels && this.gameData.levels.length > 0) {
            return true;
        }
        return false;
    };
    PrivateMarqueeComp = __decorate([
        ccclass
    ], PrivateMarqueeComp);
    return PrivateMarqueeComp;
}(cc.Component));
exports.default = PrivateMarqueeComp;

cc._RF.pop();