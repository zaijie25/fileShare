
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/resource/ResourceManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxyZXNvdXJjZVxcUmVzb3VyY2VNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQWdFO0FBRWhFO0lBQUE7SUFJQSxDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUVELE9BQU87QUFDUCx3QkFBd0I7QUFFeEI7SUFBQTtRQUdJLE1BQU07UUFDRSxZQUFPLEdBQTBCLElBQUssR0FBRyxFQUFxQixDQUFDO1FBQ3ZFLFdBQVc7UUFDSCxZQUFPLEdBQWUsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUV6QyxrQkFBYSxHQUFpQixJQUFJLHVCQUFhLENBQUM7UUFvVy9DLGFBQVEsR0FBRyxFQUFFLENBQUM7SUFrWjFCLENBQUM7SUFqdkJHLHNCQUFXLHVDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQzNCLENBQUM7YUFFRCxVQUFzQixNQUFhO1lBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzlCLENBQUM7OztPQUpBO0lBTU8scUNBQVcsR0FBbkIsVUFBb0IsR0FBVSxFQUFFLElBQXFCO1FBRWpELGlDQUFpQztRQUNqQyxtQ0FBbUM7UUFDbkMsZUFBZTtRQUNmLHlEQUF5RDtRQUN6RCxrQkFBa0I7UUFDbEIscURBQXFEO1FBQ3JELHVDQUF1QztRQUN2QyxRQUFRO1FBQ1IsSUFBSTtRQUNKLGVBQWU7SUFDbkIsQ0FBQztJQUVPLHNDQUFZLEdBQXBCLFVBQXNCLElBQUksRUFBRSxNQUFNO1FBRTlCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0QsS0FBbUIsVUFBZSxFQUFmLEtBQUEsSUFBSSxDQUFDLFVBQVUsRUFBZixjQUFlLEVBQWYsSUFBZSxFQUFFO2dCQUEvQixJQUFJ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SUFBc0I7UUFDcEYsSUFBSSxNQUFNLEdBQTBCLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3BGLElBQUksTUFBTSxFQUFDO1lBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRU0sb0NBQVUsR0FBakI7UUFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBQztZQUNiLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBQztnQkFDN0IsR0FBRyxJQUFJLE1BQUksSUFBSSxDQUFDLEtBQUssU0FBSSxJQUFJLENBQUMsU0FBUyxTQUFJLElBQUksQ0FBQyxRQUFRLFNBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBTyxDQUFDO2FBQzNGO1lBQ0QsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNkO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0E5dkJBLEFBOHZCQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbGVhc2VIZWxwZXIgZnJvbSBcIi4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9SZWxlYXNlSGVscGVyXCI7XHJcblxyXG5jbGFzcyBDYWNoZUluZm9cclxue1xyXG4gICAgcmVmczpTZXQ8c3RyaW5nPjtcclxuICAgIHVzZXM6U2V0PHN0cmluZz47XHJcbn1cclxuXHJcbi8v6LWE5rqQ566h55CG5ZmoXHJcbi8vQHRvZG8gIOi1hOa6kOWKoOi9ve+8jOS+nei1lueuoeeQhu+8jCDotYTmupDph4rmlL5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlTWFuYWdlclxyXG57XHJcblxyXG4gICAgLy/otYTmupDmmKDlsIRcclxuICAgIHByaXZhdGUgX3Jlc01hcDpNYXA8c3RyaW5nLCBDYWNoZUluZm8+ID0gbmV3ICBNYXA8c3RyaW5nLCBDYWNoZUluZm8+KCk7XHJcbiAgICAvL+aUtumbhuS+nei1lueahOi1hOa6kOi3r+W+hFxyXG4gICAgcHJpdmF0ZSBfdXNlU2V0OlNldDxzdHJpbmc+ID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VIZWxwZXI6UmVsZWFzZUhlbHBlciA9IG5ldyBSZWxlYXNlSGVscGVyO1xyXG4gICAgcHJpdmF0ZSBfZ2FtZUJ1bmRsZTpzdHJpbmc7XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdhbWVCdW5kbGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZUJ1bmRsZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZ2FtZUJ1bmRsZShidW5kbGU6c3RyaW5nKXtcclxuICAgICAgICB0aGlzLl9nYW1lQnVuZGxlID0gYnVuZGxlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2dldFJlc0l0ZW0odXJsOnN0cmluZywgdHlwZTogdHlwZW9mIGNjLkFzc2V0KVxyXG4gICAge1xyXG4gICAgICAgIC8vIGxldCBjY2xvYWRlcjogYW55ID0gY2MubG9hZGVyO1xyXG4gICAgICAgIC8vIGxldCBpdGVtID0gY2Nsb2FkZXIuX2NhY2hlW3VybF07XHJcbiAgICAgICAgLy8gaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgLy8gICAgIGxldCB1dWlkID0gY2Nsb2FkZXIuX2dldFJlc1V1aWQodXJsLCB0eXBlLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgIGlmICh1dWlkKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgcmVmID0gY2Nsb2FkZXIuX2dldFJlZmVyZW5jZUtleSh1dWlkKTtcclxuICAgICAgICAvLyAgICAgICAgIGl0ZW0gPSBjY2xvYWRlci5fY2FjaGVbcmVmXTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZERlcGVuZEtleSAoaXRlbSwgcmVmS2V5KVxyXG4gICAge1xyXG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZGVwZW5kS2V5cyAmJiBBcnJheS5pc0FycmF5KGl0ZW0uZGVwZW5kS2V5cykpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGVwS2V5IG9mIGl0ZW0uZGVwZW5kS2V5cykge1xyXG4gICAgICAgICAgICAgICAgLy8g6K6w5b2V6K+l6LWE5rqQ6KKr5oiR5byV55SoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENhY2hlSW5mbyhkZXBLZXkpLnJlZnMuYWRkKHJlZktleSk7XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIubG9nKGAke2RlcEtleX0gcmVmIGJ5ICR7cmVmS2V5fWApO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNjbG9hZGVyOiBhbnkgPSBjYy5sb2FkZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVwSXRlbSA9IGNjbG9hZGVyLl9jYWNoZVtkZXBLZXldXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZERlcGVuZEtleShkZXBJdGVtLCByZWZLZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENhY2hlSW5mbyhrZXk6IHN0cmluZyk6IENhY2hlSW5mbyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9yZXNNYXAuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzTWFwLnNldChrZXksIHtcclxuICAgICAgICAgICAgICAgIHJlZnM6IG5ldyBTZXQ8c3RyaW5nPigpLFxyXG4gICAgICAgICAgICAgICAgdXNlczogbmV3IFNldDxzdHJpbmc+KClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXNNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByaW50KGlkKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuX3Jlc01hcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGtleS5pbmRleE9mKGlkKSlcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcih0aGlzLl9yZXNNYXBbaWRdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/liqDovb3ljZXkuKrotYTmupBcclxuICAgIC8v5Y+q6IO95Yqg6L29UmVzb3VyY2Vz5LiL6LWE5rqQ77yM5LiN6IO95Yqg5ZCO57yA5ZCNXHJcbiAgICAvL2NvbGxlY3REZXAg5piv5ZCm5pS26ZuG5L6d6LWW77yM5pqC5pe25Y+q5a+55aSn5Y6FdWnlkozpooTliqDovb3otYTmupDnlJ/mlYggXHJcbiAgICBwdWJsaWMgbG9hZFJlcyh1cmw6c3RyaW5nLCBvbkNvbXBsZXRlPzooZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55KSA9PiB2b2lkLCB0eXBlPywgXHJcbiAgICAgICAgb25Qcm9ncmVzcz86KGNvbXBsZXRlZENvdW50OiBudW1iZXIsIHRvdGFsQ291bnQ6IG51bWJlciwgaXRlbTogYW55KSA9PiB2b2lkLCBcclxuICAgICAgICBhdXRvUmVsZWFzZT86Ym9vbGVhbiwgY29sbGVjdERlcDpib29sZWFuID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb21wbGV0ZUZ1bmMgPSAoZXJyb3I6IEVycm9yLCByZXNvdXJjZTogYW55KT0+e1xyXG4gICAgICAgICAgICBpZihjb2xsZWN0RGVwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fdXNlU2V0Lmhhcyh1cmwpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VzZVNldC5hZGQodXJsKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3IsIHJlc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCJAXCIpID4gMCl7XHJcbiAgICAgICAgICAgIGxldCB1cmxBcnJheSA9IHVybC5zcGxpdChcIkBcIilcclxuICAgICAgICAgICAgaWYgKHVybEFycmF5ICYmIHVybEFycmF5Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSB1cmxBcnJheVswXVxyXG4gICAgICAgICAgICAgICAgbGV0IHJlc1BhdGggPSB1cmxBcnJheVsxXVxyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bmRsZU5hbWUgJiYgcmVzUGF0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ1bmRsZU5hbWUgPT0gXCJoYWxsXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkQnVuZGxlUmVzKEdsb2JhbC5jdXN0b21BcHAuZ2V0SGFsbEJ1bmRsZU5hbWUoKSxyZXNQYXRoLGNvbXBsZXRlRnVuYylcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImJ1bmRsZU5hbWUgbm90IGV4aXN0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUZ1bmMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IFwicmVzIGxvYWQgZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUZ1bmMoZXJyb3IsbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjb21wbGV0ZUZ1bmMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSBcInJlcyBsb2FkIGVycm9yXCJcclxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZUZ1bmMoZXJyb3IsbnVsbClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXModXJsLCB0eXBlLCBvblByb2dyZXNzLCBjb21wbGV0ZUZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL+WKoOi9vei1hOa6kOWIl+ihqFxyXG4gICAgcHVibGljIGxvYWRSZXNBcnIodXJsczpzdHJpbmdbXSwgb25Db21wbGV0ZT86KGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSkgPT4gdm9pZFxyXG4gICAgICAgICwgdHlwZT8sIG9uUHJvZ3Jlc3M/Oihjb21wbGV0ZWRDb3VudDogbnVtYmVyLCB0b3RhbENvdW50OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gdm9pZCwgYXV0b1JlbGVhc2U/OmJvb2xlYW4sXHJcbiAgICAgICAgIGNvbGxlY3REZXAgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNvbXBsZXRlRnVuYyA9IChlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yICE9IG51bGwgJiYgQ0NfUFJFVklFVylcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGlmICghcmVzb3VyY2UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTG9nZ2VyLmVycm9yKFwicmVzb3VyY2UgPT0gbnVsbFwiLCBKU09OLnN0cmluZ2lmeSh1cmxzKSk7XHJcbiAgICAgICAgICAgIHJlc291cmNlLmZvckVhY2goKGFzc2V0OmFueSwgaW5kZXg6bnVtYmVyKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY29sbGVjdERlcClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gdXJsc1tpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX3VzZVNldC5oYXModXJsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXNlU2V0LmFkZCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5fZ2V0UmVzSXRlbSh1cmwsIHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREZXBlbmRLZXkoaXRlbSwgaXRlbS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLndhcm4oYGFkZERlcGVuZEtleSBpdGVtIGVycm9yMSEgZm9yICR7dXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyDnu5noh6rlt7HliqDkuIDkuKroh6rouqvnmoTlvJXnlKhcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0Q2FjaGVJbmZvKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLnJlZnMuYWRkKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGF1dG9SZWxlYXNlICYmICFlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuZm9yRWFjaCgoYXNzZXQ6YW55LCBpbmRleDpudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkoYXNzZXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYob25Db21wbGV0ZSkgeyAgICBcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyb3IsIHJlc291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0FycmF5KHVybHMsIHR5cGUsIG9uUHJvZ3Jlc3MsIGNvbXBsZXRlRnVuYyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb3ot6/lvoTkuIvmiYDmnInotYTmupBcclxuICAgIHB1YmxpYyBsb2FkUmVzRGlyKHVybDpzdHJpbmcsIG9uQ29tcGxldGU/OihlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQsIHR5cGU/LCBvblByb2dyZXNzPzooY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHZvaWQsIGF1dG9SZWxlYXNlPzpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY29tcGxldGVGdW5jID0gKGVycm9yOiBFcnJvciwgcmVzb3VyY2U6IGFueSk9PntcclxuXHJcbiAgICAgICAgICAgIGlmKGF1dG9SZWxlYXNlICYmICFlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2UuZm9yRWFjaCgoYXNzZXQ6YW55LCBpbmRleDpudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkoYXNzZXQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYob25Db21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShlcnJvciwgcmVzb3VyY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKHVybCwgdHlwZSwgb25Qcm9ncmVzcywgY29tcGxldGVGdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXV0b1JlbGVhc2UocmVzLCBhdXRvUmVsZWFzZSlcclxuICAgIHtcclxuICAgICAgICBjYy5sb2FkZXIuc2V0QXV0b1JlbGVhc2UocmVzLCBhdXRvUmVsZWFzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liIflnLrmma/ml7bmuIXnkIbotYTmupBcclxuICAgIHB1YmxpYyBzZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KHJlcywgYXV0b1JlbGVhc2UpXHJcbiAgICB7XHJcbiAgICAgICAgY2MubG9hZGVyLnNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkocmVzLCBhdXRvUmVsZWFzZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6Ieq5Yqo5Zu+6ZuG5Zu+54mHXHJcbiAgICAgKiBAcGFyYW0ge2NjLlNwcml0ZX0gc3ByaXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXRhbHNOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3BOYW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVzb3VyY2VNYW5hZ2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXV0b0F0bGFzKHNwcml0ZTpjYy5TcHJpdGUsIHVybDpzdHJpbmcsIHNwTmFtZTpzdHJpbmcsIG9uQ29tcGxldGU/OkZ1bmN0aW9uLCBhdXRvUmVsZWFzZT86Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBpZihDQ19QUkVWSUVXKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdXJsLmxhc3RJbmRleE9mKFwiL1wiKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggPiAwKXtcclxuICAgICAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5nZXRSZXModXJsICsgXCIvXCIgKyBzcE5hbWUsIGNjLlRleHR1cmUyRCk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBpZighc3ByaXRlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG4gICAgICAgICAgICAgICAgaWYob25Db21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlcyh1cmwgKyBcIi9cIiArIHNwTmFtZSwgKGVycm9yLCB0ZXh0dXJlOmNjLlRleHR1cmUyRCk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlLCB1cmwgKyBcIi9cIiArIHNwTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRleHR1cmUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBpZihhdXRvUmVsZWFzZSAhPSBudWxsICYmIGF1dG9SZWxlYXNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkodGV4dHVyZSwgYXV0b1JlbGVhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZighc3ByaXRlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBhdGxhcyA9IHRoaXMuZ2V0UmVzKHVybCwgY2MuU3ByaXRlQXRsYXMpO1xyXG4gICAgICAgICAgICBpZiAoYXRsYXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKHNwZnJhbWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiwc3ByaXRlXCIsIHNwTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoIXNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3BmcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRSZXModXJsLCAoZXJyb3IsIGF0bGFzOmNjLlNwcml0ZUF0bGFzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF0bGFzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihhdXRvUmVsZWFzZSAhPSBudWxsICYmIGF1dG9SZWxlYXNlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldEF1dG9SZWxlYXNlUmVjdXJzaXZlbHkoYXRsYXMsIGF1dG9SZWxlYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3BOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihzcGZyYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiwc3ByaXRlXCIsIHNwTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3BmcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBjYy5TcHJpdGVBdGxhcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mlK/mjIHliqDovb3ljZXkuKrmiJblpJrkuKrotYTmupBcclxuICAgIC8v5pSv5oyB5Yqg6L296L+c56iL6LWE5rqQXHJcbiAgICAvL+aUr+aMgeacrOWcsOi1hOa6kO+8iOe7neWvuei3r+W+hO+8iVxyXG4gICAgLy8gY2MubG9hZGVyLmxvYWQoJ2EucG5nJywgZnVuY3Rpb24gKGVyciwgdGV4KSB7XHJcbiAgICAvLyAgICAgTG9nZ2VyLmxvZygnUmVzdWx0IHNob3VsZCBiZSBhIHRleHR1cmU6ICcgKyAodGV4IGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSk7XHJcbiAgICAvLyB9KTtcclxuICAgIFxyXG4gICAgLy8gY2MubG9hZGVyLmxvYWQoJ2h0dHA6Ly9leGFtcGxlLmNvbS9hLnBuZycsIGZ1bmN0aW9uIChlcnIsIHRleCkge1xyXG4gICAgLy8gICAgIExvZ2dlci5sb2coJ1Nob3VsZCBsb2FkIGEgdGV4dHVyZSBmcm9tIGV4dGVybmFsIHVybDogJyArICh0ZXggaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpKTtcclxuICAgIC8vIH0pO1xyXG4gICAgXHJcbiAgICAvLyBjYy5sb2FkZXIubG9hZCh7dXJsOiAnaHR0cDovL2V4YW1wbGUuY29tL2dldEltYWdlUkVTVD9maWxlPWEucG5nJywgdHlwZTogJ3BuZyd9LCBmdW5jdGlvbiAoZXJyLCB0ZXgpIHtcclxuICAgIC8vICAgICBMb2dnZXIubG9nKCdTaG91bGQgbG9hZCBhIHRleHR1cmUgZnJvbSBSRVNUZnVsIEFQSSBieSBzcGVjaWZ5IHRoZSB0eXBlOiAnICsgKHRleCBpbnN0YW5jZW9mIGNjLlRleHR1cmUyRCkpO1xyXG4gICAgLy8gfSk7XHJcbiAgICBcclxuICAgIC8vIGNjLmxvYWRlci5sb2FkKFsnYS5wbmcnLCAnYi5qc29uJ10sIGZ1bmN0aW9uIChlcnJvcnMsIHJlc3VsdHMpIHtcclxuICAgIC8vICAgICBpZiAoZXJyb3JzKSB7XHJcbiAgICAvLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBMb2dnZXIubG9nKCdFcnJvciB1cmwgWycgKyBlcnJvcnNbaV0gKyAnXTogJyArIHJlc3VsdHMuZ2V0RXJyb3IoZXJyb3JzW2ldKSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgdmFyIGFUZXggPSByZXN1bHRzLmdldENvbnRlbnQoJ2EucG5nJyk7XHJcbiAgICAvLyAgICAgdmFyIGJKc29uT2JqID0gcmVzdWx0cy5nZXRDb250ZW50KCdiLmpzb24nKTtcclxuICAgIC8vIH0pO1xyXG4gICAgcHVibGljIGxvYWQocmVzb3VyY2VzLCBvbkNvbXBsZXRlPzpGdW5jdGlvbiwgb25Qcm9ncmVzcz8gKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkKHJlc291cmNlcywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBsb2FkUmVzU3ByaXRlKHNwOmNjLlNwcml0ZSAsYXRsYXM6c3RyaW5nLCBpY29uOnN0cmluZykgXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkUmVzKGF0bGFzLCAoZXJyb3IsIGF0bGFzOmNjLlNwcml0ZUF0bGFzKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3lm77pm4bplJnor69cIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYXRsYXMgPT0gbnVsbCB8fCAhYXRsYXMuZ2V0U3ByaXRlRnJhbWUoaWNvbikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsOi1hOa6kFwiLCBhdGxhcywgaWNvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3Auc3ByaXRlRnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZShpY29uKTtcclxuICAgICAgICB9LCBjYy5TcHJpdGVBdGxhcylcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFJlcyh1cmw6c3RyaW5nLCB0eXBlOmFueSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gY2MubG9hZGVyLmdldFJlcyh1cmwsIHR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgLy/pooTliqDovb3pg6jliIblm77pm4ZcclxuICAgIHB1YmxpYyBsb2FkQXRsYXNBcnIodXJsczpzdHJpbmdbXSwgb25Db21wbGV0ZT8gOihlcnJvcjogRXJyb3IsIHJlc291cmNlOiBhbnkpID0+IHZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkUmVzQXJyKHVybHMsIChlcnJvciwgcmVzb3VyY2VzKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3lm77pm4blvILluLhcIiwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBhdGxhcyA9IHRoaXMuZ2V0UmVzKHVybHNbaV0sIGNjLlNwcml0ZUF0bGFzKTtcclxuICAgICAgICAgICAgICAgIGlmKGF0bGFzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdGxhc01hcFt1cmxzW2ldXSA9IGF0bGFzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpXHJcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKGVycm9yLCByZXNvdXJjZXMpO1xyXG4gICAgICAgIH0sIGNjLlNwcml0ZUF0bGFzLCBudWxsLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXRsYXNNYXAgPSB7fTtcclxuXHJcbiAgICAvL+i/lOWbnmNjLnNwcml0ZUF0bGFzICDlj6/og73kuLrnqbogIFxyXG4gICAgcHVibGljIGdldEF0bGFzKHVybDpzdHJpbmcpOmNjLlNwcml0ZUF0bGFzXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGF0bGFzID0gdGhpcy5hdGxhc01hcFt1cmxdO1xyXG4gICAgICAgIGlmKGF0bGFzID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLojrflj5blm77pm4bkuLrnqbrvvIzpnIDopoHoh6rooYzpooTliqDovb3lm77pm4YgIOaIluiAhemAgueUqFJlc0xvYWQg5omL5Yqo5Yqg6L295Zu+6ZuGXCIsIHVybClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWNjLmlzVmFsaWQoYXRsYXMpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Zu+6ZuG5bey57uP6ZSA5q+B77yM5LiN5bqU6K+l5YaN6YCC55So77yM6ZyA5qOA5p+l5Y6f5ZugXCIsIHVybCk7XHJcbiAgICAgICAgICAgIGF0bGFzID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhdGxhcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U3ByaXRlKGF0bGFzUGF0aDpzdHJpbmcsIHNwTmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGF0bGFzID0gdGhpcy5nZXRBdGxhcyhhdGxhc1BhdGgpO1xyXG4gICAgICAgIGlmKGF0bGFzID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBhdGxhcy5nZXRTcHJpdGVGcmFtZShzcE5hbWUpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy8tLS0tLei1hOa6kOmHiuaUvuaOpeWPoyAtLS0tLS0tXHJcblxyXG4gICAgcHVibGljIHJlbGVhc2VSZXModXJsOnN0cmluZywgdHlwZT8pXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLnJlbGVhc2UodXJsLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZUFzc2V0KGFzc2V0KVxyXG4gICAge1xyXG4gICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZWxlYXNlQXNzZXQoYXNzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlRGlyKHVybCwgdHlwZT8pXHJcbiAgICB7XHJcbiAgICAgICAgY2MucmVzb3VyY2VzLnJlbGVhc2UodXJsLCB0eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWxlYXNlKGFzc2V0KVxyXG4gICAge1xyXG4gICAgICAgIGNjLnJlc291cmNlcy5yZWxlYXNlKGFzc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZUNhY2hlKHVybCwgdHlwZSlcclxuICAgIHtcclxuICAgICAgICBjYy5yZXNvdXJjZXMucmVsZWFzZSh1cmwsdHlwZSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YeK5pS+5LiA5Liq6LWE5rqQXHJcbiAgICBwcml2YXRlIF9yZWxlYXNlKGl0ZW0sIGl0ZW1VcmwpIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2FjaGVJbmZvID0gdGhpcy5nZXRDYWNoZUluZm8oaXRlbS5pZCk7XHJcbiAgICAgICAgLy8g6Kej6Zmk6Ieq6Lqr5a+56Ieq5bex55qE5byV55SoXHJcbiAgICAgICAgY2FjaGVJbmZvLnJlZnMuZGVsZXRlKGl0ZW1VcmwpO1xyXG4gICAgICAgIC8vIOino+mZpOW8leeUqFxyXG4gICAgICAgIGxldCBkZWxEZXBlbmRLZXkgPSAoaXRlbSwgcmVmS2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZGVwZW5kS2V5cyAmJiBBcnJheS5pc0FycmF5KGl0ZW0uZGVwZW5kS2V5cykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGRlcEtleSBvZiBpdGVtLmRlcGVuZEtleXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2Nsb2FkZXI6IGFueSA9IGNjLmxvYWRlcjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVwSXRlbSA9IGNjbG9hZGVyLl9jYWNoZVtkZXBLZXldXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVsZWFzZShkZXBJdGVtLCByZWZLZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbERlcGVuZEtleShpdGVtLCBpdGVtVXJsKTtcclxuXHJcbiAgICAgICAgaWYgKGNhY2hlSW5mby51c2VzLnNpemUgPT0gMCAmJiBjYWNoZUluZm8ucmVmcy5zaXplID09IDApIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmsqHmnIl1dWlkLOWwseebtOaOpemHiuaUvnVybFxyXG4gICAgICAgICAgICBpZiAoaXRlbS51dWlkKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIucmVsZWFzZShpdGVtLnV1aWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInJlc2xvYWRlciByZWxlYXNlIGl0ZW0gYnkgdXVpZCA6XCIgKyBpdGVtLmlkKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5yZWxlYXNlKGl0ZW0uaWQpO1xyXG4gICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcInJlc2xvYWRlciByZWxlYXNlIGl0ZW0gYnkgdXJsOlwiICsgaXRlbS5pZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fcmVzTWFwLmRlbGV0ZShpdGVtLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph4rmlL7otYTmupDlkozlroPnmoTlvJXnlKgsIOWug+W8leeUqOeahOi1hOa6kOiiq+mHiuaUvuS8muW9seWTjeWFtuS7luWQjOagt+ato+WcqOW8leeUqOeahOi1hOa6kCAo5oWO55SoLCDpmaTpnZ7kvaDnoa7orqTmsqHmnInku7vkvZXlhbblroPlvJXnlKjnmoTml7blgJnmiY3kvb/nlKjmjqXlj6MpXHJcbiAgICAgKiBAcGFyYW0gcGF0aCDotYTmupDot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbGVhc2VXaXRoRGVwZW5kKHBhdGg6IHN0cmluZyl7XHJcbiAgICAgICAgTG9nZ2VyLndhcm4oXCLph4rmlL7otYTmupDlkozlroPlvJXnlKjnmoTotYTmupBcIiwgcGF0aCk7XHJcbiAgICAgICAgbGV0IGRlcHMgPSBjYy5sb2FkZXIuZ2V0RGVwZW5kc1JlY3Vyc2l2ZWx5KHBhdGgpO1xyXG4gICAgICAgIGNjLmxvYWRlci5yZWxlYXNlKHBhdGgpO1xyXG4gICAgICAgIGNjLmxvYWRlci5yZWxlYXNlKGRlcHMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKjIuNC4wIOaWsOWinioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L29YnVuZGxlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZU9yVXJsXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlXHJcbiAgICAgKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIGFueT59IG9wdGlvbnNcclxuICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEJ1bmRsZShuYW1lT3JVcmw6IHN0cmluZyAsb25Db21wbGV0ZT86IChlcnI6IEVycm9yLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHZvaWQsb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRCdW5kbGUobmFtZU9yVXJsLG9wdGlvbnMsKGVycixidW5kbGUpPT57XHJcbiAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKXtcclxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyLGJ1bmRsZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOajgOa1i2J1bmRsZeaYr+WQpuW3suWKoOi9veWIsOWGheWtmCAqL1xyXG4gICAgcHVibGljIGNoZWNrQnVuZGxlVmFsaWQoYnVuZGxlTmFtZTogYW55KXtcclxuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShidW5kbGVOYW1lLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295b2T5YmN5ri45oiPYnVuZGxlIHJlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IHBhdGhzXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkNvbXBsZXRlXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGxvYWRHYW1lQnVuZGxlUmVzKHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sb25Db21wbGV0ZT86RnVuY3Rpb24sdHlwZT86IHR5cGVvZiBjYy5Bc3NldCl7XHJcbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdhbWVCdW5kbGVcclxuICAgICAgICBpZiAoYnVuZGxlTmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZEJ1bmRsZVJlcyhidW5kbGVOYW1lLHBhdGhzLG9uQ29tcGxldGUsdHlwZSlcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImxvYWRHYW1lQnVuZGxlUmVzIGJ1bmRsZU5hbWUgbnVsbFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295oyH5a6aYnVuZGxlIHJlc1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGJ1bmRsZU5hbWVcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwYXRoc1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25Db21wbGV0ZVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQnVuZGxlUmVzKGJ1bmRsZU5hbWU6YW55LHBhdGhzOiBzdHJpbmd8c3RyaW5nW10sb25Db21wbGV0ZT86RnVuY3Rpb24sdHlwZT86IHR5cGVvZiBjYy5Bc3NldCl7XHJcbiAgICAgICAgLy8gdGVzdFxyXG4gICAgICAgIC8vIGlmICh0eXBlb2YgcGF0aHMgPT0gJ3N0cmluZycpe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIuZXJyb3IoXCJwYXRocyAgPSBcIiArIHBhdGhzKSBcclxuICAgICAgICAvLyAgICAgbGV0IGdldFJlcyA9IHRoaXMuZ2V0QnVuZGxlUmVzKGJ1bmRsZU5hbWUscGF0aHMsdHlwZSkgXHJcbiAgICAgICAgLy8gICAgIGlmIChnZXRSZXMpe1xyXG4gICAgICAgIC8vICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0UmVzID09PT0gXCIgKyBnZXRSZXMpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gfWVsc2UgaWYgKHR5cGVvZiBwYXRocyA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgIC8vICAgICBmb3IgKGxldCBqID0wO2o8IHBhdGhzLmxlbmd0aDtqKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHBhdGggPSBwYXRoc1tqXVxyXG4gICAgICAgIC8vICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGF0aCAgPSBcIiArIHBhdGgpXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgZ2V0UmVzID0gdGhpcy5nZXRCdW5kbGVSZXMoYnVuZGxlTmFtZSxwYXRoLHR5cGUpIFxyXG4gICAgICAgIC8vICAgICAgICAgaWYgKGdldFJlcyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0UmVzIG9iamVjdCA9PT09IFwiICsgZ2V0UmVzKVxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBsZXQgYnVuZGxlOmNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUudG9TdHJpbmcoKSlcclxuICAgICAgICBpZiAoYnVuZGxlKXtcclxuICAgICAgICAgICAgYnVuZGxlLmxvYWQocGF0aHMsdHlwZSwoZXJyLHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmKCFlcnIgJiYgcmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhdGhzID09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlSGVscGVyLmFkZEJ1bmRsZVJlbGVhc2UoYnVuZGxlTmFtZSxwYXRocyx0eXBlKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmICh0eXBlb2YgcGF0aHMgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9MDtqPCBwYXRocy5sZW5ndGg7aisrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRoID0gcGF0aHNbal1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTG9nZ2VyLmVycm9yKFwicGF0aCAgPSBcIiArIHBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbGVhc2VIZWxwZXIuYWRkQnVuZGxlUmVsZWFzZShidW5kbGVOYW1lLHBhdGgsdHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyLHJlcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmuLjmiI9idW5kbGUgcmVzXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAgICogQHBhcmFtIHtjYy5Bc3NldH0gdHlwZVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXRHYW1lQnVuZGxlUmVzKHBhdGg6IHN0cmluZywgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCl7XHJcbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdhbWVCdW5kbGVcclxuICAgICAgICBpZiAoYnVuZGxlTmFtZSl7XHJcbiAgICAgICAgICAgIGxldCByZXM6YW55ID0gdGhpcy5nZXRCdW5kbGVSZXMoYnVuZGxlTmFtZSxwYXRoLHR5cGUpXHJcbiAgICAgICAgICAgIGlmIChyZXMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRHYW1lQnVuZGxlUmVzIGdldEJ1bmRsZVJlcyBudWxsXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRHYW1lQnVuZGxlUmVzIGJ1bmRsZU5hbWUgbnVsbFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaMh+WummJ1bmRsZSByZXNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBidW5kbGVOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxyXG4gICAgICogQHBhcmFtIHtjYy5Bc3NldH0gdHlwZVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXRCdW5kbGVSZXMoYnVuZGxlTmFtZTphbnkscGF0aDogc3RyaW5nLCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KXtcclxuICAgICAgICBsZXQgYnVuZGxlOmNjLkFzc2V0TWFuYWdlci5CdW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUudG9TdHJpbmcoKSlcclxuICAgICAgICBpZiAoYnVuZGxlKXtcclxuICAgICAgICAgICAgbGV0IHJlczphbnkgPSBidW5kbGUuZ2V0KHBhdGgsdHlwZSlcclxuICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L295b2T5YmN5ri45oiPYnVuZGxlIGRpclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGVcclxuICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEdhbWVCdW5kbGVEaXIocGF0aDogc3RyaW5nLCBvbkNvbXBsZXRlPzpGdW5jdGlvbix0eXBlPzogdHlwZW9mIGNjLkFzc2V0KXtcclxuICAgICAgICBsZXQgYnVuZGxlTmFtZSA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2FtZUJ1bmRsZVxyXG4gICAgICAgIGlmIChidW5kbGVOYW1lKXtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQnVuZGxlRGlyKGJ1bmRsZU5hbWUscGF0aCxvbkNvbXBsZXRlLHR5cGUpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkR2FtZUJ1bmRsZURpciBidW5kbGVOYW1lIG51bGxcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3mjIflrppidW5kbGUgZGlyXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnVuZGxlTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uQ29tcGxldGVcclxuICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEJ1bmRsZURpcihidW5kbGVOYW1lOmFueSxwYXRoOiBzdHJpbmcsIG9uQ29tcGxldGU/OkZ1bmN0aW9uLHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpe1xyXG4gICAgICAgIGxldCBidW5kbGU6Y2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoYnVuZGxlTmFtZS50b1N0cmluZygpKVxyXG4gICAgICAgIGlmIChidW5kbGUpe1xyXG4gICAgICAgICAgICBidW5kbGUubG9hZERpcihwYXRoLHR5cGUsKGVycixyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZighZXJyICYmIHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWxlYXNlSGVscGVyLmFkZEJ1bmRsZVJlbGVhc2UoYnVuZGxlTmFtZSxwYXRoLHR5cGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoZXJyLHJlcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICog5Yqg6L295ri45oiP5YaF6Ieq5Yqo5ZCI5Zu+6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0ge2NjLlNwcml0ZX0gc3ByaXRlXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXRhbHNOYW1lXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3BOYW1lXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbkNvbXBsZXRlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9SZWxlYXNlXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXV0b0F0bGFzIC8v5piv5ZCm6Ieq5Yqo5Zu+6ZuGXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGxvYWRHYW1lQnVuZGxlQXV0b0F0bGFzKHNwcml0ZTpjYy5TcHJpdGUsIHVybDpzdHJpbmcsIHNwTmFtZTpzdHJpbmcsIG9uQ29tcGxldGU/OkZ1bmN0aW9uLCBhdXRvUmVsZWFzZT86Ym9vbGVhbixpc0F1dG9BdGxhcyA9IHRydWUpe1xyXG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nYW1lQnVuZGxlXHJcbiAgICAgICAgaWYgKGJ1bmRsZU5hbWUpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRCdW5kbGVBdXRvQXRsYXMoYnVuZGxlTmFtZSxzcHJpdGUsdXJsLHNwTmFtZSxvbkNvbXBsZXRlLGF1dG9SZWxlYXNlLGlzQXV0b0F0bGFzKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibG9hZEdhbWVCdW5kbGVBdXRvQXRsYXMgYnVuZGxlTmFtZSBudWxsXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WYnVuZGxl6Ieq5Yqo5Zu+6ZuG5Zu+54mHXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYnVuZGxlTmFtZVxyXG4gICAgICogQHBhcmFtIHtjYy5TcHJpdGV9IHNwcml0ZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF0YWxzTmFtZVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNwTmFtZVxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gb25Db21wbGV0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvUmVsZWFzZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0F1dG9BdGxhcyAvL+aYr+WQpuiHquWKqOWbvumbhlxyXG4gICAgICogQG1lbWJlcm9mIFJlc291cmNlTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZEJ1bmRsZUF1dG9BdGxhcyhidW5kbGVOYW1lOmFueSxzcHJpdGU6Y2MuU3ByaXRlLCB1cmw6c3RyaW5nLCBzcE5hbWU6c3RyaW5nLCBvbkNvbXBsZXRlPzpGdW5jdGlvbiwgYXV0b1JlbGVhc2U/OmJvb2xlYW4saXNBdXRvQXRsYXMgPSB0cnVlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIGlmKENDX1BSRVZJRVcgJiYgaXNBdXRvQXRsYXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB1cmwubGFzdEluZGV4T2YoXCIvXCIpO1xyXG4gICAgICAgICAgICBpZihpbmRleCA+IDApe1xyXG4gICAgICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygwLCBpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLmdldEJ1bmRsZVJlcyhidW5kbGVOYW1lLHVybCArIFwiL1wiICsgc3BOYW1lLCBjYy5UZXh0dXJlMkQpO1xyXG4gICAgICAgICAgICBpZiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIXNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRCdW5kbGVSZXMoYnVuZGxlTmFtZSx1cmwgKyBcIi9cIiArIHNwTmFtZSwgKGVycm9yLCB0ZXh0dXJlOmNjLlRleHR1cmUyRCk9PntcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiYnVuZGxlTmFtZSBcIiArIGJ1bmRsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSwgdXJsICsgXCIvXCIgKyBzcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZih0ZXh0dXJlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXV0b1JlbGVhc2UgIT0gbnVsbCAmJiBhdXRvUmVsZWFzZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KHRleHR1cmUsIGF1dG9SZWxlYXNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYXRsYXMgPSB0aGlzLmdldEJ1bmRsZVJlcyhidW5kbGVOYW1lLHVybCwgY2MuU3ByaXRlQXRsYXMpO1xyXG4gICAgICAgICAgICBpZiAoYXRsYXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzcGZyYW1lID0gYXRsYXMuZ2V0U3ByaXRlRnJhbWUoc3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKHNwZnJhbWUgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiwc3ByaXRlXCIsIHNwTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoIXNwcml0ZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3BmcmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihvbkNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRCdW5kbGVSZXMoYnVuZGxlTmFtZSx1cmwsIChlcnJvciwgYXRsYXM6Y2MuU3ByaXRlQXRsYXMpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoYXRsYXMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGF1dG9SZWxlYXNlICE9IG51bGwgJiYgYXV0b1JlbGVhc2UgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseShhdGxhcywgYXV0b1JlbGVhc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNwZnJhbWUgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZShzcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNwZnJhbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLBzcHJpdGVcIiwgc3BOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZighc3ByaXRlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBzcGZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG9uQ29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmh5LliqDovb3otYTmupAg5LiN5Lya5omn6KGM6Kej5p6Q5ZKM5Yid5aeL5YyWKi9cclxuICAgIHB1YmxpYyBsYXp5TG9hZEJ1bmRsZVJlcyhidW5kbGVOYW1lOmFueSwgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpe1xyXG4gICAgICAgIGxldCBidW5kbGU6Y2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUoYnVuZGxlTmFtZS50b1N0cmluZygpKVxyXG4gICAgICAgIGlmIChidW5kbGUpe1xyXG4gICAgICAgICAgICBidW5kbGUucHJlbG9hZChwYXRoLCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGR1bXBBc3NldHMoKXtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbWFwID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5fbWFwO1xyXG4gICAgICAgIGxldCBzdHIgPSBcIlwiO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpIGluIG1hcCl7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gbWFwW2ldO1xyXG4gICAgICAgICAgICBpZiAoaW5mby5fbmFtZSB8fCBpbmZvLm5hdGl2ZVVybCl7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gYFske2luZm8uX25hbWV9LCR7aW5mby5uYXRpdmVVcmx9LCR7aW5mby5yZWZDb3VudH0sJHtTdHJpbmcoaW5mby5pc1ZhbGlkKX1dOyAvbmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhjb3VudCwgc3RyKTtcclxuICAgIH1cclxufSJdfQ==