
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/GameListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcR2FtZUxpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCwrQ0FBMEM7QUFDMUMsNkRBQXdEO0FBQ3hELDhFQUF5RTtBQUd6RSxnRUFBMkQ7QUFFM0Q7SUFBMEMsZ0NBQVE7SUFBbEQ7UUFBQSxxRUErVEM7UUF2VFcsaUJBQVcsR0FBVyxJQUFJLENBQUE7UUFFMUIsaUJBQVcsR0FBSSxDQUFDLENBQUMsQ0FBQTtRQUVqQixpQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUlqQixjQUFRLEdBQUcsS0FBSyxDQUFBOztJQStTNUIsQ0FBQztJQXpTRyxXQUFXO0lBQ0QsK0JBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztRQUN4SCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMkRBQTJELENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFD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Q0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN4QztTQUNKO0lBQ0wsQ0FBQztJQUVNLDhCQUFPLEdBQWQ7UUFDSSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBRUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUE7UUFDdkMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTTtRQUNoQyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6RCxJQUFJLEtBQUssR0FBWSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQzdDLElBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDcEI7Z0JBQ0ksS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUE7YUFDN0I7U0FDSjtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFDTSw0QkFBSyxHQUFaO1FBQ0ksS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQS9UQSxBQStUQyxDQS9UeUMsa0JBQVEsR0ErVGpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBHYW1lSXRlbVZpZXcgZnJvbSBcIi4vR2FtZUl0ZW1WaWV3XCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL2NvbnN0L0hhbGxTdG9yYWdlS2V5XCI7XHJcbmltcG9ydCBCdXR0b25QbHVzIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9CdXR0b25QbHVzXCI7XHJcbmltcG9ydCBCaW5kaW5nQnV0dG9uRWZmZWN0IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2NvbXBvbmVudC9CaW5kaW5nQnV0dG9uRWZmZWN0XCI7XHJcbmltcG9ydCBZWEJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9jb21wb25lbnQvWVhCdXR0b25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMaXN0VmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHByaXZhdGUgZ2FtZUxpc3RTY3JvbGw6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIGdhbWVJdGVtUm9vdDogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIGdhbWVJdGVtTGlzdDogR2FtZUl0ZW1WaWV3W107XHJcbiAgICAvL2dhbWVJdGVt5qih5p2/XHJcbiAgICBwcml2YXRlIGdhbWVUZW1wbGF0ZTogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOmNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZW50V2lkZSAgPSAtMVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGdhbWVJdGVtTWFwID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSB0b3BBcnJvdzpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGJvdEFycm93OmNjLk5vZGVcclxuICAgIHByaXZhdGUgYmluaXRpbmcgPSBmYWxzZVxyXG4gICAgcHJpdmF0ZSBnb25nZ2FvTm9kZTtcclxuICAgXHJcbiAgICAvL2l0ZW3lrr3pq5hcclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1XaWR0aDtcclxuICAgIHByaXZhdGUgZ2FtZUl0ZW1IZWlnaHQ7XHJcbiAgICAvL+WFrOWRiiBiYW5uZXJcclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY2VudGVyQ29udGVudFwiLCBjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLmdhbWVJdGVtUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJDb250ZW50L2NvbnRlbnRWaWV3L2NvbnRlbnQvaXRlbUFyZWEvY29udGVudFZpZXcvY29udGVudC9pdGVtUGFyZW50L2ljb25Sb290XCIpO1xyXG4gICAgICAgIHRoaXMuZ29uZ2dhb05vZGUgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyQ29udGVudC9jb250ZW50Vmlldy9jb250ZW50L2dvbmdnYW9BcmVhL2dvbmdnYW9Ob2RlXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyQ29udGVudC9jb250ZW50Vmlldy9jb250ZW50L2l0ZW1BcmVhL2NvbnRlbnRWaWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy50b3BBcnJvdyA9IHRoaXMuZ2V0Q2hpbGQoXCJzaGFuX2xlZnRcIilcclxuICAgICAgICB0aGlzLmJvdEFycm93ID0gdGhpcy5nZXRDaGlsZChcInNoYW5fcmlnaHRcIilcclxuICAgICAgICB0aGlzLmJvdEFycm93LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy50b3BBcnJvdy5hY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgICAgICB0aGlzLmdhbWVUZW1wbGF0ZSA9IHRoaXMuZ2V0Q2hpbGQoXCJnYW1lTGlzdEl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5nYW1lVGVtcGxhdGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1IZWlnaHQgPSB0aGlzLmdhbWVUZW1wbGF0ZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5nYW1lSXRlbVdpZHRoID0gdGhpcy5nYW1lVGVtcGxhdGUud2lkdGg7XHJcblxyXG4gICAgICAgIC8vdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9uKFwic2Nyb2xsLXRvLXRvcFwiLCB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbFRvVG9wLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUub24oXCJzY3JvbGxpbmdcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwsIHRoaXMpO1xyXG4gICAgICAgIC8vdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9uKFwic2Nyb2xsLXRvLWJvdHRvbVwiLCB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbFRvQm90LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUub24oXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGxFbmRlZCwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMub25SZXN1bWUsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLm9mZihcInNjcm9sbGluZ1wiLCB0aGlzLm9uU2Nyb2xsVmlld1Njcm9sbCwgdGhpcyk7XHJcbiAgICAgICAgLy90aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUub24oXCJzY3JvbGwtdG8tYm90dG9tXCIsIHRoaXMub25TY3JvbGxWaWV3U2Nyb2xsVG9Cb3QsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5vZmYoXCJzY3JvbGwtZW5kZWRcIiwgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGxFbmRlZCwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZXN1bWUoKXtcclxuICAgICAgICBpZihHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKXtcclxuICAgICAgICAgICAgLy94aWFvYyAyMDIxLTMtMTAg5a2Q5ri45oiP5YaF5LiN5aSE55CGLOWQpuWImeS8muaKpemUmVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIi0tLS0tLS0tLWdhbWVJdGVtTGlzdC0tLS0tLS0tLS1vblJlc3VtZS0tLS0tLS0tLVwiKVxyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgdGhpcy5vblNjcm9sbFZpZXdTY3JvbGwoKTtcclxuICAgICAgICB9LDAuMSk7XHJcbiAgICAgICAgLy8gaWYoY2MuaXNWYWxpZCh0aGlzLmNvbnRlbnROb2RlKSYmIHRoaXMuY29udGVudFdpZGUgPjApXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNvbnRlbnROb2RlLndpZHRoID0gdGhpcy5jb250ZW50V2lkZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLmdhbWVMaXN0U2Nyb2xsLnNldENvbnRlbnRQb3NpdGlvbihjYy5WZWMyLlpFUk8pXHJcbiAgICAgICAgLy8gdGhpcy5nYW1lTGlzdFNjcm9sbC5zY3JvbGxUb1RvcCgwKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblNjcm9sbFZpZXdTY3JvbGxFbmRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRvcCA9IGNjLnYyKHRoaXMuZ2FtZUxpc3RTY3JvbGwuZ2V0U2Nyb2xsT2Zmc2V0KCkueCwwKVxyXG4gICAgICAgIGxldCBib3QgPSBjYy52Mih0aGlzLmdhbWVMaXN0U2Nyb2xsLmdldFNjcm9sbE9mZnNldCgpLngsdGhpcy5nYW1lTGlzdFNjcm9sbC5nZXRNYXhTY3JvbGxPZmZzZXQoKS55KVxyXG4gICAgICAgIGxldCBvZmZTZXQgPSB0aGlzLmdhbWVMaXN0U2Nyb2xsLmdldFNjcm9sbE9mZnNldCgpXHJcblxyXG4gICAgICAgIGxldCB0b3BYT2Zmc2V0ID0gb2ZmU2V0LnggLSB0b3AueFxyXG4gICAgICAgIGxldCB0b3BZT2Zmc2V0ID0gb2ZmU2V0LnkgLSB0b3AueVxyXG4gICAgICAgIGxldCB0b3BEaXN0ZW5jZSA9ICBNYXRoLnNxcnQoTWF0aC5wb3codG9wWE9mZnNldCwgMikgKyBNYXRoLnBvdyh0b3BZT2Zmc2V0LCAyKSlcclxuXHJcbiAgICAgICAgbGV0IGJvdFhPZmZzZXQgPSBvZmZTZXQueCAtIGJvdC54XHJcbiAgICAgICAgbGV0IGJvdFlPZmZzZXQgPSBvZmZTZXQueSAtIGJvdC55XHJcbiAgICAgICAgbGV0IGJvdERpc3RlbmNlID0gIE1hdGguc3FydChNYXRoLnBvdyhib3RYT2Zmc2V0LCAyKSArIE1hdGgucG93KGJvdFlPZmZzZXQsIDIpKVxyXG5cclxuICAgICAgICBpZih0b3BEaXN0ZW5jZT49Ym90RGlzdGVuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBcnJvdygxKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVBcnJvdygwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBvblNjcm9sbFZpZXdTY3JvbGxUb1RvcCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oaWRlQXJyb3coMClcclxuICAgIH1cclxuXHJcbiAgICBvblNjcm9sbFZpZXdTY3JvbGxUb0JvdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oaWRlQXJyb3coMSlcclxuICAgIH1cclxuXHJcbiAgICBoaWRlQXJyb3coZmxhZylcclxuICAgIHtcclxuICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMudG9wQXJyb3cpKVxyXG4gICAgICAgICAgICB0aGlzLnRvcEFycm93LmFjdGl2ZSA9IGZsYWcgPT0gMVxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5ib3RBcnJvdykpXHJcbiAgICAgICAgICAgIHRoaXMuYm90QXJyb3cuYWN0aXZlID0gZmxhZyA9PSAwXHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHByaXZhdGUgb25TY3JvbGxWaWV3U2Nyb2xsKCkge1xyXG4gICAgICAgIC8vIOiOt+WPliBTY3JvbGxWaWV3IE5vZGUg55qE5bem5LiL6KeS5Z2Q5qCH5Zyo5LiW55WM5Z2Q5qCH57O75Lit55qE5Z2Q5qCHXHJcbiAgICAgICAgaWYoIXRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZSB8fCAhY2MuaXNWYWxpZCh0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmhpZGVBcnJvdygtMSlcclxuICAgICAgICBsZXQgc3ZMZWZ0Qm90dG9tUG9pbnQgPSB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihcclxuICAgICAgICAgICAgY2MudjIoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUueCAtIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5hbmNob3JYICogdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLnkgLSB0aGlzLmdhbWVMaXN0U2Nyb2xsLm5vZGUuYW5jaG9yWSAqIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS5oZWlnaHRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIClcclxuICAgICAgICAvLyDmsYLlh7ogU2Nyb2xsVmlldyDlj6/op4bljLrln5/lnKjkuJbnlYzlnZDmoIfns7vkuK3nmoTnn6nlvaLvvIjnorDmkp7nm5LvvIlcclxuICAgICAgICBsZXQgc3ZCQm94UmVjdDogY2MuUmVjdCA9IGNjLnJlY3QoXHJcbiAgICAgICAgICAgIHN2TGVmdEJvdHRvbVBvaW50LngsXHJcbiAgICAgICAgICAgIHN2TGVmdEJvdHRvbVBvaW50LnksXHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwubm9kZS53aWR0aCxcclxuICAgICAgICAgICAgdGhpcy5nYW1lTGlzdFNjcm9sbC5ub2RlLmhlaWdodFxyXG4gICAgICAgIClcclxuICAgICAgICBpZighdGhpcy5nYW1lSXRlbUxpc3QgfHwgdGhpcy5nYW1lSXRlbUxpc3QubGVuZ3RoID09IDApIHJldHVyblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSAgdGhpcy5nYW1lSXRlbUxpc3RbaV1cclxuICAgICAgICAgICAgbGV0IGJ0biA9aXRlbS5ub2RlLmdldENvbXBvbmVudChZWEJ1dHRvbilcclxuICAgICAgICAgICAgaWYoIWl0ZW0gfHwgIWNjLmlzVmFsaWQoaXRlbS5ub2RlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXRlbS5ub2RlLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLmludGVyc2VjdHMoc3ZCQm94UmVjdCkpIHsgLy/liKTmlq3mmK/lkKblnKjlj6/op4bljLrln5/lhoVcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0bi5zZXRBY3RpdmUodHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBidG4uc2V0QWN0aXZlKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE5vZGVzQXJyKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lSXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyLnB1c2godGhpcy5nYW1lSXRlbUxpc3RbaV0ubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRHYW1lSXRlbShnaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgcmVzb2x2ZSA9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgR2FtZUl0ZW1WaWV3KCk7XHJcbiAgICAgICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lUmVzSW5mbyhnaWQpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9ICBjYy5pbnN0YW50aWF0ZSh0aGlzLmdhbWVUZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0Tm9kZShub2RlKTtcclxuICAgICAgICAgICAgYXdhaXQgaXRlbS5zZXRSZXNJbmZvKGdhbWVJbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lSXRlbU1hcFtnaWRdID0gaXRlbTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzb2x2ZShpdGVtKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHJlZnJlc2hHYW1lTGlzdChlbnRlckdhbWVPZmZzZXRYOm51bWJlciwgY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlQWxsSXRlbSgpO1xyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1Sb290LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgaWYodGhpcy5nYW1lTGlzdFNjcm9sbC5pc1Njcm9sbGluZygpIHx8IHRoaXMuZ2FtZUxpc3RTY3JvbGwuaXNBdXRvU2Nyb2xsaW5nKCkpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVMaXN0U2Nyb2xsLnN0b3BBdXRvU2Nyb2xsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVudGVyR2FtZU9mZnNldFggPCAwKXtcclxuICAgICAgICAgICAgR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwuc2Nyb2xsVG9PZmZzZXQoY2MudjIoLWVudGVyR2FtZU9mZnNldFgsIDApKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUxpc3RTY3JvbGwuc2Nyb2xsVG9MZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBnYW1lTGlzdCA9IEdsb2JhbC5HYW1lRGF0YS5oYWxsR2FtZUxpc3Q7Ly/mmK/lkKbmmK/mm7TlpJrmuLjmiI9cclxuICAgICAgICBsZXQgc3BhY2VYID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5oYWxsR2FtZUxpc3RPZmZzZXRYOyAvL+mXtOmalFxyXG4gICAgICAgIGxldCBnb25nR2FvTm9kZVdpZGUgPSB0aGlzLmdvbmdnYW9Ob2RlLndpZHRoOyAgIC8vYmFubmVy55qE5a69XHJcbiAgICAgICAgbGV0IG1vcmVHYW1lTm9kZVdpZHRoID0gMDsgICAvL+abtOWkmua4uOaIj+aMiemSruWuvVxyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1MaXN0ID0gW107XHJcbiAgICAgICAgbGV0IHJpZ2h0Tm9kZUFyciA9IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IHN0YXJ0aW5nRGlzdGFuY2UgPSBnb25nR2FvTm9kZVdpZGU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgZ2FtZURhdGEgPSBnYW1lTGlzdFtpXTtcclxuICAgICAgICAgICAgLy/ov4fmu6Tpg6jliIbmuLjmiI9cclxuICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5pc0JhaWR1U3BlY2lhbFN0YXRlKCkgJiYgQXBwSGVscGVyLmlzRmlsdGVyR2FtZShnYW1lRGF0YS5nYW1lX2lkKSlcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGF3YWl0IHRoaXMuZ2V0SXRlbShnYW1lRGF0YS5nYW1lX2lkKSBhcyBHYW1lSXRlbVZpZXc7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5wYXJlbnQgPSB0aGlzLmdhbWVJdGVtUm9vdDtcclxuICAgICAgICAgICAgbGV0IGl0ZW1YID0gMFxyXG4gICAgICAgICAgICBsZXQgaXRlbVkgPSAwXHJcbiAgICAgICAgICAgIGlmIChjb3VudCAlIDIgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVggPSBzdGFydGluZ0Rpc3RhbmNlICsgdGhpcy5nYW1lSXRlbVdpZHRoLyAyICogKE1hdGguZmxvb3IoY291bnQgKzEpKSArIChNYXRoLmZsb29yKGNvdW50LyAyKSkqc3BhY2VYXHJcbiAgICAgICAgICAgICAgICBpdGVtWSA9IHRoaXMuZ2FtZUl0ZW1IZWlnaHQgLyAyLTIwMDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbVggPSBzdGFydGluZ0Rpc3RhbmNlICsgdGhpcy5nYW1lSXRlbVdpZHRoLyAyICogKE1hdGguZmxvb3IoY291bnQpKSArIChNYXRoLmZsb29yKGNvdW50LyAyKSkqc3BhY2VYXHJcbiAgICAgICAgICAgICAgICBpdGVtWSA9IC10aGlzLmdhbWVJdGVtSGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24oaXRlbVgsIGl0ZW1ZKVxyXG4gICAgICAgICAgICAvL+abtOaWsOWbvuagh+eKtuaAgVxyXG4gICAgICAgICAgICBpdGVtLnNldFNlcnZlckluZm8oZ2FtZURhdGEsIGNvdW50KTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByaWdodE5vZGVBcnIucHVzaChpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAvLyBpZihpPT0wKXtcclxuICAgICAgICAgICAgLy8gICAgIGxldCBmaXJzdE9wZW4gPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5GaXJzdE9wZW4pO1xyXG4gICAgICAgICAgICAvLyAgICAgaWYoZmlyc3RPcGVuID09IDEpe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIExvZ2dlci5sb2coXCJHYW1lTGlzdFZpZXcg56ys5LiA5qyh5bey57uP5LiL6L29IGZpcnN0T3BlbiA9IFwiLGZpcnN0T3Blbik7XHJcbiAgICAgICAgICAgIC8vICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgICAgICBMb2dnZXIubG9nKFwiR2FtZUxpc3RWaWV3IOWHhuWkh+S4i+i9vSBmaXJzdE9wZW4gPVwiICsgZmlyc3RPcGVuKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBpZihpdGVtICYmIGl0ZW0ubm9kZSAmJiBpdGVtLm5vZGUuaXNWYWxpZClcclxuICAgICAgICAgICAgLy8gICAgICAgICB7ICAgLy/nrKzkuIDmrKHmiZPlvIDoh6rliqjkuIvovb1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgaXRlbS5kb253bG9hZEdhbWUoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIC8vICB9XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50V2lkdGg6bnVtYmVyID0gTWF0aC5jZWlsKGNvdW50IC8gMikgKiB0aGlzLmdhbWVJdGVtV2lkdGggICsgTWF0aC5jZWlsKGNvdW50IC8gMikgKiBzcGFjZVggKyBnb25nR2FvTm9kZVdpZGUgKyBtb3JlR2FtZU5vZGVXaWR0aCArIHNwYWNlWDtcclxuICAgICAgICB0aGlzLmdhbWVJdGVtUm9vdC5wYXJlbnQud2lkdGggPSBjb250ZW50V2lkdGg7XHJcbiAgICAgICAgdGhpcy5nYW1lSXRlbVJvb3Qub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgbGV0IGNhbGxiYWNrRnVjID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5nYW1lSXRlbVJvb3QucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmhpZGUoKSwgY2MuZmFkZU91dCgwKSwgY2Muc2hvdygpLGNjLmZhZGVJbigxKSxjYWxsYmFja0Z1YykpO1xyXG4gICAgICAgIHRoaXMuZG93bmxvYWRHYW1lKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRvd25sb2FkR2FtZSgpIHtcclxuICAgICAgICBpZihDQ19QUkVWSUVXKSByZXR1cm5cclxuICAgICAgICBsZXQgZmlyc3RPcGVuID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuRmlyc3RPcGVuKTtcclxuICAgICAgICBpZiAoZmlyc3RPcGVuICYmIGZpcnN0T3BlbiA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZ2lkTGlzdCA9IEdsb2JhbC5HYW1lRGF0YS5hdXRvRG93bkxpc3RcclxuICAgICAgICBpZiAoZ2lkTGlzdCAmJiBnaWRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuRmlyc3RPcGVuLCAxKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnaWRMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2FtZURhdGEgPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2lkTGlzdFtpXSlcclxuICAgICAgICAgICAgICAgIGlmIChnYW1lRGF0YSAmJiBnYW1lRGF0YS5zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmFkZEhvdFVwZGF0ZUdhbWVDb21wKGdhbWVEYXRhLmdhbWVfaWQsIGdhbWVEYXRhLnZlcnNpb24sIGdhbWVEYXRhLmdldFVwZGF0ZVVybCgpLCBnYW1lRGF0YS5pc0JhY2tWZXJzaW9uRmxhZywgXCIwLjAuMFwiLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0SXRlbShnaWQpe1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+e1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2FtZUl0ZW1NYXBbZ2lkXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwi5rKh5om+5Yiw6LWE5rqQ5Zu+5qCHXCIsIGdpZCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gYXdhaXQgdGhpcy5hZGRHYW1lSXRlbShnaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc29sdmUoaXRlbSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0FsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUl0ZW1NYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5nYW1lSXRlbU1hcCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZ2FtZUl0ZW1NYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXBba2V5XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGlkZUFsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUl0ZW1NYXAgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5nYW1lSXRlbU1hcCkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuZ2FtZUl0ZW1NYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXBba2V5XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5nYW1lSXRlbU1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWVJdGVtTWFwW2tleV0uZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95QWxsKClcclxuICAgIHtcclxuICAgICAgICBsZXQgcm9vdE5vZGUgPSB0aGlzLmdhbWVJdGVtUm9vdC5wYXJlbnRcclxuICAgICAgICBpZighY2MuaXNWYWxpZChyb290Tm9kZSkpIHJldHVyblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByb290Tm9kZS5jaGlsZHJlbkNvdW50OyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA6Y2MuTm9kZSA9IHJvb3ROb2RlLmNoaWxkcmVuW2luZGV4XSAgICAgXHJcbiAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQoY2hpbGQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95QWxsQ2hpbGRyZW4oKVxyXG4gICAgICAgICAgICB9ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlc3Ryb3koKVxyXG4gICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXAgPSB7fVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmdhbWVJdGVtTWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZUl0ZW1NYXBba2V5XS5yZWxlYXNlR2FtZUljb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG59Il19