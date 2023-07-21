
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/ProxyWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4e71fd8AOVB9Y89OVdWljfY', 'ProxyWin');
// hall/scripts/logic/hall/ui/Spread/ProxyWin.ts

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
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var ProxyWin = /** @class */ (function (_super) {
    __extends(ProxyWin, _super);
    function ProxyWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_img = "";
        _this.servicerNode = [];
        _this.servicerType = {
            1: "icon_kfwx",
            2: "icon_kfqq",
            3: "icon_kfwx",
            4: "icon_kfat",
            5: "img_llgf",
            6: "img_llgf" //在线客服
        };
        _this.servicerName = {
            1: "客服微信",
            2: "客服QQ",
            3: "公众号",
            4: "艾特客服",
            5: "在线客服",
            6: "在线客服" //默认
        };
        return _this;
    }
    ProxyWin.prototype.onInit = function () {
    };
    ProxyWin.prototype.initView = function () {
        this.serviceModel = Global.ModelManager.getModel("ServicerModel");
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.centerImg = this.getChild("mask/centerImg");
        this.contentSprite = this.centerImg.getComponent(cc.Sprite);
        this.delegateNode = this.getChild("ServerNode");
        var leftNode = this.getChild("ServerNode/leftNode");
        // if (leftNode) {
        //     leftNode.active = false
        // }
        //  let rightNode = this.getChild("ServerNode/rightNode")
        // if (rightNode) {
        //     rightNode.active = false
        // }
        this.servicerNode.push(leftNode);
        //   this.servicerNode.push(rightNode)
        Global.UIHelper.addCommonClick(this.node, "ServerNode/leftNode/btn_leftkefu", this.openServicerApp, this);
        //  Global.UIHelper.addCommonClick(this.node, "ServerNode/rightNode/btn_leftkefu", this.openServicerApp, this);
    };
    ProxyWin.prototype.onSubViewShow = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        var url = Global.Setting.Urls.getinviteUrl();
        this.SpreadModel.GetDayAgentShare(url);
        //  this.CheckKefu()
        this.showProxy();
        this.InitCenterImg();
    };
    ProxyWin.prototype.InitCenterImg = function () {
        if (!this.show_img) {
            return;
        }
        this.contentSprite.spriteFrame = null;
        var self = this;
        if (self.show_img != null && !Global.Toolkit.isEmptyObject(self.show_img)) {
            if (CC_JSB) {
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(self.show_img), Global.Toolkit.DealWithUrl(self.show_img), function (texture) {
                    if (self.centerImg && self.centerImg.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
            else {
                cc.loader.load(Global.Toolkit.DealWithUrl(self.show_img), function (err, texture) {
                    if (err != null) {
                        return;
                    }
                    if (self.centerImg && self.centerImg.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
        }
    };
    ProxyWin.prototype.CheckKefu = function () {
        var data = null;
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            data = model.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        }
        if (!data || !data.status) {
            this.delegateNode.active = false;
        }
        else {
            this.delegateNode.active = true;
        }
    };
    ProxyWin.prototype.showProxy = function () {
        var data = this.serviceModel.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        if (!data) {
            Global.UI.fastTip("客服数据未配置！");
            return;
        }
        this.show_img = data.show_img;
        if (!data || data.arr.length === 0)
            return;
        var severArr = data.arr;
        for (var index = 0; index < severArr.length; index++) {
            if (index > (this.servicerNode.length - 1)) {
                return;
            }
            var servicerItem = this.servicerNode[index];
            var data_1 = severArr[index];
            if (data_1.type !== 0 && servicerItem && cc.isValid(servicerItem)) {
                servicerItem.active = true;
                // let labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                var labe2 = cc.find("lb_kefu", servicerItem).getComponent(cc.Label);
                var icon = cc.find("img_qq", servicerItem).getComponent(cc.Sprite);
                var btnNode = cc.find("btn_leftkefu", servicerItem);
                btnNode.data = data_1;
                //  labe1.string = this.servicerName[data.type]
                labe2.string = Global.Toolkit.substrEndWithElli(data_1.data, 10);
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data_1.type]);
            }
        }
    };
    ProxyWin.prototype.openServicerApp = function (target) {
        var _this = this;
        if (target && target.node && target.node.data) {
            Global.NativeEvent.copyTextToClipboard(target.node.data.data, function (retStr) {
                if (retStr.result == 0) {
                    if (target.node.data.type == ServicerModel_1.PopItemType.QQ) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeQQApp(_this.awakeQQCallBack.bind(_this));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.WX || target.node.data.type == ServicerModel_1.PopItemType.WXPUBLIC) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeWechatApp(_this.awakeWeChatCallBack.bind(_this));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.AtWnd) {
                        Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
                        Global.ChatServer.userSetting(null, target.node.data.data);
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.Link) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.AtLink) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    }
                    else {
                        Global.UI.fastTip("复制失败");
                    }
                }
            });
        }
    };
    ProxyWin.prototype.awakeQQCallBack = function (retStr) {
        if (retStr.result == 0) {
        }
        else {
            var ret = retStr.result;
            if (ret == -1) {
                Logger.log("请先安装QQ");
                Global.UI.showSingleBox("请先安装QQ", null);
            }
            else {
                Logger.log("打开QQ失败");
                Global.UI.showSingleBox("打开QQ失败", null);
            }
        }
    };
    ProxyWin.prototype.awakeWeChatCallBack = function (retStr) {
        if (retStr.result == 0) {
        }
        else {
            var ret = retStr.result;
            if (ret == -1) {
                Logger.log("请先安装微信");
                Global.UI.showSingleBox("请先安装微信", null);
            }
            else {
                Logger.log("打开微信失败");
                Global.UI.showSingleBox("打开微信失败", null);
            }
        }
    };
    return ProxyWin;
}(ViewBase_1.default));
exports.default = ProxyWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFByb3h5V2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx5RUFBMkc7QUFLM0c7SUFBc0MsNEJBQVE7SUFBOUM7UUFBQSxxRUErTUM7UUE1TVcsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBd0NsQixrQkFBWSxHQUFHO1lBQ25CLENBQUMsRUFBRSxXQUFXO1lBQ2QsQ0FBQyxFQUFFLFdBQVc7WUFDZCxDQUFDLEVBQUUsV0FBVztZQUNkLENBQUMsRUFBRSxXQUFXO1lBQ2QsQ0FBQyxFQUFFLFVBQVU7WUFDYixDQUFDLEVBQUUsVUFBVSxDQUFXLE1BQU07U0FDakMsQ0FBQTtRQUNPLGtCQUFZLEdBQUc7WUFDbkIsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxLQUFLO1lBQ1IsQ0FBQyxFQUFFLE1BQU07WUFDVCxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxNQUFNLENBQVUsSUFBSTtTQUMxQixDQUFBOztJQW9KTCxDQUFDO0lBak1hLHlCQUFNLEdBQWhCO0lBRUEsQ0FBQztJQUVTLDJCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsV0FBVyxHQUFnQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxN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LEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztTQUNKO0lBQ0wsQ0FBQztJQUVMLGVBQUM7QUFBRCxDQS9NQSxBQStNQyxDQS9NcUMsa0JBQVEsR0ErTTdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTZXJ2aWNlck1vZGVsLCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlLCBQb3BJdGVtVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCBXYWl0aW5nVmlldyBmcm9tIFwiLi4vd2FpdGluZy9XYWl0aW5nVmlld1wiO1xyXG5pbXBvcnQgU3ByZWFkU2VydmljZXMgZnJvbSBcIi4vU3ByZWFkU2VydmljZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3h5V2luIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBzcHJpdGVOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjb250ZW50U3ByaXRlOiBjYy5TcHJpdGVcclxuICAgIHByaXZhdGUgc2hvd19pbWcgPSBcIlwiXHJcbiAgICBwcml2YXRlIHNlcnZpY2VyTm9kZSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlTW9kZWw6IFNlcnZpY2VyTW9kZWw7XHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWw7XHJcbiAgICBwcml2YXRlIHdhaXRpbmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjZW50ZXJJbWc6IGNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSBkZWxlZ2F0ZU5vZGU6IGNjLk5vZGU7XHJcblxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU2VydmljZXJNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsID0gPFNwcmVhZE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTcHJlYWRNb2RlbFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5jZW50ZXJJbWcgPSB0aGlzLmdldENoaWxkKFwibWFzay9jZW50ZXJJbWdcIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50U3ByaXRlID0gdGhpcy5jZW50ZXJJbWcuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5kZWxlZ2F0ZU5vZGUgPSB0aGlzLmdldENoaWxkKFwiU2VydmVyTm9kZVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGxlZnROb2RlID0gdGhpcy5nZXRDaGlsZChcIlNlcnZlck5vZGUvbGVmdE5vZGVcIilcclxuICAgICAgICAvLyBpZiAobGVmdE5vZGUpIHtcclxuICAgICAgICAvLyAgICAgbGVmdE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAvLyB9XHJcbiAgICAgIC8vICBsZXQgcmlnaHROb2RlID0gdGhpcy5nZXRDaGlsZChcIlNlcnZlck5vZGUvcmlnaHROb2RlXCIpXHJcbiAgICAgICAgLy8gaWYgKHJpZ2h0Tm9kZSkge1xyXG4gICAgICAgIC8vICAgICByaWdodE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlck5vZGUucHVzaChsZWZ0Tm9kZSlcclxuICAgICAvLyAgIHRoaXMuc2VydmljZXJOb2RlLnB1c2gocmlnaHROb2RlKVxyXG5cclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcIlNlcnZlck5vZGUvbGVmdE5vZGUvYnRuX2xlZnRrZWZ1XCIsIHRoaXMub3BlblNlcnZpY2VyQXBwLCB0aGlzKTtcclxuICAgICAgLy8gIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiU2VydmVyTm9kZS9yaWdodE5vZGUvYnRuX2xlZnRrZWZ1XCIsIHRoaXMub3BlblNlcnZpY2VyQXBwLCB0aGlzKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHNlcnZpY2VyVHlwZSA9IHtcclxuICAgICAgICAxOiBcImljb25fa2Z3eFwiLCAgICAgICAgICAvL+W+ruS/oVxyXG4gICAgICAgIDI6IFwiaWNvbl9rZnFxXCIsICAgICAgICAgIC8vUVFcclxuICAgICAgICAzOiBcImljb25fa2Z3eFwiLCAgICAgICAgICAvL+m7mOiupFxyXG4gICAgICAgIDQ6IFwiaWNvbl9rZmF0XCIsICAgICAgICAgIC8v6Im+54m5XHJcbiAgICAgICAgNTogXCJpbWdfbGxnZlwiLCAgICAgICAgICAvL+WcqOe6v+WuouacjVxyXG4gICAgICAgIDY6IFwiaW1nX2xsZ2ZcIiAgICAgICAgICAgLy/lnKjnur/lrqLmnI1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2VydmljZXJOYW1lID0ge1xyXG4gICAgICAgIDE6IFwi5a6i5pyN5b6u5L+hXCIsICAgICAgICAgICAvL+W+ruS/oVxyXG4gICAgICAgIDI6IFwi5a6i5pyNUVFcIiwgICAgICAgICAgICAgLy9RUVxyXG4gICAgICAgIDM6IFwi5YWs5LyX5Y+3XCIsICAgICAgICAgICAgIC8v5YWs5LyX5Y+3XHJcbiAgICAgICAgNDogXCLoib7nibnlrqLmnI1cIiwgICAgICAgICAgIC8v6Im+54m5XHJcbiAgICAgICAgNTogXCLlnKjnur/lrqLmnI1cIiwgICAgICAgICAgIC8v6buY6K6kXHJcbiAgICAgICAgNjogXCLlnKjnur/lrqLmnI1cIiAgICAgICAgICAvL+m7mOiupFxyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2FpdGluZ05vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXJsID0gR2xvYmFsLlNldHRpbmcuVXJscy5nZXRpbnZpdGVVcmwoKVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRTaGFyZSh1cmwpO1xyXG5cclxuICAgICAgLy8gIHRoaXMuQ2hlY2tLZWZ1KClcclxuICAgICAgICB0aGlzLnNob3dQcm94eSgpXHJcbiAgICAgICAgdGhpcy5Jbml0Q2VudGVySW1nKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIEluaXRDZW50ZXJJbWcoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuc2hvd19pbWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsXHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChzZWxmLnNob3dfaW1nICE9IG51bGwgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3Qoc2VsZi5zaG93X2ltZykpIHtcclxuICAgICAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuTG9hZFBpY1RvTmF0aXZlKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKHNlbGYuc2hvd19pbWcpLCBHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChzZWxmLnNob3dfaW1nKSwgKHRleHR1cmU6IGNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNlbnRlckltZyAmJiBzZWxmLmNlbnRlckltZy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250ZW50U3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChzZWxmLnNob3dfaW1nKSwgZnVuY3Rpb24gKGVyciwgdGV4dHVyZTogY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jZW50ZXJJbWcgJiYgc2VsZi5jZW50ZXJJbWcuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWU6Y2MuU3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7ICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbnRlbnRTcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgQ2hlY2tLZWZ1KCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gbnVsbFxyXG4gICAgICAgIGxldCBtb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTZXJ2aWNlck1vZGVsXCIpXHJcbiAgICAgICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBtb2RlbC5nZXRTZXJ2aWNlSW5mbyhDdXN0b21lckVudHJhbmNlVHlwZS5TcHJlYWRTZXJ2aWNlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZWdhdGVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGVnYXRlTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dQcm94eSgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc2VydmljZU1vZGVsLmdldFNlcnZpY2VJbmZvKEN1c3RvbWVyRW50cmFuY2VUeXBlLlNwcmVhZFNlcnZpY2UpXHJcbiAgICAgICAgaWYoIWRhdGEpe1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWuouacjeaVsOaNruacqumFjee9ru+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dfaW1nID0gZGF0YS5zaG93X2ltZztcclxuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5hcnIubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgICAgICBsZXQgc2V2ZXJBcnIgPSBkYXRhLmFycjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNldmVyQXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAodGhpcy5zZXJ2aWNlck5vZGUubGVuZ3RoIC0gMSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2VydmljZXJJdGVtID0gdGhpcy5zZXJ2aWNlck5vZGVbaW5kZXhdXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2V2ZXJBcnJbaW5kZXhdXHJcbiAgICAgICAgICAgIGlmIChkYXRhLnR5cGUgIT09IDAgJiYgc2VydmljZXJJdGVtICYmIGNjLmlzVmFsaWQoc2VydmljZXJJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgc2VydmljZXJJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBsZXQgbGFiZTEgPSBjYy5maW5kKFwibGFiZWwxXCIsIHNlcnZpY2VySXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxldCBsYWJlMiA9IGNjLmZpbmQoXCJsYl9rZWZ1XCIsIHNlcnZpY2VySXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gY2MuZmluZChcImltZ19xcVwiLCBzZXJ2aWNlckl0ZW0pLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bk5vZGU6IGFueSA9IGNjLmZpbmQoXCJidG5fbGVmdGtlZnVcIiwgc2VydmljZXJJdGVtKTtcclxuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAvLyAgbGFiZTEuc3RyaW5nID0gdGhpcy5zZXJ2aWNlck5hbWVbZGF0YS50eXBlXVxyXG4gICAgICAgICAgICAgICAgbGFiZTIuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkoZGF0YS5kYXRhLCAxMClcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhpY29uLCBcImhhbGwvdGV4dHVyZS9Qcm94eS9Qcm94eVwiLCB0aGlzLnNlcnZpY2VyVHlwZVtkYXRhLnR5cGVdKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlblNlcnZpY2VyQXBwKHRhcmdldCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Lm5vZGUgJiYgdGFyZ2V0Lm5vZGUuZGF0YSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZCh0YXJnZXQubm9kZS5kYXRhLmRhdGEsIChyZXRTdHIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lm5vZGUuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLlFRKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuYXdha2VRUUFwcCh0aGlzLmF3YWtlUVFDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5ub2RlLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5XWCB8fCB0YXJnZXQubm9kZS5kYXRhLnR5cGUgPT0gUG9wSXRlbVR5cGUuV1hQVUJMSUMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVdlY2hhdEFwcCh0aGlzLmF3YWtlV2VDaGF0Q2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQubm9kZS5kYXRhLnR5cGUgPT0gUG9wSXRlbVR5cGUuQXRXbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VydmVyVHlwZSA9IEN1c3RvbWVyRW50cmFuY2VUeXBlLkhhbGxTZXJ2aWNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci51c2VyU2V0dGluZyhudWxsLCB0YXJnZXQubm9kZS5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm5vZGUuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLkxpbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodGFyZ2V0Lm5vZGUuZGF0YS5kYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhcmdldC5ub2RlLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5BdExpbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodGFyZ2V0Lm5vZGUuZGF0YS5kYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGF3YWtlUVFDYWxsQmFjayhyZXRTdHIpIHtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOFUVFcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuivt+WFiOWuieijhVFRXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJk+W8gFFR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIBRUeWksei0pVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhd2FrZVdlQ2hhdENhbGxCYWNrKHJldFN0cikge1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOF5b6u5L+hXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byA5b6u5L+h5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIDlvq7kv6HlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==