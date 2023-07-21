

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

/**进入子游戏时场景过渡动画组件 */
@ccclass
export default class IntoGameAnimComp extends cc.Component {
    //loading画面节点
    loadingNode: cc.Node;
    public maskNode: cc.Node;

    bottomNodeArr:cc.Node[];
    bottomNodeYArr:number[] = [];

    topNodeArr:cc.Node[];
    topNodeYArr:number[] = [];
    
    leftNodeArr:cc.Node[];
    leftNodeXArr:number[] = [];
    
    rightNodeArr:cc.Node[];
    rightNodeXArr:number[] = [];

    middleNodeArr:cc.Node[];
    middleNodeXArr:number[] = [];

    public bottomObjArr: any[] = [];
    public topObjArr: any[] = [];
    public leftObjArr: any[] = [];
    public rightObjArr: any[] = [];
    public middleObjArr: any[] = [];
    private bottomOffset = cc.v2(0, -200);
    private topOffset = cc.v2(0, 300);
    private leftOffset = cc.v2(-300, 0);
    private rightOffset = cc.v2(300, 0);
    private middleOffset = cc.v2(1560, 0);

    //是否已执行过动画（进入场景后此动画只执行一次，后续任何情况都不再执行，除非重新进入场景）
    public bInit:boolean = false;;

    public init(needAlways?){
        if(this.bInit && !needAlways){
            return;
        }
        this.bInit = true;

        if(!this.bottomNodeArr){
            this.bottomNodeArr = [];
        }
        for(let i = 0; i < this.bottomNodeArr.length; i++){
            let node = this.bottomNodeArr[i];
            this.bottomNodeYArr[i] = node.y;
            node.y -= 200;
        }

        if(!this.topNodeArr){
            this.topNodeArr = [];
        }
        for(let i = 0; i < this.topNodeArr.length; i++){
            let node = this.topNodeArr[i];
            this.topNodeYArr[i] = node.y;
            node.y += 300;
        }
        
        if(!this.leftNodeArr){
            this.leftNodeArr = [];
        }
        for(let i = 0; i < this.leftNodeArr.length; i++){
            let node = this.leftNodeArr[i];
            this.leftNodeXArr[i] = node.x;
            node.x -= 300;
        }
        
        if(!this.rightNodeArr){
            this.rightNodeArr = [];
        }
        for(let i = 0; i < this.rightNodeArr.length; i++){
            let node = this.rightNodeArr[i];
            this.rightNodeXArr[i] = node.x;
            node.x += 300;
        }

        if(!this.middleNodeArr){
            this.middleNodeArr = [];
        }
        for(let i = 0;i<this.middleNodeArr.length;i++){
            let node = this.middleNodeArr[i];
            this.middleNodeXArr[i] = node.x;
            node.x += 1560;
        }
        this.node.opacity = 1;//不能设为0，否则透明度为0的情况下触发点击事件会无法冒泡
    }

    public forceInit()
    {
        this.bInit = false;
        this.init();
    }

    //开始动画
    public startAnimation(){
        this.danchu();
    }

    //淡出
    protected danchu(){
        if(this.loadingNode){
            let ac1 = cc.fadeOut(0.5);
            let cf1 = cc.callFunc(()=>{
                this.loadingNode.active = false;
                // this.loadingNode.destroy();
                // this.loadingNode = null;
                this.danru();
            }, this);
            this.loadingNode.runAction(cc.sequence(ac1, cf1));
        }else{
            this.danru();
        }
    }

    //淡入
    protected danru(){
        let ac2 = cc.fadeIn(0.5);
        let cf2 = cc.callFunc(()=>{
            this.nodesAnimation();
        }, this);
        this.node.runAction(cc.sequence(ac2, cf2));
    }

