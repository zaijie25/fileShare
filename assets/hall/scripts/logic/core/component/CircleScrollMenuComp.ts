const {ccclass, property} = cc._decorator;

@ccclass
export default class CircleScrollMenuComp extends cc.Component {
    @property({
        tooltip: "显示可见的最大item数量, 并且预设上要多两个节点用于动画"
    })
    public showCount: number = 0;

    private readonly moveTime = 0.2;        // 滚动时长
    private readonly slideDev = 5;          // 手势判定有效位移

    private dotNode: cc.Node;
    private itemList: MenuItem[] = [];
    private itemRawPosArr: cc.Vec3[] = [];
    private isRolling: boolean = false;
    private touchStartPos: cc.Vec2;
    private menuSelectCallback: Function;
    private menuSelectTarget: any;

    private dataList: any[] = [];
    /** 显示的item序号 上第一个item基准 */
    private showIndex: number = 0;
    /** 实际显示的数据序号 上第一个item基准 */
    private realIndex: number = 0;
    /** 中心指向的本地item序号 1~showCount+2 */
    private curSelectIndex: number = 0;
    /** 是否可滚动 */
    private isRollEnable: boolean = false;
    

    private get totalCount(){
        return this.showCount + 2;
    }

    private get centerCount(){
        return Math.floor(this.showCount / 2);
    }

    protected onLoad(){
        let contentNode = cc.find("mask/touch", this.node);
        contentNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this); 
        contentNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        contentNode._touchListener.setSwallowTouches(false)

