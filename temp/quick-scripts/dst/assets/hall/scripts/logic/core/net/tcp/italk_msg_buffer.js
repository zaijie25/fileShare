
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/tcp/italk_msg_buffer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcdGNwXFxpdGFsa19tc2dfYnVmZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQXNDO0FBRXRDO0lBQUE7SUFvQkEsQ0FBQztJQW5CVSx5QkFBVSxHQUFqQixVQUFrQixNQUFpQixFQUFDLElBQTJCO1FBQzNELElBQUksTUFBTSxHQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxVQUFVLEdBQVUsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLE9BQU8sR0FBYyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEdBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNuQixPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7UUFDL0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFJLHNCQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FwQkEsQUFvQkMsSUFBQTtBQUNELGtCQUFlLGNBQWMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGl0YWxrIH0gZnJvbSBcIi4vaXRhbGttc2dfcGJcIjtcclxuaW1wb3J0IEl0YWxrQ3JjIGZyb20gXCIuL2l0YWxrbXNnX2NyY1wiO1xyXG5cclxuY2xhc3MgSXRhbGtNc2dCdWZmZXIge1xyXG4gICAgc3RhdGljIGJ1aWxkQnVmZXIoYnVmZmVyOlVpbnQ4QXJyYXksdHlwZTppdGFsay5wYi5JdGFsa1R5cGVFbnVtKTpVaW50OEFycmF5e1xyXG4gICAgICAgIGxldCBsZW5ndGg6bnVtYmVyID0gYnVmZmVyLmxlbmd0aDtcclxuICAgICAgICBsZXQgdG90ZWw6bnVtYmVyID0gTWF0aC5mbG9vcihsZW5ndGgvMTAyNDApO1xyXG4gICAgICAgIGxldCBib2R5bGVuZ3RoOm51bWJlciA9IGxlbmd0aCAlIDEwMjQwO1xyXG4gICAgICAgIGxldCBoZWFkYnVmOlVpbnQ4QXJyYXkgPSBuZXcgVWludDhBcnJheSgyNCtsZW5ndGgpO1xyXG4gICAgICAgIGhlYWRidWZbMF0gPSAyO1xyXG4gICAgICAgIGhlYWRidWZbMV0gPSB0eXBlLnZhbHVlT2YoKTtcclxuICAgICAgICBoZWFkYnVmWzJdID0gdG90ZWw7XHJcbiAgICAgICAgaGVhZGJ1ZlszXSA9IDA7XHJcbiAgICAgICAgaGVhZGJ1Zls0XSA9IDB4ZmYgJiBib2R5bGVuZ3RoO1xyXG4gICAgICAgIGhlYWRidWZbNV0gPSAweGZmICYgYm9keWxlbmd0aCA+PiA4O1xyXG4gICAgICAgIGxldCBjcmNudW0gPSAgSXRhbGtDcmMuY3JjMTYoaGVhZGJ1Zik7XHJcbiAgICAgICAgaGVhZGJ1Zls2XSA9IDB4ZmYgJiBjcmNudW07XHJcbiAgICAgICAgaGVhZGJ1Zls3XSA9IDB4ZmYgJiBjcmNudW0gPj4gODtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGhlYWRidWZbMjQgKyBpXSA9IGJ1ZmZlcltpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlYWRidWY7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgSXRhbGtNc2dCdWZmZXIiXX0=