import { DestoryType } from "../ui/WndBase";
import ReleaseItem from "../../../framework/resource/ReleaseItem";

export default class ReleaseHelper
{
    //被预加载但是没有使用的资源，如游戏图标。  切场景时需要统一清理
    private _unusedSet:Set<any> = new Set<any>();
    private _unusedTypeMap:Map<string, any> = new Map<string, any>();

    // private _releaseMap = {}

    addBundleRelease(bundleName:string,path:string,type?:typeof cc.Asset){
        // if (!bundleName || !path){
        //     Logger.error("addRelease bundleName or path == null")
        //     return;
        // }
        // if (!this._releaseMap[bundleName]){
        //     this._releaseMap[bundleName] = {}
        // }
        
        // let bundleReleaseMap = this._releaseMap[bundleName]
        // if (bundleReleaseMap[path]){
        //     Logger.error("path has already addRelease ",path)
        //     return;
        // } 
        // let releaseItem = new ReleaseItem
        // releaseItem.resPath = path
        // releaseItem.resType = type
        // bundleReleaseMap[path] = releaseItem
    }

    releaseBundle(bundleName:string){
        // let bundleReleaseMap = this._releaseMap[bundleName]
        // if (!bundleReleaseMap){
        //     Logger.error("releaseBundle bundle is null ",bundleName)
        //     return;
        // }
        // for (let path in bundleReleaseMap){
        //     let releaseItem = bundleReleaseMap[path]
        //     if (releaseItem){
        //         let path = releaseItem.resPath
        //         let type = releaseItem.resType
        //         this.releaseBundleRes(bundleName,path,type)
        //     }else {
        //         Logger.error("releaseBundle path releaseItem is null",path)
        //     }
        // }
        // let bundle = cc.assetManager.getBundle(bundleName);
        // bundle.releaseAll();
        // cc.assetManager.removeBundle(bundle);
        // delete this._releaseMap[bundleName];
        // this._releaseMap[bundleName] = null

        let bundle = cc.assetManager.getBundle(bundleName);
        if (bundle){
            bundle.releaseUnusedAssets();
            // bundle.releaseAll();            // debug 释放bundle有被其他相同优先级bundle共享的资源会导致一同释放, 不管是否计数
            cc.assetManager.removeBundle(bundle);
        }
    }

    releaseBundleRes(bundleName:string,path:string,type?:typeof cc.Asset){
        if (!bundleName){
            Logger.error("releaseBundleRes bundleName is null ")
            return;
        }
        if (!path){
            Logger.error("releaseBundleRes path is null")
            return;
        }
        // Logger.error("releaseBundleRes bundleName path ",bundleName,path)

        let bundle = cc.assetManager.getBundle(bundleName);
        if (bundle){
            bundle.release(path,type)
        }else {
            Logger.error("releaseBundleRes bundle is null ",bundleName)
        }
    }


    //记录可能加载但没被使用的资源
    public recordUnusedAsset(array, type = null)
    {
        for(let i = 0; i < array.length; i++)
        {
            this._unusedSet.add(array[i]);
            if(type != null)
                this._unusedTypeMap.set(array[i], type);
        }
    }

    //资源被使用后，从set中删除
    public markUsed(url)
    {
        this._unusedSet.delete(url);
        this._unusedTypeMap.delete(url);
    }

    //清理资源
    public clearUnuseAssets()
    {
        this._unusedSet.forEach((url)=>{
            let type = this._unusedTypeMap[url];
            Global.ResourceManager.releaseCache(url, type);
        })
        this._unusedSet.clear();
        this._unusedTypeMap.clear();
    }


    public adjustByIphone6()
    {
        if(Global.Toolkit.isIphone6())
        {
            Logger.error("is iphone 6")
            Global.Setting.cachedGameItemCount = 0;
            // Global.UI.getWindow("WndHall").destoryType = DestoryType.ChangeScene;
        }
    }
}