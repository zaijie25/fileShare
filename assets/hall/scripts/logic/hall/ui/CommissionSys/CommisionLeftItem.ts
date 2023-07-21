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
export default class CommisionLeftItem extends cc.Component {

    @property(cc.Label)
    BackgroundTxt: cc.Label = null;
   

    @property(cc.Label)
    CheckTxt: cc.Label = null;
   
    @property(cc.Sprite)
    CheckSprite: cc.Sprite = null;
    @property(cc.Sprite)
    UnCheckSprite: cc.Sprite = null;
    @property(cc.Toggle)
    toggle: cc.Toggle = null;

    @property(cc.Node)
    Unread: cc.Node = null;

    data: any;

    // @property(cc.Sprite)
    // BackGroundSprite:cc.Sprite = null;

    // @property(cc.Sprite)
    // ClickSprite:cc.Sprite = null;

    private bgFontSize;
    private checkFontSize;
    private maxCharCount = 6;

    private atlasPath = "hall/texture/CommisionIcon/CommisionIcon";

    onLoad()
    {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize ;
        
    }

    close()
    {
        this.node.active = false
    }
    // update (dt) {}
    public getData() {
        return this.data;
    }
    public onInit(data: any) {
        this.data = data;
        this.initView()
    }
    initView() {
        // this.BackgroundTxt.fontSize = this.bgFontSize;
        // this.CheckTxt.fontSize = this.checkFontSize;

        this.BackgroundTxt.string =  Global.Toolkit.removeEmoji(this.data.name)
        this.CheckTxt.string = Global.Toolkit.removeEmoji(this.data.name)
        // this.changeBtnSprite(this.BackGroundSprite,this.ClickSprite,this.data.global_task_type);
 
        this.SetUnReadActiveState(this.data.task_num > 0)
        this.toggle.isChecked =false
        this.toggle.uncheck()

        
    }

    public SetUnReadActiveState(state:boolean)
    {
        this.Unread.active = state
    }

    private adjustLabelLength(label, fontSize)
    {
        if(label == null)
            return;
        let maxLength = fontSize * this.maxCharCount
        if(label.node.width <= maxLength)
            return;
        label.fontSize = Math.floor(maxLength / label.node.width * fontSize);
    }

    public SetBackgroundChecked(state:boolean)
    {
        this.CheckSprite.node.active = state
        this.UnCheckSprite.node.active = !state
      
    }
    public SetToggleChecked()
    {
        this.toggle.isChecked =true
        this.toggle.check()
      
    }

    private changeBtnSprite(bsp:cc.Sprite,csp:cc.Sprite,taskType:number) {
        Global.ResourceManager.loadAutoAtlas(bsp, this.atlasPath, `btn_${taskType}_b`, null, false);
        Global.ResourceManager.loadAutoAtlas(csp, this.atlasPath, `btn_${taskType}_t`, null, false);
    }
   
}
