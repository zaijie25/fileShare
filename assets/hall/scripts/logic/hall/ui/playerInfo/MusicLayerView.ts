import ViewBase from "../../../core/ui/ViewBase";
import PlayerInfoModel, { BgmEntity } from "../../../hallcommon/model/PlayerInfoModel";
import DiantaiItem from "./DiantaiItem";
import ScrollViewCarmack from "../../../core/component/ScrollViewCarmack";

/**
 * 音乐电台
 */
export default class MusicLayerView extends ViewBase {
    private model:PlayerInfoModel
    /**
     * 滚动容器
     */
    scrollView:cc.ScrollView = null;

    /**
     * 音乐集合
     */
    musicArr:any[] = [];

    copyItem :cc.Node


    listView :ScrollViewCarmack
    protected initView()
    {
        this.model = Global.ModelManager.getModel("PlayerInfoModel")
        
        this.scrollView = this.getComponent("scrollview",cc.ScrollView)
        this.copyItem = this.getChild("scrollview/item");
        if(this.copyItem)
        {
            this.copyItem.active = false
        }
        this.InitScrollViewObj()
        this.initMusic()
    }
    
    initMusic() {
        let musicData : Map<string,BgmEntity> = this.model.musicData
        if(musicData)
        {
            this.transMusicData(musicData)
            return
        }
        this.model.requestBgmList((data :Map<string,BgmEntity>) =>{
            console.log(data)
            this.transMusicData(data)
        })
    }


    transMusicData(musicData)
    {
        if(!musicData)
        {
            return
        }
        let dataObj = this.model.diantaiMusicArr[0];
        this.musicArr.push(dataObj);
        let arrName = musicData.keys();
        for(let i = 0; i < musicData.size; i++){
            let key = arrName.next().value as string;
            let entity = musicData.get(key);
            this.musicArr.push(entity);
        }
        for(let i = 0; i < this.musicArr.length; i++){
            let diantaiObj = this.musicArr[i];
            diantaiObj.url = diantaiObj.file;
            if (CC_JSB){
                diantaiObj.surl = this.model.getLocalFileName(diantaiObj.file);
            }
            if(i == this.musicArr.length -1)
            {
                this.initItem();
            }
        }
    }
    initItem(){

        this.listView.allDatas = this.musicArr;
        this.listView.updateView();
        
    }

    InitScrollViewObj() {
        let item_setter = (item, index) => {
            let data = this.listView.allDatas[index];
            item.getComponent(DiantaiItem).init(data)
        };
        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.scrollView.node, this.copyItem, 5, 0, this, item_setter);
    }

    refreshUI()
    {
        this.listView.updateView();
    }

    onSubViewHide()
    {
        this.model.off(PlayerInfoModel.UpdateScrollView,this,this.refreshUI)
    }

    onSubViewShow()
    {
        this.refreshUI()
        this.model.on(PlayerInfoModel.UpdateScrollView,this,this.refreshUI)
    }

    
}