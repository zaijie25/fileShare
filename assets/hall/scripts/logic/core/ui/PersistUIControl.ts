import WndBase from "./WndBase";
import { SceneType } from "../scene/SceneManager";

export class PersistUIControl
{
    //缓存到持久化节点的ui  每次只保留一个，选场或者大厅
    public curPersistUI : WndBase

    //选择需要放到持久化节点的UI
    //优先筛选非MainUI界面    找不到就把大厅放到持久化节点
    public selectPersistUI(windowMap :  { [key: string]: WndBase } )
    {   
        for(let key in windowMap){
            let window = windowMap[key];
            if(window.active == true  && window.layer != Global.UI.MainLayer)
            {
                if(this.curPersistUI == null)
                    this.curPersistUI = window;
                else
                {
                    Logger.error("同时显示多个持久化界面！！！！", window.name)
                }
            }
        }

        if(this.curPersistUI == null)
        {
            let hall = Global.UI.getWindow("WndHall")
            if(hall && hall.putToPersistWhenVisible)
                this.curPersistUI = Global.UI.getWindow("WndHall");
        }
    }

    public savePersistUI(windowMap :  { [key: string]: WndBase } )
    {
        this.selectPersistUI(windowMap)
        if(this.curPersistUI != null)
        {
            Global.Persist.addUIToPersisitNode(this.curPersistUI.name, this.curPersistUI.node, true)
        }
    }


    public removePersisUI(key)
    {
        if(this.curPersistUI == null)
            return null;
        if(this.curPersistUI.name == key && this.curPersistUI.node.isValid)
        {
            let node = this.curPersistUI.node
            //父节点切换时，替换cleanup方法，防止动画被停止
            let tmpCleanupFunc = node.cleanup;
            node.cleanup = ()=>{}
            Global.Persist.removeUIFromPersisitNode(this.curPersistUI.name);
            node.cleanup = tmpCleanupFunc
            this.curPersistUI.node.active = this.curPersistUI.active
            this.curPersistUI = null
            return node;
        }
        return null;
    }


    //是否是持久化UI
    public isPersistUI(wndName:string){
        if(this.curPersistUI == null)
            return false;
        return this.curPersistUI.name == wndName
    }

    public showPersistUI(){
        if(this.curPersistUI == null)
            return;
        //这个时候实际还在游戏场景里，SceneType先切到hall  需要重构
        if(Global.SceneManager.sceneType == SceneType.Hall)
        {
            this.curPersistUI.activeInPersistNode = true;
        }
    }


    public closePersistUI()
    {
        if(this.curPersistUI == null)
            return;
        if(!Global.SceneManager.inGame())
            return;
        this.curPersistUI.activeInPersistNode = false;
    }

}