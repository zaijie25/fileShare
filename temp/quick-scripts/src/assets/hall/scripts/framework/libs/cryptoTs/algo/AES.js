"use strict";
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