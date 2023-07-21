"use strict";
cc._RF.push(module, '1c8c4DjMeJLy5jnF80egbkZ', 'EvpKDF');
// hall/scripts/framework/libs/cryptoTs/algo/EvpKDF.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvpKDF = void 0;
var WordArray_1 = require("../lib/WordArray");
var MD5_1 = require("./MD5");
var EvpKDF = /** @class */ (function () {
    /**
     * Initializes a newly created key derivation function.
     *
     * @param cfg (Optional) The configuration options to use for the derivation.
     *
     * @example
     *
     *     let kdf = EvpKDF.create();
     *     let kdf = EvpKDF.create({ keySize: 8 });
     *     let kdf = EvpKDF.create({ keySize: 8, iterations: 1000 });
     */
    function EvpKDF(cfg) {
        this.cfg = Object.assign({
            keySize: 128 / 32,
            hasher: MD5_1.MD5,
            iterations: 1
        }, cfg);
    }
    /**
     * Derives a key from a password.
     *
     * @param password The password.
     * @param salt A salt.
     *
     * @return The derived key.
     *
     * @example
     *
     *     let key = kdf.compute(password, salt);
     */
    EvpKDF.prototype.compute = function (password, salt) {
        // Init hasher
        var hasher = new this.cfg.hasher();
        // Initial values
        var derivedKey = new WordArray_1.WordArray();
        // Generate key
        var block;
        while (derivedKey.words.length < this.cfg.keySize) {
            if (block) {
                hasher.update(block);
            }
            block = hasher.update(password).finalize(salt);
            hasher.reset();
            // Iterations
            for (var i = 1; i < this.cfg.iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
            }
            derivedKey.concat(block);
        }
        derivedKey.sigBytes = this.cfg.keySize * 4;
        return derivedKey;
    };
    return EvpKDF;
}());
exports.EvpKDF = EvpKDF;

cc._RF.pop();