"use strict";
cc._RF.push(module, 'efe776jRf5FF76ldXONc4oN', 'GameListViewA');
// hall/scripts/logic/hall/ui/hall/views/GameListViewA.ts

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
var HallStorageKey_1 = require("../../../../hallcommon/const/HallStorageKey");
var BindingButtonEffect_1 = require("../../../../core/component/BindingButtonEffect");
var YXButton_1 = require("../../../../core/component/YXButton");
var GameListView = /** @class */ (function (_super) {
    __extends(GameListView, _super);
    function GameListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentNode = null;
        _this.contentWide = -1;
        _this.gameItemMap = {};
        _this.biniting = false;
        _this.itemAreaX = 430;
        _this.itemAreaY = 195;
        _this.moreGameAreaX = 0;
        return _this;
    }
    //公告 banner
    GameListView.prototype.initView = function () {
        this.gameListScroll = this.getComponent("centerContent", cc.ScrollView);
        this.gameItemRoot = this.getChild("centerContent/contentView/content/itemParent/iconRoot");
        this.gonggaoNode = this.getChild("centerContent/contentView/content/gonggaoArea");
        this.contentNode = this.getChild("centerContent/contentView/content");
        this.moreGameBtn = this.getChild("centerContent/contentView/content/moreGameBtn");
        this.itemArea = this.getChild("centerContent/contentView/content/itemParent");
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
        this.itemArea.stopAllActions();
        if (this.gameListScroll.isScrolling() || this.gameListScroll.isAutoScrolling()) {
            this.gameListScroll.stopAutoScroll();
        }
        Logger.error("---------gameItemList----------onResume---------");
        Global.Component.scheduleOnce(function () {
            _this.onScrollViewScroll();
        }, 0.1);
        // if(cc.isValid(this.contentNode)&& this.contentWide >0)
        // {
        //     
        //     cc.log("111111111111111111111111111111111111111111111111111111111111111111111" + this.gameItemRoot.parent.parent.parent.name)
        //    // this.gameItemRoot.parent.parent.parent.width = this.contentWide;
        //     this.contentNode.width = this.contentWide;
        // }
        if (this.isMoreGame) {
            Global.Component.scheduleOnce(function () {
                _this.itemArea.setPosition(_this.moreGameAreaX, _this.itemAreaY);
                _this.gameListScroll.scrollToLeft();
            }, 0.05);
        }
        // this.gameListScroll.content.width = this.contentWide;
        // Logger.error("this.gameListScroll = " + this.gameListScroll.content.width);
        // Logger.error("this.gameItemRoot.parent.parent.parent.width = " + this.gameItemRoot.parent.parent.parent.width);
        // Logger.error("this.contentWide = " + this.contentWide);
        this.gameListScroll.setContentPosition(cc.Vec2.ZERO);
        this.gameListScroll.scrollToLeft(0);
    };
    GameListView.prototype.onScrollViewScrollEnded = function () {
        // cc.error(this.gameListScroll.getMaxScrollOffset().x,this.gameListScroll.getMaxScrollOffset().y)
        var left = cc.v2(0, this.gameListScroll.getScrollOffset().y);
        var right = cc.v2(this.gameListScroll.getMaxScrollOffset().x, this.gameListScroll.getMaxScrollOffset().y);
        var offSet = this.gameListScroll.getScrollOffset();
        var topXOffset = offSet.x - left.x;
        var topYOffset = offSet.y - left.y;
        var topDistence = Math.sqrt(Math.pow(topXOffset, 2) + Math.pow(topYOffset, 2)); //左边距距离
        var botXOffset = Math.abs(offSet.x) - Math.abs(right.x);
        var botYOffset = offSet.y - right.y;
        var botDistence = Math.sqrt(Math.pow(botXOffset, 2) + Math.pow(botYOffset, 2)); // 右边距距离
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
    GameListView.prototype.refreshGameList = function (enterGameOffsetX, isMoreGame, callback) {
        if (isMoreGame === void 0) { isMoreGame = false; }
        if (callback === void 0) { callback = null; }
        return __awaiter(this, void 0, void 0, function () {
            var gongGaoNodeWide, offeset, gameList, spaceX, spaceY, count, startGapX, startGapY, line, startingDistance, moreGameNodeWidth, i, gameData, item, itemX, itemY, index, gapCount, bindObj, contentWidth, callbackFuc, posX, showAllItemFunc;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.hideAllItem();
                        // if (this.biniting) {
                        //     return
                        // }
                        // this.biniting = true
                        // this.destroyAll()
                        this.itemArea.stopAllActions();
                        if (this.gameListScroll.isScrolling() || this.gameListScroll.isAutoScrolling()) {
                            this.gameListScroll.stopAutoScroll();
                        }
                        this.isMoreGame = isMoreGame;
                        if (isMoreGame) {
                            this.itemArea.setPosition(this.moreGameAreaX, this.itemAreaY);
                        }
                        else {
                            this.itemArea.setPosition(this.itemAreaX, this.itemAreaY);
                        }
                        if (enterGameOffsetX < 0) {
                            Global.Component.scheduleOnce(function () {
                                _this.gameListScroll.scrollToOffset(cc.v2(-enterGameOffsetX, 0));
                            });
                        }
                        else {
                            this.gameListScroll.scrollToLeft();
                        }
                        this.itemArea.opacity = 1;
                        gongGaoNodeWide = this.gonggaoNode.width;
                        offeset = Global.Setting.SkinConfig.getSpaceOffset();
                        gameList = isMoreGame ? Global.GameData.moreGameList : Global.GameData.hallGameList;
                        spaceX = offeset[0];
                        spaceY = offeset[1];
                        this.gameItemList = [];
                        count = 0;
                        startGapX = Global.Setting.SkinConfig.getHallGameListGap(0) //初始x轴间隔
                        ;
                        startGapY = Global.Setting.SkinConfig.getHallGameListGap(1) //初始y轴间隔
                        ;
                        line = Global.Setting.SkinConfig.getHallGameListLine() //初始x轴间隔
                        ;
                        startingDistance = isMoreGame ? 3 * spaceX : gongGaoNodeWide;
                        moreGameNodeWidth = Global.GameData.hasMoreGameList ? this.moreGameBtn.width : 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < gameList.length)) return [3 /*break*/, 4];
                        gameData = gameList[i];
                        return [4 /*yield*/, this.getItem(gameData.game_id)];
                    case 2:
                        item = _a.sent();
                        //更新图标状态
                        item.setServerInfo(gameData, count);
                        item.node.parent = this.itemArea;
                        itemX = 0;
                        itemY = 0;
                        index = count % line;
                        gapCount = Math.floor(count / line);
                        itemX = this.gameItemWidth / 2 + gapCount * this.gameItemWidth + gapCount * spaceX + startGapX;
                        itemY = -this.gameItemHeight / 2 - index * this.gameItemHeight - index * spaceY - startGapY;
                        item.node.setPosition(itemX, itemY);
                        item.node.name = gameData.prefabName;
                        // rightNodeArr.push(item.node);
                        this.gameItemList.push(item);
                        Global.UIHelper.addCommonClick(item.node, "", item.onItemClick, item);
                        bindObj = item.node.getComponentsInChildren(BindingButtonEffect_1.default);
                        item.node.getComponent(YXButton_1.default).setBind(bindObj);
                        // let rootNode = this.gameItemRoot.parent
                        // item.moveSpine(rootNode)
                        item.node.active = true;
                        count++;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        contentWidth = Math.ceil(count / 2) * this.gameItemWidth + Math.ceil(count / 2) * spaceX + gongGaoNodeWide + moreGameNodeWidth + spaceX;
                        if (isMoreGame) {
                            contentWidth = Math.ceil(count / 2) * this.gameItemWidth + Math.ceil(count / 2) * spaceX + startingDistance;
                        }
                        // let contentWidth:number = Math.ceil( Math.ceil(count / line)) * this.gameItemWidth  + Math.ceil( Math.ceil(count / line)-1) * spaceX  +1/2 * this.gameItemWidth + moreGameNodeWidth + startGapX
                        this.contentWide = contentWidth;
                        callbackFuc = cc.callFunc(function () {
                            if (callback) {
                                // this.biniting = false
                                callback();
                                _this.hideArrow(0);
                                _this.onScrollViewScroll();
                            }
                        });
                        if (Global.GameData.hasMoreGameList && !isMoreGame) {
                            this.moreGameBtn.active = true;
                            this.moreGameBtn.opacity = 255;
                            posX = this.contentWide - moreGameNodeWidth / 2;
                            this.moreGameBtn.setPosition(posX, this.moreGameBtn.position.y);
                        }
                        // this.contentWide = isMoreGame ? this.contentWide - this.gonggaoNode.width * 0.9 : this.contentWide + moreGameNodeWidth;
                        this.contentNode.width = this.contentWide;
                        showAllItemFunc = cc.callFunc(function () {
                            // this.showAllItem()
                        });
                        this.itemArea.runAction(cc.sequence(cc.hide(), cc.fadeOut(0), cc.show(), cc.fadeIn(0.1), callbackFuc));
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
                    Global.HotUpdateManager.addHotUpdateGameComp(gameData.game_id, gameData.version, gameData.getUpdateUrl(), gameData.isBackVersionFlag, true);
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