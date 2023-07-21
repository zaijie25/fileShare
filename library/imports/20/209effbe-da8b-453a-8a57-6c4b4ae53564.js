"use strict";
cc._RF.push(module, '209ef++2otFOopXbEtK5TVk', 'GongGaoData');
// hall/scripts/logic/hallcommon/data/GongGaoData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleGongGaoModel = void 0;
var SingleGongGaoModel = /** @class */ (function () {
    function SingleGongGaoModel() {
        this.app_id = 0;
        this.lunbo_id = 0; //轮播图id
        this.desc = ""; //描述
        this.jump_type = 0; //是否跳转 0不跳转 1跳转
        this.jump_url = ""; //跳转url
    }
    return SingleGongGaoModel;
}());
exports.SingleGongGaoModel = SingleGongGaoModel;
var GongGaoData = /** @class */ (function () {
    function GongGaoData() {
        /* private gongGaoIdList = [
            11001,   //幸运女神
            11002,   //财富秘籍
            11003,   //充值返利5%
            11004,   //复制官网
            11005,   //闪退修复
            11006,   //邀请好友（扫码）
        ] */
        //要显示的公告数据列表
        this._gongGaoList = [];
        this.clear();
    }
    GongGaoData.prototype.clear = function () {
        this._gongGaoList = [];
    };
    GongGaoData.prototype.init = function (gongGaolist) {
        if (!gongGaolist) {
            cc.error("----gongGaoList------ null");
            return;
        }
        var tempGongGaoList = [];
        for (var i = 0; i < gongGaolist.length; i++) {
            var itemData = gongGaolist[i];
            var gongGaoModel = new SingleGongGaoModel();
            for (var key in gongGaoModel) {
                if (itemData[key] != null && itemData[key] != undefined) {
                    gongGaoModel[key] = itemData[key];
                }
            }
            if (gongGaoModel.lunbo_id != 0) {
                tempGongGaoList.push(gongGaoModel);
            }
        }
        this._gongGaoList = tempGongGaoList;
    };
    Object.defineProperty(GongGaoData.prototype, "gongGaoList", {
        get: function () {
            return this._gongGaoList;
        },
        enumerable: false,
        configurable: true
    });
    return GongGaoData;
}());
exports.default = GongGaoData;

cc._RF.pop();