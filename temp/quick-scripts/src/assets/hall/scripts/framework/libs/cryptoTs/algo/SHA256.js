"use strict";
cc._RF.push(module, 'ada42ZIWb5Hi5JD4NmZOtHC', 'SHA256');
// hall/scripts/framework/libs/cryptoTs/algo/SHA256.ts

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
exports.SHA256 = void 0;
var Hasher_1 = require("../lib/Hasher");
var WordArray_1 = require("../lib/WordArray");
// Initialization and round constants tables
var H = [];
var K = [];
// Reusable object
var W = [];
var SHA256 = /** @class */ (function (_super) {
    __extends(SHA256, _super);
    function SHA256() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SHA256.prototype.reset = function () {
        // reset core values
        _super.prototype.reset.call(this);
        this._hash = new WordArray_1.WordArray(H.slice(0));
    };
    SHA256.prototype._doProcessBlock = function (M, offset) {
        // Shortcut
        var Hl = this._hash.words;
        // Working variables
        var a = Hl[0];
        var b = Hl[1];
        var c = Hl[2];
        var d = Hl[3];
        var e = Hl[4];
        var f = Hl[5];
        var g = Hl[6];
        var h = Hl[7];
        // Computation
        for (var i = 0; i < 64; i++) {
            if (i < 16) {
                W[i] = M[offset + i] | 0;
            }
            else {
                var gamma0x = W[i - 15];
                var gamma0 = ((gamma0x << 25) | (gamma0x >>> 7)) ^
                    ((gamma0x << 14) | (gamma0x >>> 18)) ^
                    (gamma0x >>> 3);
                var gamma1x = W[i - 2];
                var gamma1 = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                    ((gamma1x << 13) | (gamma1x >>> 19)) ^
                    (gamma1x >>> 10);
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
            }
            var ch = (e & f) ^ (~e & g);
            var maj = (a & b) ^ (a & c) ^ (b & c);
            var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
            var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
            var t1 = h + sigma1 + ch + K[i] + W[i];
            var t2 = sigma0 + maj;
            h = g;
            g = f;
            f = e;
            e = (d + t1) | 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) | 0;
        }
        // Intermediate hash value
        Hl[0] = (Hl[0] + a) | 0;
        Hl[1] = (Hl[1] + b) | 0;
        Hl[2] = (Hl[2] + c) | 0;
        Hl[3] = (Hl[3] + d) | 0;
        Hl[4] = (Hl[4] + e) | 0;
        Hl[5] = (Hl[5] + f) | 0;
        Hl[6] = (Hl[6] + g) | 0;
        Hl[7] = (Hl[7] + h) | 0;
    };
    SHA256.prototype._doFinalize = function () {
        var nBitsTotal = this._nDataBytes * 8;
        var nBitsLeft = this._data.sigBytes * 8;
        // Add padding
        this._data.words[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
        this._data.words[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
        this._data.sigBytes = this._data.words.length * 4;
        // Hash final blocks
        this._process();
        // Return final computed hash
        return this._hash;
    };
    return SHA256;
}(Hasher_1.Hasher));
exports.SHA256 = SHA256;

cc._RF.pop();