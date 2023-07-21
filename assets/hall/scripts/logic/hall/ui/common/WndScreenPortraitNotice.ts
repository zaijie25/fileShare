/**
 * 横竖版转换提示UI
 */
import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndScreenPortraitNotice extends WndBase
{
    /** 背景的Sprite */
    private bgSprite:cc.Sprite = null;

    /** 竖屏提示动画 */
    private noticeSpine:sp.Skeleton = null;

    /** 动画播放完成后的回调 */
    private finishCallBack:Function = null;

    /** 界面显示时长 */
    private showTime:number = 0;

    /** 界面开始显示时间 */
    private beginShowTick:number = 0;

    protected onInit()
    {
        this.name = "WndScreenPortraitNotice";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ScreenPortraitNoticeUI";
        this.showBg = false;
        this.destoryType = DestoryType.None;
    }

    protected initView()
    {
        this.bgSprite = this.getComponent("bg", cc.Sprite);
        if(this.bgSprite == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.bgSprite == null");
        }

        this.noticeSpine = this.getComponent("content/spineNode", sp.Skeleton);
        if(this.noticeSpine == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.noticeSpine == null");
        }
    }

    /**
     * @param {Function} finishCallBack
     * @param {number} showTime
     * @memberof WndScreenPortraitNotice
     */
    protected onOpen()
    {
        let self = this;

        if(this.args == null || this.args.length == 0) {
            Logger.error("WndScreenPortraitNotice::onOpen() 没有设置参数");
            this.close();
            return;
        }

        let finishCallBack = this.args[0];
        if(finishCallBack == null || finishCallBack == "") {
            Logger.error("WndScreenPortraitNotice::onOpen() finishCallBack = null");
            this.close();
            return;
        }
        this.finishCallBack = finishCallBack;

        let showTime = this.args[1];
        showTime = (!showTime || showTime <= 0) ? 0 : showTime;
        showTime = (showTime > 10) ? 10 : showTime;
        this.showTime = showTime;
        // Logger.error("WndScreenPortraitNotice::onOpen() this.showTime = " + this.showTime);

        if(this.showTime > 0 && this.bgSprite) {
            this.beginShowTick = Date.now();
            this.bgSprite.schedule(()=>{
                self.checkTimer();
            }, 0.1);
        }

        if(this.noticeSpine) {
            let loop = (this.showTime > 0);
            let animName = "idle";
            this.noticeSpine.clearTrack(0);
            this.noticeSpine.addAnimation(0, animName, loop);
            if(!loop) {
                this.noticeSpine.setCompleteListener((trackEntry:any)=>{
                    let name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === animName) {    
                        if(self.finishCallBack) {
                            self.finishCallBack();
                        }
                        self.close();
                    }
                });
            }
        }
    }

    /** 时间检查 */
    private checkTimer() {
        // Logger.error("WndScreenPortraitNotice::checkTimer() this.showTime = " + this.showTime);
        if((Date.now() - this.beginShowTick) >= this.showTime* 1000) {
            if(this.finishCallBack) {
                this.finishCallBack();
            }

            this.bgSprite.unscheduleAllCallbacks();
            this.close();
        }
    }
}