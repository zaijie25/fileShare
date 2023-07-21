
const {ccclass, property} = cc._decorator;

@ccclass
export default class WifiComp extends cc.Component {

    stateSpriteArr: cc.Node[] = [];
    EventString = ""
    msLabel:cc.RichText;
    onLoad()
    {
        for (let index = 0; index < 3; index++) 
        {
            this.stateSpriteArr[index] = cc.find("state"+(index+1),this.node)
            this.stateSpriteArr[index].active = false
        }
        this.msLabel = cc.find("msLabel",this.node).getComponent(cc.RichText);
        this.msLabel.node.active = false;
    }
    init(type)
    {
        if(type == 1)
        {
            this.EventString = GlobalEvent.RefreshHallNetCost
        }
        else if(type == 2)
        {
            this.EventString = GlobalEvent.RefreshGameNetCost
        }

    }

    startListen()
    {
        Global.Event.on(this.EventString ,this,this.refreshState)
    }
    refreshState(ms) {
        if(!this.stateSpriteArr || this.stateSpriteArr.length == 0)
        {
            return
        }
        if(ms <= 300)
        {
            this.msLabel.node.color = new cc.Color().fromHEX("#9DD500");
            this.stateSpriteArr[0].active = true
            this.stateSpriteArr[1].active = false
            this.stateSpriteArr[2].active = false
        }
        else if(ms>300 && ms<=700)
        {
            this.msLabel.node.color = new cc.Color().fromHEX("#FFE500");
            this.stateSpriteArr[0].active = false
            this.stateSpriteArr[1].active = true
            this.stateSpriteArr[2].active = false
        }
        else
        {
            this.msLabel.node.color = new cc.Color().fromHEX("#FF0000");
            this.stateSpriteArr[0].active = false
            this.stateSpriteArr[1].active = false
            this.stateSpriteArr[2].active = true
        }
        this.msLabel.node.active = true;
        this.msLabel.string =`<b>${ms}ms</b>`
    }

    onDestroy()
    {
        Global.Event.off(this.EventString,this,this.refreshState)
        this.stateSpriteArr = []
    }
    // update (dt) {}
}
