"use strict";
cc._RF.push(module, '2cb8eWezJtFm73shw+dY7y8', 'HallPaoMaDengView');
// hall/scripts/logic/hall/ui/hall/views/HallPaoMaDengView.ts

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
var PaoMaDengBaseView_1 = require("../PaoMaDengBaseView");
var GlobalEvent_1 = require("../../../../core/GlobalEvent");
var HallPaoMaDengView = /** @class */ (function (_super) {
    __extends(HallPaoMaDengView, _super);
    function HallPaoMaDengView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallPaoMaDengView.prototype.onOpen = function () {
        _super.prototype.onOpen.call(this);
        this.addDefautMsg();
        Global.Event.on(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.on(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
    };
    HallPaoMaDengView.prototype.onClose = function () {
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
        _super.prototype.onClose.call(this);
    };
    //界面销毁
    HallPaoMaDengView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
        _super.prototype.onDispose.call(this);
    };
    HallPaoMaDengView.prototype.addDefautMsg = function () {
        var msgList = [
            { msg: "<color=#00d2FF>尊敬的玩家，欢迎进入游戏大厅！</color>", type: 1 },
            { msg: "<color=#f9a314>抵制不良游戏，拒绝盗版游戏，注意自身保护，谨防上当受骗</color>", type: 1 },
            { msg: "<color=#f9a314>适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活</color>", type: 1 },
        ];
        for (var index = 0; index < msgList.length; index++) {
            var data = msgList[index];
            this.addMsgItem(data);
        }
    };
    /**
     * @param msg {
                type : 20001,
                data : {
                    type : 0 ,
                    msg : "<color=#FF0000>TestData!!!!!!!!!!!!!!</color>"
                },
            }
     */
    HallPaoMaDengView.prototype.addMsgData = function (msg) {
        this.addMsgItem(msg.data);
    };
    return HallPaoMaDengView;
}(PaoMaDengBaseView_1.default));
exports.default = HallPaoMaDengView;

cc._RF.pop();