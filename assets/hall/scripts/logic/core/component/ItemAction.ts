

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemAction extends cc.Component {

    onEnable()
    {
        if(!cc.isValid(this.node)) return
        var action = cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.7, 1.2, 1.2),
                cc.scaleTo(0.7, 0.9, 0.9)
            )
        );
        this.node.runAction(action);
    }

    onDisable()
    {
        if(!cc.isValid(this.node)) return
        this.node.stopAllActions();
    }



    // update (dt) {}
}