        this.dotNode = cc.find("mask/circleDot", this.node);
        for(let i = 0; i < this.totalCount; i++){        // 额外多出两个用于辅助滚动动画
            let node = cc.find("item" + i, this.dotNode);
            if (node){
                let item: MenuItem = Global.UIHelper.safeGetComponent(node, "", MenuItem);
                item.index = i;
                item.setCallback(this.onMenuItemClick, this);
                item.node.active = false;
                item.setCheck(false);
                this.itemList.push(item);
                this.itemRawPosArr.push(node.position);
            }
        }
        if (this.itemList.length != this.totalCount){
          //  console.error("节点数量异常", this.itemList.length, this.totalCount);
        }
    }

    private onTouchStart(event: cc.Event.EventTouch){
        this.touchStartPos = event.getLocation();
    }

    private onTouchEnd(event: cc.Event.EventTouch){
        if (!this.isRollEnable)     // 数量太少
            return;
        if (this.isRolling)
            return;
        let endPos = event.getLocation();
        let se = endPos.sub(this.touchStartPos);
        let dev = se.mag();
        let comDev = Math.pow(this.slideDev, 2);
        if (se.y > 0){      // 向上滑   先判断y方向偏移量, 处理横向滑动的问题 暂未扩展到横向滑动
            if (dev >= comDev){
                // event.stopPropagation();
                this.rollForward(this.moveTime, 1, true, ()=>{
                    this.itemList[this.curSelectIndex].setCheck(false);
                    this.curSelectIndex = this.getNextIndex(this.showIndex, this.centerCount);
                    this.onMenuSelect(this.curSelectIndex);
                });
            }
        }
        else{               // 向下滑
            if (dev >= comDev){
                // event.stopPropagation();
                this.rollBack(this.moveTime, 1, true, ()=>{
                    this.itemList[this.curSelectIndex].setCheck(false);
                    this.curSelectIndex = this.getNextIndex(this.showIndex, this.centerCount);
                    this.onMenuSelect(this.curSelectIndex);
                });
            }
        }
    }

    private onMenuItemClick(index: number){
        if (this.isRolling)
            return;
        if (this.isRollEnable){
            this.autoRollToItem(index, ()=>{
                this.itemList[this.curSelectIndex].setCheck(false);
                this.curSelectIndex = this.getNextIndex(this.showIndex, this.centerCount);
                this.onMenuSelect(this.curSelectIndex);
            })
        }
        else{
            this.switchItemWithoutRoll(index);
        }
    }

    private onMenuSelect(index: number){
        let curItem = this.itemList[index];
        if (curItem){
            curItem.setCheck(true);
            if (this.menuSelectTarget && this.menuSelectCallback){
                this.menuSelectCallback.call(this.menuSelectTarget, curItem.key);
            }
        }
        else{
           // console.error("item not exist", index, this.itemList.length);
        }
    }

    public setMenuItemCallback(callback: Function, target: any){
        this.menuSelectCallback = callback;
        this.menuSelectTarget = target;
    }

    public initData(list: any[] = []){
        if (list.length <= 0){
            this.node.active = false;
            return Global.UI.fastTip("菜单项列表为空: " + list.length);
        }
        this.dataList = list || [];
        // 数据数量小于showCount 设置标志不可滚动, 直接刷新
        this.isRollEnable = list.length >= this.showCount;

        for(let i = 0; i < this.itemList.length; i++){
            let item = this.itemList[i];
            if (list[i]){
                item.node.active = true;
                item.setData(list[i]);
            }
            else{
                item.node.active = this.isRollEnable;       // 可转动时显示辅助item
            }
        }
    }

    public setDefaultSelect(rIndex?: number){
        if (rIndex >= 0)
            this.realIndex = this.getPrevRealIndex(rIndex, this.centerCount);
        else
            this.realIndex = 0;
        for(let i = 0; i < this.showCount; i++){
            let next = this.getNextIndex(this.showIndex, i);
            let item = this.itemList[next];
            let tempRealIndex = this.getNextRealIndex(this.realIndex, i);
            item.setData(this.dataList[tempRealIndex]);
        }
        let nSelectIndex = this.getNextIndex(this.showIndex, this.centerCount);
        this.onMenuSelect(nSelectIndex);
        this.curSelectIndex = nSelectIndex;
    }

    private autoRollToItem(index: number, finishCal: Function){
        let pos = index - this.curSelectIndex;
        let dev = Math.abs(pos);
        if (dev > this.centerCount){    // 超过显示的一半 就反向
            if (pos > 0)
                pos -= this.totalCount;
            else
                pos += this.totalCount;
            dev = Math.abs(pos);
        }
        if (dev != 0){
            this.isRolling = true;
            if (pos > 0){
                this.rollForward(this.moveTime, dev, true, finishCal);
            }
            else{
                this.rollBack(this.moveTime, dev, true, finishCal);
            }
        }
    }

    private switchItemWithoutRoll(index: number){
        let pos = index - this.curSelectIndex;
        let dev = Math.abs(pos);
        if (dev != 0){
            let dataCount = this.dataList.length;
            let realIndex = this.realIndex;
            for(let i = 0; i < this.itemList.length; i++){       // 不旋转 第一个item索引一直都是0 切换数据
                let item = this.itemList[i];
                let rIndex = 0;
                let tempIndex = this.getNextRealIndex(this.realIndex, i);       // 先计算每个item的当前realIndex, 再前移或后移
                if (pos > 0){
                    rIndex = this.getNextRealIndex(tempIndex, dev);
                }
                else{
                    rIndex = this.getPrevRealIndex(tempIndex, dev);
                }
                if (this.dataList[rIndex]){
                    item.setData(this.dataList[rIndex]);
                    if (i == 0)
                        realIndex = rIndex;
                }
                if (i >= dataCount - 1)
                    break;
            }
            this.realIndex = realIndex;
            this.onMenuSelect(this.curSelectIndex);
        }
    }

    /** 转盘向下转 */
    private rollBack(time: number, step: number = 1, isAnim: boolean = true, callback?: Function){
        Logger.error("rollBack 向下转");
        this.setHideItemDataBack();      // 设置首尾显示的内容更新
        let frameInSecond = cc.game.getFrameRate();
        let everyFrame = Math.floor(frameInSecond * time / step);
        for(let i =0; i < this.itemList.length; i++){
            let item = this.itemList[i];
            let next = this.getNextIndex(i + this.totalCount - this.showIndex, step);
            // Logger.error("rollBack", this.showIndex, i, next);
            if (isAnim){
                let arr = [];
                let start = cc.v2(item.node.position);
                for(let s = 1; s <= step; s ++){
                    let nextStep = this.getNextIndex(i + this.totalCount - this.showIndex, s);
                    let end = cc.v2(this.itemRawPosArr[nextStep]);
                    let temp = this.getLerpPosArr(start, end, everyFrame);
                    start = end;
                    arr = arr.concat(temp);
                }
                item.startRun(arr);
            }
            else{
                item.node.setPosition(this.itemRawPosArr[next]);
            }
        }
        
        if (isAnim){
            this.isRolling = true;
            this.scheduleOnce(() => {
                if (!cc.isValid(this.node))
                    return
                this.isRolling = false;
                this.realIndex = this.getPrevRealIndex(this.realIndex, step);
                this.showIndex = this.getPrevIndex(this.showIndex, step);
                callback && callback();
            }, time + 0.05);
        }
        else{
            this.realIndex = this.getPrevRealIndex(this.realIndex, step);
            this.showIndex = this.getPrevIndex(this.showIndex, step);
            callback && callback();
        }
    }

    /** 转盘向上转 */
    private rollForward(time: number, step: number = 1, isAnim: boolean = true, callback?: Function){
        Logger.error("rollForward 向上转");
        this.setHideItemDataForward();     // 设置首尾显示的内容更新
        let frameInSecond = cc.game.getFrameRate();
        let everyFrame = Math.floor(frameInSecond * time / step);
        for(let i =0; i < this.itemList.length; i++){
            let item = this.itemList[i];
            let prev = this.getPrevIndex(i  + this.totalCount - this.showIndex, step);
            // Logger.error("rollForward", this.showIndex, i, prev);
            if (isAnim){
                let arr = [];
                let start = cc.v2(item.node.position);
                for(let s = 1; s <= step; s ++){
                    let nextStep = this.getPrevIndex(i + this.totalCount - this.showIndex, s);
                    let end = cc.v2(this.itemRawPosArr[nextStep]);
                    let temp = this.getLerpPosArr(start, end, everyFrame);
                    start = end;
                    arr = arr.concat(temp);
                }
                item.startRun(arr);
            }
            else{
                item.node.setPosition(this.itemRawPosArr[prev]);
            }
        }
        
        if (isAnim){
            this.isRolling = true;
            this.scheduleOnce(() => {
                if (!cc.isValid(this.node))
                    return
                this.isRolling = false;
                this.realIndex = this.getNextRealIndex(this.realIndex, step);
                this.showIndex = this.getNextIndex(this.showIndex, step);
                callback && callback();
            }, time + 0.05);
        }
        else{
            this.realIndex = this.getNextRealIndex(this.realIndex, step);
            this.showIndex = this.getNextIndex(this.showIndex, step);
            callback && callback();
        }
    }

    private setHideItemDataForward(){
        let step = this.showCount;
        let last2nd = this.getNextIndex(this.showIndex, step);
        let last = this.getNextIndex(this.showIndex, step + 1);

        let last2ndRealIndex = this.getNextRealIndex(this.realIndex, step);
        let lastRealIndex = this.getNextRealIndex(this.realIndex, step + 1);
        this.itemList[last2nd].setData(this.dataList[last2ndRealIndex]);
        this.itemList[last].setData(this.dataList[lastRealIndex]);
    }

    private setHideItemDataBack(){
        let step = this.showCount;
        let last2nd = this.getNextIndex(this.showIndex, step);
        let last = this.getNextIndex(this.showIndex, step + 1);

        let last2ndRealIndex = this.getPrevRealIndex(this.realIndex, 2);
        let lastRealIndex = this.getPrevRealIndex(this.realIndex, 1);
        this.itemList[last2nd].setData(this.dataList[last2ndRealIndex]);
        this.itemList[last].setData(this.dataList[lastRealIndex]);
    }
    
    private getLerpPosArr(start: cc.Vec2, end: cc.Vec2, totalFrame: number){
        let arr = [];
        for(let i = 1; i <= totalFrame; i++){
            arr.push(start.lerp(end, i / totalFrame));
        }
        return arr;
    }

    private getNextIndex(value: number, step: number = 1){
        return (value + step) % this.totalCount;
    }

    private getPrevIndex(value: number, step: number = 1){
        return (value - step + this.totalCount) % this.totalCount;
    }

    private getNextRealIndex(value: number, step: number = 1){
        return (value + step) % this.dataList.length;
    }

    private getPrevRealIndex(value: number, step: number = 1){
        return (value - step + this.dataList.length) % this.dataList.length;
    }

    protected onDisable(){
        this.unscheduleAllCallbacks();
    }
}

