const { ccclass, property } = cc._decorator;

enum Directiton{
    Left = -1,
    Right = 1
}

@ccclass
export default class TaskComp extends cc.Component {
    private taskLbl: cc.Label;
    private taskTips: cc.Node;
    private taskTipLbl: cc.Label;
    private showNode: cc.Node;
    private readonly tipsOffsetWidth: number = 40;      // tips的宽偏移量
    private rawTopsPos: cc.Vec3;
    private touchBgNode: cc.Node;
    private isTargetFinish: boolean;

    protected onLoad() {
        this.touchBgNode = cc.find("touchBg", this.node);
        this.touchBgNode.active = false;
        this.touchBgNode.on(cc.Node.EventType.TOUCH_END, this.onTouchBgCLick, this);
        this.touchBgNode._touchListener.setSwallowTouches(false);        // 允许点击穿透

        this.taskTips = cc.find("taskTips", this.node);
        this.taskTipLbl = cc.find("taskTips/taskTipLbl", this.node).getComponent(cc.Label);
        this.taskTips.active = false;
        this.showNode = cc.find("content", this.node)
        this.showNode.active = false;
        this.taskLbl = cc.find("content/taskLbl", this.node).getComponent(cc.Label);
        Global.UIHelper.addCommonClick(this.node, "content/taskBtn", this.showTipLbl, this);
        this.rawTopsPos = this.taskTips.position;
    }

    private onTouchBgCLick(){
        this.closeTips();
    }

    private closeTips() {
        this.taskTips.active = false;
        this.touchBgNode.active = false;
        this.unscheduleAllCallbacks();
    }

    /**
     * 初始化
     * @param dir 1向右 -1向左
     */
    public initTask(dir: number) {
        if (dir == Directiton.Left) {
            this.taskTips.setPosition(cc.v3(-this.rawTopsPos.x, this.rawTopsPos.y));
            this.taskTips.scaleX = 1;
            this.taskTipLbl.node.scaleX = 1;
            this.taskTipLbl.node.anchorX = 1;
        }
        else if (dir == Directiton.Right) {
            this.taskTips.setPosition(cc.v3(this.rawTopsPos.x, this.rawTopsPos.y));
            this.taskTips.scaleX = -1;
            this.taskTipLbl.node.scaleX = -1;
            this.taskTipLbl.node.anchorX = 0;
        }
    }

    // 显示任务的信息
    private showTipLbl() {
        this.taskTips.active = true;
        this.touchBgNode.active = true;
        this.setTipsWidth();

        this.unscheduleAllCallbacks();
        this.scheduleOnce(() => {
            this.closeTips();
        }, 5);
        
        if (this.isTargetFinish){
            let str = "请前往财神到页面领取奖励！";
            Global.UI.fastTip(str);
        }
    }

    protected onDisable(){
        this.unscheduleAllCallbacks();
    }

    public updateTask(data: any){
        this.taskTipLbl.string = "任务说明:" + data.task_desc;
        this.taskLbl.string = `${data.task_self_num}/${data.task_num}`;
        if (data.task_status != 2) {        // 2已领取
            this.showContent(true);
        }
        else{
            this.showContent(false);
        }
        if (data.task_self_num == data.task_num && data.task_num > 0 || data.task_status == 1){     // 1已完成未领取
            this.isTargetFinish = true;
        }
        else
            this.isTargetFinish = false;
    }

    public showContent(flag: boolean){
        this.showNode.active = flag;
    }

    private setTipsWidth() {
        let lblWidth = this.taskTipLbl.node.width;
        this.taskTips.width = lblWidth + this.tipsOffsetWidth;
    }
}