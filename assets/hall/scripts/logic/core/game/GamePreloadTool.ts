export default class GamePreloadTool{
    private readonly basePrefabPath = "prefabs/";
    public readonly lobbyUIPath = this.basePrefabPath + "LobbyUI";
    public readonly rulePop = this.basePrefabPath + "RulePop";
    public readonly settingPop = this.basePrefabPath + "SettingPop";

    /** 用于储存需要跨bundle调用的变量 */
    public codeCache = {};

    private curGid: number = 0;
    public get curGameId(){
        return this.curGid;
    }
    public get curBundleName(){
        return this.getPreloadBundleName(this.curGid);
    }

    public getPreloadBundleName(gid: number){
        return `${gid}_preload`;
    }

    private keepAssetMap: Map<string, CacheAssetInfo> = new Map;

    public setup(gid: number){
        Logger.error("GamePreloadTool setup", this.curGid, gid);
        this.curGid = gid;
        Global.SceneManager.setGameSearchPath(String(gid));
        this.codeCache = {};
    }

    public reShowLobbyShellWnd(){
        Game.GamePreloadTool.releaseKeepAsset(this.curGid, true);
    }

    public preloadBundle(){
        try {
            return new Promise((resolve, reject)=>{
                Global.ResourceManager.loadBundle(this.curBundleName, (err, bundle)=>{
                    if (err)
                    {
                        Logger.error("加载子游戏bundle失败--------preloadBundle------------")
                        Global.Toolkit.removeDir(this.curGid,err)
                        reject(err);
                    }
                    else
                        resolve(bundle);
                })
            })
          } catch (error) {
          //  console.error(error);
            Global.Toolkit.removeDir(this.curGid,error)
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
          
        
    }

    public preloadPrefab(path: string, isCollect: boolean = false){
        let prefab = this.getSelectPrefab(path, isCollect);
        let wholePath = this.getAssetWholePath(path);
        if (prefab){
            return prefab;
        }
        else{
            return new Promise((resolve, reject)=>{
                Global.ResourceManager.loadBundleRes(this.curBundleName, path, (err, res)=>{
                    if (err)
                        reject(err);
                    else{
                        if (isCollect){
                            if (this.keepAssetMap.has(wholePath)){
                                let cache = this.keepAssetMap.get(wholePath);
                                cache.count ++;
                            }
                            else{
                                let chche = new CacheAssetInfo(this.curGid, path, res, 1);
                                this.keepAssetMap.set(wholePath, chche);
                            }
                            res.addRef();
                        }
                        Global.ResourceManager.setAutoReleaseRecursively(res, false);
                        resolve(res);
                    }
                }, null);
            })
        }
    }

    public lazyPreloadPrefab(){
        Global.ResourceManager.lazyLoadBundleRes(this.curBundleName, [this.rulePop, this.settingPop], cc.Prefab);
    }

    public getSelectPrefab(path: string, isCollect: boolean = true){
        let prefab = Global.ResourceManager.getBundleRes(this.curBundleName, path, cc.Prefab);
        if (prefab){
            if (isCollect){
                let wholePath = this.getAssetWholePath(path);
                if (this.keepAssetMap.has(wholePath)){
                    let cache = this.keepAssetMap.get(wholePath);
                    cache.count ++;
                }
                else{
                    let chche = new CacheAssetInfo(this.curGid, path, prefab, 1);
                    this.keepAssetMap.set(wholePath, chche);
                }
                prefab.addRef();
            }
            return prefab;
        }
    }

    private getAssetWholePath(path: string){
        return `${this.curGid}_${path}`;
    }

    public releasePreloadBundle(gid: number){
        Global.ResourceManager.releaseHelper.releaseBundle(this.getPreloadBundleName(gid));
    }

    public releaseKeepAsset(gid: number, retainOne: boolean = false){
        let keepOne = retainOne ? 1 : 0;
        let deleteArr = [];
        this.keepAssetMap.forEach((info, path)=>{
            if(info.gid == gid){
                let count = info.count;
                if (count > 0){
                    for(let i = 0; i < count - keepOne; i++){
                        info.asset.decRef();
                        info.count --;
                    }
                }
                if (info.count == 0){
                    deleteArr.push(path);
                    Global.ResourceManager.releaseHelper.releaseBundleRes(this.getPreloadBundleName(gid), info.path);
                }
            }
        })

        deleteArr.forEach(key=>{
            this.keepAssetMap.delete(key);
        })
    }

    public checkPreloadBundleExist(gid: number){
        if (cc.sys.isNative){
           let path = `${jsb.fileUtils.getWritablePath()}/gameUpdate/${gid}/assets/${gid}_preload`;
           let isExist = jsb.fileUtils.isFileExist(path);
           Logger.error("checkPreloadBundleExist", path, isExist);
           return isExist;
        }
        if (cc.sys.isBrowser){
            let ignoreArr = [       // 不在数组内的走true, 没有preload bundle的游戏网页调试需要在这配置
                4002,
                1001,
                1009,
                1015,
                1017,
                1018,
                1019,
                1020,
                1022,
                5001,
                5002,
                5003,
                5004,
                5005,
                5006,
                1021
            ];
            return true && ignoreArr.indexOf(gid) <= -1;     // 本地调试临时这么判断
        }
        return false;
    }
}

class CacheAssetInfo{
    private _count: number;
    constructor(public gid: number, public path: string, public asset: cc.Asset, count: number){
        this.count = count;
    }

    public set count(value: number){
        Logger.error("set CacheAssetInfo count", this.gid, this.path, value);
        this._count = value;
    }

    public get count(){
        return this._count;
    }
}