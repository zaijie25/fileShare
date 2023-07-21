
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/SearchPathHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFNlYXJjaFBhdGhIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBTSxjQUFjO0FBQzFDO0lBSUk7UUFIUSxZQUFPLEdBQWdCLElBQUksR0FBRyxDQUFDO1FBQy9CLGFBQVEsR0FBYSxFQUFFLENBQUMsQ0FBUSx5QkFBeUI7UUFHN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO1lBQ2hCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCxxQ0FBVSxHQUFqQixVQUFrQixJQUFZO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsd0JBQXdCO0lBQ2pCLHlDQUFjLEdBQXJCLFVBQXNCLElBQVk7UUFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN2QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFdBQVcs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RCxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sOENBQW1CLEdBQTFCO1FBQ0ksT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTSx5Q0FBYyxHQUFyQixVQUFzQixJQUFZO1FBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0E3RkEsQUE2RkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1heEdhbWVQYXRoID0gNTsgICAgICAvLyDlrZDmuLjmiI/mnIDlpKfkv53nlZnot6/lvoTmlbDph49cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoUGF0aEhlbHBlcntcclxuICAgIHByaXZhdGUgcGF0aFNldDogU2V0PHN0cmluZz4gPSBuZXcgU2V0O1xyXG4gICAgcHJpdmF0ZSBnYW1lTGlzdDogc3RyaW5nW10gPSBbXTsgICAgICAgIC8vIOmYn+WIlywg5Y+q55So5LqO6L6F5Yqp5pCc57Si6Lev5b6E6L+H5aSa5pe25Yig6Zmk5pyA5pep6YKj5p2hXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wYXRoU2V0LmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5nYW1lTGlzdCA9IFtdO1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpe1xyXG4gICAgICAgICAgICBsZXQgcGF0aExpc3QgPSBqc2IuZmlsZVV0aWxzLmdldFNlYXJjaFBhdGhzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUGF0aExpc3QocGF0aExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5re75Yqg6Lev5b6E5Yiw5pCc57Si6Lev5b6EICovXHJcbiAgICBwdWJsaWMgYWRkT25lUGF0aChwYXRoOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLnBhdGhTZXQuaGFzKHBhdGgpKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVtcCA9IHRoaXMuZm9ybWF0UGF0aChwYXRoKTtcclxuICAgICAgICB0aGlzLnBhdGhTZXQuYWRkKHRlbXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3lzdGVtU2VhcmNoUGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmt7vliqDmuLjmiI/ot6/lvoTliLDmkJzntKLot6/lvoQg5pyJ5pWw6YeP5LiK6ZmQICovXHJcbiAgICBwdWJsaWMgYWRkT25lR2FtZVBhdGgocGF0aDogc3RyaW5nKXtcclxuICAgICAgICBpZiAodGhpcy5wYXRoU2V0LmhhcyhwYXRoKSl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZUxpc3QubGVuZ3RoID49IG1heEdhbWVQYXRoKXtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmdhbWVMaXN0LnNoaWZ0KCk7O1xyXG4gICAgICAgICAgICB0aGlzLnBhdGhTZXQuZGVsZXRlKHRlbXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdhbWVMaXN0LnB1c2gocGF0aCk7XHJcbiAgICAgICAgdGhpcy5wYXRoU2V0LmFkZChwYXRoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVN5c3RlbVNlYXJjaFBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUGF0aExpc3QoYXJyOiBzdHJpbmdbXSA9IFtdKXtcclxuICAgICAgICBhcnIuZm9yRWFjaChwYXRoPT57XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5mb3JtYXRQYXRoKHBhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLnBhdGhTZXQuYWRkKHRlbXApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy51cGRhdGVTeXN0ZW1TZWFyY2hQYXRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZU9uZVBhdGgocGF0aDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgdGVtcCA9IHRoaXMuZm9ybWF0UGF0aChwYXRoKTtcclxuICAgICAgICB0aGlzLnBhdGhTZXQuZGVsZXRlKHRlbXApO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU3lzdGVtU2VhcmNoUGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVQYXRoTGlzdChhcnI6IHN0cmluZ1tdID0gW10pe1xyXG4gICAgICAgIGFyci5mb3JFYWNoKHBhdGg9PntcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLmZvcm1hdFBhdGgocGF0aCk7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aFNldC5kZWxldGUodGVtcCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnVwZGF0ZVN5c3RlbVNlYXJjaFBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvcm1hdFBhdGgocGF0aDogc3RyaW5nID0gXCJcIil7XHJcbiAgICAgICAgbGV0IGxlbiA9IHBhdGgubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYocGF0aFtsZW4gLSAxXSAhPSBcIi9cIilcclxuICAgICAgICAgICAgcGF0aCArPSBcIi9cIjtcclxuICAgICAgICByZXR1cm4gcGF0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0R2FtZVNlYXJjaFBhdGgoZ2lkOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBzdG9yYWdlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgICsgXCJnYW1lVXBkYXRlL1wiICsgZ2lkICsgXCIvXCI7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2VQYXRoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTeXN0ZW1TZWFyY2hQYXRoKCl7XHJcbiAgICAgICAgbGV0IGFyciA9IEFycmF5LmZyb20odGhpcy5wYXRoU2V0KTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpPCBhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID09IFwiXCIgJiYgaSAhPSBhcnIubGVuZ3RoIC0xKXtcclxuICAgICAgICAgICAgICAgIGFycltpXSA9IGFyclthcnIubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcInVwZGF0ZVN5c3RlbVNlYXJjaFBhdGhcIiwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcbiAgICAgICAganNiLmZpbGVVdGlscy5zZXRTZWFyY2hQYXRocyhhcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTeXN0ZW1TZWFyY2hQYXRoKCl7XHJcbiAgICAgICAgcmV0dXJuIGpzYi5maWxlVXRpbHMuZ2V0U2VhcmNoUGF0aHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tQYXRoRXhpc3QocGF0aDogc3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXRoU2V0LmhhcyhwYXRoKTtcclxuICAgIH1cclxufSJdfQ==