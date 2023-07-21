import BindingButtonEffect from "./BindingButtonEffect";


const {ccclass,property, disallowMultiple, menu, executionOrder, requireComponent} = cc._decorator;
@ccclass
@disallowMultiple()
@menu('自定义组件/buttonPlus')
export default class ButtonPlus extends cc.Button {

    public bindedObject:BindingButtonEffect[] = []
    //点击时间间隔
    public CLICK_INTERVAL = 0.2;
    //是否启用时间间隔
    public enableClickInterval = true;

    private _isClickValid = true;

    public set isClickValid(value)
    {
        this._isClickValid = value;
    }

    public get isClickValid()
    {
        return this._isClickValid || (!this.enableClickInterval);
    }

   
    setBind(args)
    {
        this.bindedObject = this.bindedObject.concat(args)
    }
   
    _onTouchCancel () {
       super._onTouchCancel()
       this.setParam()
    }

    // _onMouseMoveIn () {
    //     super._onMouseMoveIn()
    //     this.setParam()
    // }

    // _onMouseMoveOut () {
    //     super._onMouseMoveOut()
    //     this.setParam()
    // }

    _onTouchBegan (event) {
        super._onTouchBegan(event)
        this.setParam()
    }

    _onTouchEnded(event)
    {
        super._onTouchEnded(event)
        this.setParam()
    }

    setParam()
    {
        for (let index = 0; index < this.bindedObject.length; index++) {
            let obj = this.bindedObject[index];

            obj.toScale = this._toScale
            obj.fromScale = this._fromScale
            obj.transitionFinished = this._transitionFinished
            obj.Time = this.time
            obj.Duration = this.duration
        }

    }

}
