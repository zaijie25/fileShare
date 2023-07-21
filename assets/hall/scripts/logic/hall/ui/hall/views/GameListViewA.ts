import ViewBase from "../../../../core/ui/ViewBase";
import GameItemView from "./GameItemView";
import AppHelper from "../../../../core/tool/AppHelper";
import HallStorageKey from "../../../../hallcommon/const/HallStorageKey";
import ButtonPlus from "../../../../core/component/ButtonPlus";
import BindingButtonEffect from "../../../../core/component/BindingButtonEffect";
import YXButton from "../../../../core/component/YXButton";

export default class GameListView extends ViewBase {
    private gameListScroll: cc.ScrollView;
    private gameItemRoot: cc.Node;

    private gameItemList: GameItemView[];
    //gameItem模板
    private gameTemplate: cc.Node;

    private contentNode: cc.Node = null

    private contentWide = -1

    private gameItemMap = {};

    private topArrow: cc.Node
    private botArrow: cc.Node
    private biniting = false

    private itemArea: cc.Node;
    //更多游戏按钮
    private moreGameBtn: cc.Node;
    //公告 banner
    private gonggaoNode;
    //item宽高
    private gameItemWidth;
    private gameItemHeight;

    private itemAreaX: number = 430;
    private itemAreaY: number = 195;
    private moreGameAreaX: number = 0;
    private isMoreGame: boolean;
    //公告 banner
    protected initView() {
        this.gameListScroll = this.getComponent("centerContent", cc.ScrollView);
        this.gameItemRoot = this.getChild("centerContent/contentView/content/itemParent/iconRoot");
        this.gonggaoNode = this.getChild("centerContent/contentView/content/gonggaoArea");
        this.contentNode = this.getChild("centerContent/contentView/content");
        this.moreGameBtn = this.getChild("centerContent/contentView/content/moreGameBtn");
        this.itemArea = this.getChild("centerContent/contentView/content/itemParent")
        this.topArrow = this.getChild("shan_left")
        this.botArrow = this.getChild("shan_right")
        this.botArrow.active = false
        this.topArrow.active = false

        this.gameTemplate = this.getChild("gameListItem");
        this.gameTemplate.active = false;

        this.gameItemHeight = this.gameTemplate.height;
        this.gameItemWidth = this.gameTemplate.width;

        //this.gameListScroll.node.on("scroll-to-top", this.onScrollViewScrollToTop, this);
        this.gameListScroll.node.on("scrolling", this.onScrollViewScroll, this);
        //this.gameListScroll.node.on("scroll-to-bottom", this.onScrollViewScrollToBot, this);
        this.gameListScroll.node.on("scroll-ended", this.onScrollViewScrollEnded, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    }

    onDispose() {
        this.gameListScroll.node.off("scrolling", this.onScrollViewScroll, this);
        //this.gameListScroll.node.on("scroll-to-bottom", this.onScrollViewScrollToBot, this);
        this.gameListScroll.node.off("scroll-ended", this.onScrollViewScrollEnded, this);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    }

    public onResume() {
        if (Global.SceneManager.inGame()) {
            //xiaoc 2021-3-10 子游戏内不处理,否则会报错
            return;
        }
        this.itemArea.stopAllActions();
        if (this.gameListScroll.isScrolling() || this.gameListScroll.isAutoScrolling()) {
            this.gameListScroll.stopAutoScroll();
        }
        Logger.error("---------gameItemList----------onResume---------")
        Global.Component.scheduleOnce(() => {
            this.onScrollViewScroll();
        }, 0.1);
        // if(cc.isValid(this.contentNode)&& this.contentWide >0)
        // {
        //     
        //     cc.log("111111111111111111111111111111111111111111111111111111111111111111111" + this.gameItemRoot.parent.parent.parent.name)
        //    // this.gameItemRoot.parent.parent.parent.width = this.contentWide;
        //     this.contentNode.width = this.contentWide;

        // }

        if (this.isMoreGame) {
            Global.Component.scheduleOnce(() => {
                this.itemArea.setPosition(this.moreGameAreaX, this.itemAreaY)
                this.gameListScroll.scrollToLeft()
            }, 0.05);
        }

        // this.gameListScroll.content.width = this.contentWide;

        // Logger.error("this.gameListScroll = " + this.gameListScroll.content.width);
        // Logger.error("this.gameItemRoot.parent.parent.parent.width = " + this.gameItemRoot.parent.parent.parent.width);
        // Logger.error("this.contentWide = " + this.contentWide);


        this.gameListScroll.setContentPosition(cc.Vec2.ZERO)
        this.gameListScroll.scrollToLeft(0)
    }


    onScrollViewScrollEnded() {
        // cc.error(this.gameListScroll.getMaxScrollOffset().x,this.gameListScroll.getMaxScrollOffset().y)
        let left = cc.v2(0, this.gameListScroll.getScrollOffset().y)
        let right = cc.v2(this.gameListScroll.getMaxScrollOffset().x, this.gameListScroll.getMaxScrollOffset().y)
        let offSet = this.gameListScroll.getScrollOffset()

        let topXOffset = offSet.x - left.x
        let topYOffset = offSet.y - left.y
        let topDistence = Math.sqrt(Math.pow(topXOffset, 2) + Math.pow(topYOffset, 2)) //左边距距离

        let botXOffset = Math.abs(offSet.x) - Math.abs(right.x)
        let botYOffset = offSet.y - right.y
        let botDistence = Math.sqrt(Math.pow(botXOffset, 2) + Math.pow(botYOffset, 2)) // 右边距距离

        if (topDistence >= botDistence) {
            this.hideArrow(1)
        }
        else {
            this.hideArrow(0)
        }

    }
    onScrollViewScrollToTop() {
        this.hideArrow(0)
    }

    onScrollViewScrollToBot() {
        this.hideArrow(1)
    }

    hideArrow(flag) {
        if (cc.isValid(this.topArrow))
            this.topArrow.active = flag == 1
        if (cc.isValid(this.botArrow))
            this.botArrow.active = flag == 0
    }


    private onScrollViewScroll() {
        // 获取 ScrollView Node 的左下角坐标在世界坐标系中的坐标
        if (!this.gameListScroll.node || !cc.isValid(this.gameListScroll.node))
            return;


        this.hideArrow(-1)
        let svLeftBottomPoint = this.gameListScroll.node.parent.convertToWorldSpaceAR(
            cc.v2(
                this.gameListScroll.node.x - this.gameListScroll.node.anchorX * this.gameListScroll.node.width,
                this.gameListScroll.node.y - this.gameListScroll.node.anchorY * this.gameListScroll.node.height
            )
        )
        // 求出 ScrollView 可视区域在世界坐标系中的矩形（碰撞盒）
        let svBBoxRect: cc.Rect = cc.rect(
            svLeftBottomPoint.x,
            svLeftBottomPoint.y,
            this.gameListScroll.node.width,
            this.gameListScroll.node.height
        )
        if (!this.gameItemList || this.gameItemList.length == 0) return
        for (let i = 0; i < this.gameItemList.length; i++) {
            let item = this.gameItemList[i]
            let btn = item.node.getComponent(YXButton)
            if (!item || !cc.isValid(item.node)) {
                continue
            }
            if (item.node.getBoundingBoxToWorld().intersects(svBBoxRect)) { //判断是否在可视区域内
                item.active = true;
                btn.setActive(true)
            }
            else {
                item.active = false;
                btn.setActive(false)
            }
        }
    }
    public getNodesArr() {
        let arr = []
        for (let i = 0; i < this.gameItemList.length; i++) {
            arr.push(this.gameItemList[i].node);
        }
        return arr;
    }

    private async addGameItem(gid) {
        return new Promise(async resolve => {
            let item = new GameItemView();
            let gameInfo = Global.GameData.getGameResInfo(gid);
            let node = cc.instantiate(this.gameTemplate);
            item.setNode(node);
            await item.setResInfo(gameInfo);
            this.gameItemMap[gid] = item;
            item.active = false;
            resolve(item)
        })
    }

    public async refreshGameList(enterGameOffsetX: number, isMoreGame: boolean = false, callback = null) {
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
            this.itemArea.setPosition(this.moreGameAreaX, this.itemAreaY)
        } else {
            this.itemArea.setPosition(this.itemAreaX, this.itemAreaY)
        }
        if (enterGameOffsetX < 0) {
            Global.Component.scheduleOnce(() => {
                this.gameListScroll.scrollToOffset(cc.v2(-enterGameOffsetX, 0));
            });
        } else {
            this.gameListScroll.scrollToLeft();
        }

        this.itemArea.opacity = 1;
        let gongGaoNodeWide = this.gonggaoNode.width;
        let offeset = Global.Setting.SkinConfig.getSpaceOffset()

        let gameList = isMoreGame ? Global.GameData.moreGameList : Global.GameData.hallGameList;//是否是更多游戏
        let spaceX = offeset[0]; //x轴间隔
        let spaceY = offeset[1]; //y轴间隔

        this.gameItemList = [];
        // let rightNodeArr = [];
        let count = 0;
        let startGapX = Global.Setting.SkinConfig.getHallGameListGap(0) //初始x轴间隔
        let startGapY = Global.Setting.SkinConfig.getHallGameListGap(1) //初始y轴间隔
        let line = Global.Setting.SkinConfig.getHallGameListLine() //初始x轴间隔
        let startingDistance = isMoreGame ? 3 * spaceX : gongGaoNodeWide;
        let moreGameNodeWidth = Global.GameData.hasMoreGameList ? this.moreGameBtn.width : 0;
        for (let i = 0; i < gameList.length; i++) {
            let gameData = gameList[i];
            let item = await this.getItem(gameData.game_id) as GameItemView;
            //更新图标状态
            item.setServerInfo(gameData, count);
            item.node.parent = this.itemArea;
            let itemX = 0
            let itemY = 0
            let index = count % line
            let gapCount = Math.floor(count / line)
            itemX = this.gameItemWidth / 2 + gapCount * this.gameItemWidth + gapCount * spaceX + startGapX
            itemY = -this.gameItemHeight / 2 - index * this.gameItemHeight - index * spaceY - startGapY
            item.node.setPosition(itemX, itemY)
            item.node.name = gameData.prefabName
            // rightNodeArr.push(item.node);
            this.gameItemList.push(item);
            Global.UIHelper.addCommonClick(item.node, "", item.onItemClick, item)
            let bindObj = item.node.getComponentsInChildren(BindingButtonEffect)
            item.node.getComponent(YXButton).setBind(bindObj)
            // let rootNode = this.gameItemRoot.parent
            // item.moveSpine(rootNode)
            item.node.active = true;
            count++;
        }
        let contentWidth: number = Math.ceil(count / 2) * this.gameItemWidth + Math.ceil(count / 2) * spaceX + gongGaoNodeWide + moreGameNodeWidth + spaceX;
        if (isMoreGame) {
            contentWidth = Math.ceil(count / 2) * this.gameItemWidth + Math.ceil(count / 2) * spaceX + startingDistance;
        }
        // let contentWidth:number = Math.ceil( Math.ceil(count / line)) * this.gameItemWidth  + Math.ceil( Math.ceil(count / line)-1) * spaceX  +1/2 * this.gameItemWidth + moreGameNodeWidth + startGapX

        this.contentWide = contentWidth;
        let callbackFuc = cc.callFunc(() => {
            if (callback) {
                // this.biniting = false
                callback()
                this.hideArrow(0)
                this.onScrollViewScroll()
            }
        })
        if (Global.GameData.hasMoreGameList && !isMoreGame) {
            this.moreGameBtn.active = true;
            this.moreGameBtn.opacity = 255;
            let posX = this.contentWide - moreGameNodeWidth / 2;
            this.moreGameBtn.setPosition(posX, this.moreGameBtn.position.y);
        }
        // this.contentWide = isMoreGame ? this.contentWide - this.gonggaoNode.width * 0.9 : this.contentWide + moreGameNodeWidth;

        this.contentNode.width = this.contentWide;

        let showAllItemFunc = cc.callFunc(() => {
            // this.showAllItem()
        })
        this.itemArea.runAction(cc.sequence(cc.hide(), cc.fadeOut(0), cc.show(), cc.fadeIn(0.1), callbackFuc));
        this.downloadGame()
    }

