
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/preload/script/ErmjLobbyUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c04b42JG1CA65ZHv59Zg/b', 'ErmjLobbyUI');
// ermj/preload/script/ErmjLobbyUI.ts

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
var GameId = 2101;
var ErmjLobbyUI = /** @class */ (function (_super) {
    __extends(ErmjLobbyUI, _super);
    function ErmjLobbyUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curGameId = GameId;
        _this.defaultLevel = [
            {
                "level": "l0",
                "SceneName": "新手场",
                "PointLow": 300000,
                "PointRate": 10000
            },
            {
                "level": "l1",
                "SceneName": "老炮场",
                "PointLow": 3000000,
                "PointRate": 100000
            },
            {
                "level": "l2",
                "SceneName": "雀神场",
                "PointLow": 30000000,
                "PointRate": 1000000
            },
            {
                "level": "l3",
                "SceneName": "皇家场",
                "PointLow": 200000000,
                "PointRate": 2000000
            }
        ];
        _this.levelToBtnIndexMap = {
            "l0": 0,
            "l1": 1,
            "l2": 2,
        };
        _this.levelItemList = [];
        return _this;
    }
    ErmjLobbyUI.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.topNode = cc.find("topNode", this.node);
        this.bottomNode = cc.find("bottomNode", this.node);
        this.centerNode = cc.find("centerNode", this.node);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/leaveBtn", this.onLeaveClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/ruleBtn", this.onRuleClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/settingBtn", this.onSettingClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "bottomNode/content/quickStartBtn", this.onQuickStartClick, this, cc.Button.Transition.SCALE, null, false);
        this.selfInfoView = Global.UIHelper.safeGetComponent(this.node, "bottomNode/content", SelfInfoView);
        this.initLevel();
        var pmdNode = cc.find('topNode/paoMaDengBox', this.node);
        Global.UIHelper.addPaoMaDengComp(cc.find('topNode/paoMaDengBox/MsgBox', this.node), false, pmdNode);
        Global.UIHelper.addWifiComp(cc.find('topNode/content/wifiNode', this.node), 1);
        Global.Toolkit.adjustIphoneX([
            cc.find("topNode/content", this.node),
        ]);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.centerNode, cc.find("mask", this.node));
    };
    ErmjLobbyUI.prototype.initLevel = function () {
        this.levelItemList = [];
        for (var i = 0; i < 3; i++) {
            var btn = cc.find("centerNode/layout/level" + String(i), this.node);
            var item = Global.UIHelper.safeGetComponent(btn, "", ErmjLevelItem);
            item.setCallback(this.onLevelItemAct, this);
            this.levelItemList.push(item);
        }
    };
    ErmjLobbyUI.prototype.refreshPlayerInfo = function () {
        this.selfInfoView.updateInfo();
    };
    ErmjLobbyUI.prototype.onEnable = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPlayerInfo);
        this.refreshPlayerInfo();
        this.updateLevelItem();
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
        // Game.Control.checkQueryState(this.curGameId, null);
        this.animComp.doFullScreenOpenAnim(this.topNode, null, [this.centerNode], this.bottomNode);
        Game.GamePreloadTool.lazyPreloadPrefab();
    };
    ErmjLobbyUI.prototype.onLeaveClick = function () {
        Global.Audio.playBtnSound();
        Game.Event.event(GlobalEvent.OnCloseGameLobby);
    };
    ErmjLobbyUI.prototype.onRuleClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Global.Audio.playBtnSound();
                        if (!(this.rulePop && cc.isValid(this.rulePop))) return [3 /*break*/, 1];
                        this.rulePop.active = true;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.rulePop, true)];
                    case 2:
                        prefab = _a.sent();
                        if (this.node && cc.isValid(this.node) && prefab && cc.isValid(prefab)) {
                            node = cc.instantiate(prefab);
                            node.setParent(Global.UI.getLayer("PopLayer"));
                            node.active = true;
                            this.rulePop = node;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ErmjLobbyUI.prototype.onSettingClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prefab, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Global.Audio.playBtnSound();
                        if (!(this.settingPop && cc.isValid(this.settingPop))) return [3 /*break*/, 1];
                        this.settingPop.active = true;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.settingPop, true)];
                    case 2:
                        prefab = _a.sent();
                        if (this.node && cc.isValid(this.node) && prefab && cc.isValid(prefab)) {
                            node = cc.instantiate(prefab);
                            node.setParent(Global.UI.getLayer("PopLayer"));
                            node.active = true;
                            this.settingPop = node;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ErmjLobbyUI.prototype.onQuickStartClick = function () {
        Global.Audio.playBtnSound();
        var data = Global.GameData.getGameInfo(this.curGameId);
        var arr = data.levels;
        if (!arr || arr.length <= 0) {
            return;
        }
        var level = arr[0].level;
        var temp = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            var datas = arr[i];
            if (datas.PointLow <= Global.PlayerData.point && datas.PointLow > temp) {
                temp = datas;
                level = datas.level;
            }
        }
        Game.Event.event(GlobalEvent.OnGotoGameScene, level);
    };
    ErmjLobbyUI.prototype.updateLevelItem = function () {
        var data = Global.GameData.getGameInfo(this.curGameId);
        var arr;
        if (!data || !data.levels || Global.Toolkit.isEmptyObject(data.levels)) {
            arr = this.defaultLevel;
        }
        else {
            arr = data.levels;
        }
        for (var i = 0; i < this.levelItemList.length; i++) {
            this.levelItemList[i].node.active = false;
        }
        for (var i = 0; i < arr.length; i++) {
            var data_1 = arr[i];
            var levelStr = data_1.level;
            var index = this.levelToBtnIndexMap[levelStr];
            if (index != null && index < this.levelItemList.length) {
                var item = this.levelItemList[index];
                this.levelItemList[index].node.active = true;
                item.setLevel(levelStr);
                item.setItemStyle(data_1.PointRate, data_1.PointLow);
            }
        }
    };
    ErmjLobbyUI.prototype.onLevelItemAct = function (level) {
        // if (Global.SceneManager.inGame()){
        //     this.reqEnterGame(this.curGameId, level);
        // }
        // else{
        Game.Event.event(GlobalEvent.OnGotoGameScene, level);
        // }
    };
    //请求进入房间
    ErmjLobbyUI.prototype.reqEnterGame = function (gid, glv, gsc) {
        if (gsc === void 0) { gsc = "default"; }
        Game.Control.connnectAndEnterGameInLevelScene(gid, glv, gsc, null);
    };
    ErmjLobbyUI.prototype.onDestroy = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPlayerInfo);
    };
    ErmjLobbyUI.prototype.onDisable = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPlayerInfo);
        if (this.rulePop && cc.isValid(this.rulePop)) {
            this.rulePop.removeFromParent();
            this.rulePop.destroy();
            this.rulePop = null;
        }
        if (this.settingPop && cc.isValid(this.settingPop)) {
            this.settingPop.removeFromParent();
            this.settingPop.destroy();
            this.settingPop = null;
        }
    };
    ErmjLobbyUI = __decorate([
        ccclass
    ], ErmjLobbyUI);
    return ErmjLobbyUI;
}(cc.Component));
exports.default = ErmjLobbyUI;
var ErmjLevelItem = /** @class */ (function (_super) {
    __extends(ErmjLevelItem, _super);
    function ErmjLevelItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._enable = true;
        return _this;
    }
    ErmjLevelItem.prototype.setCallback = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    ErmjLevelItem.prototype.onLoad = function () {
        this.sk = cc.find("content/bg/sk", this.node).getComponent(sp.Skeleton);
        this.baseLbl = cc.find("content/baseNode/baseLbl", this.node).getComponent(cc.Label);
        this.limitLbl = cc.find("content/limitNode/limitLbl", this.node).getComponent(cc.Label);
        Global.UIHelper.addCommonClick(this.node, "", this.onItemClick, this, cc.Button.Transition.SCALE, null, false);
    };
    ErmjLevelItem.prototype.setLevel = function (level) {
        this.level = level;
    };
    ErmjLevelItem.prototype.setItemStyle = function (nBase, nLimit) {
        this.baseLbl.string = Global.Toolkit.formatPointStr(nBase) + "\u5E95\u5206";
        this.limitLbl.string = "" + Global.Toolkit.formatPointStr(nLimit);
    };
    ErmjLevelItem.prototype.onItemClick = function () {
        Global.Audio.playBtnSound();
        if (!this._enable)
            return;
        if (this.callback) {
            this.callback.call(this.target, this.level);
        }
    };
    ErmjLevelItem.prototype.setItemGray = function (flag) {
        this._enable = !flag;
        if (flag) {
            this.sk.clearTracks();
        }
        Global.UIHelper.setNodeGray(this.sk.node, flag, 80);
        Global.UIHelper.setNodeGray(cc.find('content', this.node), flag, 80);
    };
    return ErmjLevelItem;
}(cc.Component));
var SelfInfoView = /** @class */ (function (_super) {
    __extends(SelfInfoView, _super);
    function SelfInfoView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelfInfoView.prototype.onLoad = function () {
        this.nameLbl = cc.find("nameNode/nameLbl", this.node).getComponent(cc.Label);
        this.idLbl = cc.find("nameNode/idLbl", this.node).getComponent(cc.Label);
        this.headImg = cc.find("nameNode/mask/headImg", this.node).getComponent(cc.Sprite);
        this.headBox = cc.find("nameNode/headBox", this.node).getComponent(cc.Sprite);
        this.coinLbl = cc.find("coinNode/coinLbl", this.node).getComponent(cc.Label);
        Global.UIHelper.addCommonClick(this.node, "coinNode/btn_cz", this.openRecharge, this);
    };
    SelfInfoView.prototype.openRecharge = function () {
        Global.Audio.playBtnSound();
        Global.UI.show("WndRecharge");
    };
    SelfInfoView.prototype.updateInfo = function () {
        var player = Global.PlayerData;
        this.nameLbl.string = player.nickname;
        this.idLbl.string = 'ID:' + player.uid;
        this.coinLbl.string = Global.Toolkit.formatPointStr(player.point, true);
        this.loadHeadImg(player.headimg);
        this.loadHeadBox(player.headkuang);
    };
    SelfInfoView.prototype.loadHeadImg = function (str) {
        var w = this.headImg.node.width;
        var h = this.headImg.node.height;
        this.headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(str);
        this.headImg.node.width = w;
        this.headImg.node.height = h;
    };
    SelfInfoView.prototype.loadHeadBox = function (str) {
        var w = this.headBox.node.width;
        var h = this.headBox.node.height;
        // Global.Toolkit.loadLocalHeadFrame(this.headBox, str);
        // this.headBox.node.width = w;
        // this.headBox.node.height = h;
        var atlasString = "texture/headFrame/headFrame";
        var sfString = "txkuang_vip" + str;
        Global.ResourceManager.loadBundleAutoAtlas("2101_preload", this.headBox, atlasString, sfString, null, true);
    };
    return SelfInfoView;
}(cc.Component));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxccHJlbG9hZFxcc2NyaXB0XFxFcm1qTG9iYnlVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFHcEI7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFrTkM7UUFqTlcsZUFBUyxHQUFHLE1BQU0sQ0FBQztRQUNWLGtCQUFZLEdBQUc7WUFDNUI7Z0JBQ0ksT0FBTyxFQUFFLElBQUk7Z0JBQ2IsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixXQUFXLEVBQUUsS0FBSzthQUNyQjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixVQUFVLEVBQUUsT0FBTztnQkFDbkIsV0FBVyxFQUFFLE1BQU07YUFDdEI7WUFDRDtnQkFDSSxPQUFPLEVBQUUsSUFBSTtnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLFdBQVcsRUFBRSxPQUFPO2FBQ3ZCO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLElBQUk7Z0JBQ2IsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsT0FBTzthQUN2QjtTQUNKLENBQUM7UUFDTSx3QkFBa0IsR0FBRztZQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFBO1FBQ08sbUJBQWEsR0FBb0IsRUFBRSxDQUFDOztJQWlMaEQsQ0FBQztJQXZLRyw0QkFBTSxHQUFOO1FBQ0ksSUFBSSxD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ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5jb25zdCBHYW1lSWQgPSAyMTAxO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakxvYmJ5VUkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBjdXJHYW1lSWQgPSBHYW1lSWQ7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRMZXZlbCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogXCJsMFwiLFxyXG4gICAgICAgICAgICBcIlNjZW5lTmFtZVwiOiBcIuaWsOaJi+WculwiLFxyXG4gICAgICAgICAgICBcIlBvaW50TG93XCI6IDMwMDAwMCxcclxuICAgICAgICAgICAgXCJQb2ludFJhdGVcIjogMTAwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiBcImwxXCIsXHJcbiAgICAgICAgICAgIFwiU2NlbmVOYW1lXCI6IFwi6ICB54Ku5Zy6XCIsXHJcbiAgICAgICAgICAgIFwiUG9pbnRMb3dcIjogMzAwMDAwMCxcclxuICAgICAgICAgICAgXCJQb2ludFJhdGVcIjogMTAwMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogXCJsMlwiLFxyXG4gICAgICAgICAgICBcIlNjZW5lTmFtZVwiOiBcIumbgOelnuWculwiLFxyXG4gICAgICAgICAgICBcIlBvaW50TG93XCI6IDMwMDAwMDAwLFxyXG4gICAgICAgICAgICBcIlBvaW50UmF0ZVwiOiAxMDAwMDAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwibGV2ZWxcIjogXCJsM1wiLFxyXG4gICAgICAgICAgICBcIlNjZW5lTmFtZVwiOiBcIueah+WutuWculwiLFxyXG4gICAgICAgICAgICBcIlBvaW50TG93XCI6IDIwMDAwMDAwMCxcclxuICAgICAgICAgICAgXCJQb2ludFJhdGVcIjogMjAwMDAwMFxyXG4gICAgICAgIH1cclxuICAgIF07XHJcbiAgICBwcml2YXRlIGxldmVsVG9CdG5JbmRleE1hcCA9IHtcclxuICAgICAgICBcImwwXCI6IDAsXHJcbiAgICAgICAgXCJsMVwiOiAxLFxyXG4gICAgICAgIFwibDJcIjogMixcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGV2ZWxJdGVtTGlzdDogRXJtakxldmVsSXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIHNlbGZJbmZvVmlldzogU2VsZkluZm9WaWV3O1xyXG4gICAgcHJpdmF0ZSB0b3BOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBib3R0b21Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgcnVsZVBvcDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc2V0dGluZ1BvcDogY2MuTm9kZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdGhpcy50b3BOb2RlID0gY2MuZmluZChcInRvcE5vZGVcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmJvdHRvbU5vZGUgPSBjYy5maW5kKFwiYm90dG9tTm9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuY2VudGVyTm9kZSA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlXCIsIHRoaXMubm9kZSk7XHJcblxyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidG9wTm9kZS9jb250ZW50L2xlYXZlQnRuXCIsIHRoaXMub25MZWF2ZUNsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidG9wTm9kZS9jb250ZW50L3J1bGVCdG5cIiwgdGhpcy5vblJ1bGVDbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcInRvcE5vZGUvY29udGVudC9zZXR0aW5nQnRuXCIsIHRoaXMub25TZXR0aW5nQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJib3R0b21Ob2RlL2NvbnRlbnQvcXVpY2tTdGFydEJ0blwiLCB0aGlzLm9uUXVpY2tTdGFydENsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgbnVsbCwgZmFsc2UpO1xyXG5cclxuICAgICAgICB0aGlzLnNlbGZJbmZvVmlldyA9IDxTZWxmSW5mb1ZpZXc+R2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5ub2RlLCBcImJvdHRvbU5vZGUvY29udGVudFwiLCBTZWxmSW5mb1ZpZXcpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsKCk7XHJcblxyXG4gICAgICAgIGxldCBwbWROb2RlID0gY2MuZmluZCgndG9wTm9kZS9wYW9NYURlbmdCb3gnLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRQYW9NYURlbmdDb21wKGNjLmZpbmQoJ3RvcE5vZGUvcGFvTWFEZW5nQm94L01zZ0JveCcsIHRoaXMubm9kZSksIGZhbHNlLCBwbWROb2RlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkV2lmaUNvbXAoY2MuZmluZCgndG9wTm9kZS9jb250ZW50L3dpZmlOb2RlJywgdGhpcy5ub2RlKSwgMSlcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5hZGp1c3RJcGhvbmVYKFtcclxuICAgICAgICAgICAgY2MuZmluZChcInRvcE5vZGUvY29udGVudFwiLCB0aGlzLm5vZGUpLFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICB0aGlzLmFuaW1Db21wID0gR2xvYmFsLlVJSGVscGVyLmFkZEFuaW1Db21wKHRoaXMubm9kZSwgdGhpcy5jZW50ZXJOb2RlLCBjYy5maW5kKFwibWFza1wiLCB0aGlzLm5vZGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLmxldmVsSXRlbUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnRuID0gY2MuZmluZChcImNlbnRlck5vZGUvbGF5b3V0L2xldmVsXCIgKyBTdHJpbmcoaSksIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gPEVybWpMZXZlbEl0ZW0+R2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQoYnRuLCBcIlwiLCBFcm1qTGV2ZWxJdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5zZXRDYWxsYmFjayh0aGlzLm9uTGV2ZWxJdGVtQWN0LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbEl0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBsYXllckluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5zZWxmSW5mb1ZpZXcudXBkYXRlSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQbGF5ZXJJbmZvKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoUGxheWVySW5mbygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGV2ZWxJdGVtKCk7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRVc2VyUG9pbnQsIHt9KTtcclxuICAgICAgICAvLyBHYW1lLkNvbnRyb2wuY2hlY2tRdWVyeVN0YXRlKHRoaXMuY3VyR2FtZUlkLCBudWxsKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltQ29tcC5kb0Z1bGxTY3JlZW5PcGVuQW5pbSh0aGlzLnRvcE5vZGUsIG51bGwsIFt0aGlzLmNlbnRlck5vZGVdLCB0aGlzLmJvdHRvbU5vZGUpO1xyXG5cclxuICAgICAgICBHYW1lLkdhbWVQcmVsb2FkVG9vbC5sYXp5UHJlbG9hZFByZWZhYigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25MZWF2ZUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk9uQ2xvc2VHYW1lTG9iYnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgb25SdWxlQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnJ1bGVQb3AgJiYgY2MuaXNWYWxpZCh0aGlzLnJ1bGVQb3ApKSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVsZVBvcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IEdhbWUuR2FtZVByZWxvYWRUb29sLnByZWxvYWRQcmVmYWIoR2FtZS5HYW1lUHJlbG9hZFRvb2wucnVsZVBvcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLm5vZGUpICYmIHByZWZhYiAmJiBjYy5pc1ZhbGlkKHByZWZhYikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KEdsb2JhbC5VSS5nZXRMYXllcihcIlBvcExheWVyXCIpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVsZVBvcCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBvblNldHRpbmdDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ1BvcCAmJiBjYy5pc1ZhbGlkKHRoaXMuc2V0dGluZ1BvcCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nUG9wLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gYXdhaXQgR2FtZS5HYW1lUHJlbG9hZFRvb2wucHJlbG9hZFByZWZhYihHYW1lLkdhbWVQcmVsb2FkVG9vbC5zZXR0aW5nUG9wLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSAmJiBjYy5pc1ZhbGlkKHRoaXMubm9kZSkgJiYgcHJlZmFiICYmIGNjLmlzVmFsaWQocHJlZmFiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoR2xvYmFsLlVJLmdldExheWVyKFwiUG9wTGF5ZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nUG9wID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUXVpY2tTdGFydENsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBsZXQgZGF0YSA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyh0aGlzLmN1ckdhbWVJZCk7XHJcbiAgICAgICAgbGV0IGFyciA9IGRhdGEubGV2ZWxzO1xyXG4gICAgICAgIGlmICghYXJyIHx8IGFyci5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsZXZlbCA9IGFyclswXS5sZXZlbDtcclxuICAgICAgICBsZXQgdGVtcCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YXMgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIGlmIChkYXRhcy5Qb2ludExvdyA8PSBHbG9iYWwuUGxheWVyRGF0YS5wb2ludCAmJiBkYXRhcy5Qb2ludExvdyA+IHRlbXApIHtcclxuICAgICAgICAgICAgICAgIHRlbXAgPSBkYXRhcztcclxuICAgICAgICAgICAgICAgIGxldmVsID0gZGF0YXMubGV2ZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHbG9iYWxFdmVudC5PbkdvdG9HYW1lU2NlbmUsIGxldmVsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVMZXZlbEl0ZW0oKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8odGhpcy5jdXJHYW1lSWQpO1xyXG4gICAgICAgIGxldCBhcnI6IGFueVtdO1xyXG4gICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5sZXZlbHMgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChkYXRhLmxldmVscykpIHtcclxuICAgICAgICAgICAgYXJyID0gdGhpcy5kZWZhdWx0TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcnIgPSBkYXRhLmxldmVscztcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsSXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sZXZlbEl0ZW1MaXN0W2ldLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxTdHIgPSBkYXRhLmxldmVsO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmxldmVsVG9CdG5JbmRleE1hcFtsZXZlbFN0cl07XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBudWxsICYmIGluZGV4IDwgdGhpcy5sZXZlbEl0ZW1MaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmxldmVsSXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbEl0ZW1MaXN0W2luZGV4XS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldExldmVsKGxldmVsU3RyKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0SXRlbVN0eWxlKGRhdGEuUG9pbnRSYXRlLCBkYXRhLlBvaW50TG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGV2ZWxJdGVtQWN0KGxldmVsOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucmVxRW50ZXJHYW1lKHRoaXMuY3VyR2FtZUlkLCBsZXZlbCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHbG9iYWxFdmVudC5PbkdvdG9HYW1lU2NlbmUsIGxldmVsKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7fmsYLov5vlhaXmiL/pl7RcclxuICAgIHByaXZhdGUgcmVxRW50ZXJHYW1lKGdpZDogbnVtYmVyLCBnbHY6IHN0cmluZywgZ3NjOiBzdHJpbmcgPSBcImRlZmF1bHRcIikge1xyXG4gICAgICAgIEdhbWUuQ29udHJvbC5jb25ubmVjdEFuZEVudGVyR2FtZUluTGV2ZWxTY2VuZShnaWQsIGdsdiwgZ3NjLCBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQbGF5ZXJJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQbGF5ZXJJbmZvKTtcclxuICAgICAgICBpZiAodGhpcy5ydWxlUG9wICYmIGNjLmlzVmFsaWQodGhpcy5ydWxlUG9wKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5nUG9wICYmIGNjLmlzVmFsaWQodGhpcy5zZXR0aW5nUG9wKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdQb3AucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdQb3AuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdQb3AgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEVybWpMZXZlbEl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSBiYXNlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbGltaXRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBsZXZlbDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIF9lbmFibGUgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHRhcmdldDogYW55XHJcblxyXG4gICAgcHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLnNrID0gY2MuZmluZChcImNvbnRlbnQvYmcvc2tcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuYmFzZUxibCA9IGNjLmZpbmQoXCJjb250ZW50L2Jhc2VOb2RlL2Jhc2VMYmxcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubGltaXRMYmwgPSBjYy5maW5kKFwiY29udGVudC9saW1pdE5vZGUvbGltaXRMYmxcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25JdGVtQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldExldmVsKGxldmVsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxldmVsID0gbGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEl0ZW1TdHlsZShuQmFzZTogbnVtYmVyLCBuTGltaXQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmFzZUxibC5zdHJpbmcgPSBgJHtHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihuQmFzZSl95bqV5YiGYDtcclxuICAgICAgICB0aGlzLmxpbWl0TGJsLnN0cmluZyA9IGAke0dsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKG5MaW1pdCl9YDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSXRlbUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2VuYWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnRhcmdldCwgdGhpcy5sZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtR3JheShmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZW5hYmxlID0gIWZsYWc7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zay5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuc2V0Tm9kZUdyYXkodGhpcy5zay5ub2RlLCBmbGFnLCA4MCk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KGNjLmZpbmQoJ2NvbnRlbnQnLCB0aGlzLm5vZGUpLCBmbGFnLCA4MCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlbGZJbmZvVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIG5hbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBpZExibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGhlYWRJbWc6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgaGVhZEJveDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBjb2luTGJsOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubmFtZUxibCA9IGNjLmZpbmQoXCJuYW1lTm9kZS9uYW1lTGJsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmlkTGJsID0gY2MuZmluZChcIm5hbWVOb2RlL2lkTGJsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmhlYWRJbWcgPSBjYy5maW5kKFwibmFtZU5vZGUvbWFzay9oZWFkSW1nXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oZWFkQm94ID0gY2MuZmluZChcIm5hbWVOb2RlL2hlYWRCb3hcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmNvaW5MYmwgPSBjYy5maW5kKFwiY29pbk5vZGUvY29pbkxibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJjb2luTm9kZS9idG5fY3pcIiwgdGhpcy5vcGVuUmVjaGFyZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlblJlY2hhcmdlKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlY2hhcmdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVJbmZvKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gcGxheWVyLm5pY2tuYW1lO1xyXG4gICAgICAgIHRoaXMuaWRMYmwuc3RyaW5nID0gJ0lEOicgKyBwbGF5ZXIudWlkO1xyXG4gICAgICAgIHRoaXMuY29pbkxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihwbGF5ZXIucG9pbnQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMubG9hZEhlYWRJbWcocGxheWVyLmhlYWRpbWcpO1xyXG4gICAgICAgIHRoaXMubG9hZEhlYWRCb3gocGxheWVyLmhlYWRrdWFuZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkSGVhZEltZyhzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5oZWFkSW1nLm5vZGUud2lkdGg7XHJcbiAgICAgICAgbGV0IGggPSB0aGlzLmhlYWRJbWcubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2Yoc3RyKTtcclxuICAgICAgICB0aGlzLmhlYWRJbWcubm9kZS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLm5vZGUuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRIZWFkQm94KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHcgPSB0aGlzLmhlYWRCb3gubm9kZS53aWR0aDtcclxuICAgICAgICBsZXQgaCA9IHRoaXMuaGVhZEJveC5ub2RlLmhlaWdodDtcclxuICAgICAgICAvLyBHbG9iYWwuVG9vbGtpdC5sb2FkTG9jYWxIZWFkRnJhbWUodGhpcy5oZWFkQm94LCBzdHIpO1xyXG4gICAgICAgIC8vIHRoaXMuaGVhZEJveC5ub2RlLndpZHRoID0gdztcclxuICAgICAgICAvLyB0aGlzLmhlYWRCb3gubm9kZS5oZWlnaHQgPSBoO1xyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IFwidGV4dHVyZS9oZWFkRnJhbWUvaGVhZEZyYW1lXCI7XHJcbiAgICAgICAgdmFyIHNmU3RyaW5nID0gXCJ0eGt1YW5nX3ZpcFwiICsgc3RyO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhcIjIxMDFfcHJlbG9hZFwiLCB0aGlzLmhlYWRCb3gsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=