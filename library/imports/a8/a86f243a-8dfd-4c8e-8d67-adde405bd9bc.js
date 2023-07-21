"use strict";
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