    private downloadGame() {
        if (CC_PREVIEW) return
        let firstOpen = Global.Setting.storage.get(HallStorageKey.FirstOpen);
        if (firstOpen && firstOpen == 1) {
            return
        }
        let gidList = Global.GameData.autoDownList
        if (gidList && gidList.length > 0) {
            Global.Setting.storage.set(HallStorageKey.FirstOpen, 1);
            for (let i = 0; i < gidList.length; i++) {
                let gameData = Global.GameData.getGameInfo(gidList[i])
                if (gameData && gameData.status == 1) {
                    Global.HotUpdateManager.addHotUpdateGameComp(gameData.game_id, gameData.version, gameData.getUpdateUrl(), gameData.isBackVersionFlag, true)
                }

            }
        }

    }


    private async getItem(gid) {
        return new Promise(async resolve => {
            let item = this.gameItemMap[gid];
            if (item == null) {
                // Logger.error("没找到资源图标", gid);
                item = await this.addGameItem(gid);
            }
            resolve(item)
        })
    }

    private showAllItem() {
        if (this.gameItemMap && !Global.Toolkit.isEmptyObject(this.gameItemMap)) {
            for (let key in this.gameItemMap) {
                this.gameItemMap[key].active = true;
            }
        }
    }

    private hideAllItem() {
        if (this.gameItemMap && !Global.Toolkit.isEmptyObject(this.gameItemMap)) {
            for (let key in this.gameItemMap) {
                this.gameItemMap[key].active = false;
            }
        }
    }

    public destroy() {
        for (let key in this.gameItemMap) {
            this.gameItemMap[key].destroy();
        }
    }

    destroyAll() {
        let rootNode = this.gameItemRoot.parent
        if (!cc.isValid(rootNode)) return
        for (let index = 0; index < rootNode.childrenCount; index++) {
            let child: cc.Node = rootNode.children[index]
            if (cc.isValid(child)) {
                child.destroyAllChildren()
            }
        }
        this.destroy()
        this.gameItemMap = {}
    }
    public close() {
        for (let key in this.gameItemMap) {
            this.gameItemMap[key].releaseGameIcon();
        }
    }

}