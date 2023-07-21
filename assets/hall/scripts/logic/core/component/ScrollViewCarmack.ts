import { any } from "../../../framework/libs/underscore";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

//此组件使用：Global.UIHelper.addScrollViewCarmackComp
@ccclass
export default class ScrollViewCarmack extends cc.Component {

    //子节点预设
    @property(cc.Node)
    itemPrefab : cc.Node = null;

    //子节点父对象
    @property(cc.Node)
    content : cc.Node = null;

    //子节点间隔
    @property
    itemNodePadding = 3;

    //子节点偏移坐标：由于子节点的锚点导致的坐标计算偏移问题(子节点锚点在中心就偏移 1/2 子节点高)
    @property
    itemOffset = 64;

    /**
     * 显示容器额外尺寸
     */
    contentExtraSize = 0;

    //滚动组件
    scrollView : cc.ScrollView = null;
    
    //子节点的高
    itemNodeSize:number = 127;
    //子节点总数量
    itemAllCount : number = 5;

    //当前显示的第一个节点的索引
    currStartIndex : number = -1;

    //所有子节点集合
    itemNodeArr : cc.Node[] = [];

    //总数据集合
    allDatas : any[] = [];

    //子节点更新函数
    item_setter:(itemNode:cc.Node, index:number, data: any)=>void;
    //子节点更新函数的this对象
    item_setter_caller:any = null;

    /**
     * 是否垂直滚动
     */
    bVertical = true;

