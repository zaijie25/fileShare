"use strict";
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