
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/SpreadServices.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2facbVdkq5Dx70xYqNOAXYM', 'SpreadServices');
// hall/scripts/logic/hall/ui/Spread/SpreadServices.ts

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
var SpreadServices = /** @class */ (function (_super) {
    __extends(SpreadServices, _super);
    function SpreadServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.servicerNode = [];
        _this.servicerType = {
            1: "icon_kfwx",
            2: "icon_kfqq",
            3: "icon_kfwx",
            4: "icon_kfat",
            5: "icon_zxkf",
            6: "icon_zxkf" //在线客服
        };
        _this.servicerName = {
            1: "客服微信",
            2: "客服QQ",
            3: "公众号",
            4: "客服艾特",
            5: "在线客服",
            6: "在线客服"
        };
        return _this;
    }
    SpreadServices.prototype.initView = function () {
        this.ServicerModel = Global.ModelManager.getModel("ServicerModel");
        var leftNode = this.getChild("left");
        Global.UIHelper.addCommonClick(leftNode, "btn_ljlx", this.openServicerApp, this);
        leftNode.active = false;
        var rightNode = this.getChild("right");
        Global.UIHelper.addCommonClick(rightNode, "btn_ljlx", this.openServicerApp, this);
        rightNode.active = false;
        this.servicerNode.push(leftNode);
        this.servicerNode.push(rightNode);
    };
    SpreadServices.prototype.onSubViewShow = function () {
        var serviceData = this.ServicerModel.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        this.updateUI(serviceData);
    };
    SpreadServices.prototype.onSubViewHide = function () {
    };
    SpreadServices.prototype.onDispose = function () {
        this.servicerNode = [];
    };
    SpreadServices.prototype.updateUI = function (data) {
        if (!data || data.length == 0)
            return;
        var severArr = data.arr;
        //暂时显示
        // this.servicerNode[0].active = true;
        // this.servicerNode[1].active = true;
        for (var index = 0; index < severArr.length; index++) {
            var servicerItem = this.servicerNode[index];
            var data_1 = severArr[index];
            if (data_1.type != 0) {
                servicerItem.active = true;
                var labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                var labe2 = cc.find("label2", servicerItem).getComponent(cc.Label);
                var icon = cc.find("icon_kfqq", servicerItem).getComponent(cc.Sprite);
                var btnNode = cc.find("btn_ljlx", servicerItem);
                btnNode.data = data_1;
                labe1.string = this.servicerName[data_1.type];
                labe2.string = Global.Toolkit.substrEndWithElli(data_1.data, 10);
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data_1.type]);
            }
        }
    };
    SpreadServices.prototype.openServicerApp = function (target) {
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
    SpreadServices.prototype.awakeQQCallBack = function (retStr) {
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
    SpreadServices.prototype.awakeWeChatCallBack = function (retStr) {
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
    return SpreadServices;
}(ViewBase_1.default));
exports.default = SpreadServices;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFNwcmVhZFNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx5RUFBMkc7QUFFM0c7SUFBNEMsa0NBQVE7SUFBcEQ7UUFBQSxxRUE4SEM7UUE1SFcsa0JBQVksR0FBRyxFQUFFLENBQUM7UUFnQmxCLGtCQUFZLEdBQUU7WUFDbEIsQ0FBQyxFQUFDLFdBQVc7WUFDYixDQUFDLEVBQUMsV0FBVztZQUNiLENBQUMsRUFBQyxXQUFXO1lBQ2IsQ0FBQyxFQUFDLFdBQVc7WUFDYixDQUFDLEVBQUMsV0FBVztZQUNiLENBQUMsRUFBQyxXQUFXLENBQVcsTUFBTTtTQUNqQyxDQUFBO1FBQ08sa0JBQVksR0FBRTtZQUNsQixDQUFDLEVBQUMsTUFBTTtZQUNSLENBQUMsRUFBQyxNQUFNO1lBQ1IsQ0FBQyxFQUFDLEtBQUs7WUFDUCxDQUFDLEVBQUMsTUFBTTtZQUNSLENBQUMsRUFBQyxNQUFNO1lBQ1IsQ0FBQyxFQUFDLE1BQU07U0FDWCxDQUFBOztJQTZGTCxDQUFDO0lBekhhLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBa0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDakYsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakYsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsUUFB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QyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7U0FDSjtJQUNMLENBQUM7SUFDTCxxQkFBQztBQUFELENBOUhBLEFBOEhDLENBOUgyQyxrQkFBUSxHQThIbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFNlcnZpY2VyTW9kZWwsIHsgQ3VzdG9tZXJFbnRyYW5jZVR5cGUsIFBvcEl0ZW1UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByZWFkU2VydmljZXMgZXh0ZW5kcyBWaWV3QmFzZXtcclxuXHJcbiAgICBwcml2YXRlIHNlcnZpY2VyTm9kZSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBTZXJ2aWNlck1vZGVsOlNlcnZpY2VyTW9kZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5TZXJ2aWNlck1vZGVsID0gPFNlcnZpY2VyTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNlcnZpY2VyTW9kZWxcIilcclxuICAgICAgICBsZXQgbGVmdE5vZGUgPSB0aGlzLmdldENoaWxkKFwibGVmdFwiKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sobGVmdE5vZGUsIFwiYnRuX2xqbHhcIiwgdGhpcy5vcGVuU2VydmljZXJBcHAsIHRoaXMpO1xyXG4gICAgICAgIGxlZnROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByaWdodE5vZGUgPSB0aGlzLmdldENoaWxkKFwicmlnaHRcIik7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHJpZ2h0Tm9kZSwgXCJidG5fbGpseFwiLCB0aGlzLm9wZW5TZXJ2aWNlckFwcCwgdGhpcyk7XHJcbiAgICAgICAgcmlnaHROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VydmljZXJOb2RlLnB1c2gobGVmdE5vZGUpXHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlck5vZGUucHVzaChyaWdodE5vZGUpXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlclR5cGUgPXtcclxuICAgICAgICAxOlwiaWNvbl9rZnd4XCIsICAgICAgICAgIC8v5b6u5L+hXHJcbiAgICAgICAgMjpcImljb25fa2ZxcVwiLCAgICAgICAgICAvL1FRXHJcbiAgICAgICAgMzpcImljb25fa2Z3eFwiLCAgICAgICAgICAvL+m7mOiupFxyXG4gICAgICAgIDQ6XCJpY29uX2tmYXRcIiwgICAgICAgICAgLy/oib7niblcclxuICAgICAgICA1OlwiaWNvbl96eGtmXCIgLCAgICAgICAgICAvL+WcqOe6v+WuouacjVxyXG4gICAgICAgIDY6XCJpY29uX3p4a2ZcIiAgICAgICAgICAgLy/lnKjnur/lrqLmnI1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2VydmljZXJOYW1lID17XHJcbiAgICAgICAgMTpcIuWuouacjeW+ruS/oVwiLCAgICAgICAgICAgLy/lvq7kv6FcclxuICAgICAgICAyOlwi5a6i5pyNUVFcIiwgICAgICAgICAgICAgLy9RUVxyXG4gICAgICAgIDM6XCLlhazkvJflj7dcIiwgICAgICAgICAgICAgLy/lhazkvJflj7dcclxuICAgICAgICA0Olwi5a6i5pyN6Im+54m5XCIsICAgICAgICAgICAvL+iJvueJuVxyXG4gICAgICAgIDU6XCLlnKjnur/lrqLmnI1cIiAsICAgICAgICAgICAvL+m7mOiupFxyXG4gICAgICAgIDY6XCLlnKjnur/lrqLmnI1cIlxyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICBsZXQgc2VydmljZURhdGEgPSB0aGlzLlNlcnZpY2VyTW9kZWwuZ2V0U2VydmljZUluZm8oQ3VzdG9tZXJFbnRyYW5jZVR5cGUuU3ByZWFkU2VydmljZSlcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKHNlcnZpY2VEYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCl7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlck5vZGUgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhIHx8IGRhdGEubGVuZ3RoID09MCkgcmV0dXJuXHJcbiAgICAgICAgbGV0IHNldmVyQXJyID0gZGF0YS5hcnI7XHJcbiAgICAgICAgLy/mmoLml7bmmL7npLpcclxuICAgICAgICAvLyB0aGlzLnNlcnZpY2VyTm9kZVswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuc2VydmljZXJOb2RlWzFdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNldmVyQXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgc2VydmljZXJJdGVtID0gdGhpcy5zZXJ2aWNlck5vZGVbaW5kZXhdXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gc2V2ZXJBcnJbaW5kZXhdXHJcbiAgICAgICAgICAgIGlmKGRhdGEudHlwZSAhPSAwKXtcclxuICAgICAgICAgICAgICAgIHNlcnZpY2VySXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhYmUxID0gY2MuZmluZChcImxhYmVsMVwiLCBzZXJ2aWNlckl0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFiZTIgPSBjYy5maW5kKFwibGFiZWwyXCIsIHNlcnZpY2VySXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gY2MuZmluZChcImljb25fa2ZxcVwiLCBzZXJ2aWNlckl0ZW0pLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bk5vZGUgPSBjYy5maW5kKFwiYnRuX2xqbHhcIiwgc2VydmljZXJJdGVtKTtcclxuICAgICAgICAgICAgICAgIGJ0bk5vZGUuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBsYWJlMS5zdHJpbmcgPSB0aGlzLnNlcnZpY2VyTmFtZVtkYXRhLnR5cGVdXHJcbiAgICAgICAgICAgICAgICBsYWJlMi5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkoZGF0YS5kYXRhLDEwKVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGljb24sIFwiaGFsbC90ZXh0dXJlL1Byb3h5L1Byb3h5XCIsIHRoaXMuc2VydmljZXJUeXBlW2RhdGEudHlwZV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuU2VydmljZXJBcHAodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQubm9kZSAmJiB0YXJnZXQubm9kZS5kYXRhKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKHRhcmdldC5ub2RlLmRhdGEuZGF0YSwgKHJldFN0cikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQubm9kZS5kYXRhLnR5cGUgPT0gUG9wSXRlbVR5cGUuUVEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVFRQXBwKHRoaXMuYXdha2VRUUNhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm5vZGUuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLldYIHx8IHRhcmdldC5ub2RlLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5XWFBVQkxJQykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmF3YWtlV2VjaGF0QXBwKHRoaXMuYXdha2VXZUNoYXRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5ub2RlLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5BdFduZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZXJ2ZXJUeXBlID0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKG51bGwsdGFyZ2V0Lm5vZGUuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRhcmdldC5ub2RlLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5MaW5rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKHRhcmdldC5ub2RlLmRhdGEuZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFyZ2V0Lm5vZGUuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLkF0TGluaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh0YXJnZXQubm9kZS5kYXRhLmRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIGF3YWtlUVFDYWxsQmFjayggcmV0U3RyICl7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSByZXRTdHIucmVzdWx0XHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLor7flhYjlronoo4VRUVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOFUVFcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byAUVHlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuaJk+W8gFFR5aSx6LSlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF3YWtlV2VDaGF0Q2FsbEJhY2soIHJldFN0ciApe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOF5b6u5L+hXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byA5b6u5L+h5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIDlvq7kv6HlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=