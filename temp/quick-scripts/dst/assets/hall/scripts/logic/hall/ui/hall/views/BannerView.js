
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/BannerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10f23ZqOJRCNI7USSCpG/qp', 'BannerView');
// hall/scripts/logic/hall/ui/hall/views/BannerView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var GongGaoViewItem_1 = require("./GongGaoViewItem");
var BannerView = /** @class */ (function (_super) {
    __extends(BannerView, _super);
    function BannerView() {
        // private tempNode: cc.Node;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = new Array();
        //自动滚动间隔
        _this.scrollDelayTime = 15;
        //切页用时
        _this.scrollTime = 1;
        _this.gongGaoCount = 0;
        _this.hasRefreshMask = false;
        /*type :1 普通弹窗  2 二维码  3 跳转url
            subtype: 1.财富秘籍 2.复制官网 3.修复 4.充值
        */
        _this.configs = {
            11001: {
                type: 0,
                subtype: 0
            },
            11002: {
                type: 1,
                subtype: 1
            },
            11003: {
                type: 1,
                subtype: 4
            },
            11004: {
                type: 1,
                subtype: 2
            },
            11005: {
                type: 1,
                subtype: 3
            },
            11006: {
                type: 2
            },
        };
        return _this;
    }
    /* private clearRecord() {
        //自动播放开关
        this.pageView.isAutoScroll = false;

        this.pageView.removeAllPages();
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            item.node.setParent(this.tempNode);
            // item.reset();
            item.node.active = false;
            this.itemPool.push(item);
        }
        this.itemList = [];
    } */
    BannerView.prototype.initView = function () {
        this.pageView = this.node.getComponent("LoopPageView");
        // this.tempNode = this.getChild("maskNode/view");
        this.mask = this.getComponent("maskNode", cc.Mask);
        this.itemList = [];
        // this.initData();
        this.hasRefreshMask = false;
    };
    BannerView.prototype.initData = function () {
        var bannerlist = Global.GongGaoData.gongGaoList;
        if (bannerlist) {
            this.gongGaoCount = bannerlist.length;
            for (var i = 0; i < this.gongGaoCount; i++) {
                var itemData = bannerlist[i];
                this.addPrefeb(itemData);
            }
        }
    };
    BannerView.prototype.refreshMask = function () {
        if (this.hasRefreshMask)
            return;
        this.hasRefreshMask = true;
        if (this.mask && this.itemList.length > 0) {
            var spNode = cc.find("content/guangao_di", this.itemList[0].node);
            if (spNode) {
                var sp = spNode.getComponent(cc.Sprite);
                if (sp) {
                    this.mask.spriteFrame = sp.spriteFrame;
                }
            }
        }
    };
    BannerView.prototype.addPrefeb = function (itemData) {
        var _this = this;
        var data = itemData;
        var id = data.lunbo_id;
        if (!this.configs[id]) {
            Logger.error("ID无效！", id);
            return;
        }
        Global.ResourceManager.loadRes("hall@effect/hall/lunbo/gonggaoItem_" + id, function (error, prefab) {
            if (error != null) {
                Logger.error("加载预设失败", id);
                return;
            }
            if (cc.sys.platform != cc.sys.IPHONE && id == 11005) {
                return;
            }
            var effect = cc.instantiate(prefab);
            effect.name = "gonggaoItem_" + id;
            //1找到对应节点2.找到sprit组件3.设置对应图片
            var item = new GongGaoViewItem_1.default();
            item.setNode(effect);
            if (data.jump_type == 1 && data.jump_url) {
                item.setData({ type: 3, subtype: data.jump_url }, _this.pageView);
            }
            else {
                item.setData(_this.configs[id], _this.pageView);
            }
            var callback = function () {
                _this.pageView.addPage(item.node);
                //紫色公告mask是图片mask 需要特殊处理
                if (Global.Setting.SkinConfig.isPurple)
                    _this.refreshMask();
            };
            if (id == 11003) {
                item.InitVipCharge();
            }
            Global.customApp.loadBannerBg(item.icon, "guangao" + id + ".png", callback);
            _this.itemList.push(item);
            //g公告图集在大厅中  需要跟着大厅一起销毁或者不销毁
        }, null, null, Global.Toolkit.isIphone6());
    };
    BannerView.prototype.onSubViewShow = function () {
        this.initData();
        //自动切页滚动间隔
        this.pageView.autoScrollDelayTime = this.scrollDelayTime;
        //切页用时
        this.pageView.autoScrollTime = this.scrollTime;
        this.pageView.scrollToPage(0, 0);
        //
        this.updateView();
        this.updateQrCodeItem();
        //自动播放开关
        this.pageView.isAutoScroll = true;
    };
    BannerView.prototype.onSubViewHide = function () {
        this.pageView.removeAllPages();
        this.itemList = [];
    };
    BannerView.prototype.close = function () {
        this.itemList = [];
    };
    BannerView.prototype.onDispose = function () {
        // this.clearRecord();
        this.mask = null;
    };
    //刷新二维码
    BannerView.prototype.updateQrCodeItem = function () {
        if (this.itemList) {
            for (var i = 0; i < this.itemList.length; i++) {
                var item = this.itemList[i];
                var itemData = item.getData();
                if (itemData && itemData.type == 2) {
                    item.setData(itemData);
                    break;
                }
            }
        }
    };
    BannerView.prototype.updateView = function () {
    };
    return BannerView;
}(ViewBase_1.default));
exports.default = BannerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcQmFubmVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBb0Q7QUFDcEQscURBQWdEO0FBSWhEO0lBQXdDLDhCQUFRO0lBQWhEO1FBRUksNkJBQTZCO1FBRmpDLHFFQTRNQztRQXhNVyxjQUFRLEdBQTJCLElBQUksS0FBSyxFQUFFLENBQUM7UUFPdkQsUUFBUTtRQUNBLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE1BQU07UUFDRSxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUVmLGtCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBSWpCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBc0MvQjs7VUFFRTtRQUNNLGFBQU8sR0FBRztZQUNkLEtBQUssRUFBQztnQkFDRixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsS0FBSyxFQUFDO2dCQUNGLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUM7Z0JBQ0YsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBQztnQkFDRixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsS0FBSyxFQUFDO2dCQUNGLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUM7Z0JBQ0YsSUFBSSxFQUFFLENBQUM7YUFDVjtTQUVKLENBQUE7O0lBc0hMLENBQUM7SUF0TEc7Ozs7Ozs7Ozs7Ozs7UUFhSTtJQUVNLDZCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2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dCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgR29uZ0dhb1ZpZXdJdGVtIGZyb20gXCIuL0dvbmdHYW9WaWV3SXRlbVwiO1xyXG5pbXBvcnQgeyBTaW5nbGVHb25nR2FvTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9kYXRhL0dvbmdHYW9EYXRhXCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbm5lclZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgLy8gcHJpdmF0ZSB0ZW1wTm9kZTogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIGl0ZW1MaXN0OiBBcnJheTxHb25nR2FvVmlld0l0ZW0+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAvLyBwcml2YXRlIGl0ZW1Qb29sOiBBcnJheTxHb25nR2FvVmlld0l0ZW0+ID0gbmV3IEFycmF5KCk7XHJcbiAgICBwcml2YXRlIHBhZ2VWaWV3OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZW50IDpjYy5Ob2RlO1xyXG5cclxuXHJcbiAgICAvL+iHquWKqOa7muWKqOmXtOmalFxyXG4gICAgcHJpdmF0ZSBzY3JvbGxEZWxheVRpbWUgPSAxNTtcclxuICAgIC8v5YiH6aG155So5pe2XHJcbiAgICBwcml2YXRlIHNjcm9sbFRpbWUgPSAxO1xyXG5cclxuICAgIHByaXZhdGUgZ29uZ0dhb0NvdW50ID0gMDtcclxuXHJcbiAgICBwcml2YXRlIG1hc2s6Y2MuTWFzaztcclxuXHJcbiAgICBwcml2YXRlIGhhc1JlZnJlc2hNYXNrID0gZmFsc2U7XHJcblxyXG4gICAgLyogcHJpdmF0ZSBjbGVhclJlY29yZCgpIHtcclxuICAgICAgICAvL+iHquWKqOaSreaUvuW8gOWFs1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuaXNBdXRvU2Nyb2xsID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcucmVtb3ZlQWxsUGFnZXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMudGVtcE5vZGUpO1xyXG4gICAgICAgICAgICAvLyBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1MaXN0ID0gW107XHJcbiAgICB9ICovXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiTG9vcFBhZ2VWaWV3XCIpO1xyXG4gICAgICAgIC8vIHRoaXMudGVtcE5vZGUgPSB0aGlzLmdldENoaWxkKFwibWFza05vZGUvdmlld1wiKTtcclxuICAgICAgICB0aGlzLm1hc2sgPSB0aGlzLmdldENvbXBvbmVudChcIm1hc2tOb2RlXCIsIGNjLk1hc2spO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAvLyB0aGlzLmluaXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5oYXNSZWZyZXNoTWFzayA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdERhdGEoKSB7XHJcbiAgICAgICAgbGV0IGJhbm5lcmxpc3Q6IFNpbmdsZUdvbmdHYW9Nb2RlbFtdID0gR2xvYmFsLkdvbmdHYW9EYXRhLmdvbmdHYW9MaXN0O1xyXG4gICAgICAgIGlmKGJhbm5lcmxpc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLmdvbmdHYW9Db3VudCA9IGJhbm5lcmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuZ29uZ0dhb0NvdW50O2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbURhdGE6IFNpbmdsZUdvbmdHYW9Nb2RlbCA9IGJhbm5lcmxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByZWZlYihpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyp0eXBlIDoxIOaZrumAmuW8ueeqlyAgMiDkuoznu7TnoIEgIDMg6Lez6L2sdXJsXHJcbiAgICAgICAgc3VidHlwZTogMS7otKLlr4znp5jnsY0gMi7lpI3liLblrpjnvZEgMy7kv67lpI0gNC7lhYXlgLxcclxuICAgICovXHJcbiAgICBwcml2YXRlIGNvbmZpZ3MgPSB7XHJcbiAgICAgICAgMTEwMDE6e1xyXG4gICAgICAgICAgICB0eXBlOiAwLCBcclxuICAgICAgICAgICAgc3VidHlwZTogMCBcclxuICAgICAgICB9LFxyXG4gICAgICAgIDExMDAyOntcclxuICAgICAgICAgICAgdHlwZTogMSwgXHJcbiAgICAgICAgICAgIHN1YnR5cGU6IDFcclxuICAgICAgICB9LFxyXG4gICAgICAgIDExMDAzOntcclxuICAgICAgICAgICAgdHlwZTogMSwgXHJcbiAgICAgICAgICAgIHN1YnR5cGU6IDQgXHJcbiAgICAgICAgfSxcclxuICAgICAgICAxMTAwNDp7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsIFxyXG4gICAgICAgICAgICBzdWJ0eXBlOiAyIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTEwMDU6e1xyXG4gICAgICAgICAgICB0eXBlOiAxLCBcclxuICAgICAgICAgICAgc3VidHlwZTogM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTEwMDY6e1xyXG4gICAgICAgICAgICB0eXBlOiAyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hNYXNrKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmhhc1JlZnJlc2hNYXNrKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5oYXNSZWZyZXNoTWFzayA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5tYXNrICYmIHRoaXMuaXRlbUxpc3QubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBzcE5vZGUgPSBjYy5maW5kKFwiY29udGVudC9ndWFuZ2FvX2RpXCIsIHRoaXMuaXRlbUxpc3RbMF0ubm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNwTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwID0gc3BOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoc3ApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXNrLnNwcml0ZUZyYW1lID0gc3Auc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRQcmVmZWIoaXRlbURhdGE6IFNpbmdsZUdvbmdHYW9Nb2RlbCl7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBpdGVtRGF0YTtcclxuICAgICAgICBsZXQgaWQgPSBkYXRhLmx1bmJvX2lkO1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbmZpZ3NbaWRdKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiSUTml6DmlYjvvIFcIixpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhcImhhbGxAZWZmZWN0L2hhbGwvbHVuYm8vZ29uZ2dhb0l0ZW1fXCIrIGlkLCAoZXJyb3IsIHByZWZhYik9PntcclxuICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3pooTorr7lpLHotKVcIiwgaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gIT0gY2Muc3lzLklQSE9ORSYmaWQ9PTExMDA1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVmZmVjdCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYikgYXMgY2MuTm9kZTtcclxuICAgICAgICAgICAgZWZmZWN0Lm5hbWUgPSBcImdvbmdnYW9JdGVtX1wiICsgaWRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vMeaJvuWIsOWvueW6lOiKgueCuTIu5om+5Yiwc3ByaXTnu4Tku7YzLuiuvue9ruWvueW6lOWbvueJh1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBHb25nR2FvVmlld0l0ZW0oKTtcclxuICAgICAgICAgICAgaXRlbS5zZXROb2RlKGVmZmVjdCk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuanVtcF90eXBlPT0xJiZkYXRhLmp1bXBfdXJsKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0RGF0YSh7IHR5cGU6IDMsIHN1YnR5cGU6IGRhdGEuanVtcF91cmwgfSx0aGlzLnBhZ2VWaWV3KTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldERhdGEodGhpcy5jb25maWdzW2lkXSx0aGlzLnBhZ2VWaWV3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlVmlldy5hZGRQYWdlKGl0ZW0ubm9kZSk7XHJcbiAgICAgICAgICAgICAgICAvL+e0q+iJsuWFrOWRim1hc2vmmK/lm77niYdtYXNrIOmcgOimgeeJueauiuWkhOeQhlxyXG4gICAgICAgICAgICAgICAgaWYoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hNYXNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaWQgPT0gMTEwMDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uSW5pdFZpcENoYXJnZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgR2xvYmFsLmN1c3RvbUFwcC5sb2FkQmFubmVyQmcoaXRlbS5pY29uLFwiZ3Vhbmdhb1wiK2lkK1wiLnBuZ1wiLGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2flhazlkYrlm77pm4blnKjlpKfljoXkuK0gIOmcgOimgei3n+edgOWkp+WOheS4gOi1t+mUgOavgeaIluiAheS4jemUgOavgVxyXG4gICAgICAgIH0sIG51bGwsIG51bGwsIEdsb2JhbC5Ub29sa2l0LmlzSXBob25lNigpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xyXG4gICAgICAgIC8v6Ieq5Yqo5YiH6aG15rua5Yqo6Ze06ZqUXHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5hdXRvU2Nyb2xsRGVsYXlUaW1lID0gdGhpcy5zY3JvbGxEZWxheVRpbWU7XHJcbiAgICAgICAgLy/liIfpobXnlKjml7ZcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LmF1dG9TY3JvbGxUaW1lID0gdGhpcy5zY3JvbGxUaW1lO1xyXG4gICAgICAgIHRoaXMucGFnZVZpZXcuc2Nyb2xsVG9QYWdlKDAsIDApO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVRckNvZGVJdGVtKCk7XHJcbiAgICAgICAgLy/oh6rliqjmkq3mlL7lvIDlhbNcclxuICAgICAgICB0aGlzLnBhZ2VWaWV3LmlzQXV0b1Njcm9sbCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgdGhpcy5wYWdlVmlldy5yZW1vdmVBbGxQYWdlcygpO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5jbGVhclJlY29yZCgpO1xyXG4gICAgICAgIHRoaXMubWFzayA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liLfmlrDkuoznu7TnoIFcclxuICAgIHVwZGF0ZVFyQ29kZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbUxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLml0ZW1MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV1cclxuICAgICAgICAgICAgICAgIGxldCBpdGVtRGF0YSA9IGl0ZW0uZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1EYXRhICYmIGl0ZW1EYXRhLnR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc2V0RGF0YShpdGVtRGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWaWV3KCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19