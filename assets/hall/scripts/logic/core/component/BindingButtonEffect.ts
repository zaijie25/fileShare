// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, menu,disallowMultiple,property} = cc._decorator;

@ccclass
@disallowMultiple()
@menu('自定义组件/BindingButtonEffect')
export default class BindingButtonEffect extends cc.Component {


    private _fromScale = cc.Vec2.ZERO;
    private _toScale = cc.Vec2.ZERO;

    private _transitionFinished = true

    private transition = 3

    private _duration = 0.1

    private time = 0

   

    update(dt)
    {
        if (this.transition !== 3) return;
        if (this._transitionFinished) return;
        this.time += dt;
        let ratio = 1.0;
        if (this._duration > 0) {
            ratio = this.time / this._duration;
        }

        // clamp ratio
        if (ratio >= 1) {
            ratio = 1;
        }
        // Skip if _originalScale is invalid
        this.node.scale = this._fromScale.lerp(this._toScale, ratio).x;


        if (ratio === 1) {
            this._transitionFinished = true;
        }
    }

    public set toScale(value)
    {
        this._toScale = value
    }

    public set fromScale(value)
    {
        this._fromScale = value
    }

    public set transitionFinished(value)
    {
        this._transitionFinished = value
    }

    public set Time(value)
    {
        this.time = value
    }

    public set Duration(value)
    {
        this._duration = value
    }


    // update (dt) {}
}
