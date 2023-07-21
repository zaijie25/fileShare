"use strict";
cc._RF.push(module, 'e74d2ypsF5EGK9oSCQEZZHF', 'DdzLobbyUI');
// ddz/preload/scripts/DdzLobbyUI.ts

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
var DdzLobbyUI = /** @class */ (function (_super) {
    __extends(DdzLobbyUI, _super);
    function DdzLobbyUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultLevel = [
            {
                "level": "l0",
                "PointLow": 300000,
                "PointRate": 10000
            },
            {
                "level": "l1",
                "PointLow": 500000,
                "PointRate": 10000
            },
            {
                "level": "l2",
                "PointLow": 5000000,
                "PointRate": 50000
            },
            {
                "level": "l3",
                "PointLow": 10000000,
                "PointRate": 100000
            },
            {
                "level": "l4",
                "PointLow": 10000000,
                "PointRate": 100000
            },
            {
                "level": "l5",
                "PointLow": 10000000,
                "PointRate": 100000
            },
        ];
        _this.levelToBtnIndexMap = {
            "l0": 0,
            "l1": 1,
            "l2": 2,
            "l3": 3,
            "l4": 4,
            "l5": 5
        };
        _this.levelPosMap = {
            4: [cc.v2(42, 112), cc.v2(404, 112), cc.v2(42, -137), cc.v2(404, -137)],
            3: [cc.v2(218, 112), cc.v2(42, -137), cc.v2(404, -137)],
            2: [cc.v2(42, 0), cc.v2(404, 0)],
            1: [cc.v2(218, 0)],
        };
        _this.showMaxItem = 6;
        _this.levelItemList = [];
        return _this;
    }
    DdzLobbyUI.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.topNode = cc.find("topNode", this.node);
        this.bottomNode = cc.find("bottomNode", this.node);
        this.centerNode = cc.find("centerNode", this.node);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/leaveBtn", this.onLeaveClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/settingBtn", this.onSettingClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "topNode/content/ruleBtn", this.onRuleClick, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "bottomNode/quickStartBtn", this.onQuickStartClick, this, cc.Button.Transition.SCALE, null, false);
        cc.find("bottomNode/quickStartBtn", this.node).active = false;
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
    DdzLobbyUI.prototype.initLevel = function () {
        this.scrollView = cc.find("centerNode/scrollView", this.node).getComponent(cc.ScrollView);
        this.layout = cc.find("view/content", this.scrollView.node).getComponent(cc.Layout);
        this.levelItemList = [];
        for (var i = 0; i < 6; i++) {
            var btn = cc.find("centerNode/scrollView/view/content/level" + i.toString(), this.node);
            btn.active = true;
            var item = Global.UIHelper.safeGetComponent(btn, "", LevelItem);
            item.setCallback(this.onLevelItemAct, this);
            item.node.active = false;
            this.levelItemList.push(item);
        }
    };
    DdzLobbyUI.prototype.refreshPlayerInfo = function () {
        this.selfInfoView.updateInfo();
    };
    DdzLobbyUI.prototype.onEnable = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPlayerInfo);
        this.refreshPlayerInfo();
        this.updateLevelItem();
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
        // Game.Control.checkQueryState(Game.GamePreloadTool.curGameId, null);
        this.animComp.doFullScreenOpenAnim(this.topNode, null, [this.centerNode], this.bottomNode);
    };
    DdzLobbyUI.prototype.onLeaveClick = function () {
        Global.Audio.playBtnSound();
        Game.Event.event(GlobalEvent.OnCloseGameLobby);
    };
    DdzLobbyUI.prototype.onRuleClick = function () {
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
    DdzLobbyUI.prototype.onSettingClick = function () {
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
    DdzLobbyUI.prototype.onQuickStartClick = function () {
        Global.Audio.playBtnSound();
        var data = Global.GameData.getGameInfo(Game.GamePreloadTool.curGameId);
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
        this.onLevelItemAct(level);
    };
    DdzLobbyUI.prototype.updateLevelItem = function () {
        var data = Global.GameData.getGameInfo(Game.GamePreloadTool.curGameId);
        console.log(data);
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
        // let posArr = this.levelPosMap[arr.length];
        for (var i = 0; i < arr.length; i++) {
            var data_1 = arr[i];
            var levelStr = arr[i].level;
            var index = this.levelToBtnIndexMap[levelStr];
            if (index != null && index < this.levelItemList.length) {
                var item = this.levelItemList[index];
                this.levelItemList[index].node.active = true;
                item.setLevel(levelStr);
                item.setItemStyle(data_1.PointRate, data_1.PointLow);
                // if (data.clieng_cfg && data.clieng_cfg.mode && data.clieng_cfg.mode == 1 || data.clieng_cfg.mode == 2) {
                //     item.setMode(true, data.clieng_cfg.mode);
                // } else {
                //     item.setMode(false, data.clieng_cfg.mode);
                // }
                // if (data.clieng_cfg && data.clieng_cfg.mode && (data.clieng_cfg.mode == 1 || data.clieng_cfg.mode == 2)){
                //     item.setMode(true, data.clieng_cfg.mode);
                // }
                // else{
                //     item.setMode(false, data.clieng_cfg.mode);
                // }
                // if(i < posArr.length)
                //     this.levelItemList[index].node.position = posArr[i]
            }
        }
        // this.scrollView.enabled = false;
        // let levelItem  = this.levelItemList[0];
        // let total = arr.length;
        // this.layout.node.width = total * levelItem.node.width + (this.layout.spacingX * (total - 1));
        // if (total > this.showMaxItem && this.layout.node.width >= this.node.width - 10){
        //     this.layout.spacingX = 30;
        //     this.scrollView.horizontal = true;
        // }
        // else{
        //     this.layout.spacingX = 40;
        //     this.scrollView.horizontal = false;
        // }
        // this.scrollView.setContentPosition(cc.Vec2.ZERO)
        // this.scrollView.scrollToLeft();
    };
    DdzLobbyUI.prototype.onLevelItemAct = function (level) {
        Game.Event.event(GlobalEvent.OnGotoGameScene, level);
    };
    DdzLobbyUI.prototype.onDestroy = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPlayerInfo);
    };
    DdzLobbyUI.prototype.onDisable = function () {
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
    DdzLobbyUI = __decorate([
        ccclass
    ], DdzLobbyUI);
    return DdzLobbyUI;
}(cc.Component));
exports.default = DdzLobbyUI;
var LevelItem = /** @class */ (function (_super) {
    __extends(LevelItem, _super);
    function LevelItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LevelItem.prototype.onLoad = function () {
        this.baseLbl = cc.find("baseNode/baseLbl", this.node).getComponent(cc.Label);
        this.limitLbl = cc.find("coinNode/limitLbl", this.node).getComponent(cc.Label);
        this.node.off('click');
        Global.UIHelper.addCommonClick(this.node, "", this.onItemClick, this, cc.Button.Transition.SCALE, null, false);
        this.modeNode = cc.find("mode", this.node);
        this.modeNode1 = cc.find("mode1", this.node);
    };
    LevelItem.prototype.setCallback = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    LevelItem.prototype.setLevel = function (level) {
        this.level = level;
    };
    LevelItem.prototype.setMode = function (flag, mode) {
        if (flag) {
            if (mode == 1) {
                this.modeNode.active = true;
                this.modeNode1.active = false;
            }
            else {
                this.modeNode.active = false;
                this.modeNode1.active = true;
            }
        }
        else {
            this.modeNode.active = flag;
            this.modeNode1.active = flag;
        }
    };
    LevelItem.prototype.setItemStyle = function (nBase, nLimit) {
        this.baseLbl.string = "" + Global.Toolkit.formatPointStr(nBase);
        this.limitLbl.string = "" + Global.Toolkit.formatPointStr(nLimit);
    };
    LevelItem.prototype.onItemClick = function () {
        Global.Audio.playBtnSound();
        if (this.callback) {
            this.callback.call(this.target, this.level);
        }
    };
    return LevelItem;
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
        Global.UIHelper.addCommonClick(this.node, "coinNode/btn_cz", this.openRecharge, this, cc.Button.Transition.SCALE, null, false);
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
        // return Global.ResourceManager.loadAutoAtlas(this.headBox, atlasString, sfString, () => {
        //     this.headBox.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //     this.headBox.trim = false
        // }, false);
        Global.ResourceManager.loadBundleAutoAtlas("2005_preload", this.headBox, atlasString, sfString, null, true);
    };
    return SelfInfoView;
}(cc.Component));

cc._RF.pop();