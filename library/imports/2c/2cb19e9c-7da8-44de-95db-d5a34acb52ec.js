"use strict";
cc._RF.push(module, '2cb196cfahE3pXb1aNKy1Ls', 'MD5');
// hall/scripts/framework/libs/cryptoTs/algo/MD5.ts

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
exports.MD5 = void 0;
var Hasher_1 = require("../lib/Hasher");
var WordArray_1 = require("../lib/WordArray");
// Constants table
var T = [];
// Compute constants
for (var i = 0; i < 64; i++) {
    T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
}
var MD5 = /** @class */ (function (_super) {
    __extends(MD5, _super);
    function MD5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MD5.FF = function (a, b, c, d, x, s, t) {
        var n = a + ((b & c) | (~b & d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5.GG = function (a, b, c, d, x, s, t) {
        var n = a + ((b & d) | (c & ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5.HH = function (a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5.II = function (a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return ((n << s) | (n >>> (32 - s))) + b;
    };
    MD5.prototype.reset = function () {
        // reset core values
        _super.prototype.reset.call(this);
        this._hash = new WordArray_1.WordArray([
            0x67452301, 0xefcdab89,
            0x98badcfe, 0x10325476
        ]);
    };
    MD5.prototype._doProcessBlock = function (M, offset) {
        // Swap endian
        for (var i = 0; i < 16; i++) {
            // Shortcuts
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = ((((M_offset_i << 8) | (M_offset_i >>> 24)) & 0x00ff00ff) |
                (((M_offset_i << 24) | (M_offset_i >>> 8)) & 0xff00ff00));
        }
        // Shortcuts
        var H = this._hash.words;
        var M_offset_0 = M[offset + 0];
        var M_offset_1 = M[offset + 1];
        var M_offset_2 = M[offset + 2];
        var M_offset_3 = M[offset + 3];
        var M_offset_4 = M[offset + 4];
        var M_offset_5 = M[offset + 5];
        var M_offset_6 = M[offset + 6];
        var M_offset_7 = M[offset + 7];
        var M_offset_8 = M[offset + 8];
        var M_offset_9 = M[offset + 9];
        var M_offset_10 = M[offset + 10];
        var M_offset_11 = M[offset + 11];
        var M_offset_12 = M[offset + 12];
        var M_offset_13 = M[offset + 13];
        var M_offset_14 = M[offset + 14];
        var M_offset_15 = M[offset + 15];
        // Working variables
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        // Computation
        a = MD5.FF(a, b, c, d, M_offset_0, 7, T[0]);
        d = MD5.FF(d, a, b, c, M_offset_1, 12, T[1]);
        c = MD5.FF(c, d, a, b, M_offset_2, 17, T[2]);
        b = MD5.FF(b, c, d, a, M_offset_3, 22, T[3]);
        a = MD5.FF(a, b, c, d, M_offset_4, 7, T[4]);
        d = MD5.FF(d, a, b, c, M_offset_5, 12, T[5]);
        c = MD5.FF(c, d, a, b, M_offset_6, 17, T[6]);
        b = MD5.FF(b, c, d, a, M_offset_7, 22, T[7]);
        a = MD5.FF(a, b, c, d, M_offset_8, 7, T[8]);
        d = MD5.FF(d, a, b, c, M_offset_9, 12, T[9]);
        c = MD5.FF(c, d, a, b, M_offset_10, 17, T[10]);
        b = MD5.FF(b, c, d, a, M_offset_11, 22, T[11]);
        a = MD5.FF(a, b, c, d, M_offset_12, 7, T[12]);
        d = MD5.FF(d, a, b, c, M_offset_13, 12, T[13]);
        c = MD5.FF(c, d, a, b, M_offset_14, 17, T[14]);
        b = MD5.FF(b, c, d, a, M_offset_15, 22, T[15]);
        a = MD5.GG(a, b, c, d, M_offset_1, 5, T[16]);
        d = MD5.GG(d, a, b, c, M_offset_6, 9, T[17]);
        c = MD5.GG(c, d, a, b, M_offset_11, 14, T[18]);
        b = MD5.GG(b, c, d, a, M_offset_0, 20, T[19]);
        a = MD5.GG(a, b, c, d, M_offset_5, 5, T[20]);
        d = MD5.GG(d, a, b, c, M_offset_10, 9, T[21]);
        c = MD5.GG(c, d, a, b, M_offset_15, 14, T[22]);
        b = MD5.GG(b, c, d, a, M_offset_4, 20, T[23]);
        a = MD5.GG(a, b, c, d, M_offset_9, 5, T[24]);
        d = MD5.GG(d, a, b, c, M_offset_14, 9, T[25]);
        c = MD5.GG(c, d, a, b, M_offset_3, 14, T[26]);
        b = MD5.GG(b, c, d, a, M_offset_8, 20, T[27]);
        a = MD5.GG(a, b, c, d, M_offset_13, 5, T[28]);
        d = MD5.GG(d, a, b, c, M_offset_2, 9, T[29]);
        c = MD5.GG(c, d, a, b, M_offset_7, 14, T[30]);
        b = MD5.GG(b, c, d, a, M_offset_12, 20, T[31]);
        a = MD5.HH(a, b, c, d, M_offset_5, 4, T[32]);
        d = MD5.HH(d, a, b, c, M_offset_8, 11, T[33]);
        c = MD5.HH(c, d, a, b, M_offset_11, 16, T[34]);
        b = MD5.HH(b, c, d, a, M_offset_14, 23, T[35]);
        a = MD5.HH(a, b, c, d, M_offset_1, 4, T[36]);
        d = MD5.HH(d, a, b, c, M_offset_4, 11, T[37]);
        c = MD5.HH(c, d, a, b, M_offset_7, 16, T[38]);
        b = MD5.HH(b, c, d, a, M_offset_10, 23, T[39]);
        a = MD5.HH(a, b, c, d, M_offset_13, 4, T[40]);
        d = MD5.HH(d, a, b, c, M_offset_0, 11, T[41]);
        c = MD5.HH(c, d, a, b, M_offset_3, 16, T[42]);
        b = MD5.HH(b, c, d, a, M_offset_6, 23, T[43]);
        a = MD5.HH(a, b, c, d, M_offset_9, 4, T[44]);
        d = MD5.HH(d, a, b, c, M_offset_12, 11, T[45]);
        c = MD5.HH(c, d, a, b, M_offset_15, 16, T[46]);
        b = MD5.HH(b, c, d, a, M_offset_2, 23, T[47]);
        a = MD5.II(a, b, c, d, M_offset_0, 6, T[48]);
        d = MD5.II(d, a, b, c, M_offset_7, 10, T[49]);
        c = MD5.II(c, d, a, b, M_offset_14, 15, T[50]);
        b = MD5.II(b, c, d, a, M_offset_5, 21, T[51]);
        a = MD5.II(a, b, c, d, M_offset_12, 6, T[52]);
        d = MD5.II(d, a, b, c, M_offset_3, 10, T[53]);
        c = MD5.II(c, d, a, b, M_offset_10, 15, T[54]);
        b = MD5.II(b, c, d, a, M_offset_1, 21, T[55]);
        a = MD5.II(a, b, c, d, M_offset_8, 6, T[56]);
        d = MD5.II(d, a, b, c, M_offset_15, 10, T[57]);
        c = MD5.II(c, d, a, b, M_offset_6, 15, T[58]);
        b = MD5.II(b, c, d, a, M_offset_13, 21, T[59]);
        a = MD5.II(a, b, c, d, M_offset_4, 6, T[60]);
        d = MD5.II(d, a, b, c, M_offset_11, 10, T[61]);
        c = MD5.II(c, d, a, b, M_offset_2, 15, T[62]);
        b = MD5.II(b, c, d, a, M_offset_9, 21, T[63]);
        // Intermediate hash value
        H[0] = (H[0] + a) | 0;
        H[1] = (H[1] + b) | 0;
        H[2] = (H[2] + c) | 0;
        H[3] = (H[3] + d) | 0;
    };
    MD5.prototype._doFinalize = function () {
        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = data.sigBytes * 8;
        // Add padding
        dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
        var nBitsTotalL = nBitsTotal;
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = ((((nBitsTotalH << 8) | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalH << 24) | (nBitsTotalH >>> 8)) & 0xff00ff00));
        dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = ((((nBitsTotalL << 8) | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
            (((nBitsTotalL << 24) | (nBitsTotalL >>> 8)) & 0xff00ff00));
        data.sigBytes = (dataWords.length + 1) * 4;
        // Hash final blocks
        this._process();
        // Shortcuts
        var hash = this._hash;
        var H = hash.words;
        // Swap endian
        for (var i = 0; i < 4; i++) {
            // Shortcut
            var H_i = H[i];
            H[i] = (((H_i << 8) | (H_i >>> 24)) & 0x00ff00ff) |
                (((H_i << 24) | (H_i >>> 8)) & 0xff00ff00);
        }
        // Return final computed hash
        return hash;
    };
    return MD5;
}(Hasher_1.Hasher));
exports.MD5 = MD5;

cc._RF.pop();