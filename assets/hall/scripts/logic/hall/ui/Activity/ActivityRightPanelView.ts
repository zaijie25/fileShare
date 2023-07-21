import ViewBase from "../../../core/ui/ViewBase";
import { ActivityType, ActivityConstants } from "./ActivityConstants";

export default class ActivityRightPanelView extends ViewBase {

    
    
    noMsgTips: cc.Node;
    spriteNode: cc.Node;
    contentSprite:cc.Sprite
    rightPage: any[] = [];
    selectId: number = -1;
    picturePanel:cc.Node
    orgWide :number = 895
    orgHeight :number = 501

   
   
    
    protected initView(){
       
       
        this.spriteNode = this.getChild("pictureView/scrollview/view/content/SpriteItem");
        if(this.spriteNode)
            this.spriteNode.active = false

        this.contentSprite = this.spriteNode.getComponent(cc.Sprite)
        this.picturePanel = this.getChild("pictureView")
        if(this.picturePanel)
        {
            this.picturePanel.active = false
        }
       
        
        this.noMsgTips = this.getChild("noMsgTips");
        if(this.noMsgTips)
        {
            this.noMsgTips.active = false
        }
            
       
        this.rightPage.push(this.picturePanel);
        this.rightPage.push(this.noMsgTips);

       
    }

    protected onSubViewShow(){
        this.selectId = -1
    }

    onSubViewHide()
    {
        this.selectId = -1
    }

    public changeView(viewType: number,data?:any){
        if(viewType == this.selectId){
            return
        }
        this.rightPage.forEach(element => {
            if(element)
            {
                element.active = false;
                if(element.subViewState)
                {
                    element.subViewState = false
                }
            }
        });
        switch (viewType) {
            case ActivityType.picture:
                this.picturePanel.active = true
                this.spriteNode.active = true;
                if (data) {
                    this.selectId = data.atype;
                    this.RefreshInfoPanel(data);
                }
                break;
            case ActivityType.noMsgTips:
                this.noMsgTips.active = true;
                break;

        }
    }

    public showNotips(isShow: boolean){
        this.noMsgTips.active = isShow;
    }


    RefreshInfoPanel(data: any) {
        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, true)
        this.contentSprite.spriteFrame = null
        let self = this;
        if (data.url != null && !Global.Toolkit.isEmptyObject(data.url)) {
            if (CC_JSB) {
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(data.url), Global.Toolkit.DealWithUrl(data.url), (texture:cc.Texture2D) => {
                    if(self.selectId != data.atype)
                    {
                        return
                    }
                   
                    if(self.spriteNode && self.spriteNode.isValid)
                    {
                        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.node.width = self.orgWide
                        let reHeight = self.orgWide * texture.height / texture.width
                        if(reHeight <= self.orgHeight)
                        {
                            reHeight = self.orgHeight
                        }
                        self.contentSprite.node.height = reHeight
                        self.contentSprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                        self.contentSprite.spriteFrame = frame;
                    }
                })
            }
            else {
                // cc.assetManager.loadRemote(Global.Toolkit.DealWithUrl(data.url), { ext: '.png' }, function (err, texture :cc.Texture2D) {
                cc.assetManager.loadRemote(data.url, { ext: '.png' }, function (err, texture :cc.Texture2D) {
                    if(self.selectId != data.atype)
                    {
                        return
                    }
                    if(err!= null)
                    {
                        return
                    }
                    if(self.spriteNode && self.spriteNode.isValid)
                    {
                        Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.node.width = self.orgWide
                        let reHeight = self.orgWide * texture.height / texture.width
                        if(reHeight <= self.orgHeight)
                        {
                            reHeight = self.orgHeight
                        }
                        self.contentSprite.node.height = reHeight
                        self.contentSprite.sizeMode =  cc.Sprite.SizeMode.CUSTOM
                        self.contentSprite.spriteFrame = frame;
                    }
                })
            }
        }
        // this.RefreshLeftItem(data);
    }

}


