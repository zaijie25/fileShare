
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/uiManager/UIPannel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c93dfeLkPpGX4MICzb+llRn', 'UIPannel');
// hall/scripts/framework/uiManager/UIPannel.ts

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
var UIPannel = /** @class */ (function (_super) {
    __extends(UIPannel, _super);
    function UIPannel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTop = false;
        _this.nodeDict = [];
        return _this;
    }
    UIPannel.prototype.onLoad = function () {
        var linkWidget = function (self, nodeDict) {
            var children = self.children;
            for (var i = 0; i < children.length; i++) {
                var widgetName = children[i].name;
                if (widgetName && widgetName.indexOf("key_") >= 0) {
                    var nodeName = widgetName.substring(4);
                    if (nodeDict[nodeName]) {
                        Logger.error("控件名字重复!" + children[i].name);
                    }
                    nodeDict[nodeName] = children[i];
                }
                if (children[i].childrenCount > 0) {
                    linkWidget(children[i], nodeDict);
                }
            }
        }.bind(this);
        linkWidget(this.node, this.nodeDict);
    };
    UIPannel.prototype.onDestroy = function () {
    };
    UIPannel = __decorate([
        ccclass
    ], UIPannel);
    return UIPannel;
}(cc.Component));
exports.default = UIPannel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFx1aU1hbmFnZXJcXFVJUGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBMkJDO1FBMUJHLFdBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxjQUFRLEdBQUcsRUFBRSxDQUFDOztJQXlCbEIsQ0FBQztJQXZCRyx5QkFBTSxHQUFOO1FBQ0ksSUFBSSxVQUFVLEdBQUcsVUFBUyxJQUFJLEVBQUUsUUFBUTtZQUNwQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDL0MsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDOUM7b0JBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRTtvQkFDL0IsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDckM7YUFDSjtRQUNMLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDYixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELDRCQUFTLEdBQVQ7SUFFQSxDQUFDO0lBMUJnQixRQUFRO1FBRDVCLE9BQU87T0FDYSxRQUFRLENBMkI1QjtJQUFELGVBQUM7Q0EzQkQsQUEyQkMsQ0EzQnFDLEVBQUUsQ0FBQyxTQUFTLEdBMkJqRDtrQkEzQm9CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVBhbm5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBpc1RvcCA9IGZhbHNlO1xyXG4gICAgbm9kZURpY3QgPSBbXTtcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHZhciBsaW5rV2lkZ2V0ID0gZnVuY3Rpb24oc2VsZiwgbm9kZURpY3QpIHtcclxuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gc2VsZi5jaGlsZHJlbjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpZGdldE5hbWUgPSBjaGlsZHJlbltpXS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldE5hbWUgJiYgd2lkZ2V0TmFtZS5pbmRleE9mKFwia2V5X1wiKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVOYW1lID0gd2lkZ2V0TmFtZS5zdWJzdHJpbmcoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVEaWN0W25vZGVOYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmjqfku7blkI3lrZfph43lpI0hXCIgKyBjaGlsZHJlbltpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZURpY3Rbbm9kZU5hbWVdID0gY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0uY2hpbGRyZW5Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5rV2lkZ2V0KGNoaWxkcmVuW2ldLCBub2RlRGljdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgbGlua1dpZGdldCh0aGlzLm5vZGUsIHRoaXMubm9kZURpY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG4iXX0=