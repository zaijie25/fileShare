// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class EventComp extends cc.Component {

    public disableCallback:Function;
    public destroyCallback:Function;
    public target:any;
        
    start () {

    }

    clickLink(event, param)
    {
        if(param != null && param != "")
            cc.sys.openURL(Global.Toolkit.DealWithUrl(param));
    }

    onDisable()
    {
        if(this.disableCallback)
            this.disableCallback.call(this.target);
    }

    onDestroy()
    {
        if(this.destroyCallback)
            this.destroyCallback.call(this.target);
    }

}
