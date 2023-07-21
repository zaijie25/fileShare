
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PrivateMarqueeComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUHJpdmF0ZU1hcnF1ZWVDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBdU1DO1FBck1XLFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBcU12QixDQUFDO0lBbk1HLG1DQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3BFLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVELDBDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUM7WUFFckIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxJQUFJLEVB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QyxNQUFNLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDcEcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsQ0FBQTtnQkFDRixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLHlDQUFZLEdBQXBCO1FBQ0ksZ0JBQWdCO1FBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBdE1nQixrQkFBa0I7UUFEdEMsT0FBTztPQUNhLGtCQUFrQixDQXVNdEM7SUFBRCx5QkFBQztDQXZNRCxBQXVNQyxDQXZNK0MsRUFBRSxDQUFDLFNBQVMsR0F1TTNEO2tCQXZNb0Isa0JBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhbGxNb2RlbCBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcml2YXRlTWFycXVlZUNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSB0ZXh0Tm9kZTogY2MuUmljaFRleHQ7XHJcbiAgICBwcml2YXRlIGdhbWVpZCA9IDA7XHJcbiAgICBnYW1lRGF0YTogYW55O1xyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGUgPSBjYy5maW5kKFwidGV4dFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dClcclxuICAgICAgICBsZXQgYWRkTm9kZSA9IGNjLmZpbmQoXCJ0dXdhbl8wM1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIGFkZE5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uT3BlbkdhbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVXNlSW5mbyhudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVVzZUluZm8oZGF0YSkge1xyXG4gICAgICAgIGlmKGRhdGEgJiYgZGF0YS5naWQgIT0gMCl7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZGF0YS5naWQpO1xyXG4gICAgICAgICAgICBpZiAoIWdhbWVJbmZvIHx8IGdhbWVJbmZvLm5hbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwZ2FtZWlkXCIsIGRhdGEuZ2lkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVpZCA9IGRhdGEuZ2lkO1xyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IFwiPG91dGxpbmUgY29sb3I9Izc5MWUwMiB3aWR0aD0xPuWTh++8geeOqeWutjxjb2xvcj0jNzBmMGY2PiVzPC9jb2xvcj7lpKrmo5LkuobvvIzlnKg8Y29sb3I9I2VkMDM1Mz4lczwvY29sb3I+5ri45oiP5Lit5LiA5oqK6LWi5b6X5LqGPGNvbG9yPSNmYmVkN2I+JXM8L2NvbG9yPuWFg++8gTwvb3V0bGluZT5cIjtcclxuICAgICAgICAgICAgbGV0IHBvaW50ID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoZGF0YS5wb2ludCk7Ly/kvaPph5HmiJbogIXov5TliKnmlbBcclxuICAgICAgICAgICAgdmFyIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cih0ZXh0LGRhdGEubmlja25hbWUsZGF0YS5nbmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGUuc3RyaW5nID0gbXNnU3RyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eVjOmdoumUgOavgVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wZW5HYW1lKCkge1xyXG4gICAgICAgIGxldCBnaWQgPSB0aGlzLmdhbWVpZDtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdpZCk7XHJcbiAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuQ3VycmVudEdhbWUgPSB0aGlzLmdhbWVEYXRhLmdhbWVfaWQ7XHJcbiAgICAgICAgaWYoR2FtZS5Db250cm9sLkdBTUVfRERaX0hKX0FSUi5pbmRleE9mKGdpZCkgPj0gMCl7XHJcbiAgICAgICAgICAgIC8v5paX5Zyw5Li75ZCI6ZuGXHJcbiAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLkN1cnJlbnRHYW1lID0gXCJcIiArIEdhbWUuQ29udHJvbC5HQU1FX0REWl9ISl9BUlJbMF07XHJcbiAgICAgICAgICAgIEdhbWUuQ29udHJvbC5jdXJHaWQgPSBnaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/nmb7nm5vmuLjmiI9cclxuICAgICAgICBpZiAodGhpcy5nYW1lRGF0YS5ndHlwZSA9PT0gOCl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrVmVyc2lvbigpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaGFsbE1vZGVsOkhhbGxNb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIilcclxuICAgICAgICAgICAgICAgIGhhbGxNb2RlbC5yZXF1ZXN0QXBwbHlFbnRlckdhbWUodGhpcy5nYW1lRGF0YS5nYW1lX2lkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lpJbmjqV3ZWLmuLjmiI9cclxuICAgICAgICBpZiAodGhpcy5nYW1lRGF0YS5nYW1lVHlwZSA9PT0gOSl7XHJcbiAgICAgICAgICAgIGxldCBoYWxsTW9kZWw6SGFsbE1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkhhbGxNb2RlbFwiKVxyXG4gICAgICAgICAgICBoYWxsTW9kZWwucmVxdWVzdEFwcGx5RW50ZXJHYW1lKHRoaXMuZ2FtZURhdGEuZ2FtZV9pZClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIUdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmNoZWNrSXNHYW1lRG93bmxvYWQoZ2lkKSAmJiBjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuacquS4i+i9vea4uOaIj1wiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+ayoeacieabtOaWsOa4uOaIj1xyXG4gICAgICAgIGlmKCFHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5jaGVja0lzR2FtZU5ld2VzdChnaWQpICYmIGNjLnN5cy5pc05hdGl2ZSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBlbnRlckZ1bmMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5uZWVkSGFsbENob29zZVJvb20gJiYgc2VsZi5nYW1lRGF0YS5sZXZlbHMubGVuZ3RoID09IDEgJiYgc2VsZi5nYW1lRGF0YS5nYW1lVHlwZSAhPSAxKSAvL+mZpOS6hlBWUOWPquacieS4gOS4qumAieWcuuebtOaOpei/m+a4uOaIj1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGV2ZWwgPSBzZWxmLmdhbWVEYXRhLmxldmVsc1swXS5sZXZlbCB8fCBcImwwXCJcclxuICAgICAgICAgICAgICAgIGlmKCFHbG9iYWwuVG9vbGtpdC5jaGVja01vbmV5KGxldmVsLHNlbGYuZ2FtZURhdGEpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlJlY29yZEdhbWVMaXN0T2Zmc2V0WCk7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wuY3VyTHYgPSBsZXZlbFxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZ2FtZURhdGEubGV2ZWxUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wuY29ubm5lY3RBbmRFbnRlckdhbWUoc2VsZi5nYW1lRGF0YS5nYW1lX2lkLCBcImwwXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5sb2FkR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR2FtZS5HYW1lUHJlbG9hZFRvb2wuc2V0dXAoZ2lkKTtcclxuICAgICAgICAgICAgaWYgKEdhbWUuR2FtZVByZWxvYWRUb29sLmNoZWNrUHJlbG9hZEJ1bmRsZUV4aXN0KGdpZCkpeyAgICAgICAgLy8g6YWN572u5LqG6LWw5ri45oiP6YCJ5Zy6XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBHYW1lLkdhbWVQcmVsb2FkVG9vbC5wcmVsb2FkQnVuZGxlKCk7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBHYW1lLkdhbWVQcmVsb2FkVG9vbC5wcmVsb2FkUHJlZmFiKEdhbWUuR2FtZVByZWxvYWRUb29sLmxvYmJ5VUlQYXRoKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kR2FtZUxvYmJ5U2hlbGxcIiwgZ2lkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuUmVjb3JkR2FtZUxpc3RPZmZzZXRYKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZ2FtZURhdGEubGV2ZWxUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIEdhbWUuQ29udHJvbC5jb25ubmVjdEFuZEVudGVyR2FtZShzZWxmLmdhbWVEYXRhLmdhbWVfaWQsIFwibDBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmxvYWRHYW1lU2NlbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i/m+a4uOaIj+WJjeWIpOaWreaYr+WQpuaLieWIsOa4uOaIj+mFjee9rlxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0dhbWVDZmcoKSkge1xyXG4gICAgICAgICAgICAvL+W8ueahhuaPkOekuua4uOaIj+ayoeaciemFjee9rlxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIua4uOaIj+mFjee9ruayoeacieaLieWIsO+8jOivt+eojeetiX5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja01vbmV5KCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmVyc2lvbigpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/mo4Dmn6XmmK/lkKbpnIDopoHmmL7npLrmqKrnq5blsY/liIfmjaLmj5DnpLpcclxuICAgICAgICBpZiAoc2VsZi5nYW1lRGF0YS5wb3J0cmFpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93UG9ydHJhaXRTY3JlZW5Ob3RpY2UoZW50ZXJGdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVudGVyRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBoaWRlTm9kZSgpIHtcclxuICAgICAgICBsZXQgaGlkZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIHZhciBhYyA9IGNjLmZhZGVPdXQoMC41KTtcclxuICAgICAgICAgICAgdmFyIGFmID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoYWMsIGFmKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihzZXEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzaG93Tm9kZShkYXRhKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVc2VJbmZvKGRhdGEpXHJcbiAgICAgICAgbGV0IHNob3cgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUueSA9IC01MDA7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIHZhciBtdiA9IGNjLm1vdmVUbygwLjIsIDAsIC0yMDApO1xyXG4gICAgICAgICAgICB2YXIgYWYgPSBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzaG93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShtdiwgYWYpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHNlcSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5vZGUoKVxyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja01vbmV5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLmNoZWNrTW9uZXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEubGV2ZWxzICYmIHRoaXMuZ2FtZURhdGEubGV2ZWxzLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnRMb3cgPSB0aGlzLmdhbWVEYXRhLmxldmVsc1swXS5Qb2ludExvdztcclxuICAgICAgICAgICAgICAgIGlmIChHbG9iYWwuUGxheWVyRGF0YS5wb2ludCA8IHBvaW50TG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpbWl0ID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocG9pbnRMb3cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBcIua4uOaIj+WHhuWFpVwiICsgbGltaXQgKyBcIumHkeW4ge+8jOivt+aCqOWFheWAvOWTpu+8gVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9HbG9iYWwuVUkuZmFzdFRpcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LnNob3dNb25leU5vdEVub3VnaChzdHIpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tWZXJzaW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLnN1cHBvcnRWZXJzaW9uICYmIHRoaXMuZ2FtZURhdGEuc3VwcG9ydFZlcnNpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLlRvb2xraXQuY2hlY2tWZXJzaW9uU3VwcG9ydCh0aGlzLmdhbWVEYXRhLnN1cHBvcnRWZXJzaW9uLCB0aGlzLmdhbWVEYXRhLnN1cHBvcnRJb3NWZXJzaW9uKSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dZZXNOb0JveChcIueJiOacrOi/h+aXp++8jOivt+S4i+i9veaWsOWMheS9v+eUqOivpeWKn+iDvVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlNldHRpbmcuVXJscy5kb3duTG9hZFVybCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tHYW1lQ2ZnKCkge1xyXG4gICAgICAgIC8v6L+b5ri45oiP5YmN5Yik5pat5piv5ZCm5ouJ5Yiw5ri45oiP6YWN572uXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEgJiYgdGhpcy5nYW1lRGF0YS5sZXZlbHMgJiYgdGhpcy5nYW1lRGF0YS5sZXZlbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59Il19