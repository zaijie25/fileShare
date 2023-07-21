import ViewBase from "../ui/ViewBase";

/**
 * 其他玩家信息tip界面 控制组件
 */
export default class InteractHeadTipComp extends cc.Component {
    private contentNode: cc.Node;
    private headtipNode: cc.Node
    private coinLbl: cc.Label;
    private nameLbl: cc.Label;
    private idLbl: cc.Label;
    private headImgSp: cc.Sprite;
    private headBoxSp: cc.Sprite;

    private curSeat: number = -1;

    public interactChooseView: InteractChooseView;

    private time = 5;

    private _needHeadTip: boolean = false;

    onLoad() {
        this.contentNode = cc.find("content", this.node);
        this.headtipNode = cc.find("content/headtip", this.node);
        this.coinLbl = cc.find("coinLbl", this.headtipNode).getComponent(cc.Label)
        this.nameLbl = cc.find("nameLbl", this.headtipNode).getComponent(cc.Label)
        this.idLbl = cc.find("idLbl", this.headtipNode).getComponent(cc.Label)
        this.headImgSp = cc.find("mask/sprite_head", this.headtipNode).getComponent(cc.Sprite)
        this.headBoxSp = cc.find("head_kuang", this.headtipNode).getComponent(cc.Sprite)
        let touchNode = cc.find("content/touchBg", this.node);
        touchNode.on(cc.Node.EventType.TOUCH_END, this.hideView, this);
        touchNode._touchListener.setSwallowTouches(false)

        this.interactChooseView = new InteractChooseView();
        this.interactChooseView.setNode(cc.find("content/actView", this.node));
        this.interactChooseView.active = true;
        this.interactChooseView.setFatherFuntion(this)
    }

    private hideView() {
        this.node.active = false;
    }

    protected onDestroy() {
        this.node.stopAllActions();
        this.curSeat = -1;
    }

    public set needHeadTip(bool: boolean) {
        this._needHeadTip = bool;
    }

    public get needHeadTip() {
        return this._needHeadTip;
    }

    public showHeadView(isShow: boolean, localSeat: number, worldPos: cc.Vec3 = cc.Vec3.ZERO, data: any) {
        if (isShow) {
            this.curSeat = localSeat;
            let pos = this.contentNode.parent.convertToNodeSpaceAR(worldPos);
            this.node.active = true;
            this.contentNode.position = pos;
            this.headtipNode.active = this.needHeadTip;
            if (this.needHeadTip) {
                this.updateContent(localSeat, data);
                this.interactChooseView.sChair = data._chair;
            }
            else {
                this.interactChooseView.sChair = data.chair;
            }
            this.closeTips(5);
            this.interactChooseView.setPlayerData(data);
        }
        else {
            if (this.curSeat == localSeat)
                this.hideView();
        }
    }

    public closeTips(num: number) {
        this.time = num
    }

    update(dt) {
        this.time -= dt;
        if (this.time <= 0) {
            this.node.stopAllActions();
            this.node.active = false;
        }
    }

    private updateContent(localSeat: number, userData: any) {
        if (!userData)
            return;
        let name = userData.nickname
        let point = userData.point;
        let id = userData._uid;
        let head = userData.headimg;

        this.nameLbl.string = name;
        this.updatePoint(localSeat, point);
        let [w, h] = [this.headImgSp.node.width, this.headImgSp.node.height];
        this.headImgSp.spriteFrame = Global.Toolkit.getLocalHeadSf(head);
        Global.Toolkit.loadLocalHeadFrameByGames(this.headBoxSp, userData.a_box);
        this.headImgSp.node.setContentSize(w, h);
        this.idLbl.string = "ID:" + id;
    }

    public updatePoint(localSeat: number, point: any) {
        if (this.node.active == true && this.curSeat == localSeat)
            this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    }
}

const InteractCD = 2;
class InteractChooseView extends ViewBase {
    private _chair: number;
    private lastSendTime = 0;
    static readonly CmdChat = "chat";        // 聊天 表情和文字
    public selfSrc = -1;
    private headtipsView: InteractHeadTipComp;
    showvipList = [0, 0, 0, 0, 10, 11, 12, 13]
    /** 玩家数据集合 */
    private playerData: any;

    public setPlayerData(data: any) {
        this.playerData = data
    }

    public setSelfSrc(num: number) {
        this.selfSrc = num
    }

    public setFatherFuntion(node: InteractHeadTipComp) {
        this.headtipsView = node
    }

    public set sChair(chair: number) {
        this._chair = chair;
    }

    public get sChair() {
        return this._chair;
    }

    initView() {
        for (let i = 0; i < 8; i++) {
            let node = cc.find('content/' + i, this.node);
            new InteractItem(node, i, this.onInteractClick, this);
            let tip = cc.find("tip", node)
            tip.active = false;
            if (Global.PlayerData.vip < this.showvipList[i]) {
                tip.active = true;
            }
        }
    }

    private onInteractClick(index: number) {
        this.headtipsView.closeTips(0);
        if (Global.PlayerData.vip < this.showvipList[index]) {
           return Global.UI.fastTip('您的vip等级不足以使用该表情');
        }
        if (this.playerData._rchair && this.playerData._rchair === this.selfSrc) {
            return Global.UI.fastTip('不能给自己发送互动表情哦！');
        }

        let curTime = Date.now();
        if (curTime - this.lastSendTime <= InteractCD * 1000) {
            return Global.UI.fastTip('您太急啦～喝口茶稍等一下吧～');
        }
        if (this.sChair != null) {
            this.sendChatReq(index, this.sChair);
            // this.active = false;
            this.lastSendTime = curTime;
        }
    }

    private sendChatReq(content: number, chair: number) {
        let from_chair = this.selfSrc;
        if (this.playerData && this.playerData._rchair === this.selfSrc) {
            from_chair = Number(this.playerData._chair);
        }
        let param = {
            emoji: content,
            ctype: 1,
            to_chair: chair,
            from_chair: from_chair
        }
        Game.Server.send(InteractChooseView.CmdChat, param);
    }

    onClose() {
        this.sChair = null;
    }

    public reset() {
        this.lastSendTime = 0;
    }
}

class InteractItem extends ViewBase {
    constructor(node: cc.Node, private index: number, private callback: Function, private target: any) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.getChild('').on('click', this.onItemClick, this);
    }

    private onItemClick() {
        if (this.callback && this.target) {
            this.callback.call(this.target, this.index);
        }
    }
}