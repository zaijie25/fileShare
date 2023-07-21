

const {ccclass, property} = cc._decorator;

@ccclass
export default class FeedbackLeftItem extends cc.Component {

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
    nameData: any;
    private _entityData: any;

    close(){
        this.node.active = false
    }
    // update (dt) {}
    public getGameData() {
        return this.nameData;
    }
    public onInit(data: any) {
        this.nameData = data;
        this.initView()
    }
    initView() {
        this.BackgroundTxt.string = Global.Toolkit.removeEmoji(this.nameData)
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.nameData)
        this.toggle.isChecked =false
        this.toggle.uncheck()
    }
    public SetBackgroundChecked(state:boolean){
        this.CheckSprite.node.active = state
        this.UnCheckSprite.node.active = !state
    }
    public SetTypeSprite(path,name=""){
        if(this.typeSprite && cc.isValid(this.typeSprite) && this.typeSprite.node != null)
        {
            if(name !=""){
                this.typeSprite.node.active = true;
                Global.ResourceManager.loadAutoAtlas(this.typeSprite,path, name,null,false);
            }else{
                this.typeSprite.node.active = false;
            }
        }
    }
    public SetToggleChecked(){
        this.toggle.isChecked =true;
        this.toggle.check();
    }
    public SetUnReadActiveState(state:boolean){
        this.Unread.node.active = state
    }

    public set entityData(data){
        this._entityData = data;
        if(this._entityData.red_status != undefined)
            this.SetUnReadActiveState(this._entityData.red_status === 0);
    }

    public get entityData(){
        return this._entityData;
    }
}
