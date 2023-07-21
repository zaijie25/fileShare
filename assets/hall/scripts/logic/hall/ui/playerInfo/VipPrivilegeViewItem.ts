
const {ccclass, property} = cc._decorator;

@ccclass
export default class VipPrivilegeViewItem extends cc.Component {

    @property(cc.Sprite)
    icon : cc.Sprite =null;
   
    @property(cc.Label)
    tip:cc.Label = null

    @property(cc.SpriteFrame)
    glory:cc.SpriteFrame = null


   
    /**
     * 
     * @param type 0头像框 1捕鱼炮台 2专属表情 3荣耀播报
     * @param vip 
     */
    refreshUI(type, vip) {
        var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";
        var sfBiaoqing = "biaoqing_" + vip;
        var sfPaotai = "img_paotai_" + vip;
        var sKuang = "img_avatar_vip" + vip


        switch (type) {
            case 0:
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sKuang, null, false);
              //  this.tip.fontSize = 26
                if(vip>9)
                {
                    this.tip.string = "V" + vip + "专属头像框";
                }
                else
                {
                    this.tip.string = "V" + vip + "专属头像框";
                }
                break;
            case 1:
               // this.tip.fontSize = 24
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sfPaotai, null, false);
                this.tip.string = "V" + vip + "专属捕鱼炮台";
                break
            case 2:
              //  this.tip.fontSize = 26
                Global.ResourceManager.loadAutoAtlas(this.icon, atlasString, sfBiaoqing, null, false);
                this.tip.string = "V" + vip + "专属表情";
                break
            case 3:
               // this.tip.fontSize = 26
                this.icon.spriteFrame = this.glory
                this.tip.string = "荣耀入场播报";
                break
            default:
                break;
        }

    }
    
   
}


