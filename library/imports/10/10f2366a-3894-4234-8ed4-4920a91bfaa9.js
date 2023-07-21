"use strict";
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