
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/algo/EvpKDF.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcYWxnb1xcRXZwS0RGLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUU3Qyw2QkFBNEI7QUFjNUI7SUFHSTs7Ozs7Ozs7OztPQVVHO0lBQ0gsZ0JBQVksR0FBMEI7UUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxHQUFHLEdBQUcsRUFBRTtZQUNqQixNQUFNLEVBQUUsU0FBRztZQUNYLFVBQVUsRUFBRSxDQUFDO1NBQ2hCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCx3QkFBTyxHQUFQLFVBQVEsUUFBNEIsRUFBRSxJQUF3QjtRQUMxRCxjQUFjO1FBQ2QsSUFBTSxNQUFNLEdBQUcsSUFBVyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU8sRUFBRSxDQUFDO1FBRTdDLGlCQUFpQjtRQUNqQixJQUFNLFVBQVUsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUVuQyxlQUFlO1FBQ2YsSUFBSSxLQUFLLENBQUM7UUFDVixPQUFNLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUcsS0FBSyxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7WUFDRCxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRWYsYUFBYTtZQUNiLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNsQjtZQUVELFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUUzQyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0wsYUFBQztBQUFELENBOURBLEFBOERDLElBQUE7QUE5RFksd0JBQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXb3JkQXJyYXkgfSBmcm9tICcuLi9saWIvV29yZEFycmF5JztcclxuaW1wb3J0IHsgSGFzaGVyIH0gZnJvbSAnLi4vbGliL0hhc2hlcic7XHJcbmltcG9ydCB7IE1ENSB9IGZyb20gJy4vTUQ1JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9uYWxFdnBLREZDb25maWcge1xyXG4gICAga2V5U2l6ZT86IG51bWJlcjtcclxuICAgIGhhc2hlcj86IHR5cGVvZiBIYXNoZXI7XHJcbiAgICBpdGVyYXRpb25zPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV2cEtERkNvbmZpZyBleHRlbmRzIE9wdGlvbmFsRXZwS0RGQ29uZmlnIHtcclxuICAgIGtleVNpemU6IG51bWJlcjtcclxuICAgIGhhc2hlcjogdHlwZW9mIEhhc2hlcjtcclxuICAgIGl0ZXJhdGlvbnM6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2cEtERiB7XHJcbiAgICBwdWJsaWMgY2ZnOiBFdnBLREZDb25maWc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQga2V5IGRlcml2YXRpb24gZnVuY3Rpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGUgZGVyaXZhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQga2RmID0gRXZwS0RGLmNyZWF0ZSgpO1xyXG4gICAgICogICAgIGxldCBrZGYgPSBFdnBLREYuY3JlYXRlKHsga2V5U2l6ZTogOCB9KTtcclxuICAgICAqICAgICBsZXQga2RmID0gRXZwS0RGLmNyZWF0ZSh7IGtleVNpemU6IDgsIGl0ZXJhdGlvbnM6IDEwMDAgfSk7XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGNmZz86IE9wdGlvbmFsRXZwS0RGQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5jZmcgPSBPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAga2V5U2l6ZTogMTI4IC8gMzIsXHJcbiAgICAgICAgICAgIGhhc2hlcjogTUQ1LFxyXG4gICAgICAgICAgICBpdGVyYXRpb25zOiAxXHJcbiAgICAgICAgfSwgY2ZnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlcml2ZXMgYSBrZXkgZnJvbSBhIHBhc3N3b3JkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXHJcbiAgICAgKiBAcGFyYW0gc2FsdCBBIHNhbHQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgZGVyaXZlZCBrZXkuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGtleSA9IGtkZi5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcclxuICAgICAqL1xyXG4gICAgY29tcHV0ZShwYXNzd29yZDogV29yZEFycmF5IHwgc3RyaW5nLCBzYWx0OiBXb3JkQXJyYXkgfCBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIEluaXQgaGFzaGVyXHJcbiAgICAgICAgY29uc3QgaGFzaGVyID0gbmV3ICg8YW55PiB0aGlzLmNmZy5oYXNoZXIpKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXHJcbiAgICAgICAgY29uc3QgZGVyaXZlZEtleSA9IG5ldyBXb3JkQXJyYXkoKTtcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUga2V5XHJcbiAgICAgICAgbGV0IGJsb2NrO1xyXG4gICAgICAgIHdoaWxlKGRlcml2ZWRLZXkud29yZHMubGVuZ3RoIDwgdGhpcy5jZmcua2V5U2l6ZSkge1xyXG4gICAgICAgICAgICBpZihibG9jaykge1xyXG4gICAgICAgICAgICAgICAgaGFzaGVyLnVwZGF0ZShibG9jayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmxvY2sgPSBoYXNoZXIudXBkYXRlKHBhc3N3b3JkKS5maW5hbGl6ZShzYWx0KTtcclxuICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJdGVyYXRpb25zXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCB0aGlzLmNmZy5pdGVyYXRpb25zOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGJsb2NrID0gaGFzaGVyLmZpbmFsaXplKGJsb2NrKTtcclxuICAgICAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXJpdmVkS2V5LmNvbmNhdChibG9jayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlcml2ZWRLZXkuc2lnQnl0ZXMgPSB0aGlzLmNmZy5rZXlTaXplICogNDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcml2ZWRLZXk7XHJcbiAgICB9XHJcbn0iXX0=