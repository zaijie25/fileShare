import GameBasePool from "../tool/GameBasePool";
import PoolBase from "../tool/PoolBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdmissionBoxComp extends cc.Component {
    private showNode: cc.Node;

    //当前是否播放入场通告
    private isPlaying: boolean = false;

    //轮询Timer
    private checkTimer = null;

    //消息缓存队列
    private msgDataCacheList = [];
    //消息队列缓存长度限制
    private listLengthLimit = 8;

    //所有优先级的总长度
    private totalLenghLimit = 10;

    private layout: cc.Node;

    private ItemPool: copyPool;

    onLoad() {
        this.showNode = cc.find("showNode", this.node)
        this.layout = cc.find("Layout", this.node)
        this.layout.active = false;
        this.node.opacity = 0;
        this.ItemPool = new copyPool(cc.find("pool", this.node), this.layout)
    }

    updateUseInfo(str: cc.Label) {
        let lab = "</color><color=#00ff00>" + str + "</color><color=#ffffff>"
        return lab;
    }

    public init() {
        this.startTimer();
    }

    //界面销毁
    protected onDestroy() {
        this.stopTimer();
    }

    onEnable() {
        this.isPlaying = false;
        this.reset()
        this.startTimer();
    }

    onDisable() {
        this.stopTimer();
    }

    startTimer() {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);
            Global.Event.on(GlobalEvent.VIPADMISSION, this, this.addMsgData);
        }
    }

    stopTimer() {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.VIPADMISSION, this, this.addMsgData);
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    }

    reset() {
        this.node.stopAllActions();
        this.isPlaying = false;
    }

    private checkMsgList() {
        try {
            if (!this.node || !this.node.isValid)
                return;
            if (this.isPlaying) return;

            if (this.msgDataCacheList.length == 0) {
                this.node.opacity = 0;
                return;
            }
            var data = this.msgDataCacheList.shift();
            var msgStr = "";
            var msgVip = 0;
            if (data.nickname != null) {
                let name = data.name;//玩家名字
                let vip = data.vip;//玩家等级
                msgStr = this.updateUseInfo(name);
                msgVip = vip;
            } else {
                msgStr = data.name;
                msgVip = data.vip;
            }
            this.playAnim(true, msgVip, msgStr);
        } catch (error) {
        }
    }

    private playAnim(play: boolean, vip: number, name: string) {
        if (play) {
            let node = this.getItem(vip, name)
            Global.Component.scheduleOnce(() => {
                this.recoveryItem(node)
            }, 3)
            this.isPlaying = true;
            this.node.opacity = 255;
        }
    }

    /**
     * 新建一个预制体
     * @param vip 
     * @param name 
     */
    private getItem(vip: number, name: string) {
        let node = this.ItemPool.getItem();
        let vipSp = cc.find("vipSp", node).getComponent(cc.Sprite)
        let nameLab = cc.find("name", node).getComponent(cc.RichText)
        let vipSk1 = cc.find("vipsmall1", vipSp.node)
        let vipSk2 = cc.find("vipsmall2", vipSp.node)
        if (nameLab) {
            //设置richtext的属性
            nameLab.node.anchorX = 0;
            nameLab.node.anchorY = this.node.anchorY;
            nameLab.horizontalAlign = cc.macro.TextAlignment.LEFT;
            nameLab.fontSize = 26;
            nameLab.useSystemFont = true;
            nameLab.fontFamily = "Microsoft Yahei";
            nameLab.maxWidth = 0;
            nameLab.lineHeight = this.node.height;
            nameLab.handleTouchEvent = true;
            nameLab.string = name;
        }
        if (vipSp) {
            var atlasString = "hall/texture/admissionBox/admissionBox_Atlas";
            Global.ResourceManager.loadAutoAtlas(vipSp, atlasString, "v" + vip.toString(), null, false);
            if (vip >= 7 && vip < 10) {
                vipSk1.active = true;
            } else if (vip >= 10) {
                vipSk2.active = true;
            }
            else {
                vipSk1.active = false;
                vipSk2.active = false;
            }
        }
        node.y = 0;
        node.active = true;
        node.setParent(this.showNode)
        return node
    }

    /**回收 */
    private recoveryItem(reitem: cc.Node) {
        reitem.active = false;
        this.isPlaying = false;
        this.ItemPool.recycleItem(reitem);
    }

    private addMsgData(msg: any) {
        this.addMsgItem(msg);
    }

    /**
     * 添加数据
     * @param data {
            msg,
            type,
     * }
     */
    protected addMsgItem(data: any) {
        if (this.node == null || !this.node.isValid) {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if (this.msgDataCacheList.length >= this.totalLenghLimit) {
            return;
        }
        //当数据大于8时，优先插入高优先级数据
        if (this.msgDataCacheList.length >= this.listLengthLimit) {
            if (data.clientPriority != null && data.clientPriority == 0 && data.nickname != null) {
                return;
            }
        }
        this.msgDataCacheList.push(data);
    }
}

class copyPool extends PoolBase {
    constructor(private rootNode: cc.Node, private copyNode: cc.Node) {
        super();
    }
    protected get preCount() {
        return 60;
    }

    protected get everyCount() {
        return 30;
    }

    protected createItem() {
        let node: cc.Node = cc.instantiate(this.copyNode);
        node.active = true;
        return node;
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null);
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr);
    }
}
