"use strict";
cc._RF.push(module, '05b79sxp1NGpb267DBquwCr', 'ResourceManager');
// hall/scripts/framework/resource/ResourceManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReleaseHelper_1 = require("../../logic/core/tool/ReleaseHelper");
var CacheInfo = /** @class */ (function () {
    function CacheInfo() {
    }
    return CacheInfo;
}());
//资源管理器
//@todo  资源加载，依赖管理， 资源释放
var ResourceManager = /** @class */ (function () {
    function ResourceManager() {
        //资源映射
        this._resMap = new Map();
        //收集依赖的资源路径
        this._useSet = new Set();
        this.releaseHelper = new ReleaseHelper_1.default;
        this.atlasMap = {};
    }
    Object.defineProperty(ResourceManager.prototype, "gameBundle", {
        get: function () {
            return this._gameBundle;
        },
        set: function (bundle) {
            this._gameBundle = bundle;
        },
        enumerable: false,
        configurable: true
    });
    ResourceManager.prototype._getResItem = function (url, type) {
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
    };
    ResourceManager.prototype.addDependKey = function (item, refKey) {
        if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
            for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                var depKey = _a[_i];
                // 记录该资源被我引用
                this.getCacheInfo(depKey).refs.add(refKey);
                // Logger.log(`${depKey} ref by ${refKey}`);
                var ccloader = cc.loader;
                var depItem = ccloader._cache[depKey];
                this.addDependKey(depItem, refKey);
            }
        }
    };
    ResourceManager.prototype.getCacheInfo = function (key) {
        if (!this._resMap.has(key)) {
            this._resMap.set(key, {
                refs: new Set(),
                uses: new Set()
            });
        }
        return this._resMap.get(key);
    };
    ResourceManager.prototype.print = function (id) {
        for (var key in this._resMap) {
            if (key.indexOf(id))
                Logger.error(this._resMap[id]);
        }
    };
    //加载单个资源
    //只能加载Resources下资源，不能加后缀名
    //collectDep 是否收集依赖，暂时只对大厅ui和预加载资源生效 
    ResourceManager.prototype.loadRes = function (url, onComplete, type, onProgress, autoRelease, collectDep) {
        var _this = this;
        if (collectDep === void 0) { collectDep = false; }
        var self = this;
        var completeFunc = function (error, resource) {
            if (collectDep) {
                if (!_this._useSet.has(url))
                    _this._useSet.add(url);
            }
            if (onComplete) {
                onComplete(error, resource);
            }
        };
        if (url.indexOf("@") > 0) {
            var urlArray = url.split("@");
            if (urlArray && urlArray.length > 0) {
                var bundleName = urlArray[0];
                var resPath = urlArray[1];
                if (bundleName && resPath) {
                    if (bundleName == "hall") {
                        this.loadBundleRes(Global.customApp.getHallBundleName(), resPath, completeFunc);
                    }
                    else {
                        Logger.error("bundleName not exist");
                    }
                }
                else {
                    if (completeFunc) {
                        var error = new Error();
                        error.message = "res load error";
                        completeFunc(error, null);
                    }
                }
            }
            else {
                if (completeFunc) {
                    var error = new Error();
                    error.message = "res load error";
                    completeFunc(error, null);
                }
            }
        }
        else {
            cc.loader.loadRes(url, type, onProgress, completeFunc);
        }
    };
    //加载资源列表
    ResourceManager.prototype.loadResArr = function (urls, onComplete, type, onProgress, autoRelease, collectDep) {
        var _this = this;
        if (collectDep === void 0) { collectDep = false; }
        var self = this;
        var completeFunc = function (error, resource) {
            if (error != null && CC_PREVIEW)
                Logger.error(error);
            if (!resource)
                return Logger.error("resource == null", JSON.stringify(urls));
            resource.forEach(function (asset, index) {
                if (collectDep) {
                    var url = urls[index];
                    if (!_this._useSet.has(url))
                        _this._useSet.add(url);
                    var item = _this._getResItem(url, type);
                    if (item && item.id) {
                        _this.addDependKey(item, item.id);
                    }
                    else {
                        // Logger.warn(`addDependKey item error1! for ${url}`);
                    }
                    // 给自己加一个自身的引用
                    if (item) {
                        var info = _this.getCacheInfo(item.id);
                        info.refs.add(item.id);
                    }
                }
            });
            if (autoRelease && !error) {
                resource.forEach(function (asset, index) {
                    self.setAutoReleaseRecursively(asset, true);
                });
            }
            if (onComplete) {
                onComplete(error, resource);
            }
        };
        cc.loader.loadResArray(urls, type, onProgress, completeFunc);
    };
    //加载路径下所有资源
    ResourceManager.prototype.loadResDir = function (url, onComplete, type, onProgress, autoRelease) {
        var self = this;
        var completeFunc = function (error, resource) {
            if (autoRelease && !error) {
                resource.forEach(function (asset, index) {
                    self.setAutoReleaseRecursively(asset, true);
                });
            }
            if (onComplete) {
                onComplete(error, resource);
            }
        };
        cc.loader.loadResDir(url, type, onProgress, completeFunc);
    };
    ResourceManager.prototype.setAutoRelease = function (res, autoRelease) {
        cc.loader.setAutoRelease(res, autoRelease);
    };
    //切场景时清理资源
    ResourceManager.prototype.setAutoReleaseRecursively = function (res, autoRelease) {
        cc.loader.setAutoReleaseRecursively(res, autoRelease);
    };
    /**
     * 获取自动图集图片
     * @param {cc.Sprite} sprite
     * @param {string} url
     * @param {string} atalsName
     * @param {string} spName
     * @memberof ResourceManager
     */
    ResourceManager.prototype.loadAutoAtlas = function (sprite, url, spName, onComplete, autoRelease) {
        var self = this;
        if (CC_PREVIEW) {
            var index = url.lastIndexOf("/");
            if (index > 0) {
                url = url.substring(0, index);
            }
            var texture = this.getRes(url + "/" + spName, cc.Texture2D);
            if (texture) {
                if (!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                if (onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadRes(url + "/" + spName, function (error, texture) {
                    if (error != null) {
                        Logger.error(error.message, url + "/" + spName);
                    }
                    if (texture == null) {
                        return;
                    }
                    if (autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(texture, autoRelease);
                    }
                    if (!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    if (onComplete) {
                        onComplete();
                    }
                });
            }
        }
        else {
            var atlas = this.getRes(url, cc.SpriteAtlas);
            if (atlas) {
                var spframe = atlas.getSpriteFrame(spName);
                if (spframe == null) {
                    Logger.error("找不到sprite", spName);
                    return;
                }
                if (!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = spframe;
                if (onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadRes(url, function (error, atlas) {
                    if (error != null) {
                        Logger.error(error.message);
                    }
                    if (atlas == null) {
                        return;
                    }
                    if (autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(atlas, autoRelease);
                    }
                    var spframe = atlas.getSpriteFrame(spName);
                    if (spframe == null) {
                        Logger.error("找不到sprite", spName);
                        return;
                    }
                    if (!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = spframe;
                    if (onComplete) {
                        onComplete();
                    }
                }, cc.SpriteAtlas);
            }
        }
    };
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
    ResourceManager.prototype.load = function (resources, onComplete, onProgress) {
        cc.loader.load(resources, onProgress, onComplete);
    };
    ResourceManager.prototype.loadResSprite = function (sp, atlas, icon) {
        Global.ResourceManager.loadRes(atlas, function (error, atlas) {
            if (error != null) {
                Logger.error("加载图集错误", error.message);
            }
            if (atlas == null || !atlas.getSpriteFrame(icon)) {
                Logger.error("找不到资源", atlas, icon);
                return;
            }
            sp.spriteFrame = atlas.getSpriteFrame(icon);
        }, cc.SpriteAtlas);
    };
    ResourceManager.prototype.getRes = function (url, type) {
        return cc.loader.getRes(url, type);
    };
    //预加载部分图集
    ResourceManager.prototype.loadAtlasArr = function (urls, onComplete) {
        var _this = this;
        this.loadResArr(urls, function (error, resources) {
            if (error != null) {
                Logger.error("加载图集异常", error.message);
            }
            for (var i = 0; i < urls.length; i++) {
                var atlas = _this.getRes(urls[i], cc.SpriteAtlas);
                if (atlas != null)
                    _this.atlasMap[urls[i]] = atlas;
            }
            if (onComplete)
                onComplete(error, resources);
        }, cc.SpriteAtlas, null, false, true);
    };
    //返回cc.spriteAtlas  可能为空  
    ResourceManager.prototype.getAtlas = function (url) {
        var atlas = this.atlasMap[url];
        if (atlas == null) {
            Logger.error("获取图集为空，需要自行预加载图集  或者适用ResLoad 手动加载图集", url);
        }
        if (!cc.isValid(atlas)) {
            Logger.error("图集已经销毁，不应该再适用，需检查原因", url);
            atlas = null;
        }
        return atlas;
    };
    ResourceManager.prototype.getSprite = function (atlasPath, spName) {
        var atlas = this.getAtlas(atlasPath);
        if (atlas == null)
            return null;
        return atlas.getSpriteFrame(spName);
    };
    //-----资源释放接口 -------
    ResourceManager.prototype.releaseRes = function (url, type) {
        cc.resources.release(url, type);
    };
    ResourceManager.prototype.releaseAsset = function (asset) {
        cc.assetManager.releaseAsset(asset);
    };
    ResourceManager.prototype.releaseDir = function (url, type) {
        cc.resources.release(url, type);
    };
    ResourceManager.prototype.release = function (asset) {
        cc.resources.release(asset);
    };
    ResourceManager.prototype.releaseCache = function (url, type) {
        cc.resources.release(url, type);
    };
    // 释放一个资源
    ResourceManager.prototype._release = function (item, itemUrl) {
        var _this = this;
        if (!item) {
            return;
        }
        var cacheInfo = this.getCacheInfo(item.id);
        // 解除自身对自己的引用
        cacheInfo.refs.delete(itemUrl);
        // 解除引用
        var delDependKey = function (item, refKey) {
            if (item && item.dependKeys && Array.isArray(item.dependKeys)) {
                for (var _i = 0, _a = item.dependKeys; _i < _a.length; _i++) {
                    var depKey = _a[_i];
                    var ccloader = cc.loader;
                    var depItem = ccloader._cache[depKey];
                    _this._release(depItem, refKey);
                }
            }
        };
        delDependKey(item, itemUrl);
        if (cacheInfo.uses.size == 0 && cacheInfo.refs.size == 0) {
            //如果没有uuid,就直接释放url
            if (item.uuid) {
                cc.loader.release(item.uuid);
                // Logger.log("resloader release item by uuid :" + item.id);
            }
            else {
                cc.loader.release(item.id);
                // Logger.log("resloader release item by url:" + item.id);
            }
            this._resMap.delete(item.id);
        }
    };
    /**
     * 释放资源和它的引用, 它引用的资源被释放会影响其他同样正在引用的资源 (慎用, 除非你确认没有任何其它引用的时候才使用接口)
     * @param path 资源路径
     */
    ResourceManager.prototype.releaseWithDepend = function (path) {
        Logger.warn("释放资源和它引用的资源", path);
        var deps = cc.loader.getDependsRecursively(path);
        cc.loader.release(path);
        cc.loader.release(deps);
    };
    /******************2.4.0 新增************************/
    /**
     * 加载bundle
     * @param {string} nameOrUrl
     * @param {Function} onComplete
     * @param {Record<string, any>} options
    */
    ResourceManager.prototype.loadBundle = function (nameOrUrl, onComplete, options) {
        cc.assetManager.loadBundle(nameOrUrl, options, function (err, bundle) {
            if (onComplete) {
                onComplete(err, bundle);
            }
        });
    };
    /** 检测bundle是否已加载到内存 */
    ResourceManager.prototype.checkBundleValid = function (bundleName) {
        return cc.assetManager.getBundle(bundleName.toString());
    };
    /**
     * 加载当前游戏bundle res
     * @param {string|string[]} paths
     * @param {Function} onComplete
    */
    ResourceManager.prototype.loadGameBundleRes = function (paths, onComplete, type) {
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            this.loadBundleRes(bundleName, paths, onComplete, type);
        }
        else {
            Logger.error("loadGameBundleRes bundleName null");
        }
    };
    /**
     * 加载指定bundle res
     * @param {string} bundleName
     * @param {string|string[]} paths
     * @param {Function} onComplete
    */
    ResourceManager.prototype.loadBundleRes = function (bundleName, paths, onComplete, type) {
        // test
        // if (typeof paths == 'string'){
        //     Logger.error("paths  = " + paths) 
        //     let getRes = this.getBundleRes(bundleName,paths,type) 
        //     if (getRes){
        //         Logger.error("getRes ==== " + getRes)
        //     }
        var _this = this;
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
        var bundle = cc.assetManager.getBundle(bundleName.toString());
        if (bundle) {
            bundle.load(paths, type, function (err, res) {
                if (!err && res) {
                    if (typeof paths == 'string') {
                        _this.releaseHelper.addBundleRelease(bundleName, paths, type);
                    }
                    else if (typeof paths === 'object') {
                        for (var j = 0; j < paths.length; j++) {
                            var path = paths[j];
                            //Logger.error("path  = " + path)
                            _this.releaseHelper.addBundleRelease(bundleName, path, type);
                        }
                    }
                }
                if (onComplete) {
                    onComplete(err, res);
                }
            });
        }
    };
    /**
     * 获取游戏bundle res
     * @param {string} path
     * @param {cc.Asset} type
    */
    ResourceManager.prototype.getGameBundleRes = function (path, type) {
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            var res = this.getBundleRes(bundleName, path, type);
            if (res) {
                return res;
            }
            else {
                Logger.error("getGameBundleRes getBundleRes null");
            }
        }
        else {
            Logger.error("getGameBundleRes bundleName null");
        }
    };
    /**
     * 获取指定bundle res
     * @param {string} bundleName
     * @param {string} path
     * @param {cc.Asset} type
    */
    ResourceManager.prototype.getBundleRes = function (bundleName, path, type) {
        var bundle = cc.assetManager.getBundle(bundleName.toString());
        if (bundle) {
            var res = bundle.get(path, type);
            return res;
        }
    };
    /**
     * 加载当前游戏bundle dir
     * @param {string} path
     * @param {Function} onComplete
    */
    ResourceManager.prototype.loadGameBundleDir = function (path, onComplete, type) {
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            this.loadBundleDir(bundleName, path, onComplete, type);
        }
        else {
            Logger.error("loadGameBundleDir bundleName null");
        }
    };
    /**
     * 加载指定bundle dir
     * @param {string} bundleName
     * @param {string} path
     * @param {Function} onComplete
    */
    ResourceManager.prototype.loadBundleDir = function (bundleName, path, onComplete, type) {
        var _this = this;
        var bundle = cc.assetManager.getBundle(bundleName.toString());
        if (bundle) {
            bundle.loadDir(path, type, function (err, res) {
                if (!err && res) {
                    _this.releaseHelper.addBundleRelease(bundleName, path, type);
                }
                if (onComplete) {
                    onComplete(err, res);
                }
            });
        }
    };
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
    ResourceManager.prototype.loadGameBundleAutoAtlas = function (sprite, url, spName, onComplete, autoRelease, isAutoAtlas) {
        if (isAutoAtlas === void 0) { isAutoAtlas = true; }
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            this.loadBundleAutoAtlas(bundleName, sprite, url, spName, onComplete, autoRelease, isAutoAtlas);
        }
        else {
            Logger.error("loadGameBundleAutoAtlas bundleName null");
        }
    };
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
    ResourceManager.prototype.loadBundleAutoAtlas = function (bundleName, sprite, url, spName, onComplete, autoRelease, isAutoAtlas) {
        if (isAutoAtlas === void 0) { isAutoAtlas = true; }
        var self = this;
        if (CC_PREVIEW && isAutoAtlas) {
            var index = url.lastIndexOf("/");
            if (index > 0) {
                url = url.substring(0, index);
            }
            var texture = this.getBundleRes(bundleName, url + "/" + spName, cc.Texture2D);
            if (texture) {
                if (!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                if (onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadBundleRes(bundleName, url + "/" + spName, function (error, texture) {
                    Logger.log("bundleName " + bundleName);
                    if (error != null) {
                        Logger.error(error.message, url + "/" + spName);
                    }
                    if (texture == null) {
                        return;
                    }
                    if (autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(texture, autoRelease);
                    }
                    if (!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = new cc.SpriteFrame(texture);
                    if (onComplete) {
                        onComplete();
                    }
                });
            }
        }
        else {
            var atlas = this.getBundleRes(bundleName, url, cc.SpriteAtlas);
            if (atlas) {
                var spframe = atlas.getSpriteFrame(spName);
                if (spframe == null) {
                    Logger.error("找不到sprite", spName);
                    return;
                }
                if (!sprite.isValid) {
                    return;
                }
                sprite.spriteFrame = spframe;
                if (onComplete) {
                    onComplete();
                }
            }
            else {
                this.loadBundleRes(bundleName, url, function (error, atlas) {
                    if (error != null) {
                        Logger.error(error.message);
                    }
                    if (atlas == null) {
                        return;
                    }
                    if (autoRelease != null && autoRelease != undefined) {
                        self.setAutoReleaseRecursively(atlas, autoRelease);
                    }
                    var spframe = atlas.getSpriteFrame(spName);
                    if (spframe == null) {
                        Logger.error("找不到sprite", spName);
                        return;
                    }
                    if (!sprite.isValid) {
                        return;
                    }
                    sprite.spriteFrame = spframe;
                    if (onComplete) {
                        onComplete();
                    }
                });
            }
        }
    };
    /** 懒加载资源 不会执行解析和初始化*/
    ResourceManager.prototype.lazyLoadBundleRes = function (bundleName, path, type) {
        var bundle = cc.assetManager.getBundle(bundleName.toString());
        if (bundle) {
            bundle.preload(path, type);
        }
    };
    ResourceManager.prototype.dumpAssets = function () {
        if (cc.sys.isNative) {
            return;
        }
        var map = cc.assetManager.assets._map;
        var str = "";
        var count = 0;
        for (var i in map) {
            var info = map[i];
            if (info._name || info.nativeUrl) {
                str += "[" + info._name + "," + info.nativeUrl + "," + info.refCount + "," + String(info.isValid) + "]; /n";
            }
            count += 1;
        }
        Logger.log(count, str);
    };
    return ResourceManager;
}());
exports.default = ResourceManager;

cc._RF.pop();