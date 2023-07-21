

const {ccclass, property} = cc._decorator;

@ccclass
export default class ServiceLeftItem extends cc.Component {

    @property(cc.Label)
    BackgroundTxt: cc.Label = null;

    @property(cc.Label)
    CheckTxt: cc.Label = null;

    @property(cc.Sprite)
    Unread: cc.Sprite = null;
    @property(cc.Sprite)
    CheckSprite: cc.Sprite = null;
    @property(cc.Sprite)
    UnCheckSprite: cc.Sprite = null;
    @property(cc.Toggle)
    toggle: cc.Toggle = null;
    @property(cc.Sprite)
    typeSprite: cc.Sprite = null;
    data: any;
    private _entityData: any;

    close(){
        this.node.active = false
    }
    // update (dt) {}
    public getGameData() {
        return this.data;
    }
    public onInit(data: any) {
        this.data = data;
        this.initView()
    }
    initView() {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.data.name)
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name)
        // this.toggle.isChecked =false
        // this.toggle.uncheck()
    }
    public SetToggleChecked(flag){
        this.toggle.isChecked =flag;
        if(flag)
        {
            this.toggle.check();
        }
        else
        {
            this.toggle.uncheck();
        }
            
    }

}
