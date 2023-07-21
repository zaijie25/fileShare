
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/GameListViewA.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcR2FtZUxpc3RWaWV3QS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFDcEQsK0NBQTBDO0FBRTFDLDhFQUF5RTtBQUV6RSxzRkFBaUY7QUFDakYsZ0VBQTJEO0FBRTNEO0lBQTBDLGdDQUFRO0lBQWxEO1FBQUEscUVBbVhDO1FBM1dXLGlCQUFXLEdBQVksSUFBSSxDQUFBO1FBRTNCLGlCQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFaEIsaUJBQVcsR0FBRyxFQUFFLENBQUM7UUFJakIsY0FBUSxHQUFHLEtBQUssQ0FBQTtRQVdoQixlQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLGVBQVMsR0FBVyxHQUFHLENBQUM7UUFDeEIsbUJBQWEsR0FBVyxDQUFDLENBQUM7O0lBc1Z0QyxDQUFDO0lBcFZHLFdBQVc7SUFDRCwrQkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4Q0FB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QVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDN0MsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixLQUFLLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTthQUM3QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDekIsQ0FBQztJQUNNLDRCQUFLLEdBQVo7UUFDSSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFTCxtQkFBQztBQUFELENBblhBLEFBbVhDLENBblh5QyxrQkFBUSxHQW1YakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEdhbWVJdGVtVmlldyBmcm9tIFwiLi9HYW1lSXRlbVZpZXdcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uLy4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IEJ1dHRvblBsdXMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L0J1dHRvblBsdXNcIjtcclxuaW1wb3J0IEJpbmRpbmdCdXR0b25FZmZlY3QgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L0JpbmRpbmdCdXR0b25FZmZlY3RcIjtcclxuaW1wb3J0IFlYQnV0dG9uIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9ZWEJ1dHRvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxpc3RWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBnYW1lTGlzdFNjcm9sbDogY2MuU2Nyb2xsVmlldztcclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1Sb290OiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1MaXN0OiBHYW1lSXRlbVZpZXdbXTtcclxuICAgIC8vZ2FtZUl0ZW3mqKHmnb9cclxuICAgIHByaXZhdGUgZ2FtZVRlbXBsYXRlOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgY29udGVudE5vZGU6IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZW50V2lkZSA9IC0xXHJcblxyXG4gICAgcHJpdmF0ZSBnYW1lSXRlbU1hcCA9IHt9O1xyXG5cclxuICAgIHByaXZhdGUgdG9wQXJyb3c6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgYm90QXJyb3c6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgYmluaXRpbmcgPSBmYWxzZVxyXG5cclxuICAgIHByaXZhdGUgaXRlbUFyZWE6IGNjLk5vZGU7XHJcbiAgICAvL+abtOWkmua4uOaIj+aMiemSrlxyXG4gICAgcHJpdmF0ZSBtb3JlR2FtZUJ0bjogY2MuTm9kZTtcclxuICAgIC8v5YWs5ZGKIGJhbm5lclxyXG4gICAgcHJpdmF0ZSBnb25nZ2FvTm9kZTtcclxuICAgIC8vaXRlbeWuvemrmFxyXG4gICAgcHJpdmF0ZSBnYW1lSXRlbVdpZHRoO1xyXG4gICAgcHJpdmF0ZSBnYW1lSXRlbUhlaWdodDtcclxuXHJcbiAgICBwcml2YXRlIGl0ZW1BcmVhWDogbnVtYmVyID0gNDMwO1xyXG4gICAgcHJpdmF0ZSBpdGVtQXJlYVk6IG51bWJlciA9IDE5NTtcclxuICAgIHByaXZhdGUgbW9yZUdhbWVBcmVhWDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgaXNNb3JlR2FtZTogYm9vbGVhbjtcclxuICAgIC8v5YWs5ZGKIGJhbm5lclxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwgPSB0aGlzLmdldENvbXBvbmVudChcImNlbnRlckNvbnRlbnRcIiwgY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5nYW1lSXRlbVJvb3QgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyQ29udGVudC9jb250ZW50Vmlldy9jb250ZW50L2l0ZW1QYXJlbnQvaWNvblJvb3RcIik7XHJcbiAgICAgICAgdGhpcy5nb25nZ2FvTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnQvZ29uZ2dhb0FyZWFcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5tb3JlR2FtZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnQvbW9yZUdhbWVCdG5cIik7XHJcbiAgICAgICAgdGhpcy5pdGVtQXJlYSA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnQvaXRlbVBhcmVudFwiKVxyXG4gICAgICAgIHRoaXMudG9wQXJyb3cgPSB0aGlzLmdldENoaWxkKFwic2hhbl9sZWZ0XCIpXHJcbiAgICAgICAgdGhpcy5ib3RBcnJvdyA9IHRoaXMuZ2V0Q2hpbGQoXCJzaGFuX3JpZ2h0XCIpXHJcbiAgICAgICAgdGhpcy5ib3RBcnJvdy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMudG9wQXJyb3cuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lVGVtcGxhdGUgPSB0aGlzLmdldENoaWxkKFwiZ2FtZUxpc3RJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZVRlbXBsYXRlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWVJdGVtSGVpZ2h0ID0gdGhpcy5nYW1lVGVtcGxhdGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1XaWR0aCA9IHRoaXMuZ2FtZVRlbXBsYXRlLndpZHRoO1xyXG5cclxuICAgICAgICAvL3RoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5vbihcInNjcm9sbC10by10b3BcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGxUb1RvcCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9uKFwic2Nyb2xsaW5nXCIsIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsLCB0aGlzKTtcclxuICAgICAgICAvL3RoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5vbihcInNjcm9sbC10by1ib3R0b21cIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGxUb0JvdCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9uKFwic2Nyb2xsLWVuZGVkXCIsIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsRW5kZWQsIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbCwgdGhpcyk7XHJcbiAgICAgICAgLy90aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsVG9Cb3QsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5vZmYoXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGxFbmRlZCwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZXN1bWUoKSB7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5TY2VuZU1hbmFnZXIuaW5HYW1lKCkpIHtcclxuICAgICAgICAgICAgLy94aWFvYyAyMDIxLTMtMTAg5a2Q5ri45oiP5YaF5LiN5aSE55CGLOWQpuWImeS8muaKpemUmVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbUFyZWEuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lTGlzdFNjcm9sbC5pc1Njcm9sbGluZygpIHx8IHRoaXMuZ2FtZUxpc3RTY3JvbGwuaXNBdXRvU2Nyb2xsaW5nKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCItLS0tLS0tLS1nYW1lSXRlbUxpc3QtLS0tLS0tLS0tb25SZXN1bWUtLS0tLS0tLS1cIilcclxuICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsKCk7XHJcbiAgICAgICAgfSwgMC4xKTtcclxuICAgICAgICAvLyBpZihjYy5pc1ZhbGlkKHRoaXMuY29udGVudE5vZGUpJiYgdGhpcy5jb250ZW50V2lkZSA+MClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIFxyXG4gICAgICAgIC8vICAgICBjYy5sb2coXCIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTFcIiArIHRoaXMuZ2FtZUl0ZW1Sb290LnBhcmVudC5wYXJlbnQucGFyZW50Lm5hbWUpXHJcbiAgICAgICAgLy8gICAgLy8gdGhpcy5nYW1lSXRlbVJvb3QucGFyZW50LnBhcmVudC5wYXJlbnQud2lkdGggPSB0aGlzLmNvbnRlbnRXaWRlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gdGhpcy5jb250ZW50V2lkZTtcclxuXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc01vcmVHYW1lKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUFyZWEuc2V0UG9zaXRpb24odGhpcy5tb3JlR2FtZUFyZWFYLCB0aGlzLml0ZW1BcmVhWSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwuc2Nyb2xsVG9MZWZ0KClcclxuICAgICAgICAgICAgfSwgMC4wNSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0aGlzLmdhbWVMaXN0U2Nyb2xsLmNvbnRlbnQud2lkdGggPSB0aGlzLmNvbnRlbnRXaWRlO1xyXG5cclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJ0aGlzLmdhbWVMaXN0U2Nyb2xsID0gXCIgKyB0aGlzLmdhbWVMaXN0U2Nyb2xsLmNvbnRlbnQud2lkdGgpO1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcInRoaXMuZ2FtZUl0ZW1Sb290LnBhcmVudC5wYXJlbnQucGFyZW50LndpZHRoID0gXCIgKyB0aGlzLmdhbWVJdGVtUm9vdC5wYXJlbnQucGFyZW50LnBhcmVudC53aWR0aCk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwidGhpcy5jb250ZW50V2lkZSA9IFwiICsgdGhpcy5jb250ZW50V2lkZSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLnNldENvbnRlbnRQb3NpdGlvbihjYy5WZWMyLlpFUk8pXHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5zY3JvbGxUb0xlZnQoMClcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25TY3JvbGxWaWV3U2Nyb2xsRW5kZWQoKSB7XHJcbiAgICAgICAgLy8gY2MuZXJyb3IodGhpcy5nYW1lTGlzdFNjcm9sbC5nZXRNYXhTY3JvbGxPZmZzZXQoKS54LHRoaXMuZ2FtZUxpc3RTY3JvbGwuZ2V0TWF4U2Nyb2xsT2Zmc2V0KCkueSlcclxuICAgICAgICBsZXQgbGVmdCA9IGNjLnYyKDAsIHRoaXMuZ2FtZUxpc3RTY3JvbGwuZ2V0U2Nyb2xsT2Zmc2V0KCkueSlcclxuICAgICAgICBsZXQgcmlnaHQgPSBjYy52Mih0aGlzLmdhbWVMaXN0U2Nyb2xsLmdldE1heFNjcm9sbE9mZnNldCgpLngsIHRoaXMuZ2FtZUxpc3RTY3JvbGwuZ2V0TWF4U2Nyb2xsT2Zmc2V0KCkueSlcclxuICAgICAgICBsZXQgb2ZmU2V0ID0gdGhpcy5nYW1lTGlzdFNjcm9sbC5nZXRTY3JvbGxPZmZzZXQoKVxyXG5cclxuICAgICAgICBsZXQgdG9wWE9mZnNldCA9IG9mZlNldC54IC0gbGVmdC54XHJcbiAgICAgICAgbGV0IHRvcFlPZmZzZXQgPSBvZmZTZXQueSAtIGxlZnQueVxyXG4gICAgICAgIGxldCB0b3BEaXN0ZW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyh0b3BYT2Zmc2V0LCAyKSArIE1hdGgucG93KHRvcFlPZmZzZXQsIDIpKSAvL+W3pui+uei3nei3neemu1xyXG5cclxuICAgICAgICBsZXQgYm90WE9mZnNldCA9IE1hdGguYWJzKG9mZlNldC54KSAtIE1hdGguYWJzKHJpZ2h0LngpXHJcbiAgICAgICAgbGV0IGJvdFlPZmZzZXQgPSBvZmZTZXQueSAtIHJpZ2h0LnlcclxuICAgICAgICBsZXQgYm90RGlzdGVuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coYm90WE9mZnNldCwgMikgKyBNYXRoLnBvdyhib3RZT2Zmc2V0LCAyKSkgLy8g5Y+z6L656Led6Led56a7XHJcblxyXG4gICAgICAgIGlmICh0b3BEaXN0ZW5jZSA+PSBib3REaXN0ZW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBcnJvdygxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlQXJyb3coMClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgb25TY3JvbGxWaWV3U2Nyb2xsVG9Ub3AoKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQXJyb3coMClcclxuICAgIH1cclxuXHJcbiAgICBvblNjcm9sbFZpZXdTY3JvbGxUb0JvdCgpIHtcclxuICAgICAgICB0aGlzLmhpZGVBcnJvdygxKVxyXG4gICAgfVxyXG5cclxuICAgIGhpZGVBcnJvdyhmbGFnKSB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy50b3BBcnJvdykpXHJcbiAgICAgICAgICAgIHRoaXMudG9wQXJyb3cuYWN0aXZlID0gZmxhZyA9PSAxXHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5ib3RBcnJvdykpXHJcbiAgICAgICAgICAgIHRoaXMuYm90QXJyb3cuYWN0aXZlID0gZmxhZyA9PSAwXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25TY3JvbGxWaWV3U2Nyb2xsKCkge1xyXG4gICAgICAgIC8vIOiOt+WPliBTY3JvbGxWaWV3IE5vZGUg55qE5bem5LiL6KeS5Z2Q5qCH5Zyo5LiW55WM5Z2Q5qCH57O75Lit55qE5Z2Q5qCHXHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUgfHwgIWNjLmlzVmFsaWQodGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5oaWRlQXJyb3coLTEpXHJcbiAgICAgICAgbGV0IHN2TGVmdEJvdHRvbVBvaW50ID0gdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoXHJcbiAgICAgICAgICAgIGNjLnYyKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLnggLSB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUuYW5jaG9yWCAqIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS55IC0gdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLmFuY2hvclkgKiB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUuaGVpZ2h0XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApXHJcbiAgICAgICAgLy8g5rGC5Ye6IFNjcm9sbFZpZXcg5Y+v6KeG5Yy65Z+f5Zyo5LiW55WM5Z2Q5qCH57O75Lit55qE55+p5b2i77yI56Kw5pKe55uS77yJXHJcbiAgICAgICAgbGV0IHN2QkJveFJlY3Q6IGNjLlJlY3QgPSBjYy5yZWN0KFxyXG4gICAgICAgICAgICBzdkxlZnRCb3R0b21Qb2ludC54LFxyXG4gICAgICAgICAgICBzdkxlZnRCb3R0b21Qb2ludC55LFxyXG4gICAgICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUud2lkdGgsXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5oZWlnaHRcclxuICAgICAgICApXHJcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVJdGVtTGlzdCB8fCB0aGlzLmdhbWVJdGVtTGlzdC5sZW5ndGggPT0gMCkgcmV0dXJuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVJdGVtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2FtZUl0ZW1MaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBidG4gPSBpdGVtLm5vZGUuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKVxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0gfHwgIWNjLmlzVmFsaWQoaXRlbS5ub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmludGVyc2VjdHMoc3ZCQm94UmVjdCkpIHsgLy/liKTmlq3mmK/lkKblnKjlj6/op4bljLrln5/lhoVcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0bi5zZXRBY3RpdmUodHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBidG4uc2V0QWN0aXZlKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE5vZGVzQXJyKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyLnB1c2godGhpcy5nYW1lSXRlbUxpc3RbaV0ubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRHYW1lSXRlbShnaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IEdhbWVJdGVtVmlldygpO1xyXG4gICAgICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZVJlc0luZm8oZ2lkKTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmdhbWVUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0Tm9kZShub2RlKTtcclxuICAgICAgICAgICAgYXdhaXQgaXRlbS5zZXRSZXNJbmZvKGdhbWVJbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSXRlbU1hcFtnaWRdID0gaXRlbTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShpdGVtKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2hHYW1lTGlzdChlbnRlckdhbWVPZmZzZXRYOiBudW1iZXIsIGlzTW9yZUdhbWU6IGJvb2xlYW4gPSBmYWxzZSwgY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQWxsSXRlbSgpO1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmJpbml0aW5nKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gdGhpcy5iaW5pdGluZyA9IHRydWVcclxuICAgICAgICAvLyB0aGlzLmRlc3Ryb3lBbGwoKVxyXG4gICAgICAgIHRoaXMuaXRlbUFyZWEuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICBpZiAodGhpcy5nYW1lTGlzdFNjcm9sbC5pc1Njcm9sbGluZygpIHx8IHRoaXMuZ2FtZUxpc3RTY3JvbGwuaXNBdXRvU2Nyb2xsaW5nKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5zdG9wQXV0b1Njcm9sbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTW9yZUdhbWUgPSBpc01vcmVHYW1lO1xyXG4gICAgICAgIGlmIChpc01vcmVHYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUFyZWEuc2V0UG9zaXRpb24odGhpcy5tb3JlR2FtZUFyZWFYLCB0aGlzLml0ZW1BcmVhWSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1BcmVhLnNldFBvc2l0aW9uKHRoaXMuaXRlbUFyZWFYLCB0aGlzLml0ZW1BcmVhWSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVudGVyR2FtZU9mZnNldFggPCAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwuc2Nyb2xsVG9PZmZzZXQoY2MudjIoLWVudGVyR2FtZU9mZnNldFgsIDApKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5zY3JvbGxUb0xlZnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaXRlbUFyZWEub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgbGV0IGdvbmdHYW9Ob2RlV2lkZSA9IHRoaXMuZ29uZ2dhb05vZGUud2lkdGg7XHJcbiAgICAgICAgbGV0IG9mZmVzZXQgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmdldFNwYWNlT2Zmc2V0KClcclxuXHJcbiAgICAgICAgbGV0IGdhbWVMaXN0ID0gaXNNb3JlR2FtZSA/IEdsb2JhbC5HYW1lRGF0YS5tb3JlR2FtZUxpc3QgOiBHbG9iYWwuR2FtZURhdGEuaGFsbEdhbWVMaXN0Oy8v5piv5ZCm5piv5pu05aSa5ri45oiPXHJcbiAgICAgICAgbGV0IHNwYWNlWCA9IG9mZmVzZXRbMF07IC8veOi9tOmXtOmalFxyXG4gICAgICAgIGxldCBzcGFjZVkgPSBvZmZlc2V0WzFdOyAvL3novbTpl7TpmpRcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lSXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAvLyBsZXQgcmlnaHROb2RlQXJyID0gW107XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBsZXQgc3RhcnRHYXBYID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5nZXRIYWxsR2FtZUxpc3RHYXAoMCkgLy/liJ3lp4t46L206Ze06ZqUXHJcbiAgICAgICAgbGV0IHN0YXJ0R2FwWSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuZ2V0SGFsbEdhbWVMaXN0R2FwKDEpIC8v5Yid5aeLeei9tOmXtOmalFxyXG4gICAgICAgIGxldCBsaW5lID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5nZXRIYWxsR2FtZUxpc3RMaW5lKCkgLy/liJ3lp4t46L206Ze06ZqUXHJcbiAgICAgICAgbGV0IHN0YXJ0aW5nRGlzdGFuY2UgPSBpc01vcmVHYW1lID8gMyAqIHNwYWNlWCA6IGdvbmdHYW9Ob2RlV2lkZTtcclxuICAgICAgICBsZXQgbW9yZUdhbWVOb2RlV2lkdGggPSBHbG9iYWwuR2FtZURhdGEuaGFzTW9yZUdhbWVMaXN0ID8gdGhpcy5tb3JlR2FtZUJ0bi53aWR0aCA6IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZ2FtZURhdGEgPSBnYW1lTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBhd2FpdCB0aGlzLmdldEl0ZW0oZ2FtZURhdGEuZ2FtZV9pZCkgYXMgR2FtZUl0ZW1WaWV3O1xyXG4gICAgICAgICAgICAvL+abtOaWsOWbvuagh+eKtuaAgVxyXG4gICAgICAgICAgICBpdGVtLnNldFNlcnZlckluZm8oZ2FtZURhdGEsIGNvdW50KTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnBhcmVudCA9IHRoaXMuaXRlbUFyZWE7XHJcbiAgICAgICAgICAgIGxldCBpdGVtWCA9IDBcclxuICAgICAgICAgICAgbGV0IGl0ZW1ZID0gMFxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBjb3VudCAlIGxpbmVcclxuICAgICAgICAgICAgbGV0IGdhcENvdW50ID0gTWF0aC5mbG9vcihjb3VudCAvIGxpbmUpXHJcbiAgICAgICAgICAgIGl0ZW1YID0gdGhpcy5nYW1lSXRlbVdpZHRoIC8gMiArIGdhcENvdW50ICogdGhpcy5nYW1lSXRlbVdpZHRoICsgZ2FwQ291bnQgKiBzcGFjZVggKyBzdGFydEdhcFhcclxuICAgICAgICAgICAgaXRlbVkgPSAtdGhpcy5nYW1lSXRlbUhlaWdodCAvIDIgLSBpbmRleCAqIHRoaXMuZ2FtZUl0ZW1IZWlnaHQgLSBpbmRleCAqIHNwYWNlWSAtIHN0YXJ0R2FwWVxyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24oaXRlbVgsIGl0ZW1ZKVxyXG4gICAgICAgICAgICBpdGVtLm5vZGUubmFtZSA9IGdhbWVEYXRhLnByZWZhYk5hbWVcclxuICAgICAgICAgICAgLy8gcmlnaHROb2RlQXJyLnB1c2goaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKGl0ZW0ubm9kZSwgXCJcIiwgaXRlbS5vbkl0ZW1DbGljaywgaXRlbSlcclxuICAgICAgICAgICAgbGV0IGJpbmRPYmogPSBpdGVtLm5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oQmluZGluZ0J1dHRvbkVmZmVjdClcclxuICAgICAgICAgICAgaXRlbS5ub2RlLmdldENvbXBvbmVudChZWEJ1dHRvbikuc2V0QmluZChiaW5kT2JqKVxyXG4gICAgICAgICAgICAvLyBsZXQgcm9vdE5vZGUgPSB0aGlzLmdhbWVJdGVtUm9vdC5wYXJlbnRcclxuICAgICAgICAgICAgLy8gaXRlbS5tb3ZlU3BpbmUocm9vdE5vZGUpXHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudFdpZHRoOiBudW1iZXIgPSBNYXRoLmNlaWwoY291bnQgLyAyKSAqIHRoaXMuZ2FtZUl0ZW1XaWR0aCArIE1hdGguY2VpbChjb3VudCAvIDIpICogc3BhY2VYICsgZ29uZ0dhb05vZGVXaWRlICsgbW9yZUdhbWVOb2RlV2lkdGggKyBzcGFjZVg7XHJcbiAgICAgICAgaWYgKGlzTW9yZUdhbWUpIHtcclxuICAgICAgICAgICAgY29udGVudFdpZHRoID0gTWF0aC5jZWlsKGNvdW50IC8gMikgKiB0aGlzLmdhbWVJdGVtV2lkdGggKyBNYXRoLmNlaWwoY291bnQgLyAyKSAqIHNwYWNlWCArIHN0YXJ0aW5nRGlzdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBjb250ZW50V2lkdGg6bnVtYmVyID0gTWF0aC5jZWlsKCBNYXRoLmNlaWwoY291bnQgLyBsaW5lKSkgKiB0aGlzLmdhbWVJdGVtV2lkdGggICsgTWF0aC5jZWlsKCBNYXRoLmNlaWwoY291bnQgLyBsaW5lKS0xKSAqIHNwYWNlWCAgKzEvMiAqIHRoaXMuZ2FtZUl0ZW1XaWR0aCArIG1vcmVHYW1lTm9kZVdpZHRoICsgc3RhcnRHYXBYXHJcblxyXG4gICAgICAgIHRoaXMuY29udGVudFdpZGUgPSBjb250ZW50V2lkdGg7XHJcbiAgICAgICAgbGV0IGNhbGxiYWNrRnVjID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYmluaXRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlQXJyb3coMClcclxuICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKEdsb2JhbC5HYW1lRGF0YS5oYXNNb3JlR2FtZUxpc3QgJiYgIWlzTW9yZUdhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3JlR2FtZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVHYW1lQnRuLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgICAgIGxldCBwb3NYID0gdGhpcy5jb250ZW50V2lkZSAtIG1vcmVHYW1lTm9kZVdpZHRoIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5tb3JlR2FtZUJ0bi5zZXRQb3NpdGlvbihwb3NYLCB0aGlzLm1vcmVHYW1lQnRuLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnRXaWRlID0gaXNNb3JlR2FtZSA/IHRoaXMuY29udGVudFdpZGUgLSB0aGlzLmdvbmdnYW9Ob2RlLndpZHRoICogMC45IDogdGhpcy5jb250ZW50V2lkZSArIG1vcmVHYW1lTm9kZVdpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gdGhpcy5jb250ZW50V2lkZTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dBbGxJdGVtRnVuYyA9IGNjLmNhbGxGdW5jKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zaG93QWxsSXRlbSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLml0ZW1BcmVhLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5oaWRlKCksIGNjLmZhZGVPdXQoMCksIGNjLnNob3coKSwgY2MuZmFkZUluKDAuMSksIGNhbGxiYWNrRnVjKSk7XHJcbiAgICAgICAgdGhpcy5kb3dubG9hZEdhbWUoKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZG93bmxvYWRHYW1lKCkge1xyXG4gICAgICAgIGlmIChDQ19QUkVWSUVXKSByZXR1cm5cclxuICAgICAgICBsZXQgZmlyc3RPcGVuID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuRmlyc3RPcGVuKTtcclxuICAgICAgICBpZiAoZmlyc3RPcGVuICYmIGZpcnN0T3BlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2lkTGlzdCA9IEdsb2JhbC5HYW1lRGF0YS5hdXRvRG93bkxpc3RcclxuICAgICAgICBpZiAoZ2lkTGlzdCAmJiBnaWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRmlyc3RPcGVuLCAxKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZURhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2lkTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRGF0YSAmJiBnYW1lRGF0YS5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmFkZEhvdFVwZGF0ZUdhbWVDb21wKGdhbWVEYXRhLmdhbWVfaWQsIGdhbWVEYXRhLnZlcnNpb24sIGdhbWVEYXRhLmdldFVwZGF0ZVVybCgpLCBnYW1lRGF0YS5pc0JhY2tWZXJzaW9uRmxhZywgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEl0ZW0oZ2lkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2FtZUl0ZW1NYXBbZ2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwi5rKh5om+5Yiw6LWE5rqQ5Zu+5qCHXCIsIGdpZCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gYXdhaXQgdGhpcy5hZGRHYW1lSXRlbShnaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0FsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUl0ZW1NYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5nYW1lSXRlbU1hcCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZ2FtZUl0ZW1NYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXBba2V5XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZUFsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUl0ZW1NYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5nYW1lSXRlbU1hcCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZ2FtZUl0ZW1NYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXBba2V5XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5nYW1lSXRlbU1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTWFwW2tleV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95QWxsKCkge1xyXG4gICAgICAgIGxldCByb290Tm9kZSA9IHRoaXMuZ2FtZUl0ZW1Sb290LnBhcmVudFxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZChyb290Tm9kZSkpIHJldHVyblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByb290Tm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZDogY2MuTm9kZSA9IHJvb3ROb2RlLmNoaWxkcmVuW2luZGV4XVxyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3lBbGxDaGlsZHJlbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KClcclxuICAgICAgICB0aGlzLmdhbWVJdGVtTWFwID0ge31cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5nYW1lSXRlbU1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTWFwW2tleV0ucmVsZWFzZUdhbWVJY29uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==