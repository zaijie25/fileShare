
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/hotUpdate/UpdateHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07f417AVShLSo57UKtvGcl+', 'UpdateHelper');
// hall/scripts/logic/core/hotUpdate/UpdateHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toolkit_1 = require("../tool/Toolkit");
/**
1 初始热更地址 动态话 可以从一下2个方式获取 openinstall /svr  每次获取就写入缓存 如果缓存有的话 就读取缓存  ？是否需要对缓存做操作指令

2 热更新管理器
 负责设置要更新的游戏
 获取要更新的地址目录 通常为/gameName
 获取更新后本地保存地址
 设置热更皮肤
 设置热更地址
 启动热更UI
 内存常驻
**/
var UpdateHelper = /** @class */ (function () {
    function UpdateHelper(rootFolder, projCfgFile, verCfgFile, downloadedStorageKey) {
        this._url = ''; // 热更地址  通过改变这个能换皮肤 
        this._gameType = ''; // 需要更新的子游戏 、大厅 
        this._skin = ''; // 皮肤类型
        this._storage_path = ''; // 本地缓存路径 
        this._root_folder = ""; // 本地缓存跟目录
        this._proj_cfg_file = "";
        this._ver_cfg_file = "";
        this._downloaded_storage_key = "";
        this._root_folder = rootFolder;
        this._proj_cfg_file = projCfgFile;
        this._ver_cfg_file = verCfgFile;
        this._downloaded_storage_key = downloadedStorageKey;
    }
    UpdateHelper.prototype.init = function (gameType, skin) {
        if (skin === void 0) { skin = null; }
        var skilFolderName = skin;
        if (skilFolderName == null) {
            skilFolderName = ''; //appBaseData.upDataFolderName; 
        }
        Logger.log('game XXXXX skilFolderName = ', skilFolderName);
        if (skilFolderName) {
            this.skin(skilFolderName);
        }
        this.gameType(gameType);
        var url = this.genUrl();
        var path = this.genStoragePath();
        this.url(this.genUrl());
        this.storagePath(this.genStoragePath());
    };
    UpdateHelper.prototype.gameType = function (val) {
        if (val)
            this._gameType = val;
        return this._gameType;
    };
    UpdateHelper.prototype.url = function (val) {
        if (val)
            this._url = val;
        return this._url;
    };
    UpdateHelper.prototype.skin = function (val) {
        if (val)
            this._skin = val;
        return this._skin;
    };
    UpdateHelper.prototype.storagePath = function (val) {
        if (val)
            this._storage_path = val;
        return this._storage_path;
    };
    UpdateHelper.prototype.rootFolder = function (val) {
        if (val)
            this._root_folder = val;
        return this._root_folder;
    };
    UpdateHelper.prototype.prjFileName = function (val) {
        if (val)
            this._proj_cfg_file = val;
        return this._proj_cfg_file;
    };
    UpdateHelper.prototype.verFileName = function (val) {
        if (val)
            this._ver_cfg_file = val;
        return this._ver_cfg_file;
    };
    UpdateHelper.prototype.genStoragePath = function (gameType) {
        if (!cc.sys.isNative)
            return '';
        gameType = gameType || this.gameType();
        return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.rootFolder() + '/' + gameType);
    };
    UpdateHelper.prototype.genUrl = function (skin, gameType) {
        gameType = gameType || this.gameType();
        var url = Global.HotUpdateManager.hotUpdateUrl + "/"; //子游戏更新地址
        return url + gameType;
    };
    UpdateHelper.prototype.downloaded = function (gameType) {
        var value = Toolkit_1.default.underscore.isNull(gameType) ? this.gameType() : undefined;
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        cc.sys.localStorage.setItem(store_key, gameType);
    };
    UpdateHelper.prototype.clearDownloaded = function (gameType) {
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        cc.sys.localStorage.setItem(store_key, "");
        Global.HotUpdateManager.removeNativeHotUpdateDir(gameType);
    };
    UpdateHelper.prototype.isDownloaded = function (gameType) {
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        // @krisirk temp debug
        // cc.sys.localStorage.removeItem( store_key );
        // Logger.log('store key:' + store_key);
        var store_value = cc.sys.localStorage.getItem(store_key);
        // Logger.log('store value:' + store_value);
        return store_value === gameType.toString();
    };
    UpdateHelper.prototype.showUI = function () {
        // var isHall = this.gameType() === cc.GAME_TYPES.HALL;
    };
    return UpdateHelper;
}());
exports.default = UpdateHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGhvdFVwZGF0ZVxcVXBkYXRlSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXNDO0FBRXRDOzs7Ozs7Ozs7OztHQVdHO0FBRUg7SUFVSSxzQkFBWSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxvQkFBb0I7UUFUckUsU0FBSSxHQUFHLEVBQUUsQ0FBQyxDQUFBLG9CQUFvQjtRQUM5QixjQUFTLEdBQUcsRUFBRSxDQUFDLENBQUEsZ0JBQWdCO1FBQy9CLFVBQUssR0FBRyxFQUFFLENBQUMsQ0FBQSxPQUFPO1FBQ2xCLGtCQUFhLEdBQUcsRUFBRSxDQUFDLENBQUEsVUFBVTtRQUM3QixpQkFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFVBQVU7UUFDN0IsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsNEJBQXVCLEdBQUcsRUFBRSxDQUFBO1FBR3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxvQkFBb0IsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsMkJBQUksR0FBSixVQUFLLFFBQVEsRUFBRSxJQUFXO1FBQVgscUJBQUEsRUFBQSxXQUFXO1FBQ3RCLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLGNBQWMsSUFBSSxJQUFJLEVBQUU7WUFDeEIsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFBLGdDQUFnQztTQUN2RDtRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0QsSUFBSSxjQUFjLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUks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QUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxDQUFDO1FBQ3hELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUNELHNDQUFlLEdBQWYsVUFBZ0IsUUFBUTtRQUNwQixRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxDQUFDO1FBQ3hELEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlELENBQUM7SUFDRCxtQ0FBWSxHQUFaLFVBQWEsUUFBUTtRQUNqQixRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsUUFBUSxDQUFDO1FBQ3hELHNCQUFzQjtRQUN0QiwrQ0FBK0M7UUFDL0Msd0NBQXdDO1FBQ3hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6RCw0Q0FBNEM7UUFDNUMsT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFDRCw2QkFBTSxHQUFOO1FBQ0ksdURBQXVEO0lBQzNELENBQUM7SUFFTCxtQkFBQztBQUFELENBbEdBLEFBa0dDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9vbGtpdCBmcm9tIFwiLi4vdG9vbC9Ub29sa2l0XCI7XHJcblxyXG4vKipcclxuMSDliJ3lp4vng63mm7TlnLDlnYAg5Yqo5oCB6K+dIOWPr+S7peS7juS4gOS4izLkuKrmlrnlvI/ojrflj5Ygb3Blbmluc3RhbGwgL3N2ciAg5q+P5qyh6I635Y+W5bCx5YaZ5YWl57yT5a2YIOWmguaenOe8k+WtmOacieeahOivnSDlsLHor7vlj5bnvJPlrZggIO+8n+aYr+WQpumcgOimgeWvuee8k+WtmOWBmuaTjeS9nOaMh+S7pCBcclxuXHJcbjIg54Ot5pu05paw566h55CG5ZmoXHJcbiDotJ/otKPorr7nva7opoHmm7TmlrDnmoTmuLjmiI8gXHJcbiDojrflj5bopoHmm7TmlrDnmoTlnLDlnYDnm67lvZUg6YCa5bi45Li6L2dhbWVOYW1lXHJcbiDojrflj5bmm7TmlrDlkI7mnKzlnLDkv53lrZjlnLDlnYAgXHJcbiDorr7nva7ng63mm7Tnmq7ogqQgXHJcbiDorr7nva7ng63mm7TlnLDlnYAgXHJcbiDlkK/liqjng63mm7RVSSBcclxuIOWGheWtmOW4uOmpuyBcclxuKiovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVIZWxwZXIge1xyXG4gICAgX3VybCA9ICcnOy8vIOeDreabtOWcsOWdgCAg6YCa6L+H5pS55Y+Y6L+Z5Liq6IO95o2i55qu6IKkIFxyXG4gICAgX2dhbWVUeXBlID0gJyc7Ly8g6ZyA6KaB5pu05paw55qE5a2Q5ri45oiPIOOAgeWkp+WOhSBcclxuICAgIF9za2luID0gJyc7Ly8g55qu6IKk57G75Z6LXHJcbiAgICBfc3RvcmFnZV9wYXRoID0gJyc7Ly8g5pys5Zyw57yT5a2Y6Lev5b6EIFxyXG4gICAgX3Jvb3RfZm9sZGVyID0gXCJcIjsgLy8g5pys5Zyw57yT5a2Y6Lef55uu5b2VXHJcbiAgICBfcHJval9jZmdfZmlsZSA9IFwiXCI7XHJcbiAgICBfdmVyX2NmZ19maWxlID0gXCJcIjtcclxuICAgIF9kb3dubG9hZGVkX3N0b3JhZ2Vfa2V5ID0gXCJcIlxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJvb3RGb2xkZXIsIHByb2pDZmdGaWxlLCB2ZXJDZmdGaWxlLCBkb3dubG9hZGVkU3RvcmFnZUtleSkge1xyXG4gICAgICAgIHRoaXMuX3Jvb3RfZm9sZGVyID0gcm9vdEZvbGRlcjtcclxuICAgICAgICB0aGlzLl9wcm9qX2NmZ19maWxlID0gcHJvakNmZ0ZpbGU7XHJcbiAgICAgICAgdGhpcy5fdmVyX2NmZ19maWxlID0gdmVyQ2ZnRmlsZTtcclxuICAgICAgICB0aGlzLl9kb3dubG9hZGVkX3N0b3JhZ2Vfa2V5ID0gZG93bmxvYWRlZFN0b3JhZ2VLZXk7XHJcbiAgICB9XHJcbiAgICBpbml0KGdhbWVUeXBlLCBza2luID0gbnVsbCkge1xyXG4gICAgICAgIHZhciBza2lsRm9sZGVyTmFtZSA9IHNraW47XHJcbiAgICAgICAgaWYgKHNraWxGb2xkZXJOYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgc2tpbEZvbGRlck5hbWUgPSAnJzsvL2FwcEJhc2VEYXRhLnVwRGF0YUZvbGRlck5hbWU7IFxyXG4gICAgICAgIH1cclxuICAgICAgICBMb2dnZXIubG9nKCdnYW1lIFhYWFhYIHNraWxGb2xkZXJOYW1lID0gJywgc2tpbEZvbGRlck5hbWUpO1xyXG4gICAgICAgIGlmIChza2lsRm9sZGVyTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNraW4oc2tpbEZvbGRlck5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nYW1lVHlwZShnYW1lVHlwZSk7XHJcblxyXG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdlblVybCgpO1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5nZW5TdG9yYWdlUGF0aCgpO1xyXG4gICAgICAgIHRoaXMudXJsKHRoaXMuZ2VuVXJsKCkpO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZVBhdGgodGhpcy5nZW5TdG9yYWdlUGF0aCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2FtZVR5cGUodmFsPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodmFsKSB0aGlzLl9nYW1lVHlwZSA9IHZhbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVR5cGU7XHJcbiAgICB9XHJcbiAgICB1cmwodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCkgdGhpcy5fdXJsID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICB9XHJcbiAgICBza2luKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwpIHRoaXMuX3NraW4gPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NraW47XHJcbiAgICB9XHJcbiAgICBzdG9yYWdlUGF0aCh2YWw/OiBhbnkpIHtcclxuICAgICAgICBpZiAodmFsKSB0aGlzLl9zdG9yYWdlX3BhdGggPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JhZ2VfcGF0aDtcclxuICAgIH1cclxuICAgIHJvb3RGb2xkZXIodmFsPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodmFsKSB0aGlzLl9yb290X2ZvbGRlciA9IHZhbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdF9mb2xkZXI7XHJcbiAgICB9XHJcbiAgICBwcmpGaWxlTmFtZSh2YWw/OiBhbnkpIHtcclxuICAgICAgICBpZiAodmFsKSB0aGlzLl9wcm9qX2NmZ19maWxlID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qX2NmZ19maWxlO1xyXG4gICAgfVxyXG4gICAgdmVyRmlsZU5hbWUodmFsPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodmFsKSB0aGlzLl92ZXJfY2ZnX2ZpbGUgPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zlcl9jZmdfZmlsZTtcclxuICAgIH1cclxuICAgIGdlblN0b3JhZ2VQYXRoKGdhbWVUeXBlPzogYW55KTogYW55IHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc05hdGl2ZSkgcmV0dXJuICcnO1xyXG4gICAgICAgIGdhbWVUeXBlID0gZ2FtZVR5cGUgfHwgdGhpcy5nYW1lVHlwZSgpO1xyXG4gICAgICAgIHJldHVybiAoKGpzYi5maWxlVXRpbHMgPyBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpIDogJy8nKSArIHRoaXMucm9vdEZvbGRlcigpICsgJy8nICsgZ2FtZVR5cGUpO1xyXG4gICAgfVxyXG4gICAgZ2VuVXJsKHNraW4/OiBhbnksIGdhbWVUeXBlPzogYW55KTogYW55IHtcclxuICAgICAgICBnYW1lVHlwZSA9IGdhbWVUeXBlIHx8IHRoaXMuZ2FtZVR5cGUoKTtcclxuICAgICAgICBsZXQgdXJsID0gR2xvYmFsLkhvdFVwZGF0ZU1hbmFnZXIuaG90VXBkYXRlVXJsICsgXCIvXCI7IC8v5a2Q5ri45oiP5pu05paw5Zyw5Z2AXHJcbiAgICAgICAgcmV0dXJuIHVybCArIGdhbWVUeXBlO1xyXG4gICAgfVxyXG4gICAgZG93bmxvYWRlZChnYW1lVHlwZSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IFRvb2xraXQudW5kZXJzY29yZS5pc051bGwoZ2FtZVR5cGUpID8gdGhpcy5nYW1lVHlwZSgpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIGdhbWVUeXBlID0gZ2FtZVR5cGUgfHwgdGhpcy5nYW1lVHlwZSgpO1xyXG4gICAgICAgIHZhciBzdG9yZV9rZXkgPSB0aGlzLl9kb3dubG9hZGVkX3N0b3JhZ2Vfa2V5ICsgZ2FtZVR5cGU7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0b3JlX2tleSwgZ2FtZVR5cGUpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJEb3dubG9hZGVkKGdhbWVUeXBlKXtcclxuICAgICAgICBnYW1lVHlwZSA9IGdhbWVUeXBlIHx8IHRoaXMuZ2FtZVR5cGUoKTtcclxuICAgICAgICB2YXIgc3RvcmVfa2V5ID0gdGhpcy5fZG93bmxvYWRlZF9zdG9yYWdlX2tleSArIGdhbWVUeXBlO1xyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yZV9rZXksIFwiXCIpO1xyXG4gICAgICAgIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnJlbW92ZU5hdGl2ZUhvdFVwZGF0ZURpcihnYW1lVHlwZSlcclxuICAgIH1cclxuICAgIGlzRG93bmxvYWRlZChnYW1lVHlwZSkge1xyXG4gICAgICAgIGdhbWVUeXBlID0gZ2FtZVR5cGUgfHwgdGhpcy5nYW1lVHlwZSgpO1xyXG4gICAgICAgIHZhciBzdG9yZV9rZXkgPSB0aGlzLl9kb3dubG9hZGVkX3N0b3JhZ2Vfa2V5ICsgZ2FtZVR5cGU7XHJcbiAgICAgICAgLy8gQGtyaXNpcmsgdGVtcCBkZWJ1Z1xyXG4gICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSggc3RvcmVfa2V5ICk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmxvZygnc3RvcmUga2V5OicgKyBzdG9yZV9rZXkpO1xyXG4gICAgICAgIHZhciBzdG9yZV92YWx1ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdG9yZV9rZXkpO1xyXG4gICAgICAgIC8vIExvZ2dlci5sb2coJ3N0b3JlIHZhbHVlOicgKyBzdG9yZV92YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JlX3ZhbHVlID09PSBnYW1lVHlwZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgc2hvd1VJKCkge1xyXG4gICAgICAgIC8vIHZhciBpc0hhbGwgPSB0aGlzLmdhbWVUeXBlKCkgPT09IGNjLkdBTUVfVFlQRVMuSEFMTDtcclxuICAgIH1cclxuXHJcbn1cclxuIl19