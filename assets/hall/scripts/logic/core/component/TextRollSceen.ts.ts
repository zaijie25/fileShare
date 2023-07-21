const {ccclass, property} = cc._decorator;

@ccclass
export default class TextRollSceen extends cc.Component {
    private showText: cc.Label;
    private showOrderArr = [];
    private index = 0;
    private timeInterval = 6;
    private changeTime = 1;

    onLoad(){
        this.showText = cc.find("txt", this.node).getComponent(cc.Label);
    }

    // 有需求再优化通用
    start(){
        if(window["Global"] == null)
        {
            Logger.error("global is null")
            return;
        }
        if(Global.Setting.SkinConfig && Global.Setting.SkinConfig.loadedFinish)
            this.startRun();
        else
            Global.Event.once(GlobalEvent.SkinConfigLoadFinish, this, this.startRun)
    }


    private startRun()
    {
        this.showOrderArr = Global.Toolkit.getOutOrderArray(Global.Setting.SkinConfig.loadingTips);
        this.setShowText(this.showOrderArr[this.index]);
        this.schedule(this.onTimerUpdate, this.timeInterval);
    }

    private setShowText(str: string = ''){
        if(this.showText == null)
            return;
        this.showText.string = str;
        this.scheduleOnce(()=>{
            if(this.node.isValid)
                this.node.width = this.showText.node.width + 200;
        }, 0)
        // let len = Global.Toolkit.getTotalBytes(str);
        // this.node.width = len * 15 + 80;
    }

    private onTimerUpdate(){
        this.index++;
        let fadeOutAc = cc.fadeTo(this.changeTime / 2, 30);
        let funcAc = cc.callFunc(()=>{
            this.setShowText(this.showOrderArr[this.index]);
        }, this);
        let fadeInAc = cc.fadeTo(this.changeTime / 2, 255);
        this.node.runAction(cc.sequence(fadeOutAc, funcAc, fadeInAc));
        if (this.index == this.showOrderArr.length-1){
            this.index = 0;
        }
    }

    onDestroy(){
        this.node.stopAllActions();
        this.unschedule(this.onTimerUpdate);
    }
}
