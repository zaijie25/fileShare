import ReleaseHelper from "../../logic/core/tool/ReleaseHelper";

class CacheInfo
{
    refs:Set<string>;
    uses:Set<string>;
}

//资源管理器
//@todo  资源加载，依赖管理， 资源释放

export default class ResourceManager
{

    //资源映射
    private _resMap:Map<string, CacheInfo> = new  Map<string, CacheInfo>();
    //收集依赖的资源路径
    private _useSet:Set<string> = new Set<string>();

    public releaseHelper:ReleaseHelper = new ReleaseHelper;
    private _gameBundle:string;



    public get gameBundle(){
        return this._gameBundle
    }

    public set gameBundle(bundle:string){
        this._gameBundle = bundle;
    }

    private _getResItem(url:string, type: typeof cc.Asset)
    {
        // let ccloader: any = cc.loader;
        // let item = ccloader._cache[url];
        // if (!item) {
        //     let uuid = ccloader._getResUuid(url, type, false);
        //     if (uuid) {
        //         let ref = ccloader._getReferenceKey(uuid);
        //         item = ccloader._cache[ref];
        //     }
        // }
        // return item;
    }

    private addDependKey (item, refKey)
    {
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (let depKey of item.dependKeys) {
                // 记录该资源被我引用
                this.getCacheInfo(depKey).refs.add(refKey);
                // Logger.log(`${depKey} ref by ${refKey}`);
                let ccloader: any = cc.loader;
                let depItem = ccloader._cache[depKey]
                this.addDependKey(depItem, refKey)
            }
        }
    }

    public getCacheInfo(key: string): CacheInfo {
        if (!this._resMap.has(key)) {
            this._resMap.set(key, {
                refs: new Set<string>(),
                uses: new Set<string>()
            });
        }
        return this._resMap.get(key);
    }

    public print(id)
    {
        for(let key in this._resMap)
        {
            if(key.indexOf(id))
                Logger.error(this._resMap[id])
        }
    }


    //加载单个资源
    //只能加载Resources下资源，不能加后缀名
    //collectDep 是否收集依赖，暂时只对大厅ui和预加载资源生效 
    public loadRes(url:string, onComplete?:(error: Error, resource: any) => void, type?, 
        onProgress?:(completedCount: number, totalCount: number, item: any) => void, 
        autoRelease?:boolean, collectDep:boolean = false)
    {
        let self = this;
        let completeFunc = (error: Error, resource: any)=>{
            if(collectDep)
            {
                if(!this._useSet.has(url))
                    this._useSet.add(url);
                
            }
            if(onComplete) {
                onComplete(error, resource);
            }
        }
        if (url.indexOf("@") > 0){
            let urlArray = url.split("@")
            if (urlArray && urlArray.length > 0){
                let bundleName = urlArray[0]
                let resPath = urlArray[1]
                if (bundleName && resPath){
                    if (bundleName == "hall"){
                      this.loadBundleRes(Global.customApp.getHallBundleName(),resPath,completeFunc)
                    }else {
                        Logger.error("bundleName not exist")
                    }
                }else {
                    if (completeFunc){
                        let error = new Error();
                        error.message = "res load error"
                        completeFunc(error,null)
                    }
                }
            }else {
                if (completeFunc){
                    let error = new Error();
                    error.message = "res load error"
                    completeFunc(error,null)
                }
            }
        }else {
            cc.loader.loadRes(url, type, onProgress, completeFunc);
        }
        
    }

    //加载资源列表
    public loadResArr(urls:string[], onComplete?:(error: Error, resource: any) => void
        , type?, onProgress?:(completedCount: number, totalCount: number, item: any) => void, autoRelease?:boolean,
         collectDep = false)
    {
        let self = this;
        let completeFunc = (error: Error, resource: any)=>{
            if(error != null && CC_PREVIEW)
                Logger.error(error);
            if (!resource)
                return Logger.error("resource == null", JSON.stringify(urls));
            resource.forEach((asset:any, index:number) => {

                if(collectDep)
                {
                    let url = urls[index];
                    if(!this._useSet.has(url))
                        this._useSet.add(url);
                    let item = this._getResItem(url, type);
                    if (item && item.id) {
                        this.addDependKey(item, item.id);
                    } else {
                        // Logger.warn(`addDependKey item error1! for ${url}`);
                    }
                    // 给自己加一个自身的引用
                    if (item) {
                        let info = this.getCacheInfo(item.id);
                        info.refs.add(item.id);
                    }
                }
            });
            if(autoRelease && !error) {
                resource.forEach((asset:any, index:number) => {
                    self.setAutoReleaseRecursively(asset, true);
                });
            }
            if(onComplete) {    
                onComplete(error, resource);
            }
        }
        cc.loader.loadResArray(urls, type, onProgress, completeFunc);
    }

    //加载路径下所有资源
    public loadResDir(url:string, onComplete?:(error: Error, resource: any) => void, type?, onProgress?:(completedCount: number, totalCount: number, item: any) => void, autoRelease?:boolean)
    {
        let self = this;
        let completeFunc = (error: Error, resource: any)=>{

            if(autoRelease && !error) {
                resource.forEach((asset:any, index:number) => {
                    self.setAutoReleaseRecursively(asset, true);
                });
            }
            if(onComplete) {
                onComplete(error, resource);
            }
        }
        cc.loader.loadResDir(url, type, onProgress, completeFunc);
    }

    public setAutoRelease(res, autoRelease)
    {
        cc.loader.setAutoRelease(res, autoRelease);
    }

    //切场景时清理资源
    public setAutoReleaseRecursively(res, autoRelease)
    {
        cc.loader.setAutoReleaseRecursively(res, autoRelease);
    }


    /**
     * 获取自动图集图片
     * @param {cc.Sprite} sprite
     * @param {string} url
     * @param {string} atalsName
     * @param {string} spName
     * @memberof ResourceManager
     */
    public loadAutoAtlas(sprite:cc.Sprite, url:string, spName:string, onComplete?:Function, autoRelease?:boolean)
    {
        let self = this
        if(CC_PREVIEW)
        {
            let index = url.lastIndexOf("/");
            if(index > 0){
                url = url.substring(0, index);
            }
            let texture = this.getRes(url + "/" + spName, cc.Texture2D);
            if (texture) {
                if(!sprite.isValid) {
                    return;
                }

                sprite.spriteFrame = new cc.SpriteFrame(texture);
                if(onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadRes(url + "/" + spName, (error, texture:cc.Texture2D)=>{
                    if(error != null) {
                        Logger.error(error.message, url + "/" + spName);
                    }
                    if(texture == null) {
                        return;
                    } 
                    if(autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(texture, autoRelease);
                    }
                    
                    if(!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = new cc.SpriteFrame(texture);

                    if(onComplete) {
                        onComplete();
                    }
                })
            }
        }
        else {
            let atlas = this.getRes(url, cc.SpriteAtlas);
            if (atlas) {
                let spframe = atlas.getSpriteFrame(spName);
                if(spframe == null){
                    Logger.error("找不到sprite", spName);
                    return;
                }
                if(!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = spframe;

                if(onComplete) {
                    onComplete();
                }
            }
            else{
                this.loadRes(url, (error, atlas:cc.SpriteAtlas)=>{
                    if(error != null) {
                        Logger.error(error.message);
                    }  
                    if(atlas == null) {
                        return;
                    }
                    if(autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(atlas, autoRelease);
                    }

                    let spframe = atlas.getSpriteFrame(spName);
                    if(spframe == null) {
                        Logger.error("找不到sprite", spName);
                        return;
                    }
                    if(!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = spframe;
                    
                    if(onComplete) {
                        onComplete();
                    }
                }, cc.SpriteAtlas);
            }
        }
    }

    //支持加载单个或多个资源
    //支持加载远程资源
    //支持本地资源（绝对路径）
    // cc.loader.load('a.png', function (err, tex) {
    //     Logger.log('Result should be a texture: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load('http://example.com/a.png', function (err, tex) {
    //     Logger.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load({url: 'http://example.com/getImageREST?file=a.png', type: 'png'}, function (err, tex) {
    //     Logger.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load(['a.png', 'b.json'], function (errors, results) {
    //     if (errors) {
    //         for (var i = 0; i < errors.length; i++) {
    //             Logger.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
    //         }
    //     }
    //     var aTex = results.getContent('a.png');
    //     var bJsonObj = results.getContent('b.json');
    // });
    public load(resources, onComplete?:Function, onProgress? )
    {
        cc.loader.load(resources, onProgress, onComplete);
    }


    public loadResSprite(sp:cc.Sprite ,atlas:string, icon:string) 
    {
        Global.ResourceManager.loadRes(atlas, (error, atlas:cc.SpriteAtlas)=>
        {
            if(error != null)
            {
                Logger.error("加载图集错误", error.message);
            }
            if(atlas == null || !atlas.getSpriteFrame(icon))
            {
                Logger.error("找不到资源", atlas, icon);
                return;
            }
            sp.spriteFrame = atlas.getSpriteFrame(icon);
        }, cc.SpriteAtlas)
    }


    public getRes(url:string, type:any)
    {
        return cc.loader.getRes(url, type)
    }

    //预加载部分图集
    public loadAtlasArr(urls:string[], onComplete? :(error: Error, resource: any) => void)
    {
        this.loadResArr(urls, (error, resources)=>
        {
            if(error != null)
            {
                Logger.error("加载图集异常", error.message);
            }
            for(let i = 0; i < urls.length; i++)
            {
                let atlas = this.getRes(urls[i], cc.SpriteAtlas);
                if(atlas != null)
                    this.atlasMap[urls[i]] = atlas;
            }
            if(onComplete)
                onComplete(error, resources);
        }, cc.SpriteAtlas, null, false, true);
    }


    private atlasMap = {};

    //返回cc.spriteAtlas  可能为空  
    public getAtlas(url:string):cc.SpriteAtlas
    {
        let atlas = this.atlasMap[url];
        if(atlas == null)
        {
            Logger.error("获取图集为空，需要自行预加载图集  或者适用ResLoad 手动加载图集", url)
        }
        if(!cc.isValid(atlas))
        {
            Logger.error("图集已经销毁，不应该再适用，需检查原因", url);
            atlas = null;
        }

        return atlas;
    }

    public getSprite(atlasPath:string, spName:string)
    {
        let atlas = this.getAtlas(atlasPath);
        if(atlas == null)
            return null;
        return atlas.getSpriteFrame(spName);
    }



    //-----资源释放接口 -------

    public releaseRes(url:string, type?)
    {
        cc.resources.release(url, type);
    }

    public releaseAsset(asset)
    {
        cc.assetManager.releaseAsset(asset);
    }

    public releaseDir(url, type?)
    {
        cc.resources.release(url, type)
    }

    public release(asset)
    {
        cc.resources.release(asset);
    }

    public releaseCache(url, type)
    {
        cc.resources.release(url,type)

    }

    // 释放一个资源
    private _release(item, itemUrl) {
        if (!item) {
            return;
        }
        let cacheInfo = this.getCacheInfo(item.id);
        // 解除自身对自己的引用
        cacheInfo.refs.delete(itemUrl);
        // 解除引用
        let delDependKey = (item, refKey) => {
            if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
                for (let depKey of item.dependKeys) {
                    let ccloader: any = cc.loader;
                    let depItem = ccloader._cache[depKey]
                    this._release(depItem, refKey);
                }
            }
        }
        delDependKey(item, itemUrl);

        if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
            //如果没有uuid,就直接释放url
            if (item.uuid) {
                cc.loader.release(item.uuid);
                // Logger.log("resloader release item by uuid :" + item.id);
            } else {
                cc.loader.release(item.id);
                // Logger.log("resloader release item by url:" + item.id);
            }
            this._resMap.delete(item.id);
        }
    }

    /**
     * 释放资源和它的引用, 它引用的资源被释放会影响其他同样正在引用的资源 (慎用, 除非你确认没有任何其它引用的时候才使用接口)
     * @param path 资源路径
     */
    public releaseWithDepend(path: string){
        Logger.warn("释放资源和它引用的资源", path);
        let deps = cc.loader.getDependsRecursively(path);
        cc.loader.release(path);
        cc.loader.release(deps);
    }



    /******************2.4.0 新增************************/
    /**
     * 加载bundle
     * @param {string} nameOrUrl
     * @param {Function} onComplete
     * @param {Record<string, any>} options
    */
    public loadBundle(nameOrUrl: string ,onComplete?: (err: Error, bundle: cc.AssetManager.Bundle) => void,options?: Record<string, any>): void
    {
        cc.assetManager.loadBundle(nameOrUrl,options,(err,bundle)=>{
            if (onComplete){
                onComplete(err,bundle)
            }
        })
    }

    /** 检测bundle是否已加载到内存 */
    public checkBundleValid(bundleName: any){
        return cc.assetManager.getBundle(bundleName.toString());
    }

    /**
     * 加载当前游戏bundle res
     * @param {string|string[]} paths
     * @param {Function} onComplete
    */
    public loadGameBundleRes(paths: string|string[],onComplete?:Function,type?: typeof cc.Asset){
        let bundleName = Global.ResourceManager.gameBundle
        if (bundleName){
            this.loadBundleRes(bundleName,paths,onComplete,type)
        }else {
            Logger.error("loadGameBundleRes bundleName null")
        }
    }

    
    /**
     * 加载指定bundle res
     * @param {string} bundleName
     * @param {string|string[]} paths
     * @param {Function} onComplete
    */
    public loadBundleRes(bundleName:any,paths: string|string[],onComplete?:Function,type?: typeof cc.Asset){
        // test
        // if (typeof paths == 'string'){
        //     Logger.error("paths  = " + paths) 
        //     let getRes = this.getBundleRes(bundleName,paths,type) 
        //     if (getRes){
        //         Logger.error("getRes ==== " + getRes)
        //     }
            
        // }else if (typeof paths === 'object'){
        //     for (let j =0;j< paths.length;j++){
        //         let path = paths[j]
        //         Logger.error("path  = " + path)
        //         let getRes = this.getBundleRes(bundleName,path,type) 
        //         if (getRes){
        //             Logger.error("getRes object ==== " + getRes)
        //         }
        //     }
        // }

        let bundle:cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName.toString())
        if (bundle){
            bundle.load(paths,type,(err,res)=>{
                if(!err && res){
                    if (typeof paths == 'string'){
                        this.releaseHelper.addBundleRelease(bundleName,paths,type)
                    }else if (typeof paths === 'object'){
                        for (let j =0;j< paths.length;j++){
                            let path = paths[j]
                            //Logger.error("path  = " + path)
                            this.releaseHelper.addBundleRelease(bundleName,path,type)
                        }
                    }
                }
                
                if (onComplete){
                    onComplete(err,res)
                }
            })
        }
    }

    /**
     * 获取游戏bundle res
     * @param {string} path
     * @param {cc.Asset} type
    */
    public getGameBundleRes(path: string, type?: typeof cc.Asset){
        let bundleName = Global.ResourceManager.gameBundle
        if (bundleName){
            let res:any = this.getBundleRes(bundleName,path,type)
            if (res){
                return res
            }else {
                Logger.error("getGameBundleRes getBundleRes null")
            }
            
        }else {
            Logger.error("getGameBundleRes bundleName null")
        }
    }

    /**
     * 获取指定bundle res
     * @param {string} bundleName
     * @param {string} path
     * @param {cc.Asset} type
    */
    public getBundleRes(bundleName:any,path: string, type?: typeof cc.Asset){
        let bundle:cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName.toString())
        if (bundle){
            let res:any = bundle.get(path,type)
           return res
        }
    }

    /**
     * 加载当前游戏bundle dir
     * @param {string} path
     * @param {Function} onComplete
    */
    public loadGameBundleDir(path: string, onComplete?:Function,type?: typeof cc.Asset){
        let bundleName = Global.ResourceManager.gameBundle
        if (bundleName){
            this.loadBundleDir(bundleName,path,onComplete,type)
        }else {
            Logger.error("loadGameBundleDir bundleName null")
        }
    }

    /**
     * 加载指定bundle dir
     * @param {string} bundleName
     * @param {string} path
     * @param {Function} onComplete
    */
    public loadBundleDir(bundleName:any,path: string, onComplete?:Function,type?: typeof cc.Asset){
        let bundle:cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName.toString())
        if (bundle){
            bundle.loadDir(path,type,(err,res)=>{
                if(!err && res){
                    this.releaseHelper.addBundleRelease(bundleName,path,type)
                }
               
                if (onComplete){
                    onComplete(err,res)
                }
            })
        }
    }

     /**
     * 加载游戏内自动合图资源
     * @param {cc.Sprite} sprite
     * @param {string} url
     * @param {string} atalsName
     * @param {string} spName
     * @param {function} onComplete
     * @param {boolean} autoRelease
     * @param {boolean} isAutoAtlas //是否自动图集
    */
    public loadGameBundleAutoAtlas(sprite:cc.Sprite, url:string, spName:string, onComplete?:Function, autoRelease?:boolean,isAutoAtlas = true){
        let bundleName = Global.ResourceManager.gameBundle
        if (bundleName){
            this.loadBundleAutoAtlas(bundleName,sprite,url,spName,onComplete,autoRelease,isAutoAtlas)
        }else {
            Logger.error("loadGameBundleAutoAtlas bundleName null")
        }
    }

    /**
     * 获取bundle自动图集图片
     * @param {string} bundleName
     * @param {cc.Sprite} sprite
     * @param {string} url
     * @param {string} atalsName
     * @param {string} spName
     * @param {function} onComplete
     * @param {boolean} autoRelease
     * @param {boolean} isAutoAtlas //是否自动图集
     * @memberof ResourceManager
     */
    public loadBundleAutoAtlas(bundleName:any,sprite:cc.Sprite, url:string, spName:string, onComplete?:Function, autoRelease?:boolean,isAutoAtlas = true)
    {
        let self = this
        if(CC_PREVIEW && isAutoAtlas)
        {
            let index = url.lastIndexOf("/");
            if(index > 0){
                url = url.substring(0, index);
            }
            let texture = this.getBundleRes(bundleName,url + "/" + spName, cc.Texture2D);
            if (texture) {
                if(!sprite.isValid) {
                    return;
                }

                sprite.spriteFrame = new cc.SpriteFrame(texture);
                if(onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadBundleRes(bundleName,url + "/" + spName, (error, texture:cc.Texture2D)=>{
                    Logger.log("bundleName " + bundleName)
                    if(error != null) {
                        Logger.error(error.message, url + "/" + spName);
                    }
                    if(texture == null) {
                        return;
                    } 
                    if(autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(texture, autoRelease);
                    }
                    
                    if(!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = new cc.SpriteFrame(texture);

                    if(onComplete) {
                        onComplete();
                    }
                })
            }
        }
        else {
            let atlas = this.getBundleRes(bundleName,url, cc.SpriteAtlas);
            if (atlas) {
                let spframe = atlas.getSpriteFrame(spName);
                if(spframe == null){
                    Logger.error("找不到sprite", spName);
                    return;
                }
                if(!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = spframe;

                if(onComplete) {
                    onComplete();
                }
            }
            else{
                this.loadBundleRes(bundleName,url, (error, atlas:cc.SpriteAtlas)=>{
                    if(error != null) {
                        Logger.error(error.message);
                    }  
                    if(atlas == null) {
                        return;
                    }
                    if(autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(atlas, autoRelease);
                    }

                    let spframe = atlas.getSpriteFrame(spName);
                    if(spframe == null) {
                        Logger.error("找不到sprite", spName);
                        return;
                    }
                    if(!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = spframe;
                    
                    if(onComplete) {
                        onComplete();
                    }
                });
            }
        }
    }

    /** 懒加载资源 不会执行解析和初始化*/
    public lazyLoadBundleRes(bundleName:any, path: string | string[], type?: typeof cc.Asset){
        let bundle:cc.AssetManager.Bundle = cc.assetManager.getBundle(bundleName.toString())
        if (bundle){
            bundle.preload(path, type);
        }
    }

    public dumpAssets(){
        if (cc.sys.isNative){
            return;
        }
        let map = cc.assetManager.assets._map;
        let str = "";
        let count = 0;
        for(let i in map){
            let info = map[i];
            if (info._name || info.nativeUrl){
                str += `[${info._name},${info.nativeUrl},${info.refCount},${String(info.isValid)}]; /n`;
            }
            count += 1;
        }
        Logger.log(count, str);
    }
}