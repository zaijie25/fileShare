

//游戏列表item
const {ccclass, property} = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {
    @property(cc.Label)
    LabelName :cc.Label = null;
    @property(cc.Label)
    LabelID :cc.Label = null;
    @property(cc.Label)
    LabelCount : cc.Label = null;
    @property(cc.Label)
    selfRankLab :cc.Label = null;
    @property(cc.Node)
    headImg : cc.Node = null;
    @property(cc.Sprite)
    selfRankSprite :cc.Sprite = null;

    onLoad()
    {
        this.headImg.on(cc.Node.EventType.TOUCH_END, this.onHeadClick, this)
    }

    Init(data:any){
        if (Number(data.headimg)) {
            let headSprite = this.headImg.getComponent(cc.Sprite)
            let tempFrame = Global.Toolkit.getLocalHeadSf(data.headimg)
            headSprite.spriteFrame = tempFrame
        } else {
            Global.Toolkit.loadWebPic(this.headImg, data.headimg)
        }
        let LabelStr = data.uid+""
        this.LabelID.string =  Global.Toolkit.formateStrWithAsterisk(LabelStr, LabelStr.length-4, 1);

        this.LabelName.string =  Global.Toolkit.substrEndWithElli( data.name ,8);
        this.LabelCount.string = Global.Toolkit.GetText(data.point);
        this.selfRankLab.string =(data.rank == null)?"W":data.rank;
        let self = this
        this.selfRankLab.node.active = false
        let atlasPath = "hall/texture/rank/rankAtlas"
        if (data.rank > 3)
        {
            //大于三 排名后紫色有背景图，红色没有背景图
            if(Global.Setting.SkinConfig.isPurple)
            {
                Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_04", null, false);
            }
            else
            {
                self.selfRankSprite.spriteFrame = null;
            }
            self.selfRankLab.node.active = true;
        }
        else
        {
            //中国红前三是图标和文本一起组成，需要显示
            if(Global.Setting.SkinConfig.isRed)
            {
                self.selfRankLab.node.active = true;
            }
            switch (data.rank) {
                case 1:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_01", null, false);
                    break;
                case 2 :
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_02", null, false);
                    break;
                case 3 :
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_03", null, false);
                    break;
            }
        }
    }
    
    onHeadClick() {
        //Global.UI.getWindow<WndRank>("WndRank").RefreshInfoPanel()
    }

   
}
