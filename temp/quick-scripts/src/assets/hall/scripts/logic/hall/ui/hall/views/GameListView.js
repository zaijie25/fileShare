"use strict";
cc._RF.push(module, '13835FXZ4dA+ZJbrqFrGD2C', 'GameListView');
// hall/scripts/logic/hall/ui/hall/views/GameListView.ts

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
var GameItemView_1 = require("./GameItemView");
var AppHelper_1 = require("../../../../core/tool/AppHelper");
var HallStorageKey_1 = require("../../../../hallcommon/const/HallStorageKey");
var YXButton_1 = require("../../../../core/component/YXButton");
var GameListView = /** @class */ (function (_super) {
    __extends(GameListView, _super);
    function GameListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.contentWide = -1;
        _this.gameItemMap = {};
        _this.biniting = false;
        return _this;
    }
    //公告 banner
    GameListView.prototype.initView = function () {
        this.gameListScroll = this.getComponent("centerContent", cc.ScrollView);
        this.gameItemRoot = this.getChild("centerContent/contentView/content/itemArea/contentView/content/itemParent/iconRoot");
        this.gonggaoNode = this.getChild("centerContent/contentView/content/gonggaoArea/gonggaoNode");
        this.contentNode = this.getChild("centerContent/contentView/content/itemArea/contentView/content");
        this.topArrow = this.getChild("shan_left");
        this.botArrow = this.getChild("shan_right");
        this.botArrow.active = false;
        this.topArrow.active = false;
        this.gameTemplate = this.getChild("gameListItem");
        this.gameTemplate.active = false;
        this.gameItemHeight = this.gameTemplate.height;
        this.gameItemWidth = this.gameTemplate.width;
        //this.gameListScroll.node.on("scroll-to-top", this.onScrollViewScrollToTop, this);
        this.gameListScroll.node.on("scrolling", this.onScrollViewScroll, this);
        //this.gameListScroll.node.on("scroll-to-bottom", this.onScrollViewScrollToBot, this);
        this.gameListScroll.node.on("scroll-ended", this.onScrollViewScrollEnded, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    };
    GameListView.prototype.onDispose = function () {
        this.gameListScroll.node.off("scrolling", this.onScrollViewScroll, this);
        //this.gameListScroll.node.on("scroll-to-bottom", this.onScrollViewScrollToBot, this);
        this.gameListScroll.node.off("scroll-ended", this.onScrollViewScrollEnded, this);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    };
    GameListView.prototype.onResume = function () {
        var _this = this;
        if (Global.SceneManager.inGame()) {
            //xiaoc 2021-3-10 子游戏内不处理,否则会报错
            return;
        }
        Logger.error("---------gameItemList----------onResume---------");
        Global.Component.scheduleOnce(function () {
            _this.onScrollViewScroll();
        }, 0.1);
        // if(cc.isValid(this.contentNode)&& this.contentWide >0)
        // {
        //     this.contentNode.width = this.contentWide
        // }
        // this.gameListScroll.setContentPosition(cc.Vec2.ZERO)
        // this.gameListScroll.scrollToTop(0)
    };
    GameListView.prototype.onScrollViewScrollEnded = function () {
        var top = cc.v2(this.gameListScroll.getScrollOffset().x, 0);
        var bot = cc.v2(this.gameListScroll.getScrollOffset().x, this.gameListScroll.getMaxScrollOffset().y);
        var offSet = this.gameListScroll.getScrollOffset();
        var topXOffset = offSet.x - top.x;
        var topYOffset = offSet.y - top.y;
        var topDistence = Math.sqrt(Math.pow(topXOffset, 2) + Math.pow(topYOffset, 2));
        var botXOffset = offSet.x - bot.x;
        var botYOffset = offSet.y - bot.y;
        var botDistence = Math.sqrt(Math.pow(botXOffset, 2) + Math.pow(botYOffset, 2));
        if (topDistence >= botDistence) {
            this.hideArrow(1);
        }
        else {
            this.hideArrow(0);
        }
    };
    GameListView.prototype.onScrollViewScrollToTop = function () {
        this.hideArrow(0);
    };
    GameListView.prototype.onScrollViewScrollToBot = function () {
        this.hideArrow(1);
    };
    GameListView.prototype.hideArrow = function (flag) {
        if (cc.isValid(this.topArrow))
            this.topArrow.active = flag == 1;
        if (cc.isValid(this.botArrow))
            this.botArrow.active = flag == 0;
    };
    GameListView.prototype.onScrollViewScroll = function () {
        // 获取 ScrollView Node 的左下角坐标在世界坐标系中的坐标
        if (!this.gameListScroll.node || !cc.isValid(this.gameListScroll.node))
            return;
        this.hideArrow(-1);
        var svLeftBottomPoint = this.gameListScroll.node.parent.convertToWorldSpaceAR(cc.v2(this.gameListScroll.node.x - this.gameListScroll.node.anchorX * this.gameListScroll.node.width, this.gameListScroll.node.y - this.gameListScroll.node.anchorY * this.gameListScroll.node.height));
        // 求出 ScrollView 可视区域在世界坐标系中的矩形（碰撞盒）
        var svBBoxRect = cc.rect(svLeftBottomPoint.x, svLeftBottomPoint.y, this.gameListScroll.node.width, this.gameListScroll.node.height);
        if (!this.gameItemList || this.gameItemList.length == 0)
            return;
        for (var i = 0; i < this.gameItemList.length; i++) {
            var item = this.gameItemList[i];
            var btn = item.node.getComponent(YXButton_1.default);
            if (!item || !cc.isValid(item.node)) {
                continue;
            }
            if (item.node.getBoundingBoxToWorld().intersects(svBBoxRect)) { //判断是否在可视区域内
                item.active = true;
                btn.setActive(true);
            }
            else {
                item.active = false;
                btn.setActive(false);
            }
        }
    };
    GameListView.prototype.getNodesArr = function () {
        var arr = [];
        for (var i = 0; i < this.gameItemList.length; i++) {
            arr.push(this.gameItemList[i].node);
        }
        return arr;
    };
    GameListView.prototype.addGameItem = function (gid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var item, gameInfo, node;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    item = new GameItemView_1.default();
                                    gameInfo = Global.GameData.getGameResInfo(gid);
                                    node = cc.instantiate(this.gameTemplate);
                                    item.setNode(node);
                                    return [4 /*yield*/, item.setResInfo(gameInfo)];
                                case 1:
                                    _a.sent();
                                    this.gameItemMap[gid] = item;
                                    item.active = false;
                                    resolve(item);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    GameListView.prototype.refreshGameList = function (enterGameOffsetX, callback) {
        if (callback === void 0) { callback = null; }
        return __awaiter(this, void 0, void 0, function () {
            var gameList, spaceX, gongGaoNodeWide, moreGameNodeWidth, rightNodeArr, count, startingDistance, i, gameData, item, itemX, itemY, contentWidth, callbackFuc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.hideAllItem();
                        this.gameItemRoot.stopAllActions();
                        if (this.gameListScroll.isScrolling() || this.gameListScroll.isAutoScrolling()) {
                            this.gameListScroll.stopAutoScroll();
                        }
                        if (enterGameOffsetX < 0) {
                            Global.Component.scheduleOnce(function () {
                                _this.gameListScroll.scrollToOffset(cc.v2(-enterGameOffsetX, 0));
                            });
                        }
                        else {
                            this.gameListScroll.scrollToLeft();
                        }
                        gameList = Global.GameData.hallGameList;
                        spaceX = Global.Setting.SkinConfig.hallGameListOffsetX;
                        gongGaoNodeWide = this.gonggaoNode.width;
                        moreGameNodeWidth = 0;
                        this.gameItemList = [];
                        rightNodeArr = [];
                        count = 0;
                        startingDistance = gongGaoNodeWide;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < gameList.length)) return [3 /*break*/, 4];
                        gameData = gameList[i];
                        //过滤部分游戏
                        if (AppHelper_1.default.isBaiduSpecialState() && AppHelper_1.default.isFilterGame(gameData.game_id))
                            return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getItem(gameData.game_id)];
                    case 2:
                        item = _a.sent();
                        item.node.parent = this.gameItemRoot;
                        itemX = 0;
                        itemY = 0;
                        if (count % 2 == 0) {
                            itemX = startingDistance + this.gameItemWidth / 2 * (Math.floor(count + 1)) + (Math.floor(count / 2)) * spaceX;
                            itemY = this.gameItemHeight / 2 - 200;
                        }
                        else {
                            itemX = startingDistance + this.gameItemWidth / 2 * (Math.floor(count)) + (Math.floor(count / 2)) * spaceX;
                            itemY = -this.gameItemHeight / 2;
                        }
                        item.node.setPosition(itemX, itemY);
                        //更新图标状态
                        item.setServerInfo(gameData, count);
                        item.active = true;
                        rightNodeArr.push(item.node);
                        this.gameItemList.push(item);
                        // if(i==0){
                        //     let firstOpen = Global.Setting.storage.get(HallStorageKey.FirstOpen);
                        //     if(firstOpen == 1){
                        //         Logger.log("GameListView 第一次已经下载 firstOpen = ",firstOpen);
                        //     }else{
                        //         Logger.log("GameListView 准备下载 firstOpen =" + firstOpen);
                        //         if(item && item.node && item.node.isValid)
                        //         {   //第一次打开自动下载
                        //             item.donwloadGame();
                        //         }
                        //     }
                        //  }
                        count++;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        contentWidth = Math.ceil(count / 2) * this.gameItemWidth + Math.ceil(count / 2) * spaceX + gongGaoNodeWide + moreGameNodeWidth + spaceX;
                        this.gameItemRoot.parent.width = contentWidth;
                        this.gameItemRoot.opacity = 1;
                        callbackFuc = cc.callFunc(function () {
                            if (callback) {
                                callback();
                            }
                        });
                        this.gameItemRoot.runAction(cc.sequence(cc.hide(), cc.fadeOut(0), cc.show(), cc.fadeIn(1), callbackFuc));
                        this.downloadGame();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameListView.prototype.downloadGame = function () {
        if (CC_PREVIEW)
            return;
        var firstOpen = Global.Setting.storage.get(HallStorageKey_1.default.FirstOpen);
        if (firstOpen && firstOpen == 1) {
            return;
        }
        var gidList = Global.GameData.autoDownList;
        if (gidList && gidList.length > 0) {
            Global.Setting.storage.set(HallStorageKey_1.default.FirstOpen, 1);
            for (var i = 0; i < gidList.length; i++) {
                var gameData = Global.GameData.getGameInfo(gidList[i]);
                if (gameData && gameData.status == 1) {
                    Global.HotUpdateManager.addHotUpdateGameComp(gameData.game_id, gameData.version, gameData.getUpdateUrl(), gameData.isBackVersionFlag, "0.0.0", true);
                }
            }
        }
    };
    GameListView.prototype.getItem = function (gid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    item = this.gameItemMap[gid];
                                    if (!(item == null)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.addGameItem(gid)];
                                case 1:
                                    // Logger.error("没找到资源图标", gid);
                                    item = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    resolve(item);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    GameListView.prototype.showAllItem = function () {
        if (this.gameItemMap && !Global.Toolkit.isEmptyObject(this.gameItemMap)) {
            for (var key in this.gameItemMap) {
                this.gameItemMap[key].active = true;
            }
        }
    };
    GameListView.prototype.hideAllItem = function () {
        if (this.gameItemMap && !Global.Toolkit.isEmptyObject(this.gameItemMap)) {
            for (var key in this.gameItemMap) {
                this.gameItemMap[key].active = false;
            }
        }
    };
    GameListView.prototype.destroy = function () {
        for (var key in this.gameItemMap) {
            this.gameItemMap[key].destroy();
        }
    };
    GameListView.prototype.destroyAll = function () {
        var rootNode = this.gameItemRoot.parent;
        if (!cc.isValid(rootNode))
            return;
        for (var index = 0; index < rootNode.childrenCount; index++) {
            var child = rootNode.children[index];
            if (cc.isValid(child)) {
                child.destroyAllChildren();
            }
        }
        this.destroy();
        this.gameItemMap = {};
    };
    GameListView.prototype.close = function () {
        for (var key in this.gameItemMap) {
            this.gameItemMap[key].releaseGameIcon();
        }
    };
    return GameListView;
}(ViewBase_1.default));
exports.default = GameListView;

cc._RF.pop();