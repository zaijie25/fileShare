
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/mediator/ViewMediator.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b35dDfcmdCqYVTHZzU5Kg2', 'ViewMediator');
// hall/scripts/logic/hall/MVC/mediator/ViewMediator.ts

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
// import Mediator from '../framework/puremvc/patterns/mediator/Mediator'
var HallConst_1 = require("../HallConst");
// import Notification from '../framework/puremvc/patterns/observer/Notification'
var ViewMediator = /** @class */ (function (_super) {
    __extends(ViewMediator, _super);
    function ViewMediator() {
        return _super.call(this) || this;
    }
    ViewMediator.prototype.listNotificationInterests = function () {
        _super.prototype.listNotificationInterests.call(this);
        return [HallConst_1.default.PUSH_VIEW];
    };
    ViewMediator.prototype.handleNotification = function (notification) {
        var msgName = notification.getName();
        var msgdata = notification.getBody();
        var msgType = notification.getType();
        Logger.log('notification =========' + notification.toString());
        if (msgName == HallConst_1.default.PUSH_VIEW) {
            if (msgType == HallConst_1.default.HALL_SCENE) {
                //加载大厅预设
                // cc.director.loadScene('HallScene')
                Logger.log('----------------show something--------');
            }
        }
    };
    return ViewMediator;
}(puremvc.Mediator));
exports.default = ViewMediator;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcbWVkaWF0b3JcXFZpZXdNZWRpYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBeUU7QUFDekUsMENBQWdDO0FBQ2hDLGlGQUFpRjtBQUVqRjtJQUEwQyxnQ0FBZ0I7SUFDdEQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFFRCxnREFBeUIsR0FBekI7UUFDSSxpQkFBTSx5QkFBeUIsV0FBRSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxtQkFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCx5Q0FBa0IsR0FBbEIsVUFBbUIsWUFBWTtRQUMzQixJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQzlELElBQUksT0FBTyxJQUFJLG1CQUFLLENBQUMsU0FBUyxFQUFFO1lBQzVCLElBQUksT0FBTyxJQUFJLG1CQUFLLENBQUMsVUFBVSxFQUFFO2dCQUM3QixRQUFRO2dCQUNSLHFDQUFxQztnQkFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO2FBQ3ZEO1NBRUo7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCeUMsT0FBTyxDQUFDLFFBQVEsR0F3QnpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IE1lZGlhdG9yIGZyb20gJy4uL2ZyYW1ld29yay9wdXJlbXZjL3BhdHRlcm5zL21lZGlhdG9yL01lZGlhdG9yJ1xyXG5pbXBvcnQgQ29uc3QgZnJvbSAnLi4vSGFsbENvbnN0J1xyXG4vLyBpbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJy4uL2ZyYW1ld29yay9wdXJlbXZjL3BhdHRlcm5zL29ic2VydmVyL05vdGlmaWNhdGlvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNZWRpYXRvciBleHRlbmRzIHB1cmVtdmMuTWVkaWF0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxuXHJcbiAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6YW55e1xyXG4gICAgICAgIHN1cGVyLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTtcclxuICAgICAgICByZXR1cm4gW0NvbnN0LlBVU0hfVklFV11cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVOb3RpZmljYXRpb24obm90aWZpY2F0aW9uKXtcclxuICAgICAgICBsZXQgbXNnTmFtZSA9IG5vdGlmaWNhdGlvbi5nZXROYW1lKCk7XHJcbiAgICAgICAgbGV0IG1zZ2RhdGEgPSBub3RpZmljYXRpb24uZ2V0Qm9keSgpO1xyXG4gICAgICAgIGxldCBtc2dUeXBlID0gbm90aWZpY2F0aW9uLmdldFR5cGUoKTtcclxuICAgICAgICBMb2dnZXIubG9nKCdub3RpZmljYXRpb24gPT09PT09PT09JyArIG5vdGlmaWNhdGlvbi50b1N0cmluZygpKVxyXG4gICAgICAgIGlmIChtc2dOYW1lID09IENvbnN0LlBVU0hfVklFVykge1xyXG4gICAgICAgICAgICBpZiAobXNnVHlwZSA9PSBDb25zdC5IQUxMX1NDRU5FKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WKoOi9veWkp+WOhemihOiuvlxyXG4gICAgICAgICAgICAgICAgLy8gY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdIYWxsU2NlbmUnKVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZygnLS0tLS0tLS0tLS0tLS0tLXNob3cgc29tZXRoaW5nLS0tLS0tLS0nKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19