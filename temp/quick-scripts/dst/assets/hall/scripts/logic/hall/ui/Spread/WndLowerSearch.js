
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndLowerSearch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZExvd2VyU2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUkvQztJQUE0QyxrQ0FBTztJQUFuRDs7SUEwR0EsQ0FBQztJQXZGYSwrQkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFUyxpQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENB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LEdBQUcsRUFBRSxDQUFBO1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1NBQzlCO0lBQ0wsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxHQUFRO1FBQ1osSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLEdBQUcsR0FBRyxLQUFLLEVBQUU7WUFDYixHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUN2QzthQUNJO1lBQ0QsR0FBRyxHQUFHLEdBQUcsQ0FBQTtTQUNaO1FBQ0QsT0FBTyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBQ1MsZ0NBQU8sR0FBakI7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQTFHQSxBQTBHQyxDQTFHMkMsaUJBQU8sR0EwR2xEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgU3ByZWFkTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU3ByZWFkTW9kZWxcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRMb3dlclNlYXJjaCBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgSURMYWJlbDogY2MuTGFiZWxcclxuICAgIE5pY2tOYW1lTGFiZWw6IGNjLkxhYmVsXHJcbiAgICBSZWNvbW1lbmRMYWJlbDogY2MuTGFiZWxcclxuICAgIExhc3RMb2dpblRpbWU6IGNjLkxhYmVsXHJcbiAgICBQbGF5ZXJMZXZlbDogY2MuTGFiZWxcclxuICAgIC8qKiDlm6LpmJ/nqI7mlLbvvIznm7TlsZ7kuJrnu6kqL1xyXG4gICAgUGxheWVyVGF4OiBjYy5MYWJlbFxyXG4gICAgLyoqIOS4quS6uueojuaUtu+8jOS4i+WxnuS4mue7qSovXHJcbiAgICBHcm91cFRheDogY2MuTGFiZWxcclxuICAgIEdyb3VwQ291bnQ6IGNjLkxhYmVsXHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWxcclxuICAgIC8qKiDlm6LpmJ/vvIznm7TlsZ7kuJrnu6kqL1xyXG4gICAgbGFiMTpjYy5SaWNoVGV4dDtcclxuICAgIC8qKiDkuKrkurrvvIzkuIvlsZ7kuJrnu6kqL1xyXG4gICAgbGFiMjpjYy5SaWNoVGV4dDtcclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRMb3dlclNlYXJjaFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvU3ByZWFkVUkvTG93ZXJQZXJcIjtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsID0gPFNwcmVhZE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTcHJlYWRNb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLklETGFiZWwgPSB0aGlzLmdldENoaWxkKFwiQ29udGVudC9JRExhYmVsL0lEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLk5pY2tOYW1lTGFiZWwgPSB0aGlzLmdldENoaWxkKFwiQ29udGVudC9OYW1lTGFiZWwvTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5SZWNvbW1lbmRMYWJlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJDb250ZW50L1JlY29tbWVuZExhYmVsL0lEXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLkxhc3RMb2dpblRpbWUgPSB0aGlzLmdldENoaWxkKFwiUGFuZWwvTGFzdExvZ2luVGltZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJMZXZlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJQYW5lbC9QbGF5ZXJMZXZlbC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5QbGF5ZXJUYXggPSB0aGlzLmdldENoaWxkKFwiUGFuZWwvUGxheWVyVGF4L0NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLkdyb3VwQ291bnQgPSB0aGlzLmdldENoaWxkKFwiUGFuZWwvR3JvdXBDb3VudC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5Hcm91cFRheCA9IHRoaXMuZ2V0Q2hpbGQoXCJQYW5lbC9Hcm91cFRheC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5sYWIxID0gdGhpcy5nZXRDaGlsZChcIlBhbmVsL1BsYXllclRheFwiKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpXHJcbiAgICAgICAgdGhpcy5sYWIyID0gdGhpcy5nZXRDaGlsZChcIlBhbmVsL0dyb3VwVGF4XCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dClcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIiwgdGhpcy5jbG9zZSwgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmluaXRQYW5lbChkYXRhKVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIGBgYFxyXG57XHJcbiAgICBcIl9tb2RcIjogXCJhcHBmYWNlXCIsXHJcbiAgICBcIl9mdW5jXCI6IFwiR2V0Rmxvd0luZm9MaXN0XCIsXHJcbiAgICBcIl9jaGVja1wiOiBcIlwiLFxyXG4gICAgXCJfcGFyYW1cIjoge1xyXG5cdFx0XCJ1c2VyX2lkXCI6MjIyXHJcblx0XHRcIm5hbWVcIjoyMjJcclxuXHRcdFwibGlzdFwiOntcclxuXHRcdFx0XHRcInRpbWVcIjpcIjExMjIxXCJcclxuXHRcdFx0XCJ0b3RhbF9mbG93XCI65oC75Lia57upXHJcblx0XHRcdFwidW50ZXJfZmxvd1wiOuebtOWxnuS4mue7qVxyXG5cdFx0XHRcInRlYW1fZmxvd1wiOuS7o+eQhuS4mue7qVxyXG5cdFx0fVxyXG4gICAgfVxyXG59Ki9cclxuICAgIGluaXRQYW5lbChhcmdzKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IGFyZ3NbMF1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuTmlja05hbWVMYWJlbC5zdHJpbmcgPSBkYXRhLm5hbWUgKyBcIu+8iElEXCIgKyBkYXRhLnVzZXJfaWQgKyBcIu+8iVwiXHJcbiAgICAgICAgICAgIHRoaXMuUmVjb21tZW5kTGFiZWwuc3RyaW5nID0gZGF0YS5waWRcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTGFzdExvZ2luVGltZS5zdHJpbmcgPSBcIuacgOWQjueZu+W9leaXtumXtDpcIiArIGNjLmpzLmZvcm1hdFN0cihkYXRhLmxhc3RfbG9naW4pXHJcblxyXG4gICAgICAgICAgICB0aGlzLlBsYXllckxldmVsLnN0cmluZyA9IGRhdGEubGV2ZWxcclxuICAgICAgICAgICAgdGhpcy5sYWIxLnN0cmluZyA9IFwi55u05bGe5Lia57up77yaXCJcclxuICAgICAgICAgICAgdGhpcy5sYWIyLnN0cmluZyA9IFwi5LiL5bGe5Lia57up77yaXCJcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXJUYXguc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5mbG93KVxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwVGF4LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEudGVhbV9mbG93KVxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwQ291bnQuc3RyaW5nID0gZGF0YS50ZWFtX251bVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuTmlja05hbWVMYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlJlY29tbWVuZExhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuTGFzdExvZ2luVGltZS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyTGV2ZWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLlBsYXllclRheC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuR3JvdXBUYXguc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwQ291bnQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBHZXRUZXh0KG51bTogYW55KSB7XHJcbiAgICAgICAgbGV0IHR4dDtcclxuICAgICAgICBpZiAobnVtID4gMTAwMDApIHtcclxuICAgICAgICAgICAgdHh0ID0gKG51bSAvIDEwMDAwKS50b0ZpeGVkKDIpICsgXCJXXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHR4dCA9IG51bVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHh0XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19