"use strict";
cc._RF.push(module, '93473X1UjNMWIbmuPVKH5R5', 'italk_msg_buffer');
// hall/scripts/logic/core/net/tcp/italk_msg_buffer.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var italkmsg_crc_1 = require("./italkmsg_crc");
var ItalkMsgBuffer = /** @class */ (function () {
    function ItalkMsgBuffer() {
    }
    ItalkMsgBuffer.buildBufer = function (buffer, type) {
        var length = buffer.length;
        var totel = Math.floor(length / 10240);
        var bodylength = length % 10240;
        var headbuf = new Uint8Array(24 + length);
        headbuf[0] = 2;
        headbuf[1] = type.valueOf();
        headbuf[2] = totel;
        headbuf[3] = 0;
        headbuf[4] = 0xff & bodylength;
        headbuf[5] = 0xff & bodylength >> 8;
        var crcnum = italkmsg_crc_1.default.crc16(headbuf);
        headbuf[6] = 0xff & crcnum;
        headbuf[7] = 0xff & crcnum >> 8;
        for (var i = 0; i < length; i++) {
            headbuf[24 + i] = buffer[i];
        }
        return headbuf;
    };
    return ItalkMsgBuffer;
}());
exports.default = ItalkMsgBuffer;

cc._RF.pop();