
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/preload/scripts/DdzLobbyUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxwcmVsb2FkXFxzY3JpcHRzXFxEZHpMb2JieVVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBK1BDO1FBOVBvQixrQkFBWSxHQUFHO1lBQ2xDO2dCQUNDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixXQUFXLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixXQUFXLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixXQUFXLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixXQUFXLEVBQUUsTUFBTTthQUNuQjtZQUNLO2dCQUNJLE9BQU8sRUFBRSxJQUFJO2dCQUN0QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsV0FBVyxFQUFFLE1BQU07YUFDYjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxJQUFJO2dCQUN0QixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsV0FBVyxFQUFFLE1BQU07YUFDYjtTQUNKLENBQUM7UUFDTSx3QkFBa0IsR0FBRztZQUN6QixJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLENBQUM7WUFDUCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFBO1FB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QUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsd0RBQXdEO1FBQ3hELCtCQUErQjtRQUMvQixnQ0FBZ0M7UUFDaEMsSUFBSSxXQUFXLEdBQUcsNkJBQTZCLENBQUM7UUFDaEQsSUFBSSxRQUFRLEdBQUcsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUNuQywyRkFBMkY7UUFDM0YseURBQXlEO1FBQ3pELGdDQUFnQztRQUNoQyxhQUFhO1FBQ2IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXBEQSxBQW9EQyxDQXBEMEIsRUFBRSxDQUFDLFNBQVMsR0FvRHRDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpMb2JieVVJIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0TGV2ZWwgPSBbXHJcblx0XHR7XHJcblx0XHRcdFwibGV2ZWxcIjogXCJsMFwiLFxyXG5cdFx0XHRcIlBvaW50TG93XCI6IDMwMDAwMCxcclxuXHRcdFx0XCJQb2ludFJhdGVcIjogMTAwMDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwibGV2ZWxcIjogXCJsMVwiLFxyXG5cdFx0XHRcIlBvaW50TG93XCI6IDUwMDAwMCxcclxuXHRcdFx0XCJQb2ludFJhdGVcIjogMTAwMDBcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdFwibGV2ZWxcIjogXCJsMlwiLFxyXG5cdFx0XHRcIlBvaW50TG93XCI6IDUwMDAwMDAsXHJcblx0XHRcdFwiUG9pbnRSYXRlXCI6IDUwMDAwXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRcImxldmVsXCI6IFwibDNcIixcclxuXHRcdFx0XCJQb2ludExvd1wiOiAxMDAwMDAwMCxcclxuXHRcdFx0XCJQb2ludFJhdGVcIjogMTAwMDAwXHJcblx0XHR9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJsZXZlbFwiOiBcImw0XCIsXHJcblx0XHRcdFwiUG9pbnRMb3dcIjogMTAwMDAwMDAsXHJcblx0XHRcdFwiUG9pbnRSYXRlXCI6IDEwMDAwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcImxldmVsXCI6IFwibDVcIixcclxuXHRcdFx0XCJQb2ludExvd1wiOiAxMDAwMDAwMCxcclxuXHRcdFx0XCJQb2ludFJhdGVcIjogMTAwMDAwXHJcbiAgICAgICAgfSxcclxuICAgIF07XHJcbiAgICBwcml2YXRlIGxldmVsVG9CdG5JbmRleE1hcCA9IHtcclxuICAgICAgICBcImwwXCI6IDAsXHJcbiAgICAgICAgXCJsMVwiOiAxLFxyXG4gICAgICAgIFwibDJcIjogMixcclxuICAgICAgICBcImwzXCI6IDMsXHJcbiAgICAgICAgXCJsNFwiOiA0LFxyXG4gICAgICAgIFwibDVcIjogNVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbGV2ZWxQb3NNYXAgPSBcclxuICAgIHtcclxuICAgICAgICA0OiBbY2MudjIoNDIsIDExMiksIGNjLnYyKDQwNCwgMTEyKSwgY2MudjIoNDIsIC0xMzcpLCBjYy52Mig0MDQsIC0xMzcpXSxcclxuICAgICAgICAzOiBbY2MudjIoMjE4LCAxMTIpLCBjYy52Mig0MiwgLTEzNyksIGNjLnYyKDQwNCwgLTEzNyldLFxyXG4gICAgICAgIDI6IFtjYy52Mig0MiwwICksIGNjLnYyKDQwNCwgMCldLFxyXG4gICAgICAgIDE6IFtjYy52MigyMTgsMCldLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNob3dNYXhJdGVtID0gNjtcclxuXHJcbiAgICBwcml2YXRlIGxldmVsSXRlbUxpc3Q6IEFycmF5PExldmVsSXRlbT4gPSBbXTtcclxuICAgIHByaXZhdGUgc2VsZkluZm9WaWV3OiBTZWxmSW5mb1ZpZXc7XHJcbiAgICBwcml2YXRlIHNjcm9sbFZpZXc6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIGxheW91dDogY2MuTGF5b3V0O1xyXG4gICAgcHJpdmF0ZSB0b3BOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBib3R0b21Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG5cclxuICAgIHByaXZhdGUgcnVsZVBvcDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc2V0dGluZ1BvcDogY2MuTm9kZTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnRvcE5vZGUgPSBjYy5maW5kKFwidG9wTm9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuYm90dG9tTm9kZSA9IGNjLmZpbmQoXCJib3R0b21Ob2RlXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5jZW50ZXJOb2RlID0gY2MuZmluZChcImNlbnRlck5vZGVcIiwgdGhpcy5ub2RlKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJ0b3BOb2RlL2NvbnRlbnQvbGVhdmVCdG5cIiwgdGhpcy5vbkxlYXZlQ2xpY2ssIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJ0b3BOb2RlL2NvbnRlbnQvc2V0dGluZ0J0blwiLCB0aGlzLm9uU2V0dGluZ0NsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidG9wTm9kZS9jb250ZW50L3J1bGVCdG5cIiwgdGhpcy5vblJ1bGVDbGljaywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJvdHRvbU5vZGUvcXVpY2tTdGFydEJ0blwiLCB0aGlzLm9uUXVpY2tTdGFydENsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIGNjLmZpbmQoXCJib3R0b21Ob2RlL3F1aWNrU3RhcnRCdG5cIiwgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxmSW5mb1ZpZXcgPSA8U2VsZkluZm9WaWV3Pkdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KHRoaXMubm9kZSwgXCJib3R0b21Ob2RlL2NvbnRlbnRcIiwgU2VsZkluZm9WaWV3KTtcclxuICAgICAgICB0aGlzLmluaXRMZXZlbCgpO1xyXG5cclxuICAgICAgICBsZXQgcG1kTm9kZSA9IGNjLmZpbmQoJ3RvcE5vZGUvcGFvTWFEZW5nQm94JywgdGhpcy5ub2RlKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkUGFvTWFEZW5nQ29tcChjYy5maW5kKCd0b3BOb2RlL3Bhb01hRGVuZ0JveC9Nc2dCb3gnLCB0aGlzLm5vZGUpLCBmYWxzZSwgcG1kTm9kZSk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZFdpZmlDb21wKGNjLmZpbmQoJ3RvcE5vZGUvY29udGVudC93aWZpTm9kZScsIHRoaXMubm9kZSksIDEpO1xyXG5cclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5hZGp1c3RJcGhvbmVYKFtcclxuICAgICAgICAgICAgY2MuZmluZChcInRvcE5vZGUvY29udGVudFwiLCB0aGlzLm5vZGUpLCBcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5hZGRBbmltQ29tcCh0aGlzLm5vZGUsIHRoaXMuY2VudGVyTm9kZSwgY2MuZmluZChcIm1hc2tcIiwgdGhpcy5ub2RlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TGV2ZWwoKXtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcgPSBjYy5maW5kKFwiY2VudGVyTm9kZS9zY3JvbGxWaWV3XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0ID0gY2MuZmluZChcInZpZXcvY29udGVudFwiLCB0aGlzLnNjcm9sbFZpZXcubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxheW91dCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbEl0ZW1MaXN0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgNjsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IGNjLmZpbmQoXCJjZW50ZXJOb2RlL3Njcm9sbFZpZXcvdmlldy9jb250ZW50L2xldmVsXCIgKyBpLnRvU3RyaW5nKCksIHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IDxMZXZlbEl0ZW0+R2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQoYnRuLCBcIlwiLCBMZXZlbEl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLnNldENhbGxiYWNrKHRoaXMub25MZXZlbEl0ZW1BY3QsIHRoaXMpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGV2ZWxJdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQbGF5ZXJJbmZvKCl7XHJcbiAgICAgICAgdGhpcy5zZWxmSW5mb1ZpZXcudXBkYXRlSW5mbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpe1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUsIHRoaXMsIHRoaXMucmVmcmVzaFBsYXllckluZm8pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucmVmcmVzaFBsYXllckluZm8oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxldmVsSXRlbSgpO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlclBvaW50LCB7fSk7XHJcbiAgICAgICAgLy8gR2FtZS5Db250cm9sLmNoZWNrUXVlcnlTdGF0ZShHYW1lLkdhbWVQcmVsb2FkVG9vbC5jdXJHYW1lSWQsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9GdWxsU2NyZWVuT3BlbkFuaW0odGhpcy50b3BOb2RlLCBudWxsLCBbdGhpcy5jZW50ZXJOb2RlXSwgdGhpcy5ib3R0b21Ob2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTGVhdmVDbGljaygpe1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk9uQ2xvc2VHYW1lTG9iYnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgb25SdWxlQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucnVsZVBvcCAmJiBjYy5pc1ZhbGlkKHRoaXMucnVsZVBvcCkpe1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHByZWZhYiA9IGF3YWl0IEdhbWUuR2FtZVByZWxvYWRUb29sLnByZWxvYWRQcmVmYWIoR2FtZS5HYW1lUHJlbG9hZFRvb2wucnVsZVBvcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUgJiYgY2MuaXNWYWxpZCh0aGlzLm5vZGUpICYmIHByZWZhYiAmJiBjYy5pc1ZhbGlkKHByZWZhYikpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQoR2xvYmFsLlVJLmdldExheWVyKFwiUG9wTGF5ZXJcIikpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydWxlUG9wID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIG9uU2V0dGluZ0NsaWNrKCl7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdQb3AgJiYgY2MuaXNWYWxpZCh0aGlzLnNldHRpbmdQb3ApKXtcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nUG9wLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBwcmVmYWIgPSBhd2FpdCBHYW1lLkdhbWVQcmVsb2FkVG9vbC5wcmVsb2FkUHJlZmFiKEdhbWUuR2FtZVByZWxvYWRUb29sLnNldHRpbmdQb3AsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlICYmIGNjLmlzVmFsaWQodGhpcy5ub2RlKSAmJiBwcmVmYWIgJiYgY2MuaXNWYWxpZChwcmVmYWIpKXtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KEdsb2JhbC5VSS5nZXRMYXllcihcIlBvcExheWVyXCIpKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblF1aWNrU3RhcnRDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oR2FtZS5HYW1lUHJlbG9hZFRvb2wuY3VyR2FtZUlkKVxyXG4gICAgICAgIGxldCBhcnIgPSBkYXRhLmxldmVscztcclxuICAgICAgICBpZiAoIWFyciB8fCBhcnIubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbGV2ZWwgPSBhcnJbMF0ubGV2ZWw7XHJcbiAgICAgICAgbGV0IHRlbXAgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFzID0gYXJyW2ldO1xyXG4gICAgICAgICAgICBpZiAoZGF0YXMuUG9pbnRMb3cgPD0gR2xvYmFsLlBsYXllckRhdGEucG9pbnQgJiYgZGF0YXMuUG9pbnRMb3cgPiB0ZW1wKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gZGF0YXM7XHJcbiAgICAgICAgICAgICAgICBsZXZlbCA9IGRhdGFzLmxldmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25MZXZlbEl0ZW1BY3QobGV2ZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTGV2ZWxJdGVtKCl7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oR2FtZS5HYW1lUHJlbG9hZFRvb2wuY3VyR2FtZUlkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIGxldCBhcnI6IGFueVtdO1xyXG4gICAgICAgIGlmICghZGF0YSB8fCAhZGF0YS5sZXZlbHMgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChkYXRhLmxldmVscykpe1xyXG4gICAgICAgICAgICBhcnIgPSB0aGlzLmRlZmF1bHRMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgYXJyID0gZGF0YS5sZXZlbHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxldmVsSXRlbUxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxldmVsSXRlbUxpc3RbaV0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbGV0IHBvc0FyciA9IHRoaXMubGV2ZWxQb3NNYXBbYXJyLmxlbmd0aF07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk9MDsgaSA8IGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbGV2ZWxTdHIgPSBhcnJbaV0ubGV2ZWw7ICBcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5sZXZlbFRvQnRuSW5kZXhNYXBbbGV2ZWxTdHJdO1xyXG4gICAgICAgICAgICBpZihpbmRleCAhPSBudWxsICYmIGluZGV4IDwgdGhpcy5sZXZlbEl0ZW1MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubGV2ZWxJdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxldmVsSXRlbUxpc3RbaW5kZXhdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0TGV2ZWwobGV2ZWxTdHIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRJdGVtU3R5bGUoZGF0YS5Qb2ludFJhdGUsIGRhdGEuUG9pbnRMb3cpO1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgKGRhdGEuY2xpZW5nX2NmZyAmJiBkYXRhLmNsaWVuZ19jZmcubW9kZSAmJiBkYXRhLmNsaWVuZ19jZmcubW9kZSA9PSAxIHx8IGRhdGEuY2xpZW5nX2NmZy5tb2RlID09IDIpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLnNldE1vZGUodHJ1ZSwgZGF0YS5jbGllbmdfY2ZnLm1vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpdGVtLnNldE1vZGUoZmFsc2UsIGRhdGEuY2xpZW5nX2NmZy5tb2RlKTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIChkYXRhLmNsaWVuZ19jZmcgJiYgZGF0YS5jbGllbmdfY2ZnLm1vZGUgJiYgKGRhdGEuY2xpZW5nX2NmZy5tb2RlID09IDEgfHwgZGF0YS5jbGllbmdfY2ZnLm1vZGUgPT0gMikpe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGl0ZW0uc2V0TW9kZSh0cnVlLCBkYXRhLmNsaWVuZ19jZmcubW9kZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGl0ZW0uc2V0TW9kZShmYWxzZSwgZGF0YS5jbGllbmdfY2ZnLm1vZGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gaWYoaSA8IHBvc0Fyci5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5sZXZlbEl0ZW1MaXN0W2luZGV4XS5ub2RlLnBvc2l0aW9uID0gcG9zQXJyW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5zY3JvbGxWaWV3LmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAvLyBsZXQgbGV2ZWxJdGVtICA9IHRoaXMubGV2ZWxJdGVtTGlzdFswXTtcclxuICAgICAgICAvLyBsZXQgdG90YWwgPSBhcnIubGVuZ3RoO1xyXG4gICAgICAgIC8vIHRoaXMubGF5b3V0Lm5vZGUud2lkdGggPSB0b3RhbCAqIGxldmVsSXRlbS5ub2RlLndpZHRoICsgKHRoaXMubGF5b3V0LnNwYWNpbmdYICogKHRvdGFsIC0gMSkpO1xyXG4gICAgICAgIC8vIGlmICh0b3RhbCA+IHRoaXMuc2hvd01heEl0ZW0gJiYgdGhpcy5sYXlvdXQubm9kZS53aWR0aCA+PSB0aGlzLm5vZGUud2lkdGggLSAxMCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMubGF5b3V0LnNwYWNpbmdYID0gMzA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2Nyb2xsVmlldy5ob3Jpem9udGFsID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYXlvdXQuc3BhY2luZ1ggPSA0MDtcclxuICAgICAgICAvLyAgICAgdGhpcy5zY3JvbGxWaWV3Lmhvcml6b250YWwgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdGhpcy5zY3JvbGxWaWV3LnNldENvbnRlbnRQb3NpdGlvbihjYy5WZWMyLlpFUk8pXHJcbiAgICAgICAgLy8gdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25MZXZlbEl0ZW1BY3QobGV2ZWw6IHN0cmluZyl7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChHbG9iYWxFdmVudC5PbkdvdG9HYW1lU2NlbmUsIGxldmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCl7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUsIHRoaXMsIHRoaXMucmVmcmVzaFBsYXllckluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKXtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5yZWZyZXNoUGxheWVySW5mbyk7XHJcbiAgICAgICAgaWYgKHRoaXMucnVsZVBvcCAmJiBjYy5pc1ZhbGlkKHRoaXMucnVsZVBvcCkpe1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJ1bGVQb3AgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5nUG9wICYmIGNjLmlzVmFsaWQodGhpcy5zZXR0aW5nUG9wKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcC5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ1BvcCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgTGV2ZWxJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBiYXNlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbGltaXRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBsZXZlbDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIHRhcmdldDogYW55O1xyXG4gICAgcHJpdmF0ZSBtb2RlTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgbW9kZU5vZGUxOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLmJhc2VMYmwgPSBjYy5maW5kKFwiYmFzZU5vZGUvYmFzZUxibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saW1pdExibCA9IGNjLmZpbmQoXCJjb2luTm9kZS9saW1pdExibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZignY2xpY2snKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIlwiLCB0aGlzLm9uSXRlbUNsaWNrLCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubW9kZU5vZGUgPSBjYy5maW5kKFwibW9kZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubW9kZU5vZGUxID0gY2MuZmluZChcIm1vZGUxXCIsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENhbGxiYWNrKGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TGV2ZWwobGV2ZWw6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNb2RlKGZsYWc6IGJvb2xlYW4sIG1vZGU6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgaWYgKG1vZGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlTm9kZTEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlTm9kZTEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZU5vZGUuYWN0aXZlID0gZmxhZztcclxuICAgICAgICAgICAgdGhpcy5tb2RlTm9kZTEuYWN0aXZlID0gZmxhZztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEl0ZW1TdHlsZShuQmFzZTogbnVtYmVyLCBuTGltaXQ6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5iYXNlTGJsLnN0cmluZyA9IGAke0dsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKG5CYXNlKX1gO1xyXG4gICAgICAgIHRoaXMubGltaXRMYmwuc3RyaW5nID0gYCR7R2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIobkxpbWl0KX1gO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25JdGVtQ2xpY2soKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy50YXJnZXQsIHRoaXMubGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU2VsZkluZm9WaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50e1xyXG4gICAgcHJpdmF0ZSBuYW1lTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgaWRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBoZWFkSW1nOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGhlYWRCb3g6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgY29pbkxibDogY2MuTGFiZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubmFtZUxibCA9IGNjLmZpbmQoXCJuYW1lTm9kZS9uYW1lTGJsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmlkTGJsID0gY2MuZmluZChcIm5hbWVOb2RlL2lkTGJsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmhlYWRJbWcgPSBjYy5maW5kKFwibmFtZU5vZGUvbWFzay9oZWFkSW1nXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oZWFkQm94ID0gY2MuZmluZChcIm5hbWVOb2RlL2hlYWRCb3hcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmNvaW5MYmwgPSBjYy5maW5kKFwiY29pbk5vZGUvY29pbkxibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJjb2luTm9kZS9idG5fY3pcIiwgdGhpcy5vcGVuUmVjaGFyZ2UsIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuUmVjaGFyZ2UoKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUluZm8oKXtcclxuICAgICAgICBsZXQgcGxheWVyID0gR2xvYmFsLlBsYXllckRhdGE7XHJcbiAgICAgICAgdGhpcy5uYW1lTGJsLnN0cmluZyA9IHBsYXllci5uaWNrbmFtZTtcclxuICAgICAgICB0aGlzLmlkTGJsLnN0cmluZyA9ICdJRDonICsgcGxheWVyLnVpZDtcclxuICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocGxheWVyLnBvaW50LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmxvYWRIZWFkSW1nKHBsYXllci5oZWFkaW1nKTtcclxuICAgICAgICB0aGlzLmxvYWRIZWFkQm94KHBsYXllci5oZWFka3VhbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZEhlYWRJbWcoc3RyOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5oZWFkSW1nLm5vZGUud2lkdGg7XHJcbiAgICAgICAgbGV0IGggPSB0aGlzLmhlYWRJbWcubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2Yoc3RyKTtcclxuICAgICAgICB0aGlzLmhlYWRJbWcubm9kZS53aWR0aCA9IHc7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLm5vZGUuaGVpZ2h0ID0gaDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRIZWFkQm94KHN0cjogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdyA9IHRoaXMuaGVhZEJveC5ub2RlLndpZHRoO1xyXG4gICAgICAgIGxldCBoID0gdGhpcy5oZWFkQm94Lm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIC8vIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbEhlYWRGcmFtZSh0aGlzLmhlYWRCb3gsIHN0cik7XHJcbiAgICAgICAgLy8gdGhpcy5oZWFkQm94Lm5vZGUud2lkdGggPSB3O1xyXG4gICAgICAgIC8vIHRoaXMuaGVhZEJveC5ub2RlLmhlaWdodCA9IGg7XHJcbiAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gXCJ0ZXh0dXJlL2hlYWRGcmFtZS9oZWFkRnJhbWVcIjtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcgPSBcInR4a3VhbmdfdmlwXCIgKyBzdHI7XHJcbiAgICAgICAgLy8gcmV0dXJuIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmhlYWRCb3gsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlYWRCb3guc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmhlYWRCb3gudHJpbSA9IGZhbHNlXHJcbiAgICAgICAgLy8gfSwgZmFsc2UpO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhcIjIwMDVfcHJlbG9hZFwiLCB0aGlzLmhlYWRCb3gsIGF0bGFzU3RyaW5nLCBzZlN0cmluZywgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=