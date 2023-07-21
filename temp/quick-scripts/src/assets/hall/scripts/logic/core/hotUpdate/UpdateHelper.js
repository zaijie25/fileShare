"use strict";
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