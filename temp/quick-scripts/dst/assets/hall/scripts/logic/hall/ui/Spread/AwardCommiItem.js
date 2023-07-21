
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/AwardCommiItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c01bdW1h89GIpnYGvqL+A0R', 'AwardCommiItem');
// hall/scripts/logic/hall/ui/Spread/AwardCommiItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AwardCommiItem = /** @class */ (function (_super) {
    __extends(AwardCommiItem, _super);
    function AwardCommiItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.min_maxLabel = null;
        _this.commiLabel = null;
        return _this;
    }
    AwardCommiItem.prototype.Init = function (data) {
        if (data == null) {
            this.nameLabel.string = "";
            this.min_maxLabel.string = "";
            this.commiLabel.string = "";
        }
        else {
            this.nameLabel.string = data.name;
            if (data.max_point === 0) {
                var max = data.min_point;
                if (data.min_point >= 10000) {
                    max = (data.min_point / 10000).toString() + "万";
                }
                this.min_maxLabel.string = max + "以上";
            }
            else {
                var min = data.min_point;
                var max = data.max_point;
                if (data.min_point >= 10000) {
                    min = (data.min_point / 10000).toString() + "万";
                }
                if (data.max_point >= 10000) {
                    max = (data.max_point / 10000).toString() + "万";
                }
                this.min_maxLabel.string = min.toString() + "-" + max.toString();
            }
            this.commiLabel.string = data.commi + "/万";
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "min_maxLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "commiLabel", void 0);
    AwardCommiItem = __decorate([
        ccclass
    ], AwardCommiItem);
    return AwardCommiItem;
}(cc.Component));
exports.default = AwardCommiItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXEF3YXJkQ29tbWlJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBK0NDO1FBNUNHLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0Isa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsZ0JBQVUsR0FBYSxJQUFJLENBQUM7O0lBc0NoQyxDQUFDO0lBbENHLDZCQUFJLEdBQUosVUFBSyxJQUFJO1FBQ0wsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7U0FDOUI7YUFDSTtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7WUFDakMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtnQkFDeEIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFDMUI7b0JBQ0ksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxHQUFHLENBQUE7aUJBQ2hEO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUE7YUFDeEM7aUJBQ0k7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtnQkFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQTtnQkFDeEIsSUFBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFDMUI7b0JBQ0ksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBQyxHQUFHLENBQUE7aUJBQ2hEO2dCQUVELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQzFCO29CQUNJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUMsR0FBRyxDQUFBO2lCQUNoRDtnQkFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTthQUNuRTtZQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQzdDO0lBQ0wsQ0FBQztJQTNDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3FEQUNRO0lBRzNCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7d0RBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDUztJQVRYLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0ErQ2xDO0lBQUQscUJBQUM7Q0EvQ0QsQUErQ0MsQ0EvQzJDLEVBQUUsQ0FBQyxTQUFTLEdBK0N2RDtrQkEvQ29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF3YXJkQ29tbWlJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBuYW1lTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBtaW5fbWF4TGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBjb21taUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG5cclxuXHJcbiAgICBJbml0KGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5taW5fbWF4TGFiZWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLmNvbW1pTGFiZWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gZGF0YS5uYW1lXHJcbiAgICAgICAgICAgIGlmIChkYXRhLm1heF9wb2ludCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heCA9IGRhdGEubWluX3BvaW50XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLm1pbl9wb2ludCA+PSAxMDAwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSAoZGF0YS5taW5fcG9pbnQgLyAxMDAwMCkudG9TdHJpbmcoKStcIuS4h1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pbl9tYXhMYWJlbC5zdHJpbmcgPSBtYXggKyBcIuS7peS4ilwiIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1pbiA9IGRhdGEubWluX3BvaW50XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4ID0gZGF0YS5tYXhfcG9pbnRcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubWluX3BvaW50ID49IDEwMDAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IChkYXRhLm1pbl9wb2ludCAvIDEwMDAwKS50b1N0cmluZygpK1wi5LiHXCJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLm1heF9wb2ludCA+PSAxMDAwMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSAoZGF0YS5tYXhfcG9pbnQgLyAxMDAwMCkudG9TdHJpbmcoKStcIuS4h1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMubWluX21heExhYmVsLnN0cmluZyA9IG1pbi50b1N0cmluZygpICsgXCItXCIgKyBtYXgudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWlMYWJlbC5zdHJpbmcgPSBkYXRhLmNvbW1pICsgXCIv5LiHXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19