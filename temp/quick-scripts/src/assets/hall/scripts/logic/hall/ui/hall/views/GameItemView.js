"use strict";
cc._RF.push(module, '04536fh7VhOKLaamk663wl5', 'GameItemView');
// hall/scripts/logic/hall/ui/hall/views/GameItemView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var WndGameLobbyShell_1 = require("../../ChooseRoom/WndGameLobbyShell");
var BindingButtonEffect_1 = require("../../../../core/component/BindingButtonEffect");
var YXButton_1 = require("../../../../core/component/YXButton");
//初始 -1000 -1 没下载过 0 下载成功并且版本是最新  1下载成功，版本不是最新 2下载中 3等待下载   4下载失败
var GameDownloadStatus;
(function (GameDownloadStatus) {
    GameDownloadStatus[GameDownloadStatus["INIT"] = -1000] = "INIT";
    GameDownloadStatus[GameDownloadStatus["NEVER_DOWNLOAD"] = -1] = "NEVER_DOWNLOAD";
    GameDownloadStatus[GameDownloadStatus["NEW_VERSION_SUCCESS"] = 0] = "NEW_VERSION_SUCCESS";
    GameDownloadStatus[GameDownloadStatus["OLD_VERSION"] = 1] = "OLD_VERSION";
    GameDownloadStatus[GameDownloadStatus["DOWNLOADING"] = 2] = "DOWNLOADING";
    GameDownloadStatus[GameDownloadStatus["WAIT_DOWNLOAD"] = 3] = "WAIT_DOWNLOAD";
    GameDownloadStatus[GameDownloadStatus["FAILD"] = 4] = "FAILD";
})(GameDownloadStatus || (GameDownloadStatus = {}));
// 1开放，2即将上线，3维护
var GameStatue;
(function (GameStatue) {
    GameStatue[GameStatue["None"] = 0] = "None";
    GameStatue[GameStatue["Open"] = 1] = "Open";
    GameStatue[GameStatue["Soon"] = 2] = "Soon";
    GameStatue[GameStatue["Maintain"] = 3] = "Maintain";
})(GameStatue || (GameStatue = {}));
var GameItemView = /** @class */ (function (_super) {
    __extends(GameItemView, _super);
    function GameItemView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameUpdateState = GameDownloadStatus.INIT; //  -1 没下载过 0 下载成功并且版本是最新  1下载成功，版本不是最新 2下载中 3等待下载   4下载失败   ----// 1 new 2 下载中 3下载成功  4下载失败  
        _this.isBtnClick = false;
        _this.checked = false;
        _this.tagResMap = {
            1: "hall@effect/gameicon/huobao",
            2: "hall@effect/gameicon/tuijian",
            3: "hall@effect/gameicon/zuixin",
        };
        _this.itemClickWaiting = false;
        return _this;
    }
    /**
     * 将子游戏icon渲染层进行分成达到优化drawcall
     * @param parentNode 分层父节点
     */
    GameItemView.prototype.moveSpine = function (parentNode) {
        if (!cc.isValid(parentNode))
            return;
        var spineNode = parentNode.getChildByName("spineNode");
        var spine = cc.find(this.gameData.prefabName + "/effect", this.effectMountNode);
        if (cc.isValid(spine)) {
            var pos = Global.UIUtil.convertSameNodePos(this.effectMountNode, spineNode, spine.position);
            spine.setParent(spineNode);
            spine.setPosition(pos);
        }
        var backgroundNode = parentNode.getChildByName("backgroundNode");
        var pos1 = Global.UIUtil.convertSameNodePos(this.node, backgroundNode);
        if (cc.isValid(this.effectMountNode)) {
            this.effectMountNode.setParent(backgroundNode);
            this.effectMountNode.setPosition(pos1);
        }
        var tagStr = "tagNode_" + this.gameData.top;
        var tagParentNode = parentNode.getChildByName(tagStr);
        var tagNode = cc.find("tag", this.node);
        var pos2 = Global.UIUtil.convertSameNodePos(tagNode, backgroundNode);
        if (cc.isValid(this.tagSpineNode)) {
            this.tagSpineNode.setParent(tagParentNode);
            this.tagSpineNode.setPosition(pos2);
        }
        var nameParentNode = parentNode.getChildByName("nameNode");
        var nameNode = cc.find(this.gameData.prefabName + "/name", this.effectMountNode);
        var prefabNode = cc.find("" + this.gameData.prefabName, this.effectMountNode);
        var pos3 = Global.UIUtil.convertSameNodePos(prefabNode, nameParentNode);
        if (cc.isValid(nameNode)) {
            nameNode.setParent(nameParentNode);
            nameNode.setPosition(pos3);
        }
    };
    GameItemView.prototype.registerEvent = function () {
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_FAILED, this, this.onUpdateSubGameFailed);
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_FINISH, this, this.onUpdateSubGameFinish);
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_PERCENT, this, this.onUpdateSubGamePercent);
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_STATE, this, this.checkGameUpdateState);
    };
    GameItemView.prototype.unRegisterEvent = function () {
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_FAILED, this, this.onUpdateSubGameFailed);
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_FINISH, this, this.onUpdateSubGameFinish);
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_PERCENT, this, this.onUpdateSubGamePercent);
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_STATE, this, this.checkGameUpdateState);
    };
    GameItemView.prototype.onUpdateSubGameFailed = function (gid) {
        if (!gid) {
            Logger.error("onUpdateSubGameFailed gid == null");
            return;
        }
        if (!this.gameData) {
            Logger.error("onUpdateSubGameFailed this.gameData == null");
            return;
        }
        if (Number(gid) === this.gameData.game_id) {
            this.needFaildView();
        }
    };
    GameItemView.prototype.onUpdateSubGameFinish = function (gid) {
        if (!gid) {
            return;
        }
        if (!this.gameData) {
            return;
        }
        if (gid === this.gameData.game_id) {
            if (!this.gameIconNode || !this.gameIconNode.isValid) {
                return;
            }
            this.setNodeAlpha(255);
            //Global.UIHelper.setNodeGray(this.gameIconNode, false, 255, true);
            this.alreadyGameView(true);
        }
    };
    GameItemView.prototype.onUpdateSubGamePercent = function (gid, per) {
        if (!gid) {
            return;
        }
        if (!this.gameData) {
            return;
        }
        // Logger.log("onUpdateSubGamePercent  gid = " + gid + " per = " + per)
        if (gid === this.gameData.game_id) {
            this.downloadingView(per);
        }
    };
    GameItemView.prototype.initView = function () {
        this.tagImg = cc.find("tag/img", this.node);
        this.tagSpineNode = cc.find("tag/spineNode/spineParent", this.node);
        this.grayImg = cc.find("grayImg", this.node);
        this.weihuFlag = this.grayImg.getChildByName('weihuFlag');
        this.waitFlag = this.grayImg.getChildByName('waitFlag');
        this.spineNode = cc.find("spineNode", this.node);
        this.effectMountNode = this.getChild("iconMountNode");
        this.updateState = cc.find("updateState", this.node);
        this.updateState.active = true;
        this.updateState_download = this.updateState.getChildByName("download");
        this.updateState_waiting = this.updateState.getChildByName("waiting");
        this.updateState_update = this.updateState.getChildByName("update");
        this.updateState_stop = this.updateState.getChildByName("stop");
        this.updateState_loading = this.updateState.getChildByName("loading");
        this.updateState_download.active = false;
        this.updateState_waiting.active = false;
        this.updateState_update.active = false;
        this.updateState_stop.active = false;
        this.updateState_loading.active = false;
        this.registerEvent();
        this.isBtnClick = false;
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this);
        // this.updateState.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this);
    };
    GameItemView.prototype.setServerInfo = function (gameData, index) {
        this.gameData = gameData;
        this.index = index;
        this.updateTag();
        this.updateGameStatus();
    };
    //设置资源信息
    GameItemView.prototype.setResInfo = function (gameRes) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var name, result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.gameResData = gameRes;
                                    name = gameRes.prefabName;
                                    return [4 /*yield*/, this.loadGameIcon(name)];
                                case 1:
                                    result = _a.sent();
                                    resolve(result);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    GameItemView.prototype.loadGameIcon = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var iconPath = "hall@effect/gameicon/" + name;
            if (_this.gameResData.platformIconPath && _this.gameResData.platformIconPath != "")
                iconPath = _this.gameResData.platformIconPath;
            Global.ResourceManager.releaseHelper.markUsed(iconPath);
            Global.ResourceManager.loadRes(iconPath, function (error, prefab) {
                if (error != null) {
                    Logger.error("加载图标特效异常", iconPath);
                    reject(error);
                }
                if (!cc.isValid(_this.node) || !cc.isValid(_this.effectMountNode))
                    return;
                var effect = cc.instantiate(prefab);
                // effect.scale = 0.95;
                _this.effectMountNode.addChild(effect);
                effect.position = cc.Vec2.ZERO;
                for (var index = 0; index < effect.childrenCount; index++) {
                    var element = effect.children[index];
                    var component = element.getComponent(BindingButtonEffect_1.default);
                    if (!component) {
                        element.addComponent(BindingButtonEffect_1.default);
                    }
                }
                _this.gameIconNode = effect;
                _this.spine = effect.getComponentInChildren(sp.Skeleton);
                _this.dragonBones = effect.getComponentInChildren(dragonBones.ArmatureDisplay);
                _this.gameIconNode.setPosition(0, 0);
                resolve(prefab);
            }, null, null, false, true);
        });
    };
    //tag状态，最新、火爆等
    GameItemView.prototype.updateTag = function () {
        var _this = this;
        if (this.gameData.status !== 1) {
            this.tagImg.active = false;
            this.tagSpineNode.active = false;
            return;
        }
        this.tagSpineNode.active = true;
        var tagEffPath = "";
        var tagRes = this.tagResMap[this.gameData.top];
        if (tagRes != null) {
            this.tagSpineNode.active = true;
            tagEffPath = tagRes;
            this.tagSpineNode.removeAllChildren();
            this.tagImg.active = false;
            Global.ResourceManager.loadRes(tagEffPath, function (error, Prefab) {
                if (error) {
                    return;
                }
                if (!cc.isValid(_this.node) || !cc.isValid(_this.tagSpineNode))
                    return;
                if (Prefab) {
                    var preTag = cc.instantiate(Prefab);
                    preTag.name = "newTag";
                    var component = _this.tagSpineNode.getComponent(BindingButtonEffect_1.default);
                    if (!component) {
                        component = _this.tagSpineNode.addComponent(BindingButtonEffect_1.default);
                    }
                    var btn = _this.node.getComponent(YXButton_1.default);
                    if (btn) {
                        btn.setBind(component);
                    }
                    _this.tagSpineNode.addChild(preTag);
                    var arr = Global.Setting.SkinConfig.getHallGameListTagOffsetX();
                    preTag.setPosition(cc.v2(arr[0], arr[1]));
                    // preTag.scale = 0.95;
                }
            }, cc.Prefab, null, true);
        }
        var openFlag = this.gameData.top2;
        //开启体验场标签
        this.tagImg.active = openFlag == 1;
    };
    //更新游戏状态  开启/敬请期待
    GameItemView.prototype.updateGameStatus = function () {
        this.gameIconNode.active = true;
        if (this.gameData.status == GameStatue.Open) {
            this.pauseIcon(false);
            this.grayImg.active = false;
            this.checkGameUpdateState();
            //在下载中，从子游戏切到大厅，gameicon 会重新加载，需要重置状态
            var isUpdating = false;
            var gameHotUpdateComp = Global.HotUpdateManager.getHotUpdateGameComp(this.gameData.game_id);
            if (gameHotUpdateComp && !gameHotUpdateComp._updating) {
                this.setNodeAlpha(255);
            }
        }
        else if (this.gameData.status == GameStatue.Soon) {
            this.setNodeAlpha(255 * 0.3);
            //Global.UIHelper.setNodeGray(this.gameIconNode, true, 255 * 0.3, true);
            this.pauseIcon(true);
            this.grayImg.active = true;
            this.weihuFlag.active = false;
            this.waitFlag.active = true;
        }
        else if (this.gameData.status == GameStatue.Maintain) {
            this.pauseIcon(true);
            this.setNodeAlpha(255 * 0.3);
            //Global.UIHelper.setNodeGray(this.gameIconNode, true, 255 * 0.3, true);
            this.grayImg.active = true;
            this.weihuFlag.active = true;
            this.waitFlag.active = false;
        }
    };
    GameItemView.prototype.setNodeAlpha = function (alpha) {
        Global.UIHelper.setNodeGray(this.gameIconNode, true, alpha, true);
        var btn = this.node.getComponent(YXButton_1.default);
        if (btn && cc.isValid(btn.node)) {
            var bindObjArr = btn.bindedObject;
            if (bindObjArr) {
                for (var index = 0; index < bindObjArr.length; index++) {
                    var item = bindObjArr[index];
                    if (item && cc.isValid(item.node)) {
                        Global.UIHelper.setNodeGray(item.node, true, alpha, true);
                    }
                }
            }
        }
    };
    GameItemView.prototype.pauseIcon = function (value) {
        if (this.spine)
            this.spine.timeScale = value ? 0 : 1;
        if (this.dragonBones)
            this.dragonBones.timeScale = value ? 0 : 1;
    };
    GameItemView.prototype.updateDownState = function () {
        if (cc.sys.isBrowser)
            return;
        this.updateState_download.active = this.gameUpdateState == GameDownloadStatus.NEVER_DOWNLOAD;
        this.updateState_waiting.active = this.gameUpdateState == GameDownloadStatus.WAIT_DOWNLOAD;
        this.updateState_update.active = this.gameUpdateState == GameDownloadStatus.OLD_VERSION;
        this.updateState_stop.active = this.gameUpdateState == GameDownloadStatus.FAILD;
        this.updateState_loading.active = this.gameUpdateState == GameDownloadStatus.DOWNLOADING;
    };
    GameItemView.prototype.checkGameUpdateState = function (gid) {
        if (gid === void 0) { gid = null; }
        if (gid && gid != this.gameData.game_id) {
            return;
        }
        var gameHotUpdateComp = Global.HotUpdateManager.getHotUpdateGameComp(this.gameData.game_id);
        if (gameHotUpdateComp) {
            if (!gameHotUpdateComp._updating) {
                this.needWaitingView();
            }
            else {
                if (gameHotUpdateComp._download_percent) {
                    this.downloadingView(gameHotUpdateComp._download_percent);
                }
                else {
                    this.downloadingView(0);
                }
            }
        }
        else {
            var isGameDownloaded = this.checkDownloaded();
            if (isGameDownloaded) {
                this.alreadyGameView();
            }
            else {
                this.needDownloadView();
            }
            // let nativeVersion = Global.HotUpdateManager.nativeVersions[this.gameData.game_id.toString()] || "0.0.0"
            // // Logger.log("---------gameid nativeVersion ---" + nativeVersion)
            // let newVersion = this.gameData.version;
            // let isGameDownloaded = this.checkDownloaded()
            // if (newVersion != "" ) {
            //     let versionCompareFlag = Global.Toolkit.versionCompare(newVersion, nativeVersion)
            //     let isBackVersionFlag = this.gameData.isBackVersionFlag
            //     if ((versionCompareFlag > 0) || ((versionCompareFlag < 0) && isBackVersionFlag  == 1)) {
            //         if (((versionCompareFlag < 0) && isBackVersionFlag  == 1)){
            //             Logger.log("回滚版本操作 gameID = " + this.gameData.game_id)
            //         }
            //         if (isGameDownloaded) {
            //             // Logger.log("enter needUpdateView")
            //             this.needUpdateView();
            //         } else {
            //             // Logger.log("enter needDownloadView")
            //             this.needDownloadView();
            //         }
            //     }else {
            //         if (isGameDownloaded) {
            //             // Logger.log("enter alreadyGameView 0")
            //             this.alreadyGameView();
            //         }
            //     }
            // } else {
            //     if (isGameDownloaded) {
            //         // Logger.log("enter alreadyGameView 1")
            //         this.alreadyGameView();
            //     }
            // }
        }
    };
    //  -1 没下载过 0 下载成功并且版本是最新  1下载过，版本不是最新 2下载中 3等待下载  4网络问题下载停止
    GameItemView.prototype.needDownloadView = function () {
        this.gameUpdateState = GameDownloadStatus.NEVER_DOWNLOAD;
        this.updateDownState();
    };
    GameItemView.prototype.needUpdateView = function () {
        this.gameUpdateState = GameDownloadStatus.OLD_VERSION;
        this.updateDownState();
    };
    GameItemView.prototype.needWaitingView = function () {
        this.gameUpdateState = GameDownloadStatus.WAIT_DOWNLOAD;
        this.updateDownState();
    };
    GameItemView.prototype.needFaildView = function () {
        this.gameUpdateState = GameDownloadStatus.FAILD;
        this.updateDownState();
    };
    GameItemView.prototype.downloadingView = function (per) {
        if (per === void 0) { per = 0; }
        if (!this.node || !this.node.isValid) {
            // Logger.log("downloadingView node === null" + per)
            return;
        }
        this.gameUpdateState = GameDownloadStatus.DOWNLOADING;
        this.updateDownState();
        var progress_label = this.updateState_loading.getChildByName("progressLabel");
        var perStr = "";
        if (per) {
            perStr = Math.floor(per * 100) + "%";
        }
        else {
            perStr = "0%";
        }
        progress_label.getComponent(cc.Label).string = perStr;
        this.UpdateFillange(per);
    };
    GameItemView.prototype.UpdateFillange = function (per) {
        if (!per) {
            per = 0;
        }
        var progress_Sprite = this.updateState_loading.getChildByName("RadialProgress");
        var rangeSprite = progress_Sprite.getComponent(cc.Sprite);
        rangeSprite.fillRange = 1 - per;
        if (per > 0.99999) {
            rangeSprite.fillRange = 0;
        }
        if (!this.gameIconNode || !this.gameIconNode.isValid) {
            Logger.error("UpdateFillange this.gameIconNode.isValid = false");
            return;
        }
        var alpha = 255 * 0.3 + (255 * 0.7 * per);
        this.setNodeAlpha(alpha);
        //Global.UIHelper.setNodeGray(this.gameIconNode, true, alpha, true);
    };
    GameItemView.prototype.alreadyGameView = function (isHotBack) {
        if (isHotBack === void 0) { isHotBack = false; }
        Logger.log('游戏已经下载');
        this.gameUpdateState = GameDownloadStatus.NEW_VERSION_SUCCESS;
        this.updateDownState();
        Global.HotUpdateManager.gIsGameDownloading[this.gameData.game_id] = false;
        Global.HotUpdateManager.gameChecked[this.gameData.game_id] = false;
    };
    GameItemView.prototype.checkDownloaded = function () {
        if (!cc.sys.isNative) {
            return true;
        }
        else {
            return Global.HotUpdateManager.checkIsGameDownload(this.gameData.game_id);
        }
    };
    GameItemView.prototype.getGameData = function () {
        return this.gameData;
    };
    GameItemView.prototype.checkMoney = function () {
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
    GameItemView.prototype.checkVersion = function () {
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
    GameItemView.prototype.checkGameCfg = function () {
        //进游戏前判断是否拉到游戏配置
        if (Game.Control.GAME_DDZ_HJ_ARR[0] == this.gameData.game_id) {
            return true;
        }
        if (this.gameData && this.gameData.levels && this.gameData.levels.length > 0) {
            return true;
        }
        return false;
    };
    GameItemView.prototype.enterGame = function () {
        var _this = this;
        var self = this;
        var enterFunc = function () { return __awaiter(_this, void 0, void 0, function () {
            var level, gid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self.reSetGameDownloading();
                        if (Global.Setting.needHallChooseRoom && this.gameData.levels.length == 1 && this.gameData.gameType != WndGameLobbyShell_1.GameType.PVP) //除了PVP只有一个选场直接进游戏
                         {
                            level = this.gameData.levels[0].level || "l0";
                            if (!Global.Toolkit.checkMoney(level, this.gameData)) {
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
                        gid = this.gameData.game_id;
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
        if (this.gameData.portraitModel) {
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    };
    GameItemView.prototype.reSetGameDownloading = function () {
        var HotUpdateManager = Global.HotUpdateManager;
        for (var key in HotUpdateManager.gIsGameDownloading) {
            if (HotUpdateManager.gIsGameDownloading[key]) {
                HotUpdateManager.gIsGameDownloading[key] = false;
            }
        }
    };
    GameItemView.prototype.onItemClick = function () {
        var _this = this;
        //防止连续多次点击游戏图标出发多次进入
        if (this.itemClickWaiting) {
            return;
        }
        this.itemClickWaiting = true;
        setTimeout(function () {
            _this.itemClickWaiting = false;
        }, 1000);
        this.isBtnClick = true;
        if (Global.SceneManager.inGame())
            return;
        Global.HotUpdateManager.CurrentGame = this.gameData.game_id;
        var nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion(this.gameData.game_id);
        //// 是否显示  0不 1显示 2待开放  3维护中
        if (this.gameData.status == 2 || this.gameData.status == 3) {
            cc.error("game status = " + this.gameData.status);
            Global.Audio.playAudioSource("hall/sound/coming_soon");
            return;
        }
        Global.Audio.playBtnSound();
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
            return;
        }
        if (!cc.sys.isNative || this.gameData.isNew) {
            Logger.log("已经更新过一次" + this.gameData.isNew);
            this.enterGame();
            return;
        }
        var versionUrl = this.gameData.getUpdateUrl() + "/" + this.gameData.version + "/" + this.gameData.game_id + "/" + Global.HotUpdateManager.versionCfgFileName;
        Logger.log("这是当前的版本号获取url=" + versionUrl);
        Global.HotUpdateManager.getGameVersion(versionUrl).then(function (data) {
            var nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion(_this.gameData.game_id);
            Logger.log("远程版本=" + data.version + "本地当前版本=" + nativeVersion);
            _this.gameData.native_version = nativeVersion;
            _this.gameData.remote_version = data.version;
            if (Global.Toolkit.versionCompare(_this.gameData.native_version, data.version) == -1) {
                _this.needUpdateView();
            }
            else {
                _this.gameData.isNew = true;
                _this.enterGame();
                return;
            }
            _this.checkByGameUpdateState();
        }, function () {
            Global.UI.showSingleBox("配置拉取失败，请检查网络");
        });
    };
    GameItemView.prototype.checkByGameUpdateState = function () {
        //// 1 new 2 下载中 3下载成功  4下载失败
        //// -1 没下载过 0 下载成功并且版本是最新  1下载过，版本不是最新 2下载中 3等待下载 4 下载异常
        switch (this.gameUpdateState) {
            case GameDownloadStatus.OLD_VERSION:
            case GameDownloadStatus.NEVER_DOWNLOAD:
                var gid = Global.HotUpdateManager.getWhichGameIsDowning();
                if (gid) {
                    if (gid == this.gameData.game_id) {
                        this.downloadingView(0);
                    }
                    else {
                        this.needWaitingView();
                        Global.UI.fastTip(this.gameData.name + "已加入下载队列");
                        Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.remote_version);
                    }
                }
                else {
                    this.downloadingView(0);
                    Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.remote_version);
                }
                break;
            case GameDownloadStatus.NEW_VERSION_SUCCESS:
                this.enterGame();
                break;
            case GameDownloadStatus.DOWNLOADING:
                Logger.log("正在下载中");
                break;
            case GameDownloadStatus.WAIT_DOWNLOAD:
                Global.HotUpdateManager.removeHotUpdateGameComp(this.gameData.game_id);
                Global.UI.fastTip(cc.js.formatStr("%s已取消下载", this.gameData.name));
                this.gameUpdateState = GameDownloadStatus.NEVER_DOWNLOAD;
                this.checkGameUpdateState();
                Logger.log("等待下载");
                break;
            case GameDownloadStatus.FAILD:
                Logger.log("下载失败", this.gameData.game_id);
                var f_gid = Global.HotUpdateManager.getWhichGameIsDowning();
                if (f_gid) {
                    if (f_gid == this.gameData.game_id) {
                        this.downloadingView(0);
                    }
                    else {
                        this.needWaitingView();
                        Global.UI.fastTip(this.gameData.name + "已加入下载队列");
                        Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.isBackVersionFlag, nativeVersion);
                    }
                }
                else {
                    this.downloadingView(0);
                    Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.isBackVersionFlag, nativeVersion);
                }
                break;
            default:
                break;
        }
    };
    GameItemView.prototype.destroy = function () {
        this.isBtnClick = false;
        this.unRegisterEvent();
    };
    GameItemView.prototype.releaseGameIcon = function () {
        if (this.index >= Global.Setting.cachedGameItemCount) {
            var iconPath = "hall/effect/gameicon/" + this.gameResData.prefabName;
            if (this.gameResData.platformIconPath && this.gameResData.platformIconPath != "")
                iconPath = this.gameResData.platformIconPath;
            Global.ResourceManager.releaseCache(iconPath, null);
        }
    };
    GameItemView.prototype.onDispose = function () {
        var tag = this.tagSpineNode.getChildByName("newTag");
        if (tag) {
            tag.removeFromParent();
            tag.destroy();
        }
    };
    GameItemView.prototype.onClose = function () {
    };
    return GameItemView;
}(ViewBase_1.default));
exports.default = GameItemView;

cc._RF.pop();