import Toolkit from "../tool/Toolkit";

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

export default class UpdateHelper {
    _url = '';// 热更地址  通过改变这个能换皮肤 
    _gameType = '';// 需要更新的子游戏 、大厅 
    _skin = '';// 皮肤类型
    _storage_path = '';// 本地缓存路径 
    _root_folder = ""; // 本地缓存跟目录
    _proj_cfg_file = "";
    _ver_cfg_file = "";
    _downloaded_storage_key = ""

    constructor(rootFolder, projCfgFile, verCfgFile, downloadedStorageKey) {
        this._root_folder = rootFolder;
        this._proj_cfg_file = projCfgFile;
        this._ver_cfg_file = verCfgFile;
        this._downloaded_storage_key = downloadedStorageKey;
    }
    init(gameType, skin = null) {
        var skilFolderName = skin;
        if (skilFolderName == null) {
            skilFolderName = '';//appBaseData.upDataFolderName; 
        }
        Logger.log('game XXXXX skilFolderName = ', skilFolderName);
        if (skilFolderName) {
            this.skin(skilFolderName);
        }

        this.gameType(gameType);

        let url = this.genUrl();
        let path = this.genStoragePath();
        this.url(this.genUrl());
        this.storagePath(this.genStoragePath());
    }

    public gameType(val?: any): any {
        if (val) this._gameType = val;
        return this._gameType;
    }
    url(val) {
        if (val) this._url = val;
        return this._url;
    }
    skin(val) {
        if (val) this._skin = val;
        return this._skin;
    }
    storagePath(val?: any) {
        if (val) this._storage_path = val;
        return this._storage_path;
    }
    rootFolder(val?: any): any {
        if (val) this._root_folder = val;
        return this._root_folder;
    }
    prjFileName(val?: any) {
        if (val) this._proj_cfg_file = val;
        return this._proj_cfg_file;
    }
    verFileName(val?: any): any {
        if (val) this._ver_cfg_file = val;
        return this._ver_cfg_file;
    }
    genStoragePath(gameType?: any): any {
        if (!cc.sys.isNative) return '';
        gameType = gameType || this.gameType();
        return ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + this.rootFolder() + '/' + gameType);
    }
    genUrl(skin?: any, gameType?: any): any {
        gameType = gameType || this.gameType();
        let url = Global.HotUpdateManager.hotUpdateUrl + "/"; //子游戏更新地址
        return url + gameType;
    }
    downloaded(gameType) {
        var value = Toolkit.underscore.isNull(gameType) ? this.gameType() : undefined;
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        cc.sys.localStorage.setItem(store_key, gameType);
    }
    clearDownloaded(gameType){
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        cc.sys.localStorage.setItem(store_key, "");
        Global.HotUpdateManager.removeNativeHotUpdateDir(gameType)
    }
    isDownloaded(gameType) {
        gameType = gameType || this.gameType();
        var store_key = this._downloaded_storage_key + gameType;
        // @krisirk temp debug
        // cc.sys.localStorage.removeItem( store_key );
        // Logger.log('store key:' + store_key);
        var store_value = cc.sys.localStorage.getItem(store_key);
        // Logger.log('store value:' + store_value);
        return store_value === gameType.toString();
    }
    showUI() {
        // var isHall = this.gameType() === cc.GAME_TYPES.HALL;
    }

}
