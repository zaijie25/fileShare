"use strict";
cc._RF.push(module, '4ea78/KIhJEgo+snWEnqH5o', 'SearchPathHelper');
// hall/scripts/logic/core/tool/SearchPathHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var maxGamePath = 5; // 子游戏最大保留路径数量
var SearchPathHelper = /** @class */ (function () {
    function SearchPathHelper() {
        this.pathSet = new Set;
        this.gameList = []; // 队列, 只用于辅助搜索路径过多时删除最早那条
        this.pathSet.clear();
        this.gameList = [];
        if (cc.sys.isNative) {
            var pathList = jsb.fileUtils.getSearchPaths();
            this.addPathList(pathList);
        }
    }
    /** 添加路径到搜索路径 */
    SearchPathHelper.prototype.addOnePath = function (path) {
        if (this.pathSet.has(path)) {
            return;
        }
        var temp = this.formatPath(path);
        this.pathSet.add(temp);
        this.updateSystemSearchPath();
    };
    /** 添加游戏路径到搜索路径 有数量上限 */
    SearchPathHelper.prototype.addOneGamePath = function (path) {
        if (this.pathSet.has(path)) {
            return;
        }
        if (this.gameList.length >= maxGamePath) {
            var temp = this.gameList.shift();
            ;
            this.pathSet.delete(temp);
        }
        this.gameList.push(path);
        this.pathSet.add(path);
        this.updateSystemSearchPath();
    };
    SearchPathHelper.prototype.addPathList = function (arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        arr.forEach(function (path) {
            var temp = _this.formatPath(path);
            _this.pathSet.add(temp);
        });
        this.updateSystemSearchPath();
    };
    SearchPathHelper.prototype.removeOnePath = function (path) {
        var temp = this.formatPath(path);
        this.pathSet.delete(temp);
        this.updateSystemSearchPath();
    };
    SearchPathHelper.prototype.removePathList = function (arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        arr.forEach(function (path) {
            var temp = _this.formatPath(path);
            _this.pathSet.delete(temp);
        });
        this.updateSystemSearchPath();
    };
    SearchPathHelper.prototype.formatPath = function (path) {
        if (path === void 0) { path = ""; }
        var len = path.length;
        if (len <= 0)
            return "";
        if (path[len - 1] != "/")
            path += "/";
        return path;
    };
    SearchPathHelper.prototype.getGameSearchPath = function (gid) {
        var storagePath = jsb.fileUtils.getWritablePath() + "gameUpdate/" + gid + "/";
        return storagePath;
    };
    SearchPathHelper.prototype.updateSystemSearchPath = function () {
        var arr = Array.from(this.pathSet);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "" && i != arr.length - 1) {
                arr[i] = arr[arr.length - 1];
                arr[arr.length - 1] = "";
                break;
            }
        }
        Logger.error("updateSystemSearchPath", JSON.stringify(arr));
        jsb.fileUtils.setSearchPaths(arr);
    };
    SearchPathHelper.prototype.getSystemSearchPath = function () {
        return jsb.fileUtils.getSearchPaths();
    };
    SearchPathHelper.prototype.checkPathExist = function (path) {
        return this.pathSet.has(path);
    };
    return SearchPathHelper;
}());
exports.default = SearchPathHelper;

cc._RF.pop();