
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/HeadFrameLayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0be939wb89FcJSa2GaKXKwo', 'HeadFrameLayerView');
// hall/scripts/logic/hall/ui/playerInfo/HeadFrameLayerView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
/**
 * 装扮页签下的头像框页签视图
 */
var HeadFrameLayerView = /** @class */ (function (_super) {
    __extends(HeadFrameLayerView, _super);
    function HeadFrameLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 头像框范围
        */
        _this.headFrameCount = 15;
        /**
         * 当前选中的头像框索引
         */
        _this.chooseHeadFrameIndex = -1;
        /**
         * 滚动容器
         */
        _this.scrollView = null;
        /**
         * 预设节点
         */
        _this.itemNode = null;
        /**
         * 初始坐标和间隔
         */
        _this.xyGapArr = [0, 0, 164, 160];
        /**
         * 头像框节点集合
         */
        _this.itemNodeArr = [];
        /**
         * 当前生效的头像框标识（勾）
         */
        // chooseBg: cc.Node = null;
        _this.chooseGou = null;
        /**
         * 当前显示的头像框内的头像
         */
        _this.spriteHeadVip = null;
        /**
         * 当前显示的头像框
         */
        _this.spriteHeadFrameVip = null;
        /**
         * 当前显示的头像框vip图标
         */
        _this.spriteVip = null;
        /**
         * 当前显示的头像框vip文本
         */
        _this.labelVip = null;
        /**
         * 当前显示的头像框信息索引
         */
        _this.showHeadFrameIndex = -1;
        return _this;
    }
    HeadFrameLayerView.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        this.scrollView = cc.find("scrollview", this.node).getComponent(cc.ScrollView);
        this.itemNode = cc.find("itemlayer/item", this.scrollView.content);
        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content)
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);
        var startX = this.itemNode.x;
        var startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;
        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanKuangWH[0];
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanKuangWH[1];
        var h = 0;
        var index = 0;
        // this.headFrameCount = PlayerInfoModel.instance.vip_cfg.length;
        Global.Component.schedule(function () {
            var end = index + 2;
            var begin = index;
            for (var i = begin; i < end; i++) {
                if (i >= _this.headFrameCount) {
                    if (index >= _this.headFrameCount) {
                        h = -h + (_this.itemNode.height / 2);
                        var size = _this.scrollView.node.getContentSize();
                        if (h < size.height) {
                            h = size.height;
                        }
                        _this.scrollView.content.setContentSize(0, h + 20);
                        return;
                    }
                    return;
                }
                var item = cc.instantiate(_this.itemNode);
                item.setParent(_this.itemNode.parent);
                item.active = true;
                _this.itemNodeArr.push(item);
                item.name = "head_" + i;
                item.x = startX + _this.xyGapArr[2] * (i % 3);
                h = startY - _this.xyGapArr[3] * Math.floor(i / 3);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", _this.HeadBtnFunc, _this, cc.Button.Transition.NONE);
                _this.UpdateHead(item, i);
                index++;
            }
        }, 0, this.headFrameCount / 2);
        this.itemNode.active = false;
        this.spriteHeadVip = cc.find("right/item/head", this.node).getComponent(cc.Sprite);
        this.spriteHeadFrameVip = cc.find("right/item/txk", this.node).getComponent(cc.Sprite);
        this.spriteVip = cc.find("right/icon_vip", this.node).getComponent(cc.Sprite);
        this.labelVip = cc.find("right/label_vip", this.node).getComponent(cc.Label);
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.updateUserInfo);
    };
    /**
     * 更新界面
     */
    HeadFrameLayerView.prototype.UpdateUI = function () {
        if (this.chooseHeadFrameIndex >= 0) {
            var node = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(node, this.chooseHeadFrameIndex, true);
        }
        var i = parseInt(Global.PlayerData.headkuang) - 1;
        if (i >= 0) {
            // this.chooseBg.active = true;
            this.chooseGou.active = true;
            var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 3);
            var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 3);
            this.chooseGou.x = x;
            this.chooseGou.y = y - 30;
            // this.chooseBg.x = x;
            // this.chooseBg.y = y -30;
        }
        else {
            // this.chooseBg.active = false;
            this.chooseGou.active = false;
        }
    };
    /**
     * 更新头像框
     * @param itemNode 头像节点
     * @param index 索引
     */
    HeadFrameLayerView.prototype.UpdateHead = function (itemNode, index, bChoose) {
        if (bChoose === void 0) { bChoose = false; }
        var headImg = "" + (index + 1);
        var sprite = cc.find("txk", itemNode).getComponent(cc.Sprite);
        var unlock = cc.find("unlock", itemNode);
        unlock.active = false;
        var unlocklab = cc.find("unlock_lab", unlock).getComponent(cc.Label);
        unlocklab.string = "vip" + headImg;
        if (Global.PlayerData.vip < index + 1) {
            unlock.active = true;
        }
        Global.Toolkit.loadLocalHeadFrame(sprite, headImg, false, true);
    };
    /**
     * 更新vip内容
     */
    HeadFrameLayerView.prototype.UpdateVip = function () {
        var showVip = this.showHeadFrameIndex + 1;
        if (showVip < 1) {
            showVip = 1;
        }
        if (this.model.vipExpArr.length <= showVip) {
            showVip = this.model.vipExpArr.length;
        }
        var headImg = "" + showVip;
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrameVip, headImg);
        Global.Toolkit.loadLocalVip(this.spriteVip, showVip);
        this.labelVip.string = "激活" + "VIP" + showVip + "即可获得";
    };
    /**
     * 头像框点击
     * @param target
     */
    HeadFrameLayerView.prototype.HeadBtnFunc = function (target) {
        var _this = this;
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.showHeadFrameIndex = index;
        this.UpdateVip();
        var needVip = index + 1;
        if (Global.PlayerData.vip < needVip) {
            Global.UI.fastTip("头像框未拥有");
            return;
        }
        this.CancelChooseLastHead();
        this.chooseHeadFrameIndex = index;
        this.UpdateUI();
        var chooseHead = "" + (this.chooseHeadFrameIndex + 1);
        if (chooseHead != Global.PlayerData.headkuang) {
            //请求修改头像框
            var param = {};
            param.head = parseInt(chooseHead);
            this.model.reqSetSelfCfg(param, function () {
                Global.PlayerData.headkuang = chooseHead;
                _this.UpdateUI();
                // Global.UI.fastTip("修改头像框成功！");
            });
        }
    };
    /**
     * 取消选择之前的头像框
     */
    HeadFrameLayerView.prototype.CancelChooseLastHead = function () {
        if (this.chooseHeadFrameIndex >= 0) {
            var lastNode = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(lastNode, this.chooseHeadFrameIndex);
        }
    };
    HeadFrameLayerView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.updateUserInfo);
    };
    HeadFrameLayerView.prototype.onSubViewShow = function () {
        this.CancelChooseLastHead();
        this.spriteHeadVip.spriteFrame = Global.Toolkit.getLocalHeadSf(Global.PlayerData.headimg);
        this.chooseHeadFrameIndex = parseInt(Global.PlayerData.headkuang) - 1;
        this.showHeadFrameIndex = this.chooseHeadFrameIndex;
        this.UpdateUI();
        this.UpdateVip();
    };
    HeadFrameLayerView.prototype.updateUserInfo = function () {
        for (var i = 0; i < Global.PlayerData.vip; i++) {
            var node = this.itemNodeArr[i];
            if (node) {
                var unlock = cc.find("unlock", node);
                unlock.active = false;
            }
        }
    };
    return HeadFrameLayerView;
}(ViewBase_1.default));
exports.default = HeadFrameLayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxIZWFkRnJhbWVMYXllclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBR2pEOztHQUVHO0FBQ0g7SUFBZ0Qsc0NBQVE7SUFBeEQ7UUFBQSxxRUEwUEM7UUFyUEc7O1VBRUU7UUFDTSxvQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUNwQzs7V0FFRztRQUNLLDBCQUFvQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzFDOztXQUVHO1FBQ0gsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDOztXQUVHO1FBQ0gsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNILGNBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzVCOztXQUVHO1FBQ0gsaUJBQVcsR0FBYyxFQUFFLENBQUM7UUFDNUI7O1dBRUc7UUFDSCw0QkFBNEI7UUFDNUIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQjs7V0FFRztRQUNILG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDOztXQUVHO1FBQ0gsd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBQ3JDOztXQUVHO1FBQ0gsZUFBUyxHQUFjLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUNILGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUI7O1dBRUc7UUFDSCx3QkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs7SUFvTTVCLENBQUM7SUFqTWEscUNBQVEsR0FBbEI7UUFBQSxpQkE2REM7UUE1REcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBRTVELElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVB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QUcsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU8sMkNBQWMsR0FBdEI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLElBQUksRUFBRTtnQkFDTixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUM7SUFFTCx5QkFBQztBQUFELENBMVBBLEFBMFBDLENBMVArQyxrQkFBUSxHQTBQdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiDoo4Xmia7pobXnrb7kuIvnmoTlpLTlg4/moYbpobXnrb7op4blm75cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRGcmFtZUxheWVyVmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBtb2RlbDogUGxheWVySW5mb01vZGVsXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlpLTlg4/moYbojIPlm7RcclxuICAgICovXHJcbiAgICBwcml2YXRlIGhlYWRGcmFtZUNvdW50OiBudW1iZXIgPSAxNTtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN6YCJ5Lit55qE5aS05YOP5qGG57Si5byVXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hvb3NlSGVhZEZyYW1lSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmu5rliqjlrrnlmahcclxuICAgICAqL1xyXG4gICAgc2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldyA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOmihOiuvuiKgueCuVxyXG4gICAgICovXHJcbiAgICBpdGVtTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WdkOagh+WSjOmXtOmalFxyXG4gICAgICovXHJcbiAgICB4eUdhcEFyciA9IFswLCAwLCAxNjQsIDE2MF07XHJcbiAgICAvKipcclxuICAgICAqIOWktOWDj+ahhuiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICBpdGVtTm9kZUFycjogY2MuTm9kZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeUn+aViOeahOWktOWDj+ahhuagh+ivhu+8iOWLvu+8iVxyXG4gICAgICovXHJcbiAgICAvLyBjaG9vc2VCZzogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBjaG9vc2VHb3U6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S655qE5aS05YOP5qGG5YaF55qE5aS05YOPXHJcbiAgICAgKi9cclxuICAgIHNwcml0ZUhlYWRWaXA6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeaYvuekuueahOWktOWDj+ahhlxyXG4gICAgICovXHJcbiAgICBzcHJpdGVIZWFkRnJhbWVWaXA6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeaYvuekuueahOWktOWDj+ahhnZpcOWbvuagh1xyXG4gICAgICovXHJcbiAgICBzcHJpdGVWaXA6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeaYvuekuueahOWktOWDj+ahhnZpcOaWh+acrFxyXG4gICAgICovXHJcbiAgICBsYWJlbFZpcDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mmL7npLrnmoTlpLTlg4/moYbkv6Hmga/ntKLlvJVcclxuICAgICAqL1xyXG4gICAgc2hvd0hlYWRGcmFtZUluZGV4ID0gLTE7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlBsYXllckluZm9Nb2RlbFwiKVxyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcgPSBjYy5maW5kKFwic2Nyb2xsdmlld1wiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlID0gY2MuZmluZChcIml0ZW1sYXllci9pdGVtXCIsIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50KTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5jaG9vc2VCZyA9IGNjLmZpbmQoXCJjaG9vc2VsYXllci9jaG9vc2VCR1wiLCB0aGlzLnNjcm9sbFZpZXcuY29udGVudClcclxuICAgICAgICB0aGlzLmNob29zZUdvdSA9IGNjLmZpbmQoXCJjaG9vc2VsYXllci9jaG9vc2VHb3VcIiwgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnRYID0gdGhpcy5pdGVtTm9kZS54O1xyXG4gICAgICAgIHZhciBzdGFydFkgPSB0aGlzLml0ZW1Ob2RlLnk7XHJcbiAgICAgICAgdGhpcy54eUdhcEFyclswXSA9IHN0YXJ0WDtcclxuICAgICAgICB0aGlzLnh5R2FwQXJyWzFdID0gc3RhcnRZO1xyXG5cclxuICAgICAgICB0aGlzLnh5R2FwQXJyWzJdID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy56aHVhbmdiYW5LdWFuZ1dIWzBdXHJcbiAgICAgICAgdGhpcy54eUdhcEFyclszXSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuemh1YW5nYmFuS3VhbmdXSFsxXVxyXG5cclxuICAgICAgICB2YXIgaCA9IDA7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAvLyB0aGlzLmhlYWRGcmFtZUNvdW50ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcF9jZmcubGVuZ3RoO1xyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGUoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGVuZCA9IGluZGV4ICsgMjtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBiZWdpbjsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLmhlYWRGcmFtZUNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaGVhZEZyYW1lQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaCA9IC1oICsgKHRoaXMuaXRlbU5vZGUuaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuZ2V0Q29udGVudFNpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggPCBzaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaCA9IHNpemUuaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnNldENvbnRlbnRTaXplKDAsIGggKyAyMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5pdGVtTm9kZS5wYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1Ob2RlQXJyLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gXCJoZWFkX1wiICsgaTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueCA9IHN0YXJ0WCArIHRoaXMueHlHYXBBcnJbMl0gKiAoaSAlIDMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGggPSBzdGFydFkgLSB0aGlzLnh5R2FwQXJyWzNdICogTWF0aC5mbG9vcihpIC8gMyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnkgPSBoO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKGl0ZW0sIFwiXCIsIHRoaXMuSGVhZEJ0bkZ1bmMsIHRoaXMsIGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlSGVhZChpdGVtLCBpKTtcclxuICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDAsIHRoaXMuaGVhZEZyYW1lQ291bnQgLyAyKVxyXG5cclxuICAgICAgICB0aGlzLml0ZW1Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZUhlYWRWaXAgPSBjYy5maW5kKFwicmlnaHQvaXRlbS9oZWFkXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkRnJhbWVWaXAgPSBjYy5maW5kKFwicmlnaHQvaXRlbS90eGtcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwcml0ZVZpcCA9IGNjLmZpbmQoXCJyaWdodC9pY29uX3ZpcFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubGFiZWxWaXAgPSBjYy5maW5kKFwicmlnaHQvbGFiZWxfdmlwXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuQ0hBTkdFVklQLCB0aGlzLCB0aGlzLnVwZGF0ZVVzZXJJbmZvKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIFVwZGF0ZVVJKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNob29zZUhlYWRGcmFtZUluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLml0ZW1Ob2RlQXJyW3RoaXMuY2hvb3NlSGVhZEZyYW1lSW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUhlYWQobm9kZSwgdGhpcy5jaG9vc2VIZWFkRnJhbWVJbmRleCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KEdsb2JhbC5QbGF5ZXJEYXRhLmhlYWRrdWFuZykgLSAxO1xyXG4gICAgICAgIGlmIChpID49IDApIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VCZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNob29zZUdvdS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMueHlHYXBBcnJbMF0gKyB0aGlzLnh5R2FwQXJyWzJdICogKGkgJSAzKTtcclxuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnh5R2FwQXJyWzFdIC0gdGhpcy54eUdhcEFyclszXSAqIE1hdGguZmxvb3IoaSAvIDMpO1xyXG4gICAgICAgICAgICB0aGlzLmNob29zZUdvdS54ID0geDtcclxuICAgICAgICAgICAgdGhpcy5jaG9vc2VHb3UueSA9IHkgLSAzMDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VCZy54ID0geDtcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VCZy55ID0geSAtMzA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5jaG9vc2VCZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaG9vc2VHb3UuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gaXRlbU5vZGUg5aS05YOP6IqC54K5XHJcbiAgICAgKiBAcGFyYW0gaW5kZXgg57Si5byVXHJcbiAgICAgKi9cclxuICAgIFVwZGF0ZUhlYWQoaXRlbU5vZGU6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIsIGJDaG9vc2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHZhciBoZWFkSW1nID0gXCJcIiArIChpbmRleCArIDEpO1xyXG4gICAgICAgIHZhciBzcHJpdGU6IGNjLlNwcml0ZSA9IGNjLmZpbmQoXCJ0eGtcIiwgaXRlbU5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHZhciB1bmxvY2sgPSBjYy5maW5kKFwidW5sb2NrXCIsIGl0ZW1Ob2RlKTtcclxuICAgICAgICB1bmxvY2suYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHVubG9ja2xhYiA9IGNjLmZpbmQoXCJ1bmxvY2tfbGFiXCIsIHVubG9jaykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB1bmxvY2tsYWIuc3RyaW5nID0gXCJ2aXBcIiArIGhlYWRJbWc7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhLnZpcCA8IGluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICB1bmxvY2suYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5sb2FkTG9jYWxIZWFkRnJhbWUoc3ByaXRlLCBoZWFkSW1nLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrB2aXDlhoXlrrlcclxuICAgICAqL1xyXG4gICAgVXBkYXRlVmlwKCkge1xyXG4gICAgICAgIHZhciBzaG93VmlwID0gdGhpcy5zaG93SGVhZEZyYW1lSW5kZXggKyAxO1xyXG4gICAgICAgIGlmIChzaG93VmlwIDwgMSkge1xyXG4gICAgICAgICAgICBzaG93VmlwID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwudmlwRXhwQXJyLmxlbmd0aCA8PSBzaG93VmlwKSB7XHJcbiAgICAgICAgICAgIHNob3dWaXAgPSB0aGlzLm1vZGVsLnZpcEV4cEFyci5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBoZWFkSW1nID0gXCJcIiArIHNob3dWaXA7XHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lKHRoaXMuc3ByaXRlSGVhZEZyYW1lVmlwLCBoZWFkSW1nKTtcclxuXHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsVmlwKHRoaXMuc3ByaXRlVmlwLCBzaG93VmlwKTtcclxuXHJcbiAgICAgICAgdGhpcy5sYWJlbFZpcC5zdHJpbmcgPSBcIua/gOa0u1wiICsgXCJWSVBcIiArIHNob3dWaXAgKyBcIuWNs+WPr+iOt+W+l1wiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aS05YOP5qGG54K55Ye7XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBIZWFkQnRuRnVuYyh0YXJnZXQpIHtcclxuICAgICAgICB2YXIgYXJyID0gdGFyZ2V0Lm5hbWUuc3BsaXQoXCJfXCIpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGFyclthcnIubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgIHRoaXMuc2hvd0hlYWRGcmFtZUluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVWaXAoKTtcclxuXHJcbiAgICAgICAgdmFyIG5lZWRWaXAgPSBpbmRleCArIDE7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5QbGF5ZXJEYXRhLnZpcCA8IG5lZWRWaXApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpLTlg4/moYbmnKrmi6XmnIlcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2FuY2VsQ2hvb3NlTGFzdEhlYWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaG9vc2VIZWFkRnJhbWVJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuXHJcbiAgICAgICAgdmFyIGNob29zZUhlYWQgPSBcIlwiICsgKHRoaXMuY2hvb3NlSGVhZEZyYW1lSW5kZXggKyAxKTtcclxuICAgICAgICBpZiAoY2hvb3NlSGVhZCAhPSBHbG9iYWwuUGxheWVyRGF0YS5oZWFka3VhbmcpIHtcclxuICAgICAgICAgICAgLy/or7fmsYLkv67mlLnlpLTlg4/moYZcclxuICAgICAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fVxyXG4gICAgICAgICAgICBwYXJhbS5oZWFkID0gcGFyc2VJbnQoY2hvb3NlSGVhZCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxU2V0U2VsZkNmZyhwYXJhbSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlBsYXllckRhdGEuaGVhZGt1YW5nID0gY2hvb3NlSGVhZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKFwi5L+u5pS55aS05YOP5qGG5oiQ5Yqf77yBXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5bmtojpgInmi6nkuYvliY3nmoTlpLTlg4/moYZcclxuICAgICAqL1xyXG4gICAgQ2FuY2VsQ2hvb3NlTGFzdEhlYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvb3NlSGVhZEZyYW1lSW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdE5vZGUgPSB0aGlzLml0ZW1Ob2RlQXJyW3RoaXMuY2hvb3NlSGVhZEZyYW1lSW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZUhlYWQobGFzdE5vZGUsIHRoaXMuY2hvb3NlSGVhZEZyYW1lSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5DSEFOR0VWSVAsIHRoaXMsIHRoaXMudXBkYXRlVXNlckluZm8pXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgdGhpcy5DYW5jZWxDaG9vc2VMYXN0SGVhZCgpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlSGVhZFZpcC5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKEdsb2JhbC5QbGF5ZXJEYXRhLmhlYWRpbWcpO1xyXG5cclxuICAgICAgICB0aGlzLmNob29zZUhlYWRGcmFtZUluZGV4ID0gcGFyc2VJbnQoR2xvYmFsLlBsYXllckRhdGEuaGVhZGt1YW5nKSAtIDE7XHJcbiAgICAgICAgdGhpcy5zaG93SGVhZEZyYW1lSW5kZXggPSB0aGlzLmNob29zZUhlYWRGcmFtZUluZGV4O1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVZpcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVXNlckluZm8oKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHbG9iYWwuUGxheWVyRGF0YS52aXA7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMuaXRlbU5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdW5sb2NrID0gY2MuZmluZChcInVubG9ja1wiLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIHVubG9jay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=