    init() {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        if(this.scrollView.horizontal){
            //水平滚动
            this.bVertical = false;
        }else if(this.scrollView.vertical){
            //垂直滚动
            this.bVertical = true;
        }
        this.content = this.scrollView.content;

        this.itemNodeSize = this.bVertical ? this.itemPrefab.height : this.itemPrefab.width;
        var showSize = this.bVertical ? this.node.height : this.node.width;
        this.itemAllCount = Math.ceil(showSize / (this.itemNodeSize + this.itemNodePadding)) + 2;

        this.itemNodeArr = [];
        for(let index = 0; index < this.itemAllCount; index++){
            let itemNode = cc.instantiate(this.itemPrefab);
            itemNode.setParent(this.content);
            this.itemNodeArr.push(itemNode);
        }
        this.node.on("scrolling", this.on_scrolling, this);
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChange, this);
    }

    //更新显示
    public updateView(bToBottom:boolean = false) {
        let contentSize = this.allDatas.length * (this.itemNodeSize + this.itemNodePadding) + this.contentExtraSize;
        let size = this.content.getContentSize();
        
        if(this.bVertical){
            size.height = contentSize;
            this.content.setContentSize(size);

            if(bToBottom) {
                this.scrollView.scrollToBottom();
                this.currStartIndex = this.allDatas.length - this.itemAllCount;
            }
            else {
                if(this.allDatas.length < (this.itemAllCount-2)) {
                    this.scrollView.scrollToTop();
                    this.currStartIndex = 0;
                }
                else {
                    let maxOffsetY = this.content.height - this.node.height;
                    let scrollOffset = this.scrollView.getScrollOffset();
                    let offset = scrollOffset.y >= maxOffsetY ? cc.v2(scrollOffset.x, maxOffsetY) : scrollOffset;
                    this.scrollView.scrollToOffset(offset);
                    this.currStartIndex = this.offsetToIndex(offset);
                }
            }
        }
        else {
            size.width = contentSize;
            this.content.setContentSize(size);
            
            if(bToBottom) {
                this.scrollView.scrollToRight();
                this.currStartIndex = this.allDatas.length - this.itemAllCount;
            }
            else {
                if(this.allDatas.length < (this.itemAllCount-2)) {
                    this.scrollView.scrollToLeft();
                    this.currStartIndex = 0;
                }
                else {
                    let scrollOffset = this.scrollView.getScrollOffset();
                    let offset = scrollOffset.x <= this.scrollView.getMaxScrollOffset().x ? this.scrollView.getMaxScrollOffset() : scrollOffset;
                    this.scrollView.scrollToOffset(offset);
                    this.currStartIndex = this.offsetToIndex(offset);
                }
            }
        }
        this.render_items();
    }

    /** 根据偏移计算显示的Index */
    protected offsetToIndex(offset:cc.Vec2):number {
        let pos:number = 0;
        var scrollSize = 0;
        if(this.bVertical){
            pos = offset.y;
            scrollSize = this.content.height - this.node.height;
        }
        else{
            pos = - offset.x;
            scrollSize = this.content.width - this.node.width;
        }
        if(pos < 0)
        {
            pos = 0;
        }
        if(pos > scrollSize)
        {
            pos = scrollSize;
        }

        let index:number = Math.floor(pos / (this.itemNodeSize + this.itemNodePadding)) - 2;
        if(index < 0){
            index = 0;
        }
        return index;
    }

    //重置content大小
    public UpDateScrollData() {
        let contentSize = this.allDatas.length * (this.itemNodeSize + this.itemNodePadding) + this.contentExtraSize;
        let size = this.content.getContentSize();
        
        if(this.bVertical){
            size.height = contentSize;
        }else{
            size.width = contentSize;
        }
        this.content.setContentSize(size);
    }

    //隐藏所有子节点
    public clearView(){
        this.currStartIndex = 0;
        this.scrollView.scrollToLeft();
        this.scrollView.scrollToTop();
        this.content.children.forEach(element=>{
            element.active = false;
        });
    }

    //滚动事件
    private on_scrolling(){
        let pos:number = 0;
        var scrollSize = 0;
        if(this.bVertical){
            pos = this.content.y;
            scrollSize = this.content.height - this.node.height;
        }else{
            pos = -this.content.x;
            scrollSize = this.content.width - this.node.width;
        }
        if(pos < 0)
        {
            pos = 0;
        }
        if(pos > scrollSize)
        {
            pos = scrollSize;
        }
        let start:number = Math.ceil(pos / (this.itemNodeSize + this.itemNodePadding)) - 1;
        if(start < 0){
            start = 0;
        }
        if(start < this.currStartIndex)
        {
            //往上 往左
            this.bottomNodeToUp();
        }else if(start > this.currStartIndex){
            //往下 往右
            this.UpNodeToBottom();
        }
    }

    /** 当scrollView尺寸改变时要修改item的数量,防止出现数据显示不完整等问题出现 */
    private onSizeChange() {
        this.itemNodeSize = this.bVertical ? this.itemPrefab.height : this.itemPrefab.width;
        let showSize = this.bVertical ? this.node.height : this.node.width;
        let itemAllCount = Math.ceil(showSize / (this.itemNodeSize + this.itemNodePadding)) + 2;

        let addCount = itemAllCount - this.itemNodeArr.length;
        for(let index = 0; index < addCount; index++) {
            let itemNode = cc.instantiate(this.itemPrefab);
            itemNode.setParent(this.content);
            this.itemNodeArr.push(itemNode);
        }
        if(addCount > 0) {
            this.itemAllCount = itemAllCount;
            this.updateView();
        }
    }

    //底部子节点放置到顶部
    private bottomNodeToUp(){
        let dataIndex = this.currStartIndex - 1;
        if(dataIndex < 0){
            return;
        }
        this.currStartIndex--;
        let bottomNode = this.itemNodeArr.pop();
        this.itemNodeArr.unshift(bottomNode);
        
        let pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
        if(this.bVertical){
            bottomNode.y = -(pos + this.itemOffset);
        }else{
            bottomNode.x = pos + this.itemOffset;
        }

        this.item_setter.call(this.item_setter_caller, bottomNode, dataIndex, this.allDatas[dataIndex]);
    }

    //顶部子节点放置到底部
    private UpNodeToBottom(){
        let dataIndex = this.currStartIndex + this.itemNodeArr.length;
        if(dataIndex >= this.allDatas.length){
            return;
        }
        this.currStartIndex++;
        let upNode = this.itemNodeArr.shift();
        this.itemNodeArr.push(upNode);

        let pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
        if(this.bVertical){
            upNode.y = -(pos + this.itemOffset);
        }else{
            upNode.x = pos + this.itemOffset;
        }

        this.item_setter.call(this.item_setter_caller, upNode, dataIndex, this.allDatas[dataIndex]);
    }
    
    //渲染子节点
    private render_items(){
        for(let index = 0; index < this.itemAllCount; index++){
            let itemNode = this.itemNodeArr[index];
            let dataIndex = this.currStartIndex + index;
            if(dataIndex < 0){
                itemNode.active = false;
                itemNode.setParent(this.node);
                continue;
            }
            let pos = dataIndex * (this.itemNodeSize + this.itemNodePadding);
            if(this.bVertical){
                itemNode.y = -(pos + this.itemOffset);
            }
            else{
                itemNode.x = pos + this.itemOffset;
            }

            if(this.allDatas.length > dataIndex){
                itemNode.active = true;
                itemNode.setParent(this.content);
                this.item_setter.call(this.item_setter_caller, itemNode, dataIndex, this.allDatas[dataIndex]);
            }else{
                itemNode.active = false;
                itemNode.setParent(this.node);
            }
        }
    }

    
}
