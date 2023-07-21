
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/ActivityRightPanelView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a86f2Q6jf1Mjo1nrd5AW9m8', 'ActivityRightPanelView');
// hall/scripts/logic/hall/ui/Activity/ActivityRightPanelView.ts

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
var ActivityConstants_1 = require("./ActivityConstants");
var ActivityRightPanelView = /** @class */ (function (_super) {
    __extends(ActivityRightPanelView, _super);
    function ActivityRightPanelView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rightPage = [];
        _this.selectId = -1;
        _this.orgWide = 895;
        _this.orgHeight = 501;
        return _this;
    }
    ActivityRightPanelView.prototype.initView = function () {
        this.spriteNode = this.getChild("pictureView/scrollview/view/content/SpriteItem");
        if (this.spriteNode)
            this.spriteNode.active = false;
        this.contentSprite = this.spriteNode.getComponent(cc.Sprite);
        this.picturePanel = this.getChild("pictureView");
        if (this.picturePanel) {
            this.picturePanel.active = false;
        }
        this.noMsgTips = this.getChild("noMsgTips");
        if (this.noMsgTips) {
            this.noMsgTips.active = false;
        }
        this.rightPage.push(this.picturePanel);
        this.rightPage.push(this.noMsgTips);
    };
    ActivityRightPanelView.prototype.onSubViewShow = function () {
        this.selectId = -1;
    };
    ActivityRightPanelView.prototype.onSubViewHide = function () {
        this.selectId = -1;
    };
    ActivityRightPanelView.prototype.changeView = function (viewType, data) {
        if (viewType == this.selectId) {
            return;
        }
        this.rightPage.forEach(function (element) {
            if (element) {
                element.active = false;
                if (element.subViewState) {
                    element.subViewState = false;
                }
            }
        });
        switch (viewType) {
            case ActivityConstants_1.ActivityType.picture:
                this.picturePanel.active = true;
                this.spriteNode.active = true;
                if (data) {
                    this.selectId = data.atype;
                    this.RefreshInfoPanel(data);
                }
                break;
            case ActivityConstants_1.ActivityType.noMsgTips:
                this.noMsgTips.active = true;
                break;
        }
    };
    ActivityRightPanelView.prototype.showNotips = function (isShow) {
        this.noMsgTips.active = isShow;
    };
    ActivityRightPanelView.prototype.RefreshInfoPanel = function (data) {
        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, true);
        this.contentSprite.spriteFrame = null;
        var self = this;
        if (data.url != null && !Global.Toolkit.isEmptyObject(data.url)) {
            if (CC_JSB) {
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(data.url), Global.Toolkit.DealWithUrl(data.url), function (texture) {
                    if (self.selectId != data.atype) {
                        return;
                    }
                    if (self.spriteNode && self.spriteNode.isValid) {
                        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.node.width = self.orgWide;
                        var reHeight = self.orgWide * texture.height / texture.width;
                        if (reHeight <= self.orgHeight) {
                            reHeight = self.orgHeight;
                        }
                        self.contentSprite.node.height = reHeight;
                        self.contentSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
            else {
                // cc.assetManager.loadRemote(Global.Toolkit.DealWithUrl(data.url), { ext: '.png' }, function (err, texture :cc.Texture2D) {
                cc.assetManager.loadRemote(data.url, { ext: '.png' }, function (err, texture) {
                    if (self.selectId != data.atype) {
                        return;
                    }
                    if (err != null) {
                        return;
                    }
                    if (self.spriteNode && self.spriteNode.isValid) {
                        Global.Event.event(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, false);
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.node.width = self.orgWide;
                        var reHeight = self.orgWide * texture.height / texture.width;
                        if (reHeight <= self.orgHeight) {
                            reHeight = self.orgHeight;
                        }
                        self.contentSprite.node.height = reHeight;
                        self.contentSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
        }
        // this.RefreshLeftItem(data);
    };
    return ActivityRightPanelView;
}(ViewBase_1.default));
exports.default = ActivityRightPanelView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcQWN0aXZpdHlSaWdodFBhbmVsVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQseURBQXNFO0FBRXRFO0lBQW9ELDBDQUFRO0lBQTVEO1FBQUEscUVBbUpDO1FBNUlHLGVBQVMsR0FBVSxFQUFFLENBQUM7UUFDdEIsY0FBUSxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXRCLGFBQU8sR0FBVyxHQUFHLENBQUE7UUFDckIsZUFBUyxHQUFXLEdBQUcsQ0FBQTs7SUF3STNCLENBQUM7SUFuSWEseUNBQVEsR0FBbEI7UUFHSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0RBQWdELENBQUMsQ0FBQztRQUNsRixJQUFHLElBQUksQ0FBQyxVQUFVO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1FBRWxDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUNoRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1NBQ25DO1FBR0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFDakI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDaEM7UUFHRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENB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QUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO3dCQUM1RCxJQUFHLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUM3Qjs0QkFDSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTt5QkFDNUI7d0JBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQTt3QkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO3dCQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7cUJBQzFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO2FBQ0w7U0FDSjtRQUNELDhCQUE4QjtJQUNsQyxDQUFDO0lBRUwsNkJBQUM7QUFBRCxDQW5KQSxBQW1KQyxDQW5KbUQsa0JBQVEsR0FtSjNEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5VHlwZSwgQWN0aXZpdHlDb25zdGFudHMgfSBmcm9tIFwiLi9BY3Rpdml0eUNvbnN0YW50c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aXZpdHlSaWdodFBhbmVsVmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBcclxuICAgIFxyXG4gICAgbm9Nc2dUaXBzOiBjYy5Ob2RlO1xyXG4gICAgc3ByaXRlTm9kZTogY2MuTm9kZTtcclxuICAgIGNvbnRlbnRTcHJpdGU6Y2MuU3ByaXRlXHJcbiAgICByaWdodFBhZ2U6IGFueVtdID0gW107XHJcbiAgICBzZWxlY3RJZDogbnVtYmVyID0gLTE7XHJcbiAgICBwaWN0dXJlUGFuZWw6Y2MuTm9kZVxyXG4gICAgb3JnV2lkZSA6bnVtYmVyID0gODk1XHJcbiAgICBvcmdIZWlnaHQgOm51bWJlciA9IDUwMVxyXG5cclxuICAgXHJcbiAgIFxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5zcHJpdGVOb2RlID0gdGhpcy5nZXRDaGlsZChcInBpY3R1cmVWaWV3L3Njcm9sbHZpZXcvdmlldy9jb250ZW50L1Nwcml0ZUl0ZW1cIik7XHJcbiAgICAgICAgaWYodGhpcy5zcHJpdGVOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZW50U3ByaXRlID0gdGhpcy5zcHJpdGVOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgdGhpcy5waWN0dXJlUGFuZWwgPSB0aGlzLmdldENoaWxkKFwicGljdHVyZVZpZXdcIilcclxuICAgICAgICBpZih0aGlzLnBpY3R1cmVQYW5lbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGljdHVyZVBhbmVsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub01zZ1RpcHMgPSB0aGlzLmdldENoaWxkKFwibm9Nc2dUaXBzXCIpO1xyXG4gICAgICAgIGlmKHRoaXMubm9Nc2dUaXBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub01zZ1RpcHMuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5yaWdodFBhZ2UucHVzaCh0aGlzLnBpY3R1cmVQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5yaWdodFBhZ2UucHVzaCh0aGlzLm5vTXNnVGlwcyk7XHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICB0aGlzLnNlbGVjdElkID0gLTFcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlbGVjdElkID0gLTFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlVmlldyh2aWV3VHlwZTogbnVtYmVyLGRhdGE/OmFueSl7XHJcbiAgICAgICAgaWYodmlld1R5cGUgPT0gdGhpcy5zZWxlY3RJZCl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJpZ2h0UGFnZS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZihlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5zdWJWaWV3U3RhdGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdWJWaWV3U3RhdGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc3dpdGNoICh2aWV3VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5waWN0dXJlOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5waWN0dXJlUGFuZWwuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SWQgPSBkYXRhLmF0eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaEluZm9QYW5lbChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFjdGl2aXR5VHlwZS5ub01zZ1RpcHM6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vTXNnVGlwcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd05vdGlwcyhpc1Nob3c6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgIH1cclxuXHJcblxyXG4gICAgUmVmcmVzaEluZm9QYW5lbChkYXRhOiBhbnkpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIHRydWUpXHJcbiAgICAgICAgdGhpcy5jb250ZW50U3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbFxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoZGF0YS51cmwgIT0gbnVsbCAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChkYXRhLnVybCkpIHtcclxuICAgICAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuTG9hZFBpY1RvTmF0aXZlKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKGRhdGEudXJsKSwgR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwoZGF0YS51cmwpLCAodGV4dHVyZTpjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdElkICE9IGRhdGEuYXR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNwcml0ZU5vZGUgJiYgc2VsZi5zcHJpdGVOb2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5ub2RlLndpZHRoID0gc2VsZi5vcmdXaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZUhlaWdodCA9IHNlbGYub3JnV2lkZSAqIHRleHR1cmUuaGVpZ2h0IC8gdGV4dHVyZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZUhlaWdodCA8PSBzZWxmLm9yZ0hlaWdodClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVIZWlnaHQgPSBzZWxmLm9yZ0hlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5ub2RlLmhlaWdodCA9IHJlSGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5zaXplTW9kZSA9ICBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChkYXRhLnVybCksIHsgZXh0OiAnLnBuZycgfSwgZnVuY3Rpb24gKGVyciwgdGV4dHVyZSA6Y2MuVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShkYXRhLnVybCwgeyBleHQ6ICcucG5nJyB9LCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlIDpjYy5UZXh0dXJlMkQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNlbGVjdElkICE9IGRhdGEuYXR5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXJyIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihzZWxmLnNwcml0ZU5vZGUgJiYgc2VsZi5zcHJpdGVOb2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5ub2RlLndpZHRoID0gc2VsZi5vcmdXaWRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZUhlaWdodCA9IHNlbGYub3JnV2lkZSAqIHRleHR1cmUuaGVpZ2h0IC8gdGV4dHVyZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZUhlaWdodCA8PSBzZWxmLm9yZ0hlaWdodClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVIZWlnaHQgPSBzZWxmLm9yZ0hlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5ub2RlLmhlaWdodCA9IHJlSGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5zaXplTW9kZSA9ICBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29udGVudFNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5SZWZyZXNoTGVmdEl0ZW0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuIl19