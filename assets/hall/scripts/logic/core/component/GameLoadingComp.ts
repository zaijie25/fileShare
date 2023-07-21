const { ccclass, property } = cc._decorator;
@ccclass
export default class GameLoadingComp extends cc.Component {
    @property({
        type: cc.Integer,
        tooltip: "logoSpine播放动画数量, 1单一循环, 2播放第一个后循环第二个",
        min: 0
    })
    private logoSkIdleCount: number = 1;
    @property({
        type: cc.Float,
        visible(){return this.logoSkIdleCount >= 2},
        tooltip: "logoSpine 切换动画延时s",
        min: 0
    })
    private delay: number = 1;
    private logoSk: sp.Skeleton;

    protected onLoad(){
        this.logoSk = cc.find("logoSk", this.node).getComponent(sp.Skeleton);
        this.logoSk.node.active = false;
    }

    protected onEnable(){
        if(this.logoSkIdleCount <= 0)
            return RangeError("logoSpine 动画数量设定异常")
        this.logoSk.node.active = true;
        this.logoSk.clearTracks();
        if (this.logoSkIdleCount == 1){
            this.logoSk.setAnimation(0, "animation", true);
        }
        else{
            this.logoSk.setAnimation(0, "animation", false);
            this.logoSk.addAnimation(0, "animation", true, this.delay);
        }
    }

    protected onDisable(){
        this.logoSk.node.active = false;
        this.logoSk.clearTracks();
    }
}