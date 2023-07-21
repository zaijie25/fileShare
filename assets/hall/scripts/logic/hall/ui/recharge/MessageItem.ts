


const { ccclass, property } = cc._decorator;

@ccclass
export default class MessageItem extends cc.Component {

    @property([cc.SpriteFrame])
    spriteList: Array<cc.SpriteFrame> = [];

    @property([cc.String])
    stringList: Array<string> = [];

    @property(cc.Sprite)
    iconSprite: cc.Sprite = null;

    @property(cc.Label)
    iconName: cc.Label = null;

    @property(cc.Label)
    messageLabel: cc.Label = null;

    private _isRechargePanel: boolean = false;
    private _isMyself: boolean = false;
    private _isOther: boolean = false;
    private holdTime = 0;    //用来检测长按
    private holdClick = false;  //用来检测点击

    /* @property(cc.Label)
    servicerName: cc.Label = null;

    @property([cc.SpriteFrame])
    btnSpriteList : Array<cc.SpriteFrame> = []; */

    /* private data : any = null;
    private btn_RichText: cc.RichText;
    private btnSprite: cc.Sprite;
    // private btn_Label: cc.Label;
    private isOnlineServicer: boolean = false; */

    public get isRechargePanel(): boolean {
        return this._isRechargePanel;
    }

    public set isRechargePanel(isPanrel: boolean) {
        this._isRechargePanel = isPanrel;
    }

    public get isMyself(): boolean {
        return this._isMyself;
    }

    public set isMyself(isMyself: boolean) {
        this._isMyself = isMyself;
    }

    public get isOther(): boolean {
        return this._isOther;
    }

    public set isOther(isOther: boolean) {
        this._isOther = isOther;
    }

    reset() {

    }

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);

    }

    touchStart() {
        this.holdClick = true;
        this.holdTime = 0;
    }

    touchEnd() {
        this.holdClick = false;
        //开始记录时间
        this.holdTime = 0;
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }

    update(dt) {
        if (this.holdClick) {
            this.holdTime += dt;
            if (this.holdTime > 1500) {
                //如果长按时间大于1.5s，则认为长按了1.5s
                this.holdTime = 1500;
                let msg = this.messageLabel.string;
                if (msg && msg != null) {
                    this.ServicerBtnFunc(msg);
                }
            }
        }

    }

    public setData(data: any) {

    }

    copyTextToClipboardCallBack(retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("已复制到剪贴板");
        } else {
            Global.UI.fastTip("复制失败");
        }
    }

    //复制消息
    ServicerBtnFunc(str: string) {
        Global.NativeEvent.copyTextToClipboard(str, this.copyTextToClipboardCallBack.bind(this));
    }
}
