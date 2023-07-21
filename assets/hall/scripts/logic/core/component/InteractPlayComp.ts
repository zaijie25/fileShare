import ViewBase from "../ui/ViewBase";
import GameBasePool from "../tool/GameBasePool";

const InteractCfg = {
    '0': { prefab: '1', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_meigui01', soundNameEnd: null },
    '1': { prefab: '2', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_jidan01', soundNameEnd: null },
    '2': { prefab: '3', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_ganbei01', soundNameEnd: null },
    '3': { prefab: '4', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_woshou01', soundNameEnd: null },
    '4': { prefab: '5', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_daocha01', soundNameEnd: null },
    '5': { prefab: '6', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_maobi01', soundNameEnd: null },
    '6': { prefab: '7', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_bingtong01', soundNameEnd: null },
    '7': { prefab: '8', soundDelay: 0, secondSoundDelay: 2, time: 2, soundNameStart: 'hall/sound/interact/hd_dapao01', soundNameEnd: 'hall/sound/interact/hd_dapao01_end' },
};

export default class InteractPlayComp extends cc.Component {
    private poolMap: { [key: string]: InteractPool } = {};
    private playingMap: { [owner: string]: any[] } = {};
    private animView: cc.Node;

    onLoad() {
        let poolNode = cc.find("pool", this.node);
        poolNode.active = false;
        for (let key in InteractCfg) {
            let copyNode = cc.find(`pool/${InteractCfg[key]['prefab']}`, this.node);
            this.poolMap[key] = new InteractPool(poolNode, copyNode, key);
        }
        this.animView = cc.find("animView", this.node);
    }

    public playAct(key: string, fWPos: cc.Vec3, tWPos: cc.Vec3, localSeat: number) {
        let owner = String(localSeat);
        let actionItem = this.poolMap[key].getItem();
        actionItem.active = true;
        actionItem.node.setParent(this.animView);

        if (!this.playingMap[owner])
            this.playingMap[owner] = [];
        this.playingMap[owner].push(actionItem);

        let soundDelay = InteractCfg[key]['soundDelay'];
        let secondSoundDelay = InteractCfg[key]['secondSoundDelay'];
        let time = InteractCfg[key]['time'];
        actionItem.showMoveAnim(fWPos, tWPos);

        let tween = new cc.Tween(actionItem.node);
        tween.delay(soundDelay)
            .call(() => {
                if (InteractCfg[key]['soundNameStart'])
                    Global.Audio.playSound(InteractCfg[key]['soundNameStart']);
            })
            .delay(secondSoundDelay)
            .call(() => {
                actionItem.showSkAnim(tWPos);
                if (InteractCfg[key]['soundNameEnd']) {
                    Global.Audio.playSound(InteractCfg[key]['soundNameEnd']);
                }
            })
            .delay(time)
            .call(() => {
                this.poolMap[key].recycleItem(actionItem);
                let index = this.playingMap[owner].indexOf(actionItem);
                if (index > -1)
                    this.playingMap[owner].splice(index, 1);
            })
            .start();
    }

    public clearOneOwner(owner: string) {
        let itemArr = this.playingMap[owner];
        if (itemArr && !Global.Toolkit.isEmptyObject(itemArr)) {
            itemArr.forEach(item => {
                let pool = this.poolMap[item.key];
                pool.recycleItem(item);
            });
            this.playingMap[owner] = [];
        }
    }

    public clearAllOwner() {
        for (let owner in this.playingMap) {
            this.clearOneOwner(owner);
        }
    }
}

class InteractPool extends GameBasePool<ActionItem>{
    constructor(protected root: cc.Node, private copyNode: cc.Node, private key: string) {
        super(root);
    }
    protected get preCount() {
        return 5;
    }

    protected get everyCount() {
        return 5;
    }

    protected createItem() {
        let node = cc.instantiate(this.copyNode);
        return new ActionItem(node, this.key);
    }

    protected resetItem(item: ActionItem) {
        item.node.setParent(this.root);
        item.active = false;
        item.reset();
    }
}

class ActionItem extends ViewBase {
    private spNode: cc.Node;
    private sk: sp.Skeleton;
    private skstart: sp.Skeleton;
    constructor(node: cc.Node, public key: string) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.spNode = this.getChild('sp');
        this.sk = <sp.Skeleton>this.getComponent('sk', sp.Skeleton);
        this.sk.setCompleteListener(() => {
            this.sk.node.active = false;
        })
        this.skstart = <sp.Skeleton>this.getComponent('skstart', sp.Skeleton);
        this.skstart.setCompleteListener(() => {
            this.skstart.node.active = false;
        })
    }

    public showMoveAnim(fromWolrdPos: cc.Vec3, toWorldPos: cc.Vec3, time: number = 1) {
        let fPos = this.spNode.parent.convertToNodeSpaceAR(fromWolrdPos);
        let tPos = this.spNode.parent.convertToNodeSpaceAR(toWorldPos);
        this.spNode.active = true;
        this.spNode.setPosition(fPos);

        this.skstart.node.setPosition(fPos);
        this.skstart.node.active = true;
        this.skstart.setAnimation(0, 'idle', false);

        let tween = new cc.Tween(this.spNode);
        tween.to(time, { position: tPos }, cc.easeCubicActionOut())
            .call(() => {
                this.spNode.active = false;
            })
            .start();
    }

    public showSkAnim(toWorldPos: cc.Vec3) {
        let tPos = this.sk.node.parent.convertToNodeSpaceAR(toWorldPos);
        this.sk.node.setPosition(tPos);
        this.sk.node.active = true;
        this.sk.setAnimation(0, 'idle', false);
    }

    public reset() {
        this.spNode.stopAllActions();   // debug 回收强制停止节点所有动作
        this.node.stopAllActions();
        this.spNode.active = false;
        this.sk.node.active = false;
        this.skstart.node.active = false;
        this.active = false;
    }
}