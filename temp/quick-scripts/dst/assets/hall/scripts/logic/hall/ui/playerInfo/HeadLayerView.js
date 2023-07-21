
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/HeadLayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4793fvewLpAr4YrydRf68Gb', 'HeadLayerView');
// hall/scripts/logic/hall/ui/playerInfo/HeadLayerView.ts

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
 * 选择头像界面
 */
var HeadLayerView = /** @class */ (function (_super) {
    __extends(HeadLayerView, _super);
    function HeadLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像范围
         */
        _this.headCount = 81;
        /**
         * 当前选中的头像索引
         */
        _this.chooseHeadIndex = 0;
        /**
         * 滚动容器
         */
        _this.scrollView = null;
        /**
         * 预设节点
         */
        _this.itemNode = null;
        /**
         * 选中节点
         */
        //chooseNode:cc.Node = null;
        /**
         * 当前生效的头像标识（勾）
         */
        _this.chooseBg = null;
        _this.chooseGou = null;
        _this.chooseCheck = null;
        /**
         * 初始坐标和间隔
         */
        _this.xyGapArr = [0, 0, 138, 141];
        return _this;
    }
    HeadLayerView.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        this.headCount = Global.Setting.headNameRange;
        this.scrollView = this.getComponent("scrollview", cc.ScrollView);
        this.itemNode = this.getChild("scrollview/view/content/itemlayer/item");
        this.itemNode.active = false;
        var startX = this.itemNode.x;
        var startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;
        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanHeadWH[0];
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanHeadWH[1];
        var h = 0;
        var index = 0;
        Global.Component.schedule(function () {
            if (index >= _this.headCount) {
                h = -h + (_this.itemNode.height / 2);
                var size = _this.scrollView.node.getContentSize();
                if (h < size.height) {
                    h = size.height;
                }
                _this.scrollView.content.setContentSize(0, h);
                return;
            }
            var end = index + 2;
            var begin = index;
            for (var i = begin; i < end; i++) {
                if (i >= _this.headCount) {
                    index++;
                    return;
                }
                var item = cc.instantiate(_this.itemNode);
                item.active = true;
                item.setParent(_this.itemNode.parent);
                item.name = "head_" + i;
                item.x = startX + _this.xyGapArr[2] * (i % 5);
                h = startY - _this.xyGapArr[3] * Math.floor(i / 5);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", _this.HeadBtnFunc, _this, cc.Button.Transition.NONE);
                _this.UpdateHead(item, i);
                index++;
            }
        }, 0, this.headCount / 2);
        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content);
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);
        // this.chooseCheck = cc.find("chooselayer/chooseCheck", this.scrollView.content)
    };
    /**
    * 更新界面
    */
    HeadLayerView.prototype.UpdateUI = function () {
        var i = this.chooseHeadIndex;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);
        i = parseInt(Global.PlayerData.headimg) - 1;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);
        this.chooseGou.x = x + 48;
        this.chooseGou.y = y - 48;
        // this.chooseBg.x = x;
        // this.chooseBg.y = y -30;
        // this.chooseCheck.x = x + 4;
        // this.chooseCheck.y = y - 5;
    };
    /**
     * 更新头像
     * @param itemNode 头像节点
     * @param index 索引
     */
    HeadLayerView.prototype.UpdateHead = function (itemNode, index) {
        var headImg = "" + (index + 1);
        var sprite = cc.find("mask/headFrame", itemNode).getComponent(cc.Sprite);
        sprite.spriteFrame = Global.Toolkit.getLocalHeadSf(headImg);
    };
    /**
     * 头像点击
     * @param target
     */
    HeadLayerView.prototype.HeadBtnFunc = function (target) {
        var _this = this;
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.chooseHeadIndex = index;
        this.UpdateUI();
        var chooseHead = "" + (this.chooseHeadIndex + 1);
        if (chooseHead != Global.PlayerData.headimg) {
            //请求修改头像
            var param = {};
            param.headimg = chooseHead;
            this.model.reqEditUserInfo(param, function () {
                Global.PlayerData.headimg = chooseHead; //更新玩家数据！
                _this.UpdateUI();
            });
        }
    };
    HeadLayerView.prototype.onSubViewShow = function () {
        this.chooseHeadIndex = parseInt(Global.PlayerData.headimg) - 1;
        this.UpdateUI();
    };
    HeadLayerView.prototype.onSubViewHide = function () {
    };
    return HeadLayerView;
}(ViewBase_1.default));
exports.default = HeadLayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxIZWFkTGF5ZXJWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUdqRDs7R0FFRztBQUNIO0lBQTJDLGlDQUFRO0lBQW5EO1FBQUEscUVBMEpDO1FBdkpHOztXQUVHO1FBQ0ssZUFBUyxHQUFXLEVBQUUsQ0FBQztRQUMvQjs7V0FFRztRQUNLLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDOztXQUVHO1FBQ0gsZ0JBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ2pDOztXQUVHO1FBQ0gsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNILDRCQUE0QjtRQUM1Qjs7V0FFRztRQUNILGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUMxQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUNILGNBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztJQTBIaEMsQ0FBQztJQXhIYSxnQ0FBUSxHQUFsQjtRQUFBLGlCQXVEQztRQXRERyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FB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QUFVLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2pELEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVwQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVTLHFDQUFhLEdBQXZCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxxQ0FBYSxHQUF2QjtJQUVBLENBQUM7SUFFTCxvQkFBQztBQUFELENBMUpBLEFBMEpDLENBMUowQyxrQkFBUSxHQTBKbEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiDpgInmi6nlpLTlg4/nlYzpnaJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRMYXllclZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgbW9kZWw6IFBsYXllckluZm9Nb2RlbFxyXG4gICAgLyoqXHJcbiAgICAgKiDlpLTlg4/ojIPlm7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoZWFkQ291bnQ6IG51bWJlciA9IDgxO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3pgInkuK3nmoTlpLTlg4/ntKLlvJVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaG9vc2VIZWFkSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOa7muWKqOWuueWZqFxyXG4gICAgICovXHJcbiAgICBzY3JvbGxWaWV3OiBjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6aKE6K6+6IqC54K5XHJcbiAgICAgKi9cclxuICAgIGl0ZW1Ob2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6YCJ5Lit6IqC54K5XHJcbiAgICAgKi9cclxuICAgIC8vY2hvb3NlTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN55Sf5pWI55qE5aS05YOP5qCH6K+G77yI5Yu+77yJXHJcbiAgICAgKi9cclxuICAgIGNob29zZUJnOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIGNob29zZUdvdTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBjaG9vc2VDaGVjazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WdkOagh+WSjOmXtOmalFxyXG4gICAgICovXHJcbiAgICB4eUdhcEFyciA9IFswLCAwLCAxMzgsIDE0MV07XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgdGhpcy5oZWFkQ291bnQgPSBHbG9iYWwuU2V0dGluZy5oZWFkTmFtZVJhbmdlO1xyXG5cclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXcgPSB0aGlzLmdldENvbXBvbmVudChcInNjcm9sbHZpZXdcIiwgY2MuU2Nyb2xsVmlldylcclxuICAgICAgICB0aGlzLml0ZW1Ob2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50L2l0ZW1sYXllci9pdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuaXRlbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHN0YXJ0WCA9IHRoaXMuaXRlbU5vZGUueDtcclxuICAgICAgICBsZXQgc3RhcnRZID0gdGhpcy5pdGVtTm9kZS55O1xyXG4gICAgICAgIHRoaXMueHlHYXBBcnJbMF0gPSBzdGFydFg7XHJcbiAgICAgICAgdGhpcy54eUdhcEFyclsxXSA9IHN0YXJ0WTtcclxuXHJcbiAgICAgICAgdGhpcy54eUdhcEFyclsyXSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuemh1YW5nYmFuSGVhZFdIWzBdXHJcbiAgICAgICAgdGhpcy54eUdhcEFyclszXSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuemh1YW5nYmFuSGVhZFdIWzFdXHJcblxyXG4gICAgICAgIGxldCBoID0gMDtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaGVhZENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBoID0gLWggKyAodGhpcy5pdGVtTm9kZS5oZWlnaHQgLyAyKVxyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSB0aGlzLnNjcm9sbFZpZXcubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGggPCBzaXplLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGggPSBzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5jb250ZW50LnNldENvbnRlbnRTaXplKDAsIGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGVuZCA9IGluZGV4ICsgMjtcclxuICAgICAgICAgICAgbGV0IGJlZ2luID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBiZWdpbjsgaSA8IGVuZDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSB0aGlzLmhlYWRDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1Ob2RlKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5pdGVtTm9kZS5wYXJlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IFwiaGVhZF9cIiArIGk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnggPSBzdGFydFggKyB0aGlzLnh5R2FwQXJyWzJdICogKGkgJSA1KTsgXHJcblxyXG4gICAgICAgICAgICAgICAgaCA9IHN0YXJ0WSAtIHRoaXMueHlHYXBBcnJbM10gKiBNYXRoLmZsb29yKGkgLyA1KTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ueSA9IGg7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2soaXRlbSwgXCJcIiwgdGhpcy5IZWFkQnRuRnVuYywgdGhpcywgY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVIZWFkKGl0ZW0sIGkpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDAsIHRoaXMuaGVhZENvdW50IC8gMilcclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY2hvb3NlQmcgPSBjYy5maW5kKFwiY2hvb3NlbGF5ZXIvY2hvb3NlQkdcIiwgdGhpcy5zY3JvbGxWaWV3LmNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlR291ID0gY2MuZmluZChcImNob29zZWxheWVyL2Nob29zZUdvdVwiLCB0aGlzLnNjcm9sbFZpZXcuY29udGVudCk7XHJcbiAgICAgICAgLy8gdGhpcy5jaG9vc2VDaGVjayA9IGNjLmZpbmQoXCJjaG9vc2VsYXllci9jaG9vc2VDaGVja1wiLCB0aGlzLnNjcm9sbFZpZXcuY29udGVudClcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOabtOaWsOeVjOmdolxyXG4gICAgKi9cclxuICAgIFVwZGF0ZVVJKCkge1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5jaG9vc2VIZWFkSW5kZXg7XHJcbiAgICAgICAgdmFyIHggPSB0aGlzLnh5R2FwQXJyWzBdICsgdGhpcy54eUdhcEFyclsyXSAqIChpICUgNSk7XHJcbiAgICAgICAgdmFyIHkgPSB0aGlzLnh5R2FwQXJyWzFdIC0gdGhpcy54eUdhcEFyclszXSAqIE1hdGguZmxvb3IoaSAvIDUpO1xyXG5cclxuICAgICAgICBpID0gcGFyc2VJbnQoR2xvYmFsLlBsYXllckRhdGEuaGVhZGltZykgLSAxO1xyXG4gICAgICAgIHZhciB4ID0gdGhpcy54eUdhcEFyclswXSArIHRoaXMueHlHYXBBcnJbMl0gKiAoaSAlIDUpO1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy54eUdhcEFyclsxXSAtIHRoaXMueHlHYXBBcnJbM10gKiBNYXRoLmZsb29yKGkgLyA1KTtcclxuICAgICAgICB0aGlzLmNob29zZUdvdS54ID0geCArIDQ4O1xyXG4gICAgICAgIHRoaXMuY2hvb3NlR291LnkgPSB5IC0gNDg7XHJcbiAgICAgICAgLy8gdGhpcy5jaG9vc2VCZy54ID0geDtcclxuICAgICAgICAvLyB0aGlzLmNob29zZUJnLnkgPSB5IC0zMDtcclxuICAgICAgICAvLyB0aGlzLmNob29zZUNoZWNrLnggPSB4ICsgNDtcclxuICAgICAgICAvLyB0aGlzLmNob29zZUNoZWNrLnkgPSB5IC0gNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOWktOWDj1xyXG4gICAgICogQHBhcmFtIGl0ZW1Ob2RlIOWktOWDj+iKgueCuVxyXG4gICAgICogQHBhcmFtIGluZGV4IOe0ouW8lVxyXG4gICAgICovXHJcbiAgICBVcGRhdGVIZWFkKGl0ZW1Ob2RlOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGhlYWRJbWcgPSBcIlwiICsgKGluZGV4ICsgMSk7XHJcbiAgICAgICAgdmFyIHNwcml0ZTogY2MuU3ByaXRlID0gY2MuZmluZChcIm1hc2svaGVhZEZyYW1lXCIsIGl0ZW1Ob2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKGhlYWRJbWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aS05YOP54K55Ye7XHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBIZWFkQnRuRnVuYyh0YXJnZXQpe1xyXG4gICAgICAgIHZhciBhcnIgPSB0YXJnZXQubmFtZS5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoYXJyW2Fyci5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VIZWFkSW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNob29zZUhlYWQgPSBcIlwiICsgKHRoaXMuY2hvb3NlSGVhZEluZGV4ICsgMSk7XHJcbiAgICAgICAgaWYoY2hvb3NlSGVhZCAhPSBHbG9iYWwuUGxheWVyRGF0YS5oZWFkaW1nKXtcclxuICAgICAgICAgICAgLy/or7fmsYLkv67mlLnlpLTlg49cclxuICAgICAgICAgICAgbGV0IHBhcmFtOmFueSA9IHt9XHJcbiAgICAgICAgICAgIHBhcmFtLmhlYWRpbWcgPSBjaG9vc2VIZWFkO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUVkaXRVc2VySW5mbyhwYXJhbSwgKCk9PntcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLmhlYWRpbWcgPSBjaG9vc2VIZWFkOyAvL+abtOaWsOeOqeWutuaVsOaNru+8gVxyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpIHtcclxuICAgICAgICB0aGlzLmNob29zZUhlYWRJbmRleCA9IHBhcnNlSW50KEdsb2JhbC5QbGF5ZXJEYXRhLmhlYWRpbWcpIC0gMTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSJdfQ==