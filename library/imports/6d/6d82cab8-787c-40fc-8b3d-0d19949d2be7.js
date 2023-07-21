"use strict";
cc._RF.push(module, '6d82cq4eHxA/Is9DRmUnSvn', 'CCLoaderHelper');
// hall/scripts/logic/core/hotUpdate/CCLoaderHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CCLoaderHelper = /** @class */ (function () {
    function CCLoaderHelper() {
    }
    CCLoaderHelper.prototype.getRes = function (path, type, cb) {
        var res = cc.loader.getRes(path);
        if (res == null) {
            Logger.log('CCLoaderHelper  res = null  path = ' + path);
            cc.loader.loadRes(path, type, cb);
        }
    };
    return CCLoaderHelper;
}());
exports.default = CCLoaderHelper;

cc._RF.pop();