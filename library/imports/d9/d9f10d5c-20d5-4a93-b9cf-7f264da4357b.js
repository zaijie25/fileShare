"use strict";
cc._RF.push(module, 'd9f101cINVKk7nPfyZNpDV7', 'WndLowerSearch');
// hall/scripts/logic/hall/ui/Spread/WndLowerSearch.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndLowerSearch = /** @class */ (function (_super) {
    __extends(WndLowerSearch, _super);
    function WndLowerSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndLowerSearch.prototype.onInit = function () {
        this.name = "WndLowerSearch";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/LowerPer";
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
    };
    WndLowerSearch.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.IDLabel = this.getChild("Content/IDLabel/ID").getComponent(cc.Label);
        this.NickNameLabel = this.getChild("Content/NameLabel/Name").getComponent(cc.Label);
        this.RecommendLabel = this.getChild("Content/RecommendLabel/ID").getComponent(cc.Label);
        this.LastLoginTime = this.getChild("Panel/LastLoginTime").getComponent(cc.Label);
        this.PlayerLevel = this.getChild("Panel/PlayerLevel/Count").getComponent(cc.Label);
        this.PlayerTax = this.getChild("Panel/PlayerTax/Count").getComponent(cc.Label);
        this.GroupCount = this.getChild("Panel/GroupCount/Count").getComponent(cc.Label);
        this.GroupTax = this.getChild("Panel/GroupTax/Count").getComponent(cc.Label);
        this.lab1 = this.getChild("Panel/PlayerTax").getComponent(cc.RichText);
        this.lab2 = this.getChild("Panel/GroupTax").getComponent(cc.RichText);
        this.addCommonClick("close", this.close, this);
    };
    WndLowerSearch.prototype.onOpen = function (data) {
        this.initPanel(data);
    };
    /*
    ```
{
    "_mod": "appface",
    "_func": "GetFlowInfoList",
    "_check": "",
    "_param": {
        "user_id":222
        "name":222
        "list":{
                "time":"11221"
            "total_flow":总业绩
            "unter_flow":直属业绩
            "team_flow":代理业绩
        }
    }
}*/
    WndLowerSearch.prototype.initPanel = function (args) {
        if (args != null) {
            var data = args[0];
            this.NickNameLabel.string = data.name + "（ID" + data.user_id + "）";
            this.RecommendLabel.string = data.pid;
            this.LastLoginTime.string = "最后登录时间:" + cc.js.formatStr(data.last_login);
            this.PlayerLevel.string = data.level;
            this.lab1.string = "直属业绩：";
            this.lab2.string = "下属业绩：";
            this.PlayerTax.string = Global.Toolkit.formatPointStr(data.flow);
            this.GroupTax.string = Global.Toolkit.formatPointStr(data.team_flow);
            this.GroupCount.string = data.team_num;
        }
        else {
            this.NickNameLabel.string = "";
            this.RecommendLabel.string = "";
            this.LastLoginTime.string = "";
            this.PlayerLevel.string = "";
            this.PlayerTax.string = "";
            this.GroupTax.string = "";
            this.GroupCount.string = "";
        }
    };
    WndLowerSearch.prototype.GetText = function (num) {
        var txt;
        if (num > 10000) {
            txt = (num / 10000).toFixed(2) + "W";
        }
        else {
            txt = num;
        }
        return txt;
    };
    WndLowerSearch.prototype.onClose = function () {
    };
    return WndLowerSearch;
}(WndBase_1.default));
exports.default = WndLowerSearch;

cc._RF.pop();