class MenuItem extends cc.Component{
    private uncheckNode: cc.Node;
    private checkNode: cc.Node;
    private uncheckIconSp: cc.Sprite;
    private checkIconSp: cc.Sprite;
    private uncheckTextSp: cc.Sprite;
    private checkTextSp: cc.Sprite;
    private callback: Function;
    private target: any;
    private _key: number = 0;
    private _index: number = 0;
    public get key(){
        return this._key;
    }

    private runEnable: boolean = false;
    private runPosArr: cc.Vec3[] = [];
    private frameCount: number = 0;

    protected onLoad(){
        this.uncheckNode = cc.find("uncheckNode", this.node);
        this.uncheckIconSp = cc.find("iconSp", this.uncheckNode).getComponent(cc.Sprite);
        this.uncheckTextSp = cc.find("textSp", this.uncheckNode).getComponent(cc.Sprite);
        this.checkNode = cc.find("checkNode", this.node);
        this.checkIconSp = cc.find("iconSp", this.checkNode).getComponent(cc.Sprite);
        this.checkTextSp = cc.find("textSp", this.checkNode).getComponent(cc.Sprite);

        Global.UIHelper.addCommonClick(this.node, "", this.onItemClick, this);
    }

    public setData(data: any){
        this._key = data.key;
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.uncheckIconSp, "hall/images/circle/atlas_circle", data.icon);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.uncheckTextSp, "hall/images/circle/atlas_circle", data.ucText);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.checkIconSp, "hall/images/circle/atlas_circle", data.icon);
        Global.ResourceManager.loadBundleAutoAtlas("resources", this.checkTextSp, "hall/images/circle/atlas_circle", data.cText);
        if (!data.cText){
            this.checkTextSp.node.active = false;
        }
        if (!data.ucText){
            this.uncheckTextSp.node.active = false;
        }
    }

    public set index(value: number){
        this._index = value;
    }

    public get index(){
        return this._index;
    }

    public setCallback(func: Function, target: any){
        this.callback = func;
        this.target = target;
    }

    private onItemClick(){
        if (this.callback && this.target){
            this.callback.call(this.target, this.index, this.key);
        }
    }

    public setCheck(flag: boolean){
        this.uncheckNode.active = !flag;
        this.checkNode.active = flag;
    }

    public startRun(arr: cc.Vec3[]){
        if (arr && arr.length > 0){
            this.frameCount = 0;
            this.runPosArr = arr;
            this.runEnable = true;
        }
    }

    protected update(){
        if (!this.runEnable || this.runPosArr.length <= 0)
            return;
        let pos = this.runPosArr[this.frameCount];
        if (pos){
            this.node.setPosition(pos);
            this.frameCount += 1;
            if (this.frameCount == this.runPosArr.length){
                this.runEnable = false;
                this.runPosArr = [];
            }
        }
    }
}