"use strict";
cc._RF.push(module, 'd25fdqCDexK6a4PvaCELdZN', 'GongGaoView');
// hall/scripts/logic/hall/ui/hall/views/GongGaoView.ts

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
var GongGaoView = /** @class */ (function (_super) {
    __extends(GongGaoView, _super);
    function GongGaoView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.itemList = new Array();
        _this.itemPool = new Array();
        _this.gongGaoCfg = [];
        //自动滚动间隔
        _this.scrollDelayTime = 3;
        //切页用时
        _this.scrollTime = 1;
        _this.gongGaoCount = 5;
        return _this;
    }
    // private getItem(){
    //     var item = null;
    //     if(this.itemPool.length > 0){
    //         item = this.itemPool.pop();
    //         item.node.active = true;
    //     }else{
    //         var itemObj = cc.instantiate(this.itemPrefab);
    //     }
    //     item.node.active = true;
    //     return item;
    // }
    GongGaoView.prototype.clearRecord = function () {
        //自动播放开关
        this.pageView.isAutoScroll = false;
        this.pageView.removeAllPages();
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            item.node.setParent(this.tempNode);
            // item.reset();
            item.node.active = false;
            this.itemPool.push(item);
        }
        this.itemList = [];
    };
    GongGaoView.prototype.initView = function () {
        this.pageView = this.node.getComponent("LoopPageView");
        this.tempNode = this.getChild("maskNode/view");
        this.itemPrefab = this.getChild("maskNode/view/gonggaoItem");
        this.initData();
        this.itemList = [];
        for (var i = 0; i < this.gongGaoCount; i++) {
            var node = this.getChild("maskNode/view/content/gonggaoItem" + i);
            var item = new GongGaoViewItem_1.default();
            item.setNode(node);
            item.setData(this.gongGaoCfg[i]);
            if (cc.sys.platform != cc.sys.IPHONE && i == 2) {
                item.node.removeFromParent();
                item.node.destroy();
            }
            else {
                // 0 //关闭财富秘籍
                // 4 //关闭返利5%
                if (i == 0 || i == 4) {
                    item.node.removeFromParent();
                    item.node.destroy();
                }
                else {
                    this.itemList.push(item);
                }
            }
        }
    };
    GongGaoView.prototype.initData = function () {
        this.gongGaoCfg = [];
        this.gongGaoCfg.push({ type: 1, subtype: 1 });
        this.gongGaoCfg.push({ type: 1, subtype: 2 });
        if (cc.sys.platform == cc.sys.IPHONE)
            this.gongGaoCfg.push({ type: 1, subtype: 3 });
        else
            this.gongGaoCfg.push(null);
        this.gongGaoCfg.push({ type: 2 });
        this.gongGaoCfg.push({ type: 1, subtype: 4 });
    };
    GongGaoView.prototype.onSubViewShow = function () {
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
    GongGaoView.prototype.onDispose = function () {
        // this.clearRecord();
    };
    //刷新二维码
    GongGaoView.prototype.updateQrCodeItem = function () {
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
    GongGaoView.prototype.updateView = function () {
        return;
        // this.clearRecord();
        // var datas = [1,2,3];
        // for (let index = 0; index < datas.length; index++) {
        //     const data = datas[index];
        //     var item = this.getItem();
        //     item.setData(data);
        //     this.pageView.addPage(item.node);
        // }
        // if(datas.length > 0){
        //     //自动播放开关
        //     this.pageView.isAutoScroll = true;
        // }
    };
    return GongGaoView;
}(ViewBase_1.default));
exports.default = GongGaoView;

cc._RF.pop();