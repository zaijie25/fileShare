import LoadingFacade from './logic/core/loadingMVC/LoadingFacade';
import { ServerType } from './logic/core/setting/Setting';

cc.Class({
    extends: cc.Component,

    properties: {
        manifest:{
            type:[cc.Asset],
            default:[]
        },
        //
        isStartHotUpdate:false,

        serverType:{
            type:cc.Enum(ServerType),
            default:ServerType.DEVELOP,
            serializable:true,
        }
    },

    onLoad () {
        //文档中没有 
        if(cc.Device && cc.Device.setKeepScreenOn)
        {
            cc.Device.setKeepScreenOn(true);
        }
        cc.macro.DOWNLOAD_MAX_CONCURRENT = 8;
        LoadingFacade.Instance.startUp(this.manifest,this,this.isStartHotUpdate, this.serverType);
        Logger.log("---------isStartHotUpdate------" + this.isStartHotUpdate)
    },
    start(){

        
    },
    onDestory(){
        
    },

    update(dt)
    {
        if (Global && Global.Http){
            Global.Http.onUpdate(dt);
        }
        
    }

    

    
});
