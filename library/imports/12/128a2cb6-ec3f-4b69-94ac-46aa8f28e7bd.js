"use strict";
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