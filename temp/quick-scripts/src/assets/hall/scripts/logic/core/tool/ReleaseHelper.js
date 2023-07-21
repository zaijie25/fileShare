"use strict";
cc._RF.push(module, 'd1484r0NeFMBI+12aFg9Eua', 'ReleaseHelper');
// hall/scripts/logic/core/tool/ReleaseHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReleaseHelper = /** @class */ (function () {
    function ReleaseHelper() {
        //被预加载但是没有使用的资源，如游戏图标。  切场景时需要统一清理
        this._unusedSet = new Set();
        this._unusedTypeMap = new Map();
    }
    // private _releaseMap = {}
    ReleaseHelper.prototype.addBundleRelease = function (bundleName, path, type) {
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
    };
    ReleaseHelper.prototype.releaseBundle = function (bundleName) {
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
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            bundle.releaseUnusedAssets();
            // bundle.releaseAll();            // debug 释放bundle有被其他相同优先级bundle共享的资源会导致一同释放, 不管是否计数
            cc.assetManager.removeBundle(bundle);
        }
    };
    ReleaseHelper.prototype.releaseBundleRes = function (bundleName, path, type) {
        if (!bundleName) {
            Logger.error("releaseBundleRes bundleName is null ");
            return;
        }
        if (!path) {
            Logger.error("releaseBundleRes path is null");
            return;
        }
        // Logger.error("releaseBundleRes bundleName path ",bundleName,path)
        var bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
            bundle.release(path, type);
        }
        else {
            Logger.error("releaseBundleRes bundle is null ", bundleName);
        }
    };
    //记录可能加载但没被使用的资源
    ReleaseHelper.prototype.recordUnusedAsset = function (array, type) {
        if (type === void 0) { type = null; }
        for (var i = 0; i < array.length; i++) {
            this._unusedSet.add(array[i]);
            if (type != null)
                this._unusedTypeMap.set(array[i], type);
        }
    };
    //资源被使用后，从set中删除
    ReleaseHelper.prototype.markUsed = function (url) {
        this._unusedSet.delete(url);
        this._unusedTypeMap.delete(url);
    };
    //清理资源
    ReleaseHelper.prototype.clearUnuseAssets = function () {
        var _this = this;
        this._unusedSet.forEach(function (url) {
            var type = _this._unusedTypeMap[url];
            Global.ResourceManager.releaseCache(url, type);
        });
        this._unusedSet.clear();
        this._unusedTypeMap.clear();
    };
    ReleaseHelper.prototype.adjustByIphone6 = function () {
        if (Global.Toolkit.isIphone6()) {
            Logger.error("is iphone 6");
            Global.Setting.cachedGameItemCount = 0;
            // Global.UI.getWindow("WndHall").destoryType = DestoryType.ChangeScene;
        }
    };
    return ReleaseHelper;
}());
exports.default = ReleaseHelper;

cc._RF.pop();