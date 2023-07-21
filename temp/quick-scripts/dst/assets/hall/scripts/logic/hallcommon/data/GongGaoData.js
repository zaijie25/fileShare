
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/data/GongGaoData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGRhdGFcXEdvbmdHYW9EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0lBQUE7UUFDVyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBVyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQzVCLFNBQUksR0FBVyxFQUFFLENBQUMsQ0FBQSxJQUFJO1FBQ3RCLGNBQVMsR0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlO1FBQ3RDLGFBQVEsR0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPO0lBQ3pDLENBQUM7SUFBRCx5QkFBQztBQUFELENBTkEsQUFNQyxJQUFBO0FBTlksZ0RBQWtCO0FBUS9CO0lBYUk7UUFaQTs7Ozs7OztZQU9JO1FBRUosWUFBWTtRQUNKLGlCQUFZLEdBQXdCLEVBQUUsQ0FBQztRQUczQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sMEJBQUksR0FBWCxVQUFZLFdBQWU7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNkLEVBQUUsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtZQUN0QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLGVBQWUsR0FBd0IsRUFBRSxDQUFDO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLFlBQVksR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7WUFDNUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxZQUFZLEVBQUU7Z0JBQzFCLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO29CQUNyRCxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQzthQUNKO1lBRUQsSUFBSSxZQUFZLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtnQkFDNUIsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN0QztTQUNKO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUM7SUFDeEMsQ0FBQztJQUVELHNCQUFXLG9DQUFXO2FBQXRCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBR0wsa0JBQUM7QUFBRCxDQWpEQSxBQWlEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVHb25nR2FvTW9kZWwge1xyXG4gICAgcHVibGljIGFwcF9pZDogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsdW5ib19pZDogbnVtYmVyID0gMDsvL+i9ruaSreWbvmlkXHJcbiAgICBwdWJsaWMgZGVzYzogc3RyaW5nID0gXCJcIjsvL+aPj+i/sFxyXG4gICAgcHVibGljIGp1bXBfdHlwZTogbnVtYmVyID0gMDsgLy/mmK/lkKbot7PovawgMOS4jei3s+i9rCAx6Lez6L2sXHJcbiAgICBwdWJsaWMganVtcF91cmw6IHN0cmluZyA9IFwiXCI7IC8v6Lez6L2sdXJsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdvbmdHYW9EYXRhIHtcclxuICAgIC8qIHByaXZhdGUgZ29uZ0dhb0lkTGlzdCA9IFtcclxuICAgICAgICAxMTAwMSwgICAvL+W5uOi/kOWls+elnlxyXG4gICAgICAgIDExMDAyLCAgIC8v6LSi5a+M56eY57GNXHJcbiAgICAgICAgMTEwMDMsICAgLy/lhYXlgLzov5TliKk1JVxyXG4gICAgICAgIDExMDA0LCAgIC8v5aSN5Yi25a6Y572RXHJcbiAgICAgICAgMTEwMDUsICAgLy/pl6rpgIDkv67lpI1cclxuICAgICAgICAxMTAwNiwgICAvL+mCgOivt+WlveWPi++8iOaJq+egge+8iVxyXG4gICAgXSAqL1xyXG4gICAgXHJcbiAgICAvL+imgeaYvuekuueahOWFrOWRiuaVsOaNruWIl+ihqFxyXG4gICAgcHJpdmF0ZSBfZ29uZ0dhb0xpc3Q6U2luZ2xlR29uZ0dhb01vZGVsW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuX2dvbmdHYW9MaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoZ29uZ0dhb2xpc3Q6IFtdKSB7XHJcbiAgICAgICAgaWYgKCFnb25nR2FvbGlzdCkge1xyXG4gICAgICAgICAgICBjYy5lcnJvcihcIi0tLS1nb25nR2FvTGlzdC0tLS0tLSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRlbXBHb25nR2FvTGlzdDpTaW5nbGVHb25nR2FvTW9kZWxbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ29uZ0dhb2xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1EYXRhID0gZ29uZ0dhb2xpc3RbaV07XHJcbiAgICAgICAgICAgIGxldCBnb25nR2FvTW9kZWwgPSBuZXcgU2luZ2xlR29uZ0dhb01vZGVsKCk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBnb25nR2FvTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YVtrZXldICE9IG51bGwgJiYgaXRlbURhdGFba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnb25nR2FvTW9kZWxba2V5XSA9IGl0ZW1EYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChnb25nR2FvTW9kZWwubHVuYm9faWQgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGVtcEdvbmdHYW9MaXN0LnB1c2goZ29uZ0dhb01vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZ29uZ0dhb0xpc3QgPSB0ZW1wR29uZ0dhb0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBnb25nR2FvTGlzdCgpOlNpbmdsZUdvbmdHYW9Nb2RlbFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ29uZ0dhb0xpc3Q7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==