    /**
     * 
     * @param timeScale 总时间 //不精准 移动延时暂不记
     * @param delay     开始延时
     * @param finishCal 
     * @param target 
     */
    public startAnimtionByMask(timeScale: number = 1, delay: number = 0, finishCal?: Function, target?: any){
        let danchuTime = 0.25* timeScale;
        let danruTime = 0.25* timeScale;
        let assembleTime = 0.5* timeScale;
        if ((this.leftNodeArr.length + this.bottomNodeArr.length + this.rightNodeArr.length + this.topNodeArr.length + this.middleNodeArr.length) == 0){
            assembleTime = 0;
        }
        if (this.loadingNode && this.maskNode){
            Global.Component.scheduleOnce(()=>{
                this.danchuByMask(danchuTime);
            }, delay);
            Global.Component.scheduleOnce(()=>{
                this.loadingNode.active = false;
                this.danruByMask(danruTime);
            }, delay + danchuTime);
            Global.Component.scheduleOnce(()=>{
                this.nodesAnimation(assembleTime);
            }, delay + danchuTime + danruTime);
            Global.Component.scheduleOnce(()=>{
                this.maskNode.active = false;   // 遮罩防止动画过程中操作 debug action队列中调用时机不对
                if(finishCal && target){
                    finishCal.call(target);
                }
            }, delay + danchuTime + danruTime + assembleTime);
        }
        else{
            this.loadingNode.active = false;
            this.maskNode.active = false;
            this.node.active = true;
        }
    }
    
    protected danchuByMask(time: number){
        this.maskNode.active = true;
        this.maskNode.opacity = 1;
        let ac1 = cc.fadeTo(time, 200);
        this.maskNode.runAction(ac1);
    }

    protected danruByMask(time){
        this.node.opacity = 255;
        let ac2 = cc.fadeTo(time, 1);
        this.maskNode.runAction(ac2);
    }

