"use strict";
cc._RF.push(module, 'c26e6evUu9KOZNJlmbdcyrm', 'MsgEvent');
// hall/scripts/logic/hall/ui/msg/MsgEvent.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgType = exports.MsgEvent = void 0;
var MsgEvent = /** @class */ (function () {
    function MsgEvent() {
    }
    MsgEvent.ReadMsgCallBack = "ReadMsgCallBack";
    MsgEvent.DeleteMsgCallback = "DeleteMsgCallback";
    MsgEvent.MsgListCallback = "MsgListCallback";
    MsgEvent.NoticeListCallback = "NoticeListCallback";
    MsgEvent.ReadNoticeCallback = "ReadNoticeCallback";
    return MsgEvent;
}());
exports.MsgEvent = MsgEvent;
var MsgType;
(function (MsgType) {
    MsgType[MsgType["All"] = 0] = "All";
    MsgType[MsgType["Notice"] = 1] = "Notice";
    MsgType[MsgType["Mail"] = 2] = "Mail";
})(MsgType = exports.MsgType || (exports.MsgType = {}));

cc._RF.pop();