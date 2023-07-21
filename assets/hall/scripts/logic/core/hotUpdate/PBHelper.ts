import HotUpdateManager from './HotUpdateManager'
import Toolkit from "../tool/Toolkit";
export default class PBHelper {
    private prePath = 'hall/prefabs/Dlgs/'
    private nodeName = '';
    private lock = true;


    private Paths = {
        DlgSetting: this.prePath + 'DlgSetting',
        DlgGameNeedDownload: this.prePath + 'DlgGameNeedDownload',
    }
    //游戏引用大厅的资源预加载，creator 2.0 后，子游戏更新引用大厅的资源，如果不进行预加载很多时候大厅的资源无法引用
    //预加载prefab 时，引用到的spine 动画不会被预加载，会导致报错，目前游戏中引用的大厅的资源先去掉动画
    private ComPaths = {
        DlgSetting: this.prePath + 'DlgSetting'
    }

    public initHelper(cb){
        let loaded = 0;
        let underscore = Toolkit.underscore;
        let HotUpdateManager = Global.HotUpdateManager;
        let ccLoaderHelper = HotUpdateManager.ccLoaderHelper;
        let self = this;
        underscore.each(this.ComPaths,function(value,key){
            Logger.log('-----------------------------getComPaths res---------')
            ccLoaderHelper.getRes(value,cc.Prefab,function(err,prefab){
                Logger.log('PBHelper : ' + key + ' is loaded')
                loaded ++;
                if (loaded >= underscore.size(self.ComPaths)) {
                    if (cb) {
                        cb();
                        return;
                    }
                }
            })
        })
    }

    public addNode(name,parent = null,cb = null,zorder = 9999){
        if (name == this.nodeName && this.lock) {
            return;
        }
        Logger.log('PBHelper ----------- addNode-------' + name)
        this.lock = true;
        this.nodeName = name;
        this.getNode(name,(node:cc.Node)=>{
            if (parent === null){
                parent = cc.director.getScene().getChildByName('Canvas')
            }
            if (parent.getChildByName('popup9999')) {
                parent.getChildByName('popup9999').destroy();
            }
            parent.addChild(node,zorder,'popup9999')
            this.lock = false;
            if (cb) {
                cb(node)
            }
        })
    }

    public getNode(name,cb=null,setShowLoading = null){
        let cbDone = cb;
        let self = this;
        Logger.log('--------getNode-----------' + this.Paths[name])
        let HotUpdateManager = Global.HotUpdateManager;
        HotUpdateManager.ccLoaderHelper.getRes(this.Paths[name],cc.Prefab,function(err,res){
            let node = cc.instantiate(cc.loader.getRes(self.Paths[name]));
            if(cbDone) cbDone(node)
            return node;
        })
    }

    public releaseNode(key = null){
        let _release = function(key){
            Logger.log("@Release:" + key)
            let deps =cc.loader.getDependsRecursively(this.Paths[key]);
            cc.loader.release(deps)
        }

        if (key === null) {
            for (let key in this.Paths) {
                _release(key)
            }
        }else {
            _release(key)
        }
    }

}