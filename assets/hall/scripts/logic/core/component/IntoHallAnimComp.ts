

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
export default class IntoHallAnimComp extends cc.Component {
    
    callBackFunc:any;
    callBackTarget:any;

    alphaNode: cc.Node;

    bottomNodeArr:cc.Node[];
    bottomNodeYArr:number[] = [];

    topNodeArr:cc.Node[];
    topNodeYArr:number[] = [];
    
    leftNodeArr:cc.Node[];
    leftNodeXArr:number[] = [];
    
    rightNodeArr:cc.Node[];
    rightNodeXArr:number[] = [];

    public init(){
        if(this.alphaNode == null || !this.alphaNode.isValid)
            return;
        this.alphaNode.opacity = 1;

        if(!this.bottomNodeArr){
            this.bottomNodeArr = [];
        }
        for(let i = 0; i < this.bottomNodeArr.length; i++){
            let node = this.bottomNodeArr[i];
            this.bottomNodeYArr[i] = node.y;
            node.y -= 100;
        }

        if(!this.topNodeArr){
            this.topNodeArr = [];
        }
        for(let i = 0; i < this.topNodeArr.length; i++){
            let node = this.topNodeArr[i];
            this.topNodeYArr[i] = node.y;
            node.y += 200;
        }
        
        if(!this.leftNodeArr){
            this.leftNodeArr = [];
        }
        for(let i = 0; i < this.leftNodeArr.length; i++){
            let node = this.leftNodeArr[i];
            this.leftNodeXArr[i] = node.x;
            node.x -= 200;
        }
        
        if(!this.rightNodeArr){
            this.rightNodeArr = [];
        }
        for(let i = 0; i < this.rightNodeArr.length; i++){
            let node = this.rightNodeArr[i];
            this.rightNodeXArr[i] = node.x;
            node.x += 400;
        }
    }

    //开始动画
    public startAnimation(){
        this.nodesAnimation();
        this.danru();
    }

    //淡入
    protected danru(){
        if(this.alphaNode){
            let ac1 = cc.delayTime(0.5);
            let ac2 = cc.fadeIn(0.5);
            let af = cc.callFunc(()=>{
                if(this.callBackFunc){
                    this.callBackFunc.call(this.callBackTarget);
                }
            });
            this.alphaNode.runAction(cc.sequence(ac1, ac2, af));
        }
    }

    //游戏内节点动画
    protected nodesAnimation(time: number = 0.8){
        if (time < 0.2){
            time = 0.2;     // 防错
        }
        let d = 0;
        var delayTime:number = d;
        for(let i = 0; i < this.bottomNodeArr.length; i++){
            let node = this.bottomNodeArr[i];
            let x = node.x;
            let y = this.bottomNodeYArr[i];
            let tween = new cc.Tween(node);//Game.Tween.get(node);
            tween.delay(delayTime).to(time-0.2, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }

        delayTime = d;
        for(let i = 0; i < this.topNodeArr.length; i++){
            let node = this.topNodeArr[i];
            let x = node.x;
            let y = this.topNodeYArr[i];
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.4, {position: new cc.Vec2(x, y)}, cc.easeOut(8)).start();
            delayTime += 0.1;
        }
        
        delayTime = d;
        for(let i = 0; i < this.leftNodeArr.length; i++){
            let node = this.leftNodeArr[i];
            let x = this.leftNodeXArr[i]
            let y = node.y;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.5, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        
        delayTime = d;
        for(let i = 0; i < this.rightNodeArr.length; i++){
            let node = this.rightNodeArr[i];
            let x = this.rightNodeXArr[i]
            let y = node.y;
            let tween = new cc.Tween(node);
            tween.delay(delayTime).to(time-0.3, {position: new cc.Vec2(x, y)}, cc.easeBackOut()).start();
            delayTime += 0.02;
        }
    }
}
