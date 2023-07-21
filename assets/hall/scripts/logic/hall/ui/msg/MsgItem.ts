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
export default class MsgItem extends cc.Component {

    @property(cc.Label)
    BackgroundTxt: cc.Label = null;
    @property(cc.Label)
    BackgroundTxt1: cc.Label = null;

    @property(cc.Label)
    CheckTxt: cc.Label = null;
    @property(cc.Label)
    CheckTxt1: cc.Label = null;

    @property(cc.Sprite)
    Unread: cc.Sprite = null;
    @property(cc.Sprite)
    CheckSprite: cc.Sprite = null;
    @property(cc.Sprite)
    UnCheckSprite: cc.Sprite = null;
    @property(cc.Toggle)
    toggle: cc.Toggle = null;
    gameData: any;

    private bgFontSize;
    private bg1FontSize;
    private checkFontSize;
    private check1FontSize;
    private maxCharCount = 6;

    ColorStr1 = "<outline color=#445cb5 width=2><b>%s</b></outline>" //back1
    ColorStr2 = "<outline color=#6C3DD8 width=2><b>%s</b></outline>"
    CheckColorStr1 = "<outline color=#B94E00 width= 1>%s</outline>"
    CheckColorStr2 = "<outline color=#D74D23 width=2><b>%s</b></outline>"


    onLoad()
    {
        this.bgFontSize = this.BackgroundTxt.fontSize;
        this.checkFontSize = this.CheckTxt.fontSize ;
        //紫色是两个文本叠加效果
        if(Global.Setting.SkinConfig.isPurple)
        {
            this.bg1FontSize = this.BackgroundTxt1.fontSize ;
            this.check1FontSize = this.CheckTxt1.fontSize;
        }
    }

    close()
    {
        this.node.active = false
    }
    // update (dt) {}
    public getGameData() {
        return this.gameData;
    }
    public onInit(data: any) {
        this.gameData = data;
        this.initView()
    }
    initView() {

        this.BackgroundTxt.fontSize = this.bgFontSize;
        this.CheckTxt.fontSize = this.checkFontSize;

        if(Global.Setting.SkinConfig.isPurple)
        {
            this.CheckTxt1.fontSize = this.check1FontSize;
            this.BackgroundTxt1.fontSize = this.bg1FontSize;
            this.BackgroundTxt.string =  cc.js.formatStr(this.ColorStr1,Global.Toolkit.removeEmoji(this.gameData.title));
            this.BackgroundTxt1.string =  cc.js.formatStr(this.ColorStr2,Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt.string = cc.js.formatStr(this.CheckColorStr1,Global.Toolkit.removeEmoji(this.gameData.title));
            this.CheckTxt1.string = cc.js.formatStr(this.CheckColorStr2,Global.Toolkit.removeEmoji(this.gameData.title));
        }else if(Global.Setting.SkinConfig.isBlue){
            this.BackgroundTxt.string =  this.gameData.title
            this.CheckTxt.string = this.gameData.title
        }else
        {
            this.BackgroundTxt.string =  Global.Toolkit.removeEmoji(this.gameData.title)
            this.CheckTxt.string = Global.Toolkit.removeEmoji(this.gameData.title)
        }
 

        this.toggle.isChecked =false
        this.toggle.uncheck()
        this.SetUnReadActiveState(this.gameData.red_status === 0)

        // if(this.gameData.title.length > 6)
        // {
        //     Global.Component.frameEnd(()=>{
        //         if(!this.node.isValid)
        //             return;
        //         this.adjustLabelLength(this.BackgroundTxt, this.bgFontSize) 
        //         this.adjustLabelLength(this.CheckTxt, this.checkFontSize) 
        //         this.adjustLabelLength(this.BackgroundTxt1, this.bg1FontSize) 
        //         this.adjustLabelLength(this.CheckTxt1, this.check1FontSize) 
        //     })
        // }
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
    public SetUnReadActiveState(state:boolean)
    {
        this.Unread.node.active = state
    }
}
