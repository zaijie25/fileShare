export default class ScreenShakeAction extends cc.ActionInterval{
    // 节点初始位置
    protected nodeInitialPos: cc.Vec2 = null;
    //X轴抖动幅度
    protected nodeShakeStrengthX = 0;
    //Y轴抖动幅度
    protected nodeShakeStrengthY = 0;
    //抖动时间
    protected duration = 0;
    constructor(duration: number, shakeStrengthX: number, shakeStrengthY: number){
        super();
        this.duration = duration;
        this.initWithDuration(duration,shakeStrengthX,shakeStrengthY);
    }

    protected initWithDuration(duration: number, shakeStrengthX: number, shakeStrengthY: number){
        super.initWithDuration();
        this.setDuration(duration);
        this.nodeShakeStrengthX = shakeStrengthX;
        this.nodeShakeStrengthY = shakeStrengthY;
    }

    // 获取两个数间的随机值
    protected getRandomStrength(min: number, max: number){
        return Math.random() * (max -min +1) + min;
    }

    protected update(dt){
        var randX = this.getRandomStrength(-this.nodeShakeStrengthX, this.nodeShakeStrengthX) * dt;
        var randY = this.getRandomStrength(-this.nodeShakeStrengthY, this.nodeShakeStrengthY) * dt;
        this.getTarget().setPosition(this.nodeInitialPos.add(cc.v2(randX,randY)))
    }

    startWithTarget(target){
        super.startWithTarget(target);
        this.nodeInitialPos = target.getPosition();
    }

    stop(){
        this.getTarget().setPosition(this.nodeInitialPos);
    }
}