
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/ReleaseHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFJlbGVhc2VIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQUFBO1FBRUksa0NBQWtDO1FBQzFCLGVBQVUsR0FBWSxJQUFJLEdBQUcsRUFBTyxDQUFDO1FBQ3JDLG1CQUFjLEdBQW9CLElBQUksR0FBRyxFQUFlLENBQUM7SUFpSHJFLENBQUM7SUEvR0csMkJBQTJCO0lBRTNCLHdDQUFnQixHQUFoQixVQUFpQixVQUFpQixFQUFDLElBQVcsRUFBQyxJQUFxQjtRQUNoRSw2QkFBNkI7UUFDN0IsNERBQTREO1FBQzVELGNBQWM7UUFDZCxJQUFJO1FBQ0osc0NBQXNDO1FBQ3RDLHdDQUF3QztRQUN4QyxJQUFJO1FBRUosc0RBQXNEO1FBQ3RELCtCQUErQjtRQUMvQix3REFBd0Q7UUFDeEQsY0FBYztRQUNkLEtBQUs7UUFDTCxvQ0FBb0M7UUFDcEMsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3Qix1Q0FBdUM7SUFDM0MsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxVQUFpQjtRQUMzQixzREFBc0Q7UUFDdEQsMEJBQTBCO1FBQzFCLCtEQUErRDtRQUMvRCxjQUFjO1FBQ2QsSUFBSTtRQUNKLHNDQUFzQztRQUN0QywrQ0FBK0M7UUFDL0Msd0JBQXdCO1FBQ3hCLHlDQUF5QztRQUN6Qyx5Q0FBeUM7UUFDekMsc0RBQXNEO1FBQ3RELGNBQWM7UUFDZCxzRUFBc0U7UUFDdEUsUUFBUTtRQUNSLElBQUk7UUFDSixzREFBc0Q7UUFDdEQsdUJBQXVCO1FBQ3ZCLHdDQUF3QztRQUN4Qyx1Q0FBdUM7UUFDdkMsc0NBQXNDO1FBRXRDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFDO1lBQ1AsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDN0IsdUZBQXVGO1lBQ3ZGLEVBQUUsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUVELHdDQUFnQixHQUFoQixVQUFpQixVQUFpQixFQUFDLElBQVcsRUFBQyxJQUFxQjtRQUNoRSxJQUFJLENBQUMsVUFBVSxFQUFDO1lBQ1osTUFBTSxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO1lBQ3BELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUE7WUFDN0MsT0FBTztTQUNWO1FBQ0Qsb0VBQW9FO1FBRXBFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFDO1lBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUE7U0FDNUI7YUFBSztZQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUMsVUFBVSxDQUFDLENBQUE7U0FDOUQ7SUFDTCxDQUFDO0lBR0QsZ0JBQWdCO0lBQ1QseUNBQWlCLEdBQXhCLFVBQXlCLEtBQUssRUFBRSxJQUFXO1FBQVgscUJBQUEsRUFBQSxXQUFXO1FBRXZDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNwQztZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUcsSUFBSSxJQUFJLElBQUk7Z0JBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUVELGdCQUFnQjtJQUNULGdDQUFRLEdBQWYsVUFBZ0IsR0FBRztRQUVmLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxNQUFNO0lBQ0Msd0NBQWdCLEdBQXZCO1FBQUEsaUJBUUM7UUFORyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDeEIsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUdNLHVDQUFlLEdBQXRCO1FBRUksSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUM3QjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7WUFDdkMsd0VBQXdFO1NBQzNFO0lBQ0wsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FySEEsQUFxSEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFJlbGVhc2VJdGVtIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvcmVzb3VyY2UvUmVsZWFzZUl0ZW1cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2VIZWxwZXJcclxue1xyXG4gICAgLy/ooqvpooTliqDovb3kvYbmmK/msqHmnInkvb/nlKjnmoTotYTmupDvvIzlpoLmuLjmiI/lm77moIfjgIIgIOWIh+WcuuaZr+aXtumcgOimgee7n+S4gOa4heeQhlxyXG4gICAgcHJpdmF0ZSBfdW51c2VkU2V0OlNldDxhbnk+ID0gbmV3IFNldDxhbnk+KCk7XHJcbiAgICBwcml2YXRlIF91bnVzZWRUeXBlTWFwOk1hcDxzdHJpbmcsIGFueT4gPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG5cclxuICAgIC8vIHByaXZhdGUgX3JlbGVhc2VNYXAgPSB7fVxyXG5cclxuICAgIGFkZEJ1bmRsZVJlbGVhc2UoYnVuZGxlTmFtZTpzdHJpbmcscGF0aDpzdHJpbmcsdHlwZT86dHlwZW9mIGNjLkFzc2V0KXtcclxuICAgICAgICAvLyBpZiAoIWJ1bmRsZU5hbWUgfHwgIXBhdGgpe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIuZXJyb3IoXCJhZGRSZWxlYXNlIGJ1bmRsZU5hbWUgb3IgcGF0aCA9PSBudWxsXCIpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYgKCF0aGlzLl9yZWxlYXNlTWFwW2J1bmRsZU5hbWVdKXtcclxuICAgICAgICAvLyAgICAgdGhpcy5fcmVsZWFzZU1hcFtidW5kbGVOYW1lXSA9IHt9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGxldCBidW5kbGVSZWxlYXNlTWFwID0gdGhpcy5fcmVsZWFzZU1hcFtidW5kbGVOYW1lXVxyXG4gICAgICAgIC8vIGlmIChidW5kbGVSZWxlYXNlTWFwW3BhdGhdKXtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmVycm9yKFwicGF0aCBoYXMgYWxyZWFkeSBhZGRSZWxlYXNlIFwiLHBhdGgpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9IFxyXG4gICAgICAgIC8vIGxldCByZWxlYXNlSXRlbSA9IG5ldyBSZWxlYXNlSXRlbVxyXG4gICAgICAgIC8vIHJlbGVhc2VJdGVtLnJlc1BhdGggPSBwYXRoXHJcbiAgICAgICAgLy8gcmVsZWFzZUl0ZW0ucmVzVHlwZSA9IHR5cGVcclxuICAgICAgICAvLyBidW5kbGVSZWxlYXNlTWFwW3BhdGhdID0gcmVsZWFzZUl0ZW1cclxuICAgIH1cclxuXHJcbiAgICByZWxlYXNlQnVuZGxlKGJ1bmRsZU5hbWU6c3RyaW5nKXtcclxuICAgICAgICAvLyBsZXQgYnVuZGxlUmVsZWFzZU1hcCA9IHRoaXMuX3JlbGVhc2VNYXBbYnVuZGxlTmFtZV1cclxuICAgICAgICAvLyBpZiAoIWJ1bmRsZVJlbGVhc2VNYXApe1xyXG4gICAgICAgIC8vICAgICBMb2dnZXIuZXJyb3IoXCJyZWxlYXNlQnVuZGxlIGJ1bmRsZSBpcyBudWxsIFwiLGJ1bmRsZU5hbWUpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZm9yIChsZXQgcGF0aCBpbiBidW5kbGVSZWxlYXNlTWFwKXtcclxuICAgICAgICAvLyAgICAgbGV0IHJlbGVhc2VJdGVtID0gYnVuZGxlUmVsZWFzZU1hcFtwYXRoXVxyXG4gICAgICAgIC8vICAgICBpZiAocmVsZWFzZUl0ZW0pe1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHBhdGggPSByZWxlYXNlSXRlbS5yZXNQYXRoXHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgdHlwZSA9IHJlbGVhc2VJdGVtLnJlc1R5cGVcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVsZWFzZUJ1bmRsZVJlcyhidW5kbGVOYW1lLHBhdGgsdHlwZSlcclxuICAgICAgICAvLyAgICAgfWVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgTG9nZ2VyLmVycm9yKFwicmVsZWFzZUJ1bmRsZSBwYXRoIHJlbGVhc2VJdGVtIGlzIG51bGxcIixwYXRoKVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgIC8vIGJ1bmRsZS5yZWxlYXNlQWxsKCk7XHJcbiAgICAgICAgLy8gY2MuYXNzZXRNYW5hZ2VyLnJlbW92ZUJ1bmRsZShidW5kbGUpO1xyXG4gICAgICAgIC8vIGRlbGV0ZSB0aGlzLl9yZWxlYXNlTWFwW2J1bmRsZU5hbWVdO1xyXG4gICAgICAgIC8vIHRoaXMuX3JlbGVhc2VNYXBbYnVuZGxlTmFtZV0gPSBudWxsXHJcblxyXG4gICAgICAgIGxldCBidW5kbGUgPSBjYy5hc3NldE1hbmFnZXIuZ2V0QnVuZGxlKGJ1bmRsZU5hbWUpO1xyXG4gICAgICAgIGlmIChidW5kbGUpe1xyXG4gICAgICAgICAgICBidW5kbGUucmVsZWFzZVVudXNlZEFzc2V0cygpO1xyXG4gICAgICAgICAgICAvLyBidW5kbGUucmVsZWFzZUFsbCgpOyAgICAgICAgICAgIC8vIGRlYnVnIOmHiuaUvmJ1bmRsZeacieiiq+WFtuS7luebuOWQjOS8mOWFiOe6p2J1bmRsZeWFseS6q+eahOi1hOa6kOS8muWvvOiHtOS4gOWQjOmHiuaUviwg5LiN566h5piv5ZCm6K6h5pWwXHJcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5yZW1vdmVCdW5kbGUoYnVuZGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVsZWFzZUJ1bmRsZVJlcyhidW5kbGVOYW1lOnN0cmluZyxwYXRoOnN0cmluZyx0eXBlPzp0eXBlb2YgY2MuQXNzZXQpe1xyXG4gICAgICAgIGlmICghYnVuZGxlTmFtZSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbGVhc2VCdW5kbGVSZXMgYnVuZGxlTmFtZSBpcyBudWxsIFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcGF0aCl7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbGVhc2VCdW5kbGVSZXMgcGF0aCBpcyBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwicmVsZWFzZUJ1bmRsZVJlcyBidW5kbGVOYW1lIHBhdGggXCIsYnVuZGxlTmFtZSxwYXRoKVxyXG5cclxuICAgICAgICBsZXQgYnVuZGxlID0gY2MuYXNzZXRNYW5hZ2VyLmdldEJ1bmRsZShidW5kbGVOYW1lKTtcclxuICAgICAgICBpZiAoYnVuZGxlKXtcclxuICAgICAgICAgICAgYnVuZGxlLnJlbGVhc2UocGF0aCx0eXBlKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicmVsZWFzZUJ1bmRsZVJlcyBidW5kbGUgaXMgbnVsbCBcIixidW5kbGVOYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/orrDlvZXlj6/og73liqDovb3kvYbmsqHooqvkvb/nlKjnmoTotYTmupBcclxuICAgIHB1YmxpYyByZWNvcmRVbnVzZWRBc3NldChhcnJheSwgdHlwZSA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fdW51c2VkU2V0LmFkZChhcnJheVtpXSk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VudXNlZFR5cGVNYXAuc2V0KGFycmF5W2ldLCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/otYTmupDooqvkvb/nlKjlkI7vvIzku45zZXTkuK3liKDpmaRcclxuICAgIHB1YmxpYyBtYXJrVXNlZCh1cmwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdW51c2VkU2V0LmRlbGV0ZSh1cmwpO1xyXG4gICAgICAgIHRoaXMuX3VudXNlZFR5cGVNYXAuZGVsZXRlKHVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muIXnkIbotYTmupBcclxuICAgIHB1YmxpYyBjbGVhclVudXNlQXNzZXRzKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl91bnVzZWRTZXQuZm9yRWFjaCgodXJsKT0+e1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRoaXMuX3VudXNlZFR5cGVNYXBbdXJsXTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5yZWxlYXNlQ2FjaGUodXJsLCB0eXBlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuX3VudXNlZFNldC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuX3VudXNlZFR5cGVNYXAuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGFkanVzdEJ5SXBob25lNigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR2xvYmFsLlRvb2xraXQuaXNJcGhvbmU2KCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpcyBpcGhvbmUgNlwiKVxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5jYWNoZWRHYW1lSXRlbUNvdW50ID0gMDtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEhhbGxcIikuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5DaGFuZ2VTY2VuZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=