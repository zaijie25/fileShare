
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/tcp/int64.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc1ae8uf1FPdJwTVWbg8jHt', 'int64');
// hall/scripts/logic/core/net/tcp/int64.ts

"use strict";
//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Support for handling 64-bit int numbers in Javascript (node.js)
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
 * objects operate directly on the buffer which means that if they are created
 * using an existing buffer then setting the value will modify the Buffer, and
 * vice-versa.
 *
 * Internal Representation
 *
 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
 * at buffer[0], the least-significant at buffer[7].  For the purposes of
 * converting to/from JS native numbers, the value is assumed to be a signed
 * integer stored in 2's complement form.
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 */
//
// Int64
//
var Int64 = /** @class */ (function () {
    /**
     * Constructor accepts any of the following argument types:
     *
     * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
     * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
     * new Int64(string)             - Hex string (throws if n is outside int64 range)
     * new Int64(number)             - Number (throws if n is outside int64 range)
     * new Int64(hi, lo)             - Raw bits as two 32-bit values
     */
    function Int64(a1, a2) {
        this._buildHex();
        if (a1 instanceof Array) {
            this.buffer = a1;
            this.offset = a2 || 0;
        }
        else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
            // Under Browserify, Buffers can extend Uint8Arrays rather than an
            // instance of Buffer. We could assume the passed in Uint8Array is actually
            // a buffer but that won't handle the case where a raw Uint8Array is passed
            // in. We construct a new Buffer just in case.
            this.buffer = Array.apply([], a1);
            this.offset = a2 || 0;
        }
        else {
            this.buffer = this.buffer || [];
            this.offset = 0;
            this.setValue.apply(this, arguments);
        }
    }
    // Map for converting hex octets to strings
    Int64.prototype._buildHex = function () {
        //Int64._HEX = [];
        for (var i = 0; i < 256; i++) {
            Int64._HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
        }
    };
    /**
     * Do in-place 2's compliment.  See
     * http://en.wikipedia.org/wiki/Two's_complement
     */
    Int64.prototype._2scomp = function () {
        var b = this.buffer, o = this.offset, carry = 1;
        for (var i = o + 7; i >= o; i--) {
            var v = (b[i] ^ 0xff) + carry;
            b[i] = v & 0xff;
            carry = v >> 8;
        }
    };
    /**
     * Set the value. Takes any of the following arguments:
     *
     * setValue(string) - A hexidecimal string
     * setValue(number) - Number (throws if n is outside int64 range)
     * setValue(hi, lo) - Raw bits as two 32-bit values
     */
    Int64.prototype.setValue = function (hi, lo) {
        var negate = false;
        if (arguments.length == 1) {
            if (typeof (hi) == 'number') {
                // Simplify bitfield retrieval by using abs() value.  We restore sign
                // later
                negate = hi < 0;
                hi = Math.abs(hi);
                lo = hi % Int64.VAL32;
                hi = hi / Int64.VAL32;
                if (hi > Int64.VAL32)
                    throw new RangeError(hi + ' is outside Int64 range');
                hi = hi | 0;
            }
            else if (typeof (hi) == 'string') {
                hi = (hi + '').replace(/^0x/, '');
                lo = hi.substr(-8);
                hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
                hi = parseInt(hi, 16);
                lo = parseInt(lo, 16);
            }
            else {
                throw new Error(hi + ' must be a Number or String');
            }
        }
        // Technically we should throw if hi or lo is outside int32 range here, but
        // it's not worth the effort. Anything past the 32'nd bit is ignored.
        // Copy bytes to buffer
        var b = this.buffer, o = this.offset;
        for (var i = 7; i >= 0; i--) {
            b[o + i] = lo & 0xff;
            lo = i == 4 ? hi : lo >>> 8;
        }
        // Restore sign of passed argument
        if (negate)
            this._2scomp();
    };
    /**
     * Convert to a native JS number.
     *
     * WARNING: Do not expect this value to be accurate to integer precision for
     * large (positive or negative) numbers!
     *
     * @param allowImprecise If true, no check is performed to verify the
     * returned value is accurate to integer precision.  If false, imprecise
     * numbers (very large positive or negative numbers) will be forced to +/-
     * Infinity.
     */
    Int64.prototype.toNumber = function (allowImprecise) {
        if (allowImprecise === void 0) { allowImprecise = false; }
        var b = this.buffer, o = this.offset;
        // Running sum of octets, doing a 2's complement
        var negate = b[o] & 0x80, x = 0, carry = 1;
        for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
            var v = b[o + i];
            // 2's complement for negative numbers
            if (negate) {
                v = (v ^ 0xff) + carry;
                carry = v >> 8;
                v = v & 0xff;
            }
            x += v * m;
        }
        // Return Infinity if we've lost integer precision
        if (!allowImprecise && x >= Int64.MAX_INT) {
            return negate ? -Infinity : Infinity;
        }
        return negate ? -x : x;
    };
    /**
     * Convert to a JS Number. Returns +/-Infinity for values that can't be
     * represented to integer precision.
     */
    Int64.prototype.valueOf = function () {
        return this.toNumber(false);
    };
    /**
     * Return string value
     *
     * @param radix Just like Number#toString()'s radix
     */
    Int64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        return this.valueOf().toString(radix);
    };
    /**
     * Return a string showing the buffer octets, with MSB on the left.
     *
     * @param sep separator string. default is '' (empty string)
     */
    Int64.prototype.toOctetString = function (sep) {
        if (sep === void 0) { sep = ''; }
        var out = new Array(8);
        var b = this.buffer, o = this.offset;
        for (var i = 0; i < 8; i++) {
            out[i] = Int64._HEX[b[o + i]];
        }
        return out.join(sep || '');
    };
    /**
     * Returns the int64's 8 bytes in a buffer.
     *
     * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
     *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
     */
    Int64.prototype.toBuffer = function (rawBuffer) {
        if (rawBuffer === void 0) { rawBuffer = false; }
        if (rawBuffer && this.offset === 0)
            return this.buffer;
        var out = Array.call([], this.buffer);
        return out;
    };
    /**
     * Returns a number indicating whether this comes before or after or is the
     * same as the other in sort order.
     *
     * @param {Int64} other  Other Int64 to compare.
     */
    Int64.prototype.compare = function (other) {
        // If sign bits differ ...
        if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
            return other.buffer[other.offset] - this.buffer[this.offset];
        }
        // otherwise, compare bytes lexicographically
        for (var i = 0; i < 8; i++) {
            if (this.buffer[this.offset + i] !== other.buffer[other.offset + i]) {
                return this.buffer[this.offset + i] - other.buffer[other.offset + i];
            }
        }
        return 0;
    };
    /**
     * Returns a boolean indicating if this integer is equal to other.
     *
     * @param {Int64} other  Other Int64 to compare.
     */
    Int64.prototype.equals = function (other) {
        return this.compare(other) === 0;
    };
    /**
     * Pretty output in console.log
     */
    Int64.prototype.inspect = function () {
        return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
    };
    // Useful masks and values for bit twiddling
    Int64.MASK31 = 0x7fffffff;
    Int64.VAL31 = 0x80000000;
    Int64.MASK32 = 0xffffffff;
    Int64.VAL32 = 0x100000000;
    Int64.MAX_INT = Math.pow(2, 53);
    Int64.MIN_INT = -Math.pow(2, 53);
    Int64._HEX = new Array();
    return Int64;
}());
exports.default = Int64;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcdGNwXFxpbnQ2NC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZUFBZTtBQUNmLEVBQUU7QUFDRix3Q0FBd0M7QUFDeEMsbUVBQW1FOztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILEVBQUU7QUFDRixRQUFRO0FBQ1IsRUFBRTtBQUNGO0lBY0k7Ozs7Ozs7O09BUUc7SUFDSCxlQUFtQixFQUFNLEVBQUUsRUFBTztRQUU5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxFQUFFLFlBQVksS0FBSyxFQUN2QjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QjthQUNJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFxQixFQUNwRTtZQUNJLGtFQUFrRTtZQUNsRSwyRUFBMkU7WUFDM0UsMkVBQTJFO1lBQzNFLDhDQUE4QztZQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QjthQUVEO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsMkNBQTJDO0lBQ25DLHlCQUFTLEdBQWpCO1FBRUksa0JBQWtCO1FBQ2xC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QUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUFPLEdBQWQ7UUFDRSxPQUFPLGVBQWUsR0FBRyxJQUFJLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQzdFLENBQUM7SUF0T0MsNENBQTRDO0lBQzlCLFlBQU0sR0FBVyxVQUFVLENBQUM7SUFDNUIsV0FBSyxHQUFVLFVBQVUsQ0FBQztJQUMxQixZQUFNLEdBQVcsVUFBVSxDQUFDO0lBQzVCLFdBQUssR0FBVSxXQUFXLENBQUM7SUFDM0IsYUFBTyxHQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLGFBQU8sR0FBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLFVBQUksR0FBYyxJQUFJLEtBQUssRUFBTyxDQUFDO0lBZ090RCxZQUFDO0NBek9ELEFBeU9DLElBQUE7QUFDRCxrQkFBZSxLQUFLLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgICAgSW50NjQuanNcclxuLy9cclxuLy8gICAgIENvcHlyaWdodCAoYykgMjAxMiBSb2JlcnQgS2llZmZlclxyXG4vLyAgICAgTUlUIExpY2Vuc2UgLSBodHRwOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblxyXG4vKipcclxuICogU3VwcG9ydCBmb3IgaGFuZGxpbmcgNjQtYml0IGludCBudW1iZXJzIGluIEphdmFzY3JpcHQgKG5vZGUuanMpXHJcbiAqXHJcbiAqIEpTIE51bWJlcnMgYXJlIElFRUUtNzU0IGJpbmFyeSBkb3VibGUtcHJlY2lzaW9uIGZsb2F0cywgd2hpY2ggbGltaXRzIHRoZVxyXG4gKiByYW5nZSBvZiB2YWx1ZXMgdGhhdCBjYW4gYmUgcmVwcmVzZW50ZWQgd2l0aCBpbnRlZ2VyIHByZWNpc2lvbiB0bzpcclxuICpcclxuICogMl5eNTMgPD0gTiA8PSAyXjUzXHJcbiAqXHJcbiAqIEludDY0IG9iamVjdHMgd3JhcCBhIG5vZGUgQnVmZmVyIHRoYXQgaG9sZHMgdGhlIDgtYnl0ZXMgb2YgaW50NjQgZGF0YS4gIFRoZXNlXHJcbiAqIG9iamVjdHMgb3BlcmF0ZSBkaXJlY3RseSBvbiB0aGUgYnVmZmVyIHdoaWNoIG1lYW5zIHRoYXQgaWYgdGhleSBhcmUgY3JlYXRlZFxyXG4gKiB1c2luZyBhbiBleGlzdGluZyBidWZmZXIgdGhlbiBzZXR0aW5nIHRoZSB2YWx1ZSB3aWxsIG1vZGlmeSB0aGUgQnVmZmVyLCBhbmRcclxuICogdmljZS12ZXJzYS5cclxuICpcclxuICogSW50ZXJuYWwgUmVwcmVzZW50YXRpb25cclxuICpcclxuICogVGhlIGludGVybmFsIGJ1ZmZlciBmb3JtYXQgaXMgQmlnIEVuZGlhbi4gIEkuZS4gdGhlIG1vc3Qtc2lnbmlmaWNhbnQgYnl0ZSBpc1xyXG4gKiBhdCBidWZmZXJbMF0sIHRoZSBsZWFzdC1zaWduaWZpY2FudCBhdCBidWZmZXJbN10uICBGb3IgdGhlIHB1cnBvc2VzIG9mXHJcbiAqIGNvbnZlcnRpbmcgdG8vZnJvbSBKUyBuYXRpdmUgbnVtYmVycywgdGhlIHZhbHVlIGlzIGFzc3VtZWQgdG8gYmUgYSBzaWduZWRcclxuICogaW50ZWdlciBzdG9yZWQgaW4gMidzIGNvbXBsZW1lbnQgZm9ybS5cclxuICpcclxuICogRm9yIGRldGFpbHMgYWJvdXQgSUVFRS03NTQgc2VlOlxyXG4gKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RvdWJsZV9wcmVjaXNpb25fZmxvYXRpbmctcG9pbnRfZm9ybWF0XHJcbiAqL1xyXG5cclxuLy9cclxuLy8gSW50NjRcclxuLy9cclxuY2xhc3MgSW50NjRcclxue1xyXG4gICAgLy8gVXNlZnVsIG1hc2tzIGFuZCB2YWx1ZXMgZm9yIGJpdCB0d2lkZGxpbmdcclxuICAgIHB1YmxpYyBzdGF0aWMgTUFTSzMxOm51bWJlciA9ICAweDdmZmZmZmZmO1xyXG4gICAgcHVibGljIHN0YXRpYyBWQUwzMTpudW1iZXIgPSAweDgwMDAwMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNQVNLMzI6bnVtYmVyID0gIDB4ZmZmZmZmZmY7XHJcbiAgICBwdWJsaWMgc3RhdGljIFZBTDMyOm51bWJlciA9IDB4MTAwMDAwMDAwO1xyXG4gICAgcHVibGljIHN0YXRpYyBNQVhfSU5UOm51bWJlciA9IE1hdGgucG93KDIsIDUzKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgTUlOX0lOVDpudW1iZXIgPSAtTWF0aC5wb3coMiwgNTMpO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0hFWDpBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcclxuXHJcbiAgICBwdWJsaWMgYnVmZmVyOkFycmF5PG51bWJlcj47XHJcbiAgICBwdWJsaWMgb2Zmc2V0Om51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIGFjY2VwdHMgYW55IG9mIHRoZSBmb2xsb3dpbmcgYXJndW1lbnQgdHlwZXM6XHJcbiAgICAgKlxyXG4gICAgICogbmV3IEludDY0KGJ1ZmZlclssIG9mZnNldD0wXSkgLSBFeGlzdGluZyBCdWZmZXIgd2l0aCBieXRlIG9mZnNldFxyXG4gICAgICogbmV3IEludDY0KFVpbnQ4QXJyYXlbLCBvZmZzZXQ9MF0pIC0gRXhpc3RpbmcgVWludDhBcnJheSB3aXRoIGEgYnl0ZSBvZmZzZXRcclxuICAgICAqIG5ldyBJbnQ2NChzdHJpbmcpICAgICAgICAgICAgIC0gSGV4IHN0cmluZyAodGhyb3dzIGlmIG4gaXMgb3V0c2lkZSBpbnQ2NCByYW5nZSlcclxuICAgICAqIG5ldyBJbnQ2NChudW1iZXIpICAgICAgICAgICAgIC0gTnVtYmVyICh0aHJvd3MgaWYgbiBpcyBvdXRzaWRlIGludDY0IHJhbmdlKVxyXG4gICAgICogbmV3IEludDY0KGhpLCBsbykgICAgICAgICAgICAgLSBSYXcgYml0cyBhcyB0d28gMzItYml0IHZhbHVlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYTE6YW55LCBhMj86YW55KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX2J1aWxkSGV4KCk7XHJcbiAgICAgICAgaWYgKGExIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IGExO1xyXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IGEyIHx8IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhMSkgPT0gJ1tvYmplY3QgVWludDhBcnJheV0nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVW5kZXIgQnJvd3NlcmlmeSwgQnVmZmVycyBjYW4gZXh0ZW5kIFVpbnQ4QXJyYXlzIHJhdGhlciB0aGFuIGFuXHJcbiAgICAgICAgICAgIC8vIGluc3RhbmNlIG9mIEJ1ZmZlci4gV2UgY291bGQgYXNzdW1lIHRoZSBwYXNzZWQgaW4gVWludDhBcnJheSBpcyBhY3R1YWxseVxyXG4gICAgICAgICAgICAvLyBhIGJ1ZmZlciBidXQgdGhhdCB3b24ndCBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSByYXcgVWludDhBcnJheSBpcyBwYXNzZWRcclxuICAgICAgICAgICAgLy8gaW4uIFdlIGNvbnN0cnVjdCBhIG5ldyBCdWZmZXIganVzdCBpbiBjYXNlLlxyXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IEFycmF5LmFwcGx5KFtdLCBhMSk7XHJcbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gYTIgfHwgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5idWZmZXIgPSB0aGlzLmJ1ZmZlciB8fCBbXTtcclxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1hcCBmb3IgY29udmVydGluZyBoZXggb2N0ZXRzIHRvIHN0cmluZ3NcclxuICAgIHByaXZhdGUgX2J1aWxkSGV4KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8vSW50NjQuX0hFWCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcclxuICAgICAgICAgIEludDY0Ll9IRVhbaV0gPSAoaSA+IDB4RiA/ICcnIDogJzAnKSArIGkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRG8gaW4tcGxhY2UgMidzIGNvbXBsaW1lbnQuICBTZWVcclxuICAgKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1R3bydzX2NvbXBsZW1lbnRcclxuICAgKi9cclxuICBwcml2YXRlIF8yc2NvbXAoKVxyXG4gIHtcclxuICAgIHZhciBiID0gdGhpcy5idWZmZXIsIG8gPSB0aGlzLm9mZnNldCwgY2FycnkgPSAxO1xyXG4gICAgZm9yICh2YXIgaSA9IG8gKyA3OyBpID49IG87IGktLSkge1xyXG4gICAgICB2YXIgdiA9IChiW2ldIF4gMHhmZikgKyBjYXJyeTtcclxuICAgICAgYltpXSA9IHYgJiAweGZmO1xyXG4gICAgICBjYXJyeSA9IHYgPj4gODtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgdmFsdWUuIFRha2VzIGFueSBvZiB0aGUgZm9sbG93aW5nIGFyZ3VtZW50czpcclxuICAgKlxyXG4gICAqIHNldFZhbHVlKHN0cmluZykgLSBBIGhleGlkZWNpbWFsIHN0cmluZ1xyXG4gICAqIHNldFZhbHVlKG51bWJlcikgLSBOdW1iZXIgKHRocm93cyBpZiBuIGlzIG91dHNpZGUgaW50NjQgcmFuZ2UpXHJcbiAgICogc2V0VmFsdWUoaGksIGxvKSAtIFJhdyBiaXRzIGFzIHR3byAzMi1iaXQgdmFsdWVzXHJcbiAgICovXHJcbiAgcHVibGljIHNldFZhbHVlKGhpOmFueSwgbG8/OmFueSk6dm9pZCB7XHJcbiAgICB2YXIgbmVnYXRlOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEpIHtcclxuICAgICAgaWYgKHR5cGVvZihoaSkgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAvLyBTaW1wbGlmeSBiaXRmaWVsZCByZXRyaWV2YWwgYnkgdXNpbmcgYWJzKCkgdmFsdWUuICBXZSByZXN0b3JlIHNpZ25cclxuICAgICAgICAvLyBsYXRlclxyXG4gICAgICAgIG5lZ2F0ZSA9IGhpIDwgMDtcclxuICAgICAgICBoaSA9IE1hdGguYWJzKGhpKTtcclxuICAgICAgICBsbyA9IGhpICUgSW50NjQuVkFMMzI7XHJcbiAgICAgICAgaGkgPSBoaSAvIEludDY0LlZBTDMyO1xyXG4gICAgICAgIGlmIChoaSA+IEludDY0LlZBTDMyKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihoaSAgKyAnIGlzIG91dHNpZGUgSW50NjQgcmFuZ2UnKTtcclxuICAgICAgICBoaSA9IGhpIHwgMDtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YoaGkpID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaGkgPSAoaGkgKyAnJykucmVwbGFjZSgvXjB4LywgJycpO1xyXG4gICAgICAgIGxvID0gaGkuc3Vic3RyKC04KTtcclxuICAgICAgICBoaSA9IGhpLmxlbmd0aCA+IDggPyBoaS5zdWJzdHIoMCwgaGkubGVuZ3RoIC0gOCkgOiAnJztcclxuICAgICAgICBoaSA9IHBhcnNlSW50KGhpLCAxNik7XHJcbiAgICAgICAgbG8gPSBwYXJzZUludChsbywgMTYpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihoaSArICcgbXVzdCBiZSBhIE51bWJlciBvciBTdHJpbmcnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRlY2huaWNhbGx5IHdlIHNob3VsZCB0aHJvdyBpZiBoaSBvciBsbyBpcyBvdXRzaWRlIGludDMyIHJhbmdlIGhlcmUsIGJ1dFxyXG4gICAgLy8gaXQncyBub3Qgd29ydGggdGhlIGVmZm9ydC4gQW55dGhpbmcgcGFzdCB0aGUgMzInbmQgYml0IGlzIGlnbm9yZWQuXHJcblxyXG4gICAgLy8gQ29weSBieXRlcyB0byBidWZmZXJcclxuICAgIHZhciBiID0gdGhpcy5idWZmZXIsIG8gPSB0aGlzLm9mZnNldDtcclxuICAgIGZvciAodmFyIGkgPSA3OyBpID49IDA7IGktLSkge1xyXG4gICAgICBiW28raV0gPSBsbyAmIDB4ZmY7XHJcbiAgICAgIGxvID0gaSA9PSA0ID8gaGkgOiBsbyA+Pj4gODtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXN0b3JlIHNpZ24gb2YgcGFzc2VkIGFyZ3VtZW50XHJcbiAgICBpZiAobmVnYXRlKSB0aGlzLl8yc2NvbXAoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgdG8gYSBuYXRpdmUgSlMgbnVtYmVyLlxyXG4gICAqXHJcbiAgICogV0FSTklORzogRG8gbm90IGV4cGVjdCB0aGlzIHZhbHVlIHRvIGJlIGFjY3VyYXRlIHRvIGludGVnZXIgcHJlY2lzaW9uIGZvclxyXG4gICAqIGxhcmdlIChwb3NpdGl2ZSBvciBuZWdhdGl2ZSkgbnVtYmVycyFcclxuICAgKlxyXG4gICAqIEBwYXJhbSBhbGxvd0ltcHJlY2lzZSBJZiB0cnVlLCBubyBjaGVjayBpcyBwZXJmb3JtZWQgdG8gdmVyaWZ5IHRoZVxyXG4gICAqIHJldHVybmVkIHZhbHVlIGlzIGFjY3VyYXRlIHRvIGludGVnZXIgcHJlY2lzaW9uLiAgSWYgZmFsc2UsIGltcHJlY2lzZVxyXG4gICAqIG51bWJlcnMgKHZlcnkgbGFyZ2UgcG9zaXRpdmUgb3IgbmVnYXRpdmUgbnVtYmVycykgd2lsbCBiZSBmb3JjZWQgdG8gKy8tXHJcbiAgICogSW5maW5pdHkuXHJcbiAgICovXHJcbiAgcHVibGljIHRvTnVtYmVyKGFsbG93SW1wcmVjaXNlOmJvb2xlYW49ZmFsc2UpOm51bWJlciB7XHJcbiAgICB2YXIgYiA9IHRoaXMuYnVmZmVyLCBvID0gdGhpcy5vZmZzZXQ7XHJcblxyXG4gICAgLy8gUnVubmluZyBzdW0gb2Ygb2N0ZXRzLCBkb2luZyBhIDIncyBjb21wbGVtZW50XHJcbiAgICB2YXIgbmVnYXRlID0gYltvXSAmIDB4ODAsIHggPSAwLCBjYXJyeSA9IDE7XHJcbiAgICBmb3IgKHZhciBpID0gNywgbSA9IDE7IGkgPj0gMDsgaS0tLCBtICo9IDI1Nikge1xyXG4gICAgICB2YXIgdiA9IGJbbytpXTtcclxuXHJcbiAgICAgIC8vIDIncyBjb21wbGVtZW50IGZvciBuZWdhdGl2ZSBudW1iZXJzXHJcbiAgICAgIGlmIChuZWdhdGUpIHtcclxuICAgICAgICB2ID0gKHYgXiAweGZmKSArIGNhcnJ5O1xyXG4gICAgICAgIGNhcnJ5ID0gdiA+PiA4O1xyXG4gICAgICAgIHYgPSB2ICYgMHhmZjtcclxuICAgICAgfVxyXG5cclxuICAgICAgeCArPSB2ICogbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm4gSW5maW5pdHkgaWYgd2UndmUgbG9zdCBpbnRlZ2VyIHByZWNpc2lvblxyXG4gICAgaWYgKCFhbGxvd0ltcHJlY2lzZSAmJiB4ID49IEludDY0Lk1BWF9JTlQpIHtcclxuICAgICAgcmV0dXJuIG5lZ2F0ZSA/IC1JbmZpbml0eSA6IEluZmluaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZWdhdGUgPyAteCA6IHg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb252ZXJ0IHRvIGEgSlMgTnVtYmVyLiBSZXR1cm5zICsvLUluZmluaXR5IGZvciB2YWx1ZXMgdGhhdCBjYW4ndCBiZVxyXG4gICAqIHJlcHJlc2VudGVkIHRvIGludGVnZXIgcHJlY2lzaW9uLlxyXG4gICAqL1xyXG4gIHB1YmxpYyB2YWx1ZU9mKCk6bnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnRvTnVtYmVyKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybiBzdHJpbmcgdmFsdWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSByYWRpeCBKdXN0IGxpa2UgTnVtYmVyI3RvU3RyaW5nKCkncyByYWRpeFxyXG4gICAqL1xyXG4gIHB1YmxpYyB0b1N0cmluZyhyYWRpeDpudW1iZXI9MTApOnN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkudG9TdHJpbmcocmFkaXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIGEgc3RyaW5nIHNob3dpbmcgdGhlIGJ1ZmZlciBvY3RldHMsIHdpdGggTVNCIG9uIHRoZSBsZWZ0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlcCBzZXBhcmF0b3Igc3RyaW5nLiBkZWZhdWx0IGlzICcnIChlbXB0eSBzdHJpbmcpXHJcbiAgICovXHJcbiAgcHVibGljIHRvT2N0ZXRTdHJpbmcoc2VwOnN0cmluZz0nJyk6c3RyaW5nIHtcclxuICAgIHZhciBvdXQgPSBuZXcgQXJyYXkoOCk7XHJcbiAgICB2YXIgYiA9IHRoaXMuYnVmZmVyLCBvID0gdGhpcy5vZmZzZXQ7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICBvdXRbaV0gPSBJbnQ2NC5fSEVYW2JbbytpXV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0LmpvaW4oc2VwIHx8ICcnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGludDY0J3MgOCBieXRlcyBpbiBhIGJ1ZmZlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Ym9vbH0gW3Jhd0J1ZmZlcj1mYWxzZV0gIElmIG5vIG9mZnNldCBhbmQgdGhpcyBpcyB0cnVlLCByZXR1cm4gdGhlIGludGVybmFsIGJ1ZmZlci4gIFNob3VsZCBvbmx5IGJlIHVzZWQgaWZcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5b3UncmUgZGlzY2FyZGluZyB0aGUgSW50NjQgYWZ0ZXJ3YXJkcywgYXMgaXQgYnJlYWtzIGVuY2Fwc3VsYXRpb24uXHJcbiAgICovXHJcbiAgcHVibGljIHRvQnVmZmVyKHJhd0J1ZmZlcjpib29sZWFuPWZhbHNlKTpBcnJheTxudW1iZXI+IHtcclxuICAgIGlmIChyYXdCdWZmZXIgJiYgdGhpcy5vZmZzZXQgPT09IDApIHJldHVybiB0aGlzLmJ1ZmZlcjtcclxuXHJcbiAgICB2YXIgb3V0ID0gQXJyYXkuY2FsbChbXSwgdGhpcy5idWZmZXIpO1xyXG4gICAgcmV0dXJuIG91dDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBudW1iZXIgaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgY29tZXMgYmVmb3JlIG9yIGFmdGVyIG9yIGlzIHRoZVxyXG4gICAqIHNhbWUgYXMgdGhlIG90aGVyIGluIHNvcnQgb3JkZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0ludDY0fSBvdGhlciAgT3RoZXIgSW50NjQgdG8gY29tcGFyZS5cclxuICAgKi9cclxuICBwdWJsaWMgY29tcGFyZShvdGhlcjpJbnQ2NCk6bnVtYmVyIHtcclxuXHJcbiAgICAvLyBJZiBzaWduIGJpdHMgZGlmZmVyIC4uLlxyXG4gICAgaWYgKCh0aGlzLmJ1ZmZlclt0aGlzLm9mZnNldF0gJiAweDgwKSAhPSAob3RoZXIuYnVmZmVyW290aGVyLm9mZnNldF0gJiAweDgwKSkge1xyXG4gICAgICByZXR1cm4gb3RoZXIuYnVmZmVyW290aGVyLm9mZnNldF0gLSB0aGlzLmJ1ZmZlclt0aGlzLm9mZnNldF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3RoZXJ3aXNlLCBjb21wYXJlIGJ5dGVzIGxleGljb2dyYXBoaWNhbGx5XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5idWZmZXJbdGhpcy5vZmZzZXQraV0gIT09IG90aGVyLmJ1ZmZlcltvdGhlci5vZmZzZXQraV0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5vZmZzZXQraV0gLSBvdGhlci5idWZmZXJbb3RoZXIub2Zmc2V0K2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBpbnRlZ2VyIGlzIGVxdWFsIHRvIG90aGVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtJbnQ2NH0gb3RoZXIgIE90aGVyIEludDY0IHRvIGNvbXBhcmUuXHJcbiAgICovXHJcbiAgcHVibGljIGVxdWFscyhvdGhlcjpJbnQ2NCk6Ym9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jb21wYXJlKG90aGVyKSA9PT0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXR0eSBvdXRwdXQgaW4gY29uc29sZS5sb2dcclxuICAgKi9cclxuICBwdWJsaWMgaW5zcGVjdCgpOnN0cmluZyB7XHJcbiAgICByZXR1cm4gJ1tJbnQ2NCB2YWx1ZTonICsgdGhpcyArICcgb2N0ZXRzOicgKyB0aGlzLnRvT2N0ZXRTdHJpbmcoJyAnKSArICddJztcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgSW50NjQiXX0=