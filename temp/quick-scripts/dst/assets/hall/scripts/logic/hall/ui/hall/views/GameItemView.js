
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/GameItemView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcR2FtZUl0ZW1WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUlwRCx3RUFBOEQ7QUFDOUQsc0ZBQWlGO0FBRWpGLGdFQUEyRDtBQUMzRCxpRUFBaUU7QUFDakUsSUFBSyxrQkFRSjtBQVJELFdBQUssa0JBQWtCO0lBQ25CLCtEQUFZLENBQUE7SUFDWixnRkFBbUIsQ0FBQTtJQUNuQix5RkFBdUIsQ0FBQTtJQUN2Qix5RUFBZSxDQUFBO0lBQ2YseUVBQWUsQ0FBQTtJQUNmLDZFQUFpQixDQUFBO0lBQ2pCLDZEQUFTLENBQUE7QUFDYixDQUFDLEVBUkksa0JBQWtCLEtBQWxCLGtCQUFrQixRQVF0QjtBQUVELGdCQUFnQjtBQUNoQixJQUFLLFVBS0o7QUFMRCxXQUFLLFVBQVU7SUFDWCwyQ0FBUSxDQUFBO0lBQ1IsMkNBQUksQ0FBQTtJQUNKLDJDQUFJLENBQUE7SUFDSixtREFBUSxDQUFBO0FBQ1osQ0FBQyxFQUxJLFVBQVUsS0FBVixVQUFVLFFBS2Q7QUFHRDtJQUEwQyxnQ0FBUTtJQUFsRDtRQUFBLHFFQWt2QkM7UUE1dUJHLHFCQUFlLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUUsOEZBQThGO1FBVTFJLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQU8sR0FBRyxLQUFLLENBQUM7UUFzQlIsZUFBUyxHQUFHO1lBQ2hCLENBQUMsRUFBRSw2QkFBNkI7WUFDaEMsQ0FBQyxFQUFFLDhCQUE4QjtZQUNqQyxDQUFDLEVBQUUsNkJBQTZCO1NBQ25DLENBQUE7UUF3akJPLHNCQUFnQixHQUFZLEtBQUssQ0FBQzs7SUErSTlDLENBQUM7SUFyc0JHOzs7T0FHRztJQUNILGdDQUFTLEdBQVQsVUFBVSxV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QUMsUUFBUSxDQUFDLENBQUE7UUFDcEQsSUFBSSxHQUFHLEVBQUU7WUFDTCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtZQUN0QixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDaEI7SUFDTCxDQUFDO0lBQ1MsOEJBQU8sR0FBakI7SUFDQSxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQWx2QkEsQUFrdkJDLENBbHZCeUMsa0JBQVEsR0FrdkJqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgR2FtZUhvdFVwZGF0ZUNvbXBvbmVudCBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9ob3RVcGRhdGUvY29tcG9uZW50L0dhbWVIb3RVcGRhdGVDb21wb25lbnRcIjtcclxuaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcbmltcG9ydCBIYWxsTW9kZWwgZnJvbSBcIi4uLy4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCB7IEdhbWVUeXBlIH0gZnJvbSBcIi4uLy4uL0Nob29zZVJvb20vV25kR2FtZUxvYmJ5U2hlbGxcIjtcclxuaW1wb3J0IEJpbmRpbmdCdXR0b25FZmZlY3QgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L0JpbmRpbmdCdXR0b25FZmZlY3RcIjtcclxuaW1wb3J0IEJ1dHRvblBsdXMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L0J1dHRvblBsdXNcIjtcclxuaW1wb3J0IFlYQnV0dG9uIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9ZWEJ1dHRvblwiO1xyXG4vL+WIneWniyAtMTAwMCAtMSDmsqHkuIvovb3ov4cgMCDkuIvovb3miJDlip/lubbkuJTniYjmnKzmmK/mnIDmlrAgIDHkuIvovb3miJDlip/vvIzniYjmnKzkuI3mmK/mnIDmlrAgMuS4i+i9veS4rSAz562J5b6F5LiL6L29ICAgNOS4i+i9veWksei0pVxyXG5lbnVtIEdhbWVEb3dubG9hZFN0YXR1cyB7XHJcbiAgICBJTklUID0gLTEwMDAsXHJcbiAgICBORVZFUl9ET1dOTE9BRCA9IC0xLFxyXG4gICAgTkVXX1ZFUlNJT05fU1VDQ0VTUyA9IDAsXHJcbiAgICBPTERfVkVSU0lPTiA9IDEsXHJcbiAgICBET1dOTE9BRElORyA9IDIsXHJcbiAgICBXQUlUX0RPV05MT0FEID0gMyxcclxuICAgIEZBSUxEID0gNFxyXG59XHJcblxyXG4vLyAx5byA5pS+77yMMuWNs+WwhuS4iue6v++8jDPnu7TmiqRcclxuZW51bSBHYW1lU3RhdHVlIHtcclxuICAgIE5vbmUgPSAwLFxyXG4gICAgT3BlbixcclxuICAgIFNvb24sXHJcbiAgICBNYWludGFpbixcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVJdGVtVmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIGdhbWVEYXRhOiBhbnk7XHJcbiAgICAvL+e6r+WuouaIt+err+i1hOa6kOmFjee9rlxyXG4gICAgcHVibGljIGdhbWVSZXNEYXRhOiBhbnk7XHJcbiAgICB1cGRhdGVTdGF0ZTogY2MuTm9kZTtcclxuXHJcbiAgICBnYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuSU5JVDsgIC8vICAtMSDmsqHkuIvovb3ov4cgMCDkuIvovb3miJDlip/lubbkuJTniYjmnKzmmK/mnIDmlrAgIDHkuIvovb3miJDlip/vvIzniYjmnKzkuI3mmK/mnIDmlrAgMuS4i+i9veS4rSAz562J5b6F5LiL6L29ICAgNOS4i+i9veWksei0pSAgIC0tLS0vLyAxIG5ldyAyIOS4i+i9veS4rSAz5LiL6L295oiQ5YqfICA05LiL6L295aSx6LSlICBcclxuXHJcbiAgICB1cGRhdGVTdGF0ZV9kb3dubG9hZDogY2MuTm9kZTtcclxuICAgIHVwZGF0ZVN0YXRlX3dhaXRpbmc6IGNjLk5vZGU7XHJcbiAgICB1cGRhdGVTdGF0ZV91cGRhdGU6IGNjLk5vZGU7XHJcbiAgICB1cGRhdGVTdGF0ZV9zdG9wOiBjYy5Ob2RlO1xyXG4gICAgdXBkYXRlU3RhdGVfbG9hZGluZzogY2MuTm9kZTtcclxuICAgIC8vZ2FtZWl0ZW3kuK3nmoRzcGluZeiKgueCuVxyXG4gICAgc3BpbmVOb2RlOiBjYy5Ob2RlO1xyXG5cclxuICAgIGlzQnRuQ2xpY2sgPSBmYWxzZTtcclxuICAgIGNoZWNrZWQgPSBmYWxzZTtcclxuICAgIHVwZGF0ZUNvbXBvbmVudDogR2FtZUhvdFVwZGF0ZUNvbXBvbmVudDtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpbmRleDtcclxuXHJcbiAgICBwcml2YXRlIHRhZ0ltZzogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgdGFnU3BpbmVOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBncmF5SW1nOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3ZWlodUZsYWc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHdhaXRGbGFnOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgdGFnUGFyZW50OmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIGdhbWVJY29uTm9kZTogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIGVmZmVjdE1vdW50Tm9kZTogY2MuTm9kZTtcclxuXHJcbiAgICAvL+aUr+aMgXNwaW5l5ZKMZHJhZ29uYm9uZXPkuKTnp43moLzlvI9cclxuICAgIHByaXZhdGUgc3BpbmU6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBkcmFnb25Cb25lczogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5O1xyXG5cclxuICAgIHByaXZhdGUgdGFnUmVzTWFwID0ge1xyXG4gICAgICAgIDE6IFwiaGFsbEBlZmZlY3QvZ2FtZWljb24vaHVvYmFvXCIsXHJcbiAgICAgICAgMjogXCJoYWxsQGVmZmVjdC9nYW1laWNvbi90dWlqaWFuXCIsXHJcbiAgICAgICAgMzogXCJoYWxsQGVmZmVjdC9nYW1laWNvbi96dWl4aW5cIixcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuWtkOa4uOaIj2ljb27muLLmn5PlsYLov5vooYzliIbmiJDovr7liLDkvJjljJZkcmF3Y2FsbFxyXG4gICAgICogQHBhcmFtIHBhcmVudE5vZGUg5YiG5bGC54i26IqC54K5XHJcbiAgICAgKi9cclxuICAgIG1vdmVTcGluZShwYXJlbnROb2RlOmNjLk5vZGUpXHJcbiAgICAge1xyXG4gICAgICAgIGlmKCFjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSByZXR1cm5cclxuICAgICAgICBsZXQgc3BpbmVOb2RlID0gcGFyZW50Tm9kZS5nZXRDaGlsZEJ5TmFtZShcInNwaW5lTm9kZVwiKVxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIGxldCBzcGluZSA9IGNjLmZpbmQoYCR7dGhpcy5nYW1lRGF0YS5wcmVmYWJOYW1lfS9lZmZlY3RgLHRoaXMuZWZmZWN0TW91bnROb2RlKVxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQoc3BpbmUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBvcyA9IEdsb2JhbC5VSVV0aWwuY29udmVydFNhbWVOb2RlUG9zKHRoaXMuZWZmZWN0TW91bnROb2RlLHNwaW5lTm9kZSxzcGluZS5wb3NpdGlvbilcclxuICAgICAgICAgICAgc3BpbmUuc2V0UGFyZW50KHNwaW5lTm9kZSlcclxuICAgICAgICAgICAgc3BpbmUuc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmFja2dyb3VuZE5vZGUgPSBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKFwiYmFja2dyb3VuZE5vZGVcIilcclxuICAgICAgICBsZXQgcG9zMSA9IEdsb2JhbC5VSVV0aWwuY29udmVydFNhbWVOb2RlUG9zKHRoaXMubm9kZSxiYWNrZ3JvdW5kTm9kZSlcclxuICAgICAgICBpZihjYy5pc1ZhbGlkKCB0aGlzLmVmZmVjdE1vdW50Tm9kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdE1vdW50Tm9kZS5zZXRQYXJlbnQoYmFja2dyb3VuZE5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0TW91bnROb2RlLnNldFBvc2l0aW9uKHBvczEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHRhZ1N0ciA9IGB0YWdOb2RlXyR7dGhpcy5nYW1lRGF0YS50b3B9YFxyXG4gICAgICAgIGxldCB0YWdQYXJlbnROb2RlID0gIHBhcmVudE5vZGUuZ2V0Q2hpbGRCeU5hbWUodGFnU3RyKVxyXG4gICAgICAgIGxldCB0YWdOb2RlID0gY2MuZmluZChcInRhZ1wiLHRoaXMubm9kZSlcclxuXHJcbiAgICAgICAgbGV0IHBvczIgPSBHbG9iYWwuVUlVdGlsLmNvbnZlcnRTYW1lTm9kZVBvcyh0YWdOb2RlLGJhY2tncm91bmROb2RlKVxyXG5cclxuICAgICAgICBpZihjYy5pc1ZhbGlkKCB0aGlzLnRhZ1NwaW5lTm9kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1NwaW5lTm9kZS5zZXRQYXJlbnQodGFnUGFyZW50Tm9kZSlcclxuICAgICAgICAgICAgdGhpcy50YWdTcGluZU5vZGUuc2V0UG9zaXRpb24ocG9zMilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuYW1lUGFyZW50Tm9kZSA9ICBwYXJlbnROb2RlLmdldENoaWxkQnlOYW1lKFwibmFtZU5vZGVcIilcclxuICAgICAgICBsZXQgbmFtZU5vZGUgPSBjYy5maW5kKGAke3RoaXMuZ2FtZURhdGEucHJlZmFiTmFtZX0vbmFtZWAsdGhpcy5lZmZlY3RNb3VudE5vZGUpXHJcbiAgICAgICAgbGV0IHByZWZhYk5vZGUgPSBjYy5maW5kKGAke3RoaXMuZ2FtZURhdGEucHJlZmFiTmFtZX1gLHRoaXMuZWZmZWN0TW91bnROb2RlKVxyXG5cclxuICAgICAgICBsZXQgcG9zMyA9IEdsb2JhbC5VSVV0aWwuY29udmVydFNhbWVOb2RlUG9zKHByZWZhYk5vZGUsbmFtZVBhcmVudE5vZGUpXHJcblxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQoIG5hbWVOb2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWVOb2RlLnNldFBhcmVudChuYW1lUGFyZW50Tm9kZSlcclxuICAgICAgICAgICAgbmFtZU5vZGUuc2V0UG9zaXRpb24ocG9zMylcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH0gICBcclxuXHJcbiAgICByZWdpc3RlckV2ZW50KCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5VUERBVEVfU1VCX0dBTUVfRkFJTEVELCB0aGlzLCB0aGlzLm9uVXBkYXRlU3ViR2FtZUZhaWxlZClcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuVVBEQVRFX1NVQl9HQU1FX0ZJTklTSCwgdGhpcywgdGhpcy5vblVwZGF0ZVN1YkdhbWVGaW5pc2gpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9QRVJDRU5ULCB0aGlzLCB0aGlzLm9uVXBkYXRlU3ViR2FtZVBlcmNlbnQpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9TVEFURSwgdGhpcywgdGhpcy5jaGVja0dhbWVVcGRhdGVTdGF0ZSlcclxuICAgIH1cclxuXHJcbiAgICB1blJlZ2lzdGVyRXZlbnQoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5VUERBVEVfU1VCX0dBTUVfRkFJTEVELCB0aGlzLCB0aGlzLm9uVXBkYXRlU3ViR2FtZUZhaWxlZClcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9GSU5JU0gsIHRoaXMsIHRoaXMub25VcGRhdGVTdWJHYW1lRmluaXNoKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVVBEQVRFX1NVQl9HQU1FX1BFUkNFTlQsIHRoaXMsIHRoaXMub25VcGRhdGVTdWJHYW1lUGVyY2VudClcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlVQREFURV9TVUJfR0FNRV9TVEFURSwgdGhpcywgdGhpcy5jaGVja0dhbWVVcGRhdGVTdGF0ZSlcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZVN1YkdhbWVGYWlsZWQoZ2lkKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFnaWQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib25VcGRhdGVTdWJHYW1lRmFpbGVkIGdpZCA9PSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVEYXRhKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9uVXBkYXRlU3ViR2FtZUZhaWxlZCB0aGlzLmdhbWVEYXRhID09IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTnVtYmVyKGdpZCkgPT09IHRoaXMuZ2FtZURhdGEuZ2FtZV9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5lZWRGYWlsZFZpZXcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblVwZGF0ZVN1YkdhbWVGaW5pc2goZ2lkKSB7XHJcbiAgICAgICAgaWYgKCFnaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZ2FtZURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2lkID09PSB0aGlzLmdhbWVEYXRhLmdhbWVfaWQpIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZ2FtZUljb25Ob2RlIHx8ICF0aGlzLmdhbWVJY29uTm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVBbHBoYSgyNTUpXHJcbiAgICAgICAgICAgIC8vR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMuZ2FtZUljb25Ob2RlLCBmYWxzZSwgMjU1LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hbHJlYWR5R2FtZVZpZXcodHJ1ZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG5cclxuICAgIG9uVXBkYXRlU3ViR2FtZVBlcmNlbnQoZ2lkLCBwZXIpIHtcclxuICAgICAgICBpZiAoIWdpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5nYW1lRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExvZ2dlci5sb2coXCJvblVwZGF0ZVN1YkdhbWVQZXJjZW50ICBnaWQgPSBcIiArIGdpZCArIFwiIHBlciA9IFwiICsgcGVyKVxyXG4gICAgICAgIGlmIChnaWQgPT09IHRoaXMuZ2FtZURhdGEuZ2FtZV9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRvd25sb2FkaW5nVmlldyhwZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnRhZ0ltZyA9IGNjLmZpbmQoXCJ0YWcvaW1nXCIsIHRoaXMubm9kZSlcclxuICAgICAgICB0aGlzLnRhZ1NwaW5lTm9kZSA9IGNjLmZpbmQoXCJ0YWcvc3BpbmVOb2RlL3NwaW5lUGFyZW50XCIsIHRoaXMubm9kZSlcclxuICAgICAgICB0aGlzLmdyYXlJbWcgPSBjYy5maW5kKFwiZ3JheUltZ1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMud2VpaHVGbGFnID0gdGhpcy5ncmF5SW1nLmdldENoaWxkQnlOYW1lKCd3ZWlodUZsYWcnKTtcclxuICAgICAgICB0aGlzLndhaXRGbGFnID0gdGhpcy5ncmF5SW1nLmdldENoaWxkQnlOYW1lKCd3YWl0RmxhZycpO1xyXG4gICAgICAgIHRoaXMuc3BpbmVOb2RlID0gY2MuZmluZChcInNwaW5lTm9kZVwiLCB0aGlzLm5vZGUpXHJcblxyXG4gICAgICAgIHRoaXMuZWZmZWN0TW91bnROb2RlID0gdGhpcy5nZXRDaGlsZChcImljb25Nb3VudE5vZGVcIik7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUgPSBjYy5maW5kKFwidXBkYXRlU3RhdGVcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX2Rvd25sb2FkID0gdGhpcy51cGRhdGVTdGF0ZS5nZXRDaGlsZEJ5TmFtZShcImRvd25sb2FkXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVfd2FpdGluZyA9IHRoaXMudXBkYXRlU3RhdGUuZ2V0Q2hpbGRCeU5hbWUoXCJ3YWl0aW5nXCIpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVfdXBkYXRlID0gdGhpcy51cGRhdGVTdGF0ZS5nZXRDaGlsZEJ5TmFtZShcInVwZGF0ZVwiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX3N0b3AgPSB0aGlzLnVwZGF0ZVN0YXRlLmdldENoaWxkQnlOYW1lKFwic3RvcFwiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX2xvYWRpbmcgPSB0aGlzLnVwZGF0ZVN0YXRlLmdldENoaWxkQnlOYW1lKFwibG9hZGluZ1wiKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX2Rvd25sb2FkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVfd2FpdGluZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX3VwZGF0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX3N0b3AuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZV9sb2FkaW5nLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcclxuICAgICAgICB0aGlzLmlzQnRuQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uSXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLnVwZGF0ZVN0YXRlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlcnZlckluZm8oZ2FtZURhdGEsIGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IGdhbWVEYXRhO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVRhZygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlR2FtZVN0YXR1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u6LWE5rqQ5L+h5oGvXHJcbiAgICBwdWJsaWMgYXN5bmMgc2V0UmVzSW5mbyhnYW1lUmVzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT57XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZVJlc0RhdGEgPSBnYW1lUmVzO1xyXG4gICAgICAgICAgICBsZXQgbmFtZSA9IGdhbWVSZXMucHJlZmFiTmFtZVxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5sb2FkR2FtZUljb24obmFtZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRHYW1lSWNvbihuYW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCApPT4ge1xyXG4gICAgICAgICAgICBsZXQgaWNvblBhdGggPSBcImhhbGxAZWZmZWN0L2dhbWVpY29uL1wiICsgbmFtZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZVJlc0RhdGEucGxhdGZvcm1JY29uUGF0aCAmJiB0aGlzLmdhbWVSZXNEYXRhLnBsYXRmb3JtSWNvblBhdGggIT0gXCJcIilcclxuICAgICAgICAgICAgICAgIGljb25QYXRoID0gdGhpcy5nYW1lUmVzRGF0YS5wbGF0Zm9ybUljb25QYXRoO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLnJlbGVhc2VIZWxwZXIubWFya1VzZWQoaWNvblBhdGgpO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRSZXMoaWNvblBhdGgsIChlcnJvciwgcHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWKoOi9veWbvuagh+eJueaViOW8guW4uFwiLCBpY29uUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBpZighY2MuaXNWYWxpZCh0aGlzLm5vZGUpIHx8ICFjYy5pc1ZhbGlkKHRoaXMuZWZmZWN0TW91bnROb2RlKSkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICBsZXQgZWZmZWN0ID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKSBhcyBjYy5Ob2RlO1xyXG4gICAgICAgICAgICAgICAgLy8gZWZmZWN0LnNjYWxlID0gMC45NTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWZmZWN0TW91bnROb2RlLmFkZENoaWxkKGVmZmVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZWZmZWN0LnBvc2l0aW9uID0gY2MuVmVjMi5aRVJPO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGVmZmVjdC5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlZmZlY3QuY2hpbGRyZW5baW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBlbGVtZW50LmdldENvbXBvbmVudChCaW5kaW5nQnV0dG9uRWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFjb21wb25lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENvbXBvbmVudChCaW5kaW5nQnV0dG9uRWZmZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUljb25Ob2RlID0gZWZmZWN0O1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BpbmUgPSBlZmZlY3QuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihzcC5Ta2VsZXRvbilcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ29uQm9uZXMgPSBlZmZlY3QuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUljb25Ob2RlLnNldFBvc2l0aW9uKDAsIDApXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHByZWZhYilcclxuICAgICAgICAgICAgfSwgbnVsbCwgbnVsbCwgZmFsc2UsIHRydWUpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL3RhZ+eKtuaAge+8jOacgOaWsOOAgeeBq+eIhuetiVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUYWcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuc3RhdHVzICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnSW1nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1NwaW5lTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhZ1NwaW5lTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IHRhZ0VmZlBhdGggPSBcIlwiO1xyXG4gICAgICAgIGxldCB0YWdSZXMgPSB0aGlzLnRhZ1Jlc01hcFt0aGlzLmdhbWVEYXRhLnRvcF07XHJcbiAgICAgICAgaWYgKHRhZ1JlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnU3BpbmVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRhZ0VmZlBhdGggPSB0YWdSZXM7XHJcbiAgICAgICAgICAgIHRoaXMudGFnU3BpbmVOb2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFnSW1nLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyh0YWdFZmZQYXRoLCAoZXJyb3IsIFByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSB8fCAhY2MuaXNWYWxpZCh0aGlzLnRhZ1NwaW5lTm9kZSkpIHJldHVyblxyXG4gICAgICAgICAgICAgICAgaWYgKFByZWZhYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmVUYWcgPSBjYy5pbnN0YW50aWF0ZShQcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZVRhZy5uYW1lID0gXCJuZXdUYWdcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy50YWdTcGluZU5vZGUuZ2V0Q29tcG9uZW50KEJpbmRpbmdCdXR0b25FZmZlY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNvbXBvbmVudClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9ICB0aGlzLnRhZ1NwaW5lTm9kZS5hZGRDb21wb25lbnQoQmluZGluZ0J1dHRvbkVmZmVjdClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoWVhCdXR0b24pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYnRuKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLnNldEJpbmQoY29tcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ1NwaW5lTm9kZS5hZGRDaGlsZChwcmVUYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmdldEhhbGxHYW1lTGlzdFRhZ09mZnNldFgoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByZVRhZy5zZXRQb3NpdGlvbihjYy52MihhcnJbMF0sYXJyWzFdKSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmVUYWcuc2NhbGUgPSAwLjk1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBjYy5QcmVmYWIsIG51bGwsIHRydWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3BlbkZsYWcgPSB0aGlzLmdhbWVEYXRhLnRvcDJcclxuICAgICAgICAvL+W8gOWQr+S9k+mqjOWcuuagh+etvlxyXG4gICAgICAgIHRoaXMudGFnSW1nLmFjdGl2ZSA9IG9wZW5GbGFnID09IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TmlrDmuLjmiI/nirbmgIEgIOW8gOWQry/mlazor7fmnJ/lvoVcclxuICAgIHByaXZhdGUgdXBkYXRlR2FtZVN0YXR1cygpIHtcclxuICAgICAgICB0aGlzLmdhbWVJY29uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLnN0YXR1cyA9PSBHYW1lU3RhdHVlLk9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZUljb24oZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuZ3JheUltZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0dhbWVVcGRhdGVTdGF0ZSgpO1xyXG4gICAgICAgICAgICAvL+WcqOS4i+i9veS4re+8jOS7juWtkOa4uOaIj+WIh+WIsOWkp+WOhe+8jGdhbWVpY29uIOS8mumHjeaWsOWKoOi9ve+8jOmcgOimgemHjee9rueKtuaAgVxyXG4gICAgICAgICAgICBsZXQgaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgZ2FtZUhvdFVwZGF0ZUNvbXAgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXRIb3RVcGRhdGVHYW1lQ29tcCh0aGlzLmdhbWVEYXRhLmdhbWVfaWQpO1xyXG4gICAgICAgICAgICBpZiAoZ2FtZUhvdFVwZGF0ZUNvbXAgJiYgIWdhbWVIb3RVcGRhdGVDb21wLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXROb2RlQWxwaGEoMjU1KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZ2FtZURhdGEuc3RhdHVzID09IEdhbWVTdGF0dWUuU29vbikge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVBbHBoYSgyNTUgKiAwLjMpXHJcbiAgICAgICAgICAgIC8vR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMuZ2FtZUljb25Ob2RlLCB0cnVlLCAyNTUgKiAwLjMsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbih0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLmdyYXlJbWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWlodUZsYWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdEZsYWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5nYW1lRGF0YS5zdGF0dXMgPT0gR2FtZVN0YXR1ZS5NYWludGFpbikge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlSWNvbih0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVBbHBoYSgyNTUgKiAwLjMpXHJcbiAgICAgICAgICAgIC8vR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMuZ2FtZUljb25Ob2RlLCB0cnVlLCAyNTUgKiAwLjMsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmdyYXlJbWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWlodUZsYWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53YWl0RmxhZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Tm9kZUFscGhhKGFscGhhKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5zZXROb2RlR3JheSh0aGlzLmdhbWVJY29uTm9kZSwgdHJ1ZSwgYWxwaGEsIHRydWUpO1xyXG4gICAgICAgIGxldCBidG4gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKVxyXG4gICAgICAgIGlmKGJ0biAmJiBjYy5pc1ZhbGlkKGJ0bi5ub2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBiaW5kT2JqQXJyID0gYnRuLmJpbmRlZE9iamVjdFxyXG5cclxuICAgICAgICAgICAgaWYoYmluZE9iakFycilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJpbmRPYmpBcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBiaW5kT2JqQXJyW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpZihpdGVtICYmIGNjLmlzVmFsaWQoaXRlbS5ub2RlKSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSUhlbHBlci5zZXROb2RlR3JheShpdGVtLm5vZGUsIHRydWUsIGFscGhhLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXVzZUljb24odmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy5zcGluZSlcclxuICAgICAgICAgICAgdGhpcy5zcGluZS50aW1lU2NhbGUgPSB2YWx1ZSA/IDAgOiAxO1xyXG4gICAgICAgIGlmICh0aGlzLmRyYWdvbkJvbmVzKVxyXG4gICAgICAgICAgICB0aGlzLmRyYWdvbkJvbmVzLnRpbWVTY2FsZSA9IHZhbHVlID8gMCA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVEb3duU3RhdGUoKSB7XHJcbiAgICAgICAgaWYoY2Muc3lzLmlzQnJvd3NlcikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVfZG93bmxvYWQuYWN0aXZlID0gdGhpcy5nYW1lVXBkYXRlU3RhdGUgPT0gR2FtZURvd25sb2FkU3RhdHVzLk5FVkVSX0RPV05MT0FEO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVfd2FpdGluZy5hY3RpdmUgPSB0aGlzLmdhbWVVcGRhdGVTdGF0ZSA9PSBHYW1lRG93bmxvYWRTdGF0dXMuV0FJVF9ET1dOTE9BRDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX3VwZGF0ZS5hY3RpdmUgPSB0aGlzLmdhbWVVcGRhdGVTdGF0ZSA9PSBHYW1lRG93bmxvYWRTdGF0dXMuT0xEX1ZFUlNJT047XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZV9zdG9wLmFjdGl2ZSA9IHRoaXMuZ2FtZVVwZGF0ZVN0YXRlID09IEdhbWVEb3dubG9hZFN0YXR1cy5GQUlMRDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlX2xvYWRpbmcuYWN0aXZlID0gdGhpcy5nYW1lVXBkYXRlU3RhdGUgPT0gR2FtZURvd25sb2FkU3RhdHVzLkRPV05MT0FESU5HO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrR2FtZVVwZGF0ZVN0YXRlKGdpZCA9IG51bGwpIHtcclxuICAgICAgICBpZihnaWQgJiYgZ2lkICE9IHRoaXMuZ2FtZURhdGEuZ2FtZV9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2FtZUhvdFVwZGF0ZUNvbXAgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXRIb3RVcGRhdGVHYW1lQ29tcCh0aGlzLmdhbWVEYXRhLmdhbWVfaWQpO1xyXG4gICAgICAgIGlmIChnYW1lSG90VXBkYXRlQ29tcCkge1xyXG4gICAgICAgICAgICBpZiAoIWdhbWVIb3RVcGRhdGVDb21wLl91cGRhdGluZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZWVkV2FpdGluZ1ZpZXcoKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdhbWVIb3RVcGRhdGVDb21wLl9kb3dubG9hZF9wZXJjZW50KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkaW5nVmlldyhnYW1lSG90VXBkYXRlQ29tcC5fZG93bmxvYWRfcGVyY2VudClcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkaW5nVmlldygwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGlzR2FtZURvd25sb2FkZWQgPSB0aGlzLmNoZWNrRG93bmxvYWRlZCgpXHJcbiAgICAgICAgICAgIGlmKGlzR2FtZURvd25sb2FkZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbHJlYWR5R2FtZVZpZXcoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5lZWREb3dubG9hZFZpZXcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsZXQgbmF0aXZlVmVyc2lvbiA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLm5hdGl2ZVZlcnNpb25zW3RoaXMuZ2FtZURhdGEuZ2FtZV9pZC50b1N0cmluZygpXSB8fCBcIjAuMC4wXCJcclxuICAgICAgICAgICAgLy8gLy8gTG9nZ2VyLmxvZyhcIi0tLS0tLS0tLWdhbWVpZCBuYXRpdmVWZXJzaW9uIC0tLVwiICsgbmF0aXZlVmVyc2lvbilcclxuICAgICAgICAgICAgLy8gbGV0IG5ld1ZlcnNpb24gPSB0aGlzLmdhbWVEYXRhLnZlcnNpb247XHJcbiAgICAgICAgICAgIC8vIGxldCBpc0dhbWVEb3dubG9hZGVkID0gdGhpcy5jaGVja0Rvd25sb2FkZWQoKVxyXG4gICAgICAgICAgICAvLyBpZiAobmV3VmVyc2lvbiAhPSBcIlwiICkge1xyXG4gICAgICAgICAgICAvLyAgICAgbGV0IHZlcnNpb25Db21wYXJlRmxhZyA9IEdsb2JhbC5Ub29sa2l0LnZlcnNpb25Db21wYXJlKG5ld1ZlcnNpb24sIG5hdGl2ZVZlcnNpb24pXHJcbiAgICAgICAgICAgIC8vICAgICBsZXQgaXNCYWNrVmVyc2lvbkZsYWcgPSB0aGlzLmdhbWVEYXRhLmlzQmFja1ZlcnNpb25GbGFnXHJcbiAgICAgICAgICAgIC8vICAgICBpZiAoKHZlcnNpb25Db21wYXJlRmxhZyA+IDApIHx8ICgodmVyc2lvbkNvbXBhcmVGbGFnIDwgMCkgJiYgaXNCYWNrVmVyc2lvbkZsYWcgID09IDEpKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKCgodmVyc2lvbkNvbXBhcmVGbGFnIDwgMCkgJiYgaXNCYWNrVmVyc2lvbkZsYWcgID09IDEpKXtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuWbnua7mueJiOacrOaTjeS9nCBnYW1lSUQgPSBcIiArIHRoaXMuZ2FtZURhdGEuZ2FtZV9pZClcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGlzR2FtZURvd25sb2FkZWQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImVudGVyIG5lZWRVcGRhdGVWaWV3XCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMubmVlZFVwZGF0ZVZpZXcoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAvLyBMb2dnZXIubG9nKFwiZW50ZXIgbmVlZERvd25sb2FkVmlld1wiKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLm5lZWREb3dubG9hZFZpZXcoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGlzR2FtZURvd25sb2FkZWQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImVudGVyIGFscmVhZHlHYW1lVmlldyAwXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuYWxyZWFkeUdhbWVWaWV3KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgaWYgKGlzR2FtZURvd25sb2FkZWQpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAvLyBMb2dnZXIubG9nKFwiZW50ZXIgYWxyZWFkeUdhbWVWaWV3IDFcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmFscmVhZHlHYW1lVmlldygpO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gIC0xIOayoeS4i+i9vei/hyAwIOS4i+i9veaIkOWKn+W5tuS4lOeJiOacrOaYr+acgOaWsCAgMeS4i+i9vei/h++8jOeJiOacrOS4jeaYr+acgOaWsCAy5LiL6L295LitIDPnrYnlvoXkuIvovb0gIDTnvZHnu5zpl67popjkuIvovb3lgZzmraJcclxuICAgIG5lZWREb3dubG9hZFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuTkVWRVJfRE9XTkxPQURcclxuICAgICAgICB0aGlzLnVwZGF0ZURvd25TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5lZWRVcGRhdGVWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZVVwZGF0ZVN0YXRlID0gR2FtZURvd25sb2FkU3RhdHVzLk9MRF9WRVJTSU9OXHJcbiAgICAgICAgdGhpcy51cGRhdGVEb3duU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZWVkV2FpdGluZ1ZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuV0FJVF9ET1dOTE9BRDtcclxuICAgICAgICB0aGlzLnVwZGF0ZURvd25TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5lZWRGYWlsZFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuRkFJTEQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEb3duU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgZG93bmxvYWRpbmdWaWV3KHBlciA9IDApIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5sb2coXCJkb3dubG9hZGluZ1ZpZXcgbm9kZSA9PT0gbnVsbFwiICsgcGVyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVVcGRhdGVTdGF0ZSA9IEdhbWVEb3dubG9hZFN0YXR1cy5ET1dOTE9BRElORztcclxuICAgICAgICB0aGlzLnVwZGF0ZURvd25TdGF0ZSgpO1xyXG4gICAgICAgIGxldCBwcm9ncmVzc19sYWJlbCA9IHRoaXMudXBkYXRlU3RhdGVfbG9hZGluZy5nZXRDaGlsZEJ5TmFtZShcInByb2dyZXNzTGFiZWxcIilcclxuICAgICAgICBsZXQgcGVyU3RyID0gXCJcIlxyXG4gICAgICAgIGlmIChwZXIpIHtcclxuICAgICAgICAgICAgcGVyU3RyID0gTWF0aC5mbG9vcihwZXIgKiAxMDApICsgXCIlXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwZXJTdHIgPSBcIjAlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb2dyZXNzX2xhYmVsLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gcGVyU3RyO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlRmlsbGFuZ2UocGVyKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBVcGRhdGVGaWxsYW5nZShwZXIpIHtcclxuICAgICAgICBpZiAoIXBlcikge1xyXG4gICAgICAgICAgICBwZXIgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwcm9ncmVzc19TcHJpdGUgPSB0aGlzLnVwZGF0ZVN0YXRlX2xvYWRpbmcuZ2V0Q2hpbGRCeU5hbWUoXCJSYWRpYWxQcm9ncmVzc1wiKVxyXG4gICAgICAgIGxldCByYW5nZVNwcml0ZSA9IHByb2dyZXNzX1Nwcml0ZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIHJhbmdlU3ByaXRlLmZpbGxSYW5nZSA9IDEgLSBwZXJcclxuICAgICAgICBpZiAocGVyID4gMC45OTk5OSkge1xyXG4gICAgICAgICAgICByYW5nZVNwcml0ZS5maWxsUmFuZ2UgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5nYW1lSWNvbk5vZGUgfHwgIXRoaXMuZ2FtZUljb25Ob2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiVXBkYXRlRmlsbGFuZ2UgdGhpcy5nYW1lSWNvbk5vZGUuaXNWYWxpZCA9IGZhbHNlXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWxwaGEgPSAyNTUgKiAwLjMgKyAoMjU1ICogMC43ICogcGVyKVxyXG4gICAgICAgIHRoaXMuc2V0Tm9kZUFscGhhKGFscGhhKVxyXG4gICAgICAgIC8vR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMuZ2FtZUljb25Ob2RlLCB0cnVlLCBhbHBoYSwgdHJ1ZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFscmVhZHlHYW1lVmlldyhpc0hvdEJhY2s6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIExvZ2dlci5sb2coJ+a4uOaIj+W3sue7j+S4i+i9vScpXHJcbiAgICAgICAgdGhpcy5nYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuTkVXX1ZFUlNJT05fU1VDQ0VTU1xyXG4gICAgICAgIHRoaXMudXBkYXRlRG93blN0YXRlKCk7XHJcbiAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ0lzR2FtZURvd25sb2FkaW5nW3RoaXMuZ2FtZURhdGEuZ2FtZV9pZF0gPSBmYWxzZTtcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nYW1lQ2hlY2tlZFt0aGlzLmdhbWVEYXRhLmdhbWVfaWRdID0gZmFsc2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRG93bmxvYWRlZCgpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5jaGVja0lzR2FtZURvd25sb2FkKHRoaXMuZ2FtZURhdGEuZ2FtZV9pZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEdhbWVEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVEYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTW9uZXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuY2hlY2tNb25leSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lRGF0YS5sZXZlbHMgJiYgdGhpcy5nYW1lRGF0YS5sZXZlbHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludExvdyA9IHRoaXMuZ2FtZURhdGEubGV2ZWxzWzBdLlBvaW50TG93O1xyXG4gICAgICAgICAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhLnBvaW50IDwgcG9pbnRMb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGltaXQgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihwb2ludExvdyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0ciA9IFwi5ri45oiP5YeG5YWlXCIgKyBsaW1pdCArIFwi6YeR5biB77yM6K+35oKo5YWF5YC85ZOm77yBXCJcclxuICAgICAgICAgICAgICAgICAgICAvL0dsb2JhbC5VSS5mYXN0VGlwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuc2hvd01vbmV5Tm90RW5vdWdoKHN0cilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1ZlcnNpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuc3VwcG9ydFZlcnNpb24gJiYgdGhpcy5nYW1lRGF0YS5zdXBwb3J0VmVyc2lvbiA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCFHbG9iYWwuVG9vbGtpdC5jaGVja1ZlcnNpb25TdXBwb3J0KHRoaXMuZ2FtZURhdGEuc3VwcG9ydFZlcnNpb24sIHRoaXMuZ2FtZURhdGEuc3VwcG9ydElvc1ZlcnNpb24pKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KFwi54mI5pys6L+H5pen77yM6K+35LiL6L295paw5YyF5L2/55So6K+l5Yqf6IO9XCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0dhbWVDZmcoKSB7XHJcbiAgICAgICAgLy/ov5vmuLjmiI/liY3liKTmlq3mmK/lkKbmi4nliLDmuLjmiI/phY3nva5cclxuICAgICAgICBpZihHYW1lLkNvbnRyb2wuR0FNRV9ERFpfSEpfQVJSWzBdID09IHRoaXMuZ2FtZURhdGEuZ2FtZV9pZCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5nYW1lRGF0YSAmJiB0aGlzLmdhbWVEYXRhLmxldmVscyAmJiB0aGlzLmdhbWVEYXRhLmxldmVscy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlbnRlckdhbWUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBlbnRlckZ1bmMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYucmVTZXRHYW1lRG93bmxvYWRpbmcoKTtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLm5lZWRIYWxsQ2hvb3NlUm9vbSAmJiB0aGlzLmdhbWVEYXRhLmxldmVscy5sZW5ndGggPT0gMSAmJiB0aGlzLmdhbWVEYXRhLmdhbWVUeXBlICE9IEdhbWVUeXBlLlBWUCkgLy/pmaTkuoZQVlDlj6rmnInkuIDkuKrpgInlnLrnm7TmjqXov5vmuLjmiI9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxldmVsID0gdGhpcy5nYW1lRGF0YS5sZXZlbHNbMF0ubGV2ZWwgfHwgXCJsMFwiXHJcbiAgICAgICAgICAgICAgICBpZighR2xvYmFsLlRvb2xraXQuY2hlY2tNb25leShsZXZlbCx0aGlzLmdhbWVEYXRhKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5SZWNvcmRHYW1lTGlzdE9mZnNldFgpO1xyXG4gICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLmN1ckx2ID0gbGV2ZWxcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmdhbWVEYXRhLmxldmVsVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLmNvbm5uZWN0QW5kRW50ZXJHYW1lKHNlbGYuZ2FtZURhdGEuZ2FtZV9pZCwgXCJsMFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TY2VuZU1hbmFnZXIubG9hZEdhbWVTY2VuZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBnaWQgPSB0aGlzLmdhbWVEYXRhLmdhbWVfaWQ7XHJcbiAgICAgICAgICAgIEdhbWUuR2FtZVByZWxvYWRUb29sLnNldHVwKGdpZCk7XHJcbiAgICAgICAgICAgIGlmIChHYW1lLkdhbWVQcmVsb2FkVG9vbC5jaGVja1ByZWxvYWRCdW5kbGVFeGlzdChnaWQpKXsgICAgICAgIC8vIOmFjee9ruS6hui1sOa4uOaIj+mAieWculxyXG4gICAgICAgICAgICAgICAgYXdhaXQgR2FtZS5HYW1lUHJlbG9hZFRvb2wucHJlbG9hZEJ1bmRsZSgpO1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgR2FtZS5HYW1lUHJlbG9hZFRvb2wucHJlbG9hZFByZWZhYihHYW1lLkdhbWVQcmVsb2FkVG9vbC5sb2JieVVJUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEdhbWVMb2JieVNoZWxsXCIsIGdpZCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlJlY29yZEdhbWVMaXN0T2Zmc2V0WCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmdhbWVEYXRhLmxldmVsVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBHYW1lLkNvbnRyb2wuY29ubm5lY3RBbmRFbnRlckdhbWUoc2VsZi5nYW1lRGF0YS5nYW1lX2lkLCBcImwwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5sb2FkR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6L+b5ri45oiP5YmN5Yik5pat5piv5ZCm5ouJ5Yiw5ri45oiP6YWN572uXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrR2FtZUNmZygpKSB7XHJcbiAgICAgICAgICAgIC8v5by55qGG5o+Q56S65ri45oiP5rKh5pyJ6YWN572uXHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5ri45oiP6YWN572u5rKh5pyJ5ouJ5Yiw77yM6K+356iN562JflwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrTW9uZXkoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tWZXJzaW9uKCkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy/mo4Dmn6XmmK/lkKbpnIDopoHmmL7npLrmqKrnq5blsY/liIfmjaLmj5DnpLpcclxuICAgICAgICBpZiAodGhpcy5nYW1lRGF0YS5wb3J0cmFpdE1vZGVsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93UG9ydHJhaXRTY3JlZW5Ob3RpY2UoZW50ZXJGdW5jKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVudGVyRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlU2V0R2FtZURvd25sb2FkaW5nKCkge1xyXG4gICAgICAgIGxldCBIb3RVcGRhdGVNYW5hZ2VyID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXJcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gSG90VXBkYXRlTWFuYWdlci5nSXNHYW1lRG93bmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKEhvdFVwZGF0ZU1hbmFnZXIuZ0lzR2FtZURvd25sb2FkaW5nW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIEhvdFVwZGF0ZU1hbmFnZXIuZ0lzR2FtZURvd25sb2FkaW5nW2tleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGl0ZW1DbGlja1dhaXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBvbkl0ZW1DbGljaygpIHtcclxuICAgICAgICAvL+mYsuatoui/nue7reWkmuasoeeCueWHu+a4uOaIj+Wbvuagh+WHuuWPkeWkmuasoei/m+WFpVxyXG4gICAgICAgIGlmICh0aGlzLml0ZW1DbGlja1dhaXRpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLml0ZW1DbGlja1dhaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1DbGlja1dhaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc0J0bkNsaWNrID0gdHJ1ZTtcclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5pbkdhbWUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5DdXJyZW50R2FtZSA9IHRoaXMuZ2FtZURhdGEuZ2FtZV9pZDtcclxuICAgICAgICBsZXQgbmF0aXZlVmVyc2lvbiA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmdldE5hdGl2ZUhvdFVwZGF0ZVZlcnNpb24odGhpcy5nYW1lRGF0YS5nYW1lX2lkKVxyXG4gICAgICAgIC8vLy8g5piv5ZCm5pi+56S6ICAw5LiNIDHmmL7npLogMuW+heW8gOaUviAgM+e7tOaKpOS4rVxyXG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLnN0YXR1cyA9PSAyIHx8IHRoaXMuZ2FtZURhdGEuc3RhdHVzID09IDMpIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCJnYW1lIHN0YXR1cyA9IFwiICsgdGhpcy5nYW1lRGF0YS5zdGF0dXMpXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QXVkaW9Tb3VyY2UoXCJoYWxsL3NvdW5kL2NvbWluZ19zb29uXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIC8v55m+55ub5ri45oiPXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuZ3R5cGUgPT09IDgpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVja1ZlcnNpb24oKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGhhbGxNb2RlbDpIYWxsTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpXHJcbiAgICAgICAgICAgICAgICBoYWxsTW9kZWwucmVxdWVzdEFwcGx5RW50ZXJHYW1lKHRoaXMuZ2FtZURhdGEuZ2FtZV9pZClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5aSW5o6ld2Vi5ri45oiPXHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEuZ2FtZVR5cGUgPT09IDkpe1xyXG4gICAgICAgICAgICBsZXQgaGFsbE1vZGVsOkhhbGxNb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIilcclxuICAgICAgICAgICAgaGFsbE1vZGVsLnJlcXVlc3RBcHBseUVudGVyR2FtZSh0aGlzLmdhbWVEYXRhLmdhbWVfaWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjYy5zeXMuaXNOYXRpdmV8fHRoaXMuZ2FtZURhdGEuaXNOZXcpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuW3sue7j+abtOaWsOi/h+S4gOasoVwiK3RoaXMuZ2FtZURhdGEuaXNOZXcpXHJcbiAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIGxldCB2ZXJzaW9uVXJsID0gYCR7dGhpcy5nYW1lRGF0YS5nZXRVcGRhdGVVcmwoKX0vJHt0aGlzLmdhbWVEYXRhLnZlcnNpb259LyR7dGhpcy5nYW1lRGF0YS5nYW1lX2lkfS8ke0dsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnZlcnNpb25DZmdGaWxlTmFtZX1gO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCLov5nmmK/lvZPliY3nmoTniYjmnKzlj7fojrflj5Z1cmw9XCIrdmVyc2lvblVybClcclxuICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXRHYW1lVmVyc2lvbih2ZXJzaW9uVXJsKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgbGV0ICBuYXRpdmVWZXJzaW9uID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuZ2V0TmF0aXZlSG90VXBkYXRlVmVyc2lvbih0aGlzLmdhbWVEYXRhLmdhbWVfaWQpXHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCLov5znqIvniYjmnKw9XCIrZGF0YS52ZXJzaW9uICtcIuacrOWcsOW9k+WJjeeJiOacrD1cIituYXRpdmVWZXJzaW9uKVxyXG4gICAgICAgICAgICB0aGlzLmdhbWVEYXRhLm5hdGl2ZV92ZXJzaW9uID0gbmF0aXZlVmVyc2lvbjtcclxuICAgICAgICAgICAgdGhpcy5nYW1lRGF0YS5yZW1vdGVfdmVyc2lvbiA9IGRhdGEudmVyc2lvbjtcclxuICAgICAgICAgICAgaWYoR2xvYmFsLlRvb2xraXQudmVyc2lvbkNvbXBhcmUodGhpcy5nYW1lRGF0YS5uYXRpdmVfdmVyc2lvbixkYXRhLnZlcnNpb24pID09IC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmVlZFVwZGF0ZVZpZXcoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVEYXRhLmlzTmV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW50ZXJHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQnlHYW1lVXBkYXRlU3RhdGUoKTtcclxuICAgICAgICB9LCgpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6YWN572u5ouJ5Y+W5aSx6LSl77yM6K+35qOA5p+l572R57ucXCIpO1xyXG4gICAgICAgIH0pICAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICAgIGNoZWNrQnlHYW1lVXBkYXRlU3RhdGUoKXtcclxuICAvLy8vIDEgbmV3IDIg5LiL6L295LitIDPkuIvovb3miJDlip8gIDTkuIvovb3lpLHotKVcclxuICAgICAgICAvLy8vIC0xIOayoeS4i+i9vei/hyAwIOS4i+i9veaIkOWKn+W5tuS4lOeJiOacrOaYr+acgOaWsCAgMeS4i+i9vei/h++8jOeJiOacrOS4jeaYr+acgOaWsCAy5LiL6L295LitIDPnrYnlvoXkuIvovb0gNCDkuIvovb3lvILluLhcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2FtZVVwZGF0ZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgR2FtZURvd25sb2FkU3RhdHVzLk9MRF9WRVJTSU9OOlxyXG4gICAgICAgICAgICBjYXNlIEdhbWVEb3dubG9hZFN0YXR1cy5ORVZFUl9ET1dOTE9BRDpcclxuICAgICAgICAgICAgICAgIGxldCBnaWQgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5nZXRXaGljaEdhbWVJc0Rvd25pbmcoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGdpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnaWQgPT0gdGhpcy5nYW1lRGF0YS5nYW1lX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRpbmdWaWV3KDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkV2FpdGluZ1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGhpcy5nYW1lRGF0YS5uYW1lICsgXCLlt7LliqDlhaXkuIvovb3pmJ/liJdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuYWRkSG90VXBkYXRlR2FtZUNvbXAodGhpcy5nYW1lRGF0YS5nYW1lX2lkLCB0aGlzLmdhbWVEYXRhLnZlcnNpb24sIHRoaXMuZ2FtZURhdGEuZ2V0VXBkYXRlVXJsKCksIHRoaXMuZ2FtZURhdGEucmVtb3RlX3ZlcnNpb24pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZGluZ1ZpZXcoMClcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci5hZGRIb3RVcGRhdGVHYW1lQ29tcCh0aGlzLmdhbWVEYXRhLmdhbWVfaWQsIHRoaXMuZ2FtZURhdGEudmVyc2lvbiwgdGhpcy5nYW1lRGF0YS5nZXRVcGRhdGVVcmwoKSwgdGhpcy5nYW1lRGF0YS5yZW1vdGVfdmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVEb3dubG9hZFN0YXR1cy5ORVdfVkVSU0lPTl9TVUNDRVNTOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRlckdhbWUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVEb3dubG9hZFN0YXR1cy5ET1dOTE9BRElORzpcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLmraPlnKjkuIvovb3kuK1cIilcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVEb3dubG9hZFN0YXR1cy5XQUlUX0RPV05MT0FEOlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIucmVtb3ZlSG90VXBkYXRlR2FtZUNvbXAodGhpcy5nYW1lRGF0YS5nYW1lX2lkKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoY2MuanMuZm9ybWF0U3RyKFwiJXPlt7Llj5bmtojkuIvovb1cIix0aGlzLmdhbWVEYXRhLm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lVXBkYXRlU3RhdGUgPSBHYW1lRG93bmxvYWRTdGF0dXMuTkVWRVJfRE9XTkxPQUQgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrR2FtZVVwZGF0ZVN0YXRlKClcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLnrYnlvoXkuIvovb1cIilcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEdhbWVEb3dubG9hZFN0YXR1cy5GQUlMRDpcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLkuIvovb3lpLHotKVcIiwgdGhpcy5nYW1lRGF0YS5nYW1lX2lkKTtcclxuICAgICAgICAgICAgICAgIGxldCBmX2dpZCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmdldFdoaWNoR2FtZUlzRG93bmluZygpXHJcbiAgICAgICAgICAgICAgICBpZiAoZl9naWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZl9naWQgPT0gdGhpcy5nYW1lRGF0YS5nYW1lX2lkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRpbmdWaWV3KDApXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkV2FpdGluZ1ZpZXcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGhpcy5nYW1lRGF0YS5uYW1lICsgXCLlt7LliqDlhaXkuIvovb3pmJ/liJdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuYWRkSG90VXBkYXRlR2FtZUNvbXAodGhpcy5nYW1lRGF0YS5nYW1lX2lkLCB0aGlzLmdhbWVEYXRhLnZlcnNpb24sIHRoaXMuZ2FtZURhdGEuZ2V0VXBkYXRlVXJsKCksIHRoaXMuZ2FtZURhdGEuaXNCYWNrVmVyc2lvbkZsYWcsbmF0aXZlVmVyc2lvbilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRpbmdWaWV3KDApXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuYWRkSG90VXBkYXRlR2FtZUNvbXAodGhpcy5nYW1lRGF0YS5nYW1lX2lkLCB0aGlzLmdhbWVEYXRhLnZlcnNpb24sIHRoaXMuZ2FtZURhdGEuZ2V0VXBkYXRlVXJsKCksIHRoaXMuZ2FtZURhdGEuaXNCYWNrVmVyc2lvbkZsYWcsbmF0aXZlVmVyc2lvbilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5pc0J0bkNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51blJlZ2lzdGVyRXZlbnQoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlR2FtZUljb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gR2xvYmFsLlNldHRpbmcuY2FjaGVkR2FtZUl0ZW1Db3VudCkge1xyXG4gICAgICAgICAgICBsZXQgaWNvblBhdGggPSBcImhhbGwvZWZmZWN0L2dhbWVpY29uL1wiICsgdGhpcy5nYW1lUmVzRGF0YS5wcmVmYWJOYW1lO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nYW1lUmVzRGF0YS5wbGF0Zm9ybUljb25QYXRoICYmIHRoaXMuZ2FtZVJlc0RhdGEucGxhdGZvcm1JY29uUGF0aCAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgaWNvblBhdGggPSB0aGlzLmdhbWVSZXNEYXRhLnBsYXRmb3JtSWNvblBhdGg7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZUNhY2hlKGljb25QYXRoLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgbGV0IHRhZyA9IHRoaXMudGFnU3BpbmVOb2RlLmdldENoaWxkQnlOYW1lKFwibmV3VGFnXCIpXHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICB0YWcucmVtb3ZlRnJvbVBhcmVudCgpXHJcbiAgICAgICAgICAgIHRhZy5kZXN0cm95KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgIH1cclxufSJdfQ==