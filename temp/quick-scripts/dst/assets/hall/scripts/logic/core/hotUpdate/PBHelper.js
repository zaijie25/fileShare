
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/hotUpdate/PBHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '128a2y27D9LaZSsRqqPKOe9', 'PBHelper');
// hall/scripts/logic/core/hotUpdate/PBHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toolkit_1 = require("../tool/Toolkit");
var PBHelper = /** @class */ (function () {
    function PBHelper() {
        this.prePath = 'hall/prefabs/Dlgs/';
        this.nodeName = '';
        this.lock = true;
        this.Paths = {
            DlgSetting: this.prePath + 'DlgSetting',
            DlgGameNeedDownload: this.prePath + 'DlgGameNeedDownload',
        };
        //游戏引用大厅的资源预加载，creator 2.0 后，子游戏更新引用大厅的资源，如果不进行预加载很多时候大厅的资源无法引用
        //预加载prefab 时，引用到的spine 动画不会被预加载，会导致报错，目前游戏中引用的大厅的资源先去掉动画
        this.ComPaths = {
            DlgSetting: this.prePath + 'DlgSetting'
        };
    }
    PBHelper.prototype.initHelper = function (cb) {
        var loaded = 0;
        var underscore = Toolkit_1.default.underscore;
        var HotUpdateManager = Global.HotUpdateManager;
        var ccLoaderHelper = HotUpdateManager.ccLoaderHelper;
        var self = this;
        underscore.each(this.ComPaths, function (value, key) {
            Logger.log('-----------------------------getComPaths res---------');
            ccLoaderHelper.getRes(value, cc.Prefab, function (err, prefab) {
                Logger.log('PBHelper : ' + key + ' is loaded');
                loaded++;
                if (loaded >= underscore.size(self.ComPaths)) {
                    if (cb) {
                        cb();
                        return;
                    }
                }
            });
        });
    };
    PBHelper.prototype.addNode = function (name, parent, cb, zorder) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (cb === void 0) { cb = null; }
        if (zorder === void 0) { zorder = 9999; }
        if (name == this.nodeName && this.lock) {
            return;
        }
        Logger.log('PBHelper ----------- addNode-------' + name);
        this.lock = true;
        this.nodeName = name;
        this.getNode(name, function (node) {
            if (parent === null) {
                parent = cc.director.getScene().getChildByName('Canvas');
            }
            if (parent.getChildByName('popup9999')) {
                parent.getChildByName('popup9999').destroy();
            }
            parent.addChild(node, zorder, 'popup9999');
            _this.lock = false;
            if (cb) {
                cb(node);
            }
        });
    };
    PBHelper.prototype.getNode = function (name, cb, setShowLoading) {
        if (cb === void 0) { cb = null; }
        if (setShowLoading === void 0) { setShowLoading = null; }
        var cbDone = cb;
        var self = this;
        Logger.log('--------getNode-----------' + this.Paths[name]);
        var HotUpdateManager = Global.HotUpdateManager;
        HotUpdateManager.ccLoaderHelper.getRes(this.Paths[name], cc.Prefab, function (err, res) {
            var node = cc.instantiate(cc.loader.getRes(self.Paths[name]));
            if (cbDone)
                cbDone(node);
            return node;
        });
    };
    PBHelper.prototype.releaseNode = function (key) {
        if (key === void 0) { key = null; }
        var _release = function (key) {
            Logger.log("@Release:" + key);
            var deps = cc.loader.getDependsRecursively(this.Paths[key]);
            cc.loader.release(deps);
        };
        if (key === null) {
            for (var key_1 in this.Paths) {
                _release(key_1);
            }
        }
        else {
            _release(key);
        }
    };
    return PBHelper;
}());
exports.default = PBHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGhvdFVwZGF0ZVxcUEJIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBc0M7QUFDdEM7SUFBQTtRQUNZLFlBQU8sR0FBRyxvQkFBb0IsQ0FBQTtRQUM5QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsU0FBSSxHQUFHLElBQUksQ0FBQztRQUdaLFVBQUssR0FBRztZQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVk7WUFDdkMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUI7U0FDNUQsQ0FBQTtRQUNELCtEQUErRDtRQUMvRCx5REFBeUQ7UUFDakQsYUFBUSxHQUFHO1lBQ2YsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWTtTQUMxQyxDQUFBO0lBeUVMLENBQUM7SUF2RVUsNkJBQVUsR0FBakIsVUFBa0IsRUFBRTtRQUNoQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLFVBQVUsR0FBRyxpQkFBTyxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQyxJQUFJLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7UUFDckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQyxVQUFTLEtBQUssRUFBQyxHQUFHO1lBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsdURBQXVELENBQUMsQ0FBQTtZQUNuRSxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLFVBQVMsR0FBRyxFQUFDLE1BQU07Z0JBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxZQUFZLENB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SyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDM0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFBO1FBRUQsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO1lBQ2QsS0FBSyxJQUFJLEtBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN4QixRQUFRLENBQUMsS0FBRyxDQUFDLENBQUE7YUFDaEI7U0FDSjthQUFLO1lBQ0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ2hCO0lBQ0wsQ0FBQztJQUVMLGVBQUM7QUFBRCxDQXZGQSxBQXVGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhvdFVwZGF0ZU1hbmFnZXIgZnJvbSAnLi9Ib3RVcGRhdGVNYW5hZ2VyJ1xyXG5pbXBvcnQgVG9vbGtpdCBmcm9tIFwiLi4vdG9vbC9Ub29sa2l0XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBCSGVscGVyIHtcclxuICAgIHByaXZhdGUgcHJlUGF0aCA9ICdoYWxsL3ByZWZhYnMvRGxncy8nXHJcbiAgICBwcml2YXRlIG5vZGVOYW1lID0gJyc7XHJcbiAgICBwcml2YXRlIGxvY2sgPSB0cnVlO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIFBhdGhzID0ge1xyXG4gICAgICAgIERsZ1NldHRpbmc6IHRoaXMucHJlUGF0aCArICdEbGdTZXR0aW5nJyxcclxuICAgICAgICBEbGdHYW1lTmVlZERvd25sb2FkOiB0aGlzLnByZVBhdGggKyAnRGxnR2FtZU5lZWREb3dubG9hZCcsXHJcbiAgICB9XHJcbiAgICAvL+a4uOaIj+W8leeUqOWkp+WOheeahOi1hOa6kOmihOWKoOi9ve+8jGNyZWF0b3IgMi4wIOWQju+8jOWtkOa4uOaIj+abtOaWsOW8leeUqOWkp+WOheeahOi1hOa6kO+8jOWmguaenOS4jei/m+ihjOmihOWKoOi9veW+iOWkmuaXtuWAmeWkp+WOheeahOi1hOa6kOaXoOazleW8leeUqFxyXG4gICAgLy/pooTliqDovb1wcmVmYWIg5pe277yM5byV55So5Yiw55qEc3BpbmUg5Yqo55S75LiN5Lya6KKr6aKE5Yqg6L2977yM5Lya5a+86Ie05oql6ZSZ77yM55uu5YmN5ri45oiP5Lit5byV55So55qE5aSn5Y6F55qE6LWE5rqQ5YWI5Y675o6J5Yqo55S7XHJcbiAgICBwcml2YXRlIENvbVBhdGhzID0ge1xyXG4gICAgICAgIERsZ1NldHRpbmc6IHRoaXMucHJlUGF0aCArICdEbGdTZXR0aW5nJ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0SGVscGVyKGNiKXtcclxuICAgICAgICBsZXQgbG9hZGVkID0gMDtcclxuICAgICAgICBsZXQgdW5kZXJzY29yZSA9IFRvb2xraXQudW5kZXJzY29yZTtcclxuICAgICAgICBsZXQgSG90VXBkYXRlTWFuYWdlciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyO1xyXG4gICAgICAgIGxldCBjY0xvYWRlckhlbHBlciA9IEhvdFVwZGF0ZU1hbmFnZXIuY2NMb2FkZXJIZWxwZXI7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHVuZGVyc2NvcmUuZWFjaCh0aGlzLkNvbVBhdGhzLGZ1bmN0aW9uKHZhbHVlLGtleSl7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tZ2V0Q29tUGF0aHMgcmVzLS0tLS0tLS0tJylcclxuICAgICAgICAgICAgY2NMb2FkZXJIZWxwZXIuZ2V0UmVzKHZhbHVlLGNjLlByZWZhYixmdW5jdGlvbihlcnIscHJlZmFiKXtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coJ1BCSGVscGVyIDogJyArIGtleSArICcgaXMgbG9hZGVkJylcclxuICAgICAgICAgICAgICAgIGxvYWRlZCArKztcclxuICAgICAgICAgICAgICAgIGlmIChsb2FkZWQgPj0gdW5kZXJzY29yZS5zaXplKHNlbGYuQ29tUGF0aHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkTm9kZShuYW1lLHBhcmVudCA9IG51bGwsY2IgPSBudWxsLHpvcmRlciA9IDk5OTkpe1xyXG4gICAgICAgIGlmIChuYW1lID09IHRoaXMubm9kZU5hbWUgJiYgdGhpcy5sb2NrKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTG9nZ2VyLmxvZygnUEJIZWxwZXIgLS0tLS0tLS0tLS0gYWRkTm9kZS0tLS0tLS0nICsgbmFtZSlcclxuICAgICAgICB0aGlzLmxvY2sgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm9kZU5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuZ2V0Tm9kZShuYW1lLChub2RlOmNjLk5vZGUpPT57XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKS5nZXRDaGlsZEJ5TmFtZSgnQ2FudmFzJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyZW50LmdldENoaWxkQnlOYW1lKCdwb3B1cDk5OTknKSkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LmdldENoaWxkQnlOYW1lKCdwb3B1cDk5OTknKS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFyZW50LmFkZENoaWxkKG5vZGUsem9yZGVyLCdwb3B1cDk5OTknKVxyXG4gICAgICAgICAgICB0aGlzLmxvY2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICBjYihub2RlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Tm9kZShuYW1lLGNiPW51bGwsc2V0U2hvd0xvYWRpbmcgPSBudWxsKXtcclxuICAgICAgICBsZXQgY2JEb25lID0gY2I7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIExvZ2dlci5sb2coJy0tLS0tLS0tZ2V0Tm9kZS0tLS0tLS0tLS0tJyArIHRoaXMuUGF0aHNbbmFtZV0pXHJcbiAgICAgICAgbGV0IEhvdFVwZGF0ZU1hbmFnZXIgPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlcjtcclxuICAgICAgICBIb3RVcGRhdGVNYW5hZ2VyLmNjTG9hZGVySGVscGVyLmdldFJlcyh0aGlzLlBhdGhzW25hbWVdLGNjLlByZWZhYixmdW5jdGlvbihlcnIscmVzKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZShjYy5sb2FkZXIuZ2V0UmVzKHNlbGYuUGF0aHNbbmFtZV0pKTtcclxuICAgICAgICAgICAgaWYoY2JEb25lKSBjYkRvbmUobm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZU5vZGUoa2V5ID0gbnVsbCl7XHJcbiAgICAgICAgbGV0IF9yZWxlYXNlID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIkBSZWxlYXNlOlwiICsga2V5KVxyXG4gICAgICAgICAgICBsZXQgZGVwcyA9Y2MubG9hZGVyLmdldERlcGVuZHNSZWN1cnNpdmVseSh0aGlzLlBhdGhzW2tleV0pO1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIucmVsZWFzZShkZXBzKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5QYXRocykge1xyXG4gICAgICAgICAgICAgICAgX3JlbGVhc2Uoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBfcmVsZWFzZShrZXkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSJdfQ==