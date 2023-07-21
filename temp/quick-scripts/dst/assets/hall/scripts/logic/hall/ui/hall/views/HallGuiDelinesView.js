
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallGuiDelinesView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd507k2sdhGJYqIYw+TPWjC', 'HallGuiDelinesView');
// hall/scripts/logic/hall/ui/hall/views/HallGuiDelinesView.ts

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
var HallBtnHelper_1 = require("./HallBtnHelper");
var HallGuiDelinesView = /** @class */ (function (_super) {
    __extends(HallGuiDelinesView, _super);
    function HallGuiDelinesView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sf = true;
        _this.sfshou = true;
        _this.tipscale = 2;
        return _this;
    }
    HallGuiDelinesView.prototype.initView = function () {
        this.node.active = false;
        this.quan = cc.find("newGet/anim/quan", this.node);
        this.shou = cc.find("newGet/anim/shou", this.node);
        this.newGetNode = cc.find("newGet", this.node);
        this.animNode = cc.find("newGet/anim", this.node);
        this.addCommonClick("bg", this.onSubViewHide, this, 0);
        this.addCommonClick("newGet/anim", this.onOpenCommision, this, 0);
        this.tips = cc.find("tips", this.node);
    };
    HallGuiDelinesView.prototype.onSubViewHide = function () {
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
    };
    HallGuiDelinesView.prototype.onOpenCommision = function () {
        this.node.active = false;
        Game.Component.unschedule(this.showGuiDelines.bind(this));
        Game.Component.unschedule(this.ShowShouUi.bind(this));
        HallBtnHelper_1.default.WndCommision();
    };
    HallGuiDelinesView.prototype.getNewMsg = function () {
        var _this = this;
        Global.HallServer.send(NetAppface.mod, "GetTaskStatus", {}, function (data) {
            var msg = data;
            if (msg.num > 0) {
                _this.tips.scale = _this.tipscale;
                _this.node.active = true;
                _this.showGuiDelines();
                Global.Audio.playAudioSource("hall/sound/guidelines");
            }
        }, null, false, 0);
    };
    HallGuiDelinesView.prototype.showGuiDelines = function () {
        var hallModel = Global.ModelManager.getModel("HallModel");
        var csNode = hallModel.csNodePos;
        var wPos = csNode.parent.convertToWorldSpaceAR(csNode.position);
        var lpos = this.animNode.parent.convertToNodeSpaceAR(wPos);
        this.animNode.position = lpos;
        if (this.quan) {
            Global.Component.schedule(this.ShowQuanUi.bind(this), 0.1);
            Global.Component.schedule(this.ShowShouUi.bind(this), 0.15);
            Global.Component.schedule(this.showTip.bind(this), 0.05);
        }
    };
    HallGuiDelinesView.prototype.ShowQuanUi = function () {
        var num = this.quan.scale;
        if (this.sf) {
            num -= 0.15;
            if (num <= 1) {
                this.sf = false;
            }
        }
        else {
            num += 0.15;
            if (num >= 1.3) {
                this.sf = true;
            }
        }
        this.quan.setScale(num);
    };
    HallGuiDelinesView.prototype.ShowShouUi = function () {
        var num = this.shou.scale;
        if (this.sfshou) {
            num -= 0.1;
            if (num <= 1) {
                this.sfshou = false;
            }
        }
        else {
            num += 0.1;
            if (num >= 1.3) {
                this.sfshou = true;
            }
        }
        this.shou.setScale(num);
    };
    HallGuiDelinesView.prototype.showTip = function () {
        var num = this.tips.scale;
        if (this.tips.scale > 1) {
            num -= 0.2;
            this.tips.setScale(num);
        }
        else {
            Game.Component.unschedule(this.showTip.bind(this));
            return;
        }
    };
    return HallGuiDelinesView;
}(ViewBase_1.default));
exports.default = HallGuiDelinesView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbEd1aURlbGluZXNWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUVwRCxpREFBNEM7QUFHNUM7SUFBZ0Qsc0NBQVE7SUFBeEQ7UUFBQSxxRUF3R0M7UUFyR1csUUFBRSxHQUFHLElBQUksQ0FBQztRQUNWLFlBQU0sR0FBRyxJQUFJLENBQUM7UUFFZCxjQUFRLEdBQVcsQ0FBQyxDQUFDOztJQWtHakMsQ0FBQztJQTlGYSxxQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFMUMsQ0FBQztJQUVELDBDQUFhLEdBQWI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCw0Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RCx1QkFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFDTSxzQ0FBUyxHQUFoQjtRQUFBLGlCQVVDO1FBVEcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLFVBQUMsSUFBSTtZQUM3RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLEtBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ2hDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO2dCQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO2FBQ3hEO1FBQ0wsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDJDQUFjLEdBQWQ7UUFDSSxJQUFJLFNBQVMsR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sR0FBSSxTQUFTLENBQUMsU0FBUyxDQUFBO1FBQ2pDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQy9ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUU5QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUMxRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtTQUMzRDtJQUNMLENBQUM7SUFFRCx1Q0FBVSxHQUFWO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDekIsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1QsR0FBRyxJQUFJLElBQUksQ0FBQztZQUNaLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQzthQUNuQjtTQUNKO2FBQ0k7WUFDRCxHQUFHLElBQUksSUFBSSxDQUFDO1lBQ1osSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsdUNBQVUsR0FBVjtRQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO1FBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdkI7U0FDSjthQUNJO1lBQ0QsR0FBRyxJQUFJLEdBQUcsQ0FBQztZQUNYLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELG9DQUFPLEdBQVA7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNyQixHQUFHLElBQUksR0FBRyxDQUFBO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDMUI7YUFDSTtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkQsT0FBTztTQUNWO0lBQ0wsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0F4R0EsQUF3R0MsQ0F4RytDLGtCQUFRLEdBd0d2RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgSGFsbE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgSGFsbEJ0bkhlbHBlciBmcm9tIFwiLi9IYWxsQnRuSGVscGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbEd1aURlbGluZXNWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBxdWFuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzaG91OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzZiA9IHRydWU7XHJcbiAgICBwcml2YXRlIHNmc2hvdSA9IHRydWU7XHJcbiAgICBwcml2YXRlIHRpcHM6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgdGlwc2NhbGU6IG51bWJlciA9IDI7XHJcbiAgICBwcml2YXRlIG5ld0dldE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGFuaW1Ob2RlOmNjLk5vZGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnF1YW4gPSBjYy5maW5kKFwibmV3R2V0L2FuaW0vcXVhblwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgdGhpcy5zaG91ID0gY2MuZmluZChcIm5ld0dldC9hbmltL3Nob3VcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMubmV3R2V0Tm9kZSA9IGNjLmZpbmQoXCJuZXdHZXRcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMuYW5pbU5vZGUgPSBjYy5maW5kKFwibmV3R2V0L2FuaW1cIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZ1wiLCB0aGlzLm9uU3ViVmlld0hpZGUsIHRoaXMsIDApO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJuZXdHZXQvYW5pbVwiLCB0aGlzLm9uT3BlbkNvbW1pc2lvbiwgdGhpcywgMCk7XHJcbiAgICAgICAgdGhpcy50aXBzID0gY2MuZmluZChcInRpcHNcIiwgdGhpcy5ub2RlKVxyXG5cclxuICAgIH0gICBcclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlKHRoaXMuc2hvd0d1aURlbGluZXMuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQudW5zY2hlZHVsZSh0aGlzLlNob3dTaG91VWkuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbiAgICBvbk9wZW5Db21taXNpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQudW5zY2hlZHVsZSh0aGlzLnNob3dHdWlEZWxpbmVzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGUodGhpcy5TaG93U2hvdVVpLmJpbmQodGhpcykpO1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kQ29tbWlzaW9uKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TmV3TXNnKCkge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIFwiR2V0VGFza1N0YXR1c1wiLCB7fSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IGRhdGE7XHJcbiAgICAgICAgICAgIGlmIChtc2cubnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzLnNjYWxlID0gdGhpcy50aXBzY2FsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93R3VpRGVsaW5lcygpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUF1ZGlvU291cmNlKFwiaGFsbC9zb3VuZC9ndWlkZWxpbmVzXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBudWxsLCBmYWxzZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0d1aURlbGluZXMoKSB7XHJcbiAgICAgICAgbGV0IGhhbGxNb2RlbCA9IDxIYWxsTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkhhbGxNb2RlbFwiKTtcclxuICAgICAgICBsZXQgY3NOb2RlID0gIGhhbGxNb2RlbC5jc05vZGVQb3NcclxuICAgICAgICBsZXQgd1BvcyA9IGNzTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGNzTm9kZS5wb3NpdGlvbilcclxuICAgICAgICBsZXQgbHBvcyA9IHRoaXMuYW5pbU5vZGUucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdQb3MpXHJcbiAgICAgICAgdGhpcy5hbmltTm9kZS5wb3NpdGlvbiA9IGxwb3M7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnF1YW4pIHtcclxuICAgICAgICAgICAgR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZSh0aGlzLlNob3dRdWFuVWkuYmluZCh0aGlzKSwgMC4xKVxyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlKHRoaXMuU2hvd1Nob3VVaS5iaW5kKHRoaXMpLCAwLjE1KVxyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlKHRoaXMuc2hvd1RpcC5iaW5kKHRoaXMpLCAwLjA1KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTaG93UXVhblVpKCkge1xyXG4gICAgICAgIGxldCBudW0gPSB0aGlzLnF1YW4uc2NhbGVcclxuICAgICAgICBpZiAodGhpcy5zZikge1xyXG4gICAgICAgICAgICBudW0gLT0gMC4xNTtcclxuICAgICAgICAgICAgaWYgKG51bSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIG51bSArPSAwLjE1O1xyXG4gICAgICAgICAgICBpZiAobnVtID49IDEuMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZiA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5xdWFuLnNldFNjYWxlKG51bSlcclxuICAgIH1cclxuXHJcbiAgICBTaG93U2hvdVVpKCkge1xyXG4gICAgICAgIGxldCBudW0gPSB0aGlzLnNob3Uuc2NhbGVcclxuICAgICAgICBpZiAodGhpcy5zZnNob3UpIHtcclxuICAgICAgICAgICAgbnVtIC09IDAuMTtcclxuICAgICAgICAgICAgaWYgKG51bSA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmc2hvdSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBudW0gKz0gMC4xO1xyXG4gICAgICAgICAgICBpZiAobnVtID49IDEuMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZnNob3UgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2hvdS5zZXRTY2FsZShudW0pXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1RpcCgpIHtcclxuICAgICAgICBsZXQgbnVtID0gdGhpcy50aXBzLnNjYWxlO1xyXG4gICAgICAgIGlmICh0aGlzLnRpcHMuc2NhbGUgPiAxKSB7XHJcbiAgICAgICAgICAgIG51bSAtPSAwLjJcclxuICAgICAgICAgICAgdGhpcy50aXBzLnNldFNjYWxlKG51bSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGUodGhpcy5zaG93VGlwLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==