    //游戏内节点动画
    protected nodesAnimation(time: number = 0.5){
        if (time < 0.2){
            time = 0.2;     // 防错
        }
        var delayTime:number = 0;
        for(let i = 0; i < this.bottomNodeArr.length; i++){
            let node = this.bottomNodeArr[i];
            let x = node.x;
            let y = this.bottomNodeYArr[i];
            let tween = new cc.Tween(node);//Game.Tween.get(node);
            tween.delay(delayTime).to(time, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }

        delayTime = 0;
        for(let i = 0; i < this.topNodeArr.length; i++){
            let node = this.topNodeArr[i];
            let x = node.x;
            let y = this.topNodeYArr[i];
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.2, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        
        delayTime = 0;
        for(let i = 0; i < this.leftNodeArr.length; i++){
            let node = this.leftNodeArr[i];
            let x = this.leftNodeXArr[i]
            let y = node.y;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.1, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        
        delayTime = 0;
        for(let i = 0; i < this.rightNodeArr.length; i++){
            let node = this.rightNodeArr[i];
            let x = this.rightNodeXArr[i]
            let y = node.y;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.1, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for(let i =0; i < this.middleNodeArr.length; i++){
            let node = this.middleNodeArr[i];
            let x = this.middleNodeXArr[i]
            let y=  node.y;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.1, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
    }


    /** 
     * 新的动画配置 灵活设置单个偏移
     * {node: cc.node, offset: cc.vec2}
     * {node: this.menu, offset: cc.v2(0, 200)} 从上往下移动 offset y=+200
     * offset可以不传，走默认偏移
     */
    public felxInit(){
        if(this.bInit){
            return;
        }
        this.bInit = true;

        if(!this.bottomObjArr){
            this.bottomObjArr = [];
        }
        for(let i = 0; i < this.bottomObjArr.length; i++){
            let node = this.bottomObjArr[i].node;
            let offset = this.bottomObjArr[i].offset || this.bottomOffset;
            node.y += offset.y;
        }

        if(!this.topObjArr){
            this.topObjArr = [];
        }
        for(let i = 0; i < this.topObjArr.length; i++){
            let node = this.topObjArr[i].node;
            let offset = this.topObjArr[i].offset || this.topOffset;
            node.y += offset.y;
        }
        
        if(!this.leftObjArr){
            this.leftObjArr = [];
        }
        for(let i = 0; i < this.leftObjArr.length; i++){
            let node = this.leftObjArr[i].node;
            let offset = this.leftObjArr[i].offset || this.leftOffset;
            node.x += offset.x;
        }
        
        if(!this.rightObjArr){
            this.rightObjArr = [];
        }
        for(let i = 0; i < this.rightObjArr.length; i++){
            let node = this.rightObjArr[i].node;
            let offset = this.rightObjArr[i].offset || this.rightOffset;
            node.x += offset.x;
        }
        if(!this.middleObjArr){
            this.middleObjArr = [];
        }
        for(let i = 0; i < this.middleObjArr.length; i++){
            let node = this.middleObjArr[i].node;
            let offset = this.middleObjArr[i].offset || this.middleOffset;
            node.x += offset.x;
        }
        this.node.opacity = 1;//不能设为0，否则透明度为0的情况下触发点击事件会无法冒泡
    }

    /**
     * 
     * @param timeScale 总时间 //不精准 移动延时暂不记
     * @param delay     开始延时
     * @param finishCal 
     * @param target 
     */
    public startFlexAnimtionByMask(timeScale: number = 2, delay: number = 0, finishCal?: Function, target?: any){
        let danchuTime = 0.25* timeScale;
        let danruTime = 0.25* timeScale;
        let assembleTime = 0.5* timeScale;
        if (this.getMoveCount() == 0){
            assembleTime = 0;
        }
        if (this.loadingNode && this.maskNode){
            Global.Component.scheduleOnce(()=>{
                this.flexDanchuByMask(danchuTime);
            }, delay);
            Global.Component.scheduleOnce(()=>{
                this.loadingNode.active = false;
                this.flexDanruByMask(danruTime);
            }, delay + danchuTime);
            Global.Component.scheduleOnce(()=>{
                this.flexNodesAnimation(assembleTime);
            }, delay + danchuTime + danruTime);
            Global.Component.scheduleOnce(()=>{
                this.maskNode.active = false;   // 遮罩防止动画过程中操作 debug action队列中调用时机不对
                if(finishCal && target){
                    finishCal.call(target);
                }
            }, delay + danchuTime + danruTime + assembleTime);
        }
        else{
            this.loadingNode.active = false;
            this.maskNode.active = false;
            this.node.active = true;
        }
    }

    protected flexDanchuByMask(time: number){
        this.maskNode.active = true;
        this.maskNode.opacity = 1;
        let ac1 = cc.fadeTo(time, 200);
        this.maskNode.runAction(ac1);
    }

    protected flexDanruByMask(time){
        this.node.opacity = 255;
        let ac2 = cc.fadeTo(time, 1);
        this.maskNode.runAction(ac2);
    }

    protected flexNodesAnimation(time: number = 0.5){
        if (time < 0.2){
            time = 0.2;     // 防错
        }
        var delayTime:number = 0;
        for(let i = 0; i < this.bottomObjArr.length; i++){
            let node = this.bottomObjArr[i].node;
            let offset = this.bottomObjArr[i].offset || this.bottomOffset;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).by(time, {position: offset.mul(-1)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }

        delayTime = 0;
        for(let i = 0; i < this.topObjArr.length; i++){
            let node = this.topObjArr[i].node;
            let offset = this.topObjArr[i].offset || this.topOffset;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).by(time-0.2, {position: offset.mul(-1)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        
        delayTime = 0;
        for(let i = 0; i < this.leftObjArr.length; i++){
            let node = this.leftObjArr[i].node;
            let offset = this.leftObjArr[i].offset || this.leftOffset;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).by(time-0.1, {position: offset.mul(-1)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        
        delayTime = 0;
        for(let i = 0; i < this.rightObjArr.length; i++){
            let node = this.rightObjArr[i].node;
            let offset = this.rightObjArr[i].offset || this.rightOffset;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).by(time-0.1, {position: offset.mul(-1)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }

        delayTime = 0;
        for(let i = 0; i < this.middleObjArr.length; i++){
            let node = this.middleObjArr[i].node;
            let offset = this.middleObjArr[i].offset || this.middleOffset;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).by(time-0.1, {position: offset.mul(-1)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
    }

    public getMaxMoveDelay(){
        return (Math.max(this.bottomObjArr.length, this.topObjArr.length, this.leftObjArr.length, this.rightObjArr.length,this.middleObjArr.length, 1) -1) * 0.1;
    }

    public getMoveCount(){
        return this.bottomObjArr.length + this.topObjArr.length + this.leftObjArr.length + this.rightObjArr.length + this.middleObjArr.length;
    }
}
