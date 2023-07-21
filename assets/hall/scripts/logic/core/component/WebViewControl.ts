import { GameType } from "../../hallcommon/data/GameData";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import HallModel from "../../hallcommon/model/HallModel";
import PlayerInfoModel from "../../hallcommon/model/PlayerInfoModel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WebViewControl {

    // LIFE-CYCLE CALLBACKS:
    private url: string;
    private scheme: string;
    private hasApplyTopPoint = false;
    private style = 1; //默认为1
    private webViewGamePanel:cc.Node;
        
    init(){

    }

    clear(){
        if (this.webViewGamePanel){
            this.webViewGamePanel.removeFromParent(true)
            this.webViewGamePanel.destroy()
            this.webViewGamePanel = null;
        }
    }

    //显示百胜webview
    showWebView(url:string ,scheme:string,actionViewHidden:string,parent:cc.Node,gid = Game.Control.curGid){
        this.url = url;
        this.scheme = scheme;
        this.hasApplyTopPoint = false;
        let direction = gid == 9001 ? 1 : -1 //竖屏
        let gameInfo = Global.GameData.getGameInfo(gid)
        let gameType = gameInfo ? gameInfo.gameType : -1
        if(gameType === GameType.AGBG){ //AG BG 外接游戏类型
            this.style = 2;
        }
        if (!this.webViewGamePanel){
            Global.ResourceManager.loadBundleRes("resources","hall/prefabs/ui/WebViewGamePanel",(error,prefab)=>{
                if (error){
                    Logger.error("load WebViewGamePanel error")
                    return;
                }
                this.webViewGamePanel = cc.instantiate(prefab)
                this.webViewGamePanel.active = true;
                if(cc.isValid(this.webViewGamePanel))
                {
                    Logger.error("show WebViewGame --")
                    this.webViewGamePanel.parent = parent;
                    let bg = this.webViewGamePanel.getChildByName("bg")
                    if (bg){
                        bg.active = false;
                    }
                }
                Global.Event.event(GlobalEvent.SHOW_NET_WAITING,"showWebView")
                Logger.error("show WebViewGame bg 隐藏1111")
                Global.NativeEvent.openExternalGame(url,scheme,actionViewHidden,2,direction)
            })
        }else { 
            if(cc.isValid(this.webViewGamePanel))
            {
                let bg = this.webViewGamePanel.getChildByName("bg")
                if (bg){
                    bg.active = false;
                }
                this.webViewGamePanel.active = true;
            }
            Logger.error("show WebViewGame bg 隐藏222")
            Global.NativeEvent.openExternalGame(url,scheme,actionViewHidden,2,direction)
        }
        
    }

    //原生调用js 
    native2JSCallback(state:String,url:String){
        let hallModel: HallModel = Global.ModelManager.getModel("HallModel")
        if(state=="1"){//开始加载
            Logger.log("WebViewGame --开始加载");
        }else if(state=="2"){//加载成功
            //进游戏关闭大厅音乐
            Global.Audio.stopMusic();
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"showWebView")
            if (!this.hasApplyTopPoint) {
                this.hasApplyTopPoint = true; 
                
                hallModel.requestApplyTopPoint(Game.Control.curGid)
            }
            if (this.webViewGamePanel){
                let bg = this.webViewGamePanel.getChildByName("bg")
                if (bg){
                    bg.active = true;
                }
            }
            Logger.log("WebViewGame --http加载成功");
        }else if(state=="3"){//http加载失败,404
            if (this.scheme){
                // this.hideWebView()
                // Global.NativeEvent.closeBS()
                // Global.UI.fastTip("网络异常，请重试-1");
            }
            Logger.log("WebViewGame --http加载失败,404");
        }else if(state=="4"){//没有网
            if (this.scheme){
                // this.hideWebView()
                // Global.NativeEvent.closeBS()
                // Global.UI.fastTip("网络异常，请重试-2");
            }
            Logger.log("WebViewGame --没有网");
        }else if(state=="5"){//shema的拦截

            hallModel.requestApplyDownPoint(Game.Control.curGid)
            this.hideWebView()
            Global.NativeEvent.closeExternalGame()
            Logger.log("WebViewGame --shema的拦截");
        }else if(state=="6"){//原生进行了刷新
            Logger.log("WebViewGame --原生进行了刷新");
        }else if(state=="7"){//原生退出游戏
            Logger.log("WebViewGame --原生退出游戏");
            this.hideWebView()
            hallModel.requestApplyDownPoint(Game.Control.curGid)
            
        }else{
            Logger.log("WebViewGame --state其他情况");
        }
    }



    hideWebView() {
        this.playHallBGM()
        Global.Event.event(GlobalEvent.CloseWebViewGame)
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING,"showWebView")
        if (cc.isValid(this.webViewGamePanel) && this.webViewGamePanel.active) {
            this.webViewGamePanel.removeFromParent();
            this.webViewGamePanel.destroy()
            this.webViewGamePanel = null
        }
        //有过上分才下分
        if (this.hasApplyTopPoint){
            let hallModel: HallModel = Global.ModelManager.getModel("HallModel")
            hallModel.requestApplyDownPoint( Game.Control.curGid)
        }
        //静默请求刷新玩家数据
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserInfo, {},null,null,false);
        
    }


    playHallBGM(){
        var model = Global.ModelManager.getModel("PlayerInfoModel")
        if(model)
        {
            model.InitBgm()
        }
    }

}
