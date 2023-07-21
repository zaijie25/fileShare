
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/algo/AES.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '831e6LvSAVEpYHlSNsp6m/f', 'AES');
// hall/scripts/framework/libs/cryptoTs/algo/AES.ts

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
exports.AES = void 0;
var BlockCipher_1 = require("../lib/BlockCipher");
// Define lookup tables
var SBOX = [];
var INV_SBOX = [];
var SUB_MIX_0 = [];
var SUB_MIX_1 = [];
var SUB_MIX_2 = [];
var SUB_MIX_3 = [];
var INV_SUB_MIX_0 = [];
var INV_SUB_MIX_1 = [];
var INV_SUB_MIX_2 = [];
var INV_SUB_MIX_3 = [];
// Compute lookup tables
(function () {
    // Compute double table
    var d = [];
    for (var i = 0; i < 256; i++) {
        if (i < 128) {
            d[i] = i << 1;
        }
        else {
            d[i] = (i << 1) ^ 0x11b;
        }
    }
    // Walk GF(2^8)
    var x = 0;
    var xi = 0;
    for (var i = 0; i < 256; i++) {
        // Compute sbox
        var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
        sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
        SBOX[x] = sx;
        INV_SBOX[sx] = x;
        // Compute multiplication
        var x2 = d[x];
        var x4 = d[x2];
        var x8 = d[x4];
        // Compute sub bytes, mix columns tables
        var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
        SUB_MIX_0[x] = (t << 24) | (t >>> 8);
        SUB_MIX_1[x] = (t << 16) | (t >>> 16);
        SUB_MIX_2[x] = (t << 8) | (t >>> 24);
        SUB_MIX_3[x] = t;
        // Compute inv sub bytes, inv mix columns tables
        t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
        INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
        INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
        INV_SUB_MIX_2[sx] = (t << 8) | (t >>> 24);
        INV_SUB_MIX_3[sx] = t;
        // Compute next counter
        if (!x) {
            x = xi = 1;
        }
        else {
            x = x2 ^ d[d[d[x8 ^ x2]]];
            xi ^= d[d[xi]];
        }
    }
}());
// Precomputed Rcon lookup
var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
var AES = /** @class */ (function (_super) {
    __extends(AES, _super);
    function AES(xformMode, key, cfg) {
        return _super.call(this, xformMode, key, cfg) || this;
    }
    AES.prototype.reset = function () {
        // reset core values
        _super.prototype.reset.call(this);
        // Skip reset of nRounds has been set before and key did not change
        if (this._nRounds && this._keyPriorReset === this._key) {
            return;
        }
        // Shortcuts
        var key = this._keyPriorReset = this._key;
        var keyWords = key.words;
        var keySize = key.sigBytes / 4;
        // Compute number of rounds
        var nRounds = this._nRounds = keySize + 6;
        // Compute number of key schedule rows
        var ksRows = (nRounds + 1) * 4;
        // Compute key schedule
        var keySchedule = this._keySchedule = [];
        for (var ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
            }
            else {
                var t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                    // Rot word
                    t = (t << 8) | (t >>> 24);
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                    // Mix Rcon
                    t ^= RCON[(ksRow / keySize) | 0] << 24;
                }
                else if (keySize > 6 && ksRow % keySize === 4) {
                    // Sub word
                    t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
        }
        // Compute inv key schedule
        var invKeySchedule = this._invKeySchedule = [];
        for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;
            var t = void 0;
            if (invKsRow % 4) {
                t = keySchedule[ksRow];
            }
            else {
                t = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
            }
            else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                    INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
            }
        }
    };
    AES.prototype.encryptBlock = function (M, offset) {
        this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
    };
    AES.prototype.decryptBlock = function (M, offset) {
        // Swap 2nd and 4th rows
        var t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
        this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
        // Inv swap 2nd and 4th rows
        t = M[offset + 1];
        M[offset + 1] = M[offset + 3];
        M[offset + 3] = t;
    };
    AES.prototype._doCryptBlock = function (M, offset, keySchedule, sub_mix_0, sub_mix_1, sub_mix_2, sub_mix_3, sbox) {
        // Get input, add round key
        var s0 = M[offset] ^ keySchedule[0];
        var s1 = M[offset + 1] ^ keySchedule[1];
        var s2 = M[offset + 2] ^ keySchedule[2];
        var s3 = M[offset + 3] ^ keySchedule[3];
        // Key schedule row counter
        var ksRow = 4;
        // Rounds
        for (var round = 1; round < this._nRounds; round++) {
            // Shift rows, sub bytes, mix columns, add round key
            var t0 = sub_mix_0[s0 >>> 24] ^ sub_mix_1[(s1 >>> 16) & 0xff] ^ sub_mix_2[(s2 >>> 8) & 0xff] ^ sub_mix_3[s3 & 0xff] ^
                keySchedule[ksRow++];
            var t1 = sub_mix_0[s1 >>> 24] ^ sub_mix_1[(s2 >>> 16) & 0xff] ^ sub_mix_2[(s3 >>> 8) & 0xff] ^ sub_mix_3[s0 & 0xff] ^
                keySchedule[ksRow++];
            var t2 = sub_mix_0[s2 >>> 24] ^ sub_mix_1[(s3 >>> 16) & 0xff] ^ sub_mix_2[(s0 >>> 8) & 0xff] ^ sub_mix_3[s1 & 0xff] ^
                keySchedule[ksRow++];
            var t3 = sub_mix_0[s3 >>> 24] ^ sub_mix_1[(s0 >>> 16) & 0xff] ^ sub_mix_2[(s1 >>> 8) & 0xff] ^ sub_mix_3[s2 & 0xff] ^
                keySchedule[ksRow++];
            // Update state
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
        }
        // Shift rows, sub bytes, add round key
        var t0g = ((sbox[s0 >>> 24] << 24) | (sbox[(s1 >>> 16) & 0xff] << 16) | (sbox[(s2 >>> 8) & 0xff] << 8) | sbox[s3 & 0xff]) ^
            keySchedule[ksRow++];
        var t1g = ((sbox[s1 >>> 24] << 24) | (sbox[(s2 >>> 16) & 0xff] << 16) | (sbox[(s3 >>> 8) & 0xff] << 8) | sbox[s0 & 0xff]) ^
            keySchedule[ksRow++];
        var t2g = ((sbox[s2 >>> 24] << 24) | (sbox[(s3 >>> 16) & 0xff] << 16) | (sbox[(s0 >>> 8) & 0xff] << 8) | sbox[s1 & 0xff]) ^
            keySchedule[ksRow++];
        var t3g = ((sbox[s3 >>> 24] << 24) | (sbox[(s0 >>> 16) & 0xff] << 16) | (sbox[(s1 >>> 8) & 0xff] << 8) | sbox[s2 & 0xff]) ^
            keySchedule[ksRow++];
        // Set output
        M[offset] = t0g;
        M[offset + 1] = t1g;
        M[offset + 2] = t2g;
        M[offset + 3] = t3g;
    };
    // 256 / 32
    AES.keySize = 8;
    return AES;
}(BlockCipher_1.BlockCipher));
exports.AES = AES;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcYWxnb1xcQUVTLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBaUQ7QUFJakQsdUJBQXVCO0FBQ3ZCLElBQU0sSUFBSSxHQUFrQixFQUFFLENBQUM7QUFDL0IsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztBQUNuQyxJQUFNLFNBQVMsR0FBa0IsRUFBRSxDQUFDO0FBQ3BDLElBQU0sU0FBUyxHQUFrQixFQUFFLENBQUM7QUFDcEMsSUFBTSxTQUFTLEdBQWtCLEVBQUUsQ0FBQztBQUNwQyxJQUFNLFNBQVMsR0FBa0IsRUFBRSxDQUFDO0FBQ3BDLElBQU0sYUFBYSxHQUFrQixFQUFFLENBQUM7QUFDeEMsSUFBTSxhQUFhLEdBQWtCLEVBQUUsQ0FBQztBQUN4QyxJQUFNLGFBQWEsR0FBa0IsRUFBRSxDQUFDO0FBQ3hDLElBQU0sYUFBYSxHQUFrQixFQUFFLENBQUM7QUFFeEMsd0JBQXdCO0FBQ3hCLENBQUM7SUFDRyx1QkFBdUI7SUFDdkIsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7WUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQjthQUFNO1lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMzQjtLQUNKO0lBRUQsZUFBZTtJQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxF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QUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQzVHLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzlCLElBQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDNUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFOUIsZUFBZTtZQUNmLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ1IsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDWDtRQUVELHVDQUF1QztRQUN2QyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQy9HLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDL0csV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUMvRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQy9HLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLGFBQWE7UUFDYixDQUFDLENBQUMsTUFBTSxDQUFDLEdBQU8sR0FBRyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3hCLENBQUM7SUEzSkQsV0FBVztJQUNHLFdBQU8sR0FBRyxDQUFDLENBQUM7SUEySjlCLFVBQUM7Q0E3SkQsQUE2SkMsQ0E3SndCLHlCQUFXLEdBNkpuQztBQTdKWSxrQkFBRyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJsb2NrQ2lwaGVyIH0gZnJvbSAnLi4vbGliL0Jsb2NrQ2lwaGVyJztcclxuaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi4vbGliL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcgfSBmcm9tICcuLi9saWIvQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyc7XHJcblxyXG4vLyBEZWZpbmUgbG9va3VwIHRhYmxlc1xyXG5jb25zdCBTQk9YOiBBcnJheTxudW1iZXI+ID0gW107XHJcbmNvbnN0IElOVl9TQk9YOiBBcnJheTxudW1iZXI+ID0gW107XHJcbmNvbnN0IFNVQl9NSVhfMDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5jb25zdCBTVUJfTUlYXzE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuY29uc3QgU1VCX01JWF8yOiBBcnJheTxudW1iZXI+ID0gW107XHJcbmNvbnN0IFNVQl9NSVhfMzogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5jb25zdCBJTlZfU1VCX01JWF8wOiBBcnJheTxudW1iZXI+ID0gW107XHJcbmNvbnN0IElOVl9TVUJfTUlYXzE6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuY29uc3QgSU5WX1NVQl9NSVhfMjogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5jb25zdCBJTlZfU1VCX01JWF8zOiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG4vLyBDb21wdXRlIGxvb2t1cCB0YWJsZXNcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIENvbXB1dGUgZG91YmxlIHRhYmxlXHJcbiAgICBjb25zdCBkID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgPCAxMjgpIHtcclxuICAgICAgICAgICAgZFtpXSA9IGkgPDwgMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkW2ldID0gKGkgPDwgMSkgXiAweDExYjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2FsayBHRigyXjgpXHJcbiAgICBsZXQgeCA9IDA7XHJcbiAgICBsZXQgeGkgPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xyXG4gICAgICAgIC8vIENvbXB1dGUgc2JveFxyXG4gICAgICAgIGxldCBzeCA9IHhpIF4gKHhpIDw8IDEpIF4gKHhpIDw8IDIpIF4gKHhpIDw8IDMpIF4gKHhpIDw8IDQpO1xyXG4gICAgICAgIHN4ID0gKHN4ID4+PiA4KSBeIChzeCAmIDB4ZmYpIF4gMHg2MztcclxuICAgICAgICBTQk9YW3hdID0gc3g7XHJcbiAgICAgICAgSU5WX1NCT1hbc3hdID0geDtcclxuXHJcbiAgICAgICAgLy8gQ29tcHV0ZSBtdWx0aXBsaWNhdGlvblxyXG4gICAgICAgIGNvbnN0IHgyID0gZFt4XTtcclxuICAgICAgICBjb25zdCB4NCA9IGRbeDJdO1xyXG4gICAgICAgIGNvbnN0IHg4ID0gZFt4NF07XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgc3ViIGJ5dGVzLCBtaXggY29sdW1ucyB0YWJsZXNcclxuICAgICAgICBsZXQgdCA9IChkW3N4XSAqIDB4MTAxKSBeIChzeCAqIDB4MTAxMDEwMCk7XHJcbiAgICAgICAgU1VCX01JWF8wW3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpO1xyXG4gICAgICAgIFNVQl9NSVhfMVt4XSA9ICh0IDw8IDE2KSB8ICh0ID4+PiAxNik7XHJcbiAgICAgICAgU1VCX01JWF8yW3hdID0gKHQgPDwgOCkgIHwgKHQgPj4+IDI0KTtcclxuICAgICAgICBTVUJfTUlYXzNbeF0gPSB0O1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlIGludiBzdWIgYnl0ZXMsIGludiBtaXggY29sdW1ucyB0YWJsZXNcclxuICAgICAgICB0ID0gKHg4ICogMHgxMDEwMTAxKSBeICh4NCAqIDB4MTAwMDEpIF4gKHgyICogMHgxMDEpIF4gKHggKiAweDEwMTAxMDApO1xyXG4gICAgICAgIElOVl9TVUJfTUlYXzBbc3hdID0gKHQgPDwgMjQpIHwgKHQgPj4+IDgpO1xyXG4gICAgICAgIElOVl9TVUJfTUlYXzFbc3hdID0gKHQgPDwgMTYpIHwgKHQgPj4+IDE2KTtcclxuICAgICAgICBJTlZfU1VCX01JWF8yW3N4XSA9ICh0IDw8IDgpICB8ICh0ID4+PiAyNCk7XHJcbiAgICAgICAgSU5WX1NVQl9NSVhfM1tzeF0gPSB0O1xyXG5cclxuICAgICAgICAvLyBDb21wdXRlIG5leHQgY291bnRlclxyXG4gICAgICAgIGlmICgheCkge1xyXG4gICAgICAgICAgICB4ID0geGkgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHggPSB4MiBeIGRbZFtkW3g4IF4geDJdXV07XHJcbiAgICAgICAgICAgIHhpIF49IGRbZFt4aV1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcbi8vIFByZWNvbXB1dGVkIFJjb24gbG9va3VwXHJcbmNvbnN0IFJDT04gPSBbMHgwMCwgMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxYiwgMHgzNl07XHJcblxyXG5leHBvcnQgY2xhc3MgQUVTIGV4dGVuZHMgQmxvY2tDaXBoZXIge1xyXG4gICAgLy8gMjU2IC8gMzJcclxuICAgIHB1YmxpYyBzdGF0aWMga2V5U2l6ZSA9IDg7XHJcblxyXG4gICAgX25Sb3VuZHMhOiBudW1iZXI7XHJcblxyXG4gICAgX2tleSE6IFdvcmRBcnJheTtcclxuXHJcbiAgICBfa2V5UHJpb3JSZXNldCE6IFdvcmRBcnJheTtcclxuXHJcbiAgICBfa2V5U2NoZWR1bGUhOiBBcnJheTxudW1iZXI+O1xyXG5cclxuICAgIF9pbnZLZXlTY2hlZHVsZSE6IEFycmF5PG51bWJlcj47XHJcblxyXG4gICAgY29uc3RydWN0b3IoeGZvcm1Nb2RlOiBudW1iZXIsIGtleTogV29yZEFycmF5LCBjZmc/OiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnKSB7XHJcbiAgICAgICAgc3VwZXIoeGZvcm1Nb2RlLCBrZXksIGNmZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gcmVzZXQgY29yZSB2YWx1ZXNcclxuICAgICAgICBzdXBlci5yZXNldCgpO1xyXG5cclxuICAgICAgICAvLyBTa2lwIHJlc2V0IG9mIG5Sb3VuZHMgaGFzIGJlZW4gc2V0IGJlZm9yZSBhbmQga2V5IGRpZCBub3QgY2hhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuX25Sb3VuZHMgJiYgdGhpcy5fa2V5UHJpb3JSZXNldCA9PT0gdGhpcy5fa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNob3J0Y3V0c1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuX2tleVByaW9yUmVzZXQgPSB0aGlzLl9rZXk7XHJcbiAgICAgICAgY29uc3Qga2V5V29yZHMgPSBrZXkud29yZHM7XHJcbiAgICAgICAgY29uc3Qga2V5U2l6ZSA9IGtleS5zaWdCeXRlcyAvIDQ7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgbnVtYmVyIG9mIHJvdW5kc1xyXG4gICAgICAgIGNvbnN0IG5Sb3VuZHMgPSB0aGlzLl9uUm91bmRzID0ga2V5U2l6ZSArIDY7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUgbnVtYmVyIG9mIGtleSBzY2hlZHVsZSByb3dzXHJcbiAgICAgICAgY29uc3Qga3NSb3dzID0gKG5Sb3VuZHMgKyAxKSAqIDQ7XHJcblxyXG4gICAgICAgIC8vIENvbXB1dGUga2V5IHNjaGVkdWxlXHJcbiAgICAgICAgY29uc3Qga2V5U2NoZWR1bGU6IEFycmF5PG51bWJlcj4gPSB0aGlzLl9rZXlTY2hlZHVsZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtzUm93ID0gMDsga3NSb3cgPCBrc1Jvd3M7IGtzUm93KyspIHtcclxuICAgICAgICAgICAgaWYgKGtzUm93IDwga2V5U2l6ZSkge1xyXG4gICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3ddID0ga2V5V29yZHNba3NSb3ddO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHQgPSBrZXlTY2hlZHVsZVtrc1JvdyAtIDFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghKGtzUm93ICUga2V5U2l6ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSb3Qgd29yZFxyXG4gICAgICAgICAgICAgICAgICAgIHQgPSAodCA8PCA4KSB8ICh0ID4+PiAyNCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFN1YiB3b3JkXHJcbiAgICAgICAgICAgICAgICAgICAgdCA9IChTQk9YW3QgPj4+IDI0XSA8PCAyNCkgfCAoU0JPWFsodCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKFNCT1hbKHQgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBTQk9YW3QgJiAweGZmXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWl4IFJjb25cclxuICAgICAgICAgICAgICAgICAgICB0IF49IFJDT05bKGtzUm93IC8ga2V5U2l6ZSkgfCAwXSA8PCAyNDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5U2l6ZSA+IDYgJiYga3NSb3cgJSBrZXlTaXplID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3ViIHdvcmRcclxuICAgICAgICAgICAgICAgICAgICB0ID0gKFNCT1hbdCA+Pj4gMjRdIDw8IDI0KSB8IChTQk9YWyh0ID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoU0JPWFsodCA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IFNCT1hbdCAmIDB4ZmZdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGtleVNjaGVkdWxlW2tzUm93XSA9IGtleVNjaGVkdWxlW2tzUm93IC0ga2V5U2l6ZV0gXiB0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb21wdXRlIGludiBrZXkgc2NoZWR1bGVcclxuICAgICAgICBjb25zdCBpbnZLZXlTY2hlZHVsZTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuX2ludktleVNjaGVkdWxlID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaW52S3NSb3cgPSAwOyBpbnZLc1JvdyA8IGtzUm93czsgaW52S3NSb3crKykge1xyXG4gICAgICAgICAgICBjb25zdCBrc1JvdyA9IGtzUm93cyAtIGludktzUm93O1xyXG5cclxuICAgICAgICAgICAgbGV0IHQ7XHJcbiAgICAgICAgICAgIGlmIChpbnZLc1JvdyAlIDQpIHtcclxuICAgICAgICAgICAgICAgIHQgPSBrZXlTY2hlZHVsZVtrc1Jvd107XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0ID0ga2V5U2NoZWR1bGVba3NSb3cgLSA0XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGludktzUm93IDwgNCB8fCBrc1JvdyA8PSA0KSB7XHJcbiAgICAgICAgICAgICAgICBpbnZLZXlTY2hlZHVsZVtpbnZLc1Jvd10gPSB0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW52S2V5U2NoZWR1bGVbaW52S3NSb3ddID0gSU5WX1NVQl9NSVhfMFtTQk9YW3QgPj4+IDI0XV0gXiBJTlZfU1VCX01JWF8xW1NCT1hbKHQgPj4+IDE2KSAmIDB4ZmZdXSBeXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJTlZfU1VCX01JWF8yW1NCT1hbKHQgPj4+IDgpICYgMHhmZl1dIF4gSU5WX1NVQl9NSVhfM1tTQk9YW3QgJiAweGZmXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZW5jcnlwdEJsb2NrKE06IEFycmF5PG51bWJlcj4sIG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZG9DcnlwdEJsb2NrKE0sIG9mZnNldCwgdGhpcy5fa2V5U2NoZWR1bGUsIFNVQl9NSVhfMCwgU1VCX01JWF8xLCBTVUJfTUlYXzIsIFNVQl9NSVhfMywgU0JPWCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVjcnlwdEJsb2NrKE06IEFycmF5PG51bWJlcj4sIG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gU3dhcCAybmQgYW5kIDR0aCByb3dzXHJcbiAgICAgICAgbGV0IHQgPSBNW29mZnNldCArIDFdO1xyXG4gICAgICAgIE1bb2Zmc2V0ICsgMV0gPSBNW29mZnNldCArIDNdO1xyXG4gICAgICAgIE1bb2Zmc2V0ICsgM10gPSB0O1xyXG5cclxuICAgICAgICB0aGlzLl9kb0NyeXB0QmxvY2soTSwgb2Zmc2V0LCB0aGlzLl9pbnZLZXlTY2hlZHVsZSwgSU5WX1NVQl9NSVhfMCwgSU5WX1NVQl9NSVhfMSwgSU5WX1NVQl9NSVhfMiwgSU5WX1NVQl9NSVhfMywgSU5WX1NCT1gpO1xyXG5cclxuICAgICAgICAvLyBJbnYgc3dhcCAybmQgYW5kIDR0aCByb3dzXHJcbiAgICAgICAgdCA9IE1bb2Zmc2V0ICsgMV07XHJcbiAgICAgICAgTVtvZmZzZXQgKyAxXSA9IE1bb2Zmc2V0ICsgM107XHJcbiAgICAgICAgTVtvZmZzZXQgKyAzXSA9IHQ7XHJcbiAgICB9XHJcblxyXG4gICAgX2RvQ3J5cHRCbG9jayhcclxuICAgICAgICBNOiBBcnJheTxudW1iZXI+LFxyXG4gICAgICAgIG9mZnNldDogbnVtYmVyLFxyXG4gICAgICAgIGtleVNjaGVkdWxlOiBBcnJheTxudW1iZXI+LFxyXG4gICAgICAgIHN1Yl9taXhfMDogQXJyYXk8bnVtYmVyPixcclxuICAgICAgICBzdWJfbWl4XzE6IEFycmF5PG51bWJlcj4sXHJcbiAgICAgICAgc3ViX21peF8yOiBBcnJheTxudW1iZXI+LFxyXG4gICAgICAgIHN1Yl9taXhfMzogQXJyYXk8bnVtYmVyPixcclxuICAgICAgICBzYm94OiBBcnJheTxudW1iZXI+XHJcbiAgICApIHtcclxuICAgICAgICAvLyBHZXQgaW5wdXQsIGFkZCByb3VuZCBrZXlcclxuICAgICAgICBsZXQgczAgPSBNW29mZnNldF0gICAgIF4ga2V5U2NoZWR1bGVbMF07XHJcbiAgICAgICAgbGV0IHMxID0gTVtvZmZzZXQgKyAxXSBeIGtleVNjaGVkdWxlWzFdO1xyXG4gICAgICAgIGxldCBzMiA9IE1bb2Zmc2V0ICsgMl0gXiBrZXlTY2hlZHVsZVsyXTtcclxuICAgICAgICBsZXQgczMgPSBNW29mZnNldCArIDNdIF4ga2V5U2NoZWR1bGVbM107XHJcblxyXG4gICAgICAgIC8vIEtleSBzY2hlZHVsZSByb3cgY291bnRlclxyXG4gICAgICAgIGxldCBrc1JvdyA9IDQ7XHJcblxyXG4gICAgICAgIC8vIFJvdW5kc1xyXG4gICAgICAgIGZvciAobGV0IHJvdW5kID0gMTsgcm91bmQgPCB0aGlzLl9uUm91bmRzOyByb3VuZCsrKSB7XHJcbiAgICAgICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgbWl4IGNvbHVtbnMsIGFkZCByb3VuZCBrZXlcclxuICAgICAgICAgICAgY29uc3QgdDAgPSBzdWJfbWl4XzBbczAgPj4+IDI0XSBeIHN1Yl9taXhfMVsoczEgPj4+IDE2KSAmIDB4ZmZdIF4gc3ViX21peF8yWyhzMiA+Pj4gOCkgJiAweGZmXSBeIHN1Yl9taXhfM1tzMyAmIDB4ZmZdIF5cclxuICAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3crK107XHJcbiAgICAgICAgICAgIGNvbnN0IHQxID0gc3ViX21peF8wW3MxID4+PiAyNF0gXiBzdWJfbWl4XzFbKHMyID4+PiAxNikgJiAweGZmXSBeIHN1Yl9taXhfMlsoczMgPj4+IDgpICYgMHhmZl0gXiBzdWJfbWl4XzNbczAgJiAweGZmXSBeXHJcbiAgICAgICAgICAgICAgICAgICAgIGtleVNjaGVkdWxlW2tzUm93KytdO1xyXG4gICAgICAgICAgICBjb25zdCB0MiA9IHN1Yl9taXhfMFtzMiA+Pj4gMjRdIF4gc3ViX21peF8xWyhzMyA+Pj4gMTYpICYgMHhmZl0gXiBzdWJfbWl4XzJbKHMwID4+PiA4KSAmIDB4ZmZdIF4gc3ViX21peF8zW3MxICYgMHhmZl0gXlxyXG4gICAgICAgICAgICAgICAgICAgICBrZXlTY2hlZHVsZVtrc1JvdysrXTtcclxuICAgICAgICAgICAgY29uc3QgdDMgPSBzdWJfbWl4XzBbczMgPj4+IDI0XSBeIHN1Yl9taXhfMVsoczAgPj4+IDE2KSAmIDB4ZmZdIF4gc3ViX21peF8yWyhzMSA+Pj4gOCkgJiAweGZmXSBeIHN1Yl9taXhfM1tzMiAmIDB4ZmZdIF5cclxuICAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3crK107XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgc3RhdGVcclxuICAgICAgICAgICAgczAgPSB0MDtcclxuICAgICAgICAgICAgczEgPSB0MTtcclxuICAgICAgICAgICAgczIgPSB0MjtcclxuICAgICAgICAgICAgczMgPSB0MztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNoaWZ0IHJvd3MsIHN1YiBieXRlcywgYWRkIHJvdW5kIGtleVxyXG4gICAgICAgIGNvbnN0IHQwZyA9ICgoc2JveFtzMCA+Pj4gMjRdIDw8IDI0KSB8IChzYm94WyhzMSA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKHNib3hbKHMyID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgc2JveFtzMyAmIDB4ZmZdKSBeXHJcbiAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3crK107XHJcbiAgICAgICAgY29uc3QgdDFnID0gKChzYm94W3MxID4+PiAyNF0gPDwgMjQpIHwgKHNib3hbKHMyID4+PiAxNikgJiAweGZmXSA8PCAxNikgfCAoc2JveFsoczMgPj4+IDgpICYgMHhmZl0gPDwgOCkgfCBzYm94W3MwICYgMHhmZl0pIF5cclxuICAgICAgICAgICAgICAgICAgICBrZXlTY2hlZHVsZVtrc1JvdysrXTtcclxuICAgICAgICBjb25zdCB0MmcgPSAoKHNib3hbczIgPj4+IDI0XSA8PCAyNCkgfCAoc2JveFsoczMgPj4+IDE2KSAmIDB4ZmZdIDw8IDE2KSB8IChzYm94WyhzMCA+Pj4gOCkgJiAweGZmXSA8PCA4KSB8IHNib3hbczEgJiAweGZmXSkgXlxyXG4gICAgICAgICAgICAgICAgICAgIGtleVNjaGVkdWxlW2tzUm93KytdO1xyXG4gICAgICAgIGNvbnN0IHQzZyA9ICgoc2JveFtzMyA+Pj4gMjRdIDw8IDI0KSB8IChzYm94WyhzMCA+Pj4gMTYpICYgMHhmZl0gPDwgMTYpIHwgKHNib3hbKHMxID4+PiA4KSAmIDB4ZmZdIDw8IDgpIHwgc2JveFtzMiAmIDB4ZmZdKSBeXHJcbiAgICAgICAgICAgICAgICAgICAga2V5U2NoZWR1bGVba3NSb3crK107XHJcblxyXG4gICAgICAgIC8vIFNldCBvdXRwdXRcclxuICAgICAgICBNW29mZnNldF0gICAgID0gdDBnO1xyXG4gICAgICAgIE1bb2Zmc2V0ICsgMV0gPSB0MWc7XHJcbiAgICAgICAgTVtvZmZzZXQgKyAyXSA9IHQyZztcclxuICAgICAgICBNW29mZnNldCArIDNdID0gdDNnO1xyXG4gICAgfVxyXG59Il19