
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/SpreadTutorialWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5a0beOsOoZAkJHr3lj9bgjY', 'SpreadTutorialWin');
// hall/scripts/logic/hall/ui/Spread/SpreadTutorialWin.ts

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
var SpreadTutorialWin = /** @class */ (function (_super) {
    __extends(SpreadTutorialWin, _super);
    function SpreadTutorialWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpreadTutorialWin.prototype.initView = function () {
        this.spreadModel = Global.ModelManager.getModel("SpreadModel");
        // this.spreadService = <SpreadServices>this.addView("spreadService", this.getChild("ServerNode"), SpreadServices);
        this.cmmi_type = this.spreadModel.commiType;
        if (this.cmmi_type == 2) {
            this.bigNode = this.getChild("big");
            this.addCommonClick("View/scrollview/view/content/Description", this.onDescription, this, null, 1);
            this.addCommonClick("View/scrollview/view/content/btnMoney", this.OnCommissionBtnClicked, this);
            this.addCommonClick("big/close", this.onBigclose, this);
        }
    };
    SpreadTutorialWin.prototype.onSubViewShow = function () {
        //this.spreadService.subViewState = true;
        // this.spreadModel.on(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
    };
    SpreadTutorialWin.prototype.onSubViewHide = function () {
        // this.spreadModel.off(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
    };
    SpreadTutorialWin.prototype.OnCommissionBtnClicked = function () {
        var data = this.spreadModel.CommidData;
        if (data == null) {
            this.spreadModel.GetDayAgentCommi();
        }
        else {
            Global.UI.show("WndCommissionlist", data);
        }
    };
    SpreadTutorialWin.prototype.onDescription = function () {
        this.bigNode.active = true;
    };
    SpreadTutorialWin.prototype.onBigclose = function () {
        this.bigNode.active = false;
    };
    return SpreadTutorialWin;
}(ViewBase_1.default));
exports.default = SpreadTutorialWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFNwcmVhZFR1dG9yaWFsV2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUlqRDtJQUErQyxxQ0FBUTtJQUF2RDs7SUE4Q0EsQ0FBQztJQXpDYSxvQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdFLG1IQUFtSDtRQUNsSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFBO1FBQzNDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsMENBQTBDLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ2xHLElBQUksQ0FBQyxjQUFjLENBQUMsdUNBQXVDLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFBO1lBQy9GLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDMUQ7SUFDTCxDQUFDO0lBR0QseUNBQWEsR0FBYjtRQUNJLHlDQUF5QztRQUN6QyxpRkFBaUY7SUFDckYsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFDSSxrRkFBa0Y7SUFFdEYsQ0FBQztJQUVELGtEQUFzQixHQUF0QjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtTQUN0QzthQUNJO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDNUM7SUFDTCxDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQTlDQSxBQThDQyxDQTlDOEMsa0JBQVEsR0E4Q3REIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTcHJlYWRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TcHJlYWRNb2RlbFwiO1xyXG5pbXBvcnQgU3ByZWFkU2VydmljZXMgZnJvbSBcIi4vU3ByZWFkU2VydmljZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcmVhZFR1dG9yaWFsV2luIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgY21taV90eXBlO1xyXG4gICAgcHJpdmF0ZSBzcHJlYWRNb2RlbDogU3ByZWFkTW9kZWxcclxuICAgIHNwcmVhZFNlcnZpY2U6U3ByZWFkU2VydmljZXM7XHJcbiAgICBwcml2YXRlIGJpZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAvLyB0aGlzLnNwcmVhZFNlcnZpY2UgPSA8U3ByZWFkU2VydmljZXM+dGhpcy5hZGRWaWV3KFwic3ByZWFkU2VydmljZVwiLCB0aGlzLmdldENoaWxkKFwiU2VydmVyTm9kZVwiKSwgU3ByZWFkU2VydmljZXMpO1xyXG4gICAgICAgIHRoaXMuY21taV90eXBlID0gdGhpcy5zcHJlYWRNb2RlbC5jb21taVR5cGVcclxuICAgICAgICBpZiAodGhpcy5jbW1pX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmJpZ05vZGUgPSB0aGlzLmdldENoaWxkKFwiYmlnXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJWaWV3L3Njcm9sbHZpZXcvdmlldy9jb250ZW50L0Rlc2NyaXB0aW9uXCIsIHRoaXMub25EZXNjcmlwdGlvbiwgdGhpcywgbnVsbCwgMSlcclxuICAgICAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIlZpZXcvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvYnRuTW9uZXlcIiwgdGhpcy5PbkNvbW1pc3Npb25CdG5DbGlja2VkLCB0aGlzKVxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmlnL2Nsb3NlXCIsIHRoaXMub25CaWdjbG9zZSwgdGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgLy90aGlzLnNwcmVhZFNlcnZpY2Uuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnNwcmVhZE1vZGVsLm9uKFNwcmVhZEV2ZW50LkdldERheUFnZW50Q29tbWksIHRoaXMsIHRoaXMuT3BlblJydHVybk1vbmV5KTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG4gICAgICAgIC8vIHRoaXMuc3ByZWFkTW9kZWwub2ZmKFNwcmVhZEV2ZW50LkdldERheUFnZW50Q29tbWksIHRoaXMsIHRoaXMuT3BlblJydHVybk1vbmV5KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT25Db21taXNzaW9uQnRuQ2xpY2tlZCgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc3ByZWFkTW9kZWwuQ29tbWlkRGF0YTtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRDb21taSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZENvbW1pc3Npb25saXN0XCIsIGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzY3JpcHRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5iaWdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb25CaWdjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLmJpZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==