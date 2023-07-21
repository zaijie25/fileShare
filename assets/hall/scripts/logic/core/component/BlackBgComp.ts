import WndBase from "../ui/WndBase";

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
export default class BlackBgComp extends cc.Component {

    public window:WndBase;
    private clickEnable;

    onLoad()
    {
        this.node.on(cc.Node.EventType.TOUCH_END, ()=>{
            if(this.window && this.window.active && cc.isValid(this.window.node) && this.window.close)
            {
                if(this.clickEnable)
                {
                    // this.window.close();
                    this.clickEnable = false;
                }
            }
        }, this)
    }

    onEnable()
    {
        this.clickEnable = true;
    }

    onDestroy()
    {
        this.node.targetOff(this)
    }
}
